"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { publicMediaUrl } from "../../lib/content";
import { Linkedin, Github, Globe, Twitter, Link as LinkIcon, Mail } from "lucide-react";

import type { TeamMember } from "../../lib/editions/types";
interface SpeakerModalProps {
    speaker: TeamMember | null;
    onClose: () => void;
}

const SocialIcon = ({ platform }: { platform: string }) => {
    switch (platform.toLowerCase()) {
        case "linkedin": return <Linkedin className="w-4 h-4" />;
        case "github": return <Github className="w-4 h-4" />;
        case "twitter": return <Twitter className="w-4 h-4" />;
        case "website": return <Globe className="w-4 h-4" />;
        case "portfolio": return <Globe className="w-4 h-4" />;
        case "email": return <Mail className="w-4 h-4" />;
        default: return <LinkIcon className="w-4 h-4" />;
    }
};

export function SpeakerModal({ speaker, onClose }: SpeakerModalProps) {
    // Lock scroll when modal is open
    useEffect(() => {
        if (speaker) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [speaker]);

    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!speaker) return null;

    const imageUrl = speaker.image_path ? publicMediaUrl(speaker.image_path) : null;

    // Consolidate social links
    const allLinks: { platform: string; url: string }[] = [...(speaker.social_links || [])];
    if (speaker.linkedin && !allLinks.find(l => l.platform.toLowerCase() === 'linkedin')) allLinks.push({ platform: "linkedin", url: speaker.linkedin });
    if (speaker.twitter && !allLinks.find(l => l.platform.toLowerCase() === 'twitter')) allLinks.push({ platform: "twitter", url: speaker.twitter });
    if (speaker.github && !allLinks.find(l => l.platform.toLowerCase() === 'github')) allLinks.push({ platform: "github", url: speaker.github });
    if (speaker.portfolio && !allLinks.find(l => l.platform.toLowerCase() === 'portfolio')) allLinks.push({ platform: "portfolio", url: speaker.portfolio });
    if (speaker.email && !allLinks.find(l => l.platform.toLowerCase() === 'email')) allLinks.push({ platform: "email", url: speaker.email });

    return (
        <AnimatePresence>
            {speaker && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="bg-white dark:bg-[#001224] rounded-3xl shadow-2xl max-w-4xl w-full max-h-[75vh] md:max-h-[90vh] overflow-hidden pointer-events-auto border-2 border-[#00D9FF]/30"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 dark:bg-[#001F3F]/90 backdrop-blur-sm flex items-center justify-center text-[#001F3F] dark:text-white hover:bg-[#00D9FF] hover:text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-[#00D9FF]/30 hover:border-[#00D9FF]"
                                aria-label="Close modal"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex flex-col md:flex-row overflow-y-auto max-h-[70vh] md:max-h-[85vh] scrollbar-hide">
                                {/* Left: Image */}
                                <div className="md:w-2/5 relative bg-linear-to-br from-[#00D9FF]/10 to-[#001F3F]/10 shrink-0">
                                    <div className="aspect-video md:aspect-3/4 relative">
                                        {imageUrl ? (
                                            <Image
                                                src={imageUrl}
                                                alt={speaker.name}
                                                fill
                                                quality={95}
                                                priority
                                                className="object-cover object-top"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-[#00D9FF]/20 flex items-center justify-center">
                                                    <span className="text-4xl md:text-6xl font-bold text-[#00D9FF]" style={{ fontFamily: "var(--font-blanka)" }}>
                                                        {speaker.name.charAt(0)}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right: Content */}
                                <div className="md:w-3/5 p-5 md:p-10 space-y-4 md:space-y-6">
                                    <div>
                                        <h2 className="text-2xl md:text-4xl font-bold text-[#001F3F] dark:text-white mb-2" style={{ fontFamily: "var(--font-blanka)" }}>
                                            {speaker.name}
                                        </h2>
                                        <p className="text-sm md:text-lg font-semibold text-[#00D9FF]">
                                            {speaker.role}
                                        </p>
                                    </div>

                                    <div className="prose prose-sm max-w-none">
                                        <p className="text-[#001F3F]/80 dark:text-white/80 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                                            {speaker.bio || ""}
                                        </p>
                                    </div>

                                    {/* Social Links */}
                                    {allLinks.length > 0 && (
                                        <div className="pt-4 md:pt-6 border-t border-[#00D9FF]/20">
                                            <h3 className="text-xs md:text-sm font-bold text-[#001F3F] dark:text-white uppercase tracking-wider mb-3 md:mb-4">
                                                Connect
                                            </h3>
                                            <div className="flex flex-wrap gap-2 md:gap-3">
                                                {allLinks.map((link, idx) => {
                                                    const isEmail = link.platform.toLowerCase() === 'email';
                                                    const href = isEmail ? `mailto:${link.url}` : link.url;
                                                    const linkProps = isEmail
                                                        ? {}
                                                        : { target: "_blank", rel: "noopener noreferrer" };

                                                    return (
                                                        <a
                                                            key={idx}
                                                            href={href}
                                                            {...linkProps}
                                                            className="px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-[#00D9FF]/10 hover:bg-[#00D9FF] text-[#001F3F] dark:text-white hover:text-white transition-all duration-300 font-medium capitalize flex items-center gap-2 text-xs md:text-sm"
                                                        >
                                                            <SocialIcon platform={link.platform} />
                                                            {link.platform}
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
