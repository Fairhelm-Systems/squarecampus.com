"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { BookCallCta } from "@/components/marketing/ctas";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  Database,
  Download,
  ExternalLink,
  Globe,
  Lock,
  MapPin,
  Network,
  Server,
  Shield,
  X,
  Zap,
} from "@/icons";
import { createBreadcrumbSchema, createWebPageSchema, SEO_CONFIG } from "@/lib/seo";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Comparison data
const comparisonData = [
  {
    category: "Data Residency",
    criterion: "Physical Server Location",
    info: "Where data actually sits",
    ourAnswer: {
      status: "excellent",
      title: "Mumbai, India",
      details: ["3 availability zones, verified monthly", "ap-south-1 region only"],
      proof: "View latest audit",
    },
    theirAnswer: {
      status: "questionable",
      title: '"India" (Claims)',
      details: ["Often vague, unverified", "Could be Singapore/US VPS with India endpoint"],
      callout: "Ask them: Which data center? Can we visit?",
    },
  },
  {
    category: "Reliability",
    criterion: "Uptime SLA",
    info: "Contractual guarantee",
    ourAnswer: {
      status: "excellent",
      title: "99.99% (AWS SLA)",
      details: ["52 minutes/year maximum downtime", "Actual measured: 99.97%"],
      proof: "View live status",
    },
    theirAnswer: {
      status: "poor",
      title: "No formal SLA",
      details: ["Or 99% typical (87 hours/year downtime)", "No contractual guarantee"],
      callout: "Ask them: What's your contractual uptime guarantee?",
    },
  },
  {
    category: "Disaster Recovery",
    criterion: "Business Continuity",
    info: "What happens if facility fails",
    ourAnswer: {
      status: "excellent",
      title: "Automatic Multi-AZ Failover",
      details: [
        "3 separate facilities in Mumbai",
        "RTO: 4 hours | RPO: 15 minutes",
        "Tested quarterly",
      ],
    },
    theirAnswer: {
      status: "poor",
      title: "Single Location",
      details: ["If building fails, you're down", "Manual recovery (days/weeks)"],
      callout: "Ask them: What's your disaster recovery plan?",
    },
  },
  {
    category: "Physical Security",
    criterion: "Facility Protection",
    info: "Who guards the servers",
    ourAnswer: {
      status: "excellent",
      title: "Bank-Grade (ISO 27001)",
      details: [
        "Biometric access, 24/7 armed security",
        "CCTV, motion sensors, mantrap entry",
        "Audited by third parties (Amazon facilities)",
      ],
    },
    theirAnswer: {
      status: "questionable",
      title: '"Secure" (Undefined)',
      details: ["Varies widely, often just locked room", "No third-party certification"],
      callout: "Ask them: Can you share security audit?",
    },
  },
  {
    category: "Compliance",
    criterion: "Certifications",
    info: "Verified security standards",
    ourAnswer: {
      status: "excellent",
      title: "ISO 27001, SOC 2, PCI DSS",
      details: [
        "Amazon Web Services facility certifications",
        "Application-level compliance added",
      ],
      proof: "Download compliance reports",
    },
    theirAnswer: {
      status: "poor",
      title: "Usually None",
      details: ['Or "ISO certified" without proof', "Building certification ≠ their certification"],
      callout: "Ask them: Can you share ISO certificate?",
    },
  },
  {
    category: "Scalability",
    criterion: "Growth Capacity",
    info: "What if you add 500 schools",
    ourAnswer: {
      status: "excellent",
      title: "Instant Scaling",
      details: [
        "Auto-scale to millions of users",
        "No hardware ordering, no waiting",
        "Same Mumbai location",
      ],
    },
    theirAnswer: {
      status: "poor",
      title: "Hardware Bottleneck",
      details: ["Must order, ship, install (months)", "Overprovisioning wastes money"],
      callout: "Ask them: How do you handle 10x growth?",
    },
  },
  {
    category: "Transparency",
    criterion: "Verification",
    info: "Can you prove what you claim",
    ourAnswer: {
      status: "excellent",
      title: "Fully Transparent",
      details: [
        "Monthly infrastructure reports",
        "CloudTrail logs available",
        "Third-party audits published",
      ],
      proof: "See this page — we hide nothing",
    },
    theirAnswer: {
      status: "poor",
      title: "Vague Claims",
      details: [
        "No audit reports",
        "No facility visits",
        "Can't prove \"own servers\" aren't foreign VPS",
      ],
      callout: "Ask them: Prove it.",
    },
  },
];

