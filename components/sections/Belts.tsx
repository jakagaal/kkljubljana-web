import { BELTS, type Belt } from "@/lib/data";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { clsx } from "@/lib/clsx";

export function Belts() {
  return (
    <section
      id="izpiti"
      className="relative py-24 md:py-40 bg-ink text-bone overflow-hidden"
    >
      {/* Decorative kanji */}
      <div
        aria-hidden
        className="absolute right-4 -top-8 select-none pointer-events-none opacity-[0.04]"
      >
        <div className="display-tight text-[14rem] md:text-[22rem] leading-none">
          帯
        </div>
      </div>

      <SectionHeader
        number="05"
        eyebrow="Izpiti"
        title="Pot pasov"
        description="Po uspešno opravljenem preizkusu znanja se učencu podeli stopnja, ki se označuje z določeno barvo pasu. Učenje karateja se nikoli ne konča."
        variant="dark"
      />

      <Container size="wide" className="relative z-10">
        {/* KYU vs DAN explainer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-16 md:mb-24">
          <Reveal>
            <div className="border border-bone/20 p-7 md:p-9 hover:border-blood transition-colors group">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="display-tight text-7xl text-blood">KYU</span>
                <span className="label text-bone/50">Šolske stopnje</span>
              </div>
              <p className="text-bone/70 text-base leading-relaxed text-pretty">
                Osnovne stopnje. Od 8. do 1. KYU, od belega do rjavega pasu.
                Učenec gradi temeljno znanje veščine.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="border border-bone/20 p-7 md:p-9 hover:border-blood transition-colors group">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="display-tight text-7xl text-blood">DAN</span>
                <span className="label text-bone/50">Mojstrske stopnje</span>
              </div>
              <p className="text-bone/70 text-base leading-relaxed text-pretty">
                Šele prva mojstrska stopnja, 1. DAN, je{" "}
                <span className="text-bone">začetek</span> resničnega
                spoznavanja karateja kot veščine.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Belt progression ladder */}
        <Reveal>
          <div className="relative">
            <div className="flex items-baseline gap-4 mb-8 md:mb-10">
              <span className="label text-blood">/ Stopnje</span>
              <span className="h-px flex-1 bg-bone/20" />
              <span className="label text-bone/40">9 PASOV</span>
            </div>

            <ol className="flex flex-col">
              {BELTS.map((belt, idx) => (
                <BeltRow key={idx} belt={belt} index={idx} />
              ))}
            </ol>

            <div className="mt-10 flex items-center gap-3 label text-bone/50 text-pretty">
              <div className="h-px w-12 bg-blood" />
              Od belega do črnega — pot, ki traja celo življenje.
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function BeltRow({ belt, index }: { belt: Belt; index: number }) {
  const isDark = belt.textOn === "light";
  const widthPercent = 28 + (index / (BELTS.length - 1)) * 72;

  return (
    <li
      className="group relative grid grid-cols-12 gap-4 items-center py-5 md:py-6 border-b border-bone/10"
      style={{
        animation: `fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${index * 60}ms both`,
      }}
    >
      <div className="col-span-3 md:col-span-2 flex items-baseline gap-2">
        <span className="label text-blood">
          {belt.type === "DAN" ? "★" : ""}
        </span>
        <span className="display text-2xl md:text-4xl">{belt.level}</span>
      </div>

      {/* Belt visualization */}
      <div className="col-span-7 md:col-span-8 relative">
        <div
          className={clsx(
            "h-9 md:h-11 transition-all duration-700 ease-out flex items-center justify-end px-4",
            "border border-bone/10 group-hover:border-bone/40",
          )}
          style={{
            backgroundColor: belt.hex,
            width: `${widthPercent}%`,
          }}
        >
          {/* Belt knot detail */}
          <div
            className={clsx(
              "h-full w-1.5 ml-1",
              isDark ? "bg-bone/20" : "bg-ink/20",
            )}
          />
        </div>
        {/* Hover guide line */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 right-0 border-b border-dashed border-bone/0 group-hover:border-bone/10 transition-colors"
        />
      </div>

      <div className="col-span-2 text-right">
        <span
          className={clsx(
            "label transition-colors",
            belt.type === "DAN"
              ? "text-blood group-hover:text-bone"
              : "text-bone/60 group-hover:text-bone",
          )}
        >
          {belt.name}
        </span>
      </div>
    </li>
  );
}
