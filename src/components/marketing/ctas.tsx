"use client";

import { useCallback } from "react";
import { CalendarClock, LogIn } from "@/components/icons";

import { CONSTANTS } from "@/constants/links";
import { useCalEmbed } from "@/hooks/useCalEmbed";
import { cn } from "@/lib/utils";
import { LinkButton } from "./link-button";

type CtaIntent = "book-call" | "login";

type BaseCtaProps = {
  context: string;
  className?: string;
  onClick?: () => void;
};

type BookCallProps = BaseCtaProps & {
  label?: string;
  variant?: "primary" | "secondary" | "dark";
};

type LoginProps = BaseCtaProps & {
  label?: string;
  variant?: "secondary" | "dark";
  href?: string;
};

const trackCta = (intent: CtaIntent, context: string) => {
  if (typeof window === "undefined") return;

  const payload = {
    event: "cta_click",
    intent,
    context,
    ts: Date.now(),
  };

  // Fire into common analytics buckets if they exist; fail silently to avoid UX hits.
  const w = window as any;
  w?.dataLayer?.push?.(payload);
  w?.analytics?.track?.("CTA Clicked", payload);
};

export function BookCallCta({
  context,
  className,
  onClick,
  label = "Book a call",
  variant = "primary",
}: BookCallProps) {
  const calOptions = useCalEmbed({
    namespace: CONSTANTS.CALCOM_NAMESPACE,
    styles: {
      branding: { brandColor: CONSTANTS.CALCOM_BRAND_COLOR },
    },
    hideEventTypeDetails: CONSTANTS.CALCOM_HIDE_EVENT_TYPE_DETAILS,
    layout: CONSTANTS.CALCOM_LAYOUT,
  });

  const handleClick = useCallback(() => {
    trackCta("book-call", context);
    onClick?.();
  }, [context, onClick]);

  return (
    <LinkButton
      data-cal-namespace={calOptions.namespace}
      data-cal-link={CONSTANTS.CALCOM_LINK}
      data-cal-config={`{"layout":"${calOptions.layout}"}`}
      variant={variant}
      className={cn("group inline-flex items-center gap-1.5", className)}
      onClick={handleClick}
      type="button"
    >
      <span>{label}</span>
      <CalendarClock
        className="h-4 w-4 text-neutral-300 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-6"
        aria-hidden="true"
      />
    </LinkButton>
  );
}

export function LoginCta({
  context,
  className,
  onClick,
  label = "Login",
  variant = "dark",
  href = CONSTANTS.LOGIN_LINK,
}: LoginProps) {
  const handleClick = useCallback(() => {
    trackCta("login", context);
    onClick?.();
  }, [context, onClick]);

  return (
    <LinkButton
      href={href}
      variant={variant}
      className={cn("group inline-flex items-center gap-1.5", className)}
      onClick={handleClick}
    >
      <span>{label}</span>
      <LogIn
        className="h-4 w-4 text-neutral-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </LinkButton>
  );
}
