import { Badge, ButtonLink, Container } from "@/lib/ui";

export function AnnouncementBar({
  enabled,
  badge,
  text,
  primary,
  secondary,
}: {
  enabled: boolean;
  badge?: string | null;
  text?: string | null;
  primary?: { href: string; label: string } | null;
  secondary?: { href: string; label: string } | null;
}) {
  if (!enabled) return null;

  return (
    <div className="aifest-fade-in border-b-2 border-[#FBBC04] bg-gradient-to-r from-[#FF6B9D]/10 via-[#C084FC]/10 to-[#00D9FF]/10 backdrop-blur-sm">
      <Container className="flex flex-col gap-1 py-0.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          {badge ? <Badge>{badge}</Badge> : null}
          {text ? <span className="text-foreground/70">{text}</span> : null}
        </div>
        <div className="flex items-center gap-2">
          {primary ? (
            <ButtonLink href={primary.href} size="xs" variant="secondary">
              {primary.label}
            </ButtonLink>
          ) : null}
          {secondary ? (
            <ButtonLink href={secondary.href} size="xs" variant="ghost">
              {secondary.label}
            </ButtonLink>
          ) : null}
        </div>
      </Container>
    </div>
  );
}


