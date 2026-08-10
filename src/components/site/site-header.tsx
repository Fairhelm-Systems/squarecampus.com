"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNavigation, siteCtas } from "@/content/site-content";
import { cn } from "@/lib/utils";
import { BrandLogo } from "./brand-logo";
import { ButtonLink } from "./button-link";

export function SiteHeader() {
  const rawPathname = usePathname();
  // Static export serves trailing-slash URLs; hrefs are slash-less.
  const pathname = rawPathname.length > 1 ? rawPathname.replace(/\/+$/, "") : rawPathname;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close the mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "mx-auto max-w-6xl rounded-[1.75rem] px-4 py-3 transition-all duration-300 sm:px-5",
          scrolled
            ? "bg-[color:var(--surface-strong)]/90 shadow-[0_24px_60px_rgba(8,15,30,0.08)] backdrop-blur-xl dark:shadow-[0_28px_72px_rgba(0,0,0,0.38)]"
            : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between gap-2 xl:gap-3">
          {/* The subtitle is the widest part of the lockup; at lg the nav needs
              that space, so it returns at xl where the row has room again. */}
          <BrandLogo subtitleClassName="hidden xl:block" />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-full bg-[color:var(--surface-strong)]/88 p-1 shadow-[0_10px_28px_rgba(8,15,30,0.06)] backdrop-blur-lg dark:shadow-[0_18px_38px_rgba(0,0,0,0.26)] lg:flex"
          >
            {primaryNavigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    // Eight nav items plus the logo and the CTA only just fit
                    // the lg container, so the pills tighten there and relax
                    // at xl. Measured: 903 of 920px used at exactly 1024.
                    "whitespace-nowrap rounded-full px-2 py-2 text-[0.8125rem] transition-colors xl:px-4 xl:text-sm",
                    active
                      ? "bg-[color:var(--surface-muted)] text-[color:var(--foreground)]"
                      : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {/* nowrap: the header row is width-critical at lg, and a wrapped
                CTA label doubles the header height. */}
            <ButtonLink
              href={siteCtas.demoHref}
              label="Book a diagnosis"
              variant="cta"
              className="whitespace-nowrap"
            />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((value) => !value)}
              // size-11 = 44px: the minimum comfortable tap target.
              className="inline-flex size-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface-strong)] text-[color:var(--foreground)]"
            >
              {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
            </button>
          </div>
        </div>

        {open ? (
          <div
            id="mobile-navigation"
            className="mt-4 rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4 lg:hidden"
          >
            <nav aria-label="Primary (mobile)" className="grid gap-2">
              {primaryNavigation.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm transition-colors",
                      active
                        ? "bg-[color:var(--surface-muted)] text-[color:var(--foreground)]"
                        : "text-[color:var(--muted-foreground)] hover:bg-[color:var(--surface)] hover:text-[color:var(--foreground)]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 grid gap-2">
              <ButtonLink
                href={siteCtas.demoHref}
                label="Book a diagnosis"
                variant="cta"
                className="justify-center"
              />
              <ButtonLink
                href={siteCtas.loginHref}
                label="Sign In"
                external
                variant="secondary"
                className="justify-center"
              />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
