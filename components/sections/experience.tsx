import { Separator } from "@/components/ui/separator";

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <h2 className="text-3xl font-bold mb-4">Experience</h2>
      <Separator className="mb-8" />

      <div className="border-l pl-6 space-y-10">
        <div>
          <h3 className="font-semibold text-lg">Frontend Web Developer</h3>
          <p className="text-sm text-muted-foreground">
            Dignizant Technologies LLP • 3+ Years
          </p>

          <ul className="mt-3 list-disc list-inside text-muted-foreground space-y-2">
            <li>
              Developed scalable and reusable React and Next.js components for
              production-grade applications.
            </li>
            <li>
              Collaborated with designers and backend engineers to deliver
              high-quality UI aligned with business requirements.
            </li>
            <li>
              Improved application performance, navigation clarity, and overall
              user experience.
            </li>
            <li>
              Worked in Agile/Scrum environments with Git-based workflows.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
