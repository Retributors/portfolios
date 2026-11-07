import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export default function Button({
  asChild,
  className,
  variant = "accent",
  size = "md",
  disabled,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md font-semibold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none";

  const variants: Record<string, string> = {
    accent:
      "bg-accent text-[#090A0A] shadow-[0_0_20px_rgba(198,255,77,0.35)]",
    outline: "border border-border bg-transparent text-foreground",
    ghost: "text-foreground hover:text-accent",
  };

  const sizes: Record<string, string> = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-8 text-base",
  };

  const merged = cn(
    base,
    variants[variant],
    sizes[size],
    className,
    variant === "outline" && "hover:bg-white/[0.06]",
    variant === "ghost" && "hover:text-accent",
    variant === "accent" && "hover:bg-accent hover:text-[#090A0A]",
  );

  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: cn(child.props.className, merged),
      ...(disabled ? { "aria-disabled": true } : {}),
    });
  }

  return (
    <button
      className={merged}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
