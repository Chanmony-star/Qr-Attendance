import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: boolean;
}

export function GlassCard({ children, className, glow = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300",
        glow && "hover:shadow-lg hover:shadow-brand-600/5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function GlassCardLight({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-light rounded-2xl p-6 transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
