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
    VolumeX
} from "lucide-react";
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
        "Social Gaming Lounge",
        "Multiplayer Console Zones",
        "Community Events & Tournaments",
        "Board Games for Groups",
        "Co-working & Chill Area",
        "Specialty Coffee & Snacks",
        "Friendly & Inclusive Vibes",
        "Private Party Hosting",
        "High-Speed WiFi",
        "Ventilated Comfort"
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
        <section ref={containerRef} id="about" className="min-h-screen flex items-center py-6 md:py-24 px-6 bg-zinc-950 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">

                {/* Content Side */}
                <div
                    className={cn(
                        "transition-all duration-1000 ease-out order-2 md:order-1",
                        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
                    )}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 md:mb-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-red">
                            More Than Gaming
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {features.map((feature, i) => {
                            // Map features to appropriate icons
                            const getIcon = (featureText: string) => {
                                const lowerFeature = featureText.toLowerCase();
                                if (lowerFeature.includes('cozy') || lowerFeature.includes('atmosphere') || lowerFeature.includes('rage-free')) return Heart;
                                if (lowerFeature.includes('wifi') || lowerFeature.includes('wi-fi') || lowerFeature.includes('high-speed')) return Wifi;
                                if (lowerFeature.includes('ventilated') || lowerFeature.includes('ventilé')) return Wind;
                                if (lowerFeature.includes('co-working')) return Briefcase;
                                if (lowerFeature.includes('event') || lowerFeature.includes('hosting')) return Calendar;
                                if (lowerFeature.includes('tournament')) return Sparkles;
                                if (lowerFeature.includes('coffee') || lowerFeature.includes('refreshment')) return Coffee;
                                if (lowerFeature.includes('board') || lowerFeature.includes('collection')) return LayoutGrid;
                                if (lowerFeature.includes('switch') || lowerFeature.includes('multiplayer')) return Users;
                                if (lowerFeature.includes('ps5') || lowerFeature.includes('console')) return Gamepad2;
                                return Gamepad2;
                            };

                            const IconComponent = getIcon(feature);

                            return (
                                <div key={i} className="flex items-center gap-2.5 group">
                                    <IconComponent className="text-brand-blue shrink-0" size={16} />
                                    <span className="text-zinc-400 group-hover:text-white text-sm font-medium transition-colors">{feature}</span>
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
                                className="group relative p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-purple-600/20 hover:to-pink-600/20 hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                                aria-label="Instagram"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6 text-zinc-400 transition-colors duration-300 group-hover:text-pink-500"
                                >
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.451 2.53c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a2.583 2.583 0 00-.748-1.15 2.583 2.583 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>

                            {/* Facebook */}
                            <a
                                href="https://web.facebook.com/profile.php?id=61551331732284"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-blue-600/10 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                aria-label="Facebook"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6 text-zinc-400 transition-colors duration-300 group-hover:text-blue-500"
                                >
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>

                            {/* TikTok */}
                            <a
                                href="https://www.tiktok.com/@pixelandplay"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-zinc-900/50 hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                aria-label="TikTok"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6 text-zinc-400 transition-colors duration-300 group-hover:text-white"
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
                        "flex justify-center transition-all duration-1000 ease-out delay-200 order-1 md:order-2",
                        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                    )}
                >
                    <div className="relative w-full max-w-sm md:max-w-none mx-auto">
                        <div className="h-[60vh] md:h-[80vh] aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/10 relative bg-zinc-900 shadow-2xl shadow-brand-blue/10 group mx-auto">
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

                            {/* Play/Pause Button - Bottom Left */}
                            <button
                                onClick={togglePlay}
                                className="absolute bottom-6 left-6 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:scale-110 hover:bg-brand-red hover:border-brand-red shadow-lg group/play"
                                aria-label={isPlaying ? "Pause video" : "Play video"}
                            >
                                <div className="relative">
                                    {/* Play Icon - Shows when PAUSED */}
                                    <div className={cn("transition-all duration-300 absolute inset-0 rotate-0 scale-100", !isPlaying ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play pl-1"><polygon points="6 3 20 12 6 21 6 3" /></svg>
                                    </div>
                                    {/* Pause Icon - Shows when PLAYING */}
                                    <div className={cn("transition-all duration-300", !isPlaying ? "opacity-0 -rotate-90 scale-0" : "opacity-100 rotate-0 scale-100")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause"><rect width="4" height="16" x="6" y="4" /><rect width="4" height="16" x="14" y="4" /></svg>
                                    </div>
                                </div>
                            </button>

                            {/* Mute Toggle Button */}
                            <button
                                onClick={toggleMute}
                                className="absolute bottom-6 right-6 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:scale-110 hover:bg-brand-blue hover:border-brand-blue shadow-lg group/mute"
                                aria-label={isMuted ? "Unmute video" : "Mute video"}
                            >
                                <div className="relative">
                                    <div className={cn("transition-all duration-300 absolute inset-0 rotate-0 scale-100", isMuted ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0")}>
                                        <VolumeX size={20} />
                                    </div>
                                    <div className={cn("transition-all duration-300", isMuted ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100")}>
                                        <Volume2 size={20} />
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
