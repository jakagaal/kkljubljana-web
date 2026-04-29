import type { Metadata } from "next";
import { Big_Shoulders, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Karate Klub Ljubljana — Več kot le klub od 1971",
  description:
    "Karate Klub Ljubljana — eden najstarejših slovenskih karate klubov, ustanovljen leta 1971. Vadba karateja za otroke, rekreativce in tekmovalce. 140 članov. Najboljši klub Slovenije 2022.",
  keywords: [
    "karate",
    "Ljubljana",
    "karate klub",
    "borilne veščine",
    "Fužine",
    "Bežigrad",
    "Marijana Jularič",
  ],
  metadataBase: new URL("https://karateklubljubljana.si"),
  openGraph: {
    title: "Karate Klub Ljubljana — od 1971",
    description: "Več kot le klub. Vadba karateja za vse generacije.",
    locale: "sl_SI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="sl"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-bone text-ink antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
