"use client";

import gsap from "gsap";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "@/components/icons";

import { cn } from "@/lib/utils";
import { BookCallCta, LoginCta } from "./ctas";
import { Logo } from "./logo";

type NavItem = {
  name: string;
  link: string;
};

interface NavbarProps {
  navItems: NavItem[];
  visible: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    name: "Platform",
    link: "/#operations",
  },
  {
    name: "Features",
    link: "/#features",
  },
  {
    name: "Why Us",
    link: "/#why-different",
  },
  {
    name: "Ecosystem",
    link: "/#ecosystem",
  },
  {
    name: "FAQ",
    link: "/#faq",
  },
  {
    name: "Contact",
    link: "/#contact-us",
  },
];

/*
   At street level, this bar is the lookout posted on the roof:
   always there, never loud, quietly tracking every movement below.
   When the operation starts – when the user scrolls – it tightens,
   sharpens, and becomes the command strip for the entire page.
*/
export const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: visible ? 8 : 0,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [visible]);

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-4"
    >
      <DesktopNav visible={visible} navItems={NAV_ITEMS} />
      <MobileNav visible={visible} navItems={NAV_ITEMS} />
    </div>
  );
};

/*
   Desktop navigation, the quiet control room.
   It starts wide and relaxed at the top of the page,
   then condenses into a focused pill once things get serious.
*/
const DesktopNav = ({ navItems, visible }: NavbarProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      backgroundColor: visible ? "rgba(10,10,10,0.92)" : "rgba(0,0,0,0)",
      borderColor: visible ? "rgba(120,120,133,0.45)" : "rgba(0,0,0,0)",
      boxShadow: visible
        ? "0 18px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)"
        : "none",
      backdropFilter: visible ? "blur(14px)" : "blur(0px)",
      duration: 0.35,
      ease: "power2.out",
    });
  }, [visible]);

  return (
    <nav
      ref={navRef}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden lg:flex w-full max-w-6xl items-center justify-between",
        "rounded-full border border-transparent px-4 py-2",
        "bg-transparent"
      )}
    >
      <div className="flex items-center gap-6">
        <Logo />
      </div>

      {/* Center nav links – the choreography of movement across the bar */}
      <div className="relative hidden flex-1 items-center justify-center lg:flex">
        <div className="flex items-center gap-1 rounded-full bg-neutral-900/60 px-2 py-1 text-sm">
          {navItems.map((item, idx) => (
            <Link
              key={item.name}
              href={item.link}
              onMouseEnter={() => setHovered(idx)}
              className={cn(
                "relative px-3 py-1.5 text-xs font-medium tracking-wide",
                "text-neutral-300 transition-colors duration-150 hover:text-white"
              )}
            >
              {hovered === idx && <span className="absolute inset-0 rounded-full bg-neutral-700" />}
              <span className="relative z-10">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Right side – authentication & call booking, the entry points into the operation */}
      <div className="flex items-center gap-3">
        {!visible && (
          <div>
            <LoginCta
              context="navbar-desktop"
              variant="secondary"
              className="inline-flex items-center gap-1.5"
            />
          </div>
        )}

        <BookCallCta
          context="navbar-desktop"
          className="hidden items-center gap-1.5 md:inline-flex"
        />
      </div>
    </nav>
  );
};

/*
   Mobile navigation, the field unit.
   Compact when idle, expands into a focused panel when opened.
   No drama, no layout explosions, just a clean vertical menu and two clear calls to action.
*/
const MobileNav = ({ navItems, visible }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      backgroundColor: visible ? "rgba(10,10,10,0.92)" : "rgba(0,0,0,0)",
      borderColor: visible ? "rgba(120,120,133,0.45)" : "rgba(0,0,0,0)",
      boxShadow: visible
        ? "0 18px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)"
        : "none",
      backdropFilter: visible ? "blur(14px)" : "blur(0px)",
      duration: 0.35,
      ease: "power2.out",
    });
  }, [visible]);

  useEffect(() => {
    if (!open || !menuRef.current) return;
    gsap.fromTo(
      menuRef.current,
      { opacity: 0, y: -6 },
      { opacity: 1, y: 4, duration: 0.2, ease: "power2.out" }
    );
  }, [open]);

  return (
    <nav
      ref={navRef}
      className={cn(
        "flex w-full max-w-xl items-center justify-between rounded-full",
        "border border-transparent px-4 py-2 lg:hidden"
      )}
    >
      <Logo />

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700/70 bg-neutral-900/80 text-neutral-100 active:scale-95 transition-transform"
        onClick={() => setOpen((p) => !p)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sliding panel – appears from the top with a soft drop */}
      {open && (
        <div
          ref={menuRef}
          className="absolute left-3 right-3 top-14 z-40 rounded-2xl border border-neutral-800 bg-neutral-950/98 px-4 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.85)]"
        >
          {/* Navigation Links */}
          <div className="flex flex-col gap-1 border-b border-neutral-800/50 pb-4 mb-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-neutral-300 transition-all hover:bg-neutral-800/50 hover:text-white active:scale-[0.98]"
              >
                <span>{item.name}</span>
                <span className="text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <LoginCta
              context="navbar-mobile"
              variant="secondary"
              className="flex w-full items-center justify-center gap-1.5 min-h-[44px]"
              onClick={() => setOpen(false)}
            />

            <BookCallCta
              context="navbar-mobile"
              className="flex w-full items-center justify-center gap-1.5 min-h-[44px]"
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </nav>
  );
};
