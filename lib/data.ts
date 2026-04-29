export const NAV_ITEMS = [
  { id: "domov", label: "Domov", number: "01", href: "/#domov" },
  { id: "o-nas", label: "O nas", number: "02", href: "/o-nas" },
  { id: "ponudba", label: "Kaj ponujamo", number: "03", href: "/#ponudba" },
  { id: "tekmovalci", label: "Tekmovalci", number: "04", href: "/tekmovalci" },
  { id: "novice", label: "Novice", number: "05", href: "/novice" },
  { id: "izpiti", label: "Izpiti", number: "06", href: "/#izpiti" },
  { id: "urnik", label: "Urnik", number: "07", href: "/#urnik" },
  { id: "kontakt", label: "Kontakt", number: "08", href: "/#kontakt" },
] as const;

// Update these to the real URLs.
export const SOCIALS = {
  facebook: "https://www.facebook.com/karateklub.ljubljana",
  instagram: "https://www.instagram.com/karateklubljubljana/",
} as const;

export const STATS = [
  { value: "1971", label: "Leto ustanovitve" },
  { value: "140", label: "Aktivnih članov" },
  { value: "50+", label: "Državnih naslovov" },
  { value: "★", label: "Klub leta 2022" },
] as const;

export type TeamMember = {
  name: string;
  role: string;
  socials: { type: "facebook" | "instagram"; href: string }[];
  initials: string;
  accent?: boolean;
};

export const BOARD: TeamMember[] = [
  {
    name: "Marijana Jularić",
    role: "Predsednica kluba",
    initials: "MJ",
    accent: true,
    socials: [{ type: "facebook", href: "#" }],
  },
  {
    name: "Pavel Marđonović",
    role: "Član izvršnega odbora",
    initials: "PM",
    socials: [{ type: "facebook", href: "#" }],
  },
  {
    name: "Matija Matijević",
    role: "Član izvršnega odbora",
    initials: "MM",
    socials: [
      { type: "facebook", href: "#" },
      { type: "instagram", href: "#" },
    ],
  },
  {
    name: "Uroš Rozman",
    role: "Član izvršnega odbora",
    initials: "UR",
    socials: [{ type: "facebook", href: "#" }],
  },
];

export const COACHES = [
  "Marijana Jularić",
  "Matija Matijević",
  "Uroš Rozman",
  "Denis Gorenc",
  "Darko Mavec",
  "Hana Debeljak",
  "Erik Teo Košmrlj",
  "Elizabeta Molnar",
] as const;

export type Program = {
  number: string;
  title: string;
  ageRange: string;
  description: string;
  highlights: string[];
};

export const PROGRAMS: Program[] = [
  {
    number: "01",
    title: "Vadba za otroke",
    ageRange: "4 — 10 let",
    description:
      "Osredotočeni na ustrezen telesni in duševni razvoj. Podajamo vrednote kot sta kultura obnašanja in poštenje skozi igro in disciplino.",
    highlights: [
      "Telesni razvoj",
      "Vrednote in disciplina",
      "Igra in učenje",
    ],
  },
  {
    number: "02",
    title: "Rekreacija za odrasle",
    ageRange: "Vsi nivoji",
    description:
      "Strokovno vodena vadba za vse, ki jim skrb za lastno telesno zdravje in počutje predstavlja enega najpomembnejših življenjskih izzivov.",
    highlights: [
      "Telesna pripravljenost",
      "Sprostitev in tehnika",
      "Domač pristop",
    ],
  },
  {
    number: "03",
    title: "Treningi za tekmovalce",
    ageRange: "Vrhunski šport",
    description:
      "Trening na najvišji ravni za tekmovalce v katah in športnih borbah. Več kot 50 naslovov državnih prvakov pričajo o naši kakovosti.",
    highlights: [
      "Kate in kumite",
      "Mednarodne tekme",
      "Vrhunska priprava",
    ],
  },
];

export type Belt = {
  level: string;
  type: "KYU" | "DAN";
  name: string;
  hex: string;
  textOn: "light" | "dark";
};