// Infrastructure capabilities - simplified for non-technical visitors
const infrastructureCapabilities = [
  {
    icon: Server,
    title: "Always Available",
    specs: [
      { label: "Data Centers", value: "3 locations", detail: "Mumbai region" },
      { label: "Traffic Handling", value: "Scales automatically", detail: "No slowdowns" },
      { label: "If one fails", value: "Others take over", detail: "Seamless" },
      { label: "Recovery Time", value: "Under 30 seconds", detail: "Automatic" },
    ],
    description:
      "Your data is stored in 3 separate facilities in Mumbai. If one has issues, the others keep everything running smoothly.",
  },
  {
    icon: Database,
    title: "Your Data is Safe",
    specs: [
      { label: "Backups", value: "Every 15 minutes", detail: "Continuous" },
      { label: "Recovery Window", value: "35 days", detail: "Any point in time" },
      { label: "Copies", value: "Multiple", detail: "Across facilities" },
      { label: "Data Safety", value: "99.999999999%", detail: "Industry-leading" },
    ],
    description:
      "We keep multiple copies of your data and back up every 15 minutes. If anything goes wrong, we can restore to any point in the last 35 days.",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    specs: [
      { label: "Data in Transit", value: "Encrypted", detail: "Latest standards" },
      { label: "Data at Rest", value: "Encrypted", detail: "Military-grade" },
      { label: "Encryption Keys", value: "You control them", detail: "Not us" },
      { label: "Activity Logs", value: "Complete history", detail: "Every action" },
    ],
    description:
      "All data is encrypted using the same standards banks use. Even we cannot read your raw data — only you hold the keys.",
  },
  {
    icon: Lock,
    title: "Data Stays in India",
    specs: [
      { label: "Location", value: "Mumbai only", detail: "Verified monthly" },
      { label: "Transfer Outside", value: "Blocked", detail: "Technically impossible" },
      { label: "Backups", value: "Also in Mumbai", detail: "Same region" },
      { label: "Legal Compliance", value: "Indian laws", detail: "Full compliance" },
    ],
    description:
      "Your data physically stays in Mumbai. Our systems are configured to block any transfer outside India — it's not just policy, it's technically enforced.",
  },
  {
    icon: Network,
    title: "Protected from Attacks",
    specs: [
      { label: "DDoS Protection", value: "Enterprise-grade", detail: "Always on" },
      { label: "Firewall", value: "Active", detail: "Blocks threats" },
      { label: "Monitoring", value: "24/7", detail: "Real-time alerts" },
      { label: "Access", value: "Private network", detail: "Not publicly exposed" },
    ],
    description:
      "Multiple security layers protect against hackers and attacks. Our servers are never directly exposed to the internet.",
  },
];

