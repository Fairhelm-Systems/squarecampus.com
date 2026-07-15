import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost" | "cta";
  external?: boolean;
  className?: string;
};

const variantClasses: Record<NonNullable<ButtonLinkProps["variant"]>, string> = {
  primary:
    "border-transparent bg-[color:var(--foreground)] text-[color:var(--background)] hover:opacity-92",
  secondary:
    "border-[color:var(--line-strong)] bg-[color:var(--surface-strong)] text-[color:var(--foreground)] hover:bg-[color:var(--surface)]",
  ghost:
    "border-transparent bg-transparent text-[color:var(--foreground)] hover:bg-[color:var(--surface-muted)]",
  cta: "cta-button border-transparent text-white",
};

export function ButtonLink({
  href,
  label,
  variant = "primary",
  external = false,
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/button inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-all",
        variantClasses[variant],
        className
      )}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      <span>{label}</span>
      <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
    </Link>
  );
}
