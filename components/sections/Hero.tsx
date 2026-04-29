import { Container } from "../ui/Container";
import { ArrowDown, Facebook, Instagram } from "../ui/Icons";
import { SOCIALS, STATS } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="domov"
      className="relative min-h-svh w-full overflow-hidden bg-bone text-ink pt-16 md:pt-20"
    >
      {/* Top-right red sash (corner accent only — below navbar) */}
      <div
        aria-hidden
        className="absolute top-16 md:top-20 right-0 h-[40%] md:h-[55%] w-[60%] md:w-[38%] bg-blood pointer-events-none"
        style={{
          clipPath: "polygon(35% 0, 100% 0, 100% 100%)",
        }}
      />
      {/* Bottom-right thin accent line */}
      <div
        aria-hidden
        className="absolute bottom-[20%] right-0 h-px w-1/2 md:w-1/3 bg-blood pointer-events-none"
      />

      {/* Decorative kanji */}
      <div
        aria-hidden
        className="absolute -left-6 md:left-4 top-[18%] select-none pointer-events-none"
      >
        <div className="text-[18rem] md:text-[26rem] leading-none font-serif text-ink/[0.04]">
          空
        </div>
      </div>
      <div
        aria-hidden
        className="absolute right-[12%] md:right-[20%] bottom-8 select-none pointer-events-none"
      >
        <div className="text-[12rem] md:text-[20rem] leading-none font-serif text-ink/[0.05]">
          手
        </div>
      </div>

      {/* Grid lines */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0a0a0a 1px, transparent 1px), linear-gradient(to bottom, #0a0a0a 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <Container size="wide" className="relative z-10 pt-12 md:pt-20 pb-24 md:pb-32">
        <div className="flex flex-col gap-8 md:gap-14">
          {/* Eyebrow */}
          <div className="flex items-center gap-4">
            <span
              className="block h-px w-12 bg-ink"
              style={{
                animation:
                  "strike 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both",
              }}
            />
            <span
              className="label text-ink/70"
              style={{
                animation:
                  "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both",
              }}
            >
              Est. 1971 · Klub leta 2022
            </span>
          </div>

          {/* Headline */}
          <h1 className="display-tight text-[clamp(3.5rem,16vw,15rem)]">
            <span
              className="block"
              style={{
                animation:
                  "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both",
              }}
            >
              Karate
            </span>
            <span
              className="block text-ink/30"
              style={{
                animation:
                  "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.7s both",
              }}
            >
              Klub
            </span>
            <span
              className="block text-blood -mt-2 md:-mt-4"
              style={{
                animation:
                  "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.9s both",
              }}
            >
              Ljubljana
            </span>
          </h1>

          {/* Sub-row: tagline + CTA */}
          <div
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end mt-2 md:mt-6"
            style={{
              animation:
                "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) 1.1s both",
            }}
          >
            <div className="md:col-span-7 lg:col-span-6">
              <p className="text-pretty text-base md:text-xl leading-relaxed max-w-xl text-ink/80">
                <span className="display text-blood text-2xl md:text-3xl block mb-3">
                  Več kot le klub.
                </span>
                Eden najstarejših slovenskih karate klubov. Vadba za otroke,
                rekreativce in vrhunske tekmovalce — pod vodstvom najboljših
                trenerjev v državi.
              </p>

              <div className="mt-6 md:mt-8 flex items-center gap-4">
                <span className="label text-ink/50">/ Sledi nam</span>
                <span className="h-px w-8 bg-ink/20" />
                <div className="flex items-center gap-2">
                  <a
                    href={SOCIALS.facebook}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="inline-flex items-center justify-center w-10 h-10 border border-ink/20 text-ink hover:bg-ink hover:text-bone hover:border-ink transition-colors"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href={SOCIALS.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="inline-flex items-center justify-center w-10 h-10 border border-ink/20 text-ink hover:bg-blood hover:text-bone hover:border-blood transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 lg:col-span-6 flex flex-col md:flex-row gap-3 md:justify-end">
              <a
                href="#ponudba"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 label bg-ink text-bone border border-ink hover:bg-blood hover:border-blood transition-all duration-300"
              >
                Začni vaditi
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#urnik"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 label bg-transparent text-ink border border-ink/20 hover:border-ink hover:bg-ink hover:text-bone transition-all duration-300"
              >
                Poglej urnik
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Stats strip — bottom */}
      <div className="relative z-10 border-t-2 border-ink bg-ink text-bone">
        <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-bone/10">
            {STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className="py-6 md:py-8 px-4 md:px-6 first:pl-0 last:pr-0"
                style={{
                  animation: `fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${1.2 + idx * 0.1}s both`,
                }}
              >
                <div className="display text-4xl md:text-6xl text-bone">
                  {stat.value}
                </div>
                <div className="label text-bone/50 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="/o-nas"
        aria-label="Pomakni se navzdol"
        className="hidden md:flex absolute bottom-44 right-6 lg:right-12 z-10 flex-col items-center gap-3 text-ink/40 hover:text-blood transition-colors"
        style={{
          animation:
            "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) 1.6s both",
        }}
      >
        <span
          className="label vertical-text"
          style={{ writingMode: "vertical-rl" }}
        >
          Spoznaj nas
        </span>
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
