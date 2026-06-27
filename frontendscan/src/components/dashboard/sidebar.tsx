"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  QrCode,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Settings,
  X,
} from "lucide-react";
import { navSections, studentNavItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

function NavItemComponent({
  href,
  icon: Icon,
  label,
  badge,
  collapsed,
  onClick,
}: {
  href: string;
  icon: any;
  label: string;
  badge?: string;
  collapsed: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl transition-all duration-200",
        collapsed ? "justify-center p-3" : "px-3 py-2.5",
        isActive
          ? "bg-brand-600/10 text-brand-600 dark:text-brand-400"
          : "text-gray-500 dark:text-text-muted hover:text-navy-950 dark:hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute inset-0 rounded-xl bg-brand-600/10 dark:bg-brand-600/10"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <div className="relative flex items-center gap-3">
        <Icon className={cn("shrink-0", collapsed ? "h-5 w-5" : "h-4.5 w-4.5")} />
        {!collapsed && (
          <span className="text-sm font-medium">{label}</span>
        )}
      </div>
      {!collapsed && badge && (
        <span className="ml-auto rounded-full bg-brand-600/20 px-2 py-0.5 text-[10px] font-medium text-brand-600 dark:text-brand-400">
          {badge}
        </span>
      )}
      {collapsed && (
        <div className="absolute left-full ml-2 hidden rounded-lg bg-navy-900 dark:bg-navy-800 px-2.5 py-1.5 text-xs font-medium text-white shadow-xl group-hover:block whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </Link>
  );
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const mounted = useMounted();

  // Close mobile sidebar on route change
  useEffect(() => {
    onMobileClose();
  }, [pathname, onMobileClose]);

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className={cn("flex items-center border-b border-border-subtle px-4", collapsed ? "justify-center py-4" : "gap-3 py-4")}>
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 transition-colors group-hover:bg-brand-700">
            <QrCode className="h-4.5 w-4.5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-base font-semibold tracking-tight text-white dark:text-white text-navy-950">
              AttendFlow
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin">
        <nav className="space-y-6">
          {navSections.map((section) => (
            <div key={section.label}>
              {!collapsed && (
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-text-soft">
                  {section.label}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavItemComponent
                    key={item.href}
                    {...item}
                    collapsed={collapsed}
                    onClick={onMobileClose}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Student section */}
          <div>
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-text-soft">
                Student
              </p>
            )}
            <div className="space-y-0.5">
              {studentNavItems.map((item) => (
                <NavItemComponent
                  key={item.href}
                  {...item}
                  collapsed={collapsed}
                  onClick={onMobileClose}
                />
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Bottom section */}
      <div className="border-t border-border-subtle p-3 space-y-1">
        <NavItemComponent
          href="/dashboard/settings"
          icon={Settings}
          label="Settings"
          collapsed={collapsed}
          onClick={onMobileClose}
        />
        <div className={cn(
          "flex items-center gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer",
          collapsed && "justify-center"
        )}>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-[11px] font-bold text-white">
            A
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-navy-950 dark:text-text-primary truncate">
                Admin
              </p>
              <p className="text-[11px] text-gray-500 dark:text-text-soft truncate">
                admin@school.edu
              </p>
            </div>
          )}
        </div>
        <button
          className={cn(
            "flex items-center gap-3 rounded-xl p-3 transition-all duration-200 w-full text-gray-500 dark:text-text-muted hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/5",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex h-screen flex-col fixed left-0 top-0 z-40 transition-all duration-300",
          collapsed ? "w-[68px]" : "w-60"
        )}
      >
        <div className="absolute inset-0 glass rounded-none border-r border-border-subtle" />
        <div className="relative z-10 h-full">
          {sidebarContent}
        </div>
        {/* Toggle button */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-border-subtle bg-surface-dark dark:bg-navy-900 text-text-muted hover:text-text-primary transition-colors shadow-lg"
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </button>
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed left-0 top-0 z-50 h-screen w-72 glass rounded-none border-r border-border-subtle lg:hidden"
            >
              <button
                onClick={onMobileClose}
                className="absolute right-3 top-4 flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 dark:text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
              >
                <X className="h-4 w-4" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
