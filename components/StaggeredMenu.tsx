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
    activeSection?: string;
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
    activeSection = '',
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
                {mounted && (open ? <X size={28} /> : <Menu size={28} />)}
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
                        className="staggered-menu-panel absolute top-0 right-0 h-full bg-brand-blue flex flex-col p-[5rem_1.25rem_2rem_1.25rem] sm:p-[6rem_2rem_2rem_2rem] overflow-y-auto z-10 pointer-events-auto shadow-2xl rounded-l-3xl"
                    >
                        {/* Close Button for Mobile (Internal) */}
                        <button
                            className="group absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 text-white transition-all duration-300 hover:bg-brand-red hover:border-brand-red hover:scale-110 hover:rotate-90 hover:shadow-[0_0_25px_rgba(255,87,87,0.5)] active:scale-95"
                            onClick={closeMenu}
                            aria-label="Close menu"
                        >
                            <X size={22} className="transition-transform duration-300 group-hover:scale-110" strokeWidth={2.5} />
                        </button>

                        <div className="sm-panel-inner flex-1 flex flex-col gap-5">
                            <ul
                                className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
                                role="list"
                                data-numbering={displayItemNumbering || undefined}
                            >
                                {items && items.length ? (
                                    items.map((it, idx) => {
                                        const isActive = activeSection === it.link;
                                        return (
                                            <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>
                                                <a
                                                    className={`sm-panel-item relative font-display font-bold text-[2.2rem] sm:text-[2.8rem] md:text-[2.8rem] lg:text-[3rem] cursor-pointer leading-none tracking-[-1px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[0.8em] hover:text-white ${isActive ? 'text-brand-red' : 'text-white'}`}
                                                    href={it.link}
                                                    aria-label={it.ariaLabel}
                                                    onClick={() => closeMenu()}
                                                    data-index={idx + 1}
                                                    data-active={isActive}
                                                >
                                                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                                                        {it.label}
                                                    </span>
                                                </a>
                                            </li>
                                        );
                                    })
                                ) : null}
                            </ul>

                            {/* Social Media Icons */}
                            <div className="sm-socials mt-auto pt-8 flex flex-col gap-4" aria-label="Social links">
                                <div className="flex flex-row items-center justify-center gap-4">
                                    {/* Instagram */}
                                    <a
                                        href="https://www.instagram.com/pixel_and_play/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative p-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-purple-600/30 hover:to-pink-600/30 hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                                        aria-label="Instagram"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="w-5 h-5 text-white/80 transition-colors duration-300 group-hover:text-pink-400"
                                        >
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                        </svg>
                                    </a>

                                    {/* Facebook */}
                                    <a
                                        href="https://web.facebook.com/profile.php?id=61551331732284"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative p-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-blue-600/30 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                        aria-label="Facebook"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5 text-white/80 transition-colors duration-300 group-hover:text-blue-400"
                                        >
                                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                        </svg>
                                    </a>

                                    {/* TikTok */}
                                    <a
                                        href="https://www.tiktok.com/@pixelandplay"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative p-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-slate-900/50 hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                        aria-label="TikTok"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5 text-white/80 transition-colors duration-300 group-hover:text-white"
                                        >
                                            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                                        </svg>
                                    </a>

                                    {/* WhatsApp */}
                                    <a
                                        href="https://wa.me/212612919613"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative p-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-green-600/30 hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                                        aria-label="WhatsApp"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5 text-white/80 transition-colors duration-300 group-hover:text-green-400"
                                        >
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

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
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 50%; right: 0; transform: translateY(-50%); font-size: 0.8rem; font-weight: 400; color: inherit; letter-spacing: 0; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }
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
