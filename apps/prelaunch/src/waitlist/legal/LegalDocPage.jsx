import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import LegalContent from "../../legal/blocks/LegalContent";
import { getLegalMarkdown } from "@referidos/legal-content/prelaunch";

const LEGAL_DOCS = {
  "politicas-privacidad-lista": {
    title: "Privacidad",
    subtitle: "Como tratamos tus datos en ReferidosAPP.",
    markdown: getLegalMarkdown("politicas-privacidad-lista", "es"),
  },
  "terminos-condiciones-lista": {
    title: "Terminos",
    subtitle: "Condiciones de uso de la plataforma.",
    markdown: getLegalMarkdown("terminos-condiciones-lista", "es"),
  },
  "borrar-correo-lista": {
    title: "Borrar correo de lista",
    subtitle: "Como solicitar eliminacion de datos.",
    markdown: getLegalMarkdown("borrar-correo-lista", "es"),
  },
};

export default function LegalDocPage() {
  const { doc = "terminos-condiciones-lista" } = useParams();
  const current = useMemo(
    () => LEGAL_DOCS[doc] || LEGAL_DOCS["terminos-condiciones-lista"],
    [doc],
  );
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
              to="/ayuda/es/articulo/politicas-privacidad-lista"
              className={`px-2 py-1.5 transition-colors ${
                doc === "politicas-privacidad-lista" ? activeDocClass : inactiveDocClass
              }`}
            >
              Politica de Privacidad
            </Link>
            <span aria-hidden="true" className={separatorClass} />
            <Link
              to="/ayuda/es/articulo/terminos-condiciones-lista"
              className={`px-2 py-1.5 transition-colors ${
                doc === "terminos-condiciones-lista" ? activeDocClass : inactiveDocClass
              }`}
            >
              Terminos y Condiciones
            </Link>
            <span aria-hidden="true" className={separatorClass} />
            <Link
              to="/ayuda/es/articulo/borrar-correo-lista"
              className={`px-2 py-1.5 transition-colors ${
                doc === "borrar-correo-lista" ? activeDocClass : inactiveDocClass
              }`}
            >
              Borrar mi correo
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
