/**
 * Static site-wide configuration — replaces the Supabase site_settings table.
 * Edit this file to update brand, nav, footer, announcements, and homepage settings.
 */

export interface NavLink { label: string; href: string; }
export interface FooterLink { label: string; href: string; }
export interface Social { platform: string; href: string; label?: string; }
export interface PartnerLogo { path: string; alt?: string; href?: string; }
export interface HomeCard { title: string; desc: string; href: string; }

export interface SiteSettings {
    brand_name: string;
    brand_tagline: string | null;
    logo_path: string | null;
    default_meta_title: string | null;
    default_meta_description: string | null;

    // Announcement bar
    announcement_enabled: boolean;
    announcement_badge: string | null;
    announcement_text: string | null;
    announcement_primary_label: string | null;
    announcement_primary_href: string | null;
    announcement_secondary_label: string | null;
    announcement_secondary_href: string | null;

    // Navigation
    nav_links: NavLink[];

    // Footer
    footer_blurb: string | null;
    footer_links: FooterLink[];
    footer_note: string | null;
    contact_email: string | null;
    socials: Social[];

    // Homepage
    credibility_items: string[];
    home_badge: string | null;
    home_status: string | null;
    home_primary_cta_label: string | null;
    home_primary_cta_href: string | null;
    home_secondary_cta_label: string | null;
    home_secondary_cta_href: string | null;
    home_tertiary_cta_label: string | null;
    home_tertiary_cta_href: string | null;
    home_cards: HomeCard[];
    partner_logos: PartnerLogo[];

    // Campaigns
    registration_enabled: boolean;
    registration_url: string | null;
    registration_label: string | null;
    campaign_signups: number;
    campaign_teams: number;
}

import settingsJson from "./site.json";

export const siteSettings: SiteSettings = settingsJson as SiteSettings;

/** Singleton getter — matches the old async API signature for easy drop-in replacement */
export function getSiteSettings(): SiteSettings {
    return siteSettings;
}
