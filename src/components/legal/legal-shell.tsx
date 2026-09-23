import Link from "next/link";
import type { ReactNode } from "react";
import { company } from "@/content/company";
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
  {
    title: "Cancellation & Refunds",
    href: "/refund-policy",
  },
];

/**
 * The entity paragraph that opens every legal document: who is actually
 * bound, with the statutory particulars a reader needs to identify and reach
 * the company. `documentNoun` is how the page refers to itself ("this
 * Policy", "these Terms", "this DPA"), so the sentence reads naturally.
 */
export function EntityIdentity({ documentNoun }: { documentNoun: string }) {
  return (
    <>
      <p>
        {company.trademarkNotice} All services are provided by {company.legalNameDisplay}, unless
        otherwise stated in a written agreement or order form.
      </p>
      <p>
        References to "SquareCampus" in {documentNoun} mean {company.legalNameDisplay}.
      </p>
      <address className="not-italic rounded-[1.2rem] border border-(--line) bg-(--surface) p-4 text-sm leading-6">
        <span className="block font-medium text-foreground">{company.legalName}</span>
        <span className="mt-1 block">Registered office: {company.address.full}</span>
        <span className="mt-1 block">
          CIN: <span className="font-mono text-[0.8rem]">{company.cin}</span> ·{" "}
          {company.incorporationStatus}
        </span>
        <span className="mt-1 block">
          GSTIN: <span className="font-mono text-[0.8rem]">{company.gstin}</span> · Registered under
          the Goods and Services Tax, Karnataka
        </span>
        <span className="mt-1 block">
          Email:{" "}
          <a href={`mailto:${company.email.general}`} className="hover:text-foreground">
            {company.email.general}
          </a>
          {company.phone ? (
            <>
              {" · "}
              Telephone:{" "}
              <a
                href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}
                className="hover:text-foreground"
              >
                {company.phone}
              </a>
            </>
          ) : null}
        </span>
      </address>
    </>
  );
}

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
