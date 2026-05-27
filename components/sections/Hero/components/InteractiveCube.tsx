"use client";

import React, { useState, useEffect, useRef } from "react";

export function InteractiveCube() {
  const [step, setStep] = useState(0);
  const stepRef = useRef(0);

  // Cycle the active face index every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      stepRef.current += 1;
      setStep(stepRef.current);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Update CSS Custom Property `--glow-color` on the root element to sync with visible face
  useEffect(() => {
    const face = step % 6;
    const colors = [
      "#61dafb", // React (Cyan)
      "#f7df1e", // JS (Yellow)
      "#0070f3", // Next.js (Blue)
      "#3178c6", // TS (Blue)
      "#a855f7", // UI/CSS (Purple)
      "#764abc", // Redux (Purple)
    ];
    document.documentElement.style.setProperty("--glow-color", colors[face]);
  }, [step]);

  // Compute accumulated continuous rotations
  const getRotationForStep = (currentStep: number) => {
    const face = currentStep % 6;
    const cycle = Math.floor(currentStep / 6);
    const baseOffsetY = -360 * cycle;

    switch (face) {
      case 0: // React
        return { x: 0, y: baseOffsetY + 0 };
      case 1: // JS
        return { x: 0, y: baseOffsetY - 90 };
      case 2: // Next.js
        return { x: 0, y: baseOffsetY - 180 };
      case 3: // TS
        return { x: 0, y: baseOffsetY - 270 };
      case 4: // UI/CSS
        return { x: -90, y: baseOffsetY - 360 };
      case 5: // Redux
        return { x: 90, y: baseOffsetY - 360 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const rot = getRotationForStep(step);

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none"
      style={{
        "--cube-size": "clamp(130px, 16vw, 170px)",
        height: "calc(var(--cube-size) + 120px)",
        width: "calc(var(--cube-size) + 120px)",
      } as React.CSSProperties}
    >
      {/* Cube bounce container */}
      <div className="animate-cube-bounce [transform-style:preserve-3d]">
        {/* Cube rotation container */}
        <div
          className="relative [transform-style:preserve-3d] will-change-transform"
          style={{
            width: "var(--cube-size)",
            height: "var(--cube-size)",
            transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
            transition: "transform 1.0s linear",
          }}
        >
          {/* Face 1: React (Front) */}
          <Face
            style={{
              transform: "rotateY(0deg) translateZ(calc(var(--cube-size) / 2))",
              backgroundColor: "rgba(97, 218, 251, 0.13)",
            }}
          >
            {/* React Icon */}
            <svg
              viewBox="0 0 100 100"
              className="w-12 h-12 fill-none stroke-[#61dafb] drop-shadow-[0_0_8px_rgba(97,218,251,0.5)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="8" fill="#61dafb" />
              <ellipse cx="50" cy="50" rx="38" ry="14" strokeWidth="4" />
              <ellipse cx="50" cy="50" rx="38" ry="14" strokeWidth="4" transform="rotate(60 50 50)" />
              <ellipse cx="50" cy="50" rx="38" ry="14" strokeWidth="4" transform="rotate(120 50 50)" />
            </svg>
            <span className="mt-3 text-xs font-bold uppercase tracking-widest text-[#61dafb] font-display">
              React
            </span>
          </Face>

          {/* Face 2: JavaScript (Right) */}
          <Face
            style={{
              transform: "rotateY(90deg) translateZ(calc(var(--cube-size) / 2))",
              backgroundColor: "rgba(247, 223, 30, 0.12)",
            }}
          >
            {/* JS Icon */}
            <svg
              viewBox="0 0 100 100"
              className="w-12 h-12 fill-[#f7df1e] drop-shadow-[0_0_8px_rgba(247,223,30,0.5)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 5h90v90H5z" />
              <path
                d="M59.5 80.3c1.5 2.7 4.1 4.5 7.8 4.5 3.9 0 6.2-2 6.2-7.8V42.5h11v34.3c0 11.5-6.8 17.2-17 17.2-10 0-14.8-5.3-17.5-10.7l9.5-3zM31 80.5c1.8 3 4.8 4.3 8.3 4.3 4.3 0 7-2 7-6.2 0-4.3-3.2-5.8-8.5-8.1l-3-1.3c-7-3-11.8-6.7-11.8-14.8 0-8.5 7.2-14.3 16.5-14.3 8 0 13.5 3.8 16 9.5l-9.3 5.4c-1.5-3-3.8-4.3-6.7-4.3-3.2 0-5.3 2-5.3 4.8 0 3.3 2 4.6 6.7 6.7l3 1.3c8.5 3.7 13.8 7.3 13.8 16.2 0 9.8-7.7 15.6-18.3 15.6-11 0-17.5-5.3-20.5-11.7l9.5-5.5z"
                fill="#000000"
              />
            </svg>
            <span className="mt-3 text-xs font-bold uppercase tracking-widest text-[#f7df1e] font-display">
              JS
            </span>
          </Face>

          {/* Face 3: Next.js (Back) */}
          <Face
            style={{
              transform: "rotateY(180deg) translateZ(calc(var(--cube-size) / 2))",
              backgroundColor: "rgba(0, 112, 243, 0.12)",
            }}
          >
            {/* NextJS Icon */}
            <svg
              viewBox="0 0 180 180"
              className="w-12 h-12 fill-current text-foreground drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="mask0_next">
                <circle cx="90" cy="90" r="90" fill="white" />
              </mask>
              <g mask="url(#mask0_next)">
                <circle cx="90" cy="90" r="90" className="fill-background" />
                <path
                  d="M149.508 157.52L69.142 54H54v72h12.142V69.742l68.783 87.778zM126 54h12v72h-12z"
                  fill="url(#paint0_linear_next)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_next"
                  x1="109"
                  y1="116.5"
                  x2="144.5"
                  y2="160.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="currentColor" />
                  <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <span className="mt-3 text-xs font-bold uppercase tracking-widest text-foreground font-display">
              Next.js
            </span>
          </Face>

          {/* Face 4: TypeScript (Left) */}
          <Face
            style={{
              transform: "rotateY(-90deg) translateZ(calc(var(--cube-size) / 2))",
              backgroundColor: "rgba(49, 120, 198, 0.13)",
            }}
          >
            {/* TS Icon */}
            <svg
              viewBox="0 0 100 100"
              className="w-12 h-12 fill-[#3178c6] drop-shadow-[0_0_8px_rgba(49,120,198,0.5)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 5h90v90H5z" />
              <path
                d="M48.2 60.1H41v18h-6.2v-18h-7.2v-5.2h20.6v5.2zm20.8 10.4c0 3.6-2.5 5.5-6.2 5.5-3.5 0-5.6-1.5-6.4-4l-5.2 2.6c1.6 4.6 6 6.9 11.6 6.9 7 0 11.4-3.8 11.4-10.1 0-11-13.8-10-13.8-15.1 0-1.8 1.5-2.7 3.8-2.7 2.6 0 4.3 1.1 5 3.1l5-2.5c-1.6-3.8-5-5.8-10-5.8-6.1 0-10 3.3-10 8.6 0 9.8 13.8 9.2 13.8 15.6z"
                fill="white"
              />
            </svg>
            <span className="mt-3 text-xs font-bold uppercase tracking-widest text-[#3178c6] font-display">
              TS
            </span>
          </Face>

          {/* Face 5: UI / CSS (Top) */}
          <Face
            style={{
              transform: "rotateX(90deg) translateZ(calc(var(--cube-size) / 2))",
              backgroundColor: "rgba(168, 85, 247, 0.13)",
            }}
          >
            {/* CSS3 Icon */}
            <svg
              viewBox="0 0 24 24"
              className="w-12 h-12 fill-[#a855f7] drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17.3 6.1H8.2l.2 2.5h10.2l-.5 5.7-3.9 1.1-3.9-1.1-.3-2.9H7.6l.5 5.5 3.9 1.1 3.9-1.1 1.2-12.8z" />
            </svg>
            <span className="mt-3 text-xs font-bold uppercase tracking-widest text-[#a855f7] font-display">
              UI
            </span>
          </Face>

          {/* Face 6: Redux (Bottom) */}
          <Face
            style={{
              transform: "rotateX(-90deg) translateZ(calc(var(--cube-size) / 2))",
              backgroundColor: "rgba(118, 74, 188, 0.13)",
            }}
          >
            {/* Redux Icon */}
            <svg
              viewBox="0 0 100 100"
              className="w-12 h-12 fill-[#764abc] drop-shadow-[0_0_8px_rgba(118,74,188,0.5)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M68.5 25.5a20.4 20.4 0 0 0-14.8-6.1A19.8 19.8 0 0 0 39.5 25a19.7 19.7 0 0 0-5.7 13.9c0 8.3 5 15.6 12.6 18.3A19.8 19.8 0 0 0 61.2 52a19.7 19.7 0 0 0 5.7-13.9 19.7 19.7 0 0 0-1.6-7.8l6.3-5.2c1.7 3.3 2.6 7 2.6 10.9 0 12.7-10.3 23-23 23a22.9 22.9 0 0 1-21-14.6l-6.3 5.2A29.4 29.4 0 0 0 49.8 77c16 0 29-13 29-29a28.8 28.8 0 0 0-3.9-14.6z" />
              <path d="M49.8 21.6c-7.3 0-13.8 3.5-17.8 8.8l-6.3-5.2A29 29 0 0 1 49.8 11.5c16.1 0 29.1 13 29.1 29.1l-8.3-.1c0-10.4-8.4-18.9-18.9-18.9z" />
            </svg>
            <span className="mt-3 text-xs font-bold uppercase tracking-widest text-[#764abc] font-display">
              Redux
            </span>
          </Face>
        </div>
      </div>
      {/* Dynamic Ground Shadow */}
      <div className="cube-shadow animate-cube-shadow" />
    </div>
  );
}

/* Helper Reusable Face Component */
function Face({
  children,
  style,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center rounded-[24px] shadow-neo-raised [backface-visibility:hidden] [will-change:transform] border border-white/10 backdrop-blur-[1px] select-none"
      style={style}
    >
      {children}
    </div>
  );
}
