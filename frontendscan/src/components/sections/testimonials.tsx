"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Star, Quote } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Dean of Academic Affairs",
    institution: "Stanford University",
    content:
      "AttendFlow has transformed how we track attendance across our campus. The real-time analytics alone saved our administrative team hundreds of hours per semester. The QR-based system eliminated all the manual paper-based processes we struggled with for years.",
    rating: 5,
  },
  {
    name: "Prof. James Chen",
    role: "Department Head, Computer Science",
    institution: "MIT",
    content:
      "The integration with our existing LMS was seamless. Our faculty adopted it immediately because it's genuinely intuitive. The automated reporting transformed how we handle our accreditation documentation. I can't imagine going back to the old way.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "VP of Student Services",
    institution: "UCLA",
    content:
      "What sets AttendFlow apart is the thoughtful design. Every feature feels like it was built specifically for our needs. The student experience is smooth, and the analytics dashboard gives our administration unprecedented visibility into attendance patterns.",
    rating: 5,
  },
  {
    name: "Dr. Michael Park",
    role: "Director of Operations",
    institution: "Oxford University",
    content:
      "We evaluated over a dozen attendance solutions before choosing AttendFlow. The combination of enterprise security, scalability, and beautiful UX made it an easy decision. Our deployment across 40+ departments was remarkably smooth.",
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight dark:text-white text-navy-950">
            Trusted by{" "}
            <span className="text-brand-600">educators</span> worldwide
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-2xl border border-gray-200/50 dark:border-border-glass bg-white dark:bg-surface-elevated/50 p-8 sm:p-12 shadow-xl">
              <Quote className="absolute top-6 left-6 h-12 w-12 text-brand-600/10 dark:text-brand-400/10" aria-hidden="true" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-brand-500 text-brand-500" />
                    ))}
                  </div>

                  <p className="text-lg sm:text-xl leading-relaxed dark:text-text-muted text-gray-600 mb-8">
                    &ldquo;{t.content}&rdquo;
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {t.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold dark:text-white text-navy-950">{t.name}</div>
                      <div className="text-sm dark:text-text-soft text-gray-500">
                        {t.role} · {t.institution}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-3 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to testimonial ${i + 1} of ${testimonials.length}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? "scale-x-[3] bg-brand-500"
                        : "bg-gray-300 dark:bg-white/10 hover:bg-gray-400 dark:hover:bg-white/20"
                    } w-2 h-2 origin-center`}
                    aria-current={i === current ? "true" : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ── FAQ Section ── */


const faqs = [
  {
    q: "How does QR attendance tracking work?",
    a: "Each session generates a unique, time-limited QR code. Students scan the code using their phone's camera or our mobile app. The system verifies their identity, records the timestamp, and updates the dashboard in real-time.",
  },
  {
    q: "Is the platform secure?",
    a: "Absolutely. We use end-to-end encryption, SOC 2 compliant infrastructure, role-based access control, and GDPR-ready data handling. Your attendance data is encrypted at rest and in transit.",
  },
  {
    q: "Can it integrate with our existing LMS?",
    a: "Yes. AttendFlow integrates with major LMS platforms including Canvas, Blackboard, Moodle, and Google Classroom. We also offer a robust API for custom integrations with any SIS or HR system.",
  },
  {
    q: "What about large classes with 500+ students?",
    a: "AttendFlow is built for scale. Our system handles thousands of simultaneous scans with zero latency. Multiple QR scanners can be deployed per session, and the system supports offline fallback modes.",
  },
  {
    q: "Is there a mobile app for students?",
    a: "Students don't need to install anything. Attendance works through any modern browser. We also offer optional native apps for iOS and Android with additional features like push notifications and offline mode.",
  },
  {
    q: "What kind of analytics do you provide?",
    a: "Our analytics suite includes real-time attendance dashboards, trend analysis, predictive dropout indicators, behavioral patterns, automated reporting, and customizable export options. All data is available via API.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200/50 dark:border-border-subtle">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-brand-500"
      >
        <span className="text-base font-medium dark:text-white text-navy-950">{faq.q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          } dark:text-text-muted text-gray-500`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm dark:text-text-muted text-gray-600 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gray-50/50 dark:bg-navy-900/30" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight dark:text-white text-navy-950">
            Frequently asked{" "}
            <span className="text-brand-600">questions</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="rounded-2xl border border-gray-200/50 dark:border-border-glass bg-white dark:bg-surface-elevated/50 p-6 sm:p-8">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
