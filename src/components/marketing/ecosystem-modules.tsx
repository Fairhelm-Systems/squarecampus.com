"use client";

import { motion } from "@/lib/motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BarChart3, BookOpen, Briefcase, Bus, Calendar, Database, DollarSign, FileText, GraduationCap, Home, MessageSquare, ShieldCheck, Sparkles } from "@/icons";


const modules = [
  {
    icon: GraduationCap,
    name: "Admissions",
    description: "Online applications, merit lists, entrance exams, and enrollment workflow",
    gradient: "from-blue-500/20 via-cyan-500/10",
    stats: "End-to-end pipeline",
  },
  {
    icon: DollarSign,
    name: "Finance & Fees",
    description: "Fee collection, payment gateways, receipts, reports, and financial analytics",
    gradient: "from-emerald-500/20 via-green-500/10",
    stats: "Multi-currency support",
  },
  {
    icon: BarChart3,
    name: "Academics",
    description: "Timetables, attendance, exams, grading, report cards, and performance tracking",
    gradient: "from-purple-500/20 via-violet-500/10",
    stats: "360° academic view",
  },
  {
    icon: Briefcase,
    name: "Employee Management",
    description: "HR records, payroll, attendance, leave, appraisals, and compliance",
    gradient: "from-amber-500/20 via-orange-500/10",
    stats: "Full HR suite",
  },
  {
    icon: BookOpen,
    name: "Learning (LMS)",
    description: "Online courses, assignments, quizzes, video lessons, and learning paths",
    gradient: "from-rose-500/20 via-pink-500/10",
    stats: "Blended learning",
  },
  {
    icon: MessageSquare,
    name: "Communication",
    description: "SMS, email, app notifications, WhatsApp, parent portal, and chat",
    gradient: "from-sky-500/20 via-cyan-500/10",
    stats: "Multi-channel reach",
  },
  {
    icon: Bus,
    name: "Transport",
    description: "Route planning, GPS tracking, driver management, and transport fees",
    gradient: "from-indigo-500/20 via-purple-500/10",
    stats: "Real-time tracking",
  },
  {
    icon: Home,
    name: "Hostel",
    description: "Room allocation, mess billing, gate passes, and hostel attendance",
    gradient: "from-teal-500/20 via-cyan-500/10",
    stats: "Complete hostel ops",
  },
  {
    icon: BookOpen,
    name: "Library",
    description: "Book cataloging, issue/return, fines, digital library, and analytics",
    gradient: "from-violet-500/20 via-purple-500/10",
    stats: "Digital + physical",
  },
  {
    icon: Calendar,
    name: "Events & Clubs",
    description: "Event management, club activities, competitions, and participation tracking",
    gradient: "from-fuchsia-500/20 via-pink-500/10",
    stats: "Extracurricular hub",
  },
  {
    icon: FileText,
    name: "Inventory",
    description: "Asset tracking, stock management, vendors, and purchase orders",
    gradient: "from-orange-500/20 via-red-500/10",
    stats: "Asset lifecycle",
  },
  {
    icon: Database,
    name: "Reports & Analytics",
    description: "Custom reports, dashboards, exports, and data visualization",
    gradient: "from-cyan-500/20 via-blue-500/10",
    stats: "Decision intelligence",
  },
];

export function EcosystemModules() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered entrance
      gsap.fromTo(
        ".ecosystem-module",
        {
          opacity: 0,
          y: 40,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: ".ecosystem-module",
            start: "top 85%",
          },
        }
      );

      // Hover interactions
      const modules = gsap.utils.toArray<HTMLElement>(".ecosystem-module");
      modules.forEach((module) => {
        module.addEventListener("mouseenter", () => {
          gsap.to(module, {
            scale: 1.05,
            y: -8,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        module.addEventListener("mouseleave", () => {
          gsap.to(module, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative border-b border-white/5 bg-neutral-950 px-4 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-neutral-400">
            <Database className="h-3 w-3" />
            Complete Platform
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            12 Modules. One Platform.
          </h2>
          <p className="mx-auto max-w-2xl text-neutral-300">
            Every module shares the same database, same user roles, same source of truth.
            No integrations, no data silos, no complexity.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <div
                key={module.name}
                className="ecosystem-module group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950 p-6 shadow-xl shadow-black/20 transition-all duration-300 hover:border-white/20"
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${module.gradient} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div className="relative">
                  {/* Icon */}
                  <div className="mb-4 inline-flex rounded-xl border border-white/10 bg-white/5 p-3 transition-all duration-300 group-hover:scale-110 group-hover:border-white/20 group-hover:bg-white/10">
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-lg font-bold text-white">{module.name}</h3>
                  <p className="mb-3 text-xs leading-relaxed text-neutral-400 transition-colors duration-300 group-hover:text-neutral-300">
                    {module.description}
                  </p>

                  {/* Stats badge */}
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300">
                    <Sparkles className="h-3 w-3" />
                    {module.stats}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950 p-8">
            <ShieldCheck className="h-8 w-8 text-emerald-400" />
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">
                All Modules. One Source of Truth.
              </h3>
              <p className="text-sm text-neutral-400">
                Every module accesses the same student data, same user roles, same permissions.
                No duplicate entries, no data sync issues, no headaches.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
