"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ScanLine,
  Smartphone,
  MapPin,
  CheckCircle2,
  User,
  QrCode,
  ArrowRight,
  Shield,
  Wifi,
  Sparkles,
  UserPlus,
  RotateCcw,
  RefreshCw,
  Clock,
} from "lucide-react";

type ScanStep = "session" | "identify" | "location" | "complete";

interface StudentProfile {
  id: string;
  name: string;
  firstSeen: string;
}

const DEMO_SESSIONS = ["CS-301", "MATH-201", "PHYS-101", "ENG-102"];

export default function ScanDemoPage() {
  const [step, setStep] = useState<ScanStep>("session");
  const [sessionCode, setSessionCode] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [studentProfiles, setStudentProfiles] = useState<StudentProfile[]>([]);
  const [identifiedStudent, setIdentifiedStudent] = useState<StudentProfile | null>(null);
  const [manualMode, setManualMode] = useState(false);
  const [manualId, setManualId] = useState("");
  const [manualName, setManualName] = useState("");
  const [gpsVerifying, setGpsVerifying] = useState(false);
  const [gpsVerified, setGpsVerified] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("scan-profiles");
    if (stored) {
      try {
        setStudentProfiles(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const persistProfiles = (profiles: StudentProfile[]) => {
    setStudentProfiles(profiles);
    localStorage.setItem("scan-profiles", JSON.stringify(profiles));
  };

  /* ── Session code handling ── */
  const handleJoinSession = () => {
    const code = sessionCode.trim();
    if (code) {
      setSelectedSession(code);
      setStep("identify");
    }
  };

  const handleSessionSelect = (code: string) => {
    setSelectedSession(code);
    setSessionCode(code);
    setStep("identify");
  };

  /* ── Student identification ── */
  const handleAutoScan = () => {
    // Simulated QR decode: try to find a known profile by "scanning"
    if (studentProfiles.length > 0) {
      // Return the most recently added student
      const last = studentProfiles[studentProfiles.length - 1];
      setIdentifiedStudent(last);
    } else {
      setManualMode(true);
    }
  };

  const handleManualLookup = () => {
    const profile = studentProfiles.find((p) => p.id === manualId.trim());
    if (profile) {
      setIdentifiedStudent(profile);
      return;
    }

    // Register new student if name provided
    if (manualName.trim()) {
      const newStudent: StudentProfile = {
        id: manualId.trim() || `STU-${String(studentProfiles.length + 1).padStart(3, "0")}`,
        name: manualName.trim(),
        firstSeen: new Date().toLocaleDateString(),
      };
      persistProfiles([...studentProfiles, newStudent]);
      setIdentifiedStudent(newStudent);
    }
  };

  const handleUseManualAnyways = () => {
    setManualMode(true);
    setIdentifiedStudent(null);
  };

  /* ── Location verification ── */
  const handleVerifyLocation = async () => {
    setGpsVerifying(true);
    await new Promise((r) => setTimeout(r, 2000));
    setGpsVerified(true);
    setGpsVerifying(false);
    setStep("complete");
  };

  /* ── Reset ── */
  const handleReset = () => {
    setStep("session");
    setSessionCode("");
    setSelectedSession("");
    setIdentifiedStudent(null);
    setManualMode(false);
    setManualId("");
    setManualName("");
    setGpsVerifying(false);
    setGpsVerified(false);
  };

  const progress = step === "session" ? 0 : step === "identify" ? 33 : step === "location" ? 66 : 100;

  const stepLabel = (s: string, i: number) => {
    const order = ["session", "identify", "location", "complete"];
    const idx = order.indexOf(step);
    if (i < idx || (i === order.length - 1 && idx === order.length - 1)) return "complete";
    if (i === idx) return "active";
    return "pending";
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <div className="flex justify-center mb-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 shadow-lg shadow-brand-600/20">
            <ScanLine className="h-7 w-7 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-navy-950 dark:text-text-primary">
          Scan Simulator
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-text-soft">
          Teacher demo — simulate the student scanning experience
        </p>
      </motion.div>

      {/* Progress */}
      <div className="relative">
        <div className="h-1.5 rounded-full bg-gray-200 dark:bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {["Session", "Student", "Location", "Done"].map((s, i) => {
            const state = stepLabel(s, i);
            return (
              <div
                key={s}
                className={`flex items-center gap-1 text-[11px] font-medium ${
                  state === "complete"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : state === "active"
                      ? "text-brand-600 dark:text-brand-400"
                      : "text-gray-400 dark:text-text-soft"
                }`}
              >
                {state === "complete" ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : (
                  <div
                    className={`h-2.5 w-2.5 rounded-full border-2 ${
                      state === "active"
                        ? "border-brand-600"
                        : "border-gray-300 dark:border-navy-700"
                    }`}
                  />
                )}
                {s}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 0: Session selection */}
        {step === "session" && (
          <motion.div
            key="session"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard>
              <div className="text-center mb-5">
                <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-600/20 to-brand-400/10 flex items-center justify-center mb-4">
                  <Smartphone className="h-10 w-10 text-brand-600 dark:text-brand-400" />
                </div>
                <h2 className="text-lg font-semibold text-navy-950 dark:text-text-primary">
                  Simulate Student Scan
                </h2>
                <p className="text-sm text-gray-500 dark:text-text-soft mt-1">
                  Select a session to simulate what a student sees when scanning the QR code
                </p>
              </div>

              {/* Demo session picker */}
              <div className="space-y-2 mb-5">
                {DEMO_SESSIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSessionSelect(s)}
                    className="w-full text-left flex items-center gap-3 rounded-xl border border-gray-200 dark:border-border-subtle p-3 hover:border-brand-500/50 hover:bg-brand-600/5 transition-all group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600 dark:text-brand-400 group-hover:bg-brand-600/20 transition-colors">
                      <QrCode className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-navy-950 dark:text-text-primary">{s}</div>
                      <div className="text-xs text-gray-400 dark:text-text-soft">Scan QR to join session</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-brand-500 transition-colors shrink-0" />
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="relative mb-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white dark:bg-navy-800 px-3 text-gray-400 dark:text-text-soft">or enter code</span>
                </div>
              </div>

              {/* Manual code entry */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sessionCode}
                  onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
                  placeholder="Session code (e.g. CS-301)"
                  className="flex-1 rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary placeholder:text-gray-400 dark:placeholder:text-text-soft px-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                  onKeyDown={(e) => e.key === "Enter" && handleJoinSession()}
                />
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleJoinSession}
                  disabled={!sessionCode.trim()}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </GlassCard>

            {/* Storage status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <GlassCard className="text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-text-soft">
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>
                    {studentProfiles.length > 0
                      ? `${studentProfiles.length} student profile${studentProfiles.length > 1 ? "s" : ""} saved on this device`
                      : "No saved student profiles yet"}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}

        {/* STEP 1: Identify Student */}
        {step === "identify" && (
          <motion.div
            key="identify"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard>
              {/* Session context */}
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border-subtle">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600 dark:text-brand-400">
                  <QrCode className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-navy-950 dark:text-text-primary">{selectedSession}</div>
                  <div className="text-[11px] text-gray-400 dark:text-text-soft">QR code scanned</div>
                </div>
              </div>

              <div className="text-center mb-5">
                <div className="mx-auto w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-600/20 to-brand-400/10 flex items-center justify-center mb-3">
                  {identifiedStudent ? (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-xl font-bold text-white">
                      {identifiedStudent.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  ) : (
                    <User className="h-10 w-10 text-brand-600 dark:text-brand-400" />
                  )}
                </div>

                {identifiedStudent ? (
                  <>
                    <Badge variant="success" className="mb-2">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Returning Student — Auto-identified!
                    </Badge>
                    <h2 className="text-lg font-semibold text-navy-950 dark:text-text-primary">
                      {identifiedStudent.name}
                    </h2>
                    <p className="text-xs text-gray-400 dark:text-text-soft mt-0.5">{identifiedStudent.id}</p>
                    <p className="text-xs text-gray-400 dark:text-text-soft mt-2">
                      First seen: {identifiedStudent.firstSeen} &middot; Saved via device storage
                    </p>
                    <div className="mt-4 flex gap-2 justify-center">
                      <Button variant="primary" size="sm" className="gap-1" onClick={() => setStep("location")}>
                        <CheckCircle2 className="h-4 w-4" />
                        This is me
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setIdentifiedStudent(null)}>
                        Not me
                      </Button>
                    </div>
                  </>
                ) : manualMode ? (
                  <>
                    <h2 className="text-lg font-semibold text-navy-950 dark:text-text-primary mb-1">
                      {studentProfiles.length > 0 ? "Enter Your Details" : "New Student Registration"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-text-soft mb-5">
                      {studentProfiles.length > 0
                        ? "We couldn't identify you automatically. Enter your details to continue."
                        : "Register your details to mark attendance. You'll be remembered next time."}
                    </p>

                    <div className="space-y-3">
                      <div>
                        <input
                          type="text"
                          value={manualName}
                          onChange={(e) => setManualName(e.target.value)}
                          placeholder="Full name"
                          className="w-full rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary placeholder:text-gray-400 dark:placeholder:text-text-soft px-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={manualId}
                          onChange={(e) => setManualId(e.target.value)}
                          placeholder="Student ID (optional)"
                          className="w-full rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary placeholder:text-gray-400 dark:placeholder:text-text-soft px-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                        />
                      </div>
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full gap-1.5"
                        onClick={handleManualLookup}
                        disabled={!manualName.trim()}
                      >
                        <UserPlus className="h-4 w-4" />
                        {studentProfiles.length > 0 ? "Look Up & Continue" : "Register & Continue"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Auto-identify prompt */}
                    <h2 className="text-lg font-semibold text-navy-950 dark:text-text-primary mb-1">
                      Identify Student
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-text-soft mb-5">
                      Simulate scanning the QR code with a student&apos;s phone
                    </p>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full gap-2 text-base mb-3"
                      onClick={handleAutoScan}
                    >
                      <Smartphone className="h-5 w-5" />
                      Scan QR (Simulate)
                    </Button>

                    <Button
                      variant="ghost"
                      size="md"
                      className="w-full gap-1.5"
                      onClick={handleUseManualAnyways}
                    >
                      <UserPlus className="h-4 w-4" />
                      Enter details manually
                    </Button>
                  </>
                )}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* STEP 2: Location Verification */}
        {step === "location" && (
          <motion.div
            key="location"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard>
              {gpsVerifying ? (
                <div className="text-center py-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="mx-auto w-16 h-16 rounded-2xl bg-brand-600/10 flex items-center justify-center mb-4"
                  >
                    <MapPin className="h-8 w-8 text-brand-600 dark:text-brand-400" />
                  </motion.div>
                  <h2 className="text-lg font-semibold text-navy-950 dark:text-text-primary mb-2">
                    Verifying Location
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-text-soft">
                    Checking you&apos;re within the school premises...
                  </p>
                  <div className="mt-6 h-1.5 rounded-full bg-gray-200 dark:bg-white/5 overflow-hidden max-w-xs mx-auto">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-text-soft">
                    <Shield className="h-3 w-3" />
                    GPS + WiFi verification in progress
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Badge variant="success">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Student Identified
                    </Badge>
                  </div>

                  {/* Student info */}
                  {identifiedStudent && (
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-base font-bold text-white">
                        {identifiedStudent.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-navy-950 dark:text-text-primary">
                          {identifiedStudent.name}
                        </h3>
                        <p className="text-xs text-gray-400 dark:text-text-soft">{identifiedStudent.id}</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 rounded-xl bg-black/5 dark:bg-white/5 p-3">
                      <MapPin className="h-5 w-5 text-brand-600 dark:text-brand-400 shrink-0" />
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-navy-950 dark:text-text-primary">Location Verification</p>
                        <p className="text-xs text-gray-500 dark:text-text-soft">Required to mark attendance</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-black/5 dark:bg-white/5 p-3">
                      <Wifi className="h-5 w-5 text-brand-600 dark:text-brand-400 shrink-0" />
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-navy-950 dark:text-text-primary">WiFi Network</p>
                        <p className="text-xs text-gray-500 dark:text-text-soft">Connected to School-Network</p>
                      </div>
                      <Badge variant="success">Connected</Badge>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-black/5 dark:bg-white/5 p-3">
                      <Clock className="h-5 w-5 text-brand-600 dark:text-brand-400 shrink-0" />
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-navy-950 dark:text-text-primary">Session</p>
                        <p className="text-xs text-gray-500 dark:text-text-soft">{selectedSession}</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleVerifyLocation}
                  >
                    <MapPin className="h-4 w-4 mr-1" />
                    Verify & Mark Attendance
                  </Button>
                </div>
              )}
            </GlassCard>
          </motion.div>
        )}

        {/* STEP 3: Complete */}
        {step === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <GlassCard className="text-center">
              {/* Success */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mx-auto w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl font-bold text-navy-950 dark:text-text-primary mb-2">
                  Attendance Marked!
                </h2>
                <p className="text-sm text-gray-500 dark:text-text-soft mb-6">
                  Successfully recorded for {selectedSession}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2.5 mb-6"
              >
                {identifiedStudent && (
                  <div className="flex items-center justify-between rounded-xl bg-black/5 dark:bg-white/5 p-3 text-sm">
                    <span className="text-gray-500 dark:text-text-soft">Student</span>
                    <span className="font-medium text-navy-950 dark:text-text-primary">{identifiedStudent.name}</span>
                  </div>
                )}
                <div className="flex items-center justify-between rounded-xl bg-black/5 dark:bg-white/5 p-3 text-sm">
                  <span className="text-gray-500 dark:text-text-soft">Session</span>
                  <span className="font-medium text-navy-950 dark:text-text-primary">{selectedSession}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-black/5 dark:bg-white/5 p-3 text-sm">
                  <span className="text-gray-500 dark:text-text-soft">Time</span>
                  <span className="font-medium text-navy-950 dark:text-text-primary">
                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-black/5 dark:bg-white/5 p-3 text-sm">
                  <span className="text-gray-500 dark:text-text-soft">Method</span>
                  <span className="font-medium text-navy-950 dark:text-text-primary">
                    {identifiedStudent && studentProfiles.find((p) => p.id === identifiedStudent.id)
                      ? "Auto-identified"
                      : "Manual entry"}
                  </span>
                </div>
              </motion.div>

              {/* Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-2 mb-6"
              >
                <Badge variant="success">
                  <MapPin className="h-3 w-3 mr-1" />
                  GPS Verified
                </Badge>
                <Badge variant="success">
                  <Wifi className="h-3 w-3 mr-1" />
                  WiFi Verified
                </Badge>
                <Badge variant="success">
                  <Shield className="h-3 w-3 mr-1" />
                  Secure
                </Badge>
              </motion.div>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="md"
                  className="flex-1 gap-1.5"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-4 w-4" />
                  New Scan
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1 gap-1.5"
                  onClick={() => {
                    handleReset();
                    handleAutoScan();
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                  Scan Again
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