export const BELTS: Belt[] = [
  { level: "8. KYU", type: "KYU", name: "Beli pas", hex: "#f5f1e8", textOn: "dark" },
  { level: "7. KYU", type: "KYU", name: "Beli pas", hex: "#f5f1e8", textOn: "dark" },
  { level: "6. KYU", type: "KYU", name: "Beli pas", hex: "#f5f1e8", textOn: "dark" },
  { level: "5. KYU", type: "KYU", name: "Rumeni pas", hex: "#f5c542", textOn: "dark" },
  { level: "4. KYU", type: "KYU", name: "Oranžni pas", hex: "#e36a1f", textOn: "light" },
  { level: "3. KYU", type: "KYU", name: "Zeleni pas", hex: "#1f7a3e", textOn: "light" },
  { level: "2. KYU", type: "KYU", name: "Modri pas", hex: "#1d3a8a", textOn: "light" },
  { level: "1. KYU", type: "KYU", name: "Rjavi pas", hex: "#5a3219", textOn: "light" },
  { level: "1. DAN", type: "DAN", name: "Črni pas", hex: "#0a0a0a", textOn: "light" },
];

export type ScheduleSession = {
  group: string;
  start: string;
  end: string;
  location: "Mirana Jarca" | "Martina Krpana";
  level: "beginners" | "intermediate" | "advanced" | "competitive" | "all";
};

export type ScheduleDay = {
  day: string;
  short: string;
  sessions: ScheduleSession[];
};

export const SCHEDULE: ScheduleDay[] = [
  {
    day: "Ponedeljek",
    short: "PON",
    sessions: [
      {
        group: "Začetniki, beli, rumeni pasovi",
        start: "14:45",
        end: "15:30",
        location: "Mirana Jarca",
        level: "beginners",
      },
      {
        group: "Oranžni in zeleni pasovi",
        start: "15:30",
        end: "16:30",
        location: "Mirana Jarca",
        level: "intermediate",
      },
      {
        group: "Modri in rjavi pasovi",
        start: "16:30",
        end: "17:30",
        location: "Mirana Jarca",
        level: "advanced",
      },
      {
        group: "Črni pasovi",
        start: "17:30",
        end: "19:00",
        location: "Mirana Jarca",
        level: "advanced",
      },
      {
        group: "Tekmovalna skupina",
        start: "19:30",
        end: "20:45",
        location: "Mirana Jarca",
        level: "competitive",
      },
    ],
  },
  {
    day: "Torek",
    short: "TOR",
    sessions: [
      {
        group: "Vse skupine",
        start: "18:30",
        end: "19:40",
        location: "Martina Krpana",
        level: "all",
      },
      {
        group: "Tekmovalna skupina",
        start: "19:30",
        end: "20:45",
        location: "Martina Krpana",
        level: "competitive",
      },
    ],
  },
  {
    day: "Sreda",
    short: "SRE",
    sessions: [
      {
        group: "Začetniki, beli, rumeni pasovi",
        start: "14:45",
        end: "15:30",
        location: "Mirana Jarca",
        level: "beginners",
      },
      {
        group: "Oranžni in zeleni pasovi",
        start: "15:30",
        end: "16:30",
        location: "Mirana Jarca",
        level: "intermediate",
      },
      {
        group: "Modri in rjavi pasovi",
        start: "16:30",
        end: "17:30",
        location: "Mirana Jarca",
        level: "advanced",
      },
      {
        group: "Mlajša tekmovalna skupina",
        start: "17:30",
        end: "18:45",
        location: "Martina Krpana",
        level: "competitive",
      },
      {
        group: "Črni pasovi",
        start: "17:30",
        end: "19:00",
        location: "Mirana Jarca",
        level: "advanced",
      },
      {
        group: "Tekmovalna skupina",
        start: "19:00",
        end: "20:30",
        location: "Martina Krpana",
        level: "competitive",
      },
    ],
  },
  {
    day: "Četrtek",
    short: "ČET",
    sessions: [
      {
        group: "Vse skupine",
        start: "18:30",
        end: "19:40",
        location: "Martina Krpana",
        level: "all",
      },
      {
        group: "Tekmovalna skupina",
        start: "19:30",
        end: "20:45",
        location: "Martina Krpana",
        level: "competitive",
      },
    ],
  },
];

