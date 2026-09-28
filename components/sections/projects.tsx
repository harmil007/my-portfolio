"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StickyProjectParallax from "@/components/animations/StickyProjectParallax";

const projects = [
  {
    title: "Rukkorverse",
    img: "/images/rukkor_ss.png",
    description:
      "A collaborative workspace platform inspired by Slack, Infinity, google meet, and WhatsApp, featuring real-time communication and AI assistance.",
    highlights: [
      "Hybrid REST + WebSocket communication for real-time updates",
      "Implimentation of LiveKit for real-time video and audio calls",
      "Complex UI workflows with Ant Design & LESS",
    ],
    tech: [
      "React",
      "node",
      "typescript",
      "Redux Toolkit",
      "WebSockets",
      "Ant Design",
      "LESS",
      "i18n",
      "LiveKit",
      "GitHub",
    ],
    projectLink: "https://app.rukkor.com",
  },
  {
    title: "Geometra",
    img: "/images/geometra_ss.webp",
    description:
      "Construction management platform focused on cost estimation, project tracking, and takeoff measurements.",
    highlights: [
      "Enhanced UI for 2D/PDF & 3D/BIM takeoff workflows",
      "Improved usability for construction professionals",
      "Calculate estimation of cost of construction from PDF",
      "Impliment the tools from PDF tron",
    ],
    tech: [
      "React",
      "JavaScript",
      "UI Optimization",
      "Ant Design",
      "reflux",
      "i18n",
      "GitHub",
    ],
    projectLink: "https://geometra.rukkor.com",
  },
  {
    title: "TailwindThemeMaker",
    img: "/images/newtailwindthememaker_ss.png",
    description:
      "Developed Tailwind Theme Maker, a web app that helps developers and designers create, preview, and export custom Tailwind CSS theme variables quickly. It simplifies theme generation by offering real-time visual updates, making design decisions faster and more consistent before starting development.",
    highlights: [
      "CSS theme generation, preview and export the code",
      "Generate your custom palettes from image using AI",
      "Generate dark mode variables from light mode variables",
    ],
    tech: [
      "Next.js",
      "supabase",
      "Tailwind CSS",
      "TypeScript",
      "shadcn/ui",
      "Vercel",
      "GitHub",
    ],
    projectLink: "https://tailwindthememaker.com",
  },
];

const additionalProjects = [
  {
    title: "USP.ai",
    description: "AI Image Generation Platform",
  },
  {
    title: "Frank Porter",
    description:
      "Frontend feature development and UI enhancements for arabic language",
  },
  {
    title: "Yoga Studio Platform",
    description: "Responsive UI components and page structure using Chakra UI",
  },
  {
    title: "Ozzo",
    description:
      "Implemented dark mode and geolocation features to recommend nearby restaurants based on user location",
  },
  {
    title: "Insurance Platform",
    description: "Dashboard and workflow UI improvements",
  },
  {
    title: "Dignizant Website",
    description: "Frontend development and UI updates",
  },
  {
    title: "Deque Project",
    description:
      "Authentication and navigation system development, Map integration and accessibility improvements",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-24 relative overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-primary/5 via-transparent to-primary/5" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Scroll to experience project stories with layered Mountain Parallax depth
          </p>
          <Separator className="mt-4" />
        </div>
      </div>

      {/* Sticky Parallax Container for Featured Projects */}
      <StickyProjectParallax projects={projects} />

      {/* Additional Projects Section */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <h2 className="text-3xl font-bold mb-4">
            Additional Projects & Contributions
          </h2>
          <Separator className="mb-8" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {additionalProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="bg-secondary/30 border border-border/10 shadow-inset-md transition-all duration-300 ease-out hover:border-primary/30 hover:-translate-y-1 h-full">
                <CardContent className="p-6 flex flex-col justify-center h-full space-y-2">
                  <h3 className="font-semibold text-lg text-foreground/90">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
