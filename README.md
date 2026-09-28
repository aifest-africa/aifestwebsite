# AIFEST Website

Public marketing site for [AIFEST](https://aifest.africa) — Next.js App Router, Neon Postgres + Object Storage.

## Requirements

- Node.js **22+** (see `.nvmrc`)
- Neon project linked (Object Storage bucket `gallery`, `public_read`)
- AWS CLI v2 (only needed to upload media)

```bash
nvm use
npm install
cp .env.example .env.local
# then: neon link … && neon deploy   OR paste Console values into .env.local
```

Set `NEXT_PUBLIC_MEDIA_BASE_URL` to `{AWS_ENDPOINT_URL_S3}/gallery` (no trailing slash).

```bash
npm run dev
```

## Media (Neon Object Storage)

Large media is **not** in git. It lives in the `gallery` bucket with **one folder per edition**:

```text
gallery/
  2025/     # edition assets (gallery, team, decks, …)
  2026/
  shared/   # cross-edition assets
```

Upload / refresh from a local copy of `v1/web/public/media`:

```bash
npm run media:upload
# optional: MEDIA_SOURCE_DIR=/path/to/public/media npm run media:upload
```

App paths stay `/media/2025/...`; Next.js rewrites them to Neon. Use `mediaUrl()` from `src/lib/media.ts` when you need an absolute URL.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` / `start` | Production build |
| `npm run lint` | ESLint |
| `npm run media:upload` | Sync edition folders to Neon |
| `npm run generate-favicons` | Favicon pipeline |

## Project layout

```text
src/app/                 # routes
src/components/
  layout/                # header, footer, theme, chrome
  hero/                  # heroes & slideshows
  gallery/               # gallery & carousels
  edition/               # edition pages, winners, video recap
  partners/              # partners & partnership tiers
  home/                  # homepage / get-involved blocks
  effects/               # motion helpers (scroll, magnetic)
  content/               # markdown helpers
  forms/ teams/ ui/      # existing domains
src/lib/                 # editions data, media helper, utils
skills/                  # Neon agent skills
neon.ts                  # Neon infra (gallery bucket)
scripts/                 # media upload, favicons
```

## Docs

- [CONTRIBUTING.md](./CONTRIBUTING.md) — collaboration & PR checklist
- [docs/architecture.md](./docs/architecture.md) — editions + media URL scheme
- [AGENTS.md](./AGENTS.md) — agent guidance (Next.js + Neon)

## Neon

```bash
neon deploy          # apply neon.ts
neon env pull        # refresh .env.local credentials
```
