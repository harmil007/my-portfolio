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

export interface SpiralItem {
  title: string;
  description: string;
  badge?: string;
}

interface Spiral3DProps {
  items: SpiralItem[];
  sectionTitle?: string;
}

export default function Spiral3D({ items, sectionTitle = "Services" }: Spiral3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative min-h-[260vh] bg-transparent"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4">
        {/* Ambient Glow background */}
        <div className="pointer-events-none absolute -z-10 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />

        {/* Section Header */}
        <div className="absolute top-12 z-20 mx-auto w-full max-w-6xl px-4 sm:px-6 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{sectionTitle}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Scroll down to explore services in interactive 3D perspective
          </p>
          <div className="mt-4 h-[1px] w-full bg-border/40" />
        </div>

        {/* Desktop 3D Spiral View (hidden on small screens, shown md+) */}
        <div
          className="hidden md:flex relative h-[520px] w-full max-w-5xl items-center justify-center"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          <div
            className="relative flex items-center justify-center w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {items.map((item, index) => {
              return (
                <SpiralCard
                  key={item.title}
                  item={item}
                  index={index}
                  total={items.length}
                  progress={smoothProgress}
                  shouldReduceMotion={!!shouldReduceMotion}
                />
              );
            })}
          </div>
        </div>

        {/* Mobile Grid View (fallback for touch & small screens) */}
        <div className="flex md:hidden flex-col gap-6 w-full max-w-xl max-h-[70vh] overflow-y-auto px-2 py-4 mt-20">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border/20 shadow-inset-md"
            >
              {item.badge && (
                <span className="inline-block px-2.5 py-0.5 mb-3 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                  {item.badge}
                </span>
              )}
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface SpiralCardProps {
  item: SpiralItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  shouldReduceMotion: boolean;
}

function SpiralCard({
  item,
  index,
  total,
  progress,
  shouldReduceMotion,
}: SpiralCardProps) {
  // Map overall scroll progress [0, 1] to individual card focus window
  // Each card peaks in the center at activeProgress = index / (total - 1)
  const cardCenter = index / (total - 1 || 1);
  const cardStart = Math.max(0, cardCenter - 0.35);
  const cardEnd = Math.min(1, cardCenter + 0.35);

  // Transform calculations driven continuously by scroll progress
  const rotateY = useTransform(
    progress,
    [0, 1],
    [(index - (total - 1) / 2) * -45 - 60, (index - (total - 1) / 2) * -45 + 60]
  );

  const rotateZ = useTransform(
    progress,
    [cardStart, cardCenter, cardEnd],
    [-8, 0, 8]
  );

  const translateX = useTransform(
    progress,
    [cardStart, cardCenter, cardEnd],
    [(index - (total - 1) / 2) * 220 - 180, (index - (total - 1) / 2) * 120, (index - (total - 1) / 2) * 220 + 180]
  );

  const translateY = useTransform(
    progress,
    [cardStart, cardCenter, cardEnd],
    [(index - (total - 1) / 2) * 70 + 80, (index - (total - 1) / 2) * 35, (index - (total - 1) / 2) * 70 - 80]
  );

  const translateZ = useTransform(
    progress,
    [cardStart, cardCenter, cardEnd],
    [-280, 120, -280]
  );

  const scale = useTransform(
    progress,
    [cardStart, cardCenter, cardEnd],
    [0.82, 1.05, 0.82]
  );

  const opacity = useTransform(
    progress,
    [cardStart, cardCenter, cardEnd],
    [0.35, 1, 0.35]
  );

  if (shouldReduceMotion) {
    return (
      <div className="p-6 rounded-2xl bg-card border border-border/20 shadow-inset-md w-80">
        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
    );
  }

  return (
    <motion.div
      style={{
        position: "absolute",
        transformStyle: "preserve-3d",
        x: translateX,
        y: translateY,
        z: translateZ,
        rotateY: rotateY,
        rotateZ: rotateZ,
        scale: scale,
        opacity: opacity,
      }}
      className="w-[340px] p-7 rounded-2xl bg-card/90 backdrop-blur-md border border-border/30 shadow-2xl transition-colors duration-300 hover:border-primary/50 group"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
          0{index + 1}
        </span>
        {item.badge && (
          <span className="text-xs font-mono text-muted-foreground">
            {item.badge}
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
        {item.title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {item.description}
      </p>

      {/* Decorative subtle ambient line */}
      <div className="mt-5 h-[2px] w-12 bg-primary/40 group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}
