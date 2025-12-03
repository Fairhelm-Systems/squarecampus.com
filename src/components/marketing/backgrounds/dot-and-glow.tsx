"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
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
    case 3:
    default:
      return { x: 0, y: offset, angle: 315 };
  }
}

const Circles = () => (
  <div className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden">
    <motion.div
      className="pointer-events-none absolute inset-0 m-auto h-80 w-80 rounded-full bg-gradient-to-b from-neutral-300/40 to-transparent to-[40%]"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 1, ease: "linear", repeat: Infinity, repeatDelay: 2 }}
    />
    <motion.div
      className="pointer-events-none absolute inset-0 m-auto h-[24rem] w-[24rem] rounded-full bg-gradient-to-b from-neutral-200/35 to-transparent to-[40%]"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 1, ease: "linear", repeat: Infinity, delay: 0.3, repeatDelay: 2 }}
    />
    <motion.div
      className="pointer-events-none absolute inset-0 m-auto h-[28rem] w-[28rem] rounded-full bg-gradient-to-b from-neutral-100/30 to-transparent to-[40%]"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 1, ease: "linear", repeat: Infinity, delay: 0.6, repeatDelay: 2 }}
    />
  </div>
);

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
    <svg className={cn("absolute inset-0 h-full w-full", className)}>
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