export type Achievement = {
  year: string;
  event: string;
  category: string;
  result: string;
};

export type Competitor = {
  name: string;
  slug: string;
  discipline: "Kata" | "Kumite" | "Kata + Kumite";
  era?: string;
  highlight: string;
  photos: string[];
  achievements?: Achievement[];
};

// Photos are in /public/competitors/<slug>/{1,2}.jpg
// Disciplines + highlights are placeholders — replace with the real bio.
export const COMPETITORS: Competitor[] = [
  {
    name: "Zala Marija Žibret",
    slug: "zala-marija-zibret",
    discipline: "Kumite",
    era: "Tekmovalna skupina",
    highlight:
      "Mednarodna tekmovalka v borbah — bronasta na EP Zadar 2024 in Premier League Leshan 2026, večkratna državna prvakinja.",
    photos: [
      "/competitors/zala-marija-zibret/1.jpg",
      "/competitors/zala-marija-zibret/2.jpg",
    ],
    achievements: [
      { year: "2024", event: "EP Zadar", category: "Kumite", result: "3. mesto" },
      { year: "2026", event: "Premier League Leshan", category: "Kumite", result: "3. mesto" },
      { year: "2026", event: "Premier League Istanbul", category: "Kumite", result: "7. mesto" },
      { year: "2023", event: "EP Guadalajara", category: "Kumite", result: "7. mesto" },
      { year: "2024", event: "Balkansko prvenstvo", category: "Seniors & U21", result: "2. mesto" },
      { year: "2023—25", event: "Državno prvenstvo", category: "Seniors & U21", result: "1. mesto" },
      { year: "2021—25", event: "Youth League", category: "Skupaj", result: "5× medalj" },
    ],
  },
  {
    name: "Elizabeta Molnar",
    slug: "elizabeta-molnar",
    discipline: "Kata + Kumite",
    era: "Tekmovalna skupina",
    highlight:
      "Vrhunska mednarodna tekmovalka — medalje na SP, EP, World Combat Games in Premier League seriji.",
    photos: [
      "/competitors/elizabeta-molnar/1.jpg",
      "/competitors/elizabeta-molnar/2.jpg",
    ],
    achievements: [
      { year: "2018", event: "EP Sochi", category: "Kumite", result: "2. mesto" },
      { year: "2022", event: "SP Konya", category: "Kumite", result: "3. mesto" },
      { year: "2023", event: "World Combat Games", category: "Kumite", result: "3. mesto" },
      { year: "2024", event: "EP Tbilisi", category: "Kumite", result: "3. mesto" },
      { year: "2025", event: "Series A", category: "Kumite", result: "2. mesto" },
      { year: "2019", event: "Youth League Cyprus", category: "Kumite", result: "1. mesto" },
      { year: "2024", event: "Youth League Poreč", category: "Kumite", result: "1. mesto" },
      { year: "2018", event: "Youth League Venice", category: "Kumite", result: "3. mesto" },
    ],
  },
  {
    name: "Hana Debeljak",
    slug: "hana-debeljak",
    discipline: "Kata",
    era: "Tekmovalna skupina",
    highlight:
      "Tekmovalka v katah — srebrna na Mladinskem EP U21 (2024) in zmagovalka Youth League Cyprus 2023.",
    photos: [
      "/competitors/hana-debeljak/1.jpg",
      "/competitors/hana-debeljak/2.jpg",
    ],
    achievements: [
      { year: "2024", event: "Mladinsko EP", category: "U21", result: "2. mesto" },
      { year: "2023", event: "Youth League Cyprus", category: "U21", result: "1. mesto" },
      { year: "2022", event: "Venice Cup", category: "Članice", result: "1. mesto" },
      { year: "2024", event: "EP Yerevan", category: "Članice", result: "9. mesto" },
      { year: "2022", event: "Venice Cup", category: "U21", result: "2. mesto" },
      { year: "2025", event: "Venice Cup", category: "Članice", result: "3. mesto" },
      { year: "2022", event: "Balkansko mladinsko", category: "U21", result: "2. mesto" },
      { year: "2021", event: "Youth League Cyprus", category: "Mladinke", result: "3. mesto" },
    ],
  },
  {
    name: "Bor Žibret",
    slug: "bor-zibret",
    discipline: "Kumite",
    era: "Tekmovalna skupina",
    highlight:
      "Tekmovalec v kategoriji -76 kg — bronast na EP Tbilisi, Balkanski prvak in 7× državni prvak.",
    photos: ["/competitors/bor-zibret/1.jpg", "/competitors/bor-zibret/2.jpg"],
    achievements: [
      { year: "2024", event: "EP Tbilisi", category: "Kumite -76 kg", result: "3. mesto" },
      { year: "2024", event: "Balkansko prvenstvo Ljubljana", category: "Kumite -76 kg", result: "1. mesto" },
      { year: "2023", event: "Balkansko prvenstvo Sarajevo", category: "Kumite -76 kg", result: "3. mesto" },
      { year: "2024", event: "Balkansko prvenstvo Bar", category: "Ekipni kumite", result: "3. mesto" },
      { year: "2024", event: "Youth League Jesolo", category: "Kumite", result: "1. mesto" },
      { year: "2023", event: "Youth League Acapulco", category: "Kumite", result: "3. mesto" },
      { year: "2018—25", event: "Državno prvenstvo", category: "Kumite", result: "7× naslov" },
    ],
  },
  {
    name: "Taša Mau Mužik",
    slug: "tasa-mau-muzik",
    discipline: "Kata",
    era: "Tekmovalna skupina",
    highlight: "Tekmovalka v katah, članica tekmovalne skupine.",
    photos: [
      "/competitors/tasa-mau-muzik/1.jpg",
      "/competitors/tasa-mau-muzik/2.jpg",
    ],
  },
  {
    name: "Matej Gorišek",
    slug: "matej-gorisek",
    discipline: "Kumite",
    era: "Tekmovalna skupina",
    highlight: "Tekmovalec v borbah, član tekmovalne skupine kluba.",
    photos: [
      "/competitors/matej-gorisek/1.jpg",
      "/competitors/matej-gorisek/2.jpg",
    ],
  },
  {
    name: "Erik Teo Košmrlj",
    slug: "erik-teo-kosmrlj",
    discipline: "Kumite",
    era: "Tekmovalna skupina",
    highlight: "Mladi tekmovalec v borbah, član tekmovalne skupine kluba.",
    photos: [
      "/competitors/erik-teo-kosmrlj/1.jpg",
      "/competitors/erik-teo-kosmrlj/2.jpg",
    ],
  },
  {
    name: "Nick Gostiša van Genick",
    slug: "nick-gostisa-van-genick",
    discipline: "Kumite",
    era: "Tekmovalna skupina",
    highlight:
      "Mladinec v borbah — državni reprezentant v kategoriji -68 kg.",
    photos: [
      "/competitors/nick-gostisa-van-genick/1.jpg",
      "/competitors/nick-gostisa-van-genick/2.jpg",
    ],
    achievements: [
      { year: "2024", event: "Državno prvenstvo", category: "Mladinci -68 kg", result: "3. mesto" },
    ],
  },
  {
    name: "Živa Kristjančič",
    slug: "ziva-kristjancic",
    discipline: "Kata + Kumite",
    era: "Tekmovalna skupina",
    highlight:
      "Vsestranska tekmovalka — srebrna na Balkanskem prvenstvu U21 (Rijeka 2025) in državna prvakinja U21.",
    photos: [
      "/competitors/ziva-kristjancic/1.jpg",
      "/competitors/ziva-kristjancic/2.jpg",
    ],
    achievements: [
      { year: "2025", event: "Balkan U21 Rijeka", category: "U21 / Juniors / Cadets", result: "2. mesto" },
      { year: "2025", event: "Državno prvenstvo U21", category: "Kumite", result: "1. mesto" },
    ],
  },
  {
    name: "Edna Kurbegović",
    slug: "edna-kurbegovic",
    discipline: "Kumite",
    era: "Tekmovalna skupina",
    highlight:
      "Mladinka v borbah — državna prvakinja in dvakrat na stopničkah.",
    photos: [
      "/competitors/edna-kurbegovic/1.jpg",
      "/competitors/edna-kurbegovic/2.jpg",
    ],
    achievements: [
      { year: "2024", event: "Mladinsko državno", category: "Mladinke -53 kg", result: "1. mesto" },
      { year: "2025", event: "Člansko državno", category: "Članice -55 kg", result: "2. mesto" },
      { year: "2024", event: "Croatia Open", category: "Mladinke -53 kg", result: "3. mesto" },
    ],
  },
];

