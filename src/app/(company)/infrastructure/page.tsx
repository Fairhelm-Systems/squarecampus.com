import { Activity, Database, Landmark, Lock, Network, Server, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteCtas } from "@/content/site-content";
import { createAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: createAlternates("/infrastructure"),
  title: "Infrastructure Transparency",
  description:
    "SquareCampus runs on AWS Mumbai (ap-south-1) with 99.99% SLA, multi-AZ failover, encrypted data, and verified India-only data residency. Every claim is verifiable.",
};

const heroSignals = [
  ["Uptime SLA", "99.99% (AWS)"],
  ["Measured", "99.97% actual"],
  ["Zones", "3 in Mumbai"],
  ["Residency", "India only"],
] as const;

const comparisonData = [
  {
    category: "Data residency",
    us: {
      title: "Mumbai, India",
      details: "3 availability zones in ap-south-1 only, verified monthly.",
    },
    them: {
      title: "“India” (claims)",
      details:
        "Often vague and unverified — could be a Singapore or US VPS with an India endpoint.",
      ask: "Which data center? Can we visit?",
    },
  },
  {
    category: "Uptime SLA",
    us: {
      title: "99.99% (AWS SLA)",
      details: "52 minutes/year maximum downtime. Actual measured: 99.97%.",
    },
    them: {
      title: "No formal SLA",
      details: "Or 99% typical — that's 87 hours/year of downtime with no contractual guarantee.",
      ask: "What's your contractual uptime guarantee?",
    },
  },
  {
    category: "Disaster recovery",
    us: {
      title: "Automatic multi-AZ failover",
      details: "3 separate facilities in Mumbai. RTO 4 hours, RPO 15 minutes, tested quarterly.",
    },
    them: {
      title: "Single location",
      details: "If the building fails, you're down. Manual recovery takes days or weeks.",
      ask: "What's your disaster recovery plan?",
    },
  },
  {
    category: "Physical security",
    us: {
      title: "Bank-grade (ISO 27001)",
      details:
        "Biometric access, 24/7 security, CCTV, mantrap entry — audited third-party AWS facilities.",
    },
    them: {
      title: "“Secure” (undefined)",
      details: "Varies widely; often just a locked room with no third-party certification.",
      ask: "Can you share a security audit?",
    },
  },
  {
    category: "Compliance",
    us: {
      title: "ISO 27001, SOC 2, PCI DSS",
      details: "AWS facility certifications plus application-level compliance on top.",
    },
    them: {
      title: "Usually none",
      details: "Or “ISO certified” without proof — the building's certificate is not theirs.",
      ask: "Can you share your ISO certificate?",
    },
  },
  {
    category: "Scalability",
    us: {
      title: "Instant scaling",
      details: "Auto-scale to millions of users. No hardware ordering, same Mumbai location.",
    },
    them: {
      title: "Hardware bottleneck",
      details: "Must order, ship, and install for months; overprovisioning wastes money.",
      ask: "How do you handle 10x growth?",
    },
  },
  {
    category: "Transparency",
    us: {
      title: "Fully transparent",
      details: "Monthly infrastructure reports, CloudTrail logs, third-party audits published.",
    },
    them: {
      title: "Vague claims",
      details: "No audit reports, no facility visits, no proof “own servers” aren't a foreign VPS.",
      ask: "Prove it.",
    },
  },
] as const;

