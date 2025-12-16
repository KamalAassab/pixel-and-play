import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Poppins, Anton } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { Providers } from "./providers";

import Header from "@/components/Header";
import Footer from "@/components/Footer";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#09090B",
};

export const metadata: Metadata = {
  title: {
    default: "Pixel & Play | Gaming Café Casablanca Maarif – PS5, Board Games & Coffee",
    template: "%s | Pixel & Play Gaming Café Casablanca",
  },
  description: "Pixel & Play – Premier gaming café in Casablanca Maarif. Play PS5, Xbox, Nintendo Switch & board games. Enjoy specialty coffee, crêpes & host birthday parties. Book your gaming session today!",
  keywords: [
    // Brand
    "Pixel and Play",
    "Pixel & Play",
    "pixel and play casablanca",
    "pixel and play maarif",

    // Gaming - Console
    "gaming café casablanca",
    "gaming café maarif",
    "café gaming casablanca",
    "PS5 casablanca",
    "PlayStation 5 casablanca",
    "PlayStation 5 café",
    "Xbox casablanca",
    "Xbox gaming café",
    "Nintendo Switch casablanca",
    "Nintendo Switch café",
    "console games casablanca",
    "jeux vidéo casablanca",
    "salle de jeux casablanca",

    // Board Games & Card Games
    "board games casablanca",
    "jeux de société casablanca",
    "card games casablanca",
    "jeux de cartes casablanca",
    "board game café",
    "tabletop games morocco",

    // Location
    "casablanca gaming",
    "maarif gaming",
    "café maarif casablanca",
    "gaming lounge casablanca",
    "game center casablanca",

    // Food & Drinks
    "gaming café coffee",
    "specialty coffee casablanca",
    "crêpes casablanca",
    "café avec jeux casablanca",

    // Events & Groups
    "birthday party casablanca",
    "anniversaire casablanca",
    "tournoi gaming casablanca",
    "gaming tournament morocco",
    "party venue casablanca",
    "group gaming casablanca",

    // Co-working
    "co-working casablanca",
    "coworking gaming casablanca",
    "espace coworking maarif",

    // Social & Experience
    "friends gaming casablanca",
    "gaming with friends",
    "game night casablanca",
    "soirée jeux casablanca",
    "family gaming café",
    "gaming lounge morocco",

    // General Gaming Terms
    "gaming",
    "gamer café",
    "esports casablanca",
    "video games café",
    "multiplayer gaming casablanca"
  ],
  authors: [{ name: "PIXEL & PLAY" }],
  creator: "PIXEL & PLAY",
  publisher: "PIXEL & PLAY",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.pixel-and-play.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "fr": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "PIXEL & PLAY",
    title: "Pixel & Play | Gaming Café Casablanca Maarif – PS5, Xbox, Nintendo & Board Games",
    description: "Premier gaming café in Casablanca Maarif. Play PS5, Xbox, Nintendo Switch, board games & card games. Specialty coffee, crêpes, birthday parties & gaming tournaments. Book now!",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "PIXEL & PLAY Gaming Café Casablanca – PS5, Nintendo Switch, Board Games",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixel & Play | Gaming Café Casablanca – PS5, Nintendo Switch & Board Games",
    description: "Gaming café in Casablanca Maarif. PS5, Xbox, Nintendo Switch, board games, specialty coffee & crêpes. Perfect for friends, birthdays & tournaments!",
    images: ["/logo.webp"],
    creator: "@pixelandplay",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Entertainment",
  classification: "Gaming Café",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/svg/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} ${poppins.variable} ${anton.variable} font-sans selection:bg-brand-blue selection:text-white relative overflow-x-hidden`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />

        </Providers>
      </body>
    </html>
  );
}
