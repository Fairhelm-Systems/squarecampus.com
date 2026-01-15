"use client";

import { AlertTriangle, Clock, FileText, Shield } from "@/components/icons";
import { cn } from "@/lib/utils";

const documentMeta = {
  effectiveDate: "January 15, 2026",
  version: "1.0",
  documentId: "COMP-NOTICE-2025-001",
  jurisdiction: "Karnataka, India",
  governingLaw: "Indian IT Act 2000, IPC 1860",
};

const quickConsequences = [
  { label: "Civil Damages", value: "₹25L-₹1Cr+" },
  { label: "Criminal Prosecution", value: "Up to 7 years" },
  { label: "Public Disclosure", value: "Company named" },
  { label: "Regulatory Action", value: "Industry sanctions" },
];

export function Hero() {
  return (
    <section className="relative bg-neutral-950 pt-8 pb-16 sm:pt-12 sm:pb-24">
      {/* Warning Banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12">
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full",
              "border border-red-500/30 bg-red-950/50 px-4 py-2",
              "text-xs font-semibold uppercase tracking-widest text-red-400"
            )}
          >
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            <span>Legal Notice to Competitors</span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Notice to Competitors:{" "}
                <span className="text-red-400">Legal Consequences of Unauthorized Access</span>
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                MDTechSpire maintains zero tolerance for competitive espionage, credential
                solicitation, or unauthorized access to SquareCampus. This notice establishes actual
                knowledge and legal consequences.
              </p>
            </div>

            {/* Document Metadata */}
            <div
              className={cn(
                "rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 sm:p-6",
                "grid grid-cols-2 gap-4 text-xs sm:text-sm"
              )}
            >
              <div className="flex items-start gap-3">
                <Clock
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-500"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium text-neutral-400">Effective Date</p>
                  <p className="text-white">{documentMeta.effectiveDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-500"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium text-neutral-400">Document ID</p>
                  <p className="font-mono text-white">{documentMeta.documentId}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-500"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium text-neutral-400">Jurisdiction</p>
                  <p className="text-white">{documentMeta.jurisdiction}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-500"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium text-neutral-400">Version</p>
                  <p className="text-white">{documentMeta.version}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Consequences Summary */}
          <div className="lg:pl-8">
            <div
              className={cn(
                "rounded-2xl border-2 border-red-500/20 bg-gradient-to-br from-red-950/40 to-neutral-900/60 p-6 sm:p-8",
                "shadow-[0_0_60px_rgba(239,68,68,0.1)]"
              )}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
                  <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Violation Consequences</h2>
                  <p className="text-xs text-neutral-400">Immediate action on detection</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {quickConsequences.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-red-500/10 bg-red-950/30 p-4"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-red-400/80">
                      {item.label}
                    </p>
                    <p className="mt-1 text-lg font-bold text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg border border-amber-500/20 bg-amber-950/20 p-4">
                <p className="text-xs leading-relaxed text-amber-200/90">
                  <strong className="text-amber-300">Warning:</strong> Unauthorized access attempts
                  will be prosecuted to the fullest extent of the law. All access is logged and
                  monitored.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
