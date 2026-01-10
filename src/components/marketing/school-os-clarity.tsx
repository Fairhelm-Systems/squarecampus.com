"use client";

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import {
  Building2,
  DollarSign,
  FileCheck,
  GraduationCap,
  Layers,
  Users,
  ArrowRight,
  Zap,
  Shield,
  Activity,
} from "@/components/icons";
import { FeatureVisual } from "./feature-visual";

gsap.registerPlugin(ScrollTrigger);

// === Data ===
const whoItsFor = [
  {
    title: "Principals",
    icon: GraduationCap,
    accent: "emerald",
    points: [
      "Live visibility across academics, attendance, and discipline.",
      "Fewer escalation loops with connected approvals.",
      "Board-ready summaries without manual compilation.",
    ],
  },
  {
    title: "Admin Office",
    icon: FileCheck,
    accent: "sky",
    points: [
      "Admissions, certificates, and compliance on one timeline.",
      "Clear handoffs between departments and campuses.",
      "Less chasing, more predictable daily execution.",
    ],
  },
  {
    title: "Finance Teams",
    icon: DollarSign,
    accent: "amber",
    points: [
      "Fee plans, collections, and reconciliations stay aligned.",
      "Audit trails and approvals are built into workflows.",
      "Fewer surprises during audits and year-end closes.",
    ],
  },
] as const;

const legacyPoints = [
  { text: "Separate modules stitched together with exports", icon: Layers },
  { text: "Data lives in silos; reconciliation is manual", icon: Activity },
  { text: "Reporting lags behind real-time operations", icon: FileCheck },
];

const osPoints = [
  { text: "One data model powering connected workflows", icon: Zap },
  { text: "Predictable operations with role-based controls", icon: Shield },
  { text: "Live outputs: audits, reports, and approvals in one view", icon: Activity },
];

// === Utilities ===
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

// === Floating Particles ===
function FloatingParticles({ count = 40 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;
    const particles = particlesRef.current.filter(Boolean);

    particles.forEach((particle, i) => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const size = Math.random() * 2 + 1;
      const duration = Math.random() * 25 + 20;
      const delay = Math.random() * -20;

      gsap.set(particle, {
        left: `${startX}%`,
        top: `${startY}%`,
        width: size,
        height: size,
        opacity: Math.random() * 0.4 + 0.1,
      });

      gsap.to(particle, {
        y: `random(-120, 120)`,
        x: `random(-60, 60)`,
        duration,
        delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(particle, {
        opacity: `random(0.1, 0.5)`,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    });

    return () => {
      particles.forEach((p) => gsap.killTweensOf(p));
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) particlesRef.current[i] = el;
          }}
          className="absolute rounded-full bg-white/70"
          style={{ filter: "blur(0.5px)" }}
        />
      ))}
    </div>
  );
}

