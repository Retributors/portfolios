"use client";

import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  className?: string;
  ratio?: "square" | "portrait" | "landscape" | "wide";
  label?: string;
  src?: string;
  alt?: string;
}

export default function ImagePlaceholder({
  className,
  ratio = "square",
  label = "ADD PROJECT IMAGE",
  src,
  alt,
  ...props
}: ImagePlaceholderProps) {
  const ratios: Record<string, string> = {
    square: "aspect-[1/1]",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    wide: "aspect-[16/6]",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-secondary",
        ratios[ratio],
        className,
      )}
      {...props}
    >
      {src ? (
        <Image
          fill
          src={src}
          alt={alt || label}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-0.5 bg-accent" />
          <span className="text-xs md:text-sm font-semibold text-muted tracking-widest uppercase">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
