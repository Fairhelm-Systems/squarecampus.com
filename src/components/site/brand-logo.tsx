import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  subtitle?: string;
  iconSize?: number;
  framed?: boolean;
}

export function BrandLogo({
  className,
  subtitle = "School OS for India",
  iconSize = 44,
  framed = false,
}: BrandLogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative shrink-0",
          framed
            ? "overflow-hidden rounded-[1.1rem] border border-[color:var(--line-strong)] bg-[linear-gradient(135deg,rgba(83,117,194,0.12),transparent_65%)] shadow-[0_18px_36px_rgba(8,15,30,0.08)] dark:shadow-[0_18px_36px_rgba(0,0,0,0.34)]"
            : "drop-shadow-[0_14px_28px_rgba(8,15,30,0.12)] dark:drop-shadow-[0_14px_28px_rgba(0,0,0,0.34)]"
        )}
        style={{ width: iconSize, height: iconSize }}
      >
        <Image
          src="/images/marketing/logo-light.png"
          alt="SquareCampus"
          fill
          sizes={`${iconSize}px`}
          className="object-contain"
        />
      </span>
      <span className="min-w-0">
        <span className="block truncate font-display text-lg tracking-[-0.03em] text-[color:var(--foreground)]">
          SquareCampus
        </span>
        <span className="mt-0.5 block font-mono text-[0.58rem] uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
          {subtitle}
        </span>
      </span>
    </Link>
  );
}
