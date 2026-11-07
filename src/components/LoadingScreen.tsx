"use client";

import * as React from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  if (mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center gap-2 text-accent"
      >
        <span className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold tracking-tighter">NEXORA</span>
        <span className="text-xs font-medium text-muted tracking-[0.3em]">®</span>
      </motion.div>
      <div className="mt-6 w-[44px] h-0.5 bg-accent" />
    </motion.div>
  );
}
