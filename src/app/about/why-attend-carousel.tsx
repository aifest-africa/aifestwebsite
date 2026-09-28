"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { publicMediaUrl } from "../../lib/content";

type WhyAttendItem = {
    id: string;
    title: string;
    description: string;
    image_path: string | null;
    sort_order: number;
};

export function WhyAttendCarousel({ items }: { items: WhyAttendItem[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 10);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 424; // Card width (400) + gap (24)
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
            // Check scroll after animation
            setTimeout(checkScroll, 500);
        }
    };

    return (
        <div className="relative group/carousel">
            {/* Scroll Buttons */}
            {showLeftArrow && (
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md border border-white/20 shadow-xl text-[#001F3F] dark:text-white hover:bg-white dark:hover:bg-black/60 transition-all flex opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
            )}

            {showRightArrow && (
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md border border-white/20 shadow-xl text-[#001F3F] dark:text-white hover:bg-white dark:hover:bg-black/60 transition-all flex opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            )}

            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex gap-6 overflow-x-auto py-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
                {items.map((item, index) => (
                    <div
                        key={`${item.id}-${index}`}
                        className="shrink-0 w-[300px] md:w-[400px] group overflow-hidden rounded-3xl bg-white dark:bg-[#001a33] border border-slate-200 dark:border-white/10 transition-all snap-start"
                    >
                        <div className="aspect-4/3 w-full bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                            {item.image_path ? (
                                <Image
                                    src={publicMediaUrl(item.image_path) ?? ""}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 768px) 300px, 400px"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#00D9FF]/20 to-[#4285F4]/20 dark:from-[#00D9FF]/10 dark:to-[#4285F4]/10">
                                    <span className="text-4xl">🚀</span>
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl md:text-2xl font-bold text-[#001F3F] dark:text-white mb-2">{item.title}</h3>
                            <p className="text-sm md:text-base text-[#001F3F]/70 dark:text-white/70 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
