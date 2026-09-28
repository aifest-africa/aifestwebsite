'use client'

import type React from "react";
import Link from "next/link";
import { Container } from "@/lib/ui";
import { useEffect, useRef } from "react";

type FooterLinkItem = { href: string; label: string };

export function AnimatedTextFooter({
    brandName,
    footerBlurb,
    footerLinks,
    footerNote,
}: {
    brandName: string;
    footerBlurb?: string | null;
    footerLinks: FooterLinkItem[];
    footerNote?: string | null;
}) {
    return (
        <footer className="relative mt-16 sm:mt-20 bg-[#001F3F] text-white overflow-hidden">
            <Container className="py-12 sm:py-16 relative z-10">
                {/* Top Section - Brand and Links */}
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between mb-12 sm:mb-16">
                    <div className="space-y-3 max-w-md">
                        <div className="text-xl font-bold tracking-tight text-white">{brandName}</div>
                        {footerBlurb ? (
                            <div className="text-sm text-white/70 leading-relaxed">{footerBlurb}</div>
                        ) : null}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-16 max-w-2xl lg:mx-auto">
                        {/* Column 1: Page Links */}
                        <div className="flex flex-col gap-3">
                            <div className="text-xs font-semibold text-white/80 mb-1 uppercase tracking-wider">Pages</div>
                            {footerLinks.map((l) => (
                                <FooterLink key={l.href} href={l.href}>
                                    {l.label}
                                </FooterLink>
                            ))}
                        </div>

                        {/* Column 2: Social Links */}
                        <div className="flex flex-col gap-3">
                            <div className="text-xs font-semibold text-white/80 mb-1 uppercase tracking-wider">Connect</div>
                            <SocialLink href="https://x.com/gdgmuk?s=20" label="X (Twitter)" icon="twitter" />
                            <SocialLink href="https://www.linkedin.com/company/gdg-makerere-university" label="LinkedIn" icon="linkedin" />
                            <SocialLink href="https://www.instagram.com/dsc_muk21/#" label="Instagram" icon="instagram" />
                            <SocialLink href="https://gdg.community.dev/gdg-on-campus-makerere-university-kampala-uganda/" label="GDG Platform" icon="users" />
                            <SocialLink href="https://www.youtube.com/@GDGOnCampusMUK" label="YouTube" icon="youtube" />
                            <SocialLink href="https://chat.whatsapp.com/HkhzhfvrNfuAnUbVhNiiYG" label="WhatsApp" icon="message-circle" />
                            <SocialLink href="mailto:info@aifestug.com" label="Email" icon="mail" />
                        </div>
                    </div>
                </div>

                {/* Animated GDG Text */}
                <AnimatedGDGText />

                {/* Bottom Section - Copyright */}
                <div className="mt-8 sm:mt-12 pt-6 border-t border-white/10 flex flex-col gap-3 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
                    <div>© 2026 {brandName}. ALL RIGHTS RESERVED.</div>
                    <div className="flex items-center gap-4 sm:gap-6">
                        {footerNote ? <span className="hidden sm:inline">{footerNote}</span> : null}
                        <SocialIcons />
                    </div>
                </div>
            </Container>
        </footer>
    );
}

function FooterLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    const getPageIcon = () => {
        const label = String(children).toLowerCase();
        if (label.includes('home')) return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />;
        if (label.includes('about')) return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />;
        if (label.includes('gallery')) return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />;
        if (label.includes('update')) return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />;
        if (label.includes('contact')) return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />;
        if (label.includes('involved')) return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />;
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />;
    };

    return (
        <Link
            href={href}
            className="flex items-center gap-2 font-medium text-white/70 aifest-smooth hover:text-[#00D9FF] text-sm group"
        >
            <svg className="w-4 h-4 flex-shrink-0 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {getPageIcon()}
            </svg>
            {children}
        </Link>
    );
}

