"use client";

import { useRef } from "react";
import {
  BarChart3,
  BookOpen,
  DollarSign,
  GraduationCap,
  type IconComponent,
  MessageSquare,
  Users,
} from "@/components/icons";
import { useGsapReveal } from "@/lib/gsap-utils";
import { DottedGlowBackground } from "./backgrounds/dotted-glow";

const operationAreas: Array<{
  title: string;
  description: string;
  bullets: string[];
  icon: IconComponent;
  gradient: string;
  metric?: { label: string; value: string };
}> = [
  {
    title: "Admissions to alumni",
    description:
      "Collect applications, shortlist, enroll, and keep alumni connected in one operating flow.",
    bullets: [
      "Smart forms, merit lists, and waitlists",
      "Fee plans and document collection tied to admissions",
      "Alumni records that stay linked to student history",
    ],
    icon: GraduationCap,
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    metric: { label: "Outcome", value: "Faster enrollments" },
  },
  {
    title: "Academics & assessments",
    description:
      "Timetables, lesson plans, assessments, and grading stay in sync for every class.",
    bullets: [
      "Curriculum mapping and subject allocation",
      "Digital gradebooks with moderation controls",
      "Attendance that flows into reports instantly",
    ],
    icon: BookOpen,
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    metric: { label: "Outcome", value: "Less admin churn" },
  },
  {
    title: "Finance & compliance",
    description:
      "Transparent finances with reconciliations and audit-ready records for every branch.",
    bullets: [
      "Fee schedules, waivers, and dues tracking",
      "Ledger exports with payment partner sync",
      "Audit trails and approvals baked into workflows",
    ],
    icon: DollarSign,
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    metric: { label: "Outcome", value: "Predictable collections" },
  },
  {
    title: "Communication that lands",
    description:
      "Announcements, feedback, and support routed to the right people with proof of delivery.",
    bullets: [
      "Role-aware messaging via email, SMS, and in-app",
      "Two-way teacher-parent conversations",
      "Consent and read-receipt tracking",
    ],
    icon: MessageSquare,
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    metric: { label: "Outcome", value: "Clearer reach" },
  },
  {
    title: "People, assets, and services",
    description:
      "Staff rosters, transport, library, and inventory stay coordinated so campuses run on time.",
    bullets: [
      "Route, hostel, and library circulation controls",
      "Asset issuance with return reminders",
      "Service tickets to keep facilities reliable",
    ],
    icon: Users,
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    metric: { label: "Outcome", value: "Fewer breakdowns" },
  },
  {
    title: "Data you can act on",
    description: "Live dashboards and alerts so leadership sees gaps early and fixes them fast.",
    bullets: [
      "Engagement and performance pulse by branch",
      "Exception alerts for dues, absenteeism, and SLAs",
      "Exports for board reviews and regulators",
    ],
    icon: BarChart3,
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    metric: { label: "Outcome", value: "Faster decisions" },
  },
];

const dayInLife = [
  "7:30 AM, attendance syncs from every class with no spreadsheets to reconcile.",
  "10:00 AM, finance sees live fee recoveries and pending dues alerts.",
  "1:00 PM, teachers publish assessments with moderated marks.",
  "4:00 PM, transport, hostel, and library logs roll into daily compliance.",
  "Evening, parents get tailored updates; leadership sees campus health in one view.",
];

export function Operations() {
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const dayRef = useRef<HTMLDivElement | null>(null);

  useGsapReveal(cardsRef, { selector: ".js-ops-card", stagger: 0.08 });
  useGsapReveal(dayRef, { y: 20 });

  return (
    <section
      id="operations"
      className="relative overflow-hidden bg-neutral-950 px-4 py-10 md:px-8 md:py-14"
    >
      <DottedGlowBackground
        className="pointer-events-none opacity-60"
        gap={18}
        radius={1.4}
        color="rgba(148, 163, 184, 0.16)"
        darkColor="rgba(148, 163, 184, 0.2)"
        glowColor="rgba(56, 189, 248, 0.45)"
        darkGlowColor="rgba(56, 189, 248, 0.6)"
        opacity={0.45}
        backgroundOpacity={0.1}
        speedMin={0.22}
        speedMax={0.85}
        speedScale={0.65}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.06),transparent_32%),radial-gradient(circle_at_40%_80%,rgba(59,130,246,0.05),transparent_28%)]" />
      <div className="relative mx-auto max-w-6xl space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">
          Why SquareCampus
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
          One operating system to keep every school day predictable
        </h2>
        <p className="mx-auto max-w-3xl text-sm text-neutral-300 md:text-base">
          SquareCampus replaces fragmented apps with a single, responsive command center. Every
          workflow, admissions, academics, finance, communication, and facilities, is connected so
          teams move faster and leaders stay in control.
        </p>
      </div>

      <div
        ref={cardsRef}
        className="relative mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {operationAreas.map((area) => {
          const Icon = area.icon;
          return (
            <article
              key={area.title}
              className="js-ops-card group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-950/90 p-6 shadow-2xl shadow-black/40 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl hover:shadow-black/60"
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              {/* Content */}
              <div className="relative space-y-4">
                {/* Icon and metric row */}
                <div className="flex items-start justify-between">
                  <div
                    className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10"
                  >
                    <Icon className="h-6 w-6 text-white/80 transition-colors duration-300 group-hover:text-white" />
                  </div>

                  {area.metric && (
                    <div
                      className="rounded-xl border border-white/10 bg-neutral-900/80 px-3 py-1.5 text-right backdrop-blur-sm"
                    >
                      <p className="text-[0.65rem] uppercase tracking-wider text-white/40">
                        {area.metric.label}
                      </p>
                      <p className="text-sm font-semibold text-white">{area.metric.value}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
                    {area.title}
                  </p>
                  <p className="text-sm text-neutral-200">{area.description}</p>
                </div>
              </div>

              <ul className="relative mt-3 space-y-2 text-[0.7rem] text-neutral-300 sm:text-xs">
                {area.bullets.map((bullet, bulletIndex) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2"
                  >
                    <span className="mt-[6px] inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 transition-transform duration-300 group-hover:scale-125" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <div
        ref={dayRef}
        className="relative mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-[1.2fr,0.8fr]"
      >
        <div className="rounded-3xl border border-white/10 bg-neutral-900/70 p-6 shadow-2xl shadow-black/50">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
            A predictable day on SquareCampus
          </p>
          <div className="mt-4 space-y-3 text-sm text-neutral-100">
            {dayInLife.map((item, idx) => (
              <div
                key={item}
                className={`rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-left text-neutral-200 ${
                  idx > 2 ? "hidden sm:block" : ""
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-neutral-900 to-purple-500/10 p-6 text-left shadow-2xl shadow-black/50">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
              Proof it works
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Built for campuses of every size
            </h3>
            <p className="mt-2 text-sm text-neutral-200">
              Multi-branch institutions, independent schools, and colleges run daily operations on
              SquareCampus with the same reliability: enterprise-grade security, clear workflows,
              and responsive support.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm text-white">
            <Stat label="Time saved weekly" value="Hours reclaimed" />
            <Stat label="Manual errors reduced" value="Fewer corrections" />
            <Stat label="Launch window" value="Guided rollout" />
            <Stat label="Parent experience" value="Clearer updates" />
          </div>
        </div>
      </div>
    </section>
  );
}

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left">
    <p className="text-xs uppercase tracking-[0.35em] text-white/50">{label}</p>
    <p className="text-xl font-semibold text-white">{value}</p>
  </div>
);
