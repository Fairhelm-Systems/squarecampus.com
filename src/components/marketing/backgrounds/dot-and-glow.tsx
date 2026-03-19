"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Type definitions
type ShootingStarsProps = {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
};

type ShootingStar = {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
};

// Shared device detection hook
function useDeviceDetection() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      setIsMobileOrTablet(hasTouch || isSmallScreen);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return isMobileOrTablet;
}

// WebGL detection
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

// Vertex shader for the orbs
const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Fragment shader for animated gradient orbs
const fragmentShaderSource = `
  precision mediump float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_isMobile;

  // Circle parameters
  const int NUM_CIRCLES = 3;

  vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(6.28318 * (c * t + d));
  }

  float circle(vec2 uv, vec2 center, float radius, float blur) {
    float d = length(uv - center);
    return smoothstep(radius, radius - blur, d);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;

    // Mouse influence (desktop only)
    vec2 mouseInfluence = vec2(0.0);
    if (u_isMobile < 0.5) {
      mouseInfluence = (u_mouse * 2.0 - 1.0) * 0.1;
    }

    vec3 color = vec3(0.0);

    // Time-based animation speeds (slower on mobile)
    float timeScale = u_isMobile > 0.5 ? 0.3 : 1.0;
    float t = u_time * timeScale;

    // Circle 1 - Inner (purple/indigo)
    float size1 = u_isMobile > 0.5 ? 0.25 : 0.4;
    vec2 center1 = vec2(0.0) + mouseInfluence * 0.5;
    center1 += vec2(sin(t * 0.3) * 0.05, cos(t * 0.4) * 0.05);
    float c1 = circle(uv, center1, size1 + sin(t * 0.5) * 0.03, 0.4);
    vec3 col1 = vec3(0.388, 0.4, 0.945) * 0.4; // Indigo
    col1 += vec3(0.545, 0.361, 0.965) * 0.2 * sin(t * 0.7); // Purple pulse
    color += c1 * col1;

    // Circle 2 - Middle (blue)
    float size2 = u_isMobile > 0.5 ? 0.35 : 0.5;
    vec2 center2 = vec2(0.0) + mouseInfluence * -0.7;
    center2 += vec2(cos(t * 0.25) * 0.08, sin(t * 0.35) * 0.06);
    float c2 = circle(uv, center2, size2 + cos(t * 0.4) * 0.04, 0.5);
    vec3 col2 = vec3(0.231, 0.51, 0.965) * 0.35; // Blue
    color += c2 * col2;

    // Circle 3 - Outer (cyan)
    float size3 = u_isMobile > 0.5 ? 0.45 : 0.65;
    vec2 center3 = vec2(0.0) + mouseInfluence * 0.9;
    center3 += vec2(sin(t * 0.2) * 0.1, cos(t * 0.3) * 0.08);
    float c3 = circle(uv, center3, size3 + sin(t * 0.35) * 0.05, 0.6);
    vec3 col3 = vec3(0.133, 0.827, 0.933) * 0.25; // Cyan
    color += c3 * col3;

    // Add subtle color shift over time
    color += palette(t * 0.1 + length(uv) * 0.2) * 0.02;

    // Vignette
    float vignette = 1.0 - length(uv) * 0.4;
    color *= vignette;

    // Output with alpha
    float alpha = max(max(c1, c2), c3) * 0.8;
    gl_FragColor = vec4(color, alpha);
  }
`;

// Compile shader helper
function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

// Create program helper
function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

// WebGL-powered circles
const WebGLCircles = ({ isMobile }: { isMobile: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
    });
    if (!gl) return;

    // Compile shaders
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    // Set up geometry (full-screen quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    // Get attribute/uniform locations
    const positionLocation = gl.getAttribLocation(program, "a_position");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");
    const isMobileLocation = gl.getUniformLocation(program, "u_isMobile");

    // Resize handler
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2); // Cap DPR for performance
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse handler (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight, // Flip Y for WebGL
      };
    };
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Check reduced motion preference
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const startTime = performance.now();

    // Render loop
    const render = () => {
      const time = prefersReduced ? 0 : (performance.now() - startTime) / 1000;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // biome-ignore lint/correctness/useHookAtTopLevel: WebGL useProgram is not a React hook.
      gl.useProgram(program);

      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time);
      gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(isMobileLocation, isMobile ? 1.0 : 0.0);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

