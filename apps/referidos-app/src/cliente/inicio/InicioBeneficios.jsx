import React from "react";
import { Gift, Sparkles, Compass, ShieldCheck } from "lucide-react";
import { getTierMeta } from "../services/clienteUI";

const BENEFITS = [
  {
    title: "Promos curadas",
    description: "Recomendaciones simples segun tu actividad.",
    icon: Sparkles,
    color: "#5E30A5",
  },
  {
    title: "Invita y suma",
    description: "Cada referido te acerca a beneficios.",
    icon: Gift,
    color: "#4B2488",
  },
  {
    title: "Explora rapido",
    description: "Filtra por sector sin fricciones.",
    icon: Compass,
    color: "#2F1A55",
  },
  {
    title: "Cuenta segura",
    description: "Controla accesos y notificaciones.",
    icon: ShieldCheck,
    color: "#5E30A5",
  },
];

export default function InicioBeneficios({ usuario }) {
  const tier = getTierMeta(usuario);

  return (
    <section className="mt-10 px-4 pb-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[#2F1A55]">
            Beneficios de tu tier
          </h3>
          <p className="text-xs text-slate-500">
            Nivel actual: {tier.label}
          </p>
        </div>
        <span className="rounded-full px-3 py-1 text-[11px] font-semibold bg-[#F3EEFF] text-[#5E30A5] border border-[#E9E2F7]">
          {tier.badge} Activo
        </span>
      </div>

      <div className="mt-4 divide-y divide-[#E9E2F7]">
        {BENEFITS.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <div key={benefit.title} className="flex items-start gap-3 py-3">
              <span
                className="h-10 w-10 rounded-xl flex items-center justify-center text-white"
                style={{ background: benefit.color }}
              >
                <Icon size={18} />
              </span>
              <div>
                <h4 className="text-sm font-semibold text-[#2F1A55]">
                  {benefit.title}
                </h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
