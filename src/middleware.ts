import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Block common probe / exploit path patterns. */
const BLOCKED_PATH =
  /^\/(\.env|\.git|wp-admin|wp-login|xmlrpc\.php|phpmyadmin|vendor\/phpunit|actuator|server-status)(\/|$)/i;

/**
 * Edge middleware: light request firewall + security headers on every response.
 * Heavier WAF / bot fight belongs on Vercel Firewall (see docs/cicd-vercel.md).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (BLOCKED_PATH.test(pathname)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // Reject obvious scanner query payloads early
  const qs = request.nextUrl.search.toLowerCase();
  if (
    qs.includes("<script") ||
    qs.includes("%3cscript") ||
    qs.includes("javascript:") ||
    qs.includes("../") ||
    qs.includes("%2e%2e")
  ) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const response = NextResponse.next();

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  );
  response.headers.set("X-DNS-Prefetch-Control", "on");

  return response;
}

export const config = {
  matcher: [
    /*
     * Run on all paths except Next internals and static file extensions.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|js|css|map|txt|xml|webmanifest)$).*)",
  ],
};
