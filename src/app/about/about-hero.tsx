
"use client";

import { HeroSlideshowBackground } from "../../components/hero-slideshow";

export function AboutHero({
    title,
    imageUrls,
    slideshowIntervalMs,
    slideshowTransitionDurationMs,
}: {
    title: string;
    description?: string;
    imageUrls: string[];
    slideshowIntervalMs?: number | null;
    slideshowTransitionDurationMs?: number | null;
}) {
    const urls = (imageUrls ?? []).filter(Boolean);

    return (
        <section className="bg-transparent pt-32 pb-0 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#001F3F] dark:text-white tracking-tight" style={{ fontFamily: "Blanka, sans-serif" }}>
                        {title}
                    </h1>
                    <p className="hidden md:block text-[#001F3F]/60 dark:text-white/60 max-w-xl text-right text-sm leading-relaxed">
                        AIFEST 2026 is a free event crafted to create innovative solutions that empower businesses to thrive in the digital age.
                    </p>
                </div>

                {/* Hero Grid - Single Column Full Width */}
                <div className="h-[350px] sm:h-[500px] lg:h-[700px] mb-12">
                    <div className="relative h-full rounded-[24px] overflow-hidden bg-slate-50/20 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                        {urls.length > 0 ? (
                            <HeroSlideshowBackground
                                imageUrls={urls}
                                intervalMs={slideshowIntervalMs ?? undefined}
                                transitionDurationMs={slideshowTransitionDurationMs ?? undefined}
                                className="opacity-100"
                                imgClassName="object-top md:object-center"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-slate-50 animate-pulse" />
                        )}

                        {/* Center Logo Overlay has been removed */}
                    </div>
                </div>
            </div>
        </section>
    );
}
