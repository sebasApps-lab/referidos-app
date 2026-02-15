import React, { useEffect, useMemo, useState } from "react";
import { BookOpen, FileText, Search } from "lucide-react";
import { DOC_GROUPS, DOCS_REGISTRY } from "./docsRegistry";
import MarkdownArticle from "./MarkdownArticle";

function byTitleAsc(a, b) {
  return String(a.title || "").localeCompare(String(b.title || ""), "es", { sensitivity: "base" });
}

export default function AdminDocumentationPanel() {
  const [activeGroup, setActiveGroup] = useState(DOC_GROUPS[0].key);
  const [search, setSearch] = useState("");
  const [activeDocId, setActiveDocId] = useState("");

  const docsForGroup = useMemo(() => {
    const query = search.trim().toLowerCase();
    return DOCS_REGISTRY
      .filter((doc) => doc.group === activeGroup)
      .filter((doc) => {
        if (!query) return true;
        return (
          doc.title.toLowerCase().includes(query) ||
          doc.pathLabel.toLowerCase().includes(query) ||
          String(doc.markdown || "").toLowerCase().includes(query)
        );
      })
      .sort(byTitleAsc);
  }, [activeGroup, search]);

  useEffect(() => {
    if (!docsForGroup.length) {
      setActiveDocId("");
      return;
    }
    if (!docsForGroup.some((doc) => doc.id === activeDocId)) {
      setActiveDocId(docsForGroup[0].id);
    }
  }, [activeDocId, docsForGroup]);

  const activeDoc = useMemo(
    () => docsForGroup.find((doc) => doc.id === activeDocId) || null,
    [activeDocId, docsForGroup]
  );

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {DOC_GROUPS.map((group) => (
            <button
              key={group.key}
              type="button"
              onClick={() => setActiveGroup(group.key)}
              className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                activeGroup === group.key
                  ? "border-[#5E30A5] bg-[#F4EEFF] text-[#5E30A5]"
                  : "border-[#E9E2F7] bg-white text-slate-600 hover:bg-[#FAF8FF]"
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>

        <div className="mt-3 relative">
          <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por titulo, ruta o contenido..."
            className="w-full rounded-xl border border-[#E9E2F7] bg-white py-2 pl-9 pr-3 text-xs text-slate-700 outline-none focus:border-[#5E30A5]"
          />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-[#E9E2F7] bg-white p-3 shadow-sm">
          <div className="mb-2 flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
            <BookOpen size={14} />
            Documentos
          </div>
          <div className="space-y-1">
            {docsForGroup.map((doc) => {
              const active = doc.id === activeDocId;
              return (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => setActiveDocId(doc.id)}
                  className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                    active
                      ? "border-[#5E30A5] bg-[#F4EEFF]"
                      : "border-[#E9E2F7] bg-white hover:bg-[#FAF8FF]"
                  }`}
                >
                  <div className={`text-sm font-semibold ${active ? "text-[#5E30A5]" : "text-slate-700"}`}>
                    {doc.title}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                    <FileText size={12} />
                    <span className="truncate">{doc.pathLabel}</span>
                  </div>
                </button>
              );
            })}
            {!docsForGroup.length ? (
              <div className="rounded-xl border border-dashed border-[#E9E2F7] px-3 py-4 text-xs text-slate-500">
                No hay documentos que coincidan con el filtro.
              </div>
            ) : null}
          </div>
        </aside>

        <section className="space-y-3">
          {activeDoc ? (
            <>
              <div className="rounded-2xl border border-[#E9E2F7] bg-white px-4 py-3 shadow-sm">
                <div className="text-sm font-semibold text-[#2F1A55]">{activeDoc.title}</div>
                <div className="mt-1 text-xs text-slate-500">{activeDoc.pathLabel}</div>
              </div>
              <MarkdownArticle markdown={activeDoc.markdown} />
            </>
          ) : (
            <div className="rounded-2xl border border-[#E9E2F7] bg-white px-4 py-8 text-sm text-slate-500 shadow-sm">
              Selecciona un documento para visualizar su contenido.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

