"use client";

import React, { useId } from "react";
import { IconMailFilled } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { MacbookScroll } from "./macbook";

const contactHighlights = [
    "Response in under 24 hours",
    "Strategic onboarding for every campus",
    "Dedicated customer success and security reviews",
];

export function ContactUs() {
    return (
        <section
            className="relative bg-neutral-950 px-4 py-16 md:px-6 md:py-24"
            id="contact-us"
        >
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2">
                {/* Left pane: narrative + contact options */}
                <div className="flex flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900/80 to-neutral-950/80 p-8 shadow-2xl shadow-black/50">
                    <div className="flex items-center justify-between">
                        <FeatureIconContainer className="flex items-center justify-center overflow-hidden">
                            <IconMailFilled className="h-6 w-6 text-blue-400" />
                        </FeatureIconContainer>
                        <span className="text-xs uppercase tracking-[0.6em] text-white/40">
                            Let&apos;s talk
                        </span>
                    </div>

                    <div>
                        <h2 className="text-3xl font-semibold text-white md:text-4xl">
                            Build your campus command center with us
                        </h2>
                        <p className="mt-4 text-base text-neutral-300">
                            Tell us about your campuses, goals, and timelines, and get a
                            tailored rollout plan, migration approach, and pricing designed
                            for your branches.
                        </p>
                    </div>

                    <div className="grid gap-3 text-sm text-neutral-200 sm:grid-cols-2">
                        <a
                            href="mailto:contact@squarecampus.com"
                            className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition hover:border-white"
                        >
                            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                                Email
                            </p>
                            <p className="text-sm text-white">contact@squarecampus.com</p>
                        </a>
                        <a
                            href="tel:+1800123XX21"
                            className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition hover:border-white"
                        >
                            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                                Call
                            </p>
                            <p className="text-sm text-white">+1 (800) 123 XX21</p>
                        </a>
                    </div>

                    <div className="grid gap-3 text-[0.6rem] uppercase tracking-[0.4em] text-white/50">
                        {contactHighlights.map((highlight) => (
                            <p
                                key={highlight}
                                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-center"
                            >
                                {highlight}
                            </p>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-4">
                        <a
                            href="#contact-form"
                            className="rounded-full border border-white/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white transition hover:border-white"
                        >
                            Book a demo
                        </a>
                        <Link
                            href="#ecosystem"
                            className="text-sm text-blue-400 hover:underline"
                        >
                            Explore ecosystem ↗
                        </Link>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                            <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                                Go-live
                            </p>
                            <p className="text-lg font-semibold text-white">Under 7 days</p>
                            <p className="text-xs text-neutral-300">
                                Migration + role-based training
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                            <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                                Security pack
                            </p>
                            <p className="text-lg font-semibold text-white">Available</p>
                            <p className="text-xs text-neutral-300">
                                Policies, audits, and controls
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                            <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                                Support
                            </p>
                            <p className="text-lg font-semibold text-white">24x7</p>
                            <p className="text-xs text-neutral-300">
                                Dedicated success partner
                            </p>
                        </div>
                    </div>

                    <div className="relative mt-2 rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-neutral-900 to-purple-500/10 p-4">
                        <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                            Fast track
                        </p>
                        <div className="mt-3 grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-neutral-100">
                                <p className="font-semibold text-white">Campus blueprint</p>
                                <p className="text-xs text-neutral-300">
                                    Map admissions, academics, finance, and communication in one
                                    working session.
                                </p>
                            </div>
                            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-neutral-100">
                                <p className="font-semibold text-white">Migration clinic</p>
                                <p className="text-xs text-neutral-300">
                                    We migrate your active term data and set guardrails for
                                    go-live across branches.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right pane: form */}
                <form
                    id="contact-form"
                    className="relative mx-auto flex w-full max-w-2xl flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900 to-neutral-950 p-6 sm:p-10"
                >
                    <Grid size={20} />

                    <div className="space-y-2">
                        <label
                            className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60"
                            htmlFor="name"
                        >
                            Full name
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            required
                            placeholder="What should we call you?"
                            className="w-full rounded-lg border border-white/5 bg-neutral-900/60 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            placeholder="email@yourschool.com"
                            className="w-full rounded-lg border border-white/5 bg-neutral-900/60 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60"
                            htmlFor="institution"
                        >
                            Institution
                        </label>
                        <input
                            id="institution"
                            name="institution"
                            type="text"
                            required
                            placeholder="Your school or college"
                            className="w-full rounded-lg border border-white/5 bg-neutral-900/60 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label
                                className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60"
                                htmlFor="role"
                            >
                                Role
                            </label>
                            <input
                                id="role"
                                name="role"
                                type="text"
                                placeholder="Administrator, Dean, Finance..."
                                className="w-full rounded-lg border border-white/5 bg-neutral-900/60 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60"
                                htmlFor="students"
                            >
                                Students
                            </label>
                            <input
                                id="students"
                                name="students"
                                type="text"
                                placeholder="e.g., 1,200 across 2 branches"
                                className="w-full rounded-lg border border-white/5 bg-neutral-900/60 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label
                            className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60"
                            htmlFor="message"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            placeholder="Tell us about your goals, current stack, and timeline"
                            className="w-full rounded-lg border border-white/5 bg-neutral-900/60 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 rounded-2xl border border-transparent bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-neutral-900 transition hover:bg-neutral-100"
                    >
                        Send message
                    </button>

                    <p className="mt-1 text-[0.7rem] text-neutral-500">
                        We usually respond within one business day for new campus
                        inquiries.
                    </p>
                </form>
            </div>

            <MacbookScroll
                src="/images/marketing/dashboard.png"
                showGradient={true}
            />
        </section>
    );
}

/* --- helpers unchanged --- */

type PinProps = {
    className?: string;
    label?: string;
    position?: {
        top?: string;
        bottom?: string;
        left?: string;
        right?: string;
    };
};

const Pin = ({ className, label = "We are here", position }: PinProps) => {
    return (
        <motion.div
            style={{
                transform: "translateZ(1px)",
                ...position,
            }}
            className={cn(
                "pointer-events-none absolute z-[60] flex h-40 w-96 items-center justify-center opacity-100 transition duration-500",
                className,
            )}
        >
            {/* ...same as your existing Pin implementation... */}
        </motion.div>
    );
};

export const FeatureIconContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "relative h-14 w-14 rounded-md bg-gradient-to-b from-neutral-800 to-neutral-950 p-[4px]",
                className,
            )}
        >
            <div
                className={cn(
                    "relative z-20 h-full w-full rounded-[5px] bg-neutral-800",
                    className,
                )}
            >
                {children}
            </div>
            <div className="absolute inset-x-0 bottom-0 z-30 mx-auto h-4 w-full rounded-full bg-neutral-600 opacity-50 blur-lg"></div>
            <div className="absolute inset-x-0 bottom-0 mx-auto h-px w-[60%] bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 mx-auto h-[8px] w-[60%] bg-gradient-to-r from-transparent via-gray-600 to-transparent blur-sm"></div>
        </div>
    );
};

export const Grid = ({
    pattern,
    size,
}: {
    pattern?: number[][];
    size?: number;
}) => {
    const p =
        pattern ??
        [
            [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
            [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
            [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
            [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
            [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        ];
    return (
        <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/30 to-zinc-900/30 opacity-10 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
                <GridPattern
                    width={size ?? 20}
                    height={size ?? 20}
                    x="-12"
                    y="4"
                    squares={p}
                    className="absolute inset-0 h-full w-full fill-white/100 stroke-white/100 mix-blend-overlay"
                />
            </div>
        </div>
    );
};

export function GridPattern({
    width,
    height,
    x,
    y,
    squares,
    ...props
}: any) {
    const patternId = useId();

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern
                    id={patternId}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill={`url(#${patternId})`}
            />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([sx, sy]: any, idx: number) => (
                        <rect
                            strokeWidth="0"
                            key={`${sx}-${sy}-${idx}`}
                            width={width + 1}
                            height={height + 1}
                            x={sx * width}
                            y={sy * height}
                        />
                    ))}
                </svg>
            )}
        </svg>
    );
}
