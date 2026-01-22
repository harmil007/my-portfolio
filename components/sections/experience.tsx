"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 sm:mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Experience</h2>
          <Separator className="mb-8" />
        </div>

        <div className="relative border-l border-border pl-6 sm:pl-8">
          <span className="absolute -left-[7px] sm:-left-[9px] top-2 h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-primary" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              rounded-xl border bg-card
              p-4 sm:p-6
              shadow-sm
            "
          >
            <h3 className="text-base sm:text-lg font-semibold">
              Frontend Web Developer
            </h3>

            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Dignizant Technologies LLP •{" "}
              <span className="font-medium">3+ Years</span>
            </p>

            <ul className="mt-4 space-y-3 text-sm sm:text-base text-muted-foreground">
              {[
                "Developed scalable and reusable React and Next.js components for production-grade applications.",
                "Collaborated with designers and backend engineers to deliver high-quality UI aligned with business requirements.",
                "Improved application performance, navigation clarity, and overall user experience.",
                "Worked in Agile/Scrum environments with Git-based workflows.",
              ].map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span className="mt-0.5 text-primary">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
