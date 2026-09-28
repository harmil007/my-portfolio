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
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Step 1: Image scale & opacity entrance while sticky at top
  const imageScale = useTransform(smoothProgress, [0.0, 0.25, 0.78, 1.0], [0.95, 1.0, 1.0, 0.95]);
  const imageOpacity = useTransform(smoothProgress, [0.0, 0.15, 0.85, 1.0], [0.5, 1.0, 1.0, 0.2]);

  // Step 2: Details panel rises up cleanly over sticky 16:9 image as user scrolls further
  const detailsY = useTransform(
    smoothProgress,
    [0.0, 0.3, 0.6, 0.82, 1.0],
    [90, 60, 0, 0, -20]
  );
  const detailsOpacity = useTransform(
    smoothProgress,
    [0.0, 0.3, 0.5, 0.82, 1.0],
    [0, 0.3, 1, 1, 0.2]
  );

  // Step 3 & 4: Entire combined unit smoothly translates UP out of view (0.82 -> 1.0)
  const exitY = useTransform(smoothProgress, [0.82, 1.0], ["0vh", "-100vh"]);
  const exitScale = useTransform(smoothProgress, [0.82, 1.0], [1.0, 0.94]);
  const exitOpacity = useTransform(smoothProgress, [0.85, 1.0], [1.0, 0.0]);

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
      className="relative w-full h-[220vh] bg-transparent"
    >
      {/* Sticky Viewport Frame - Pinned Sticky AT THE TOP of the screen directly under navbar */}
      <div className="sticky top-16 sm:top-20 z-10 w-full flex flex-col items-center justify-start px-2 sm:px-4 pt-2">
        
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
            {/* Top Browser Header Bar */}
            <div className="h-8 sm:h-9 bg-background/90 backdrop-blur-md flex items-center px-4 gap-2 border-b border-border/20 z-20 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <div className="ml-4 px-3 py-0.5 rounded-md bg-secondary/50 text-[10px] font-mono text-muted-foreground truncate max-w-xs sm:max-w-md">
                https://{project.title.toLowerCase()}.com
              </div>
            </div>

            {/* Strict 16:9 Aspect Ratio Image Visual Container */}
            <div className="relative w-full aspect-video overflow-hidden">
              <Image
                src={project.img}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-85" />
            </div>
          </motion.div>

          {/* 2. Rising Details Panel (Floats up over sticky 16:9 image as user scrolls) */}
          <motion.div
            style={{
              y: shouldReduceMotion ? 0 : detailsY,
              opacity: shouldReduceMotion ? 1 : detailsOpacity,
            }}
            className="relative z-30 w-full max-w-3xl -mt-24 sm:-mt-32 md:-mt-40 px-2 sm:px-4"
          >
            <div className="rounded-3xl bg-card/95 backdrop-blur-2xl border border-border/40 p-5 sm:p-7 md:p-8 shadow-2xl space-y-3.5 transition-colors duration-300 hover:border-primary/40">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    Featured Project 0{index + 1}
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    0{index + 1} / 0{total}
                  </span>
                </div>
                {project.projectLink && (
                  <Button
                    asChild
                    className="btn-neumorphic-primary text-xs px-4 py-2 h-auto font-terminal tracking-wider"
                  >
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5"
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

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight">
                {project.title}
              </h3>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              <ul className="space-y-1.5 text-xs text-muted-foreground border-t border-border/20 pt-3">
                {project.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 text-xs">▹</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-border/20">
                {project.tech.map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="text-[11px] px-2 py-0.5 bg-secondary/60"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
