"use client";

import { motion } from "framer-motion";

interface FilterSidebarProps {
    editions: { year: number; title: string }[];
    selectedEdition: number | null;
    selectedCategory: string;
    onEditionChange: (year: number | null) => void;
    onCategoryChange: (category: string) => void;
}

const categories = [
    { value: "all", label: "All" },
    { value: "speaker", label: "Speakers & Hosts" },
    { value: "organizer", label: "Organisers" },
    { value: "judge", label: "Judges" },
    { value: "mentor", label: "Mentors" },
    { value: "campus_ambassador", label: "Campus Ambassadors" },
];

export function TeamFilterSidebar({
    editions,
    selectedEdition,
    selectedCategory,
    onEditionChange,
    onCategoryChange,
}: FilterSidebarProps) {
    return (
        <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-24 h-fit space-y-6"
        >
            {/* Edition Filter */}
            <div className="bg-white dark:bg-[#001224] rounded-2xl p-6 border border-[#00D9FF]/20 shadow-sm">
                <h3 className="text-sm font-bold text-[#001F3F] dark:text-white uppercase tracking-wider mb-4">
                    Edition
                </h3>
                <div className="space-y-2">
                    {editions.map((edition) => (
                        <button
                            key={edition.year}
                            onClick={() => onEditionChange(edition.year)}
                            className={`w-full text-left px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${selectedEdition === edition.year
                                ? "bg-[#00D9FF] text-[#001F3F]"
                                : "bg-white/50 dark:bg-white/5 text-[#001F3F] dark:text-white/70 hover:bg-[#00D9FF]/10 hover:text-[#00D9FF]"
                                }`}
                        >
                            {edition.year}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white dark:bg-[#001224] rounded-2xl p-6 border border-[#00D9FF]/20 shadow-sm">
                <h3 className="text-sm font-bold text-[#001F3F] dark:text-white uppercase tracking-wider mb-4">
                    Category
                </h3>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <button
                            key={category.value}
                            onClick={() => onCategoryChange(category.value)}
                            className={`w-full text-left px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${selectedCategory === category.value
                                ? "bg-[#00D9FF] text-[#001F3F]"
                                : "bg-white/50 dark:bg-white/5 text-[#001F3F] dark:text-white/70 hover:bg-[#00D9FF]/10 hover:text-[#00D9FF]"
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>
        </motion.aside>
    );
}
