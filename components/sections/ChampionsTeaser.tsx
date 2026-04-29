import Image from "next/image";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { ArrowRight } from "../ui/Icons";
import { COMPETITORS, GROUP_PHOTOS } from "@/lib/data";

export function ChampionsTeaser() {
  // Featured photo strip — pick a few competitor portraits
  const strip = COMPETITORS.slice(0, 4).map((c) => ({
    src: c.photos[0],
    alt: c.name,
  }));

  return (
    <section
      id="tekmovalci"
      className="relative bg-ink text-bone py-20 md:py-28 overflow-hidden"
    >
      {/* Decorative kanji */}
      <div
        aria-hidden
        className="absolute -left-12 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.05]"
      >
        <div className="text-[18rem] md:text-[28rem] leading-none font-serif">
          勝
        </div>
      </div>

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
          {/* Photo collage */}
          <Reveal className="lg:col-span-6 order-2 lg:order-1">
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              <div className="relative col-span-2 aspect-[4/5] overflow-hidden bg-coal">
                <Image
                  src={GROUP_PHOTOS[0].src}
                  alt="Tekmovalna ekipa"
                  fill
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 label bg-blood text-bone px-2 py-1">
                  Ekipa
                </span>
              </div>
              <div className="grid grid-rows-2 gap-2 md:gap-3">
                {strip.slice(0, 2).map((p) => (
                  <div
                    key={p.src}
                    className="relative aspect-square overflow-hidden bg-coal"
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 1024px) 30vw, 15vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              {strip.slice(2, 4).map((p) => (
                <div
                  key={p.src}
                  className="relative aspect-[4/5] overflow-hidden bg-coal"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 1024px) 33vw, 16vw"
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="relative aspect-[4/5] overflow-hidden bg-blood flex items-end p-4 md:p-5">
                <div>
                  <span className="display-tight text-5xl md:text-7xl block leading-[0.85]">
                    {COMPETITORS.length}
                  </span>
                  <span className="label text-bone/80 mt-2 block">
                    Tekmovalcev
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Copy + CTA */}
          <Reveal className="lg:col-span-6 order-1 lg:order-2" delay={120}>
            <div className="flex items-center gap-4 mb-6">
              <span className="label text-blood">/ 04</span>
              <span className="h-px w-12 bg-bone/30" />
              <span className="label text-bone/60">Naši tekmovalci</span>
            </div>
            <h2 className="display-tight text-[clamp(2.75rem,7vw,6rem)] leading-[0.85] text-balance">
              Šampioni
              <br />
              <span className="text-blood">na tatamiju.</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-bone/70 max-w-xl mt-8 text-pretty">
              Več kot 50 državnih naslovov, prva medalja za samostojno
              Slovenijo na svetovnem prvenstvu, in nova generacija mednarodnih
              tekmovalcev. Spoznaj celotno postavo in pomembne dosežke.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="/tekmovalci"
                className="group inline-flex items-center justify-center gap-3 px-7 py-5 label bg-blood text-bone hover:bg-bone hover:text-ink transition-colors"
              >
                Spoznaj tekmovalce
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
              </a>
              <a
                href="/#kontakt"
                className="group inline-flex items-center justify-center gap-2 px-7 py-5 label bg-transparent text-bone border border-bone/30 hover:bg-bone hover:text-ink hover:border-bone transition-colors"
              >
                Postani tekmovalec
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
