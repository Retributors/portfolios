"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0], y: [0, 0, 10, 10] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute left-1/2 bottom-6 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
    >
      <div className="flex items-end gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">
        SCROLL<span className="text-accent"> TO EXPLORE</span>
      </div>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="w-0.5 h-6 bg-accent rounded-full"
      />
      <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
        <ChevronDown className="w-3 h-3 text-muted" />
      </div>
    </motion.div>
  );
}

export function ExternalLinkIcon() {
  return (
    <ArrowRight className="w-3.5 h-3.5" />
  );
}
