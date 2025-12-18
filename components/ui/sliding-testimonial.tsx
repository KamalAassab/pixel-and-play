"use client";

import React from "react";

import { Star, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = {
    name: string;
    description: string;
}

const defaultTestimonials: Testimonial[] = [
    {
        name: "Alena Zhukova",
        description: "Simple is the perfect tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
    },
    {
        name: "Aiko",
        description:
            "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
    },
    {
        name: "Kinpe Zhukova",
        description:
            "Simple is the perfect tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
    },
    {
        name: "Lisa Kemp",
        description:
            "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
    },
    {
        name: "Saud",
        description:
            "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
    },
    {
        name: "Paula Smith",
        description:
            "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
    },
];

interface FUITestimonialWithSlideProps {
    testimonials?: Testimonial[];
    title?: string;
    subtitle?: string;
}

const TestimonialCard = ({ testimonial, className }: { testimonial: Testimonial, className?: string }) => {
    return (
        <div
            className={cn(
                "group relative flex flex-col shrink-0 grow-0 rounded-2xl transition-all duration-300 hover:scale-[1.02] w-full",
                className
            )}
        >
            {/* Premium Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-red to-[#b91c1c] rounded-2xl border border-white/10 transition-colors duration-300 shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)]" />

            {/* Gradient Glow on Hover - Adjusted for Red BG */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />

            <div className="relative p-5 md:p-6 flex flex-col h-full">
                {/* Quote Icon */}
                <div className="mb-2 opacity-50">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                    </svg>
                </div>

                <p className="text-white text-base md:text-lg leading-snug font-normal mb-4 flex-grow tracking-wide">
                    {testimonial.description}
                </p>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                        {/* Avatar Removed */}
                        <h5 className="text-lg md:text-xl font-bold text-white tracking-wide">
                            {testimonial.name}
                        </h5>
                    </div>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={20} className="fill-white text-white" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FUITestimonialWithSlide = ({ testimonials = defaultTestimonials, title, subtitle }: FUITestimonialWithSlideProps) => {
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    // Auto-scroll for mobile carousel
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = React.useState(false);

    React.useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollInterval = setInterval(() => {
            if (isPaused) return;

            const cardWidth = container.firstElementChild?.clientWidth || 0;
            const gap = 32; // Increased gap for airy feel (gap-8)
            const scrollAmount = cardWidth + gap;

            const maxScroll = container.scrollWidth - container.clientWidth;

            if (container.scrollLeft >= maxScroll - 10) {
                // Reset to start smoothly
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // Scroll to next card
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 2000);

        return () => clearInterval(scrollInterval);
    }, [isPaused]);

    return (
        <div className='max-w-8xl mx-auto w-full'>
            <div className="w-full mx-auto px-4 md:px-10">
                {(title || subtitle) && (
                    <div className='mb-6 flex flex-col items-center text-center'>
                        {title && (
                            <p className="mt-4 max-w-2xl mx-auto text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-red">
                                {title}
                            </p>
                        )}
                        {subtitle && (
                            <p className="mt-4 max-w-xl mx-auto text-lg tracking-tight text-zinc-400">
                                {subtitle}
                            </p>
                        )}

                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Pixel+%26+Play+Gaming+Caf%C3%A9+Casablanca"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 group relative inline-flex items-center gap-3 px-8 py-3 rounded-full bg-brand-blue border border-brand-blue text-white font-bold text-sm tracking-wide transition-all duration-300 hover:bg-white hover:text-brand-blue hover:shadow-[0_0_30px_rgba(27,79,216,0.6)] hover:scale-105 active:scale-95 overflow-hidden"
                        >
                            <MessageSquare className="w-4 h-4 transition-transform group-hover:rotate-12" />
                            <span className="relative z-10">Write a Review</span>
                        </a>
                    </div>
                )}

                {/* Desktop Slider View (Hidden on mobile/tablet) */}
                <div
                    style={{
                        maskImage: 'linear-gradient(to left, transparent 0%, black 10%, black 90%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 10%, black 90%, transparent 100%)',
                    }}
                    className="hidden lg:flex relative overflow-hidden shrink-0 max-w-full py-8 group/slider"
                >
                    <div className="flex animate-x-slider gap-8 w-max pl-4 group-hover/slider:[animation-play-state:paused] will-change-transform">
                        {duplicatedTestimonials.map((testimonial, indx) => {
                            return (
                                <TestimonialCard
                                    key={`slider-${indx}`}
                                    testimonial={testimonial}
                                    className="w-[350px] md:w-[500px]"
                                />
                            )
                        })}
                    </div>
                </div>

                {/* Mobile/Tablet Carousel View (Hidden on desktop) */}
                <div
                    ref={scrollContainerRef}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                    className="lg:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 py-4 pb-12 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                >
                    {testimonials.map((testimonial, indx) => (
                        <TestimonialCard
                            key={`carousel-${indx}`}
                            testimonial={testimonial}
                            className="snap-center shrink-0 w-[85vw] md:w-[450px]"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FUITestimonialWithSlide
