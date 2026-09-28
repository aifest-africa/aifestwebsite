/* eslint-disable @next/next/no-img-element */
import { Container, Section } from "@/lib/ui";
import { PageHero } from "../../components/page-hero";
import { ImageCarousel } from "../../components/image-carousel";
import { ContentCards, parseContentIntoCards } from "../../components/content-cards";
import { currentEdition, publicMediaUrl } from "../../lib/content";
import { notFound } from "next/navigation";

export default function CurrentEditionPage() {
  const edition = currentEdition;

  if (!edition) notFound();

  const carouselImages = edition.carouselImages?.map(img => ({
    id: img.id,
    image_path: publicMediaUrl(img.image_path) ?? img.image_path,
    caption: img.caption
  })) ?? [];

  const sections = edition.summary ? parseContentIntoCards(edition.summary) : [];

  return (
    <main>
      <PageHero
        title={`AIFEST ${edition.year}`}
        subtitle={edition.title}
      />

      {edition.heroImage ? (
        <Section>
          <Container>
            <div className="overflow-hidden rounded-3xl">
              <img
                src={publicMediaUrl(edition.heroImage) ?? edition.heroImage}
                alt={`AIFEST ${edition.year}`}
                className="h-auto w-full object-cover"
              />
            </div>
          </Container>
        </Section>
      ) : null}

      {carouselImages.length > 0 ? (
        <Section>
          <Container>
            <ImageCarousel images={carouselImages} />
          </Container>
        </Section>
      ) : null}

      {sections.length > 0 ? (
        <Section>
          <Container>
            <ContentCards sections={sections} />
          </Container>
        </Section>
      ) : null}

      {(edition.themes?.length ?? 0) > 0 ? (
        <Section>
          <Container>
            <div className="rounded-3xl border border-black/[.08] p-8 dark:border-white/[.12]">
              <h2 className="mb-4 text-xl font-semibold">Themes</h2>
              <ul className="grid gap-2 text-sm text-foreground/80">
                {edition.themes?.map((theme: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 text-foreground/40">→</span>
                    <span>{theme}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>
      ) : null}
    </main>
  );
}

