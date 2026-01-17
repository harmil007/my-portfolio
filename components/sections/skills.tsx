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

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <h2 className="text-3xl font-bold mb-4">Skills</h2>
      <Separator className="mb-8" />

      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-semibold mb-3">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
