"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StickyProjectParallax from "@/components/animations/StickyProjectParallax";

const projects = [
  {
    title: "Rukkorverse",
    subtitle: "Real-Time Collaborative Workspace",
    img: "/images/rukkor_ss.png",
    description:
      "A collaborative workspace platform inspired by Slack and Google Meet, featuring low-latency real-time audio/video communication and AI-assisted workflows.",
    highlights: [
      "Hybrid REST + WebSocket communication for sub-second real-time sync",
      "LiveKit integration powering low-latency multi-party video & audio rooms",
      "Complex reactive UI workflows engineered with Ant Design and LESS",
      "Full internationalization (i18n) and cross-platform accessibility",
    ],
    tech: [
      "React",
      "Node.js",
      "TypeScript",
      "Redux Toolkit",
      "WebSockets",
      "LiveKit",
      "Ant Design",
      "LESS",
      "i18n",
      "GitHub",
    ],
    projectLink: "https://app.rukkor.com",
    liveUrl: "app.rukkor.com",
  },
  {
    title: "Geometra",
    subtitle: "Construction Cost Estimation & Takeoff",
    img: "/images/geometra_ss.webp",
    description:
      "An enterprise construction management and quantity takeoff platform focused on precision blueprint measurements, estimation calculations, and project tracking.",
    highlights: [
      "High-precision 2D/PDF and 3D/BIM takeoff measurement workflows",
      "Automated construction cost estimation calculated directly from drawings",
      "Integrated PDFTron SDK for high-performance architectural tooling",
      "Optimized rendering pipelines for complex multi-page architectural blueprints",
    ],
    tech: [
      "React",
      "JavaScript",
      "PDFTron SDK",
      "Ant Design",
      "Reflux",
      "i18n",
      "GitHub",
    ],
    projectLink: "https://geometra.rukkor.com",
    liveUrl: "geometra.rukkor.com",
  },
  {
    title: "TailwindThemeMaker",
    subtitle: "Visual CSS Theme Generator & Exporter",
    img: "/images/newtailwindthememaker_ss.png",
    description:
      "A web app empowering developers and designers to visually create, preview, and export custom Tailwind CSS themes with real-time feedback and AI-driven palette extraction.",
    highlights: [
      "Real-time CSS variable generation with instant visual preview and code export",
      "AI-assisted color palette extraction from uploaded user images",
      "Automatic dark mode variable derivation with accessible WCAG contrast",
    ],
    tech: [
      "Next.js",
      "Supabase",
      "Tailwind CSS",
      "TypeScript",
      "shadcn/ui",
      "Vercel",
      "GitHub",
    ],
    projectLink: "https://tailwindthememaker.com",
    liveUrl: "tailwindthememaker.com",
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
          <h2 className="text-3xl font-bold tracking-tight mb-3">Featured Projects</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Selected web applications, collaborative platforms, and interactive developer tools
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
