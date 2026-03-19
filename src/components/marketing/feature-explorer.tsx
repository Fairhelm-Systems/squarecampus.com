"use client";

import { motion, AnimatePresence } from "@/lib/motion";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BookOpen,
  Briefcase,
  Bus,
  Check,
  DollarSign,
  GraduationCap,
  Home,
  MessageSquare,
  Sparkles,
  Users,
} from "@/icons";

type Feature = {
  name: string;
  description: string;
  highlights: string[];
};

type Category = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  features: Feature[];
};

const categories: Category[] = [
  {
    id: "admissions",
    name: "Admissions & Enrollment",
    icon: Users,
    gradient: "from-blue-500/20 via-cyan-500/10",
    features: [
      {
        name: "Online Application Portal",
        description:
          "Collect applications with configurable forms, document uploads, and fee collection in one intake flow.",
        highlights: [
          "Replaces: paper forms and email threads",
          "Operational shift: one intake workflow per program",
          "Outputs: verified applicant lists and pending documents",
          "Controls: role-based review and status tracking",
        ],
      },
      {
        name: "Admission Management",
        description:
          "Move applicants from inquiry to enrollment with a single tracked workflow and clear ownership.",
        highlights: [
          "Replaces: spreadsheets and manual follow-ups",
          "Operational shift: stage-by-stage approvals",
          "Outputs: merit lists, offer letters, confirmations",
          "Controls: audit trail for every status change",
        ],
      },
      {
        name: "Entrance Exam Management",
        description:
          "Plan entrance exams, capture scores, and publish results within the same admissions flow.",
        highlights: [
          "Replaces: separate exam tools and CSV merges",
          "Operational shift: scores flow into selection",
          "Outputs: ranked lists and cutoff views",
          "Controls: invigilator roles and result locks",
        ],
      },
    ],
  },
  {
    id: "finance",
    name: "Finance & Fees",
    icon: DollarSign,
    gradient: "from-emerald-500/20 via-green-500/10",
    features: [
      {
        name: "Fee Structure Management",
        description:
          "Model fee structures by program, class, or campus with concessions and installment plans.",
        highlights: [
          "Replaces: fee charts in spreadsheets",
          "Operational shift: centralized fee policy with campus overrides",
          "Outputs: student fee plans and schedules",
          "Controls: approvals for waivers and changes",
        ],
      },
      {
        name: "Payment Collection",
        description: "Collect fees across modes with auto-receipts and clean reconciliation hooks.",
        highlights: [
          "Replaces: manual receipts and fragmented gateways",
          "Operational shift: one collection ledger for all channels",
          "Outputs: receipts, dues lists, reconciliation summaries",
          "Controls: role-based refunds and adjustments",
        ],
      },
      {
        name: "Financial Reports",
        description: "Audit-ready reports from live collections, dues, and approvals.",
        highlights: [
          "Replaces: manual month-end consolidations",
          "Operational shift: live financial visibility by campus",
          "Outputs: ledgers, balance summaries, audit exports",
          "Controls: approval history and audit trails",
        ],
      },
    ],
  },
  {
    id: "academic",
    name: "Academic Management",
    icon: GraduationCap,
    gradient: "from-purple-500/20 via-violet-500/10",
    features: [
      {
        name: "Timetable & Scheduling",
        description:
          "Build conflict-free timetables aligned to faculty, rooms, and academic calendars.",
        highlights: [
          "Replaces: manual timetable grids",
          "Operational shift: shared schedules across campuses",
          "Outputs: class schedules and faculty allocations",
          "Controls: conflict alerts and change logs",
        ],
      },
      {
        name: "Attendance Tracking",
        description:
          "Capture attendance with multiple inputs and keep parents informed in real time.",
        highlights: [
          "Replaces: paper registers and delayed uploads",
          "Operational shift: attendance feeds reports instantly",
          "Outputs: daily summaries and exception lists",
          "Controls: role-based edits and audit logs",
        ],
      },
      {
        name: "Exam & Assessment",
        description: "Run exams, record marks, and publish report cards in one continuous flow.",
        highlights: [
          "Replaces: disconnected exam tools and spreadsheets",
          "Operational shift: marks flow into grading automatically",
          "Outputs: report cards, rank lists, transcripts",
          "Controls: moderation and approval steps",
        ],
      },
    ],
  },
  {
    id: "communication",
    name: "Communication",
    icon: MessageSquare,
    gradient: "from-amber-500/20 via-orange-500/10",
    features: [
      {
        name: "Multi-Channel Messaging",
        description:
          "Send announcements, alerts, and updates through approved channels with delivery proof.",
        highlights: [
          "Replaces: ad-hoc WhatsApp groups and SMS lists",
          "Operational shift: role-aware broadcast and targeting",
          "Outputs: delivery status and read receipts",
          "Controls: approval gates for sensitive messages",
        ],
      },
      {
        name: "Parent Portal & App",
        description: "Give families one place for attendance, homework, fees, and school updates.",
        highlights: [
          "Replaces: scattered portals and notice boards",
          "Operational shift: parents self-serve without office calls",
          "Outputs: real-time updates and fee history",
          "Controls: permissioned access per guardian",
        ],
      },
      {
        name: "Notice Board & Events",
        description: "Publish announcements, events, and calendars in one verified stream.",
        highlights: [
          "Replaces: paper circulars and manual follow-ups",
          "Operational shift: scheduled notices with ownership",
          "Outputs: event RSVPs and acknowledgements",
          "Controls: publishing approval and audit trail",
        ],
      },
    ],
  },
  {
    id: "transport",
    name: "Transport Management",
    icon: Bus,
    gradient: "from-sky-500/20 via-cyan-500/10",
    features: [
      {
        name: "Route & Vehicle Management",
        description: "Plan routes, assign vehicles, and track transport compliance.",
        highlights: [
          "Replaces: route sheets and manual registers",
          "Operational shift: transport data tied to student records",
          "Outputs: route rosters and driver logs",
          "Controls: vehicle maintenance checklists",
        ],
      },
      {
        name: "Live GPS Tracking",
        description: "Provide live bus status and ETAs with clear alerts.",
        highlights: [
          "Replaces: phone calls and manual ETA updates",
          "Operational shift: real-time visibility for parents",
          "Outputs: trip history and delay logs",
          "Controls: exception alerts for deviations",
        ],
      },
      {
        name: "Transport Fee Management",
        description: "Collect transport fees with route-wise pricing and receipts.",
        highlights: [
          "Replaces: separate fee sheets",
          "Operational shift: transport dues flow into finance",
          "Outputs: route-wise billing and receipts",
          "Controls: fee approvals and audit trail",
        ],
      },
    ],
  },
  {
    id: "hostel",
    name: "Hostel Management",
    icon: Home,
    gradient: "from-rose-500/20 via-pink-500/10",
    features: [
      {
        name: "Room Allocation",
        description: "Track blocks, rooms, and bed allocation with availability in view.",
        highlights: [
          "Replaces: manual allocation registers",
          "Operational shift: allocations tied to student records",
          "Outputs: occupancy reports and waitlists",
          "Controls: swap approvals and logs",
        ],
      },
      {
        name: "Hostel Fee & Billing",
        description: "Manage hostel fees, mess charges, and ancillary billing.",
        highlights: [
          "Replaces: separate hostel billing ledgers",
          "Operational shift: hostel dues flow into finance",
          "Outputs: billing schedules and receipts",
          "Controls: approvals for concessions",
        ],
      },
      {
        name: "Attendance & Security",
        description: "Track hostel attendance, visitors, and gate passes with accountability.",
        highlights: [
          "Replaces: paper gate registers",
          "Operational shift: daily logs tied to student records",
          "Outputs: visitor logs and exceptions",
          "Controls: approval workflow for passes",
        ],
      },
    ],
  },
  {
    id: "library",
    name: "Library System",
    icon: BookOpen,
    gradient: "from-indigo-500/20 via-purple-500/10",
    features: [
      {
        name: "Book Cataloging",
        description: "Maintain catalog with copies, categories, and availability status.",
        highlights: [
          "Replaces: card catalogs and ad-hoc lists",
          "Operational shift: centralized catalog across campuses",
          "Outputs: availability status and inventory lists",
          "Controls: issuance policies by role",
        ],
      },
      {
        name: "Issue & Return",
        description: "Track issues, returns, renewals, and overdue fines with due dates.",
        highlights: [
          "Replaces: manual issue slips",
          "Operational shift: automated overdue tracking",
          "Outputs: borrower history and fine reports",
          "Controls: approvals for waivers",
        ],
      },
      {
        name: "Library Analytics",
        description: "Understand usage trends and inventory needs.",
        highlights: [
          "Replaces: manual stock checks",
          "Operational shift: live utilization insights",
          "Outputs: popular titles and loss reports",
          "Controls: audit-ready circulation logs",
        ],
      },
    ],
  },
  {
    id: "hr",
    name: "HR & Payroll",
    icon: Briefcase,
    gradient: "from-teal-500/20 via-cyan-500/10",
    features: [
      {
        name: "Staff Management",
        description: "Maintain employee records with documents, credentials, and contracts.",
        highlights: [
          "Replaces: paper files and scattered docs",
          "Operational shift: centralized staff profile source",
          "Outputs: compliance-ready staff records",
          "Controls: access by role and department",
        ],
      },
      {
        name: "Payroll Processing",
        description: "Calculate payroll with attendance and statutory deductions.",
        highlights: [
          "Replaces: manual salary sheets",
          "Operational shift: payroll tied to attendance data",
          "Outputs: payslips and payroll registers",
          "Controls: approval workflow for payouts",
        ],
      },
      {
        name: "Staff Attendance",
        description: "Track staff attendance with shifts and overtime controls.",
        highlights: [
          "Replaces: manual attendance registers",
          "Operational shift: attendance flows into payroll",
          "Outputs: shift summaries and exceptions",
          "Controls: supervisor approvals",
        ],
      },
    ],
  },
];

