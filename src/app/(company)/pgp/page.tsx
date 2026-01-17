"use client";

import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
  SEO_CONFIG,
} from "@/lib/seo";
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Key,
  Lock,
  Mail,
  Shield,
} from "@/icons";
import { cn } from "@/lib/utils";

// PGP Key information
const pgpKeyData = {
  email: "security@squarecampus.com",
  keyId: "0x61C5208E",
  fingerprint: "5258 EF81 53BA A48E 9C97  A545 6B78 F402 61C5 208E",
  created: "2026-01-17",
  expires: "2028-01-17",
  algorithm: "RSA 4096-bit",
  downloadUrl: "/squarecampus-security.asc",
  publicKey: `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
w6YBetF5h8rgimZ+rZUg6RVJKA==
=G5SA
-----END PGP PUBLIC KEY BLOCK-----`,
};

const useCases = [
  {
    icon: Shield,
    title: "Security Vulnerability Reports",
    description: "Report security issues privately and securely. We take responsible disclosure seriously.",
    color: "emerald",
  },
  {
    icon: Lock,
    title: "Sensitive Communications",
    description: "Share confidential information that requires end-to-end encryption.",
    color: "blue",
  },
  {
    icon: Mail,
    title: "Verify Our Messages",
    description: "Confirm that emails claiming to be from SquareCampus security team are authentic.",
    color: "purple",
  },
];

const verificationSteps = [
  {
    step: "1",
    title: "Download the key",
    description: "Download the .asc file or copy the public key block below.",
    code: `curl -O https://squarecampus.com${pgpKeyData.downloadUrl}`,
  },
  {
    step: "2",
    title: "Import into your keyring",
    code: "gpg --import squarecampus-security.asc",
  },
  {
    step: "3",
    title: "Verify the fingerprint",
    description: `Ensure it matches: ${pgpKeyData.fingerprint}`,
  },
  {
    step: "4",
    title: "Encrypt your message",
    code: `gpg --encrypt --armor -r ${pgpKeyData.email} message.txt`,
  },
];

// Truncate key for display (first 3 and last 3 lines of the key body)
function getTruncatedKey(fullKey: string): string {
  const lines = fullKey.split("\n");
  const headerLine = lines[0]; // -----BEGIN PGP PUBLIC KEY BLOCK-----
  const footerLine = lines[lines.length - 1]; // -----END PGP PUBLIC KEY BLOCK-----
  const keyLines = lines.slice(1, -1).filter((l) => l.trim());

  if (keyLines.length <= 8) return fullKey;

  const firstLines = keyLines.slice(0, 3);
  const lastLines = keyLines.slice(-3);

  return [
    headerLine,
    "",
    ...firstLines,
    `... (${keyLines.length - 6} more lines) ...`,
    ...lastLines,
    "",
    footerLine,
  ].join("\n");
}

