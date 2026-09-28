import { Container, Section, SectionTitle } from "@/lib/ui";
import { PageHero } from "../../components/hero/page-hero";
import { ImageCarousel } from "../../components/gallery/image-carousel";

type SocialLink = { href: string; label: string };

function safeSocials(v: unknown): SocialLink[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((x) => x as Record<string, unknown>)
    .filter(
      (x): x is { href: string; label?: string; platform?: string } =>
        x &&
        typeof x.href === "string" &&
        (typeof x.label === "string" || typeof x.platform === "string")
    )
    .map((x) => ({
      href: x.href,
      label: x.label ?? x.platform ?? "Link",
    }));
}
import { getSiteSettings } from "../../lib/static/site";

export default function ContactPage() {
  const s = getSiteSettings();
  const socials = safeSocials(s.socials);

  const heroImageUrls: string[] = [];
  const carouselImages: any[] = [];
  const sections: any[] = [];

  return (
    <main className="relative overflow-hidden bg-white dark:bg-[#000d1a] min-h-screen transition-colors duration-500 pb-24">
      {/* Sitewide Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-400/20 blur-[130px] rounded-full animate-pulse" />
        <div className="absolute top-[40%] right-[-10%] w-[700px] h-[700px] bg-purple-400/20 blur-[130px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] bg-cyan-400/20 blur-[130px] rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <PageHero
        title="Contact Us"
        imageUrls={heroImageUrls}
      />

      <div className="relative pt-12">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00D9FF]/5 to-transparent dark:via-[#00D9FF]/10 -z-10" />
        {carouselImages.length > 0 ? (
          <Section className="pt-0">
            <Container>
              <ImageCarousel images={carouselImages} />
            </Container>
          </Section>
        ) : null}

        <Section className={carouselImages.length > 0 ? "" : "pt-0"}>
          <Container className="grid gap-8 md:grid-cols-2">
            <div className="aifest-fade-up rounded-3xl border border-[#001F3F]/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md p-8 shadow-xl hover:border-[#00D9FF] transition-all group">
              <SectionTitle className="text-2xl text-[#001F3F] dark:text-white group-hover:text-[#00D9FF] transition-colors">Email</SectionTitle>
              {s.contact_email ? (
                <p className="mt-4 text-lg font-medium text-[#001F3F]/70 dark:text-white/70">{s.contact_email}</p>
              ) : (
                <p className="mt-4 text-lg text-foreground/50 italic">Not configured.</p>
              )}
            </div>

            <div className="aifest-fade-up aifest-stagger-2 rounded-3xl border border-[#001F3F]/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md p-8 shadow-xl hover:border-[#4285F4] transition-all group">
              <SectionTitle className="text-2xl text-[#001F3F] dark:text-white group-hover:text-[#4285F4] transition-colors">Social</SectionTitle>
              {socials.length ? (
                <ul className="mt-6 space-y-4 text-lg">
                  {socials.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="font-medium text-[#001F3F]/70 dark:text-white/70 underline underline-offset-4 decoration-2 decoration-[#4285F4]/30 hover:decoration-[#4285F4] transition-all hover:text-[#4285F4]"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-lg text-foreground/50 italic">Not configured.</p>
              )}
            </div>
          </Container>
        </Section>
      </div>
    </main>
  );
}


