"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/ui";

type ImageItem = {
  id: string;
  src: string;
  caption: string | null;
  alt: string | null;
};

export function ScatteredGallery({ images }: { images: ImageItem[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Create scattered layout with varying sizes
  const getSizeClass = (idx: number) => {
    const pattern = idx % 7;
    if (pattern === 0 || pattern === 3) return "md:col-span-2 md:row-span-2";
    if (pattern === 1 || pattern === 5) return "md:col-span-1 md:row-span-1";
    return "md:col-span-1 md:row-span-2";
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
      {images.map((img, idx) => (
        <motion.div
          key={img.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: idx * 0.05 }}
          className={cn(
            "group relative overflow-hidden rounded-2xl cursor-pointer",
            getSizeClass(idx)
          )}
          onClick={() => setSelectedId(selectedId === img.id ? null : img.id)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt ?? img.caption ?? "Gallery image"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {(img.caption || selectedId === img.id) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex items-end"
            >
              {img.caption && (
                <p className="text-sm font-medium text-white">{img.caption}</p>
              )}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
