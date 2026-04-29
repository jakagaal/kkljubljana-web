import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight } from "@/components/ui/Icons";
import { formatDate, getSortedPosts, type NewsPost } from "@/lib/news";

export const metadata: Metadata = {
  title: "Novice — Karate Klub Ljubljana",
  description:
    "Najnovejše novice in dogajanje v Karate Klubu Ljubljana — rezultati tekmovanj, klubska obvestila in zgodbe iz dvorane.",
  openGraph: {
    title: "Novice — Karate Klub Ljubljana",
    description:
      "Spremljaj dogajanje v klubu — rezultati, obvestila in zgodbe.",
  },
};

export default function NovicePage() {
  const posts = getSortedPosts();
  const [featured, ...rest] = posts;

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
            <span className="label text-ink">Novice</span>
          </div>
        </div>

        <section className="py-16 md:py-24 bg-bone">
          <SectionHeader
            number="05"
            eyebrow="Novice"
            title="Iz dvorane"
            description="Najnovejše dogajanje v klubu — rezultati naših tekmovalcev, klubska obvestila in zgodbe iz tatami­ja."
          />

          <Container size="wide">
            {featured ? <FeaturedPost post={featured} /> : null}

            {rest.length > 0 ? (
              <div className="mt-12 md:mt-16">
                <div className="flex items-baseline gap-4 mb-8 md:mb-10">
                  <span className="label text-blood">/ Arhiv</span>
                  <span className="h-px flex-1 bg-ink/20" />
                  <span className="label text-ink/40">
                    {rest.length} OBJAV
                  </span>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
                  {rest.map((post) => (
                    <li key={post.slug} className="bg-bone">
                      <PostCard post={post} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Container>
        </section>

        {/* Onward strip */}
        <section className="border-t border-ink/10 bg-ink text-bone py-16 md:py-20">
          <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="label text-blood">/ Naprej</span>
              <h3 className="display text-3xl md:text-5xl mt-3 leading-[0.95] text-balance">
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
                href="/o-nas"
                className="group inline-flex items-center justify-center gap-2 px-6 py-5 label bg-transparent text-bone border border-bone/30 hover:bg-bone hover:text-ink hover:border-bone transition-colors"
              >
                O klubu
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function FeaturedPost({ post }: { post: NewsPost }) {
  return (
    <a
      href={`/novice/${post.slug}`}
      className="group relative block grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-6 mt-2"
    >
      <figure className="relative lg:col-span-8 aspect-[4/5] sm:aspect-[16/10] lg:aspect-[5/4] overflow-hidden bg-coal">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            priority
            className="object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-blood text-bone backdrop-blur-sm px-3 py-1.5">
          <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase">
            ★ Najnovejše
          </span>
        </div>
      </figure>

      <div className="lg:col-span-4 flex flex-col justify-between gap-6 bg-ink text-bone p-7 md:p-9">
        <div>
          <div className="flex items-baseline gap-3 mb-5">
            <span className="font-mono text-[0.7rem] tracking-[0.2em] text-blood uppercase">
              {post.category}
            </span>
            <span className="h-px flex-1 bg-bone/20" />
            <span className="font-mono text-[0.7rem] tracking-[0.15em] text-bone/50">
              {formatDate(post.publishedAt)}
            </span>
          </div>
          <h3 className="display-tight text-3xl md:text-4xl lg:text-5xl leading-[0.92] text-balance mb-5 group-hover:text-blood transition-colors">
            {post.title}
          </h3>
          <p className="text-sm md:text-base text-bone/70 leading-relaxed text-pretty">
            {post.excerpt}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 label text-blood group-hover:text-bone transition-colors">
          Preberi članek
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={2}
          />
        </span>
      </div>
    </a>
  );
}

function PostCard({ post }: { post: NewsPost }) {
  return (
    <a
      href={`/novice/${post.slug}`}
      className="group flex flex-col h-full p-6 md:p-7 hover:bg-ink hover:text-bone transition-colors duration-500"
    >
      {post.cover ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-coal mb-5">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-[0.65rem] tracking-[0.2em] text-blood uppercase">
          {post.category}
        </span>
        <span className="font-mono text-[0.65rem] tracking-[0.15em] text-ink/40 group-hover:text-bone/50 transition-colors">
          {formatDate(post.publishedAt)}
        </span>
      </div>
      <h3 className="display text-xl md:text-2xl leading-tight text-balance mb-3 flex-1">
        {post.title}
      </h3>
      <p className="text-sm leading-relaxed text-ink/70 group-hover:text-bone/70 transition-colors text-pretty mb-5">
        {post.excerpt}
      </p>
      <span className="inline-flex items-center gap-2 label text-blood group-hover:text-bone mt-auto transition-colors">
        Preberi
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={2}
        />
      </span>
    </a>
  );
}
