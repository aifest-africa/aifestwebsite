import { Container, cn } from "@/lib/ui";

export function CredibilityStrip({ items, className }: { items: string[]; className?: string }) {
  if (!items.length) return null;
  const colors = [
    "text-[#ea4335]",
    "text-[#4285f4]",
    "text-[#34a853]",
    "text-[#fbbc04]",
  ];
  return (
    <div className={cn("border-y border-black/[.06]", className)}>
      <Container className="py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium tracking-wide text-foreground/70">
          {items.map((label, idx) => (
            <span
              key={label}
              className={`aifest-fade-up ${colors[idx % colors.length]}`}
            >
              {label}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}


