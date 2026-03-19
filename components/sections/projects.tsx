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
      "Redux Toolkit for scalable state management",
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
    img: "/images/tailwindthememaker_ss.png", // You can add the image path here
    description:
      "Developed Tailwind Theme Maker, a web app that helps developers and designers create, preview, and export custom Tailwind CSS theme variables quickly. It simplifies theme generation by offering real-time visual updates, making design decisions faster and more consistent before starting development.",
    highlights: [
      "Real-time custom Tailwind CSS theme generation and preview",
      "Export ready-to-use theme variables to speed up setup",
    ],
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "shadcn/ui", "Vercel"],
    projectLink: "https://tailwindthememaker.com",
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
      </div>
    </section>
  );
}
