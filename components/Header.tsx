"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sparkles, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import StaggeredMenu from "@/components/StaggeredMenu";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section for highlighting
      const sections = ["#about", "#menu", "#games", "#gallery", "#location", "#book"];
      const current = sections.find((section) => {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "The Vibe" },
    { href: "#menu", label: "Menu & Drinks" },
    { href: "#games", label: "The Arsenal" },
    { href: "#gallery", label: "Madness" },
    { href: "#location", label: "Location" },
    { href: "#book", label: "Join" },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 transition-all duration-500 ease-in-out">
      <div
        className={cn(
          "relative flex items-center justify-between px-4 py-0 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl transition-all duration-300",
          scrolled ? "bg-zinc-950/90 py-0" : "bg-zinc-950/70 py-0.5"
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
            />
          </div>
        </div>
      </div>
    </header>
  );
}

