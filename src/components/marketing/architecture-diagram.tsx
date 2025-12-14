"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Activity, ArrowRight, Cloud, Database, Globe, Layers, Lock, Server, Shield, Smartphone, Zap } from "@/icons";

const architectureLayers = [
  {
    name: "Client Layer",
    icon: Smartphone,
    color: "from-blue-500 to-cyan-500",
    components: [
      "Web Dashboard (Admin/Staff)",
      "Mobile Apps (iOS/Android)",
      "Parent Portal",
      "Student Portal",
    ],
  },
  {
    name: "API Gateway",
    icon: Globe,
    color: "from-purple-500 to-violet-500",
    components: [
      "RESTful API",
      "GraphQL Endpoint",
      "Authentication & Rate Limiting",
      "Request Routing",
    ],
  },
  {
    name: "Application Layer",
    icon: Server,
    color: "from-emerald-500 to-green-500",
    components: [
      "Business Logic Services",
      "Module Controllers",
      "Background Jobs",
      "Real-time Notifications",
    ],
  },
  {
    name: "Data Layer",
    icon: Database,
    color: "from-amber-500 to-orange-500",
    components: [
      "PostgreSQL (Primary DB)",
      "Redis (Cache & Sessions)",
      "Object Storage (Files)",
      "Search Index",
    ],
  },
  {
    name: "Security Layer",
    icon: Shield,
    color: "from-rose-500 to-pink-500",
    components: [
      "Multi-level RBAC",
      "Encryption at Rest",
      "SSL/TLS in Transit",
      "Audit Logging",
    ],
  },
];

const dataFlow = [
  { from: "User Request", to: "Load Balancer", color: "sky" },
  { from: "Load Balancer", to: "API Gateway", color: "purple" },
  { from: "API Gateway", to: "Application Servers", color: "emerald" },
  { from: "Application Servers", to: "Database Cluster", color: "amber" },
  { from: "Database Cluster", to: "Application Servers", color: "amber" },
  { from: "Application Servers", to: "Cache Layer", color: "cyan" },
];

export function ArchitectureDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Layer entrance animation
      gsap.fromTo(
        ".arch-layer",
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".arch-layer",
            start: "top 85%",
          },
        }
      );

      // Data flow animation
      gsap.fromTo(
        ".data-flow-arrow",
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".data-flow-arrow",
            start: "top 85%",
          },
        }
      );

      // Pulse animation for connections
      gsap.to(".connection-pulse", {
        scale: 1.5,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        stagger: 0.3,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="architecture"
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
            <Layers className="h-3 w-3" />
            System Architecture
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Built for Scale & Security
          </h2>
          <p className="mx-auto max-w-2xl text-neutral-300">
            Cloud-native architecture designed for high availability, scalability, and security.
            From small schools to multi-campus institutions.
          </p>
        </motion.div>

        {/* Architecture layers */}
        <div className="mb-16 space-y-4">
          {architectureLayers.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <div key={layer.name} className="relative">
                {/* Connection line to next layer */}
                {index < architectureLayers.length - 1 && (
                  <div className="absolute left-1/2 top-full z-10 flex h-8 -translate-x-1/2 items-center justify-center">
                    <div className="flex flex-col items-center gap-1">
                      <ArrowRight className="h-5 w-5 rotate-90 text-neutral-600" />
                      <div className="connection-pulse h-2 w-2 rounded-full bg-sky-400" />
                    </div>
                  </div>
                )}

                <motion.div
                  className="arch-layer group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950 transition-all duration-300 hover:border-white/20 hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${layer.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />

                  <div className="relative p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <div className={`rounded-xl border border-white/10 bg-gradient-to-br ${layer.color} p-3`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{layer.name}</h3>
                        <p className="text-sm text-neutral-400">
                          {layer.components.length} Components
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {layer.components.map((component, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-neutral-200 transition-all duration-200 hover:border-white/20 hover:bg-white/10"
                        >
                          {component}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Key features grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Zap,
              title: "High Performance",
              description: "Sub-second response times with intelligent caching and CDN delivery",
              color: "from-yellow-500 to-orange-500",
            },
            {
              icon: Cloud,
              title: "Auto-Scaling",
              description: "Automatically scales to handle peak loads during enrollment and results",
              color: "from-sky-500 to-blue-500",
            },
            {
              icon: Lock,
              title: "Bank-Grade Security",
              description: "Encrypted data, SOC 2 compliant infrastructure, regular security audits",
              color: "from-emerald-500 to-green-500",
            },
            {
              icon: Activity,
              title: "99.9% Uptime",
              description: "Multi-region deployment with automatic failover and health monitoring",
              color: "from-purple-500 to-violet-500",
            },
            {
              icon: Database,
              title: "Daily Backups",
              description: "Automated backups with point-in-time recovery up to 30 days",
              color: "from-rose-500 to-pink-500",
            },
            {
              icon: Shield,
              title: "DDoS Protection",
              description: "Built-in protection against attacks with rate limiting and WAF",
              color: "from-amber-500 to-orange-500",
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950 p-6 transition-all duration-300 hover:border-white/20 hover:shadow-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />

                <div className="relative">
                  <div className={`mb-4 inline-flex rounded-lg border border-white/10 bg-gradient-to-br ${feature.color} p-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech stack callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950 p-8">
            <Server className="h-8 w-8 text-sky-400" />
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Modern Tech Stack
              </h3>
              <p className="mb-4 text-sm text-neutral-400">
                Built with proven, enterprise-grade technologies
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium">
                {[
                  "PostgreSQL",
                  "Redis",
                  "Node.js",
                  "React",
                  "Next.js",
                  "TypeScript",
                  "AWS/GCP",
                  "Docker",
                  "Kubernetes",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
