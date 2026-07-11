import {
  ArrowRightLeft,
  BellRing,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  FileSpreadsheet,
  Globe2,
  Languages,
  MessageSquareShare,
  Radar,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { AegisIntelligenceVisual } from "@/components/site/aegis-intelligence-visual";
import { ButtonLink } from "@/components/site/button-link";
import { HeroMockupCluster } from "@/components/site/mockups";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { siteCtas } from "@/content/site-content";

export const metadata: Metadata = {
  title: "SquareCampus | School OS & School Management System in India",
  description:
    "SquareCampus is the School OS for India, connecting admissions, academics, attendance, finance, communication, compliance, and operations in one institutional backbone.",
};

const workflowBlocks = [
  {
    title: "Admissions",
    icon: BookOpenCheck,
    body: "Inquiry, application, document collection, offer, enrollment, and the handoff into live academic records.",
  },
  {
    title: "Academics",
    icon: BriefcaseBusiness,
    body: "Attendance, timetable, grading, assessments, curriculum visibility, and staff workflows on one shared institutional timeline.",
  },
  {
    title: "Finance & compliance",
    icon: WalletCards,
    body: "Fee plans, receipts, concessions, approvals, audit trails, and reporting without branch-level spreadsheet stitching.",
  },
  {
    title: "Communication & operations",
    icon: MessageSquareShare,
    body: "Parents, students, staff, and operators receive the right updates while transport, services, and day-to-day tasks stay connected.",
  },
] as const;

const patchworkProblems = [
  "Multiple tools create multiple truths. Reports become reconciliation exercises instead of decision tools.",
  "Parents bounce between channels while staff repeat the same update across apps, calls, and spreadsheets.",
  "Auditability breaks when approvals, fees, attendance, and communication live in different systems.",
  "Leadership sees the institution late, usually through exports prepared after the real problem has already started.",
] as const;

const capabilityStories = [
  {
    title: "Leadership visibility",
    icon: ChartNoAxesCombined,
    body: "A live picture of attendance, dues, academic health, and campus exceptions without waiting for stitched reports.",
  },
  {
    title: "Teacher and staff workflows",
    icon: Building2,
    body: "Attendance, assessment, communication, and daily operational work happen in connected flows, not scattered tabs.",
  },
  {
    title: "Finance and compliance",
    icon: FileSpreadsheet,
    body: "Fee operations, receipts, concessions, approvals, and audit trails stay ready for scrutiny.",
  },
  {
    title: "Parent and student experience",
    icon: BellRing,
    body: "One app and one timeline for updates, dues, attendance, circulars, and progress visibility.",
  },
  {
    title: "Multi-campus control",
    icon: ArrowRightLeft,
    body: "Institution-wide policy with campus-level accountability, without fragmenting data or ownership.",
  },
  {
    title: "Trust posture",
    icon: ShieldCheck,
    body: "India-aware hosting, role-based access, auditability, and operational reliability are part of the product, not an afterthought.",
  },
] as const;

const indiaFirstPoints = [
  {
    title: "Multilingual usage reality",
    icon: Languages,
    body: "Parent-facing flows can meet users where they are, without making reporting and institutional controls harder.",
  },
  {
    title: "Institution-aware operations",
    icon: Globe2,
    body: "SquareCampus is shaped around the operational patterns schools and colleges in India actually deal with every term.",
  },
  {
    title: "Operational trust",
    icon: ShieldCheck,
    body: "The product is designed to stay credible under fee deadlines, admissions bursts, inspections, and board reviews.",
  },
] as const;

function EditorialGeometryOverlay({ variant = "cool" }: { variant?: "cool" | "warm" }) {
  const stroke = variant === "warm" ? "rgba(255,255,255,0.22)" : "rgba(147,196,255,0.36)";
  const fill = variant === "warm" ? "rgba(255,255,255,0.1)" : "rgba(100,164,255,0.14)";
  const dot = variant === "warm" ? "rgba(255,255,255,0.62)" : "rgba(130,192,255,0.74)";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1000 700"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <path d="M84 612L322 418L548 462L812 208" fill="none" stroke={stroke} strokeWidth="2" />
        <path d="M612 112L742 112L892 264L892 424" fill="none" stroke={stroke} strokeWidth="1.6" />
        <path
          d="M116 152C206 110 314 92 446 110C512 118 594 146 672 208"
          fill="none"
          stroke={stroke}
          strokeWidth="1.4"
          strokeDasharray="8 12"
        />
        <circle cx="322" cy="418" r="18" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <circle cx="548" cy="462" r="12" fill={fill} stroke={stroke} strokeWidth="1.6" />
        <circle cx="812" cy="208" r="24" fill={fill} stroke={stroke} strokeWidth="1.8" />
        <circle cx="892" cy="424" r="14" fill={fill} stroke={stroke} strokeWidth="1.6" />
      </svg>
      <div className="absolute left-[16%] top-[18%] h-24 w-24 rounded-full border border-white/14 bg-white/8 backdrop-blur-[2px]" />
      <div className="absolute right-[12%] top-[16%] h-px w-28 bg-white/20" />
      <div className="absolute right-[12%] top-[16%] h-12 w-px bg-white/20" />
      <div
        className="absolute left-[31.5%] top-[58.5%] size-2 rounded-full"
        style={{ backgroundColor: dot }}
      />
      <div
        className="absolute right-[18.2%] top-[28.2%] size-2.5 rounded-full"
        style={{ backgroundColor: dot }}
      />
      <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main>
        <SectionShell className="pt-12 sm:pt-16">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <Reveal className="space-y-6">
              <p className="section-kicker">
                School OS for schools, colleges, and multi-campus institutions
              </p>
              <h1 className="font-display text-4xl leading-none tracking-[-0.06em] sm:text-5xl lg:text-[4.6rem]">
                The School OS that keeps every campus system in sync.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                SquareCampus connects admissions, academics, attendance, fees, communication,
                compliance, and operations in one operating backbone built for the realities of
                institutions in India.
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={siteCtas.demoHref} label="Book a guided demo" />
                <ButtonLink
                  href={siteCtas.platformHref}
                  label="Explore the platform"
                  variant="secondary"
                />
              </div>
              {/* Mobile shows only the two sharpest proof points; all four from sm: up. */}
              <div className="grid gap-3 pt-2 sm:grid-cols-2 [&>*:nth-child(n+3)]:hidden sm:[&>*:nth-child(n+3)]:block">
                {[
                  "One login, one timeline, one institutional source of truth.",
                  "Built for real school operations, not a generic admin dashboard.",
                  "Multilingual and India-aware where usage reality demands it.",
                  "Auditability, uptime, and operational calm where institutions cannot afford drift.",
                ].map((item) => (
                  <div
                    key={item}
                    className="surface-panel rounded-[1.35rem] px-4 py-3 text-sm leading-6 text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <HeroMockupCluster />
            </Reveal>
          </div>
        </SectionShell>

        <SectionShell
          eyebrow="Connected operating model"
          title="Every critical workflow stays on the same institutional backbone"
          body="SquareCampus is not just a school management interface. It behaves like the operating layer that keeps departments, people, and records aligned."
        >
          <Reveal className="grid gap-4 xl:grid-cols-[0.94fr_1.06fr]">
            <article className="surface-panel-strong relative overflow-hidden rounded-[2.15rem] p-7 xl:min-h-216 xl:p-8">
              <div className="pointer-events-none absolute inset-x-8 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(88,124,204,0.12),transparent_70%)]" />
              <div className="relative flex h-full flex-col">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-(--line) pb-6">
                  <div>
                    <p className="section-kicker">Connected workflow spine</p>
                    <h2 className="mt-4 font-display text-3xl tracking-[-0.05em]">
                      Four linked operating moves keep the institution in sync.
                    </h2>
                  </div>
                  <span className="rounded-full border border-(--line) bg-(--surface) px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted-foreground">
                    One connected timeline
                  </span>
                </div>

                <div className="mt-6 grid gap-3">
                  {workflowBlocks.map((item, index) => (
                    <div
                      key={item.title}
                      className="rounded-[1.55rem] border border-(--line) bg-(--surface) p-5 shadow-[0_18px_34px_rgba(8,15,30,0.05)]"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex size-12 shrink-0 items-center justify-center rounded-full border text-sm ${
                            index === 0
                              ? "border-transparent bg-foreground text-background"
                              : "border-(--line) bg-(--surface-strong) text-muted-foreground"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="font-display text-2xl tracking-[-0.04em]">
                              {item.title}
                            </h3>
                            <item.icon className="mt-1 size-5 shrink-0 text-(--brand)" />
                          </div>
                          <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-(--line) bg-(--surface) p-5">
                    <p className="section-kicker">One source of truth</p>
                    <p className="mt-4 text-[1.08rem] leading-8 text-foreground">
                      Admissions, academics, finance, and communication stay on the same record.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-(--line) bg-(--surface) p-5">
                    <p className="section-kicker">Campus roll-up</p>
                    <p className="mt-4 text-[1.08rem] leading-8 text-foreground">
                      Multi-campus leadership sees the aggregate picture without losing branch-level
                      accountability.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <article className="surface-panel relative overflow-hidden rounded-[2.15rem] p-7 xl:min-h-216 xl:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(88,124,204,0.12),transparent)]" />
              <div className="relative flex h-full flex-col">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-(--line) bg-(--surface-strong) px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted-foreground">
                    <Building2 className="size-4 text-(--brand)" />
                    Operating backbone
                  </div>
                  <span className="rounded-full border border-(--line) bg-(--surface-strong) px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Live institutional state
                  </span>
                </div>

                <div className="mt-8">
                  <p className="section-kicker">Start with the institution, not the module list</p>
                  <h2 className="mt-5 max-w-3xl font-display text-3xl tracking-[-0.06em] sm:text-[3.8rem]">
                    The School OS keeps records, roles, and decisions moving in one direction.
                  </h2>
                  <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                    When admissions, fee logic, staff workflows, and parent communication run on the
                    same operating layer, the institution stops passing context between teams and
                    tools.
                  </p>
                </div>

                <div className="mt-8 grid flex-1 gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                  <div className="rounded-[1.7rem] border border-(--line) bg-(--surface-strong) p-6">
                    <p className="section-kicker">What SquareCampus handles here</p>
                    <p className="mt-5 text-[1.08rem] leading-8 text-foreground">
                      Shared student identity, financial state, role-aware approvals, and parent
                      communication all stay usable without rebuilding context every term.
                    </p>
                    <div className="mt-6 grid gap-3">
                      {[
                        "Admission changes flow into academics and fee setup on the same record",
                        "Receipts, circulars, attendance, and exceptions stay visible on one timeline",
                        "Operators, finance teams, and leadership work from the same live state",
                      ].map((item) => (
                        <div
                          key={item}
                          className="rounded-[1.2rem] border border-(--line) bg-(--surface) px-4 py-4 text-sm leading-7 text-muted-foreground"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.7rem] border border-(--line) bg-(--surface-strong) p-6">
                    <p className="section-kicker">Why this structure matters</p>
                    {/* Mobile shows the first two; the full list from sm: up. */}
                    <div className="mt-5 grid gap-3 [&>*:nth-child(n+3)]:hidden sm:[&>*:nth-child(n+3)]:block">
                      {[
                        "No duplicate student profiles across admissions and academics",
                        "No orphaned parent updates disconnected from fee and attendance state",
                        "No branch reporting packs stitched together after the fact",
                        "No broken audit trail across approvals, edits, and communication",
                      ].map((item, index) => (
                        <div
                          key={item}
                          className="rounded-[1.2rem] border border-(--line) bg-(--surface) px-4 py-4"
                        >
                          <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted-foreground">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-3 text-base leading-7 text-foreground">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
          <div className="w-full text-center">
            <p className="mt-6 text-base text-center leading-8 text-muted-foreground">
              Shared timeline means parents, staff, and operators stop chasing the latest version of
              what happened.
            </p>
          </div>
        </SectionShell>

        <SectionShell
          eyebrow="Patchwork versus OS"
          title="The institution already feels the cost of fragmented software"
          body="Most campuses are not missing features. They are missing a connected operating model."
        >
          <Reveal className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="surface-panel rounded-[1.8rem] p-7">
              <p className="section-kicker">Patchwork pain</p>
              <div className="mt-5 grid gap-3">
                {patchworkProblems.map((problem) => (
                  <div
                    key={problem}
                    className="rounded-[1.2rem] bg-(--surface-muted) px-4 py-4 text-sm leading-6 text-muted-foreground"
                  >
                    {problem}
                  </div>
                ))}
              </div>
            </div>
            <div className="surface-panel-strong rounded-[1.8rem] p-7">
              <p className="section-kicker">SquareCampus difference</p>
              <h2 className="mt-4 font-display text-3xl tracking-[-0.05em]">
                A School OS replaces exports, sync gaps, and operational guessing.
              </h2>
              <div className="mt-5 grid gap-3">
                {[
                  "Admissions changes flow into academics, fees, and communication because the same record is being used everywhere.",
                  "Leadership sees live institutional health instead of retrospective spreadsheet packages.",
                  "Parents, students, staff, and operators interact with one coordinated system instead of disconnected tools.",
                  "Auditability is native because approvals, updates, and communication all live on the same timeline.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.2rem] border border-(--line) bg-(--surface) px-4 py-4 text-sm leading-6 text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </SectionShell>

        <SectionShell
          eyebrow="Capability story"
          title="Product depth without becoming a feature dump"
          body="The real story is how the platform changes day-to-day institutional behavior across teams."
        >
          <Reveal className="grid gap-4 xl:grid-cols-[1.02fr_0.98fr]">
            <article className="surface-panel-strong relative overflow-hidden rounded-[2.15rem] p-7 xl:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(88,124,204,0.14),transparent)]" />
              <div className="relative flex h-full flex-col">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                    <ChartNoAxesCombined className="size-4 text-[color:var(--teal)]" />
                    Leadership visibility
                  </div>
                  <span className="rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                    Live institution view
                  </span>
                </div>

                <h2 className="mt-8 max-w-2xl font-display text-4xl tracking-[-0.06em] sm:text-[3.6rem]">
                  {capabilityStories[0].title}
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
                  {capabilityStories[0].body}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Fee exposure", "Visible branch by branch"],
                    ["Attendance drift", "Exceptions before review meetings"],
                  ].map(([label, detail]) => (
                    <div
                      key={label}
                      className="rounded-[1.3rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-4"
                    >
                      <p className="font-mono text-[0.54rem] uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                        {label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--foreground)]">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 grid flex-1 items-stretch gap-4 lg:grid-cols-[1fr_1fr]">
                  {/* Attendance by grade — horizontal bar chart */}
                  <div className="flex h-full flex-col rounded-[1.7rem] border border-(--line) bg-(--surface) p-6">
                    <div className="flex items-center justify-between">
                      <p className="section-kicker">Attendance by grade</p>
                      <span className="rounded-full border border-(--line) bg-(--surface-strong) px-2.5 py-1 font-mono text-[0.48rem] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                        Today
                      </span>
                    </div>
                    <div className="mt-5 flex flex-1 flex-col justify-center gap-3">
                      {[
                        ["Grade 10", 96, "var(--brand)"],
                        ["Grade 9", 91, "var(--teal)"],
                        ["Grade 8", 94, "var(--brand)"],
                        ["Grade 7", 88, "var(--teal)"],
                        ["Grade 6", 97, "var(--brand)"],
                      ].map(([label, value, color]) => (
                        <div key={label as string} className="flex items-center gap-3">
                          <span className="w-16 shrink-0 text-right font-mono text-[0.6rem] text-muted-foreground">
                            {label as string}
                          </span>
                          <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-(--surface-muted)">
                            <div
                              className="absolute inset-y-0 left-0 rounded-full transition-all duration-[1.5s] ease-out"
                              style={{
                                width: `${value}%`,
                                background: `linear-gradient(90deg, ${color}, color-mix(in oklch, ${color as string}, white 25%))`,
                                animation: `bar-grow 1.2s ease-out both`,
                                animationDelay: `${["Grade 10", "Grade 9", "Grade 8", "Grade 7", "Grade 6"].indexOf(label as string) * 0.1}s`,
                              }}
                            />
                          </div>
                          <span className="w-8 shrink-0 font-mono text-[0.65rem] font-medium text-foreground">
                            {value as number}%
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Live branch roll-up", "Exceptions flagged"].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-(--line) bg-(--surface-strong) px-3 py-2 font-mono text-[0.54rem] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fee collection — doughnut chart */}
                  <div className="flex h-full flex-col rounded-[1.7rem] border border-(--line) bg-(--surface) p-6">
                    <div className="flex items-center justify-between">
                      <p className="section-kicker">Fee collection</p>
                      <span className="rounded-full border border-(--line) bg-(--surface-strong) px-2.5 py-1 font-mono text-[0.48rem] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                        This term
                      </span>
                    </div>
                    <div className="flex flex-1 items-center justify-center py-6">
                      <div className="relative">
                        <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
                          {/* Background ring */}
                          <circle
                            cx="80"
                            cy="80"
                            r="62"
                            fill="none"
                            stroke="var(--surface-muted)"
                            strokeWidth="18"
                          />
                          {/* Collected: 72% */}
                          <circle
                            cx="80"
                            cy="80"
                            r="62"
                            fill="none"
                            stroke="var(--brand)"
                            strokeWidth="18"
                            strokeDasharray={`${0.72 * 2 * Math.PI * 62} ${2 * Math.PI * 62}`}
                            strokeLinecap="round"
                            className="animate-[doughnut-draw_1.4s_ease-out_both]"
                          />
                          {/* Pending: 20% */}
                          <circle
                            cx="80"
                            cy="80"
                            r="62"
                            fill="none"
                            stroke="var(--teal)"
                            strokeWidth="18"
                            strokeDasharray={`${0.2 * 2 * Math.PI * 62} ${2 * Math.PI * 62}`}
                            strokeDashoffset={`${-0.72 * 2 * Math.PI * 62}`}
                            strokeLinecap="round"
                            className="[animation:doughnut-draw_1.4s_ease-out_0.2s_both]"
                          />
                          {/* Overdue: 8% */}
                          <circle
                            cx="80"
                            cy="80"
                            r="62"
                            fill="none"
                            stroke="var(--amber)"
                            strokeWidth="18"
                            strokeDasharray={`${0.08 * 2 * Math.PI * 62} ${2 * Math.PI * 62}`}
                            strokeDashoffset={`${-0.92 * 2 * Math.PI * 62}`}
                            strokeLinecap="round"
                            className="[animation:doughnut-draw_1.4s_ease-out_0.4s_both]"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-display text-2xl tracking-[-0.04em] text-[color:var(--foreground)]">
                            ₹2.4Cr
                          </span>
                          <span className="mt-0.5 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                            Collected
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-5">
                      {[
                        ["Collected", "72%", "var(--brand)"],
                        ["Pending", "20%", "var(--teal)"],
                        ["Overdue", "8%", "var(--amber)"],
                      ].map(([label, pct, color]) => (
                        <div key={label} className="flex items-center gap-2">
                          <span className="size-2 rounded-full" style={{ background: color }} />
                          <span className="text-xs text-[color:var(--muted-foreground)]">
                            {label}{" "}
                            <span className="font-medium text-[color:var(--foreground)]">
                              {pct}
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid flex-1 items-stretch gap-4">
                  <div className="relative hidden min-h-[18rem] overflow-hidden rounded-[1.7rem] border border-[color:var(--line)] sm:block">
                    <Image
                      src="/images/editorial/campus-courtyard.jpg"
                      alt="Modern campus courtyard"
                      fill
                      sizes="(min-width: 1280px) 35vw, 100vw"
                      className="object-cover"
                    />
                    <EditorialGeometryOverlay />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,24,38,0.06),rgba(16,24,38,0.76))]" />
                    <div className="absolute inset-x-5 bottom-5 rounded-[1.3rem] border border-white/14 bg-[rgba(12,20,32,0.55)] p-4 text-white backdrop-blur-md">
                      <p className="font-mono text-[0.54rem] uppercase tracking-[0.18em] text-white/70">
                        Real institutional context
                      </p>
                      <p className="mt-3 font-display text-2xl tracking-[-0.04em]">
                        A serious platform for operators, trustees, finance teams, and principals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article className="surface-panel relative overflow-hidden rounded-[2.15rem] p-7 xl:p-8">
              <div className="flex h-full flex-col">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[color:var(--line)] pb-6">
                  <div>
                    <p className="section-kicker">Operational depth</p>
                    <h2 className="mt-4 font-display text-3xl tracking-[-0.05em]">
                      Product breadth, arranged around how institutions actually work.
                    </h2>
                  </div>
                  <span className="rounded-full border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                    Institution-aware modules
                  </span>
                </div>

                <div className="mt-6 grid flex-1 gap-4 md:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-5">
                    <Building2 className="size-5 text-[color:var(--teal)]" />
                    <h3 className="mt-5 font-display text-2xl tracking-[-0.04em]">
                      {capabilityStories[1].title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-[color:var(--muted-foreground)]">
                      {capabilityStories[1].body}
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-5">
                    <FileSpreadsheet className="size-5 text-[color:var(--teal)]" />
                    <h3 className="mt-5 font-display text-2xl tracking-[-0.04em]">
                      {capabilityStories[2].title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-[color:var(--muted-foreground)]">
                      {capabilityStories[2].body}
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-5">
                    <BellRing className="size-5 text-[color:var(--teal)]" />
                    <h3 className="mt-5 font-display text-2xl tracking-[-0.04em]">
                      {capabilityStories[3].title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-[color:var(--muted-foreground)]">
                      {capabilityStories[3].body}
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-5">
                    <ArrowRightLeft className="size-5 text-[color:var(--teal)]" />
                    <h3 className="mt-5 font-display text-2xl tracking-[-0.04em]">
                      {capabilityStories[4].title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-[color:var(--muted-foreground)]">
                      {capabilityStories[4].body}
                    </p>
                  </div>

                  <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-5 md:col-span-2">
                    <div className="space-y-5">
                      <div className="max-w-2xl">
                        <ShieldCheck className="size-5 text-[color:var(--teal)]" />
                        <h3 className="mt-5 font-display text-2xl tracking-[-0.04em]">
                          {capabilityStories[5].title}
                        </h3>
                        <p className="mt-3 text-base leading-7 text-[color:var(--muted-foreground)]">
                          {capabilityStories[5].body}
                        </p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {[
                          "Role-aware access across branches",
                          "Traceable approvals and edits",
                          "Audit-friendly operating history",
                        ].map((item) => (
                          <div
                            key={item}
                            className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-4 text-sm leading-6 text-[color:var(--muted-foreground)]"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </SectionShell>

        <SectionShell
          eyebrow="India-first reality"
          title="Built for how institutions here actually operate"
          body="This is not a side note. India-aware usage, language, trust, and institutional behavior shape the product itself."
        >
          <Reveal className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
            <div className="surface-panel-strong relative overflow-hidden rounded-[1.8rem] p-8">
              <div className="pointer-events-none absolute right-[-3rem] top-[-2rem] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(88,124,204,0.16),transparent_72%)] blur-3xl" />
              <Languages className="size-5 text-[color:var(--brand)]" />
              <h2 className="mt-5 font-display text-3xl tracking-[-0.05em]">
                Multilingual where usage needs it. Structured where institutions demand it.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)]">
                Parent-facing flows, communication, and engagement surfaces can adapt to language
                preferences while the institution still keeps consistent controls, reporting, and
                audit-ready records.
              </p>
              <div className="mt-8 grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
                <div className="grid gap-4">
                  <div className="rounded-[1.45rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
                    <p className="section-kicker">Preferred language</p>
                    <p className="mt-4 text-base leading-7 text-[color:var(--foreground)]">
                      Parent-facing updates can flex by audience without fragmenting the
                      institutional record.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["English", "Hindi", "Kannada", "Tamil"].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-3 py-2 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[1.45rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,var(--surface),var(--surface-strong))] p-5">
                    <p className="section-kicker">Structured underneath</p>
                    <p className="mt-4 text-base leading-7 text-[color:var(--foreground)]">
                      Circulars, dues, acknowledgements, and audit history stay attached to the same
                      student and family context.
                    </p>
                  </div>
                </div>

                <div className="relative hidden min-h-[20rem] overflow-hidden rounded-[1.6rem] border border-[color:var(--line)] sm:block">
                  <Image
                    src="/images/editorial/school-building-delhi.jpg"
                    alt="Institution building for India-first operations context"
                    fill
                    sizes="(min-width: 1280px) 28vw, 100vw"
                    className="object-cover"
                  />
                  <EditorialGeometryOverlay variant="warm" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,24,38,0.08),rgba(16,24,38,0.78))]" />

                  <div className="absolute right-4 top-4 max-w-[16rem] rounded-[1.35rem] border border-white/14 bg-[rgba(255,255,255,0.76)] p-4 text-[color:var(--foreground)] shadow-[0_18px_50px_rgba(8,15,30,0.14)] backdrop-blur-md dark:border-white/10 dark:bg-[rgba(12,20,32,0.72)] dark:text-white dark:shadow-[0_18px_50px_rgba(0,0,0,0.4)]">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono text-[0.52rem] uppercase tracking-[0.2em] text-[color:var(--muted-foreground)] dark:text-white/60">
                        Circular delivery
                      </p>
                      <div className="flex gap-1.5">
                        {["ENG", "HIN"].map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-[color:var(--surface-strong)] px-2 py-1 font-mono text-[0.48rem] uppercase tracking-[0.16em] text-[color:var(--muted-foreground)] dark:bg-white/10 dark:text-white/60"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 font-display text-xl tracking-[-0.04em]">
                      Fee reminder queued in Hindi and English
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[color:var(--muted-foreground)] dark:text-white/60">
                      Same due date, same receipt trail, same operator view. Language adapts without
                      rewriting the underlying workflow.
                    </p>
                  </div>

                  <div className="absolute inset-x-4 bottom-4 rounded-[1.35rem] border border-white/14 bg-[rgba(12,20,32,0.58)] p-5 text-white backdrop-blur-md">
                    <p className="font-mono text-[0.54rem] uppercase tracking-[0.18em] text-white/70">
                      India-aware operating model
                    </p>
                    <p className="mt-3 font-display text-2xl tracking-[-0.04em]">
                      Language can stay flexible while the institution stays operationally strict.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid content-start gap-4">
              {indiaFirstPoints.map((item) => (
                <article key={item.title} className="surface-panel rounded-[1.6rem] p-6">
                  <item.icon className="size-5 text-[color:var(--amber)]" />
                  <h2 className="mt-5 font-display text-2xl tracking-[-0.04em]">{item.title}</h2>
                  <p className="mt-3 text-base leading-7 text-[color:var(--muted-foreground)]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </SectionShell>

        <SectionShell
          eyebrow="Governed intelligence"
          title="AEGIS is the governed intelligence layer inside the operating system"
          body="AEGIS — Adaptive Enterprise Governance & Intelligence System — surfaces what needs attention across the institution, inside the same permissions and audit trails as everything else."
        >
          <Reveal className="surface-panel-strong rounded-[2rem] p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-2 text-sm text-[color:var(--foreground)]">
                  <Radar className="size-4 text-[color:var(--brand)]" />
                  AEGIS inside SquareCampus
                </div>
                <h2 className="mt-5 font-display text-3xl tracking-[-0.05em] sm:text-4xl">
                  Ask AEGIS. Don&rsquo;t chase reports.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)]">
                  Because AEGIS works with the same permissions, timelines, and live records, it can
                  surface exceptions, suggest next steps, and support leadership visibility — with
                  governance, tenant boundaries, and auditability built in, not bolted on.
                </p>
                <div className="mt-6 grid gap-3">
                  {[
                    {
                      icon: Sparkles,
                      text: "Operational questions answered from live institutional context",
                    },
                    {
                      icon: ShieldCheck,
                      text: "Same trust boundaries, same role-aware controls",
                    },
                    {
                      icon: Radar,
                      text: "Signals and anomalies surfaced across finance, academics, and operations",
                    },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="rounded-[1.25rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-4 text-sm leading-6 text-[color:var(--muted-foreground)]"
                    >
                      <item.icon className="mb-3 size-4 text-[color:var(--brand)]" />
                      {item.text}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <ButtonLink href="/aegis" label="Meet AEGIS" variant="secondary" />
                </div>
              </div>
              <AegisIntelligenceVisual className="lg:-mr-2" />
            </div>
          </Reveal>
        </SectionShell>

        <SectionShell
          eyebrow="Why institutions switch"
          title="The value is not just modern design. It is operational calm."
          body="Schools and colleges switch when they realize the current stack cannot produce clarity, accountability, and predictable execution at institutional scale."
        >
          <Reveal staggerChildren className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Trust and control",
                icon: ShieldCheck,
                body: "India-first posture, role-based access, auditability, and dependable infrastructure create confidence with leadership and operators alike.",
              },
              {
                title: "Fewer moving parts",
                icon: ArrowRightLeft,
                body: "One system replaces the friction of separate tools, exports, duplicate work, and support handoffs.",
              },
              {
                title: "Faster visibility",
                icon: ChartNoAxesCombined,
                body: "Campus leadership sees the institution through live signals instead of delayed reporting rituals.",
              },
              {
                title: "Guided adoption",
                icon: Globe2,
                body: "Rollout, migration, training, and post-launch support are part of the operating promise, not treated as an afterthought.",
              },
            ].map((item) => (
              <article
                key={item.title}
                data-reveal-item
                className="surface-panel rounded-[1.6rem] p-6"
              >
                <item.icon className="size-5 text-[color:var(--brand)]" />
                <h2 className="mt-5 font-display text-2xl tracking-[-0.04em]">{item.title}</h2>
                <p className="mt-3 text-base leading-7 text-[color:var(--muted-foreground)]">
                  {item.body}
                </p>
              </article>
            ))}
          </Reveal>
        </SectionShell>

        <SectionShell className="pb-22">
          <Reveal className="surface-panel-strong rounded-[2rem] p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center">
              <div>
                <p className="section-kicker">Next move</p>
                <h2 className="mt-4 font-display text-3xl tracking-[-0.05em] sm:text-4xl">
                  See whether SquareCampus can replace your current patchwork.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)]">
                  We will map the current stack, show the connected operating model, and walk
                  through rollout, migration, and institutional fit without reducing the
                  conversation to a card wall of features.
                </p>
              </div>
              <div className="grid gap-3">
                <ButtonLink href={siteCtas.demoHref} label="Book a guided demo" />
                <ButtonLink
                  href={siteCtas.platformHref}
                  label="View platform architecture"
                  variant="secondary"
                />
              </div>
            </div>
          </Reveal>
        </SectionShell>
      </main>
      <SiteFooter />
    </div>
  );
}
