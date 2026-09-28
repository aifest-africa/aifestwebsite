/** A team member for a given edition */
export interface TeamMember {
    id: string | number;
    name: string;
    role: string;
    bio?: string;
    image_path?: string | null;
    /** 
     * Category of team member. Board members (category: 'board' or 'organizer') 
     * are displayed at the top of the teams page as leadership.
     * Valid values: board | organizer | volunteer | mentor | speaker | judge | member | campus_ambassador
     */
    category: string;
    /** Links this member to a specific edition year, or "Global" for board */
    editionYear?: number | string;
    /** 
     * Social media and contact links for the team member.
     * Supported platforms: linkedin, twitter, email, portfolio, github
     * All platforms are optional.
     */
    social_links?: { platform: string; url: string }[];

    // Flat properties for easier admin editing
    github?: string;
    portfolio?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
}

/** A gallery image stored locally */
export interface GalleryImage {
    id: string | number;
    image_path: string;
    caption?: string | null;
    alt?: string | null;
    /** 
     * Sort order for display. 
     * Images with sort_order 0-4 are considered hero images and should be 
     * transformed into the heroImages array when saving edition data.
     * Images with sort_order >= 5 are secondary gallery images.
     */
    sort_order?: number;
}

/** A hero slideshow image */
export interface HeroImage {
    image_path: string;
    sort_order?: number;
}

/** A partner / sponsor logo */
export interface Partner {
    name: string;
    logo: string; // local path e.g. /2025/assets/partners/amalitech.png
    href?: string;
}

/** A prize winner */
export interface Winner {
    name: string;
    team?: string;
    track: string;
    project: string;
    prize?: number;
    placement: 1 | 2 | 3 | number;
}

/** Edition statistics */
export interface EditionStats {
    participants?: number;
    universities?: number;
    projects?: number;
    countries?: number;
    partners?: number;
    /** Numeric UGX prize pool for aggregation on past-editions page */
    prizePool?: number;
}

/** Timeline roadmap item */
export interface TimelineItem {
    title: string;
    date: string;
    color: string;
    textColor: string;
    badgeColor: string;
    large?: boolean;
}

/** FAQ accordion item */
export interface FAQItem {
    question: string;
    answer: string;
}

/** Venue information */
export interface Venue {
    name: string;
    address: string;
    poBox?: string;
    city: string;
    phone?: string;
    email?: string;
}

/** Upcoming event callout block */
export interface UpcomingEvent {
    title: string;
    date: string;
    time: string;
    description: string;
    rsvpUrl: string;
    imagePath: string;
}

/** Homepage carousel image */
export interface CarouselImage {
    id: string | number;
    image_path: string;
    caption?: string | null;
    link_url?: string | null;
}

/**
 * Per-edition colour theme.
 * Fonts stay consistent site-wide (Blanka headings, system body).
 * Only colours differ between editions.
 *
 * All values are raw CSS colour strings (hex, hsl, oklch, etc.)
 * or Tailwind arbitrary-value strings like "#00D9FF".
 */
export interface EditionTheme {
    /** Primary brand colour (buttons, highlights) */
    primary: string;
    /** Text on primary background */
    primaryForeground: string;
    /** Secondary accent colour */
    accent: string;
    /** Text on accent background */
    accentForeground?: string;
    /** Dark background used in cards / hero overlays */
    surfaceDark: string;
    /** Light background for containers on light mode */
    surfaceLight?: string;
    /** Tailwind gradient classes applied across hero sections, e.g. "from-[#000d1a] to-[#001224]" */
    heroGradient?: string;
}

/** Default 2026 theme — cyan on navy */
export const DEFAULT_THEME: EditionTheme = {
    primary: "#00D9FF",
    primaryForeground: "#001F3F",
    accent: "#4285F4",
    accentForeground: "#ffffff",
    surfaceDark: "#001F3F",
    surfaceLight: "#f0f9ff",
    heroGradient: "from-[#000d1a] via-[#001224] to-[#000d1a]",
};

/** Full edition data — one per year */
export interface EditionData {
    year: number;
    slug: string;               // matches the app folder name e.g. "2026"
    published: boolean;
    featured?: boolean;

    /**
     * Optional per-edition colour theme. Falls back to DEFAULT_THEME when not set.
     * Fonts (Blanka headings, system body) are always consistent across editions.
     */
    theme?: Partial<EditionTheme>;

    // Page content
    heroTitle: string;
    heroSubtitle?: string;
    /** 
     * Hero slideshow images. These are typically populated from gallery images 
     * with sort_order 0-4 via the admin gallery management interface.
     */
    heroImages?: HeroImage[];   // slideshow images
    heroImage?: string;         // single featured image (first from heroImages if not set)
    registrationImage?: string;
    registrationUrl?: string;

    // Edition overview
    title: string;              // "Inter-University Hackathon 2026"
    summary?: string;
    themes?: string[];
    outcomes?: string[];

    // Decks & reports
    sponsorshipDeckUrl?: string;
    sponsorshipDeckPreview?: string;
    sponsorshipDeckLabel?: string;
    infoSessionDeckUrl?: string;
    infoSessionDeckPreview?: string;
    infoSessionDeckLabel?: string;
    impactReportUrl?: string;
    impactReportPreview?: string;
    reportHighlights?: string[];
    lastYearReportUrl?: string;
    lastYearReportPreview?: string;
    lastYearReportYear?: string;
    prototypeSubmissionUrl?: string;
    agendaImage?: string;
    agendaUrl?: string;
    photoGalleryUrl?: string;
    rawPhotosUrl?: string;
    collegeEndorsementUrl?: string;

    // Content sections
    timeline?: TimelineItem[];
    faqs?: FAQItem[];
    venue?: Venue;
    upcomingEvent?: UpcomingEvent;

    // People & organisations
    team?: TeamMember[];
    partners?: Partner[];
    winners?: Winner[];
    /** Universities that took part in this edition */
    participatingUniversities?: string[];

    // Media
    gallery?: GalleryImage[];
    carouselImages?: CarouselImage[];
    statistics?: EditionStats;
}
