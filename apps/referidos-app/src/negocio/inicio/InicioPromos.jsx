import React, { useMemo, useState } from "react";
import { Calendar, CheckCircle2, Clock, PauseCircle } from "lucide-react";
import { Link } from "react-router-dom";
import SectionTitle from "../../components/sections/SectionTitle";
import { formatDateIsoToDdMmYyyy } from "../../utils/dateUtils";

const STATUS_META = {
  activo: {
    label: "Activa",
    color: "#10B981",
    bg: "#10B98122",
    Icon: CheckCircle2,
  },
  pendiente: {
    label: "Pendiente",
    color: "#F59E0B",
    bg: "#F59E0B22",
    Icon: Clock,
  },
  inactivo: {
    label: "Inactiva",
    color: "#64748B",
    bg: "#94A3B822",
    Icon: PauseCircle,
  },
};

function SummaryCard({ label, value, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-2xl border px-3 py-3 text-center shadow-sm transition ${
        active
          ? "border-[#5E30A5] bg-[#F3EEFF]"
          : "border-[#E9E2F7] bg-white hover:border-[#5E30A5]/40"
      }`}
    >
      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-xl font-semibold text-[#2F1A55]">
        {value}
      </div>
    </button>
  );
}

export default function InicioPromos({ promos = [], stats }) {
  const [activeFilter, setActiveFilter] = useState(null);
  const filteredPromos = useMemo(() => {
    if (!activeFilter) return promos;
    return promos.filter((promo) => promo.estado === activeFilter);
  }, [activeFilter, promos]);
  const latest = useMemo(() => filteredPromos.slice(0, 3), [filteredPromos]);
  const safeStats = stats || { activas: 0, pendientes: 0, inactivas: 0 };

  return (
    <section className="mt-8 px-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <SectionTitle>Promos</SectionTitle>
          <p className="text-xs text-slate-500">
            Resumen rapido de tus promociones actuales.
          </p>
        </div>
        <Link
          to="/negocio/gestionar"
          className="inline-flex items-center rounded-full border border-[#E9E2F7] bg-white px-3 py-1 text-[11px] font-semibold text-slate-500 hover:text-[#5E30A5]"
        >
          Ver todas
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <SummaryCard
          label="Activas"
          value={safeStats.activas}
          active={activeFilter === "activo"}
          onClick={() =>
            setActiveFilter((prev) => (prev === "activo" ? null : "activo"))
          }
        />
        <SummaryCard
          label="Pendientes"
          value={safeStats.pendientes}
          active={activeFilter === "pendiente"}
          onClick={() =>
            setActiveFilter((prev) =>
              prev === "pendiente" ? null : "pendiente"
            )
          }
        />
        <SummaryCard
          label="Inactivas"
          value={safeStats.inactivas}
          active={activeFilter === "inactivo"}
          onClick={() =>
            setActiveFilter((prev) =>
              prev === "inactivo" ? null : "inactivo"
            )
          }
        />
      </div>

      <div className="mt-5 space-y-3">
        {latest.map((promo) => {
          const meta = STATUS_META[promo.estado] || STATUS_META.inactivo;
          const Icon = meta.Icon;
          return (
            <article
              key={promo.id}
              className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-[#2F1A55]">
                    {promo.titulo || "Promo"}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                    {promo.descripcion || "Sin descripcion"}
                  </p>
                </div>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold"
                  style={{
                    background: meta.bg,
                    color: meta.color,
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <Icon size={12} />
                  {meta.label}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={12} />
                  {formatDateIsoToDdMmYyyy(promo.fechacreacion || promo.inicio)}
                </span>
              </div>
            </article>
          );
        })}
        {latest.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#E9E2F7] bg-white px-4 py-6 text-center text-xs text-slate-500">
            No hay promociones para este estado.
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          to="/negocio/gestionar"
          className="inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
        >
          Gestionar promos
        </Link>
        <Link
          to="/negocio/gestionar"
          className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-4 py-2 text-xs font-semibold text-slate-500 hover:text-[#5E30A5]"
        >
          Crear promo
        </Link>
      </div>
    </section>
  );
}
