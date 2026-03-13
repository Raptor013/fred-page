import type { RefObject } from "react";

type HeroSectionProps = {
  allowMotion: boolean;
  heroRef: RefObject<HTMLElement | null>;
  heroContentRef: RefObject<HTMLDivElement | null>;
  heroGlowRef: RefObject<HTMLDivElement | null>;
};

export function HeroSection({
  allowMotion,
  heroRef,
  heroContentRef,
  heroGlowRef,
}: HeroSectionProps) {
  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-10 sm:px-8 lg:px-12"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#000_0%,#000_100%)]" />
      <div
        ref={heroGlowRef}
        className="absolute inset-0 transition-transform duration-300 ease-out"
      >
        <div
          className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,60,0.38),transparent_34%)] ${
            allowMotion ? "hero-glow hero-pulse" : ""
          }`}
        />
      </div>
      <div
        className={`noise pointer-events-none absolute inset-0 mix-blend-screen ${
          allowMotion ? "hero-noise opacity-20" : "opacity-12"
        }`}
      />
      <div
        ref={heroContentRef}
        className="relative z-10 flex w-full max-w-6xl flex-col items-center justify-center text-center will-change-transform"
      >
        <p
          className={`mb-5 text-[0.72rem] uppercase tracking-[0.48em] text-white/42 sm:mb-7 ${
            allowMotion ? "hero-subtitle-enter" : ""
          }`}
        >
          ARTISTA TATUADOR
        </p>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className={`hero-neon-backdrop absolute left-1/2 top-1/2 h-[30%] w-[78%] -translate-x-1/2 -translate-y-[46%] ${
              allowMotion ? "hero-neon-backdrop-animate" : ""
            }`}
          />
          <div
            aria-hidden="true"
            className={`hero-neon-reflection absolute left-1/2 top-[54%] h-[72%] w-[74%] -translate-x-1/2 -translate-y-1/2 ${
              allowMotion ? "hero-neon-reflection-animate" : ""
            }`}
          />
          <h1
            className="font-display relative text-[3.5rem] leading-[0.88] tracking-[-0.05em] text-white sm:text-[6.5rem] md:text-[8.5rem] lg:text-[11rem]"
          >
            <span
              className={`hero-neon-sign ${allowMotion ? "hero-neon-animate" : ""}`}
              data-text="SAUER.TATTOOS"
            >
              SAUER.TATTOOS
            </span>
          </h1>
        </div>
        <div className="mt-10 flex w-full max-w-md flex-col gap-4 sm:mt-12 sm:flex-row sm:justify-center">
          <a
            href="https://www.instagram.com/sauer.tattoos/"
            target="_blank"
            className={`brutal-button brutal-button-ghost ${allowMotion ? "hero-actions-enter" : ""}`}
          >
            VER PORTFÓLIO
          </a>
          <a
            href="#contato"
            className={`brutal-button brutal-button-ghost ${allowMotion ? "hero-actions-enter hero-actions-enter-delay" : ""}`}
          >
            AGENDAR
          </a>
        </div>
      </div>
    </section>
  );
}
