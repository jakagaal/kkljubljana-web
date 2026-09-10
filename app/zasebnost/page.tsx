import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { breadcrumbSchema, CLUB_NAP, OG_IMAGE } from "@/lib/seo";
import { EMAIL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Zasebnost in piškotki",
  alternates: { canonical: "/zasebnost" },
  description:
    "Kako Karate Klub Ljubljana ravna z osebnimi podatki obiskovalcev spletne strani. Stran ne uporablja piškotkov in ne sledi posameznikom.",
  openGraph: {
    title: "Zasebnost in piškotki — Karate Klub Ljubljana",
    description:
      "Kako ravnamo z osebnimi podatki obiskovalcev. Brez piškotkov, brez sledenja posameznikom.",
    images: [OG_IMAGE],
  },
};

const UPDATED = "10. september 2026";

export default function ZasebnostPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Domov", path: "/" },
          { name: "Zasebnost in piškotki", path: "/zasebnost" },
        ])}
      />
      <Navbar />
      <main className="pt-16 md:pt-20 bg-bone">
        {/* Breadcrumb */}
        <div className="border-b border-ink/10">
          <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12 py-4 flex items-center gap-3">
            <a
              href="/"
              className="label text-ink/60 hover:text-blood transition-colors"
            >
              Domov
            </a>
            <span className="text-ink/30">/</span>
            <span className="label text-ink">Zasebnost</span>
          </div>
        </div>

        <header className="py-14 md:py-20 border-b border-ink/10">
          <Container>
            <span className="label text-blood block mb-5">/ Pravno</span>
            <h1 className="display-tight text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] text-balance">
              Zasebnost in piškotki
            </h1>
            <p className="mt-7 text-lg md:text-xl leading-relaxed text-ink/70 max-w-3xl text-pretty">
              Ta stran ne uporablja piškotkov, ne prikazuje oglasov in ne sledi
              posameznim obiskovalcem. Spodaj piše natančno, kaj se zbira in
              zakaj.
            </p>
            <p className="mt-6 font-mono text-[0.7rem] tracking-[0.2em] text-ink/50 uppercase">
              Zadnja sprememba: {UPDATED}
            </p>
          </Container>
        </header>

        <div className="py-14 md:py-20">
          <Container>
            <div className="max-w-3xl space-y-12">
              <section className="space-y-4">
                <h2 className="display text-3xl md:text-4xl leading-tight">
                  Kdo upravlja podatke
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-ink/80">
                  Upravljavec osebnih podatkov je {CLUB_NAP.legalName},{" "}
                  {CLUB_NAP.streetAddress}, {CLUB_NAP.postalCode}{" "}
                  {CLUB_NAP.addressLocality}. Za vsa vprašanja o zasebnosti nam
                  pišite na{" "}
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-blood underline decoration-blood/40 underline-offset-4 hover:decoration-blood transition-colors break-all"
                  >
                    {EMAIL}
                  </a>{" "}
                  ali pokličite na{" "}
                  <a
                    href={`tel:${CLUB_NAP.phoneE164}`}
                    className="text-blood underline decoration-blood/40 underline-offset-4 hover:decoration-blood transition-colors whitespace-nowrap"
                  >
                    {CLUB_NAP.phone}
                  </a>
                  .
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="display text-3xl md:text-4xl leading-tight">
                  Piškotki
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-ink/80">
                  Ta spletna stran ne nastavlja piškotkov in v vaš brskalnik ne
                  shranjuje ničesar. Zato tudi ne prikazujemo pasice za
                  privolitev. Ni vam treba ničesar sprejeti ali zavrniti.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="display text-3xl md:text-4xl leading-tight">
                  Merjenje obiska
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-ink/80">
                  Da vemo, koliko ljudi obišče stran in katere vsebine so
                  koristne, uporabljamo storitev Umami. Ta deluje brez
                  piškotkov in brez shranjevanja podatkov na vaši napravi.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-ink/80">
                  Zbirajo se le seštevki, iz katerih vas ni mogoče prepoznati:
                  ogledana stran, približna država ali mesto, vrsta naprave,
                  brskalnik in stran, s katere ste prišli. Vaš naslov IP se ne
                  shranjuje. Podatkov ne povezujemo z vami in jih ne prodajamo
                  ali posredujemo naprej za oglaševanje.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="display text-3xl md:text-4xl leading-tight">
                  Ko nam pišete
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-ink/80">
                  Če nam pošljete elektronsko sporočilo ali pokličete trenerja,
                  vaše sporočilo in kontaktne podatke uporabimo samo zato, da
                  vam odgovorimo in se dogovorimo o vadbi. Hranimo jih, dokler
                  je to potrebno za ta namen. Nikomur jih ne posredujemo.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="display text-3xl md:text-4xl leading-tight">
                  Vaše pravice
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-ink/80">
                  Po Splošni uredbi o varstvu podatkov imate pravico do
                  vpogleda v svoje osebne podatke, do popravka, izbrisa in
                  omejitve obdelave ter pravico do ugovora. Zahtevo pošljite na{" "}
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-blood underline decoration-blood/40 underline-offset-4 hover:decoration-blood transition-colors break-all"
                  >
                    {EMAIL}
                  </a>
                  . Odgovorimo v enem mesecu. Če menite, da s podatki ravnamo
                  napačno, se lahko pritožite Informacijskemu pooblaščencu
                  Republike Slovenije.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="display text-3xl md:text-4xl leading-tight">
                  Povezave na druge strani
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-ink/80">
                  Naša stran vodi na profile kluba na Facebooku, Instagramu in
                  YouTubu. Ko odprete katerega od njih, veljajo pravila
                  zasebnosti teh podjetij, na katera nimamo vpliva.
                </p>
              </section>
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
