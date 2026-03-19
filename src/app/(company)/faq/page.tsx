"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BookCallCta } from "@/components/marketing/ctas";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  ChevronDown,
  HelpCircle,
  MessageSquare,
  Search,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "@/icons";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type FAQCategory = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

type FAQItem = {
  question: string;
  answer: string;
  category: string;
};

const categories: FAQCategory[] = [
  { id: "all", name: "All Questions", icon: HelpCircle, color: "neutral" },
  { id: "getting-started", name: "Getting Started", icon: Zap, color: "blue" },
  { id: "features", name: "Features & Modules", icon: Sparkles, color: "emerald" },
  { id: "security", name: "Security & Data", icon: Shield, color: "purple" },
  { id: "pricing", name: "Pricing & Support", icon: Users, color: "cyan" },
];

const faqs: FAQItem[] = [
  // Getting Started
  {
    question: "What does SquareCampus actually replace?",
    answer:
      "SquareCampus consolidates admissions, academics, finance, communication, transport, hostel, library, and compliance into one OS, replacing the patchwork of ERPs, SMS tools, and spreadsheets. Instead of juggling multiple disconnected systems, you get a single source of truth for all campus operations.",
    category: "getting-started",
  },
  {
    question: "Who is SquareCampus for?",
    answer:
      "Schools, colleges, universities, and multi-branch groups that need predictable, connected daily operations with enterprise-grade security. Whether you're a single-campus school or a network of 50+ institutions, SquareCampus scales to match your structure.",
    category: "getting-started",
  },
  {
    question: "How fast can we go live?",
    answer:
      "Typical launch is measured in days, not months. We provide migration support, role-based training, and a dedicated success partner to configure your policies and timelines. Most institutions are operational within 2-4 weeks, depending on data complexity.",
    category: "getting-started",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a tailored demo. We'll map your workflows, share a rollout plan, and align on timelines and pricing. After the demo, you'll receive a detailed proposal with migration scope, training schedule, and go-live milestones.",
    category: "getting-started",
  },
  {
    question: "What data can be migrated from our existing systems?",
    answer:
      "We support migration of student records, fee history, attendance data, academic records, staff information, and communication history. Our team works with you to map your existing data structure to SquareCampus, ensuring a clean transition with no data loss.",
    category: "getting-started",
  },

  // Features & Modules
  {
    question: "What modules are included in SquareCampus?",
    answer:
      "SquareCampus includes 12 core modules: Admissions, Student Management, Academics, Fee & Finance, Attendance, Timetable & Scheduling, Communication, Transport, Hostel, Library, HR & Payroll, and Reports & Analytics. All modules share the same database and work together seamlessly.",
    category: "features",
  },
  {
    question: "Will it integrate with our existing systems?",
    answer:
      "Yes. We provide APIs and connectors for LMS, ERP, HR, and payment partners so data flows cleanly without manual exports. Our REST APIs support webhooks for real-time sync, and we have pre-built integrations for popular payment gateways and government portals.",
    category: "features",
  },
  {
    question: "Do you have mobile apps?",
    answer:
      "Yes. Parents and students use dedicated mobile apps (iOS and Android) for fee payments, attendance tracking, progress reports, and announcements. Staff have a fully responsive web experience optimized for day-to-day operations on any device.",
    category: "features",
  },
  {
    question: "Can we customize workflows and forms?",
    answer:
      "Absolutely. SquareCampus supports configurable approval workflows, custom form fields, and flexible fee structures. You can define your own admission stages, leave policies, exam patterns, and report formats without writing code.",
    category: "features",
  },
  {
    question: "How does the multi-campus feature work?",
    answer:
      "Multi-campus support includes centralized policy management with branch-level overrides, consolidated reporting across all locations, unified student database with campus-specific views, and role-based access that respects organizational hierarchy. Head office sees everything; branch admins see their campus.",
    category: "features",
  },
  {
    question: "How often is the product updated?",
    answer:
      "Updates ship continuously with zero-downtime releases, covering new capabilities, performance boosts, and security patches. We maintain a public changelog and notify admins of significant updates through in-app announcements.",
    category: "features",
  },

  // Security & Data
  {
    question: "How secure is our data?",
    answer:
      "Data is encrypted in transit (TLS 1.3) and at rest (AES-256). Access is role-based with granular permissions, audit trails are enabled by default, and the platform runs on a resilient, monitored cloud infrastructure with automated backups. We follow OWASP security guidelines and conduct regular penetration testing.",
    category: "security",
  },
  {
    question: "Where is our data stored?",
    answer:
      "All data is stored in India-based data centers, ensuring compliance with data localization requirements. We use redundant storage with automatic failover and maintain encrypted backups with point-in-time recovery capability.",
    category: "security",
  },
  {
    question: "What compliance standards do you follow?",
    answer:
      "SquareCampus is designed with privacy-by-default principles. We support compliance with IT Act 2000, DPDP Act requirements, and education sector guidelines. Our platform includes consent management, data retention controls, and export capabilities for regulatory requests.",
    category: "security",
  },
  {
    question: "Can we control who sees what data?",
    answer:
      "Yes. Our 5-tier RBAC (Role-Based Access Control) system provides granular permissions at Organization, School, Campus, Department, and Staff levels. You define exactly what each role can view, create, edit, or delete across every module.",
    category: "security",
  },
  {
    question: "What happens to our data if we leave?",
    answer:
      "You own your data. If you decide to leave, we provide a complete export in standard formats (CSV, JSON) within 30 days of request. After the transition period, we securely delete all your data from our systems as per our data retention policy.",
    category: "security",
  },

  // Pricing & Support
  {
    question: "How do you price?",
    answer:
      "Pricing is based on student count and campus structure. We offer transparent, predictable pricing with no hidden fees. You'll receive a clear quote after understanding your workflows during the demo, including all modules, support, and updates.",
    category: "pricing",
  },
  {
    question: "Are there any setup or hidden fees?",
    answer:
      "No hidden fees. The price we quote includes implementation support, data migration assistance, training, and ongoing updates. We believe in transparent pricing—what you see is what you pay.",
    category: "pricing",
  },
  {
    question: "What about support after launch?",
    answer:
      "You get a named success partner, live chat/email support during business hours, and proactive health checks. We help with new session rollovers, audits, policy tweaks, and any questions that arise. Premium support tiers with extended hours are available.",
    category: "pricing",
  },
  {
    question: "How does SquareCampus prove ROI?",
    answer:
      "Automation reduces manual hours (typically 40-60% reduction in admin tasks), fee collections become more predictable with automated reminders and online payments, and leadership gets real-time insights without manual consolidation. Most institutions see positive ROI within the first academic year.",
    category: "pricing",
  },
  {
    question: "Is there a trial or pilot option?",
    answer:
      "We offer guided pilots for larger institutions where you can test the platform with a subset of users before full rollout. For smaller institutions, we provide a detailed demo environment where you can explore all features with sample data.",
    category: "pricing",
  },
];

