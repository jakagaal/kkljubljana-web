export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date string (yyyy-mm-dd) */
  publishedAt: string;
  category: "Tekmovanja" | "Klub" | "Vadba" | "Tabori";
  cover?: string;
  /** Body paragraphs in order */
  content: string[];
};

// Placeholder posts — replace with real club news.
export const NEWS_POSTS: NewsPost[] = [
  {
    slug: "ep-tbilisi-2024-bor-bronast",
    title: "Bor Žibret bronast na EP v Tbilisiju",
    excerpt:
      "Na 14. evropskem prvenstvu kadetov, mladincev in U21 v Tbilisiju je Bor Žibret v kategoriji -76 kg osvojil bronasto medaljo.",
    publishedAt: "2024-02-11",
    category: "Tekmovanja",
    cover: "/competitors/bor-zibret/2.jpg",
    content: [
      "Bor Žibret je na 14. evropskem prvenstvu kadetov, mladincev in U21, ki je potekalo med 8. in 11. februarjem 2024 v Tbilisiju (Gruzija), v kategoriji kumite -76 kg osvojil bronasto medaljo.",
      "S to uvrstitvijo se je zapisal med najbolj uspešne mednarodne tekmovalce kluba in dokazal, da se trdo delo na treningih obrestuje na največjih tekmovanjih.",
      "Čestitamo Boru, njegovim trenerjem in celotni tekmovalni ekipi za odličen rezultat!",
    ],
  },
  {
    slug: "klub-leta-2022",
    title: "Karate Klub Ljubljana — klub leta 2022",
    excerpt:
      "Karate zveza Slovenije je naš klub na podlagi doseženih rezultatov razglasila za najboljši klub v Sloveniji v letu 2022.",
    publishedAt: "2022-12-15",
    category: "Klub",
    cover: "/competitors/group/5.jpg",
    content: [
      "Karate zveza Slovenije je Karate Klub Ljubljana na podlagi doseženih tekmovalnih rezultatov razglasila za najboljši klub v Sloveniji za leto 2022.",
      "Priznanje pripada vsem našim tekmovalcem, trenerjem in podpornikom, ki so v sezoni 2022 prispevali k temu velikemu uspehu kluba.",
      "Zahvaljujemo se vsem članom, ki so del te zgodbe — od najmlajših vadečih do vrhunskih tekmovalcev.",
    ],
  },
  {
    slug: "elizabeta-molnar-series-a-2025",
    title: "Elizabeta Molnar druga na Series A",
    excerpt:
      "Elizabeta Molnar je v sezoni 2025 osvojila srebrno medaljo na turnirju serije A Karate1.",
    publishedAt: "2025-04-20",
    category: "Tekmovanja",
    cover: "/competitors/elizabeta-molnar/1.jpg",
    content: [
      "Elizabeta Molnar je v letu 2025 osvojila srebrno medaljo na turnirju Karate1 Series A in se s tem še enkrat dokazala v elitni mednarodni konkurenci.",
      "Elizabeta je v zadnjih letih nanizala vrsto medalj na največjih mednarodnih tekmovanjih — od EP, SP do World Combat Games. Njena pot je zgled, kako vztrajno delo in profesionalen pristop pripeljeta do vrhunskih rezultatov.",
    ],
  },
  {
    slug: "zacetek-sezone-2025-26",
    title: "Začetek nove sezone 2025/26",
    excerpt:
      "S septembrom 2025 zaganjamo novo tekmovalno in vadbeno sezono. Vpisi za otroke, mladostnike in odrasle so odprti.",
    publishedAt: "2025-09-01",
    category: "Klub",
    cover: "/competitors/group/2.jpg",
    content: [
      "Septembra 2025 začenjamo novo vadbeno in tekmovalno sezono na obeh klubskih lokacijah — OŠ Mirana Jarca v Bežigradu in OŠ Martina Krpana na Fužinah.",
      "Vpisi za nove člane so odprti za vse starostne skupine. Prvi obisk je brezplačen — pridi na trening in se preizkusi.",
      "Več informacij o terminih in skupinah najdeš v sekciji Urnik na naši spletni strani.",
    ],
  },
  {
    slug: "zala-bronasta-leshan-2026",
    title: "Zala Marija Žibret bronasta na Premier League Leshan",
    excerpt:
      "Naša tekmovalka je v začetku 2026 osvojila bronasto medaljo na turnirju Karate1 Premier League v kitajskem Leshanu.",
    publishedAt: "2026-03-15",
    category: "Tekmovanja",
    cover: "/competitors/zala-marija-zibret/1.jpg",
    content: [
      "Zala Marija Žibret je marca 2026 v Leshanu (Kitajska) osvojila bronasto medaljo na turnirju Karate1 Premier League — najprestižnejši turnirski seriji svetovne karate zveze.",
      "Z uvrstitvijo na stopničke se je Zala potrdila kot ena izmed najbolj obetavnih slovenskih kumite tekmovalk svoje generacije.",
      "Čestitamo Zali, trenerjem in celotni tekmovalni ekipi za odličen začetek sezone!",
    ],
  },
];

export function getPost(slug: string): NewsPost | undefined {
  return NEWS_POSTS.find((p) => p.slug === slug);
}

export function getSortedPosts(): NewsPost[] {
  return [...NEWS_POSTS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function formatDate(iso: string): string {
  const months = [
    "januar",
    "februar",
    "marec",
    "april",
    "maj",
    "junij",
    "julij",
    "avgust",
    "september",
    "oktober",
    "november",
    "december",
  ];
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}. ${months[m - 1]} ${y}`;
}
