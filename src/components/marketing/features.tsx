"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  type IconComponent,
  Languages,
  Radio,
  Shield,
  TrendingUp,
  Workflow,
  X,
  Zap,
} from "@/components/icons";
import { useGsapReveal } from "@/lib/gsap-utils";
import { cn } from "@/lib/utils";

type LanguageMeta = {
  code: string;
  englishName: string;
  nativeName: string;
  locale: string;
  glow: string;
  fontClass?: string;
  greetingNative?: string;
  greetingEnglish: string;
  notificationNative?: string;
  notificationEnglish: string;
};

const featureData: Array<{
  title: string;
  description: string;
  shortDescription: string;
  points: string[];
  icon: IconComponent;
  gradient: string;
  stats: Array<{ icon: IconComponent; value: string; label: string }>;
}> = [
  {
    title: "Realtime academic intelligence",
    description:
      "See the health of every class, branch, and student in one view so you can intervene early, no more stitching spreadsheets.",
    shortDescription: "Live academic health across every class and branch.",
    points: [
      "Live attendance, engagement, and performance signals",
      "Drill to class, branch, or student in seconds",
      "Board-ready exports for leadership and auditors",
    ],
    icon: Activity,
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    stats: [
      { icon: TrendingUp, value: "100%", label: "Real-time" },
      { icon: Zap, value: "<1 sec", label: "Insights" },
    ],
  },
  {
    title: "Student lifecycle automation",
    description:
      "Admissions, timetables, exams, and fee cycles run on one timeline so your team prioritizes people over paperwork.",
    shortDescription: "Admissions to exams on one shared timeline.",
    points: [
      "Guided workflows from inquiry → graduation",
      "Automated alerts for approvals, dues, transport, and hostel",
      "Templates that mirror your institutional policies",
    ],
    icon: Workflow,
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    stats: [
      { icon: Zap, value: "93%", label: "Automated" },
      { icon: TrendingUp, value: "18 hrs/wk", label: "Saved" },
    ],
  },
  {
    title: "Unified communication & engagement",
    description:
      "Send the right message to the right audience with proof of delivery so parents, staff, and students stay aligned.",
    shortDescription: "Targeted messaging with delivery proof built in.",
    points: [
      "Multichannel announcements (email, SMS, app)",
      "Two-way teacher-guardian collaboration with controls",
      "Consent management, read receipts, and audit trails",
    ],
    icon: Radio,
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    stats: [
      { icon: TrendingUp, value: "97%", label: "Reach rate" },
      { icon: Zap, value: "4x faster", label: "Delivery" },
    ],
  },
  {
    title: "Infrastructure you can trust",
    description:
      "Security, scale, and uptime that feel invisible so your campuses stay online and compliant year after year.",
    shortDescription: "Secure, compliant, and always-on infrastructure.",
    points: [
      "Encrypted storage and role-based access at every layer",
      "24x7 monitoring, backups, and global delivery",
      "Friendly integrations with LMS, ERP, and payments",
    ],
    icon: Shield,
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    stats: [
      { icon: Shield, value: "99.98%", label: "Uptime" },
      { icon: CheckCircle2, value: "Zero", label: "Breaches" },
    ],
  },
];

