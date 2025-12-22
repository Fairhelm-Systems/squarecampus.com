"use client";

import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

type MotionProps = {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  whileInView?: Record<string, unknown>;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string;
    repeat?: number;
    repeatDelay?: number;
  };
  whileHover?: Record<string, unknown>;
  whileTap?: Record<string, unknown>;
  viewport?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  layoutId?: string;
  layout?: string | boolean;
};

const mapTransition = (transition?: MotionProps["transition"]) => {
  if (!transition) return {};
  return {
    duration: transition.duration,
    delay: transition.delay,
    ease: transition.ease ?? "power2.out",
    repeat: transition.repeat ?? 0,
    repeatDelay: transition.repeatDelay ?? 0,
    yoyo: transition.repeat ? true : false,
  };
};

const sanitizeVars = (vars?: Record<string, unknown>) => {
  if (!vars) return {};
  const entries = Object.entries(vars).map(([key, value]) => {
    if (Array.isArray(value)) {
      return [key, value[value.length - 1]];
    }
    return [key, value];
  });
  return Object.fromEntries(entries);
};

const createMotionComponent = (tag: string) => {
  const Component = ({ ...props }: MotionProps & Record<string, unknown>, ref: any) => {
    const {
      initial,
      animate,
      transition,
      whileHover,
      whileTap,
      whileInView,
      viewport,
      exit,
      layoutId,
      layout,
      ...rest
    } = props;
    const localRef = useRef<HTMLElement | SVGElement | null>(null);

    useEffect(() => {
      const el = localRef.current;
      if (!el || (!animate && !initial)) return;

      if (initial) {
        gsap.set(el, sanitizeVars(initial) as gsap.TweenVars);
      }

      if (animate) {
        gsap.to(el, { ...(sanitizeVars(animate) as gsap.TweenVars), ...mapTransition(transition) });
      }
    }, [animate, initial, transition]);

    useEffect(() => {
      const el = localRef.current;
      if (!el || !whileInView) return;

      const threshold =
        typeof viewport?.amount === "number"
          ? viewport.amount
          : typeof viewport?.amount === "string"
            ? 0.2
            : 0.2;
      const once = viewport?.once !== false;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            gsap.to(el, {
              ...(sanitizeVars(whileInView) as gsap.TweenVars),
              ...mapTransition(transition),
            });
            if (once) observer.disconnect();
          });
        },
        { threshold }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, [whileInView, transition, viewport]);

    const setRef = (node: HTMLElement | SVGElement | null) => {
      localRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    return React.createElement(tag, { ref: setRef, ...rest });
  };

  return React.forwardRef(Component);
};

export const motion = new Proxy(
  {},
  {
    get: (_, tag: string) => createMotionComponent(tag),
  }
) as Record<string, React.FC<any>>;

export const AnimatePresence = ({
  children,
}: {
  children: React.ReactNode;
  mode?: string;
  initial?: boolean;
}) => <>{children}</>;

export const useInView = (
  ref: React.RefObject<Element | null>,
  { amount = 0.2, once = true }: { amount?: number; once?: boolean } = {}
) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold: amount }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, amount, once]);

  return inView;
};
