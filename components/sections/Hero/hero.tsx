"use client";

import { motion, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { InteractiveCube } from "@/components/sections/Hero";
import { useScrollFrames } from "@/app/hooks/useScrollFrames";

const TOTAL_FRAMES = 200;

export default function Hero() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const { ref, frame } = useScrollFrames(TOTAL_FRAMES);
  const targetFrame = useRef(1);

  useMotionValueEvent(frame, "change", (latest) => {
    targetFrame.current = Math.min(
      TOTAL_FRAMES,
      Math.max(1, Math.round(latest)),
    );
  });

  useEffect(() => {
    let rafId: number;

    const animate = () => {
      setCurrentFrame((prev) => {
        if (prev === targetFrame.current) return prev;
        return prev + (targetFrame.current > prev ? 1 : -1);
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-cover bg-center"
      style={{
        backgroundImage: `url(/landing_animation/ezgif-frame-${String(
          currentFrame,
        ).padStart(3, "0")}.jpg)`,
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto max-w-6xl flex min-h-[90vh] flex-col items-center justify-between gap-12 md:flex-row px-4">
        <div className="flex flex-col gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold md:text-6xl mt-8 md:mt-0"
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

        <InteractiveCube />
      </div>
    </section>
  );
}
