"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Check, Crown, Edit, Eye, Lock, Shield, Sparkles, Trash2, Users, X } from "@/icons";
import { motion } from "@/lib/motion";

const hierarchy = [
  {
    level: "Organisation",
    icon: Crown,
    color: "from-amber-500 to-orange-500",
    roles: ["Super Admin", "Organisation Admin", "Finance Head"],
    permissions: "Full access across all schools, campuses, and modules",
    examples: [
      "Create/delete schools and campuses",
      "Configure organisation-wide policies",
      "Access consolidated financial reports",
      "Manage organisation-level user roles",
    ],
  },
  {
    level: "School",
    icon: Shield,
    color: "from-blue-500 to-cyan-500",
    roles: ["School Admin", "Principal", "Vice Principal"],
    permissions: "Access across all campuses under this school brand",
    examples: [
      "Manage all campuses of the school",
      "Configure school-level templates",
      "View school-wide analytics",
      "Approve cross-campus transfers",
    ],
  },
  {
    level: "Campus",
    icon: Users,
    color: "from-purple-500 to-violet-500",
    roles: ["Campus Director", "Academic Head", "Admin Officer"],
    permissions: "Full control within their campus boundaries",
    examples: [
      "Manage campus staff and students",
      "Configure campus-specific settings",
      "Access campus financial data",
      "Approve campus-level decisions",
    ],
  },
  {
    level: "Department",
    icon: Lock,
    color: "from-emerald-500 to-green-500",
    roles: ["HOD", "Department Coordinator", "Lab In-charge"],
    permissions: "Department-scoped access to relevant modules",
    examples: [
      "Manage department faculty",
      "View department student data",
      "Access relevant module data only",
      "Generate department reports",
    ],
  },
  {
    level: "Staff",
    icon: Eye,
    color: "from-rose-500 to-pink-500",
    roles: ["Teacher", "Accountant", "Librarian", "Transport Manager"],
    permissions: "Module-specific access based on job function",
    examples: [
      "Teachers: Attendance, grades, assignments",
      "Accountant: Fee collection, receipts",
      "Librarian: Book issue/return",
      "Transport: Route and vehicle management",
    ],
  },
];

const permissionMatrix = [
  {
    module: "Student Records",
    orgAdmin: { view: true, create: true, edit: true, delete: true },
    schoolAdmin: { view: true, create: true, edit: true, delete: true },
    campusAdmin: { view: true, create: true, edit: true, delete: false },
    teacher: { view: true, create: false, edit: false, delete: false },
  },
  {
    module: "Fee Management",
    orgAdmin: { view: true, create: true, edit: true, delete: true },
    schoolAdmin: { view: true, create: true, edit: true, delete: false },
    campusAdmin: { view: true, create: true, edit: true, delete: false },
    teacher: { view: false, create: false, edit: false, delete: false },
  },
  {
    module: "Grades & Marks",
    orgAdmin: { view: true, create: false, edit: false, delete: false },
    schoolAdmin: { view: true, create: false, edit: false, delete: false },
    campusAdmin: { view: true, create: false, edit: false, delete: false },
    teacher: { view: true, create: true, edit: true, delete: false },
  },
  {
    module: "Payroll",
    orgAdmin: { view: true, create: true, edit: true, delete: true },
    schoolAdmin: { view: true, create: false, edit: false, delete: false },
    campusAdmin: { view: false, create: false, edit: false, delete: false },
    teacher: { view: false, create: false, edit: false, delete: false },
  },
];

const roleKeys = ["orgAdmin", "schoolAdmin", "campusAdmin", "teacher"] as const;
type RoleKey = (typeof roleKeys)[number];
type PermissionSet = {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
};
type PermissionRow = {
  module: string;
} & Record<RoleKey, PermissionSet>;

