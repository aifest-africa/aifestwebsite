"use client";

import { motion } from "framer-motion";
import { Check, Crown, Star, Users } from "lucide-react";
import { cn } from "@/lib/ui";

const tiers = [
    {
        name: "KitKat",
        price: "500",
        currency: "USD",
        subtitle: "Starter Pack",
        description: "Entry level partnership",
        icon: Users,
        color: "text-[#EA4335]",
        btnLabel: "Get KitKat",
        benefits: [
            "Logo Placement",
            "1 social media shout-out",
            "Speaking slot (10 Mins)",
            "KitKat Robot Branding",
            "Booth Setup (2)",
        ]
    },
    {
        name: "Lollipop",
        price: "1,000",
        currency: "USD",
        subtitle: "Feature Pack",
        description: "Enhanced visibility",
        icon: Star,
        color: "text-[#E91E63]",
        btnLabel: "Get Lollipop",
        benefits: [
            "Speaking Slot (20 Mins)",
            "Event Shout-out (AIFest)",
            "3 social media shout-outs",
            "All KitKat Benefits",
            "Lollipop Branding",
        ]
    },
    {
        name: "Marshmallow",
        price: "2,000",
        currency: "USD",
        subtitle: "Exclusive Pack",
        description: "Maximum impact & reach",
        icon: Crown,
        color: "text-[#4285F4]",
        highlight: true,
        btnLabel: "Get Marshmallow",
        benefits: [
            "Marshmallow Robot Brand",
            "5+ Social media posts",
            "Host Info Session",
            "Gold Sponsor Brag Rights",
            "All Lollipop Benefits",
        ]
    }
];

export function PartnershipTiers() {
    return (
        <section id="partnership" className="py-24 relative overflow-hidden bg-white dark:bg-[#000d1a]">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-[#001F3F] dark:text-white mb-6"
                        style={{ fontFamily: "Blanka, sans-serif" }}
                    >
                        Partnership Opportunities
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 dark:text-slate-400"
                    >
                        Shape AIFEST 2027 with a partnership pack that matches your vision and impact.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "relative flex flex-col p-8 rounded-[2.5rem] transition-all duration-300",
                                tier.highlight
                                    ? "bg-white dark:bg-white/5 border-2 border-[#4285F4] scale-105 z-10"
                                    : "bg-slate-50 dark:bg-white/2 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                            )}
                        >
                            {tier.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 bg-[#4285F4] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                                    Exclusive
                                </div>
                            )}

                            <div className="mb-8 text-center">
                                <div className={cn("inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-white dark:bg-black/20 shadow-xl mb-6", tier.color)}>
                                    <tier.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#001F3F] dark:text-white mb-2">{tier.name}</h3>
                                <div className="flex flex-col gap-1 mb-4">
                                    <span className={cn("text-xs font-black uppercase tracking-widest", tier.color)}>
                                        {tier.subtitle}
                                    </span>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        {tier.description}
                                    </span>
                                </div>
                                <div className="flex items-baseline justify-center gap-1 mt-6">
                                    <span className="text-4xl font-black text-[#001F3F] dark:text-white">{tier.price}</span>
                                    <span className="text-sm font-bold text-slate-400">{tier.currency}</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-10 flex-1">
                                {tier.benefits.map((benefit) => (
                                    <div key={benefit} className="flex items-start gap-3 group">
                                        <div className={cn("mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center", tier.highlight ? "bg-[#4285F4]" : "bg-slate-300 dark:bg-slate-700")}>
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                            {benefit}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div
                                className={cn(
                                    "w-full h-12 rounded-2xl flex items-center justify-center px-3 text-[10px] sm:text-xs font-bold uppercase tracking-wide",
                                    tier.highlight
                                        ? "bg-[#4285F4] text-white"
                                        : "bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-[#001F3F] dark:text-white"
                                )}
                            >
                                {tier.btnLabel}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
