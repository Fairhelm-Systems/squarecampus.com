"use client";

import { motion } from "@/lib/motion";
import { Cloud, Code, CreditCard, Database, Lock, MessageSquare, Webhook, Zap } from "@/icons";

const integrations = [
  {
    category: "Payment Gateways",
    icon: CreditCard,
    gradient: "from-emerald-500/20 via-green-500/10",
    items: [
      { name: "Razorpay", desc: "UPI, cards, wallets, net banking" },
      { name: "CCAvenue", desc: "180+ payment options" },
    ],
  },
  {
    category: "Communication",
    icon: MessageSquare,
    gradient: "from-blue-500/20 via-cyan-500/10",
    items: [
      { name: "Twilio", desc: "SMS and voice APIs" },
      { name: "SendGrid", desc: "Email delivery" },
      { name: "WhatsApp Business API", desc: "Automated messaging" },
    ],
  },
  {
    category: "Cloud Storage",
    icon: Cloud,
    gradient: "from-purple-500/20 via-violet-500/10",
    items: [
      { name: "AWS S3", desc: "Scalable object storage" },
      { name: "Google Cloud Storage", desc: "Multi-region storage" },
    ],
  },
  {
    category: "Authentication",
    icon: Lock,
    gradient: "from-rose-500/20 via-pink-500/10",
    items: [
      { name: "Google OAuth", desc: "Single sign-on" },
      { name: "Microsoft AD", desc: "Enterprise authentication" },
      { name: "SAML 2.0", desc: "Identity federation" },
    ],
  },
  {
    category: "Developer APIs",
    icon: Code,
    gradient: "from-amber-500/20 via-orange-500/10",
    items: [
      { name: "REST API", desc: "Full CRUD operations" },
      { name: "GraphQL", desc: "Flexible queries" },
      { name: "Webhooks", desc: "Real-time events" },
      { name: "SDK Libraries", desc: "Python, Node.js, PHP" },
    ],
  },
  {
    category: "Analytics & BI",
    icon: Database,
    gradient: "from-sky-500/20 via-cyan-500/10",
    items: [
      { name: "Google Analytics", desc: "Usage tracking" },
      { name: "Power BI", desc: "Microsoft BI integration" },
      { name: "Data Export", desc: "CSV, Excel, JSON" },
    ],
  },
];

export function IntegrationShowcase() {
  return (
    <section className="relative border-b border-white/5 bg-neutral-950 px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-neutral-400">
            <Zap className="h-3 w-3" />
            Integrations & APIs
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Plug Into Your Existing Stack
          </h2>
          <p className="mx-auto max-w-2xl text-neutral-300">
            SquareCampus plays well with others. Connect to payment gateways, messaging platforms,
            cloud storage, and build custom integrations with our comprehensive API.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950 p-6 shadow-xl shadow-black/20 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl"
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                <div className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{category.category}</h3>
                  </div>

                  <div className="space-y-3">
                    {category.items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                        className="rounded-lg border border-white/5 bg-white/5 p-3 transition-all duration-200 hover:border-white/10 hover:bg-white/10"
                      >
                        <div className="mb-1 text-sm font-medium text-white">{item.name}</div>
                        <div className="text-xs text-neutral-400">{item.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* API Code snippet preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <Webhook className="h-5 w-5 text-sky-400" />
              <h3 className="text-xl font-semibold text-white">Developer-Friendly API</h3>
            </div>
            <p className="mb-6 text-sm text-neutral-300">
              Build custom integrations, automate workflows, and extend SquareCampus with our RESTful API.
            </p>

            {/* Code snippet */}
            <div className="overflow-hidden rounded-lg border border-white/10 bg-neutral-950">
              <div className="flex items-center gap-2 border-b border-white/10 bg-neutral-900 px-4 py-2">
                <div className="h-3 w-3 rounded-full bg-rose-500" />
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs text-neutral-400">API Example</span>
              </div>
              <pre className="overflow-x-auto p-4 text-xs">
                <code className="text-neutral-300">
                  {`// Fetch student data
const response = await fetch('https://api.squarecampus.com/v1/students', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const students = await response.json();
console.log(students.data);`}
                </code>
              </pre>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
              >
                <Code className="h-4 w-4" />
                View API Documentation
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
              >
                <Webhook className="h-4 w-4" />
                Webhook Reference
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
