"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sparkles, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
const StaggeredMenu = dynamic(() => import("@/components/StaggeredMenu"));

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { href: "#about", label: "The Vibe" },
    { href: "#menu", label: "Menu & Drinks" },
    { href: "#games", label: "The Arsenal" },
    { href: "#gallery", label: "Madness" },
    { href: "#location", label: "Location" },
    { href: "#book", label: "Join" },
  ];

  useEffect(() => {
    // 1. Handle Header Background on Scroll (Throttled)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Add passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    // 2. Handle Active Section with IntersectionObserver
    const options = {
      root: null,
      rootMargin: "-10% 0px -45% 0px", // Offset to trigger roughly in middle-top of screen
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // We need to ensure we're setting the id with `#` prefix to match navLinks
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    // Observe all sections defined in navLinks
    const sections = navLinks.map(link => link.href.substring(1)); // remove #
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);



  return (
    <header className={cn(
      "fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out",
      scrolled ? "top-0 backdrop-blur-md" : "top-4"
    )}>
      {/* Full width blur background when scrolled */}
      {scrolled && (
        <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md" />
      )}

      <div className={cn(
        "relative mx-auto flex items-center justify-between px-4 py-0 transition-all duration-300",
        scrolled ? "w-full max-w-full py-0" : "w-[95%] max-w-5xl py-0.5"
      )}>
        <div
          className={cn(
            "relative flex items-center justify-between w-full px-4 py-0 rounded-2xl border border-white/10 shadow-2xl transition-all duration-300",
            scrolled ? "bg-transparent py-0 border-none shadow-none" : "bg-zinc-950/70 py-0.5"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group relative z-50 shrink-0 !m-0 !p-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative w-24 h-16 md:w-32 md:h-20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 !m-0 !p-0">
              <Image
                src="/logo.webp"
                alt="PIXEL & PLAY Logo"
                width={128}
                height={80}
                className="object-contain"
                priority
                sizes="(max-width: 768px) 96px, 128px"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2 !m-0 !p-0">
            {navLinks.slice(0, -1).map((link) => {
              const isActive = activeSection === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-5 py-1.5 text-xs md:text-sm font-medium transition-all duration-500 rounded-full border backdrop-blur-sm whitespace-nowrap flex items-center",
                    isActive
                      ? "bg-brand-blue text-white border-brand-blue shadow-[0_0_20px_-5px_rgba(27,79,216,0.3)] scale-105"
                      : "bg-brand-red/80 text-white border-brand-red/50 hover:bg-brand-red hover:border-brand-red hover:scale-105"
                  )}
                  style={{ height: 'fit-content', minHeight: 'auto' }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 shrink-0">

            {/* Secure Your Spot Button - Desktop */}
            <Link
              href="#book"
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-blue via-brand-blue/90 to-brand-blue font-semibold text-xs md:text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(27,79,216,0.5)] border border-brand-blue/30 backdrop-blur-sm whitespace-nowrap"
            >
              <Calendar size={14} className="shrink-0" />
              <span>Secure Your Spot</span>
            </Link>

            {/* Mobile Menu */}
            <div className="lg:hidden flex items-center">
              <StaggeredMenu
                items={navLinks.map(link => ({ label: link.label, link: link.href, ariaLabel: link.label }))}
                displaySocials={false}
                menuButtonColor="#fff"
                openMenuButtonColor="#fff"
                accentColor="#3B82F6"
                changeMenuColorOnOpen={true}
                closeOnClickAway={true}
                activeSection={activeSection}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

