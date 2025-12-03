"use client"

import { cn } from "@/lib/utils";

type MaskedDotsProps = {
  className?: string;
};

export const MaskedDots = ({ className }: MaskedDotsProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full",
        // Subtle dotted field for dark surfaces
        "bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.14)_1px,transparent_0)]",
        "dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.18)_1px,transparent_0)]",
        "[mask-image:radial-gradient(circle_at_center,white_60%,transparent_78%)]",
        "bg-repeat",
        "[background-size:10px_10px]",
        className
      )}
    />
  );
};
