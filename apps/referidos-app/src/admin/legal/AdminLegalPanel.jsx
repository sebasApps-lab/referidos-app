import React, { useEffect, useMemo, useState } from "react";
import { FileCheck2, FileText, Scale, Search, ShieldCheck, Tag } from "lucide-react";
import MarkdownArticle from "../docs/MarkdownArticle";
import { LEGAL_DOCS, LEGAL_POLICY_SUMMARY } from "./legalDocsRegistry";

function byTitleAsc(a, b) {
  return String(a.title || "").localeCompare(String(b.title || ""), "es", { sensitivity: "base" });
}

function statusLabel(statusKey) {
  const key = String(statusKey || "").toLowerCase();
  if (key === "approved_public_brand_kit") return "Approved (public kit)";
  if (key === "approved_cc_by_attribution") return "Approved (CC BY)";
  if (key === "restricted_license_required") return "Restricted (license)";
  if (key === "conditional_review_required") return "Conditional (review)";
  if (key === "generic_fallback") return "Fallback";
  return key;
}

export default function AdminLegalPanel() {
  const [search, setSearch] = useState("");
  const [activeDocId, setActiveDocId] = useState(LEGAL_DOCS[0]?.id || "");

  const filteredDocs = useMemo(() => {
    const query = search.trim().toLowerCase();
    return LEGAL_DOCS
      .filter((doc) => {
        if (!query) return true;
        return (
          doc.title.toLowerCase().includes(query) ||
          doc.pathLabel.toLowerCase().includes(query) ||
          doc.documentId.toLowerCase().includes(query) ||
          doc.version.toLowerCase().includes(query)
        );
      })
      .sort(byTitleAsc);
  }, [search]);

  useEffect(() => {
    if (!filteredDocs.length) {
      setActiveDocId("");
      return;
    }
    if (!filteredDocs.some((doc) => doc.id === activeDocId)) {
      setActiveDocId(filteredDocs[0].id);
    }
  }, [activeDocId, filteredDocs]);

  const activeDoc = useMemo(
    () => filteredDocs.find((doc) => doc.id === activeDocId) || null,
    [activeDocId, filteredDocs],
  );

  const statusRows = useMemo(
    () =>
      Object.entries(LEGAL_POLICY_SUMMARY.statusCounts || {})
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([status, count]) => ({ status, count })),
    [],
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-slate-500">
            <Scale size={14} />
            Policy runtime
          </div>
          <div className="mt-2 text-lg font-extrabold text-[#2F1A55]">
            {LEGAL_POLICY_SUMMARY.version}
          </div>
          <div className="mt-1 text-xs text-slate-500">Owner: {LEGAL_POLICY_SUMMARY.owner}</div>
        </div>

        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-slate-500">
            <ShieldCheck size={14} />
            Review cycle
          </div>
          <div className="mt-2 text-lg font-extrabold text-[#2F1A55]">
            {LEGAL_POLICY_SUMMARY.reviewIntervalDays} dias
          </div>
          <div className="mt-1 text-xs text-slate-500">Revalidacion obligatoria</div>
        </div>

        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-slate-500">
            <Tag size={14} />
            Logos activos
          </div>
          <div className="mt-2 text-lg font-extrabold text-[#2F1A55]">
            {LEGAL_POLICY_SUMMARY.logosEnabled}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Fallback: {LEGAL_POLICY_SUMMARY.fallbackOnly}
          </div>
        </div>

        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-slate-500">
            <FileCheck2 size={14} />
            Docs legales
          </div>
          <div className="mt-2 text-lg font-extrabold text-[#2F1A55]">{LEGAL_DOCS.length}</div>
          <div className="mt-1 text-xs text-slate-500">Con version explicita</div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          Estado legal por tipo
        </div>
        <div className="flex flex-wrap gap-2">
          {statusRows.map((row) => (
            <div
              key={row.status}
              className="rounded-full border border-[#E9E2F7] bg-[#FCFBFF] px-3 py-1 text-xs text-slate-700"
            >
              <span className="font-semibold text-[#5E30A5]">{statusLabel(row.status)}:</span>{" "}
              {row.count}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
        <div className="relative">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por documento, version, id o ruta..."
            className="w-full rounded-xl border border-[#E9E2F7] bg-white py-2 pl-9 pr-3 text-xs text-slate-700 outline-none focus:border-[#5E30A5]"
          />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-[#E9E2F7] bg-white p-3 shadow-sm">
          <div className="mb-2 flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
            <FileText size={14} />
            Documentos legales
          </div>
          <div className="space-y-1">
            {filteredDocs.map((doc) => {
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
                  <div className="mt-1 text-[11px] text-slate-500">{doc.pathLabel}</div>
                  <div className="mt-1 flex items-center justify-between gap-2 text-[10px]">
                    <span className="rounded-full border border-[#E4D6FF] bg-[#F8F3FF] px-2 py-0.5 text-[#5E30A5]">
                      v{doc.version}
                    </span>
                    <span className="text-slate-400">{doc.updatedAt}</span>
                  </div>
                </button>
              );
            })}
            {!filteredDocs.length ? (
              <div className="rounded-xl border border-dashed border-[#E9E2F7] px-3 py-4 text-xs text-slate-500">
                No hay documentos legales que coincidan con el filtro.
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
                <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                  <span className="rounded-full border border-[#E4D6FF] bg-[#F8F3FF] px-2 py-0.5 text-[#5E30A5]">
                    Version: {activeDoc.version}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-600">
                    Doc ID: {activeDoc.documentId}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-600">
                    Updated: {activeDoc.updatedAt}
                  </span>
                </div>
              </div>
              <MarkdownArticle markdown={activeDoc.markdown} />
            </>
          ) : (
            <div className="rounded-2xl border border-[#E9E2F7] bg-white px-4 py-8 text-sm text-slate-500 shadow-sm">
              Selecciona un documento legal para visualizar su contenido.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

