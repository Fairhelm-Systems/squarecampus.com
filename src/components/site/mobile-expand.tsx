"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Progressive disclosure for phones: on small screens the children are
 * collapsed behind a "show" pill; from sm: up they always render. Content
 * stays in the DOM either way (hidden via CSS), so crawlers see everything.
 */
export function MobileExpand({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <div className={cn(!open && "hidden", "sm:block")}>{children}</div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "mt-1 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-(--line) bg-(--surface) px-5 text-sm font-medium text-foreground transition-colors active:bg-(--surface-muted) sm:hidden",
          open && "hidden"
        )}
      >
        {label}
        <ChevronDown className="size-4" />
      </button>
    </div>
  );
}
