"use client";

import { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  BookOpen,
  GraduationCap,
  type IconComponent,
  MessageSquare,
  Rupee,
  Users,
} from "@/components/icons";
import { DottedGlowBackground } from "./backgrounds/dotted-glow";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const operationAreas: Array<{
  title: string;
  description: string;
  bullets: string[];
  icon: IconComponent;
  gradient: string;
  accentColor: string;
  accentColorLight: string;
  metric?: { label: string; value: string };
  visual: {
    type: "flow" | "grid" | "chart" | "network" | "stack" | "pulse" | "proof";
  };
  isProofCard?: boolean;
  stats?: Array<{ label: string; value: string }>;
}> = [
    {
      title: "Admissions to alumni",
      description:
        "Collect applications, shortlist, enroll, and keep alumni connected in one operating flow.",
      bullets: [
        "Smart forms, merit lists, and waitlists",
        "Fee plans and document collection tied to admissions",
        "Alumni records that stay linked to student history",
      ],
      icon: GraduationCap,
      gradient: "from-blue-500/30 via-cyan-500/15 to-blue-900/25",
      accentColor: "rgb(59, 130, 246)",
      accentColorLight: "rgba(59, 130, 246, 0.15)",
      metric: { label: "Outcome", value: "Faster enrollments" },
      visual: { type: "flow" },
    },
    {
      title: "Academics & assessments",
      description:
        "Timetables, lesson plans, assessments, and grading stay in sync for every class.",
      bullets: [
        "Curriculum mapping and subject allocation",
        "Digital gradebooks with moderation controls",
        "Attendance that flows into reports instantly",
      ],
      icon: BookOpen,
      gradient: "from-purple-500/30 via-violet-500/15 to-purple-900/25",
      accentColor: "rgb(168, 85, 247)",
      accentColorLight: "rgba(168, 85, 247, 0.15)",
      metric: { label: "Outcome", value: "Less admin churn" },
      visual: { type: "grid" },
    },
    {
      title: "Finance & compliance",
      description:
        "Transparent finances with reconciliations and audit-ready records for every branch.",
      bullets: [
        "Fee schedules, waivers, and dues tracking",
        "Ledger exports with payment partner sync",
        "Audit trails and approvals baked into workflows",
      ],
      icon: Rupee,
      gradient: "from-emerald-500/30 via-green-500/15 to-emerald-900/25",
      accentColor: "rgb(16, 185, 129)",
      accentColorLight: "rgba(16, 185, 129, 0.15)",
      metric: { label: "Outcome", value: "Predictable collections" },
      visual: { type: "chart" },
    },
    {
      title: "Communication that lands",
      description:
        "Announcements, feedback, and support routed to the right people with proof of delivery.",
      bullets: [
        "Role-aware messaging via email, SMS, and in-app",
        "Two-way teacher-parent conversations",
        "Consent and read-receipt tracking",
      ],
      icon: MessageSquare,
      gradient: "from-amber-500/30 via-orange-500/15 to-amber-900/25",
      accentColor: "rgb(245, 158, 11)",
      accentColorLight: "rgba(245, 158, 11, 0.15)",
      metric: { label: "Outcome", value: "Clearer reach" },
      visual: { type: "network" },
    },
    {
      title: "People, assets & services",
      description:
        "Staff rosters, transport, library, and inventory stay coordinated so campuses run on time.",
      bullets: [
        "Route, hostel, and library circulation controls",
        "Asset issuance with return reminders",
        "Service tickets to keep facilities reliable",
      ],
      icon: Users,
      gradient: "from-rose-500/30 via-pink-500/15 to-rose-900/25",
      accentColor: "rgb(244, 63, 94)",
      accentColorLight: "rgba(244, 63, 94, 0.15)",
      metric: { label: "Outcome", value: "Fewer breakdowns" },
      visual: { type: "stack" },
    },
    {
      title: "Data you can act on",
      description: "Live dashboards and alerts so leadership sees gaps early and fixes them fast.",
      bullets: [
        "Engagement and performance pulse by branch",
        "Exception alerts for dues, absenteeism, and SLAs",
        "Exports for board reviews and regulators",
      ],
      icon: BarChart3,
      gradient: "from-sky-500/30 via-blue-500/15 to-sky-900/25",
      accentColor: "rgb(14, 165, 233)",
      accentColorLight: "rgba(14, 165, 233, 0.15)",
      metric: { label: "Outcome", value: "Faster decisions" },
      visual: { type: "pulse" },
    },
    {
      title: "Built for campuses of every size",
      description:
        "Multi-branch institutions, independent schools, and colleges run daily operations on SquareCampus with the same reliability: enterprise-grade security, clear workflows, and responsive support.",
      bullets: [],
      icon: BarChart3, // Not used for proof card
      gradient: "from-blue-500/15 via-purple-500/10 to-emerald-500/15",
      accentColor: "rgb(139, 92, 246)",
      accentColorLight: "rgba(139, 92, 246, 0.15)",
      visual: { type: "proof" },
      isProofCard: true,
      stats: [
        { label: "Time saved", value: "Hours back" },
        { label: "Errors cut", value: "Fewer fixes" },
        { label: "Go-live", value: "Guided setup" },
        { label: "Parents", value: "Clear updates" },
      ],
    },
  ];

