import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, PlusCircle, Sparkles } from "lucide-react";

const EMPTY_COPY = {
  promos: {
    title: "Aun no tienes promos activas",
    description:
      "Crea tu primera promo y empieza a atraer nuevos clientes hoy mismo.",
  },
  error: {
    title: "No pudimos cargar tu panel",
    description:
      "Intenta nuevamente en unos minutos o revisa tu conexion.",
  },
};

export default function InicioEmptyState({ variant = "promos", onRetry }) {
  const content = EMPTY_COPY[variant] || EMPTY_COPY.promos;
  const Icon = variant === "error" ? AlertTriangle : Sparkles;

  return (
    <section className="mt-8 px-4">
      <div className="mx-auto max-w-sm text-center">
        <div className="mx-auto h-14 w-14 rounded-xl bg-[#F3EEFF] text-[#5E30A5] flex items-center justify-center">
          <Icon size={22} />
        </div>
        <h3 className="mt-4 text-base font-semibold text-[#2F1A55]">
          {content.title}
        </h3>
        <p className="mt-2 text-xs text-slate-500">{content.description}</p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {variant === "error" ? (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-4 py-2 text-xs font-semibold text-slate-500 hover:text-[#5E30A5]"
            >
              Reintentar
            </button>
          ) : (
            <Link
              to="/negocio/gestionar"
              className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-4 py-2 text-xs font-semibold text-slate-500 hover:text-[#5E30A5]"
            >
              <PlusCircle size={14} />
              Crear promo
            </Link>
          )}
          <Link
            to="/negocio/gestionar"
            className="inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
          >
            Gestionar promos
          </Link>
        </div>
      </div>
    </section>
  );
}
