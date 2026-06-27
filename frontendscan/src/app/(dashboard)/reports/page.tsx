"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Download,
  FileText,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Users,
  CheckCircle2,
  XCircle,
} from "lucide-react";

type Period = "week" | "month" | "semester" | "year";

const weeklyData = [
  { day: "Mon", rate: 94, present: 42, total: 45 },
  { day: "Tue", rate: 91, present: 41, total: 45 },
  { day: "Wed", rate: 96, present: 43, total: 45 },
  { day: "Thu", rate: 89, present: 40, total: 45 },
  { day: "Fri", rate: 93, present: 42, total: 45 },
  { day: "Sat", rate: 0, present: 0, total: 0 },
  { day: "Sun", rate: 0, present: 0, total: 0 },
];

const sessionReports = [
  { id: "1", course: "CS-301 - Data Structures", date: "2026-06-27", students: 42, present: 39, absent: 3, rate: 92.9 },
  { id: "2", course: "MATH-201 - Calculus II", date: "2026-06-27", students: 38, present: 35, absent: 3, rate: 92.1 },
  { id: "3", course: "PHYS-101 - Physics I", date: "2026-06-26", students: 28, present: 28, absent: 0, rate: 100 },
  { id: "4", course: "ENG-102 - English Composition", date: "2026-06-26", students: 35, present: 32, absent: 3, rate: 91.4 },
  { id: "5", course: "CS-302 - Algorithms", date: "2026-06-25", students: 45, present: 42, absent: 3, rate: 93.3 },
  { id: "6", course: "MATH-202 - Linear Algebra", date: "2026-06-25", students: 32, present: 30, absent: 2, rate: 93.8 },
];

const maxAbsent = Math.max(...sessionReports.map((s) => s.absent));

export default function ReportsPage() {
  const [period, setPeriod] = useState<Period>("week");
  const [dateRange, setDateRange] = useState("This Week");

  const maxPresent = Math.max(...weeklyData.filter((d) => d.total > 0).map((d) => d.total));

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy-950 dark:text-text-primary">
            Reports & Analytics
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-text-soft">
            Attendance trends, participation analytics, and exportable reports
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary pl-3 pr-8 py-2 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>This Semester</option>
              <option>Custom Range</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-text-soft pointer-events-none" />
          </div>
          <Button variant="primary" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: BarChart3, label: "Avg. Attendance Rate", value: "93.2%", trend: "+2.1%", improving: true },
          { icon: Users, label: "Total Sessions", value: "486", trend: "+12 this month", improving: true },
          { icon: CheckCircle2, label: "Present Count", value: "42,893", trend: "+3.2%", improving: true },
          { icon: XCircle, label: "Absences", value: "3,124", trend: "-1.8%", improving: true },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard>
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-gray-500 dark:text-text-soft">{stat.label}</span>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  stat.improving ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                }`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-xl font-bold text-navy-950 dark:text-text-primary">{stat.value}</div>
              <div className={`flex items-center gap-1 text-xs mt-1 ${
                stat.improving ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"
              }`}>
                {stat.improving ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {stat.trend}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Attendance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-2"
        >
          <GlassCard>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-sm font-semibold text-navy-950 dark:text-text-primary">Weekly Attendance</h2>
                <p className="text-xs text-gray-500 dark:text-text-soft mt-0.5">Daily attendance rates for this week</p>
              </div>
              <div className="flex gap-1">
                {(["week", "month", "semester"] as Period[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      period === p
                        ? "bg-brand-600 text-white"
                        : "text-gray-500 dark:text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Bar chart */}
            <div className="flex items-end gap-3 h-48">
              {weeklyData.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  {d.total > 0 && (
                    <>
                      <span className="text-xs font-medium text-navy-950 dark:text-text-primary">{d.rate}%</span>
                      <div className="relative w-full max-w-[40px] h-32 rounded-lg bg-gray-100 dark:bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ height: "0%" }}
                          animate={{ height: `${d.rate}%` }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                          className="absolute bottom-0 w-full rounded-lg bg-gradient-to-t from-brand-600 to-brand-400"
                        />
                      </div>
                    </>
                  )}
                  <span className="text-xs text-gray-400 dark:text-text-soft">{d.day}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Session Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GlassCard>
            <h2 className="text-sm font-semibold text-navy-950 dark:text-text-primary mb-4">Session Breakdown</h2>
            <div className="space-y-4">
              {/* Donut - simple SVG */}
              <div className="flex justify-center">
                <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
                  <circle cx="70" cy="70" r="56" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="16" />
                  <circle cx="70" cy="70" r="56" fill="none" stroke="#22C55E" strokeWidth="16"
                    strokeDasharray={`${(93.2 / 100) * 352} 352`}
                    strokeLinecap="round"
                  />
                  <circle cx="70" cy="70" r="56" fill="none" stroke="#EF4444" strokeWidth="16"
                    strokeDasharray={`${(6.8 / 100) * 352} 352`}
                    strokeDashoffset={`-${(93.2 / 100) * 352}`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="text-gray-500 dark:text-text-soft">Present</span>
                  </div>
                  <span className="font-medium text-navy-950 dark:text-text-primary">93.2%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    <span className="text-gray-500 dark:text-text-soft">Absent</span>
                  </div>
                  <span className="font-medium text-navy-950 dark:text-text-primary">6.8%</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Session Reports Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <GlassCard className="p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-border-subtle flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-navy-950 dark:text-text-primary">Session Attendance Reports</h2>
              <p className="text-xs text-gray-500 dark:text-text-soft mt-0.5">Detailed breakdown by session</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                <FileText className="h-3.5 w-3.5" />
                CSV
              </Button>
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                <Download className="h-3.5 w-3.5" />
                PDF
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-subtle bg-black/5 dark:bg-white/5">
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 dark:text-text-soft">Course</th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 dark:text-text-soft">Date</th>
                  <th className="text-center py-3 px-5 text-xs font-medium text-gray-500 dark:text-text-soft">Students</th>
                  <th className="text-center py-3 px-5 text-xs font-medium text-gray-500 dark:text-text-soft">Present</th>
                  <th className="text-center py-3 px-5 text-xs font-medium text-gray-500 dark:text-text-soft">Absent</th>
                  <th className="text-center py-3 px-5 text-xs font-medium text-gray-500 dark:text-text-soft">Rate</th>
                </tr>
              </thead>
              <tbody>
                {sessionReports.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-border-subtle/50 hover:bg-black/5 dark:hover:bg-white/5 transition-colors last:border-0"
                  >
                    <td className="py-4 px-5 font-medium text-navy-950 dark:text-text-primary">{s.course}</td>
                    <td className="py-4 px-5 text-gray-500 dark:text-text-muted">{s.date}</td>
                    <td className="py-4 px-5 text-center text-gray-500 dark:text-text-muted">{s.students}</td>
                    <td className="py-4 px-5 text-center">
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">{s.present}</span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className={`font-medium ${s.absent > 0 ? "text-red-500" : "text-gray-400"}`}>
                        {s.absent}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-2 w-12 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
                            style={{ width: `${s.rate}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-navy-950 dark:text-text-primary">{s.rate}%</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
