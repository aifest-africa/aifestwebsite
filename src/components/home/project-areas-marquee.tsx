"use client";

import { cn } from "@/lib/ui";

const projectAreas = [
    "Healthcare",
    "Education",
    "Climate Action",
    "Agriculture",
    "Blockchain",
    "Financial Inclusion",
    "Smart Cities",
    "Transportation",
    "Cybersecurity",
    "E-commerce",
    "Social Good",
    "Women in Tech",
    "Governance",
    "Energy",
    "Water Management",
    "Creative Arts",
    "Robotics",
    "IoT",
    "Language Models",
    "Local Languages",
    "FinTech",
    "HealthTech",
    "EduTech",
    "AgriTech",
    "Infrastructure",
    "Public Safety",
    "Biotechnology",
    "Mobile Money",
];

export function ProjectAreasMarquee({ className }: { className?: string }) {
    // Triple the list for a really long, seamless scroll
    const loop = [...projectAreas, ...projectAreas, ...projectAreas];

    return (
        <div className={cn("relative overflow-hidden pt-0 md:pt-4 pb-8 duration-300", className)}>
            {/* Subtle fade edges - using transparent to avoid white blocks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-linear-to-r from-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-linear-to-l from-transparent to-transparent" />
            <div className="flex w-max items-center gap-6 aifest-partner-marquee group pr-6" style={{ animationDuration: "80s" }}>
                {loop.map((area, idx) => (
                    <div
                        key={`${area}-${idx}`}
                        className="flex items-center gap-3 px-6 py-3 rounded-2xl whitespace-nowrap transition-colors bg-transparent border-0"
                    >
                        <span className="text-[#001F3F]/20 dark:text-white/20 font-bold select-none">#</span>
                        <span className="text-lg font-bold text-[#001F3F] dark:text-white tracking-tight">{area}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
