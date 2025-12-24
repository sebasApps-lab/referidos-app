import React from "react";
import { Link } from "react-router-dom";
import { Search, QrCode, Sparkles } from "lucide-react";

const EMPTY_COPY = {
  promos: {
    title: "Aun no hay promos activas",
    description:
      "Estamos preparando nuevas ofertas para tu zona. Mientras tanto, explora otras opciones.",
  },
  search: {
    title: "No encontramos coincidencias",
    description:
      "Prueba con otro termino o ajusta los filtros para ver mas resultados.",
  },
};

export default function InicioEmptyState({ variant = "promos", onClear }) {
  const content = EMPTY_COPY[variant] || EMPTY_COPY.promos;

  return (
    <section className="mt-8 px-4">
      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-6 text-center shadow-sm">
        <div className="mx-auto h-14 w-14 rounded-xl bg-[#F3EEFF] text-[#5E30A5] flex items-center justify-center">
          <Sparkles size={22} />
        </div>
        <h3 className="mt-4 text-base font-semibold text-[#2F1A55]">
          {content.title}
        </h3>
        <p className="mt-2 text-xs text-slate-500">{content.description}</p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {variant === "search" ? (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-4 py-2 text-xs font-semibold text-slate-500 hover:text-[#5E30A5]"
            >
              <Search size={14} />
              Limpiar busqueda
            </button>
          ) : (
            <Link
              to="/cliente/inicio"
              className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-4 py-2 text-xs font-semibold text-slate-500 hover:text-[#5E30A5]"
            >
              <Search size={14} />
              Explorar promos
            </Link>
          )}
          <Link
            to="/cliente/escanear"
            className="inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
          >
            <QrCode size={14} />
            Escanear QR
          </Link>
        </div>
      </div>
    </section>
  );
}
