"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { InteractiveCube } from "@/components/sections/Hero";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rawCubeY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const textY = useSpring(rawY, { stiffness: 90, damping: 20 });
  const cubeY = useSpring(rawCubeY, { stiffness: 90, damping: 20 });
  const contentOpacity = useSpring(rawOpacity, { stiffness: 90, damping: 20 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  const cubeVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.9,
        delay: 0.45,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative overflow-hidden bg-[var(--bg-page)] min-h-[90vh] flex items-center justify-center transition-colors duration-500"
    >
      {/* Subtle Noise Grain Overlay */}
      <div className="noise-overlay" />

      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : textY,
          opacity: shouldReduceMotion ? 1 : contentOpacity,
        }}
        className="relative z-10 mx-auto max-w-6xl w-full flex min-h-[90vh] flex-col items-center justify-between gap-12 md:flex-row px-6 py-12 md:py-0"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8 w-full md:w-auto"
        >
          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold md:text-6xl mt-8 md:mt-0 leading-tight"
          >
            <span
              className="block text-2xl md:text-3xl font-terminal tracking-[0.2em] text-[#8a9bb0] uppercase mb-4"
              style={{ fontVariant: "small-caps" }}
            >
              Hi, I’m{" "}
              <span className="inline-block animate-bounce ml-1">👋</span>
            </span>

            {/* Glowing Name synced to active brand color with optimized readability */}
            <span
              className="inline-block font-display font-extrabold tracking-tighter my-2 transition-all duration-700 ease-out"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
                lineHeight: "0.95",
                color:
                  "color-mix(in oklab, var(--glow-color, #61dafb) 40%, var(--color-text-heading, #242323))",
                textShadow: `
                  0 0 12px color-mix(in oklab, var(--glow-color, #61dafb) 35%, transparent),
                  0 0 30px color-mix(in oklab, var(--glow-color, #61dafb) 15%, transparent),
                  0 0 60px color-mix(in oklab, var(--glow-color, #61dafb) 8%, transparent)
                `,
              }}
            >
              Harmil Goti
            </span>

            {/* Terminal Subtitle */}
            <span
              className="block font-terminal uppercase tracking-[0.3em] text-primary text-sm md:text-base mt-4 font-semibold"
              style={{ fontVariant: "small-caps" }}
            >
              Frontend Developer
            </span>

            <span className="block mt-4 text-base md:text-lg font-terminal text-muted-foreground tracking-wide font-normal">
              Creator of{" "}
              <a
                href="https://tailwindthememaker.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors border-b border-dashed border-muted-foreground/40 hover:border-primary font-medium"
              >
                TailwindThemeMaker
              </a>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-xl text-base md:text-lg text-muted-foreground font-terminal leading-relaxed tracking-wide"
          >
            Frontend Developer with over 4 years of experience building
            scalable, high-performance web applications using React.js and
            Next.js.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
            <Button
              size="lg"
              asChild
              className="btn-neumorphic-primary px-8 py-6 text-sm md:text-base tracking-wider h-auto font-terminal"
            >
              <a href="#projects" className="flex items-center gap-2">
                {/* Elegant Folder Icon */}
                <svg
                  className="w-4 h-4 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                View Projects
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="btn-neumorphic px-8 py-6 text-sm md:text-base tracking-wider h-auto font-terminal"
            >
              <a
                href="/Harmil_Goti_Resume.pdf"
                target="_blank"
                className="flex items-center gap-2"
              >
                {/* Elegant File Icon */}
                <svg
                  className="w-4 h-4 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* 3D Skill Cube Wrapper */}
        <motion.div
          variants={cubeVariants}
          initial="hidden"
          animate="visible"
          style={{ y: shouldReduceMotion ? 0 : cubeY }}
          className="flex items-center justify-center w-full md:w-auto mt-8 md:mt-0"
        >
          <InteractiveCube />
        </motion.div>
      </motion.div>
    </section>
  );
}
