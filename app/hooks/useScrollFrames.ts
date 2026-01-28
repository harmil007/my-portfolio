"use client";

import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

export function useScrollFrames(totalFrames: number) {
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const frame = useTransform(scrollYProgress, [0, 1], [1, totalFrames]);

  return { ref, frame };
}

