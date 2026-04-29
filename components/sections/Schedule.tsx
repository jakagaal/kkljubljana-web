import { SCHEDULE, type ScheduleSession } from "@/lib/data";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { clsx } from "@/lib/clsx";

const levelStyles: Record<ScheduleSession["level"], string> = {
  beginners: "bg-bone text-ink border-l-4 border-l-[#f5c542]",
  intermediate: "bg-bone text-ink border-l-4 border-l-[#e36a1f]",
  advanced: "bg-bone text-ink border-l-4 border-l-[#1f7a3e]",
  competitive: "bg-blood text-bone border-l-4 border-l-ink",
  all: "bg-bone text-ink border-l-4 border-l-ink",
};

const levelLabels: Record<ScheduleSession["level"], string> = {
  beginners: "Začetniki",
  intermediate: "Srednji",
  advanced: "Napredni",
  competitive: "Tekmovalci",
  all: "Vse skupine",
};

export function Schedule() {
  return (
    <section id="urnik" className="relative py-24 md:py-40 bg-bone">
      <SectionHeader
        number="06"
        eyebrow="Urnik"
        title="Tedenski treningi"
        description="Vadbe potekajo na dveh lokacijah — OŠ Mirana Jarca v Bežigradu in OŠ Martina Krpana na Fužinah. Pridruži se v skupini, ki ti najbolj ustreza."
      />

      <Container size="wide">
        {/* Legend */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-10 md:mb-12 pb-6 border-b border-ink/10">
            <span className="label text-ink/50">Legenda:</span>
            <Legend color="#f5c542" label="Začetniki" />
            <Legend color="#e36a1f" label="Srednji" />
            <Legend color="#1f7a3e" label="Napredni" />
            <Legend color="#cc1f2c" label="Tekmovalci" filled />
            <Legend color="#0a0a0a" label="Vse skupine" />
          </div>
        </Reveal>

        {/* Mobile: stacked day cards */}
        <div className="lg:hidden space-y-6">
          {SCHEDULE.map((day, idx) => (
            <Reveal key={day.day} delay={idx * 80}>
              <article className="border border-ink/10 bg-paper">
                <header className="flex items-baseline justify-between bg-ink text-bone px-5 py-4">
                  <h3 className="display text-3xl">{day.day}</h3>
                  <span className="label text-bone/50">
                    {day.sessions.length} sesij
                  </span>
                </header>
                <ul className="divide-y divide-ink/10">
                  {day.sessions.map((s, sidx) => (
                    <SessionRowMobile key={sidx} session={s} />
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Desktop: grid */}
        <Reveal className="hidden lg:block">
          <div className="grid grid-cols-4 gap-px bg-ink/10 border border-ink/10">
            {SCHEDULE.map((day) => (
              <div key={day.day} className="bg-paper flex flex-col">
                <header className="bg-ink text-bone px-5 py-5 flex items-baseline justify-between">
                  <h3 className="display text-2xl xl:text-3xl">{day.day}</h3>
                  <span className="label text-blood">{day.short}</span>
                </header>
                <ul className="flex-1 divide-y divide-ink/10">
                  {day.sessions.map((s, sidx) => (
                    <SessionCard key={sidx} session={s} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Locations */}
        <Reveal className="mt-14 md:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <LocationCard
              tag="Lokacija 01"
              name="OŠ Mirana Jarca"
              district="Bežigrad"
              days="Pon · Sre"
            />
            <LocationCard
              tag="Lokacija 02"
              name="OŠ Martina Krpana"
              district="Fužine"
              days="Tor · Sre · Čet"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Legend({
  color,
  label,
  filled = false,
}: {
  color: string;
  label: string;
  filled?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2 label text-ink/70">
      <span
        className="block w-3 h-3"
        style={{
          backgroundColor: filled ? color : "transparent",
          border: `2px solid ${color}`,
        }}
      />
      {label}
    </span>
  );
}

function SessionCard({ session }: { session: ScheduleSession }) {
  return (
    <li
      className={clsx(
        "p-4 xl:p-5 transition-all duration-300 hover:translate-x-1",
        levelStyles[session.level],
      )}
    >
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-mono text-base xl:text-lg font-bold tracking-tight">
          {session.start}
          <span className="opacity-40">—</span>
          {session.end}
        </span>
        <span
          className={clsx(
            "label",
            session.level === "competitive"
              ? "text-bone/70"
              : "text-ink/50",
          )}
        >
          {levelLabels[session.level]}
        </span>
      </div>
      <p className="display text-base xl:text-lg leading-tight">
        {session.group}
      </p>
      <p
        className={clsx(
          "label mt-2",
          session.level === "competitive"
            ? "text-bone/60"
            : "text-ink/50",
        )}
      >
        OŠ {session.location}
      </p>
    </li>
  );
}

function SessionRowMobile({ session }: { session: ScheduleSession }) {
  return (
    <li
      className={clsx(
        "p-5 grid grid-cols-[auto_1fr] gap-4",
        levelStyles[session.level],
      )}
    >
      <div className="font-mono text-sm font-bold leading-tight whitespace-nowrap">
        <div>{session.start}</div>
        <div className="opacity-50">{session.end}</div>
      </div>
      <div>
        <p className="display text-lg leading-tight mb-1">{session.group}</p>
        <p
          className={clsx(
            "label",
            session.level === "competitive"
              ? "text-bone/60"
              : "text-ink/50",
          )}
        >
          {levelLabels[session.level]} · OŠ {session.location}
        </p>
      </div>
    </li>
  );
}

function LocationCard({
  tag,
  name,
  district,
  days,
}: {
  tag: string;
  name: string;
  district: string;
  days: string;
}) {
  return (
    <div className="group relative border border-ink/10 p-7 md:p-8 bg-bone hover:bg-ink hover:text-bone hover:border-ink transition-all duration-500 cursor-default">
      <span className="label text-blood">{tag}</span>
      <h4 className="display text-3xl md:text-4xl mt-4 leading-tight">
        {name}
      </h4>
      <p className="text-ink/60 group-hover:text-bone/60 mt-2 transition-colors">
        {district}
      </p>
      <div className="mt-8 flex items-center justify-between border-t border-ink/10 group-hover:border-bone/20 pt-5 transition-colors">
        <span className="label text-ink/40 group-hover:text-bone/40 transition-colors">
          Dnevi vadbe
        </span>
        <span className="font-mono text-sm tracking-wider">{days}</span>
      </div>
    </div>
  );
}
