"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // Calculate dynamic horizontal distance: for 3 items, track moves from 0% to -66.6%
  const x = useTransform(smoothProgress, [0, 1], ["0%", `-${((projects.length - 1) / projects.length) * 100}%`]);

  return (
    <div ref={containerRef} className="relative min-h-[320vh] bg-transparent">
      {/* Desktop Sticky Container */}
      <div className="sticky top-0 hidden md:flex h-screen w-full flex-col justify-center overflow-hidden px-6">
        {/* Track containing horizontal projects */}
        <motion.div
          style={{ x: shouldReduceMotion ? "0%" : x }}
          className="flex w-[300%] h-[82vh] items-center gap-12"
        >
          {projects.map((project, index) => (
            <div key={project.title} className="w-1/3 h-full px-4 flex items-center justify-center">
              <MountainParallaxCard
                project={project}
                index={index}
                total={projects.length}
                progress={smoothProgress}
                shouldReduceMotion={!!shouldReduceMotion}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile Vertical Stack with Parallax (for small screens) */}
      <div className="flex md:hidden flex-col gap-12 px-4 py-8">
        {projects.map((project, index) => (
          <MobileParallaxCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

interface MountainParallaxCardProps {
  project: ProjectItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  shouldReduceMotion: boolean;
}

function MountainParallaxCard({
  project,
  index,
  total,
  progress,
  shouldReduceMotion,
}: MountainParallaxCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Focus range for this card in global scroll progress [0, 1]
  const start = Math.max(0, (index - 0.5) / (total - 1 || 1));
  const end = Math.min(1, (index + 0.5) / (total - 1 || 1));

  // Layer 1: Ambient background floating glow
  const bgY = useTransform(progress, [start, end], [-35, 35]);

  // Layer 2: Main project image visual layer (middle layer)
  const imageY = useTransform(progress, [start, end], [50, -30]);
  const imageScale = useTransform(progress, [start, (start + end) / 2, end], [0.92, 1, 0.95]);

  // Layer 3: Project details info layer (foreground layer)
  const detailsY = useTransform(progress, [start, end], [80, -45]);
  const detailsOpacity = useTransform(progress, [start, start + 0.15, end - 0.15, end], [0.4, 1, 1, 0.4]);

  if (shouldReduceMotion) {
    return (
      <Card className="shadow-inset-md w-full max-w-4xl">
        <CardContent className="p-8 grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image fill src={project.img} alt={project.title} className="object-cover" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <p className="text-muted-foreground">{project.description}</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge key={t} variant="outline">{t}</Badge>
              ))}
            </div>
            {project.projectLink && (
              <Button asChild>
                <a href={project.projectLink} target="_blank">Visit the project</a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      ref={cardRef}
      className="relative w-full max-w-4xl h-[75vh] rounded-3xl bg-card/90 backdrop-blur-lg border border-border/20 shadow-2xl overflow-hidden p-8 flex flex-col justify-between group"
    >
      {/* Parallax Layer 1: Ambient Glow Background */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-[100px] group-hover:bg-primary/20 transition-colors"
      />

      <div className="grid md:grid-cols-12 gap-8 items-center h-full z-10">
        {/* Parallax Layer 2: Image Visual (7 cols) */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="md:col-span-7 relative h-[260px] lg:h-[320px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-primary/30 transition-colors"
        >
          <Image
            src={project.img}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        </motion.div>

        {/* Parallax Layer 3: Project Details (5 cols) */}
        <motion.div
          style={{ y: detailsY, opacity: detailsOpacity }}
          className="md:col-span-5 flex flex-col justify-center space-y-4"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
              Featured Project 0{index + 1}
            </span>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight">
              {project.title}
            </h3>
          </div>

          <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          <ul className="space-y-1.5 text-xs lg:text-sm text-muted-foreground">
            {project.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary mt-1">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((t) => (
              <Badge key={t} variant="secondary" className="text-xs bg-secondary/60">
                {t}
              </Badge>
            ))}
          </div>

          {project.projectLink && (
            <div className="pt-2">
              <Button asChild className="btn-neumorphic-primary text-xs px-6 py-4 h-auto font-terminal">
                <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                  Visit Project ↗
                </a>
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function MobileParallaxCard({ project, index }: { project: ProjectItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div
      ref={cardRef}
      className="p-6 rounded-2xl bg-card border border-border/20 shadow-inset-md space-y-5"
    >
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <motion.div style={{ y: imgY }} className="relative w-full h-full">
          <Image fill src={project.img} alt={project.title} className="object-cover" />
        </motion.div>
      </div>

      <div className="space-y-3">
        <span className="text-xs font-mono text-primary font-bold">Project 0{index + 1}</span>
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-1.5">
              <span className="text-primary">▹</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((t) => (
            <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
          ))}
        </div>
        {project.projectLink && (
          <Button asChild className="w-full mt-3">
            <a href={project.projectLink} target="_blank">Visit Project</a>
          </Button>
        )}
      </div>
    </div>
  );
}
