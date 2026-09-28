"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatsCounterProps {
    value: number;
    label?: string;
    icon?: React.ReactNode;
    suffix?: string;
    prefix?: string;
    variant?: "default" | "minimal" | "value-only";
}

export function StatsCounter({ value, label, icon, suffix = "", prefix = "", variant = "default" }: StatsCounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const end = value;
        const duration = 1500; // 1.5 seconds
        const increment = end / (duration / 16); // 60fps

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isInView, value]);

    if (variant === "value-only") {
        return (
            <span ref={ref} className="tabular-nums">
                {prefix}{count.toLocaleString()}{suffix}
            </span>
        );
    }

    if (variant === "minimal") {
        return (
            <div ref={ref} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-[#00D9FF] tabular-nums" style={{ fontFamily: "Blanka, sans-serif" }}>
                        {prefix}{count.toLocaleString()}{suffix}
                    </span>
                </div>
                {label && <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">{label}</span>}
            </div>
        );
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-white dark:from-[#001F3F] to-[#00D9FF]/5 dark:to-[#00D9FF]/10 border border-[#00D9FF]/20 dark:border-white/10 hover:border-[#00D9FF]/40 dark:hover:border-[#00D9FF] transition-all hover:shadow-lg"
        >
            <div className="text-[#00D9FF] mb-3">{icon}</div>
            <div className="text-3xl md:text-4xl font-bold text-[#001F3F] dark:text-white" style={{ fontFamily: "Blanka, sans-serif" }}>
                {prefix}{count.toLocaleString()}{suffix}
            </div>
            <div className="text-sm text-[#001F3F]/60 dark:text-white/60 mt-2 text-center">{label}</div>
        </motion.div>
    );
}
