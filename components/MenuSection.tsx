"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { menuPages } from "@/lib/data";
import { MenuPage } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as Icons from "lucide-react";

// --- Types & Helpers ---

const iconMap: Record<string, keyof typeof Icons> = {
    // Page icons
    coffee: "Coffee",
    "cup-soda": "CupSoda",
    tea: "CupSoda",
    "ice-cream": "IceCream",
    "ice-cream-2": "IceCream2",
    citrus: "Citrus",
    "glass-water": "GlassWater",
    utensils: "Utensils",
    gift: "Gift",
    // Category icons
    Coffee: "Coffee",
    CupSoda: "CupSoda",
    Citrus: "Citrus",
    Droplet: "Droplet",
    GlassWater: "GlassWater",
    Wine: "Wine",
    IceCream2: "IceCream2",
    Beer: "Beer",
    Utensils: "Utensils",
    Gift: "Gift",
};

function getIcon(iconName: string) {
    if (!iconName) return Icons.Coffee;
    const IconComponent = Icons[iconMap[iconName] as keyof typeof Icons] as React.ComponentType<{
        className?: string;
        size?: number;
    }>;
    return IconComponent || Icons.Coffee;
}

// --- Page Background Component ---

const PageBackground = ({ side, color, isLastPage, isMobile }: { side: "left" | "right"; color: string; isLastPage?: boolean; isMobile?: boolean }) => {
    const bgColor =
        color === "brand-blue" ? "bg-[#1B4FD8]" :
            color === "brand-red" ? "bg-[#FF5757]" :
                color === "green-500" ? "bg-green-600" :
                    color === "purple-500" ? "bg-purple-600" :
                        side === "left" ? "bg-[#1B4FD8]" : "bg-[#FF5757]";

    // Last page right side - make it totally red
    if (isLastPage && side === "right" && !isMobile) {
        return (
            <div className={cn("absolute inset-0", "rounded-r-2xl", "bg-[#FF5757]")}>
                {/* Page edge shadow */}
                <div className={cn(
                    "absolute top-0 bottom-0 w-px bg-black/15 z-10",
                    "left-0"
                )}></div>
            </div>
        );
    }

    // For mobile single view, we usually want rounded corners on both sides if it's a "card"
    // But if we want to mimic a page, we might keep the side-specific rounding. 
    // The user said "show page by page". Let's stick to the component's existing rounding logic but maybe adapt if needed.
    // Actually, on mobile single view, it looks better if it's fully rounded like a card.
    const roundedClass = isMobile ? "rounded-2xl" : (side === "left" ? "rounded-l-2xl" : "rounded-r-2xl");

    return (
        <div className={cn("absolute inset-0", bgColor, roundedClass)}>
            {/* Page edge shadow - only relevant for binding side */}
            {!isMobile && (
                <div className={cn(
                    "absolute top-0 bottom-0 w-px bg-black/15 z-10",
                    side === "left" ? "right-0" : "left-0" // Shadow is actually on the binding edge usually? 
                    // Original code had left-0 for both? Let's check original...
                    // Original: left-0 for both.
                )}></div>
            )}
            {/* Gradient overlay for depth */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-r pointer-events-none",
                side === "left" ? "from-transparent to-black/5" : "from-black/5 to-transparent"
            )}></div>
        </div>
    );
};

// --- Page Content Component ---