const accentColors: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  blue: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    glow: "bg-blue-500/20",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    glow: "bg-emerald-500/20",
  },
  purple: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    glow: "bg-purple-500/20",
  },
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    glow: "bg-cyan-500/20",
  },
  neutral: {
    border: "border-neutral-500/30",
    bg: "bg-neutral-500/10",
    text: "text-neutral-400",
    glow: "bg-neutral-500/20",
  },
};

// Pre-computed particle positions to avoid hydration mismatch
const particleData = [
  { left: 12, top: 45, duration: 18, delay: 2 },
  { left: 87, top: 23, duration: 24, delay: 5 },
  { left: 34, top: 78, duration: 15, delay: 8 },
  { left: 56, top: 12, duration: 22, delay: 1 },
  { left: 91, top: 67, duration: 19, delay: 6 },
  { left: 23, top: 34, duration: 26, delay: 3 },
  { left: 67, top: 89, duration: 14, delay: 9 },
  { left: 45, top: 56, duration: 21, delay: 4 },
  { left: 78, top: 11, duration: 17, delay: 7 },
  { left: 8, top: 92, duration: 23, delay: 0 },
  { left: 52, top: 38, duration: 16, delay: 5 },
  { left: 31, top: 65, duration: 25, delay: 2 },
  { left: 74, top: 47, duration: 13, delay: 8 },
  { left: 19, top: 81, duration: 20, delay: 1 },
  { left: 63, top: 29, duration: 27, delay: 6 },
  { left: 95, top: 54, duration: 12, delay: 3 },
  { left: 41, top: 73, duration: 28, delay: 9 },
  { left: 6, top: 19, duration: 11, delay: 4 },
  { left: 82, top: 96, duration: 29, delay: 7 },
  { left: 48, top: 42, duration: 10, delay: 0 },
];

