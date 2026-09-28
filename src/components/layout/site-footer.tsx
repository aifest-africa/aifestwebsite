import type React from "react";
import Link from "next/link";
import { Container } from "@/lib/ui";

type FooterLinkItem = { href: string; label: string };

export function SiteFooter({
  brandName,
  footerBlurb,
  footerLinks,
  footerNote,
}: {
  brandName: string;
  footerBlurb?: string | null;
  footerLinks: FooterLinkItem[];
  footerNote?: string | null;
}) {
  return (
    <footer className="relative mt-16 px-6 sm:px-8  sm:mt-20 border-t-4 border-[#00D9FF] bg-white/90 backdrop-blur-sm">
      <Container className="py-3 sm:py-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div
                className="text-lg font-normal tracking-tight text-[#001F3F]"
                style={{ fontFamily: "Blanka, sans-serif" }}
              >
                {brandName}
              </div>
            </div>
            {footerBlurb ? (
              <div className="text-sm text-foreground/70">{footerBlurb}</div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
            {footerLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-2 border-t border-black/6 pt-4 text-xs text-foreground/60 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} {brandName}</div>
          <div className="flex items-center gap-4">
            {footerNote ? <span>{footerNote}</span> : null}
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-medium text-[#001F3F]/70 aifest-smooth hover:text-[#00D9FF] hover:translate-x-1"
    >
      {children}
    </Link>
  );
}


