import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icons";
import { formatDate, getPost, getSortedPosts, NEWS_POSTS } from "@/lib/news";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return NEWS_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Novice — Karate Klub Ljubljana" };
  return {
    title: `${post.title} — Karate Klub Ljubljana`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
  };
}

export default async function NovicaDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const sorted = getSortedPosts();
  const idx = sorted.findIndex((p) => p.slug === post.slug);
  const next = sorted[idx + 1];
  const prev = idx > 0 ? sorted[idx - 1] : undefined;

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="border-b border-ink/10 bg-bone">
          <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12 py-4 flex items-center gap-3 overflow-x-auto whitespace-nowrap">
            <a
              href="/"
              className="label text-ink/60 hover:text-blood transition-colors"
            >
              Domov
            </a>
            <span className="text-ink/30">/</span>
            <a
              href="/novice"
              className="label text-ink/60 hover:text-blood transition-colors"
            >
              Novice
            </a>
            <span className="text-ink/30">/</span>
            <span className="label text-ink truncate max-w-[60vw]">
              {post.title}
            </span>
          </div>
        </div>

        <article className="bg-bone">
          {/* Article header */}
          <header className="py-14 md:py-20 border-b border-ink/10">
            <Container>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[0.7rem] tracking-[0.2em] text-blood uppercase">
                  ★ {post.category}
                </span>
                <span className="h-px w-10 bg-ink/20" />
                <span className="font-mono text-[0.7rem] tracking-[0.15em] text-ink/50">
                  {formatDate(post.publishedAt)}
                </span>
              </div>
              <h1 className="display-tight text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] text-balance">
                {post.title}
              </h1>
              <p className="mt-7 text-lg md:text-xl leading-relaxed text-ink/70 max-w-3xl text-pretty">
                {post.excerpt}
              </p>
            </Container>
          </header>

          {/* Cover */}
          {post.cover ? (
            <div className="bg-ink">
              <Container size="wide" className="py-8 md:py-12">
                <figure className="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-[2/1] overflow-hidden bg-coal">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover object-[center_15%]"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-ink/90 backdrop-blur-sm px-3 py-1.5">
                    <span className="block w-1.5 h-1.5 bg-blood" />
                    <span className="font-mono text-[0.65rem] tracking-[0.2em] text-bone uppercase">
                      Plate / 01
                    </span>
                  </div>
                </figure>
              </Container>
            </div>
          ) : null}

          {/* Body */}
          <div className="py-14 md:py-20">
            <Container>
              <div className="max-w-3xl prose-content space-y-6">
                {post.content.map((para, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? "text-lg md:text-xl leading-relaxed text-ink first-letter:display-tight first-letter:text-blood first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none"
                        : "text-base md:text-lg leading-relaxed text-ink/80"
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>
            </Container>
          </div>

          {/* Caption strip */}
          <Container>
            <div className="max-w-3xl pt-6 border-t border-ink/15 flex flex-wrap items-baseline justify-between gap-3 mb-14 md:mb-20">
              <span className="font-mono text-[0.7rem] tracking-[0.2em] text-ink/50 uppercase">
                / {post.category} · {formatDate(post.publishedAt)}
              </span>
              <a
                href="/novice"
                className="font-mono text-[0.7rem] tracking-[0.2em] text-blood hover:text-ink uppercase transition-colors"
              >
                ← Vse novice
              </a>
            </div>
          </Container>
        </article>

        {/* Prev / next */}
        {(prev || next) && (
          <section className="border-t border-ink/10 bg-bone">
            <Container size="wide">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-ink/10">
                {prev ? (
                  <a
                    href={`/novice/${prev.slug}`}
                    className="group flex flex-col p-7 md:p-10 hover:bg-ink hover:text-bone transition-colors"
                  >
                    <span className="label text-blood mb-2">
                      ← Prejšnja novica
                    </span>
                    <span className="display text-2xl md:text-3xl leading-tight text-balance">
                      {prev.title}
                    </span>
                  </a>
                ) : (
                  <div className="hidden md:block" />
                )}
                {next ? (
                  <a
                    href={`/novice/${next.slug}`}
                    className="group flex flex-col p-7 md:p-10 md:items-end md:text-right hover:bg-ink hover:text-bone transition-colors"
                  >
                    <span className="label text-blood mb-2">
                      Naslednja novica →
                    </span>
                    <span className="display text-2xl md:text-3xl leading-tight text-balance">
                      {next.title}
                    </span>
                  </a>
                ) : (
                  <div className="hidden md:block" />
                )}
              </div>
            </Container>
          </section>
        )}

        {/* Onward strip */}
        <section className="border-t border-ink/10 bg-ink text-bone py-16 md:py-20">
          <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="label text-blood">/ Naprej</span>
              <h3 className="display text-3xl md:text-5xl mt-3 leading-[0.95] text-balance">
                Pridruži se{" "}
                <span className="text-blood">treningom</span> kluba.
              </h3>
            </div>
            <div className="md:justify-self-end flex flex-col sm:flex-row gap-3">
              <a
                href="/#urnik"
                className="group inline-flex items-center justify-center gap-2 px-6 py-5 label bg-blood text-bone hover:bg-bone hover:text-ink transition-colors"
              >
                Poglej urnik
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </a>
              <a
                href="/#kontakt"
                className="group inline-flex items-center justify-center gap-2 px-6 py-5 label bg-transparent text-bone border border-bone/30 hover:bg-bone hover:text-ink hover:border-bone transition-colors"
              >
                Kontaktiraj nas
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
