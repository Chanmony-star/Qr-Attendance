"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CalendarCheck,
  Plus,
  Search,
  MoreHorizontal,
  QrCode,
  Clock,
  Users,
  ChevronRight,
} from "lucide-react";
import { GlassCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const sessions = [
  { id: "1", name: "CS-301", course: "Data Structures", date: "2026-06-27", time: "10:00 - 11:30", room: "Room 204", students: 42, present: 39, status: "Live" as const },
  { id: "2", name: "MATH-201", course: "Calculus II", date: "2026-06-27", time: "11:45 - 13:15", room: "Room 105", students: 38, present: 35, status: "Live" as const },
  { id: "3", name: "PHYS-101", course: "Physics I", date: "2026-06-27", time: "14:00 - 15:30", room: "Lab 3", students: 28, present: 0, status: "Scheduled" as const },
  { id: "4", name: "ENG-102", course: "English Composition", date: "2026-06-27", time: "16:00 - 17:30", room: "Room 302", students: 35, present: 0, status: "Scheduled" as const },
  { id: "5", name: "CS-302", course: "Algorithms", date: "2026-06-26", time: "09:00 - 10:30", room: "Room 201", students: 45, present: 42, status: "Ended" as const },
  { id: "6", name: "MATH-202", course: "Linear Algebra", date: "2026-06-26", time: "13:00 - 14:30", room: "Room 106", students: 32, present: 30, status: "Ended" as const },
];

export default function SessionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = sessions.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy-950 dark:text-text-primary">
            Attendance Sessions
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-text-soft">
            Manage and monitor your QR attendance sessions
          </p>
        </div>
        <Link href="/dashboard/sessions/new">
          <Button variant="primary" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Create Session
          </Button>
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-text-soft" />
          <input
            type="text"
            placeholder="Search sessions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary placeholder:text-gray-400 dark:placeholder:text-text-soft pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {["all", "Live", "Scheduled", "Ended"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                statusFilter === s
                  ? "bg-brand-600 text-white"
                  : "bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-gray-500 dark:text-text-muted hover:bg-gray-50 dark:hover:bg-white/5"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Sessions table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <GlassCard className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left py-4 px-5 text-xs font-medium text-gray-500 dark:text-text-soft">Session</th>
                  <th className="text-left py-4 px-5 text-xs font-medium text-gray-500 dark:text-text-soft">Course</th>
                  <th className="text-left py-4 px-5 text-xs font-medium text-gray-500 dark:text-text-soft">Date & Time</th>
                  <th className="text-left py-4 px-5 text-xs font-medium text-gray-500 dark:text-text-soft">Room</th>
                  <th className="text-left py-4 px-5 text-xs font-medium text-gray-500 dark:text-text-soft">Attendance</th>
                  <th className="text-left py-4 px-5 text-xs font-medium text-gray-500 dark:text-text-soft">Status</th>
                  <th className="text-right py-4 px-5 text-xs font-medium text-gray-500 dark:text-text-soft">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border-subtle/50 hover:bg-black/5 dark:hover:bg-white/5 transition-colors last:border-0"
                  >
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600 dark:text-brand-400">
                          <QrCode className="h-4 w-4" />
                        </div>
                        <div>
                          <Link href={`/dashboard/sessions/${s.id}`} className="font-medium text-navy-950 dark:text-text-primary hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                            {s.name}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-gray-500 dark:text-text-muted">{s.course}</td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-text-muted">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{s.date} · {s.time}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-gray-500 dark:text-text-muted">{s.room}</td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        <Users className="h-3.5 w-3.5 text-gray-400 dark:text-text-soft" />
                        <span className="text-gray-500 dark:text-text-muted">
                          {s.status === "Scheduled" ? "—" : `${s.present}/${s.students}`}
                        </span>
                        {s.status === "Live" && (
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                            ({(s.present / s.students * 100).toFixed(0)}%)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <Badge variant={s.status === "Live" ? "success" : s.status === "Ended" ? "default" : "outline"}>
                        {s.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/dashboard/sessions/${s.id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                        <Button variant="ghost" size="sm" className="flex h-8 w-8 items-center justify-center p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <CalendarCheck className="h-10 w-10 mx-auto text-gray-300 dark:text-navy-700 mb-3" />
              <p className="text-sm text-gray-500 dark:text-text-soft">No sessions found</p>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
