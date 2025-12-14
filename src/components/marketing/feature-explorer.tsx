"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Users,
  DollarSign,
  GraduationCap,
  MessageSquare,
  Bus,
  Home,
  BookOpen,
  Briefcase,
  FileText,
  Award,
  Calendar,
  Clock,
  Check,
  Sparkles,
} from "lucide-react";

type Feature = {
  name: string;
  description: string;
  highlights: string[];
};

type Category = {
  id: string;
  name: string;
  icon: React.ElementType;
  gradient: string;
  features: Feature[];
};

const categories: Category[] = [
  {
    id: "admissions",
    name: "Admissions & Enrollment",
    icon: Users,
    gradient: "from-blue-500/20 via-cyan-500/10",
    features: [
      {
        name: "Online Application Portal",
        description: "Accept applications 24/7 with customizable forms, document uploads, and payment integration.",
        highlights: [
          "Custom application forms per program",
          "Document verification workflow",
          "Application fee payment gateway",
          "Automated acknowledgment emails",
        ],
      },
      {
        name: "Admission Management",
        description: "Track applicants through every stage from inquiry to enrollment with automated workflows.",
        highlights: [
          "Lead tracking and follow-ups",
          "Interview scheduling automation",
          "Merit list generation",
          "Admission confirmation & fee collection",
        ],
      },
      {
        name: "Entrance Exam Management",
        description: "Conduct entrance exams, grade automatically, and publish results seamlessly.",
        highlights: [
          "Online exam creation and scheduling",
          "Automated grading and ranking",
          "Result publication with analytics",
          "Integration with admission workflow",
        ],
      },
    ],
  },
  {
    id: "finance",
    name: "Finance & Fees",
    icon: DollarSign,
    gradient: "from-emerald-500/20 via-green-500/10",
    features: [
      {
        name: "Fee Structure Management",
        description: "Define complex fee structures per program, class, or student with discounts and installments.",
        highlights: [
          "Multi-tier fee structures",
          "Scholarships and discounts",
          "Installment plans",
          "Late fee automation",
        ],
      },
      {
        name: "Payment Collection",
        description: "Accept payments online, offline, and via multiple gateways with automated receipts.",
        highlights: [
          "UPI, cards, net banking, wallets",
          "Cash/cheque counter collection",
          "Auto-generated receipts",
          "Payment reminders via SMS/email",
        ],
      },
      {
        name: "Financial Reports",
        description: "Real-time dashboards and audit-ready reports for complete financial visibility.",
        highlights: [
          "Daily collection reports",
          "Outstanding dues tracking",
          "Expense management",
          "Balance sheets and ledgers",
        ],
      },
    ],
  },
  {
    id: "academic",
    name: "Academic Management",
    icon: GraduationCap,
    gradient: "from-purple-500/20 via-violet-500/10",
    features: [
      {
        name: "Timetable & Scheduling",
        description: "AI-powered timetable generation that avoids conflicts and optimizes resource allocation.",
        highlights: [
          "Automatic conflict detection",
          "Teacher and room optimization",
          "Substitute teacher management",
          "Class rescheduling tools",
        ],
      },
      {
        name: "Attendance Tracking",
        description: "Biometric, RFID, or manual attendance with real-time sync and parent notifications.",
        highlights: [
          "Multiple attendance modes",
          "Period-wise and day-wise tracking",
          "Automated absence alerts",
          "Attendance analytics and reports",
        ],
      },
      {
        name: "Exam & Assessment",
        description: "Conduct exams, record marks, calculate grades, and generate report cards automatically.",
        highlights: [
          "Flexible exam structures",
          "Online and offline assessments",
          "Auto grade calculation",
          "Digital report cards",
        ],
      },
    ],
  },
  {
    id: "communication",
    name: "Communication",
    icon: MessageSquare,
    gradient: "from-amber-500/20 via-orange-500/10",
    features: [
      {
        name: "Multi-Channel Messaging",
        description: "Send announcements, alerts, and updates via SMS, email, app notifications, and WhatsApp.",
        highlights: [
          "Bulk messaging to groups",
          "Scheduled announcements",
          "Read receipts and delivery status",
          "Two-way parent-teacher chat",
        ],
      },
      {
        name: "Parent Portal & App",
        description: "Give parents 24/7 access to attendance, homework, fees, and school updates.",
        highlights: [
          "Real-time attendance updates",
          "Homework and assignments",
          "Fee dues and payment history",
          "Event calendar and circulars",
        ],
      },
      {
        name: "Notice Board & Events",
        description: "Centralized notice board for announcements, events, holidays, and important dates.",
        highlights: [
          "Digital notice board",
          "Event RSVP management",
          "Holiday calendar",
          "Photo gallery sharing",
        ],
      },
    ],
  },
  {
    id: "transport",
    name: "Transport Management",
    icon: Bus,
    gradient: "from-sky-500/20 via-cyan-500/10",
    features: [
      {
        name: "Route & Vehicle Management",
        description: "Plan routes, assign vehicles, track drivers, and manage transport schedules.",
        highlights: [
          "Route optimization",
          "Vehicle maintenance tracking",
          "Driver assignment",
          "Fuel and expense logs",
        ],
      },
      {
        name: "Live GPS Tracking",
        description: "Real-time bus tracking with ETA notifications for parents.",
        highlights: [
          "Live bus location on map",
          "Pickup/drop notifications",
          "Delay alerts",
          "Trip history and reports",
        ],
      },
      {
        name: "Transport Fee Management",
        description: "Separate transport fee collection with route-wise charges and receipts.",
        highlights: [
          "Route-wise fee configuration",
          "Integrated fee collection",
          "Transport receipts",
          "Monthly/quarterly billing",
        ],
      },
    ],
  },
  {
    id: "hostel",
    name: "Hostel Management",
    icon: Home,
    gradient: "from-rose-500/20 via-pink-500/10",
    features: [
      {
        name: "Room Allocation",
        description: "Manage hostel blocks, rooms, beds, and student allocation with ease.",
        highlights: [
          "Block and room master data",
          "Bed allocation and swaps",
          "Occupancy tracking",
          "Room maintenance logs",
        ],
      },
      {
        name: "Hostel Fee & Billing",
        description: "Separate hostel fee collection with mess charges, laundry, and other expenses.",
        highlights: [
          "Hostel fee configuration",
          "Mess bill management",
          "Guest charges",
          "Integrated receipts",
        ],
      },
      {
        name: "Attendance & Security",
        description: "Track hostel attendance, visitor logs, and gate pass management.",
        highlights: [
          "In/out tracking",
          "Visitor registration",
          "Gate pass approval",
          "Night attendance",
        ],
      },
    ],
  },
  {
    id: "library",
    name: "Library System",
    icon: BookOpen,
    gradient: "from-indigo-500/20 via-purple-500/10",
    features: [
      {
        name: "Book Cataloging",
        description: "Maintain comprehensive book database with ISBN, categories, and availability status.",
        highlights: [
          "ISBN-based cataloging",
          "Multi-copy management",
          "Category and author tagging",
          "Digital library support",
        ],
      },
      {
        name: "Issue & Return",
        description: "Track book issues, returns, renewals, and overdue fines automatically.",
        highlights: [
          "Barcode/RFID scanning",
          "Due date tracking",
          "Auto fine calculation",
          "Renewal requests",
        ],
      },
      {
        name: "Library Analytics",
        description: "Insights on popular books, reading trends, and inventory utilization.",
        highlights: [
          "Most issued books",
          "Student reading history",
          "Lost/damaged tracking",
          "Stock reports",
        ],
      },
    ],
  },
  {
    id: "hr",
    name: "HR & Payroll",
    icon: Briefcase,
    gradient: "from-teal-500/20 via-cyan-500/10",
    features: [
      {
        name: "Staff Management",
        description: "Maintain complete employee records with documents, qualifications, and contracts.",
        highlights: [
          "Employee master data",
          "Document repository",
          "Leave management",
          "Performance reviews",
        ],
      },
      {
        name: "Payroll Processing",
        description: "Automated salary calculation with allowances, deductions, and tax computations.",
        highlights: [
          "Salary structure configuration",
          "Attendance-linked payroll",
          "TDS and compliance",
          "Payslip generation",
        ],
      },
      {
        name: "Staff Attendance",
        description: "Biometric/RFID attendance for staff with shift management and overtime tracking.",
        highlights: [
          "Multiple attendance modes",
          "Shift roster management",
          "Overtime calculation",
          "Leave approval workflow",
        ],
      },
    ],
  },
];

