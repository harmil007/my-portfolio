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
    <section
      id="skills"
      className="relative py-20 sm:py-24 lg:py-28 overflow-clip"
    >
      <div
        className="absolute inset-0 top-0 scale-[350%] origin-top rounded-t-full -z-10 
 bg-gradient-to-b from-primary/5 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 sm:mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">
            Skills
          </h2>
          <Separator className="mb-8" />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="
            flex flex-wrap justify-center gap-6
          "
        >
          {Object.entries(skills).map(([category, items]) => (
            <motion.div
              key={category}
              variants={item}
              className="
      relative
      rounded-[30%_70%_70%_30%/30%_30%_70%_70%]
      bg-card/80
      backdrop-blur
      transition-all duration-300
      hover:shadow-md
      hover:border-primary/40
      hover:scale-[1.02]
      overflow-hidden
      flex flex-col items-center
      w-full
      max-w-100
      h-max
      py-12
    "
            >
              {/* Glow gradient */}
              <div
                className="
        pointer-events-none
        absolute inset-0
        opacity-0
        transition-opacity duration-300
        group-hover:opacity-100
        bg-gradient-to-br
        from-primary/10
        via-transparent
        to-secondary/10
      "
              />

              <h3 className="mb-4 text-base sm:text-lg font-semibold tracking-tight border-b-2">
                {category}
              </h3>

              <div className="flex flex-wrap gap-2 justify-center px-8">
                {items.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="
            text-xs sm:text-sm
            cursor-default
            transition-all
            duration-200
            hover:bg-primary
            hover:text-primary-foreground
            hover:scale-105
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
