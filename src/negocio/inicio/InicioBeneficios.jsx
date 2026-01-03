import React from "react";
import {
  ArrowUpRight,
  Crown,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getNegocioPlanMeta } from "../services/negocioUI";

const BENEFITS = [
  {
    title: "Promos mejor posicionadas",
    description: "Destaca tus ofertas en momentos clave.",
    icon: Sparkles,
    color: "#5E30A5",
  },
  {
    title: "Metricas claras",
    description: "Entiende el impacto de cada promocion.",
    icon: TrendingUp,
    color: "#4B2488",
  },
  {
    title: "Soporte confiable",
    description: "Atencion prioritaria para tu equipo.",
    icon: ShieldCheck,
    color: "#2F1A55",
  },
];

export default function InicioBeneficios({ negocio, usuario }) {
  const plan = getNegocioPlanMeta({ negocio, usuario });

  return (
    <section className="mt-10 px-4 pb-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[#2F1A55]">
            Beneficios de tu plan
          </h3>
          <p className="text-xs text-slate-500">
            Plan actual: {plan.label}
          </p>
        </div>
        <span
          className="rounded-full px-3 py-1 text-[11px] font-semibold border"
          style={{
            background: "#F3EEFF",
            color: "#5E30A5",
            borderColor: "#E9E2F7",
          }}
        >
          {plan.badge} Activo
        </span>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {BENEFITS.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <div
              key={benefit.title}
              className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm"
            >
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center text-white"
                style={{ background: benefit.color }}
              >
                <Icon size={18} />
              </div>
              <h4 className="mt-3 text-sm font-semibold text-[#2F1A55]">
                {benefit.title}
              </h4>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          );
        })}
      </div>

      <div
        className="mt-4 rounded-2xl border border-[#E9E2F7] p-4"
        style={{
          background: "linear-gradient(135deg, #FFFFFF 0%, #F6F1FF 100%)",
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-xl bg-[#F3EEFF] text-[#5E30A5] flex items-center justify-center">
              <Crown size={16} />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#2F1A55]">
                Desbloquea mas alcance
              </p>
              <p className="text-[11px] text-slate-500">
                Explora planes con mayor visibilidad.
              </p>
            </div>
          </div>
          <Link
            to="/negocio/perfil"
            className="inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-3 py-2 text-xs font-semibold text-white shadow-sm"
          >
            Ver planes
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
