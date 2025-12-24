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
      <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 text-center shadow-[0_24px_50px_rgba(15,23,42,0.1)]">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-[#F2C6A0] text-white flex items-center justify-center">
          <Sparkles size={22} />
        </div>
        <h3 className="mt-4 text-base font-semibold text-[#1D1B1A]">
          {content.title}
        </h3>
        <p className="mt-2 text-xs text-black/50">{content.description}</p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {variant === "search" ? (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-black/60"
            >
              <Search size={14} />
              Limpiar busqueda
            </button>
          ) : (
            <Link
              to="/cliente/inicio"
              className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-black/60"
            >
              <Search size={14} />
              Explorar promos
            </Link>
          )}
          <Link
            to="/cliente/escanear"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#1D1B1A] px-4 py-2 text-xs font-semibold text-white shadow"
          >
            <QrCode size={14} />
            Escanear QR
          </Link>
        </div>
      </div>
    </section>
  );
}
