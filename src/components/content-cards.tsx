import type React from "react";
import { cn } from "@/lib/ui";

type ContentSection = {
  title: string;
  content: string;
};

function parseInlines(input: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const re = /(\*\*([^*]+)\*\*)|(!?\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(input))) {
    if (m.index > last) nodes.push(input.slice(last, m.index));

    if (m[1]) {
      nodes.push(
        <strong key={`b-${m.index}`} className="font-semibold text-foreground/90">
          {m[2]}
        </strong>,
      );
    } else if (m[3] && !m[3].startsWith("!")) {
      const external = /^https?:\/\//.test(m[5]);
      nodes.push(
        <a
          key={`a-${m.index}-${m[5]}`}
          href={m[5]}
          className="font-bold text-[#00D9FF] underline underline-offset-4 decoration-2 transition-colors hover:text-[#4285F4]"
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

export function ContentCards({
  sections,
  className
}: {
  sections: ContentSection[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {sections.map((section, idx) => (
        <ContentCard
          key={idx}
          title={section.title}
          content={section.content}
          index={idx}
        />
      ))}
    </div>
  );
}

function ContentCard({
  title,
  content,
  index,
}: {
  title: string;
  content: string;
  index: number;
}) {
  const staggerClass = `aifest-stagger-${(index % 6) + 1}`;

  return (
    <div
      className={cn(
        "group aifest-fade-up rounded-3xl border border-[#001F3F]/10 dark:border-white/10 bg-slate-50 dark:bg-[#00162d] p-6 aifest-smooth hover:border-[#00D9FF] hover:shadow-xl hover:shadow-cyan-500/10",
        staggerClass
      )}
    >
      <h3 className="text-lg font-bold tracking-tight text-[#001F3F] dark:text-white group-hover:text-[#00D9FF] aifest-smooth">
        {title}
      </h3>
      <div className="mt-3 text-sm leading-relaxed text-[#001F3F]/70 dark:text-white/70">
        {parseInlines(content)}
      </div>
    </div>
  );
}

export function parseContentIntoCards(markdown: string): ContentSection[] {
  const sections: ContentSection[] = [];
  const lines = markdown.split('\n');

  let currentTitle = '';
  let currentContent: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Check for bold markdown heading (**text**)
    const boldMatch = trimmed.match(/^\*\*(.+?)\*\*$/);
    if (boldMatch) {
      // Save previous section if exists
      if (currentTitle && currentContent.length > 0) {
        sections.push({
          title: currentTitle,
          content: currentContent.join(' ').trim()
        });
      }
      currentTitle = boldMatch[1];
      currentContent = [];
      continue;
    }

    // Check for markdown heading (## or ###)
    if (trimmed.startsWith('##')) {
      // Save previous section if exists
      if (currentTitle && currentContent.length > 0) {
        sections.push({
          title: currentTitle,
          content: currentContent.join(' ').trim()
        });
      }
      currentTitle = trimmed.replace(/^#+\s*/, '');
      currentContent = [];
      continue;
    }

    // Add content to current section
    if (trimmed && currentTitle) {
      currentContent.push(trimmed);
    }
  }

  // Add last section
  if (currentTitle && currentContent.length > 0) {
    sections.push({
      title: currentTitle,
      content: currentContent.join(' ').trim()
    });
  }

  return sections;
}