// Group/team photos for the showcase gallery.
export const GROUP_PHOTOS = [
  { src: "/competitors/group/5.jpg", caption: "Tekmovalna ekipa z osvojenimi medaljami" },
  { src: "/competitors/group/2.jpg", caption: "Ženska tekmovalna postava" },
  { src: "/competitors/group/1.jpg", caption: "Tekmovalca v studijskem portretu" },
  { src: "/competitors/group/4.jpg", caption: "Ekipa pred treningom" },
  { src: "/competitors/group/3.jpg", caption: "Mlada tekmovalna generacija" },
];

export const COMPETITION_STATS = [
  { value: "50+", label: "Državnih naslovov", note: "1991—2000" },
  { value: "1", label: "Medalja na SP/EP", note: "Stanovnik" },
  { value: "★", label: "Klub leta", note: "2022" },
  { value: `${10}`, label: "Aktivnih tekmovalcev", note: "Trenutno" },
] as const;

export type Contact = {
  name: string;
  location: string;
  district: string;
  phone: string;
  phoneClean: string;
};

export const CONTACTS: Contact[] = [
  {
    name: "Marijana Jularič",
    location: "OŠ Martina Krpana",
    district: "Fužine",
    phone: "031 312 813",
    phoneClean: "+386031312813",
  },
  {
    name: "Matija Matijevič",
    location: "OŠ Martina Krpana",
    district: "Fužine",
    phone: "040 872 690",
    phoneClean: "+386040872690",
  },
  {
    name: "Uroš Rozman",
    location: "OŠ Mirana Jarca",
    district: "Bežigrad",
    phone: "041 357 787",
    phoneClean: "+386041357787",
  },
];

