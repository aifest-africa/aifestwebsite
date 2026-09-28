"use client";

import { Container, Section } from "@/lib/ui";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/ui";
import { ScrollReveal } from "../effects/scroll-reveal";

interface VideoCardProps {
    src: string;
    title: string;
    className?: string;
    aspectRatio?: "video" | "vertical" | "square";
}

function VideoCard({ src, title, className, aspectRatio = "video" }: VideoCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMuted] = useState(true);

    const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");
    const youtubeEmbedUrl = isYouTube
        ? (() => {
              let videoId = "";
              if (src.includes("shorts/")) {
                  videoId = src.split("shorts/")[1]?.split("?")[0] || "";
              } else if (src.includes("watch?v=")) {
                  videoId = src.split("watch?v=")[1]?.split("&")[0] || "";
              } else if (src.includes("youtu.be/")) {
                  videoId = src.split("youtu.be/")[1]?.split("?")[0] || "";
              }
              return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
          })()
        : null;

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    const aspectClass =
        aspectRatio === "video" ? "aspect-video" : aspectRatio === "vertical" ? "aspect-[9/16]" : "aspect-square";

    return (
        <motion.div
            ref={containerRef}
            whileHover={isFullscreen ? {} : { y: -10 }}
            className={cn(
                "group relative overflow-hidden rounded-[2.5rem] bg-[#001F3F]/5 dark:bg-white/5 border border-[#001F3F]/10 dark:border-white/10 shadow-2xl transition-all duration-300",
                isFullscreen ? "w-full h-full bg-black rounded-none border-none" : aspectClass,
                className,
            )}
        >
            {isYouTube && youtubeEmbedUrl ? (
                <iframe
                    ref={iframeRef}
                    src={youtubeEmbedUrl}
                    className={cn("h-full w-full", isFullscreen ? "object-contain" : "object-cover")}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={title}
                />
            ) : (
                <video
                    ref={videoRef}
                    src={src}
                    className={cn("h-full w-full", isFullscreen ? "object-contain" : "object-cover")}
                    loop
                    muted={isMuted}
                    playsInline
                />
            )}

            <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/10 to-transparent" />
        </motion.div>
    );
}

export function VideoRecapSection() {
    return (
        <Section className="relative py-8 md:py-12 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />

            <Container>
                <div className="max-w-xl mx-auto text-center space-y-8">
                    <ScrollReveal variant="fade-up">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#001F3F] dark:text-white"
                            style={{ fontFamily: "Blanka, sans-serif" }}
                        >
                            Event Recap
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal variant="fade-up" delay={0.15}>
                        <div className="mx-auto w-full max-w-[320px] sm:max-w-[380px]">
                            <VideoCard
                                src="https://youtube.com/shorts/tyb50pIMnIE"
                                title="2025 Event Highlight"
                                aspectRatio="vertical"
                            />
                        </div>
                    </ScrollReveal>
                </div>
            </Container>
        </Section>
    );
}
