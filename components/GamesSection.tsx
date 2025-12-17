"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gamePricing } from "@/lib/data";
import { X, Users, Gamepad2, CreditCard, LayoutGrid, ChevronRight, Image as ImageIcon, Clock } from "lucide-react";
import { gamesCatalog, getGamesByType, Game } from "@/lib/games-catalog";
import { getGameImage, hasGameImage } from "@/lib/game-images";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ServiceCard } from "@/components/ui/service-card";
import { useSmoothScroll } from "@/components/SmoothScrolling";

// Icon helper for Pricing
const iconMap: Record<string, keyof typeof Icons> = {
  "dice-5": "Dice5",
  gamepad: "Gamepad",
  "gamepad-2": "Gamepad2",
  "users": "Users"
};
import * as Icons from "lucide-react"; // Re-import for dynamic icon mapping usage if needed or usage of Icons namespace

function getPricingIcon(iconName: string) {
  const IconComponent = Icons[iconMap[iconName] as keyof typeof Icons] as React.ElementType;
  return IconComponent || Icons.Dice5;
}

// Calculate counts
const videoGamesCount = getGamesByType("video").length;
const consoleCount = getGamesByType("console").length;
const cardGamesCount = getGamesByType("card").length;
const boardGamesCount = getGamesByType("board").length;

const categoryConfig = {
  console: {
    title: "Console Games",
    icon: Gamepad2,
    description: "Experience multiplayer excitement on PS5 & Xbox with friends",
    color: "brand-blue",
    count: videoGamesCount,
    price: "30 DH/hour",
  },
  card: {
    title: "Cards Games",
    icon: CreditCard,
    description: "Gather your squad for epic card battles and strategy",
    color: "brand-red",
    count: cardGamesCount,
    price: "10 DH/hour/table",
  },
  board: {
    title: "Boards Games",
    icon: LayoutGrid,
    description: "Share laughs and challenge friends with our classic collection",
    color: "brand-blue",
    count: boardGamesCount,
    price: "10 DH/hour/table",
  },
};

