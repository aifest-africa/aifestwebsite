/**
 * content.ts — Static data layer replacing Supabase.
 *
 * All data now comes from:
 *   - lib/static/site.ts       → brand, nav, footer, homepage settings
 *   - lib/static/why-attend.ts → why-attend carousel items
 *   - lib/editions/registry.ts → all editions (team, gallery, partners, etc.)
 */

export { getSiteSettings } from "./static/site";
export type { SiteSettings } from "./static/site";

export {
  allEditions,
  currentEdition,
  featuredEdition,
  getEditionByYear,
  getAllGalleryImages,
  getTeamMembers,
} from "./editions/registry";

export type { EditionData, TeamMember, GalleryImage, Partner, Winner, TimelineItem, FAQItem } from "./editions/types";

// ─── Homepage Carousel ────────────────────────────────────────────────────────
import { currentEdition as _current } from "./editions/registry";
import type { CarouselImage } from "./editions/types";

export function getHomepageCarousel(): CarouselImage[] {
  return _current.carouselImages ?? [];
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
import { getAllGalleryImages as _gallery } from "./editions/registry";

export function getGalleryImages() {
  return _gallery().map((img) => ({
    id: String(img.id),
    image_path: img.image_path,
    caption: img.caption ?? null,
    alt: img.alt ?? null,
    sort_order: img.sort_order ?? 0,
  }));
}

// ─── Why Attend ───────────────────────────────────────────────────────────────
import { whyAttendItems } from "./static-data/why-attend";

export function getWhyAttendItems() {
  return whyAttendItems;
}

// ─── Utility ─────────────────────────────────────────────────────────────────
export function publicMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("/")) return path;
  if (path.startsWith("http")) return path;
  return `/media/${path}`;
}
