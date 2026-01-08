"use client";

import React, { JSX, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Building2, DollarSign, FileCheck, GraduationCap, Layers, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const whoItsFor = [
  {
    title: "Principals",
    icon: GraduationCap,
    points: [
      "Live visibility across academics, attendance, and discipline.",
      "Fewer escalation loops with connected approvals.",
      "Board-ready summaries without manual compilation.",
    ],
  },
  {
    title: "Admin Office",
    icon: FileCheck,
    points: [
      "Admissions, certificates, and compliance on one timeline.",
      "Clear handoffs between departments and campuses.",
      "Less chasing, more predictable daily execution.",
    ],
  },
  {
    title: "Finance Teams",
    icon: DollarSign,
    points: [
      "Fee plans, collections, and reconciliations stay aligned.",
      "Audit trails and approvals are built into workflows.",
      "Fewer surprises during audits and year-end closes.",
    ],
  },
] as const;

// === Utility functions ===
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function isTouchLikePointer(e: React.PointerEvent) {
  return e.pointerType === "touch" || e.pointerType === "pen";
}

// === Floating Particles Component ===
function FloatingParticles({ count = 30 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const particles = particlesRef.current.filter(Boolean);

    particles.forEach((particle, i) => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const size = Math.random() * 3 + 1;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * -20;

      gsap.set(particle, {
        left: `${startX}%`,
        top: `${startY}%`,
        width: size,
        height: size,
        opacity: Math.random() * 0.5 + 0.1,
      });

      // Floating animation
      gsap.to(particle, {
        y: `random(-100, 100)`,
        x: `random(-50, 50)`,
        duration,
        delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Twinkling
      gsap.to(particle, {
        opacity: `random(0.1, 0.6)`,
        duration: Math.random() * 2 + 1,
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
          className="absolute rounded-full bg-white/80"
          style={{ filter: "blur(0.5px)" }}
        />
      ))}
    </div>
  );
}

// === Animated SVG Border ===
function AnimatedBorder({ isVisible }: { isVisible: boolean }) {
  const pathRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const length = (path.width.baseVal.value + path.height.baseVal.value) * 2;

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    if (isVisible) {
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
      });
    }
  }, [isVisible]);

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ borderRadius: "1.5rem" }}>
      <rect
        ref={pathRef}
        x="1"
        y="1"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        rx="24"
        ry="24"
        fill="none"
        stroke="url(#gradient-border)"
        strokeWidth="2"
      />
      <defs>
        <linearGradient id="gradient-border" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#34d399" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// === Split Text Component for Character Animation ===
