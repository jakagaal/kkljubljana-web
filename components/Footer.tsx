import Image from "next/image";
import { NAV_ITEMS, EMAIL, SOCIALS } from "@/lib/data";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";
import { Facebook, Instagram } from "./ui/Icons";

export function Footer() {
  return (
    <footer className="relative bg-ink text-bone border-t border-bone/10">
      {/* Marquee */}
      <div className="overflow-hidden border-y border-bone/10 py-6 md:py-8">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: "marquee 50s linear infinite" }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-10 md:gap-14 display-tight text-5xl md:text-7xl text-bone/10 shrink-0"
            >
              <span>Karate Klub Ljubljana</span>
              <Image
                src="/logo.png"
                alt=""
                width={324}
                height={386}
                aria-hidden
                className="h-12 md:h-16 w-auto shrink-0"
              />
              <span>Est. 1971</span>
              <Image
                src="/logo.png"
                alt=""
                width={324}
                height={386}
                aria-hidden
                className="h-12 md:h-16 w-auto shrink-0"
              />
              <span>空手</span>
              <Image
                src="/logo.png"
                alt=""
                width={324}
                height={386}
                aria-hidden
                className="h-12 md:h-16 w-auto shrink-0"
              />
            </div>
          ))}
        </div>
      </div>

      <Container size="wide" className="py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5">
            <Logo variant="stacked" className="text-bone" />
            <p className="mt-8 text-bone/60 text-sm leading-relaxed max-w-sm text-pretty">
              Karate Klub Ljubljana — eden najstarejših slovenskih karate
              klubov. Vadba za otroke, rekreativce in vrhunske tekmovalce.
            </p>
            <div className="flex items-center gap-3 mt-8">
              <a
                href={SOCIALS.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center justify-center w-10 h-10 border border-bone/20 hover:bg-bone hover:text-ink hover:border-bone transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center w-10 h-10 border border-bone/20 hover:bg-blood hover:border-blood transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Nav */}
          <nav className="md:col-span-3">
            <span className="label text-bone/40 mb-5 block">Kazalo</span>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="inline-flex items-baseline gap-3 text-bone/80 hover:text-blood transition-colors"
                  >
                    <span className="label text-bone/30">/{item.number}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-4">
            <span className="label text-bone/40 mb-5 block">Stik</span>
            <a
              href={`mailto:${EMAIL}`}
              className="block text-bone hover:text-blood transition-colors text-pretty break-all"
            >
              {EMAIL}
            </a>
            <ul className="mt-5 space-y-2 text-sm text-bone/60">
              <li>OŠ Mirana Jarca · Bežigrad</li>
              <li>OŠ Martina Krpana · Fužine</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 md:mt-20 pt-8 border-t border-bone/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <span className="label text-bone/40">
            © {new Date().getFullYear()} Karate Klub Ljubljana. Vse pravice
            pridržane.
          </span>
          <div className="flex items-center gap-6">
            <span className="label text-bone/40">EST. 1971</span>
            <span className="label text-blood">★ Klub leta 2022</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
