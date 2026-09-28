# Contributing

Thanks for helping with the AIFEST website.

## Quick start

1. Use Node 22 (`nvm use`).
2. `npm install`
3. Copy `.env.example` → `.env.local` and fill Neon values (`neon deploy` / Console).
4. Ensure `NEXT_PUBLIC_MEDIA_BASE_URL={AWS_ENDPOINT_URL_S3}/gallery`.
5. `npm run dev`

Never commit `.env.local`, `.neon`, or files under `public/media`.

## Media

Media is stored in Neon Object Storage (`gallery` bucket), **one top-level folder per edition** (`2025/`, `2026/`, `shared/`).

To refresh objects from a local media tree:

```bash
npm run media:upload
```

Do not add large binaries to git.

## Branches & PRs

- Branch from `setup` / `main` with a short name (`feat/…`, `fix/…`).
- Keep PRs focused (one concern).
- Before opening a PR:
  - [ ] `npm run lint`
  - [ ] `npm run build`
  - [ ] No secrets in the diff
  - [ ] No Cursor / AI `Co-authored-by` trailers in commits

## Code style

- Follow existing patterns in `src/app` and `src/components`.
- Prefer the shared media helper / `/media/...` paths instead of hard-coding Neon URLs.
- Edition content lives in `src/app/{year}/data.json` + `data.ts`.
