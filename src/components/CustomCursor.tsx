"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface CursorState {
  x: number;
  y: number;
  visible: boolean;
  hovered: boolean;
}

export default function CustomCursor() {
  const [state, setState] = useState<CursorState>({ x: 0, y: 0, visible: false, hovered: false });

  const move = useCallback((e: MouseEvent) => {
    setState((s) => ({ ...s, x: e.clientX, y: e.clientY }));
  }, []);

  const enter = useCallback(() => setState((s) => ({ ...s, visible: true })), []);
  const leave = useCallback(() => setState((s) => ({ ...s, visible: false })), []);

  useEffect(() => {
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseenter", enter);
    window.addEventListener("mouseleave", leave);
    document.body.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseenter", enter);
      window.removeEventListener("mouseleave", leave);
      document.body.style.cursor = "";
    };
  }, [move, enter, leave]);

  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      animate={{
        x: state.x,
        y: state.y,
        scale: state.hovered ? 2.2 : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <motion.div
        className="relative w-4 h-4 rounded-full border border-accent/60 bg-accent/10 backdrop-blur-sm"
        animate={{ scale: state.hovered ? 1.8 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border border-white/20"
        style={{
          width: state.hovered ? 36 : 20,
          height: state.hovered ? 36 : 20,
          opacity: state.visible ? 1 : 0,
        }}
        animate={{
          width: state.hovered ? 36 : state.visible ? 20 : 0,
          height: state.hovered ? 36 : state.visible ? 20 : 0,
          opacity: state.visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </motion.div>
  );
}
