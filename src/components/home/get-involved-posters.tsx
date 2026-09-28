"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/ui";
import Image from "next/image";

export function GetInvolvedPosters() {
    return (
        <section id="opportunities" className="py-20 md:py-28 bg-gray-50 dark:bg-black/20">
            <div className="mx-auto max-w-6xl space-y-16 px-6">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-semibold text-[#001F3F] dark:text-white mb-4" style={{ fontFamily: "Blanka, sans-serif" }}>
                        Opportunities
                    </h2>
                    <p className="text-[#001F3F]/70 dark:text-white/70 text-lg max-w-2xl">
                        Find the perfect role for you and join us in shaping the future of AI.
                    </p>
                </div>

                <div className="flex flex-col gap-16 md:gap-24">
                    {[
                        /* {
                            title: "Team Registration",
                            desc: "Form a team and build innovative AI solutions to solve real-world problems.",
                            label: "Register Now",
                            color: "from-blue-500 to-blue-700",
                            image: "/media/shared/posters/Team.png",
                            href: "https://tinyurl.com/aifestTeams"
                        },
                        {
                            title: "Call for Speakers",
                            desc: "Share your expertise and insights with the AI community. We're looking for visionary thinkers.",
                            label: "Apply to Speak",
                            color: "from-[#00D9FF] to-[#00A3C2]",
                            image: "/media/shared/posters/speakers.png",
                            href: "https://tinyurl.com/aifestSpeakers"
                        }, */
                        {
                            title: "Call for Partners",
                            desc: "Partner with us to support the growth of AI in Africa and gain visibility.",
                            label: "Partner with Us",
                            color: "from-purple-500 to-purple-700",
                            image: "/media/shared/posters/partners.png",
                            href: "https://tinyurl.com/aifestPartners"
                        },
                        {
                            title: "Call for Exhibitors",
                            desc: "Showcase your AI products and services to a diverse audience of tech enthusiasts.",
                            label: "Book a Booth",
                            color: "from-pink-500 to-pink-700",
                            image: "/media/shared/posters/exhibitors.png",
                            href: "https://tinyurl.com/aifestExhibitors"
                        },
                        /* {
                            title: "University Ambassadors",
                            desc: "Lead the AI movement at your campus. Gain leadership skills and exclusive benefits.",
                            label: "Become an Ambassador",
                            color: "from-[#FBBC04] to-[#E5AC00]",
                            image: "/media/shared/posters/ambassadors.png",
                            href: "https://tinyurl.com/aifestAmbassadors"
                        } */
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={cn(
                                "flex flex-col md:flex-row items-center gap-8 md:gap-16",
                                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                            )}
                        >
                            {/* Poster Visual */}
                            <motion.div
                                whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
                                className={cn(
                                    "relative w-full md:w-1/2 aspect-video md:aspect-4/3 rounded-3xl overflow-hidden shadow-2xl bg-linear-to-br",
                                    item.color
                                )}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </motion.div>

                            {/* Content */}
                            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                                <h3 className="text-3xl md:text-4xl font-bold text-[#001F3F] dark:text-white leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {item.desc}
                                </p>
                                <div className="pt-4">
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative inline-flex px-8 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full overflow-hidden transition-all hover:border-[#00D9FF]"
                                    >
                                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#00D9FF]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                        <span className="relative z-10 font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 text-[#001F3F] dark:text-white">
                                            {item.label}
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
