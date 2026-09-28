"use client";

import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/lib/ui";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Plus, Minus, Trophy, GraduationCap } from "lucide-react";
import { FAQItem as FAQItemType, TimelineItem as TimelineItemType, GalleryImage, Partner as PartnerType, Venue as VenueType, Winner as WinnerType } from "../../lib/editions/types";
import { PDFPreview } from "./PDFPreview";
import { PartnersSection } from "../partners/partners-section";
import { WinnerCard } from "./winner-card";

interface HeroImageProps {
    image_path: string;
    sort_order?: number;
}

export interface EditionContentProps {
    heroTitle: string;
    heroSubtitle?: string;
    heroImage?: string;
    heroImages?: HeroImageProps[];
    gallery?: GalleryImage[];
    registrationImage?: string;
    registrationUrl?: string;
    prototypeSubmissionUrl?: string;
    sponsorshipDeckUrl?: string;
    sponsorshipDeckPreview?: string;
    sponsorshipDeckLabel?: string;
    sponsorshipDeckDescription?: string;
    infoSessionDeckUrl?: string;
    infoSessionDeckPreview?: string;
    infoSessionDeckLabel?: string;
    infoSessionDeckDescription?: string;
    impactReportUrl?: string;
    impactReportPreview?: string;
    timeline?: TimelineItemType[];
    faqs?: FAQItemType[];
    venue?: VenueType;
    lastYearReportUrl?: string;
    lastYearReportPreview?: string;
    lastYearReportYear?: string;
    agendaImage?: string;
    agendaUrl?: string;
    partners?: PartnerType[];
    winners?: WinnerType[];
    photoGalleryUrl?: string;
    rawPhotosUrl?: string;
    participatingUniversities?: string[];
    /** Year shown in the hero Edition Highlight overlay */
    editionYear?: number;
    /** Controls whether to show the Last Year's Report section. Defaults to true for backward compatibility. */
    showLastYearReport?: boolean;
}


