"use client";

import * as React from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { Camera, Mail, Send, Link as LinkIcon } from "lucide-react";

const links = [
  { label: "Instagram", href: "https://instagram.com/nexora.studio", icon: Camera, placeholder: "@nexora.studio" },
  { label: "Telegram", href: "https://t.me/nexora_studio", icon: Send, placeholder: "@nexora_studio" },
  { label: "Email", href: "mailto:hello@nexora.studio", icon: Mail, placeholder: "hello@nexora.studio" },
  { label: "Behance", href: "https://behance.net/nexora", icon: LinkIcon, placeholder: "nexora" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative w-full overflow-hidden bg-background z-10">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-8%] left-[-8%] w-[700px] h-[700px] rounded-full bg-accent/6 blur-[140px]" />
        <div className="absolute bottom-[-8%] right-[-8%] w-[600px] h-[600px] rounded-full bg-accent/4 blur-[130px]" />
      </div>

      <div className="container relative z-10 px-6 lg:px-12 py-20 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeader
            kicker="CONTACT"
            title="HAVE A PROJECT IN MIND?"
            description="Let's turn your idea into something remarkable."
            center
          />

          <div className="mt-12 md:mt-16 flex justify-center">
            <Button asChild variant="accent" size="lg">
              <Link href="mailto:hello@nexora.studio">
                Start a project
                <span className="ml-2">↗</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 md:mt-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-t border-border pt-12">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
              NEXORA®
            </span>
            <span className="text-[10px] font-medium text-muted tracking-widest opacity-60">
              Independent digital studio
            </span>
          </div>

          <div className="flex flex-wrap gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs md:text-sm font-medium text-muted transition-colors hover:text-accent"
              >
                <link.icon className="w-3.5 h-3.5" />
                <span>{link.placeholder}</span>
              </a>
            ))}
          </div>
        </div>

        <p className="mt-10 md:mt-12 text-[10px] text-muted text-center tracking-widest uppercase opacity-60">
          NEXORA® — All rights reserved.
        </p>
      </div>
    </section>
  );
}
