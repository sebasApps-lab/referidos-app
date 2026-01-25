import React, { useMemo } from "react";

const DEFAULT_MARKDOWN = "# Documento\n\nContenido pendiente.";

function parseMarkdown(text) {
  const lines = String(text || DEFAULT_MARKDOWN).split(/\r?\n/);
  const blocks = [];
  let listItems = [];
  let key = 0;

  const flushList = () => {
    if (!listItems.length) return;
    const items = listItems.map((item) => (
      <li key={`li-${key++}`} className="ml-5 list-disc">
        {item}
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
          {trimmed.slice(4)}
        </h3>
      );
      return;
    }
    if (trimmed.startsWith("## ")) {
      blocks.push(
        <h2 key={`h2-${key++}`} className="mt-8 text-lg font-semibold text-slate-900">
          {trimmed.slice(3)}
        </h2>
      );
      return;
    }
    if (trimmed.startsWith("# ")) {
      blocks.push(
        <h1 key={`h1-${key++}`} className="mt-8 text-xl font-semibold text-slate-900">
          {trimmed.slice(2)}
        </h1>
      );
      return;
    }

    blocks.push(
      <p key={`p-${key++}`} className="mt-3 text-sm leading-7 text-slate-700">
        {trimmed}
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
