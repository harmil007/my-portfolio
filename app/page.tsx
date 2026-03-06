import { Navbar } from "@/components/layout/navbar";
import Hero from "@/components/sections/Hero/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import Services from "@/components/sections/service";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
