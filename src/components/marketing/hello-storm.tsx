"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * A small battalion of greetings,
 * mostly from the Indian subcontinent,
 * all smuggled into Latin transliteration.
 */
const WORDS: string[] = [
    "Hello",       // English
    "नमस्ते",        // Hindi
    "নমস্কার",       // Bengali
    "வணக்கம்",   // Tamil
    "నమస్కారం",    // Telugu
    "नमस्कार",      // Marathi
    "નમસ્તે",       // Gujarati
    "ನಮಸ್ಕಾರ",    // Kannada
    "നമസ്കാരം", // Malayalam
    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", // Punjabi
    "ନମସ୍କାର",     // Odia
    "নমস্কাৰ",     // Assamese
    "आदाब",      // Kashmiri
    "नमस्कार",     // Konkani
    "ᱡᱚᱦᱟᱨ"      // Santali
  ];

type HelloStormProps = {
  /** Optional className for outer wrapper (e.g. to control height/layout). */
  className?: string;
};

/**
 * HelloStorm
 * ----------
 * A 16:9 field of operations where greetings appear from the void,
 * swell into focus, and vanish without leaving paperwork.
 *
 * The outer wrapper can fill the viewport, a section, or any layout.
 * The inner viewport is always 16:9, centered, black, and unforgiving.
 */
export const HelloStorm: React.FC<HelloStormProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /**
     * Deploy a single greeting into the 16:9 theater.
     * Position is randomized within the container bounds,
     * then animated in, then erased.
     */
    const deployWord = () => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const text = WORDS[Math.floor(Math.random() * WORDS.length)];
      const el = document.createElement("div");
      el.className = "hello-storm__word";
      el.textContent = text ?? ""; // Ensure textContent is never undefined
      container.appendChild(el);

      // Local coordinates within the 16:9 container.
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;

      // Initial state: distant, faint, blurred.
      gsap.set(el, {
        x,
        y,
        scale: 0.1,
        opacity: 0,
        filter: "blur(18px)"
      });

      // Emergence: sharp, fast, assertive.
      gsap.to(el, {
        duration: 0.35,
        opacity: 1,
        scale: 1.15,
        filter: "blur(0px)",
        ease: "power3.out",
        onComplete: () => {
          // Extraction: grow, blur, dissolve, erase evidence.
          gsap.to(el, {
            duration: 0.55,
            opacity: 0,
            scale: 1.7,
            filter: "blur(12px)",
            ease: "power2.in",
            onComplete: () => {
              el.remove();
            }
          });
        }
      });
    };

    /**
     * Initial burst — we never start slow.
     * A small volley to ensure the canvas is noisy immediately.
     */
    const warmupCount = 14;
    for (let i = 0; i < warmupCount; i++) {
      window.setTimeout(deployWord, i * 55);
    }

    /**
     * Continuous deployment — a heartbeat of chaos.
     */
    intervalRef.current = window.setInterval(deployWord, 130) as unknown as number;

    /**
     * Cleanup: clear intervals and scrub remaining nodes,
     * leaving nothing but a suspiciously quiet black rectangle.
     */
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }

      const children = Array.from(container.children);
      children.forEach((child) => {
        container.removeChild(child);
      });
    };
  }, []);

  return (
    <div className={`hello-storm ${className ?? ""}`}>
      <div ref={containerRef} className="hello-storm__viewport" />

      <style>{`
        .hello-storm {
          /* Outer shell — you can override via className */
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100vh;
          background: #000; /* Optional global black; change if needed */
        }

        .hello-storm__viewport {
          /* Inner stage — strictly 16:9, black, and hungry */
          position: relative;
          width: 100%;
          max-width: 960px;
          aspect-ratio: 16 / 9;
          background: #000;
          overflow: hidden;
          color: #fff;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
        }

        .hello-storm__word {
          position: absolute;
          white-space: nowrap;
          opacity: 0;
          filter: blur(8px);
          pointer-events: none;
          font-size: 2.6rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        @media (max-width: 600px) {
          .hello-storm__word {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HelloStorm;