export const EMAIL = "karateklub.lj@gmail.com";

export const HISTORY = [
  {
    year: "1971",
    title: "Ustanovitev",
    body:
      "Klub ustanovljen kot Društvo za borilne veščine Ljubljana (DBV Ljubljana). Eden prvih in najstarejših v Sloveniji.",
  },
  {
    year: "70'",
    title: "Množični klub",
    body:
      "Pod vodstvom Franca Kotarja klub postane množičen, vsestranski in razvije izjemno družabno življenje s preko 500 člani.",
  },
  {
    year: "85'",
    title: "Preusmeritev",
    body:
      "Vodstvo prevzamejo Ciril Klajnšček, Bojan Bensa in Darko Mavec. Klub se preusmeri v športno smer.",
  },
  {
    year: "91—00",
    title: "Zlata doba",
    body:
      "Več kot 50 naslovov državnih prvakov v katah in športnih borbah. Klemen Stanovnik osvoji prvo medaljo na svetovnem in evropskem prvenstvu za samostojno Slovenijo.",
  },
  {
    year: "2011",
    title: "Nova generacija",
    body:
      "Klub prevzamejo Uroš Rozman, Marijana Jularić, Špela Muha in Matija Matijević — vrhunski mednarodni tekmovalci.",
  },
  {
    year: "2022",
    title: "Najboljši v Sloveniji",
    body:
      "Karate zveza Slovenije nas razglasi za najboljši klub v Sloveniji med vsemi registriranimi klubi.",
  },
] as const;
