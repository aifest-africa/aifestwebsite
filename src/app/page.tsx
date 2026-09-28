import {
  Container,
  Section,
} from "@/lib/ui";
import { ImageCarousel } from "../components/gallery/image-carousel";
import { ScrollReveal } from "../components/effects/scroll-reveal";
import { MagneticCard } from "../components/effects/magnetic-card";
import { HeroInteractive } from "../components/hero/hero-interactive";
import { getSiteSettings, getHomepageCarousel, publicMediaUrl } from "../lib/content";

import { ProjectAreasMarquee } from "../components/home/project-areas-marquee";

function safeCards(v: unknown): { title: string; desc: string; href: string }[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((x) => x as Record<string, unknown>)
    .filter(
      (x) =>
        x &&
        typeof x.title === "string" &&
        typeof x.desc === "string" &&
        typeof x.href === "string",
    )
    .map((x) => ({ title: x.title as string, desc: x.desc as string, href: x.href as string }));
}

export default function Home() {
  const s = getSiteSettings();
  const carouselData = getHomepageCarousel();

  const cards = safeCards(s.home_cards);
  const heroTitle = s.brand_name ?? "AIFEST";
  const heroSubtitle = s.brand_tagline ?? "";
  // Spline scene URL - update with your actual Spline scene URL
  const splineSceneUrl = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

  const carouselImages = carouselData.map(img => ({
    id: img.id,
    image_path: publicMediaUrl(img.image_path) ?? img.image_path,
    caption: img.caption
  }));

  return (
    <main className="relative overflow-hidden bg-white dark:bg-[#000d1a] min-h-screen transition-colors duration-500 pb-0">
      {/* Sitewide Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-10%] w-[600px] h-[600px] bg-cyan-400/20 dark:bg-cyan-600/20 blur-[130px] rounded-full animate-pulse" />
        <div className="absolute top-[30%] left-[-15%] w-[800px] h-[800px] bg-blue-400/20 dark:bg-blue-600/20 blur-[130px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-600/20 blur-[130px] rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Hero Section */}
      <Section className="pt-24 md:pt-28 pb-10 md:pb-16 overflow-visible relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,217,255,0.1)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(0,217,255,0.15)_0%,transparent_60%)] -z-10" />
        <Container>
          <HeroInteractive
            splineSceneUrl={splineSceneUrl}
            heroTitle={heroTitle}
            heroSubtitle={heroSubtitle}
            homeBadge={s.home_badge}
            homeStatus={s.home_status ?? "Wrapped"}
            homePrimaryCta={s.home_primary_cta_href && s.home_primary_cta_label ? { href: s.home_primary_cta_href, label: s.home_primary_cta_label } : { href: "/past-editions", label: "Past Editions" }}
            homeSecondaryCta={s.home_secondary_cta_href && s.home_secondary_cta_label ? { href: s.home_secondary_cta_href, label: s.home_secondary_cta_label } : null}
            homeTertiaryCta={s.home_tertiary_cta_href && s.home_tertiary_cta_label ? { href: s.home_tertiary_cta_href, label: s.home_tertiary_cta_label } : null}
          />
        </Container>
      </Section>

      {carouselImages.length > 0 ? (
        <Section className="relative pt-8 pb-8 md:pt-10 md:pb-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(66,133,244,0.05)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(66,133,244,0.1)_0%,transparent_50%)] -z-10" />
          <Container>
            <ImageCarousel images={carouselImages} />
          </Container>
        </Section>
      ) : null}

      <Section className="relative pt-10 pb-12 md:pt-14 md:pb-16">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.1] -z-10" />
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {cards.map((c, idx) => (
              <ScrollReveal key={c.href} variant="fade-up" delay={idx * 0.1}>
                <Card title={c.title} desc={c.desc} href={c.href} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>
      <ProjectAreasMarquee className="pt-4 pb-16" />
    </main>
  );
}

function Card({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <MagneticCard className="h-full">
      <a
        href={href}
        className="group block h-full rounded-3xl border border-[#001F3F]/10 dark:border-white/10 bg-slate-50 dark:bg-[#00162d] p-6 aifest-smooth hover:border-[#00D9FF] hover:shadow-xl hover:shadow-cyan-500/10"
      >
        <div className="text-lg font-bold tracking-tight text-[#001F3F] dark:text-white aifest-smooth group-hover:text-[#00D9FF]">
          {title}
        </div>
        <div className="mt-2 text-sm leading-6 text-[#001F3F]/70 dark:text-white/70 aifest-smooth group-hover:text-[#001F3F]/85 dark:group-hover:text-white/85">
          {desc}
        </div>
        <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#00D9FF] aifest-smooth group-hover:gap-2">
          <span>Open</span>
          <span className="aifest-smooth group-hover:translate-x-1">→</span>
        </div>
      </a>
    </MagneticCard>
  );
}
