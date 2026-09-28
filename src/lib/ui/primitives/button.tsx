"use client";

import type React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "../cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "xs" | "sm" | "md";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#00D9FF] to-[#4285F4] text-[#001F3F] font-bold hover:from-[#00BFDD] hover:to-[#3367D6] shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 border-2 border-[#001F3F]/10",
  secondary:
    "bg-white text-[#001F3F] hover:bg-[#00D9FF]/10 border-2 border-[#001F3F]/20 hover:border-[#00D9FF] font-semibold",
  ghost:
    "bg-transparent text-[#001F3F] hover:bg-[#00D9FF]/10 font-semibold",
};

export const buttonSizes: Record<ButtonSize, string> = {
  xs: "h-8 px-3 text-xs",
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-6 text-sm",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onDragCapture' | 'onDragEndCapture' | 'onDragStartCapture' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onAnimationStartCapture' | 'onAnimationEndCapture' | 'onAnimationIterationCapture'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full font-medium aifest-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 disabled:opacity-50 disabled:cursor-not-allowed",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </motion.button>
  );
}

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  href,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full font-medium aifest-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 hover:scale-[1.02] active:scale-[0.98]",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
    </Link>
  );
}


