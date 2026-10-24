import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { DohodninaForm } from "@/components/dohodnina/DohodninaForm";
import { breadcrumbSchema, OG_IMAGE } from "@/lib/seo";
import { RECIPIENT } from "@/lib/dohodnina";

export const metadata: Metadata = {
  title: "Namenite 1 % dohodnine",
  alternates: { canonical: "/dohodnina" },
  description:
    "Namenite 1 % dohodnine Karate klubu Ljubljana. Vas ne stane nič, klubu pa pomaga pri opremi, tekmovanjih in vadbi otrok. Obrazec izpolnite in podpišete na telefonu v dveh minutah.",
  openGraph: {
    title: "Namenite 1 % dohodnine — Karate Klub Ljubljana",
    description:
      "Za vas nič, za naše karateiste veliko. Obrazec izpolnite in podpišete na telefonu.",
    images: [OG_IMAGE],
  },
};

const STEPS = [
  { title: "Vpišite podatke", body: "Ime, naslov in davčno številko." },
  { title: "Podpišite se", body: "S prstom na telefonu ali z miško." },
  { title: "Oddajte", body: "Klub obrazec natisne in ga pošlje na FURS." },
];

export default function DohodninaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Domov", path: "/" },
          { name: "1 % dohodnine", path: "/dohodnina" },
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
            <span className="label text-ink">1 % dohodnine</span>
          </div>
        </div>

        <header className="py-14 md:py-20 border-b border-ink/10">
          <Container>
            <span className="label text-blood block mb-5">/ Podprite klub</span>
            <h1 className="display-tight text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] text-balance">
              Namenite{" "}
              <span className="text-blood whitespace-nowrap">1 %</span>{" "}
              dohodnine
            </h1>
            <p className="mt-7 text-lg md:text-xl leading-relaxed text-ink/70 max-w-3xl text-pretty">
              Del dohodnine, ki bi sicer ostal v državnem proračunu, lahko
              namenite našemu klubu. Za vas to ne pomeni nobenega dodatnega
              plačila, nam pa pomaga pri opremi, tekmovanjih in vadbi otrok.
            </p>
            <ol className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
              {STEPS.map((step, i) => (
                <li key={step.title} className="bg-bone p-6">
                  <span className="label text-blood">/ 0{i + 1}</span>
                  <p className="display text-2xl mt-3">{step.title}</p>
                  <p className="mt-2 text-ink/65">{step.body}</p>
                </li>
              ))}
            </ol>
          </Container>
        </header>

        <div className="py-14 md:py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_20rem] gap-14 lg:gap-20">
              <DohodninaForm privacyHref="/zasebnost#dohodnina" />

              <aside className="space-y-8 text-ink/75 leading-relaxed lg:border-l lg:border-ink/10 lg:pl-10">
                <section>
                  <h2 className="label text-ink mb-3">Rok</h2>
                  <p>
                    Da velja že za letošnjo dohodnino, mora zahtevek na FURS
                    prispeti do 31. decembra. Oddate ga samo enkrat in velja
                    tudi za naslednja leta, dokler ga ne spremenite ali
                    prekličete.
                  </p>
                </section>
                <section>
                  <h2 className="label text-ink mb-3">Raje prek eDavkov?</h2>
                  <p>
                    Zahtevek lahko oddate tudi sami v eDavkih (obrazec
                    Doh-Don). Vpišite {RECIPIENT.name} in davčno številko{" "}
                    <span className="font-mono text-ink whitespace-nowrap">
                      {RECIPIENT.taxNumber}
                    </span>
                    .
                  </p>
                </section>
                <section>
                  <h2 className="label text-ink mb-3">Povabite še druge</h2>
                  <p>
                    Svoj 1 % lahko nameni vsak, ki plačuje dohodnino: partner,
                    stari starši, sorodniki in prijatelji. Pošljite jim
                    povezavo na to stran.
                  </p>
                </section>
              </aside>
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
