import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import Image from "next/image";

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
      "typescript",
      "Redux Toolkit",
      "WebSockets",
      "Ant Design",
      "LESS",
      "i18n",
      "LiveKit"
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
      "Impliment the tools from PDF tron"
    ],
    tech: [
      "React",
      "JavaScript",
      "UI Optimization",
      "Ant Design",
      "reflux",
      "i18n",
    ],
    projectLink: "https://geometra.rukkor.io",
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
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "shadcn/ui", "Vercel"],
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
    <section id="projects" className="py-24 relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-primary/5 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold mb-4">Projects</h2>
        <Separator className="mb-8" />
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.title}>
              <CardContent className="p-6 space-y-4 h-full flex flex-col">
                {project.img && (
                  <div className="relative aspect-video">
                    <Image
                      loading="lazy"
                      fill
                      src={project.img}
                      alt="banner"
                      className="aspect-auto"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold">{project.title}</h3>

                <p className="text-muted-foreground">{project.description}</p>

                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
                {project?.projectLink && (
                  <Button className="mt-auto w-max">
                    <a href={project?.projectLink} target="_blank">
                      Visit the project
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold mb-4">Additional Projects & Contributions</h2>
          <Separator className="mb-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalProjects.map((project, i) => (
              <Card
                key={i}
                className="hover:border-primary/50 transition-colors bg-secondary/10 hover:shadow-sm"
              >
                <CardContent className="p-5 flex flex-col justify-center h-full">
                  <h3 className="font-semibold text-lg mb-2 text-foreground/90">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