function SplitText({
  children,
  className,
  as: Component = "span",
}: {
  children: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const chars = children.split("");

  return (
    // @ts-ignore - dynamic component
    <Component ref={containerRef} className={className}>
      {chars.map((char, i) => (
        <span
          key={i}
          data-char
          className="inline-block"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Component>
  );
}

// === Main Component ===
export function SchoolOsClarity() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const compareRef = useRef<HTMLDivElement | null>(null);
  const legacyCardRef = useRef<HTMLDivElement | null>(null);
  const osCardRef = useRef<HTMLDivElement | null>(null);
  const resilienceRef = useRef<HTMLDivElement | null>(null);
  const personasWrapRef = useRef<HTMLDivElement | null>(null);

  const glowLeftRef = useRef<HTMLDivElement | null>(null);
  const glowRightRef = useRef<HTMLDivElement | null>(null);
  const glowCenterRef = useRef<HTMLDivElement | null>(null);

  const personaRefs = useRef<Array<HTMLDivElement | null>>([]);
  const bulletRefs = useRef<Array<HTMLLIElement | null>>([]);

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
      const section = sectionRef.current!;

      // === AMBIENT GLOW PARALLAX (responds to mouse) ===
      const glows = [glowLeftRef.current, glowRightRef.current, glowCenterRef.current].filter(Boolean);
      if (glows.length) {
        gsap.set(glows, { willChange: "transform" });

        // Continuous breathing
        gsap.to(glowLeftRef.current, {
          scale: 1.3,
          opacity: 0.15,
          duration: 8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.to(glowRightRef.current, {
          scale: 1.25,
          opacity: 0.12,
          duration: 9,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1,
        });

        gsap.to(glowCenterRef.current, {
          scale: 1.2,
          opacity: 0.08,
          duration: 7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 0.5,
        });

        // Mouse parallax on glows
        gsap.ticker.add(() => {
          if (glowLeftRef.current) {
            gsap.to(glowLeftRef.current, {
              x: mousePos.current.x * -80,
              y: mousePos.current.y * -60,
              duration: 1.5,
              ease: "power2.out",
            });
          }
          if (glowRightRef.current) {
            gsap.to(glowRightRef.current, {
              x: mousePos.current.x * 60,
              y: mousePos.current.y * 80,
              duration: 1.8,
              ease: "power2.out",
            });
          }
          if (glowCenterRef.current) {
            gsap.to(glowCenterRef.current, {
              x: mousePos.current.x * 40,
              y: mousePos.current.y * 40,
              duration: 2,
              ease: "power2.out",
            });
          }
        });
      }

      // === TAGLINE: Staggered letter reveal ===
      if (taglineRef.current) {
        const chars = taglineRef.current.querySelectorAll("[data-char]");
        gsap.set(chars, { opacity: 0, y: 20, rotateX: -90 });

        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: taglineRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // === TITLE: Word-by-word dramatic reveal ===
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll("[data-word]");
        gsap.set(words, {
          opacity: 0,
          y: 60,
          rotateX: -15,
          transformPerspective: 1000,
        });

        gsap.to(words, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      // === SUBTITLE: Slide up with blur ===
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // === COMPARE CARDS: 3D flip entrance ===
      if (compareRef.current && legacyCardRef.current && osCardRef.current) {
        gsap.set([legacyCardRef.current, osCardRef.current], {
          willChange: "transform, opacity",
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: compareRef.current,
            start: "top 75%",
            once: true,
            onEnter: () => setOsCardVisible(true),
          },
        });

        // Legacy card: slide in from left with rotation
        tl.fromTo(
          legacyCardRef.current,
          {
            x: -100,
            opacity: 0,
            rotateY: -25,
            rotateX: 10,
            scale: 0.9,
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.2,
            ease: "expo.out",
          }
        );

        // OS card: dramatic entrance from right
        tl.fromTo(
          osCardRef.current,
          {
            x: 100,
            opacity: 0,
            rotateY: 25,
            rotateX: -10,
            scale: 0.9,
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.2,
            ease: "expo.out",
          },
          "-=0.8"
        );

        // Pulsing glow on OS card
        tl.to(
          osCardRef.current,
          {
            boxShadow: "0 0 60px rgba(16,185,129,0.3), 0 0 120px rgba(16,185,129,0.1)",
            duration: 1.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          },
          "-=0.5"
        );

        // Bullet points stagger reveal
        const legacyBullets = legacyCardRef.current.querySelectorAll("li");
        const osBullets = osCardRef.current.querySelectorAll("li");

        gsap.set([...legacyBullets, ...osBullets], { opacity: 0, x: -20 });

        tl.to(
          legacyBullets,
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=1"
        );

        tl.to(
          osBullets,
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.8"
        );
      }

      // === RESILIENCE SECTION: Reveal with morphing background ===
      if (resilienceRef.current) {
        gsap.set(resilienceRef.current, { willChange: "transform, opacity" });

        gsap.fromTo(
          resilienceRef.current,
          {
            opacity: 0,
            scale: 0.95,
            y: 40,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: resilienceRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // === PERSONA CARDS: Staggered 3D entrance with hover effects ===
      if (personasWrapRef.current) {
        const cards = personaRefs.current.filter(Boolean) as HTMLDivElement[];
        gsap.set(cards, {
          willChange: "transform, opacity",
          transformPerspective: 1000,
        });

        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 80,
            rotateX: -20,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: personasWrapRef.current,
              start: "top 80%",
              once: true,
            },
            onComplete: () => {
              // After entrance, animate bullet points
              cards.forEach((card, cardIndex) => {
                const bullets = card.querySelectorAll("li");
                gsap.fromTo(
                  bullets,
                  { opacity: 0, x: -15 },
                  {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: cardIndex * 0.1,
                  }
                );
              });
            },
          }
        );

        // === MAGNETIC HOVER EFFECT ===
        const mm = gsap.matchMedia();
        mm.add("(hover: hover) and (pointer: fine)", () => {
          cards.forEach((card) => {
            const xTo = gsap.quickTo(card, "x", { duration: 0.4, ease: "power3.out" });
            const yTo = gsap.quickTo(card, "y", { duration: 0.4, ease: "power3.out" });
            const rotYTo = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power3.out" });
            const rotXTo = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power3.out" });
            const scaleTo = gsap.quickTo(card, "scale", { duration: 0.3, ease: "power2.out" });

            const onMove = (e: PointerEvent) => {
              const rect = card.getBoundingClientRect();
              const px = (e.clientX - rect.left) / rect.width - 0.5;
              const py = (e.clientY - rect.top) / rect.height - 0.5;

              xTo(px * 15);
              yTo(py * 15);
              rotYTo(px * 15);
              rotXTo(-py * 15);
              scaleTo(1.02);
            };

            const onLeave = () => {
              xTo(0);
              yTo(0);
              rotYTo(0);
              rotXTo(0);
              scaleTo(1);
            };

            card.addEventListener("pointermove", onMove);
            card.addEventListener("pointerleave", onLeave);

            return () => {
              card.removeEventListener("pointermove", onMove);
              card.removeEventListener("pointerleave", onLeave);
            };
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  // Touch feedback
  const onPersonaPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (!el || reduced) return;

    if (isTouchLikePointer(e)) {
      gsap.fromTo(el, { scale: 1 }, { scale: 0.97, duration: 0.1, ease: "power2.out", yoyo: true, repeat: 1 });
    }
  };

  // Split title into words for animation
  const titleWords = "A School OS is not just a school management system".split(" ");

  return (
    <section
      ref={sectionRef}
      data-section="school-os-clarity"
      className="relative overflow-hidden border-y border-white/5 bg-neutral-950 px-4 py-16 md:px-8 md:py-24"
    >
      {/* Floating particles */}
      {!reduced && <FloatingParticles count={40} />}

      {/* Animated glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          ref={glowLeftRef}
          className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[150px]"
        />
        <div
          ref={glowRightRef}
          className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[150px]"
        />
        <div
          ref={glowCenterRef}
          className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[120px]"
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12">
        {/* Header */}
        <div ref={headingRef} className="text-center">
          <p
            ref={taglineRef}
            className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60"
          >
            <SplitText>School OS positioning</SplitText>
          </p>

          <h2
            ref={titleRef}
            className="mt-3 text-3xl font-semibold text-white md:text-4xl"
            style={{ perspective: "1000px" }}
          >
            {titleWords.map((word, i) => (
              <span key={i} data-word className="mr-[0.3em] inline-block last:mr-0">
                {word}
              </span>
            ))}
          </h2>

          <p ref={subtitleRef} className="mx-auto mt-3 max-w-3xl text-sm text-neutral-300 md:text-base">
            A school management system digitizes tasks. A School OS connects workflows so every team
            runs from the same source of truth, with auditable operations across campuses.
          </p>
        </div>

        {/* Compare cards */}
        <div ref={compareRef} className="grid gap-6 md:grid-cols-2">
          {/* Legacy card */}
          <div
            ref={legacyCardRef}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <Layers className="h-5 w-5 text-blue-300" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
                Typical school management system
              </p>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-neutral-300">
              {[
                "Separate modules stitched together with exports.",
                "Data lives in silos; reconciliation is manual.",
                "Reporting lags behind real-time operations.",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-500" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* OS card */}
          <div
            ref={osCardRef}
            className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-neutral-900 to-neutral-950 p-6 shadow-2xl shadow-emerald-500/10 backdrop-blur-sm"
          >
            <AnimatedBorder isVisible={osCardVisible} />
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3">
                <Building2 className="h-5 w-5 text-emerald-200" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                SquareCampus School OS
              </p>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-neutral-200">
              {[
                "One data model powering connected workflows.",
                "Predictable operations with role-based controls.",
                "Live outputs: audits, reports, and approvals in one view.",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Resilience */}
        <div
          ref={resilienceRef}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/70 p-6 text-sm text-neutral-200 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-emerald-500/5" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              Operational resilience
            </p>
            <p className="mt-3">
              SquareCampus is designed to keep working when reality gets messy—peak admissions, fee
              spikes, audits, staffing changes, or mid-session policy shifts. The system stays calm
              so teams can focus on decisions, not recovery.
            </p>
          </div>
        </div>

        {/* Personas */}
        <div
          ref={personasWrapRef}
          className="rounded-3xl border border-white/10 bg-neutral-900/70 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            <Users className="h-3.5 w-3.5 text-blue-300" />
            Who it&apos;s for
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {whoItsFor.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  ref={(n) => {
                    personaRefs.current[idx] = n;
                  }}
                  onPointerDown={onPersonaPointerDown}
                  className="cursor-default rounded-2xl border border-white/10 bg-neutral-900/60 p-5 transition-colors duration-300 hover:border-white/20 hover:bg-neutral-800/40"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                      <Icon className="h-4 w-4 text-white/80" />
                    </div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                  </div>

                  <ul className="mt-4 space-y-2 text-xs text-neutral-300">
                    {item.points.map((point, pointIdx) => (
                      <li
                        key={point}
                        ref={(el) => {
                          bulletRefs.current[idx * 3 + pointIdx] = el;
                        }}
                        className="flex items-start gap-2"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/80" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}