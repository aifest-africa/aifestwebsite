"use client";

import { Container, Section, SectionTitle, cn } from "@/lib/ui";
import { motion } from "framer-motion";

type SocialLink = { href: string; label: string };

export function ContactDetails({
    socials,
    className
}: {
    socials: SocialLink[];
    className?: string;
}) {
    const contactEmail = "info@aifestug.com";

    return (
        <Section className={cn("relative", className)}>
            <Container>
                <div className="grid gap-12 lg:grid-cols-3">
                    {/* Message Box Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#001F3F] dark:text-white mb-4" style={{ fontFamily: "Blanka, sans-serif" }}>
                                Send us a Message
                            </h2>
                            <p className="text-[#001F3F]/70 dark:text-white/70 text-lg">
                                Have a specific question or suggestion? Drop us a quick note below.
                            </p>
                        </div>

                        <div className="relative group">
                            <textarea
                                id="contact-message"
                                placeholder="Write your message here..."
                                className="w-full min-h-[200px] p-6 rounded-4xl border border-[#001F3F]/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm focus:ring-2 focus:ring-[#00D9FF] focus:border-transparent outline-none transition-all resize-none text-lg"
                            />
                            <button
                                onClick={() => {
                                    const msg = (document.getElementById('contact-message') as HTMLTextAreaElement).value;
                                    window.location.href = `mailto:${contactEmail}?subject=AI Fest Inquiry&body=${encodeURIComponent(msg)}`;
                                }}
                                className="mt-4 px-8 py-4 bg-[#001F3F] dark:bg-white text-white dark:text-[#001F3F] rounded-2xl font-bold uppercase tracking-widest hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-2"
                            >
                                Send via Gmail
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>

                    {/* Quick Info Section */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl border border-[#001F3F]/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md p-8 shadow-xl hover:border-[#00D9FF] transition-all group"
                        >
                            <SectionTitle className="text-xl text-[#001F3F] dark:text-white group-hover:text-[#00D9FF] transition-colors">Direct Email</SectionTitle>
                            <p className="mt-2 text-lg font-medium text-[#001F3F]/70 dark:text-white/70 break-all">{contactEmail}</p>
                        </motion.div>

                        {socials.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="rounded-3xl border border-[#001F3F]/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md p-8 shadow-xl hover:border-[#4285F4] transition-all group"
                        >
                            <SectionTitle className="text-xl text-[#001F3F] dark:text-white group-hover:text-[#4285F4] transition-colors">Connect on Social</SectionTitle>
                            <ul className="mt-4 space-y-3 text-lg">
                                {socials.map((l) => (
                                    <li key={l.href}>
                                        <a
                                            href={l.href}
                                            className="font-medium text-[#001F3F]/70 dark:text-white/70 underline underline-offset-4 decoration-2 decoration-[#4285F4]/30 hover:decoration-[#4285F4] transition-all hover:text-[#4285F4]"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        )}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
