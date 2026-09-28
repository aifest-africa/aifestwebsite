"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/ui";

export type TimelineItem = {
    year: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
};

export function Timeline({ items, className }: { items: TimelineItem[]; className?: string }) {
    return (
        <div className={cn("relative py-12", className)}>
            {/* Decorative vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00D9FF]/0 via-[#00D9FF]/20 to-[#00D9FF]/0 md:left-1/2 md:-ml-0.5" />

            <div className="space-y-12">
                {items.map((item, idx) => (
                    <TimelineEntry key={idx} item={item} index={idx} />
                ))}
            </div>
        </div>
    );
}

function TimelineEntry({ item, index }: { item: TimelineItem; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <div className="relative flex flex-col items-start md:flex-row md:items-center">
            {/* Line item circle */}
            <div className="absolute left-4 top-2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-[#00D9FF] shadow-lg md:left-1/2">
                <div className="h-2 w-2 rounded-full bg-white animate-ping" />
            </div>

            <div className={cn(
                "ml-12 w-full md:ml-0 md:w-1/2",
                isEven ? "md:pr-16 md:text-right" : "md:order-last md:pl-16 md:text-left"
            )}>
                <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="aifest-playful-card rounded-3xl border border-[#001F3F]/10 bg-white p-6 shadow-xl shadow-blue-500/5 hover:border-[#00D9FF]/30 transition-all"
                >
                    <span className="inline-block rounded-full bg-[#00D9FF]/10 px-3 py-1 text-xs font-bold text-[#00D9FF] mb-2">
                        {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-[#001F3F] mb-2" style={{ fontFamily: "Blanka, sans-serif" }}>
                        {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#001F3F]/70">
                        {item.description}
                    </p>
                </motion.div>
            </div>

            {/* Spacing for the other side on desktop */}
            <div className="hidden md:block md:w-1/2" />
        </div>
    );
}
