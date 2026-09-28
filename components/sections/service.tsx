"use client";

import Spiral3D, { SpiralItem } from "@/components/animations/Spiral3D";
import { servicesData } from "@/data/serviceData";

export default function Services() {
  const items: SpiralItem[] = [
    ...servicesData.map((s, idx) => ({
      title: s.title,
      description: s.description,
      badge: `Service 0${idx + 1}`,
    })),
    {
      title: "Frontend Architecture & AI Integration",
      description:
        "Building modular design systems, state management flows, and integrating AI workflows and WebSockets for real-time web experiences.",
      badge: "Core Expertise",
    },
  ];

  return <Spiral3D items={items} sectionTitle="Services & Capabilities" />;
}
