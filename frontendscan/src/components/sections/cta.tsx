"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute inset-0 bg-mesh-gradient opacity-80" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-brand-600/10 blur-[150px]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Attendance Management
            <br />
            <span className="text-brand-400">for Modern Institutions</span>
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-blue-100/60 max-w-xl mx-auto leading-relaxed">
            Join thousands of institutions modernizing their attendance tracking.
            Start free, scale as you grow.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="xl"
              className="gap-2 bg-white text-navy-950 hover:bg-blue-50 shadow-xl shadow-brand-600/20"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="xl"
              className="gap-2 border-white/10 text-white hover:bg-white/10"
            >
              <PlayCircle className="h-4 w-4" />
              Book a Demo
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-blue-200/50">
            {["No credit card required", "Free 14-day trial", "Cancel anytime"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              )
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
