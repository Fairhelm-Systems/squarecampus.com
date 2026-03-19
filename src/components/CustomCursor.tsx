"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  const textRingRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isDark, setIsDark] = useState(false);
  const { prefersReducedMotion } = useDeviceCapabilities();

  // Detect dark mode
  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Check if it's a touch device
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorTrail = cursorTrailRef.current;
    const textRing = textRingRef.current;
    if (!cursor || !cursorDot || !cursorTrail) return;

    // Outer ring - slower, more laggy
    const quickX = gsap.quickTo(cursor, "x", {
      duration: 0.6,
      ease: "power3.out",
    });
    const quickY = gsap.quickTo(cursor, "y", {
      duration: 0.6,
      ease: "power3.out",
    });

    // Inner dot - fast, responsive
    const dotQuickX = gsap.quickTo(cursorDot, "x", {
      duration: 0.15,
      ease: "power2.out",
    });
    const dotQuickY = gsap.quickTo(cursorDot, "y", {
      duration: 0.15,
      ease: "power2.out",
    });

    // Trail - slowest
    const trailQuickX = gsap.quickTo(cursorTrail, "x", {
      duration: 0.8,
      ease: "power2.out",
    });
    const trailQuickY = gsap.quickTo(cursorTrail, "y", {
      duration: 0.8,
      ease: "power2.out",
    });

    // Text ring follows cursor
    let textQuickX: gsap.QuickToFunc | null = null;
    let textQuickY: gsap.QuickToFunc | null = null;
    if (textRing) {
      textQuickX = gsap.quickTo(textRing, "x", {
        duration: 0.5,
        ease: "power3.out",
      });
      textQuickY = gsap.quickTo(textRing, "y", {
        duration: 0.5,
        ease: "power3.out",
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      quickX(e.clientX);
      quickY(e.clientY);
      dotQuickX(e.clientX);
      dotQuickY(e.clientY);
      trailQuickX(e.clientX);
      trailQuickY(e.clientY);
      textQuickX?.(e.clientX);
      textQuickY?.(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect hoverable elements with different text
    const handleElementMouseEnter = (e: Event) => {
      setIsHovering(true);
      const target = e.currentTarget as HTMLElement;
      const cursorText = target.dataset.cursorText;

      if (cursorText) {
        setHoverText(cursorText);
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        const inputType = (target as HTMLInputElement).type;
        if (inputType === "email") {
          setHoverText("EMAIL • TYPE • ");
        } else if (inputType === "password") {
          setHoverText("SECURE • TYPE • ");
        } else if (inputType === "search") {
          setHoverText("SEARCH • FIND • ");
        } else {
          setHoverText("FOCUS • TYPE • ");
        }
      } else if (target.tagName === "SELECT") {
        setHoverText("SELECT • CHOOSE • ");
      } else if (
        target.tagName === "IMG" ||
        target.closest("picture") ||
        target.dataset.cursorImage
      ) {
        setHoverText("VIEW • EXPLORE • ");
      } else if (
        target.closest("[data-cursor-card]") ||
        target.classList.contains("card") ||
        target.closest(".card")
      ) {
        setHoverText("DISCOVER • MORE • ");
      } else if (target.tagName === "A" || target.closest("a")) {
        const href = (target as HTMLAnchorElement).href || target.closest("a")?.href || "";
        const isExternal =
          href &&
          !href.includes(window.location.hostname) &&
          (href.startsWith("http") || href.startsWith("mailto:"));
        if (href.startsWith("mailto:")) {
          setHoverText("SEND • EMAIL • ");
        } else if (isExternal) {
          setHoverText("VISIT • OPEN • ");
        } else {
          setHoverText("CLICK • EXPLORE • ");
        }
      } else if (
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.getAttribute("role") === "button"
      ) {
        const buttonText = target.textContent?.toLowerCase() || "";
        if (buttonText.includes("submit") || buttonText.includes("send")) {
          setHoverText("SEND • GO • ");
        } else if (buttonText.includes("download")) {
          setHoverText("DOWNLOAD • GET • ");
        } else if (buttonText.includes("copy")) {
          setHoverText("COPY • GRAB • ");
        } else if (buttonText.includes("play")) {
          setHoverText("PLAY • WATCH • ");
        } else {
          setHoverText("CLICK • ACTION • ");
        }
      } else if (target.tagName === "VIDEO" || target.tagName === "AUDIO") {
        setHoverText("PLAY • MEDIA • ");
      } else {
        setHoverText("INTERACT • ");
      }
    };
    const handleElementMouseLeave = () => {
      setIsHovering(false);
      setHoverText("");
    };

    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", handleElementMouseEnter);
        el.addEventListener("mouseleave", handleElementMouseLeave);
      });
      return hoverables;
    };

    // Initial setup
    let hoverables = addHoverListeners();

    // Re-add listeners when DOM changes (for SPAs)
    const observer = new MutationObserver(() => {
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementMouseEnter);
        el.removeEventListener("mouseleave", handleElementMouseLeave);
      });
      hoverables = addHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementMouseEnter);
        el.removeEventListener("mouseleave", handleElementMouseLeave);
      });
    };
  }, [prefersReducedMotion, isVisible]);

  // Animate cursor on hover/click state change
  useEffect(() => {
    if (prefersReducedMotion) return;
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const textRing = textRingRef.current;
    if (!cursor || !cursorDot) return;

    if (isClicking) {
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.15,
        ease: "power2.out",
      });
      gsap.to(cursorDot, {
        scale: 0.5,
        duration: 0.15,
        ease: "power2.out",
      });
      if (textRing) {
        gsap.to(textRing, {
          scale: 0.9,
          duration: 0.15,
          ease: "power2.out",
        });
      }
    } else if (isHovering) {
      // Hide outer ring when hovering
      gsap.to(cursor, {
        scale: 0.5,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      // Keep the dot visible but slightly larger
      gsap.to(cursorDot, {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out",
      });
      // Show rotating text
      if (textRing && hoverText) {
        gsap.to(textRing, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    } else {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        borderWidth: 1.5,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      if (textRing) {
        gsap.to(textRing, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  }, [isHovering, isClicking, hoverText, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  // Generate circular text path - increased radius by 40%
  const radius = 53;
  const svgSize = radius * 2 + 24;
  const center = svgSize / 2;

  // Text color based on theme - dark text in light mode, light text in dark mode
  const textColor = isDark ? "rgba(255, 255, 255, 0.85)" : "rgba(29, 29, 27, 0.85)";

  return (
    <>
      {/* Outer glow trail */}
      <div
        ref={cursorTrailRef}
        className="pointer-events-none fixed left-0 top-0 z-9998 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{
          opacity: isVisible ? 0.5 : 0,
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, transparent 70%)",
          transition: "opacity 0.4s ease",
        }}
        aria-hidden="true"
      />

      {/* Rotating text ring with subtle text-following blur */}
      <div
        ref={textRingRef}
        className="pointer-events-none fixed left-0 top-0 z-9999 hidden md:block"
        style={{
          width: svgSize,
          height: svgSize,
          marginLeft: -center,
          marginTop: -center,
          opacity: 0,
        }}
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0"
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          aria-hidden="true"
          role="presentation"
        >
          <defs>
            <path
              id="textCircle"
              d={`M ${center}, ${center} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
              fill="none"
            />
          </defs>
          <g>
            {/* Background stroke for contrast - no filters, pure performance */}
            <text
              fill="none"
              stroke={isDark ? "rgba(0, 0, 0, 0.85)" : "rgba(255, 255, 255, 0.95)"}
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
              fontSize="11"
              fontWeight="600"
              letterSpacing="0.15em"
              style={{
                fontFamily: "var(--font-manrope), system-ui, sans-serif",
                textTransform: "uppercase",
              }}
            >
              <textPath href="#textCircle" startOffset="0%">
                {hoverText}
                {hoverText}
                {hoverText}
              </textPath>
            </text>
            {/* Main text on top */}
            <text
              fill={textColor}
              fontSize="11"
              fontWeight="600"
              letterSpacing="0.15em"
              style={{
                fontFamily: "var(--font-manrope), system-ui, sans-serif",
                textTransform: "uppercase",
              }}
            >
              <textPath href="#textCircle" startOffset="0%">
                {hoverText}
                {hoverText}
                {hoverText}
              </textPath>
            </text>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${center} ${center}`}
              to={`360 ${center} ${center}`}
              dur="12s"
              repeatCount="indefinite"
            />
          </g>
        </svg>
      </div>

      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-9999 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{
          opacity: isVisible ? 1 : 0,
          border: "1.5px solid #3b82f6",
          transition: "opacity 0.3s ease",
        }}
        aria-hidden="true"
      />

      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed left-0 top-0 z-9999 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{
          opacity: isVisible ? 1 : 0,
          backgroundColor: "#3b82f6",
          transition: "opacity 0.3s ease",
        }}
        aria-hidden="true"
      />

      {/* Hide default cursor */}
      <style jsx global>{`
        @media (pointer: fine) and (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