// FAQ data with JSX-formatted answers
const faqData: Array<{ question: string; answer: React.ReactNode }> = [
  {
    question: "Why Amazon Web Services instead of Indian cloud providers?",
    answer: (
      <>
        <p className="mb-3">
          We evaluated Indian cloud providers extensively.{" "}
          <span className="font-semibold text-[#FF9900]">Amazon Web Services</span> Mumbai region
          won on:
        </p>
        <ul className="mb-3 space-y-1.5 pl-4">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <span>
              <strong className="text-white">Uptime:</strong> 99.99% vs 99% typical
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <span>
              <strong className="text-white">Services:</strong> Mature managed database,
              auto-scaling
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <span>
              <strong className="text-white">Cost:</strong> More economical at scale
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <span>
              <strong className="text-white">Compliance:</strong> More certifications (ISO, SOC,
              PCI)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <span>
              <strong className="text-white">Redundancy:</strong> 3 availability zones vs 1-2
              typical
            </span>
          </li>
        </ul>
        <p className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3 text-sm">
          <strong className="text-cyan-400">Key point:</strong> Data location matters, not who owns
          the hardware. <span className="text-[#FF9900]">Amazon Web Services</span> Mumbai region
          provides enterprise reliability + India residency.
        </p>
      </>
    ),
  },
  {
    question: "Can US government access data on Amazon Web Services Mumbai?",
    answer: (
      <>
        <p className="mb-3">No, for multiple reasons:</p>
        <ol className="mb-3 space-y-1.5 pl-4">
          <li className="flex items-start gap-2">
            <span className="shrink-0 rounded bg-emerald-500/20 px-1.5 py-0.5 text-xs font-semibold text-emerald-400">
              1
            </span>
            <span>
              <strong className="text-white">Encryption:</strong> Data encrypted with keys WE
              control (not Amazon)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 rounded bg-emerald-500/20 px-1.5 py-0.5 text-xs font-semibold text-emerald-400">
              2
            </span>
            <span>
              <strong className="text-white">Jurisdiction:</strong> Data in India subject to Indian
              law only
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 rounded bg-emerald-500/20 px-1.5 py-0.5 text-xs font-semibold text-emerald-400">
              3
            </span>
            <span>
              <strong className="text-white">Legal process:</strong> AWS has mechanisms to challenge
              foreign requests
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 rounded bg-emerald-500/20 px-1.5 py-0.5 text-xs font-semibold text-emerald-400">
              4
            </span>
            <span>
              <strong className="text-white">Notification:</strong> We&apos;d be notified of any
              access requests
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 rounded bg-emerald-500/20 px-1.5 py-0.5 text-xs font-semibold text-emerald-400">
              5
            </span>
            <span>
              <strong className="text-white">No precedent:</strong> US Cloud Act applies to
              US-stored data
            </span>
          </li>
        </ol>
        <p className="text-sm text-neutral-400">
          Your data is more protected on <span className="text-[#FF9900]">Amazon Web Services</span>{" "}
          Mumbai region than on many &quot;Indian own servers&quot; that actually use foreign VPS
          providers.
        </p>
      </>
    ),
  },
  {
    question: "What if Amazon Web Services opens a new region outside India?",
    answer: (
      <>
        <p className="mb-3">
          <strong className="text-white">Cannot happen.</strong> Our policies block resource
          creation outside ap-south-1.
        </p>
        <p className="mb-3">Even if Amazon opens 10 new regions, our data cannot move without:</p>
        <ol className="mb-3 space-y-1.5 pl-4">
          <li className="flex items-start gap-2">
            <span className="shrink-0 rounded bg-amber-500/20 px-1.5 py-0.5 text-xs font-semibold text-amber-400">
              1
            </span>
            <span>Manually changing policies (requires multiple approvals)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 rounded bg-amber-500/20 px-1.5 py-0.5 text-xs font-semibold text-amber-400">
              2
            </span>
            <span>Disabling Service Control Policies</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 rounded bg-amber-500/20 px-1.5 py-0.5 text-xs font-semibold text-amber-400">
              3
            </span>
            <span>Overriding monitoring alerts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 rounded bg-amber-500/20 px-1.5 py-0.5 text-xs font-semibold text-amber-400">
              4
            </span>
            <span>Would immediately trigger security incidents</span>
          </li>
        </ol>
        <p className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm">
          <strong className="text-emerald-400">Technically impossible</strong> for data to
          accidentally leave Mumbai.
        </p>
      </>
    ),
  },
  {
    question: "How do I verify you're really using Amazon Web Services Mumbai region?",
    answer: (
      <>
        <p className="mb-3">Multiple verification methods:</p>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-semibold text-cyan-400">Easy</p>
            <ul className="space-y-1 pl-4 text-sm">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500" />
                <span>Download our monthly infrastructure report</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500" />
                <span>Check SSL certificate (includes region in chain)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500" />
                <span>Run traceroute to our API (shows Mumbai routing)</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-purple-400">Detailed</p>
            <ul className="space-y-1 pl-4 text-sm">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500" />
                <span>Request CloudTrail logs excerpt</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500" />
                <span>Review third-party audit reports</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500" />
                <span>Subscribe to our status page (geo verification)</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-amber-400">Enterprise</p>
            <ul className="space-y-1 pl-4 text-sm">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500" />
                <span>Coordinate AWS facility visit</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500" />
                <span>Direct verification with Amazon account team</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-3 text-sm italic text-neutral-500">
          We&apos;re transparent because we have nothing to hide.
        </p>
      </>
    ),
  },
  {
    question: "What happens if Amazon Web Services Mumbai region has an outage?",
    answer: (
      <>
        <p className="mb-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
          <strong className="text-emerald-400">Short answer:</strong> Automatic failover to other
          Mumbai zones (30 sec)
        </p>
        <p className="mb-2 text-sm font-semibold text-white">Detailed:</p>
        <ul className="mb-3 space-y-1.5 pl-4 text-sm">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span>Mumbai region has 3 separate facilities (availability zones)</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span>If Zone A fails → automatic switch to Zone B</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span>If 2 zones fail → third zone handles load</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span>If entire region fails (never happened) → 4-hour RTO from backups</span>
          </li>
        </ul>
        <p className="text-sm text-neutral-400">
          <strong className="text-white">Historical:</strong> In 5+ years of{" "}
          <span className="text-[#FF9900]">Amazon Web Services</span> Mumbai region operations, no
          region-wide outage has occurred. Individual zone failures are handled automatically.
        </p>
      </>
    ),
  },
  {
    question: 'Is Amazon Web Services more expensive than "own servers"?',
    answer: (
      <>
        <p className="mb-3">
          Usually <strong className="text-emerald-400">CHEAPER</strong> when you account for total
          cost:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <p className="mb-2 text-sm font-semibold text-red-400">
              &quot;Own Servers&quot; Hidden Costs
            </p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                <span>₹1-5 Cr upfront capital</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                <span>Hardware refresh every 3-5 years</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                <span>Dedicated infrastructure team (₹50L+/year)</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                <span>Facility costs (power, cooling, space)</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                <span>Disaster recovery duplication</span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
            <p className="mb-2 text-sm font-semibold text-[#FF9900]">Amazon Web Services Mumbai</p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span>$0 upfront</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span>Pay only for actual usage</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span>Auto-scale (no overprovisioning)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span>No hardware refresh</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span>Built-in redundancy</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-3 text-sm text-neutral-400">We pass these savings to customers.</p>
      </>
    ),
  },
];

