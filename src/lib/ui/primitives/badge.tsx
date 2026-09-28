import type React from "react";
import { cn } from "../cn";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border-2 border-[#001F3F]/20 bg-gradient-to-r from-[#00D9FF] to-[#4285F4] px-3 py-1 text-xs font-bold text-[#001F3F] shadow-md shadow-cyan-500/20 uppercase tracking-wide",
        className,
      )}
      {...props}
    />
  );
}


