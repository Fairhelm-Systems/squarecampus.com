import { gsap } from "gsap"
import { useGsapReveal } from "@/lib/gsap-utils";
import { Clock, Bell, AlertTriangle, CheckCircle2 } from "@/components/icons";
import { useRef, useEffect } from "react";

export const FeatureVisual = () => {
    const ref = useRef<HTMLDivElement>(null);
    const floatRef = useRef<HTMLDivElement>(null);
    const riskRef = useRef<HTMLDivElement>(null);
    const criticalRef = useRef<HTMLDivElement>(null);

    useGsapReveal(ref, { y: 24 });

    useEffect(() => {
        const node = floatRef.current;
        if (!node) return;
        const tween = gsap.to(node, {
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
        const node = riskRef.current;
        if (!node) return;
        const tween = gsap.fromTo(
            node,
            { boxShadow: "0 0 0 0 rgba(251,191,36,0.2)" },
            { boxShadow: "0 0 0 8px rgba(251,191,36,0)", duration: 2.2, repeat: -1, ease: "power1.out" }
        );
        return () => {
            tween.kill();
        };
    }, []);

    useEffect(() => {
        const node = criticalRef.current;
        if (!node) return;
        gsap.set(node, { opacity: 0.75 });
        const tween = gsap.to(node, {
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
                            <span>Guided rollout with migration, training, and implementation support.</span>
                        </li>
                    </ul>
                </div>

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
                            <p className="text-lg font-semibold text-white">Reliable</p>
                            <p className="text-xs text-neutral-300">Monitored, resilient cloud</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left">
                            <p className="text-xs uppercase tracking-[0.35em] text-white/50">Go-live</p>
                            <p className="text-lg font-semibold text-white">Guided</p>
                            <p className="text-xs text-neutral-300">Migration + training included</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left">
                            <p className="text-xs uppercase tracking-[0.35em] text-white/50">Time saved</p>
                            <p className="text-lg font-semibold text-white">Hours back</p>
                            <p className="text-xs text-neutral-300">Per team each week</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)]">
                <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/50">Today at a glance</p>
                    <div className="rounded-2xl border border-white/10 bg-neutral-900/80 p-3 text-xs text-neutral-200">
                        <div className="flex items-center gap-2 pb-3 text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">
                            <Clock className="h-3.5 w-3.5" />
                            <span>Campus timeline</span>
                        </div>
                        <div className="space-y-2">
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