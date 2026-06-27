"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import QRCodeLib from "qrcode";
import {
  ChevronLeft,
  QrCode,
  Users,
  Clock,
  MapPin,
  Search,
  Download,
  RefreshCw,
  CheckCircle2,
  Wifi,
  Maximize2,
  Smartphone,
  List,
  Eye,
} from "lucide-react";

const sessionInfo = {
  name: "CS-301",
  course: "Data Structures",
  room: "Room 204",
  date: "June 27, 2026",
  time: "10:00 - 11:30",
  status: "Live" as const,
  totalStudents: 42,
  presentCount: 39,
};

const attendanceData = [
  { id: "STU-001", name: "Sarah Chen", time: "10:02 AM", gps: "verified" as const, wifi: "verified" as const },
  { id: "STU-002", name: "Alex Rivera", time: "10:03 AM", gps: "verified" as const, wifi: "verified" as const },
  { id: "STU-003", name: "Mia Johnson", time: "10:05 AM", gps: "verified" as const, wifi: "verified" as const },
  { id: "STU-004", name: "James Wilson", time: "10:07 AM", gps: "verified" as const, wifi: "verified" as const },
  { id: "STU-005", name: "Emma Davis", time: "10:08 AM", gps: "verified" as const, wifi: "unverified" as const },
  { id: "STU-006", name: "Noah Brown", time: "10:10 AM", gps: "verified" as const, wifi: "verified" as const },
  { id: "STU-007", name: "Olivia Garcia", time: "10:12 AM", gps: "outside-radius" as const, wifi: "verified" as const },
];

