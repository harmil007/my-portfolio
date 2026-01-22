"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

export default function Experience() {
  return (
    <section id="experience" className="relative py-28">
      {/* background accent */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Experience
          </h2>
          <Separator className="mt-4 w-20 bg-primary" />
        </div>

        {/* Timeline */}
        <div className="relative border-l border-border pl-8">
          {/* Timeline Dot */}
          <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border bg-card p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold">Frontend Web Developer</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Dignizant Technologies LLP •{" "}
              <span className="font-medium">3+ Years</span>
            </p>

            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-0.5 text-primary">▹</span>
                Developed scalable and reusable React and Next.js components for
                production-grade applications.
              </li>

              <li className="flex gap-2">
                <span className="mt-0.5 text-primary">▹</span>
                Collaborated with designers and backend engineers to deliver
                high-quality UI aligned with business requirements.
              </li>

              <li className="flex gap-2">
                <span className="mt-0.5 text-primary">▹</span>
                Improved application performance, navigation clarity, and
                overall user experience.
              </li>

              <li className="flex gap-2">
                <span className="mt-0.5 text-primary">▹</span>
                Worked in Agile/Scrum environments with Git-based workflows.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
