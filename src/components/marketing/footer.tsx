"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  XTwitter,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

type FooterLink = {
  title: string;
  href: string;
  external?: boolean;
};

type FooterColumnProps = {
  title: string;
  links: FooterLink[];
  isOpen?: boolean;
  onToggle?: () => void;
};

function FooterColumn({ title, links, isOpen, onToggle }: FooterColumnProps) {
  return (
    <div className="flex flex-col">
      {/* Mobile: clickable header */}
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between py-3 text-left lg:cursor-default lg:py-0"
        aria-expanded={isOpen}
      >
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-white/80">
          {title}
        </p>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-white/50 transition-transform duration-200 lg:hidden",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Links - collapsible on mobile */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out lg:mt-5 lg:max-h-none lg:opacity-100",
          isOpen ? "mt-3 max-h-96 opacity-100" : "max-h-0 opacity-0 lg:opacity-100"
        )}
      >
        <ul className="space-y-3.5 pb-4 text-sm lg:pb-0">
          {links.map((link) => (
            <li key={link.title}>
              <Link
                className="group inline-flex items-center gap-1.5 text-neutral-400 transition-all duration-300 hover:text-white"
                href={link.href}
                {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                <span className="relative">
                  {link.title}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Footer() {
  // Track which sections are open on mobile (accordion-style, one at a time)
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Reorganized: Platform features
  const platformLinks: FooterLink[] = [
    { title: "Home", href: "/" },
    { title: "Features", href: "/features" },
    { title: "Ecosystem", href: "/ecosystem" },
    { title: "Why SquareCampus", href: "/why-squarecampus" },
    { title: "School Management System", href: "/school-management-system" },
    { title: "FAQs", href: "/faq" },
  ];

  // Reorganized: Company info + Security together
  const companyLinks: FooterLink[] = [
    { title: "About Us", href: "/about" },
    { title: "Careers", href: "/careers" },
    { title: "Blog", href: "/blog" },
    { title: "Press", href: "/press" },
  ];

  // Reorganized: Security & Trust as separate category
  const securityLinks: FooterLink[] = [
    { title: "Security", href: "/security" },
    { title: "Infrastructure", href: "/infrastructure" },
    { title: "PGP Key", href: "/pgp" },
    { title: "Data Processing", href: "/data-processing-addendum" },
  ];

  // Reorganized: All legal docs together
  const legalLinks: FooterLink[] = [
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Terms of Service", href: "/terms-of-service" },
    { title: "Acceptable Use", href: "/acceptable-use" },
    { title: "Competitor Notice", href: "/competitor-notice" },
  ];

  const footerSignals = [
    { label: "Uptime", value: "99.9%", color: "text-emerald-400" },
    { label: "Support", value: "24/7", color: "text-blue-400" },
    { label: "Data Centers", value: "India", color: "text-purple-400" },
  ];

  // Social links from environment variables with fallbacks
  const socialLinks = [
    {
      name: "LinkedIn",
      href:
        process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/square-campus",
      icon: Linkedin,
    },
    {
      name: "X",
      href: process.env.NEXT_PUBLIC_X_URL || "https://x.com/squarecampus",
      icon: XTwitter,
    },
    {
      name: "Instagram",
      href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/squarecampus",
      icon: Instagram,
    },
  ];

  return (
    <footer className="relative w-full overflow-hidden border-t border-white/[0.08] bg-neutral-950">
      {/* Background effects - Hidden on mobile for performance */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-[-20%] mx-auto h-[500px] w-[60rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.08),_transparent_70%)] opacity-70" />
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-blue-600/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-purple-600/[0.03] blur-[120px]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 lg:py-24">
        {/* Top Section - Brand + CTA */}
        <div className="mb-8 flex flex-col gap-6 border-b border-white/[0.06] pb-8 lg:mb-16 lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:pb-16">
          {/* Brand Block */}
          <div className="max-w-md space-y-4 lg:space-y-6">
            <Logo />
            <p className="text-sm leading-relaxed text-neutral-400 lg:text-base">
              The operating system for schools and colleges—bringing admissions, academics, finance,
              and communication into one dependable control center.
            </p>

            {/* Signal badges - More compact on mobile */}
            <div className="flex flex-wrap gap-2 pt-1 lg:gap-3 lg:pt-2">
              {footerSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="group relative overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.02] px-2.5 py-1.5 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04] lg:px-4 lg:py-2.5"
                >
                  <div className="flex items-center gap-2 lg:gap-3">
                    <span className={cn("text-sm font-bold lg:text-lg", signal.color)}>
                      {signal.value}
                    </span>
                    <span className="text-[0.55rem] font-medium uppercase tracking-[0.1em] text-neutral-500 lg:text-[0.65rem] lg:tracking-[0.15em]">
                      {signal.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Block - Simplified on mobile */}
          <div className="flex flex-col gap-3 rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-transparent p-4 lg:max-w-sm lg:gap-4 lg:rounded-2xl lg:p-6">
            <h3 className="text-base font-semibold text-white lg:text-lg">Ready to get started?</h3>
            <p className="hidden text-sm text-neutral-400 sm:block">
              Book a personalized demo and see how SquareCampus can transform your institution.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 lg:gap-3 lg:pt-2">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-all duration-300 hover:bg-neutral-200 lg:px-5 lg:py-2.5"
              >
                Book a Demo
              </Link>
              <Link
                href="https://app.squarecampus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/[0.15] bg-white/[0.03] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] lg:px-5 lg:py-2.5"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Middle Section - Navigation Grid (Collapsible on mobile) */}
        <div className="mb-8 divide-y divide-white/[0.06] lg:mb-16 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:gap-y-0 lg:divide-y-0">
          <FooterColumn
            title="Platform"
            links={platformLinks}
            isOpen={openSection === "platform"}
            onToggle={() => toggleSection("platform")}
          />
          <FooterColumn
            title="Company"
            links={companyLinks}
            isOpen={openSection === "company"}
            onToggle={() => toggleSection("company")}
          />
          <FooterColumn
            title="Security & Trust"
            links={securityLinks}
            isOpen={openSection === "security"}
            onToggle={() => toggleSection("security")}
          />
          <FooterColumn
            title="Legal"
            links={legalLinks}
            isOpen={openSection === "legal"}
            onToggle={() => toggleSection("legal")}
          />

          {/* Contact Column - Always visible but compact on mobile */}
          <div className="flex flex-col pt-3 lg:pt-0">
            <p className="py-3 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-white/80 lg:mb-5 lg:py-0">
              Contact
            </p>
            <ul className="space-y-3 pb-2 lg:space-y-3.5 lg:pb-0">
              <li>
                <a
                  href="mailto:contact@squarecampus.com"
                  className="group flex items-center gap-2.5 text-sm text-neutral-400 transition-colors duration-300 hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-neutral-500 transition-colors group-hover:text-white" />
                  <span>contact@squarecampus.com</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@squarecampus.com"
                  className="group flex items-center gap-2.5 text-sm text-neutral-400 transition-colors duration-300 hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-neutral-500 transition-colors group-hover:text-white" />
                  <span>support@squarecampus.com</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-neutral-400">
                <MapPin className="h-4 w-4 shrink-0 text-neutral-500" />
                <span>Bangalore, India</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4 lg:pt-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-neutral-400 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 md:flex-row lg:gap-6 lg:pt-10">
          <div className="flex items-center gap-3">
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.15em] text-neutral-500 lg:text-[0.7rem] lg:tracking-[0.2em]">
              Made with
            </span>
            <Heart className="h-3.5 w-3.5 text-red-500 lg:h-4 lg:w-4" aria-hidden="true" />
            <span className="text-xs font-medium text-neutral-300 lg:text-sm">in India</span>
          </div>

          <p className="text-center text-[0.7rem] leading-relaxed text-neutral-500 md:text-right lg:text-[0.75rem]">
            SquareCampus is a trademark of MDTechspire. © {new Date().getFullYear()} SquareCampus.
            All rights reserved.
          </p>
        </div>
      </div>

      {/* Watermark wordmark - Hidden on mobile, smaller on tablet */}
      <div className="relative hidden overflow-hidden pb-8 sm:block">
        <p className="pointer-events-none relative z-0 select-none text-center font-black uppercase text-transparent">
          <span
            className={cn(
              "bg-gradient-to-b from-neutral-800/50 via-neutral-800/30 to-transparent bg-clip-text",
              "text-5xl tracking-[0.08em]",
              "sm:text-6xl sm:tracking-[0.1em]",
              "md:text-7xl md:tracking-[0.12em]",
              "lg:text-8xl lg:tracking-[0.12em]",
              "xl:text-9xl xl:tracking-[0.15em]",
              "2xl:text-[10rem] 2xl:tracking-[0.15em]"
            )}
          >
            SquareCampus
          </span>
        </p>
        {/* Fade overlay for watermark */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-neutral-950 to-transparent" />
      </div>
    </footer>
  );
}
