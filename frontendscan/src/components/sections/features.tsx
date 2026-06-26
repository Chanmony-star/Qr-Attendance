"use client";

import { motion } from "framer-motion";
import {
  QrCode,
  BarChart3,
  Shield,
  Bell,
  FileSpreadsheet,
  Globe,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

const features = [
  {
    icon: QrCode,
    title: "Instant QR Scanning",
    description: "Generate unique QR codes for every session. Students scan and mark attendance in under a second.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Live dashboards showing attendance rates, trends, and predictive insights for proactive decisions.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "End-to-end encryption, role-based access, and SOC 2 compliance keep your data safe.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Automated reminders for upcoming sessions, low attendance alerts, and absence reports.",
  },
  {
    icon: FileSpreadsheet,
    title: "Automated Reports",
    description: "Export attendance data to PDF, CSV, or connect directly to your existing SIS or LMS.",
  },
  {
    icon: Globe,
    title: "Multi-Institution Management",
    description: "Manage multiple departments, campuses, or entire school districts from a single dashboard.",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-border-subtle bg-white dark:bg-surface-elevated/50 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-brand-600/5 hover:-translate-y-1"
    >
      {/* Hover gradient border effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/5 via-transparent to-transparent" />
      </div>

      <div className="relative">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 mb-4 shadow-lg">
          <feature.icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold dark:text-white text-navy-950 mb-2">{feature.title}</h3>
        <p className="text-sm text-gray-500 dark:text-text-soft leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-50/50 dark:bg-navy-900/30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight dark:text-white text-navy-950">
            Everything you need to{" "}
            <span className="text-brand-600">manage attendance</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-text-muted">
            From QR generation to advanced analytics — a complete toolkit for modern attendance management.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
