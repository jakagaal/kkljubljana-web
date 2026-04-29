import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { About } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "O nas — Karate Klub Ljubljana",
  description:
    "Karate Klub Ljubljana — eden najstarejših slovenskih karate klubov. Zgodovina od 1971, izvršni odbor in trenerji, ki klub vodijo s strastjo.",
  openGraph: {
    title: "O nas — Karate Klub Ljubljana",
    description:
      "Več kot 50 let tradicije. Zgodba kluba, izvršni odbor in trenerska ekipa.",
  },
};

export default function ONasPage() {
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
            <span className="label text-ink">O nas</span>
          </div>
        </div>

        <About />
        <Team />

        {/* Onward strip */}
        <section className="border-t border-bone/10 bg-ink text-bone py-16 md:py-20">
          <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="label text-blood">/ Naprej</span>
              <h3 className="display text-3xl md:text-5xl mt-3 leading-[0.95] text-balance text-bone">
                Spoznaj{" "}
                <span className="text-blood">našo ekipo</span> tekmovalcev.
              </h3>
            </div>
            <div className="md:justify-self-end flex flex-col sm:flex-row gap-3">
              <a
                href="/tekmovalci"
                className="group inline-flex items-center justify-center gap-2 px-6 py-5 label bg-blood text-bone hover:bg-bone hover:text-ink transition-colors"
              >
                Naši tekmovalci
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </a>
              <a
                href="/#urnik"
                className="group inline-flex items-center justify-center gap-2 px-6 py-5 label bg-transparent text-bone border border-bone/30 hover:bg-bone hover:text-ink hover:border-bone transition-colors"
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