// === Animated Grid Background with Ripple ===
function AnimatedGridWithRipple() {
  const gridRef = useRef<HTMLDivElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Grid movement
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          backgroundPosition: "60px 60px",
          duration: 20,
          repeat: -1,
          ease: "none",
        });
      }

      // Ripple circles animation
      const circles = rippleContainerRef.current?.querySelectorAll(".ripple-circle");
      if (circles) {
        circles.forEach((circle, i) => {
          const delay = i * 1.5;
          gsap.fromTo(
            circle,
            {
              scale: 0.3,
              opacity: 0,
            },
            {
              scale: 2.5,
              opacity: 0,
              duration: 12,
              delay,
              repeat: -1,
              ease: "power1.out",
              keyframes: [
                { scale: 0.3, opacity: 0 },
                { scale: 0.8, opacity: 0.25, duration: 2 },
                { scale: 1.5, opacity: 0.1, duration: 4 },
                { scale: 2.5, opacity: 0, duration: 6 },
              ],
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grid */}
      <div
        ref={gridRef}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ripple circles emanating from center */}
      <div
        ref={rippleContainerRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="ripple-circle absolute rounded-full border border-white/[0.06]"
            style={{
              width: 300 + i * 150,
              height: 300 + i * 150,
            }}
          />
        ))}

        {/* Central glow */}
        <div className="absolute h-48 w-48 rounded-full bg-gradient-radial from-emerald-500/10 via-sky-500/5 to-transparent blur-2xl" />
      </div>

      {/* Radial mask to fade edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(10,10,10,0.8) 70%, rgb(10,10,10) 100%)",
        }}
      />
    </div>
  );
}

// === Animated Border SVG ===
function AnimatedBorder({ isVisible, color = "emerald" }: { isVisible: boolean; color?: string }) {
  const pathRef = useRef<SVGRectElement>(null);
  const glowRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const length = 2000;

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    if (isVisible) {
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.inOut",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.6,
          duration: 1,
          delay: 1,
          ease: "power2.out",
        });
      }
    }
  }, [isVisible]);

  const gradientId = `gradient-border-${color}`;
  const colors = {
    emerald: { start: "#10b981", mid: "#34d399", end: "#10b981" },
    sky: { start: "#0ea5e9", mid: "#38bdf8", end: "#0ea5e9" },
  };
  const c = colors[color as keyof typeof colors] || colors.emerald;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ borderRadius: "1.5rem" }}
    >
      <rect
        ref={glowRef}
        x="0"
        y="0"
        width="100%"
        height="100%"
        rx="24"
        ry="24"
        fill="none"
        stroke={c.start}
        strokeWidth="4"
        opacity="0"
        style={{ filter: "blur(8px)" }}
      />
      <rect
        ref={pathRef}
        x="1"
        y="1"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        rx="24"
        ry="24"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
      />
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.start} stopOpacity="0.9" />
          <stop offset="50%" stopColor={c.mid} stopOpacity="0.5" />
          <stop offset="100%" stopColor={c.end} stopOpacity="0.9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// === Persona Card ===
function PersonaCard({
  item,
  index,
  cardRef,
}: {
  item: (typeof whoItsFor)[number];
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const Icon = item.icon;
  const [isHovered, setIsHovered] = useState(false);

  const accentMap = {
    emerald: {
      border: "border-emerald-500/20 hover:border-emerald-500/40",
      bg: "bg-emerald-500/5",
      iconBg: "bg-emerald-500/10 border-emerald-500/30",
      iconColor: "text-emerald-400",
      bullet: "bg-emerald-400",
      glow: "from-emerald-500/20",
    },
    sky: {
      border: "border-sky-500/20 hover:border-sky-500/40",
      bg: "bg-sky-500/5",
      iconBg: "bg-sky-500/10 border-sky-500/30",
      iconColor: "text-sky-400",
      bullet: "bg-sky-400",
      glow: "from-sky-500/20",
    },
    amber: {
      border: "border-amber-500/20 hover:border-amber-500/40",
      bg: "bg-amber-500/5",
      iconBg: "bg-amber-500/10 border-amber-500/30",
      iconColor: "text-amber-400",
      bullet: "bg-amber-400",
      glow: "from-amber-500/20",
    },
  };

  const accent = accentMap[item.accent];

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative cursor-default rounded-2xl border p-6 transition-all duration-500",
        accent.border,
        accent.bg,
        "hover:shadow-2xl hover:shadow-black/20"
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Hover glow effect */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500",
          accent.glow,
          isHovered && "opacity-100"
        )}
      />

      <div className="relative">
        <div className="flex items-center gap-3">
          <div className={cn("rounded-xl border p-3", accent.iconBg)}>
            <Icon className={cn("h-5 w-5", accent.iconColor)} />
          </div>
          <p className="text-base font-semibold text-white">{item.title}</p>
        </div>

        <ul className="mt-5 space-y-3">
          {item.points.map((point, pointIdx) => (
            <li
              key={point}
              data-bullet
              className="flex items-start gap-3 text-sm text-neutral-300"
            >
              <span
                className={cn(
                  "mt-2 h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-300",
                  accent.bullet,
                  isHovered && "scale-125"
                )}
              />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// === Main Component ===
export function SchoolOsClarity() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const compareRef = useRef<HTMLDivElement | null>(null);
  const legacyCardRef = useRef<HTMLDivElement | null>(null);
  const osCardRef = useRef<HTMLDivElement | null>(null);
  const dashboardRef = useRef<HTMLDivElement | null>(null);
  const personasWrapRef = useRef<HTMLDivElement | null>(null);

  const glowRefs = useRef<HTMLDivElement[]>([]);
  const personaRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [osCardVisible, setOsCardVisible] = useState(false);

  const reduced = useMemo(() => prefersReducedMotion(), []);
  const mousePos = useRef({ x: 0, y: 0 });

  // Mouse tracking for parallax
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mousePos.current = {
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, reduced]);

  // Main animation orchestration
  useLayoutEffect(() => {
    if (reduced) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // === AMBIENT GLOW PARALLAX ===
      const glows = glowRefs.current.filter(Boolean);
      if (glows.length) {
        gsap.to(glows[0], {
          scale: 1.4,
          opacity: 0.2,
          duration: 10,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.to(glows[1], {
          scale: 1.3,
          opacity: 0.15,
          duration: 12,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2,
        });

        gsap.to(glows[2], {
          scale: 1.2,
          opacity: 0.1,
          duration: 8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1,
        });

        // Mouse parallax on glows
        gsap.ticker.add(() => {
          glows.forEach((glow, i) => {
            const multiplier = (i + 1) * 40;
            gsap.to(glow, {
              x: mousePos.current.x * multiplier * (i % 2 === 0 ? 1 : -1),
              y: mousePos.current.y * multiplier,
              duration: 1.5 + i * 0.3,
              ease: "power2.out",
            });
          });
        });
      }

      // === HEADER ANIMATIONS ===
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll("[data-word]");
        gsap.set(words, {
          opacity: 0,
          y: 50,
          rotateX: -20,
          transformPerspective: 1000,
        });

        gsap.to(words, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 24, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // === COMPARISON CARDS ===
      if (compareRef.current && legacyCardRef.current && osCardRef.current) {
        gsap.set([legacyCardRef.current, osCardRef.current], {
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
        });

        const compareTl = gsap.timeline({
          scrollTrigger: {
            trigger: compareRef.current,
            start: "top 75%",
            once: true,
            onEnter: () => setOsCardVisible(true),
          },
        });

        compareTl
          .fromTo(
            legacyCardRef.current,
            {
              x: -80,
              opacity: 0,
              rotateY: -15,
              scale: 0.95,
            },
            {
              x: 0,
              opacity: 1,
              rotateY: 0,
              scale: 1,
              duration: 1,
              ease: "expo.out",
            }
          )
          .fromTo(
            osCardRef.current,
            {
              x: 80,
              opacity: 0,
              rotateY: 15,
              scale: 0.95,
            },
            {
              x: 0,
              opacity: 1,
              rotateY: 0,
              scale: 1,
              duration: 1,
              ease: "expo.out",
            },
            "-=0.7"
          );

        // Animate bullet points
        const legacyBullets = legacyCardRef.current.querySelectorAll("[data-bullet]");
        const osBullets = osCardRef.current.querySelectorAll("[data-bullet]");

        gsap.set([...legacyBullets, ...osBullets], { opacity: 0, x: -15 });

        compareTl.to(
          legacyBullets,
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.5"
        );

        compareTl.to(
          osBullets,
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      // === DASHBOARD SHOWCASE ===
      if (dashboardRef.current) {
        gsap.fromTo(
          dashboardRef.current,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: dashboardRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );

        // Subtle floating animation
        gsap.to(dashboardRef.current, {
          y: -8,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1,
        });
      }

      // === PERSONA CARDS ===
      if (personasWrapRef.current) {
        const cards = personaRefs.current.filter(Boolean) as HTMLDivElement[];

        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 60,
            rotateX: -10,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: personasWrapRef.current,
              start: "top 80%",
              once: true,
            },
            onComplete: () => {
              cards.forEach((card) => {
                const bullets = card.querySelectorAll("[data-bullet]");
                gsap.fromTo(
                  bullets,
                  { opacity: 0, x: -10 },
                  {
                    opacity: 1,
                    x: 0,
                    duration: 0.3,
                    stagger: 0.08,
                    ease: "power2.out",
                  }
                );
              });
            },
          }
        );

        // Magnetic hover effect (desktop only)
        const mm = gsap.matchMedia();
        mm.add("(hover: hover) and (pointer: fine)", () => {
          cards.forEach((card) => {
            const xTo = gsap.quickTo(card, "x", { duration: 0.4, ease: "power3.out" });
            const yTo = gsap.quickTo(card, "y", { duration: 0.4, ease: "power3.out" });
            const rotYTo = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power3.out" });
            const rotXTo = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power3.out" });

            const onMove = (e: PointerEvent) => {
              const rect = card.getBoundingClientRect();
              const px = (e.clientX - rect.left) / rect.width - 0.5;
              const py = (e.clientY - rect.top) / rect.height - 0.5;

              xTo(px * 12);
              yTo(py * 12);
              rotYTo(px * 10);
              rotXTo(-py * 10);
            };

            const onLeave = () => {
              xTo(0);
              yTo(0);
              rotYTo(0);
              rotXTo(0);
            };

            card.addEventListener("pointermove", onMove);
            card.addEventListener("pointerleave", onLeave);
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const titleWords = "A School OS is not just a school management system".split(" ");

  return (
    <section
      ref={sectionRef}
      data-section="school-os-clarity"
      className="relative overflow-hidden bg-neutral-950 px-4 py-20 md:px-8 md:py-32"
    >
      {/* Background effects */}
      {!reduced && <FloatingParticles count={50} />}
      <AnimatedGridWithRipple />

      {/* Animated glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          ref={(el) => {
            if (el) glowRefs.current[0] = el;
          }}
          className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[180px]"
        />
        <div
          ref={(el) => {
            if (el) glowRefs.current[1] = el;
          }}
          className="absolute -right-32 top-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[180px]"
        />
        <div
          ref={(el) => {
            if (el) glowRefs.current[2] = el;
          }}
          className="absolute bottom-1/4 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-purple-500/5 blur-[150px]"
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 md:gap-24">
        {/* Header */}
        <div ref={headingRef} className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-400/80">
            What is a School OS?
          </p>

          <h2
            ref={titleRef}
            className="mt-4 text-3xl font-semibold text-white sm:text-4xl md:text-5xl"
            style={{ perspective: "1000px" }}
          >
            {titleWords.map((word, i) => (
              <span key={i} data-word className="mr-[0.25em] inline-block last:mr-0">
                {word}
              </span>
            ))}
          </h2>

          <p
            ref={subtitleRef}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg"
          >
            A school management system digitizes tasks. A School OS connects workflows so every team
            runs from the same source of truth, with auditable operations across campuses.
          </p>
        </div>

        {/* Comparison cards */}
        <div ref={compareRef} className="grid gap-6 lg:grid-cols-2">
          {/* Legacy card */}
          <div
            ref={legacyCardRef}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/90 to-neutral-950 p-8 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Layers className="h-6 w-6 text-neutral-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                    Typical approach
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">School Management System</p>
                </div>
              </div>

              <ul className="mt-6 space-y-4">
                {legacyPoints.map((point, i) => (
                  <li key={i} data-bullet className="flex items-start gap-4">
                    <div className="rounded-lg border border-white/5 bg-white/5 p-2">
                      <point.icon className="h-4 w-4 text-neutral-500" />
                    </div>
                    <span className="pt-1 text-sm leading-relaxed text-neutral-400">
                      {point.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* OS card */}
          <div
            ref={osCardRef}
            className="group relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-neutral-900 to-neutral-950 p-8 shadow-2xl shadow-emerald-500/5 backdrop-blur-sm"
          >
            <AnimatedBorder isVisible={osCardVisible} color="emerald" />

            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4">
                  <Building2 className="h-6 w-6 text-emerald-300" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
                    SquareCampus
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">School OS</p>
                </div>
              </div>

              <ul className="mt-6 space-y-4">
                {osPoints.map((point, i) => (
                  <li key={i} data-bullet className="flex items-start gap-4">
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-2">
                      <point.icon className="h-4 w-4 text-emerald-400" />
                    </div>
                    <span className="pt-1 text-sm leading-relaxed text-neutral-200">
                      {point.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Live Dashboard Showcase - hidden on mobile due to flickering */}
        <div ref={dashboardRef} className="relative hidden md:block">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10">
                <Activity className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                  Live preview
                </p>
                <p className="text-sm font-medium text-white">This is what your OS looks like</p>
              </div>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs text-emerald-400">Real-time data simulation</span>
            </div>
          </div>

          {/* Dashboard container with monitor frame */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 shadow-2xl shadow-black/50">
            {/* Browser-like header */}
            <div className="flex items-center gap-2 border-b border-white/5 bg-neutral-900/80 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
              </div>
              <div className="ml-4 flex-1 rounded-md bg-white/5 px-3 py-1">
                <span className="text-[0.65rem] text-neutral-500">app.squarecampus.com/dashboard</span>
              </div>
            </div>

            {/* Dashboard visual */}
            <div className="aspect-[16/9] w-full md:aspect-[2/1]">
              <FeatureVisual />
            </div>
          </div>

          {/* Decorative elements */}
          <div className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        {/* Who it's for */}
        <div ref={personasWrapRef}>
          <div className="mb-8 flex items-center justify-center gap-3">
            <Users className="h-5 w-5 text-neutral-500" />
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-500">
              Built for every stakeholder
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {whoItsFor.map((item, idx) => (
              <PersonaCard
                key={item.title}
                item={item}
                index={idx}
                cardRef={(el) => {
                  personaRefs.current[idx] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
