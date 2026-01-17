import { Separator } from "@/components/ui/separator";

export default function About() {
  return (
    <section id="about" className="py-24">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <Separator className="mb-6" />

      <p className="max-w-3xl text-muted-foreground leading-relaxed">
        I’m a Frontend Web Developer with 3+ years of professional experience
        building scalable, high-performance web applications using React.js and
        Next.js. I specialize in translating complex business requirements into
        clean, intuitive, and responsive user interfaces.
        <br />
        <br />
        I’ve worked closely with designers, backend engineers, and product teams
        in remote and cross-functional environments. I enjoy solving UI/UX
        challenges, optimizing performance, and building products that users
        genuinely enjoy using.
      </p>
    </section>
  );
}
