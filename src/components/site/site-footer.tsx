import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { company, copyrightLine } from "@/content/company";
import {
  footerContact,
  footerGroups,
  footerSignals,
  siteCtas,
  socialLinks,
} from "@/content/site-content";
import { BrandLogo } from "./brand-logo";
import { ButtonLink } from "./button-link";
import { MobileExpand } from "./mobile-expand";

function DisclosureField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
        {label}
      </p>
      <div className="text-sm leading-6 text-[color:var(--muted-foreground)]">{children}</div>
    </div>
  );
}

/**
 * Statutory company disclosure. Section 12(3) of the Companies Act, 2013
 * requires the company's name, registered office, CIN, telephone and email on
 * its business letters and notices; the footer is the surface that carries it
 * on every page. It stays visible rather than collapsing behind a link — the
 * mobile disclosure above it is for navigation, not for this.
 */
function CompanyDisclosure() {
  return (
    <address className="grid gap-6 not-italic py-6 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr]">
      <DisclosureField label="Registered office">
        <p className="font-medium text-[color:var(--foreground)]">{company.legalName}</p>
        <p className="mt-1">{company.address.full}</p>
      </DisclosureField>
      <DisclosureField label="CIN">
        <p className="font-mono text-[0.78rem] tracking-tight text-[color:var(--foreground)]">
          {company.cin}
        </p>
        <p className="mt-1">{company.incorporationStatus}</p>
      </DisclosureField>
      <DisclosureField label="Contact">
        <a
          href={`mailto:${company.email.general}`}
          className="block transition-colors hover:text-[color:var(--foreground)]"
        >
          {company.email.general}
        </a>
        {company.phone ? (
          <a
            href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}
            className="mt-1 block transition-colors hover:text-[color:var(--foreground)]"
          >
            {company.phone}
          </a>
        ) : null}
      </DisclosureField>
    </address>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[color:var(--line)] px-4 pb-10 pt-16 sm:px-6 lg:px-8 lg:pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--line-strong)] to-transparent" />
        <div className="absolute left-[-8rem] top-14 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(83,117,194,0.1),transparent_68%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(83,117,194,0.14),transparent_70%)]" />
        <div className="absolute bottom-[-8rem] right-[-5rem] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(74,153,142,0.08),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(74,153,142,0.12),transparent_72%)]" />
        <div
          className="absolute inset-0 opacity-[0.18] dark:opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(91,111,140,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(91,111,140,0.08) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "linear-gradient(180deg, rgba(0,0,0,0.8), transparent 86%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="surface-panel-strong relative hidden overflow-hidden rounded-[2rem] px-6 py-10 sm:block lg:px-12 lg:py-14">
          {/* Decorative background layers */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(83,117,194,0.18),transparent_60%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(83,117,194,0.22),transparent_60%)]" />
            <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(74,153,142,0.12),transparent_62%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(74,153,142,0.16),transparent_64%)]" />
            <div
              className="absolute inset-0 opacity-[0.06] dark:opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, currentColor 0.5px, transparent 0.5px)",
                backgroundSize: "24px 24px",
                maskImage:
                  "radial-gradient(ellipse 70% 60% at 80% 20%, black 20%, transparent 70%)",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <p className="section-kicker">School OS for serious institutions</p>
              <h2 className="font-display text-3xl leading-[1.15] tracking-[-0.04em] sm:text-4xl lg:text-[2.6rem]">
                Run every campus. Govern them as one.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)]">
                SquareCampus brings admissions, academics, finance, communication, compliance, and
                daily operations into one dependable system of record.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                {footerSignals.map((signal) => (
                  <div
                    key={signal.label}
                    className="flex items-center gap-3 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3"
                  >
                    <svg
                      className="size-4 shrink-0 text-[color:var(--brand)]"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        opacity="0.3"
                      />
                      <circle cx="8" cy="8" r="3" fill="currentColor" />
                    </svg>
                    <div>
                      <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                        {signal.label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-[color:var(--foreground)]">
                        {signal.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <ButtonLink href={siteCtas.demoHref} label="Book a Guided Demo" />
              <ButtonLink href={siteCtas.loginHref} label="Log In" external variant="secondary" />
              <p className="mt-1 text-center font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[color:var(--muted-foreground)] lg:text-right">
                No commitment · 30-min walkthrough
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-8 border-b border-[color:var(--line)] pb-8 sm:mt-10 sm:gap-10 sm:pb-10 lg:grid-cols-[1fr_1.95fr] lg:gap-12">
          <div className="space-y-5">
            <BrandLogo subtitle="One login. One timeline. One truth." />
            <p className="hidden max-w-md text-sm leading-7 text-[color:var(--muted-foreground)] sm:block">
              Built for schools, colleges, and multi-campus institutions that need operational
              clarity without sacrificing reliability.
            </p>
            <div className="grid gap-2 text-sm text-[color:var(--muted-foreground)]">
              <a
                href={`mailto:${footerContact.sales}`}
                className="inline-flex items-center gap-2 hover:text-[color:var(--foreground)]"
              >
                <Mail className="size-4" />
                {footerContact.sales}
              </a>
              <div className="inline-flex items-center gap-2">
                <MapPin className="size-4" />
                {footerContact.location}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--surface-strong)] px-3 py-2 text-[0.7rem] font-mono uppercase tracking-[0.18em] text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--foreground)]"
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          <MobileExpand label="Explore all pages">
            <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-5 lg:gap-x-5">
              {footerGroups.map((group) => (
                <div key={group.title}>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
                    {group.title}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--foreground)]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </MobileExpand>
        </div>

        <CompanyDisclosure />

        <div className="flex flex-col gap-4 border-t border-[color:var(--line)] pt-6 text-sm text-[color:var(--muted-foreground)] sm:flex-row sm:items-start sm:justify-between">
          <div className="inline-flex items-center gap-3">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
              Built in India
            </span>
            <span className="h-1 w-1 rounded-full bg-[color:var(--muted-foreground)]/50" />
            <span>For institutions that cannot afford operational drift.</span>
          </div>
          <div className="sm:max-w-md sm:text-right">
            <p>{copyrightLine(new Date().getFullYear())}</p>
            <p className="mt-1">{company.trademarkNotice}</p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative hidden overflow-hidden pt-6 sm:block">
        <p className="select-none text-center font-display text-[4rem] uppercase tracking-[0.22em] text-[color:var(--foreground)]/[0.045] md:text-[5.5rem] lg:text-[7rem]">
          SquareCampus
        </p>
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[color:var(--background)] to-transparent" />
      </div>
    </footer>
  );
}
