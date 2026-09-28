"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/ui";

type CarouselImage = {
  id: string | number;
  image_path: string;
  caption?: string | null;
};

export function ImageCarousel({ images }: { images: CarouselImage[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  if (!images.length) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-black/[.02] dark:bg-white/[.02] aifest-fade-in">
      <div className="relative h-48 sm:h-56 md:h-64">
        {images.map((img, idx) => (
          <div
            key={img.id}
            className={cn(
              "absolute inset-0 transition-all duration-700 ease-in-out",
              idx === current
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            )}
          >
            <img
              src={img.image_path}
              alt={img.caption || ""}
              className="h-full w-full object-cover"
            />
            {img.caption ? (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                <p className="text-xs sm:text-sm text-white/90">{img.caption}</p>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {images.length > 1 ? (
        <>
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 sm:p-2 shadow-lg transition-all hover:bg-white hover:scale-110 dark:bg-black/90 dark:hover:bg-black"
            aria-label="Previous image"
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 sm:p-2 shadow-lg transition-all hover:bg-white hover:scale-110 dark:bg-black/90 dark:hover:bg-black"
            aria-label="Next image"
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={cn(
                  "h-1.5 sm:h-2 rounded-full transition-all duration-300",
                  idx === current
                    ? "w-6 sm:w-8 bg-white dark:bg-white"
                    : "w-1.5 sm:w-2 bg-white/50 hover:bg-white/70 dark:bg-white/50 dark:hover:bg-white/70"
                )}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

