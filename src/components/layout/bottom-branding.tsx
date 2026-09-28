"use client";

import { cn } from "@/lib/ui";
import { motion } from "framer-motion";
import Link from "next/link";

export function BottomBranding({
    className
}: {
    className?: string;
}) {
    return (
        <div className={cn("py-2 bg-white border-t border-slate-100 dark:bg-[#000d1a] dark:border-white/10 transition-colors duration-300", className)}>
            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-4"
                >
                    <div className="flex justify-center flex-col items-center">
                        <h3
                            className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-wide text-[#001F3F] dark:text-white"
                            style={{ fontFamily: "Blanka, sans-serif" }}
                        >
                            AIFEST Uganda
                        </h3>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                        <span className="text-base sm:text-lg font-medium text-[#4285F4] dark:text-[#6ba1ff]">
                            Student-led
                        </span>
                        <span className="text-base sm:text-lg font-medium text-[#34A853] dark:text-[#6ccf8d]">
                            Community-driven
                        </span>
                    </div>

                    <div className="flex flex-nowrap justify-center gap-2 sm:gap-4 pt-0 overflow-x-auto no-scrollbar pb-1">
                        <Link
                            href="/past-editions"
                            className="inline-block px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-emerald-500 text-white font-bold transition-all hover:-translate-y-1 text-[10px] sm:text-sm whitespace-nowrap shrink-0"
                        >
                            Past Editions
                        </Link>
                        <Link
                            href="/get-involved"
                            className="inline-block px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-yellow-400 text-[#001F3F] font-bold transition-all hover:-translate-y-1 text-[10px] sm:text-sm whitespace-nowrap shrink-0"
                        >
                            Get Involved
                        </Link>
                        <Link
                            href="/get-involved#partnership"
                            className="inline-block px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-blue-500 text-white font-bold transition-all hover:-translate-y-1 text-[10px] sm:text-sm whitespace-nowrap shrink-0"
                        >
                            Partner With Us
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
