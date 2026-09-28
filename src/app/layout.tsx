import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnimatedTextFooter } from "../components/layout/animated-text-footer";
import { SiteHeader } from "../components/layout/site-header";
import { getSiteSettings } from "../lib/content";
import { BottomBranding } from "../components/layout/bottom-branding";
import { Analytics } from "@vercel/analytics/next"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function safeLinks(
  v: unknown,
): { href: string; label: string; highlight?: boolean }[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((x) => x as Record<string, unknown>)
    .filter((x) => x && typeof x.href === "string" && typeof x.label === "string")
    .map((x) => ({
      href: x.href as string,
      label: x.label as string,
      highlight: Boolean(x.highlight),
    }));
}

function safeFooterLinks(v: unknown): { href: string; label: string }[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((x) => x as Record<string, unknown>)
    .filter((x) => x && typeof x.href === "string" && typeof x.label === "string")
    .map((x) => ({ href: x.href as string, label: x.label as string }));
}

export function generateMetadata(): Metadata {
  const s = getSiteSettings();
  return {
    title: s.default_meta_title ?? s.brand_name ?? "AIFEST",
    description: s.default_meta_description ?? undefined,
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

export const generateViewport = () => {
  return {
    themeColor: "#00D9FF",
  };
}

import { ThemeProvider } from "../components/layout/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutFrame>{children}</LayoutFrame>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

function LayoutFrame({ children }: { children: React.ReactNode }) {
  const s = getSiteSettings();
  const logoUrl = null;

  const navLinks = safeLinks(s.nav_links);

  // Ensure required links are present in Navbar
  const requiredNavLinks = [
    { href: "/", label: "Home" },
    { href: "/past-editions", label: "Past Editions" },
    { href: "/resources", label: "Resources" },
    { href: "/teams", label: "Team" },
  ];

  let nav = [...navLinks];
  for (const req of requiredNavLinks) {
    if (!nav.some(link => link.href === req.href)) {
      if (req.href === "/") {
        nav = [req, ...nav];
      } else {
        nav.push(req);
      }
    }
  }

  const footerLinksData = safeFooterLinks(s.footer_links);
  const footerLinks = [...footerLinksData];

  // Ensure required links are present in Footer
  const requiredFooterLinks = [
    { href: "/resources", label: "Resources" },
    { href: "/teams", label: "Team" },
  ];

  for (const req of requiredFooterLinks) {
    if (!footerLinks.some(link => link.href === req.href)) {
      footerLinks.push(req);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        brandName={s.brand_name}
        logoUrl={logoUrl}
        nav={nav}
      />
      <div className="flex-1 relative">
        {children}
      </div>
      <BottomBranding />
      <AnimatedTextFooter
        brandName={s.brand_name}
        footerBlurb={s.footer_blurb}
        footerLinks={footerLinks}
        footerNote={s.footer_note}
      />
    </div>
  );
}
