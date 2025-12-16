"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sparkles } from "lucide-react";
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
    { href: "#about", label: "About" },
    { href: "#menu", label: "Menu" },
    { href: "#games", label: "Games" },
    { href: "#gallery", label: "Gallery" },
    { href: "#location", label: "Contact" },
    { href: "#book", label: "Book" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 ease-in-out",
        scrolled
          ? "glass-premium border-b border-white/10 backdrop-blur-xl bg-zinc-950/80 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between transition-[height] duration-300 ease-in-out",
            scrolled ? "h-16" : "h-28"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group relative z-50 h-full py-0 my-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className={cn(
                "relative h-full flex items-center transition-all duration-300 ease-in-out hover:scale-105 active:scale-95",
                scrolled ? "w-24 md:w-28" : "w-32 md:w-40"
              )}
            >
              <Image
                src="/logo.webp"
                alt="PIXEL & PLAY Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 128px, 160px"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/60 backdrop-blur-xl px-2 py-2 rounded-full border border-white/10 shadow-lg">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full group hover:scale-105",
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <div
                      className="absolute inset-0 bg-brand-blue rounded-full shadow-lg shadow-brand-blue/25 animate-in fade-in duration-300"
                    />
                  )}
                  <div
                    className="absolute inset-0 bg-brand-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* CTA Button */}


            {/* Mobile Menu (Replaced with StaggeredMenu) */}
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
      </div>
    </header>
  );
}

