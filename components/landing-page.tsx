"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const portfolioItems = [
  {
    title: "A Aranha",
    type: "blackwork / full contrast",
    frame: "aspect-[4/5] md:aspect-[4/6]",
    accent: "from-[#140005] via-[#2b020f] to-black",
    artwork:
      "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.16), transparent 30%), linear-gradient(125deg, transparent 0 18%, rgba(255,255,255,0.08) 18% 21%, transparent 21% 45%, rgba(255,0,60,0.24) 45% 52%, transparent 52% 100%), linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.92))",
  },
  {
    title: "Médico da Peste",
    type: "realismo / shadowwork",
    frame: "aspect-[4/5] md:aspect-[4/5]",
    accent: "from-black via-[#170005] to-[#25000d]",
    artwork:
      "radial-gradient(circle at 65% 28%, rgba(255,255,255,0.22), transparent 24%), linear-gradient(160deg, transparent 0 28%, rgba(255,255,255,0.07) 28% 32%, transparent 32% 50%, rgba(255,0,60,0.28) 50% 56%, transparent 56% 100%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.94))",
  },
  {
    title: "Espantalho da Morte",
    type: "custom / vertical flow",
    frame: "aspect-[4/6] md:aspect-[4/7]",
    accent: "from-[#160208] via-black to-[#1c1c1c]",
    artwork:
      "radial-gradient(circle at 50% 18%, rgba(255,255,255,0.2), transparent 20%), linear-gradient(180deg, transparent 0 16%, rgba(255,255,255,0.06) 16% 20%, transparent 20% 38%, rgba(255,0,60,0.24) 38% 45%, transparent 45% 100%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.95))",
  },
  {
    title: "A Lacraia",
    type: "large scale / body project",
    frame: "aspect-[4/5] md:aspect-[4/6]",
    accent: "from-[#1a0007] via-[#090909] to-black",
    artwork:
      "radial-gradient(circle at 42% 34%, rgba(255,255,255,0.18), transparent 26%), linear-gradient(145deg, transparent 0 22%, rgba(255,255,255,0.06) 22% 26%, transparent 26% 54%, rgba(255,0,60,0.22) 54% 58%, transparent 58% 100%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.96))",
  },
];

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
          <h1
            className={`font-display text-[3.5rem] leading-[0.88] tracking-[-0.05em] text-white sm:text-[6.5rem] md:text-[8.5rem] lg:text-[11rem] ${
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

      <section
        id="portfolio"
        className="section-frame px-6 py-20 sm:px-8 lg:px-12 lg:py-24"
      >
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="section-kicker">PORTFÓLIO</p>
            <h2 className="font-display mt-3 max-w-xl text-4xl leading-none tracking-[-0.04em] sm:text-6xl">
              Galeria de projetos.
            </h2>
          </div>
          {/* <p className="max-w-lg justify-self-end text-sm leading-6 text-white/58 sm:text-base">
            Retratos verticais, cortes próximos e composição pensada para o
            enquadramento real de tatuagens no feed e no estúdio.
          </p> */}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {portfolioItems.map((item, index) => (
            <article
              key={item.title}
              className={`portfolio-card group ${item.frame}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.accent}`} />
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: item.artwork }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.15)_40%,rgba(0,0,0,0.95)_100%)]" />
              <div className="absolute inset-0 bg-[#ff003c]/0 transition-colors duration-500 group-hover:bg-[#ff003c]/18" />
              <div className="relative flex h-full min-h-[30rem] flex-col justify-between p-6 md:min-h-0">
                <div className="flex items-start justify-between gap-4">
                  <span className="border border-white/20 px-3 py-2 text-[0.65rem] uppercase tracking-[0.35em] text-white/70">
                    {item.type}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-[0.35em] text-white/40">
                    peça {index + 1}
                  </span>
                </div>
                <div className="translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  <h3 className="font-display text-3xl leading-none tracking-[-0.04em] sm:text-5xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm uppercase tracking-[0.28em] text-white/62">
                    preto profundo. brilho controlado. presença definitiva.
                  </p>
                </div>
              </div>
            </article>
          ))}
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

      <section className="section-frame px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Centro%2C+Rio%20de%20Janeiro%20-%20RJ"
            target="_blank"
            rel="noreferrer"
            className="group relative flex flex-col gap-6 overflow-hidden border border-[#ff003c]/30 bg-[linear-gradient(180deg,rgba(255,0,60,0.08),rgba(0,0,0,0.92))] px-6 py-8 transition-all duration-300 hover:border-[#ff003c]/70 hover:shadow-[0_0_36px_rgba(255,0,60,0.14)] sm:flex-row sm:items-center sm:justify-between sm:px-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,0,60,0.16),transparent_32%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#ff003c]/45 bg-[#140106] text-[#ff003c] shadow-[0_0_24px_rgba(255,0,60,0.18)]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-current"
                >
                  <path d="M12 2C8.135 2 5 5.135 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.865-3.135-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
                </svg>
              </span>
              <div>
                <p className="section-kicker text-[#ff8aa7]">ENDEREÇO</p>
                <h2 className="font-display mt-2 text-3xl leading-none tracking-[-0.04em] sm:text-4xl">
                  Centro, Rio de Janeiro
                </h2>
              </div>
            </div>

            <div className="relative flex items-center gap-4 self-start sm:self-center">
              <p className="max-w-xs text-sm uppercase tracking-[0.28em] text-white/58">
                abrir no google maps
              </p>
              <span className="h-px w-12 bg-[#ff003c]/55 transition-all duration-300 group-hover:w-20" />
            </div>
          </a>
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
