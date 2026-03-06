"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { servicesData } from "@/data/serviceData";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-20 sm:py-24 lg:py-28 overflow-clip"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto max-w-6xl px-4 sm:px-6"
      >
        <div className="mb-8 sm:mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Services</h2>
          <Separator className="mb-8" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                delay: index * 0.1,
              }}
              className="group relative p-6 rounded-2xl overflow-hidden border border-border-dark bg-card hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-3">{service.title}</h3>

              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
