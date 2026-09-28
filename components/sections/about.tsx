"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useSpring(useTransform(scrollYProgress, [0, 1], [-20, 20]), {
    stiffness: 80,
    damping: 20,
  });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-20 sm:py-24 lg:py-28 overflow-clip"
    >
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : bgY }}
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-primary/5"
      />

      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] as const }}
        className="mx-auto max-w-6xl px-4 sm:px-6"
      >
        <div className="mb-8 sm:mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-4">About Me</h2>
          <Separator className="mb-8" />
        </div>

        <div className="rounded-2xl bg-card/90 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-inset-md transition-all duration-300 ease-out border border-border/20 hover:border-primary/30">
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            I’m a{" "}
            <span className="font-medium text-foreground">
              Frontend & React Native Developer
            </span>{" "}
            with <span className="font-medium text-foreground">4 years</span> of
            professional experience building scalable, high-performance web
            applications with{" "}
            <span className="font-medium text-foreground">React.js</span> and{" "}
            <span className="font-medium text-foreground">Next.js</span>, while
            also developing cross-platform mobile applications using{" "}
            <span className="font-medium text-foreground">React Native</span>. I
            specialize in turning complex business requirements into clean,
            intuitive, responsive, and maintainable user experiences.
          </p>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
            I’ve worked closely with designers, backend engineers, and product
            teams in remote and cross-functional environments. I enjoy solving
            UI/UX challenges, improving application performance, designing
            scalable frontend architecture, and using modern tools and
            AI-assisted workflows to build products faster without compromising
            quality.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
