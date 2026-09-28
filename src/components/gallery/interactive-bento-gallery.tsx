"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface MediaItemType {
    id: string;
    type?: string;
    title?: string;
    caption?: string;
    src: string;
}

const MediaItem = ({
    item,
    onClick,
}: {
    item: MediaItemType;
    onClick?: () => void;
}) => {
    return (
        <div className="relative mb-4 break-inside-avoid overflow-hidden rounded-2xl cursor-pointer group shadow-sm transition-all hover:shadow-xl hover:scale-[1.02]">
            <Image
                src={item.src}
                alt={item.title || item.caption || "Gallery image"}
                width={500}
                height={500}
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                onClick={onClick}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Hover Details */}
            <motion.div
                className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={false}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative">
                    {item.title && (
                        <h3 className="text-white text-sm font-bold tracking-tight mb-0.5">
                            {item.title}
                        </h3>
                    )}
                    {item.caption && (
                        <p className="text-white/70 text-[10px] leading-tight line-clamp-2">
                            {item.caption}
                        </p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

interface GalleryModalProps {
    selectedItem: MediaItemType;
    isOpen: boolean;
    onClose: () => void;
    setSelectedItem: (item: MediaItemType | null) => void;
    mediaItems: MediaItemType[];
}

const GalleryModal = ({
    selectedItem,
    isOpen,
    onClose,
    setSelectedItem,
    mediaItems,
}: GalleryModalProps) => {
    if (!isOpen) return null;

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            >
                <button
                    className="absolute top-6 right-6 z-[110] p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    onClick={onClose}
                >
                    <X size={24} />
                </button>

                <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedItem.id}
                            className="relative max-w-5xl w-full h-full flex items-center justify-center"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <Image
                                src={selectedItem.src}
                                alt={selectedItem.title || selectedItem.caption || ""}
                                width={1200}
                                height={1200}
                                className="max-h-full max-w-full object-contain shadow-2xl rounded-lg"
                                priority
                            />

                            {(selectedItem.title || selectedItem.caption) && (
                                <div className="absolute bottom-4 left-4 right-4 text-center">
                                    <div className="inline-block bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                                        {selectedItem.title && (
                                            <h3 className="text-white text-lg font-bold">
                                                {selectedItem.title}
                                            </h3>
                                        )}
                                        {selectedItem.caption && (
                                            <p className="text-white/70 text-sm mt-1">
                                                {selectedItem.caption}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Thumbnail Strip */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 overflow-x-auto max-w-[90vw] invisible sm:visible">
                    {mediaItems.slice(0, 10).map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className={`relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 transition-all ${selectedItem.id === item.id
                                ? "border-[#00D9FF] scale-110 shadow-lg shadow-[#00D9FF]/20"
                                : "border-transparent opacity-50 hover:opacity-100"
                                }`}
                        >
                            <Image
                                src={item.src}
                                alt=""
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            </motion.div>
        </>
    );
};

interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[];
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({
    mediaItems,
}) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);

    return (
        <div className="w-full px-4 py-4">
            <div className="mb-8 text-center">
                <motion.h2
                    className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#001F3F] via-[#00D9FF] to-[#001F3F] dark:from-white dark:via-[#00D9FF] dark:to-white"
                    style={{ fontFamily: "Blanka, sans-serif" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Explore Our Moments
                </motion.h2>
                <div className="mt-4 flex flex-col items-center">
                    <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent mb-4" />
                    <motion.p
                        className="text-sm sm:text-base text-[#001F3F]/60 dark:text-white/60 tracking-wide"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Click any photo to view full size
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto items-start gap-4 space-y-4 columns-2 sm:columns-3 md:columns-4">
                {mediaItems.map((item) => (
                    <MediaItem
                        key={item.id}
                        item={item}
                        onClick={() => setSelectedItem(item)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        setSelectedItem={setSelectedItem}
                        mediaItems={mediaItems}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveBentoGallery;
