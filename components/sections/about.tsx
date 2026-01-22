"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl px-4 sm:px-6"
      >
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            About Me
          </h2>
          <Separator className="mt-4 w-16 sm:w-20 bg-primary" />
        </div>

        <div className="rounded-xl border bg-card p-5 sm:p-6 md:p-8 shadow-sm">
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            I’m a{" "}
            <span className="font-medium text-foreground">
              Frontend Web Developer
            </span>{" "}
            with <span className="font-medium text-foreground">3+ years</span>{" "}
            of professional experience building scalable, high-performance web
            applications using{" "}
            <span className="font-medium text-foreground">React.js</span> and{" "}
            <span className="font-medium text-foreground">Next.js</span>. I
            specialize in translating complex business requirements into clean,
            intuitive, and responsive user interfaces.
          </p>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
            I’ve worked closely with designers, backend engineers, and product
            teams in remote and cross-functional environments. I enjoy solving
            UI/UX challenges, optimizing performance, and building products that
            users genuinely enjoy using.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
