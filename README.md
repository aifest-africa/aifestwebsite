# AIFEST Website

Public site for **AIFEST** (Artificial Intelligence Festival) — editions, gallery, team, resources, and get-involved flows.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind 4 · Neon Postgres + Object Storage

Repo: [aifest-africa/aifestwebsite](https://github.com/aifest-africa/aifestwebsite)

---

## Prerequisites

| Tool | Notes |
| --- | --- |
| **Node.js 22+** | Use `.nvmrc` → `nvm use` |
| **npm** | Comes with Node |
| **Neon CLI** | `npm i -g neon@latest` — project link + env pull |
| **AWS CLI v2** | Only required to upload/sync media |

---

## Quick start

```bash
git clone https://github.com/aifest-africa/aifestwebsite.git
cd aifestwebsite
nvm use
npm install
cp .env.example .env.local
```

Fill `.env.local` (see [Environment](#environment)):

```bash
# If the repo is already linked to Neon:
neon deploy
neon env pull

# Then set the public media base (no trailing slash):
# NEXT_PUBLIC_MEDIA_BASE_URL={AWS_ENDPOINT_URL_S3}/gallery
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Before a PR:

```bash
npm run lint
npm run build
```

---

## Environment

Copy [`.env.example`](./.env.example) → `.env.local`. **Never commit** `.env.local` or `.neon`.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon pooled Postgres URL |
| `DATABASE_URL_UNPOOLED` | Neon direct Postgres URL |
| `NEON_BRANCH` | Usually `production` |
| `AWS_ENDPOINT_URL_S3` | Neon Object Storage endpoint |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | Storage credentials |
| `AWS_REGION` | e.g. `us-east-2` |
| `S3_BUCKET_NAME` | `gallery` |
| `NEXT_PUBLIC_MEDIA_BASE_URL` | `{AWS_ENDPOINT_URL_S3}/gallery` |

`NEXT_PUBLIC_MEDIA_BASE_URL` powers `/media/...` rewrites and `mediaUrl()` in [`src/lib/media.ts`](./src/lib/media.ts).

---

## Media (Neon Object Storage)

Large assets are **not** stored in git. They live in the Neon bucket `gallery` (`public_read`), with **one top-level folder per edition**:

```text
gallery/
  2025/          # edition media (gallery, team, partners, decks, …)
  2026/
  shared/        # cross-edition only
    partners/    # Makerere University + GDG on Campus Makerere only
```

Edition-specific partner logos live under `{year}/partners/`, not in `shared/`.

### Upload / refresh media

From a local tree shaped like `public/media` (`2025/`, `2026/`, `shared/`):

```bash
npm run media:upload
# or:
MEDIA_SOURCE_DIR=/path/to/public/media npm run media:upload
```

App code keeps paths like `/media/2025/gallery/photo.jpg`. Next.js rewrites those to Neon. Prefer `mediaUrl()` when you need an absolute URL.

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server (webpack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run media:upload` | Sync edition folders → Neon `gallery` |
| `npm run generate-favicons` | Regenerate favicons |

### Neon CLI

```bash
neon deploy      # apply neon.ts (bucket policy)
neon env pull    # refresh credentials into .env.local
```

---

## Project layout

```text
src/
  app/                 # App Router pages (/, /gallery, /2025, /2026, …)
  components/
    layout/            # header, footer, theme, chrome
    hero/              # heroes & slideshows
    gallery/           # photo gallery & carousels
    edition/           # edition pages, winners, video recap
    partners/          # partners & partnership tiers
    home/              # homepage / get-involved blocks
    effects/           # scroll-reveal, magnetic-card, …
    content/           # markdown helpers
    forms/             # involvement & newsletter forms
    teams/             # team grid & speaker modal
    ui/                # low-level UI primitives
  lib/
    editions/          # registry + types
    media.ts           # Neon media URL helper
    static/            # site.json, board.json
neon.ts                # Neon infra (gallery bucket)
scripts/               # media upload, favicons
skills/                # Neon agent skills (neon + object-storage)
docs/                  # architecture notes
```

Edition content: `src/app/{year}/data.json` + `data.ts`.

---

## Docs

| Doc | What it’s for |
| --- | --- |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Branching, PRs, media rules, no AI commit trailers |
| [docs/architecture.md](./docs/architecture.md) | Editions, media URL scheme, partners |
| [docs/cicd-vercel.md](./docs/cicd-vercel.md) | Vercel deploy, CI, firewall, require up-to-date with `main` |
| [AGENTS.md](./AGENTS.md) | Guidance for coding agents (Next.js + Neon) |

## CI / Vercel

PRs to `main` run GitHub Actions (**lint + build**) and fail if the branch is **behind `main`**. Production deploys from `main` on Vercel.

See [docs/cicd-vercel.md](./docs/cicd-vercel.md) for connecting Vercel, enabling Firewall, and (org admin) branch protection “Require branches to be up to date before merging”.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Short version:

1. Branch from `main`.
2. Keep PRs focused; merge/rebase `origin/main` so CI’s “Up to date with main” check passes.
3. Run `lint` + `build`.
4. Do not commit secrets, `public/media`, or Cursor `Co-authored-by` trailers.
