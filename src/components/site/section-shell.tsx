import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./marketing";

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
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          body={body}
          align={align}
          className="mb-6 sm:mb-10 lg:mb-14"
          bodyClassName={cn(compactBody && "hidden sm:block")}
        />
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
}
