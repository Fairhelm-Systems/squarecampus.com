import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { BookCallCta, LoginCta } from "@/components/marketing/ctas";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO_CONFIG, createBreadcrumbSchema, createWebPageSchema } from "@/lib/seo";

const faqItems = [
  {
    question: "What is a school management system?",
    answer:
      "A school management system is a unified platform that runs daily operations like admissions, attendance, fees, exams, communication, and compliance. SquareCampus is a school management system designed specifically for Indian schools so every stakeholder works from one source of truth.",
  },
  {
    question: "How is SquareCampus different from legacy school ERPs?",
    answer:
      "Legacy ERPs bolt modules together and feel like eight products that do not talk to each other. SquareCampus is architected as one operating system—shared database, consistent workflows, faster launches, and human support included.",
  },
  {
    question: "Does SquareCampus handle Indian fee structures and compliance?",
    answer:
      "Yes. We support complex fee terms, concessions, transport, late fees, GST, audit exports, and compliance-friendly audit trails. Multi-campus structures are built-in, not custom scripts.",
  },
  {
    question: "How fast can we go live?",
    answer:
      "Most schools launch in 7–14 days. We import historical data, run a parallel dry run, train admins and teachers, and then flip production with a rollback plan ready.",
  },
  {
    question: "Is there a mobile experience for parents and staff?",
    answer:
      "Yes. Parents get attendance, fees, transport, messages, and results in one app. Staff handle attendance, approvals, communication, and tasks without desktop friction.",
  },
  {
    question: "How is data secured inside the school management system?",
    answer:
      "Role-based access, scoped permissions, SSO readiness, encryption in transit and at rest, activity logs, and export controls keep data safe. Every action is traceable.",
  },
  {
    question: "What does pricing look like?",
    answer:
      "Transparent, all-inclusive pricing based on students and staff. No per-module surprises, no hidden mobile fees, and implementation plus training are included.",
  },
  {
    question: "Can SquareCampus integrate with our existing tools?",
    answer:
      "Yes. We support SIS/finance exports, webhooks, and targeted integrations. If a critical integration is missing, we scope and ship it with clear timelines.",
  },
  {
    question: "Will teachers and admins need heavy training?",
    answer:
      "No. Interfaces follow existing workflows, not abstract menus. We deliver role-based onboarding, videos, and live sessions until adoption is steady.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function SchoolManagementSystemPage() {
  const pageUrl = `${SEO_CONFIG.baseUrl}/school-management-system`;
  const pageName = "School Management System for Indian Schools";
  const pageDescription =
    "SquareCampus is a school management system built for Indian schools—fees, attendance, exams, communication, and compliance in one unified operating system.";

  const webPageSchema = createWebPageSchema({
    name: pageName,
    description: pageDescription,
    url: pageUrl,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SEO_CONFIG.baseUrl },
    { name: "School Management System", url: pageUrl },
  ]);

  return (
    <>
      <main className="bg-neutral-950 text-white">
        <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-neutral-950 via-neutral-900/40 to-neutral-950 px-6 pb-16 pt-28 sm:px-8 lg:px-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-10 top-10 h-60 w-60 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-blue-500/15 blur-[120px]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>

          <div className="relative mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-200">
                School Management System
              </p>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-[54px]">
                School Management System for Indian Schools
              </h1>
              <div className="space-y-3 text-lg leading-relaxed text-neutral-200 md:text-xl">
                <p>
                  A school management system should be the operating manual of your campus—not a
                  stack of disconnected tools. SquareCampus is a school management system that
                  defines, runs, and audits daily operations for Indian schools in one place:
                  admissions, attendance, fees, exams, communication, transport, and compliance live
                  together so nothing slips.
                </p>
                <p>
                  If this page vanished, Google should feel a hole in the matrix. Start here, ship
                  fast, and let every other page point back to this crown.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <BookCallCta context="sms-hero" label="Book a call" variant="primary" />
                <LoginCta context="sms-hero" variant="dark" />
                <Link
                  href="/#operations"
                  className="text-sm font-semibold text-emerald-200 underline-offset-4 hover:text-white hover:underline"
                >
                  See how the workflows connect
                </Link>
              </div>
            </div>

            <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-transparent" />
              <div className="relative space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">
                  One view, zero chaos
                </p>
                <p className="text-neutral-200">
                  Admins, teachers, and finance teams share the same source of truth. No swivel
                  chairing, no manual reconciliations, no “who updated this?” mysteries.
                </p>
                <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
                  <Image
                    src="https://cdn.squarecampus.in/application_files/logo-light.png"
                    alt="SquareCampus school management system dashboard preview for Indian schools"
                    width={960}
                    height={540}
                    className="h-auto w-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { label: "Time to launch", value: "7-14 days" },
                    { label: "Modules included", value: "All" },
                    { label: "Support", value: "Human + product" },
                  ].map((item) => (
                    <Card key={item.label} className="border-white/10 bg-white/5 text-left">
                      <CardContent className="space-y-1.5 p-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                          {item.label}
                        </p>
                        <p className="text-lg font-semibold text-white">{item.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 sm:px-8 lg:px-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">What is a School Management System?</h2>
            <p className="text-lg leading-relaxed text-neutral-300">
              It is the operating core that coordinates academics, finance, and communication. A
              true school management system connects attendance with fees, ties assessments to
              promotion decisions, and keeps parents and staff aligned without duplicate data entry.
              SquareCampus treats this definition as engineering spec, not marketing copy.
            </p>
          </div>

          <div className="grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 lg:grid-cols-3">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-white">
                Why Schools Need a Unified School Management System
              </h3>
              <p className="text-neutral-300">
                Fragmented tools create data drift, parent confusion, and audit risk. A unified OS
                keeps every update consistent, triggers the right follow-up, and makes compliance a
                side-effect of normal work—not an afterthought.
              </p>
            </div>
            <div className="space-y-2 text-neutral-200">
              <p>✔ Attendance flows directly into fee rules and reports.</p>
              <p>✔ Communication is tied to context—class, term, fee status, or incident.</p>
              <p>✔ Exams, grading, and promotions stay in sync with academic calendars.</p>
              <p>✔ Transport, hostels, and inventory stay reconciled without extra spreadsheets.</p>
              <p>✔ Every action is logged for admins, auditors, and compliance reviewers.</p>
            </div>
            <div className="space-y-2 text-neutral-200">
              <p>✔ Parents see one story: attendance, dues, announcements, and results.</p>
              <p>✔ Staff permissions are scoped by role, location, and workflow step.</p>
              <p>✔ Leadership tracks trends in collections, learning, and risk in one place.</p>
              <p>✔ Support teams get context-rich timelines instead of tickets without history.</p>
              <p>✔ Each module improves the others because they share one data model.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">
              Modules Inside SquareCampus (Explained as Workflows)
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Admissions to Enrolment",
                  body:
                    "Inquiry → application → document verification → fee collection → section allocation. Parents see status live; admins get SLA alerts.",
                },
                {
                  title: "Attendance to Fees",
                  body:
                    "Daily attendance updates fee rules, transport billing, and alerts to guardians. Exceptions are logged with reasons and approvers.",
                },
                {
                  title: "Exams to Promotions",
                  body:
                    "Schedule exams, capture marks, publish results, and roll promotions with auditability. Grade templates match CBSE/ICSE norms.",
                },
                {
                  title: "Approvals to Audit Trails",
                  body:
                    "Leave, concessions, refunds, procurements, and gate passes run through RBAC-backed workflows with time-stamped approvals.",
                },
                {
                  title: "Communication to Resolution",
                  body:
                    "Role-aware messaging to parents, staff, and students with templates, delivery status, and escalation paths.",
                },
                {
                  title: "Transport to Compliance",
                  body:
                    "Vehicle, route, and driver management with attendance sync, GPS hooks, and safety checks documented for audits.",
                },
              ].map((item) => (
                <Card key={item.title} className="border-white/10 bg-neutral-900/70">
                  <CardContent className="space-y-2 p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">
                      Workflow
                    </p>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="text-neutral-300">{item.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <Card className="border-white/10 bg-white/5">
              <CardContent className="space-y-3 p-6">
                <h2 className="text-3xl font-semibold text-white">
                  Built for Indian Schools (Fees, Compliance, Multi-Campus)
                </h2>
                <ul className="space-y-2 text-neutral-300">
                  <li>• Handles complex fee plans, concessions, transport slabs, and arrears.</li>
                  <li>• GST-ready invoicing, receipts, and exports to accounting tools.</li>
                  <li>• Region-aware attendance rules and academic calendars.</li>
                  <li>• Data residency and audit logs that match Indian compliance expectations.</li>
                  <li>• Multi-branch hierarchies with shared services and campus-level autonomy.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-emerald-500/10">
              <CardContent className="space-y-3 p-6">
                <h3 className="text-2xl font-semibold text-white">Security, RBAC & Audit Trails</h3>
                <ul className="space-y-2 text-neutral-100">
                  <li>• Role-based access with fine-grained scopes by campus, department, and module.</li>
                  <li>• Encryption in transit and at rest; backups with tested restores.</li>
                  <li>• Activity timelines on every record: who changed what, when, and from where.</li>
                  <li>• SSO-ready and export controls to prevent data leakage.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-white/10 bg-white/5">
              <CardContent className="space-y-3 p-6">
                <h2 className="text-3xl font-semibold text-white">Implementation Timeline</h2>
                <ul className="space-y-2 text-neutral-300">
                  <li>Day 0: Scope confirmation, data templates shared, owners assigned.</li>
                  <li>Day 3: Data import dry run, key workflows configured, access provisioned.</li>
                  <li>Day 7: Parallel run with real data, teacher and admin training.</li>
                  <li>Day 10: Go-live with rollback plan, success metrics, and support chat.</li>
                  <li>Day 14: Post-launch audit, optimize fee rules, automate recurring tasks.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-neutral-900/70">
              <CardContent className="space-y-3 p-6">
                <h2 className="text-3xl font-semibold text-white">Pricing Philosophy</h2>
                <ul className="space-y-2 text-neutral-300">
                  <li>• One platform, one predictable price—no per-module surprises.</li>
                  <li>• Mobile apps included; no hidden “parent app” fees.</li>
                  <li>• Based on student + staff headcount, not usage penalties.</li>
                  <li>• Implementation and training included, not a separate line item.</li>
                  <li>• Transparent renewals with clear storage and integration tiers.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-white/10 bg-white/5">
            <CardContent className="space-y-5 p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold text-white">
                    SquareCampus vs Legacy School ERPs
                  </h2>
                  <p className="text-neutral-300">
                    Choose architecture, not nostalgia. This is the difference between one OS and
                    stitched-together software.
                  </p>
                </div>
                <div className="flex gap-3">
                  <BookCallCta context="sms-compare" variant="primary" />
                  <Link
                    href="/why-different"
                    className="inline-flex items-center text-sm font-semibold text-emerald-200 underline-offset-4 hover:text-white hover:underline"
                  >
                    Read the full breakdown
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    title: "Architecture",
                    us: "Single database, shared workflows, consistent UX.",
                    them: "Multiple products bolted together with custom scripts.",
                  },
                  {
                    title: "Implementation",
                    us: "7–14 days with parallel run and live training.",
                    them: "6–12 months with endless customization tickets.",
                  },
                  {
                    title: "Pricing",
                    us: "All modules included; mobile apps included; transparent renewals.",
                    them: "Per-module upsells, per-user fees, hidden mobile costs.",
                  },
                  {
                    title: "Support",
                    us: "Human-first, context-aware support with product and ops in the same room.",
                    them: "Ticket queues with generic replies and slow escalations.",
                  },
                ].map((row) => (
                  <div
                    key={row.title}
                    className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4"
                  >
                    <p className="text-sm uppercase tracking-[0.18em] text-neutral-400">
                      {row.title}
                    </p>
                    <div className="mt-3 space-y-2">
                      <p className="text-white">
                        <span className="font-semibold text-emerald-300">SquareCampus</span>: {row.us}
                      </p>
                      <p className="text-neutral-300">
                        <span className="font-semibold text-red-300">Legacy ERPs</span>: {row.them}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <section className="space-y-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="text-3xl font-semibold text-white">FAQs</h2>
              <Link
                href="/about"
                className="text-sm font-semibold text-emerald-200 underline-offset-4 hover:text-white hover:underline"
              >
                Meet the team behind the system
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {faqItems.map((faq) => (
                <Card key={faq.question} className="border-white/10 bg-neutral-900/70">
                  <CardContent className="space-y-2 p-5">
                    <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                    <p className="text-neutral-300">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4 rounded-2xl border border-emerald-400/20 bg-gradient-to-r from-emerald-500/15 via-neutral-900 to-neutral-900 p-6 text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-200">
              School management system
            </p>
            <h2 className="text-3xl font-semibold text-white">
              Ready to run every campus day from one operating system?
            </h2>
            <p className="text-neutral-200">
              Book a call, see your workflows mapped, and launch with a timeline that respects the
              academic calendar.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <BookCallCta context="sms-bottom" variant="primary" />
              <LoginCta context="sms-bottom" variant="dark" />
            </div>
          </section>
        </section>
      </main>

      <Script
        id="sms-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${SEO_CONFIG.baseUrl}/#org`,
                name: "SquareCampus",
                url: SEO_CONFIG.baseUrl,
                logo: "https://squarecampus.com/logo.png",
                sameAs: ["https://www.linkedin.com/company/square-campus"],
                brand: "SquareCampus",
              },
              {
                "@type": "SoftwareApplication",
                "@id": `${SEO_CONFIG.baseUrl}/#software`,
                name: "SquareCampus",
                applicationCategory: "EducationalApplication",
                operatingSystem: "Web",
                url: "https://app.squarecampus.com",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                publisher: { "@id": `${SEO_CONFIG.baseUrl}/#org` },
                inLanguage: "en",
              },
              {
                ...webPageSchema,
                "@id": `${pageUrl}#webpage`,
                primaryImageOfPage: {
                  "@type": "ImageObject",
                  url: "https://cdn.squarecampus.in/application_files/logo-light.png",
                },
                mainEntity: { "@id": `${SEO_CONFIG.baseUrl}/#org` },
              },
              {
                ...breadcrumbSchema,
                "@id": `${pageUrl}#breadcrumb`,
              },
              {
                ...faqSchema,
                "@id": `${pageUrl}#faq`,
              },
            ],
          }),
        }}
      />

      <FloatingHomeButton href="/#home" label="Back to home" />
    </>
  );
}
