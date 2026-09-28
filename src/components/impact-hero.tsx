"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Trophy, Users, Lightbulb } from "lucide-react";
import { useEffect } from "react";

interface ImpactHeroProps {
    totalPrizeMoney: number;
    totalParticipants: number;
    totalProjects: number;
}

function AnimatedNumber({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, value, {
            duration: 2,
            ease: "easeOut",
        });
        return controls.stop;
    }, [count, value]);

    return (
        <motion.span>
            {prefix}
            <motion.span>{rounded}</motion.span>
            {suffix}
        </motion.span>
    );
}

export function ImpactHero({ totalPrizeMoney, totalParticipants, totalProjects }: ImpactHeroProps) {
    return (
        <section className="relative bg-slate-50 dark:bg-transparent text-[#001F3F] dark:text-white pt-40 pb-24 px-4 overflow-hidden transition-colors duration-500">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00D9FF]/10 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,white,transparent)] dark:bg-[linear-gradient(to_bottom,#000d1a,transparent)]"></div>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-[#001F3F]/10 dark:border-white/10 bg-white dark:bg-white/10 shadow-sm text-[#001F3F] dark:text-white text-sm font-bold tracking-widest uppercase mb-6">
                        Legacy of Innovation
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#001F3F] dark:text-white" style={{ fontFamily: "Blanka, sans-serif" }}>
                        Impact Through The Years
                    </h1>
                    <p className="text-xl md:text-2xl text-[#001F3F]/70 dark:text-white/70 max-w-3xl mx-auto mb-16 leading-relaxed">
                        Celebrating the milestones, the innovators, and the solutions that are shaping the future of AI in Africa.
                    </p>
                </motion.div>

                {/* Aggregate Stats */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Prize Money */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="p-8 rounded-3xl bg-white dark:bg-[#001F3F] border border-[#001F3F]/10 dark:border-white/10 shadow-lg"
                    >
                        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#FBBC04]/20 flex items-center justify-center text-[#FBBC04]">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div className="text-3xl md:text-4xl font-bold text-[#001F3F] dark:text-white mb-2" style={{ fontFamily: "Blanka, sans-serif" }}>
                            <AnimatedNumber value={totalPrizeMoney / 1000000} prefix="UGX " suffix="M+" />
                        </div>
                        <div className="text-[#001F3F]/60 dark:text-white/60 font-medium">Awarded in Prizes</div>
                    </motion.div>

                    {/* Participants */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="p-8 rounded-3xl bg-white dark:bg-[#001F3F] border border-[#001F3F]/10 dark:border-white/10 shadow-lg"
                    >
                        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#00D9FF]/20 flex items-center justify-center text-[#00D9FF]">
                            <Users className="w-6 h-6" />
                        </div>
                        <div className="text-3xl md:text-4xl font-bold text-[#001F3F] dark:text-white mb-2" style={{ fontFamily: "Blanka, sans-serif" }}>
                            <AnimatedNumber value={totalParticipants} suffix="+" />
                        </div>
                        <div className="text-[#001F3F]/60 dark:text-white/60 font-medium">Innovators Empowered</div>
                    </motion.div>

                    {/* Projects */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="p-8 rounded-3xl bg-white dark:bg-[#001F3F] border border-[#001F3F]/10 dark:border-white/10 shadow-lg"
                    >
                        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                            <Lightbulb className="w-6 h-6" />
                        </div>
                        <div className="text-3xl md:text-4xl font-bold text-[#001F3F] dark:text-white mb-2" style={{ fontFamily: "Blanka, sans-serif" }}>
                            <AnimatedNumber value={totalProjects} suffix="+" />
                        </div>
                        <div className="text-[#001F3F]/60 dark:text-white/60 font-medium">Solutions Created</div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