function SocialLink({
    href,
    label,
    icon,
}: {
    href: string;
    label: string;
    icon: string;
}) {
    const getIcon = () => {
        switch (icon) {
            case 'twitter':
                return <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />;
            case 'linkedin':
                return <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />;
            case 'instagram':
                return <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />;
            case 'youtube':
                return <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />;
            case 'message-circle':
                return <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />;
            case 'mail':
                return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />;
            case 'users':
                return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />;
            default:
                return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />;
        }
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 font-medium text-white/70 aifest-smooth hover:text-[#00D9FF] text-sm group"
        >
            <svg className="w-4 h-4 flex-shrink-0 opacity-60 group-hover:opacity-100" fill={icon === 'mail' || icon === 'users' ? 'none' : 'currentColor'} stroke={icon === 'mail' || icon === 'users' ? 'currentColor' : 'none'} viewBox="0 0 24 24">
                {getIcon()}
            </svg>
            <span>{label}</span>
        </a>
    );
}

function SocialIcons() {
    return (
        <div className="flex items-center gap-4">
            <a
                href="https://x.com/gdgmuk?s=20"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#00D9FF] aifest-smooth"
                aria-label="X (Twitter)"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            </a>
            <a
                href="https://www.linkedin.com/company/gdg-makerere-university"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#00D9FF] aifest-smooth"
                aria-label="LinkedIn"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            </a>
            <a
                href="https://www.instagram.com/dsc_muk21/#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#00D9FF] aifest-smooth"
                aria-label="Instagram"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            </a>
            <a
                href="https://www.youtube.com/@GDGOnCampusMUK"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#00D9FF] aifest-smooth"
                aria-label="YouTube"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            </a>
            <a
                href="https://wa.me/message/YOUR_WHATSAPP_NUMBER"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#00D9FF] aifest-smooth"
                aria-label="WhatsApp"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            </a>
            <a
                href="mailto:info@aifestug.com"
                className="text-white/60 hover:text-[#00D9FF] aifest-smooth"
                aria-label="Email"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
            </a>
        </div>
    );
}

function AnimatedGDGText() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        let rect = canvas.getBoundingClientRect();

        // Set canvas size
        const updateSize = () => {
            const dpr = window.devicePixelRatio || 1;
            rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        };
        updateSize();
        window.addEventListener('resize', updateSize);

        // Colors to cycle through
        const colors = [
            '#4285F4', // Google Blue
            '#EA4335', // Google Red
            '#FBBC04', // Google Yellow
            '#34A853', // Google Green
            '#00D9FF', // Cyan
        ];

        // Create dot pattern for each letter
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
            const dotSpacing = 5;

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

        // GDG letters - responsive size based on viewport
        const isMobile = rect.width < 640; // sm breakpoint
        const isTablet = rect.width < 1024; // lg breakpoint

        const gdgFontSize = isMobile ? 50 : isTablet ? 100 : 160;
        const gdgOffsetY = isMobile ? -30 : isTablet ? -60 : -80;
        const gdgSpacing = isMobile ? 80 : isTablet ? 150 : 240;

        const letterG1 = createLetterDots('G', -gdgSpacing, gdgOffsetY, gdgFontSize);
        const letterD = createLetterDots('D', 0, gdgOffsetY, gdgFontSize);
        const letterG2 = createLetterDots('G', gdgSpacing, gdgOffsetY, gdgFontSize);

        // Makerere University text - responsive size
        const makFontSize = isMobile ? 18 : isTablet ? 30 : 50;
        const spacing = isMobile ? 20 : isTablet ? 35 : 55;
        const makOffsetY = isMobile ? 45 : isTablet ? 75 : 120;
        const totalWidth = spacing * 18;
        let currentX = -totalWidth / 2;

        const letterM1 = createLetterDots('M', currentX, makOffsetY, makFontSize);
        currentX += spacing;
        const letterA1 = createLetterDots('A', currentX, makOffsetY, makFontSize);
        currentX += spacing;
        const letterK = createLetterDots('K', currentX, makOffsetY, makFontSize);
        currentX += spacing;
        const letterE1 = createLetterDots('E', currentX, makOffsetY, makFontSize);
        currentX += spacing;
        const letterR1 = createLetterDots('R', currentX, makOffsetY, makFontSize);
        currentX += spacing;
        const letterE2 = createLetterDots('E', currentX, makOffsetY, makFontSize);
        currentX += spacing;
        const letterR2 = createLetterDots('R', currentX, makOffsetY, makFontSize);
        currentX += spacing;
        const letterE3 = createLetterDots('E', currentX, makOffsetY, makFontSize);
        currentX += spacing + 20; // Extra space between words

        const letterU = createLetterDots('U', currentX, makOffsetY, makFontSize);
        currentX += spacing;
        const letterN = createLetterDots('N', currentX, makOffsetY, makFontSize);
        currentX += spacing;
        const letterI = createLetterDots('I', currentX, makOffsetY, makFontSize);
        currentX += spacing;
        const letterV = createLetterDots('V', currentX, makOffsetY, makFontSize);
        currentX += spacing;
        const letterE4 = createLetterDots('E', currentX, makOffsetY, makFontSize);
        currentX += spacing;
        const letterR3 = createLetterDots('R', currentX, makOffsetY, makFontSize);
        currentX += spacing;
        const letterS = createLetterDots('S', currentX, makOffsetY, makFontSize);
        currentX += spacing;
        const letterI2 = createLetterDots('I', currentX, makOffsetY, makFontSize);
        currentX += spacing;
        const letterT = createLetterDots('T', currentX, makOffsetY, makFontSize);
        currentX += spacing;
        const letterY = createLetterDots('Y', currentX, makOffsetY, makFontSize);

        let animationFrame: number;
        const startTime = Date.now();

        const animate = () => {
            // Clear with CSS pixel dimensions
            ctx.clearRect(0, 0, rect.width, rect.height);

            const elapsed = (Date.now() - startTime) / 1000;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Draw dots for GDG
            [
                { dots: letterG1, offset: 0 },
                { dots: letterD, offset: 0.3 },
                { dots: letterG2, offset: 0.6 },
            ].forEach(({ dots, offset }) => {
                dots.forEach((dot) => {
                    const time = elapsed + dot.delay + offset;
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

            // Draw dots for Makerere University - slightly different timing
            [
                { dots: letterM1, offset: 0 },
                { dots: letterA1, offset: 0.1 },
                { dots: letterK, offset: 0.2 },
                { dots: letterE1, offset: 0.3 },
                { dots: letterR1, offset: 0.4 },
                { dots: letterE2, offset: 0.5 },
                { dots: letterR2, offset: 0.6 },
                { dots: letterE3, offset: 0.7 },
                { dots: letterU, offset: 0.8 },
                { dots: letterN, offset: 0.9 },
                { dots: letterI, offset: 1.0 },
                { dots: letterV, offset: 1.1 },
                { dots: letterE4, offset: 1.2 },
                { dots: letterR3, offset: 1.3 },
                { dots: letterS, offset: 1.4 },
                { dots: letterI2, offset: 1.5 },
                { dots: letterT, offset: 1.6 },
                { dots: letterY, offset: 1.7 },
            ].forEach(({ dots, offset }) => {
                dots.forEach((dot) => {
                    const time = elapsed + dot.delay + offset;
                    const colorIndex = Math.floor(time / 2.5) % colors.length;
                    const nextColorIndex = (colorIndex + 1) % colors.length;
                    const progress = (time % 2.5) / 2.5;

                    const color1 = hexToRgb(colors[colorIndex]);
                    const color2 = hexToRgb(colors[nextColorIndex]);
                    const r = Math.round(color1.r + (color2.r - color1.r) * progress);
                    const g = Math.round(color1.g + (color2.g - color1.g) * progress);
                    const b = Math.round(color1.b + (color2.b - color1.b) * progress);

                    const opacity = 0.5 + Math.sin(time * 1.5 + dot.delay) * 0.3;

                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                    ctx.beginPath();
                    ctx.arc(centerX + dot.x, centerY + dot.y, 1.8, 0, Math.PI * 2);
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
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center my-6 sm:my-8">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : { r: 0, g: 0, b: 0 };
}
