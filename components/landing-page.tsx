"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const styles: { title: string; description: string }[] = [
  {
    title: "BLACKWORK",
    description:
      "Linhas sólidas, sombras profundas e composições marcantes que transformam a pele em uma tela de impacto visual. Cada peça é pensada para criar presença, intensidade e significado, explorando o poder do preto em sua forma mais expressiva.",
  },
  {
    title: "REALISMO",
    description:
      "Retratos, símbolos e elementos da vida real ganham forma na pele através de técnicas avançadas de sombra e profundidade, criando tatuagens que parecem vivas e carregadas de significado.",
  },
  {
    title: "CUSTOM PROJECTS",
    description:
      "Aqui não existem modelos prontos: o processo começa na conversa, evolui no desenho e termina em uma tatuagem exclusiva, criada para refletir a história, a identidade e a visão de quem a carrega.",
  },
  {
    title: "LARGE SCALE",
    description:
      "Braços fechados, costas, pernas ou composições completas exigem planejamento artístico e técnico para que cada elemento se conecte e forme uma obra única em grande escala.",
  },
];

const processSteps = [
  {
    index: "01",
    title: "IDEIA",
    text: "Referência, conceito e intenção antes da agulha tocar a pele.",
  },
  {
    index: "02",
    title: "DESIGN",
    text: "Composição autoral, escala precisa e leitura do corpo em movimento.",
  },
  {
    index: "03",
    title: "SESSÃO",
    text: "Execução firme, contraste alto e foco absoluto em acabamento.",
  },
  {
    index: "04",
    title: "CICATRIZAÇÃO",
    text: "Orientação clara para preservar preto, textura e definição.",
  },
];

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
            className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,60,0.22),transparent_34%)] ${
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
          <h1
            className={`font-display text-[4.2rem] leading-[0.88] tracking-[-0.05em] text-white sm:text-[6.5rem] md:text-[8.5rem] lg:text-[11rem] ${
              allowMotion ? "hero-title-enter" : ""
            }`}
          >
            SAUER.TATTOOS
          </h1>
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

      <section className="section-frame px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">ESTILOS</p>
            <h2 className="font-display mt-3 text-4xl leading-none tracking-[-0.04em] sm:text-6xl">
              Linguagens que carregam assinatura.
            </h2>
          </div>
        </div>

        <div className="grid gap-px bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
          {styles.map((style, index) => (
            <article
              key={style.title}
              className="group bg-black p-6 transition-colors duration-300 hover:bg-[#090909]"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-5xl text-white/18 transition-colors duration-300 group-hover:text-[#ff003c]">
                  0{index + 1}
                </span>
                <span className="mt-2 h-3 w-12 bg-white/12 transition-all duration-300 group-hover:w-20 group-hover:bg-[#ff003c]" />
              </div>
              <h3 className="mt-14 font-display text-3xl leading-none tracking-[-0.04em]">
                {style.title}
              </h3>
              <p className="mt-4 max-w-xs text-sm leading-6 text-white/54">
                {style.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-frame px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="section-kicker">PROCESSO</p>
            <h2 className="font-display mt-3 text-4xl leading-none tracking-[-0.04em] sm:text-6xl">
              Do conceito ao preto curado.
            </h2>
          </div>
          <div className="grid gap-px bg-white/10">
            {processSteps.map((step) => (
              <div
                key={step.title}
                className="grid gap-5 bg-black px-5 py-6 transition-colors duration-300 hover:bg-[#080808] sm:grid-cols-[110px_1fr_auto] sm:items-center"
              >
                <span className="font-display text-3xl text-[#ff003c]">
                  {step.index}
                </span>
                <div>
                  <h3 className="font-display text-2xl tracking-[-0.04em]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/56">
                    {step.text}
                  </p>
                </div>
                <span className="hidden h-px w-24 bg-white/15 sm:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-frame px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="space-y-6">
              <p className="section-kicker">SOBRE O ARTISTA</p>

              <h2 className="font-display text-4xl leading-none tracking-[-0.04em] sm:text-5xl">
                Onde a alma toca a pele.
                <br />
                Arte com propósito.
              </h2>

              <p className="max-w-md text-sm leading-7 text-white/58 sm:text-base">
                Um trabalho autoral construído entre técnica, identidade e
                permanência. Cada projeto nasce para traduzir histórias reais em
                tatuagens com presença e significado.
              </p>

              <div className="border-l border-white/10 pl-5 pt-4">
                <p className="font-display text-5xl leading-none text-[#ff003c]">
                  100+
                </p>
                <p className="mt-3 text-[0.68rem] uppercase tracking-[0.28em] text-white/42">
                  projetos concluídos
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="space-y-8">
                <p className="max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                  Fred Sauer é um tatuador carioca que transformou uma vida
                  inteira dedicada à arte em tatuagens autorais e profundamente
                  personalizadas. Com influências do realismo e técnicas como
                  whip shading e free hand, seu trabalho busca traduzir
                  histórias, ideias e identidades em arte permanente na pele.
                </p>

                <p className="text-sm uppercase tracking-[0.32em] text-white/38">
                  Algumas histórias precisam ser eternas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contato"
        className="section-frame px-6 py-20 sm:px-8 lg:px-12 lg:py-24"
      >
        <div className="relative overflow-hidden border border-[#ff003c]/40 bg-[#040404] px-6 py-10 shadow-[0_0_45px_rgba(255,0,60,0.12)] sm:px-8 sm:py-12 lg:px-12">
          <div className="absolute right-0 top-0 h-2 w-32 bg-[#ff003c] shadow-[0_0_24px_rgba(255,0,60,0.95)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,60,0.16),transparent_26%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              {/* <p className="section-kicker text-[#ff8aa7]">CTA FINAL</p> */}
              <h2 className="font-display mt-3 max-w-3xl text-4xl leading-none tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                Sua próxima tattoo começa aqui.
              </h2>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <a
                href="https://api.whatsapp.com/send/?phone=5521971795647&text=Oi%2C+vim+pelo+site+e+gostaria+de+realizar+um+or%C3%A7amento&type=phone_number&app_absent=0"
                target="_blank"
                className="brutal-button brutal-button-primary"
              >
                WhatsApp
              </a>
              <a
                href="https://instagram.com/sauer.tattoos"
                target="_blank"
                className="brutal-button brutal-button-secondary"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="section-frame border-t border-white/10 px-6 py-6 text-xs uppercase tracking-[0.28em] text-white/45 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a
              href="https://instagram.com/sauer.tattoos"
              className="transition-colors hover:text-white"
              target="_blank"
            >
              Instagram
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=5521971795647&text=Oi%2C+vim+pelo+site+e+gostaria+de+realizar+um+or%C3%A7amento&type=phone_number&app_absent=0"
              target="_blank"
              className="transition-colors hover:text-white"
            >
              WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-3">
            <p>© 2026 sauer.tattoos</p>
            <Image
              src="/raptor.png"
              alt="Raptor"
              width={28}
              height={28}
              className="opacity-40"
            />
          </div>
        </div>
      </footer>
    </main>
  );
}
