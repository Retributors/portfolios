"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const isActive = (href: string) => {
    if (href === "#contact") return pathname === "#contact" || pathname.endsWith("#contact");
    return pathname === href;
  };

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-40 border-y border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl w-full px-4">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-1.5"
            >
              <span className="text-[clamp(1.1rem,2vw,1.5rem)] font-bold tracking-tighter">NEXORA</span>
              <span className="text-[10px] font-medium text-muted tracking-widest opacity-60">®</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors",
                    isActive(item.href) ? "text-accent" : "text-muted hover:text-foreground",
                  )}
                  onClick={handleClick}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="#contact"
                className="px-4 py-1.5 rounded-md border border-accent text-accent text-xs font-bold uppercase tracking-widest transition-all hover:bg-accent hover:text-[#090A0A]"
                onClick={handleClick}
              >
                Let&apos;s talk
              </a>
            </div>
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setOpen((o) => !o)}
              aria-label="Open menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur"
          >
            <div className="flex flex-col h-full justify-between p-6 md:p-12">
              <div>
                <button
                  className="mb-8 md:mb-12 p-2 text-foreground"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "block text-3xl md:text-5xl font-bold tracking-tight",
                        isActive(item.href) ? "text-accent" : "text-foreground",
                      )}
                      onClick={handleClick}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="pt-8 md:pt-16">
                <a
                  href="#contact"
                  className="block bg-accent text-[#090A0A] px-6 py-3 rounded-md text-xl font-bold uppercase tracking-widest text-center"
                  onClick={handleClick}
                >
                  Let&apos;s talk
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
