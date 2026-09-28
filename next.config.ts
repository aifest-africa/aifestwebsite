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

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      // Next.js + analytics + Spline runtime
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://prod.spline.design",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://*.neon.tech https://*.aws.neon.tech https://va.vercel-scripts.com https://prod.spline.design https://*.spline.design",
      "media-src 'self' blob: https://*.neon.tech https://*.aws.neon.tech",
      "worker-src 'self' blob:",
      "frame-src 'self' https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

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
        headers: securityHeaders,
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
