"use client";

import type React from "react";
import { useEffect, useRef } from "react";

type RippleCSSVars = React.CSSProperties & {
  "--ripple-x"?: string;
  "--ripple-y"?: string;
};

export const BackgroundRippleEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Gently follow the pointer to keep the gradient feeling alive without heavy DOM work
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let raf: number;
    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        node.style.setProperty("--ripple-x", `${x}%`);
        node.style.setProperty("--ripple-y", `${y}%`);
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={
        {
          "--ripple-x": "52%",
          "--ripple-y": "36%",
        } as RippleCSSVars
      }
    >
      {/* Soft color wash that tracks the pointer */}
      <div className="absolute inset-0 opacity-80 transition-[background-position] duration-700 will-change-transform bg-[radial-gradient(circle_at_var(--ripple-x)_var(--ripple-y),rgba(59,130,246,0.18),transparent_42%),radial-gradient(circle_at_82%_18%,rgba(147,51,234,0.14),transparent_38%),radial-gradient(circle_at_18%_78%,rgba(52,211,153,0.14),transparent_40%)]" />

      {/* Gentle glow to keep the center lifted */}
      <div className="absolute inset-0 opacity-65 mix-blend-screen bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.08),transparent_60%)]" />

      {/* Slow moving grid for a modern technical sheen */}
      <div className="grid-shimmer absolute inset-0 opacity-[0.14] mix-blend-screen bg-[linear-gradient(120deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(-120deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:220px_220px]" />

      {/* Dark fade at the edges to keep focus on the hero content */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(5,6,12,0),rgba(5,6,12,0.65)_70%,rgba(5,6,12,0.92)_100%)]" />

      {/* Minimal rings to hint motion without heavy layers */}
      <div className="ripple-ring absolute left-1/2 top-[40%] h-[520px] w-[520px] rounded-full border border-white/10" />
      <div className="ripple-ring-delayed absolute left-1/2 top-[40%] h-[460px] w-[460px] rounded-full bg-emerald-400/8 blur-3xl" />
    </div>
  );
};
