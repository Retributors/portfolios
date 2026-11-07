"use client";

import * as React from "react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function About() {
  return (
    <section id="about" className="section bg-secondary relative overflow-hidden z-10">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-[-8%] w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <SectionHeader
              kicker="ABOUT"
              title="SMALL STUDIO. BIG IDEAS."
              center={false}
            />
            <p className="text-lg md:text-xl text-muted leading-relaxed mb-6">
              NEXORA is an independent digital studio focused on creating modern
              websites, immersive 3D environments and thoughtful visual
              experiences.
            </p>
            <p className="text-lg md:text-xl text-muted leading-relaxed mb-10">
              We combine design, technology and AI-assisted workflows to
              transform ideas into digital products.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted uppercase tracking-widest">
                Independent
              </span>
              <span className="px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted uppercase tracking-widest">
                AI-assisted
              </span>
              <span className="px-4 py-1.5 rounded-full border border-accent text-accent text-xs font-semibold text-[#090A0A] uppercase tracking-widest">
                Boutique
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl border border-border bg-background overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-2xl border border-border bg-secondary flex items-center justify-center">
                  <span className="text-accent font-bold text-[clamp(1.5rem,8vw,3rem)] tracking-tighter">
                    NX
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