function FAQComponent({ question, answer }: FAQItemType) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/10 last:border-0">
            <button
                className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">{question}</span>
                <span className={`p-1 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors ${isOpen ? "text-[#00D9FF]" : "text-white/50"}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-white/60 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function AgendaButton({ image, href = "/agenda" }: { image?: string; href?: string }) {
    return (
        <section className="py-6 md:py-8">
            <div className="mx-auto max-w-6xl px-6">
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative overflow-hidden rounded-xl shadow-xl p-8 border border-white/10 group min-h-[220px] flex flex-col justify-center"
                >
                    {/* Background Image */}
                    {image && (
                        <div className="absolute inset-0">
                            <Image
                                src={image}
                                alt="Agenda background"
                                fill
                                className="object-cover opacity-70 group-hover:opacity-85 transition-opacity duration-300"
                            />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-br from-[#001F3F]/90 via-[#001F3F]/70 to-[#00D9FF]/30" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="max-w-xl">
                            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white" style={{ fontFamily: "Blanka, sans-serif" }}>
                                View Event Agenda
                            </h3>
                            <p className="text-white/80 text-base md:text-lg">
                                Check out the full schedule, sessions, and activities for this edition.
                            </p>
                        </div>
                        <Link
                            href={href}
                            className="inline-flex items-center px-8 py-3 rounded-full bg-white text-[#001F3F] font-bold hover:bg-white/90 transition-all shadow-lg hover:shadow-white/10 w-fit shrink-0"
                            aria-label="View event agenda"
                            {...(href.startsWith("http") || href.endsWith(".pdf")
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                        >
                            VIEW AGENDA
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export function EditionContent({
    heroTitle,
    heroSubtitle,
    heroImage,
    heroImages = [],
    gallery = [],
    registrationImage,
    registrationUrl,
    sponsorshipDeckUrl,
    sponsorshipDeckPreview,
    sponsorshipDeckLabel = "Sponsorship Deck",
    sponsorshipDeckDescription = "Partner with us to shape the future.",
    infoSessionDeckUrl,
    infoSessionDeckPreview,
    infoSessionDeckLabel = "Info Session Deck",
    infoSessionDeckDescription = "Everything you need to get started.",
    impactReportUrl,
    impactReportPreview,
    timeline = [],
    faqs = [],
    venue,
    lastYearReportUrl,
    lastYearReportPreview,
    lastYearReportYear,
    agendaImage,
    agendaUrl,
    partners = [],
    winners = [],
    photoGalleryUrl,
    rawPhotosUrl,
    participatingUniversities = [],
    editionYear,
    showLastYearReport = true,
}: EditionContentProps) {
    const leftBigImage = registrationImage || gallery[0]?.image_path;
    const photosUrl = photoGalleryUrl || registrationUrl;

    const [viewDeck, setViewDeck] = useState<string | null>(null);

    // Determine which hero image(s) to display
    // Priority: heroImages array > single heroImage > no hero image
    const displayHeroImages = heroImages.length > 0
        ? heroImages.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        : heroImage
            ? [{ image_path: heroImage, sort_order: 0 }]
            : [];

    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

    // Auto-rotate hero images every 5 seconds if multiple images exist
    useEffect(() => {
        if (displayHeroImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentHeroIndex((prev) => (prev + 1) % displayHeroImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [displayHeroImages.length]);

    return (
        <div className="flex flex-col relative overflow-hidden bg-transparent transition-colors duration-500">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.01] dark:opacity-[0.02] -z-10" />

            {/* ---------------- HERO SECTION ---------------- */}
            <section className="pt-24 pb-4 md:pt-32 md:pb-6 bg-transparent relative">
                <div className="mx-auto max-w-6xl px-6 flex flex-col gap-8 md:gap-12">
                    {displayHeroImages.length > 0 && (
                        <div className="relative w-full aspect-video md:aspect-21/9 rounded-xl overflow-hidden shadow-2xl bg-linear-to-br from-[#001F3F] to-[#001F3F]/80 border-4 border-white dark:border-white/10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentHeroIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        className="object-cover object-top md:object-center transition-transform duration-500 hover:scale-[1.01]"
                                        src={displayHeroImages[currentHeroIndex].image_path}
                                        alt={heroTitle}
                                        fill
                                        priority
                                        sizes="(max-width: 768px) 100vw, 1200px"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            <div className="absolute inset-0 bg-linear-to-t from-[#001F3F]/85 via-[#001F3F]/25 to-transparent flex items-end p-6 md:p-10 pointer-events-none">
                                <div>
                                    <div className="text-[#00D9FF] font-bold text-sm mb-2 uppercase tracking-widest">
                                        Edition Highlight
                                    </div>
                                    <h2
                                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-white"
                                        style={{ fontFamily: "Blanka, sans-serif" }}
                                    >
                                        {editionYear ? `AIFEST ${editionYear}` : heroTitle}
                                    </h2>
                                </div>
                            </div>

                            {/* Image indicators for multiple hero images */}
                            {displayHeroImages.length > 1 && (
                                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex gap-2 z-10">
                                    {displayHeroImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentHeroIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-all ${index === currentHeroIndex
                                                ? "bg-white w-8"
                                                : "bg-white/50 hover:bg-white/75"
                                                }`}
                                            aria-label={`View hero image ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="grid gap-6 md:grid-cols-2 md:gap-12 items-start">
                        {!(displayHeroImages.length > 0) ? (
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-[#001F3F] dark:text-white uppercase leading-tight" style={{ fontFamily: "Blanka, sans-serif" }}>
                                {heroTitle}
                            </h1>
                        ) : (
                            <h1 className="sr-only">{heroTitle}</h1>
                        )}
                        <div className={`text-muted-foreground pt-1 md:pt-2 ${displayHeroImages.length > 0 ? "md:col-span-2 max-w-3xl" : ""}`}>
                            {heroSubtitle && (
                                <p className="text-lg md:text-xl leading-relaxed text-[#001F3F]/90 dark:text-white/90 font-medium">
                                    {heroSubtitle}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>


            {/* ---------------- GALLERY & DECKS SECTION ---------------- */}
            <section className="py-12 md:py-16 relative">
                <div className="mx-auto max-w-6xl space-y-16 px-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* LEFT/MAIN ACTION CARD */}
                        <div className="md:flex-1 relative min-h-[400px] rounded-xl overflow-hidden group shadow-lg border border-slate-200 dark:border-white/10">
                            <motion.div className="w-full h-full">
                                {leftBigImage ? (
                                    <Image
                                        src={leftBigImage}
                                        alt="Main Feature"
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                        <span className="text-slate-400">Preview Image</span>
                                    </div>
                                )}
                                <div className="absolute bottom-0 p-8 z-10 w-full bg-linear-to-t from-black/90 via-black/60 to-transparent">
                                    <h3 className="text-2xl font-bold mb-2 text-white">Official Photos</h3>
                                    <p className="text-base text-gray-200 mb-4">
                                        Browse moments from this edition in the official photo gallery.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        {photosUrl && (
                                            <ButtonLink
                                                href={photosUrl}
                                                variant="primary"
                                                className="px-6 py-2 text-sm font-bold bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-[#001F3F] border-0 transition-colors"
                                                target="_blank"
                                            >
                                                OFFICIAL PHOTOS
                                            </ButtonLink>
                                        )}
                                        {rawPhotosUrl && (
                                            <ButtonLink
                                                href={rawPhotosUrl}
                                                variant="primary"
                                                className="px-6 py-2 text-sm font-bold bg-white/15 hover:bg-white/25 text-white border border-white/30 transition-colors"
                                                target="_blank"
                                            >
                                                RAW PICS
                                            </ButtonLink>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT DECKS */}
                        <div className="flex flex-col gap-6 md:flex-1">
                            {/* Sponsorship Deck */}
                            {sponsorshipDeckUrl && (
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="relative overflow-hidden rounded-xl shadow-xl flex-1 min-h-[250px] border border-white/10 group"
                                >
                                    {/* Preview Image Background */}
                                    <div className="absolute inset-0">
                                        {sponsorshipDeckPreview && (
                                            <Image
                                                src={sponsorshipDeckPreview}
                                                alt="Sponsorship Deck Preview"
                                                fill
                                                className="object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-linear-to-br from-[#001F3F]/90 via-[#001F3F]/75 to-[#00D9FF]/40" />
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                                        <h3 className="text-xl font-bold mb-2 text-white">{sponsorshipDeckLabel}</h3>
                                        <p className="text-sm text-gray-200 mb-4">{sponsorshipDeckDescription}</p>
                                        <div className="flex gap-3">
                                            <button onClick={() => setViewDeck(sponsorshipDeckUrl)} className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold transition-all text-white">VIEW</button>
                                            <a href={sponsorshipDeckUrl} download className="px-4 py-2 rounded-full bg-[#00D9FF] text-white text-xs font-bold transition-all hover:bg-[#00D9FF]/90">DOWNLOAD</a>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Info Session Deck */}
                            {infoSessionDeckUrl && (
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="relative overflow-hidden rounded-xl shadow-xl flex-1 min-h-[250px] border border-white/10 group"
                                >
                                    {/* Preview Image Background */}
                                    <div className="absolute inset-0">
                                        {infoSessionDeckPreview && (
                                            <Image
                                                src={infoSessionDeckPreview}
                                                alt="Info Session Deck Preview"
                                                fill
                                                className="object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
                                            />
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-linear-to-br from-[#001F3F]/90 via-[#001F3F]/75 to-[#00D9FF]/40" />
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                                        <h3 className="text-xl font-bold mb-2 text-white">{infoSessionDeckLabel}</h3>
                                        <p className="text-sm text-gray-200 mb-4">{infoSessionDeckDescription}</p>
                                        <div className="flex gap-3">
                                            <button onClick={() => setViewDeck(infoSessionDeckUrl)} className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold transition-all text-white">VIEW</button>
                                            <a href={infoSessionDeckUrl} download className="px-4 py-2 rounded-full bg-[#00D9FF] text-white text-xs font-bold transition-all hover:bg-[#00D9FF]/90">DOWNLOAD</a>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------------- AGENDA BUTTON SECTION ---------------- */}
            {(agendaImage || agendaUrl) && (
                <AgendaButton image={agendaImage} href={agendaUrl || "/agenda"} />
            )}

            {/* ---------------- UNIVERSITIES SECTION ---------------- */}
            {participatingUniversities.length > 0 && (
                <section className="py-12 md:py-16 relative">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-semibold text-[#001F3F] dark:text-white mb-3 inline-flex items-center gap-3 justify-center" style={{ fontFamily: "Blanka, sans-serif" }}>
                                <GraduationCap className="w-7 h-7 text-[#00D9FF]" />
                                {editionYear === 2026 ? "Institutions" : "Universities"}
                            </h2>
                            <p className="text-[#001F3F]/70 dark:text-white/70 max-w-2xl mx-auto">
                                {editionYear === 2026
                                    ? "37 institutions across Uganda and beyond took part in Phase 1."
                                    : "Institutions that took part in this edition."}
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                            {participatingUniversities.map((university) => (
                                <span
                                    key={university}
                                    className="px-4 py-2.5 rounded-full border border-[#00D9FF]/25 dark:border-white/15 bg-[#00D9FF]/8 dark:bg-white/5 text-[#001F3F] dark:text-white text-sm md:text-base font-semibold"
                                >
                                    {university}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ---------------- WINNERS SECTION ---------------- */}
            {winners.length > 0 && (
                <section className="py-12 md:py-16 relative">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-semibold text-[#001F3F] dark:text-white mb-3 inline-flex items-center gap-3 justify-center" style={{ fontFamily: "Blanka, sans-serif" }}>
                                <Trophy className="w-7 h-7 text-[#FBBC04]" />
                                Top Winners
                            </h2>
                            <p className="text-[#001F3F]/70 dark:text-white/70 max-w-2xl mx-auto">
                                Congratulations to our champions and all the teams who built solutions that matter.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-5">
                            {winners.map((winner, idx) => (
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
                </section>
            )}


            {/* ---------------- TIMELINE SECTION ---------------- */}
            {timeline && timeline.length > 0 && (
                <section className="py-12 md:py-16 relative overflow-hidden">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-semibold text-[#001F3F] dark:text-white mb-3" style={{ fontFamily: "Blanka, sans-serif" }}>
                                Edition Roadmap
                            </h2>
                        </div>
                        <div className="relative">
                            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-linear-to-b from-blue-500 via-red-500 to-green-500 opacity-30" />
                            <div className="space-y-6 md:space-y-0">
                                {timeline.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className={`relative flex items-center md:py-4 ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
                                    >
                                        <div className="md:w-1/2 w-full flex justify-start md:justify-center px-4 pl-12 md:pl-0">
                                            <div className={`p-4 rounded-xl ${item.color} shadow-lg w-full max-w-[320px] border border-white/10`}>
                                                <span className={`inline-block px-2 py-1 rounded-full text-[9px] font-bold mb-2 ${item.badgeColor} ${item.textColor} backdrop-blur-sm`}>{item.date}</span>
                                                <h3 className={`font-bold ${item.textColor}`}>{item.title}</h3>
                                            </div>
                                        </div>
                                        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-[#000d1a] bg-gray-400 z-10" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ---------------- VENUE SECTION ---------------- */}
            {venue && (
                <section className="py-12 md:py-16 relative">
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-semibold text-[#001F3F] dark:text-white mb-3" style={{ fontFamily: "Blanka, sans-serif" }}>
                                Event Venue
                            </h2>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#001F3F]/5 dark:bg-white/5 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-white/10 shadow-xl"
                        >
                            <div className="text-center space-y-6">
                                <h3 className="text-3xl md:text-4xl font-bold text-[#001F3F] dark:text-white">
                                    {venue.name}
                                </h3>
                                <div className="space-y-2 text-[#001F3F]/70 dark:text-white/70 text-lg">
                                    <p>{venue.address}</p>
                                    {venue.poBox && <p>{venue.poBox}</p>}
                                    <p className="font-semibold">{venue.city}</p>
                                </div>
                                <div className="pt-6 border-t border-[#001F3F]/10 dark:border-white/10 space-y-3">
                                    {venue.phone && (
                                        <p className="text-[#001F3F]/80 dark:text-white/80">
                                            <span className="font-semibold">Phone:</span>{" "}
                                            <a href={`tel:${venue.phone}`} className="hover:text-[#00D9FF] transition-colors">
                                                {venue.phone}
                                            </a>
                                        </p>
                                    )}
                                    {venue.email && (
                                        <p className="text-[#001F3F]/80 dark:text-white/80">
                                            <span className="font-semibold">Email:</span>{" "}
                                            <a href={`mailto:${venue.email}`} className="hover:text-[#00D9FF] transition-colors">
                                                {venue.email}
                                            </a>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ---------------- LAST YEAR'S REPORT SECTION (2025) ---------------- */}
            {showLastYearReport && lastYearReportUrl && (
                <section className="py-24 md:py-32 relative">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="relative grid md:grid-cols-2 gap-12 items-center bg-[#001F3F]/5 dark:bg-white/5 rounded-3xl overflow-hidden p-8 md:p-12 border border-slate-200 dark:border-white/10">
                            {/* Background image for this container only */}
                            {lastYearReportPreview && (
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={lastYearReportPreview}
                                        alt=""
                                        fill
                                        className="object-cover opacity-[0.08] dark:opacity-[0.12] blur-[2px]"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-br from-white/80 via-white/40 to-white/80 dark:from-[#000d1a]/80 dark:via-[#000d1a]/40 dark:to-[#000d1a]/80" />
                                </div>
                            )}

                            <div className="relative z-10 w-full aspect-[1/1.41]">
                                <PDFPreview
                                    url={lastYearReportUrl}
                                    previewImage={lastYearReportPreview}
                                    title="Impact Report"
                                    year={lastYearReportYear}
                                    onView={(url) => setViewDeck(url)}
                                />
                            </div>
                            <div className="relative z-10 text-center md:text-left space-y-8">
                                <h2 className="text-3xl md:text-4xl font-semibold text-[#001F3F] dark:text-white" style={{ fontFamily: "Blanka, sans-serif" }}>
                                    {lastYearReportYear} Impact Report
                                </h2>
                                <p className="text-[#001F3F]/70 dark:text-white/70 text-lg">
                                    Review the achievements and impact from last year&apos;s edition.
                                </p>
                                <a
                                    href={lastYearReportUrl}
                                    download
                                    className="inline-flex items-center px-8 py-3 rounded-full bg-[#001F3F] text-white font-medium shadow-lg hover:bg-slate-800 transition-all"
                                >
                                    DOWNLOAD REPORT
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ---------------- IMPACT REPORT SECTION ---------------- */}
            {impactReportUrl && (
                <section className="py-24 md:py-32 relative">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="relative grid md:grid-cols-2 gap-12 items-center bg-[#001F3F]/5 dark:bg-white/5 rounded-3xl overflow-hidden p-8 md:p-12 border border-slate-200 dark:border-white/10">
                            {/* Background image for this container only */}
                            {impactReportPreview && (
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={impactReportPreview}
                                        alt=""
                                        fill
                                        className="object-cover opacity-[0.08] dark:opacity-[0.12] blur-[2px]"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-br from-white/80 via-white/40 to-white/80 dark:from-[#000d1a]/80 dark:via-[#000d1a]/40 dark:to-[#000d1a]/80" />
                                </div>
                            )}

                            <div className="relative z-10 w-full aspect-[1/1.41]">
                                <PDFPreview
                                    url={impactReportUrl}
                                    previewImage={impactReportPreview}
                                    title="Impact Report"
                                    onView={(url) => setViewDeck(url)}
                                />
                            </div>
                            <div className="relative z-10 text-center md:text-left space-y-8">
                                <h2 className="text-3xl md:text-4xl font-semibold text-[#001F3F] dark:text-white" style={{ fontFamily: "Blanka, sans-serif" }}>Impact Report</h2>
                                <p className="text-[#001F3F]/70 dark:text-white/70 text-lg">Download our comprehensive report to see the achievements of this edition.</p>
                                <a href={impactReportUrl} download className="inline-flex items-center px-8 py-3 rounded-full bg-[#001F3F] text-white font-medium shadow-lg hover:bg-slate-800 transition-all">DOWNLOAD REPORT</a>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ---------------- FAQ SECTION ---------------- */}
            {faqs && faqs.length > 0 && (
                <section className="py-12 md:py-16 relative">
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-semibold text-[#001F3F] dark:text-white mb-4" style={{ fontFamily: "Blanka, sans-serif" }}>FAQs</h2>
                        </div>
                        <div className="bg-[#001F3F] p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl">
                            {faqs.map((faq, i) => (
                                <FAQComponent key={i} {...faq} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ---------------- PARTNERS SECTION ---------------- */}
            <PartnersSection partners={partners} />

            {/* Deck Viewer Modal */}
            <AnimatePresence>
                {viewDeck && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8"
                        onClick={() => setViewDeck(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-6xl h-[85vh] bg-[#001F3F] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#00152b]">
                                <h3 className="font-bold text-white">Presentation Viewer</h3>
                                <button onClick={() => setViewDeck(null)} className="p-2 text-white/60 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
                            </div>
                            <div className="flex-1">
                                <iframe src={viewDeck} className="w-full h-full border-0" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
