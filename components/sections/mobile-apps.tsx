"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const apps = [
  {
    title: "Light the Lamp: Puzzle Game",
    img: "/images/light_the_lamp_banner.png",
    description:
      "A relaxing neon logic puzzle game where players rotate wires, connect circuits, and light every lamp. Features handcrafted puzzles, endless procedural levels, daily challenges, offline gameplay, and Google Play achievements.",
    features: [
      "🧩 Logic Puzzle",
      "📶 Offline Play",
      "📅 Daily Challenges",
      "♾️ Infinite Levels",
      "💡 Smart Hint System",
    ],
    tech: ["React Native", "Expo", "TypeScript"],
    platform: "Android",
    googlePlayUrl:
      "https://play.google.com/store/apps/details?id=com.ocensoft.lightthelamp&pcampaignid=web_share",
    privacyPolicyUrl:
      "https://github.com/harmil007/light-the-lamp-config/blob/main/privacy_policy_light_the_lamp.md",
  },
  {
    title: "Word Search Legends",
    img: "/images/word_search.png",
    description:
      "A relaxing word search puzzle game centered around historical legends and pioneers. Search through soft neumorphic letter grids to unlock collectible Discovery Cards with biographical insights, quotes, and achievements. Features daily challenge streaks, customizable themes, and offline play.",
    features: [
      "🔍 Word Search",
      "📜 Discovery Cards",
      "📶 Offline Play",
      "📅 Daily Challenges",
      "🎨 Theme Shop",
    ],
    tech: ["React Native", "Expo", "TypeScript"],
    platform: "Android",
    googlePlayUrl:
      "https://play.google.com/store/apps/details?id=com.ocensoft.wordsearchlegends",
    privacyPolicyUrl:
      "https://github.com/harmil007/word-search-legends/blob/main/privacy_policy.md",
  },
  {
    title: "Fill the Box: Puzzle Game",
    img: "/images/fill_the_box_new.png",
    description:
      "A colorful and satisfying path-finding puzzle game where players connect numbered tiles and draw continuous lines to fill every box on the board. Features chapter-based level maps, locked tile mechanics, daily challenges, and Hall of Fame achievements.",
    features: [
      "🧩 Path Puzzle",
      "🗺️ Level Map",
      "📶 Offline Play",
      "📅 Daily Challenges",
      "🏆 Hall of Fame",
    ],
    tech: ["React Native", "Expo", "TypeScript"],
    platform: "Android",
    googlePlayUrl:
      "https://play.google.com/store/apps/details?id=com.ocensoft.fillthebox",
    privacyPolicyUrl:
      "https://github.com/harmil007/config-fill-the-box/blob/main/PRIVACY_POLICY.md",
  },
];

export default function MobileApps() {
  return (
    <section
      id="apps"
      className="relative py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Mobile Apps
          </h2>
          <Separator className="mb-4" />
          <p className="text-muted-foreground text-sm sm:text-base">
            Games & Apps published by OcenSoft - designed & developed by{" "}
            <b className="text-foreground">Harmil Goti</b>
          </p>
        </motion.div>

        {/* Single Column Layout - See one card at a time on scroll */}
        <div className="flex flex-col gap-10 sm:gap-14">
          {apps.map((app, index) => (
            <HoverDrawerAppCard
              key={app.title}
              app={app}
              index={index}
              total={apps.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HoverDrawerAppCard({
  app,
  index,
  total,
}: {
  app: (typeof apps)[0];
  index: number;
  total: number;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 1, 0.5, 1] as const,
      }}
      className="w-full"
    >
      {/* Computer / App Window Container */}
      <div
        onClick={() => setIsMobileOpen((prev) => !prev)}
        className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-card border border-border/20 shadow-neo-raised group flex flex-col cursor-pointer select-none"
      >
        {/* Top Window Header Bar */}
        <div className="h-8 sm:h-9 bg-background/95 backdrop-blur-md flex items-center justify-between px-4 border-b border-border/20 z-20 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <div className="ml-3 px-3 py-0.5 rounded-md bg-secondary/50 text-[10px] font-mono text-muted-foreground truncate max-w-xs sm:max-w-md">
              OcenSoft • {app.title}
            </div>
          </div>
          <Badge
            variant="outline"
            className="border-primary/30 text-primary font-mono text-[10px] px-2 py-0 bg-primary/5"
          >
            {app.platform}
          </Badge>
        </div>

        {/* 16:9 Image Visual Container with Hover-Slide Details Drawer */}
        <div className="relative w-full aspect-video overflow-hidden bg-black/40">
          <Image
            loading="lazy"
            fill
            src={app.img}
            alt={app.title}
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />

          {/* Attached Right-Side Details Drawer (Slides in on Hover) */}
          <div
            className={`absolute top-0 bottom-0 right-0 z-30 w-full sm:w-[380px] md:w-[420px] lg:w-[460px] flex flex-col transform transition-transform duration-500 ease-out ${
              isMobileOpen
                ? "translate-x-0"
                : "translate-x-full group-hover:translate-x-0"
            }`}
          >
            <div className="h-full w-full bg-card/95 backdrop-blur-2xl border-l border-border/40 p-4 sm:p-5 md:p-6 shadow-2xl flex flex-col justify-between space-y-2.5 overflow-y-auto custom-scrollbar">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    Mobile App 0{index + 1}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground">
                    0{index + 1} / 0{total}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-foreground tracking-tight">
                  {app.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">
                  {app.description}
                </p>
              </div>

              <div className="space-y-1.5 border-t border-border/20 pt-2">
                <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-foreground/70">
                  Key Features
                </h4>
                <div className="flex flex-wrap gap-1">
                  {app.features.map((feature) => (
                    <Badge
                      key={feature}
                      variant="secondary"
                      className="text-[10px] sm:text-[11px] bg-secondary/50 text-muted-foreground px-2 py-0.5 border border-border/10 shadow-inset-sm"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 border-t border-border/20 pt-2">
                <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-foreground/70">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1">
                  {app.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="text-[10px] sm:text-[11px] border-primary/20 text-foreground/80 px-2 py-0.5"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-border/20">
                {app.googlePlayUrl ? (
                  <Button
                    asChild
                    className="btn-neumorphic-primary text-xs px-3 py-1.5 h-auto font-terminal tracking-wider flex-1"
                  >
                    <a
                      href={app.googlePlayUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1"
                    >
                      Get on Google Play ↗
                    </a>
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="opacity-60 text-xs px-3 py-1.5 h-auto font-terminal flex-1"
                  >
                    Listing Pending
                  </Button>
                )}

                {app.privacyPolicyUrl && (
                  <Button
                    variant="outline"
                    asChild
                    className="btn-neumorphic text-xs px-3 py-1.5 h-auto font-terminal"
                  >
                    <a
                      href={app.privacyPolicyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