// Floating particles background
function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particleData.map((particle, i) => (
        <div
          key={`particle-${i}`}
          className="absolute h-1 w-1 rounded-full bg-white/10"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animation: `float ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Filter FAQs based on category and search
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".js-hero-animate"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }

      // Categories animation
      if (categoriesRef.current) {
        gsap.fromTo(
          categoriesRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // FAQ list animation
      if (faqListRef.current) {
        gsap.fromTo(
          faqListRef.current.querySelectorAll(".js-faq-item"),
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.03,
            ease: "power2.out",
            scrollTrigger: {
              trigger: faqListRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Sidebar animation
      if (sidebarRef.current) {
        gsap.fromTo(
          sidebarRef.current.children,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sidebarRef.current,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen bg-neutral-950 text-white">
      <FloatingParticles />
      <FloatingHomeButton href="/" />

      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-blue-500/[0.03] blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-purple-500/[0.03] blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        {/* Hero Section */}
        <section ref={heroRef} className="mb-12 space-y-6 md:mb-16">
          <div className="js-hero-animate inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
            <MessageSquare className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
              Help Center
            </span>
          </div>

          <h1 className="js-hero-animate text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>

          <p className="js-hero-animate max-w-2xl text-lg leading-relaxed text-neutral-300">
            Everything you need to know about adopting SquareCampus. Can't find the answer you're
            looking for? Our team is always happy to help.
          </p>

          {/* Search bar */}
          <div className="js-hero-animate relative max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-3.5 pl-12 pr-4 text-sm text-white placeholder-neutral-500 backdrop-blur-sm transition-all duration-300 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </section>

        {/* Category filters */}
        <section ref={categoriesRef} className="mb-8 flex flex-wrap gap-2 md:mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            const colors = accentColors[category.color];
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "group flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                  isActive
                    ? cn(colors.border, colors.bg, colors.text)
                    : "border-white/[0.08] bg-white/[0.02] text-neutral-400 hover:border-white/[0.15] hover:bg-white/[0.05] hover:text-white"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? colors.text : "")} />
                {category.name}
              </button>
            );
          })}
        </section>

        {/* Main content grid */}
        <div className="grid gap-8 lg:grid-cols-[1fr,320px]">
          {/* FAQ List */}
          <section ref={faqListRef} className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-8 text-center">
                <HelpCircle className="mx-auto h-12 w-12 text-neutral-600" />
                <h3 className="mt-4 text-lg font-semibold text-white">No questions found</h3>
                <p className="mt-2 text-sm text-neutral-400">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            ) : (
              filteredFaqs.map((faq) => (
                <FAQAccordion
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                  category={faq.category}
                  isOpen={openQuestion === faq.question}
                  onToggle={() =>
                    setOpenQuestion(openQuestion === faq.question ? null : faq.question)
                  }
                />
              ))
            )}

            {filteredFaqs.length > 0 && (
              <p className="pt-4 text-center text-sm text-neutral-500">
                Showing {filteredFaqs.length} of {faqs.length} questions
              </p>
            )}
          </section>

          {/* Sidebar */}
          <aside ref={sidebarRef} className="space-y-4">
            {/* Contact card */}
            <Card className="overflow-hidden border-white/[0.08] bg-neutral-900/50 backdrop-blur-sm">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
              <CardContent className="relative p-6">
                <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500">
                  Need more help?
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white">Talk to our team</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  Get a tailored walkthrough, migration plan, and answers to your specific
                  questions.
                </p>

                <div className="mt-4 space-y-2">
                  <a
                    href="mailto:support@squarecampus.com"
                    className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]"
                  >
                    <span className="text-sm text-neutral-200">support@squarecampus.com</span>
                    <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-blue-400">
                      Email
                    </span>
                  </a>
                  <Link
                    href="/contact-us"
                    className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]"
                  >
                    <span className="text-sm text-neutral-200">Book a demo</span>
                    <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-blue-400">
                      Schedule
                    </span>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick links card */}
            <Card className="overflow-hidden border-white/[0.08] bg-gradient-to-br from-blue-500/[0.08] via-neutral-900/50 to-purple-500/[0.08] backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-400" />
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500">
                    Popular Resources
                  </p>
                </div>

                <ul className="mt-4 space-y-3">
                  {[
                    { label: "Security & Compliance", href: "/security", color: "text-purple-400" },
                    { label: "Platform Ecosystem", href: "/ecosystem", color: "text-emerald-400" },
                    { label: "Why SquareCampus", href: "/why-squarecampus", color: "text-blue-400" },
                    { label: "About Us", href: "/about", color: "text-cyan-400" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between text-sm text-neutral-300 transition-colors hover:text-white"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight
                          className={cn(
                            "h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                            link.color
                          )}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Stats card */}
            <Card className="border-white/[0.08] bg-neutral-900/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500">
                  Why institutions trust us
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {[
                    { value: "99.9%", label: "Uptime SLA" },
                    { value: "24hr", label: "Support Response" },
                    { value: "2-4wk", label: "Avg. Go-Live" },
                    { value: "100%", label: "Data Ownership" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <p className="text-[0.65rem] uppercase tracking-wider text-neutral-500">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Closing CTA */}
        <section className="mt-16 md:mt-24">
          <Card className="overflow-hidden border-white/[0.08] bg-gradient-to-r from-blue-500/[0.08] via-purple-500/[0.08] to-cyan-500/[0.08]">
            <CardContent className="relative p-8 text-center md:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
              <div className="relative">
                <h2 className="text-2xl font-bold text-white md:text-3xl">Still have questions?</h2>
                <p className="mx-auto mt-3 max-w-xl text-neutral-400">
                  Our team is ready to help you understand how SquareCampus fits your institution's
                  needs. Book a personalized demo and get all your questions answered.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <BookCallCta context="faq-cta" />
                  <Link
                    href="/contact-us"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-200 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    Contact Us
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

// FAQ Accordion Component
function FAQAccordion({
  question,
  answer,
  category,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  category: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const categoryInfo = categories.find((c) => c.id === category);
  const colors = categoryInfo ? accentColors[categoryInfo.color] : accentColors.neutral;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "js-faq-item group relative w-full overflow-hidden rounded-xl text-left",
        "border border-white/[0.08] bg-neutral-900/50 backdrop-blur-sm",
        "transition-all duration-300",
        "hover:border-white/15 hover:bg-neutral-900/70",
        isOpen && "border-white/15"
      )}
    >
      {/* Top gradient line */}
      <span className="pointer-events-none absolute inset-x-4 top-0 block h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="p-4 md:p-5">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className={cn(
              "mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg",
              "border border-white/[0.08] bg-white/[0.03]",
              "transition-all duration-300",
              isOpen && cn(colors.border, colors.bg)
            )}
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 text-neutral-400 transition-all duration-300",
                isOpen && cn("rotate-180", colors.text)
              )}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-sm font-semibold text-white sm:text-base">{question}</h3>
              {categoryInfo && (
                <span
                  className={cn(
                    "hidden shrink-0 rounded-full px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-wider sm:inline-block",
                    colors.bg,
                    colors.text
                  )}
                >
                  {categoryInfo.name.split(" ")[0]}
                </span>
              )}
            </div>

            <div
              className={cn(
                "grid transition-all duration-300",
                isOpen ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="text-sm leading-relaxed text-neutral-400">{answer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
