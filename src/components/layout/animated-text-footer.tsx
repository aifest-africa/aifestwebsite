'use client'

import type React from "react";
import Link from "next/link";
import { Container } from "@/lib/ui";
import { useEffect, useRef, useActionState } from "react";
import { Home, Info, Image as ImageIcon, Bell, Mail, Users, FileText, Twitter, Linkedin, Instagram, Youtube, MessageCircle, Send, Loader2, CheckCircle2, AlertCircle, Library, Phone, Github } from "lucide-react";

type FooterLinkItem = { href: string; label: string };

import { ThemeToggle } from "./theme-toggle";
import { subscribeToNewsletter, type ActionResult } from "../../app/actions/forms";
import { cn } from "@/lib/ui";

import { motion } from "framer-motion";

export function AnimatedTextFooter({
    brandName,
    footerBlurb,
    footerLinks,
}: {
    brandName: string;
    footerBlurb?: string | null;
    footerLinks: FooterLinkItem[];
    footerNote?: string | null;
}) {
    const [state, action, pending] = useActionState<ActionResult | null, FormData>(
        subscribeToNewsletter,
        null,
    );

    return (
        <footer className="relative border-t bg-[#001F3F] text-white overflow-hidden dark:bg-[#000d1a] dark:border-white/10">
            <Container className="py-6 sm:py-8 relative z-10">
                {/* Top Section - 4 Column Grid */}
                <div className="grid gap-8 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-12">
                    {/* Column 1: Stay Connected */}
                    <div className="relative">
                        <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight text-white">Stay Connected</h2>
                        <p className="mb-6 text-sm text-white/70 leading-relaxed">
                            {footerBlurb || "Join our community for the latest updates and exclusive events."}
                        </p>
                        <form className="relative space-y-3" action={action}>
                            <input
                                name="company"
                                tabIndex={-1}
                                autoComplete="off"
                                className="hidden"
                            />
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 pr-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00D9FF] backdrop-blur-sm transition-all focus:bg-white/15"
                                />
                                <button
                                    type="submit"
                                    disabled={pending}
                                    className="absolute right-1 top-1 h-8 w-8 rounded-lg bg-[#00D9FF] text-[#001F3F] flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    {pending ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Send className="h-4 w-4" />
                                    )}
                                    <span className="sr-only">Subscribe</span>
                                </button>
                            </div>

                            {state && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "flex items-center gap-2 text-xs font-semibold p-3 rounded-lg border backdrop-blur-sm",
                                        state.ok
                                            ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                                            : "bg-red-500/10 border-red-500/50 text-red-400"
                                    )}
                                >
                                    {state.ok ? (
                                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                                    ) : (
                                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                                    )}
                                    <span>{state.message}</span>
                                </motion.div>
                            )}
                        </form>
                        <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-[#00D9FF]/10 blur-2xl pointer-events-none" />
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
                        <nav className="flex flex-col gap-2">
                            {footerLinks.map((l) => (
                                <FooterLink key={l.href} href={l.href} label={l.label}>
                                    {l.label}
                                </FooterLink>
                            ))}
                        </nav>
                    </div>

                    {/* Column 3: Contact Us */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-white">Contact Us</h3>
                        <address className="space-y-2 text-sm text-white/70 not-italic">
                            <p>Makerere University</p>
                            <p>Kampala, Uganda</p>

                            <div className="mt-4 flex items-center gap-2 text-[#00D9FF]">
                                <Mail className="h-4 w-4" />
                                <span className="font-semibold">Email</span>
                            </div>
                            <p>info@aifestug.com</p>
                            <p>kiran@aifestug.com</p>

                            <div className="mt-4 flex items-center gap-2 text-[#00D9FF]">
                                <Phone className="h-4 w-4" />
                                <span className="font-semibold">Phone</span>
                            </div>
                            <p>+256-767-884-601</p>
                            <p>+256-778-520-941</p>
                            <p>+256-703-151-746</p>
                        </address>
                    </div>

                    {/* Column 4: Follow Us */}
                    <div className="relative">
                        <h3 className="mb-4 text-lg font-semibold text-white">Follow Us</h3>
                        <div className="flex flex-col gap-3">
                            <SocialLink href="https://x.com/gdgmuk?s=20" label="X (Twitter)" icon="twitter" />
                            <SocialLink href="https://www.linkedin.com/company/gdg-makerere-university" label="LinkedIn" icon="linkedin" />
                            <SocialLink href="https://www.instagram.com/dsc_muk21/#" label="Instagram" icon="instagram" />
                            <SocialLink href="https://www.youtube.com/@GDGOnCampusMUK" label="YouTube" icon="youtube" />
                            <SocialLink href="https://chat.whatsapp.com/HkhzhfvrNfuAnUbVhNiiYG" label="WhatsApp Community" icon="whatsapp" />
                            <SocialLink href="https://github.com/GDGoC-MUK" label="GitHub" icon="github" />
                            <SocialLink href="mailto:info@aifestug.com" label="Email Us" icon="mail" />
                            <SocialLink href="mailto:kiran@aifestug.com" label="Contact Lead" icon="mail" />
                        </div>
                    </div>
                </div>

                {/* Animated AIFEST Text */}
                <AnimatedBrandText />

                {/* Bottom Section */}
                <div className="mt-8 sm:mt-12 pt-6 border-t border-white/10 flex flex-col gap-4 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
                    <p>© 2026 {brandName}. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <nav className="flex flex-wrap gap-4">
                            <a href="#" className="transition-colors hover:text-[#00D9FF]">Privacy Policy</a>
                            <a href="#" className="transition-colors hover:text-[#00D9FF]">Terms of Service</a>
                        </nav>
                        <div className="h-4 w-px bg-white/20"></div>
                        <ThemeToggle className="text-white hover:text-[#00D9FF]" />
                    </div>
                </div>
            </Container>
        </footer>
    );
}

