import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  buckets: {
    // Public site media; objects keyed by edition folder: 2025/, 2026/, shared/
    gallery: { access: "public_read" },
  },
});
