"use client";

import { motion } from "motion/react";
import {
  GraduationCap,
  BookOpen,
  DollarSign,
  MessageSquare,
  Users,
  BarChart3,
  type LucideIcon
} from "lucide-react";

const operationAreas: Array<{
  title: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
  gradient: string;
  metric?: { label: string; value: string };
}> = [
  {
    title: "Admissions to alumni",
    description:
      "Collect applications, shortlist, enroll, and keep alumni connected without switching tools.",
    bullets: [
      "Smart forms, merit lists, and waitlists",
      "Automated fee plans and document collection",
      "Alumni CRM for placements and fundraising",
    ],
    icon: GraduationCap,
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    metric: { label: "Faster enrollment", value: "3x" },
  },
  {
    title: "Academics & assessments",
    description:
      "Timetables, lesson plans, assessments, and grading stay perfectly in sync for every class.",
    bullets: [
      "Curriculum mapping and subject allocation",
      "Digital gradebooks with moderation controls",
      "Attendance that flows into reports instantly",
    ],
    icon: BookOpen,
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    metric: { label: "Admin time saved", value: "25+ hrs/wk" },
  },
  {
    title: "Finance & compliance",
    description:
      "Transparent finances with automated reconciliations and audit-ready records for every branch.",
    bullets: [
      "Fee schedules, waivers, and dues tracking",
      "Ledger exports with payment partner sync",
      "Audit trails and approvals baked into workflows",
    ],
    icon: DollarSign,
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    metric: { label: "Collection rate", value: "↑ 40%" },
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
    metric: { label: "Parent engagement", value: "98%" },
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
    metric: { label: "Ops automated", value: "91%" },
  },
  {
    title: "Data you can act on",
    description:
      "Live dashboards and alerts so leadership sees gaps early and fixes them fast.",
    bullets: [
      "Engagement and performance pulse by branch",
      "Exception alerts for dues, absenteeism, and SLAs",
      "Exports for board reviews and regulators",
    ],
    icon: BarChart3,
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    metric: { label: "Decisions faster", value: "5x" },
  },
];

const dayInLife = [
  "7:30 AM, attendance syncs from every class; no spreadsheets to reconcile.",
  "10:00 AM, finance gets live fee recoveries and pending dues alerts.",
  "1:00 PM, teachers publish graded assessments with moderated marks.",
  "4:00 PM, transport, hostel, and library logs roll into daily compliance.",
  "Evening, parents get tailored updates; leadership sees campus health in one view.",
];

export function Operations() {
  return (
    <section
      id="operations"
      className="relative overflow-hidden bg-neutral-950 px-4 py-16 md:px-8 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.06),transparent_32%),radial-gradient(circle_at_40%_80%,rgba(59,130,246,0.05),transparent_28%)]" />
      <div className="relative mx-auto max-w-6xl space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">
          Why SquareCampus
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
          One operating system to keep every school day predictable
        </h2>
        <p className="mx-auto max-w-3xl text-sm text-neutral-300 md:text-base">
          SquareCampus replaces fragmented apps with a single, responsive command center.
          Every workflow, admissions, academics, finance, communication, and facilities, is connected
          so teams move faster and leaders stay in control.
        </p>
      </div>

      <div className="relative mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
        {operationAreas.map((area, index) => {
          const Icon = area.icon;
          return (
            <motion.article
              key={area.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-950/90 p-6 shadow-2xl shadow-black/40 backdrop-blur transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-black/60"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

              {/* Content */}
              <div className="relative space-y-4">
                {/* Icon and metric row */}
                <div className="flex items-start justify-between">
                  <motion.div
                    className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-6 w-6 text-white/80 transition-colors duration-300 group-hover:text-white" />
                  </motion.div>

                  {area.metric && (
                    <motion.div
                      className="rounded-xl border border-white/10 bg-neutral-900/80 px-3 py-1.5 text-right backdrop-blur-sm"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <p className="text-[0.65rem] uppercase tracking-wider text-white/40">{area.metric.label}</p>
                      <p className="text-sm font-semibold text-white">{area.metric.value}</p>
                    </motion.div>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
                    {area.title}
                  </p>
                  <p className="text-sm text-neutral-200">{area.description}</p>
                </div>
              </div>

              <ul className="relative mt-3 space-y-2 text-xs text-neutral-300">
                {area.bullets.map((bullet, bulletIndex) => (
                  <motion.li
                    key={bullet}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + bulletIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <span className="mt-[6px] inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 transition-transform duration-300 group-hover:scale-125" />
                    <span>{bullet}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>

      <div className="relative mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-neutral-900/70 p-6 shadow-2xl shadow-black/50">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
            A predictable day on SquareCampus
          </p>
          <div className="mt-4 space-y-3 text-sm text-neutral-100">
            {dayInLife.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-left text-neutral-200"
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
              SquareCampus with the same reliability: 99.9% uptime, enterprise-grade security, and
              responsive support.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm text-white">
            <Stat label="Time saved weekly" value="15–20 hrs" />
            <Stat label="Manual errors reduced" value="↓ 60%" />
            <Stat label="Launch window" value="< 7 days" />
            <Stat label="Parent satisfaction" value="98%+" />
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
