"use client";

import { MonitorCog, MoonStar, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const storageKey = "squarecampus-theme";

type Theme = "light" | "dark";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const nextTheme = root.classList.contains("dark") ? "dark" : "light";
    setTheme(nextTheme);
    setMounted(true);
  }, []);

  const updateTheme = (nextTheme: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("dark", nextTheme === "dark");
    root.dataset.theme = nextTheme;
    localStorage.setItem(storageKey, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      aria-label={
        mounted ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Toggle theme"
      }
      onClick={() => updateTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border px-3 text-sm transition-colors",
        "border-[color:var(--line)] bg-[color:var(--surface-strong)] text-[color:var(--foreground)]",
        "hover:border-[color:var(--line-strong)] hover:bg-[color:var(--surface)]",
        className
      )}
    >
      <span className="flex size-6 items-center justify-center rounded-full bg-[color:var(--surface-muted)] text-[color:var(--foreground)]">
        {mounted ? (
          theme === "dark" ? (
            <MoonStar className="size-3.5" />
          ) : (
            <SunMedium className="size-3.5" />
          )
        ) : (
          <MonitorCog className="size-3.5" />
        )}
      </span>
      <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em]">
        {mounted ? theme : "Theme"}
      </span>
    </button>
  );
}