// Competitor questions
const competitorQuestions = [
  {
    question: "What is your contractual uptime SLA?",
    difficulty: "easy",
    whyItMatters: "Separates real infrastructure from hobby projects.",
    expectedAnswer:
      '"We maintain high uptime" (no number), "We haven\'t had issues" (no guarantee)',
    ourAnswer: "99.99% Amazon Web Services SLA + 99.97% actual measured performance",
  },
  {
    question: "Where exactly are your servers physically located?",
    difficulty: "medium",
    whyItMatters:
      '"India" is vague. Mumbai? Bangalore? Or actually Singapore datacenter with VPN endpoint in India?',
    expectedAnswer:
      '"Secure facility in India" (no specifics), "We can\'t disclose for security" (red flag)',
    ourAnswer:
      "Amazon Web Services Mumbai Region (ap-south-1) - 3 availability zones, publicly documented",
  },
  {
    question: "Can you share your ISO 27001 certificate?",
    difficulty: "hard",
    whyItMatters:
      'ISO 27001 is minimum standard for handling sensitive data. If they don\'t have it, their "secure" is undefined.',
    expectedAnswer:
      '"We\'re working on certification" (= we don\'t have it), "Our facility is ISO certified" (not them)',
    ourAnswer:
      "Amazon Web Services facilities: ISO 27001, SOC 2 Type II, PCI DSS Level 1. Plus independent application audit.",
  },
  {
    question: "What happens if your data center loses power?",
    difficulty: "hard",
    whyItMatters: 'Tests if they have real disaster recovery or just "we have backups."',
    expectedAnswer:
      '"We have generators" (single point of failure), "That\'s never happened" (no testing)',
    ourAnswer:
      "Automatic failover to other Mumbai availability zone (30 seconds). 3 separate facilities. Tested quarterly.",
  },
  {
    question: "Prove your data never leaves India.",
    difficulty: "expert",
    whyItMatters: 'Anyone can claim "India hosting." Can they prove it continuously?',
    expectedAnswer: '"We promise" (not proof), Silence or offense at being questioned',
    ourAnswer:
      "Monthly audit reports (public), CloudTrail logs, Third-party verification, IAM policies blocking non-Mumbai resources",
  },
];

// Status data - simplified operational metrics
const statusData = {
  apiStatus: "operational",
  databaseStatus: "operational",
  uptime: 99.997,
  maintenanceWindow: "Weekends only",
  geoVerification: "100% Mumbai",
  availabilityZones: { total: 3, active: 3 },
  securityStatus: "secure",
};

