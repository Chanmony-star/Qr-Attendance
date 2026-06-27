"use client";

import { motion } from "framer-motion";
import {
  Users,
  QrCode,
  CalendarCheck,
  TrendingUp,
  Activity,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { GlassCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ── KPI Card ── */
function KpiCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  trend,
  delay = 0,
}: {
  title: string;
  value: string;
  change: string;
  changeLabel: string;
  icon: LucideIcon;
  trend: "up" | "down";
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <GlassCard className="relative overflow-hidden group hover:shadow-lg hover:shadow-brand-600/5 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <span className="text-sm font-medium text-gray-500 dark:text-text-soft">{title}</span>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600 dark:text-brand-400">
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold tracking-tight text-navy-950 dark:text-text-primary">
              {value}
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className={cn(
                "flex items-center gap-0.5 text-xs font-medium",
                trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"
              )}>
                {trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {change}
              </span>
              <span className="text-xs text-gray-400 dark:text-text-soft">{changeLabel}</span>
            </div>
          </div>
        </div>
        {/* Subtle gradient bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-600/0 via-brand-600/20 to-brand-600/0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </GlassCard>
    </motion.div>
  );
}

/* ── Simple bar chart ── */
function AttendanceChart() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const values = [82, 89, 76, 94, 88, 65, 72];
  const max = Math.max(...values);

  return (
    <div className="flex items-end justify-between gap-2 h-32 pt-4">
      {days.map((day, i) => (
        <div key={day} className="flex-1 flex flex-col items-center gap-2 group">
          <span className="text-[10px] font-medium text-gray-400 dark:text-text-soft">{values[i]}%</span>
          <div className="w-full relative rounded-md overflow-hidden" style={{ height: "100px" }}>
            <div
              className="absolute bottom-0 left-0 right-0 rounded-md bg-gradient-to-t from-brand-600 to-brand-400 transition-all duration-500 group-hover:from-brand-500 group-hover:to-brand-300"
              style={{ height: `${(values[i] / max) * 100}%` }}
            />
            <div className="absolute bottom-0 left-0 right-0 rounded-md bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-[10px] text-gray-400 dark:text-text-soft">{day}</span>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const kpis = [
    { title: "Total Students", value: "2,847", change: "+12%", changeLabel: "vs last month", icon: Users, trend: "up" as const, delay: 0.1 },
    { title: "Today's Attendance", value: "643", change: "+8.2%", changeLabel: "vs yesterday", icon: CalendarCheck, trend: "up" as const, delay: 0.15 },
    { title: "Active Sessions", value: "4", change: "+2", changeLabel: "today", icon: QrCode, trend: "up" as const, delay: 0.2 },
    { title: "Attendance Rate", value: "94.2%", change: "-1.3%", changeLabel: "vs last week", icon: TrendingUp, trend: "down" as const, delay: 0.25 },
  ];

  const recentActivity = [
    { name: "Sarah Chen", action: "Scanned in", session: "CS-301", time: "Just now", avatar: "SC" },
    { name: "Alex Rivera", action: "Scanned in", session: "CS-301", time: "1m ago", avatar: "AR" },
    { name: "Mia Johnson", action: "Scanned in", session: "MATH-201", time: "3m ago", avatar: "MJ" },
    { name: "James Wilson", action: "Scanned in", session: "CS-301", time: "5m ago", avatar: "JW" },
    { name: "Emma Davis", action: "Scanned in", session: "MATH-201", time: "7m ago", avatar: "ED" },
  ];

  const todaySessions = [
    { name: "CS-301", room: "Room 204", time: "10:00 - 11:30", students: 42, status: "Live" as const },
    { name: "MATH-201", room: "Room 105", time: "11:45 - 13:15", students: 38, status: "Live" as const },
    { name: "PHYS-101", room: "Lab 3", time: "14:00 - 15:30", students: 28, status: "Scheduled" as const },
    { name: "ENG-102", room: "Room 302", time: "16:00 - 17:30", students: 35, status: "Scheduled" as const },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold tracking-tight text-navy-950 dark:text-text-primary">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-text-soft">
          Overview of your institution&apos;s attendance activity
        </p>
      </motion.div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Overview Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <GlassCard>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-semibold text-navy-950 dark:text-text-primary">
                  Attendance Overview
                </h3>
                <p className="text-xs text-gray-500 dark:text-text-soft mt-0.5">
                  Weekly attendance percentage by day
                </p>
              </div>
              <select className="text-xs bg-transparent border border-border-subtle rounded-lg px-2 py-1.5 text-gray-500 dark:text-text-muted outline-none">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>
            <AttendanceChart />
            <div className="mt-4 pt-4 border-t border-border-subtle flex items-center justify-between text-xs text-gray-400 dark:text-text-soft">
              <span>Average: 81% this week</span>
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +4.2% vs last week
              </span>
            </div>
          </GlassCard>
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                <h3 className="text-sm font-semibold text-navy-950 dark:text-text-primary">
                  Live Activity
                </h3>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Live</span>
              </div>
            </div>
            <div className="space-y-1">
              {recentActivity.map((a, i) => (
                <div
                  key={a.name}
                  className="flex items-center gap-3 rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600/10 text-[10px] font-semibold text-brand-600 dark:text-brand-400">
                    {a.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-navy-950 dark:text-text-primary truncate">{a.name}</p>
                    <p className="text-xs text-gray-400 dark:text-text-soft">
                      {a.action} · {a.session}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 dark:text-text-soft">{a.time}</span>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="mt-3 w-full text-xs">
              View all activity
            </Button>
          </GlassCard>
        </motion.div>
      </div>

      {/* Today's Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              <h3 className="text-sm font-semibold text-navy-950 dark:text-text-primary">Today&apos;s Sessions</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              View All <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 dark:text-text-soft">Session</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 dark:text-text-soft">Room</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 dark:text-text-soft">Time</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 dark:text-text-soft">Students</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 dark:text-text-soft">Status</th>
                  <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 dark:text-text-soft">Actions</th>
                </tr>
              </thead>
              <tbody>
                {todaySessions.map((s) => (
                  <tr key={s.name} className="border-b border-border-subtle/50 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 px-2 font-medium text-navy-950 dark:text-text-primary">{s.name}</td>
                    <td className="py-3 px-2 text-gray-500 dark:text-text-muted">{s.room}</td>
                    <td className="py-3 px-2 text-gray-500 dark:text-text-muted">{s.time}</td>
                    <td className="py-3 px-2 text-gray-500 dark:text-text-muted">{s.students}</td>
                    <td className="py-3 px-2">
                      <Badge variant={s.status === "Live" ? "success" : "default"}>
                        <span className={cn(
                          "h-1.5 w-1.5 rounded-full mr-1.5",
                          s.status === "Live" ? "bg-emerald-400 animate-pulse" : "bg-brand-400"
                        )} />
                        {s.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <Button variant="ghost" size="sm" className="flex h-8 w-8 items-center justify-center p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
