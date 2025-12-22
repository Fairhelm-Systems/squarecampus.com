"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

/**
 * Neon scroll tracer that hugs the top edge of the viewport.
 *  - Responds to scroll progress in real time
 *  - Auto-hides shortly after scrolling stops
 *  - Pointer-events disabled so it never blocks clicks
 */
export function ScrollBeam() {
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);
  const beamRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (beamRef.current) {
        gsap.to(beamRef.current, { scaleX: progress, duration: 0.2, ease: "power2.out" });
      }

      setVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setVisible(false), 900);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-2">
      <div
        ref={beamRef}
        className="absolute inset-0 h-[4px] origin-left rounded-full"
        style={{
          opacity: visible ? 1 : 0,
          background:
            "linear-gradient(90deg, rgba(56,189,248,0.1) 0%, rgba(56,189,248,0.9) 55%, rgba(14,165,233,0.95) 100%)",
          boxShadow: "0 0 25px rgba(56,189,248,0.6), 0 0 60px rgba(14,165,233,0.35)",
          filter: "drop-shadow(0 0 12px rgba(56,189,248,0.4))",
          transition: "opacity 0.25s ease-out",
        }}
      />
      <div className="absolute inset-0 h-full bg-gradient-to-b from-sky-400/15 to-transparent blur-md" />
    </div>
  );
}