export function FeatureExplorer() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeFeature, setActiveFeature] = useState(categories[0].features[0]);
  const featureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!featureRef.current) return;

    gsap.fromTo(
      featureRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [activeFeature]);

  return (
    <section id="feature-explorer" className="relative border-b border-white/5 bg-neutral-950 px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-neutral-400">
            <Sparkles className="h-3 w-3" />
            Feature Explorer
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Explore by Category
          </h2>
          <p className="mx-auto max-w-2xl text-neutral-300">
            Dive deep into each module. Click a category to explore features in detail.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Category sidebar */}
          <div className="space-y-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory.id === category.id;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveFeature(category.features[0]);
                  }}
                  whileHover={{ x: 4 }}
                  className={`group relative w-full overflow-hidden rounded-xl border p-4 text-left transition-all ${
                    isActive
                      ? "border-white/20 bg-gradient-to-br from-neutral-900 to-neutral-950 shadow-lg"
                      : "border-white/10 bg-neutral-900/50 hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-lg border border-white/10 p-2 ${
                        isActive ? "bg-white/10" : "bg-white/5"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-neutral-400"}`} />
                    </div>
                    <span className={`text-sm font-medium ${isActive ? "text-white" : "text-neutral-300"}`}>
                      {category.name}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Feature content */}
          <div className="space-y-6">
            {/* Feature tabs */}
            <div className="flex flex-wrap gap-2">
              {activeCategory.features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(feature)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    activeFeature.name === feature.name
                      ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                      : "border-white/10 bg-white/5 text-neutral-400 hover:border-white/20 hover:text-neutral-200"
                  }`}
                >
                  {feature.name}
                </button>
              ))}
            </div>

            {/* Feature details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.name}
                ref={featureRef}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl border border-white/10 bg-gradient-to-br ${activeCategory.gradient} to-transparent p-8`}
              >
                <h3 className="mb-4 text-2xl font-bold text-white">{activeFeature.name}</h3>
                <p className="mb-6 text-neutral-300">{activeFeature.description}</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {activeFeature.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                      <span className="text-sm text-neutral-200">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