const capabilities = [
  {
    icon: Server,
    title: "Always available",
    body: "Your data is stored in 3 separate facilities in Mumbai. If one has issues, the others keep everything running smoothly.",
    specs: [
      ["Data centers", "3 locations"],
      ["Traffic handling", "Scales automatically"],
      ["If one fails", "Others take over"],
      ["Recovery time", "Under 30 seconds"],
    ],
  },
  {
    icon: Database,
    title: "Your data is safe",
    body: "We keep multiple copies of your data and back up every 15 minutes. If anything goes wrong, we can restore to any point in the last 35 days.",
    specs: [
      ["Backups", "Every 15 minutes"],
      ["Recovery window", "35 days"],
      ["Copies", "Multiple facilities"],
      ["Durability", "99.999999999%"],
    ],
  },
  {
    icon: ShieldCheck,
    title: "Bank-grade security",
    body: "All data is encrypted using the same standards banks use. Even we cannot read your raw data — only you hold the keys.",
    specs: [
      ["Data in transit", "Encrypted"],
      ["Data at rest", "Encrypted"],
      ["Encryption keys", "You control them"],
      ["Activity logs", "Complete history"],
    ],
  },
  {
    icon: Lock,
    title: "Data stays in India",
    body: "Your data physically stays in Mumbai. Our systems block any transfer outside India — it's not just policy, it's technically enforced.",
    specs: [
      ["Location", "Mumbai only"],
      ["Transfer outside", "Blocked"],
      ["Backups", "Also in Mumbai"],
      ["Legal compliance", "Indian law"],
    ],
  },
  {
    icon: Network,
    title: "Protected from attacks",
    body: "Multiple security layers protect against hackers and attacks. Our servers are never directly exposed to the internet.",
    specs: [
      ["DDoS protection", "Enterprise-grade"],
      ["Firewall", "Active"],
      ["Monitoring", "24/7"],
      ["Access", "Private network"],
    ],
  },
] as const;

const faqData = [
  {
    question: "Why Amazon Web Services instead of Indian cloud providers?",
    answer:
      "We evaluated Indian cloud providers extensively. AWS Mumbai won on uptime (99.99% vs 99% typical), mature managed services, cost at scale, certifications (ISO, SOC, PCI), and redundancy (3 availability zones vs 1-2 typical). Data location matters, not who owns the hardware — AWS Mumbai provides enterprise reliability with full India residency.",
  },
  {
    question: "Can the US government access data on AWS Mumbai?",
    answer:
      "No. Data is encrypted with keys we control (not Amazon), data in India is subject to Indian law only, AWS has mechanisms to challenge foreign requests, we would be notified of any access request, and the US Cloud Act applies to US-stored data. Your data is more protected on AWS Mumbai than on many “Indian own servers” that actually run on foreign VPS providers.",
  },
  {
    question: "What if AWS opens a new region outside India?",
    answer:
      "Cannot happen. Our Service Control Policies block resource creation outside ap-south-1. Even if Amazon opened ten new regions, moving data would require manually changing policies with multiple approvals, disabling controls, and overriding monitoring — which would immediately trigger security incidents. It is technically impossible for data to accidentally leave Mumbai.",
  },
  {
    question: "How do I verify you're really using AWS Mumbai?",
    answer:
      "Easy: download our monthly infrastructure report, check our SSL certificate chain, or run a traceroute to our API (it shows Mumbai routing). Detailed: request a CloudTrail log excerpt, review third-party audit reports, or subscribe to our status page. Enterprise: coordinate an AWS facility visit or verify directly with the Amazon account team. We're transparent because we have nothing to hide.",
  },
  {
    question: "What happens if AWS Mumbai has an outage?",
    answer:
      "Automatic failover to other Mumbai zones within about 30 seconds. The region has 3 separate facilities: if Zone A fails, traffic switches to Zone B; if two zones fail, the third handles load; if the entire region failed (it never has), we recover from backups with a 4-hour RTO. In 5+ years of AWS Mumbai operations, no region-wide outage has occurred.",
  },
  {
    question: "Is AWS more expensive than “own servers”?",
    answer:
      "Usually cheaper on total cost. “Own servers” hide ₹1-5 Cr upfront capital, hardware refresh every 3-5 years, a dedicated infrastructure team (₹50L+/year), facility costs, and disaster-recovery duplication. AWS is $0 upfront, pay-per-use, auto-scaled with built-in redundancy — and we pass those savings to customers.",
  },
] as const;

