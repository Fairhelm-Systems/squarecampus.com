import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionShellProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  /** Hide the body copy on phones (used when the section content is behind a MobileExpand). */
  compactBody?: boolean;
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
  compactBody = false,
  align = "left",
  children,
  className,
  contentClassName,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("relative px-4 py-9 sm:px-6 sm:py-16 lg:px-8 lg:py-24", className)}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || body) && (
          <div
            className={cn(
              "mb-6 max-w-3xl space-y-3 sm:mb-10 sm:space-y-4 lg:mb-14",
              align === "center" && "mx-auto text-center"
            )}
          >
            {eyebrow ? <p className="section-kicker">{eyebrow}</p> : null}
            {title ? (
              <h2 className="font-display text-[1.65rem] leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            ) : null}
            {body ? (
              <p
                className={cn(
                  "max-w-2xl text-[0.95rem] leading-7 text-[color:var(--muted-foreground)] sm:text-lg",
                  compactBody && "hidden sm:block"
                )}
              >
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
