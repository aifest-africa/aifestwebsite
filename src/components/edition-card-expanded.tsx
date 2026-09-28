"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Users, GraduationCap, Lightbulb, Globe, Download, ExternalLink, CheckCircle2, Trophy } from "lucide-react";
import { StatsCounter } from "./stats-counter";
import { WinnerCard } from "./winner-card";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { EditionData } from "@/lib/editions/types";

export function EditionCardExpanded({ edition }: { edition: EditionData }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const hasStats = edition.statistics && Object.keys(edition.statistics).length > 0;
    const hasWinners = edition.winners && edition.winners.length > 0;
    const hasReportHighlights = edition.reportHighlights && edition.reportHighlights.length > 0;
    const hasPartners = edition.partners && edition.partners.length > 0;
    const prizePool = edition.statistics?.prizePool;
    const reportUrl = edition.impactReportUrl;
    const editionHref = `/${edition.slug}`;

    const resourceLinks = [
        reportUrl ? { label: "Impact Report", url: reportUrl } : null,
        edition.sponsorshipDeckUrl
            ? { label: edition.sponsorshipDeckLabel ?? "Sponsorship Deck", url: edition.sponsorshipDeckUrl }
            : null,
        edition.infoSessionDeckUrl
            ? { label: edition.infoSessionDeckLabel ?? "Info Slides", url: edition.infoSessionDeckUrl }
            : null,
        edition.collegeEndorsementUrl ? { label: "College Endorsement", url: edition.collegeEndorsementUrl } : null,
        edition.agendaUrl ? { label: "Agenda", url: edition.agendaUrl } : null,
        edition.photoGalleryUrl ? { label: "Official Photos", url: edition.photoGalleryUrl } : null,
        edition.rawPhotosUrl ? { label: "Raw Photos", url: edition.rawPhotosUrl } : null,
    ].filter(Boolean) as { label: string; url: string }[];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
        >
            {/* Preview Card */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-left rounded-3xl border-2 border-[#00D9FF]/20 dark:border-white/10 bg-white dark:bg-[#001F3F] p-6 md:p-8 hover:border-[#00D9FF]/40 dark:hover:border-[#00D9FF] transition-all hover:shadow-xl group"
            >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1 min-w-0 space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="px-4 py-1.5 rounded-full bg-[#001F3F] dark:bg-white/10 text-white text-sm font-bold shadow-md">
                                {edition.year}
                            </span>
                            {prizePool ? (
                                <span className="px-4 py-1.5 rounded-full bg-[#FBBC04] text-[#001F3F] text-sm font-bold shadow-md flex items-center gap-2">
                                    <Trophy className="w-3.5 h-3.5" />
                                    UGX {prizePool.toLocaleString()} Awarded
                                </span>
                            ) : null}
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-[#001F3F] dark:text-white mb-2 leading-tight" style={{ fontFamily: "Blanka, sans-serif" }}>
                                {edition.title}
                            </h3>
                            <p className="text-base text-[#001F3F]/70 dark:text-white/70 line-clamp-2 max-w-2xl">{edition.summary}</p>
                        </div>

                        {/* Mini Stats Grid on Preview */}
                        {hasStats && (
                            <div className="flex flex-wrap gap-4 md:gap-8 pt-2">
                                {edition.statistics?.participants && (
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-full bg-[#00D9FF]/10 text-[#00D9FF]">
                                            <Users className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-[#001F3F] dark:text-white">{edition.statistics.participants}</div>
                                            <div className="text-xs text-[#001F3F]/60 dark:text-white/60">Participants</div>
                                        </div>
                                    </div>
                                )}
                                {(edition.statistics?.universities || edition.participatingUniversities?.length) && (
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-full bg-[#00D9FF]/10 text-[#00D9FF]">
                                            <GraduationCap className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-[#001F3F] dark:text-white">
                                                {edition.statistics?.universities || edition.participatingUniversities?.length || 0}
                                            </div>
                                            <div className="text-xs text-[#001F3F]/60 dark:text-white/60">Institutions</div>
                                        </div>
                                    </div>
                                )}
                                {edition.statistics?.projects && (
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-full bg-[#00D9FF]/10 text-[#00D9FF]">
                                            <Lightbulb className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-[#001F3F] dark:text-white">{edition.statistics.projects}</div>
                                            <div className="text-xs text-[#001F3F]/60 dark:text-white/60">Projects</div>
                                        </div>
                                    </div>
                                )}
                                {(edition.partners?.length || edition.statistics?.partners) && (
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-full bg-[#00D9FF]/10 text-[#00D9FF]">
                                            <Globe className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-[#001F3F] dark:text-white">
                                                {edition.partners?.length || edition.statistics?.partners || 0}
                                            </div>
                                            <div className="text-xs text-[#001F3F]/60 dark:text-white/60">Partners</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-[#00D9FF] flex-shrink-0 self-center md:self-start md:mt-2"
                    >
                        <ChevronDown className="w-8 h-8" />
                    </motion.div>
                </div>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pt-6 space-y-10 px-2">
                            {hasStats && (
                                <div>
                                    <h3 className="text-2xl font-bold text-[#001F3F] dark:text-white mb-6 flex items-center gap-2" style={{ fontFamily: "Blanka, sans-serif" }}>
                                        <Globe className="w-6 h-6 text-[#00D9FF]" /> Impact Statistics
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {edition.statistics!.participants && (
                                            <StatsCounter
                                                value={edition.statistics!.participants}
                                                label="Participants"
                                                icon={<Users className="w-8 h-8" />}
                                            />
                                        )}
                                        {edition.statistics!.universities && (
                                            <StatsCounter
                                                value={edition.statistics!.universities}
                                                label={edition.year === 2026 ? "Institutions" : "Universities"}
                                                icon={<GraduationCap className="w-8 h-8" />}
                                            />
                                        )}
                                        {edition.year === 2026 && (
                                            <StatsCounter
                                                value={210}
                                                label="D-Day Attendees"
                                                icon={<Users className="w-8 h-8" />}
                                            />
                                        )}
                                        {edition.year === 2026 && (
                                            <StatsCounter
                                                value={105}
                                                label="Female Participants"
                                                icon={<Users className="w-8 h-8" />}
                                            />
                                        )}
                                        {edition.statistics!.projects && (
                                            <StatsCounter
                                                value={edition.statistics!.projects}
                                                label="Projects"
                                                icon={<Lightbulb className="w-8 h-8" />}
                                            />
                                        )}
                                        {edition.statistics!.countries && (
                                            <StatsCounter
                                                value={edition.statistics!.countries}
                                                label="Countries"
                                                icon={<Globe className="w-8 h-8" />}
                                            />
                                        )}
                                    </div>
                                    {edition.participatingUniversities && edition.participatingUniversities.length > 0 && (
                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {edition.participatingUniversities.map((university) => (
                                                <span
                                                    key={university}
                                                    className="px-3 py-1.5 rounded-full border border-[#00D9FF]/20 dark:border-white/10 bg-[#00D9FF]/5 dark:bg-white/5 text-[#001F3F] dark:text-white text-xs font-semibold"
                                                >
                                                    {university}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {hasWinners && (
                                <div>
                                    <h3 className="text-2xl font-bold text-[#001F3F] dark:text-white mb-6 flex items-center gap-2" style={{ fontFamily: "Blanka, sans-serif" }}>
                                        <Trophy className="w-6 h-6 text-[#FBBC04]" /> Top Winners
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {edition.winners!.map((winner, idx) => (
                                            <WinnerCard
                                                key={`${winner.name}-${idx}`}
                                                name={winner.name}
                                                team={winner.team ?? ""}
                                                track={winner.track}
                                                prize={winner.prize ?? 0}
                                                project={winner.project}
                                                placement={winner.placement}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {hasPartners && (
                                <div>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                                        <h3 className="text-2xl font-bold text-[#001F3F] dark:text-white flex items-center gap-2" style={{ fontFamily: "Blanka, sans-serif" }}>
                                            <Users className="w-6 h-6 text-[#00D9FF]" /> Our Partners
                                        </h3>
                                        <p className="text-xs text-[#001F3F]/50 dark:text-white/40 italic font-medium">
                                            (Click logo to visit partner website)
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-6 md:gap-8 bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/10">
                                        {edition.partners!.map((partner, idx) => {
                                            const content = (
                                                <div className="flex flex-col items-center gap-2 transition-all duration-300">
                                                    <div
                                                        className={`relative h-14 w-36 flex items-center justify-center rounded-xl ${partner.name === "AmaliTech"
                                                            ? "bg-[#FF6B00] px-3 py-2 shadow-sm"
                                                            : partner.name === "GDG on Campus"
                                                                ? "bg-white dark:bg-white px-2 py-1"
                                                                : ""
                                                            }`}
                                                    >
                                                        {partner.logo ? (
                                                            <Image
                                                                src={partner.logo}
                                                                alt={partner.name}
                                                                fill
                                                                className={`object-contain ${partner.name === "AmaliTech" ? "brightness-0 invert" : ""}`}
                                                                sizes="144px"
                                                            />
                                                        ) : (
                                                            <span className="text-[#001F3F] font-semibold text-sm">{partner.name}</span>
                                                        )}
                                                    </div>
                                                    <span className="text-xs font-semibold text-[#001F3F]/70 dark:text-white/70 text-center">
                                                        {partner.name}
                                                    </span>
                                                </div>
                                            );

                                            if (partner.href) {
                                                return (
                                                    <a
                                                        key={`${partner.name}-${idx}`}
                                                        href={partner.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:scale-105 transition-transform"
                                                    >
                                                        {content}
                                                    </a>
                                                );
                                            }

                                            return <div key={`${partner.name}-${idx}`}>{content}</div>;
                                        })}
                                    </div>
                                </div>
                            )}

                            {hasReportHighlights && (
                                <div className="bg-[#00D9FF]/5 dark:bg-[#00D9FF]/10 rounded-3xl p-8 border border-[#00D9FF]/20 dark:border-[#00D9FF]/30">
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-[#001F3F] dark:text-white mb-6 flex items-center gap-2" style={{ fontFamily: "Blanka, sans-serif" }}>
                                                <CheckCircle2 className="w-6 h-6 text-[#00D9FF]" /> Key Achievements
                                            </h3>
                                            <div className="grid gap-4">
                                                {edition.reportHighlights!.map((highlight, idx) => (
                                                    <div key={idx} className="flex items-start gap-3">
                                                        <div className="p-1 rounded-full bg-[#00D9FF]/20 mt-0.5">
                                                            <CheckCircle2 className="w-4 h-4 text-[#00D9FF]" />
                                                        </div>
                                                        <p className="text-base text-[#001F3F]/80 dark:text-white/80 font-medium">{highlight}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-center items-center md:items-start md:border-l border-[#00D9FF]/20 md:pl-8 gap-3">
                                            {reportUrl && (
                                                <a
                                                    href={reportUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#001F3F] dark:bg-white text-white dark:text-[#001F3F] font-bold hover:bg-[#001F3F]/90 dark:hover:bg-white/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                                >
                                                    <Download className="w-5 h-5" />
                                                    Download Impact Report
                                                </a>
                                            )}
                                            <Link
                                                href={editionHref}
                                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#001F3F]/20 dark:border-white/20 text-[#001F3F] dark:text-white font-bold hover:bg-[#001F3F]/5 dark:hover:bg-white/10 transition-all"
                                            >
                                                Full edition page
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                            <p className="mt-2 text-sm text-[#001F3F]/60 dark:text-white/60 text-center md:text-left max-w-xs">
                                                Get the full detailed report including all statistics, financial breakdown, and participant stories.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-8">
                                {edition.themes && edition.themes.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-bold text-[#001F3F] dark:text-white mb-4">Focus Themes</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {edition.themes.map((theme) => (
                                                <span
                                                    key={theme}
                                                    className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-[#001F3F] dark:text-white text-sm font-medium"
                                                >
                                                    {theme}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {resourceLinks.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-bold text-[#001F3F] dark:text-white mb-4">Media & Resources</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {resourceLinks.map((resource) => (
                                                <a
                                                    key={resource.url}
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#001F3F]/20 dark:border-white/20 text-[#001F3F] dark:text-white text-sm font-medium hover:bg-[#001F3F]/5 dark:hover:bg-white/10 transition-colors"
                                                >
                                                    {resource.label}
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
