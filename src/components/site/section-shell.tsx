import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionShellProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  align?: "left" | "center";
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function SectionShell({
  id,
  eyebrow,
  title,
  body,
  align = "left",
  children,
  className,
  contentClassName,
}: SectionShellProps) {
  return (
    <section id={id} className={cn("relative px-4 py-18 sm:px-6 lg:px-8 lg:py-24", className)}>
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || body) && (
          <div
            className={cn(
              "mb-10 max-w-3xl space-y-4 lg:mb-14",
              align === "center" && "mx-auto text-center"
            )}
          >
            {eyebrow ? <p className="section-kicker">{eyebrow}</p> : null}
            {title ? (
              <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            ) : null}
            {body ? (
              <p className="max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)] sm:text-lg">
                {body}
              </p>
            ) : null}
          </div>
        )}
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
}
