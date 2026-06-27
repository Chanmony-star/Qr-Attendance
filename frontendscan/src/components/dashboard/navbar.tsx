"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  Moon,
  Sun,
  Menu,
  ChevronDown,
  LogOut,
  User,
  Settings,
  HelpCircle,
  CheckCheck,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";

interface DashboardNavbarProps {
  onMenuClick: () => void;
  title?: string;
}

export function DashboardNavbar({ onMenuClick, title }: DashboardNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const notifications = [
    { id: 1, title: "Session CS-301 started", time: "2 min ago", read: false },
    { id: 2, title: "12 students marked present", time: "15 min ago", read: false },
    { id: 3, title: "New student registered", time: "1 hour ago", read: false },
    { id: 4, title: "Attendance report ready", time: "3 hours ago", read: true },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      className={cn(
        "sticky top-0 z-30 transition-all duration-300",
        scrolled
          ? "bg-white/80 dark:bg-navy-950/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-border-subtle"
          : "bg-transparent"
      )}
    >
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
        {/* Left: hamburger + title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg text-gray-500 dark:text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Breadcrumbs */}
          <nav className="hidden sm:flex items-center gap-2 text-sm">
            <span className="text-gray-400 dark:text-text-soft">AttendFlow</span>
            <span className="text-gray-300 dark:text-text-soft/50">/</span>
            <span className="font-medium text-navy-950 dark:text-text-primary">
              {title || "Dashboard"}
            </span>
          </nav>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative" ref={searchRef}>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 dark:text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Search"
            >
              <Search className="h-4.5 w-4.5" />
            </button>
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 top-full mt-2 w-80 glass rounded-xl p-2 shadow-xl border border-border-subtle"
                >
                  <div className="flex items-center gap-2 rounded-lg bg-black/5 dark:bg-white/5 px-3 py-2">
                    <Search className="h-4 w-4 text-text-soft" />
                    <input
                      type="text"
                      placeholder="Search sessions, students..."
                      className="flex-1 bg-transparent text-sm text-navy-950 dark:text-text-primary placeholder:text-text-soft outline-none"
                      autoFocus
                    />
                    <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border-subtle px-1.5 py-0.5 text-[10px] text-text-soft">
                      ⌘K
                    </kbd>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search bar (always visible on larger screens) */}
          <div className="hidden xl:flex items-center gap-2 rounded-lg bg-black/5 dark:bg-white/5 px-3 py-1.5 text-sm text-gray-400 dark:text-text-soft cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
            <Search className="h-4 w-4" />
            <span>Search sessions, students...</span>
            <kbd className="ml-4 inline-flex items-center gap-1 rounded-md border border-border-subtle px-1.5 py-0.5 text-[10px]">
              ⌘K
            </kbd>
          </div>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 dark:text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                !mounted && "invisible"
              )}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4.5 w-4.5" />
              ) : (
                <Moon className="h-4.5 w-4.5" />
              )}
            </button>
          )}

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 dark:text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-4.5 w-4.5" />
              {unreadCount > 0 && (
                <span className="absolute right-2 top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-brand-600 px-1 text-[9px] font-bold text-white leading-none">
                  {unreadCount}
                </span>
              )}
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-80 glass rounded-xl shadow-xl border border-border-subtle overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
                    <span className="text-sm font-semibold text-navy-950 dark:text-text-primary">Notifications</span>
                    <button className="text-xs text-brand-600 hover:text-brand-700 transition-colors">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={cn(
                          "flex items-start gap-3 px-4 py-3 transition-colors cursor-pointer hover:bg-black/5 dark:hover:bg-white/5",
                          !n.read && "bg-brand-600/5"
                        )}
                      >
                        <div className={cn(
                          "mt-1 flex h-2 w-2 shrink-0 rounded-full",
                          n.read ? "bg-gray-300 dark:bg-navy-700" : "bg-brand-600"
                        )} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-navy-950 dark:text-text-primary truncate">{n.title}</p>
                          <p className="text-xs text-gray-500 dark:text-text-soft mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border-subtle px-4 py-2.5">
                    <button className="text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors w-full text-center">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User dropdown */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white">
                A
              </div>
              <ChevronDown className={cn(
                "hidden sm:block h-3.5 w-3.5 text-gray-400 dark:text-text-soft transition-transform duration-200",
                userMenuOpen && "rotate-180"
              )} />
            </button>
            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 glass rounded-xl shadow-xl border border-border-subtle overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-border-subtle">
                    <p className="text-sm font-medium text-navy-950 dark:text-text-primary">Admin User</p>
                    <p className="text-xs text-gray-500 dark:text-text-soft">admin@school.edu</p>
                  </div>
                  <div className="py-1">
                    {[
                      { icon: User, label: "Profile" },
                      { icon: Settings, label: "Settings" },
                      { icon: HelpCircle, label: "Help & Support" },
                      { icon: CheckCheck, label: "Keyboard Shortcuts" },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-600 dark:text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-border-subtle py-1">
                    <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-500/5 transition-colors">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
