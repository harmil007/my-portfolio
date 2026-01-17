import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <h2 className="text-3xl font-bold mb-4">Contact</h2>
      <Separator className="mb-6" />

      <p className="max-w-xl text-muted-foreground mb-6">
        I’m currently open to remote frontend opportunities. Feel free to reach
        out if you’d like to collaborate or discuss a role.
      </p>

      <div className="flex flex-wrap gap-4">
        <Button asChild>
          <a href="mailto:harmilgoti0@gmail.com">Email Me</a>
        </Button>

        <Button variant="outline" asChild>
          <a
            href="https://github.com/harmil007"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </Button>

        {/* Add LinkedIn when ready */}
        {/* 
        <Button variant="outline" asChild>
          <a href="LINKEDIN_URL" target="_blank">LinkedIn</a>
        </Button> 
        */}
      </div>
    </section>
  );
}