export function Operations() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isInView, setIsInView] = useState(true);

  // Check for mobile/tablet/touch devices
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

      // Mobile: small screens (phones)
      setIsMobile(width < 768);

      // Tablet: touch device with medium-large screen (iPad, Android tablets)
      // These get native horizontal scroll instead of GSAP ScrollTrigger
      setIsTablet(hasTouch && width >= 768 && width < 1280);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // GSAP ScrollTrigger horizontal scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        const children = headingRef.current.children;
        gsap.fromTo(
          children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
      const sheenTweens: gsap.core.Tween[] = [];

      // Sheen animation on all cards
      cards.forEach((card, i) => {
        const sheen = card?.querySelector("[data-sheen]");
        if (sheen) {
          const tween = gsap.to(sheen, {
            x: "250%",
            duration: 3,
            ease: "power1.inOut",
            repeat: -1,
            repeatDelay: 8,
            delay: i * 1.2,
          });
          tween.pause();
          sheenTweens.push(tween);
        }
      });

      // Desktop: ScrollTrigger horizontal scroll (NOT for tablets - they use native scroll)
      if (!isMobile && !isTablet && trackRef.current && triggerRef.current) {
        const track = trackRef.current;
        const cardCount = cards.length;

        // Calculate positions to center cards
        const getPositions = () => {
          const viewportWidth = window.innerWidth;
          const maxCardWidth = 900;
          const cardWidth = Math.min(viewportWidth * 0.7, maxCardWidth); // 70vw with max-w constraint
          const gap = 32; // gap-8 = 32px
          const viewportCenter = viewportWidth / 2;

          // To center the first card: track needs to start at this x position
          // First card center should be at viewportCenter
          // First card center relative to track = cardWidth / 2
          // So track x = viewportCenter - cardWidth / 2
          const startX = viewportCenter - cardWidth / 2;

          // To center the last card: track needs to end at this x position
          // Last card start relative to track = (cardCount - 1) * (cardWidth + gap)
          // Last card center relative to track = (cardCount - 1) * (cardWidth + gap) + cardWidth / 2
          const lastCardCenterInTrack = (cardCount - 1) * (cardWidth + gap) + cardWidth / 2;
          const endX = viewportCenter - lastCardCenterInTrack;

          // Total scroll distance
          const scrollDistance = endX - startX;

          return { startX, endX, scrollDistance };
        };

        // Set initial track position to center first card
        const { startX } = getPositions();
        gsap.set(track, { x: startX });

        // Initial state: keep all cards at full clarity
        cards.forEach((card, i) => {
          gsap.set(card, {
            opacity: 1,
            scale: 1,
            filter: "brightness(1)",
          });

          const glow = card.querySelector("[data-card-glow]");
          if (glow) {
            gsap.set(glow, { opacity: i === 0 ? 1 : 0 });
          }

          const iconWrap = card.querySelector("[data-icon]");
          if (iconWrap) {
            const accentColor = card.getAttribute("data-accent") || "rgba(255,255,255,0.2)";
            gsap.set(iconWrap, {
              boxShadow: i === 0 ? `0 0 50px ${accentColor}` : `0 0 0 ${accentColor}`,
            });
          }
        });

        // Main horizontal scroll animation
        const scrollTween = gsap.to(track, {
          x: () => getPositions().endX,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${Math.abs(getPositions().scrollDistance)}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // Individual card animations - dramatic spotlight effect
        cards.forEach((card, index) => {
          const isFirstCard = index === 0;
          const isLastCard = index === cards.length - 1;

          // Card enters: scale up, brighten, full opacity (skip first card - it starts centered)
          if (!isFirstCard) {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              filter: "brightness(1)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left 80%",
                end: "left 50%",
                scrub: 1,
              },
            });
          }

          // Flash effect when card reaches center
          const flashOverlay = card.querySelector("[data-flash]");
          if (flashOverlay) {
            if (index === 0) {
              // First card flashes when pinning starts
              ScrollTrigger.create({
                trigger: triggerRef.current,
                start: "top top",
                onEnter: () => {
                  gsap.fromTo(
                    flashOverlay,
                    { opacity: 0.6 },
                    {
                      opacity: 0,
                      duration: 0.5,
                      ease: "power2.out",
                    }
                  );
                },
              });
            } else {
              // Other cards flash when they reach center during scroll
              ScrollTrigger.create({
                trigger: card,
                containerAnimation: scrollTween,
                start: "center center",
                onEnter: () => {
                  gsap.fromTo(
                    flashOverlay,
                    { opacity: 0.6 },
                    {
                      opacity: 0,
                      duration: 0.5,
                      ease: "power2.out",
                    }
                  );
                },
              });
            }
          }

          // No dimming on exit; keep cards at full clarity

          // Content parallax (skip first card - it starts centered)
          const content = card.querySelector("[data-card-content]");
          if (content && !isFirstCard) {
            gsap.fromTo(
              content,
              { x: 80, opacity: 0.5 },
              {
                x: 0,
                opacity: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTween,
                  start: "left 90%",
                  end: "left 45%",
                  scrub: 1,
                },
              }
            );
          }

          // Bullets dramatic stagger (skip first card)
          if (!isFirstCard) {
            const bullets = card.querySelectorAll("[data-bullet]");
            bullets.forEach((bullet, bi) => {
              gsap.fromTo(
                bullet,
                { opacity: 0, x: 50, y: 10 },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: scrollTween,
                    start: `left ${70 - bi * 8}%`,
                    end: `left ${50 - bi * 8}%`,
                    scrub: 1,
                  },
                }
              );
            });
          }

          // Icon glow intensifies when card is centered (skip first card)
          const iconWrap = card.querySelector("[data-icon]");
          if (iconWrap) {
            const accentColor = card.getAttribute("data-accent") || "rgba(255,255,255,0.2)";
            gsap.fromTo(
              iconWrap,
              { boxShadow: `0 0 0 ${accentColor}` },
              {
                boxShadow: `0 0 50px ${accentColor}`,
                ease: "power2.inOut",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTween,
                  start: "left 70%",
                  end: "left 30%",
                  scrub: 1,
                },
              }
            );
          }

          // Card glow peaks at center (scrubbed for reverse scroll)
          const cardGlow = card.querySelector("[data-card-glow]");
          if (cardGlow) {
            const accentColor = card.getAttribute("data-accent") || "rgba(255,255,255,0.2)";
            gsap.fromTo(
              cardGlow,
              { opacity: 0 },
              {
                opacity: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTween,
                  start: "left 70%",
                  end: "left 30%",
                  scrub: 1,
                },
              }
            );
          }

          // Metric badge pop (skip first card)
          const metric = card.querySelector("[data-metric]");
          if (metric && !isFirstCard) {
            gsap.fromTo(
              metric,
              { scale: 0.8, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTween,
                  start: "left 65%",
                  end: "left 45%",
                  scrub: 1,
                },
              }
            );
          }
        });

        // Refresh on resize
        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }

      // Mobile: stacked vertical scroll
      if (isMobile && cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Tablet: fade in cards for native horizontal scroll
      if (isTablet && cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      if (sectionRef.current && sheenTweens.length) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => sheenTweens.forEach((tween) => tween.resume()),
          onEnterBack: () => sheenTweens.forEach((tween) => tween.resume()),
          onLeave: () => sheenTweens.forEach((tween) => tween.pause()),
          onLeaveBack: () => sheenTweens.forEach((tween) => tween.pause()),
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, isTablet]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="operations"
      data-section="operations"
      className="relative overflow-x-clip bg-neutral-950"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        {isInView && (
          <DottedGlowBackground
            className="pointer-events-none opacity-60"
            gap={18}
            radius={1.4}
            color="rgba(148, 163, 184, 0.16)"
            darkColor="rgba(148, 163, 184, 0.2)"
            glowColor="rgba(56, 189, 248, 0.45)"
            darkGlowColor="rgba(56, 189, 248, 0.6)"
            opacity={0.45}
            backgroundOpacity={0.1}
            speedMin={0.22}
            speedMax={0.85}
            speedScale={0.65}
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.06),transparent_32%),radial-gradient(circle_at_40%_80%,rgba(59,130,246,0.05),transparent_28%)]" />
      </div>

      {/* Heading */}
      <div className="relative px-4 pb-12 pt-10 md:px-8 md:pb-16 md:pt-14">
        <div ref={headingRef} className="mx-auto max-w-6xl space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">
            Why SquareCampus
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
            One operating system to keep every school day predictable
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-neutral-300 md:text-base">
            SquareCampus replaces fragmented apps with a single, responsive command center. Every
            workflow—admissions, academics, finance, communication, and facilities—is connected so
            teams move faster and leaders stay in control.
          </p>
        </div>
      </div>

      {/* Pinned horizontal scroll area */}
      <div
        ref={triggerRef}
        className={`
          relative
          ${isTablet
            ? "" // Tablet: no special container styling, let it flow normally
            : "lg:flex lg:min-h-screen lg:items-center"
          }
        `}
      >
        {/* Strong edge gradients for drama - hide on tablet since we have native scroll */}
        <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-48 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-transparent ${isMobile || isTablet ? "hidden" : "hidden lg:block"}`} />
        <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-48 bg-gradient-to-l from-neutral-950 via-neutral-950/90 to-transparent ${isMobile || isTablet ? "hidden" : "hidden lg:block"}`} />

        {/* Track */}
        <div
          ref={trackRef}
          className={`
            flex
            ${isMobile
              ? "flex-col items-center gap-6 px-4 py-6"
              : isTablet
                ? "snap-x snap-mandatory gap-6 overflow-x-auto px-6 py-8 scrollbar-hide"
                : "items-center gap-8 py-0"
            }
          `}
          style={isTablet ? {
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          } : undefined}
        >
          {operationAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <article
                key={area.title}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                data-accent={area.accentColor}
                className={`
                  group relative flex shrink-0 flex-col overflow-hidden rounded-[2rem]
                  border border-white/[0.08] bg-neutral-900/80
                  backdrop-blur-sm transition-colors duration-700 hover:border-white/15
                  ${isMobile
                    ? "w-full max-w-lg"
                    : isTablet
                      ? "h-[70vh] max-h-[600px] w-[80vw] max-w-[700px] snap-center"
                      : "h-[75vh] max-h-[700px] w-[70vw] max-w-[900px]"
                  }
                `}
                style={{
                  boxShadow: `
                    0 0 80px ${area.accentColor}08,
                    0 0 160px ${area.accentColor}04,
                    0 40px 80px -20px rgba(0, 0, 0, 0.7)
                  `,
                }}
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${area.gradient}`}
                />

                {/* Noise texture overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.015]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Metallic sheen */}
                <div
                  data-sheen
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
                  style={{ width: "40%" }}
                />

                {/* Inner glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    boxShadow: `inset 0 0 100px ${area.accentColor}10`,
                  }}
                />

                {/* Flash overlay - triggers when card centers */}
                <div
                  data-flash
                  className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${area.accentColor}40, ${area.accentColor}20 40%, transparent 70%)`,
                  }}
                />

                {/* Card glow ring */}
                <div
                  data-card-glow
                  className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0"
                  style={{
                    boxShadow: `0 0 120px ${area.accentColor}40, inset 0 0 60px ${area.accentColor}18`,
                  }}
                />

                {/* Card content */}
                <div
                  data-card-content
                  className={`
                    relative flex h-full
                    ${isMobile
                      ? "flex-col p-6"
                      : isTablet
                        ? "flex-col p-6"
                        : area.isProofCard
                          ? "flex-col p-10 lg:p-14"
                          : "flex-row p-0"
                    }
                  `}
                >
                  {area.isProofCard ? (
                    // Proof card - cutting edge layout
                    <div className={`relative flex h-full ${isMobile ? "flex-col" : "flex-row"}`}>
                      {/* Left content */}
                      <div
                        className={`
                          relative z-10 flex flex-col
                          ${isMobile ? "p-6" : "w-1/2 p-10 lg:p-14"}
                        `}
                      >
                        {/* Badge */}
                        <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                            Live across campuses
                          </span>
                        </div>

                        <h3
                          className={`
                            font-semibold text-white
                            ${isMobile ? "text-xl" : "text-2xl lg:text-4xl"}
                          `}
                        >
                          {area.title}
                        </h3>
                        <p
                          className={`
                            mt-4 leading-relaxed text-neutral-300
                            ${isMobile ? "text-sm" : "text-base lg:text-lg"}
                          `}
                        >
                          {area.description}
                        </p>

                        {/* Stats - compact vertical cards */}
                        <div
                          className={`
                            mt-auto grid gap-2 pt-6
                            ${isMobile ? "grid-cols-2" : "grid-cols-4"}
                          `}
                        >
                          {area.stats?.map((stat, statIndex) => {
                            const statIcons = ["⏱", "✓", "🚀", "💬"];
                            const statColors = [
                              { border: "border-blue-500/20", bg: "bg-blue-500/5", glow: "rgba(59,130,246,0.2)", text: "text-blue-400" },
                              { border: "border-emerald-500/20", bg: "bg-emerald-500/5", glow: "rgba(16,185,129,0.2)", text: "text-emerald-400" },
                              { border: "border-amber-500/20", bg: "bg-amber-500/5", glow: "rgba(245,158,11,0.2)", text: "text-amber-400" },
                              { border: "border-pink-500/20", bg: "bg-pink-500/5", glow: "rgba(236,72,153,0.2)", text: "text-pink-400" },
                            ];
                            const color = statColors[statIndex] || statColors[0];

                            return (
                              <div
                                key={stat.label}
                                data-stat
                                className={`
                                  group/stat relative overflow-hidden rounded-xl border text-center
                                  ${color.border} ${color.bg}
                                  px-2 py-3 backdrop-blur-sm transition-all duration-300
                                  hover:border-white/20
                                `}
                              >
                                <span
                                  className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg text-base"
                                  style={{ background: color.glow }}
                                >
                                  {statIcons[statIndex]}
                                </span>
                                <p className={`mt-2 text-[9px] font-semibold uppercase tracking-[0.15em] ${color.text}`}>
                                  {stat.label}
                                </p>
                                <p className="mt-0.5 text-xs font-semibold text-white">
                                  {stat.value}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right - Orbital visualization */}
                      {!isMobile && (
                        <div className="relative flex w-1/2 items-center justify-center overflow-hidden">
                          {/* Background glow */}
                          <div
                            className="absolute inset-0"
                            style={{
                              background: `
                                radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 60%),
                                radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1), transparent 50%),
                                radial-gradient(circle at 70% 70%, rgba(16, 185, 129, 0.1), transparent 50%)
                              `,
                            }}
                          />

                          {/* Orbital system */}
                          <div className="relative h-[400px] w-[400px]">
                            {/* Grid overlay */}
                            <svg className="absolute inset-0 h-full w-full opacity-10">
                              <defs>
                                <pattern id="proof-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                                  <circle cx="15" cy="15" r="1" fill="white" />
                                </pattern>
                              </defs>
                              <rect width="100%" height="100%" fill="url(#proof-grid)" />
                            </svg>

                            {/* Orbital rings */}
                            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400">
                              {/* Outer ring */}
                              <ellipse
                                cx="200" cy="200" rx="180" ry="80"
                                fill="none" stroke="url(#orbit-gradient-1)" strokeWidth="1"
                                className="animate-spin-slow"
                                style={{ transformOrigin: "200px 200px", animationDuration: "30s" }}
                              />
                              {/* Middle ring */}
                              <ellipse
                                cx="200" cy="200" rx="140" ry="60"
                                fill="none" stroke="url(#orbit-gradient-2)" strokeWidth="1"
                                className="animate-spin-slow"
                                style={{ transformOrigin: "200px 200px", animationDuration: "25s", animationDirection: "reverse" }}
                              />
                              {/* Inner ring */}
                              <ellipse
                                cx="200" cy="200" rx="100" ry="40"
                                fill="none" stroke="url(#orbit-gradient-3)" strokeWidth="1"
                                className="animate-spin-slow"
                                style={{ transformOrigin: "200px 200px", animationDuration: "20s" }}
                              />

                              {/* Gradients */}
                              <defs>
                                <linearGradient id="orbit-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
                                  <stop offset="50%" stopColor="rgba(139, 92, 246, 0.5)" />
                                  <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                                </linearGradient>
                                <linearGradient id="orbit-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                                  <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)" />
                                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                                </linearGradient>
                                <linearGradient id="orbit-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
                                  <stop offset="50%" stopColor="rgba(16, 185, 129, 0.4)" />
                                  <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                                </linearGradient>
                              </defs>

                              {/* Orbiting nodes */}
                              <g className="animate-spin-slow" style={{ transformOrigin: "200px 200px", animationDuration: "30s" }}>
                                <circle cx="380" cy="200" r="8" fill="rgba(139, 92, 246, 0.8)">
                                  <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="380" cy="200" r="16" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1">
                                  <animate attributeName="r" values="16;24;16" dur="2s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                                </circle>
                              </g>

                              <g className="animate-spin-slow" style={{ transformOrigin: "200px 200px", animationDuration: "30s" }}>
                                <circle cx="20" cy="200" r="6" fill="rgba(139, 92, 246, 0.6)">
                                  <animate attributeName="r" values="6;8;6" dur="2.5s" repeatCount="indefinite" />
                                </circle>
                              </g>

                              <g className="animate-spin-slow" style={{ transformOrigin: "200px 200px", animationDuration: "25s", animationDirection: "reverse" }}>
                                <circle cx="340" cy="200" r="7" fill="rgba(59, 130, 246, 0.8)">
                                  <animate attributeName="r" values="7;9;7" dur="1.8s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="60" cy="200" r="5" fill="rgba(59, 130, 246, 0.5)" />
                              </g>

                              <g className="animate-spin-slow" style={{ transformOrigin: "200px 200px", animationDuration: "20s" }}>
                                <circle cx="300" cy="200" r="6" fill="rgba(16, 185, 129, 0.8)">
                                  <animate attributeName="r" values="6;8;6" dur="2.2s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="100" cy="200" r="4" fill="rgba(16, 185, 129, 0.5)" />
                              </g>

                              {/* Center core */}
                              <circle cx="200" cy="200" r="35" fill="url(#core-gradient)" />
                              <circle cx="200" cy="200" r="35" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                              <circle cx="200" cy="200" r="45" fill="none" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1">
                                <animate attributeName="r" values="45;55;45" dur="3s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" />
                              </circle>

                              {/* Core gradient */}
                              <defs>
                                <radialGradient id="core-gradient" cx="50%" cy="50%" r="50%">
                                  <stop offset="0%" stopColor="rgba(139, 92, 246, 0.4)" />
                                  <stop offset="70%" stopColor="rgba(139, 92, 246, 0.2)" />
                                  <stop offset="100%" stopColor="rgba(139, 92, 246, 0.05)" />
                                </radialGradient>
                              </defs>

                              {/* Center icon placeholder */}
                              <text x="200" y="208" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" opacity="0.9">
                                SC
                              </text>
                            </svg>

                            {/* Floating particles */}
                            {[...Array(12)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute h-1 w-1 rounded-full bg-purple-400/60"
                                style={{
                                  left: `${20 + Math.random() * 60}%`,
                                  top: `${20 + Math.random() * 60}%`,
                                  animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                                  animationDelay: `${Math.random() * 2}s`,
                                }}
                              />
                            ))}
                          </div>

                          {/* Connection lines */}
                          <div className="pointer-events-none absolute inset-0">
                            <svg className="h-full w-full opacity-20">
                              <line x1="10%" y1="20%" x2="40%" y2="40%" stroke="url(#line-gradient)" strokeWidth="1" />
                              <line x1="90%" y1="30%" x2="60%" y2="45%" stroke="url(#line-gradient)" strokeWidth="1" />
                              <line x1="20%" y1="80%" x2="45%" y2="55%" stroke="url(#line-gradient)" strokeWidth="1" />
                              <line x1="85%" y1="75%" x2="58%" y2="52%" stroke="url(#line-gradient)" strokeWidth="1" />
                              <defs>
                                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
                                  <stop offset="50%" stopColor="rgba(139, 92, 246, 0.6)" />
                                  <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Regular card layout
                    <>
                      {/* Left: Text content */}
                      <div
                        className={`
                          flex flex-col
                          ${isMobile || isTablet ? "" : "w-[55%] p-10 lg:p-14"}
                        `}
                      >
                        {/* Top row: Icon + Metric */}
                        <div className="flex items-start justify-between gap-6">
                          <div
                            data-icon
                            className={`
                              rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm
                              transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10
                              ${isMobile ? "p-4" : "p-5 lg:p-6"}
                            `}
                          >
                            <Icon
                              className={`
                                text-white/90 transition-colors duration-300 group-hover:text-white
                                ${isMobile ? "h-7 w-7" : "h-10 w-10 lg:h-12 lg:w-12"}
                              `}
                            />
                          </div>

                          {area.metric && (
                            <div
                              data-metric
                              className={`
                                rounded-2xl border border-white/[0.08] bg-black/40 text-right backdrop-blur-sm
                                ${isMobile ? "px-4 py-2" : "px-6 py-4"}
                              `}
                            >
                              <p className={`uppercase tracking-wider text-white/40 ${isMobile ? "text-[0.6rem]" : "text-xs"}`}>
                                {area.metric.label}
                              </p>
                              <p className={`font-semibold text-nowrap text-white ${isMobile ? "text-base" : "text-xl lg:text-2xl"}`}>
                                {area.metric.value}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Title and description */}
                        <div className={`space-y-4 ${isMobile ? "mt-6" : "mt-8 lg:mt-10"}`}>
                          <h3
                            className={`
                              font-semibold uppercase tracking-[0.1em] text-white
                              ${isMobile ? "text-lg" : "text-2xl lg:text-3xl"}
                            `}
                          >
                            {area.title}
                          </h3>
                          <p
                            className={`
                              leading-relaxed text-neutral-200/90
                              ${isMobile ? "text-sm" : "text-base lg:text-lg"}
                            `}
                          >
                            {area.description}
                          </p>
                        </div>

                        {/* Bullets */}
                        <ul
                          className={`
                            mt-auto space-y-2
                            ${isMobile ? "pt-6" : "pt-8"}
                          `}
                        >
                          {area.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              data-bullet
                              className={`
                                group/bullet flex items-center gap-3 rounded-xl
                                border border-white/[0.04] bg-white/[0.02]
                                backdrop-blur-sm transition-all duration-300
                                hover:border-white/10 hover:bg-white/[0.05]
                                ${isMobile ? "px-3 py-2.5" : "px-4 py-3"}
                              `}
                              style={{
                                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.03)`,
                              }}
                            >
                              <span
                                className={`
                                  flex shrink-0 items-center justify-center rounded-lg
                                  border transition-all duration-300
                                  group-hover/bullet:scale-110
                                  ${isMobile ? "h-6 w-6" : "h-7 w-7"}
                                `}
                                style={{
                                  borderColor: `${area.accentColor}30`,
                                  background: `linear-gradient(135deg, ${area.accentColor}15, ${area.accentColor}05)`,
                                  boxShadow: `0 0 20px ${area.accentColor}15`,
                                }}
                              >
                                <span
                                  className="h-1.5 w-1.5 rounded-full"
                                  style={{
                                    background: area.accentColor,
                                    boxShadow: `0 0 8px ${area.accentColor}`,
                                  }}
                                />
                              </span>
                              <span
                                className={`
                                  leading-snug text-neutral-300
                                  transition-colors duration-300
                                  group-hover/bullet:text-neutral-100
                                  ${isMobile ? "text-sm" : "text-sm lg:text-[15px]"}
                                `}
                              >
                                {bullet}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Visual illustration */}
                      {!isMobile && !isTablet && (
                        <div
                          data-visual
                          className="relative flex w-[45%] items-center justify-center overflow-hidden"
                        >
                          {/* Visual background glow */}
                          <div
                            className="absolute inset-0 opacity-30"
                            style={{
                              background: `radial-gradient(circle at 50% 50%, ${area.accentColor}30, transparent 70%)`,
                            }}
                          />

                          {/* Decorative grid lines */}
                          <svg
                            className="absolute inset-0 h-full w-full opacity-10"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <defs>
                              <pattern
                                id={`grid-${index}`}
                                width="40"
                                height="40"
                                patternUnits="userSpaceOnUse"
                              >
                                <path
                                  d="M 40 0 L 0 0 0 40"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="0.5"
                                  className="text-white"
                                />
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
                          </svg>

                          {/* Visual element based on type */}
                          <CardVisual type={area.visual.type} accentColor={area.accentColor} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </article>
            );
          })}

        </div>
      </div>

    </section>
  );
}

// Visual illustrations for each card type
const CardVisual = ({
  type,
  accentColor,
}: {
  type: "flow" | "grid" | "chart" | "network" | "stack" | "pulse" | "proof";
  accentColor: string;
}) => {
  // Proof cards don't use CardVisual - they have their own layout
  if (type === "proof") return null;
  const baseClass = "relative h-64 w-64 lg:h-80 lg:w-80";

  switch (type) {
    case "flow":
      // Admissions flow - connected nodes
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 200 200" className="h-full w-full">
            {/* Flow path */}
            <path
              d="M 30 100 Q 60 60, 100 60 T 170 100"
              fill="none"
              stroke={accentColor}
              strokeWidth="2"
              strokeDasharray="8 4"
              opacity="0.4"
              className="animate-dash"
            />
            <path
              d="M 30 100 Q 60 140, 100 140 T 170 100"
              fill="none"
              stroke={accentColor}
              strokeWidth="2"
              strokeDasharray="8 4"
              opacity="0.4"
              className="animate-dash"
              style={{ animationDelay: "0.5s" }}
            />
            {/* Nodes */}
            {[
              { cx: 30, cy: 100, r: 12 },
              { cx: 100, cy: 60, r: 10 },
              { cx: 100, cy: 140, r: 10 },
              { cx: 170, cy: 100, r: 14 },
            ].map((node, i) => (
              <g key={i}>
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r + 8}
                  fill={accentColor}
                  opacity="0.1"
                  className="animate-pulse-slow"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r}
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="2"
                  opacity="0.6"
                />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r - 4}
                  fill={accentColor}
                  opacity="0.3"
                />
              </g>
            ))}
          </svg>
        </div>
      );

    case "grid":
      // Academics - timetable grid
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 200 200" className="h-full w-full">
            {/* Grid cells */}
            {Array.from({ length: 16 }).map((_, i) => {
              const row = Math.floor(i / 4);
              const col = i % 4;
              const isHighlighted = [1, 5, 6, 10, 11, 14].includes(i);
              return (
                <rect
                  key={i}
                  x={30 + col * 38}
                  y={30 + row * 38}
                  width="32"
                  height="32"
                  rx="6"
                  fill={isHighlighted ? accentColor : "white"}
                  opacity={isHighlighted ? 0.4 : 0.08}
                  className={isHighlighted ? "animate-pulse-slow" : ""}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              );
            })}
            {/* Header row */}
            <rect x="30" y="10" width="140" height="4" rx="2" fill={accentColor} opacity="0.3" />
            {/* Side column */}
            <rect x="10" y="30" width="4" height="140" rx="2" fill={accentColor} opacity="0.3" />
          </svg>
        </div>
      );

    case "chart":
      // Finance - morphing charts (bar → pie → column)
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 200 200" className="h-full w-full">
            {/* Bar chart */}
            <g className="chart-bar-cycle">
              {[
                { x: 30, h: 60 },
                { x: 55, h: 80 },
                { x: 80, h: 70 },
                { x: 105, h: 100 },
                { x: 130, h: 90 },
                { x: 155, h: 120 },
              ].map((bar, i) => (
                <rect
                  key={i}
                  x={bar.x}
                  y={170 - bar.h}
                  width="18"
                  height={bar.h}
                  rx="4"
                  fill={accentColor}
                  opacity={0.3 + i * 0.08}
                />
              ))}
              <path
                d="M 39 150 L 64 130 L 89 140 L 114 110 L 139 120 L 164 80"
                fill="none"
                stroke={accentColor}
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.7"
              />
            </g>

            {/* Pie chart */}
            <g className="chart-pie-cycle">
              <circle cx="100" cy="100" r="46" fill="none" stroke={accentColor} strokeWidth="14" opacity="0.2" />
              <path
                d="M 100 54 A 46 46 0 0 1 146 100 L 100 100 Z"
                fill={accentColor}
                opacity="0.55"
              />
              <path
                d="M 146 100 A 46 46 0 0 1 116 142 L 100 100 Z"
                fill={accentColor}
                opacity="0.35"
              />
              <path
                d="M 116 142 A 46 46 0 0 1 54 100 L 100 100 Z"
                fill={accentColor}
                opacity="0.22"
              />
            </g>

            {/* Column chart */}
            <g className="chart-column-cycle">
              {[
                { x: 40, y: 60, w: 22, h: 100 },
                { x: 76, y: 40, w: 22, h: 120 },
                { x: 112, y: 70, w: 22, h: 90 },
                { x: 148, y: 30, w: 22, h: 130 },
              ].map((col, i) => (
                <rect
                  key={i}
                  x={col.x}
                  y={col.y}
                  width={col.w}
                  height={col.h}
                  rx="6"
                  fill={accentColor}
                  opacity={0.25 + i * 0.12}
                />
              ))}
            </g>

            {/* Baseline */}
            <line x1="20" y1="170" x2="180" y2="170" stroke="white" strokeWidth="1" opacity="0.2" />
          </svg>
        </div>
      );

    case "network":
      // Communication - message network
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 200 200" className="h-full w-full">
            {/* Central hub */}
            <circle cx="100" cy="100" r="20" fill={accentColor} opacity="0.3" />
            <circle cx="100" cy="100" r="14" fill="none" stroke={accentColor} strokeWidth="2" opacity="0.6" />
            {/* Connections */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 100 + Math.cos(rad) * 60;
              const y = 100 + Math.sin(rad) * 60;
              return (
                <g key={i}>
                  <line
                    x1="100"
                    y1="100"
                    x2={x}
                    y2={y}
                    stroke={accentColor}
                    strokeWidth="1.5"
                    opacity="0.3"
                    strokeDasharray="4 4"
                    className="animate-dash"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="10"
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="1.5"
                    opacity="0.5"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill={accentColor}
                    opacity="0.4"
                    className="animate-pulse-slow"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                </g>
              );
            })}
            {/* Message indicators */}
            {[45, 135, 225, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 100 + Math.cos(rad) * 35;
              const y = 100 + Math.sin(rad) * 35;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4"
                  fill={accentColor}
                  opacity="0.6"
                  className="animate-ping-slow"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              );
            })}
          </svg>
        </div>
      );

    case "stack":
      // Assets - stacked layers
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 200 200" className="h-full w-full">
            {/* Stacked cards */}
            {[0, 1, 2, 3].map((i) => (
              <g
                key={i}
                className="animate-float"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <rect
                  x={40 + i * 8}
                  y={60 + i * 25}
                  width="100"
                  height="60"
                  rx="8"
                  fill={i === 3 ? accentColor : "white"}
                  opacity={i === 3 ? 0.4 : 0.08 + i * 0.03}
                  stroke={accentColor}
                  strokeWidth={i === 3 ? "2" : "1"}
                  strokeOpacity={i === 3 ? 0.6 : 0.2}
                />
                {/* Card content lines */}
                <rect
                  x={50 + i * 8}
                  y={72 + i * 25}
                  width="40"
                  height="4"
                  rx="2"
                  fill={i === 3 ? "white" : accentColor}
                  opacity={i === 3 ? 0.6 : 0.2}
                />
                <rect
                  x={50 + i * 8}
                  y={82 + i * 25}
                  width="60"
                  height="3"
                  rx="1.5"
                  fill={i === 3 ? "white" : accentColor}
                  opacity={i === 3 ? 0.4 : 0.15}
                />
              </g>
            ))}
            {/* Floating icons */}
            <circle cx="160" cy="50" r="8" fill={accentColor} opacity="0.3" className="animate-float" />
            <circle cx="35" cy="150" r="6" fill={accentColor} opacity="0.2" className="animate-float" style={{ animationDelay: "0.5s" }} />
          </svg>
        </div>
      );

    case "pulse":
      // Data - dashboard pulse
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 200 200" className="h-full w-full">
            {/* Central monitor */}
            <rect
              x="50"
              y="60"
              width="100"
              height="70"
              rx="8"
              fill="none"
              stroke={accentColor}
              strokeWidth="2"
              opacity="0.5"
            />
            <rect x="50" y="60" width="100" height="70" rx="8" fill={accentColor} opacity="0.1" />
            {/* Pulse line */}
            <path
              d="M 60 95 L 75 95 L 80 80 L 90 110 L 100 85 L 110 100 L 120 90 L 140 95"
              fill="none"
              stroke={accentColor}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
              className="animate-draw"
            />
            {/* Data points */}
            {[
              { x: 65, y: 70, size: 4 },
              { x: 85, y: 70, size: 6 },
              { x: 110, y: 70, size: 5 },
              { x: 135, y: 70, size: 4 },
            ].map((point, i) => (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r={point.size}
                fill={accentColor}
                opacity="0.4"
                className="animate-pulse-slow"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
            {/* Stand */}
            <rect x="90" y="130" width="20" height="15" rx="2" fill={accentColor} opacity="0.3" />
            <rect x="75" y="145" width="50" height="6" rx="3" fill={accentColor} opacity="0.2" />
            {/* Alert rings */}
            <circle cx="160" cy="45" r="12" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.3" className="animate-ping-slow" />
            <circle cx="160" cy="45" r="6" fill={accentColor} opacity="0.5" />
          </svg>
        </div>
      );

    default:
      return null;
  }
};
