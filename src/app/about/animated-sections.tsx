"use client";

import { motion } from "framer-motion";
import { MagneticCard } from "../../components/magnetic-card";
import { cn } from "@/lib/ui";

interface PillarBoxProps {
    objectives: Array<{
        title: string;
        description: string;
        icon: React.ReactNode;
        bgClass: string;
    }>;
}

export function AnimatedPillars({ objectives }: PillarBoxProps) {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4">
            {objectives.map((obj, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", stiffness: 100 }}
                >
                    <MagneticCard className="h-full">
                        <div className={cn("h-full rounded-3xl p-6 border-0 shadow-lg transition-all group", obj.bgClass)}>
                            <div className="mb-4 p-1 w-fit group-hover:scale-110 transition-transform">
                                {obj.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{obj.title}</h3>
                            <p className="text-sm leading-relaxed text-white/90">{obj.description}</p>
                        </div>
                    </MagneticCard>
                </motion.div>
            ))}
        </div>
    );
}

interface SDGBoxProps {
    sdgs: Array<{
        title: string;
        description: string;
        icon: React.ReactNode;
        bgClass: string;
    }>;
}

export function AnimatedSDGs({ sdgs }: SDGBoxProps) {
    return (
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {sdgs.map((sdg, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15, type: "spring", stiffness: 80 }}
                    className={cn("flex flex-col sm:flex-row gap-4 md:gap-6 p-5 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-white/10 shadow-sm transition-all group", sdg.bgClass)}
                >
                    <div className="p-1 shrink-0 h-fit">
                        {sdg.icon}
                    </div>
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-[#001F3F] dark:text-white mb-1 md:mb-2">{sdg.title}</h3>
                        <p className="text-sm md:text-base text-[#001F3F]/70 dark:text-white/70 leading-relaxed font-medium">{sdg.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
