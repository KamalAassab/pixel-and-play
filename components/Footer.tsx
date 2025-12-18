"use client";

import {
  Heart,
  Info,
  Coffee,
  Gamepad2,
  Image as ImageIcon,
  MapPin,
  Calendar
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-10 border-t border-white/5 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-blue/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center">

          {/* Logo Circle */}
          {/* Logo - Big & Clean */}
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group mb-4 relative h-auto w-48 md:w-60 block cursor-pointer"
          >
            <Image
              src="/logo.webp"
              alt="Pixel & Play Logo"
              width={240}
              height={240}
              className="object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="mb-12 w-full max-w-7xl">
            <div className="grid grid-cols-3 gap-2 md:flex md:flex-wrap md:justify-center md:gap-3">
              {[
                { label: "The Vibe", href: "#about", icon: Info, color: "blue" },
                { label: "Menu & Drinks", href: "#menu", icon: Coffee, color: "red" },
                { label: "The Arsenal", href: "#games", icon: Gamepad2, color: "blue" },
                { label: "Madness", href: "#gallery", icon: ImageIcon, color: "red" },
                { label: "Location", href: "#location", icon: MapPin, color: "blue" },
                { label: "Join", href: "#book", icon: Calendar, color: "red" },
              ].map((link) => {
                const isBlue = link.color === "blue";
                const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  const targetId = link.href.substring(1);
                  const element = document.getElementById(targetId);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                };

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={handleClick}
                    className={cn(
                      "group relative flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-4 py-2 rounded-full border backdrop-blur-sm whitespace-nowrap transition-all duration-300 hover:scale-105 w-full md:w-auto",
                      isBlue
                        ? "bg-brand-blue/10 border-brand-blue/30 text-zinc-300 hover:bg-brand-blue/20 hover:border-brand-blue/50 hover:text-white hover:shadow-[0_0_15px_rgba(27,79,216,0.4)]"
                        : "bg-brand-red/10 border-brand-red/30 text-zinc-300 hover:bg-brand-red/20 hover:border-brand-red/50 hover:text-white hover:shadow-[0_0_15px_rgba(255,87,87,0.4)]"
                    )}
                  >
                    <link.icon size={12} className={cn(
                      "transition-colors relative z-10 md:w-3.5 md:h-3.5",
                      isBlue ? "text-brand-blue/80 group-hover:text-brand-blue" : "text-brand-red/80 group-hover:text-brand-red"
                    )} />
                    <span className="text-[10px] md:text-sm font-semibold tracking-wide uppercase relative z-10">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Social Media Buttons */}
          <div className="mb-8 flex space-x-4">
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

          {/* Copyright & Credits */}
          <div className="text-center space-y-2">
            <p className="text-sm text-zinc-500 font-bold">
              © {currentYear} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-red-600">PIXEL & PLAY</span>. All rights reserved.
            </p>
            <p className="text-xs text-zinc-600 flex items-center justify-center gap-1 font-bold">
              Designed with <Heart size={10} className="text-brand-red fill-brand-red" /> by
              <a href="https://kamal-aassab.vercel.app" target="_blank" className="text-brand-red hover:text-red-400 transition-colors"> KAMAL AASSAB</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
