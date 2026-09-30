"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
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
    img: "/images/fill_the_box.png",
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

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
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

        {/* Neumorphic Grid Layout */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {apps.map((app, index) => (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 1, 0.5, 1] as const,
              }}
            >
              <Card className="bg-card border border-border/10 inset-shadow-xl transition-all duration-300 rounded-2xl h-full flex flex-col group overflow-hidden">
                <CardContent className="p-6 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-4">
                    {/* Inset Neumorphic Image Frame */}
                    {app.img && (
                      <div className="relative aspect-video rounded-xl overflow-hidden shadow-inset-md border border-border/10 bg-secondary/30">
                        <Image
                          loading="lazy"
                          fill
                          src={app.img}
                          alt={app.title}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {app.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className="border-primary/30 text-primary font-mono text-xs shrink-0 bg-primary/5"
                      >
                        {app.platform}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {app.description}
                    </p>

                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                        Key Features
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {app.features.map((feature) => (
                          <Badge
                            key={feature}
                            variant="secondary"
                            className="text-xs bg-secondary/60 text-muted-foreground px-2 py-0.5 border border-border/10 shadow-inset-sm"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {app.tech.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs border-primary/20 text-foreground/80 px-2 py-0.5"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Neumorphic Pill CTA Buttons */}
                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 pt-2 mt-auto">
                    {app.googlePlayUrl ? (
                      <Button
                        asChild
                        className="btn-neumorphic-primary font-terminal text-xs flex-1 py-2 h-auto"
                      >
                        <a
                          href={app.googlePlayUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Get it on Google Play ↗
                        </a>
                      </Button>
                    ) : (
                      <Button
                        disabled
                        className="opacity-60 font-terminal text-xs flex-1 py-2 h-auto"
                      >
                        Listing Pending
                      </Button>
                    )}

                    {app.privacyPolicyUrl && (
                      <Button
                        variant="outline"
                        asChild
                        className="btn-neumorphic font-terminal text-xs flex-1 py-2 h-auto"
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
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
