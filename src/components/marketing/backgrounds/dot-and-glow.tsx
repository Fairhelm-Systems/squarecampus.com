"use client";

import gsap from "gsap";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ShootingStar = {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
};

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

const Circles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const circle3Ref = useRef<HTMLDivElement>(null);

  // Mouse interaction for circles
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;

    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Normalize to -1 to 1
    const xNorm = (clientX / innerWidth - 0.5) * 2;
    const yNorm = (clientY / innerHeight - 0.5) * 2;

    // Each circle responds differently - parallax depth effect
    gsap.to(circle1Ref.current, {
      x: xNorm * 15,
      y: yNorm * 15,
      duration: 1.2,
      ease: "power2.out",
    });

    gsap.to(circle2Ref.current, {
      x: xNorm * -20,
      y: yNorm * -10,
      duration: 1.4,
      ease: "power2.out",
    });

    gsap.to(circle3Ref.current, {
      x: xNorm * 25,
      y: yNorm * -20,
      duration: 1.6,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Circle 1: Inner ring - fast pulse with rotation
      gsap.to(circle1Ref.current, {
        scale: 1.15,
        opacity: 0.6,
        rotation: 360,
        duration: 8,
        ease: "none",
        repeat: -1,
      });

      gsap.to(circle1Ref.current, {
        scale: 1.15,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Circle 2: Middle ring - slow breathing with counter-rotation
      gsap.to(circle2Ref.current, {
        rotation: -360,
        duration: 15,
        ease: "none",
        repeat: -1,
      });

      gsap.to(circle2Ref.current, {
        scale: 1.1,
        opacity: 0.5,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });

      // Circle 3: Outer ring - slowest, majestic movement
      gsap.to(circle3Ref.current, {
        rotation: 360,
        duration: 25,
        ease: "none",
        repeat: -1,
      });

      gsap.to(circle3Ref.current, {
        scale: 1.08,
        opacity: 0.4,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });

      // Add shimmer/glow pulse to all circles
      const circles = [circle1Ref.current, circle2Ref.current, circle3Ref.current];
      circles.forEach((circle, i) => {
        gsap.to(circle, {
          filter: `blur(${2 + i}px) brightness(1.3)`,
          duration: 2 + i * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        });
      });

    }, containerRef);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden"
    >
      {/* Inner circle - vibrant core */}
      <div
        ref={circle1Ref}
        className="pointer-events-none absolute inset-0 m-auto h-80 w-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(139,92,246,0.2) 40%, transparent 70%)",
          boxShadow: "0 0 60px rgba(99,102,241,0.3), inset 0 0 60px rgba(139,92,246,0.1)",
        }}
      />

      {/* Middle circle - ethereal glow */}
      <div
        ref={circle2Ref}
        className="pointer-events-none absolute inset-0 m-auto h-[24rem] w-[24rem] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(99,102,241,0.15) 50%, transparent 70%)",
          boxShadow: "0 0 80px rgba(59,130,246,0.2), inset 0 0 40px rgba(99,102,241,0.1)",
        }}
      />

      {/* Outer circle - ambient halo */}
      <div
        ref={circle3Ref}
        className="pointer-events-none absolute inset-0 m-auto h-[28rem] w-[28rem] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.25) 0%, rgba(59,130,246,0.1) 50%, transparent 75%)",
          boxShadow: "0 0 100px rgba(34,211,238,0.15), inset 0 0 50px rgba(59,130,246,0.05)",
        }}
      />

      {/* Particle dots orbiting */}
      <OrbitingParticles />
    </div>
  );
};

// Floating particles that orbit around the circles
const OrbitingParticles = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const particles = particlesRef.current?.querySelectorAll(".js-particle") ?? [];

      particles.forEach((particle, i) => {
        const radius = 150 + i * 40;
        const duration = 10 + i * 3;

        // Orbital motion
        gsap.to(particle, {
          motionPath: {
            path: `M ${radius},0 A ${radius},${radius} 0 1,1 ${radius - 0.01},0`,
            autoRotate: false,
          },
          duration: duration,
          ease: "none",
          repeat: -1,
          delay: i * 0.5,
        });

        // Twinkle effect
        gsap.to(particle, {
          opacity: 0.3,
          scale: 0.5,
          duration: 1 + Math.random(),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 2,
        });
      });
    }, particlesRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={particlesRef} className="absolute inset-0 m-auto flex h-0 w-0 items-center justify-center">
      {["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"].map((id, i) => (
        <div
          key={id}
          className="js-particle absolute h-1.5 w-1.5 rounded-full"
          style={{
            background: i % 2 === 0 ? "rgba(99,102,241,0.8)" : "rgba(34,211,238,0.8)",
            boxShadow: i % 2 === 0
              ? "0 0 10px rgba(99,102,241,0.6), 0 0 20px rgba(99,102,241,0.3)"
              : "0 0 10px rgba(34,211,238,0.6), 0 0 20px rgba(34,211,238,0.3)",
            transform: `rotate(${i * 45}deg) translateX(${150 + i * 25}px)`,
          }}
        />
      ))}
    </div>
  );
};

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

  useEffect(() => {
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
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  useEffect(() => {
    if (!star) return;
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

        return { ...prev, x: newX, y: newY, distance: newDistance, scale: newScale };
      });
      raf = requestAnimationFrame(moveStar);
    };

    raf = requestAnimationFrame(moveStar);
    return () => cancelAnimationFrame(raf);
  }, [star]);

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

export function BackgroundLines({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <Circles />
      <ShootingStars starColor="#7c3aed" trailColor="#38bdf8" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(59,130,246,0.08),transparent_45%)]" />
    </div>
  );
}
