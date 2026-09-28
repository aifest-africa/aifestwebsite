"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/ui"

export function ThemeToggle({ className }: { className?: string }) {
    const { setTheme, theme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
                "relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/50 backdrop-blur-sm transition-all hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
                className
            )}
            aria-label="Toggle theme"
        >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-cyan-400" />
        </button>
    )
}
