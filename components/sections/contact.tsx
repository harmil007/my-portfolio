import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-clip">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="bg-card border border-border/10 p-8 sm:p-12 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-3xl font-bold mb-4">Contact</h2>
          <Separator className="mb-6" />

          <p className="max-w-xl text-muted-foreground mb-8 text-base sm:text-lg leading-relaxed">
            I’m currently open to remote frontend opportunities. Feel free to
            reach out if you’d like to collaborate or discuss a role.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <a href="mailto:harmilgoti0@gmail.com" target="_blank">
                Email Me
              </a>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/harmil007"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
