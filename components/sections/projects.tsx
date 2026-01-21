import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";

const projects = [
  {
    title: "Rukkorverse",
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
    title: "USP.ai",
    description:
      "AI image generation platform with a dashboard to manage and download generated images.",
    highlights: [
      "Designed and developed the user dashboard",
      "Improved navigation and performance across pages",
    ],
    tech: ["Next.js", "SCSS", "Oauth"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <h2 className="text-3xl font-bold mb-4">Projects</h2>
      <Separator className="mb-8" />

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.title}>
            <CardContent className="p-6 space-y-4 h-full flex flex-col">
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
    </section>
  );
}
