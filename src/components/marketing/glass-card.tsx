"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

/*
   In the dimly lit corridors of UI design, there exists a card so subtle,
   so elegantly constructed, it slips past the user’s eyes like a whisper,
   leaving only the sense that something premium just happened.
   This card is that specialist. Smooth, silent, reliable.
*/
export function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-white/10 bg-neutral-900/40 backdrop-blur-md",
        "shadow-[0px_0px_30px_-5px_rgba(255,255,255,0.1)] transition-all",
        "hover:border-white/20 hover:shadow-[0px_0px_45px_-5px_rgba(255,255,255,0.15)]",
        "duration-300 ease-out",
        className
      )}
    >
      {/* The inner sanctum,where the operation truly takes place */}
      <div className="p-6">{children}</div>
    </div>
  );
}
