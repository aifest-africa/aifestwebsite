import type React from "react";

function parseInlines(input: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Match: **bold**, ![img](url), [link](url)
  const re = /(\*\*([^*]+)\*\*)|(!?\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(input))) {
    if (m.index > last) nodes.push(input.slice(last, m.index));

    // Bold: **text**
    if (m[1]) {
      nodes.push(
        <strong key={`b-${m.index}`} className="font-semibold text-foreground">
          {m[2]}
        </strong>,
      );
    }
    // Image: ![alt](url)
    else if (m[3] && m[3].startsWith("!")) {
      nodes.push(
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`img-${m.index}-${m[5]}`}
          src={m[5]}
          alt={m[4]}
          className="mt-3 w-full rounded-3xl border border-black/[.08]"
          loading="lazy"
        />,
      );
    }
    // Link: [text](url)
    else if (m[3]) {
      const external = /^https?:\/\//.test(m[5]);
      nodes.push(
        <a
          key={`a-${m.index}-${m[5]}`}
          href={m[5]}
          className="font-medium text-foreground/80 underline underline-offset-4 transition-colors hover:text-foreground"
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
        >
          {m[4]}
        </a>,
      );
    }

    last = m.index + m[0].length;
  }

  if (last < input.length) nodes.push(input.slice(last));
  return nodes;
}

function splitBlocks(md: string): string[] {
  return md
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function SimpleMarkdown({ content }: { content: string }) {
  const blocks = splitBlocks(content);

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        if (/^#{1,3}\s/.test(block)) {
          const level = block.startsWith("###")
            ? 3
            : block.startsWith("##")
              ? 2
              : 1;
          const text = block.replace(/^#{1,3}\s+/, "").trim();
          const className =
            level === 1
              ? "text-xl font-semibold tracking-tight"
              : level === 2
                ? "text-base font-semibold tracking-tight"
                : "text-sm font-semibold tracking-tight";

          const Comp = level === 1 ? "h2" : level === 2 ? "h3" : "h4";
          return (
            <Comp key={i} className={className}>
              {parseInlines(text)}
            </Comp>
          );
        }

        if (/^-\s/m.test(block)) {
          const items = block
            .split("\n")
            .map((l) => l.trim())
            .filter((l) => l.startsWith("- "))
            .map((l) => l.replace(/^-+\s+/, "").trim());

          return (
            <ul key={i} className="space-y-2 text-sm text-foreground/70">
              {items.map((item, idx) => (
                <li key={idx} className="leading-6">
                  {parseInlines(item)}
                </li>
              ))}
            </ul>
          );
        }

        const lines = block.split("\n");
        return (
          <p key={i} className="text-sm leading-6 text-foreground/70">
            {lines.map((line, idx) => (
              <span key={idx}>
                {parseInlines(line)}
                {idx < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
