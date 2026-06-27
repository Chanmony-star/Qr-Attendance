"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Settings,
  MapPin,
  Wifi,
  Moon,
  Sun,
  Shield,
  Globe,
  Save,
  Check,
  Upload,
} from "lucide-react";

type SettingsTab = "general" | "location" | "network" | "appearance" | "security";

const tabs: { id: SettingsTab; label: string; icon: typeof Settings }[] = [
  { id: "general", label: "General", icon: Settings },
  { id: "location", label: "Location", icon: MapPin },
  { id: "network", label: "Network", icon: Wifi },
  { id: "appearance", label: "Appearance", icon: Moon },
  { id: "security", label: "Security", icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold tracking-tight text-navy-950 dark:text-text-primary">
          Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-text-soft">
          Configure your school&apos;s attendance system
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex gap-1 overflow-x-auto pb-1"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20"
                : "bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-gray-500 dark:text-text-muted hover:bg-gray-50 dark:hover:bg-white/5"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "general" && (
            <GlassCard>
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-navy-950 dark:text-text-primary mb-1">School Information</h2>
                  <p className="text-xs text-gray-500 dark:text-text-soft mb-4">Manage your institution details</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-950 dark:text-text-primary mb-1.5">School Name</label>
                      <input
                        type="text"
                        defaultValue="State University"
                        className="w-full rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary px-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-950 dark:text-text-primary mb-1.5">Short Code</label>
                      <input
                        type="text"
                        defaultValue="SU"
                        className="w-full rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary px-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-navy-950 dark:text-text-primary mb-1.5">Address</label>
                      <input
                        type="text"
                        defaultValue="123 University Avenue, Academic City, ST 12345"
                        className="w-full rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary px-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border-subtle pt-6">
                  <h2 className="text-base font-semibold text-navy-950 dark:text-text-primary mb-1">Notifications</h2>
                  <p className="text-xs text-gray-500 dark:text-text-soft mb-4">Control email and push notification preferences</p>
                  <div className="space-y-3">
                    {[
                      { label: "Session started", desc: "When a new attendance session begins" },
                      { label: "Low attendance alert", desc: "When attendance drops below 80%" },
                      { label: "Daily summary report", desc: "End-of-day attendance summary" },
                      { label: "Student registration", desc: "When a new student registers" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm font-medium text-navy-950 dark:text-text-primary">{item.label}</p>
                          <p className="text-xs text-gray-500 dark:text-text-soft">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex h-5 w-9 cursor-pointer items-center">
                          <input type="checkbox" defaultChecked className="peer sr-only" />
                          <div className="h-5 w-9 rounded-full bg-gray-200 dark:bg-navy-700 peer-checked:bg-brand-600 transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-3.5 after:w-3.5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {activeTab === "location" && (
            <GlassCard>
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-navy-950 dark:text-text-primary mb-1">GPS Configuration</h2>
                  <p className="text-xs text-gray-500 dark:text-text-soft mb-4">Set the school location and verification radius</p>

                  <div className="rounded-xl bg-black/5 dark:bg-white/5 p-6 mb-6 text-center">
                    <MapPin className="h-10 w-10 mx-auto text-brand-600 dark:text-brand-400 mb-3" />
                    <p className="text-sm font-medium text-navy-950 dark:text-text-primary">School Location Set</p>
                    <p className="text-xs text-gray-500 dark:text-text-soft mt-1">40.7128° N, 74.0060° W · Academic City</p>
                    <Button variant="ghost" size="sm" className="mt-3 text-xs">Update Coordinates</Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-950 dark:text-text-primary mb-1.5">Latitude</label>
                      <input
                        type="text"
                        defaultValue="40.7128"
                        className="w-full rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary px-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-950 dark:text-text-primary mb-1.5">Longitude</label>
                      <input
                        type="text"
                        defaultValue="-74.0060"
                        className="w-full rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary px-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-950 dark:text-text-primary mb-1.5">Verification Radius (meters)</label>
                      <input
                        type="number"
                        defaultValue={50}
                        className="w-full rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary px-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-950 dark:text-text-primary mb-1.5">Grace Radius (meters)</label>
                      <input
                        type="number"
                        defaultValue={100}
                        className="w-full rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary px-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {activeTab === "network" && (
            <GlassCard>
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-navy-950 dark:text-text-primary mb-1">WiFi Configuration</h2>
                  <p className="text-xs text-gray-500 dark:text-text-soft mb-4">Configure allowed networks for attendance verification</p>

                  <div className="space-y-3 mb-6">
                    {[
                      { ssid: "School-Network", security: "WPA3", ip: "192.168.1.0/24", status: "active" as const },
                      { ssid: "School-Guest", security: "WPA2", ip: "192.168.2.0/24", status: "active" as const },
                      { ssid: "Admin-Secure", security: "WPA3-Enterprise", ip: "10.0.1.0/24", status: "active" as const },
                    ].map((net) => (
                      <div key={net.ssid} className="flex items-center gap-4 rounded-xl bg-black/5 dark:bg-white/5 p-3">
                        <Wifi className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-navy-950 dark:text-text-primary">{net.ssid}</p>
                          <p className="text-xs text-gray-500 dark:text-text-soft">{net.security} · {net.ip}</p>
                        </div>
                        <Badge variant="success">Active</Badge>
                        <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-red-500">Remove</Button>
                      </div>
                    ))}
                  </div>

                  <Button variant="secondary" size="sm" className="gap-1.5">
                    <Wifi className="h-4 w-4" />
                    Add Network
                  </Button>
                </div>

                <div className="border-t border-border-subtle pt-6">
                  <h2 className="text-base font-semibold text-navy-950 dark:text-text-primary mb-1">Allowed IP Ranges</h2>
                  <p className="text-xs text-gray-500 dark:text-text-soft mb-4">Restrict attendance marking to specific IP ranges</p>
                  <div className="space-y-2">
                    {["192.168.1.0/24", "10.0.0.0/16", "172.16.0.0/12"].map((ip) => (
                      <div key={ip} className="flex items-center justify-between rounded-xl bg-black/5 dark:bg-white/5 px-4 py-2.5">
                        <code className="text-sm text-navy-950 dark:text-text-primary font-mono">{ip}</code>
                        <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-red-500">Remove</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {activeTab === "appearance" && (
            <GlassCard>
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-navy-950 dark:text-text-primary mb-1">Theme</h2>
                  <p className="text-xs text-gray-500 dark:text-text-soft mb-4">Customize the application appearance</p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { id: "dark", icon: Moon, label: "Dark", desc: "Easy on the eyes" },
                      { id: "light", icon: Sun, label: "Light", desc: "Clean & bright" },
                      { id: "system", icon: Globe, label: "System", desc: "Follows device" },
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        className={`rounded-xl border-2 p-4 text-center transition-all ${
                          theme.id === "dark"
                            ? "border-brand-600 bg-brand-600/5"
                            : "border-gray-200 dark:border-border-subtle hover:border-gray-300"
                        }`}
                      >
                        <theme.icon className={`h-6 w-6 mx-auto mb-2 ${
                          theme.id === "dark" ? "text-brand-600" : "text-gray-400"
                        }`} />
                        <p className="text-sm font-medium text-navy-950 dark:text-text-primary">{theme.label}</p>
                        <p className="text-xs text-gray-500 dark:text-text-soft mt-0.5">{theme.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border-subtle pt-6">
                  <h2 className="text-base font-semibold text-navy-950 dark:text-text-primary mb-1">Session Timeout</h2>
                  <p className="text-xs text-gray-500 dark:text-text-soft mb-4">Auto-logout after inactivity</p>
                  <select
                    defaultValue="30"
                    className="w-full max-w-xs rounded-xl bg-white dark:bg-navy-800/50 border border-gray-200 dark:border-border-subtle text-navy-950 dark:text-text-primary px-4 py-2.5 text-sm outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="240">4 hours</option>
                    <option value="never">Never</option>
                  </select>
                </div>

                <div className="border-t border-border-subtle pt-6">
                  <h2 className="text-base font-semibold text-navy-950 dark:text-text-primary mb-1">Branding</h2>
                  <p className="text-xs text-gray-500 dark:text-text-soft mb-4">Upload your school logo</p>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-600">
                      <span className="text-2xl font-bold text-white">SU</span>
                    </div>
                    <div>
                      <Button variant="secondary" size="sm" className="gap-1.5">
                        <Upload className="h-4 w-4" />
                        Upload Logo
                      </Button>
                      <p className="text-xs text-gray-500 dark:text-text-soft mt-1">PNG, JPG. Max 2MB.</p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {activeTab === "security" && (
            <GlassCard>
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-navy-950 dark:text-text-primary mb-1">Password Policy</h2>
                  <p className="text-xs text-gray-500 dark:text-text-soft mb-4">Configure authentication security requirements</p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-navy-950 dark:text-text-primary">Minimum password length</p>
                        <p className="text-xs text-gray-500 dark:text-text-soft">Require at least 8 characters</p>
                      </div>
                      <label className="relative inline-flex h-5 w-9 cursor-pointer items-center">
                        <input type="checkbox" defaultChecked className="peer sr-only" />
                        <div className="h-5 w-9 rounded-full bg-gray-200 dark:bg-navy-700 peer-checked:bg-brand-600 transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-3.5 after:w-3.5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-navy-950 dark:text-text-primary">Two-factor authentication</p>
                        <p className="text-xs text-gray-500 dark:text-text-soft">Require 2FA for all admin accounts</p>
                      </div>
                      <label className="relative inline-flex h-5 w-9 cursor-pointer items-center">
                        <input type="checkbox" className="peer sr-only" />
                        <div className="h-5 w-9 rounded-full bg-gray-200 dark:bg-navy-700 peer-checked:bg-brand-600 transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-3.5 after:w-3.5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-navy-950 dark:text-text-primary">Session recording audit log</p>
                        <p className="text-xs text-gray-500 dark:text-text-soft">Log all admin actions for compliance</p>
                      </div>
                      <label className="relative inline-flex h-5 w-9 cursor-pointer items-center">
                        <input type="checkbox" defaultChecked className="peer sr-only" />
                        <div className="h-5 w-9 rounded-full bg-gray-200 dark:bg-navy-700 peer-checked:bg-brand-600 transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-3.5 after:w-3.5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border-subtle pt-6">
                  <h2 className="text-base font-semibold text-navy-950 dark:text-text-primary mb-1">Access Control</h2>
                  <p className="text-xs text-gray-500 dark:text-text-soft mb-4">Manage admin access and permissions</p>

                  <div className="space-y-3">
                    {[
                      { email: "admin@school.edu", role: "Super Admin", status: "active" as const },
                      { email: "teacher@school.edu", role: "Teacher", status: "active" as const },
                      { email: "assistant@school.edu", role: "Assistant", status: "pending" as const },
                    ].map((user) => (
                      <div key={user.email} className="flex items-center gap-3 rounded-xl bg-black/5 dark:bg-white/5 p-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                          {user.email[0].toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-navy-950 dark:text-text-primary">{user.email}</p>
                          <p className="text-xs text-gray-500 dark:text-text-soft">{user.role}</p>
                        </div>
                        <Badge variant={user.status === "active" ? "success" : "default"}>
                          {user.status === "active" ? "Active" : "Pending"}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-red-500">Revoke</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Save bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="sticky bottom-4"
      >
        <GlassCard className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-text-soft">
            {saved ? "All settings saved" : "Unsaved changes"}
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            className="gap-1.5"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </GlassCard>
      </motion.div>
    </div>
  );
}