export function FeatureExplorer() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeFeature, setActiveFeature] = useState(categories[0].features[0]);
  const featureRef = useRef<HTMLDivElement>(null);
  const roleNav = [
    { label: "Academics", categoryId: "academic" },
    { label: "Administration", categoryId: "admissions" },
    { label: "Finance", categoryId: "finance" },
  ];

  useEffect(() => {
    if (!featureRef.current) return;
    const featureName = activeFeature.name;
    featureRef.current.dataset.feature = featureName;

    gsap.fromTo(
      featureRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [activeFeature]);

  return (
    <section
      id="feature-explorer"
      className="relative border-b border-white/5 bg-neutral-950 px-4 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-neutral-400">
            <Sparkles className="h-3 w-3" />
            Feature Explorer
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">Explore by Category</h2>
          <p className="mx-auto max-w-2xl text-neutral-300">
            Dive deep into each module. Click a category to explore features built for calm,
            predictable operations under load.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs uppercase tracking-[0.3em] text-neutral-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
              Explore by role
            </span>
            {roleNav.map((role) => (
              <button
                key={role.label}
                type="button"
                onClick={() => {
                  const nextCategory = categories.find(
                    (category) => category.id === role.categoryId
                  );
                  if (!nextCategory) return;
                  setActiveCategory(nextCategory);
                  setActiveFeature(nextCategory.features[0]);
                }}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold tracking-[0.2em] text-neutral-200 transition hover:border-white/25 hover:text-white"
              >
                {role.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Category sidebar */}
          <div className="space-y-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory.id === category.id;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveFeature(category.features[0]);
                  }}
                  whileHover={{ x: 4 }}
                  className={`group relative w-full overflow-hidden rounded-xl border p-4 text-left transition-all ${
                    isActive
                      ? "border-white/20 bg-gradient-to-br from-neutral-900 to-neutral-950 shadow-lg"
                      : "border-white/10 bg-neutral-900/50 hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-lg border border-white/10 p-2 ${
                        isActive ? "bg-white/10" : "bg-white/5"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-neutral-400"}`} />
                    </div>
                    <span
                      className={`text-sm font-medium ${isActive ? "text-white" : "text-neutral-300"}`}
                    >
                      {category.name}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Feature content */}
          <div className="space-y-6">
            {/* Feature tabs */}
            <div className="flex flex-wrap gap-2">
              {activeCategory.features.map((feature, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setActiveFeature(feature)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    activeFeature.name === feature.name
                      ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                      : "border-white/10 bg-white/5 text-neutral-400 hover:border-white/20 hover:text-neutral-200"
                  }`}
                >
                  {feature.name}
                </button>
              ))}
            </div>

            {/* Feature details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.name}
                ref={featureRef}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl border border-white/10 bg-gradient-to-br ${activeCategory.gradient} to-transparent p-8`}
              >
                <h3 className="mb-4 text-2xl font-bold text-white">{activeFeature.name}</h3>
                <p className="mb-6 text-neutral-300">{activeFeature.description}</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {activeFeature.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                      <span className="text-sm text-neutral-200">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
