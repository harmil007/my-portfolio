"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 30%"],
  });

  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 100,
    damping: 25,
  });

  const bulletItems = [
    "Developed scalable and reusable React and Next.js components for production-grade applications.",
    "Collaborated with designers and backend engineers to deliver high-quality UI aligned with business requirements.",
    "Improved application performance, navigation clarity, and overall user experience.",
    "Worked in Agile/Scrum environments with Git-based workflows.",
  ];

  return (
    <section id="experience" ref={containerRef} className="relative py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 sm:mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Experience</h2>
          <Separator className="mb-8" />
        </div>

        <div className="relative pl-8 sm:pl-10">
          {/* Base Timeline Track Line */}
          <div className="absolute left-3.5 sm:left-4 top-2 bottom-2 w-[2px] bg-border/40" />

          {/* Animated Scroll Progress Line */}
          {!shouldReduceMotion && (
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute left-3.5 sm:left-4 top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary via-primary/80 to-primary/40 shadow-[0_0_12px_rgba(97,218,251,0.5)]"
            />
          )}

          {/* Experience Item Card */}
          <div className="relative">
            {/* Glowing Active Dot Node */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0.5 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4 }}
              className="absolute -left-[37px] sm:-left-[41px] top-1.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-background border-2 border-primary shadow-[0_0_15px_rgba(97,218,251,0.6)]"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] as const }}
              className="rounded-2xl border border-border/20 bg-card p-6 sm:p-8 shadow-inset-md backdrop-blur-sm transition-colors hover:border-primary/30"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/10 pb-4 mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    Frontend Web Developer
                  </h3>
                  <p className="text-sm font-terminal text-primary font-medium mt-0.5">
                    Dignizant Technologies LLP
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20 w-max">
                  3+ Years Experience
                </span>
              </div>

              <ul className="space-y-3.5 text-sm sm:text-base text-muted-foreground">
                {bulletItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex gap-3 items-start"
                  >
                    <span className="mt-1 text-primary text-xs flex-shrink-0">▹</span>
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
