"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Medal } from "lucide-react";
import Image from "next/image";

interface WinnerCardProps {
    name: string;
    team: string;
    track: string;
    prize: number;
    project: string;
    placement?: number;
    image?: string;
}

export function WinnerCard({ name, team, track, prize, project, placement, image }: WinnerCardProps) {
    const placementIcons: Record<number, ReactNode> = {
        1: <Trophy className="w-6 h-6 text-[#FBBC04]" />,
        2: <Medal className="w-6 h-6 text-slate-400" />,
        3: <Award className="w-6 h-6 text-[#CD7F32]" />,
    };

    const placementColors: Record<number, string> = {
        1: "border-[#FBBC04]/30 bg-[#FBBC04]/5 dark:bg-[#FBBC04]/10",
        2: "border-slate-400/30 bg-slate-100/50 dark:bg-white/5 dark:border-white/10",
        3: "border-[#CD7F32]/30 bg-[#CD7F32]/5 dark:bg-[#CD7F32]/10",
    };

    const cardStyle = (placement && placementColors[placement])
        || "border-[#00D9FF]/20 bg-white dark:bg-[#001F3F] dark:border-white/10";
    const icon = placement ? placementIcons[placement] : null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`relative rounded-2xl border-2 p-5 ${cardStyle} hover:shadow-xl transition-all group`}
        >
            {icon && (
                <div className="absolute -top-3 -right-3 bg-white dark:bg-[#000d1a] rounded-full p-2 shadow-lg border-2 border-current">
                    {icon}
                </div>
            )}

            <div className="flex items-start gap-4">
                {image && (
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-[#001F3F]/10 dark:bg-white/10 flex-shrink-0 relative">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover"
                            sizes="64px"
                        />
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-bold text-[#001F3F] dark:text-white truncate">{name}</h4>
                    <p className="text-sm text-[#001F3F]/60 dark:text-white/60 truncate">{team}</p>

                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[#00D9FF] text-xs font-medium">
                            {track}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#001F3F]/10 dark:bg-white/10 text-[#001F3F] dark:text-white text-xs font-bold">
                            UGX {prize.toLocaleString()}
                        </span>
                    </div>

                    <p className="mt-3 text-sm text-[#001F3F]/70 dark:text-white/70 line-clamp-2 group-hover:line-clamp-none transition-all">
                        {project}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
