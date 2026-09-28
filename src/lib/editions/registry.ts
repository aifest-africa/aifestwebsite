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
import type { TeamMember } from "./types";

type BoardMemberRecord = {
    id?: string | number;
    name: string;
    role: string;
    bio?: string;
    image_path?: string | null;
    category?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    portfolio?: string;
    github?: string;
};

/** Aggregate team members across all editions, optionally filtered by year */
export function getTeamMembers(year?: number): TeamMember[] {
    const editions = year ? allEditions.filter((e) => e.year === year) : allEditions;

    // Get edition-specific members
    const editionMembers: TeamMember[] = editions.flatMap((e) =>
        (e.team ?? []).map((member) => ({
            ...member,
            editionYear: e.year,
        }))
    );

    // Get global board members
    const boardTeam = (boardData.team ?? []) as BoardMemberRecord[];
    const boardMembers: TeamMember[] = boardTeam.map((member) => ({
        id: member.id ?? member.name,
        name: member.name,
        role: member.role,
        bio: member.bio,
        image_path: member.image_path,
        category: member.category ?? "board",
        linkedin: member.linkedin,
        twitter: member.twitter,
        email: member.email,
        portfolio: member.portfolio,
        github: member.github,
        editionYear: "Global",
    }));

    // If a specific year is requested, only return that year's members + board members
    // If no year is requested, return all members + board members
    return [...boardMembers, ...editionMembers];
}
