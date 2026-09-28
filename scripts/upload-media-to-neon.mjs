#!/usr/bin/env node
/**
 * Upload v1/web public/media into Neon Object Storage (bucket: gallery),
 * with each edition in its own top-level folder:
 *
 *   gallery/2025/...
 *   gallery/2026/...
 *   gallery/shared/...
 *
 * Usage (from aifestwebsite root):
 *   npm run media:upload
 *
 * Env (from .env.local):
 *   AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_ENDPOINT_URL_S3,
 *   AWS_REGION, S3_BUCKET_NAME
 */

import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, statSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

function loadEnvLocal() {
  const envPath = join(root, ".env.local");
  if (!existsSync(envPath)) {
    throw new Error("Missing .env.local — run `neon env pull` or `neon deploy` first.");
  }
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const eq = trimmed.indexOf("=");
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const required = [
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "AWS_ENDPOINT_URL_S3",
  "AWS_REGION",
];
for (const key of required) {
  if (!process.env[key]) throw new Error(`Missing env var: ${key}`);
}

const bucket = process.env.S3_BUCKET_NAME || "gallery";
const endpoint = process.env.AWS_ENDPOINT_URL_S3;
const sourceRoot =
  process.env.MEDIA_SOURCE_DIR ||
  resolve(
    root,
    "../../Projects/aifest/v1/web/public/media"
  );

// Allow override via absolute path commonly used on this machine
const fallbackSource = "/home/dev-kiran/Desktop/Projects/aifest/v1/web/public/media";
const mediaRoot = existsSync(sourceRoot)
  ? sourceRoot
  : existsSync(fallbackSource)
    ? fallbackSource
    : null;

if (!mediaRoot) {
  throw new Error(
    `Media source not found.\nTried:\n  ${sourceRoot}\n  ${fallbackSource}\nSet MEDIA_SOURCE_DIR to the local public/media folder.`
  );
}

/** Edition folders uploaded as top-level bucket prefixes (same name). */
const EDITION_FOLDERS = ["2025", "2026", "shared"];

const SKIP_EXT = new Set([".heic", ".HEIC"]);

function aws(args, { quiet = false } = {}) {
  const result = spawnSync(
    "aws",
    [
      "s3",
      ...args,
      "--endpoint-url",
      endpoint,
      "--region",
      process.env.AWS_REGION,
    ],
    {
      env: process.env,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    }
  );
  if (result.status !== 0) {
    const err = (result.stderr || result.stdout || "").trim();
    throw new Error(`aws s3 ${args[0]} failed:\n${err}`);
  }
  if (!quiet && result.stdout?.trim()) process.stdout.write(result.stdout);
  return result;
}

function shouldExclude(name) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".heic")) return true;
  if (lower === ".gitkeep" || lower === ".ds_store") return true;
  return false;
}

console.log(`Source:  ${mediaRoot}`);
console.log(`Bucket:  s3://${bucket}`);
console.log(`Endpoint:${endpoint}`);
console.log(`Folders: ${EDITION_FOLDERS.join(", ")} (each edition = own prefix)\n`);

for (const folder of EDITION_FOLDERS) {
  const localDir = join(mediaRoot, folder);
  if (!existsSync(localDir) || !statSync(localDir).isDirectory()) {
    console.warn(`Skip missing edition folder: ${folder}`);
    continue;
  }

  // Exclude HEIC via multiple --exclude patterns
  const excludes = ["*.HEIC", "*.heic", ".DS_Store", "**/.DS_Store"];
  const excludeArgs = excludes.flatMap((p) => ["--exclude", p]);

  console.log(`→ Syncing edition "${folder}/" → s3://${bucket}/${folder}/`);
  aws([
    "sync",
    localDir,
    `s3://${bucket}/${folder}`,
    ...excludeArgs,
    "--only-show-errors",
    "--cache-control",
    "public, max-age=31536000, immutable",
  ]);
  console.log(`  done: ${folder}/`);
}

console.log("\nListing top-level prefixes in bucket:");
aws(["ls", `s3://${bucket}/`]);

const sample = join(mediaRoot, "2026", "gallery");
if (existsSync(sample)) {
  const first = readdirSync(sample).find((f) => !shouldExclude(f) && /\.(jpe?g|png|webp)$/i.test(f));
  if (first) {
    const key = `2026/gallery/${first}`;
    const url = `${endpoint.replace(/\/$/, "")}/${bucket}/${key}`;
    console.log(`\nSample public URL:\n  ${url}`);
  }
}

console.log("\nUpload complete.");
