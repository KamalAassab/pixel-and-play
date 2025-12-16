"use client";

import Image from "next/image";
import { CalendarDays, Coffee } from "lucide-react";

export default function HeroSection() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Background */}
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/BG3.webp"
          alt="Gaming Atmosphere"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        {/* Gradient Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background/90" />
        <div className="absolute inset-0 bg-black/40" /> {/* General darkening */}
      </div>

      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center mt-40 sm:mt-44 md:mt-40">
        {/* Main Heading */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white mb-6 opacity-0 animate-fade-in [animation-delay:100ms]"
            style={{ fontFamily: 'var(--font-anton), sans-serif' }}
          >
          <span className="block text-glow">PIXEL & PLAY</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-red text-4xl md:text-6xl mt-2">
            RAGE FREE ZONE
          </span>
        </h1>


        {/* CTA Buttons */}
        <div
          className="flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 opacity-0 animate-fade-in [animation-delay:300ms] flex-wrap"
        >
          <a
            href="#book"
            className="group relative px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full bg-brand-blue text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 hover:shadow-[0_0_30px_-5px_var(--brand-blue)] hover:-translate-y-1 overflow-hidden whitespace-nowrap"
            style={{ ['--brand-blue' as string]: '#1B4FD8' }} // Fallback for custom property in shadow
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            <div className="relative flex items-center gap-1.5 sm:gap-2 md:gap-3">
              <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
              <span>Secure Your Spot</span>
            </div>
          </a>

          <a
            href="#menu"
            className="group relative px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full bg-brand-red text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 hover:shadow-[0_0_30px_-5px_var(--brand-red)] hover:-translate-y-1 overflow-hidden whitespace-nowrap"
            style={{ ['--brand-red' as string]: '#FF5757' }} // Fallback
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            <div className="relative flex items-center gap-1.5 sm:gap-2 md:gap-3">
              <Coffee className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
              <span>Explore Our Menu</span>
            </div>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-10 w-full flex flex-col items-center gap-2 opacity-0 animate-fade-in [animation-delay:1000ms]"
      >
        <span className="text-xs uppercase tracking-widest text-gray-500">
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
      </div>
    </section>
  );
}

