"use client";

import { TeamMemberCard } from "./team-member-card";
import type { TeamMember } from "../../lib/editions/types";

interface TeamGridProps {
    members: TeamMember[];
    onMemberClick: (member: TeamMember) => void;
}

export function TeamGrid({ members, onMemberClick }: TeamGridProps) {
    if (members.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="w-24 h-24 rounded-full bg-[#00D9FF]/10 flex items-center justify-center mb-6">
                    <svg
                        className="w-12 h-12 text-[#00D9FF]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#001F3F] dark:text-white mb-2" style={{ fontFamily: "var(--font-blanka)" }}>
                    No Team Members Found
                </h3>
                <p className="text-[#001F3F]/60 dark:text-white/60 text-center max-w-md">
                    Team profiles for this edition are coming soon. Check back later!
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {members.map((member, index) => (
                <TeamMemberCard
                    key={member.id}
                    member={member}
                    index={index}
                    onClick={() => onMemberClick(member)}
                />
            ))}
        </div>
    );
}
