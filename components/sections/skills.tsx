"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const skills = {
  Frontend: ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript"],
  "UI & Styling": [
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Ant Design",
    "Material UI",
    "Chakra UI",
    "LESS",
  ],
  "State & Data": ["Redux Toolkit", "REST APIs", "WebSockets"],
  "Tools & Workflow": ["Git", "GitHub", "Agile / Scrum"],
  Strengths: [
    "Problem Solving",
    "Responsive Design",
    "Performance Optimization",
    "Remote Collaboration",
  ],
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 sm:mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Skills</h2>
          <Separator className="mb-8" />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="
            grid gap-6
            sm:gap-8
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {Object.entries(skills).map(([category, items]) => (
            <motion.div
              key={category}
              variants={item}
              className="
                rounded-xl border bg-card
                p-4 sm:p-6
                shadow-sm
                transition
                hover:shadow-md
              "
            >
              <h3 className="mb-3 text-base sm:text-lg font-semibold">
                {category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="
                      text-xs sm:text-sm
                      cursor-default
                      transition
                      hover:bg-primary
                      hover:text-primary-foreground
                    "
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
