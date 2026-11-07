"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  className?: string;
  center?: boolean;
}

export default function SectionHeader({
  kicker,
  title,
  description,
  className,
  center = false,
}: SectionHeaderProps) {
  const textAlign = center ? "text-center" : "text-left";
  return (
    <div className={cn("mb-12 max-w-2xl mx-auto", center ? "mx-auto" : "", className)}>
      {kicker && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-3 px-2.5 py-0.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-[10px] font-bold uppercase tracking-widest"
        >
          {kicker}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={cn("mb-4 text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]", textAlign)}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn("text-lg md:text-xl text-muted leading-relaxed max-w-xl mx-auto", textAlign)}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
