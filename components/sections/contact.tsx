"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-clip">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] as const }}
          className="bg-card/90 backdrop-blur-md border border-border/20 p-8 sm:p-12 rounded-3xl shadow-2xl transition-all duration-300 hover:border-primary/30"
        >
          <h2 className="text-3xl font-bold mb-4">Contact</h2>
          <Separator className="mb-6" />

          <p className="max-w-xl text-muted-foreground mb-8 text-base sm:text-lg leading-relaxed">
            I’m currently open to remote frontend opportunities. Feel free to
            reach out if you’d like to collaborate or discuss a role.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              asChild
              className="btn-neumorphic-primary font-terminal"
            >
              <a
                href="mailto:harmilgoti0@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email Me
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="btn-neumorphic font-terminal"
            >
              <a
                href="https://github.com/harmil007"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
