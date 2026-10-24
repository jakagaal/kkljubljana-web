import { Container } from "../ui/Container";
import { ArrowRight } from "../ui/Icons";

/** Homepage band pointing to the 1 % dohodnine form. */
export function DohodninaCta() {
  return (
    <section
      aria-labelledby="dohodnina-cta"
      className="bg-blood text-bone py-12 md:py-16"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-8 items-center">
          <div>
            <span className="label text-bone/70">/ Podprite klub</span>
            <h2
              id="dohodnina-cta"
              className="display text-4xl md:text-6xl mt-3 leading-[0.95] text-balance"
            >
              Namenite nam{" "}
              <span className="whitespace-nowrap">1 %</span> dohodnine
            </h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-bone/85 text-pretty">
              Za vas brez stroška, za naše karateiste velika pomoč. Obrazec
              izpolnite in podpišete kar na telefonu, v dveh minutah.
            </p>
          </div>
          <a
            href="/dohodnina"
            className="group inline-flex items-center justify-center gap-2.5 px-7 py-5 label bg-ink text-bone border border-ink hover:bg-bone hover:text-ink hover:border-bone transition-colors"
          >
            Oddaj zahtevek
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </a>
        </div>
      </Container>
    </section>
  );
}
