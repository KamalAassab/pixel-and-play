"use client";

import dynamic from "next/dynamic";

// Lazy load heavy components below the fold
const MenuSection = dynamic(() => import("@/components/MenuSection"), {
    loading: () => <div className="min-h-screen" />,
    ssr: false,
});

const GamesSection = dynamic(() => import("@/components/GamesSection"), {
    loading: () => <div className="min-h-screen" />,
    ssr: false,
});

const GallerySection = dynamic(() => import("@/components/GallerySection"), {
    loading: () => <div className="min-h-screen" />,
    ssr: false,
});

const FAQSection = dynamic(() => import("@/components/FAQSection"), {
    loading: () => null,
    ssr: false,
});

const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"), {
    loading: () => null,
    ssr: false,
});

const ContactSection = dynamic(() => import("@/components/ContactSection"), {
    loading: () => <div className="min-h-screen" />,
    ssr: false,
});

const BookingSection = dynamic(() => import("@/components/BookingSection"), {
    loading: () => <div className="h-[85vh] bg-zinc-950" />,
    ssr: false,
});

const AboutSection = dynamic(() => import("@/components/AboutSection"), {
    loading: () => <div className="min-h-screen" />,
    ssr: false,
});

export default function ClientSections() {
    return (
        <>
            <AboutSection />
            <MenuSection />
            <GamesSection />
            <GallerySection />
            <FAQSection />
            <TestimonialsSection />
            <ContactSection />
            <BookingSection />
        </>
    );
}
