"use client";

import gsap from "gsap";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

export const MacbookIntroOverlay = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    if (done) return;

    // Responsive values based on screen width
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 768;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate safe scale to keep content within viewport
    let baseScale = isMobile ? 3 : isTablet ? 5 : 6;

    // For mobile, calculate scale to fit text width
    if (isMobile) {
      // Estimate: text "SquareCampus" at text-2xl is ~200px wide initially
      const estimatedTextWidth = 200;
      const maxSafeScale = (viewportWidth * 0.85) / estimatedTextWidth; // 85% of viewport for safety
      baseScale = Math.min(3, Math.max(2.2, maxSafeScale)); // Between 2.2x and 3x
    }

    // Additional height constraint for mobile vertical layout
    const minViewportHeight = isMobile ? 600 : isTablet ? 600 : 700;
    const heightScale =
      viewportHeight < minViewportHeight
        ? (viewportHeight / minViewportHeight) * baseScale
        : baseScale;
    const safeScale = Math.max(2, Math.min(baseScale, heightScale)); // Min 2x, max baseScale

    const logoMovement = isMobile ? 0 : isTablet ? -75 : -135; // No horizontal movement on mobile, more left on desktop
    const finalY = -viewportHeight * 0.25; // Shift up during zoom

    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { opacity: 1 });
      gsap.set(stackRef.current, { transformOrigin: "center center", scale: 1, y: 0 });
      gsap.set(logoRef.current, { x: 0 });
      gsap.set(textRef.current, { opacity: 0 });
      gsap.set(bgRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => setDone(true),
        delay: 0.2,
      });

      // Zoom MacBook (responsive scale with viewport constraints)
      tl.to(
        stackRef.current,
        { scale: safeScale, y: finalY, duration: 1.4, ease: "power3.inOut" },
        0
      );

      // Logo moves left (responsive movement)
      tl.to(logoRef.current, { x: logoMovement, duration: 1.0, ease: "power2.out" }, 0.2);

      // Text emerges from behind logo (fades in while logo moves)
      tl.to(textRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.4);

      // Dark background fades in
      tl.to(bgRef.current, { opacity: 1, duration: 0.8, ease: "power2.inOut" }, 0.5);

      // Fade out everything
      tl.to(containerRef.current, { autoAlpha: 0, duration: 0.5, ease: "power1.out" }, 1.1);
    }, containerRef);

    return () => ctx.revert();
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black"
      aria-hidden="true"
    >
      <div ref={stackRef} className="relative flex flex-col items-center gap-6">
        {/* Figma MacBook Mockup (empty screen) */}
        <div className="relative w-[400px] h-[250px] sm:w-[600px] sm:h-[375px] md:w-[800px] md:h-[500px]">
          <Image
            src="/images/marketing/splash.svg"
            alt="MacBook"
            fill
            sizes="(max-width: 640px) 400px, (max-width: 768px) 600px, 800px"
            className="object-contain"
            style={{ willChange: "transform" }}
            priority
          />

          {/* Dark background - fades in behind logo/text */}
          <div
            ref={bgRef}
            className="absolute inset-0 bg-black/90 rounded-xl"
            style={{ top: "-10%", bottom: "-10%", left: "-10%", right: "-10%" }}
          />

          {/* Logo + Text overlay on MacBook screen - positioned higher */}
          <div
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ top: "-5%" }}
          >
            <div className="relative">
              {/* Logo - starts centered, moves left */}
              <div
                ref={logoRef}
                className="translate-y-[5px] sm:translate-y-[8px] md:translate-y-[10px] relative h-12 w-12 sm:h-20 sm:w-20 md:h-25 md:w-25"
              >
                <Image
                  src="/images/marketing/logo-light.png"
                  alt="SquareCampus"
                  fill
                  sizes="(max-width: 640px) 48px, (max-width: 768px) 80px, 100px"
                  className="object-contain"
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                  priority
                />
              </div>

              {/* Text - below logo on mobile, to the right on larger screens */}
              <div
                ref={textRef}
                className="absolute
                top-[50px] left-1/2 -translate-x-1/2 text-center
                sm:top-1/2 sm:left-[4px] sm:-translate-x-0 sm:-translate-y-1/2 sm:translate-y-[-20px] sm:text-left
                md:left-[2px] md:translate-y-[-28px] md:translate-x-[-28px]
                space-y-0.5 sm:space-y-1"
              >
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight whitespace-nowrap">
                  SquareCampus
                </p>
                <p className="text-sm sm:text-base md:text-lg uppercase tracking-[0.28em] text-white/70 whitespace-nowrap">
                  Modern School OS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
