"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="flex min-h-[90vh] flex-col items-center justify-between gap-12 md:flex-row">
      <div className="flex flex-col gap-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold md:text-6xl"
        >
          Hi, I’m{" "}
          <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Harmil Goti
          </span>{" "}
          <span className="inline-block animate-bounce">👋</span>
          <span className="block text-primary">Frontend Developer</span>
        </motion.h1>

        <p className="max-w-xl text-lg text-muted-foreground">
          Frontend Developer with 3+ years of experience building scalable,
          high-performance web applications using React.js and Next.js.
        </p>

        <div className="flex gap-4">
          <Button size="lg" asChild>
            <a href="#projects">View Projects</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/Harmil_Goti_Resume.pdf" target="_blank">
              View Resume
            </a>
          </Button>
        </div>
      </div>

      <div className="relative size-28 [perspective:800px] m-auto">
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          animate={{ rotateX: 360, rotateY: 360 }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-sky-400/80 text-white font-semibold translate-z-14">
            React
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-sky-300/80 text-white font-semibold -translate-z-14 rotate-y-180">
            Next
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-sky-500/80 text-white font-semibold translate-x-14 rotate-y-90">
            JS
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-sky-200/80 text-white font-semibold -translate-x-14 -rotate-y-90">
            TS
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-sky-600/80 text-white font-semibold -translate-y-14 rotate-x-90">
            UI
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-sky-100/80 text-black font-semibold translate-y-14 -rotate-x-90">
            Redux
          </div>
        </motion.div>
      </div>
    </section>
  );
}
