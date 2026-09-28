import type React from "react";
import { cn } from "../cn";

export function Section({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("py-16 sm:py-24 lg:py-28", className)} {...props} />;
}

export function SectionTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl",
        className,
      )}
      {...props}
    />
  );
}

export function SectionKicker({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-pretty text-sm font-medium tracking-wide text-foreground/70",
        className,
      )}
      {...props}
    />
  );
}


