import { Navbar } from "@/components/layout/navbar";
import Hero from "@/components/sections/Hero/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <main className="mx-auto max-w-6xl px-4">
        <Projects />
        <Contact />
      </main>
    </>
  );
}
