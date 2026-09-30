"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const skills = {
  Frontend: [
    "React.js",
    "Next.js",
    "JavaScript (ES6+)",
    "TypeScript",
    "React Native",
  ],
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
  "Secondary skill": [
    "React Native",
    "Electron.js",
    "Node",
    "MongoDB",
    "Jest",
    "Cypress",
    "React Testing Library",
  ],
};

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const floatY = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), {
    stiffness: 80,
    damping: 20,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 35, scale: 0.94 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-28 overflow-clip"
    >
      <div
        className="absolute inset-0 top-0 scale-[350%] origin-top rounded-t-full -z-10 
 bg-gradient-to-b from-primary/5 via-transparent to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 sm:mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">
            Skills & Competencies
          </h2>
          <Separator className="mb-8" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          style={{ y: shouldReduceMotion ? 0 : floatY }}
          className="flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {Object.entries(skills).map(([category, items], idx) => (
            <motion.div
              key={category}
              variants={cardVariants}
              className="
                relative
                rounded-[30%_50%_70%_30%/30%_30%_70%_70%]
                bg-card/90
                backdrop-blur-sm
                shadow-inset-md
                border border-border/20
                overflow-hidden
                flex flex-col items-center
                w-full
                max-w-100
                h-max
                pb-10
                pt-8
                group
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

              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-mono font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                  0{idx + 1}
                </span>
                <h3 className="group-hover:text-primary transition-colors duration-300 text-base sm:text-lg font-bold tracking-tight">
                  {category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5 justify-center px-8">
                {items.map((skill, skillIdx) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.3, delay: skillIdx * 0.05 }}
                  >
                    <Badge
                      variant="secondary"
                      className="
                        text-xs sm:text-sm
                        px-3 py-1
                        cursor-default
                        transition-all
                        duration-200
                        bg-secondary/60
                        hover:bg-primary
                        hover:text-primary-foreground
                        hover:scale-105
                      "
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
