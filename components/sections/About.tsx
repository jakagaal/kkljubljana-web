import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { COACHES, HISTORY } from "@/lib/data";

export function About() {
  return (
    <section id="o-nas" className="relative py-24 md:py-40 bg-bone">
      <SectionHeader
        number="01"
        eyebrow="O nas"
        title={"Več kot le klub"}
        description="Karate Klub Ljubljana, ustanovljen leta 1971, je eden najstarejših slovenskih karate klubov — s tradicijo, ki traja že več kot pol stoletja."
      />

      <Container size="wide">
        {/* Lead body + pull stat */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-20 md:mb-32">
          <Reveal className="lg:col-span-7" delay={0}>
            <div className="space-y-6 text-base md:text-lg leading-relaxed text-ink/80 text-pretty max-w-2xl">
              <p>
                Sprva znan kot{" "}
                <span className="text-ink font-semibold">
                  Društvo za borilne veščine Ljubljana (DBV Ljubljana)
                </span>
                , je bil klub v 70. letih množičen, vsestranski in je imel
                izjemno družabno življenje s preko 500 člani. Vodil ga je
                Franc Kotar do sredine 80. let.
              </p>
              <p>
                Med leti{" "}
                <span className="text-blood font-semibold">1991 in 2000</span>{" "}
                so tekmovalci v katah in športnih borbah osvojili več kot 50
                naslovov državnih prvakov ter prvo odličje na svetovnem in
                evropskem članskem prvenstvu za samostojno Slovenijo (Klemen
                Stanovnik).
              </p>
              <p>
                Danes klub šteje{" "}
                <span className="text-ink font-semibold">140 članov</span> in
                deluje pod vodstvom predsednice in trenerke Marijane Jularić,
                z ekipo trenerjev, ki ponujajo vodeno vadbo karateja tako za
                otroke in rekreativce kot tudi tekmovalce na najvišji ravni.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={150}>
            <aside className="relative bg-ink text-bone p-8 md:p-10 lg:translate-y-8">
              <span className="label text-blood">Priznanje 2022</span>
              <p className="display text-4xl md:text-5xl mt-6 leading-[0.95] text-balance">
                Najboljši klub
                <br />
                <span className="text-blood">Slovenije</span>
              </p>
              <p className="mt-6 text-bone/70 text-sm leading-relaxed">
                S strani Karate zveze Slovenije, na podlagi doseženih
                rezultatov, prepoznan za najboljši klub v Sloveniji med vsemi
                registriranimi klubi.
              </p>
              <div
                aria-hidden
                className="absolute -bottom-2 -right-2 w-12 h-12 bg-blood"
              />
            </aside>
          </Reveal>
        </div>

        {/* Timeline */}
        <Reveal>
          <div className="border-t border-ink/10 pt-12 md:pt-16">
            <div className="flex items-center gap-4 mb-10 md:mb-14">
              <span className="label text-blood">/ Naša pot</span>
              <span className="h-px flex-1 bg-ink/20" />
              <span className="label text-ink/40">1971 → 2026</span>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10">
              {HISTORY.map((event, idx) => (
                <li
                  key={event.year}
                  className="bg-bone p-7 md:p-8 group hover:bg-ink hover:text-bone transition-colors duration-500"
                >
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="display text-blood text-4xl md:text-5xl">
                      {event.year}
                    </span>
                    <span className="label text-ink/40 group-hover:text-bone/40 transition-colors">
                      / 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="display text-xl md:text-2xl mb-3">
                    {event.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-ink/70 group-hover:text-bone/70 transition-colors">
                    {event.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* Coaches roster */}
        <Reveal className="mt-20 md:mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <span className="label text-blood">/ Naša ekipa</span>
              <h3 className="display-tight text-5xl md:text-6xl mt-4 leading-[0.9]">
                Vodimo
                <br />s strastjo
              </h3>
            </div>
            <div className="lg:col-span-8">
              <p className="text-base md:text-lg text-ink/70 leading-relaxed mb-10 max-w-2xl text-pretty">
                Trenerji z neprecenljivim strokovnim znanjem s področja
                športnega treniranja in rekreacije. Osem trenerjev, ena
                filozofija.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/10 border border-ink/10">
                {COACHES.map((name, idx) => (
                  <li
                    key={name}
                    className="flex items-center gap-4 bg-bone py-5 px-6 hover:bg-ink hover:text-bone transition-colors duration-300 group"
                  >
                    <span className="label text-ink/30 group-hover:text-blood transition-colors">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="display text-xl md:text-2xl">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
