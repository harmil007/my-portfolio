"use client";

import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface ServiceItem {
  title: string;
  description: string;
  badge?: string;
}

interface StickyServicesParallaxProps {
  items: ServiceItem[];
  sectionTitle?: string;
}

export default function StickyServicesParallax({
  items,
  sectionTitle = "Services & Capabilities",
}: StickyServicesParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const lastCardRef = useRef<HTMLDivElement>(null);

  const shouldReduceMotion = useReducedMotion();

  // Dynamic distance offsets state
  const [offsets, setOffsets] = useState<{ startX: number; endX: number }>({
    startX: -1400,
    endX: 48,
  });

  // Track vertical scroll progress of this sticky section [0, 1]
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Silky smooth spring-damped progress without jitter or stutter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Measure and calculate exact horizontal travel distance dynamically
  const calculateDistance = useCallback(() => {
    if (!trackRef.current || !headerRef.current) {
      return;
    }

    const headerRect = headerRef.current.getBoundingClientRect();
    const alignLeft = Math.max(16, headerRect.left);

    if (firstCardRef.current && lastCardRef.current) {
      const trackRect = trackRef.current.getBoundingClientRect();
      const firstCardRect = firstCardRef.current.getBoundingClientRect();
      const lastCardRect = lastCardRef.current.getBoundingClientRect();

      // Current relative position of first card (Service 01) and last card (Service 05) within the track
      const firstCardOffset = firstCardRect.left - trackRect.left;
      const lastCardOffset = lastCardRect.left - trackRect.left;

      // startX aligns firstCard at alignLeft when progress = 0
      // endX aligns lastCard at alignLeft when progress = 1 (leaving it fully resting in view)
      const startX = alignLeft - firstCardOffset;
      const endX = alignLeft - lastCardOffset;

      setOffsets({ startX, endX });
    } else {
      // Dynamic fallback based on scrollWidth and viewport width
      const scrollWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const totalDistance = Math.max(0, scrollWidth - viewportWidth);

      setOffsets({
        startX: alignLeft - totalDistance,
        endX: alignLeft,
      });
    }
  }, []);

  // Update measurements synchronously before paint on mount, and on resize
  useIsomorphicLayoutEffect(() => {
    calculateDistance();
  }, [calculateDistance, items.length]);

  useEffect(() => {
    calculateDistance();

    const handleResize = () => {
      calculateDistance();
    };

    window.addEventListener("resize", handleResize);

    // ResizeObserver monitors container dimension updates
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      observer = new ResizeObserver(() => {
        calculateDistance();
      });
      observer.observe(containerRef.current);
      if (trackRef.current) {
        observer.observe(trackRef.current);
      }
    }

    // Secondary measurement passes after fonts, styles, and images settle
    const timer1 = setTimeout(calculateDistance, 50);
    const timer2 = setTimeout(calculateDistance, 200);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [calculateDistance, items.length]);

  // Map scroll progress to horizontal translateX movement
  // Starts resting from 0 to 0.04, glides smoothly from 0.04 to 0.92, rests from 0.92 to 1.0 before unpinning
  const x = useTransform(
    smoothProgress,
    [0, 0.04, 0.92, 1],
    [offsets.startX, offsets.startX, offsets.endX, offsets.endX]
  );

  // If user prefers reduced motion, render an accessible responsive card list
  if (shouldReduceMotion) {
    return (
      <section
        id="services"
        className="relative py-20 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            {sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Explore my core services and development capabilities
          </p>
          <div className="mt-4 h-[1px] w-full bg-border/40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="p-7 rounded-2xl bg-card border border-border/30 shadow-md"
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
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative min-h-[300vh] bg-transparent overflow-x-clip"
    >
      {/* Sticky Viewport Frame pinned at the top while user scrolls vertically */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden pt-20 pb-8 px-0 sm:px-2">
        {/* Ambient Glow background */}
        <div className="pointer-events-none absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[140px]" />

        {/* Section Header */}
        <div
          ref={headerRef}
          className="mx-auto w-full max-w-6xl px-4 sm:px-6 z-20 shrink-0 select-none"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                {sectionTitle}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Explore my core services and development capabilities
              </p>
            </div>

            {/* Visual scroll progress indicator */}
            <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground pb-1">
              <span className="text-primary font-semibold">01</span>
              <div className="w-24 sm:w-36 h-1.5 bg-border/40 rounded-full overflow-hidden">
                <motion.div
                  style={{ scaleX: smoothProgress, transformOrigin: "left" }}
                  className="h-full w-full bg-primary rounded-full"
                />
              </div>
              <span>0{items.length}</span>
            </div>
          </div>
          <div className="mt-4 h-[1px] w-full bg-border/40" />
        </div>

        {/* Horizontal Card Track Area */}
        <div className="relative w-full flex-1 flex items-center overflow-hidden py-4 my-auto">
          {/*
            Using flex-row-reverse allows DOM order to remain 01 -> 05 for accessibility,
            while visually placing Card 01 at the leading right position.
            As the track translates with positive translateX (left to right),
            Card 01 slides across towards the right, followed sequentially by Card 02, 03, 04,
            and finally Card 05 arrives and rests in view.
          */}
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex flex-row-reverse items-center gap-6 sm:gap-8 will-change-transform pr-4 pl-4 sm:pr-6 sm:pl-6"
          >
            {items.map((item, index) => {
              const isFirst = index === 0;
              const isLast = index === items.length - 1;

              return (
                <div
                  key={item.title}
                  ref={
                    isFirst
                      ? firstCardRef
                      : isLast
                        ? lastCardRef
                        : undefined
                  }
                  className="w-[85vw] max-w-[340px] sm:max-w-[380px] md:max-w-[420px] p-6 sm:p-7 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/30 shadow-2xl transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 group select-none shrink-0 flex flex-col justify-between min-h-[260px] sm:min-h-[280px]"
                >
                  <div>
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

                    <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary transition-colors text-foreground">
                      {item.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Decorative subtle ambient line */}
                  <div className="mt-6 h-[2px] w-12 bg-primary/40 group-hover:w-full transition-all duration-500 rounded-full" />
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Section Footer Helper */}
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 z-20 shrink-0 select-none flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-primary animate-pulse" />
            Scroll down to glide horizontally through services
          </span>
          <span className="font-mono text-[11px] text-muted-foreground/80 hidden sm:inline">
            Pinned Horizontal Animation
          </span>
        </div>
      </div>
    </section>
  );
}
