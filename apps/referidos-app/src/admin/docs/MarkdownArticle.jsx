import React, { useMemo } from "react";

function renderInlineMarkdown(text, keyPrefix = "inline") {
  const value = String(text || "");
  const parts = [];
  const tokenPattern =
    /(\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/g;

  let lastIndex = 0;
  let tokenIndex = 0;
  let match = tokenPattern.exec(value);

  while (match) {
    if (match.index > lastIndex) {
      parts.push(value.slice(lastIndex, match.index));
    }

    const [, , linkLabel, linkHref, boldText, codeText, italicText] = match;
    const key = `${keyPrefix}-${tokenIndex++}`;

    if (linkLabel && linkHref) {
      const isExternal = /^https?:\/\//i.test(linkHref);
      parts.push(
        <a
          key={key}
          href={linkHref}
          className="font-medium text-[var(--brand-purple,#5E30A5)] underline underline-offset-4 hover:opacity-80"
          {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {linkLabel}
        </a>
      );
    } else if (boldText) {
      parts.push(
        <strong key={key} className="font-semibold text-slate-900">
          {boldText}
        </strong>
      );
    } else if (codeText) {
      parts.push(
        <code
          key={key}
          className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.95em] text-slate-800"
        >
          {codeText}
        </code>
      );
    } else if (italicText) {
      parts.push(
        <em key={key} className="italic">
          {italicText}
        </em>
      );
    } else {
      parts.push(match[0]);
    }

    lastIndex = tokenPattern.lastIndex;
    match = tokenPattern.exec(value);
  }

  if (lastIndex < value.length) {
    parts.push(value.slice(lastIndex));
  }

  return parts.length ? parts : value;
}

function parseMarkdown(markdownText) {
  const lines = String(markdownText || "").split(/\r?\n/);
  const blocks = [];
  let paragraph = [];
  let bulletList = [];
  let orderedList = [];
  let inCode = false;
  let codeLang = "";
  let codeLines = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    paragraph = [];
  };

  const flushBulletList = () => {
    if (!bulletList.length) return;
    blocks.push({ type: "bullet", items: [...bulletList] });
    bulletList = [];
  };

  const flushOrderedList = () => {
    if (!orderedList.length) return;
    blocks.push({ type: "ordered", items: [...orderedList] });
    orderedList = [];
  };

  const flushCode = () => {
    if (!codeLines.length) return;
    blocks.push({ type: "code", lang: codeLang, code: codeLines.join("\n") });
    codeLines = [];
    codeLang = "";
  };

  const flushAll = () => {
    flushParagraph();
    flushBulletList();
    flushOrderedList();
  };

  for (const line of lines) {
    if (inCode) {
      if (line.trim().startsWith("```")) {
        inCode = false;
        flushCode();
      } else {
        codeLines.push(line);
      }
      continue;
    }

    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      flushAll();
      inCode = true;
      codeLang = trimmed.slice(3).trim();
      continue;
    }

    if (!trimmed) {
      flushAll();
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushAll();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2],
      });
      continue;
    }

    const bulletMatch = trimmed.match(/^[-*+]\s+(.+)$/);
    if (bulletMatch) {
      flushParagraph();
      flushOrderedList();
      bulletList.push(bulletMatch[1]);
      continue;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      flushParagraph();
      flushBulletList();
      orderedList.push(orderedMatch[1]);
      continue;
    }

    paragraph.push(trimmed);
  }

  flushAll();
  if (inCode) flushCode();
  return blocks;
}

function headingClass(level) {
  if (level <= 1) return "mt-6 text-2xl font-bold text-slate-900";
  if (level === 2) return "mt-6 text-xl font-bold text-slate-900";
  if (level === 3) return "mt-5 text-lg font-semibold text-slate-900";
  if (level === 4) return "mt-4 text-base font-semibold text-slate-900";
  return "mt-4 text-sm font-semibold text-slate-900";
}

function BlockRenderer({ block, index }) {
  if (block.type === "heading") {
    const Tag = `h${Math.min(block.level, 6)}`;
    return (
      <Tag key={`h-${index}`} className={headingClass(block.level)}>
        {renderInlineMarkdown(block.text, `h-${index}`)}
      </Tag>
    );
  }

  if (block.type === "bullet") {
    return (
      <ul key={`ul-${index}`} className="mt-3 list-disc space-y-1 pl-6 text-sm text-slate-700">
        {block.items.map((item, itemIndex) => (
          <li key={`li-${index}-${itemIndex}`}>
            {renderInlineMarkdown(item, `ul-${index}-${itemIndex}`)}
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "ordered") {
    return (
      <ol key={`ol-${index}`} className="mt-3 list-decimal space-y-1 pl-6 text-sm text-slate-700">
        {block.items.map((item, itemIndex) => (
          <li key={`li-${index}-${itemIndex}`}>
            {renderInlineMarkdown(item, `ol-${index}-${itemIndex}`)}
          </li>
        ))}
      </ol>
    );
  }

  if (block.type === "code") {
    return (
      <div key={`code-${index}`} className="mt-4 overflow-x-auto rounded-2xl border border-[#E9E2F7] bg-[#1E1B2E]">
        {block.lang ? (
          <div className="border-b border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-slate-300">
            {block.lang}
          </div>
        ) : null}
        <pre className="m-0 p-4 text-xs leading-6 text-slate-100">
          <code>{block.code}</code>
        </pre>
      </div>
    );
  }

  return (
    <p key={`p-${index}`} className="mt-3 text-sm leading-7 text-slate-700">
      {renderInlineMarkdown(block.text, `p-${index}`)}
    </p>
  );
}

export default function MarkdownArticle({ markdown }) {
  const blocks = useMemo(() => parseMarkdown(markdown), [markdown]);

  if (!blocks.length) {
    return (
      <article className="rounded-2xl border border-[#E9E2F7] bg-white p-6 text-sm text-slate-500 shadow-sm">
        Documento sin contenido.
      </article>
    );
  }

  return (
    <article className="rounded-2xl border border-[#E9E2F7] bg-white p-6 shadow-sm">
      {blocks.map((block, index) => (
        <BlockRenderer key={`block-${index}`} block={block} index={index} />
      ))}
    </article>
  );
}

