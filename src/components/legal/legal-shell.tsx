import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
    <main className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="section-kicker">Legal center</p>
          <div className="flex flex-col gap-2">
            <h1 className="font-display text-3xl tracking-[-0.05em] md:text-4xl">{title}</h1>
            {description && (
              <p className="text-sm leading-6 text-muted-foreground">{description}</p>
            )}
          </div>
          <nav className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
            {legalPageLinks.map((link) => {
              const isActive = link.title === currentPage;
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-center whitespace-nowrap rounded-full border px-4 py-2 text-center text-xs transition-colors",
                    isActive
                      ? "border-transparent bg-foreground text-background"
                      : "border-(--line) bg-(--surface) text-muted-foreground hover:text-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="surface-panel flex flex-col gap-8 rounded-[1.8rem] p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
          {children}
        </div>
      </div>
    </main>
  );
}

type LegalSectionProps = {
  title: string;
  id?: string;
  children: ReactNode;
};

export function LegalSection({ title, id, children }: LegalSectionProps) {
  return (
    <section className="flex flex-col gap-3" id={id}>
      <h2 className="font-display text-lg tracking-[-0.02em] text-foreground">{title}</h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
