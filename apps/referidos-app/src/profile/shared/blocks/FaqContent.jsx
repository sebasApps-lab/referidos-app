import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { FAQ_SECTIONS } from "../data/faqContent";

const AnswerBlock = ({ blocks = [] }) => {
  return (
    <div className="mt-3 space-y-3 text-[13px] leading-relaxed text-slate-600">
      {blocks.map((block, index) => {
        if (block.type === "text") {
          return <p key={`${block.type}-${index}`}>{block.text}</p>;
        }
        if (block.type === "steps") {
          return (
            <ol
              key={`${block.type}-${index}`}
              className="space-y-2 list-decimal pl-5 text-slate-600"
            >
              {block.items.map((item) => (
                <li key={item} className="pl-1">
                  {item}
                </li>
              ))}
            </ol>
          );
        }
        if (block.type === "list") {
          return (
            <ul
              key={`${block.type}-${index}`}
              className="space-y-2 list-disc pl-5 text-slate-600"
            >
              {block.items.map((item) => (
                <li key={item} className="pl-1">
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "note") {
          return (
            <div
              key={`${block.type}-${index}`}
              className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-[12px] text-[#4B2488]"
            >
              {block.text}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default function FaqContent({ onBack, audience }) {
  const [openItems, setOpenItems] = useState(() => new Set());

  const toggleItem = (id) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const sections = useMemo(() => {
    if (!audience) return FAQ_SECTIONS;
    return FAQ_SECTIONS.map((section) => {
      const sectionAudience = section.audience;
      if (sectionAudience && !sectionAudience.includes(audience)) {
        return { ...section, items: [] };
      }
      const filteredItems = section.items.filter((item) => {
        if (!item.audience) return true;
        return item.audience.includes(audience);
      });
      return { ...section, items: filteredItems };
    }).filter((section) => section.items.length > 0);
  }, [audience]);

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="mt-0.5 h-9 w-9 rounded-full border border-[#E9E2F7] bg-white text-[#5E30A5] flex items-center justify-center transition hover:bg-[#F4EEFF]"
            aria-label="Volver"
          >
            <ChevronLeft size={18} />
          </button>
        ) : null}
        <div>
          <h3 className="text-sm font-semibold text-[#2F1A55]">
            Preguntas frecuentes
          </h3>
          <p className="text-xs text-slate-500">
            Respuestas claras y paso a paso para usar Referidos.
          </p>
        </div>
      </div>

      {sections.map((section) => (
        <div key={section.id} className="space-y-3">
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#5E30A5]/70">
            {section.title}
          </div>
          <div className="space-y-3">
            {section.items.map((item) => {
              const isOpen = openItems.has(item.id);
              const contentBlocks =
                item.answerByRole?.[audience] ?? item.answer ?? [];
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#E9E2F7] bg-white px-4 py-3"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-start justify-between gap-3 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-[#2F1A55]">
                      {item.question}
                    </span>
                    <span
                      className={`mt-0.5 text-[#5E30A5] transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown size={18} />
                    </span>
                  </button>
                  {isOpen ? <AnswerBlock blocks={contentBlocks} /> : null}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
