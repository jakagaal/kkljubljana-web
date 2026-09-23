/**
 * Central SEO configuration.
 *
 * The values in CLUB_NAP below are what Google reads for local search. They MUST
 * match the Google Business Profile character for character — a mismatch between
 * the site and the profile is one of the strongest negative local ranking signals.
 *
 * Naslov in telefon sta potrjena septembra 2026 in se ujemata z zapisom kluba v
 * poslovnem registru. Telefon ni nobena od treh trenerskih številk na strani —
 * to je uradna klubska številka in tu mora ostati prav ta.
 */

import { SCHEDULE } from "./data";

export const SITE_URL = "https://www.kkljubljana.com";

export const SITE_NAME = "Karate Klub Ljubljana";

/** Name, address, phone — the "NAP" trio Google matches against the profile. */
export const CLUB_NAP = {
  legalName: "Karate klub Ljubljana",
  streetAddress: "Šerkova ulica 1",
  postalCode: "1000",
  addressLocality: "Ljubljana",
  addressCountry: "SI",
  /** Display form, used in the page footer. */
  phone: "041 699 221",
  /** E.164 form, used in tel: links and structured data. */
  phoneE164: "+38641699221",
  email: "karateklub.lj@gmail.com",
} as const;

/**
 * Where training actually happens. Both addresses verified against the schools.
 *
 * `scheduleKey` joins a venue to SCHEDULE, which refers to the same two places
 * by a shorter name ("Mirana Jarca" rather than "OŠ Mirana Jarca").
 */
export const TRAINING_VENUES = [
  {
    name: "OŠ Martina Krpana",
    scheduleKey: "Martina Krpana",
    district: "Fužine",
    streetAddress: "Gašperšičeva ulica 10",
    postalCode: "1000",
    addressLocality: "Ljubljana",
  },
  {
    name: "OŠ Mirana Jarca",
    scheduleKey: "Mirana Jarca",
    district: "Bežigrad",
    streetAddress: "Ipavčeva ulica 1",
    postalCode: "1000",
    addressLocality: "Ljubljana",
  },
] as const;

/** Shared social-sharing image. Every page points at this one file. */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Karate Klub Ljubljana — karate za otroke in odrasle od 1971",
} as const;

const DAY_NAMES: Record<string, string> = {
  Ponedeljek: "Monday",
  Torek: "Tuesday",
  Sreda: "Wednesday",
  Četrtek: "Thursday",
  Petek: "Friday",
  Sobota: "Saturday",
  Nedelja: "Sunday",
};

/**
 * Collapses the training timetable into one open-from/open-until span per day
 * for one venue. Google reads these as the hours somebody can turn up and find
 * the club there, which is the span of the day's sessions — not each session.
 */
function openingHoursFor(scheduleKey: string) {
  return SCHEDULE.flatMap((day) => {
    const here = day.sessions.filter((s) => s.location === scheduleKey);
    if (here.length === 0) return [];

    const dayOfWeek = DAY_NAMES[day.day];
    if (!dayOfWeek) return [];

    return [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${dayOfWeek}`,
        opens: here.reduce((a, s) => (s.start < a ? s.start : a), here[0].start),
        closes: here.reduce((a, s) => (s.end > a ? s.end : a), here[0].end),
      },
    ];
  });
}

/** Profiles Google uses to confirm this is the same organisation. */
export const SAME_AS = [
  "https://www.facebook.com/karateklubljubljana",
  "https://www.instagram.com/karateklubljubljana/",
  "https://www.youtube.com/@karateklubljubljana",
] as const;

const postalAddress = (a: {
  streetAddress: string;
  postalCode: string;
  addressLocality: string;
}) => ({
  "@type": "PostalAddress",
  streetAddress: a.streetAddress,
  postalCode: a.postalCode,
  addressLocality: a.addressLocality,
  addressCountry: CLUB_NAP.addressCountry,
});

/**
 * The club itself. Emitted once, on every page, with a stable @id so every other
 * block on the site can point at this one entity instead of redescribing it.
 */
export function clubSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsClub",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: CLUB_NAP.legalName,
    alternateName: ["KK Ljubljana", "Karate klub Ljubljana"],
    description:
      "Karate klub Ljubljana, ustanovljen leta 1971. Vadba karateja za otroke, rekreativce in tekmovalce na dveh lokacijah v Ljubljani.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/opengraph-image`,
    foundingDate: "1971",
    email: CLUB_NAP.email,
    telephone: CLUB_NAP.phoneE164,
    sport: "Karate",
    address: postalAddress(CLUB_NAP),
    areaServed: { "@type": "City", name: "Ljubljana" },
    sameAs: [...SAME_AS],
    location: TRAINING_VENUES.map((v) => ({
      "@type": "SportsActivityLocation",
      name: `${SITE_NAME} — ${v.district}`,
      description: `Vadba karateja v telovadnici ${v.name}, ${v.district}.`,
      address: postalAddress(v),
      containedInPlace: { "@type": "Place", name: v.name },
      openingHoursSpecification: openingHoursFor(v.scheduleKey),
    })),
  };
}

/** Lets Google show a search box for the site and fixes the displayed site name. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "sl-SI",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/** Renders the breadcrumb trail the pages already show visually. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function newsArticleSchema(post: {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  cover?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    inLanguage: "sl-SI",
    mainEntityOfPage: `${SITE_URL}/novice/${post.slug}`,
    image: post.cover ? [`${SITE_URL}${post.cover}`] : undefined,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}
