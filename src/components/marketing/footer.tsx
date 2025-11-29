import Link from "next/link";
import { Linkedin } from "lucide-react";
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
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-neutral-400">
        {title}
      </p>
      <ul className="space-y-3 text-sm text-neutral-300">
        {links.map((link) => (
          <li key={link.title}>
            <Link
              className="transition-colors hover:text-white"
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
    { title: "Home", href: "/#home" },
    { title: "Features", href: "/#features" },
    { title: "Ecosystem", href: "/#ecosystem" },
    { title: "FAQs", href: "/#faq" },
  ];

  const companyLinks: FooterLink[] = [
    { title: "About", href: "/about" },
    { title: "Blog", href: "/blog" },
    { title: "Careers", href: "/careers" },
    { title: "Press", href: "/press" },
  ];

  const legalLinks: FooterLink[] = [
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Terms of Service", href: "/terms-of-service" },
    { title: "Data Processing Addendum", href: "/data-processing-addendum" },
    { title: "Acceptable Use", href: "/acceptable-use" },
  ];

  const supportLinks: FooterLink[] = [
    { title: "Contact", href: "/#contact-us" },
    { title: "Login", href: "https://app.squarecampus.com" },
    { title: "Book a demo", href: "/#contact-us" },
    { title: "Support", href: "mailto:support@squarecampus.com" },
  ];

  // Only LinkedIn – the one public signal we actually use.
  const linkedInHref =
    "https://www.linkedin.com/company/square-campus";

  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-neutral-950 px-6 py-14 sm:px-8 lg:px-10 lg:py-20">
      {/* Soft radial glow behind the content – the last shimmer of the operation */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[-40%] z-0 mx-auto h-80 w-[40rem] rounded-full bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.24),_transparent_60%)] opacity-70" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        {/* Left block – identity + tagline + social */}
        <div className="space-y-5 md:max-w-sm">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <p className="text-sm leading-relaxed text-neutral-400">
            SquareCampus is the operating system for schools and colleges,
            bringing admissions, academics, finance, and communication into
            one dependable control center.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <Link
              href={linkedInHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-700/70 bg-neutral-900/70 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-neutral-200 transition-colors hover:border-neutral-300 hover:text-white"
            >
              <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
              <span>LinkedIn</span>
            </Link>
          </div>

          <p className="pt-2 text-xs text-neutral-500">
            © {new Date().getFullYear()} SquareCampus. All rights reserved.
          </p>
        </div>

        {/* Right block – navigation columns */}
        <div className="grid flex-1 grid-cols-2 gap-8 text-sm text-neutral-500 sm:grid-cols-3 md:grid-cols-4">
          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
          <FooterColumn title="Connect" links={supportLinks} />
        </div>
      </div>

      {/* Watermark wordmark – the name of the operation, fading into the floor */}
      <p className="pointer-events-none relative z-0 mt-14 text-center text-5xl font-bold uppercase tracking-[0.25em] text-transparent sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem]">
        <span className="bg-gradient-to-b from-neutral-900 to-neutral-800 bg-clip-text">
          SquareCampus
        </span>
      </p>
    </footer>
  );
}
