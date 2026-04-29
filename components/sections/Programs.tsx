import { PROGRAMS, type Program } from "@/lib/data";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { ArrowRight } from "../ui/Icons";

export function Programs() {
  return (
    <section id="ponudba" className="relative py-24 md:py-40 bg-bone">
      <SectionHeader
        number="03"
        eyebrow="Kaj ponujamo"
        title="Strokoven pristop"
        description="Gibanje je sestavni del naših življenj, prijaznost pa vezivo, ki nam lepša življenje. Strokoven pristop tako k rekreaciji kot k vrhunskemu športu — že več kot 50 let."
      />

      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
          {PROGRAMS.map((program, idx) => (
            <Reveal key={program.number} delay={idx * 120}>
              <ProgramCard program={program} />
            </Reveal>
          ))}
        </div>

        {/* Pull-quote / philosophy band */}
        <Reveal>
          <div className="mt-20 md:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-2">
              <span className="display text-blood text-[7rem] leading-[0.7] block">
                &ldquo;
              </span>
            </div>
            <blockquote className="lg:col-span-10">
              <p className="display text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.05] text-balance">
                Tečaji karateja so organizirani za skupine otrok, stare od 4 do
                10 let, kjer so osredotočeni{" "}
                <span className="text-blood">
                  predvsem na ustrezen telesni in duševni razvoj
                </span>{" "}
                ter na podajanje vrednot kot sta kultura obnašanja in poštenost.
              </p>
              <footer className="label text-ink/50 mt-8">
                — Filozofija kluba
              </footer>
            </blockquote>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="group relative h-full flex flex-col bg-bone p-8 md:p-10 hover:bg-ink hover:text-bone transition-colors duration-500 cursor-default">
      {/* Number */}
      <div className="flex items-start justify-between mb-10 md:mb-14">
        <span className="display-tight text-7xl md:text-8xl text-ink/10 group-hover:text-blood transition-colors">
          {program.number}
        </span>
        <ArrowRight
          className="h-5 w-5 mt-3 text-ink/30 group-hover:text-bone transition-all duration-500 group-hover:translate-x-1"
          strokeWidth={1.8}
        />
      </div>

      <span className="label text-blood mb-3">{program.ageRange}</span>

      <h3 className="display text-3xl md:text-4xl leading-[0.95] mb-5 text-balance">
        {program.title}
      </h3>

      <p className="text-base leading-relaxed text-ink/70 group-hover:text-bone/70 transition-colors mb-8 text-pretty">
        {program.description}
      </p>

      <ul className="mt-auto space-y-2 border-t border-ink/10 group-hover:border-bone/20 pt-6 transition-colors">
        {program.highlights.map((h) => (
          <li
            key={h}
            className="flex items-center gap-3 text-sm text-ink/70 group-hover:text-bone/80 transition-colors"
          >
            <span className="block h-px w-4 bg-blood" />
            {h}
          </li>
        ))}
      </ul>
    </article>
  );
}
