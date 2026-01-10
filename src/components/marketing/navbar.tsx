"use client";

import gsap from "gsap";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronRight } from "@/components/icons";
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
  { name: "Platform", link: "/#operations" },
  { name: "Features", link: "/#features" },
  { name: "Why Us", link: "/#why-different" },
  { name: "Ecosystem", link: "/#ecosystem" },
  { name: "FAQ", link: "/#faq" },
  { name: "Contact", link: "/contact-us" },
];

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
      y: visible ? 12 : 0,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [visible]);

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
    >
      <DesktopNav visible={visible} navItems={NAV_ITEMS} />
      <MobileNav visible={visible} navItems={NAV_ITEMS} />
    </div>
  );
};

const DesktopNav = ({ navItems, visible }: NavbarProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLElement | null>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Update indicator position on hover
  useEffect(() => {
    if (hovered !== null && linksRef.current[hovered]) {
      const link = linksRef.current[hovered];
      if (link) {
        setIndicatorStyle({
          left: link.offsetLeft,
          width: link.offsetWidth,
        });
      }
    }
  }, [hovered]);

  // Animate nav background on scroll
  useEffect(() => {
    if (!navRef.current) return;

    gsap.to(navRef.current, {
      backgroundColor: visible ? "rgba(10, 10, 10, 0.85)" : "rgba(0, 0, 0, 0)",
      borderColor: visible ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0)",
      boxShadow: visible
        ? "0 4px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset"
        : "none",
      backdropFilter: visible ? "blur(20px)" : "blur(0px)",
      duration: 0.4,
      ease: "power3.out",
    });
  }, [visible]);

  return (
    <nav
      ref={navRef}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden lg:flex w-full max-w-5xl items-center justify-between",
        "rounded-2xl border border-transparent px-3 py-2",
        "transition-all duration-300"
      )}
    >
      {/* Logo */}
      <Logo />

      {/* Center nav links */}
      <div className="relative flex items-center">
        <div className="relative flex items-center gap-0.5 rounded-xl bg-white/[0.03] px-1.5 py-1">
          {/* Sliding indicator */}
          <div
            className={cn(
              "absolute h-[calc(100%-8px)] rounded-lg bg-white/10 transition-all duration-300 ease-out",
              hovered === null ? "opacity-0" : "opacity-100"
            )}
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              top: "4px",
            }}
          />

          {navItems.map((item, idx) => (
            <Link
              key={item.name}
              ref={(el) => {
                linksRef.current[idx] = el;
              }}
              href={item.link}
              onMouseEnter={() => setHovered(idx)}
              className={cn(
                "relative px-3.5 py-2 text-[13px] font-medium tracking-wide",
                "text-neutral-400 transition-colors duration-200",
                hovered === idx && "text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Right side CTAs */}
      <div className="flex items-center gap-2">
        <LoginCta
          context="navbar-desktop"
          variant="secondary"
          className={cn(
            "items-center gap-1.5 text-[13px]",
            visible && "opacity-0 pointer-events-none w-0 overflow-hidden transition-all duration-300"
          )}
        />

        <BookCallCta
          context="navbar-desktop"
          label="Book demo"
          className="items-center gap-1.5 text-[13px]"
        />
      </div>
    </nav>
  );
};

const MobileNav = ({ navItems, visible }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Animate nav background on scroll
  useEffect(() => {
    if (!navRef.current) return;

    gsap.to(navRef.current, {
      backgroundColor: visible || open ? "rgba(10, 10, 10, 0.9)" : "rgba(0, 0, 0, 0)",
      borderColor: visible || open ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0)",
      boxShadow: visible || open
        ? "0 4px 30px rgba(0, 0, 0, 0.5)"
        : "none",
      backdropFilter: visible || open ? "blur(20px)" : "blur(0px)",
      duration: 0.3,
      ease: "power2.out",
    });
  }, [visible, open]);

  // Animate menu open/close
  useEffect(() => {
    if (!menuRef.current || !backdropRef.current) return;

    if (open) {
      gsap.set(menuRef.current, { display: "block" });
      gsap.set(backdropRef.current, { display: "block" });

      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -10, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" }
      );

      // Stagger link animations
      const links = menuRef.current.querySelectorAll("[data-nav-link]");
      gsap.fromTo(
        links,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: "power2.out", delay: 0.1 }
      );
    } else {
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (backdropRef.current) {
            gsap.set(backdropRef.current, { display: "none" });
          }
        },
      });

      gsap.to(menuRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.98,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (menuRef.current) {
            gsap.set(menuRef.current, { display: "none" });
          }
        },
      });
    }
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-40 hidden bg-black/60 backdrop-blur-sm lg:hidden"
        onClick={() => setOpen(false)}
      />

      <nav
        ref={navRef}
        className={cn(
          "relative z-50 flex w-full max-w-xl items-center justify-between",
          "rounded-2xl border border-transparent px-3 py-2 lg:hidden"
        )}
      >
        <Logo />

        {/* Hamburger button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((p) => !p)}
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-xl",
            "border border-white/10 bg-white/5",
            "text-neutral-300 transition-all duration-200",
            "hover:bg-white/10 hover:text-white",
            "active:scale-95",
            open && "bg-white/10 text-white"
          )}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Mobile menu panel */}
        <div
          ref={menuRef}
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 hidden rounded-2xl border border-white/10 bg-neutral-950/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          {/* Nav links */}
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                data-nav-link
                onClick={() => setOpen(false)}
                className={cn(
                  "group flex items-center justify-between rounded-xl px-4 py-3",
                  "text-sm font-medium text-neutral-300",
                  "transition-all duration-200",
                  "hover:bg-white/5 hover:text-white",
                  "active:scale-[0.98]"
                )}
              >
                <span>{item.name}</span>
                <ChevronRight
                  className="h-4 w-4 text-neutral-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-neutral-400"
                />
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* CTAs */}
          <div className="flex flex-col gap-2">
            <LoginCta
              context="navbar-mobile"
              variant="dark"
              className="flex w-full items-center justify-center gap-2 min-h-[48px] text-sm"
              onClick={() => setOpen(false)}
            />

            <BookCallCta
              context="navbar-mobile"
              label="Book a demo"
              className="flex w-full items-center justify-center gap-2 min-h-[48px] text-sm"
              onClick={() => setOpen(false)}
            />
          </div>

          {/* Subtle bottom decoration */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-neutral-600">
            <span className="h-1 w-1 rounded-full bg-emerald-500/50" />
            <span>School OS for modern institutions</span>
          </div>
        </div>
      </nav>
    </>
  );
};
