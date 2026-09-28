"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  ctaLabels,
  isNavGroup,
  type NavGroup,
  primaryNavigation,
  siteCtas,
} from "@/content/site-content";
import { cn } from "@/lib/utils";
import { BrandLogo } from "./brand-logo";
import { ButtonLink } from "./button-link";

/** Static export serves trailing-slash URLs; nav hrefs are slash-less. */
function normalise(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

function groupIsActive(group: NavGroup, pathname: string) {
  return group.links.some((link) => link.href === pathname);
}

/**
 * One desktop disclosure menu (the WAI "disclosure navigation" pattern): a
 * real <button> with aria-expanded that shows a plain list of links. No
 * floating-UI engine and no ARIA menu roles — these are navigation links, and
 * Tab, Enter and Escape behave exactly as they do everywhere else on the page.
 */
function NavDisclosure({
  group,
  pathname,
  open,
  onOpenChange,
}: {
  group: NavGroup;
  pathname: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const active = groupIsActive(group, pathname);
  const wide = group.links.length > 5;

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          onOpenChange(false);
          buttonRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        // Close when focus leaves the button and its panel entirely.
        if (open && !wrapperRef.current?.contains(event.relatedTarget as Node | null)) {
          onOpenChange(false);
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => onOpenChange(!open)}
        className={cn(
          "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm transition-colors xl:px-4",
          active || open
            ? "bg-[color:var(--surface-muted)] text-[color:var(--foreground)]"
            : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
        )}
      >
        {group.label}
        <ChevronDown
          aria-hidden
          className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className={cn(
          "absolute left-1/2 top-[calc(100%+0.75rem)] z-50 -translate-x-1/2 rounded-[1.4rem] border border-[color:var(--line-strong)] bg-[color:var(--surface-strong)] p-2 shadow-[0_24px_60px_rgba(8,15,30,0.14)] dark:shadow-[0_28px_72px_rgba(0,0,0,0.5)]",
          wide ? "w-[34rem]" : "w-[20rem]"
        )}
      >
        <ul className={cn("grid gap-0.5", wide && "grid-cols-2")}>
          {group.links.map((link) => {
            const current = link.href === pathname;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-[color:var(--surface-muted)] focus-visible:bg-[color:var(--surface-muted)]",
                    current && "bg-[color:var(--surface-muted)]"
                  )}
                >
                  <span className="block text-sm font-medium text-[color:var(--foreground)]">
                    {link.label}
                  </span>
                  {link.description ? (
                    <span className="mt-0.5 block text-[0.8125rem] leading-5 text-[color:var(--muted-foreground)]">
                      {link.description}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = normalise(usePathname());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close every menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // A pointer press anywhere outside the desktop nav closes an open group.
  useEffect(() => {
    if (!openGroup) {
      return;
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenGroup(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openGroup]);

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
            ref={navRef}
            aria-label="Primary"
            className="hidden items-center gap-0.5 rounded-full bg-[color:var(--surface-strong)]/88 p-1 shadow-[0_10px_28px_rgba(8,15,30,0.06)] backdrop-blur-lg dark:shadow-[0_18px_38px_rgba(0,0,0,0.26)] lg:flex"
          >
            {primaryNavigation.map((item) =>
              isNavGroup(item) ? (
                <NavDisclosure
                  key={item.label}
                  group={item}
                  pathname={pathname}
                  open={openGroup === item.label}
                  onOpenChange={(next) => setOpenGroup(next ? item.label : null)}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-2 text-sm transition-colors xl:px-4",
                    pathname === item.href
                      ? "bg-[color:var(--surface-muted)] text-[color:var(--foreground)]"
                      : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {/* nowrap: the header row is width-critical at lg, and a wrapped
                CTA label doubles the header height. */}
            <ButtonLink
              href={siteCtas.demoHref}
              label={ctaLabels.demo}
              variant="cta"
              className="whitespace-nowrap"
            />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((value) => !value)}
              // size-11 = 44px: the minimum comfortable tap target.
              className="inline-flex size-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface-strong)] text-[color:var(--foreground)]"
            >
              {mobileOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div
            id="mobile-navigation"
            className="mt-4 max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4 lg:hidden"
          >
            <nav aria-label="Primary (mobile)" className="grid gap-4">
              {primaryNavigation.map((item) =>
                isNavGroup(item) ? (
                  <div key={item.label}>
                    <p className="px-4 pb-1 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                      {item.label}
                    </p>
                    <ul className="grid">
                      {item.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            aria-current={pathname === link.href ? "page" : undefined}
                            className={cn(
                              "block rounded-2xl px-4 py-2.5 text-[0.95rem] transition-colors",
                              pathname === link.href
                                ? "bg-[color:var(--surface-muted)] text-[color:var(--foreground)]"
                                : "text-[color:var(--foreground)]/85 hover:bg-[color:var(--surface)]"
                            )}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "block rounded-2xl px-4 py-2.5 text-[0.95rem] font-medium transition-colors",
                      pathname === item.href
                        ? "bg-[color:var(--surface-muted)] text-[color:var(--foreground)]"
                        : "text-[color:var(--foreground)] hover:bg-[color:var(--surface)]"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
            <div className="mt-4 grid gap-2">
              <ButtonLink
                href={siteCtas.demoHref}
                label={ctaLabels.demo}
                variant="cta"
                className="justify-center"
              />
              <ButtonLink
                href={siteCtas.loginHref}
                label="Sign in"
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
