"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { publicMediaUrl } from "../../lib/content";
import type { TeamMember } from "../../lib/editions/types";

interface TeamMemberCardProps {
    member: TeamMember;
    index: number;
    onClick?: () => void;
}

export function TeamMemberCard({ member, index, onClick }: TeamMemberCardProps) {
    const imageUrl = member.image_path ? publicMediaUrl(member.image_path) : null;

    // Show details for all members, not just speakers
    const hasDetails = member.bio || member.linkedin || member.twitter || member.github || member.portfolio || member.email;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={onClick}
            className="group relative bg-white dark:bg-[#001224] rounded-2xl overflow-hidden border-2 border-[#00D9FF]/20 hover:border-[#00D9FF] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
        >
            {/* Image Container - Vertical Portrait */}
            <div className="relative w-full aspect-3/4 bg-linear-to-br from-[#00D9FF]/10 to-[#001F3F]/10 overflow-hidden">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={member.name}
                        fill
                        quality={95}
                        priority={index < 6}
                        className="object-cover object-[center_30%] md:object-center transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-[#00D9FF]/20 flex items-center justify-center">
                            <span className="text-4xl font-bold text-[#00D9FF]" style={{ fontFamily: "var(--font-blanka)" }}>
                                {member.name.charAt(0)}
                            </span>
                        </div>
                    </div>
                )}

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-linear-to-t from-[#001F3F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-2 space-y-1">
                <h3 className="text-sm font-bold text-[#001F3F] dark:text-white leading-tight truncate" style={{ fontFamily: "var(--font-blanka)" }}>
                    {member.name}
                </h3>
                <p className="text-[10px] font-bold text-[#00D9FF] truncate">
                    {member.role}
                </p>
                <p className="text-[10px] leading-tight text-[#001F3F]/70 dark:text-white/70 line-clamp-2">
                    {member.bio}
                </p>
            </div>

            {/* Click Indicator - Show only on hover */}
            {hasDetails && (
                <div className="absolute top-4 right-4 bg-[#00D9FF] text-white text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                    View Details
                </div>
            )}
        </motion.div>
    );
}
