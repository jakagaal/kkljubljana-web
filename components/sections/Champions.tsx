import Image from "next/image";
import {
  COMPETITION_STATS,
  COMPETITORS,
  GROUP_PHOTOS,
  type Competitor,
} from "@/lib/data";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { clsx } from "@/lib/clsx";

export function Champions() {
  return (
    <section className="relative bg-bone overflow-hidden">
      {/* Decorative kanji */}
      <div
        aria-hidden
        className="absolute -left-12 top-[42%] select-none pointer-events-none"
      >
        <div className="text-[18rem] md:text-[28rem] leading-none font-serif text-ink/[0.04]">
          勝
        </div>
      </div>

      <div className="pt-16 md:pt-24">
        <SectionHeader
          number="04"
          eyebrow="Naši tekmovalci"
          title="Šampioni"
          description="Več kot 50 državnih naslovov, prva medalja za samostojno Slovenijo na svetovnem prvenstvu, in nova generacija mednarodnih tekmovalcev. Vsi se rodijo na tatamiju."
        />
      </div>

      <Container size="wide" className="relative z-10">
        {/* Hero team photo */}
        <Reveal>
          <HeroTeamPhoto />
        </Reveal>

        {/* Stats band */}
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-ink/10 border-y border-ink/15 mt-16 md:mt-24 mb-16 md:mb-24">
            {COMPETITION_STATS.map((s, idx) => (
              <div
                key={s.label}
                className={clsx(
                  "py-7 md:py-10 px-5",
                  idx === 0 && "border-l-0",
                )}
              >
                <div className="display-tight text-5xl md:text-7xl text-blood">
                  {s.value}
                </div>
                <div className="label text-ink/60 mt-2">{s.label}</div>
                <div className="font-mono text-[0.65rem] text-ink/40 mt-1 tracking-wide">
                  {s.note}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Competitor grid */}
        <Reveal>
          <div className="flex items-baseline gap-4 mb-8 md:mb-12">
            <span className="label text-blood">/ Postava</span>
            <span className="h-px flex-1 bg-ink/20" />
            <span className="label text-ink/40">
              {COMPETITORS.length} TEKMOVALCEV
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-ink/10 border border-ink/10">
          {COMPETITORS.map((c, idx) => (
            <Reveal key={c.slug} delay={idx * 60}>
              <CompetitorCard competitor={c} />
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Group photo gallery — full bleed */}
      <div className="mt-20 md:mt-32 bg-ink text-bone py-20 md:py-28 relative">
        <Container size="wide">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-10 md:mb-14">
              <span className="label text-blood">/ Ekipa</span>
              <span className="h-px flex-1 bg-bone/20" />
              <span className="label text-bone/40">
                {GROUP_PHOTOS.length} FOTOGRAFIJ
              </span>
            </div>
            <h3 className="display-tight text-[clamp(2.5rem,7vw,6rem)] leading-[0.85] mb-12 md:mb-16 max-w-4xl text-balance">
              Skupaj na tatamiju.
              <br />
              <span className="text-blood">Skupaj na zmagovalnem odru.</span>
            </h3>
          </Reveal>
        </Container>

        <Container size="wide">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
              {/* Big featured */}
              <figure className="relative md:col-span-7 aspect-[4/3] overflow-hidden bg-coal group">
                <Image
                  src={GROUP_PHOTOS[1].src}
                  alt={GROUP_PHOTOS[1].caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute bottom-4 left-4 right-4 label text-bone/90 bg-ink/60 backdrop-blur-sm px-3 py-2">
                  {GROUP_PHOTOS[1].caption}
                </figcaption>
              </figure>

              <figure className="relative md:col-span-5 aspect-[4/3] md:aspect-auto overflow-hidden bg-coal group">
                <Image
                  src={GROUP_PHOTOS[0].src}
                  alt={GROUP_PHOTOS[0].caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute bottom-4 left-4 right-4 label text-bone/90 bg-blood/80 backdrop-blur-sm px-3 py-2">
                  {GROUP_PHOTOS[0].caption}
                </figcaption>
              </figure>

              {GROUP_PHOTOS.slice(2).map((p) => (
                <figure
                  key={p.src}
                  className="relative md:col-span-4 aspect-[4/3] overflow-hidden bg-coal group"
                >
                  <Image
                    src={p.src}
                    alt={p.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <figcaption className="absolute bottom-3 left-3 right-3 label text-bone/90 bg-ink/60 backdrop-blur-sm px-3 py-1.5 text-[0.65rem]">
                    {p.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </Container>
      </div>

      {/* CTA */}
      <Container size="wide" className="py-16 md:py-24 relative z-10">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <p className="md:col-span-9 display text-2xl md:text-4xl leading-[1] text-balance">
              Želiš postati naslednji v vrsti?{" "}
              <span className="text-blood">
                Pridruži se tekmovalni skupini.
              </span>
            </p>
            <a
              href="/#kontakt"
              className="md:col-span-3 group inline-flex items-center justify-center gap-2 px-6 py-5 label bg-ink text-bone hover:bg-blood transition-colors"
            >
              Postani tekmovalec →
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function HeroTeamPhoto() {
  return (
    <div className="relative mt-4 md:mt-10">
      {/* Editorial header strip */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5 md:mb-7 pb-4 border-b border-ink/15">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[0.7rem] tracking-[0.2em] text-blood uppercase">
            ★ Archive
          </span>
          <span className="font-mono text-[0.7rem] tracking-[0.2em] text-ink/40 uppercase">
            01 — Tekmovalna skupina
          </span>
        </div>
        <span className="font-mono text-[0.7rem] tracking-[0.2em] text-ink/40 uppercase">
          Ljubljana · 2026
        </span>
      </div>

      <div className="grid grid-cols-12 gap-3 md:gap-5 lg:gap-6">
        {/* Big portrait team photo — natural aspect */}
        <figure className="col-span-12 lg:col-span-7 relative aspect-[3/4] overflow-hidden bg-coal">
          <Image
            src="/competitors/group/5.jpg"
            alt="Tekmovalna ekipa Karate Kluba Ljubljana z osvojenimi medaljami"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            priority
            className="object-cover"
          />
          {/* Plate label */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-ink/90 backdrop-blur-sm px-3 py-1.5">
            <span className="block w-1.5 h-1.5 bg-blood" />
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-bone uppercase">
              Plate / 01
            </span>
          </div>
          {/* Bottom legend */}
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent p-5 md:p-7">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <span className="font-mono text-[0.7rem] tracking-[0.2em] text-blood block mb-2 uppercase">
                  / Cover photo
                </span>
                <h3 className="display-tight text-bone text-3xl md:text-5xl leading-[0.85] text-balance">
                  Postava
                  <br />
                  <span className="text-blood">z medaljami.</span>
                </h3>
              </div>
              <span className="font-mono text-[0.65rem] tracking-[0.2em] text-bone/50 uppercase whitespace-nowrap">
                Foto · Studio KKL
              </span>
            </div>
          </figcaption>
        </figure>

        {/* Right column — stacked editorial */}
        <div className="col-span-12 lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-3 md:gap-5 lg:gap-6">
          {/* Editorial pull — big year */}
          <div className="col-span-2 lg:col-span-1 relative bg-ink text-bone p-7 md:p-9 overflow-hidden">
            <span
              aria-hidden
              className="absolute -bottom-12 -right-6 text-[16rem] leading-none font-serif text-bone/[0.05] select-none pointer-events-none"
            >
              勝
            </span>
            <div className="relative">
              <span className="font-mono text-[0.7rem] tracking-[0.2em] text-blood uppercase">
                / Generacija
              </span>
              <div className="display-tight text-[clamp(4.5rem,11vw,9rem)] leading-[0.82] text-balance mt-3 mb-4">
                <span className="text-bone">20</span>
                <span className="text-blood">26</span>
              </div>
              <div className="h-px w-12 bg-blood mb-5" />
              <p className="text-sm md:text-base leading-relaxed text-bone/70 text-pretty max-w-sm">
                Nova mednarodna postava — kata in kumite specialisti pod
                vodstvom trenerjev z evropskimi izkušnjami.
              </p>
            </div>
          </div>

          {/* Secondary photo — landscape duo */}
          <figure className="col-span-1 lg:col-span-1 relative aspect-[4/5] lg:aspect-[3/2] overflow-hidden bg-coal">
            <Image
              src="/competitors/group/1.jpg"
              alt="Tekmovalca v studijskem portretu"
              fill
              sizes="(max-width: 1024px) 50vw, 35vw"
              className="object-cover"
            />
            <figcaption className="absolute top-3 left-3 bg-blood/95 backdrop-blur-sm px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.2em] text-bone uppercase">
              Plate / 02
            </figcaption>
          </figure>

          {/* Stat block — count */}
          <div className="col-span-1 lg:col-span-1 relative border border-ink p-6 md:p-7 flex flex-col justify-between bg-bone overflow-hidden">
            <div
              aria-hidden
              className="absolute -top-2 right-2 w-3 h-3 bg-blood"
            />
            <span className="font-mono text-[0.7rem] tracking-[0.2em] text-blood uppercase">
              / Postava
            </span>
            <div className="my-2">
              <div className="display-tight text-[clamp(4.5rem,9vw,7rem)] leading-[0.82] text-balance">
                {COMPETITORS.length}
              </div>
              <div className="font-mono text-[0.7rem] tracking-[0.2em] text-ink/50 uppercase mt-1">
                Aktivnih tekmovalcev
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-ink/15 pt-4">
              <span className="font-mono text-[0.65rem] tracking-[0.2em] text-ink/40 uppercase">
                Sezona
              </span>
              <span className="font-mono text-sm font-bold tracking-wider">
                25/26
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom caption row */}
      <div className="mt-5 md:mt-7 pt-4 border-t border-ink/15 flex flex-wrap items-baseline justify-between gap-3">
        <span className="font-mono text-[0.7rem] tracking-[0.2em] text-ink/50 uppercase">
          / Naša ekipa · {COMPETITORS.length} tekmovalcev
        </span>
        <span className="font-mono text-[0.7rem] tracking-[0.2em] text-ink/40 uppercase">
          Editorial · 2026
        </span>
      </div>
    </div>
  );
}

function CompetitorCard({ competitor }: { competitor: Competitor }) {
  return (
    <article className="group relative bg-bone flex flex-col h-full">
      {/* Photo carousel — show first photo, second on hover */}
      <div className="relative aspect-[3/4] overflow-hidden bg-coal">
        <Image
          src={competitor.photos[0]}
          alt={competitor.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
        />
        {competitor.photos[1] ? (
          <Image
            src={competitor.photos[1]}
            alt={`${competitor.name} — alternativni portret`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
          />
        ) : null}

        {/* Bottom name overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-4 md:p-5">
          <h3 className="display text-2xl md:text-[1.7rem] text-bone leading-[0.95] text-balance">
            {competitor.name}
          </h3>
          {competitor.era ? (
            <p className="label text-bone/60 mt-1.5">{competitor.era}</p>
          ) : null}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 md:p-6 flex flex-col flex-1">
        {competitor.achievements && competitor.achievements.length > 0 ? (
          <>
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-ink/40 uppercase block mb-3">
              / Dosežki
            </span>
            <ul className="space-y-2">
              {competitor.achievements.map((a, idx) => (
                <li
                  key={idx}
                  className="grid grid-cols-[2.4rem_1fr_auto] items-baseline gap-2 text-[0.78rem] leading-snug"
                >
                  <span className="font-mono text-[0.7rem] font-bold text-blood">
                    {a.year}
                  </span>
                  <span className="text-ink/80 text-pretty">
                    <span className="block">{a.event}</span>
                    <span className="block label text-ink/40 text-[0.6rem] mt-0.5">
                      {a.category}
                    </span>
                  </span>
                  <span className="label text-ink whitespace-nowrap">
                    {a.result}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </article>
  );
}
