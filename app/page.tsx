// Eager load critical above-the-fold components
import HeroSection from "@/components/HeroSection";

import ClientSections from "@/components/ClientSections";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ClientSections />
    </>
  );
}

