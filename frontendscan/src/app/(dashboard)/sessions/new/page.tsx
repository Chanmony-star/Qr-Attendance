"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  Copy,
  Share2,
  Printer,
  Check,
  QrCode,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const steps = ["Session Details", "Review & QR"];

export default function CreateSessionPage() {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [room, setRoom] = useState("");
  const [copied, setCopied] = useState(false);

  const canProceed = title && date && startTime && endTime;

  const handleCreate = async () => {
    // Simulate creation
    await new Promise((r) => setTimeout(r, 1000));
    setStep(1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("https://attendflow.app/scan/abc123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back + Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/dashboard/sessions"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-text-muted hover:text-navy-950 dark:hover:text-text-primary transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Sessions
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-navy-950 dark:text-text-primary">
          Create Attendance Session
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-text-soft">
          Set up a new QR-based attendance session
        </p>
      </motion.div>

      {/* Steps indicator */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              i <= step
                ? "bg-brand-600/10 text-brand-600 dark:text-brand-400"
                : "bg-gray-100 dark:bg-navy-800/50 text-gray-400 dark:text-text-soft"
            }`}>
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                i <= step ? "bg-brand-600 text-white" : "bg-gray-200 dark:bg-navy-700 text-gray-500"
              }`}>
                {i + 1}
              </span>
              {s}
            </div>
            {i < steps.length - 1 && (
              <ChevronRight className="h-3.5 w-3.5 text-gray-300 dark:text-navy-700" />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-navy-950 dark:text-text-primary mb-1.5">
                    Session Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., CS-301 - Data Structures"
                    className="w-full rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary placeholder:text-gray-400 dark:placeholder:text-text-soft px-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-950 dark:text-text-primary mb-1.5">
                    Course
                  </label>
                  <input
                    type="text"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="e.g., Data Structures"
                    className="w-full rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary placeholder:text-gray-400 dark:placeholder:text-text-soft px-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-950 dark:text-text-primary mb-1.5">
                      Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-text-soft" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-950 dark:text-text-primary mb-1.5">
                      Room
                    </label>
                    <input
                      type="text"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      placeholder="e.g., Room 204"
                      className="w-full rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary placeholder:text-gray-400 dark:placeholder:text-text-soft px-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-950 dark:text-text-primary mb-1.5">
                      Start Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-text-soft" />
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-950 dark:text-text-primary mb-1.5">
                      End Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-text-soft" />
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <Link href="/dashboard/sessions">
                  <Button variant="ghost" size="md">Cancel</Button>
                </Link>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleCreate}
                  disabled={!canProceed}
                  className="gap-2"
                >
                  <QrCode className="h-4 w-4" />
                  Generate QR Code
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            key="qr"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Success banner */}
            <GlassCard className="border-emerald-500/20 bg-emerald-500/5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                  <Check className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Session Created Successfully
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-text-soft mt-0.5">
                    Share the QR code below with your students
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* QR Code Display */}
            <GlassCard className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Badge variant="success">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
                  Active
                </Badge>
              </div>

              <div className="mx-auto w-64 h-64 rounded-2xl bg-white p-4 shadow-xl mb-4 flex items-center justify-center">
                <div className="w-full h-full bg-navy-950 rounded-xl flex items-center justify-center">
                  <QrCode className="h-48 w-48 text-white" />
                </div>
              </div>

              <div className="space-y-1 mb-6">
                <h3 className="text-lg font-bold text-navy-950 dark:text-text-primary">{title || "CS-301"}</h3>
                <p className="text-sm text-gray-500 dark:text-text-soft">
                  {date} · {startTime} - {endTime} · {room || "Room 204"}
                </p>
              </div>

              {/* Session link */}
              <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 rounded-xl px-4 py-3 mb-6 max-w-md mx-auto">
                <code className="flex-1 text-xs text-gray-500 dark:text-text-soft truncate text-left">
                  https://attendflow.app/scan/abc123
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="flex h-7 w-7 items-center justify-center p-0"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                </Button>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="primary" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download QR
                </Button>
                <Button variant="secondary" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
              </div>
            </GlassCard>

            <div className="flex justify-center">
              <Link href="/dashboard/sessions">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Sessions
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
