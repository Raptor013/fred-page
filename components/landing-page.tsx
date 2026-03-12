"use client";

import { useEffect, useRef, useState } from "react";
import { AboutSection } from "./landing/about-section";
import { ContactSection } from "./landing/contact-section";
import { FooterSection } from "./landing/footer-section";
import { HeroSection } from "./landing/hero-section";
import { LocationSection } from "./landing/location-section";
import { PortfolioSection } from "./landing/portfolio-section";
import { ProcessSection } from "./landing/process-section";
import { QuoteCtaSection } from "./landing/quote-cta-section";
import { StylesSection } from "./landing/styles-section";
import { TattooCareSection } from "./landing/tattoo-care-section";

export function LandingPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const heroGlowRef = useRef<HTMLDivElement | null>(null);
  const [allowMotion, setAllowMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setAllowMotion(!mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () =>
      mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!allowMotion) {
      return;
    }

    let ticking = false;

    const updateParallax = () => {
      ticking = false;

      if (!heroRef.current || !heroContentRef.current || !heroGlowRef.current) {
        return;
      }

      const rect = heroRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = Math.max(-1, Math.min(1, rect.top / viewportHeight));

      heroContentRef.current.style.transform = `translate3d(0, ${progress * -18}px, 0)`;
      heroGlowRef.current.style.transform = `translate3d(0, ${progress * -10}px, 0) scale(${1 + Math.abs(progress) * 0.04})`;
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [allowMotion]);

  return (
    <main className="bg-black text-white">
      <HeroSection
        allowMotion={allowMotion}
        heroRef={heroRef}
        heroContentRef={heroContentRef}
        heroGlowRef={heroGlowRef}
      />
      <AboutSection />
      <PortfolioSection />
      <StylesSection />
      <QuoteCtaSection />
      <ProcessSection />
      <TattooCareSection />
      <ContactSection />
      <LocationSection />
      <FooterSection />
    </main>
  );
}
