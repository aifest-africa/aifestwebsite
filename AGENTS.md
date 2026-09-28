<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:neon-agent-rules -->

# Neon

Linked project `fragrant-queen-22807485` (branch `production`). Bucket `gallery` is `public_read`.

Object keys are **edition folders**: `2025/`, `2026/`, `shared/`. App paths `/media/{edition}/...` rewrite to Neon.

Skills to read:

- `skills/neon`
- `skills/neon-object-storage`

Config: `neon.ts`. Upload: `npm run media:upload`. Credentials: `.env.local` (never commit).

<!-- END:neon-agent-rules -->
