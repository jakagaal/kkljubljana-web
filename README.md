# Karate Klub Ljubljana — Website

> Več kot le klub. Od 1971.

Built with **Next.js 15**, **React 19**, **Tailwind CSS v4**, and **TypeScript**.
Mobile-first, sharp black/blood-red/bone palette, editorial typography.

## Getting started

```bash
pnpm install   # or: npm install / yarn / bun install
pnpm dev
```

Open <http://localhost:3000>.

## Build

```bash
pnpm build
pnpm start
```

## Structure

```
app/
  layout.tsx          # Root layout, fonts, metadata
  page.tsx            # Composes all sections
  globals.css         # Tailwind v4 theme + utilities
components/
  Navbar.tsx          # Sticky nav with mobile menu
  Footer.tsx          # Marquee + sitemap
  ui/                 # Reusable primitives
    Container.tsx
    SectionHeader.tsx
    Logo.tsx
    Button.tsx
    Icons.tsx
    Reveal.tsx        # Scroll-triggered fade-up
  sections/           # Page sections
    Hero.tsx          # Domov
    About.tsx         # O nas + zgodovina + trenerji
    Team.tsx          # Vodstvo (izvršni odbor)
    Programs.tsx      # Kaj ponujamo
    Belts.tsx         # Izpiti — vizualna progresija pasov
    Schedule.tsx      # Urnik treningov
    Contact.tsx       # Kontakti + email
lib/
  data.ts             # Vsi podatki kluba (teksti, urnik, kontakti)
  clsx.ts             # Tiny class-name helper
```

## Design notes

- **Typography:** Big Shoulders Display (heavy condensed) for display, Inter for
  body, JetBrains Mono for labels and numbers.
- **Color tokens:** `ink` (#0a0a0a), `blood` (#cc1f2c), `bone` (#f5f1e8), plus
  variants. Defined as Tailwind v4 `@theme` tokens in `app/globals.css`.
- **Mobile-first:** Every section reflows for small viewports. Schedule has a
  stacked card layout on mobile, grid layout from `lg:` up.
- **Accessibility:** Sections use semantic landmarks, color contrast meets WCAG
  AA on the blood/bone and ink/bone pairings.

## Replace placeholders

The board portraits use initials on a corner-cut card — swap them for real
photos by adding `<Image>` elements in `components/sections/Team.tsx`.
