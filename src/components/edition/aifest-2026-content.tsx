"use client";

import Image from "next/image";
import { ButtonLink } from "@/lib/ui";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ExternalLink, Plus, Minus } from "lucide-react";
import prototypeImage from "@/app/2026/prototype.png";

interface ImageProps {
    id: string;
    image_path: string;
    caption?: string | null;
}

interface Aifest2026ContentProps {
    heroTitle: string;
    heroSubtitle?: string;
    heroImage?: string;
    gallery?: ImageProps[];
    registrationImage?: string;
    sponsorshipDeckUrl?: string;
}


function FAQItem({ question, answer }: { question: string; answer: string }) {
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

export function Aifest2026Content({
    heroSubtitle,
    heroImage,
    gallery = [],
    registrationImage,
    sponsorshipDeckUrl,
}: Aifest2026ContentProps) {
    // Use provided images or fallbacks if array is empty
    const leftBigImage = registrationImage || gallery[0]?.image_path;
    const cardImage1 = gallery[1]?.image_path;

    const [viewDeck, setViewDeck] = useState<string | null>(null);

    return (
        <div className="flex flex-col relative overflow-hidden bg-transparent transition-colors duration-500">
            {/* Unified Gradient Background and Grid - REMOVED to share page background */}
            {/* <div className="absolute inset-0 bg-linear-to-br from-white via-blue-50/50 to-white dark:from-[#000d1a] dark:via-[#001224] dark:to-[#000d1a] -z-10" /> */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.01] dark:opacity-[0.02] -z-10" />

            {/* ---------------- HERO SECTION ---------------- */}
            <section className="pt-24 pb-4 md:pt-32 md:pb-6 bg-transparent relative">
                <div className="mx-auto max-w-6xl space-y-2 px-6">
                    {heroImage && (
                        <div className="relative w-full h-[240px] md:h-[460px] rounded-xl overflow-hidden mb-8 shadow-2xl">
                            <Image
                                className="object-cover object-top md:object-center"
                                src={heroImage}
                                alt="Hero section image"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 1200px"
                            />
                        </div>
                    )}

                    <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                        <h1 className="text-3xl md:text-5xl font-semibold text-[#001F3F] dark:text-white leading-snug" style={{ fontFamily: "Blanka, sans-serif" }}>
                            This Year&apos;s Edition
                        </h1>
                        <div className="space-y-6 text-muted-foreground">
                            {heroSubtitle && (
                                <p className="text-lg leading-relaxed text-[#001F3F]/80 dark:text-white/80">
                                    {heroSubtitle}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------------- ABOUT SECTION ---------------- */}
            <section id="about-2026" className="py-12 md:py-16 relative">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.05] -z-10" />
                <div className="mx-auto max-w-6xl space-y-16 px-6">

                    {/* ---------------- PROTOTYPE SUBMISSION ---------------- */}
                    <div
                        id="prototype"
                        className="relative overflow-hidden rounded-xl border border-white/10 bg-[#001F3F] text-white shadow-xl p-6 md:p-8"
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-[#00D9FF]/15 to-transparent pointer-events-none" />
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                            <div className="relative w-full max-w-[220px] aspect-square rounded-xl overflow-hidden border border-white/20 shadow-lg">
                                <Image
                                    src={prototypeImage}
                                    alt="Prototype Submission"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 220px, 220px"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Prototype Submission</h3>
                                <p className="text-sm md:text-base text-gray-200 mb-4">
                                    Phase 1: Prototype submission for Aifest 2026 is now open. Deadline: 28th Feb.
                                </p>
                                <span className="inline-flex items-center px-5 py-2 rounded-full text-xs md:text-sm font-bold bg-white/15 text-white border border-white/30">
                                    OPEN UNTIL 28TH FEB
                                </span>
                                <div className="mt-4">
                                    <a
                                        href="https://forms.gle/2NXKEkE1yZorvdicA"
                                        className="inline-flex items-center px-5 py-2 rounded-full text-xs md:text-sm font-bold bg-[#00D9FF] text-[#001F3F] hover:bg-[#6fe9ff] transition-colors"
                                    >
                                        SUBMIT PROTOTYPE
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ---------------- GALLERY CARDS (NEW LAYOUT) ---------------- */}
                    <div className="flex flex-col md:flex-row gap-6">

                        {/* LEFT BIG IMAGE - MAIN REGISTRATION */}
                        <div
                            className="md:flex-1 relative min-h-[400px] rounded-xl overflow-hidden group shadow-lg block border border-slate-200 dark:border-white/10"
                        >
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                                className="w-full h-full"
                            >
                                {leftBigImage ? (
                                    <Image
                                        src={leftBigImage}
                                        alt="Main Registration"
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                ) : (
                                    <div className="relative w-full h-full bg-linear-to-br from-[#00D9FF]/20 via-[#4285F4]/10 to-[#00D9FF]/30 flex items-center justify-center overflow-hidden">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,217,255,0.2)_0%,transparent_70%)] animate-pulse" />
                                        <div className="relative z-10 flex flex-col items-center gap-4">
                                            <div className="px-6 py-2 rounded-full border-2 border-white/30 backdrop-blur-md bg-white/10 shadow-xl overflow-hidden group/badge">
                                                <motion.span
                                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="text-white font-black tracking-[0.3em] uppercase text-sm md:text-base relative z-10"
                                                >
                                                    Coming Soon
                                                </motion.span>
                                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1000" />
                                            </div>
                                            <span className="text-white/40 text-xs font-bold tracking-widest uppercase">Stay Tuned</span>
                                        </div>
                                    </div>
                                )}
                                {/* REMOVED obscuring overlay */}
                                {/* <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900/50" /> */}
                                <div className="absolute bottom-0 p-8 z-10 w-full bg-linear-to-t from-black/90 via-black/60 to-transparent">
                                    <h3 className="text-2xl font-bold mb-2 text-white">Main Registration</h3>
                                    <p className="text-base text-gray-200 mb-4">
                                        Registration for the Aifest 2026 Inter-University Hackathon has ended.
                                    </p>
                                    <span className="inline-flex items-center px-6 py-2 rounded-full text-sm font-bold bg-white/15 text-white border border-white/30">
                                        REGISTRATION CLOSED
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT TWO CARDS */}
                        <div className="flex flex-col gap-6 md:flex-1">
                            {/* FIRST CARD - SPONSORSHIP DECK */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                                className="relative overflow-hidden rounded-xl bg-[#001F3F] text-white shadow-xl min-h-[250px] border border-white/10 group"
                            >
                                {cardImage1 ? (
                                    <Image
                                        src={cardImage1}
                                        alt="Sponsorship Deck"
                                        className="h-full w-full object-cover absolute inset-0 opacity-40 transition-transform duration-700 group-hover:scale-105"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                ) : (
                                    <div className="h-full w-full absolute inset-0 bg-linear-to-br from-gray-900 to-[#001F3F] flex items-center justify-center overflow-hidden">
                                        {/* Static Image Background */}
                                        <Image
                                            src="/images/sponsorshipdeck.png"
                                            alt="Sponsorship Deck Preview"
                                            fill
                                            className="object-cover opacity-60"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-linear-to-br from-[#00D9FF]/20 to-[#001F3F]/80 mix-blend-multiply" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white">
                                    <h3 className="text-xl font-bold mb-2">Sponsorship Deck</h3>
                                    <p className="text-sm text-gray-200 mb-4">
                                        Check out our sponsorship deck for the upcoming festival.
                                    </p>
                                    {sponsorshipDeckUrl && (
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setViewDeck(sponsorshipDeckUrl)}
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-xs font-bold transition-all cursor-pointer"
                                            >
                                                VIEW
                                            </button>
                                            <a
                                                href={sponsorshipDeckUrl}
                                                download
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D9FF] hover:bg-[#00bcec] text-white border-0 shadow-md text-xs font-bold transition-all"
                                            >
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                DOWNLOAD
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Agenda Button */}
                    <div className="flex justify-center mt-12">
                        <ButtonLink
                            href="/agenda"
                            variant="primary"
                            className="px-10 min-w-[240px] text-lg font-bold bg-[#00D9FF] text-[#00D9FF] hover:bg-[#3474e0] shadow-none"
                        >
                            <span>VIEW AGENDA</span>
                        </ButtonLink>
                    </div>

                </div>
            </section >

            {/* ---------------- EVENT TIMELINE SECTION ---------------- */}
            <section className="py-12 md:py-16 relative overflow-hidden">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-semibold text-[#001F3F] dark:text-white mb-3" style={{ fontFamily: "Blanka, sans-serif" }}>
                            Roadmap to Aifest 2026
                        </h2>
                        <p className="text-[#001F3F]/70 dark:text-white/70 text-base max-w-2xl mx-auto">
                            The journey from idea to impact. Mark these important dates on your calendar.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Vertical Timeline Line - Now visible on mobile */}
                        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-linear-to-b from-blue-500 via-red-500 to-green-500 opacity-30" />

                        <div className="space-y-6 md:space-y-0">
                            {[
                                { title: "Idea Submission", date: "1st Jan - 15th Feb", color: "bg-blue-600", badgeColor: "bg-white/20", textColor: "text-white" },
                                { title: "Prototype Submission", date: "16th - 28th Feb", color: "bg-red-600", badgeColor: "bg-white/20", textColor: "text-white" },
                                { title: "Judging Phase 1", date: "1st - 6th April", color: "bg-yellow-600", badgeColor: "bg-white/20", textColor: "text-white" },
                                { title: "Top 10 Shortlist", date: "15th April", color: "bg-green-600", badgeColor: "bg-white/20", textColor: "text-white" },
                                { title: "AIFEST 2026", date: "May 9th, 9am - 4pm", color: "bg-[#00D9FF]", badgeColor: "bg-white/20", textColor: "text-[#001F3F]", large: true },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`relative flex items-center md:py-4 ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
                                >
                                    {/* Content Area */}
                                    <div className="md:w-1/2 w-full flex justify-start md:justify-center px-4 pl-12 md:pl-0">
                                        <div className={`p-4 rounded-xl ${item.color} shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-[320px] border border-white/10 ${item.large ? "ring-2 ring-[#00D9FF]/30" : ""}`}>
                                            <span className={`inline-block px-2 py-1 rounded-full text-[9px] font-bold mb-2 ${item.badgeColor} ${item.textColor} backdrop-blur-sm`}>
                                                {item.date}
                                            </span>
                                            <h3 className={`font-bold ${item.textColor} ${item.large ? "text-lg" : "text-base"}`}>
                                                {item.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Timeline Dot */}
                                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-[#000d1a] bg-gray-400 dark:bg-gray-600 z-10" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section >

            {/* ---------------- 2025 IMPACT REPORT SECTION ---------------- */}
            <section className="relative py-12 md:py-16 overflow-hidden">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Column: PDF Preview (on desktop) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative w-full aspect-[1/1.41] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 shadow-2xl group order-2 md:order-1"
                        >
                            <iframe
                                src="/AIFest Report 2025.pdf#toolbar=0&view=Fit&navpanes=0"
                                className="w-full h-full"
                                title="Aifest 2025 Impact Report Preview"
                            />
                            {/* Overlay hint for interactivity */}
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent pointer-events-none transition-colors" />
                        </motion.div>

                        {/* Right Column: Details (on desktop) */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center md:text-left space-y-8 order-1 md:order-2"
                        >
                            <div>
                                <h2 className="text-3xl md:text-4xl font-semibold text-[#001F3F] dark:text-white mb-4" style={{ fontFamily: "Blanka, sans-serif" }}>
                                    2025 Impact Report
                                </h2>
                                <p className="text-[#001F3F]/70 dark:text-white/70 text-lg leading-relaxed">
                                    Explore the highlights, achievements, and impact of Aifest 2025. Read through our comprehensive report to see how we&apos;re shaping the future.
                                </p>
                            </div>
                            <a
                                href="/AIFest Report 2025.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className="inline-flex items-center justify-center rounded-full border border-input bg-background/80 backdrop-blur-sm px-8 py-3 text-sm font-medium shadow-lg transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            >
                                <span>DOWNLOAD REPORT</span>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section >

            {/* ---------------- FAQ SECTION ---------------- */}
            <section className="py-12 md:py-16 relative">
                <div className="mx-auto max-w-4xl px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-semibold text-[#001F3F] dark:text-white mb-4" style={{ fontFamily: "Blanka, sans-serif" }}>
                            Frequently Asked Questions
                        </h2>
                        <p className="text-[#001F3F]/70 dark:text-white/70 text-lg">
                            Everything you need to know about Aifest 2026.
                        </p>
                    </div>

                    <div className="bg-[#001F3F] p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl">
                        <FAQItem
                            question="What happens after registration?"
                            answer="After you register, join the Whatsapp Community Group. You should then start refining your idea and team. The next major step is the Idea Submission phase which runs until Feb 15th, followed by the Prototyping phase."
                        />
                        <FAQItem
                            question="What do they mean by 'AI Agents' in this context?"
                            answer="It goes beyond simple chatbots or connecting to an API. We're looking for robust AI applications where models are actively utilized to solve complex problems. Think systems that reason, take action, and perform tasks, not just generate text."
                        />
                        <FAQItem
                            question="Are we going to code during the event or just present?"
                            answer="You will build your projects beforehand during the Prototyping Phase (Feb 16th - 28th). The final event day (May 9th) is for presenting your already completed and polished prototypes to the judges and audience."
                        />
                        <FAQItem
                            question="Who will be presenting on the event day?"
                            answer="Only the top 10 shortlisted teams will be invited to present their projects to the judges and the audience on the final event day (May 9th)."
                        />
                        <FAQItem
                            question="Who can participate?"
                            answer="Participation is open to all university students who are passionate about AI and technology. Whether you're a coder, designer, or prompt engineer, there's a place for you."
                        />
                        <FAQItem
                            question="Is it free to join?"
                            answer="Yes! Participation in Aifest 2026 is completely free for all admitted students."
                        />
                    </div>
                </div>
            </section>

            {/* ---------------- GET INVOLVED SECTION ---------------- */}
            <section className="py-12 md:py-16 relative">
                <div className="absolute inset-0 bg-linear-to-tr from-blue-500/5 via-transparent to-[#00D9FF]/5 dark:from-blue-500/5 dark:to-[#00D9FF]/5 -z-10" />
                <div className="mx-auto max-w-6xl space-y-8 px-6 text-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold text-[#001F3F] dark:text-white mb-4" style={{ fontFamily: "Blanka, sans-serif" }}>
                            Get Involved
                        </h2>
                        <p className="text-[#001F3F]/70 dark:text-white/70 text-lg max-w-2xl mx-auto">
                            Join us in shaping the future of AI. There is a place for everyone at Aifest 2026.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <ButtonLink
                            href="/get-involved"
                            variant="primary"
                            className="px-10 min-w-[240px] text-lg font-bold bg-[#00D9FF]"
                        >
                            <span>JOIN US</span>
                        </ButtonLink>
                    </div>
                </div>
            </section >

            {/* Deck Viewer Modal */}
            <AnimatePresence>
                {viewDeck && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8"
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
                                <h3 className="font-bold text-white text-lg">Presentation Viewer</h3>
                                <div className="flex items-center gap-4">
                                    <a
                                        href={viewDeck || ""}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/60 hover:text-white transition-colors"
                                        title="Open in new tab"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                    <button
                                        onClick={() => setViewDeck(null)}
                                        className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 bg-black/20">
                                <iframe
                                    src={viewDeck || ""}
                                    className="w-full h-full border-0"
                                    title="Deck Viewer"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
