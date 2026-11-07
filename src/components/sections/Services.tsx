"use client";

import * as React from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  detail: string;
}

const services: Service[] = [
  {
    id: "web",
    number: "01",
    title: "Web Development",
    description:
      "Modern websites, landing pages and responsive digital experiences.",
    detail:
      "Built with Next.js, React, Tailwind and Framer Motion — performant, accessible and crafted for conversion.",
  },
  {
    id: "three",
    number: "02",
    title: "3D Visualization",
    description:
      "Architectural visualization, interactive showrooms and immersive spaces.",
    detail:
      "React Three Fiber, Three.js, custom shaders and real-time rendering for the web.",
  },
  {
    id: "design",
    number: "03",
    title: "Digital Design",
    description:
      "Presentations, brand visuals and digital concepts.",
    detail:
      "Art-directed layouts, typographic systems and visual identities that hold attention.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section bg-background relative overflow-hidden z-10">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/6 blur-[110px]" />
        <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[110px]" />
      </div>

      <div className="container relative z-10">
        <SectionHeader
          kicker="WHAT WE CREATE"
          title="Services"
          description="We work across the full spectrum of digital creation, from code to image."
          center
        />

        <div className="space-y-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  const [hovered, setHovered] = React.useState(false);
  const [arrowX, setArrowX] = React.useState(0);

  return (
    <motion.div
      whileHover={{ x: -4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setArrowX(((e.clientX - rect.left) / rect.width) * 40 - 20);
      }}
      className={cn(
        "group relative flex items-center justify-between gap-6 px-8 py-10 rounded-3xl border border-border bg-secondary transition-colors duration-300",
        hovered
          ? "border-accent/60 bg-accent/5 shadow-[0_0_40px_rgba(198,255,77,0.10)]"
          : "hover:border-white/10",
      )}
    >
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-muted tracking-widest uppercase">
            {service.number}
          </span>
          <span className="w-px h-4 bg-border" />
          <motion.h3
            whileHover={{ x: 4 }}
            className="text-2xl md:text-3xl font-bold tracking-tight leading-tight text-foreground transition-colors duration-300"
            style={{ color: hovered ? "#C6FF4D" : "inherit" }}
          >
            {service.title}
          </motion.h3>
        </div>
        <p className="text-muted text-sm md:text-base leading-relaxed">
          {service.description}
        </p>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: hovered ? 1 : 0,
            height: hovered ? "auto" : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="mt-4 overflow-hidden"
        >
          <p className="text-xs md:text-sm text-muted leading-relaxed">
            {service.detail}
          </p>
        </motion.div>
      </div>

      <motion.div
        animate={{ x: arrowX }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="flex items-center text-accent transition-colors duration-300 group-hover/text-accent"
      >
        <span className="text-sm font-bold hidden md:block uppercase tracking-widest opacity-70">
          Learn more
        </span>
        <ArrowRight className="w-5 h-5 ml-2" />
      </motion.div>
    </motion.div>
  );
}
