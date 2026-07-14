"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Smartphone, Cpu } from "lucide-react";

export default function DeveloperContact() {
  const contactDetails = [
    {
      label: "Developer",
      value: "OcenSoft",
      icon: User,
    },
    {
      label: "Email",
      value: "ocensoft@gmail.com",
      icon: Mail,
      href: "mailto:ocensoft@gmail.com",
    },
    {
      label: "Platform",
      value: "Android",
      icon: Smartphone,
    },
    {
      label: "Powered by",
      value: "React Native + Expo",
      icon: Cpu,
    },
  ];

  return (
    <section
      id="developer-contact"
      className="relative py-20 sm:py-24 lg:py-28 overflow-clip"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-primary/5" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl px-4 sm:px-6"
      >
        <div className="mb-8 sm:mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Developer Contact
          </h2>
          <Separator className="mb-8" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactDetails.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="bg-card border border-border/10 shadow-inset-md transition-all duration-300 ease-out hover:border-primary/20"
              >
                <CardContent className="p-6 flex items-start gap-4 h-full">
                  <div className="p-3 rounded-lg bg-secondary/50 border border-border/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-foreground/50 uppercase tracking-wider block">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors block break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm sm:text-base font-semibold text-foreground/90 block">
                        {item.value}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
