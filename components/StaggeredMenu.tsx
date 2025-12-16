import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

export interface StaggeredMenuItem {
    label: string;
    ariaLabel: string;
    link: string;
}
export interface StaggeredMenuSocialItem {
    label: string;
    link: string;
}
export interface StaggeredMenuProps {
    position?: 'left' | 'right';
    colors?: string[];
    items?: StaggeredMenuItem[];
    socialItems?: StaggeredMenuSocialItem[];
    displaySocials?: boolean;
    displayItemNumbering?: boolean;
    className?: string;
    logoUrl?: string; // Unused in button-only mode
    menuButtonColor?: string;
    openMenuButtonColor?: string;
    accentColor?: string;
    isFixed?: boolean; // Now defaults to false for the container (overlays are always fixed)
    changeMenuColorOnOpen?: boolean;
    closeOnClickAway?: boolean;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
    position = 'right',
    colors = ['#B19EEF', '#5227FF'],
    items = [],
    socialItems = [],
    displaySocials = true,
    displayItemNumbering = true,
    className,
    menuButtonColor = '#fff',
    openMenuButtonColor = '#fff',
    changeMenuColorOnOpen = true,
    accentColor = '#5227FF',
    closeOnClickAway = true,
    onMenuOpen,
    onMenuClose
}: StaggeredMenuProps) => {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const openRef = useRef(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const panelRef = useRef<HTMLDivElement | null>(null);
    const preLayersRef = useRef<HTMLDivElement | null>(null);
    const preLayerElsRef = useRef<HTMLElement[]>([]);

    const openTlRef = useRef<gsap.core.Timeline | null>(null);
    const closeTweenRef = useRef<gsap.core.Tween | null>(null);
    const colorTweenRef = useRef<gsap.core.Tween | null>(null);

    const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
    const busyRef = useRef(false);

    const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const panel = panelRef.current;
            const preContainer = preLayersRef.current;

            if (!panel) return;

            let preLayers: HTMLElement[] = [];
            if (preContainer) {
                preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
            }
            preLayerElsRef.current = preLayers;

            const offscreen = position === 'left' ? -100 : 100;
            gsap.set([panel, ...preLayers], { xPercent: offscreen });

            if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
        });
        return () => ctx.revert();
    }, [menuButtonColor, position, mounted]);

    const buildOpenTimeline = useCallback(() => {
        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return null;

        openTlRef.current?.kill();
        if (closeTweenRef.current) {
            closeTweenRef.current.kill();
            closeTweenRef.current = null;
        }
        itemEntranceTweenRef.current?.kill();

        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        const numberEls = Array.from(
            panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        ) as HTMLElement[];
        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

        const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
        const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        layerStates.forEach((ls, i) => {
            tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
        });

        const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
        const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
        const panelDuration = 0.65;

        tl.fromTo(
            panel,
            { xPercent: panelStart },
            { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
            panelInsertTime
        );

        if (itemEls.length) {
            const itemsStartRatio = 0.15;
            const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

            tl.to(
                itemEls,
                { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },
                itemsStart
            );

            if (numberEls.length) {
                tl.to(
                    numberEls,
                    { duration: 0.6, ease: 'power2.out', ['--sm-num-opacity' as any]: 1, stagger: { each: 0.08, from: 'start' } },
                    itemsStart + 0.1
                );
            }
        }

        if (socialTitle || socialLinks.length) {
            const socialsStart = panelInsertTime + panelDuration * 0.4;

            if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
            if (socialLinks.length) {
                tl.to(
                    socialLinks,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.55,
                        ease: 'power3.out',
                        stagger: { each: 0.08, from: 'start' },
                        onComplete: () => {
                            gsap.set(socialLinks, { clearProps: 'opacity' });
                        }
                    },
                    socialsStart + 0.04
                );
            }
        }

        openTlRef.current = tl;
        return tl;
    }, [position]);

    const playOpen = useCallback(() => {
        if (busyRef.current) return;
        busyRef.current = true;
        const tl = buildOpenTimeline();
        if (tl) {
            tl.eventCallback('onComplete', () => {
                busyRef.current = false;
            });
            tl.play(0);
        } else {
            busyRef.current = false;
        }
    }, [buildOpenTimeline]);

    const playClose = useCallback(() => {
        openTlRef.current?.kill();
        openTlRef.current = null;
        itemEntranceTweenRef.current?.kill();

        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return;

        const all: HTMLElement[] = [...layers, panel];
        closeTweenRef.current?.kill();

        const offscreen = position === 'left' ? -100 : 100;

        closeTweenRef.current = gsap.to(all, {
            xPercent: offscreen,
            duration: 0.32,
            ease: 'power3.in',
            overwrite: 'auto',
            onComplete: () => {
                const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
                if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

                const numberEls = Array.from(
                    panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
                ) as HTMLElement[];
                if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });

                busyRef.current = false;
                // Check for socials reset if needed
            }
        });
    }, [position]);

    const animateColor = useCallback(
        (opening: boolean) => {
            const btn = toggleBtnRef.current;
            if (!btn) return;
            colorTweenRef.current?.kill();
            if (changeMenuColorOnOpen) {
                const targetColor = opening ? openMenuButtonColor : menuButtonColor;
                colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' });
            } else {
                gsap.set(btn, { color: menuButtonColor });
            }
        },
        [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
    );

    React.useEffect(() => {
        if (toggleBtnRef.current) {
            if (changeMenuColorOnOpen) {
                const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
                gsap.set(toggleBtnRef.current, { color: targetColor });
            } else {
                gsap.set(toggleBtnRef.current, { color: menuButtonColor });
            }
        }
    }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

    const toggleMenu = useCallback(() => {
        const target = !openRef.current;
        openRef.current = target;
        setOpen(target);

        if (target) {
            onMenuOpen?.();
            playOpen();
        } else {
            onMenuClose?.();
            playClose();
        }

        animateColor(target);
    }, [playOpen, playClose, animateColor, onMenuOpen, onMenuClose]);

    const closeMenu = useCallback(() => {
        if (openRef.current) {
            openRef.current = false;
            setOpen(false);
            onMenuClose?.();
            playClose();
            animateColor(false);
        }
    }, [playClose, animateColor, onMenuClose]);

    React.useEffect(() => {
        if (!closeOnClickAway || !open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node) && toggleBtnRef.current && !toggleBtnRef.current.contains(event.target as Node)) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeOnClickAway, open, closeMenu]);

    return (
        <div className={`sm-scope inline-block ${className || ''}`}>
            {/* Trigger Button - Professional Lucide Icon */}
            <button
                ref={toggleBtnRef}
                className={`sm-toggle relative flex items-center justify-center p-2 bg-transparent border-0 cursor-pointer pointer-events-auto z-[60] transition-colors duration-300 ${open ? 'text-white' : 'text-white'}`}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="staggered-menu-panel"
                onClick={toggleMenu}
                type="button"
                style={{ color: open ? openMenuButtonColor : menuButtonColor }}
            >
                {open ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Full screen overlays - Portaled */}
            {mounted && createPortal(
                <div
                    className={`sm-scope fixed inset-0 z-[100] pointer-events-none ${open ? 'pointer-events-auto' : ''}`}
                    aria-hidden={!open}
                    style={{ '--sm-accent': accentColor } as React.CSSProperties}
                >
                    {/* Backdrop/Prelayers */}
                    <div
                        ref={preLayersRef}
                        className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]"
                        aria-hidden="true"
                    >
                        {(() => {
                            const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
                            let arr = [...raw];
                            if (arr.length >= 3) {
                                const mid = Math.floor(arr.length / 2);
                                arr.splice(mid, 1);
                            }
                            return arr.map((c, i) => (
                                <div
                                    key={i}
                                    className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"
                                    style={{ background: c }}
                                />
                            ));
                        })()}
                    </div>

                    <aside
                        id="staggered-menu-panel"
                        ref={panelRef}
                        className="staggered-menu-panel absolute top-0 right-0 h-full bg-zinc-950 flex flex-col p-[5rem_1.25rem_2rem_1.25rem] sm:p-[6rem_2rem_2rem_2rem] overflow-y-auto z-10 pointer-events-auto shadow-2xl"
                    >
                        {/* Close Button for Mobile (Internal) */}
                        <button
                            className="absolute top-6 right-6 p-2 text-brand-red hover:text-white transition-colors"
                            onClick={closeMenu}
                            aria-label="Close menu"
                        >
                            <X size={28} />
                        </button>

                        <div className="sm-panel-inner flex-1 flex flex-col gap-5">
                            <ul
                                className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
                                role="list"
                                data-numbering={displayItemNumbering || undefined}
                            >
                                {items && items.length ? (
                                    items.map((it, idx) => (
                                        <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>
                                            <a
                                                className="sm-panel-item relative text-brand-red font-display font-bold text-[2.2rem] sm:text-[2.8rem] md:text-[2.8rem] lg:text-[3rem] cursor-pointer leading-none tracking-[-1px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em] hover:text-white"
                                                href={it.link}
                                                aria-label={it.ariaLabel}
                                                onClick={() => closeMenu()}
                                                data-index={idx + 1}
                                            >
                                                <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                                                    {it.label}
                                                </span>
                                            </a>
                                        </li>
                                    ))
                                ) : null}
                            </ul>

                            {displaySocials && socialItems && socialItems.length > 0 && (
                                <div className="sm-socials mt-auto pt-8 flex flex-col gap-3" aria-label="Social links">
                                    <h3 className="sm-socials-title m-0 text-sm font-medium text-zinc-500 uppercase tracking-widest">Connect</h3>
                                    <ul
                                        className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"
                                        role="list"
                                    >
                                        {socialItems.map((s, i) => (
                                            <li key={s.label + i} className="sm-socials-item">
                                                <a
                                                    href={s.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="sm-socials-link text-[1rem] font-medium text-white/70 hover:text-brand-blue no-underline relative inline-block py-[2px] transition-[color,opacity] duration-300 ease-linear"
                                                >
                                                    {s.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>, document.body)}

            <style>{`
.sm-scope .sm-toggle { cursor: pointer; }
.sm-scope .staggered-menu-panel { width: fit-content; min-width: fit-content; left: auto; right: 0; max-width: 90vw; }
.sm-scope .sm-prelayers { width: fit-content; min-width: fit-content; left: auto; right: 0; max-width: 90vw; }
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); }
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }
.sm-scope .sm-socials-link:hover { color: var(--sm-accent, #ff0000); }
.sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
.sm-scope .sm-panel-list { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 50%; right: 0; transform: translateY(-50%); font-size: 0.8rem; font-weight: 400; color: var(--sm-accent, #ff0000); letter-spacing: 0; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }
@media (min-width: 640px) {
  .sm-scope .staggered-menu-panel { max-width: 60vw; }
  .sm-scope .sm-prelayers { max-width: 60vw; }
  .sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { font-size: 1rem; }
}
@media (min-width: 768px) {
  .sm-scope .staggered-menu-panel { max-width: 45vw; }
  .sm-scope .sm-prelayers { max-width: 45vw; }
}
@media (min-width: 1024px) {
  .sm-scope .staggered-menu-panel { max-width: 35vw; }
  .sm-scope .sm-prelayers { max-width: 35vw; }
}
      `}</style>
        </div>
    );
};

export default StaggeredMenu;
