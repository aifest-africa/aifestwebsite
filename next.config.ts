import type { NextConfig } from "next";

// @ts-expect-error next-pwa types are missing
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/app-build-manifest\.json$/],
});

const mediaBase = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "").replace(/\/$/, "");
let mediaHostname: string | null = null;
try {
  mediaHostname = mediaBase ? new URL(mediaBase).hostname : null;
} catch {
  mediaHostname = null;
}

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [];

if (mediaHostname) {
  remotePatterns.push({
    protocol: "https",
    hostname: mediaHostname,
    pathname: "/gallery/**",
  });
}

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {},
  transpilePackages: [],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns,
  },
  async rewrites() {
    if (!mediaBase) return [];
    // Keep app paths as /media/... while files live in Neon under edition folders
    return [
      {
        source: "/media/:path*",
        destination: `${mediaBase}/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' https://www.youtube.com https://youtube.com;",
          },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "@splinetool/react-spline"],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default withPWA(nextConfig);
