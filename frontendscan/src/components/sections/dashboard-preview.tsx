"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  QrCode,
  Bell,
  Users,
  ScanLine,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

const kpiData = [
  { label: "Today", value: "847", change: "+12.3%", trend: "up" },
  { label: "This Week", value: "4,231", change: "+8.1%", trend: "up" },
  { label: "Avg Duration", value: "2.4h", change: "-3.2%", trend: "down" },
  { label: "Compliance", value: "97%", change: "+2.1%", trend: "up" },
];

const sessions = [
  { course: "CS-301", name: "Data Structures", room: "204", students: 42, present: 38, time: "09:00 AM" },
  { course: "MATH-201", name: "Linear Algebra", room: "310", students: 55, present: 52, time: "10:30 AM" },
  { course: "PHY-101", name: "Physics Lab", room: "Lab A", students: 28, present: 26, time: "01:00 PM" },
];

export function DashboardPreview() {
  return (
    <section id="dashboard" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-50/50 dark:bg-navy-900/30" />
      <div className="absolute inset-0 bg-mesh-gradient-light dark:bg-mesh-gradient opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight dark:text-white text-navy-950">
            Beautiful{" "}
            <span className="text-brand-600">real-time</span> dashboard
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-text-muted">
            A powerful, intuitive interface designed for administrators and educators.
          </p>
        </AnimatedSection>

        {/* Dashboard mockup */}
        <AnimatedSection delay={0.2}>
          <div className="relative rounded-2xl border border-gray-200/50 dark:border-border-glass bg-white dark:bg-surface-elevated/80 shadow-2xl shadow-brand-600/5 overflow-hidden">
            {/* Dashboard header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/50 dark:border-border-subtle">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <ScanLine className="h-5 w-5 text-brand-500" />
                  <span className="text-sm font-semibold dark:text-white text-navy-950">AttendFlow</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-xs">
                  {["Overview", "Sessions", "Students", "Reports", "Settings"].map((tab) => (
                    <button
                      key={tab}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        tab === "Overview"
                          ? "bg-brand-600/10 text-brand-500 font-medium"
                          : "text-gray-500 dark:text-text-soft hover:text-gray-700 dark:hover:text-text-muted"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-brand-600 flex items-center justify-center">
                  <span className="text-[10px] font-medium text-white">JD</span>
                </div>
              </div>
            </div>

            {/* Dashboard body */}
            <div className="p-6">
              {/* KPI row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {kpiData.map((kpi, i) => (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl border border-gray-200/50 dark:border-border-subtle bg-gray-50/50 dark:bg-white/[0.02] p-4"
                  >
                    <div className="text-xs text-gray-500 dark:text-text-soft mb-1">{kpi.label}</div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-bold dark:text-white text-navy-950">{kpi.value}</span>
                      <span className={`text-xs font-medium ${
                        kpi.trend === "up" ? "text-emerald-500" : "text-red-400"
                      }`}>
                        {kpi.change}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Charts & Activity */}
              <div className="grid lg:grid-cols-3 gap-6 mb-6">
                {/* Attendance chart */}
                <div className="lg:col-span-2 rounded-xl border border-gray-200/50 dark:border-border-subtle bg-gray-50/50 dark:bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-brand-500" />
                      <span className="text-sm font-semibold dark:text-white text-navy-950">Attendance Overview</span>
                    </div>
                    <select
                      className="text-xs bg-transparent border border-gray-200/50 dark:border-border-subtle rounded-lg px-2 py-1 dark:text-text-muted text-gray-500"
                      aria-label="Time range"
                    >
                      <option>Last 7 days</option>
                    </select>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {[65, 78, 82, 71, 92, 88, 85].map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${v}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                          className="w-full rounded-t-lg bg-gradient-to-t from-brand-600 to-brand-400 relative group-hover:opacity-90 transition-opacity"
                        >
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] dark:text-text-muted text-gray-500">
                            {v}%
                          </div>
                        </motion.div>
                        <span className="text-[10px] dark:text-text-soft text-gray-500">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="rounded-xl border border-gray-200/50 dark:border-border-subtle bg-gray-50/50 dark:bg-white/[0.02] p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <QrCode className="h-4 w-4 text-brand-500" />
                    <span className="text-sm font-semibold dark:text-white text-navy-950">Quick Actions</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: ScanLine, label: "Generate QR Code", desc: "New session" },
                      { icon: Bell, label: "Send Reminder", desc: "Pending session" },
                      { icon: Users, label: "Export Report", desc: "Weekly summary" },
                    ].map((action) => (
                      <button
                        key={action.label}
                        className="w-full flex items-center gap-3 rounded-lg p-2.5 text-left hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600/10 group-hover:bg-brand-600/20 transition-colors">
                          <action.icon className="h-4 w-4 text-brand-500" />
                        </div>
                        <div>
                          <div className="text-xs font-medium dark:text-white text-navy-950">{action.label}</div>
                          <div className="text-[10px] dark:text-text-soft text-gray-500">{action.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sessions table */}
              <div className="rounded-xl border border-gray-200/50 dark:border-border-subtle bg-gray-50/50 dark:bg-white/[0.02] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200/50 dark:border-border-subtle">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-brand-500" />
                    <span className="text-sm font-semibold dark:text-white text-navy-950">Today&apos;s Sessions</span>
                  </div>
                  <button className="text-xs text-brand-500 hover:text-brand-400 transition-colors">View All</button>
                </div>
                <div className="divide-y divide-gray-200/50 dark:divide-border-subtle">
                  {sessions.map((session) => {
                    const pct = Math.round((session.present / session.students) * 100);
                    return (
                      <div key={session.course} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-100/50 dark:hover:bg-white/[0.02] transition-colors">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium dark:text-white text-navy-950">{session.course}</span>
                            <span className="text-xs dark:text-text-soft text-gray-500">{session.name}</span>
                          </div>
                          <div className="text-[10px] dark:text-text-soft text-gray-500 mt-0.5">
                            Room {session.room} · {session.time}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold dark:text-white text-navy-950">
                            {session.present}/{session.students}
                          </div>
                          <div className="flex items-center gap-1 justify-end">
                            <div className="w-16 h-1.5 rounded-full bg-gray-200 dark:bg-white/5 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-brand-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-[10px] dark:text-text-soft text-gray-500">{pct}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