export function RBACShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedLevel, setSelectedLevel] = useState(hierarchy[0]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Cascade hierarchy items
      gsap.fromTo(
        ".hierarchy-level",
        {
          opacity: 0,
          x: -60,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".hierarchy-level",
            start: "top 85%",
          },
        }
      );

      // Permission matrix animation
      gsap.fromTo(
        ".permission-row",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".permission-row",
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="rbac"
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
            <Shield className="h-3 w-3 text-emerald-400" />
            Multi-Level RBAC
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">Granular Access Control</h2>
          <p className="mx-auto max-w-2xl text-neutral-300">
            5-tier role hierarchy with module-level permissions. Give each user exactly the access
            they need—nothing more, nothing less.
          </p>
        </motion.div>

        {/* Hierarchy visualization */}
        <div className="mb-16 space-y-4">
          {hierarchy.map((level, index) => {
            const Icon = level.icon;
            const isSelected = selectedLevel.level === level.level;

            return (
              <motion.div
                key={level.level}
                onClick={() => setSelectedLevel(level)}
                className="hierarchy-level group cursor-pointer"
                whileHover={{ x: 8 }}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${isSelected
                    ? "border-white/30 bg-linear-to-r from-neutral-900 to-neutral-950 shadow-xl"
                    : "border-white/10 bg-neutral-900/50 hover:border-white/20"
                    }`}
                >
                  {/* Level indicator */}
                  <div
                    className="absolute left-0 top-0 h-full w-1 bg-linear-to-b"
                    style={
                      {
                        background: "linear-gradient(to bottom, var(--tw-gradient-stops))",
                        "--tw-gradient-from": level.color.split(" ")[0].replace("from-", ""),
                        "--tw-gradient-to": level.color.split(" ")[2],
                      } as CSSProperties
                    }
                  />

                  <div className="flex flex-col gap-4 p-6 pl-8 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div
                        className={`rounded-xl border border-white/10 bg-linear-to-br ${level.color} p-3`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>

                      {/* Content */}
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="text-xl font-bold text-white">{level.level} Level</h3>
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-neutral-300">
                            Tier {index + 1}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-400">{level.permissions}</p>
                      </div>
                    </div>

                    {/* Roles */}
                    <div className="flex flex-wrap gap-2">
                      {level.roles.map((role) => (
                        <div
                          key={role}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300"
                        >
                          {role}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/10 bg-neutral-900/50 p-6"
                    >
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-400">
                        Typical Permissions
                      </h4>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {level.examples.map((example, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                            <span>{example}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Permission matrix */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-neutral-900/80 to-neutral-950">
          <div className="border-b border-white/10 bg-neutral-900/50 p-6">
            <h3 className="mb-2 text-xl font-bold text-white">Permission Matrix Example</h3>
            <p className="text-sm text-neutral-400">
              See how different roles have different access to the same modules
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-neutral-900/50">
                  <th className="p-4 text-left text-sm font-semibold text-neutral-400">Module</th>
                  <th className="p-4 text-center text-sm font-semibold text-neutral-400">
                    Org Admin
                  </th>
                  <th className="p-4 text-center text-sm font-semibold text-neutral-400">
                    School Admin
                  </th>
                  <th className="p-4 text-center text-sm font-semibold text-neutral-400">
                    Campus Admin
                  </th>
                  <th className="p-4 text-center text-sm font-semibold text-neutral-400">
                    Teacher
                  </th>
                </tr>
              </thead>
              <tbody>
                {permissionMatrix.map((row) => (
                  <tr
                    key={row.module}
                    className="permission-row border-b border-white/5 transition-colors hover:bg-neutral-900/30"
                  >
                    <td className="p-4 font-medium text-white">{row.module}</td>
                    {roleKeys.map((role) => {
                      const perms = (row as PermissionRow)[role];
                      return (
                        <td key={role} className="p-4">
                          <div className="flex justify-center gap-2">
                            {perms.view && (
                              <div className="group relative">
                                <Eye className="h-4 w-4 text-blue-400" />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                  View
                                </span>
                              </div>
                            )}
                            {perms.create && (
                              <div className="group relative">
                                <Check className="h-4 w-4 text-emerald-400" />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                  Create
                                </span>
                              </div>
                            )}
                            {perms.edit && (
                              <div className="group relative">
                                <Edit className="h-4 w-4 text-amber-400" />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                  Edit
                                </span>
                              </div>
                            )}
                            {perms.delete && (
                              <div className="group relative">
                                <Trash2 className="h-4 w-4 text-rose-400" />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                  Delete
                                </span>
                              </div>
                            )}
                            {!perms.view && !perms.create && !perms.edit && !perms.delete && (
                              <X className="h-4 w-4 text-neutral-600" />
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-white/10 bg-neutral-900/30 p-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Eye className="h-3 w-3 text-blue-400" />
                <span>View</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-emerald-400" />
                <span>Create</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Edit className="h-3 w-3 text-amber-400" />
                <span>Edit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Trash2 className="h-3 w-3 text-rose-400" />
                <span>Delete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/20 bg-linear-to-br from-emerald-950/30 via-neutral-900/80 to-neutral-950/90 p-8 shadow-xl shadow-emerald-500/10">
            <Sparkles className="h-8 w-8 text-emerald-400" />
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">Custom Roles & Permissions</h3>
              <p className="text-sm text-neutral-300">
                Not enough? Create custom roles with granular module-level and action-level
                permissions. Define your own access control rules to match your institution's unique
                structure.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
