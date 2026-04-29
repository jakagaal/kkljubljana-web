import { BOARD, type TeamMember } from "@/lib/data";
import { Container } from "../ui/Container";
import { Facebook, Instagram } from "../ui/Icons";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { clsx } from "@/lib/clsx";

export function Team() {
  return (
    <section
      id="vodstvo"
      className="relative py-24 md:py-40 bg-ink text-bone overflow-hidden"
    >
      {/* Background kanji */}
      <div
        aria-hidden
        className="absolute -right-10 top-1/2 -translate-y-1/2 select-none pointer-events-none"
      >
        <div className="text-[20rem] md:text-[32rem] leading-none font-serif text-bone/[0.03]">
          道
        </div>
      </div>

      <SectionHeader
        number="02"
        eyebrow="Naše vodstvo"
        title="Izvršni odbor"
        description="Vsi člani našega izvršnega odbora so izkušeni voditelji z bogatim znanjem v upravljanju športnih organizacij. Vsak prinaša individualnost in strast v našo upravo."
        variant="dark"
      />

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-bone/10 border border-bone/10">
          {BOARD.map((member, idx) => (
            <Reveal key={member.name} delay={idx * 100}>
              <BoardCard member={member} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function BoardCard({ member }: { member: TeamMember }) {
  return (
    <article
      className={clsx(
        "relative h-full flex flex-col bg-ink p-7 md:p-8",
        "group transition-all duration-500",
        "hover:bg-blood",
      )}
    >
      {/* Portrait placeholder with initials */}
      <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-coal group-hover:bg-ink/30 transition-colors duration-500">
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={clsx(
              "display-tight text-[7rem] md:text-[8rem] leading-none transition-all duration-500",
              member.accent
                ? "text-blood group-hover:text-bone"
                : "text-bone/10 group-hover:text-bone/30",
            )}
          >
            {member.initials}
          </span>
        </div>
        {/* Decorative corner */}
        <div className="absolute top-3 left-3 label text-bone/40 group-hover:text-bone/70 transition-colors">
          {member.accent ? "★ Predsednica" : "Odbor"}
        </div>
        <div className="absolute bottom-3 right-3 w-3 h-3 bg-bone/30 group-hover:bg-bone transition-colors" />
        {/* Diagonal stripe pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 12px, currentColor 12px, currentColor 13px)",
          }}
        />
      </div>

      <h3 className="display text-2xl md:text-[1.7rem] leading-tight">
        {member.name}
      </h3>
      <p className="label text-bone/50 mt-2 group-hover:text-bone/80 transition-colors">
        {member.role}
      </p>

      <div className="flex items-center gap-3 mt-auto pt-6">
        {member.socials.map((s) => (
          <a
            key={s.type}
            href={s.href}
            aria-label={s.type}
            className="p-2 -ml-2 text-bone/40 hover:text-bone transition-colors"
          >
            {s.type === "facebook" ? (
              <Facebook className="h-4 w-4" />
            ) : (
              <Instagram className="h-4 w-4" />
            )}
          </a>
        ))}
      </div>
    </article>
  );
}
