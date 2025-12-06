import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

/**
 * Identities are masks. This construct can appear as a hyperlink
 * when infiltration is required and as a button when brute force
 * is more appropriate.
 *
 * Rules of engagement:
 *  - presence of `href` promotes it to a covert anchor
 *  - absence degrades it to a button, dependable and lethal
 *
 * It keeps its glow, its swagger, and the dangerous suggestion
 * that clicking it might trigger events no one can reverse.
 */

type Variant = "primary" | "secondary" | "dark";

type Props = {
  variant?: Variant;
  children?: ReactNode;
  label?: string;
  className?: string;
} & (
  | ({ href: string } & ComponentProps<"a">)
  | (ComponentProps<"button"> & { href?: never })
);

const outerBase =
  "relative inline-flex cursor-pointer rounded-full p-px text-xs font-semibold leading-6 no-underline text-white shadow-2xl group";

const variantOuter: Record<Variant, string> = {
  primary: "shadow-zinc-900",
  secondary: "shadow-sky-900/60",
  dark: "shadow-black/80",
};

const innerBase =
  "relative z-10 flex items-center gap-2 rounded-full py-0.5 px-4 ring-1";

const variantInner: Record<Variant, string> = {
  primary: "bg-zinc-950 ring-white/10",
  secondary: "bg-slate-900 ring-sky-400/20",
  dark: "bg-black ring-white/5",
};

const glowBase =
  "absolute inset-0 rounded-full opacity-0 transition-opacity duration-500";

const variantGlow: Record<Variant, string> = {
  primary:
    "bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] group-hover:opacity-100",
  secondary:
    "bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.35)_0%,rgba(56,189,248,0)_75%)] group-hover:opacity-75",
  dark:
    "bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(148,163,184,0.35)_0%,rgba(148,163,184,0)_75%)] group-hover:opacity-60",
};

const trailBase =
  "absolute -bottom-px left-[1.125rem] h-px w-[calc(100%-2.25rem)] opacity-0 transition-opacity duration-500";

const variantTrail: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 group-hover:opacity-40",
  secondary:
    "bg-gradient-to-r from-sky-400/0 via-sky-400/90 to-sky-400/0 group-hover:opacity-35",
  dark:
    "bg-gradient-to-r from-zinc-400/0 via-zinc-400/80 to-zinc-400/0 group-hover:opacity-30",
};

export function LinkButton({
  variant = "primary",
  children,
  label,
  className,
  href,
  ...props
}: Props) {
  const content = children ?? <span>{label}</span>;

  const containerClass = cn(
    outerBase,
    variantOuter[variant],
    "group",
    className,
  );

  const innerClass = cn(innerBase, variantInner[variant]);
  const glowClass = cn(glowBase, variantGlow[variant]);
  const trailClass = cn(trailBase, variantTrail[variant]);

  /**
   * Identity shift:
   * We either deploy a hyperlink (for redirection),
   * or a button (for sabotage),
   * depending on which threat profile best suits the mission.
   */

  if (href) {
    return (
      <Link href={href} className={containerClass} {...(props as any)}>
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className={glowClass} />
        </span>

        <span className={innerClass}>{content}</span>

        <span className={trailClass} />
      </Link>
    );
  }

  return (
    <button className={containerClass} {...(props as any)}>
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className={glowClass} />
      </span>

      <span className={innerClass}>{content}</span>

      <span className={trailClass} />
    </button>
  );
}
