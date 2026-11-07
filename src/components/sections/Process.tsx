"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

interface Stage {
  id: string;
  number: string;
  title: string;
  description: string;
}

const stages: Stage[] = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    description: "Understanding the idea.",
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    description: "Creating the visual direction.",
  },
  {
    id: "develop",
    number: "03",
    title: "Develop",
    description: "Building the experience.",
  },
  {
    id: "deliver",
    number: "04",
    title: "Deliver",
    description: "Launching the final result.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section bg-background relative overflow-hidden z-10">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/6 blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <SectionHeader
          kicker="PROCESS"
          title="How we work"
          description="A considered four-stage process from first conversation to launch."
          center
        />

        <div className="relative mx-auto max-w-[900px]">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border" />

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-x-12 items-stretch">
            {stages.map((stage, i) => (
              <TimelineStage
                key={stage.id}
                stage={stage}
                index={i}
                total={stages.length}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Scroll through the process
          </span>
        </div>
      </div>
    </section>
  );
}

interface TimelineStageProps {
  stage: Stage;
  index: number;
  total: number;
}

function TimelineStage({ stage, index, total }: TimelineStageProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className={cn(
          "relative flex flex-col items-center gap-4 z-10",
          inView ? "border-accent" : "border-border",
        )}
      >
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border bg-background z-20">
          <span className="text-accent font-bold text-lg">
            {stage.number}
          </span>
        </div>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
          className="text-lg font-bold tracking-tight text-foreground"
        >
          {stage.title}
        </motion.h3>
        <p className="text-xs text-muted text-center leading-relaxed max-w-[180px]">
          {stage.description}
        </p>
      </motion.div>

      {/* Line segments between stages */}
      {!isFirst && (
        <div
          className={cn(
            "absolute -top-[56px] left-1/2 -translate-x-1/2 h-[56px] w-px",
            inView ? "bg-accent" : "bg-border",
          )}
        />
      )}
      {!isLast && (
        <div
          className={cn(
            "absolute bottom-[56px] left-1/2 -translate-x-1/2 h-[56px] w-px",
            inView ? "bg-accent" : "bg-border",
          )}
        />
      )}
    </div>
  );
}
