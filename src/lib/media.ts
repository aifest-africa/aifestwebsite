/**
 * Resolve media paths to Neon Object Storage (public_read gallery bucket).
 *
 * Bucket layout (edition folders):
 *   2025/...   2026/...   shared/...
 *
 * App paths stay `/media/2025/...` for compatibility; this helper maps them to:
 *   `${NEXT_PUBLIC_MEDIA_BASE_URL}/2025/...`
 *
 * NEXT_PUBLIC_MEDIA_BASE_URL should be `{AWS_ENDPOINT_URL_S3}/gallery` (no trailing slash).
 */
export function mediaUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  const base = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "").replace(/\/$/, "");
  let relative = path.startsWith("/") ? path : `/${path}`;

  // /media/2025/gallery/x.jpg → /2025/gallery/x.jpg
  if (relative.startsWith("/media/")) {
    relative = relative.slice("/media".length);
  }

  if (!base) {
    // Local fallback when env is unset (expects files under public/media)
    return relative.startsWith("/media") ? relative : `/media${relative}`;
  }

  return `${base}${relative}`;
}

/** Hostname of the Neon storage endpoint (for next/image remotePatterns). */
export function mediaHostname(): string | null {
  const base = process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "";
  try {
    return base ? new URL(base).hostname : null;
  } catch {
    return null;
  }
}
