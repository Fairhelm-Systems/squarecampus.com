import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
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
        "inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-all",
        variantClasses[variant],
        className
      )}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      <span>{label}</span>
      <ArrowRight className="size-4" />
    </Link>
  );
}
