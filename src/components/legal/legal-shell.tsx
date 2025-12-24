import Link from "next/link";
import type { ReactNode } from "react";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { Card, CardContent } from "@/components/ui/card";

type LegalPageLink = {
  title: string;
  href: string;
};

export const legalPageLinks: LegalPageLink[] = [
  {
    title: "Terms of Service",
    href: "/terms-of-service",
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    title: "Data Processing Addendum",
    href: "/data-processing-addendum",
  },
  {
    title: "Acceptable Use",
    href: "/acceptable-use",
  },
  {
    title: "AI Policy",
    href: "/ai-policy",
  },
];

type LegalShellProps = {
  title: string;
  currentPage: string;
  description?: string;
  children: ReactNode;
};

export function LegalShell({ title, currentPage, description, children }: LegalShellProps) {
  return (
    <>
      <main className="bg-neutral-950 min-h-screen px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-muted-foreground/80">
              Legal Center
            </p>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold text-neutral-100 md:text-4xl">{title}</h1>
              {description && (
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              )}
            </div>
            <nav className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
              {legalPageLinks.map((link) => {
                const isActive = link.title === currentPage;
                return (
                  <Link
                    key={link.title}
                    href={link.href}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition
                      flex items-center justify-center text-center
                      ${
                        isActive
                          ? "border-transparent bg-white text-neutral-950 shadow-lg shadow-white/40"
                          : "border-neutral-800/60 text-neutral-300 hover:border-white hover:text-white"
                      }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </nav>
          </div>
          <Card className="border border-neutral-800/60 bg-neutral-900/60 shadow-2xl shadow-black/40">
            <CardContent className="space-y-8 text-sm leading-relaxed text-muted-foreground prose prose-sm md:prose-base dark:prose-invert">
              {children}
            </CardContent>
          </Card>
        </div>
      </main>
      <FloatingHomeButton href="/" label="Back to home" />
    </>
  );
}

type LegalSectionProps = {
  title: string;
  id?: string;
  children: ReactNode;
};

export function LegalSection({ title, id, children }: LegalSectionProps) {
  return (
    <section className="space-y-3" id={id}>
      <h2 className="text-base font-semibold text-neutral-100">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