export default function GamesSection() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof categoryConfig | null>(null);
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);
  const [mounted, setMounted] = useState(false);
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedCategory) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "unset";
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = "unset";
    };
  }, [selectedCategory, lenis]);

  const handleCategoryClick = (category: keyof typeof categoryConfig) => {
    let games: Game[] = [];

    if (category === "console") {
      // Only video games, exclude console hardware
      games = getGamesByType("video");
    } else {
      games = getGamesByType(category === "card" ? "card" : "board");
    }

    setSelectedGames(games);
    setSelectedCategory(category);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setSelectedGames([]);
  };

  return (
    <section id="games" className="relative min-h-screen flex items-center py-6 px-6 overflow-hidden [clip-path:inset(0)]">
      {/* Fixed Background Image with Parallax Effect */}
      {/* Fixed Background Image */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <Image
          src="/BG.webp"
          alt="Games Background"
          fill
          className="object-cover object-top"
          priority
          quality={100}
        />
        {/* Gradient Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background/90" />
        <div className="absolute inset-0 bg-black/40" /> {/* General darkening */}
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12"
        >
          <h2 className="w-fit block mx-auto text-4xl md:text-5xl font-display font-bold tracking-tight text-white">
            Our Game Library
          </h2>
        </motion.div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((category, index) => {
            const config = categoryConfig[category];
            const Icon = config.icon;
            const isBlue = config.color === "brand-blue";

            // Map category to variant
            const variant = category === "console" ? "blue" : category === "card" ? "red" : "default";

            // Use images for decorative elements
            // Update the version number (v=2) when you update the SVG file to force cache refresh
            const imageMap: Record<string, string> = {
              console: "/svg/ps5.svg?v=2",
              card: "/svg/card.svg",
              board: "/svg/monopoly.svg",
            };

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative group"
              >
                {/* Count Badge - Floating half-in/half-out */}
                <div className="absolute -top-4 -right-4 z-30 pointer-events-none">
                  <div className={cn(
                    "flex items-center justify-center w-14 h-14 rounded-full shadow-xl border-4 border-white/10", // matching card border style
                    category === "card" ? "bg-[#FF5757]" : category === "console" ? "bg-[#1B4FD8]" : "bg-zinc-900"
                  )}>
                    <span className="text-lg font-display font-bold text-white drop-shadow-md">
                      +{config.count}
                    </span>
                  </div>
                </div>

                <ServiceCard
                  title={config.title}
                  variant={variant as "red" | "default" | "gray" | "blue"}
                  imgSrc={imageMap[category]}
                  imgAlt={`${config.title} illustration`}
                  onClick={() => handleCategoryClick(category)}
                  className="min-h-[200px] md:min-h-[280px]"
                >
                  {/* Description */}
                  <p className="hidden md:block text-sm leading-relaxed mb-4 mt-2 opacity-90">
                    {config.description}
                  </p>

                  {/* Price */}
                  {config.price && (
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-2xl font-display font-bold">{config.price.split(' ')[0]}</span>
                      <span className="text-sm font-medium opacity-80">{config.price.split(' ').slice(1).join(' ')}</span>
                    </div>
                  )}
                </ServiceCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal/Popup */}
      {/* Modal/Popup - Portaled to body to escape clip-path/z-index issues */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedCategory && (
            <>
              {/* Backdrop - Blur & Darken */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[9998]" // High Z-Index
              />

              {/* Modal Container - Flex Center */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4" // Highest Z-Index
                onClick={closeModal}
              >
                {/* Modal Card */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-4xl bg-zinc-900 border border-white/10 rounded-xl shadow-2xl relative overflow-hidden flex flex-col max-h-[80vh]"
                >

                  {/* Scrollable Content Area */}
                  <div
                    className="overflow-y-auto p-4 md:p-6 custom-scrollbar"
                    data-lenis-prevent
                  >

                    {/* Close Button - Sticky inside card */}
                    <div className="absolute top-3 right-3 md:top-6 md:right-6 z-50">
                      <button
                        onClick={closeModal}
                        className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors"
                      >
                        <div className="p-2 bg-white/5 border border-white/10 rounded-full group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300 backdrop-blur-sm">
                          <X size={20} />
                        </div>
                      </button>
                    </div>

                    {/* Header Title */}
                    <div className="mb-4 md:mb-6 mt-1 md:mt-0">
                      <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20 uppercase tracking-tighter"
                      >
                        {categoryConfig[selectedCategory].title}
                      </motion.h2>
                      <div className="h-1 w-16 bg-brand-blue mt-2 rounded-full" />
                    </div>

                    {/* Games Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      {selectedGames.map((game, index) => {
                        const gameImage = getGameImage(game.name);
                        const hasImage = hasGameImage(game.name);

                        return (
                          <motion.div
                            key={game.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative flex flex-col bg-zinc-950/50 rounded-lg p-2 border border-white/5 transition-all duration-300"
                          >
                            {/* Poster Image */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded bg-zinc-900 mb-4">
                              {hasImage ? (
                                <Image
                                  src={gameImage}
                                  alt={game.displayName}
                                  fill
                                  className="object-cover"
                                  loading="lazy"
                                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                  placeholder="blur"
                                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-white/20">
                                  <ImageIcon size={32} />
                                </div>
                              )}
                            </div>

                            {/* Info */}
                            <div>
                              <h4 className="text-base font-bold text-white mb-1 leading-tight transition-colors">
                                {game.displayName}
                              </h4>
                              <div className="flex flex-wrap gap-2 text-[10px] sm:text-xs text-zinc-500">
                                {game.genre && <span>{game.genre}</span>}
                                {game.players && (
                                  <span className="text-zinc-600">• {game.players}P</span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Empty State */}
                    {selectedGames.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-20 opacity-50">
                        <LayoutGrid size={40} className="text-white mb-3" />
                        <p className="text-white text-lg font-light">No games available</p>
                      </div>
                    )}

                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}

