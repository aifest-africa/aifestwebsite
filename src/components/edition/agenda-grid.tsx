"use client";

import { motion } from "framer-motion";

export function AgendaGrid() {
    return (
        <section className="py-8 md:py-12 relative">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
                {/* Image-Match Layout - Now theme aware */}
                <div className="bg-white dark:bg-black/40 backdrop-blur-sm p-4 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-none">

                    {/* Header */}
                    <div className="flex gap-4 mb-6">
                        <div className="w-[80px] md:w-[120px] shrink-0" /> {/* Spacer for AM/PM column */}
                        <div className="flex-1">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[#4285F4]/10 dark:bg-[#4285F4]/20 border border-[#4285F4] rounded-xl p-4 text-center shadow-[0_4px_20px_rgba(66,133,244,0.1)] dark:shadow-[0_0_20px_rgba(66,133,244,0.2)]"
                            >
                                <div className="text-[#001F3F] dark:text-white font-bold text-xl md:text-2xl">
                                    Saturday, May 9
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* AM SECTION */}
                        <div className="flex gap-4 min-h-[400px]">
                            {/* AM Sidebar Marker */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="w-[80px] md:w-[120px] shrink-0 border-2 border-[#FF1493] rounded-xl flex items-center justify-center bg-[#FF1493]/5 dark:bg-[#FF1493]/10 shadow-[0_4px_15px_rgba(255,20,147,0.1)] dark:shadow-[0_0_15px_rgba(255,20,147,0.3)]"
                            >
                                <span className="text-[#FF1493] dark:text-white font-bold text-3xl md:text-5xl tracking-widest" style={{ fontFamily: "Blanka, sans-serif" }}>AM</span>
                            </motion.div>

                            {/* AM Events Grid */}
                            <div className="flex-1 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                                <EventBlock title="Registration & Welcome" time="8:00 - 9:00" color="cyan" />
                                <EventBlock title="Opening Ceremony" time="9:00 - 9:10" color="blue" />
                                <EventBlock title="Co-Organiser Welcome" time="9:10 - 9:20" color="blue" />

                                <EventBlock title="Google Keynote:\nAI Agents For Sustainable Dev't" time="9:20 - 9:35" color="yellow" featuredspan />

                                <EventBlock title="Student Hackers Panel" time="9:35 - 10:00" color="purple" />
                                <EventBlock title="Networking Break" time="10:00 - 10:30" color="green" />

                                <EventBlock title="Gold Partner\nInfo Session" time="10:30 - 10:50" color="yellow" />
                                <EventBlock title="Keynote: Agentic AI in Digital Transformation" time="10:50 - 11:10" color="yellow" />
                                <EventBlock title="MIICHub Session" time="11:10 - 11:30" color="green" />

                                <EventBlock title="Finalist Pitches\n(Top 10 Teams)" time="11:30 - 1:00" color="red" featuredspan fullwidth />
                            </div>
                        </div>

                        {/* PM SECTION */}
                        <div className="flex gap-4 min-h-[400px]">
                            {/* PM Sidebar Marker */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="w-[80px] md:w-[120px] shrink-0 border-2 border-[#4285F4] rounded-xl flex items-center justify-center bg-[#4285F4]/5 dark:bg-[#4285F4]/10 shadow-[0_4px_15px_rgba(66,133,244,0.1)] dark:shadow-[0_0_15px_rgba(66,133,244,0.3)]"
                            >
                                <span className="text-[#4285F4] dark:text-white font-bold text-3xl md:text-5xl tracking-widest" style={{ fontFamily: "Blanka, sans-serif" }}>PM</span>
                            </motion.div>

                            {/* PM Events Grid */}
                            <div className="flex-1 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                                {/* Lunch spans full width */}
                                <EventBlock title="Lunch Break" time="1:00 - 2:00" color="green" fullwidth />

                                <EventBlock title="Fireside Chat:\nGlobal Agentic AI Trends" time="2:00 - 2:20" color="purple" />
                                <EventBlock title="Mini AI Debate:\nAgentic AI Vs AI Agents" time="2:20 - 2:40" color="purple" />
                                <EventBlock title="Partners & Sponsors" time="2:40 - 3:05" color="yellow" />

                                <EventBlock title="Decentralized AI Agents\n& Future of Smart Contracts" time="3:05 - 3:20" color="purple" />
                                <EventBlock title="Awards Ceremony" time="3:20 - 4:00" color="red" featuredspan />

                                <EventBlock title="Closing Remarks\n& Group Photo" time="4:00 - 4:30" color="blue" />

                                <EventBlock title="Post-Event Networking" time="4:30 - 5:00" color="cyan" fullwidth />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function EventBlock({ title, time, color, featuredspan, fullwidth }: { title: string; time?: string; color: string; featuredspan?: boolean; fullwidth?: boolean }) {
    const colorConfigs = {
        yellow: {
            border: "border-[#FBBC04]",
            text: "text-[#B48400] dark:text-[#FBBC04]",
            bg: "bg-[#FBBC04]/10 dark:bg-black/60",
            shadow: "dark:shadow-[inset_0_0_10px_rgba(251,188,4,0.1)]"
        },
        blue: {
            border: "border-[#4285F4]",
            text: "text-[#1A73E8] dark:text-[#4285F4]",
            bg: "bg-[#4285F4]/10 dark:bg-black/60",
            shadow: "dark:shadow-[inset_0_0_10px_rgba(66,133,244,0.1)]"
        },
        green: {
            border: "border-[#34A853]",
            text: "text-[#1E8E3E] dark:text-[#34A853]",
            bg: "bg-[#34A853]/10 dark:bg-black/60",
            shadow: "dark:shadow-[inset_0_0_10px_rgba(52,168,83,0.1)]"
        },
        red: {
            border: "border-[#EA4335]",
            text: "text-[#D93025] dark:text-[#EA4335]",
            bg: "bg-[#EA4335]/10 dark:bg-black/60",
            shadow: "dark:shadow-[inset_0_0_10px_rgba(234,67,53,0.1)]"
        },
        cyan: {
            border: "border-[#00D9FF]",
            text: "text-[#008DA6] dark:text-[#00D9FF]",
            bg: "bg-[#00D9FF]/10 dark:bg-black/60",
            shadow: "dark:shadow-[inset_0_0_10px_rgba(0,217,255,0.1)]"
        },
        purple: {
            border: "border-[#C084FC]",
            text: "text-[#9333EA] dark:text-[#C084FC]",
            bg: "bg-[#C084FC]/10 dark:bg-black/60",
            shadow: "dark:shadow-[inset_0_0_10px_rgba(192,132,252,0.1)]"
        }
    };

    const config = colorConfigs[color as keyof typeof colorConfigs];

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`
                ${config.bg} border-2 ${config.border} rounded-xl p-4 flex flex-col justify-center items-center text-center transition-all relative group
                ${config.shadow}
                ${featuredspan ? "md:col-span-2 lg:col-span-2" : ""}
                ${fullwidth ? "md:col-span-2 lg:col-span-3" : ""}
                min-h-[100px]
                shadow-sm dark:shadow-none hover:bg-opacity-20 dark:hover:bg-opacity-100
            `}
        >
            {time && (
                <div className={`absolute top-2 left-3 text-[10px] md:text-xs font-mono font-bold bg-white dark:bg-black/50 px-2 py-0.5 rounded-full border border-slate-200 dark:border-white/20 ${config.text}`}>
                    {time}
                </div>
            )}
            <p className={`font-bold text-sm md:text-base whitespace-pre-line leading-tight mt-4 ${config.text}`}>
                {title}
            </p>
        </motion.div>
    );
}
