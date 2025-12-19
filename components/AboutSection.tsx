"use client";

import {
    Gamepad2,
    Users,
    LayoutGrid,
    Coffee,
    Wind,
    Wifi,
    Sparkles,
    Calendar,
    Heart,
    Briefcase,
    Volume2,
    VolumeX,
    Zap,
    Swords,
    Trophy,
    Flame
} from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export default function AboutSection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isMuted, setIsMuted] = useState(false); // Default sound ON
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    // Track if we should resume playback when scrolling back into view
    const shouldResume = useRef(false);

    const features = [
        "High-Voltage Social Hub",
        "Epic Multiplayer Battles",
        "Tournaments of Glory",
        "Tabletop Madness",
        "Chill Zones & Chaos",
        "Fuel For The Win",
        "Contagious Energy",
        "Host Your Own Chaos",
        "Lag-Free Connection",
        "Fresh Air, Hot Plays"
    ];


    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = 0.5;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);

                if (!videoRef.current) return;

                if (entry.isIntersecting) {
                    // Only auto-resume if users have started it and it was playing before scroll
                    if (hasStarted && shouldResume.current) {
                        videoRef.current.play()
                            .then(() => setIsPlaying(true))
                            .catch(() => setIsPlaying(false));
                    }
                } else {
                    // When scrolling away, check if it's currently playing
                    if (!videoRef.current.paused) {
                        shouldResume.current = true; // Mark to resume later
                        videoRef.current.pause();
                        setIsPlaying(false);
                    } else {
                        // If it was already paused (manually), don't auto-resume
                        shouldResume.current = false;
                    }
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [hasStarted]); // Re-run effect if start state changes, though logic mainly relies on refs

    const toggleMute = () => {
        if (videoRef.current) {
            const newMutedState = !isMuted;
            videoRef.current.muted = newMutedState;
            setIsMuted(newMutedState);
        }
    };

    const togglePlay = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
            shouldResume.current = false; // User manually paused, so don't auto-resume
        } else {
            videoRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                    setHasStarted(true);
                    shouldResume.current = true; // User started it, so resume if scrolled
                })
                .catch(console.error);
        }
    };

    return (
        <section ref={containerRef} id="about" className="min-h-screen lg:h-screen flex items-center py-8 md:py-24 lg:py-0 px-4 md:px-6 bg-slate-950 relative overflow-hidden">
            {/* Fixed Pattern Background - Works on all devices including mobile */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/BG-pattern.png')] bg-cover bg-center opacity-60 mix-blend-overlay" />
            </div>
            
            {/* Gradient overlays - positioned relative to section */}
            <div className="absolute inset-0 z-0">
                {/* Lighter gradient wash to tints but not hide the pattern */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/40 to-slate-950" />

                {/* Subtle radial vignette to focus center, but less aggressive */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.7)_100%)]" />
            </div>

            {/* Ambient Background Glow - Cyan/Blue Mix */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="max-w-[1600px] mx-auto w-full grid md:grid-cols-[1fr_1.3fr] gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 h-full">

                {/* Content Side */}
                <div
                    className={cn(
                        "transition-all duration-1000 ease-out order-1 max-w-full md:max-w-[85%] lg:max-w-[80%]",
                        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
                    )}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 md:mb-6 lg:mb-8"
                    >
                        {/* Title - Pure White with Cyan Glow Shadow */}
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-display font-bold tracking-tight text-white leading-tight drop-shadow-[0_2px_15px_rgba(34,211,238,0.2)] text-center md:text-left whitespace-nowrap">
                            Where The Vibe Rises
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 grid-rows-5 gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-5 gap-y-2 sm:gap-y-2.5 md:gap-y-3 lg:gap-y-3.5">
                        {features.map((feature, i) => {
                            // Map features to appropriate icons
                            const getIcon = (featureText: string) => {
                                const lowerFeature = featureText.toLowerCase();
                                if (lowerFeature.includes('voltage')) return Zap;
                                if (lowerFeature.includes('battles')) return Swords;
                                if (lowerFeature.includes('tournaments')) return Trophy;
                                if (lowerFeature.includes('tabletop')) return LayoutGrid;
                                if (lowerFeature.includes('chill')) return Heart;
                                if (lowerFeature.includes('fuel')) return Coffee;
                                if (lowerFeature.includes('energy')) return Flame;
                                if (lowerFeature.includes('host')) return Calendar;
                                if (lowerFeature.includes('connection')) return Wifi;
                                if (lowerFeature.includes('air')) return Wind;
                                return Gamepad2;
                            };

                            const IconComponent = getIcon(feature);

                            return (
                                <div key={i} className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 group py-0.5 md:py-1">
                                    <div className="p-0 shrink-0 relative">
                                        {/* Icon Halo - Cyan Glow */}
                                        <div className="absolute inset-0 bg-cyan-400/20 blur-md rounded-full scale-0 group-hover:scale-150 transition-transform duration-300" />
                                        {/* Icon - Cyan 400 Base */}
                                        <IconComponent className="relative text-cyan-400 w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-all duration-300 group-hover:text-white group-hover:scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                                    </div>
                                    {/* Text - Slate 200 (Ice White) for better legibility against Slate 950 */}
                                    <span className="text-slate-200 group-hover:text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-medium tracking-wide transition-colors duration-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap overflow-hidden text-ellipsis">{feature}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Follow Us Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col items-center pt-6 md:pt-8"
                    >
                        <div className="flex gap-5">
                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/pixel_and_play/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative p-2 lg:p-4 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-purple-600/20 hover:to-pink-600/20 hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                                aria-label="Instagram"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 lg:w-6 lg:h-6 text-slate-400 transition-colors duration-300 group-hover:text-pink-500"
                                >
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.153-1.772c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.451 2.53c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a2.583 2.583 0 00-.748-1.15 2.583 2.583 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>

                            {/* Facebook */}
                            <a
                                href="https://web.facebook.com/profile.php?id=61551331732284"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative p-2 lg:p-4 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-blue-600/10 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                aria-label="Facebook"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 lg:w-6 lg:h-6 text-slate-400 transition-colors duration-300 group-hover:text-blue-500"
                                >
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>

                            {/* TikTok */}
                            <a
                                href="https://www.tiktok.com/@pixelandplay"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative p-2 lg:p-4 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-slate-900/50 hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                aria-label="TikTok"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 lg:w-6 lg:h-6 text-slate-400 transition-colors duration-300 group-hover:text-white"
                                >
                                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Video Side */}
                <div
                    className={cn(
                        "flex justify-center transition-all duration-1000 ease-out delay-200 order-2",
                        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                    )}
                >
                    <div className="relative w-full max-w-sm md:max-w-md lg:max-w-full xl:max-w-2xl mx-auto h-full flex items-center justify-center">
                        <div className="h-[45vh] md:h-[60vh] lg:h-[80vh] w-auto aspect-[9/16] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative bg-slate-900 shadow-[0_0_50px_-12px_rgba(34,211,238,0.3)] group mx-auto border border-white/10">
                            <video
                                ref={videoRef}
                                src="/video-optimized.webm"
                                muted={isMuted}
                                // removed autoPlay
                                loop
                                playsInline
                                poster="/BG5.webp"
                                preload="none"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay just for tint */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20 pointer-events-none" />

                            {/* Play/Pause Button - Bottom Left */}
                            <button
                                onClick={togglePlay}
                                className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:scale-110 hover:bg-cyan-500 hover:border-cyan-500 shadow-lg group/play"
                                aria-label={isPlaying ? "Pause video" : "Play video"}
                            >
                                <div className="relative">
                                    {/* Play Icon - Shows when PAUSED */}
                                    <div className={cn("transition-all duration-300 absolute inset-0 rotate-0 scale-100", !isPlaying ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play pl-0.5 md:w-6 md:h-6"><polygon points="6 3 20 12 6 21 6 3" /></svg>
                                    </div>
                                    {/* Pause Icon - Shows when PLAYING */}
                                    <div className={cn("transition-all duration-300", !isPlaying ? "opacity-0 -rotate-90 scale-0" : "opacity-100 rotate-0 scale-100")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause md:w-6 md:h-6"><rect width="4" height="16" x="6" y="4" /><rect width="4" height="16" x="14" y="4" /></svg>
                                    </div>
                                </div>
                            </button>

                            {/* Mute Toggle Button */}
                            <button
                                onClick={toggleMute}
                                className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:scale-110 hover:bg-cyan-500 hover:border-cyan-500 shadow-lg group/mute"
                                aria-label={isMuted ? "Unmute video" : "Mute video"}
                            >
                                <div className="relative">
                                    <div className={cn("transition-all duration-300 absolute inset-0 rotate-0 scale-100", isMuted ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0")}>
                                        <VolumeX className="w-5 h-5 md:w-[20px] md:h-[20px]" />
                                    </div>
                                    <div className={cn("transition-all duration-300", isMuted ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100")}>
                                        <Volume2 className="w-5 h-5 md:w-[20px] md:h-[20px]" />
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
