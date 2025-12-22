// components/marketing/floating-home-button.tsx
"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight } from "@/components/icons";
import { cn } from "@/lib/utils";

type BaseProps = {
  label?: string;
  className?: string;
};

type HomeVariantProps = BaseProps & {
  variant?: "home"; // default
  href: string;
};

type TopVariantProps = BaseProps & {
  variant: "top";
  href?: undefined;
};

type FloatingHomeButtonProps = HomeVariantProps | TopVariantProps;

/*
   Somewhere near the edge of the viewport, a quiet exit door glows.
   In one life, it leads back to home base. In another, it pulls you
   right back to the top of the operation. Same button, two identities.
*/
export function FloatingHomeButton(props: FloatingHomeButtonProps) {
  const { label, className } = props;
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isTopVariant = props.variant === "top";
  const href = !isTopVariant ? props.href : undefined;

  useEffect(() => {
    const updateVisibility = () => {
      if (typeof window === "undefined") return;

      const doc = document.documentElement;
      const scrollHeight = doc.scrollHeight;
      const viewportHeight = window.innerHeight;

      const noScrollNeeded = scrollHeight <= viewportHeight + 4;
      const scrolledEnough = window.scrollY > 120;

      // Short pages: show immediately.
      // Long pages: show after scrolling a bit.
      setVisible(noScrollNeeded || scrolledEnough);
    };

    updateVisibility();

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  const handleTopClick = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const finalLabel = label ?? (isTopVariant ? "Back to top" : "Back to home");

  useEffect(() => {
    if (!visible || !containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
    );
  }, [visible]);

  return (
    <>
      {visible && (
        <div
          ref={containerRef}
          className="pointer-events-none fixed bottom-6 right-4 z-50 sm:bottom-8 sm:right-6"
        >
          {isTopVariant ? (
            // Variant: "top" – no href, just a button that scrolls upward.
            <button
              type="button"
              onClick={handleTopClick}
              className={cn(
                "pointer-events-auto inline-flex items-center gap-2 rounded-full border border-neutral-700/80",
                "bg-neutral-900/95 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-neutral-100",
                "shadow-[0_18px_60px_rgba(0,0,0,0.75)] backdrop-blur-md",
                "transition hover:border-neutral-300 hover:text-white",
                className
              )}
            >
              <span>{finalLabel}</span>
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ) : (
            // Variant: "home" – standard Link back to some route.
            <Link
              href={href!}
              className={cn(
                "pointer-events-auto inline-flex items-center gap-2 rounded-full border border-neutral-700/80",
                "bg-neutral-900/95 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-neutral-100",
                "shadow-[0_18px_60px_rgba(0,0,0,0.75)] backdrop-blur-md",
                "transition hover:border-neutral-300 hover:text-white",
                className
              )}
            >
              <span>{finalLabel}</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          )}
        </div>
      )}
    </>
  );
}
