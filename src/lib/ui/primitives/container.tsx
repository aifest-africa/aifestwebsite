import type React from "react";
import { cn } from "../cn";

export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12", className)}
      {...props}
    />
  );
}


