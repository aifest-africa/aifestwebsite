"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/ui";

export function HeroSlideshowBackground({
  imageUrls,
  intervalMs = 1500,
  transitionDurationMs = 900,
  className,
  imgClassName,
}: {
  imageUrls: string[];
  intervalMs?: number;
  transitionDurationMs?: number;
  className?: string;
  imgClassName?: string;
}) {
  const reduceMotion = useReducedMotion();
  const urls = useMemo(() => imageUrls.filter(Boolean), [imageUrls]);
  const [current, setCurrent] = useState(0);
  const transitionDuration = transitionDurationMs / 1000;

  useEffect(() => {
    if (reduceMotion) return;
    if (urls.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % urls.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs, reduceMotion, urls.length]);

  if (!urls.length) return null;

  return (
    <motion.div
      initial={{ scale: 1.08 }}
      animate={{ scale: 1 }}
      transition={{ duration: transitionDuration, ease: [0.16, 1, 0.3, 1] }}
      className={cn("absolute inset-0", className)}
    >
      {urls.map((src, idx) => (
        <motion.div
          key={`${idx}:${src}`}
          className="absolute inset-0"
          animate={
            idx === (reduceMotion ? 0 : current)
              ? { opacity: 1, scale: 1, x: 0 }
              : { opacity: 0, scale: 1.03, x: -10 }
          }
          transition={{ duration: transitionDuration, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" className={cn("h-full w-full object-cover", imgClassName)} />
        </motion.div>
      ))}
    </motion.div>
  );
}

