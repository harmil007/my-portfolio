"use client";

import React, { useState, useEffect } from "react";

export function InteractiveCube() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardState, setCardState] = useState<"raised" | "sunken">("raised");
  const [contentStyle, setContentStyle] = useState({
    transform: "translate(0px, 0px) scale(1)",
    opacity: 1,
    transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
  });

  const skills = [
    {
      name: "React",
      color: "#61dafb",
      icon: (
        <svg
          viewBox="0 0 100 100"
          className="w-20 h-20 fill-none stroke-[#61dafb] drop-shadow-[0_0_12px_rgba(97,218,251,0.5)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="8" fill="#61dafb" />
          <ellipse cx="50" cy="50" rx="38" ry="14" strokeWidth="4" />
          <ellipse cx="50" cy="50" rx="38" ry="14" strokeWidth="4" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="38" ry="14" strokeWidth="4" transform="rotate(120 50 50)" />
        </svg>
      ),
    },
    {
      name: "JS",
      color: "#f7df1e",
      icon: (
        <svg
          viewBox="0 0 100 100"
          className="w-20 h-20 fill-[#f7df1e] drop-shadow-[0_0_12px_rgba(247,223,30,0.5)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 5h90v90H5z" />
          <path
            d="M59.5 80.3c1.5 2.7 4.1 4.5 7.8 4.5 3.9 0 6.2-2 6.2-7.8V42.5h11v34.3c0 11.5-6.8 17.2-17 17.2-10 0-14.8-5.3-17.5-10.7l9.5-3zM31 80.5c1.8 3 4.8 4.3 8.3 4.3 4.3 0 7-2 7-6.2 0-4.3-3.2-5.8-8.5-8.1l-3-1.3c-7-3-11.8-6.7-11.8-14.8 0-8.5 7.2-14.3 16.5-14.3 8 0 13.5 3.8 16 9.5l-9.3 5.4c-1.5-3-3.8-4.3-6.7-4.3-3.2 0-5.3 2-5.3 4.8 0 3.3 2 4.6 6.7 6.7l3 1.3c8.5 3.7 13.8 7.3 13.8 16.2 0 9.8-7.7 15.6-18.3 15.6-11 0-17.5-5.3-20.5-11.7l9.5-5.5z"
            fill="#000000"
          />
        </svg>
      ),
    },
    {
      name: "Next.js",
      color: "#0070f3",
      icon: (
        <svg
          viewBox="0 0 180 180"
          className="w-20 h-20 fill-current text-foreground drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id="mask_sliding">
            <circle cx="90" cy="90" r="90" fill="white" />
          </mask>
          <g mask="url(#mask_sliding)">
            <circle cx="90" cy="90" r="90" className="fill-background" />
            <path
              d="M149.508 157.52L69.142 54H54v72h12.142V69.742l68.783 87.778zM126 54h12v72h-12z"
              fill="url(#paint_sliding)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint_sliding"
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
      ),
    },
    {
      name: "TS",
      color: "#3178c6",
      icon: (
        <svg
          viewBox="0 0 100 100"
          className="w-20 h-20 fill-[#3178c6] drop-shadow-[0_0_12px_rgba(49,120,198,0.5)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 5h90v90H5z" />
          <path
            d="M48.2 60.1H41v18h-6.2v-18h-7.2v-5.2h20.6v5.2zm20.8 10.4c0 3.6-2.5 5.5-6.2 5.5-3.5 0-5.6-1.5-6.4-4l-5.2 2.6c1.6 4.6 6 6.9 11.6 6.9 7 0 11.4-3.8 11.4-10.1 0-11-13.8-10-13.8-15.1 0-1.8 1.5-2.7 3.8-2.7 2.6 0 4.3 1.1 5 3.1l5-2.5c-1.6-3.8-5-5.8-10-5.8-6.1 0-10 3.3-10 8.6 0 9.8 13.8 9.2 13.8 15.6z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      name: "UI",
      color: "#a855f7",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-20 h-20 fill-[#a855f7] drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17.3 6.1H8.2l.2 2.5h10.2l-.5 5.7-3.9 1.1-3.9-1.1-.3-2.9H7.6l.5 5.5 3.9 1.1 3.9-1.1 1.2-12.8z" />
        </svg>
      ),
    },
    {
      name: "Redux",
      color: "#764abc",
      icon: (
        <svg
          viewBox="0 0 100 100"
          className="w-20 h-20 fill-[#764abc] drop-shadow-[0_0_12px_rgba(118,74,188,0.5)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M68.5 25.5a20.4 20.4 0 0 0-14.8-6.1A19.8 19.8 0 0 0 39.5 25a19.7 19.7 0 0 0-5.7 13.9c0 8.3 5 15.6 12.6 18.3A19.8 19.8 0 0 0 61.2 52a19.7 19.7 0 0 0 5.7-13.9 19.7 19.7 0 0 0-1.6-7.8l6.3-5.2c1.7 3.3 2.6 7 2.6 10.9 0 12.7-10.3 23-23 23a22.9 22.9 0 0 1-21-14.6l-6.3 5.2A29.4 29.4 0 0 0 49.8 77c16 0 29-13 29-29a28.8 28.8 0 0 0-3.9-14.6z" />
          <path d="M49.8 21.6c-7.3 0-13.8 3.5-17.8 8.8l-6.3-5.2A29 29 0 0 1 49.8 11.5c16.1 0 29.1 13 29.1 29.1l-8.3-.1c0-10.4-8.4-18.9-18.9-18.9z" />
        </svg>
      ),
    },
  ];

  // Set initial brand color on mount
  useEffect(() => {
    document.documentElement.style.setProperty("--glow-color", skills[0].color);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. SINK: Set card to sunken state
      setCardState("sunken");

      // Pick a random exit direction
      const directions = ["left", "right", "up", "down"];
      const dir = directions[Math.floor(Math.random() * directions.length)];

      let exitTransform = "translate(0px, 0px)";
      let enterTransform = "translate(0px, 0px)";

      if (dir === "left") {
        exitTransform = "translate(-130%, 0px) scale(0.85)";
        enterTransform = "translate(130%, 0px) scale(0.85)";
      } else if (dir === "right") {
        exitTransform = "translate(130%, 0px) scale(0.85)";
        enterTransform = "translate(-130%, 0px) scale(0.85)";
      } else if (dir === "up") {
        exitTransform = "translate(0px, -130%) scale(0.85)";
        enterTransform = "translate(0px, 130%) scale(0.85)";
      } else if (dir === "down") {
        exitTransform = "translate(0px, 130%) scale(0.85)";
        enterTransform = "translate(0px, -130%) scale(0.85)";
      }

      // WAIT 500ms BEFORE SLIDING: Simulates physical latency/loading visual weight
      setTimeout(() => {
        // 2. SLIDE OUT: Slide current content out smoothly
        setContentStyle({
          transform: exitTransform,
          opacity: 0,
          transition: "all 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
        });

        // 3. SWAP & SNAP PRE-POSITION: Snap next content to entering boundary
        setTimeout(() => {
          const nextIndex = (currentIndex + 1) % skills.length;
          setCurrentIndex(nextIndex);

          // Sync name glow color property on swap
          document.documentElement.style.setProperty("--glow-color", skills[nextIndex].color);

          // Snap without transition
          setContentStyle({
            transform: enterTransform,
            opacity: 0,
            transition: "none",
          });

          // 4. SLIDE IN: Slide next content into center
          setTimeout(() => {
            setContentStyle({
              transform: "translate(0px, 0px) scale(1)",
              opacity: 1,
              transition: "all 0.45s cubic-bezier(0.25, 1, 0.5, 1)",
            });

            // 5. RISE: Restore card to raised floating state
            setTimeout(() => {
              setCardState("raised");
            }, 350);

          }, 50);

        }, 350);

      }, 500); // 500ms delay

    }, 3500);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        "--card-size": "clamp(180px, 24vw, 220px)",
        width: "calc(var(--card-size) + 60px)",
        height: "calc(var(--card-size) + 60px)",
      } as React.CSSProperties}
    >
      {/* Outer Neumorphic Card Surface */}
      <div
        className={`
          w-[var(--card-size)] h-[var(--card-size)]
          rounded-[36px] overflow-hidden flex items-center justify-center
          transition-all duration-500 ease-out border border-white/5 backdrop-blur-[2px]
          ${cardState === "raised" ? "shadow-neo-raised scale-100" : "shadow-neo-inset scale-[0.98]"}
        `}
        style={{
          backgroundColor: cardState === "raised"
            ? `color-mix(in oklab, ${skills[currentIndex].color} 8%, var(--bg-page))`
            : `color-mix(in oklab, ${skills[currentIndex].color} 4%, var(--bg-page))`,
        }}
      >
        {/* Sliding Content Layer */}
        <div
          className="flex flex-col items-center justify-center w-full h-full p-6 will-change-transform"
          style={contentStyle}
        >
          {skills[currentIndex].icon}
          <span
            className="mt-5 text-sm font-bold uppercase tracking-[0.2em] font-display"
            style={{ color: skills[currentIndex].color }}
          >
            {skills[currentIndex].name}
          </span>
        </div>
      </div>
    </div>
  );
}
