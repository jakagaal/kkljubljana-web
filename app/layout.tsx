import type { Metadata } from "next";
import Script from "next/script";
import { Big_Shoulders, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import {
  clubSchema,
  websiteSchema,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

const display = Big_Shoulders({
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Karate Klub Ljubljana — karate za otroke in odrasle od 1971",
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Karate Klub Ljubljana — eden najstarejših slovenskih karate klubov, ustanovljen leta 1971. Vadba karateja za otroke, rekreativce in tekmovalce na Fužinah in za Bežigradom. 140 članov. Najboljši klub Slovenije 2022—2024.",
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    siteName: SITE_NAME,
    title: "Karate Klub Ljubljana — od 1971",
    description:
      "Več kot le klub. Vadba karateja za otroke, rekreativce in tekmovalce v Ljubljani.",
    url: SITE_URL,
    images: [OG_IMAGE],
    locale: "sl_SI",
    type: "website",
  },
};

/**
 * Umami Cloud. Cookieless and stores nothing on the visitor's device, so the
 * site needs no consent banner. Renders nothing until the website id is set,
 * which keeps local and preview builds free of tracking.
 */
function Analytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!websiteId) return null;
  return (
    <Script
      src="https://cloud.umami.is/script.js"
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="sl"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-bone text-ink antialiased overflow-x-hidden">
        <JsonLd data={[clubSchema(), websiteSchema()]} />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
