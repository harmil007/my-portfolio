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
];

export default function MobileApps() {
  return (
    <section
      id="apps"
      className="relative py-20 sm:py-24 lg:py-28 overflow-clip"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl px-4 sm:px-6"
      >
        <div className="mb-8 sm:mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Mobile Apps
          </h2>
          <Separator className="mb-4" />
          <p className="text-muted-foreground text-sm sm:text-base">
            Games & Apps published by OcenSoft. More titles coming soon.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {apps.map((app) => (
            <Card
              key={app.title}
              className="bg-card border border-border/10 shadow-inset-md transition-all duration-300 ease-out hover:border-primary/20"
            >
              <CardContent className="p-6 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  {app.img && (
                    <div className="relative aspect-video rounded-md overflow-hidden">
                      <Image
                        loading="lazy"
                        fill
                        src={app.img}
                        alt={app.title}
                        className="object-cover shadow-inset-sm"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-bold tracking-tight text-foreground/90">
                      {app.title}
                    </h3>
                    <Badge
                      variant="outline"
                      className="border-primary/30 text-primary"
                    >
                      {app.platform}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {app.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                      Key Features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {app.features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="secondary"
                          className="text-xs bg-secondary/50 text-muted-foreground px-2 py-0.5 border border-border/5"
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
                    <div className="flex flex-wrap gap-2">
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

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {app.googlePlayUrl ? (
                    <Button asChild className="shadow-none">
                      <a
                        href={app.googlePlayUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get it on Google Play
                      </a>
                    </Button>
                  ) : (
                    <Button disabled className="shadow-none opacity-60">
                      Listing Pending
                    </Button>
                  )}

                  {app.privacyPolicyUrl && (
                    <Button variant="outline" asChild className="shadow-none">
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
          ))}
        </div>
      </motion.div>
    </section>
  );
}