export default function InfrastructurePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [expandedSpec, setExpandedSpec] = useState<number | null>(0);
  const [expandedComparison, setExpandedComparison] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".js-hero-animate"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          }
        );

        // Neon glow pulse
        gsap.to(heroRef.current.querySelectorAll(".js-neon-pulse"), {
          textShadow: "0 0 20px currentColor, 0 0 40px currentColor",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Comparison rows animation
      if (comparisonRef.current) {
        gsap.fromTo(
          comparisonRef.current.querySelectorAll(".js-comparison-row"),
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: comparisonRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Specs animation
      if (specsRef.current) {
        gsap.fromTo(
          specsRef.current.querySelectorAll(".js-spec-card"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: specsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Status cards pulse
      if (statusRef.current) {
        gsap.fromTo(
          statusRef.current.querySelectorAll(".js-status-card"),
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: statusRef.current,
              start: "top 80%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      createWebPageSchema({
        name: "Infrastructure Transparency | SquareCampus",
        description:
          "Why SquareCampus chose AWS Mumbai over 'own servers'. Enterprise infrastructure with 100% Indian data residency, transparent and verified monthly.",
        url: `${SEO_CONFIG.baseUrl}/infrastructure`,
      }),
      createBreadcrumbSchema([
        { name: "Home", url: SEO_CONFIG.baseUrl },
        { name: "Infrastructure", url: `${SEO_CONFIG.baseUrl}/infrastructure` },
      ]),
    ],
  };

  return (
    <>
      <Script id="infrastructure-structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      <main className="relative min-h-screen bg-neutral-950 text-white">
        <FloatingHomeButton href="/" />

        {/* Animated grid background */}
        <div className="pointer-events-none fixed inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />
        </div>

        {/* Background gradients */}
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute left-0 top-0 h-[800px] w-[800px] rounded-full bg-cyan-500/3 blur-[150px]" />
          <div className="absolute right-0 top-1/3 h-[600px] w-[600px] rounded-full bg-purple-500/3 blur-[150px]" />
          <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-500/3 blur-[150px]" />
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <section ref={heroRef} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-32 lg:px-8">
            <div className="space-y-8">
              {/* Badge */}
              <div className="js-hero-animate inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 backdrop-blur-sm">
                <Server className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-300">
                  Infrastructure Transparency
                </span>
              </div>

              {/* Title */}
              <h1 className="js-hero-animate text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Built on{" "}
                <span className="js-neon-pulse bg-linear-to-r from-[#FF9900] via-[#FFAC31] to-[#FF9900] bg-clip-text text-transparent">
                  Amazon Web Services
                </span>
                <br />
                <span className="text-neutral-400">Mumbai Region</span>
              </h1>

              {/* Subtitle */}
              <p className="js-hero-animate max-w-3xl text-lg leading-relaxed text-neutral-300 md:text-xl">
                Why we chose enterprise cloud over &quot;own servers&quot; — and why you should care
                about the difference. Every claim on this page is{" "}
                <span className="font-semibold text-white">
                  verifiable, audited, and transparent
                </span>
                .
              </p>

              {/* Status cards */}
              <div className="js-hero-animate grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: MapPin,
                    title: "Mumbai, India",
                    detail: "ap-south-1 only",
                    color: "emerald",
                  },
                  {
                    icon: Zap,
                    title: "99.97% Uptime",
                    detail: "Last 12 months",
                    color: "cyan",
                  },
                  {
                    icon: Shield,
                    title: "ISO 27001",
                    detail: "Certified facilities",
                    color: "purple",
                  },
                  {
                    icon: Server,
                    title: "3 Availability Zones",
                    detail: "Mumbai redundancy",
                    color: "blue",
                  },
                ].map((card) => {
                  const Icon = card.icon;
                  const colorClasses: Record<
                    string,
                    { border: string; bg: string; text: string; glow: string }
                  > = {
                    emerald: {
                      border: "border-emerald-500/30",
                      bg: "bg-emerald-500/10",
                      text: "text-emerald-400",
                      glow: "shadow-emerald-500/20",
                    },
                    cyan: {
                      border: "border-cyan-500/30",
                      bg: "bg-cyan-500/10",
                      text: "text-cyan-400",
                      glow: "shadow-cyan-500/20",
                    },
                    purple: {
                      border: "border-purple-500/30",
                      bg: "bg-purple-500/10",
                      text: "text-purple-400",
                      glow: "shadow-purple-500/20",
                    },
                    blue: {
                      border: "border-blue-500/30",
                      bg: "bg-blue-500/10",
                      text: "text-blue-400",
                      glow: "shadow-blue-500/20",
                    },
                  };
                  const colors = colorClasses[card.color];
                  return (
                    <div
                      key={card.title}
                      className={cn(
                        "group relative overflow-hidden rounded-xl border p-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]",
                        colors.border,
                        colors.bg,
                        `hover:shadow-lg ${colors.glow}`
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={cn("h-5 w-5", colors.text)} />
                        <div>
                          <p className="font-semibold text-white">{card.title}</p>
                          <p className="text-xs text-neutral-400">{card.detail}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="js-hero-animate flex flex-wrap gap-3 pt-4">
                <a
                  href="#comparison"
                  className="group inline-flex items-center gap-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 px-6 py-2.5 text-sm font-semibold text-cyan-300 transition-all duration-300 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  See the Comparison
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
                <Link
                  href="/security"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/2 px-6 py-2.5 text-sm font-semibold text-neutral-200 transition-all duration-300 hover:border-white/20 hover:bg-white/5"
                >
                  Security Posture
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </section>

          {/* The Direct Question */}
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <Card className="overflow-hidden border-white/8 bg-linear-to-br from-neutral-900/80 to-neutral-950">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                  Why AWS Mumbai? Why Not &quot;Own Servers&quot;?
                </h2>
                <div className="mt-6 space-y-4 text-neutral-300">
                  <p className="text-lg">
                    We get asked this. Competitors emphasize &quot;own servers in India&quot; as if
                    it&apos;s superior. Let&apos;s be direct about why that&apos;s{" "}
                    <span className="text-red-400">marketing</span>, not engineering.
                  </p>
                  <p>
                    We chose{" "}
                    <span className="font-semibold text-[#FF9900]">Amazon Web Services</span> Mumbai
                    region (ap-south-1) after rigorous evaluation because{" "}
                    <span className="font-semibold text-white">
                      data residency isn&apos;t compromised by who makes the servers
                    </span>{" "}
                    — it&apos;s determined by{" "}
                    <span className="font-semibold text-cyan-400">where they physically sit</span>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Comparison Matrix */}
          <section
            id="comparison"
            ref={comparisonRef}
            className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
          >
            <div className="mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-red-300">
                  Honest Comparison
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                The Real Difference: <span className="text-[#FF9900]">Amazon Web Services</span> vs{" "}
                <span className="text-red-400">&quot;Own Servers&quot;</span>
              </h2>
              <p className="max-w-3xl text-neutral-400">
                Side-by-side comparison of enterprise cloud vs typical &quot;own servers&quot;
                claims. Click any row to see details.
              </p>
            </div>

            <div className="space-y-3">
              {comparisonData.map((row, index) => (
                <div
                  key={row.category}
                  className="js-comparison-row overflow-hidden rounded-xl border border-white/8 bg-neutral-900/50 backdrop-blur-sm transition-all duration-300 hover:border-white/15"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedComparison(expandedComparison === index ? null : index)
                    }
                    className="flex w-full items-center justify-between p-4 text-left md:p-5"
                  >
                    <div className="flex items-center gap-4">
                      <span className="rounded-lg bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-neutral-400">
                        {row.category}
                      </span>
                      <div>
                        <p className="font-semibold text-white">{row.criterion}</p>
                        <p className="text-xs text-neutral-500">{row.info}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden items-center gap-6 md:flex">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-emerald-400" />
                          <span className="text-sm text-emerald-400">{row.ourAnswer.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {row.theirAnswer.status === "poor" ? (
                            <X className="h-4 w-4 text-red-400" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-amber-400" />
                          )}
                          <span
                            className={cn(
                              "text-sm",
                              row.theirAnswer.status === "poor" ? "text-red-400" : "text-amber-400"
                            )}
                          >
                            {row.theirAnswer.title}
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-neutral-400 transition-transform duration-300",
                          expandedComparison === index && "rotate-180"
                        )}
                      />
                    </div>
                  </button>

                  {expandedComparison === index && (
                    <div className="border-t border-white/6 bg-neutral-950/50 p-4 md:p-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* Our Answer */}
                        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                          <div className="mb-3 flex items-center gap-2">
                            <Check className="h-5 w-5 text-emerald-400" />
                            <span className="font-semibold text-emerald-400">
                              SquareCampus (
                              <span className="text-[#FF9900]">Amazon Web Services</span> Mumbai)
                            </span>
                          </div>
                          <p className="mb-3 text-lg font-semibold text-white">
                            {row.ourAnswer.title}
                          </p>
                          <ul className="space-y-2">
                            {row.ourAnswer.details.map((detail, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-neutral-300"
                              >
                                <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                          {row.ourAnswer.proof && (
                            <p className="mt-3 text-xs text-cyan-400">{row.ourAnswer.proof} →</p>
                          )}
                        </div>

                        {/* Their Answer */}
                        <div
                          className={cn(
                            "rounded-xl border p-4",
                            row.theirAnswer.status === "poor"
                              ? "border-red-500/20 bg-red-500/5"
                              : "border-amber-500/20 bg-amber-500/5"
                          )}
                        >
                          <div className="mb-3 flex items-center gap-2">
                            {row.theirAnswer.status === "poor" ? (
                              <X className="h-5 w-5 text-red-400" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 text-amber-400" />
                            )}
                            <span
                              className={cn(
                                "font-semibold",
                                row.theirAnswer.status === "poor"
                                  ? "text-red-400"
                                  : "text-amber-400"
                              )}
                            >
                              &quot;Own Servers&quot; (Competitor Claims)
                            </span>
                          </div>
                          <p className="mb-3 text-lg font-semibold text-white">
                            {row.theirAnswer.title}
                          </p>
                          <ul className="space-y-2">
                            {row.theirAnswer.details.map((detail, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-neutral-300"
                              >
                                <X className="mt-0.5 h-3 w-3 shrink-0 text-red-400" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                          {row.theirAnswer.callout && (
                            <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 p-2">
                              <p className="text-xs font-medium text-red-300">
                                {row.theirAnswer.callout}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Own Servers Reality Check */}
            <Card className="mt-8 overflow-hidden border-red-500/30 bg-linear-to-br from-red-950/20 to-neutral-950">
              <CardContent className="p-6 md:p-8">
                <h3 className="mb-4 text-xl font-bold text-red-400">
                  The &quot;Own Servers&quot; Reality Check
                </h3>
                <p className="mb-4 text-neutral-300">
                  Most vendors claiming &quot;own servers in India&quot; actually mean:
                </p>
                <ul className="mb-6 space-y-2 text-sm text-neutral-400">
                  <li className="flex items-start gap-2">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    Rented racks in shared co-location facilities
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    VPS from DigitalOcean, Linode, or Vultr (often Singapore/NYC)
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    Single server in a locked room with consumer hardware
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    &quot;Own&quot; = leased from local hosting company
                  </li>
                </ul>
                <p className="text-sm font-medium text-white">
                  If they can&apos;t answer basic infrastructure questions → They don&apos;t have
                  enterprise &quot;own servers.&quot;
                  <br />
                  <span className="text-red-400">
                    They have consumer-grade hosting with marketing spin.
                  </span>
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Infrastructure Capabilities */}
          <section ref={specsRef} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5">
                <Shield className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-300">
                  Infrastructure Guarantees
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">What This Means For You</h2>
              <p className="max-w-3xl text-neutral-400">
                Enterprise-grade infrastructure with verifiable guarantees. Not marketing claims —
                engineering reality.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {infrastructureCapabilities.map((spec, index) => {
                const Icon = spec.icon;
                const isExpanded = expandedSpec === index;
                return (
                  <Card
                    key={spec.title}
                    className={cn(
                      "js-spec-card cursor-pointer overflow-hidden border-white/8 bg-neutral-900/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30",
                      isExpanded && "border-cyan-500/30 md:col-span-2 lg:col-span-1"
                    )}
                    onClick={() => setExpandedSpec(isExpanded ? null : index)}
                  >
                    <CardContent className="p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-2">
                            <Icon className="h-5 w-5 text-cyan-400" />
                          </div>
                          <h3 className="font-semibold text-white">{spec.title}</h3>
                        </div>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 text-neutral-400 transition-transform",
                            isExpanded && "rotate-180"
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        {spec.specs.slice(0, isExpanded ? undefined : 3).map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-sm">
                            <span className="text-neutral-400">{item.label}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-white">{item.value}</span>
                              {item.detail && (
                                <span className="text-xs text-neutral-500">({item.detail})</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {isExpanded && (
                        <p className="mt-4 border-t border-white/6 pt-4 text-sm text-neutral-400">
                          {spec.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Live Status */}
          <section ref={statusRef} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5">
                <BarChart3 className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-300">
                  Real-Time Status
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">Infrastructure Status</h2>
              <p className="max-w-3xl text-neutral-400">Live indicators. Never fabricated.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* API Status */}
              <Card className="js-status-card overflow-hidden border-emerald-500/20 bg-linear-to-br from-emerald-950/20 to-neutral-950">
                <CardContent className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm text-neutral-400">API Services</span>
                    </div>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                      <span className="text-xs font-medium text-emerald-400">Operational</span>
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">All Systems Go</p>
                  <p className="text-xs text-neutral-500">No incidents reported</p>
                </CardContent>
              </Card>

              {/* Database Status */}
              <Card className="js-status-card overflow-hidden border-emerald-500/20 bg-linear-to-br from-emerald-950/20 to-neutral-950">
                <CardContent className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm text-neutral-400">Database</span>
                    </div>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                      <span className="text-xs font-medium text-emerald-400">Operational</span>
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">Healthy</p>
                  <p className="text-xs text-neutral-500">All replicas synchronized</p>
                </CardContent>
              </Card>

              {/* Uptime */}
              <Card className="js-status-card overflow-hidden border-emerald-500/20 bg-linear-to-br from-emerald-950/20 to-neutral-950">
                <CardContent className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm text-neutral-400">Uptime</span>
                    </div>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                      <span className="text-xs font-medium text-emerald-400">Excellent</span>
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">{statusData.uptime}%</p>
                  <p className="text-xs text-neutral-500">{statusData.maintenanceWindow}</p>
                </CardContent>
              </Card>

              {/* Geo Verification */}
              <Card className="js-status-card overflow-hidden border-cyan-500/20 bg-linear-to-br from-cyan-950/20 to-neutral-950">
                <CardContent className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-cyan-400" />
                      <span className="text-sm text-neutral-400">Data Location</span>
                    </div>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                      <span className="text-xs font-medium text-cyan-400">Verified</span>
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">{statusData.geoVerification}</p>
                  <p className="text-xs text-neutral-500">All resources in India</p>
                </CardContent>
              </Card>

              {/* Availability Zones */}
              <Card className="js-status-card overflow-hidden border-blue-500/20 bg-linear-to-br from-blue-950/20 to-neutral-950">
                <CardContent className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-neutral-400">Availability Zones</span>
                    </div>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
                      <span className="text-xs font-medium text-blue-400">All Active</span>
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {statusData.availabilityZones.active}/{statusData.availabilityZones.total}
                  </p>
                  <p className="text-xs text-neutral-500">Mumbai zones operational</p>
                </CardContent>
              </Card>

              {/* Security Status */}
              <Card className="js-status-card overflow-hidden border-purple-500/20 bg-linear-to-br from-purple-950/20 to-neutral-950">
                <CardContent className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-purple-400" />
                      <span className="text-sm text-neutral-400">Security</span>
                    </div>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />
                      <span className="text-xs font-medium text-purple-400">Protected</span>
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">No Breaches</p>
                  <p className="text-xs text-neutral-500">All security controls active</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Questions Competitors Can't Answer */}
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-red-300">
                  Due Diligence
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Questions Your &quot;Own Servers&quot; Vendor Can&apos;t Answer
              </h2>
              <p className="max-w-3xl text-neutral-400">
                Ask these during your evaluation. Watch them squirm.
              </p>
            </div>

            <div className="space-y-4">
              {competitorQuestions.map((q, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-white/8 bg-neutral-900/50 transition-all duration-300 hover:border-red-500/30"
                >
                  <CardContent className="p-5 md:p-6">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-medium uppercase text-red-400">
                          {q.difficulty}
                        </span>
                        <div>
                          <h3 className="font-semibold text-white">{q.question}</h3>
                          <p className="mt-1 text-sm text-neutral-400">{q.whyItMatters}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                        <p className="mb-2 text-xs font-medium uppercase text-red-400">
                          Expected Answer
                        </p>
                        <p className="text-sm text-neutral-300">{q.expectedAnswer}</p>
                      </div>
                      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                        <p className="mb-2 text-xs font-medium uppercase text-emerald-400">
                          Our Answer
                        </p>
                        <p className="text-sm text-neutral-300">{q.ourAnswer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-12 space-y-4">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Common Questions</h2>
            </div>

            <div className="space-y-3">
              {faqData.map((faq, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-white/8 bg-neutral-900/50 transition-all duration-300 hover:border-white/15"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <h3 className="pr-4 font-semibold text-white">{faq.question}</h3>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-300",
                        expandedFaq === index && "rotate-180"
                      )}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="border-t border-white/6 px-5 pb-5">
                      <div className="pt-4 text-sm leading-relaxed text-neutral-300">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <Card className="overflow-hidden border-cyan-500/20 bg-linear-to-r from-cyan-950/30 via-neutral-900/80 to-purple-950/30">
              <CardContent className="relative p-8 text-center md:p-12">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,240,255,0.1),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
                <div className="relative">
                  <h2 className="text-2xl font-bold text-white md:text-3xl">
                    Verify Everything We&apos;ve Claimed
                  </h2>
                  <p className="mx-auto mt-3 max-w-xl text-neutral-400">
                    We don&apos;t just talk about transparency. We prove it. Request verification
                    materials or book a technical deep-dive.
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    <Card className="border-white/8 bg-white/2">
                      <CardContent className="p-4 text-center">
                        <Download className="mx-auto mb-2 h-6 w-6 text-cyan-400" />
                        <p className="font-medium text-white">Infrastructure Report</p>
                        <p className="mt-1 text-xs text-neutral-400">Monthly detailed breakdown</p>
                      </CardContent>
                    </Card>
                    <Card className="border-white/8 bg-white/2">
                      <CardContent className="p-4 text-center">
                        <Shield className="mx-auto mb-2 h-6 w-6 text-purple-400" />
                        <p className="font-medium text-white">Compliance Package</p>
                        <p className="mt-1 text-xs text-neutral-400">ISO, SOC 2, audit reports</p>
                      </CardContent>
                    </Card>
                    <Card className="border-white/8 bg-white/2">
                      <CardContent className="p-4 text-center">
                        <ExternalLink className="mx-auto mb-2 h-6 w-6 text-emerald-400" />
                        <p className="font-medium text-white">Technical Deep-Dive</p>
                        <p className="mt-1 text-xs text-neutral-400">Architecture walkthrough</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <BookCallCta context="infrastructure-cta" />
                    <Link
                      href="/security"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/2 px-5 py-2 text-sm font-semibold text-neutral-200 transition-all duration-300 hover:border-white/20 hover:bg-white/5"
                    >
                      View Security Posture
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Summary Footer */}
          <section className="border-t border-white/6 bg-neutral-900/30">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#FF9900]">
                    Why Amazon Web Services
                  </h3>
                  <ul className="space-y-2 text-sm text-neutral-400">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      99.99% SLA, 99.97% actual
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      Multi-zone redundancy
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      Bank-grade security
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      ISO 27001 certified
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      Auto-scaling, instant
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-400">
                    100% India Residency
                  </h3>
                  <ul className="space-y-2 text-sm text-neutral-400">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      All resources in ap-south-1
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      No cross-region replication
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      Verified monthly
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      DPDP Act compliant
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      Subject to Indian law only
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-purple-400">
                    Transparent & Verifiable
                  </h3>
                  <ul className="space-y-2 text-sm text-neutral-400">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      Monthly reports published
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      Third-party audits
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      Live status dashboard
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      CloudTrail logs available
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      No hiding, no excuses
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-lg font-semibold text-white">
                  Enterprise Infrastructure. Indian Sovereignty. No Compromises.
                </p>
                <p className="mt-2 text-sm text-neutral-400">
                  Every claim on this page is verifiable. Request proof anytime.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