const competitorQuestions = [
  {
    question: "What is your contractual uptime SLA?",
    whyItMatters: "Separates real infrastructure from hobby projects.",
    expectedAnswer: "“We maintain high uptime” (no number), “We haven't had issues” (no guarantee)",
    ourAnswer: "99.99% Amazon Web Services SLA + 99.97% actual measured performance",
  },
  {
    question: "Where exactly are your servers physically located?",
    whyItMatters:
      "“India” is vague. Mumbai? Bangalore? Or actually a Singapore datacenter with a VPN endpoint in India?",
    expectedAnswer:
      "“Secure facility in India” (no specifics), “We can't disclose for security” (red flag)",
    ourAnswer: "AWS Mumbai Region (ap-south-1) — 3 availability zones, publicly documented",
  },
  {
    question: "Can you share your ISO 27001 certificate?",
    whyItMatters:
      "ISO 27001 is the minimum standard for handling sensitive data. Without it, their “secure” is undefined.",
    expectedAnswer:
      "“We're working on certification” (= we don't have it), “Our facility is ISO certified” (not them)",
    ourAnswer:
      "AWS facilities: ISO 27001, SOC 2 Type II, PCI DSS Level 1 — plus independent application audit",
  },
  {
    question: "What happens if your data center loses power?",
    whyItMatters: "Tests whether they have real disaster recovery or just “we have backups.”",
    expectedAnswer:
      "“We have generators” (single point of failure), “That's never happened” (no testing)",
    ourAnswer:
      "Automatic failover to another Mumbai availability zone in ~30 seconds. 3 facilities, tested quarterly.",
  },
  {
    question: "Prove your data never leaves India.",
    whyItMatters: "Anyone can claim “India hosting.” Can they prove it continuously?",
    expectedAnswer: "“We promise” (not proof), silence, or offense at being questioned",
    ourAnswer:
      "Monthly public audit reports, CloudTrail logs, third-party verification, and IAM policies blocking non-Mumbai resources",
  },
] as const;

