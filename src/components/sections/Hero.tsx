"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import MacBookHero from "@/components/three/MacBookHero";
import Button from "@/components/ui/Button";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

const lines = ["WE BUILD", "DIGITAL", "EXPERIENCES."];

export default function Hero() {
  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col z-10 bg-background">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full bg-accent/5 blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-20 flex flex-col lg:flex-row min-h-screen items-center justify-between gap-12 px-6 lg:px-12 py-12 lg:py-0">
        <div className="flex-1 lg:flex-0.45 pt-20 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 mb-8 px-3 py-1 rounded-full border border-accent/25 bg-accent/5 text-accent text-[11px] font-bold uppercase tracking-widest"
          >
            Independent digital studio
          </motion.div>

          <div className="relative -mt-4">
            {lines.map((line, i) => (
              <motion.h1
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="block text-[clamp(2rem,7vw,5rem)] md:text-[6rem] lg:text-[7rem] font-black leading-[0.9] tracking-tighter text-foreground"
              >
                {line}
              </motion.h1>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 md:mt-10 text-lg md:text-xl text-muted leading-relaxed max-w-lg"
          >
            Independent digital studio creating websites, immersive 3D
            environments and visual experiences for modern businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Button asChild variant="accent" size="lg" className="w-auto">
              <Link href="#contact">Let&apos;s talk</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-auto">
              <Link href="#work">Our work</Link>
            </Button>
          </motion.div>

          <ScrollIndicator />
        </div>

        <div className="flex-1 lg:flex-0.55 flex items-center justify-center relative">
          <MacBookHero className="w-full max-w-[620px]" height="min(90vh, 720px)" />
        </div>
      </div>
    </section>
  );
}