const PageContent = ({
    data,
    side,
    currentPage,
    totalPages,
    isMobile
}: {
    data: MenuPage["leftPage"] | MenuPage["rightPage"] | null;
    side: "left" | "right";
    currentPage: number;
    totalPages: number;
    isMobile?: boolean; // Added isMobile prop
}) => {
    // Determine padding based on mobile/desktop and side
    // Original: side === "left" ? "pl-8" : "pl-8" (Wait, original had padding on left for both? Yes, line 115)
    // For mobile single page, we probably want even padding or centered content.
    const contentPadding = isMobile ? "px-6 py-6" : (side === "left" ? "pl-8 p-6" : "pl-8 p-6");

    if (!data) {
        // Render empty page with page number
        return (
            <div className={cn("relative z-20 h-full flex flex-col", contentPadding, "text-left items-start")}>
                {/* Page number at bottom */}
                <div className="mt-auto">
                    <span className={cn(
                        "text-xs md:text-sm text-white/60 font-menu font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10",
                        "block"
                    )}>
                        {currentPage}/{totalPages}
                    </span>
                </div>
            </div>
        );
    }

    const hasContent = data.categories && data.categories.length > 0;
    const Icon = data.icon ? getIcon(data.icon) : Icons.Coffee;

    // Check if this page has multiple categories (like Juices + Smoothies)
    const hasMultipleCategories = hasContent && data.categories.length > 1;
    const firstCategory = hasContent ? data.categories[0] : null;
    const secondCategory = hasContent && data.categories.length > 1 ? data.categories[1] : null;

    return (
        <div className={cn("relative z-20 h-full flex flex-col overflow-hidden min-h-0", contentPadding, "text-left items-start")}>
            {/* Header */}
            <div className="flex items-center justify-end w-full mb-1 flex-shrink-0">
                <h3 className="font-menu text-lg md:text-xl font-semibold text-white tracking-tight flex items-center gap-2">
                    <Icon className="text-white/90" size={18} />
                    <span>{data.title}</span>
                </h3>
            </div>

            {/* Content - No scrolling, content continues on next page */}
            <div className="space-y-4 md:space-y-5 flex-1 w-full overflow-hidden min-h-0">
                {/* First category */}
                {firstCategory && (
                    <div className="relative">
                        <ul className="space-y-2">
                            {firstCategory.items.map((item, i) => {
                                // Split item name if it has parentheses
                                const nameMatch = item.name.match(/^([^(]+)\s*\(([^)]+)\)$/);
                                const mainName = nameMatch ? nameMatch[1].trim() : item.name;
                                const parenthetical = nameMatch ? nameMatch[2] : null;

                                // If item has no price, center it as a header
                                if (!item.price) {
                                    return (
                                        <li key={i} className="flex justify-center items-center py-2">
                                            <span className="text-xs md:text-sm font-menu font-bold text-white text-center">
                                                {mainName}
                                            </span>
                                        </li>
                                    );
                                }

                                return (
                                    <li key={i} className="flex items-center group gap-2">
                                        <div className="flex flex-col flex-shrink-0">
                                            <span className="text-xs md:text-sm font-menu font-normal text-white">
                                                {mainName}
                                            </span>
                                            {parenthetical && (
                                                <span className="text-xs md:text-sm font-menu font-normal text-white/80">
                                                    ({parenthetical})
                                                </span>
                                            )}
                                        </div>
                                        {item.price && (
                                            <>
                                                <div className="flex-1 min-w-0 overflow-hidden">
                                                    <span className="text-white/40 text-xs whitespace-nowrap" style={{
                                                        backgroundImage: 'repeating-linear-gradient(to right, currentColor 0, currentColor 2px, transparent 2px, transparent 4px)',
                                                        backgroundSize: '4px 1px',
                                                        backgroundRepeat: 'repeat-x',
                                                        backgroundPosition: '0 50%',
                                                        display: 'block',
                                                        height: '1px',
                                                        width: '100%'
                                                    }}></span>
                                                </div>
                                                <span className="text-xs md:text-sm font-menu font-semibold text-white/95 whitespace-nowrap flex-shrink-0">
                                                    {item.price}
                                                </span>
                                            </>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {/* Second category (like Smoothies below Juices) */}
                {secondCategory && (
                    <div className="relative mt-6">
                        {/* Title for second category */}
                        <div className="flex items-center justify-end w-full mb-1 flex-shrink-0">
                            <h3 className="font-menu text-lg md:text-xl font-semibold text-white tracking-tight flex items-center gap-2">
                                {secondCategory.icon && (() => {
                                    const CategoryIcon = getIcon(secondCategory.icon);
                                    return <CategoryIcon className="text-white/90" size={18} />;
                                })()}
                                {secondCategory.title}
                            </h3>
                        </div>
                        <ul className="space-y-2">
                            {secondCategory.items.map((item, i) => {
                                const nameMatch = item.name.match(/^([^(]+)\s*\(([^)]+)\)$/);
                                const mainName = nameMatch ? nameMatch[1].trim() : item.name;
                                const parenthetical = nameMatch ? nameMatch[2] : null;

                                // If item has no price, center it as a header
                                if (!item.price) {
                                    return (
                                        <li key={i} className="flex justify-center items-center py-2">
                                            <span className="text-xs md:text-sm font-menu font-bold text-white text-center">
                                                {mainName}
                                            </span>
                                        </li>
                                    );
                                }

                                return (
                                    <li key={i} className="flex items-center group gap-2">
                                        <div className="flex flex-col flex-shrink-0">
                                            <span className="text-xs md:text-sm font-menu font-normal text-white">
                                                {mainName}
                                            </span>
                                            {parenthetical && (
                                                <span className="text-xs md:text-sm font-menu font-normal text-white/80">
                                                    ({parenthetical})
                                                </span>
                                            )}
                                        </div>
                                        {item.price && (
                                            <>
                                                <div className="flex-1 min-w-0 overflow-hidden">
                                                    <span className="text-white/40 text-xs whitespace-nowrap" style={{
                                                        backgroundImage: 'repeating-linear-gradient(to right, currentColor 0, currentColor 2px, transparent 2px, transparent 4px)',
                                                        backgroundSize: '4px 1px',
                                                        backgroundRepeat: 'repeat-x',
                                                        backgroundPosition: '0 50%',
                                                        display: 'block',
                                                        height: '1px',
                                                        width: '100%'
                                                    }}></span>
                                                </div>
                                                <span className="text-xs md:text-sm font-menu font-semibold text-white/95 whitespace-nowrap flex-shrink-0">
                                                    {item.price}
                                                </span>
                                            </>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {/* Notes or additional content */}
                {data.categories.map((category, idx) => {
                    if (category.items.some(item => !item.price && item.name.toLowerCase().includes("note"))) {
                        return (
                            <div key={`note-${idx}`} className="mt-4 pt-4 border-t border-white/10">
                                {category.items
                                    .filter(item => !item.price)
                                    .map((item, i) => (
                                        <p key={i} className="text-xs md:text-sm font-menu font-normal text-white/70 italic">
                                            {item.name}
                                        </p>
                                    ))}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            {/* Page number at bottom */}
            <div className="mt-auto pt-2 flex-shrink-0 w-full flex">
                <span className={cn(
                    "text-xs md:text-sm text-white/60 font-menu font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10",
                    isMobile ? "mx-auto" : (side === "left" ? "ml-auto" : ""),
                    "block"
                )}>
                    {currentPage}/{totalPages}
                </span>
            </div>
        </div>
    );
};

// --- Sheet Component (The Flippable Entity) - Desktop Only ---

interface SheetProps {
    index: number;
    zIndex: number;
    front: React.ReactNode;
    back: React.ReactNode;
    isFlipped: boolean;
    onFlip: () => void;
}

const Sheet = ({ index, zIndex, front, back, isFlipped, onFlip }: SheetProps) => {
    return (
        <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
                zIndex: zIndex,
                transformStyle: "preserve-3d",
                transformOrigin: "left center",
            }}
            animate={{ rotateY: isFlipped ? -180 : 0 }}
            transition={{ duration: 0.8, ease: [0.15, 0.55, 0.25, 1.0] }}
        >
            {/* Front Face */}
            <div
                className="absolute inset-0 w-full h-full backface-hidden"
                style={{ backfaceVisibility: "hidden" }}
                onClick={!isFlipped ? onFlip : undefined}
            >
                {front}
                <div className="absolute inset-0 bg-gradient-to-l from-black/0 to-black/10 pointer-events-none" />
            </div>

            {/* Back Face */}
            <div
                className="absolute inset-0 w-full h-full backface-hidden"
                style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                }}
                onClick={isFlipped ? onFlip : undefined}
            >
                {back}
                <div className="absolute inset-0 bg-gradient-to-r from-black/0 to-black/10 pointer-events-none" />
            </div>
        </motion.div>
    );
};

// --- Main MenuSection Component ---

export default function MenuSection() {
    const [isMobile, setIsMobile] = useState(false);

    // Desktop State
    const [sheetIndex, setSheetIndex] = useState(0);

    // Mobile State
    const [mobilePage, setMobilePage] = useState(0);

    const totalSheets = menuPages.length + 1;
    const totalPages = menuPages.length * 2; // Total numbered pages content

    // Determine if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Desktop Navigation
    const goDesktopNext = () => {
        if (sheetIndex < totalSheets) {
            setSheetIndex(prev => prev + 1);
        }
    };

    const goDesktopPrev = () => {
        if (sheetIndex > 0) {
            setSheetIndex(prev => prev - 1);
        }
    };

    // Mobile Navigation
    // Flatten pages to only show those with content
    const mobileContentPages = menuPages.reduce((acc, spread) => {
        if (spread.leftPage) acc.push({ data: spread.leftPage, side: "left" as const });
        if (spread.rightPage) acc.push({ data: spread.rightPage, side: "right" as const });
        return acc;
    }, [] as { data: MenuPage["leftPage"] | MenuPage["rightPage"], side: "left" | "right" }[]);

    const mobileTotalViews = 1 + mobileContentPages.length + 1; // Cover + Content + Back

    const goMobileNext = () => {
        if (mobilePage < mobileTotalViews - 1) {
            setMobilePage(prev => prev + 1);
        }
    };

    const goMobilePrev = () => {
        if (mobilePage > 0) {
            setMobilePage(prev => prev - 1);
        }
    };

    // --- RENDER HELPERS ---

    const renderDesktopBook = () => {
        let containerX = "0%";
        if (sheetIndex === 0) containerX = "0%";
        else if (sheetIndex === totalSheets) containerX = "100%";
        else containerX = "50%";

        return (
            <div className="relative perspective-[2000px] w-full max-w-[calc(75vh*2/3)] aspect-[2/3] h-[75vh] mx-auto">
                <motion.div
                    className="relative w-full h-full preserve-3d"
                    animate={{
                        x: containerX
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    {Array.from({ length: totalSheets }).map((_, i) => {
                        let zIndex = 0;
                        if (i < sheetIndex) {
                            zIndex = i;
                        } else {
                            zIndex = totalSheets - i;
                        }

                        let FrontComp = null;
                        let BackComp = null;

                        if (i === 0) {
                            // Front cover
                            FrontComp = (
                                <div className="w-full h-full bg-zinc-900 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden rounded-r-2xl shadow-2xl p-6 text-center">
                                    {/* Split Background */}
                                    <div className="absolute inset-0 flex pointer-events-none">
                                        <div className="w-1/2 h-full bg-[#1B4FD8]" />
                                        <div className="w-1/2 h-full bg-[#FF5757]" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col items-center h-full justify-center">
                                        {/* Logo - Assuming Dice or main logo */}
                                        <div className="w-56 h-56 -mt-12 mb-0 relative drop-shadow-xl animate-float">
                                            <Image src="/logo.webp" fill className="object-contain" alt="Pixel & Play" priority sizes="(max-width: 768px) 160px, 224px" />
                                        </div>

                                        {/* Welcome Text */}
                                        <div className="font-menu text-white font-bold text-[11px] md:text-[13px] leading-relaxed max-w-md space-y-4 selection:bg-black/20">
                                            <p className="drop-shadow-md">Welcome to Pixel & Play!</p>
                                            <p className="drop-shadow-md">
                                                With over 50 board games and 10 video game setups,<br />
                                                Pixel & Play is your go-to spot for unforgettable moments with friends, family, and loved ones.
                                            </p>
                                            <p className="drop-shadow-md">Whether you're flying solo or coming with a crew, our friendly staff is here to make sure you have an amazing time.</p>
                                            <p className="drop-shadow-md text-brand-blue-100">If you need anything at all, just ask—we’re happy to have you with us!</p>
                                        </div>
                                    </div>
                                    {/* Overlay Gradient for consistency */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                </div>
                            );
                            BackComp = (
                                <div className="w-full h-full bg-[#1B4FD8] rounded-l-2xl overflow-hidden relative shadow-2xl">
                                    <PageBackground side="left" color="brand-blue" />
                                    <PageContent
                                        side="left"
                                        data={menuPages[0]?.leftPage}
                                        currentPage={1}
                                        totalPages={totalPages}
                                    />
                                </div>
                            );
                        } else if (i === totalSheets - 1) {
                            // Last page
                            const lastDataIndex = menuPages.length - 1;
                            const rightPageData = lastDataIndex >= 0 ? menuPages[lastDataIndex]?.rightPage : null;

                            // If rightPageData is null (e.g. Page 8 removed), render Back Cover info here
                            if (!rightPageData) {
                                FrontComp = (
                                    <div className="w-full h-full bg-zinc-900 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden rounded-r-2xl shadow-2xl p-6 text-center">
                                        {/* Split Background */}
                                        <div className="absolute inset-0 flex pointer-events-none">
                                            <div className="w-1/2 h-full bg-[#1B4FD8]" />
                                            <div className="w-1/2 h-full bg-[#FF5757]" />
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10 flex flex-col items-center h-full justify-center">
                                            {/* Logo */}
                                            <div className="w-56 h-56 -mt-12 mb-0 relative drop-shadow-xl animate-float">
                                                <Image src="/logo.webp" fill className="object-contain" alt="Pixel & Play" priority sizes="(max-width: 768px) 160px, 224px" />
                                            </div>

                                            {/* Review Text */}
                                            <div className="font-menu text-white font-bold leading-relaxed space-y-4 mb-6">
                                                <h3 className="text-2xl md:text-3xl drop-shadow-md flex items-center justify-center gap-3">
                                                    Had fun ? <span className="text-yellow-400">:)</span>
                                                </h3>
                                                <p className="text-lg md:text-xl drop-shadow-md">Please leave a review !</p>
                                            </div>

                                            {/* Stars */}
                                            <div className="flex gap-2 text-yellow-400 drop-shadow-md">
                                                {[...Array(5)].map((_, i) => (
                                                    <Icons.Star key={i} size={40} fill="currentColor" strokeWidth={0} />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                    </div>
                                );
                            } else {
                                FrontComp = (
                                    <div className="w-full h-full rounded-r-2xl overflow-hidden relative shadow-2xl">
                                        <PageBackground side="right" color="brand-red" isLastPage={true} />
                                        <PageContent
                                            side="right"
                                            data={rightPageData}
                                            currentPage={totalPages}
                                            totalPages={totalPages}
                                        />
                                    </div>
                                );
                            }

                            // Back cover (Standard)
                            BackComp = (
                                <div className="w-full h-full bg-zinc-900 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden rounded-l-2xl shadow-2xl p-6 text-center">
                                    {/* Split Background */}
                                    <div className="absolute inset-0 flex pointer-events-none">
                                        <div className="w-1/2 h-full bg-[#1B4FD8]" />
                                        <div className="w-1/2 h-full bg-[#FF5757]" />
                                    </div>

                                    {/* Content (Assuming simple back with logo or just same as front but reversed side) */}
                                    <div className="relative z-10 flex flex-col items-center h-full justify-center">
                                        <div className="w-56 h-56 -mt-12 mb-0 relative drop-shadow-xl animate-float">
                                            <Image src="/logo.webp" fill className="object-contain" alt="Pixel & Play" priority sizes="(max-width: 768px) 160px, 224px" />
                                        </div>
                                        <div className="font-menu text-white font-bold leading-relaxed space-y-4 mb-6">
                                            <h3 className="text-2xl md:text-3xl drop-shadow-md">See you soon!</h3>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                </div>
                            );
                        } else {
                            // Regular pages
                            const dataIndexRight = i - 1; // Previous spread's right page
                            const dataIndexLeft = i;      // Current spread's left page

                            // NOTE: sheetIndex i has:
                            // Front: Right page of Spread (i-1)
                            // Back: Left page of Spread (i)

                            const rightPageData = menuPages[dataIndexRight]?.rightPage;
                            const leftPageData = menuPages[dataIndexLeft]?.leftPage;

                            FrontComp = (
                                <div className="w-full h-full relative overflow-hidden rounded-r-2xl shadow-xl">
                                    <PageBackground
                                        side="right"
                                        color={rightPageData?.categories?.[0]?.color || 'brand-red'}
                                    />
                                    <PageContent
                                        side="right"
                                        data={rightPageData}
                                        currentPage={(dataIndexRight + 1) * 2} // Spread 0 -> Page 2
                                        totalPages={totalPages}
                                    />
                                </div>
                            );

                            BackComp = (
                                <div className="w-full h-full relative overflow-hidden rounded-l-2xl shadow-xl">
                                    <PageBackground
                                        side="left"
                                        color={leftPageData?.categories?.[0]?.color || 'brand-blue'}
                                    />
                                    <PageContent
                                        side="left"
                                        data={leftPageData}
                                        currentPage={dataIndexLeft * 2 + 1}
                                        totalPages={totalPages}
                                    />
                                </div>
                            );
                        }

                        return (
                            <Sheet
                                key={i}
                                index={i}
                                zIndex={zIndex}
                                isFlipped={i < sheetIndex}
                                onFlip={() => {
                                    if (i < sheetIndex) setSheetIndex(i);
                                    else setSheetIndex(i + 1);
                                }}
                                front={FrontComp}
                                back={BackComp}
                            />
                        );
                    })}
                </motion.div>
            </div>
        );
    };

    const renderMobileBook = () => {
        // Render a single page based on mobilePage index
        let Content = null;

        if (mobilePage === 0) {
            // Mobile Cover Front
            Content = (
                <div className="w-full h-full bg-zinc-900 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden rounded-2xl shadow-2xl p-6 text-center">
                    {/* Split Background */}
                    <div className="absolute inset-0 flex pointer-events-none">
                        <div className="w-1/2 h-full bg-[#1B4FD8]" />
                        <div className="w-1/2 h-full bg-[#FF5757]" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center h-full justify-center">
                        {/* Logo */}
                        <div className="w-40 h-40 -mt-8 mb-0 relative drop-shadow-xl animate-float">
                            <Image src="/logo.webp" fill className="object-contain" alt="Pixel & Play" priority sizes="(max-width: 768px) 160px, 224px" />
                        </div>

                        {/* Welcome Text */}
                        <div className="font-menu text-white font-bold text-[10px] leading-relaxed max-w-xs space-y-3 selection:bg-black/20">
                            <p className="drop-shadow-md">Welcome to Pixel & Play!</p>
                            <p className="drop-shadow-md">
                                With over 50 board games and 10 video game setups,<br />
                                Pixel & Play is your go-to spot for unforgettable moments with friends, family, and loved ones.
                            </p>
                            <p className="drop-shadow-md">Whether you're flying solo or coming with a crew, our friendly staff is here to make sure you have an amazing time.</p>
                            <p className="drop-shadow-md text-white/90">If you need anything at all, just ask—we’re happy to have you with us!</p>
                        </div>
                    </div>
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
            );
        } else if (mobilePage === mobileTotalViews - 1) {
            // Mobile Cover Back
            Content = (
                <div className="w-full h-full bg-zinc-900 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden rounded-2xl shadow-2xl p-6 text-center">
                    {/* Split Background */}
                    <div className="absolute inset-0 flex pointer-events-none">
                        <div className="w-1/2 h-full bg-[#1B4FD8]" />
                        <div className="w-1/2 h-full bg-[#FF5757]" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center h-full justify-center">
                        {/* Logo */}
                        <div className="w-40 h-40 -mt-8 mb-0 relative drop-shadow-xl animate-float">
                            <Image src="/logo.webp" fill className="object-contain" alt="Pixel & Play" priority sizes="(max-width: 768px) 160px, 224px" />
                        </div>

                        {/* Review Text */}
                        <div className="font-menu text-white font-bold leading-relaxed space-y-3 mb-6">
                            <h3 className="text-xl md:text-2xl drop-shadow-md flex items-center justify-center gap-2">
                                Had fun ? <span className="text-yellow-400">:)</span>
                            </h3>
                            <p className="text-sm md:text-lg drop-shadow-md">Please leave a review !</p>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-2 text-yellow-400 drop-shadow-md">
                            {[...Array(5)].map((_, i) => (
                                <Icons.Star key={i} size={32} fill="currentColor" strokeWidth={0} />
                            ))}
                        </div>
                    </div>

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
            );
        } else {
            // Content Pages
            const contentIndex = mobilePage - 1; // 0-based content index
            const { data: pageData, side: pageSide } = mobileContentPages[contentIndex];
            const pageNumber = contentIndex + 1; // 1-based page number
            const mobileTotalPages = mobileContentPages.length;

            Content = (
                <div className="w-full h-full relative overflow-hidden rounded-2xl shadow-xl">
                    <PageBackground
                        side={pageSide}
                        color={pageData?.categories?.[0]?.color || (pageSide === "left" ? 'brand-blue' : 'brand-red')}
                        isMobile={true}
                    />
                    <PageContent
                        side={pageSide}
                        data={pageData}
                        currentPage={pageNumber}
                        totalPages={mobileTotalPages}
                        isMobile={true}
                    />
                </div>
            );
        }

        return (
            <div className="relative w-[90vw] max-w-[400px] h-[75vh] mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mobilePage}
                        className="w-full h-full touch-pan-y cursor-grab active:cursor-grabbing"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipeThreshold = 50;
                            if (offset.x < -swipeThreshold) {
                                goMobileNext();
                            } else if (offset.x > swipeThreshold) {
                                goMobilePrev();
                            }
                        }}
                    >
                        {Content}
                    </motion.div>
                </AnimatePresence>
            </div>
        );
    };

    return (
        <section id="menu" className="min-h-screen md:h-screen flex flex-col items-center justify-center pt-24 pb-12 md:pt-0 md:pb-4 mb-8 md:mb-12 relative overflow-hidden bg-background">

            {/* Controls & Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-6 md:mb-8 relative z-10"
            >
                <h2 className="w-fit block mx-auto text-4xl md:text-5xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-red-600">Menu & Drinks</h2>
            </motion.div>

            {/* Navigation buttons outside the book */}
            <div className="flex items-center justify-center gap-4 md:gap-12 z-20 w-full max-w-7xl px-4 relative">
                {!isMobile && (
                    <button
                        onClick={goDesktopPrev}
                        disabled={sheetIndex === 0}
                        className="absolute left-4 md:left-8 flex-shrink-0 p-0 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 text-white transition-all z-30"
                    >
                        <FiArrowLeftCircle size={40} />
                    </button>
                )}

                {/* Book Container - Toggle based on device */}
                {isMobile ? renderMobileBook() : renderDesktopBook()}

                {!isMobile && (
                    <button
                        onClick={goDesktopNext}
                        disabled={sheetIndex === totalSheets}
                        className="absolute right-4 md:right-8 flex-shrink-0 p-0 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 text-white transition-all z-30"
                    >
                        <FiArrowRightCircle size={40} />
                    </button>
                )}
            </div>

            {/* Mobile Touch Indicator */}
            {isMobile && (
                <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2 pointer-events-none animate-pulse z-20 opacity-60">
                    <Icons.MoveHorizontal className="text-white" size={20} />
                    <span className="text-white text-xs font-menu uppercase tracking-widest">Swipe to navigate</span>
                </div>
            )}

            <style jsx global>{`
                .perspective-[2000px] {
                    perspective: 2000px;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
            `}</style>
        </section>
    );
}
