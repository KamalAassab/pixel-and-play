"use client";

import Image from "next/image";
import { CalendarDays, Coffee } from "lucide-react";

export default function HeroSection() {

  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden bg-background">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background/70" />
        <div className="absolute inset-0 bg-black/20" /> {/* General darkening */}
      </div>

      <div className="container relative z-10 w-full flex flex-col justify-end px-4 sm:px-6 md:px-8 lg:px-12 pb-0 pointer-events-none"> {/* Added pointer-events-none to container, will re-enable on interactive children */}

        <div className="max-w-7xl pointer-events-auto pb-4 sm:pb-6 md:pb-8 w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {/* Main Heading */}
            <h1
              className="font-bold tracking-tighter text-white animate-fade-in [animation-delay:100ms] leading-[0.9] flex-1 min-w-0 w-full text-center md:text-left"
            >
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] whitespace-nowrap">PIXEL & PLAY</span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-red mt-0.5 sm:mt-1 whitespace-nowrap">
                RAGE FREE ZONE
              </span>
            </h1>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 opacity-0 animate-fade-in [animation-delay:300ms] flex-shrink-0 lg:mb-2 w-full sm:w-auto"
            >
              <a
                href="#book"
                className="group relative px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5 rounded-xl bg-brand-blue text-white font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:bg-brand-blue/90 hover:scale-105 hover:shadow-lg hover:shadow-brand-blue/50 active:scale-100 backdrop-blur-sm border border-brand-blue/20 flex items-center justify-center gap-2"
              >
                <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                <span className="whitespace-nowrap">Join The Chaos</span>
              </a>

              <a
                href="#menu"
                className="group relative px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5 rounded-xl bg-brand-red text-white font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:bg-brand-red/90 hover:scale-105 hover:shadow-lg hover:shadow-brand-red/50 active:scale-100 backdrop-blur-sm border border-brand-red/20 flex items-center justify-center gap-2"
              >
                <Coffee className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                <span className="whitespace-nowrap">Refuel The Action</span>
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

