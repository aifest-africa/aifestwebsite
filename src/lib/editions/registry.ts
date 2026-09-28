/**
 * Edition Registry — the single source of truth for all editions.
 *
 * To add a new year:
 *  1. Create src/app/[year]/ folder following the editionTemplate structure.
 *  2. Fill in [year]/data.ts.
 *  3. Import and add to `allEditions` below.
 */

import { edition2026 } from "../../app/2026/data";
import { edition2025 } from "../../app/2025/data";

import type { EditionData } from "./types";

/** All published editions, newest first */
export const allEditions: EditionData[] = [edition2026, edition2025];

/** The edition that is currently live / being promoted */
export const currentEdition: EditionData = edition2026;

/** The edition marked as featured (used for homepage callouts) */
export const featuredEdition: EditionData = allEditions.find((e) => e.featured) ?? allEditions[0];

/** Look up an edition by year number */
export function getEditionByYear(year: number): EditionData | null {
    return allEditions.find((e) => e.year === year) ?? null;
}

/** Aggregate gallery images across all editions */
export function getAllGalleryImages() {
    return allEditions.flatMap((e) =>
        (e.gallery ?? []).map((img) => ({
            ...img,
            editionYear: e.year,
            editionSlug: e.slug,
        }))
    );
}

import boardData from "../static/board.json";

/** Aggregate team members across all editions, optionally filtered by year */
export function getTeamMembers(year?: number) {
    const editions = year ? allEditions.filter((e) => e.year === year) : allEditions;

    // Get edition-specific members
    const editionMembers = editions.flatMap((e) =>
        (e.team ?? []).map((member) => ({
            ...member,
            editionYear: e.year,
        }))
    );

    // Get global board members
    const boardMembers = ((boardData.team || []) as any[]).map((member) => ({
        ...member,
        editionYear: "Global",
        category: "board",
    }));

    // If a specific year is requested, only return that year's members + board members
    // If no year is requested, return all members + board members
    const finalMembers = [...boardMembers, ...editionMembers] as any[];

    return finalMembers;
}
