"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, Eye } from "lucide-react";

interface PDFPreviewProps {
    url: string;
    previewImage?: string;
    title: string;
    year?: string;
    onView?: (url: string) => void;
}

export function PDFPreview({ url, previewImage, title, year, onView }: PDFPreviewProps) {
    return (
        <div className="relative w-full aspect-[1/1.41] rounded-xl overflow-hidden bg-slate-100 dark:bg-white/5 shadow-2xl group border border-slate-200 dark:border-white/10">
            {/* Preview Image or Placeholder */}
            {previewImage ? (
                <Image
                    src={previewImage}
                    alt={`${title} Preview`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-[#001F3F] dark:to-[#000d1a]">
                    <FileText className="w-20 h-20 text-[#001F3F]/10 dark:text-[#00D9FF]/10 mb-4" />
                    <h4 className="text-xl font-bold text-[#001F3F] dark:text-white/80 mb-2">{title}</h4>
                    {year && <p className="text-[#001F3F]/50 dark:text-white/40">{year} Edition</p>}
                </div>
            )}

            {/* Hover Overlay */}
            <motion.div
                className="absolute inset-0 bg-[#001F3F]/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
            >
                <div className="text-center mb-4 px-6">
                    <h4 className="text-xl font-bold text-white mb-1">{title}</h4>
                    {year && <p className="text-white/70 text-sm">{year} Impact Report</p>}
                </div>

                <div className="flex flex-col gap-3 w-full max-w-[200px]">
                    {onView && (
                        <button
                            onClick={() => onView(url)}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#00D9FF] text-[#001F3F] font-bold hover:bg-[#00D9FF]/90 transition-all shadow-lg text-sm"
                        >
                            <Eye className="w-4 h-4" /> VIEW REPORT
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
