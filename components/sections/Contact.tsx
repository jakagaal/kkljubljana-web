import { CONTACTS, EMAIL, SOCIALS } from "@/lib/data";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { Mail, MapPin, Phone, ArrowRight, Facebook, Instagram } from "../ui/Icons";

export function Contact() {
  return (
    <section
      id="kontakt"
      className="relative py-24 md:py-40 bg-ink text-bone overflow-hidden"
    >
      {/* Background number */}
      <div
        aria-hidden
        className="absolute -bottom-16 -right-12 select-none pointer-events-none"
      >
        <div className="display-tight text-[18rem] md:text-[28rem] leading-none text-blood/[0.08]">
          07
        </div>
      </div>

      <SectionHeader
        number="07"
        eyebrow="Kontakt"
        title="Pridruži se"
        description="Postani del kluba s tradicijo. Pokliči trenerja na svoji lokaciji ali nam piši — odgovorimo v 24 urah."
        variant="dark"
      />

      <Container size="wide" className="relative z-10">
        {/* Email — billboard */}
        <Reveal>
          <a
            href={`mailto:${EMAIL}`}
            className="group block border-y-2 border-bone py-10 md:py-16 mb-16 md:mb-24 -mx-5 sm:-mx-8 lg:-mx-12 px-5 sm:px-8 lg:px-12"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <span className="label text-blood block mb-3">
                  / Piši nam
                </span>
                <span className="display-tight text-[clamp(2rem,6vw,5.5rem)] leading-[0.9] block break-all md:break-normal text-balance group-hover:text-blood transition-colors duration-500">
                  {EMAIL}
                </span>
              </div>
              <ArrowRight
                className="h-10 w-10 md:h-14 md:w-14 shrink-0 text-bone group-hover:text-blood group-hover:translate-x-2 transition-all duration-500"
                strokeWidth={1.5}
              />
            </div>
          </a>
        </Reveal>

        {/* Trener kontakti */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-bone/10 border border-bone/10">
          {CONTACTS.map((c, idx) => (
            <Reveal key={c.name} delay={idx * 100}>
              <article className="bg-ink p-7 md:p-10 h-full hover:bg-blood transition-colors duration-500 group">
                <div className="flex items-start justify-between mb-8">
                  <span className="label text-blood group-hover:text-bone transition-colors">
                    Trener / 0{idx + 1}
                  </span>
                  <span className="display-tight text-5xl text-bone/10 group-hover:text-bone/30 transition-colors">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="display text-3xl md:text-4xl leading-tight mb-2">
                  {c.name}
                </h3>
                <div className="flex items-center gap-2 label text-bone/50 group-hover:text-bone/70 mb-8 transition-colors">
                  <MapPin className="h-3.5 w-3.5" />
                  {c.location} · {c.district}
                </div>

                <a
                  href={`tel:${c.phoneClean}`}
                  className="flex items-center gap-3 border-t border-bone/10 group-hover:border-bone/30 pt-5 transition-colors"
                >
                  <Phone className="h-5 w-5 text-blood group-hover:text-bone transition-colors" />
                  <span className="font-mono text-lg md:text-xl tracking-wide">
                    {c.phone}
                  </span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Socials + CTA strip */}
        <Reveal>
          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-8">
              <p className="display text-3xl md:text-5xl leading-[0.95] text-balance">
                Pridi <span className="text-blood">na trening.</span>
                <br />
                Prvi obisk je{" "}
                <span className="underline decoration-blood decoration-4 underline-offset-8">
                  brezplačen.
                </span>
              </p>

              <div className="mt-10 md:mt-12">
                <span className="label text-blood block mb-5">/ Sledi nam</span>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={SOCIALS.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 px-5 py-4 label bg-bone/5 border border-bone/15 hover:bg-bone hover:text-ink hover:border-bone transition-colors"
                  >
                    <Facebook className="h-4 w-4" />
                    <span>Facebook</span>
                    <span className="text-bone/40 group-hover:text-ink/60 transition-colors">
                      / @karateklub.ljubljana
                    </span>
                  </a>
                  <a
                    href={SOCIALS.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 px-5 py-4 label bg-bone/5 border border-bone/15 hover:bg-blood hover:text-bone hover:border-blood transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                    <span>Instagram</span>
                    <span className="text-bone/40 group-hover:text-bone/70 transition-colors">
                      / @karateklubljubljana
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center justify-center gap-2 px-6 py-5 label bg-blood text-bone hover:bg-bone hover:text-ink transition-all"
              >
                <Mail className="h-4 w-4" strokeWidth={2} />
                Pošlji sporočilo
              </a>
              <a
                href="#urnik"
                className="group inline-flex items-center justify-center gap-2 px-6 py-5 label bg-transparent text-bone border border-bone/30 hover:bg-bone hover:text-ink hover:border-bone transition-all"
              >
                Poglej urnik treningov →
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