function FooterLink({ href, children, label }: { href: string; children: React.ReactNode; label: string }) {
    const getIcon = () => {
        const lowerLabel = label.toLowerCase();
        if (lowerLabel.includes('home')) return <Home className="h-4 w-4" />;
        if (lowerLabel.includes('about')) return <Info className="h-4 w-4" />;
        if (lowerLabel.includes('gallery')) return <ImageIcon className="h-4 w-4" />;
        if (lowerLabel.includes('update')) return <Bell className="h-4 w-4" />;
        if (lowerLabel.includes('contact')) return <Mail className="h-4 w-4" />;
        if (lowerLabel.includes('team')) return <Users className="h-4 w-4" />;
        if (lowerLabel.includes('resource')) return <Library className="h-4 w-4" />;
        if (lowerLabel.includes('involved')) return <Users className="h-4 w-4" />;
        return <FileText className="h-4 w-4" />;
    };

    return (
        <Link href={href} className="flex items-center gap-2 text-sm text-white/70 hover:text-[#00D9FF] transition-colors group">
            <span className="opacity-60 group-hover:opacity-100">{getIcon()}</span>
            {children}
        </Link>
    );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: string }) {
    const getIcon = () => {
        switch (icon) {
            case 'twitter': return <Twitter className="h-4 w-4" />;
            case 'linkedin': return <Linkedin className="h-4 w-4" />;
            case 'instagram': return <Instagram className="h-4 w-4" />;
            case 'youtube': return <Youtube className="h-4 w-4" />;
            case 'whatsapp': return <MessageCircle className="h-4 w-4" />;
            case 'mail': return <Mail className="h-4 w-4" />;
            case 'github': return <Github className="h-4 w-4" />;
            case 'users': return <Users className="h-4 w-4" />;
            default: return <Users className="h-4 w-4" />;
        }
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm text-white/70 hover:text-[#00D9FF] transition-colors group"
            aria-label={label}
        >
            <span className="opacity-60 group-hover:opacity-100">{getIcon()}</span>
            <span>{label}</span>
        </a>
    );
}

// Animated brand wordmark: AIFEST / UGANDA
function AnimatedBrandText() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        let rect = canvas.getBoundingClientRect();

        const updateSize = () => {
            const dpr = window.devicePixelRatio || 1;
            rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        };
        updateSize();
        window.addEventListener('resize', updateSize);

        const colors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#00D9FF'];

        const createLetterDots = (letter: string, offsetX: number, offsetY: number, fontSize: number) => {
            const dots: { x: number; y: number; delay: number }[] = [];
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            if (!tempCtx) return dots;

            tempCanvas.width = fontSize * 2;
            tempCanvas.height = fontSize * 2;
            tempCtx.font = `bold ${fontSize}px Arial, sans-serif`;
            tempCtx.fillStyle = 'white';
            tempCtx.textAlign = 'center';
            tempCtx.textBaseline = 'middle';
            tempCtx.fillText(letter, fontSize, fontSize);

            const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            const dotSpacing = fontSize < 30 ? 3 : 5;

            for (let y = 0; y < tempCanvas.height; y += dotSpacing) {
                for (let x = 0; x < tempCanvas.width; x += dotSpacing) {
                    const index = (y * tempCanvas.width + x) * 4;
                    if (imageData.data[index + 3] > 128) {
                        dots.push({
                            x: offsetX + x - fontSize,
                            y: offsetY + y - fontSize,
                            delay: Math.random() * 2,
                        });
                    }
                }
            }

            return dots;
        };

        const isMobile = rect.width < 640;
        const isTablet = rect.width < 1024;

        const brandFontSize = isMobile ? 42 : isTablet ? 80 : 130;
        const brandOffsetY = isMobile ? -28 : isTablet ? -55 : -70;
        const brandSpacing = isMobile ? 48 : isTablet ? 90 : 145;
        const brandLetters = ['A', 'I', 'F', 'E', 'S', 'T'];
        const brandStartX = -((brandLetters.length - 1) * brandSpacing) / 2;
        const brandDots = brandLetters.map((letter, i) =>
            createLetterDots(letter, brandStartX + i * brandSpacing, brandOffsetY, brandFontSize)
        );

        const subFontSize = isMobile ? 28 : isTablet ? 40 : 60;
        const subSpacing = isMobile ? 32 : isTablet ? 50 : 75;
        const subOffsetY = isMobile ? 40 : isTablet ? 70 : 110;
        const subLetters = ['U', 'G', 'A', 'N', 'D', 'A'];
        const subStartX = -((subLetters.length - 1) * subSpacing) / 2;
        const subDots = subLetters.map((letter, i) =>
            createLetterDots(letter, subStartX + i * subSpacing, subOffsetY, subFontSize)
        );

        let animationFrame: number;
        const startTime = Date.now();

        const animate = () => {
            ctx.clearRect(0, 0, rect.width, rect.height);

            const elapsed = (Date.now() - startTime) / 1000;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            brandDots.forEach((dots, letterIndex) => {
                dots.forEach((dot) => {
                    const time = elapsed + dot.delay + letterIndex * 0.15;
                    const colorIndex = Math.floor(time / 2) % colors.length;
                    const nextColorIndex = (colorIndex + 1) % colors.length;
                    const progress = (time % 2) / 2;

                    const color1 = hexToRgb(colors[colorIndex]);
                    const color2 = hexToRgb(colors[nextColorIndex]);
                    const r = Math.round(color1.r + (color2.r - color1.r) * progress);
                    const g = Math.round(color1.g + (color2.g - color1.g) * progress);
                    const b = Math.round(color1.b + (color2.b - color1.b) * progress);

                    const opacity = 0.6 + Math.sin(time * 2 + dot.delay) * 0.4;

                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                    ctx.beginPath();
                    ctx.arc(centerX + dot.x, centerY + dot.y, 2.5, 0, Math.PI * 2);
                    ctx.fill();
                });
            });

            subDots.forEach((dots, letterIndex) => {
                dots.forEach((dot) => {
                    const time = elapsed + dot.delay + letterIndex * 0.12;
                    const colorIndex = Math.floor(time / 2.5) % colors.length;
                    const nextColorIndex = (colorIndex + 1) % colors.length;
                    const progress = (time % 2.5) / 2.5;

                    const color1 = hexToRgb(colors[colorIndex]);
                    const color2 = hexToRgb(colors[nextColorIndex]);
                    const r = Math.round(color1.r + (color2.r - color1.r) * progress);
                    const g = Math.round(color1.g + (color2.g - color1.g) * progress);
                    const b = Math.round(color1.b + (color2.b - color1.b) * progress);

                    const opacity = (isMobile ? 0.7 : 0.5) + Math.sin(time * 1.5 + dot.delay) * 0.3;

                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                    ctx.beginPath();
                    ctx.arc(centerX + dot.x, centerY + dot.y, isMobile ? 1.2 : 1.8, 0, Math.PI * 2);
                    ctx.fill();
                });
            });

            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    return (
        <div className="relative w-full h-[150px] sm:h-[250px] md:h-[350px] lg:h-[450px] flex items-center justify-center my-1 sm:my-2">
            <canvas ref={canvasRef} className="w-full h-full" style={{ width: '100%', height: '100%' }} />
        </div>
    );
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
        : { r: 0, g: 0, b: 0 };
}
