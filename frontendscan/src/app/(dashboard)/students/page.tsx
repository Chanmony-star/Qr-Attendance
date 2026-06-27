"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  MoreHorizontal,
  ChevronRight,
  Users,
  GraduationCap,
  Download,
  Mail,
  Smartphone,
  Calendar,
  CheckCircle2,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

const students = [
  { id: "STU-001", name: "Sarah Chen", email: "sarah.chen@school.edu", device: "iPhone 15 Pro", registered: "2026-01-15", attendance: 42, total: 45, status: "active" as const },
  { id: "STU-002", name: "Alex Rivera", email: "alex.rivera@school.edu", device: "Samsung Galaxy S24", registered: "2026-01-15", attendance: 44, total: 45, status: "active" as const },
  { id: "STU-003", name: "Mia Johnson", email: "mia.johnson@school.edu", device: "iPhone 14", registered: "2026-01-16", attendance: 40, total: 45, status: "active" as const },
  { id: "STU-004", name: "James Wilson", email: "james.wilson@school.edu", device: "Google Pixel 8", registered: "2026-01-16", attendance: 38, total: 45, status: "active" as const },
  { id: "STU-005", name: "Emma Davis", email: "emma.davis@school.edu", device: "iPhone 15", registered: "2026-01-17", attendance: 43, total: 45, status: "active" as const },
  { id: "STU-006", name: "Noah Brown", email: "noah.brown@school.edu", device: "OnePlus 12", registered: "2026-01-17", attendance: 35, total: 45, status: "inactive" as const },
  { id: "STU-007", name: "Olivia Garcia", email: "olivia.garcia@school.edu", device: "iPhone 13", registered: "2026-01-18", attendance: 41, total: 45, status: "active" as const },
  { id: "STU-008", name: "Liam Martinez", email: "liam.martinez@school.edu", device: "Xiaomi 14", registered: "2026-01-18", attendance: 37, total: 45, status: "active" as const },
];

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selected.length === filtered.length) {
      setSelected([]);
    } else {
      setSelected(filtered.map((s) => s.id));
    }
  };

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
            Students
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-text-soft">
            Manage registered students and their attendance records
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="primary" size="sm" className="gap-1.5">
            <UserPlus className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </motion.div>

      {/* Stats summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { icon: Users, label: "Total Students", value: "2,847" },
          { icon: Smartphone, label: "Registered Devices", value: "2,801" },
          { icon: GraduationCap, label: "Active Today", value: "643" },
          { icon: CheckCircle2, label: "Avg. Attendance", value: "93.2%" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <GlassCard>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500 dark:text-text-soft">{stat.label}</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600 dark:text-brand-400">
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-xl font-bold text-navy-950 dark:text-text-primary">{stat.value}</div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Search + Filters */}
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
            placeholder="Search by name, ID, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary placeholder:text-gray-400 dark:placeholder:text-text-soft pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
          />
        </div>
      </motion.div>

      {/* Students table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <GlassCard className="p-0 overflow-hidden">
          {selected.length > 0 && (
            <div className="px-5 py-3 bg-brand-600/5 border-b border-brand-600/10 flex items-center gap-3 text-sm">
              <span className="text-navy-950 dark:text-text-primary font-medium">{selected.length} selected</span>
              <button onClick={() => setSelected([])} className="text-xs text-brand-600 dark:text-brand-400 hover:underline">Clear selection</button>
              <div className="ml-auto flex gap-2">
                <Button variant="ghost" size="sm" className="text-xs">Bulk Email</Button>
                <Button variant="ghost" size="sm" className="text-xs text-red-500 hover:text-red-600">Remove</Button>
              </div>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-subtle bg-black/5 dark:bg-white/5">
                  <th className="w-10 px-5 py-3">
                    <input
                      type="checkbox"
                      checked={selected.length === filtered.length && filtered.length > 0}
                      onChange={toggleAll}
                      className="rounded border-gray-300 dark:border-navy-600 text-brand-600 focus:ring-brand-500/30"
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-text-soft">Student</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-text-soft">Device</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-text-soft">Registered</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-text-soft">Attendance</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-text-soft">Status</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 dark:text-text-soft">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`border-b border-border-subtle/50 hover:bg-black/5 dark:hover:bg-white/5 transition-colors last:border-0 ${
                      selected.includes(s.id) ? "bg-brand-600/5" : ""
                    }`}
                  >
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={selected.includes(s.id)}
                        onChange={() => toggleSelect(s.id)}
                        className="rounded border-gray-300 dark:border-navy-600 text-brand-600 focus:ring-brand-500/30"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                          {s.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <Link href="#" className="font-medium text-navy-950 dark:text-text-primary hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                            {s.name}
                          </Link>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Mail className="h-3 w-3 text-gray-400 dark:text-text-soft" />
                            <span className="text-xs text-gray-500 dark:text-text-muted">{s.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-text-muted">
                        <Smartphone className="h-3.5 w-3.5" />
                        <span className="text-xs">{s.device}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-text-muted">
                        <Calendar className="h-3.5 w-3.5" />
                        <span className="text-xs">{s.registered}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{ width: `${(s.attendance / s.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-text-muted">
                          {s.attendance}/{s.total}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={s.status === "active" ? "success" : "default"}>
                        {s.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Users className="h-10 w-10 mx-auto text-gray-300 dark:text-navy-700 mb-3" />
              <p className="text-sm text-gray-500 dark:text-text-soft">No students found</p>
            </div>
          )}
          <div className="px-5 py-3 border-t border-border-subtle flex items-center justify-between text-xs text-gray-400 dark:text-text-soft">
            <span>Showing {filtered.length} of {students.length} students</span>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
