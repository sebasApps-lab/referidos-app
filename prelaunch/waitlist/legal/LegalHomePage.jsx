import React from "react";
import { Link } from "react-router-dom";

export default function LegalHomePage() {
  const navLinkClass = "px-2 py-1.5 font-semibold text-[#5E30A5] transition-colors hover:text-[#2B174A]";
  const separatorClass =
    "inline-flex h-5 w-px bg-gradient-to-b from-transparent via-[#7E73A2]/55 to-transparent";

  return (
    <div className="min-h-screen bg-[#F5F2FF] text-[#1F1235]">
      <div className="mx-auto w-full max-w-5xl px-6 pb-12 pt-8">
        <header className="mb-8 flex items-center justify-between gap-4">
          <Link to="/" className="text-lg font-semibold hover:opacity-85">
            ReferidosAPP
          </Link>
          <nav className="flex flex-wrap items-center text-sm">
            <Link to="/legal/es/privacidad" className={navLinkClass}>
              Politica de Privacidad
            </Link>
            <span aria-hidden="true" className={separatorClass} />
            <Link to="/legal/es/terminos" className={navLinkClass}>
              Términos y Condiciones
            </Link>
            <span aria-hidden="true" className={separatorClass} />
            <Link to="/legal/es/borrar-datos" className={navLinkClass}>
              Borrar mis datos
            </Link>
          </nav>
        </header>

        <section className="rounded-3xl border border-[#DED5FF] bg-white px-6 py-8 shadow-[0_18px_42px_rgba(31,18,53,0.08)] md:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7B6DAA]">
            Informacion legal
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#1F1235]">Legal y privacidad</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
            Esta seccion explica de forma clara como usamos la informacion, cuales son las reglas de uso y
            como puedes solicitar el borrado de tus datos.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Link
              to="/legal/es/privacidad"
              className="rounded-2xl border border-[#E3D9FF] bg-[#FAF8FF] px-5 py-5 transition-colors hover:bg-[#F1EBFF]"
            >
              <h2 className="text-base font-semibold text-[#2B174A]">Privacidad</h2>
              <p className="mt-2 text-sm text-slate-600">Como protegemos y tratamos tus datos.</p>
            </Link>

            <Link
              to="/legal/es/terminos"
              className="rounded-2xl border border-[#E3D9FF] bg-[#FAF8FF] px-5 py-5 transition-colors hover:bg-[#F1EBFF]"
            >
              <h2 className="text-base font-semibold text-[#2B174A]">Terminos</h2>
              <p className="mt-2 text-sm text-slate-600">Condiciones para usar ReferidosAPP.</p>
            </Link>

            <Link
              to="/legal/es/borrar-datos"
              className="rounded-2xl border border-[#E3D9FF] bg-[#FAF8FF] px-5 py-5 transition-colors hover:bg-[#F1EBFF]"
            >
              <h2 className="text-base font-semibold text-[#2B174A]">Borrar datos</h2>
              <p className="mt-2 text-sm text-slate-600">Guia para solicitar eliminacion de informacion.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
