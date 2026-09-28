"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, Container } from "@/lib/ui";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Home, Info, Image as ImageIcon, Mail, Users, Library, FileText } from "lucide-react";

type NavLink = { href: string; label: string; highlight?: boolean };

export function SiteHeader({
  brandName,
  logoUrl,
  nav,
}: {
  brandName: string;
  logoUrl?: string | null;
  nav: NavLink[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState("");

  // Helper function to determine if a nav link is active
  const isLinkActive = (item: NavLink) => {
    // Special handling for "Partner With Us" link pointing to partnership section
    if (item.href === "/get-involved#partnership-tiers" || item.href === "/get-involved#partnership") {
      return pathname === "/get-involved" && (hash === "#partnership-tiers" || hash === "#partnership");
    }

    // Standard active link detection
    if (item.href === "/") {
      return pathname === "/";
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };


  useEffect(() => {
    const t = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    // Track hash changes for partnership section detection
    const updateHash = () => {
      setHash(window.location.hash);
    };

    // Set initial hash
    updateHash();

    // Listen for hash changes
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {


    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };

    // Set initial scroll state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "aifest-fade-in fixed top-0 left-0 right-0 z-1000 transition-all duration-300 aifest-smooth pointer-events-none"
    )}>
      {scrolled ? (
        <div className="pointer-events-auto w-full bg-white/90 dark:bg-[#000d1a]/90 backdrop-blur-md transition-all duration-300 relative border-b-2 border-[#00D9FF] md:border-b-2 dark:border-[#00D9FF]/50">
          <Container className="relative z-10">
            <div className="flex items-center justify-between px-6 py-3">
              {/* Logo on the left */}
              <Link
                href="/"
                className="group inline-flex items-center gap-2 font-semibold tracking-tight aifest-smooth hover:opacity-80 z-10"
              >
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoUrl}
                    alt={brandName}
                    className="h-8 md:h-10 xl:h-12 w-auto aifest-smooth group-hover:scale-105 dark:brightness-110"
                  />
                ) : (
                  <span
                    className="text-lg md:text-xl xl:text-2xl text-[#102563] dark:text-white font-normal aifest-smooth group-hover:opacity-80"
                    style={{ fontFamily: "Blanka, var(--font-geist-sans), sans-serif" }}
                  >
                    {brandName}
                  </span>
                )}
              </Link>

              {/* Centered nav links - Changed from absolute centered to flex-1 to prevent overlap */}
              <nav className="hidden xl:flex flex-1 justify-center items-center gap-2">
                {nav.map((item) => {
                  const active = isLinkActive(item);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch={true}
                      className={cn(
                        "aifest-smooth aifest-press-effect rounded-full px-4 py-2 text-sm font-semibold text-[#102563]/90 dark:text-white/80 hover:text-[#102563] dark:hover:text-white hover:bg-[#102563]/10 dark:hover:bg-white/10 hover:scale-105 drop-shadow transition-all",
                        active && "text-[#102563] dark:text-white bg-[#102563]/20 dark:bg-white/20 font-bold shadow-md shadow-[#102563]/20 dark:shadow-white/10",
                        item.highlight && "text-[#102563] dark:text-white border-2 border-[#102563]/50 dark:border-white/50 bg-[#102563]/10 dark:bg-white/10 hover:border-[#102563] dark:hover:border-white hover:shadow-md hover:shadow-cyan-500/40 font-bold",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Right side group: AIFEST text + Theme Toggle */}
              <div className="hidden xl:flex items-center gap-4">
                <span className="text-xl 2xl:text-2xl text-[#102563] dark:text-white drop-shadow-lg font-normal" style={{ fontFamily: "Blanka, var(--font-geist-sans), sans-serif" }}>{brandName}</span>
                <ThemeToggle />
              </div>

              {/* Mobile menu button - now shows up to xl */}
              <div className="xl:hidden">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-label="Toggle menu"
                  onClick={() => setOpen((v) => !v)}
                  className="aifest-smooth aifest-press-effect inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#102563]/30 dark:border-white/30 bg-[#102563]/10 dark:bg-white/10 hover:border-[#102563]/50 dark:hover:border-white/50 hover:bg-[#102563]/20 dark:hover:bg-white/20 backdrop-blur-sm"
                >
                  <span className="relative block h-4 w-5">
                    <span className={cn("aifest-smooth absolute left-0 top-0 h-0.5 w-5 rounded bg-[#102563] dark:bg-white", open && "top-[7px] rotate-45")} />
                    <span className={cn("aifest-smooth absolute left-0 top-[7px] h-0.5 w-5 rounded bg-[#102563] dark:bg-white", open && "opacity-0")} />
                    <span className={cn("aifest-smooth absolute left-0 bottom-0 h-0.5 w-5 rounded bg-[#102563] dark:bg-white", open && "bottom-[7px] -rotate-45")} />
                  </span>
                </button>
              </div>
            </div>
          </Container>
          {/* Curved bottom edge - desktop only (xl+) */}
          <div className="hidden xl:block absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 1200 64" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,0 Q300,32 600,24 T1200,16 L1200,64 L0,64 Z" fill="currentColor" className="text-white dark:text-[#000d1a]" />
            </svg>
          </div>
        </div>
      ) : (
        <div className="pointer-events-auto w-full px-6 py-3 md:pt-6">
          {/* Everything on one line: Logo, Nav Links, AIFEST text */}
          <div className="flex items-center justify-between px-6 bg-white/80 dark:bg-[#000d1a]/80 backdrop-blur-md rounded-full border border-[#102563]/20 dark:border-white/20 py-3 shadow-lg shadow-black/10 transition-colors">
            {/* Logo on the left */}
            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-semibold tracking-tight aifest-smooth hover:opacity-80"
            >
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt={brandName}
                  className="h-8 md:h-10 xl:h-12 w-auto aifest-smooth group-hover:scale-105 dark:brightness-110"
                />
              ) : (
                <span
                  className="text-lg md:text-xl xl:text-2xl text-[#102563] dark:text-white font-normal aifest-smooth group-hover:opacity-80"
                  style={{ fontFamily: "Blanka, var(--font-geist-sans), sans-serif" }}
                >
                  {brandName}
                </span>
              )}
            </Link>

            {/* Centered nav links - xl+ only */}
            <nav className="hidden xl:flex items-center gap-2">
              {nav.map((item) => {
                const active = isLinkActive(item);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "aifest-smooth aifest-press-effect rounded-full px-4 py-2 text-sm font-semibold text-[#102563] dark:text-white/90 hover:text-[#102563] dark:hover:text-white hover:bg-[#102563]/10 dark:hover:bg-white/10 hover:scale-105 transition-all outline-none",
                      active && "text-[#102563] dark:text-white bg-[#102563]/10 dark:bg-white/10 font-bold",
                      item.highlight &&
                      "text-[#102563] dark:text-white border-2 border-[#102563] dark:border-white bg-[#102563]/5 dark:bg-white/5 hover:border-[#00D9FF] hover:bg-[#00D9FF]/10 font-bold",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right side group: brand text (only when logo image is used) + Theme Toggle */}
            <div className="hidden xl:flex items-center gap-4">
              {logoUrl ? (
                <span className="text-xl 2xl:text-2xl text-[#102563] dark:text-white font-normal" style={{ fontFamily: "Blanka, var(--font-geist-sans), sans-serif" }}>{brandName}</span>
              ) : null}
              <ThemeToggle />
            </div>

            {/* Mobile menu button - now shows up to xl */}
            <div className="xl:hidden">
              <button
                type="button"
                aria-expanded={open}
                aria-label="Toggle menu"
                onClick={() => setOpen((v) => !v)}
                className="aifest-smooth aifest-press-effect inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#102563]/30 dark:border-white/30 bg-white/80 dark:bg-white/10 backdrop-blur-md hover:border-[#102563]/50 dark:hover:border-white/50"
              >
                <span className="relative block h-4 w-5">
                  <span className={cn("aifest-smooth absolute left-0 top-0 h-0.5 w-5 rounded bg-[#102563] dark:bg-white", open && "top-[7px] rotate-45")} />
                  <span className={cn("aifest-smooth absolute left-0 top-[7px] h-0.5 w-5 rounded bg-[#102563] dark:bg-white", open && "opacity-0")} />
                  <span className={cn("aifest-smooth absolute left-0 bottom-0 h-0.5 w-5 rounded bg-[#102563] dark:bg-white", open && "bottom-[7px] -rotate-45")} />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[2000] xl:hidden pointer-events-none">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white dark:bg-[#000d1a] backdrop-blur-md pointer-events-auto"
              onClick={() => setOpen(false)}
            />

            {/* Menu content - Restored original Fade/Slide-down animation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 flex flex-col pointer-events-auto overflow-y-auto"
            >
              {/* Close button row */}
              <div className="flex justify-between items-center p-6">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#102563]/20 dark:border-white/20 bg-white/50 dark:bg-[#102563]/50 backdrop-blur-md"
                  aria-label="Close menu"
                >
                  <svg
                    className="h-6 w-6 text-[#102563] dark:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation links grid */}
              <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-3">
                {nav.map((item, idx) => {
                  const active = isLinkActive(item);

                  const getNavIcon = (label: string) => {
                    const l = label.toLowerCase();
                    if (l.includes("home")) return <Home className="h-5 w-5" />;
                    if (l.includes("about")) return <Info className="h-5 w-5" />;
                    if (l.includes("gallery")) return <ImageIcon className="h-5 w-5" />;
                    if (l.includes("contact")) return <Mail className="h-5 w-5" />;
                    if (l.includes("team")) return <Users className="h-5 w-5" />;
                    if (l.includes("resource")) return <Library className="h-5 w-5" />;
                    if (l.includes("involved")) return <Users className="h-5 w-5" />;
                    return <FileText className="h-5 w-5" />;
                  };

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: idx * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="w-full max-w-sm"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        prefetch={true}
                        className={cn(
                          "flex items-center justify-center gap-3 rounded-xl px-6 py-3 text-lg font-bold text-center transition-all",
                          active
                            ? "bg-[#102563] text-white shadow-lg scale-105"
                            : "text-[#102563] dark:text-white hover:bg-[#102563]/5 dark:hover:bg-white/5",
                          item.highlight && !active &&
                          "border-2 border-[#102563] dark:border-white/20 bg-[#102563]/5 dark:bg-white/5"
                        )}
                      >
                        <span className={cn("opacity-70", active && "opacity-100")}>
                          {getNavIcon(item.label)}
                        </span>
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom footer section */}
              <div className="p-8 flex flex-col items-center gap-4 border-t border-[#102563]/10 dark:border-white/10">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- mobile drawer brand mark
                  <img
                    src={logoUrl}
                    alt={brandName}
                    className="h-20 w-auto object-contain dark:brightness-110"
                  />
                ) : (
                  <span className="text-[#102563] dark:text-white text-3xl font-normal" style={{ fontFamily: "Blanka, sans-serif" }}>{brandName}</span>
                )}
                <p className="text-[#102563]/50 dark:text-white/50 text-xs font-medium text-center">
                  © 2026 {brandName}. All rights reserved.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}


