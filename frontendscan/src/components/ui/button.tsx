"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/20 hover:shadow-brand-600/30 active:scale-[0.98]",
  secondary:
    "glass text-navy-950 dark:text-text-primary hover:bg-black/5 dark:hover:bg-white/10 active:scale-[0.98]",
  ghost:
    "text-gray-500 dark:text-text-muted hover:text-navy-950 dark:hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.98]",
  outline:
    "border border-gray-200 dark:border-border-glass text-navy-950 dark:text-text-primary hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.98]",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
  xl: "h-14 px-10 text-base",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-surface-dark disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
