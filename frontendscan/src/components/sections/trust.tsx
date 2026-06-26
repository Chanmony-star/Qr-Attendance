"use client";

import { motion } from "framer-motion";
import { Building2, Database, Clock } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

const logos = [
  "Stanford University",
  "MIT",
  "Oxford",
  "Cambridge",
  "UCLA",
  "Princeton",
];

export function Trust() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight dark:text-white text-navy-950">
              Used by leading{" "}
              <span className="text-brand-600">institutions</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-text-muted max-w-xl mx-auto">
              Join hundreds of institutions that trust AttendFlow for their attendance management.
            </p>
          </div>
        </AnimatedSection>

        {/* Impact statements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {[
            { icon: Building2, text: "Deployed across 500+ institutions worldwide, from small colleges to large universities." },
            { icon: Database, text: "Over 1 million attendance records processed with 99.9% accuracy and real-time verification." },
            { icon: Clock, text: "Faculty save an average of 3+ hours per week on attendance tracking and reporting." },
          ].map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.1} className="rounded-xl border border-gray-200/50 dark:border-border-glass bg-white dark:bg-surface-elevated/50 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600/10">
                  <item.icon className="h-5 w-5 text-brand-500" />
                </div>
                <p className="text-sm dark:text-text-muted text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Logos */}
        <AnimatedSection delay={0.3}>
          <div className="text-center mb-8">
            <span className="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-text-soft">
              Featured Institutions
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {logos.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="h-10 flex items-center"
              >
                <span className="text-lg font-semibold tracking-tight text-gray-400 dark:text-text-soft/40">
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
