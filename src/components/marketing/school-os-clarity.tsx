"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
  Zap,
  Shield,
  Activity,
} from "@/components/icons";
import { FeatureVisual } from "./feature-visual";

gsap.registerPlugin(ScrollTrigger);

// === WebGL Background ===
const vertexShader = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_scroll;
  uniform float u_isMobile;

  // Hash function for pseudo-random
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  // Smooth noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // Grid pattern
  float grid(vec2 uv, float size) {
    vec2 grid = abs(fract(uv * size) - 0.5);
    float line = min(grid.x, grid.y);
    return smoothstep(0.0, 0.02, line);
  }

  // Ripple effect
  float ripple(vec2 uv, vec2 center, float time, float index) {
    float d = length(uv - center);
    float wave = sin(d * 8.0 - time * 0.5 - index * 1.5) * 0.5 + 0.5;
    float fade = smoothstep(0.8, 0.0, d);
    return wave * fade * 0.15;
  }

  // Particle field
  float particles(vec2 uv, float time) {
    float p = 0.0;
    for (int i = 0; i < 12; i++) {
      float fi = float(i);
      vec2 pos = vec2(
        hash(vec2(fi, 0.0)),
        hash(vec2(0.0, fi))
      );
      pos += vec2(
        sin(time * 0.1 + fi) * 0.2,
        cos(time * 0.15 + fi * 1.3) * 0.15
      );
      float d = length(uv - pos);
      float brightness = smoothstep(0.02, 0.0, d) * (0.3 + 0.2 * sin(time + fi));
      p += brightness;
    }
    return p;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 centered = uv * 2.0 - 1.0;
    centered.x *= u_resolution.x / u_resolution.y;

    float t = u_time * 0.3;
    vec3 color = vec3(0.0);

    // Animated grid (desktop only, reduced on mobile)
    if (u_isMobile < 0.5) {
      vec2 gridUv = uv + vec2(t * 0.02, t * 0.01);
      float g = 1.0 - grid(gridUv, 15.0);
      color += vec3(1.0) * g * 0.025;
    }

    // Ripple circles from center
    vec2 center = vec2(0.0);
    float rippleEffect = 0.0;
    rippleEffect += ripple(centered, center, t, 0.0);
    rippleEffect += ripple(centered, center, t, 1.0);
    rippleEffect += ripple(centered, center, t, 2.0);
    if (u_isMobile < 0.5) {
      rippleEffect += ripple(centered, center, t, 3.0);
    }
    color += vec3(0.4, 0.9, 0.7) * rippleEffect * 0.3;

    // Floating particles (desktop only)
    if (u_isMobile < 0.5) {
      float p = particles(uv, t);
      color += vec3(1.0) * p * 0.6;
    }

    // Glow orbs
    // Blue orb (left)
    vec2 orb1Pos = vec2(-0.6, 0.3) + vec2(sin(t * 0.2) * 0.1, cos(t * 0.15) * 0.1);
    float orb1 = smoothstep(0.8, 0.0, length(centered - orb1Pos));
    color += vec3(0.2, 0.4, 1.0) * orb1 * 0.12;

    // Emerald orb (right)
    vec2 orb2Pos = vec2(0.7, -0.2) + vec2(cos(t * 0.18) * 0.1, sin(t * 0.22) * 0.1);
    float orb2 = smoothstep(0.8, 0.0, length(centered - orb2Pos));
    color += vec3(0.1, 0.8, 0.5) * orb2 * 0.12;

    // Purple orb (bottom center)
    vec2 orb3Pos = vec2(0.0, -0.5) + vec2(sin(t * 0.25) * 0.08, cos(t * 0.2) * 0.08);
    float orb3 = smoothstep(0.6, 0.0, length(centered - orb3Pos));
    color += vec3(0.5, 0.2, 0.8) * orb3 * 0.08;

    // Central emerald glow
    float centralGlow = smoothstep(0.5, 0.0, length(centered));
    color += vec3(0.2, 0.8, 0.6) * centralGlow * 0.06;

    // Radial fade to edges
    float vignette = smoothstep(1.2, 0.3, length(centered));
    color *= vignette;

    // Add subtle noise
    float n = noise(uv * 200.0 + t) * 0.015;
    color += n;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function useWebGLSupport() {
  const [supported, setSupported] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

function compileShaderProgram(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createShaderProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function WebGLBackground({ isMobile }: { isMobile: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) return;

    const vs = compileShaderProgram(gl, gl.VERTEX_SHADER, vertexShader);
    const fs = compileShaderProgram(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vs || !fs) return;

    const program = createShaderProgram(gl, vs, fs);
    if (!program) return;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]), gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "a_position");
    const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const scrollLoc = gl.getUniformLocation(program, "u_scroll");
    const isMobileLoc = gl.getUniformLocation(program, "u_isMobile");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5); // Lower DPR for this heavier shader
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Track scroll position
    const handleScroll = () => {
      if (canvas.parentElement) {
        const rect = canvas.parentElement.getBoundingClientRect();
        scrollRef.current = -rect.top / window.innerHeight;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const startTime = performance.now();

    const render = () => {
      const time = prefersReduced ? 0 : (performance.now() - startTime) / 1000;

      gl.clearColor(0.039, 0.039, 0.039, 1); // neutral-950
      gl.clear(gl.COLOR_BUFFER_BIT);

      // biome-ignore lint/correctness/useHookAtTopLevel: WebGL useProgram is not a React hook.
      gl.useProgram(program);
      gl.enableVertexAttribArray(positionLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, time);
      gl.uniform1f(scrollLoc, scrollRef.current);
      gl.uniform1f(isMobileLoc, isMobile ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

// Static fallback for no-WebGL devices
function StaticBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow orbs */}
      <div className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[180px]" />
      <div className="absolute -right-32 top-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[180px]" />
      <div className="absolute bottom-1/4 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-purple-500/5 blur-[150px]" />
      {/* Central glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-48 w-48 rounded-full bg-gradient-radial from-emerald-500/10 via-sky-500/5 to-transparent blur-2xl" />
      </div>
      {/* Radial fade */}
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

// Unified background component
function SectionBackground({ isMobile }: { isMobile: boolean }) {
  const webglSupported = useWebGLSupport();

  if (webglSupported === null) return null;
  if (webglSupported) return <WebGLBackground isMobile={isMobile} />;
  return <StaticBackground />;
}

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

function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || window.matchMedia?.("(pointer: coarse)")?.matches;
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
      aria-hidden="true"
    >
      <title>Animated border</title>
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
  cardRef,
}: {
  item: (typeof whoItsFor)[number];
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
          {item.points.map((point, _pointIdx) => (
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

  const personaRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [osCardVisible, setOsCardVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const reduced = useMemo(() => prefersReducedMotion(), []);

  // Detect mobile on mount
  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  // Main animation orchestration with scroll-scrub
  useLayoutEffect(() => {
    if (reduced) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mobile = isMobileDevice();

      // === HEADER ANIMATIONS WITH SCRUB ===
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll("[data-word]");

        if (mobile) {
          // Mobile: simpler fade-in without 3D transforms
          gsap.fromTo(
            words,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.03,
              ease: "none",
              scrollTrigger: {
                trigger: titleRef.current,
                start: "top 90%",
                end: "top 50%",
                scrub: 0.5,
              },
            }
          );
        } else {
          // Desktop: full 3D animation with scrub
          gsap.fromTo(
            words,
            {
              opacity: 0,
              y: 50,
              rotateX: -20,
              transformPerspective: 1000,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              stagger: 0.05,
              ease: "none",
              scrollTrigger: {
                trigger: titleRef.current,
                start: "top 85%",
                end: "top 50%",
                scrub: 0.8,
              },
            }
          );
        }
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 90%",
              end: "top 55%",
              scrub: 0.5,
            },
          }
        );
      }

      // === COMPARISON CARDS WITH SCRUB ===
      if (compareRef.current && legacyCardRef.current && osCardRef.current) {
        if (!mobile) {
          gsap.set([legacyCardRef.current, osCardRef.current], {
            transformPerspective: 1200,
            transformStyle: "preserve-3d",
          });
        }

        // Legacy card animation
        gsap.fromTo(
          legacyCardRef.current,
          {
            x: mobile ? 0 : -60,
            opacity: 0,
            rotateY: mobile ? 0 : -10,
            scale: 0.95,
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: compareRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.6,
            },
          }
        );

        // OS card animation (slightly delayed via start position)
        gsap.fromTo(
          osCardRef.current,
          {
            x: mobile ? 0 : 60,
            opacity: 0,
            rotateY: mobile ? 0 : 10,
            scale: 0.95,
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: compareRef.current,
              start: "top 80%",
              end: "top 45%",
              scrub: 0.6,
              onEnter: () => setOsCardVisible(true),
            },
          }
        );

        // Animate bullet points with scrub
        const legacyBullets = legacyCardRef.current.querySelectorAll("[data-bullet]");
        const osBullets = osCardRef.current.querySelectorAll("[data-bullet]");

        gsap.fromTo(
          legacyBullets,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: compareRef.current,
              start: "top 70%",
              end: "top 40%",
              scrub: 0.5,
            },
          }
        );

        gsap.fromTo(
          osBullets,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: compareRef.current,
              start: "top 65%",
              end: "top 35%",
              scrub: 0.5,
            },
          }
        );
      }

      // === DASHBOARD SHOWCASE (desktop only, already hidden via CSS on mobile) ===
      if (dashboardRef.current && !mobile) {
        gsap.fromTo(
          dashboardRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: dashboardRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.8,
            },
          }
        );
      }

      // === PERSONA CARDS WITH SCRUB ===
      if (personasWrapRef.current) {
        const cards = personaRefs.current.filter(Boolean) as HTMLDivElement[];

        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: mobile ? 30 : 50,
            rotateX: mobile ? 0 : -8,
            transformPerspective: mobile ? undefined : 1000,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: personasWrapRef.current,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.6,
            },
          }
        );

        // Bullet points in persona cards
        cards.forEach((card) => {
          const bullets = card.querySelectorAll("[data-bullet]");
          gsap.fromTo(
            bullets,
            { opacity: 0, x: -8 },
            {
              opacity: 1,
              x: 0,
              stagger: 0.03,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 50%",
                scrub: 0.4,
              },
            }
          );
        });

        // Magnetic hover effect (desktop only)
        if (!mobile) {
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

                xTo(px * 10);
                yTo(py * 10);
                rotYTo(px * 8);
                rotXTo(-py * 8);
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
      }
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const titleWords = "A School OS is not just a school management system".split(" ");

  return (
    <section
      ref={sectionRef}
      data-section="school-os-clarity"
      className="relative overflow-hidden bg-neutral-950 px-4 py-20 md:px-8 md:py-32"
    >
      {/* WebGL Background (grid, particles, ripples, glows - all GPU-rendered) */}
      {!reduced && <SectionBackground isMobile={isMobile} />}

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
            {titleWords.map((word) => (
              <span key={word} data-word className="mr-[0.25em] inline-block last:mr-0">
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
                {legacyPoints.map((point) => (
                  <li key={point.text} data-bullet className="flex items-start gap-4">
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
                {osPoints.map((point) => (
                  <li key={point.text} data-bullet className="flex items-start gap-4">
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
