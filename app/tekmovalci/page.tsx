import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Champions } from "@/components/sections/Champions";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Naši tekmovalci — Karate Klub Ljubljana",
  description:
    "Spoznaj tekmovalno postavo Karate Kluba Ljubljana. Mednarodni rezultati, državni naslovi, nova generacija šampionov.",
  openGraph: {
    title: "Naši tekmovalci — Karate Klub Ljubljana",
    description:
      "Tekmovalna postava kluba, dosežki in nova generacija mednarodnih tekmovalcev.",
  },
};

export default function TekmovalciPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="border-b border-ink/10 bg-bone">
          <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12 py-4 flex items-center gap-3">
            <a
              href="/"
              className="label text-ink/60 hover:text-blood transition-colors"
            >
              Domov
            </a>
            <span className="text-ink/30">/</span>
            <span className="label text-ink">Tekmovalci</span>
          </div>
        </div>

        <Champions />

        {/* Back-to-home strip */}
        <section className="border-t border-ink/10 bg-bone py-16 md:py-20">
          <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="label text-blood">/ Naprej</span>
              <h3 className="display text-3xl md:text-5xl mt-3 leading-[0.95] text-balance">
                Spoznaj klub s{" "}
                <span className="text-blood">več kot 50-letno</span> tradicijo.
              </h3>
            </div>
            <div className="md:justify-self-end flex flex-col sm:flex-row gap-3">
              <a
                href="/o-nas"
                className="group inline-flex items-center justify-center gap-2 px-6 py-5 label bg-ink text-bone hover:bg-blood transition-colors"
              >
                O klubu
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </a>
              <a
                href="/#urnik"
                className="group inline-flex items-center justify-center gap-2 px-6 py-5 label bg-transparent text-ink border border-ink hover:bg-ink hover:text-bone transition-colors"
              >
                Poglej urnik
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
