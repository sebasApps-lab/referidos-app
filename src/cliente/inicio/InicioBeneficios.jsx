import React from "react";
import { Gift, Sparkles, Compass, ShieldCheck } from "lucide-react";
import { getTierMeta } from "../services/clienteUI";

const BENEFITS = [
  {
    title: "Promos curadas",
    description: "Recibe recomendaciones basadas en tu zona y actividad.",
    icon: Sparkles,
    color: "#E07A5F",
  },
  {
    title: "Invita y suma",
    description: "Cada referido te acerca a beneficios exclusivos.",
    icon: Gift,
    color: "#3D5A80",
  },
  {
    title: "Explora sin friccion",
    description: "Filtra por sector, valoracion y cercania.",
    icon: Compass,
    color: "#2D6A6E",
  },
  {
    title: "Cuenta segura",
    description: "Gestiona accesos y notificaciones en un solo lugar.",
    icon: ShieldCheck,
    color: "#C2410C",
  },
];

export default function InicioBeneficios({ usuario }) {
  const tier = getTierMeta(usuario);

  return (
    <section className="mt-10 px-4 pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#1D1B1A]">
            Beneficios de tu tier
          </h3>
          <p className="text-xs text-black/50">
            Nivel actual: {tier.label}
          </p>
        </div>
        <span
          className="rounded-full px-3 py-1 text-[11px] font-semibold"
          style={{
            background: `${tier.glow}66`,
            color: tier.accent,
            border: `1px solid ${tier.glow}`,
          }}
        >
          {tier.badge} Activo
        </span>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <article
              key={benefit.title}
              className="rounded-3xl border border-white/60 bg-white/85 p-4 shadow-sm"
            >
              <span
                className="h-10 w-10 rounded-2xl flex items-center justify-center text-white"
                style={{ background: benefit.color }}
              >
                <Icon size={18} />
              </span>
              <h4 className="mt-3 text-sm font-semibold text-[#1D1B1A]">
                {benefit.title}
              </h4>
              <p className="mt-1 text-xs text-black/55 leading-relaxed">
                {benefit.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
