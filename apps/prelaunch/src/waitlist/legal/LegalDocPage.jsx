import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import LegalContent from "../../legal/blocks/LegalContent";
import privacyEs from "../../legal/content/es/privacy.md?raw";
import termsEs from "../../legal/content/es/terms.md?raw";
import dataDeletionEs from "../../legal/content/es/data-deletion.md?raw";

const LEGAL_DOCS = {
  privacidad: {
    title: "Privacidad",
    subtitle: "Como tratamos tus datos en ReferidosAPP.",
    markdown: privacyEs,
  },
  terminos: {
    title: "Terminos",
    subtitle: "Condiciones de uso de la plataforma.",
    markdown: termsEs,
  },
  "borrar-datos": {
    title: "Borrar datos",
    subtitle: "Como solicitar eliminacion de datos.",
    markdown: dataDeletionEs,
  },
};

export default function LegalDocPage() {
  const { doc = "terminos" } = useParams();
  const current = useMemo(() => LEGAL_DOCS[doc] || LEGAL_DOCS.terminos, [doc]);
  const activeDocClass = "text-[#2B174A]";
  const inactiveDocClass = "text-[#5E30A5] hover:text-[#2B174A]";
  const separatorClass =
    "inline-flex h-5 w-px bg-gradient-to-b from-transparent via-[#7E73A2]/55 to-transparent";

  return (
    <div className="min-h-screen bg-[#F5F2FF] text-[#1F1235]">
      <div className="mx-auto w-full max-w-5xl px-6 pb-12 pt-8">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="text-lg font-semibold hover:opacity-85">
            ReferidosAPP
          </Link>

          <nav className="flex flex-wrap items-center text-sm font-semibold">
            <Link
              to="/legal/es/privacidad"
              className={`px-2 py-1.5 transition-colors ${
                doc === "privacidad" ? activeDocClass : inactiveDocClass
              }`}
            >
              Politica de Privacidad
            </Link>
            <span aria-hidden="true" className={separatorClass} />
            <Link
              to="/legal/es/terminos"
              className={`px-2 py-1.5 transition-colors ${
                doc === "terminos" ? activeDocClass : inactiveDocClass
              }`}
            >
              Términos y Condiciones
            </Link>
            <span aria-hidden="true" className={separatorClass} />
            <Link
              to="/legal/es/borrar-datos"
              className={`px-2 py-1.5 transition-colors ${
                doc === "borrar-datos" ? activeDocClass : inactiveDocClass
              }`}
            >
              Borrar mis datos
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
