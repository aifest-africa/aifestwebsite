import { cn, Container } from "@/lib/ui";

export type PartnerLogoItem = {
  src: string;
  alt?: string;
  href?: string;
};

export function PartnerMarquee({
  items,
  className,
}: {
  items: PartnerLogoItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  // Duplicate list for seamless scrolling.
  const loop = [...items, ...items];

  return (
    <div className={cn("border-y border-black/6 dark:border-white/6", className)}>
      <Container className="py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="text-xs font-semibold tracking-wide text-foreground/60">
            Partners
          </div>
          <div className="hidden sm:block h-px flex-1 bg-linear-gradient-to-r from-transparent via-black/6 to-transparent dark:via-white/6" />
        </div>

        <div className="mt-4 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-gradient-to-l from-background to-transparent" />

          <div className="aifest-partner-marquee group flex w-max items-center gap-10 pr-10">
            {loop.map((logo, idx) => {
              const alt = logo.alt ?? "";
              const content = (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo.src}
                  alt={alt}
                  className="h-9 w-auto object-contain opacity-75 grayscale transition-all duration-300 group-hover:[animation-play-state:paused] hover:opacity-100 hover:grayscale-0"
                  loading="lazy"
                />
              );

              return logo.href ? (
                <a
                  key={`${logo.src}-${idx}`}
                  href={logo.href}
                  target="_blank"
                  rel="noreferrer"
                  className="aifest-smooth hover:scale-[1.02]"
                >
                  {content}
                </a>
              ) : (
                <div key={`${logo.src}-${idx}`} className="aifest-smooth">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}


