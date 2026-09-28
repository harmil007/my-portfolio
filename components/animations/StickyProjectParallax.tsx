"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ProjectItem {
  title: string;
  img: string;
  description: string;
  highlights: string[];
  tech: string[];
  projectLink?: string;
}

interface StickyProjectParallaxProps {
  projects: ProjectItem[];
}

export default function StickyProjectParallax({ projects }: StickyProjectParallaxProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 space-y-16 md:space-y-24 py-8">
      {projects.map((project, index) => (
        <FullScreenParallaxCard
          key={project.title}
          project={project}
          index={index}
          total={projects.length}
          shouldReduceMotion={!!shouldReduceMotion}
        />
      ))}
    </div>
  );
}

interface FullScreenParallaxCardProps {
  project: ProjectItem;
  index: number;
  total: number;
  shouldReduceMotion: boolean;
}

function FullScreenParallaxCard({
  project,
  index,
  total,
  shouldReduceMotion,
}: FullScreenParallaxCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position for this specific full-screen project card
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });

  // Layer 1: Ambient Glow Parallax (Speed 1)
  const bgY = useTransform(smoothProgress, [0, 1], [-60, 60]);

  // Layer 2: Main Full-Screen Web App Image Parallax (Speed 2)
  const imageY = useTransform(smoothProgress, [0, 0.5, 1], [60, 0, -50]);
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [0.94, 1.02, 0.96]);
  const imageRotateX = useTransform(smoothProgress, [0, 0.5, 1], [6, 0, -4]);

  // Layer 3: Details Panel Parallax (Speed 3 - Faster reveal over image)
  const detailsY = useTransform(smoothProgress, [0, 0.5, 1], [100, 0, -80]);
  const detailsOpacity = useTransform(
    smoothProgress,
    [0.1, 0.4, 0.75, 0.95],
    [0.3, 1, 1, 0.4]
  );

  // Stacked depth effect as card sticks near top
  const cardScale = useTransform(smoothProgress, [0.6, 1], [1, 0.94 - index * 0.02]);
  const cardOpacity = useTransform(smoothProgress, [0.8, 1], [1, 0.7]);

  if (shouldReduceMotion) {
    return (
      <div className="w-full rounded-3xl bg-card border border-border/20 p-6 md:p-10 shadow-inset-md">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 relative aspect-video rounded-2xl overflow-hidden border border-border/20 shadow-2xl">
            <Image fill src={project.img} alt={project.title} className="object-cover" />
          </div>
          <div className="md:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold text-primary">0{index + 1} / 0{total}</span>
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <p className="text-muted-foreground">{project.description}</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2">
                  <span className="text-primary">▹</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tech.map((t) => (
                <Badge key={t} variant="outline">{t}</Badge>
              ))}
            </div>
            {project.projectLink && (
              <Button asChild className="btn-neumorphic-primary font-terminal text-xs">
                <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                  Visit Project ↗
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="sticky top-20 md:top-24 w-full min-h-[80vh] md:min-h-[85vh] flex items-center justify-center"
    >
      <motion.div
        style={{
          scale: cardScale,
          opacity: cardOpacity,
        }}
        className="relative w-full rounded-3xl bg-card/90 backdrop-blur-xl border border-border/30 shadow-2xl overflow-hidden p-6 sm:p-8 md:p-10 transition-colors duration-300 hover:border-primary/40 group"
      >
        {/* Layer 1: Ambient Glow Background */}
        <motion.div
          style={{ y: bgY }}
          className="pointer-events-none absolute -top-32 -right-32 h-[450px] w-[450px] rounded-full bg-primary/10 blur-[130px] group-hover:bg-primary/20 transition-colors"
        />

        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center z-10 relative">
          
          {/* Layer 2: Main Full-Screen Web App Image Frame (7 cols) */}
          <motion.div
            style={{
              y: imageY,
              scale: imageScale,
              rotateX: imageRotateX,
              perspective: 1000,
            }}
            className="md:col-span-7 relative w-full h-[240px] sm:h-[320px] md:h-[380px] lg:h-[440px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-primary/30 transition-all duration-500"
          >
            {/* Top Browser Bar Deco */}
            <div className="absolute top-0 inset-x-0 h-7 bg-background/80 backdrop-blur-md z-20 flex items-center px-3 gap-1.5 border-b border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 text-[10px] font-mono text-muted-foreground/70 truncate">
                https://{project.title.toLowerCase()}.com
              </span>
            </div>

            {/* Full Widescreen Web App Image */}
            <div className="relative w-full h-full pt-7">
              <Image
                src={project.img}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
            </div>
          </motion.div>

          {/* Layer 3: Project Details Panel (5 cols) */}
          <motion.div
            style={{
              y: detailsY,
              opacity: detailsOpacity,
            }}
            className="md:col-span-5 flex flex-col justify-center space-y-4 lg:space-y-5"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                  Featured 0{index + 1}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  0{index + 1} / 0{total}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                {project.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              {project.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-primary mt-1 text-xs">▹</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.tech.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="text-xs px-2.5 py-1 bg-secondary/60 hover:bg-primary/20 transition-colors"
                >
                  {t}
                </Badge>
              ))}
            </div>

            {project.projectLink && (
              <div className="pt-3">
                <Button
                  asChild
                  className="btn-neumorphic-primary text-xs sm:text-sm px-6 py-5 h-auto font-terminal tracking-wider"
                >
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Visit Project
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