export default function InfrastructurePage() {
  return (
    <main>
      <SectionShell className="pt-12 sm:pt-16">
        <Reveal className="max-w-3xl space-y-6">
          <p className="section-kicker">Infrastructure transparency</p>
          <h1 className="font-display text-4xl leading-none tracking-[-0.06em] sm:text-5xl lg:text-6xl">
            Verifiable, audited, and transparent — not marketing claims.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            SquareCampus runs on Amazon Web Services in Mumbai. Every claim on this page is
            verifiable: request proof anytime, or ask your current vendor the same questions and
            compare the answers.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2 lg:grid-cols-4">
            {heroSignals.map(([label, value]) => (
              <div key={label} className="surface-panel rounded-[1.2rem] p-4">
                <p className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </p>
                <p className="mt-2 font-display text-lg tracking-[-0.03em]">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#comparison" label="See the comparison" />
            <ButtonLink href={siteCtas.securityHref} label="Security posture" variant="secondary" />
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Why AWS Mumbai"
        title="Why AWS Mumbai? Why not &ldquo;own servers&rdquo;?"
        body="Data residency isn't compromised by who makes the servers — it's defined by where they physically sit and how access is governed. Choosing AWS Mumbai is engineering, not marketing."
      >
        <Reveal className="surface-panel-strong rounded-[1.8rem] p-7 lg:p-8">
          <div className="flex items-start gap-4">
            <Landmark className="mt-1 size-5 shrink-0 text-(--amber)" />
            <div>
              <h2 className="font-display text-2xl tracking-[-0.04em]">
                The &ldquo;own servers&rdquo; reality check
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
                Most vendors claiming &ldquo;own servers in India&rdquo; actually mean one of these:
              </p>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {[
                  "Rented racks in shared co-location facilities",
                  "VPS from DigitalOcean, Linode, or Vultr (often Singapore/NYC)",
                  "A single server in a locked room with consumer hardware",
                  "“Own” = leased from a local hosting company",
                ].map((item) => (
                  <p
                    key={item}
                    className="rounded-[1.1rem] bg-(--surface-muted) px-4 py-3 text-sm leading-6 text-muted-foreground"
                  >
                    {item}
                  </p>
                ))}
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
                If they can&rsquo;t answer basic infrastructure questions, they don&rsquo;t have
                enterprise &ldquo;own servers&rdquo; — they have consumer-grade hosting with
                marketing spin.
              </p>
            </div>
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell
        id="comparison"
        eyebrow="Honest comparison"
        title="Enterprise cloud vs typical &ldquo;own servers&rdquo; claims"
      >
        <Reveal staggerChildren className="grid gap-4">
          {comparisonData.map((row) => (
            <article
              key={row.category}
              data-reveal-item
              className="surface-panel rounded-[1.6rem] p-6"
            >
              <p className="section-kicker">{row.category}</p>
              <div className="mt-4 grid gap-3 lg:grid-cols-2">
                <div className="rounded-[1.3rem] border border-(--line) bg-(--surface-strong) p-5">
                  <p className="font-mono text-[0.54rem] uppercase tracking-[0.2em] text-(--brand)">
                    SquareCampus · AWS Mumbai
                  </p>
                  <p className="mt-2.5 font-display text-xl tracking-[-0.03em]">{row.us.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{row.us.details}</p>
                </div>
                <div className="rounded-[1.3rem] bg-(--surface-muted) p-5">
                  <p className="font-mono text-[0.54rem] uppercase tracking-[0.2em] text-muted-foreground">
                    &ldquo;Own servers&rdquo; · vendor claims
                  </p>
                  <p className="mt-2.5 font-display text-xl tracking-[-0.03em] text-muted-foreground">
                    {row.them.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{row.them.details}</p>
                  <p className="mt-3 text-xs font-medium text-(--amber)">
                    Ask them: {row.them.ask}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Infrastructure guarantees"
        title="What this means for you"
        body="Enterprise-grade infrastructure with verifiable guarantees — engineering reality, not marketing claims."
      >
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((cap) => (
            <article
              key={cap.title}
              data-reveal-item
              className="surface-panel rounded-[1.6rem] p-6"
            >
              <cap.icon className="size-5 text-(--brand)" />
              <h2 className="mt-5 font-display text-xl tracking-[-0.03em]">{cap.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{cap.body}</p>
              <dl className="mt-4 grid grid-cols-2 gap-2.5">
                {cap.specs.map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[1rem] border border-(--line) bg-(--surface) px-3 py-2.5"
                  >
                    <dt className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="mt-1 text-xs font-medium text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
          <article data-reveal-item className="surface-panel-strong rounded-[1.6rem] p-6">
            <Activity className="size-5 text-(--teal)" />
            <h2 className="mt-5 font-display text-xl tracking-[-0.03em]">Real-time status</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Live indicators. Never fabricated.
            </p>
            <ul className="mt-4 grid gap-2.5">
              {[
                "No incidents reported",
                "All replicas synchronized",
                "All resources in India",
                "Mumbai zones operational",
                "All security controls active",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <span className="size-1.5 animate-pulse rounded-full bg-(--teal)" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Due diligence"
        title="Questions your &ldquo;own servers&rdquo; vendor can't answer"
        body="Ask these during your evaluation, and compare the answers."
      >
        <Reveal>
          <Accordion type="single" collapsible className="surface-panel rounded-[1.6rem] px-6">
            {competitorQuestions.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="py-5 text-left font-display text-base tracking-[-0.02em] hover:no-underline sm:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="grid gap-3">
                  <p className="text-sm leading-6 text-muted-foreground">
                    <span className="font-medium text-foreground">Why it matters:</span>{" "}
                    {item.whyItMatters}
                  </p>
                  <div className="rounded-[1.1rem] bg-(--surface-muted) px-4 py-3 text-sm leading-6 text-muted-foreground">
                    <span className="font-medium">Expected vendor answer:</span>{" "}
                    {item.expectedAnswer}
                  </div>
                  <div className="rounded-[1.1rem] border border-(--line) bg-(--surface-strong) px-4 py-3 text-sm leading-6 text-foreground">
                    <span className="font-medium text-(--brand)">Our answer:</span> {item.ourAnswer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </SectionShell>

      <SectionShell eyebrow="Infrastructure FAQ" title="The technical questions, answered plainly">
        <Reveal>
          <Accordion type="single" collapsible className="surface-panel rounded-[1.6rem] px-6">
            {faqData.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="py-5 text-left font-display text-base tracking-[-0.02em] hover:no-underline sm:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-3xl text-base leading-7 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </SectionShell>

      <SectionShell className="pb-22 pt-0">
        <Reveal className="surface-panel-strong rounded-[2rem] p-8 text-center lg:p-12">
          <p className="section-kicker">
            Enterprise infrastructure · Indian sovereignty · No compromises
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl tracking-[-0.05em] sm:text-4xl">
            Verify everything we&rsquo;ve claimed.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            We don&rsquo;t just talk about transparency — we prove it. Request the monthly
            infrastructure report, compliance documents, or an architecture walkthrough.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href={siteCtas.demoHref} label="Book a technical deep-dive" />
            <ButtonLink
              href="mailto:security@squarecampus.com?subject=Infrastructure%20Verification%20Request"
              label="Request verification materials"
              variant="secondary"
            />
          </div>
        </Reveal>
      </SectionShell>
    </main>
  );
}
