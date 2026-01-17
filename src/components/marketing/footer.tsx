"use client";

import Link from "next/link";
import { Heart, Linkedin } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

type FooterLink = {
  title: string;
  href: string;
};

type FooterColumnProps = {
  title: string;
  links: FooterLink[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="flex flex-col space-y-4">
      <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-neutral-500">
        {title}
      </p>
      <ul className="space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.title}>
            <Link
              className="text-neutral-400 transition-colors duration-200 hover:text-white"
              href={link.href}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const productLinks: FooterLink[] = [
    { title: "Home", href: "/" },
    { title: "Features", href: "/features" },
    { title: "Ecosystem", href: "/ecosystem" },
    { title: "Why SquareCampus", href: "/why-different" },
    { title: "School Management System", href: "/school-management-system" },
    { title: "FAQs", href: "/faq" },
  ];

  const companyLinks: FooterLink[] = [
    { title: "About", href: "/about" },
    { title: "Security", href: "/security" },
    { title: "Infrastructure", href: "/infrastructure" },
    { title: "PGP Key", href: "/pgp" },
    { title: "Blog", href: "/blog" },
    { title: "Careers", href: "/careers" },
    { title: "Press", href: "/press" },
  ];

  const legalLinks: FooterLink[] = [
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Terms of Service", href: "/terms-of-service" },
    { title: "Data Processing Addendum", href: "/data-processing-addendum" },
    { title: "Acceptable Use", href: "/acceptable-use" },
    { title: "Competitor Notice", href: "/competitor-notice" },
  ];

  const supportLinks: FooterLink[] = [
    { title: "Contact", href: "/contact-us" },
    { title: "Login", href: "https://app.squarecampus.com" },
    { title: "Book a demo", href: "/contact-us" },
    { title: "Support", href: "mailto:support@squarecampus.com" },
  ];

  const footerSignals = [
    { label: "Uptime", value: "Monitored", color: "text-emerald-400" },
    { label: "Go-live", value: "Guided", color: "text-blue-400" },
    { label: "Support", value: "Responsive", color: "text-purple-400" },
  ];

  const linkedInHref = "https://www.linkedin.com/company/square-campus";

  return (
    <footer className="relative w-full overflow-hidden border-t border-white/[0.06] bg-neutral-950 px-6 py-14 sm:px-8 lg:px-10 lg:py-20">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 bottom-[-40%] mx-auto h-80 w-[40rem] rounded-full bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.15),_transparent_60%)] opacity-70" />
        <div className="absolute left-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-blue-500/[0.03] blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-purple-500/[0.03] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        {/* Left block – identity + tagline + social */}
        <div className="space-y-5 md:max-w-sm">
          <div className="flex items-center gap-2">
            <Logo />
          </div>

          <p className="text-sm leading-relaxed text-neutral-400">
            SquareCampus is the operating system for schools and colleges, bringing admissions,
            academics, finance, and communication into one dependable control center.
          </p>

          {/* Signal badges */}
          <div className="flex flex-wrap gap-2">
            {footerSignals.map((signal) => (
              <div
                key={signal.label}
                className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5"
              >
                <span className="text-[0.55rem] font-medium uppercase tracking-[0.2em] text-neutral-500">
                  {signal.label}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span
                  className={cn(
                    "text-[0.6rem] font-semibold uppercase tracking-[0.15em]",
                    signal.color
                  )}
                >
                  {signal.value}
                </span>
              </div>
            ))}
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-4 pt-2">
            <Link
              href={linkedInHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-neutral-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              <Linkedin
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
              <span>LinkedIn</span>
            </Link>
          </div>

          {/* Made in India */}
          <div className="space-y-2 pt-3 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.25em] text-neutral-600">
                Made with
              </span>
              <Heart className="h-3.5 w-3.5 text-red-500" aria-hidden="true" />
              <span className="text-neutral-300">in India</span>
            </div>
            <p className="text-[0.7rem] leading-relaxed text-neutral-600">
              SquareCampus is a trademark of MDTechSpire. © {new Date().getFullYear()} SquareCampus.
              All rights reserved.
            </p>
          </div>
        </div>

        {/* Right block – navigation columns */}
        <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
          <FooterColumn title="Connect" links={supportLinks} />
        </div>
      </div>

      {/* Watermark wordmark */}
      <p className="pointer-events-none relative z-0 mt-14 select-none text-center font-extrabold uppercase text-transparent">
        <span
          className={cn(
            "bg-gradient-to-b from-neutral-700/60 to-neutral-800/40 bg-clip-text",
            "text-4xl tracking-[0.1em]",
            "sm:text-5xl sm:tracking-[0.15em]",
            "md:text-6xl md:tracking-[0.15em]",
            "lg:text-7xl lg:tracking-[0.15em]",
            "xl:text-8xl xl:tracking-[0.15em]",
            "2xl:text-9xl 2xl:tracking-[0.2em]"
          )}
        >
          SquareCampus
        </span>
      </p>
    </footer>
  );
}
