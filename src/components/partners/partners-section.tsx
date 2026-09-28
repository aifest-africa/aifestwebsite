"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Partner } from "@/lib/editions/types";

export interface PartnersSectionProps {
    partners: Partner[];
    title?: string;
    subtitle?: string;
}

export function PartnersSection({
    partners,
    title = "Our Partners & Sponsors",
    subtitle = "(Click logo to visit partner website)"
}: PartnersSectionProps) {
    if (!partners || partners.length === 0) return null;

    return (
        <section className="py-6 md:py-10 relative overflow-hidden">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-semibold text-[#001F3F] dark:text-white mb-2" style={{ fontFamily: "Blanka, sans-serif" }}>
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-xs text-[#001F3F]/50 dark:text-white/40 italic font-medium">
                            {subtitle}
                        </p>
                    )}
                </div>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {partners.map((partner, index) => {
                        // Check if this partner needs a neutral background
                        const needsBackground = partner.name === "MIIC Hub" ||
                            partner.name === "Ministry of ICT" ||
                            partner.name === "Cursor Community" ||
                            partner.name === "GDG on Campus";

                        // Ministry of ICT needs a darker background for white text visibility
                        const isDarkerBackground = partner.name === "Ministry of ICT";

                        const content = (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex flex-col items-center gap-2"
                            >
                                <div
                                    className={`relative h-16 md:h-20 w-36 md:w-48 flex items-center justify-center ${isDarkerBackground
                                        ? "bg-gray-700 dark:bg-gray-700 rounded-xl p-3"
                                        : needsBackground
                                            ? "bg-gray-100 dark:bg-gray-800 rounded-xl p-3"
                                            : ""
                                        }`}
                                >
                                    {partner.logo ? (
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 144px, 192px"
                                        />
                                    ) : (
                                        <span className="text-lg font-bold text-[#001F3F] dark:text-white/80 px-2 text-center">
                                            {partner.name}
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs md:text-sm font-semibold text-[#001F3F]/70 dark:text-white/70 text-center max-w-[12rem]">
                                    {partner.name}
                                </span>
                            </motion.div>
                        );

                        if (partner.href) {
                            return (
                                <Link
                                    key={`${partner.name}-${index}`}
                                    href={partner.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-90 transition-opacity"
                                >
                                    {content}
                                </Link>
                            );
                        }

                        return <div key={`${partner.name}-${index}`}>{content}</div>;
                    })}
                </div>
            </div>
        </section>
    );
}
