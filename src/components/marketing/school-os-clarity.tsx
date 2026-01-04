"use client";

import { motion } from "@/lib/motion";
import { Building2, DollarSign, FileCheck, GraduationCap, Layers, Users } from "@/icons";

const whoItsFor = [
  {
    title: "Principals",
    icon: GraduationCap,
    points: [
      "Live visibility across academics, attendance, and discipline.",
      "Fewer escalation loops with connected approvals.",
      "Board-ready summaries without manual compilation.",
    ],
  },
  {
    title: "Admin Office",
    icon: FileCheck,
    points: [
      "Admissions, certificates, and compliance on one timeline.",
      "Clear handoffs between departments and campuses.",
      "Less chasing, more predictable daily execution.",
    ],
  },
  {
    title: "Finance Teams",
    icon: DollarSign,
    points: [
      "Fee plans, collections, and reconciliations stay aligned.",
      "Audit trails and approvals are built into workflows.",
      "Fewer surprises during audits and year-end closes.",
    ],
  },
];

export function SchoolOsClarity() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-neutral-950 px-4 py-16 md:px-8 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-12 h-60 w-60 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute right-10 bottom-8 h-60 w-60 rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">
            School OS positioning
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
            A School OS is not just a school management system
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-neutral-300 md:text-base">
            A school management system digitizes tasks. A School OS connects workflows so every
            team runs from the same source of truth, with auditable operations across campuses.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950 p-6 shadow-2xl shadow-black/40"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <Layers className="h-5 w-5 text-blue-300" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
                Typical school management system
              </p>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-500" />
                Separate modules stitched together with exports.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-500" />
                Data lives in silos; reconciliation is manual.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-500" />
                Reporting lags behind real-time operations.
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-neutral-900 to-neutral-950 p-6 shadow-2xl shadow-emerald-500/10"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3">
                <Building2 className="h-5 w-5 text-emerald-200" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                SquareCampus School OS
              </p>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-neutral-200">
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                One data model powering connected workflows.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Predictable operations with role-based controls.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live outputs: audits, reports, and approvals in one view.
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-neutral-900/70 p-6 text-sm text-neutral-200">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            Operational resilience
          </p>
          <p className="mt-3">
            SquareCampus is designed to keep working when reality gets messy, peak admissions,
            fee spikes, audits, staffing changes, or mid-session policy shifts. The system stays
            calm so teams can focus on decisions, not recovery.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-neutral-900/70 p-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            <Users className="h-3.5 w-3.5 text-blue-300" />
            Who it&apos;s for
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {whoItsFor.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                      <Icon className="h-4 w-4 text-white/80" />
                    </div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                  </div>
                  <ul className="mt-4 space-y-2 text-xs text-neutral-300">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400/80" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
