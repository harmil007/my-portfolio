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
import { Lock, ExternalLink } from "lucide-react";

export interface ProjectItem {
  title: string;
  subtitle?: string;
  img: string;
  description: string;
  highlights: string[];
  tech: string[];
  projectLink?: string;
  liveUrl?: string;
}

interface StickyProjectParallaxProps {
  projects: ProjectItem[];
}

export default function StickyProjectParallax({
  projects,
}: StickyProjectParallaxProps) {
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
    stiffness: 55,
    damping: 22,
    restDelta: 0.001,
  });

  // Entrance scaling and opacity
  const cardScale = useTransform(
    smoothProgress,
    [0.0, 0.16, 0.82, 1.0],
    [0.94, 1.0, 1.0, 0.95]
  );
  const cardOpacity = useTransform(
    smoothProgress,
    [0.0, 0.12, 0.88, 1.0],
    [0.0, 1.0, 1.0, 0.0]
  );

  // Info panel subtle entrance
  const infoX = useTransform(smoothProgress, [0.06, 0.22], [24, 0]);
  const infoOpacity = useTransform(smoothProgress, [0.06, 0.2], [0, 1]);

  // Subtle image parallax shift inside frame
  const imageY = useTransform(smoothProgress, [0.1, 0.85], [10, -10]);

  // Exit transition gliding out smoothly
  const exitY = useTransform(smoothProgress, [0.82, 1.0], ["0vh", "-100vh"]);

  if (shouldReduceMotion) {
    return (
      <div className="w-full space-y-6 py-12">
        <div className="rounded-3xl bg-card/95 border border-border/20 shadow-2xl overflow-hidden p-6 sm:p-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Browser Mockup Image */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-background/80 border border-border/30 shadow-lg isolate [transform:translateZ(0)]">
              <div className="h-9 bg-secondary/50 rounded-t-2xl flex items-center justify-between px-3.5 border-b border-border/20">
                <div className="flex items-center gap-1.5">
                  <div className="size-3 rounded-full bg-[#ff5f56]" />
                  <div className="size-3 rounded-full bg-[#ffbd2e]" />
                  <div className="size-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-background/80 text-[11px] font-mono text-muted-foreground">
                  <Lock className="size-3 text-primary" />
                  <span>{project.liveUrl || project.title.toLowerCase() + ".com"}</span>
                </div>
                <div className="w-10" />
              </div>
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-b-2xl bg-black/20">
                <Image
                  fill
                  src={project.img}
                  alt={project.title}
                  className="object-cover object-top rounded-b-2xl"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                  Featured 0{index + 1}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  0{index + 1} / 0{total}
                </span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 text-xs font-bold">▹</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tech.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
              {project.projectLink && (
                <div className="pt-2">
                  <Button asChild className="btn-neumorphic-primary text-xs">
                    <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                      Visit Project ↗
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative w-full h-[165vh] bg-transparent">
      {/* Sticky Viewport Frame - Centered with clean clearance below navbar */}
      <div className="sticky top-20 sm:top-24 z-10 w-full flex flex-col items-center justify-start px-2 sm:px-4 pt-1 sm:pt-3">
        <motion.div
          style={{
            y: exitY,
            scale: cardScale,
            opacity: cardOpacity,
          }}
          className="relative w-full max-w-5xl rounded-2xl sm:rounded-3xl bg-card/95 backdrop-blur-2xl border border-border/30 shadow-2xl overflow-hidden p-5 sm:p-7 lg:p-8 group"
        >
          {/* Ambient Glow background */}
          <div className="pointer-events-none absolute -z-10 top-1/2 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-[100px] group-hover:bg-primary/15 transition-colors" />

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* 1. Left Side: Clean Mac Browser Window Frame with Unobstructed Full Screenshot */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="relative w-full rounded-2xl overflow-hidden bg-background/80 border border-border/30 shadow-xl group/browser transition-all duration-300 hover:border-primary/40 isolate [transform:translateZ(0)]">
                {/* Browser Window Header Chrome */}
                <div className="h-8 sm:h-9 bg-secondary/50 backdrop-blur-md rounded-t-2xl flex items-center justify-between px-3.5 border-b border-border/20 select-none">
                  {/* macOS traffic light window dots */}
                  <div className="flex items-center gap-1.5">
                    <div className="size-2.5 sm:size-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/40 shadow-xs" />
                    <div className="size-2.5 sm:size-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/40 shadow-xs" />
                    <div className="size-2.5 sm:size-3 rounded-full bg-[#27c93f] border border-[#1aab29]/40 shadow-xs" />
                  </div>

                  {/* Clean address bar with SSL lock indicator */}
                  <div className="flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-md bg-background/70 border border-border/20 text-[10px] sm:text-[11px] font-mono text-muted-foreground max-w-[200px] sm:max-w-xs truncate shadow-inset-sm">
                    <Lock className="size-3 text-primary/80 shrink-0" />
                    <span className="truncate">
                      {project.liveUrl || `${project.title.toLowerCase()}.com`}
                    </span>
                  </div>

                  {/* Status Indicator */}
                  <div className="w-10 flex justify-end items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-muted-foreground/60 hidden sm:inline">
                      live
                    </span>
                  </div>
                </div>

                {/* Unobstructed High-Resolution Screenshot Visual */}
                <div className="relative w-full aspect-[16/10] sm:aspect-video overflow-hidden rounded-b-2xl bg-black/20">
                  <motion.div
                    style={{ y: imageY }}
                    className="relative w-full h-full rounded-b-2xl overflow-hidden"
                  >
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      className="object-cover object-top rounded-b-2xl transition-transform duration-700 ease-out group-hover/browser:scale-105"
                      sizes="(max-width: 1024px) 100vw, 650px"
                      priority={index === 0}
                    />
                  </motion.div>

                  {/* Delicate sheen overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/5 pointer-events-none" />

                  {/* Interactive Open Live App Pill Overlay on Hover */}
                  {project.projectLink && (
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover/browser:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-10"
                    >
                      <span className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-xl flex items-center gap-2 transform translate-y-3 group-hover/browser:translate-y-0 transition-transform duration-300 font-sans">
                        Open Live Application
                        <ExternalLink className="size-3.5 sm:size-4" />
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Right Side: Clean Structured Project Details Panel */}
            <motion.div
              style={{
                x: infoX,
                opacity: infoOpacity,
              }}
              className="lg:col-span-5 flex flex-col justify-between space-y-3.5 sm:space-y-4"
            >
              {/* Top metadata badges */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    Featured 0{index + 1}
                  </span>
                  {project.subtitle && (
                    <span className="text-[11px] font-mono text-muted-foreground truncate hidden sm:inline">
                      {project.subtitle}
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono text-muted-foreground shrink-0">
                  0{index + 1} / 0{total}
                </span>
              </div>

              {/* Title & Narrative Description */}
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2">
                  {project.description}
                </p>
              </div>

              {/* Structured Key Contributions / Highlights */}
              <div className="space-y-2 border-t border-border/20 pt-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/80 font-mono">
                  Key Engineering Highlights
                </span>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5 text-xs font-bold shrink-0">
                        ▹
                      </span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Badges */}
              <div className="border-t border-border/20 pt-2.5">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="text-[10px] sm:text-[11px] px-2.5 py-0.5 bg-secondary/70 hover:bg-primary/15 transition-colors border border-border/10"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Primary Action Button */}
              {project.projectLink && (
                <div className="pt-1.5">
                  <Button
                    asChild
                    className="btn-neumorphic-primary text-xs px-5 py-2.5 h-auto font-terminal tracking-wider w-full sm:w-auto"
                  >
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <span>Visit Live Application</span>
                      <ExternalLink className="size-3.5" />
                    </a>
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
