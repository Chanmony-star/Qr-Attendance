"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Play,
  Shield,
  CheckCircle2,
  BarChart3,
  QrCode,
  Users,
  Activity,
  Clock,
  ScanLine,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ── Mini sparkline chart (inline SVG) ── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 120;
  const h = 36;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible" aria-hidden="true">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
    </svg>
  );
}

/* ── Animated counter ── */
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number>(0);
  useEffect(() => {
    let start = 0;
    const dur = 2000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(e * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <span aria-live="polite">{display.toLocaleString()}{suffix}</span>;
}

/* ── Floating glass card ── */
function FloatCard({
  className,
  children,
  delay = 0,
  style,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  style?: object;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={`glass rounded-xl p-4 ${className}`}
      style={{ transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 30 });

  // Reactive parallax transforms per card
  const c1x = useTransform(springX, (v) => (v - 0.5) * 20);
  const c1y = useTransform(springY, (v) => (v - 0.5) * 20);
  const c2x = useTransform(springX, (v) => (v - 0.5) * -30);
  const c2y = useTransform(springY, (v) => (v - 0.5) * -20);
  const c3x = useTransform(springX, (v) => (v - 0.5) * 25);
  const c3y = useTransform(springY, (v) => (v - 0.5) * 25);
  const c4x = useTransform(springX, (v) => (v - 0.5) * -15);
  const c4y = useTransform(springY, (v) => (v - 0.5) * 15);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouse}
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-white dark:bg-navy-950" />

      {/* Light mesh gradient */}
      <div className="absolute inset-0 bg-mesh-gradient-light dark:bg-mesh-gradient" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern-light dark:grid-pattern opacity-50" />

      {/* Spotlight */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-brand-600/10 dark:bg-brand-600/8 blur-[120px] animate-pulse-glow" />

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left column ── */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Badge variant="default" className="mb-6">
                <div className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse mr-1.5" />
                Now in Public Beta
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight dark:text-white text-navy-950"
            >
              Smart QR{" "}
              <span className="text-brand-600">Attendance</span>
              <br />
              for Modern Institutions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-gray-500 dark:text-text-muted leading-relaxed max-w-lg"
            >
              Automate attendance tracking with QR codes, real-time analytics, and
              end-to-end encryption. Built for schools, universities, and
              organizations that value precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="primary" size="xl" className="gap-2">
                Start Free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="xl" className="gap-2">
                <Play className="h-4 w-4" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 text-sm"
            >
              {[
                { icon: Shield, label: "Enterprise Secure" },
                { icon: CheckCircle2, label: "GDPR Ready" },
                { icon: BarChart3, label: "Real-Time Analytics" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-gray-500 dark:text-text-soft">
                  <item.icon className="h-4 w-4 text-brand-500" />
                  {item.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column — Floating dashboard preview ── */}
          <div className="relative h-[500px] lg:h-[600px]" style={{ perspective: "1200px" }}>
            {/* Main card */}
            <FloatCard
              delay={0.6}
              className="absolute top-4 left-4 right-4 z-20 p-5"
              style={{ x: c1x, y: c1y }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-medium dark:text-white text-navy-950">Live Attendance</span>
                </div>
                <Badge variant="success">+12% today</Badge>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold dark:text-white text-navy-950">
                    <AnimatedNumber value={847} />
                  </div>
                  <div className="text-xs dark:text-text-soft text-gray-500">Students present</div>
                </div>
                <Sparkline
                  data={[120, 180, 140, 220, 200, 280, 260, 340, 300, 380, 420, 400, 480, 520, 500, 580, 620, 600, 680, 720, 700, 780, 820, 847]}
                  color="#3b82f6"
                />
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-gray-200 dark:bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "73%" }}
                  transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-1 text-[10px] dark:text-text-soft text-gray-500">
                <span>Target: 1,200</span>
                <span>73% capacity</span>
              </div>
            </FloatCard>

            {/* QR card */}
            <FloatCard
              delay={0.8}
              className="absolute top-24 right-0 w-44 z-30"
              style={{ x: c2x, y: c2y }}
            >
              <div className="flex items-center gap-2 mb-3">
                <ScanLine className="h-4 w-4 text-brand-400" />
                <span className="text-xs font-medium dark:text-white text-navy-950">Scan Code</span>
              </div>
              <div className="aspect-square rounded-lg bg-white dark:bg-white p-2 flex items-center justify-center">
                <QrCode className="h-full w-full text-navy-950" />
              </div>
              <div className="mt-2 text-[10px] dark:text-text-soft text-gray-500 text-center">
                Session: CS-301 · Room 204
              </div>
            </FloatCard>

            {/* Stats card */}
            <FloatCard
              delay={1}
              className="absolute bottom-20 left-0 w-48 z-30"
              style={{ x: c3x, y: c3y }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-brand-400" />
                <span className="text-xs font-medium dark:text-white text-navy-950">Quick Stats</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Total Students", value: "2,847", icon: Users },
                  { label: "Avg Attendance", value: "94%", icon: TrendingUp },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between text-xs">
                    <span className="dark:text-text-soft text-gray-500">{s.label}</span>
                    <span className="font-semibold dark:text-white text-navy-950">{s.value}</span>
                  </div>
                ))}
              </div>
            </FloatCard>

            {/* Activity feed card */}
            <FloatCard
              delay={1.2}
              className="absolute bottom-4 right-4 w-56 z-20"
              style={{ x: c4x, y: c4y }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Activity className="h-4 w-4 text-brand-400" />
                <span className="text-xs font-medium dark:text-white text-navy-950">Recent Activity</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Sarah Chen", time: "Just now", action: "Scanned in" },
                  { name: "Alex Rivera", time: "1m ago", action: "Scanned in" },
                  { name: "Mia Johnson", time: "3m ago", action: "Scanned in" },
                ].map((a) => (
                  <div key={a.name} className="flex items-center gap-2 text-xs">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="dark:text-text-muted text-gray-600 flex-1">{a.name}</span>
                    <span className="dark:text-text-soft text-gray-400">{a.time}</span>
                  </div>
                ))}
              </div>
            </FloatCard>

            {/* Attendance heatmap card */}
            <FloatCard
              delay={1.4}
              className="absolute top-48 left-1/2 -translate-x-1/2 w-40 z-10 opacity-80"
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-3 w-3 text-brand-400" />
                <span className="text-[10px] font-medium dark:text-white text-navy-950">This Week</span>
              </div>
              <div className="flex gap-1">
                {[92, 88, 95, 78, 96, 85, 90].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <div
                      className="w-full rounded-sm transition-all bg-brand-600"
                      style={{ height: `${v * 0.6}px`, opacity: 0.3 + v * 0.007 }}
                    />
                    <span className="text-[8px] dark:text-text-soft text-gray-500">
                      {["M", "T", "W", "T", "F", "S", "S"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </FloatCard>
          </div>
        </div>
      </div>
    </section>
  );
}
