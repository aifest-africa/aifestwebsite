"use client";

import { Container, Section } from "@/lib/ui";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { HeroSlideshowBackground } from "./hero-slideshow";
import { VerticalCutReveal } from "../ui/vertical-cut-reveal";
import { Spotlight } from "../ui/spotlight";

export function PageHero({
  title,
  subtitle,
  imageUrl,
  imageUrls,
  slideshowIntervalMs,
  slideshowTransitionDurationMs,
  variant = "default",
  links,
}: {
  title: string;
  subtitle?: string;
  imageUrl?: string | null;
  imageUrls?: string[] | null;
  slideshowIntervalMs?: number | null;
  slideshowTransitionDurationMs?: number | null;
  variant?: "default" | "clipped" | "creative" | "split";
  links?: { label: string; href: string }[];
}) {
  const urls = (imageUrls ?? []).filter(Boolean) as string[];
  const resolved = urls.length ? urls : imageUrl ? [imageUrl] : [];

  // Generate stable random values for particles on the client
  // Moved to top-level to satisfy React rules
  const particles = useMemo(() => {
    // Using a fixed seed-like approach to avoid Math.random lint if possible, 
    // but useMemo + random is generally OK for visuals.
    return [...Array(20)].map((_, i) => ({
      x: ((i * 137) % 100) + "%", // Pseudo-random positions
      y: ((i * 253) % 100) + "%",
      opacity: (((i * 97) % 50) + 20) / 100,
      duration: ((i * 11) % 10) + 10,
      moveY: -(((i * 7) % 50) + 50) + "px",
    }));
  }, []);

  if (variant === "clipped" && resolved.length) {
    return (
      <section className="pt-24 sm:pt-32 pb-8 px-4 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="relative mb-12">
            <figure
              className="relative group aspect-100/120 sm:aspect-100/40 overflow-hidden [clip-path:url(#clip-mobile)] sm:[clip-path:url(#clip-desktop)]"
            >
              <HeroSlideshowBackground
                imageUrls={resolved}
                intervalMs={slideshowIntervalMs ?? undefined}
                transitionDurationMs={slideshowTransitionDurationMs ?? undefined}
              />

              <svg width="0" height="0" className="absolute">
                <defs>
                  {/* Desktop: Current complex inverted tab */}
                  <clipPath id="clip-desktop" clipPathUnits="objectBoundingBox">
                    <path d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z" />
                  </clipPath>
                  {/* Mobile: Simpler rounded shape with subtle cut */}
                  <clipPath id="clip-mobile" clipPathUnits="objectBoundingBox">
                    <path d="M0,0 H1 V0.85 C1,0.95 0.9,1 0.75,1 H0.25 C0.1,1 0,0.95 0,0.85 Z" />
                  </clipPath>
                </defs>
              </svg>
            </figure>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#001F3F] mb-6 leading-tight" style={{ fontFamily: "Blanka, sans-serif" }}>
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.1}
                  staggerFrom="first"
                  reverse={true}
                  transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 30,
                    delay: 0.2,
                  }}
                >
                  {title}
                </VerticalCutReveal>
              </h1>
              {subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-lg md:text-xl text-[#001F3F]/70 leading-relaxed max-w-2xl"
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "creative") {
    return (
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#001F3F] dark:bg-[#000d1a]">
        {/* Animated Mesh Gradient Background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-[#00D9FF]/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[#FBBC04]/10 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
            className="absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-pink-500/10 rounded-full blur-[120px]"
          />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] mix-blend-overlay" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              initial={{
                left: p.x,
                top: p.y,
                opacity: p.opacity,
              }}
              animate={{
                y: [0, p.moveY],
                opacity: [p.opacity, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <Container className="relative z-20 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter mb-8" style={{ fontFamily: "Blanka, sans-serif" }}>
              <VerticalCutReveal
                splitBy="characters"
                staggerDuration={0.03}
                staggerFrom="center"
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                  delay: 0.5,
                }}
              >
                {title}
              </VerticalCutReveal>
            </h1>

            {subtitle && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl mx-auto"
              >
                <div className="inline-block px-8 py-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl">
                  <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide italic">
                    {subtitle}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </Container>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#001F3F] dark:from-[#000d1a] to-transparent z-20" />
      </div>
    );
  }

  if (resolved.length) {
    return (
      <div className="relative min-h-[600px] sm:min-h-[700px] flex items-center justify-center mb-16 sm:mb-24 pt-32 sm:pt-40 overflow-hidden">
        {/* Spotlight Effect */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

        {/* Curved top edge - positioned to bridge visually if needed, but pushing content down for separation */}
        <div className="absolute -top-16 left-0 right-0 h-16 z-30 pointer-events-none opacity-50">
          {/* Adjusted opacity to blend if visible */}
          <svg className="w-full h-full" viewBox="0 0 1200 64" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,64 Q300,32 600,40 T1200,48 L1200,0 L0,0 Z" fill="#001F3F" />
          </svg>
        </div>

        {/* Background Image */}
        <div className="absolute inset-x-0 top-0 bottom-0 overflow-hidden">
          {/* Extended background to top to catch spotlight better, masked by clip if needed or just z-index */}
          <div className="absolute inset-0 top-28 sm:top-36 rounded-b-[3rem] overflow-hidden shadow-2xl">
            <HeroSlideshowBackground
              imageUrls={resolved}
              intervalMs={slideshowIntervalMs ?? undefined}
              transitionDurationMs={slideshowTransitionDurationMs ?? undefined}
            />
            {/* Gradient Overlays - richer, more vibrant with texture */}
            <div className="absolute inset-0 bg-linear-to-br from-[#001F3F]/95 via-[#001F3F]/70 to-[#00D9FF]/30 mix-blend-multiply" />
            <div className="absolute inset-0 bg-linear-to-t from-[#001F3F] via-[#001F3F]/50 to-transparent opacity-90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-transparent via-[#000d1a]/30 to-[#000d1a]/80" />
          </div>
        </div>

        {/* Content Overlay - Glassmorphism Card */}
        <Container className="relative z-10 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden">
              {/* Shine effect on card */}
              <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent pointer-events-none" />

              <div className="relative z-10 text-center">
                <h1 className="text-balance text-5xl tracking-[0.05em] text-white sm:text-6xl lg:text-7xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] font-normal mb-8" style={{ fontFamily: "Blanka, var(--font-geist-sans), sans-serif" }}>
                  <VerticalCutReveal
                    splitBy="characters"
                    staggerDuration={0.05}
                    staggerFrom="first"
                    reverse={true} // Reverses the cut direction for a cool effect
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.5,
                    }}
                  >
                    {title}
                  </VerticalCutReveal>
                </h1>

                {subtitle ? (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-pretty text-xl leading-relaxed text-transparent bg-clip-text bg-linear-to-r from-white via-white/90 to-white/70 drop-shadow-sm sm:text-2xl font-light tracking-wide"
                  >
                    {subtitle}
                  </motion.p>
                ) : null}
              </div>
            </div>
          </motion.div>
        </Container>

        {/* Decorative Elements - Refined & Floating */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 left-10 w-32 h-32 bg-[#00D9FF]/20 rounded-full blur-[60px] mix-blend-screen pointer-events-none"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-40 right-10 w-40 h-40 bg-[#FBBC04]/20 rounded-full blur-[60px] mix-blend-screen pointer-events-none"
        />
      </div>
    );
  }


  if (variant === "split") {
    return (
      <Section className="pt-40 sm:pt-48 pb-20 sm:pb-32 overflow-hidden relative">

        <Container className="relative z-20">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            {/* Left Column: Title & Subtitle */}
            <div className="md:col-span-2 space-y-8">
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-7xl lg:text-8xl font-black text-[#001F3F] dark:text-white leading-[0.9] tracking-tighter"
                style={{ fontFamily: "Blanka, sans-serif" }}
              >
                {title}
              </motion.h1>

              {subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-xl md:text-2xl text-[#001F3F]/70 dark:text-white/70 max-w-2xl leading-relaxed font-light"
                >
                  {subtitle}
                </motion.p>
              )}
            </div>

            {/* Right Column: Exploration Links */}
            {links && links.length > 0 && (
              <div className="flex flex-col gap-4">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm font-bold uppercase tracking-widest text-[#001F3F]/40 dark:text-white/40 mb-2"
                >
                  EXPLORE OPPORTUNITIES
                </motion.p>
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={link.href}
                      className="group flex items-center justify-between px-6 py-4 rounded-2xl border border-[#001F3F]/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm hover:bg-[#001F3F] dark:hover:bg-white hover:text-white dark:hover:text-[#001F3F] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                    >
                      <span className="text-lg font-bold tracking-tight">{link.label}</span>
                      <motion.span
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </motion.span>
                    </a>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>
    );
  }

  // Default text-only hero
  return (
    <Section className="pt-20 sm:pt-24 pb-8 sm:pb-12">
      <Container>
        <h1 className="text-balance text-3xl tracking-[0.02em] text-[#001F3F] sm:text-4xl lg:text-5xl font-normal" style={{ fontFamily: "Blanka, var(--font-geist-sans), sans-serif" }}>
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-[#001F3F]/70 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </Container>
    </Section>
  );
}


