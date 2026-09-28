"use client";

import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect } from 'react';

interface PdfThumbnailProps {
    url: string;
    pageNumber?: number;
    className?: string;
}

export function PdfThumbnail({ url, pageNumber = 1, className }: PdfThumbnailProps) {
    useEffect(() => {
        // Use a local worker to avoid CDN issues and ensure version matching
        // We can safely assume we are on the client because this component is loaded with ssr: false
        if (typeof window !== 'undefined') {
            pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
        }
    }, []);

    return (
        <div className={className}>
            <Document
                file={url}
                loading={
                    <div className="w-full h-full flex items-center justify-center bg-white/5 animate-pulse">
                        <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                    </div>
                }
                error={
                    <div className="w-full h-full flex items-center justify-center bg-[#001F3F]">
                        <span className="text-white/30 text-xs uppercase tracking-widest font-bold">Preview Unavailable</span>
                    </div>
                }
                className="w-full h-full flex items-center justify-center"
            >
                <Page
                    pageNumber={pageNumber}
                    height={400}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="opacity-70 w-full! h-full! object-cover"
                />
            </Document>
        </div>
    );
}
