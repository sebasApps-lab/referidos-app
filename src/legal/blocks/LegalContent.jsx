import React, { useMemo } from "react";

const DEFAULT_MARKDOWN = "# Documento\n\nContenido pendiente.";

function renderInlineMarkdown(text, keyPrefix = "inline") {
  const value = String(text || "");
  const parts = [];
  const tokenPattern = /(\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/g;

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
        <strong key={key} className="font-semibold text-slate-800">
          {boldText}
        </strong>
      );
    } else if (codeText) {
      parts.push(
        <code key={key} className="rounded bg-slate-100 px-1 py-0.5 text-[0.95em] text-slate-800">
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

function parseMarkdown(text) {
  const lines = String(text || DEFAULT_MARKDOWN).split(/\r?\n/);
  const blocks = [];
  let listItems = [];
  let key = 0;

  const flushList = () => {
    if (!listItems.length) return;
    const items = listItems.map((item, index) => (
      <li key={`li-${key++}`} className="ml-5 list-disc">
        {renderInlineMarkdown(item, `li-${key}-${index}`)}
      </li>
    ));
    blocks.push(
      <ul key={`ul-${key++}`} className="my-3 space-y-1">
        {items}
      </ul>
    );
    listItems = [];
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.slice(2));
      return;
    }

    flushList();

    if (trimmed.startsWith("### ")) {
      blocks.push(
        <h3 key={`h3-${key++}`} className="mt-6 text-base font-semibold text-slate-900">
          {renderInlineMarkdown(trimmed.slice(4), `h3-${key}`)}
        </h3>
      );
      return;
    }
    if (trimmed.startsWith("## ")) {
      blocks.push(
        <h2 key={`h2-${key++}`} className="mt-8 text-lg font-semibold text-slate-900">
          {renderInlineMarkdown(trimmed.slice(3), `h2-${key}`)}
        </h2>
      );
      return;
    }
    if (trimmed.startsWith("# ")) {
      blocks.push(
        <h1 key={`h1-${key++}`} className="mt-8 text-xl font-semibold text-slate-900">
          {renderInlineMarkdown(trimmed.slice(2), `h1-${key}`)}
        </h1>
      );
      return;
    }

    blocks.push(
      <p key={`p-${key++}`} className="mt-3 text-sm leading-7 text-slate-700">
        {renderInlineMarkdown(trimmed, `p-${key}`)}
      </p>
    );
  });

  flushList();
  return blocks;
}

export default function LegalContent({ markdown }) {
  const content = useMemo(() => parseMarkdown(markdown), [markdown]);

  return <article className="py-6">{content}</article>;
}
