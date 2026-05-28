"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

// Map section IDs to their corresponding root notes for visual reference
const NOTE_MAP: Record<string, string> = {
  home: "C4",
  hero: "C4",
  about: "E4",
  services: "A4",
  skills: "F4",
  experience: "G4",
  projects: "D4",
  contact: "B4",
};

// Beautiful pentatonic scales tailored to each section for harmonious cascading sweeps (Piano/Harp Mode)
const SCALES: Record<string, string[]> = {
  home: ["C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5", "G5", "A5"],
  hero: ["C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5", "G5", "A5"],
  about: ["E4", "G4", "A4", "B4", "D5", "E5", "G5", "A5", "B5", "D6"],
  services: ["A3", "C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5", "G5"],
  skills: ["F4", "G4", "A4", "C5", "D5", "F5", "G5", "A5", "C6", "D6"],
  experience: ["G4", "A4", "B4", "D5", "E5", "G5", "A5", "B5", "D6", "E6"],
  projects: ["D4", "F4", "G4", "A4", "C5", "D5", "F5", "G5", "A5", "C6"],
  contact: ["B4", "D5", "E5", "F#5", "A5", "B5", "D6", "E6", "F#6", "A6"],
};

export default function ScrollAudioEffects() {
  const [isMuted, setIsMuted] = useState(true); // Muted by default to match browser autoplay standards
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Web Audio Context & Node Refs
  const toneRef = useRef<any>(null);
  const polySynthRef = useRef<any>(null); // For Piano/Harp cascading notes
  const reverbRef = useRef<any>(null);

  // Interaction & Tracking Refs to avoid stale closure lags
  const activeSectionRef = useRef("home");
  const isMutedRef = useRef(true);

  // Scroll Tracking State Refs
  const lastScrollTopRef = useRef(0);
  const accumulatedScrollRef = useRef(0);
  const lastPlayTimeRef = useRef(0);
  const noteIndexRef = useRef(0);

  // Sync scroll position on mount
  useEffect(() => {
    lastScrollTopRef.current = window.scrollY;
  }, []);

  // Synchronize dynamic state with refs for safe use in non-reactive window scroll event listeners
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Client-side initialization of premium Tone.js Audio Engine
  useEffect(() => {
    let active = true;

    async function initAudioEngine() {
      try {
        const Tone = await import("tone");
        if (!active) return;

        toneRef.current = Tone;

        // 1. Lush Cinematic Reverb Tail
        const reverb = new Tone.Reverb({
          decay: 5.2, // Expansive concert-hall tail
          preDelay: 0.12, // Separation transient delay
          wet: 0.58, // Balanced mix of wet tail and pluck
        }).toDestination();

        await reverb.ready;
        if (!active) return;

        // 2. Polyphonic synth for overlapping cascading notes
        const polySynth = new Tone.PolySynth(Tone.Synth, {
          oscillator: {
            type: "triangle", // Soft triangle waves for warm, organic pluck
          },
          envelope: {
            attack: 0.02, // Snappy strike/pluck attack
            decay: 1.4,
            sustain: 0.15,
            release: 2.8, // Long blend ringout
          },
          volume: -24, // Soft baseline volume
        }).connect(reverb);

        polySynthRef.current = polySynth;
        reverbRef.current = reverb;

        setIsInitialized(true);
      } catch (error) {
        console.error("[Audio Engine] Tone.js initialization failed:", error);
      }
    }

    initAudioEngine();

    // Clean up audio nodes on unmount to prevent page memory leaks
    return () => {
      active = false;
      if (polySynthRef.current) polySynthRef.current.dispose();
      if (reverbRef.current) reverbRef.current.dispose();
    };
  }, []);

  // Section observer to modulate scale and active root note environment
  useEffect(() => {
    if (!isInitialized) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "-25% 0px -25% 0px", // Focus triggers in the central 50% scroll window
      threshold: 0.1,
    });

    const targetIds = [
      "home",
      "hero",
      "about",
      "services",
      "skills",
      "experience",
      "projects",
      "contact",
    ];
    targetIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isInitialized]);

  // Main scroll-based ribbon instrument engine (Piano/Harp Glissando)
  useEffect(() => {
    if (!isInitialized) return;

    const handleScrollInstrument = () => {
      // Do nothing if muted or not ready
      if (isMutedRef.current || !toneRef.current || !polySynthRef.current)
        return;

      const Tone = toneRef.current;
      const scrollTop = window.scrollY;
      const now = Date.now();
      const distDiff = Math.abs(scrollTop - lastScrollTopRef.current);

      // Ensure AudioContext is actively running
      if (Tone.context.state !== "running") {
        Tone.start();
        return;
      }

      accumulatedScrollRef.current += distDiff;

      // Pluck a note every 70px of scroll wheel/trackpad swipe
      const threshold = 70;
      if (accumulatedScrollRef.current >= threshold) {
        accumulatedScrollRef.current = 0; // Reset accumulator

        // Cap note triggers to at least 85ms apart for elegant musicality
        if (now - lastPlayTimeRef.current > 85) {
          const section = activeSectionRef.current;
          const scale = SCALES[section] || SCALES["home"];
          const isScrollingDown = scrollTop > lastScrollTopRef.current;

          // Increment note index upwards if scrolling down, downwards if scrolling up
          let newIndex = noteIndexRef.current + (isScrollingDown ? 1 : -1);
          if (newIndex >= scale.length) newIndex = 0;
          if (newIndex < 0) newIndex = scale.length - 1;

          noteIndexRef.current = newIndex;
          const noteToPlay = scale[newIndex];

          // Trigger natural plucked envelope note
          polySynthRef.current.triggerAttackRelease(noteToPlay, "2n");
          lastPlayTimeRef.current = now;
        }
      }

      lastScrollTopRef.current = scrollTop;
    };

    window.addEventListener("scroll", handleScrollInstrument, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", handleScrollInstrument);
    };
  }, [isInitialized]);

  const toggleMute = async () => {
    if (!toneRef.current) return;
    const Tone = toneRef.current;

    // Direct click handles AudioContext startup perfectly
    if (Tone.context.state !== "running") {
      await Tone.start();
    }

    if (isMuted) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col sm:flex-row items-end sm:items-center gap-3">
      {/* Visual Status & Instrument Pill */}
      {!isMuted && (
        <div className="flex flex-col items-end px-3 py-1.5 rounded-2xl bg-bg-page/60 dark:bg-bg-page/40 border border-white/20 dark:border-white/5 backdrop-blur-md shadow-md animate-fade-in text-[10px]">
          <span className="font-terminal font-semibold uppercase tracking-wider text-brand-light dark:text-brand text-[8px] flex items-center gap-1">
            <Music className="h-2.5 w-2.5" />
            Playing Ambient Piano
          </span>
          <span className="font-semibold text-text-heading capitalize text-[11px] mt-0.5">
            {activeSection === "home" || activeSection === "hero"
              ? "Hero"
              : activeSection}{" "}
            ({NOTE_MAP[activeSection] || "C4"})
          </span>
        </div>
      )}

      {/* Control Deck Container */}
      <div className="flex items-center rounded-full bg-bg-page/60 dark:bg-bg-page/40 border border-white/20 dark:border-white/5 p-1 backdrop-blur-md shadow-md">
        {/* Floating Mute/Unmute Action Toggle */}
        <button
          onClick={toggleMute}
          aria-label={
            isMuted ? "Unmute soundscape chimes" : "Mute soundscape chimes"
          }
          className={`group cursor-pointer relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ease-out active:scale-95 ${
            isMuted
              ? "bg-bg-page/80 dark:bg-bg-page/60 text-text-muted hover:text-text-heading shadow-sm"
              : "bg-brand/20 dark:bg-brand/10 border border-brand/20 text-brand dark:text-brand-light shadow-brand shadow-sm"
          }`}
        >
          {isMuted && (
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand-light/10 dark:bg-brand/10 opacity-75 duration-1000" />
          )}

          {isMuted ? (
            <VolumeX className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110" />
          ) : (
            <Volume2 className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110" />
          )}

          {/* Tooltip */}
          <span className="pointer-events-none absolute bottom-14 right-0 scale-95 opacity-0 rounded-2xl bg-neutral-900/90 dark:bg-neutral-50/90 text-[10px] font-semibold text-text-inverse dark:text-neutral-900 py-1.5 px-3 whitespace-nowrap shadow-md transition-all duration-300 origin-bottom group-hover:scale-100 group-hover:opacity-100 backdrop-blur-sm">
            {isMuted ? "Enable Soundscapes" : "Mute Soundscapes"}
          </span>
        </button>
      </div>
    </div>
  );
}