export default function PGPPage() {
  const [copied, setCopied] = useState(false);
  const [showFullKey, setShowFullKey] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pgpKeyData.publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      createWebPageSchema({
        name: "PGP Public Key | SquareCampus",
        description:
          "SquareCampus PGP public key for secure communications, vulnerability reports, and message verification.",
        url: `${SEO_CONFIG.baseUrl}/pgp`,
      }),
      createBreadcrumbSchema([
        { name: "Home", url: SEO_CONFIG.baseUrl },
        { name: "Security", url: `${SEO_CONFIG.baseUrl}/security` },
        { name: "PGP Key", url: `${SEO_CONFIG.baseUrl}/pgp` },
      ]),
    ],
  };

  return (
    <>
      <Script
        id="pgp-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="relative min-h-screen bg-neutral-950 text-white">
        <FloatingHomeButton href="/" />

        {/* Background effects */}
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-emerald-500/[0.03] blur-[120px]" />
          <div className="absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-blue-500/[0.03] blur-[120px]" />
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-sm">
                <Key className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-300">
                  Secure Communication
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                PGP Public Key
              </h1>

              {/* Subtitle */}
              <p className="max-w-2xl text-lg leading-relaxed text-neutral-300">
                Use this key to send encrypted messages to our security team or verify
                communications from SquareCampus.
              </p>

              {/* Key metadata cards */}
              <div className="grid gap-4 pt-4 grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Email", value: pgpKeyData.email, color: "emerald", truncate: true },
                  { label: "Algorithm", value: pgpKeyData.algorithm, color: "blue", truncate: false },
                  { label: "Created", value: pgpKeyData.created, color: "purple", truncate: false },
                  { label: "Expires", value: pgpKeyData.expires, color: "amber", truncate: false },
                ].map((item) => {
                  const colorClasses: Record<string, { border: string; bg: string; text: string }> = {
                    emerald: { border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400" },
                    blue: { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400" },
                    purple: { border: "border-purple-500/30", bg: "bg-purple-500/10", text: "text-purple-400" },
                    amber: { border: "border-amber-500/30", bg: "bg-amber-500/10", text: "text-amber-400" },
                  };
                  const colors = colorClasses[item.color];
                  return (
                    <div
                      key={item.label}
                      className={cn(
                        "rounded-xl border p-4 overflow-hidden",
                        colors.border,
                        colors.bg
                      )}
                    >
                      <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                        {item.label}
                      </p>
                      <p
                        className={cn(
                          "mt-1 font-mono text-sm",
                          colors.text,
                          item.truncate && "truncate"
                        )}
                        title={item.truncate ? item.value : undefined}
                      >
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Fingerprint Section */}
          <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
            <Card className="overflow-hidden border-white/[0.08] bg-gradient-to-br from-neutral-900/80 to-neutral-950">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2">
                    <Shield className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-white">Key Fingerprint</h2>
                    <p className="text-xs text-neutral-400">Always verify before trusting</p>
                  </div>
                </div>
                <div className="rounded-lg border border-white/[0.08] bg-neutral-950 p-4">
                  <code className="font-mono text-sm text-emerald-400 break-all">
                    {pgpKeyData.fingerprint}
                  </code>
                </div>
                <p className="mt-3 text-xs text-neutral-500">
                  Key ID: <span className="font-mono text-neutral-400">{pgpKeyData.keyId}</span>
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Use Cases */}
          <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-xl font-semibold text-white">When to Use This Key</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {useCases.map((useCase) => {
                const Icon = useCase.icon;
                const colorClasses: Record<string, { border: string; bg: string; text: string }> = {
                  emerald: { border: "border-emerald-500/20", bg: "bg-emerald-500/10", text: "text-emerald-400" },
                  blue: { border: "border-blue-500/20", bg: "bg-blue-500/10", text: "text-blue-400" },
                  purple: { border: "border-purple-500/20", bg: "bg-purple-500/10", text: "text-purple-400" },
                };
                const colors = colorClasses[useCase.color];
                return (
                  <Card
                    key={useCase.title}
                    className={cn(
                      "overflow-hidden border-white/[0.08] bg-neutral-900/50 transition-all duration-300 hover:border-white/[0.15]"
                    )}
                  >
                    <CardContent className="p-5">
                      <div className={cn("mb-3 inline-flex rounded-lg border p-2", colors.border, colors.bg)}>
                        <Icon className={cn("h-5 w-5", colors.text)} />
                      </div>
                      <h3 className="mb-2 font-semibold text-white">{useCase.title}</h3>
                      <p className="text-sm text-neutral-400">{useCase.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Public Key Block */}
          <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-white">Public Key</h2>
              <div className="flex gap-2">
                <a
                  href={pgpKeyData.downloadUrl}
                  download="squarecampus-security.asc"
                  className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition-all duration-200 hover:bg-emerald-500/20"
                >
                  <Download className="h-4 w-4" />
                  Download .asc
                </a>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200",
                    copied
                      ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400"
                      : "border-white/8 bg-white/2 text-neutral-300 hover:border-white/20 hover:bg-white/5"
                  )}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Key
                    </>
                  )}
                </button>
              </div>
            </div>
            <Card className="overflow-hidden border-white/[0.08] bg-neutral-950">
              <CardContent className="p-0">
                <pre className="overflow-x-auto p-6 font-mono text-xs leading-relaxed text-neutral-400">
                  {showFullKey ? pgpKeyData.publicKey : getTruncatedKey(pgpKeyData.publicKey)}
                </pre>
                <div className="border-t border-white/[0.08] px-6 py-3">
                  <button
                    type="button"
                    onClick={() => setShowFullKey(!showFullKey)}
                    className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
                  >
                    {showFullKey ? "Show less" : "Show full key"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* How to Use */}
          <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-xl font-semibold text-white">How to Use</h2>
            <div className="space-y-4">
              {verificationSteps.map((step) => (
                <Card
                  key={step.step}
                  className="overflow-hidden border-white/[0.08] bg-neutral-900/50"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-400">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{step.title}</h3>
                        {step.description && (
                          <p className="mt-1 text-sm text-neutral-400">{step.description}</p>
                        )}
                        {step.code && (
                          <code className="mt-2 block rounded-lg border border-white/[0.08] bg-neutral-950 px-4 py-2 font-mono text-xs text-cyan-400">
                            {step.code}
                          </code>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Security Notice */}
          <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <Card className="overflow-hidden border-amber-500/20 bg-gradient-to-br from-amber-950/20 to-neutral-950">
              <CardContent className="p-6">
                <h3 className="mb-3 font-semibold text-amber-400">Important Security Notes</h3>
                <ul className="space-y-2 text-sm text-neutral-300">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <span>Always verify the fingerprint through a separate channel before trusting this key.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <span>We will never ask for passwords, tokens, or sensitive credentials via email.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <span>For security vulnerabilities, email <a href="mailto:security@squarecampus.com" className="text-amber-400 hover:underline">security@squarecampus.com</a> with your encrypted report.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <span>This key is rotated periodically. Check this page for the latest version.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Links */}
          <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4">
              <Link
                href="/security"
                className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2 text-sm font-semibold text-neutral-200 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
              >
                Security Overview
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/infrastructure"
                className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2 text-sm font-semibold text-neutral-200 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
              >
                Infrastructure
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href="mailto:security@squarecampus.com"
                className="group inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-sm font-semibold text-emerald-300 transition-all duration-300 hover:bg-emerald-500/20"
              >
                <Mail className="h-4 w-4" />
                Contact Security Team
              </a>
            </div>
          </section>

          {/* Footer spacing */}
          <div className="h-12" />
        </div>
      </main>
    </>
  );
}
