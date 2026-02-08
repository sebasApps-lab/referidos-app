import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import LegalContent from "../../legal/blocks/LegalContent";
import privacyEs from "../../legal/content/es/privacy.md?raw";
import termsEs from "../../legal/content/es/terms.md?raw";
import dataDeletionEs from "../../legal/content/es/data-deletion.md?raw";

const LEGAL_DOCS = {
  privacy: {
    title: "Privacidad",
    subtitle: "Como tratamos tus datos en ReferidosAPP.",
    markdown: privacyEs,
  },
  terms: {
    title: "Terminos",
    subtitle: "Condiciones de uso de la plataforma.",
    markdown: termsEs,
  },
  "delete-data": {
    title: "Borrado de datos",
    subtitle: "Como solicitar eliminacion de informacion.",
    markdown: dataDeletionEs,
  },
};

export default function LegalSimplePage({ doc = "terms" }) {
  const current = useMemo(() => LEGAL_DOCS[doc] || LEGAL_DOCS.terms, [doc]);

  return (
    <div className="min-h-screen bg-[#F5F2FF] text-[#1F1235]">
      <div className="mx-auto w-full max-w-5xl px-6 pb-12 pt-8">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="rounded-full border border-[#D8CCFF] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#5E30A5] transition-colors hover:bg-[#F3ECFF]"
            >
              Volver
            </Link>
            <span className="text-lg font-semibold">ReferidosAPP</span>
          </div>
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <Link
              to="/privacy"
              className={`rounded-full px-3 py-1.5 transition-colors ${
                doc === "privacy" ? "bg-[#5E30A5] text-white" : "text-[#5E30A5] hover:bg-white"
              }`}
            >
              Privacidad
            </Link>
            <Link
              to="/terms"
              className={`rounded-full px-3 py-1.5 transition-colors ${
                doc === "terms" ? "bg-[#5E30A5] text-white" : "text-[#5E30A5] hover:bg-white"
              }`}
            >
              Terminos
            </Link>
            <Link
              to="/delete-data"
              className={`rounded-full px-3 py-1.5 transition-colors ${
                doc === "delete-data" ? "bg-[#5E30A5] text-white" : "text-[#5E30A5] hover:bg-white"
              }`}
            >
              Borrado de datos
            </Link>
          </nav>
        </header>

        <section className="rounded-3xl border border-[#DED5FF] bg-white px-6 py-7 shadow-[0_18px_42px_rgba(31,18,53,0.08)] md:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7B6DAA]">
            Informacion legal
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#1F1235]">{current.title}</h1>
          <p className="mt-2 text-sm text-slate-600">{current.subtitle}</p>
          <LegalContent markdown={current.markdown} />
        </section>
      </div>
    </div>
  );
}