// Static fallback for devices without WebGL
const StaticNeonCircles = () => {
  return (
    <div className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden">
      {/* Inner circle - Indigo/Purple */}
      <div
        className="absolute h-48 w-48 rounded-full md:h-80 md:w-80"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(139,92,246,0.25) 40%, transparent 70%)",
          boxShadow: "0 0 80px rgba(99,102,241,0.4), 0 0 120px rgba(139,92,246,0.2)",
        }}
      />

      {/* Middle circle - Blue */}
      <div
        className="absolute h-64 w-64 rounded-full md:h-96 md:w-96"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(99,102,241,0.2) 50%, transparent 70%)",
          boxShadow: "0 0 100px rgba(59,130,246,0.3), 0 0 150px rgba(99,102,241,0.15)",
        }}
      />

      {/* Outer circle - Cyan */}
      <div
        className="absolute h-80 w-80 rounded-full md:h-[28rem] md:w-[28rem]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.3) 0%, rgba(59,130,246,0.15) 50%, transparent 75%)",
          boxShadow: "0 0 120px rgba(34,211,238,0.25), 0 0 180px rgba(59,130,246,0.1)",
        }}
      />
    </div>
  );
};

// Shooting stars (desktop only, uses requestAnimationFrame)
function getRandomStartPoint() {
  const side = Math.floor(Math.random() * 4);
  const offset = Math.random() * window.innerWidth;

  switch (side) {
    case 0:
      return { x: offset, y: 0, angle: 45 };
    case 1:
      return { x: window.innerWidth, y: offset, angle: 135 };
    case 2:
      return { x: offset, y: window.innerHeight, angle: 225 };
    default:
      return { x: 0, y: offset, angle: 315 };
  }
}

const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 26,
  minDelay = 900,
  maxDelay = 2200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 12,
  starHeight = 1,
  className,
}) => {
  const [star, setStar] = useState<ShootingStar | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const activeRef = useRef<boolean>(true);
  const isMobileOrTablet = useDeviceDetection();

  useEffect(() => {
    // Disable shooting stars on mobile/tablet for performance
    if (isMobileOrTablet) return;

    const scheduleStar = () => {
      if (!activeRef.current) return;
      const { x, y, angle } = getRandomStartPoint();
      setStar({
        id: Date.now(),
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      });

      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      timeoutRef.current = window.setTimeout(scheduleStar, randomDelay);
    };

    scheduleStar();

    return () => {
      activeRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [minSpeed, maxSpeed, minDelay, maxDelay, isMobileOrTablet]);

  useEffect(() => {
    if (!star || isMobileOrTablet) return;
    let raf: number;

    const moveStar = () => {
      setStar((prev) => {
        if (!prev) return null;
        const newX = prev.x + prev.speed * Math.cos((prev.angle * Math.PI) / 180);
        const newY = prev.y + prev.speed * Math.sin((prev.angle * Math.PI) / 180);
        const newDistance = prev.distance + prev.speed;
        const newScale = 1 + newDistance / 120;

        if (
          newX < -40 ||
          newX > window.innerWidth + 40 ||
          newY < -40 ||
          newY > window.innerHeight + 40
        ) {
          return null;
        }

        return {
          ...prev,
          x: newX,
          y: newY,
          distance: newDistance,
          scale: newScale,
        };
      });
      raf = requestAnimationFrame(moveStar);
    };

    raf = requestAnimationFrame(moveStar);
    return () => cancelAnimationFrame(raf);
  }, [star, isMobileOrTablet]);

  // Don't render on mobile/tablet
  if (isMobileOrTablet) return null;

  return (
    <svg className={cn("absolute inset-0 h-full w-full", className)} aria-hidden="true">
      <title>Shooting stars background animation</title>
      {star && (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill="url(#hero-star-gradient)"
          transform={`rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2}, ${star.y + starHeight / 2})`}
        />
      )}
      <defs>
        <linearGradient id="hero-star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Main background component with WebGL detection
const Circles = () => {
  const webglSupported = useWebGLSupport();
  const isMobileOrTablet = useDeviceDetection();

  // Show nothing until we detect support
  if (webglSupported === null) {
    return null;
  }

  // WebGL supported - use GPU-accelerated version
  if (webglSupported) {
    return <WebGLCircles isMobile={isMobileOrTablet} />;
  }

  // Fallback to static neon circles
  return <StaticNeonCircles />;
};

export function BackgroundLines({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {isVisible && <Circles />}
      {isVisible && <ShootingStars starColor="#7c3aed" trailColor="#38bdf8" />}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(59,130,246,0.08),transparent_45%)]" />
    </div>
  );
}