export function Features() {
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const snapshotRef = useRef<HTMLDivElement | null>(null);

  useGsapReveal(cardsRef, { selector: ".js-feature-card", stagger: 0.08 });
  useGsapReveal(snapshotRef, { y: 24 });

  return (
    <section
      id="features"
      className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral py-10 px-4 md:px-8 md:py-14"
      aria-label="Core features of SquareCampus"
    >
      <div className="mx-auto max-w-6xl space-y-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">
          Platform signals
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
          SquareCampus replaces 5+ disconnected tools with one campus OS
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-neutral-400 md:text-base">
          <span className="sm:hidden">
            One OS for admissions, academics, finance, and communication.
          </span>
          <span className="hidden sm:inline">
            Run admissions, academics, finance, communication, and facilities in a single,
            responsive workspace. One login, one timeline, one source of truth for every campus.
          </span>
        </p>
      </div>

      <div ref={cardsRef} className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
        {featureData.map((feature) => {
          const Icon = feature.icon;
          return (
            <article
              key={feature.title}
              className="js-feature-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-neutral-900/70 to-neutral-950 p-5 text-sm text-neutral-200 shadow-2xl shadow-black/40 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-white/15 hover:shadow-2xl hover:shadow-black/60"
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              {/* Content */}
              <div className="relative">
                {/* Icon header */}
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div
                    className="rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10"
                  >
                    <Icon className="h-5 w-5 text-white/70 transition-colors duration-300 group-hover:text-white" />
                  </div>

                  {/* Stats badges */}
                  <div className="flex gap-1.5">
                    {feature.stats.map((stat, statIndex) => {
                      const StatIcon = stat.icon;
                      return (
                        <div
                          key={stat.label}
                          className={cn(
                            "flex items-center gap-1.5 rounded-lg border border-white/10 bg-neutral-900/80 px-2 py-1 backdrop-blur-sm",
                            statIndex === 1 && "hidden sm:flex"
                          )}
                        >
                          <StatIcon className="h-2.5 w-2.5 text-white/60" />
                          <div className="text-right">
                            <p className="text-[0.7rem] font-semibold leading-tight text-white">
                              {stat.value}
                            </p>
                            <p className="text-[0.55rem] uppercase leading-tight tracking-wider text-white/40">
                              {stat.label}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/50">
                    {feature.title}
                  </p>
                  <p className="mt-2 text-sm leading-snug text-neutral-100">
                    <span className="sm:hidden">{feature.shortDescription}</span>
                    <span className="hidden sm:inline">{feature.description}</span>
                  </p>
                </div>
              </div>

              <div className="relative mt-4 grid grid-cols-1 gap-2 text-xs text-neutral-100 sm:grid-cols-2">
                {feature.points.map((point, pointIndex) => (
                  <div
                    key={point}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 shadow-inner shadow-black/30 backdrop-blur-sm transition group-hover:border-white/25 group-hover:bg-white/10",
                      pointIndex === 2 && "hidden sm:flex"
                    )}
                  >
                    <span className="leading-snug text-neutral-200">{point}</span>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <div
        ref={snapshotRef}
        className="mx-auto mt-12 max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950 p-6 shadow-2xl shadow-black/60"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/40">
              Platform snapshot
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              Beautiful, legible dashboards that keep decisions visible.
            </p>
            <p className="mt-2 text-sm text-neutral-300">
              Board-ready reports, compliance logs, and student journeys live in one place, no
              exports needed.
            </p>
          </div>
          <Image
            src="/images/marketing/dashboard.png"
            alt="SquareCampus dashboard"
            width={360}
            height={220}
            className="h-44 w-full max-w-xs rounded-2xl border border-white/10 object-cover shadow-lg shadow-blue-500/20"
          />
        </div>
      </div>
      <FeatureVisual />
      <LanguageSupportSection />
    </section>
  );
}

const FeatureVisual = () => {
  const ref = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);
  const criticalRef = useRef<HTMLDivElement>(null);

  useGsapReveal(ref, { y: 24 });

  useEffect(() => {
    if (!floatRef.current) return;
    const tween = gsap.to(floatRef.current, {
      y: -6,
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    if (!riskRef.current) return;
    const tween = gsap.fromTo(
      riskRef.current,
      { boxShadow: "0 0 0 0 rgba(251,191,36,0.2)" },
      { boxShadow: "0 0 0 8px rgba(251,191,36,0)", duration: 2.2, repeat: -1, ease: "power1.out" }
    );
    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    if (!criticalRef.current) return;
    gsap.set(criticalRef.current, { opacity: 0.75 });
    const tween = gsap.to(criticalRef.current, {
      opacity: 1,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="mx-auto mt-8 max-w-6xl rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/70 to-neutral-950/90 p-6 shadow-2xl shadow-black/60 sm:mt-12"
    >
      <div className="relative flex flex-col-reverse gap-6 lg:flex-row lg:items-center">
        {/* Narrative side – the briefing */}
        <div className="flex-1 space-y-4 text-sm text-neutral-200">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/50">
            Pain-free operations
          </p>
          <h3 className="text-2xl font-semibold text-white">
            Built to keep every school day on rails
          </h3>
          <p>
            SquareCampus orchestrates academics, finance, communication, and facilities so small
            schools stay agile and large institutions stay predictable, no swivel-chairing between
            apps. It&apos;s not a nice-to-have; it&apos;s the control center that keeps every bell,
            bus, bill, and broadcast on time.
          </p>
          <ul className="grid gap-3 text-sm text-neutral-100 md:grid-cols-2">
            <li className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-blue-400" />
              <span>Single source of truth across admissions, academics, and finance.</span>
            </li>
            <li className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-purple-400" />
              <span>Predictable daily playbook with alerts before issues snowball.</span>
            </li>
            <li className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              <span>Audit-ready logs and approvals baked into every workflow.</span>
            </li>
            <li className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-orange-400" />
              <span>7-day rollout with migration, training, and implementation support.</span>
            </li>
          </ul>
        </div>

        {/* Cards side – the tactical layout */}
        <div className="relative w-full max-w-md shrink-0 space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div
              ref={floatRef}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/20 via-neutral-900 to-neutral-950 p-4 shadow-xl shadow-blue-500/20"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Non-negotiable</p>
              <p className="mt-2 text-lg font-semibold text-white">
                Control center for every workflow
              </p>
              <p className="mt-2 text-sm text-neutral-200">
                Admissions, timetables, finance, transport, and communication run on one timeline.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/15 via-neutral-900 to-neutral-950 p-4 shadow-xl shadow-purple-500/20">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Risk removed</p>
              <p className="mt-2 text-xl font-semibold text-white">Audit-ready by default</p>
              <p className="mt-2 text-sm text-neutral-200">
                Role-based access, approvals, and logs ensure compliance without extra tools.
              </p>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left">
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Uptime</p>
              <p className="text-lg font-semibold text-white">99.9%</p>
              <p className="text-xs text-neutral-300">Monitored, resilient cloud</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left">
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Go-live</p>
              <p className="text-lg font-semibold text-white">Under 7 days</p>
              <p className="text-xs text-neutral-300">Migration + training included</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left">
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Time saved</p>
              <p className="text-lg font-semibold text-white">15–20 hrs</p>
              <p className="text-xs text-neutral-300">Per team every week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row – from abstract graph to real control view */}
      <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)]">
        {/* Today at a glance – a mini day timeline */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Today at a glance</p>
          <div className="rounded-2xl border border-white/10 bg-neutral-900/80 p-3 text-xs text-neutral-200">
            <div className="flex items-center gap-2 pb-3 text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">
              <Clock className="h-3.5 w-3.5" />
              <span>Campus timeline</span>
            </div>
            <div className="space-y-2">
              {/* Row 1 */}
              <div className="timeline-item flex items-center justify-between gap-3 rounded-xl bg-neutral-800/70 px-3 py-2">
                <div className="flex items-center gap-3">
                  <span className="text-[0.78rem] text-neutral-300">08:00</span>
                  <div>
                    <p className="text-[0.8rem] font-semibold text-neutral-100">
                      Morning attendance
                    </p>
                    <p className="text-[0.72rem] text-neutral-400">96% present · 4% absent</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[0.7rem] font-semibold text-emerald-300">
                  On track
                </span>
              </div>
              {/* Row 2 – lightly at risk */}
              <div
                ref={riskRef}
                className="timeline-item flex items-center justify-between gap-3 rounded-xl border border-amber-500/50 bg-amber-500/10 px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[0.78rem] text-neutral-300">10:30</span>
                  <div>
                    <p className="text-[0.8rem] font-semibold text-neutral-100">Mid-term exams</p>
                    <p className="text-[0.72rem] text-neutral-200">
                      2 rooms over capacity · 1 invigilator missing
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-amber-500/20 px-2 py-1 text-[0.7rem] font-semibold text-amber-300">
                  Needs action
                </span>
              </div>
              {/* Row 3 */}
              <div className="timeline-item flex items-center justify-between gap-3 rounded-xl bg-neutral-800/70 px-3 py-2">
                <div className="flex items-center gap-3">
                  <span className="text-[0.78rem] text-neutral-300">14:00</span>
                  <div>
                    <p className="text-[0.8rem] font-semibold text-neutral-100">
                      Transport dispatch
                    </p>
                    <p className="text-[0.72rem] text-neutral-400">
                      18 routes · 1 route delayed by 10 mins
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-sky-500/15 px-2 py-1 text-[0.7rem] font-semibold text-sky-300">
                  Monitored
                </span>
              </div>
              {/* Row 4 */}
              <div className="timeline-item flex items-center justify-between gap-3 rounded-xl bg-neutral-800/70 px-3 py-2">
                <div className="flex items-center gap-3">
                  <span className="text-[0.78rem] text-neutral-300">17:30</span>
                  <div>
                    <p className="text-[0.8rem] font-semibold text-neutral-100">Fees & reminders</p>
                    <p className="text-[0.72rem] text-neutral-400">
                      Auto-reminders sent to 42 pending accounts
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-neutral-700/80 px-2 py-1 text-[0.7rem] font-semibold text-neutral-200">
                  Automated
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Exception queue – what actually needs attention */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Exception queue</p>
          <div className="rounded-2xl border border-white/10 bg-neutral-900/80 p-3 text-xs text-neutral-200">
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">
                <Bell className="h-3.5 w-3.5" />
                <span>Alerts that need humans</span>
              </div>
              <span className="rounded-full bg-neutral-800 px-2 py-1 text-[0.68rem] text-neutral-300">
                3 open
              </span>
            </div>

            <div className="space-y-2">
              {/* Critical */}
              <div
                ref={criticalRef}
                className="flex items-start gap-3 rounded-xl border border-rose-500/60 bg-rose-500/10 px-3 py-2"
              >
                <div className="mt-0.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-[0.8rem] font-semibold text-rose-50">
                    Attendance dip in Grade 9
                  </p>
                  <p className="text-[0.72rem] text-rose-100/90">
                    4 sections below 80% · escalation recommended.
                  </p>
                  <div className="flex flex-wrap gap-2 text-[0.68rem]">
                    <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-rose-100">
                      Academic risk
                    </span>
                    <span className="rounded-full bg-neutral-900/80 px-2 py-0.5 text-neutral-200">
                      Notify principal
                    </span>
                  </div>
                </div>
              </div>

              {/* Medium */}
              <div className="flex items-start gap-3 rounded-xl bg-neutral-850/80 px-3 py-2">
                <div className="mt-0.5">
                  <Clock className="h-3.5 w-3.5 text-amber-200" />
                </div>
                <div className="space-y-1">
                  <p className="text-[0.8rem] font-semibold text-neutral-100">
                    Transport delay, Route 7
                  </p>
                  <p className="text-[0.72rem] text-neutral-300">
                    Expected delay: 12 minutes · parents notified automatically.
                  </p>
                  <span className="inline-flex rounded-full bg-amber-500/15 px-2 py-0.5 text-[0.68rem] text-amber-200">
                    In progress
                  </span>
                </div>
              </div>

              {/* Low */}
              <div className="flex items-start gap-3 rounded-xl bg-neutral-850/80 px-3 py-2">
                <div className="mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-[0.8rem] font-semibold text-neutral-100">
                    Fee follow-ups generated
                  </p>
                  <p className="text-[0.72rem] text-neutral-300">
                    24 pending accounts queued for reminders today.
                  </p>
                  <span className="inline-flex rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.68rem] text-emerald-200">
                    Automated task
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LanguageSupportSection = () => {
  /*
     Each language is an ally on the ground.
     englishName: for clarity.
     nativeName: for respect.
     greeting*: for a small, human moment when someone clicks.
  */
  const languages: LanguageMeta[] = [
    {
      code: "EN",
      englishName: "English",
      nativeName: "English",
      locale: "en-IN",
      glow: "from-blue-400 to-blue-600",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "Welcome to SquareCampus.",
      notificationEnglish: "Good morning! Here's to a great school day ahead.",
      notificationNative: "Good morning! Here's to a great school day ahead.",
    },
    {
      code: "HI",
      englishName: "Hindi",
      nativeName: "हिन्दी",
      locale: "hi-IN",
      glow: "from-amber-400 to-orange-500",
      fontClass: "font-devanagari",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus में आपका स्वागत है।",
      notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 सुप्रभात! आपके दिन की शानदार शुरुआत हो।",
    },
    {
      code: "KN",
      englishName: "Kannada",
      nativeName: "ಕನ್ನಡ",
      locale: "kn-IN",
      glow: "from-sky-400 to-sky-600",
      fontClass: "font-kannada",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus ಗೆ ನಿಮಗೆ ಸ್ವಾಗತ.",
      notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 ಶುಭೋದಯ! ನಿಮ್ಮ ದಿನ ಅದ್ಭುತವಾಗಲಿ.",
    },
    {
      code: "TA",
      englishName: "Tamil",
      nativeName: "தமிழ்",
      locale: "ta-IN",
      glow: "from-purple-400 to-purple-600",
      fontClass: "font-tamil",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus-க்கு வரவேற்கிறோம்.",
      notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 காலை வணக்கம்! உங்கள் நாள் அருமையாக அமையட்டும்.",
    },
    {
      code: "TE",
      englishName: "Telugu",
      nativeName: "తెలుగు",
      locale: "te-IN",
      glow: "from-emerald-400 to-emerald-600",
      fontClass: "font-telugu",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus కు స్వాగతం.",
      notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 శుభోదయం! మీ రోజు అద్భుతంగా సాగాలి.",
    },
    {
      code: "MR",
      englishName: "Marathi",
      nativeName: "मराठी",
      locale: "mr-IN",
      glow: "from-rose-400 to-rose-600",
      fontClass: "font-devanagari",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus मध्ये आपले स्वागत आहे.",
      notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 शुभ प्रभात! तुमचा दिवस छान जावो.",
    },
    {
      code: "GU",
      englishName: "Gujarati",
      nativeName: "ગુજરાતી",
      locale: "gu-IN",
      glow: "from-cyan-400 to-cyan-600",
      fontClass: "font-gujarati",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus માં આપનું સ્વાગત છે.",
      notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 સુપ્રભાત! તમારો દિવસ સારો રીતે પસાર થાય.",
    },
    {
      code: "ML",
      englishName: "Malayalam",
      nativeName: "മലയാളം",
      locale: "ml-IN",
      glow: "from-green-400 to-green-600",
      fontClass: "font-malayalam",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus-ലേക്ക് സ്വാഗതം.",
      notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 സുപ്രഭാതം! നിങ്ങളുടെ ദിവസം മനോഹരമാവട്ടെ.",
    },
    {
      code: "BN",
      englishName: "Bengali",
      nativeName: "বাংলা",
      locale: "bn-IN",
      glow: "from-pink-400 to-pink-600",
      fontClass: "font-bengali",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus-এ আপনাকে স্বাগতম।",
      notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 সুপ্রভাত! আপনার দিনটি ভালো কাটুক।",
    },
    {
      code: "PA",
      englishName: "Punjabi",
      nativeName: "ਪੰਜਾਬੀ",
      locale: "pa-IN",
      glow: "from-fuchsia-400 to-fuchsia-600",
      fontClass: "font-gurmukhi",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ।",
      notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 ਸ਼ੁਭ ਸਵੇਰ! ਤੁਹਾਡਾ ਦਿਨ ਚੰਗਾ ਲੰਘੇ।",
    },
    {
      code: "UR",
      englishName: "Urdu",
      nativeName: "اردو",
      locale: "ur-IN",
      glow: "from-slate-300 to-slate-500",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus میں خوش آمدید۔",
      notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 صبح بخیر! آپ کا دن شاندار گزرے۔",
    },
    {
      code: "OR",
      englishName: "Odia",
      nativeName: "ଓଡିଆ",
      locale: "or-IN",
      glow: "from-amber-300 to-orange-500",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus କୁ ସ୍ୱାଗତ।",
      notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 ସୁପ୍ରଭାତ! ଆପଣଙ୍କ ଦିନ ଅଦ୍ଭୁତ ହେଉ।",
    },
    {
      code: "AS",
      englishName: "Assamese",
      nativeName: "অসমীয়া",
      locale: "as-IN",
      glow: "from-lime-400 to-emerald-500",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus-লৈ স্বাগতম।",
      notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 শুভ প্ৰভাত! আপোনাৰ দিনটো অদ্ভুত হওক।",
    },
    {
      code: "NE",
      englishName: "Nepali",
      nativeName: "नेपाली",
      locale: "ne-IN",
      glow: "from-indigo-400 to-indigo-600",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus मा तपाईंलाई स्वागत छ।",
      notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 शुभ प्रभात! तपाईंको दिन रमाइलो होस्।",
    },
    {
      code: "KO",
      englishName: "Konkani",
      nativeName: "कोंकणी",
      locale: "kok-IN",
      glow: "from-teal-400 to-cyan-600",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus मध्ये तुमचं स्वागत आहे.",
      notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 शुभ प्रभात! तुमचा दिवस छान जावो.",
    },
  ];

  const [active, setActive] = useState<LanguageMeta | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useGsapReveal(sectionRef, { y: 24 });
  useGsapReveal(gridRef, { selector: ".js-language-card", stagger: 0.04, threshold: 0.1 });

  // Close on outside click / Escape
  useEffect(() => {
    if (!active) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setActive(null);
      }
    };

    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;

    if (modalRef.current) {
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    }
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.96, y: 8, filter: "blur(4px)" },
        { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 0.25, ease: "power2.out" }
      );
    }
  }, [active]);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto mt-28 max-w-6xl px-6 py-16 text-neutral-200"
    >
      <div className="mx-auto max-w-4xl space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/50">
          Made for India
        </p>
        <h2 className="text-3xl font-semibold text-white md:text-4xl">
          Built for the languages India speaks
        </h2>
        <p className="text-sm leading-relaxed text-neutral-400 md:text-base">
          SquareCampus ships with support for India&apos;s major languages so administrators,
          teachers, parents, and students can use the platform comfortably in the language they
          prefer. Adoption improves, support tickets drop, and communication becomes seamless.
        </p>
      </div>

      {/* Language grid */}
      <div
        ref={gridRef}
        className="relative mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => setActive(lang)}
            className="js-language-card group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 p-4 text-left shadow-[0_0_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur outline-none ring-offset-0 transition hover:border-white/40 focus-visible:ring-2 focus-visible:ring-neutral-200"
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10",
                lang.glow
              )}
            />
            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-neutral-400">
              {lang.code}
            </p>
            <div className="mt-2 space-y-1">
              <span
                lang={lang.locale}
                className={cn("block text-sm font-semibold text-white", lang.fontClass)}
              >
                {lang.nativeName}
              </span>
              <span className="block text-[0.7rem] uppercase tracking-[0.3em] text-neutral-500">
                {lang.englishName}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Highlight card */}
      <div className="mx-auto mt-14 max-w-xl rounded-2xl border border-white/10 bg-neutral-900/70 p-6 shadow-xl backdrop-blur">
        <div className="flex flex-col items-center space-y-3 text-center">
          <Languages className="h-8 w-8 text-neutral-400" />
          <p className="text-sm text-neutral-300">
            <span className="font-semibold text-white">
              Parent-friendly. Teacher-friendly. Admin-friendly.
            </span>{" "}
            Interfaces adapt to the chosen language, while reports and exports can still be
            generated in English for auditors and regulators.
          </p>
        </div>
      </div>

      {/* Popover – friendly greeting in the selected language */}
      {active && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

          {/* Ambient glow */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.12), transparent 70%)",
            }}
          />

          {/* Panel */}
          <div
            ref={(node) => {
              popoverRef.current = node;
              panelRef.current = node;
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="language-greeting-title"
            className={cn(
              "relative z-10 w-full max-w-sm rounded-2xl border border-white/15 bg-neutral-950/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur-xl",
              "before:absolute before:inset-0 before:bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.05),transparent)] before:opacity-20",
              "after:absolute after:inset-0 after:bg-[linear-gradient(-115deg,transparent,rgba(255,255,255,0.04),transparent)] after:opacity-20"
            )}
          >
              <div className="flex items-start justify-between gap-3 relative z-10">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.35em] text-neutral-400">
                    Language selected
                  </p>
                  <h3
                    id="language-greeting-title"
                    className="mt-1 text-sm font-semibold text-white flex items-center gap-2"
                  >
                    <span>{active.nativeName}</span>
                    <span className="text-neutral-400 text-xs">({active.englishName})</span>
                    <span className="inline-flex items-center justify-center rounded-md border border-white/10 bg-neutral-900/80 px-2 py-0.5 text-[0.6rem] uppercase tracking-wide text-neutral-500">
                      {active.code}
                    </span>
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-neutral-700/70 bg-neutral-900 text-neutral-300 hover:border-neutral-300 hover:text-white hover:rotate-90 transition-transform duration-200"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-sm text-neutral-200">
                {/* Greeting Bubble */}
                <p
                  lang={active.locale}
                  className={cn(
                    "rounded-xl bg-neutral-900/60 border border-white/10 px-4 py-2 shadow-inner shadow-black/20",
                    active.fontClass
                  )}
                >
                  {active.greetingNative ?? active.greetingEnglish}
                </p>

                {active.greetingNative && (
                  <p className="text-[0.8rem] text-neutral-400">{active.greetingEnglish}</p>
                )}
              </div>

              {/* Example UI snippet */}
              <div className="mt-4 rounded-xl border border-white/10 bg-neutral-900/60 p-3 text-xs text-neutral-300 font-medium">
                <p lang={active.locale} className={cn("leading-relaxed", active.fontClass)}>
                  {active.notificationNative ?? active.notificationEnglish}
                </p>
                {active.notificationNative && (
                  <p className="mt-1 text-[0.7rem] text-neutral-500">
                    {active.notificationEnglish}
                  </p>
                )}
              </div>

              <p className="mt-4 text-[0.78rem] text-neutral-400 leading-relaxed">
                SquareCampus adapts key experiences into{" "}
                <span className="font-semibold text-neutral-100">{active.englishName}</span>: parent
                apps, notifications, attendance updates, fee reminders, while admins can continue
                working in English if they prefer.
              </p>
          </div>
        </div>
      )}
    </section>
  );
};
