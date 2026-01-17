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
  Key,
  Lock,
  Mail,
  Shield,
} from "@/icons";
import { cn } from "@/lib/utils";

// PGP Key information - UPDATE THIS with your actual key
const pgpKeyData = {
  email: "security@squarecampus.com",
  keyId: "0x1234ABCD5678EFGH", // Replace with actual Key ID
  fingerprint: "XXXX XXXX XXXX XXXX XXXX  XXXX XXXX XXXX XXXX XXXX", // Replace with actual fingerprint
  created: "2025-01-01", // Replace with actual creation date
  expires: "2027-01-01", // Replace with actual expiry date
  algorithm: "RSA 4096-bit",
  publicKey: `-----BEGIN PGP PUBLIC KEY BLOCK-----

[Your PGP public key will be displayed here]

Replace this placeholder with your actual PGP public key block.
You can generate one using:
  gpg --full-generate-key
  gpg --armor --export security@squarecampus.com

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
    description: "Copy the public key block below or download it directly.",
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

export default function PGPPage() {
  const [copied, setCopied] = useState(false);

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
              <div className="grid gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Email", value: pgpKeyData.email, color: "emerald" },
                  { label: "Algorithm", value: pgpKeyData.algorithm, color: "blue" },
                  { label: "Created", value: pgpKeyData.created, color: "purple" },
                  { label: "Expires", value: pgpKeyData.expires, color: "amber" },
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
                        "rounded-xl border p-4",
                        colors.border,
                        colors.bg
                      )}
                    >
                      <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                        {item.label}
                      </p>
                      <p className={cn("mt-1 font-mono text-sm", colors.text)}>
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
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Public Key</h2>
              <button
                onClick={copyToClipboard}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200",
                  copied
                    ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400"
                    : "border-white/[0.08] bg-white/[0.02] text-neutral-300 hover:border-white/20 hover:bg-white/[0.05]"
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
            <Card className="overflow-hidden border-white/[0.08] bg-neutral-950">
              <CardContent className="p-0">
                <pre className="overflow-x-auto p-6 font-mono text-xs leading-relaxed text-neutral-400">
                  {pgpKeyData.publicKey}
                </pre>
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
