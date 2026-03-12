import { portfolioItems } from "./data";

export function PortfolioSection() {
  return (
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
        {portfolioItems.map((item) => (
          <article key={item.title} className={`portfolio-card group ${item.frame}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${item.accent}`} />
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: item.artwork }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.18)_42%,rgba(0,0,0,0.98)_100%)]" />
            <div className="absolute inset-0 bg-[#ff003c]/0 transition-colors duration-500 group-hover:bg-[#ff003c]/18" />
            <div className="relative min-h-[30rem] md:min-h-0" />
            <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
              <div className="bg-black/45 px-4 py-3 backdrop-blur-[1px] sm:bg-transparent sm:px-0 sm:py-0">
                <h3 className="font-display text-[2rem] leading-none tracking-[-0.04em] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.95)] sm:text-5xl">
                  {item.title}
                </h3>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