export default function SessionDetailPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"display" | "table">("display");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [qrExpanded, setQrExpanded] = useState(false);

  useEffect(() => {
    const payload = JSON.stringify({
      session: sessionInfo.name,
      course: sessionInfo.course,
      room: sessionInfo.room,
      time: sessionInfo.time,
      date: sessionInfo.date,
      id: "1",
    });

    QRCodeLib.toDataURL(payload, {
      width: 600,
      margin: 2,
      color: { dark: "#0F172A", light: "#FFFFFF" },
    }).then(setQrDataUrl);
  }, []);

  const handleDownload = useCallback(() => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = `${sessionInfo.name}-QR.png`;
    link.href = qrDataUrl;
    link.click();
  }, [qrDataUrl]);

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const filtered = attendanceData.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase())
  );

  const attendanceRate = Math.round(
    (sessionInfo.presentCount / sessionInfo.totalStudents) * 100
  );

  return (
    <div className="space-y-6">
      {/* Back + header bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <Link
          href="/dashboard/sessions"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-text-muted hover:text-navy-950 dark:hover:text-text-primary transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Sessions
        </Link>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setView(view === "display" ? "table" : "display")}
          >
            {view === "display" ? (
              <><List className="h-3.5 w-3.5" /> Attendance</>
            ) : (
              <><Eye className="h-3.5 w-3.5" /> QR Display</>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFullscreen}
            title="Toggle fullscreen"
            className="px-2"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* QR DISPLAY VIEW — optimized for projector */}
      {view === "display" && (
        <motion.div
          key="qr-display"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Hero QR Card */}
          <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-navy-900 border border-gray-200 dark:border-border-subtle">
            {/* Corner bracket accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-brand-500/30 rounded-tl-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-brand-500/30 rounded-tr-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-brand-500/30 rounded-bl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-brand-500/30 rounded-br-3xl pointer-events-none" />

            <div className="p-8 sm:p-12 lg:p-16 flex flex-col items-center">
              {/* Status indicator */}
              <div className="flex items-center gap-2.5 mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                  <span className="relative rounded-full bg-emerald-400 h-2.5 w-2.5" />
                </span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  Live Session
                </span>
              </div>

              {/* QR Code with scan line animation */}
              <div className="relative mb-6 group">
                {qrDataUrl ? (
                  <>
                    <div className="absolute inset-0 rounded-2xl bg-brand-600/10 blur-3xl scale-110" />
                    <motion.img
                      key={qrDataUrl}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      src={qrDataUrl}
                      alt={`QR Code for ${sessionInfo.name}`}
                      className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl shadow-2xl cursor-pointer"
                      onClick={() => setQrExpanded(true)}
                    />
                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                      <motion.div
                        className="absolute left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-brand-500/60 to-transparent"
                        animate={{ top: ["3%", "97%", "3%"] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  </>
                ) : (
                  <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl bg-navy-50 dark:bg-navy-800 animate-pulse flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-navy-300 dark:text-navy-600" />
                  </div>
                )}
              </div>

              {/* Session title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-950 dark:text-text-primary text-center mb-1">
                {sessionInfo.name}
              </h1>
              <p className="text-base sm:text-lg text-gray-500 dark:text-text-muted text-center mb-5">
                {sessionInfo.course}
              </p>

              {/* Info chips */}
              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-500 dark:text-text-soft">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                  {sessionInfo.room}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                  {sessionInfo.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                  {sessionInfo.presentCount}/{sessionInfo.totalStudents} present
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-8">
                <Button variant="primary" size="sm" className="gap-1.5" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                  Download QR
                </Button>
                <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => setView("table")}>
                  <Users className="h-4 w-4" />
                  View Attendance
                </Button>
              </div>

              <div className="flex items-center gap-2 mt-6 text-xs text-gray-400 dark:text-text-soft">
                <Smartphone className="h-3.5 w-3.5" />
                Students scan with their phone camera to mark attendance
              </div>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Attendance Rate", value: `${attendanceRate}%`, sub: `${sessionInfo.presentCount} of ${sessionInfo.totalStudents}` },
              { label: "Duration", value: "1h 30m", sub: sessionInfo.time },
              { label: "Location", value: sessionInfo.room, sub: "GPS radius: 50m" },
              { label: "Date", value: sessionInfo.date, sub: "Session #1" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <GlassCard>
                  <div className="text-xs font-medium text-gray-500 dark:text-text-soft mb-1">{stat.label}</div>
                  <div className="text-lg font-bold text-navy-950 dark:text-text-primary">{stat.value}</div>
                  <div className="text-[11px] text-gray-400 dark:text-text-soft mt-0.5">{stat.sub}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* TABLE VIEW — attendance list */}
      {view === "table" && (
        <motion.div
          key="qr-table"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Stats cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Users, label: "Present", value: `${sessionInfo.presentCount}`, sub: `of ${sessionInfo.totalStudents} students` },
              { icon: Clock, label: "Duration", value: "1h 30m", sub: sessionInfo.time },
              { icon: CheckCircle2, label: "Attendance Rate", value: `${attendanceRate}%`, sub: "+2.1% vs avg" },
              { icon: MapPin, label: "Location", value: sessionInfo.room, sub: "GPS Radius: 50m" },
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
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600 dark:text-brand-400">
                      <stat.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="text-xl font-bold text-navy-950 dark:text-text-primary">{stat.value}</div>
                  <div className="text-[11px] text-gray-400 dark:text-text-soft mt-0.5">{stat.sub}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* QR mini card + Attendance Table */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Mini QR sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:order-2"
            >
              <GlassCard className="text-center">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt={`QR Code for ${sessionInfo.name}`}
                    className="w-full max-w-40 mx-auto rounded-xl mb-3"
                  />
                ) : (
                  <div className="w-36 h-36 mx-auto rounded-xl bg-navy-50 dark:bg-navy-800 animate-pulse flex items-center justify-center mb-3">
                    <QrCode className="h-12 w-12 text-navy-300 dark:text-navy-600" />
                  </div>
                )}
                <p className="text-xs text-gray-500 dark:text-text-soft mb-3">
                  Students scan to mark attendance
                </p>
                <Button variant="primary" size="sm" className="w-full gap-1.5 text-xs" onClick={handleDownload}>
                  <Download className="h-3.5 w-3.5" />
                  Download QR
                </Button>
                <button
                  onClick={() => setView("display")}
                  className="mt-2 text-xs text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Show full display mode
                </button>
              </GlassCard>
            </motion.div>

            {/* Attendance Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="lg:col-span-3 lg:order-1"
            >
              <GlassCard className="p-0 overflow-hidden">
                <div className="p-4 border-b border-border-subtle">
                  <div className="flex items-center justify-between">
                    <div className="relative flex-1 max-w-xs">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-text-soft" />
                      <input
                        type="text"
                        placeholder="Search students..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary placeholder:text-gray-400 dark:placeholder:text-text-soft pl-9 pr-3 py-2 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-text-soft">
                      <span>Auto-refreshes every 15s</span>
                      <RefreshCw className="h-3 w-3 animate-spin-slow" />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-subtle bg-black/5 dark:bg-white/5">
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-text-soft">Student</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-text-soft">Time</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-text-soft">GPS</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-text-soft">WiFi</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-text-soft">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((a, i) => (
                        <motion.tr
                          key={a.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="border-b border-border-subtle/50 hover:bg-black/5 dark:hover:bg-white/5 transition-colors last:border-0"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600/10 text-xs font-bold text-brand-600 dark:text-brand-400">
                                {a.name.split(" ").map((n) => n[0]).join("")}
                              </div>
                              <div>
                                <div className="font-medium text-navy-950 dark:text-text-primary text-sm">{a.name}</div>
                                <div className="text-[11px] text-gray-400 dark:text-text-muted">{a.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-500 dark:text-text-muted">{a.time}</td>
                          <td className="py-3 px-4">
                            <Badge variant={a.gps === "verified" ? "success" : "default"}>
                              <MapPin className="h-3 w-3 mr-1" />
                              {a.gps === "verified" ? "Verified" : a.gps === "outside-radius" ? "Outside" : "Unverified"}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={a.wifi === "verified" ? "success" : "default"}>
                              <Wifi className="h-3 w-3 mr-1" />
                              {a.wifi === "verified" ? "Verified" : "Unverified"}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="h-4 w-4" />
                              <span className="text-xs font-medium">Present</span>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filtered.length === 0 && (
                  <div className="py-12 text-center">
                    <Users className="h-8 w-8 mx-auto text-gray-300 dark:text-navy-700 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-text-soft">No matching students found</p>
                  </div>
                )}

                <div className="px-4 py-3 border-t border-border-subtle flex items-center justify-between text-xs text-gray-400 dark:text-text-soft">
                  <span>Showing {filtered.length} of {attendanceData.length} students</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {attendanceRate}% attendance
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </motion.div>
      )}
      {/* Expanded QR overlay */}
      {qrExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setQrExpanded(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative p-8 rounded-3xl bg-white dark:bg-navy-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQrExpanded(false)}
              className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-navy-800 shadow-md border border-gray-200 dark:border-border-subtle text-gray-500 dark:text-text-muted hover:text-navy-950 dark:hover:text-text-primary transition-colors text-sm"
            >
              ×
            </button>
            {qrDataUrl && (
              <img
                src={qrDataUrl}
                alt={`QR Code for ${sessionInfo.name}`}
                className="w-96 h-96 max-w-[90vw] max-h-[90vw] rounded-2xl"
              />
            )}
            <p className="text-center text-sm text-gray-500 dark:text-text-muted mt-4">
              {sessionInfo.name} — {sessionInfo.course}
            </p>
          </motion.div>
        </motion.div>
      )}

    </div>
  );
}
