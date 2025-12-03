"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, LogIn, CalendarClock } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";

import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { LinkButton } from "./link-button";
import { useCalEmbed } from "@/hooks/useCalEmbed";
import { CONSTANTS } from "@/constants/links";

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

  // Use global scroll; tying a fixed element as target often leads to odd behaviour.
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Once we’re past 80px, the bar snaps into “command mode”.
    setVisible(latest > 80);
  });

  return (
    <motion.div
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-4"
      // Slight y-offset when active, feels like it floats above content.
      animate={{
        y: visible ? 8 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
    >
      <DesktopNav visible={visible} navItems={NAV_ITEMS} />
      <MobileNav visible={visible} navItems={NAV_ITEMS} />
    </motion.div>
  );
};

/*
   Desktop navigation, the quiet control room.
   It starts wide and relaxed at the top of the page,
   then condenses into a focused pill once things get serious.
*/
const DesktopNav = ({ navItems, visible }: NavbarProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const calOptions = useCalEmbed({
    namespace: CONSTANTS.CALCOM_NAMESPACE,
    styles: {
      branding: {
        brandColor: CONSTANTS.CALCOM_BRAND_COLOR,
      },
    },
    hideEventTypeDetails: CONSTANTS.CALCOM_HIDE_EVENT_TYPE_DETAILS,
    layout: CONSTANTS.CALCOM_LAYOUT,
  });

  return (
    <motion.nav
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden lg:flex w-full max-w-6xl items-center justify-between",
        "rounded-full border border-transparent px-4 py-2",
        "bg-transparent"
      )}
      animate={{
        backgroundColor: visible ? "rgba(10,10,10,0.92)" : "rgba(0,0,0,0)",
        borderColor: visible ? "rgba(120,120,133,0.45)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(14px)" : "blur(0px)",
        boxShadow: visible
          ? "0 18px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)"
          : "none",
      }}
      transition={{ type: "spring", stiffness: 220, damping: 32 }}
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
                "text-neutral-300 transition-colors duration-150"
              )}
            >
              {hovered === idx && (
                <motion.span
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 rounded-full bg-neutral-700"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

            {/* Right side – authentication & call booking, the entry points into the operation */}
            <div className="flex items-center gap-3">
        <AnimatePresence initial={false} mode="popLayout">
          {!visible && (
            <motion.div
              key="login-desktop"
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 60, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <LinkButton
                as={Link}
                href={CONSTANTS.LOGIN_LINK}
                variant="secondary"
                className="group inline-flex items-center gap-1.5"
              >
                <span>Login</span>
                {/* The subtle signal: a log-in icon that glides forward when hovered */}
                <LogIn
                  className="h-4 w-4 text-neutral-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </LinkButton>
            </motion.div>
          )}
        </AnimatePresence>

        <LinkButton
          data-cal-namespace={calOptions.namespace}
          data-cal-link={CONSTANTS.CALCOM_LINK}
          data-cal-config={`{"layout":"${calOptions.layout}"}`}
          as="button"
          variant="primary"
          className="group hidden items-center gap-1.5 md:inline-flex"
        >
          <span>Book a call</span>
          {/* The timing expert: a calendar that leans in as the user hovers */}
          <CalendarClock
            className="h-4 w-4 text-neutral-900 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-6"
            aria-hidden="true"
          />
        </LinkButton>
      </div>
    </motion.nav>
  );
};

/*
   Mobile navigation, the field unit.
   Compact when idle, expands into a focused panel when opened.
   No drama, no layout explosions, just a clean vertical menu and two clear calls to action.
*/
const MobileNav = ({ navItems, visible }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  const calOptions = useCalEmbed({
    namespace: CONSTANTS.CALCOM_NAMESPACE,
    styles: {
      branding: {
        brandColor: CONSTANTS.CALCOM_BRAND_COLOR,
      },
    },
    hideEventTypeDetails: CONSTANTS.CALCOM_HIDE_EVENT_TYPE_DETAILS,
    layout: CONSTANTS.CALCOM_LAYOUT,
  });

  return (
    <motion.nav
      className={cn(
        "flex w-full max-w-xl items-center justify-between rounded-full",
        "border border-transparent px-4 py-2 lg:hidden"
      )}
      animate={{
        backgroundColor: visible ? "rgba(10,10,10,0.92)" : "rgba(0,0,0,0)",
        borderColor: visible ? "rgba(120,120,133,0.45)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(14px)" : "blur(0px)",
        boxShadow: visible
          ? "0 18px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)"
          : "none",
      }}
      transition={{ type: "spring", stiffness: 220, damping: 32 }}
    >
      <Logo />

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700/70 bg-neutral-900/80 text-neutral-100"
        onClick={() => setOpen((p) => !p)}
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Sliding panel – appears from the top with a soft drop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 4 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-3 right-3 top-14 z-40 rounded-2xl border border-neutral-800 bg-neutral-950/98 px-4 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.85)]"
          >
                          <div className="mt-2 flex flex-col gap-2">
                <LinkButton
                  as={Link}
                  href={CONSTANTS.LOGIN_LINK}
                  variant="secondary"
                  className="group flex w-full items-center justify-center gap-1.5"
                  onClick={() => setOpen(false)}
                >
                  <span>Login</span>
                  <LogIn
                    className="h-4 w-4 text-neutral-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </LinkButton>

                <LinkButton
                  data-cal-namespace={calOptions.namespace}
                  data-cal-link={CONSTANTS.CALCOM_LINK}
                  data-cal-config={`{"layout":"${calOptions.layout}"}`}
                  as="button"
                  variant="primary"
                  className="group flex w-full items-center justify-center gap-1.5"
                  onClick={() => setOpen(false)}
                >
                  <span>Book a call</span>
                  <CalendarClock
                    className="h-4 w-4 text-neutral-900 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-6"
                    aria-hidden="true"
                  />
                </LinkButton>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
