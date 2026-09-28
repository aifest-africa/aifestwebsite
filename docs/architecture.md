# Architecture

## Stack

- **Next.js** (App Router) + React 19 + Tailwind 4
- **Neon** Postgres + Object Storage (S3-compatible)
- Edition content as typed JSON under `src/app/{year}/`

## Editions

`src/lib/editions/registry.ts` aggregates published editions (`edition2026`, `edition2025`, …). Each edition folder has `data.json` / `data.ts` for gallery, team, partners, and page copy.

## Media URL scheme

Local/git does **not** store `public/media`. Objects live in Neon bucket `gallery` (`public_read`):

| App path | Object key |
| --- | --- |
| `/media/2025/gallery/a.jpg` | `2025/gallery/a.jpg` |
| `/media/2026/team/x.png` | `2026/team/x.png` |
| `/media/shared/about/y.jpg` | `shared/about/y.jpg` |

`NEXT_PUBLIC_MEDIA_BASE_URL` = `{AWS_ENDPOINT_URL_S3}/gallery`

- **Rewrites** in `next.config.ts` proxy `/media/:path*` → `${NEXT_PUBLIC_MEDIA_BASE_URL}/:path*`
- **`mediaUrl()`** in `src/lib/media.ts` builds absolute URLs when needed
- Upload with `npm run media:upload` (syncs each edition folder separately)

## Out of scope here

Judges portal lives elsewhere / was not migrated into this repo.
