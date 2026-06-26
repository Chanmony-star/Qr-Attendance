import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: "default" | "outline" | "success";
}

export function Badge({ children, className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variant === "default" &&
          "bg-brand-600/10 text-brand-600 dark:text-brand-400 border border-brand-600/20",
        variant === "outline" &&
          "border border-gray-200 dark:border-border-glass text-gray-500 dark:text-text-muted",
        variant === "success" &&
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
