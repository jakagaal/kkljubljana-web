import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Programs } from "@/components/sections/Programs";
import { ChampionsTeaser } from "@/components/sections/ChampionsTeaser";
import { Belts } from "@/components/sections/Belts";
import { Schedule } from "@/components/sections/Schedule";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Programs />
        <ChampionsTeaser />
        <Belts />
        <Schedule />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
