"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function MagneticButton({
  children,
  className,
  intensity = 0.4,
  disabled,
  onClick,
}: MagneticButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const rect = ref.current!.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    setX(mouseX * intensity);
    setY(mouseY * intensity);
  };

  const handleMouseLeave = () => {
    setX(0);
    setY(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick?.(e);
  };

  return (
    <motion.button
      ref={ref}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50",
        disabled ? "opacity-50 pointer-events-none" : "group",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
