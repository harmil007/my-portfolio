"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="flex min-h-[90vh] flex-col justify-center gap-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold"
      >
        Hi, I’m Harmil 👋
        <span className="block text-primary">Frontend Developer</span>
      </motion.h1>

      <p className="max-w-xl text-lg text-muted-foreground">
        Frontend Developer with 3+ years of experience building scalable,
        high-performance web applications using React.js and Next.js.
      </p>

      <div className="flex gap-4">
        <Button size="lg">
          {" "}
          <a href="#projects">View Projects</a>
        </Button>
        <Button size="lg" variant="outline">
          <a href="/Harmil_Goti_Resume.pdf" target="_blank">
            Download Resume
          </a>
        </Button>
      </div>
    </section>
  );
}
