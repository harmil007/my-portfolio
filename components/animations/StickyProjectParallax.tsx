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
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6">
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
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress for this project's dedicated sticky section [0, 1]
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 22,
    restDelta: 0.001,
  });

  // Step 1: Image scale & opacity entrance while sticky at top
  const imageScale = useTransform(smoothProgress, [0.0, 0.15, 0.80, 1.0], [0.96, 1.0, 1.0, 0.96]);
  const imageOpacity = useTransform(smoothProgress, [0.0, 0.12, 1.0], [0.0, 1.0, 1.0]);

  // Step 2: Details drawer slides in quickly (0.15 -> 0.38) and STAYS fully open & readable
  const detailsX = useTransform(
    smoothProgress,
    [0.0, 0.15, 0.38, 1.0],
    ["100%", "100%", "0%", "0%"]
  );
  const detailsOpacity = useTransform(
    smoothProgress,
    [0.0, 0.15, 0.32, 1.0],
    [0, 0, 1.0, 1.0]
  );

  // Step 3: Lazy & Slow Exit - Card stays resting from 0.38 to 0.80, then glides out SLOWLY from 0.80 to 1.0
  const exitY = useTransform(smoothProgress, [0.80, 1.0], ["0vh", "-100vh"]);
  const exitScale = useTransform(smoothProgress, [0.80, 1.0], [1.0, 0.96]);
  const exitOpacity = useTransform(smoothProgress, [0.88, 1.0], [1.0, 0.0]);

  if (shouldReduceMotion) {
    return (
      <div className="w-full space-y-6 py-12">
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-border/20 shadow-2xl">
          <Image fill src={project.img} alt={project.title} className="object-cover" />
        </div>
        <div className="rounded-3xl bg-card border border-border/20 p-6 md:p-8 space-y-4 shadow-xl">
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
    );
  }

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-[170vh] bg-transparent"
    >
      {/* Sticky Viewport Frame - Pinned Sticky AT THE TOP of the screen with clear gap below main site navbar */}
      <div className="sticky top-20 sm:top-24 z-10 w-full flex flex-col items-center justify-start px-2 sm:px-4 pt-2">
        
        {/* Combined Unit */}
        <motion.div
          style={{
            y: shouldReduceMotion ? 0 : exitY,
            scale: shouldReduceMotion ? 1 : exitScale,
            opacity: shouldReduceMotion ? 1 : exitOpacity,
          }}
          className="relative w-full max-w-5xl flex flex-col items-center justify-start"
        >
          {/* 1. Sticky 16:9 Aspect Ratio Web App Frame Display at Top */}
          <motion.div
            style={{
              scale: shouldReduceMotion ? 1 : imageScale,
              opacity: shouldReduceMotion ? 1 : imageOpacity,
            }}
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-card/90 backdrop-blur-2xl border border-border/30 shadow-2xl group flex flex-col"
          >
            {/* Computer Window Browser Header Bar */}
            <div className="h-8 sm:h-9 bg-background/95 backdrop-blur-md flex items-center px-4 gap-2 border-b border-border/20 z-20 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <div className="ml-4 px-3 py-0.5 rounded-md bg-secondary/50 text-[10px] font-mono text-muted-foreground truncate max-w-xs sm:max-w-md">
                https://{project.title.toLowerCase()}.com
              </div>
            </div>

            {/* Strict 16:9 Aspect Ratio Image Visual Container with Right-Side Drawer */}
            <div className="relative w-full aspect-video overflow-hidden bg-black/40">
              <Image
                src={project.img}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-background/60 pointer-events-none" />

              {/* 2. Attached Right-Side Drawer Panel (Slides in AFTER image fades in, attached flush to top/right/bottom) */}
              <motion.div
                style={{
                  x: shouldReduceMotion ? 0 : detailsX,
                  opacity: shouldReduceMotion ? 1 : detailsOpacity,
                }}
                className="absolute top-0 bottom-0 right-0 z-30 w-[95%] sm:w-[380px] md:w-[420px] lg:w-[460px] flex flex-col"
              >
                <div className="h-full w-full bg-card/95 backdrop-blur-2xl border-l border-border/50 p-4 sm:p-5 md:p-6 shadow-2xl flex flex-col justify-between space-y-2.5 overflow-y-auto custom-scrollbar">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                        Featured 0{index + 1}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground">
                        0{index + 1} / 0{total}
                      </span>
                    </div>
                    {project.projectLink && (
                      <Button
                        asChild
                        className="btn-neumorphic-primary text-xs px-3 py-1.5 h-auto font-terminal tracking-wider"
                      >
                        <a
                          href={project.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          Visit Project
                          <svg
                            className="w-3.5 h-3.5"
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
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-foreground tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">
                      {project.description}
                    </p>
                  </div>

                  <ul className="space-y-1 sm:space-y-1.5 text-xs text-muted-foreground border-t border-border/20 pt-2 sm:pt-3">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <span className="text-primary mt-0.5 text-xs">▹</span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1 pt-1 border-t border-border/20">
                    {project.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="text-[10px] sm:text-[11px] px-2 py-0.5 bg-secondary/60"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
