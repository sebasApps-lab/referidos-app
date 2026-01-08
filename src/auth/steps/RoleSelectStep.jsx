import { useEffect, useState } from "react";

const cards = [
  {
    key: "cliente",
    title: "Cliente",
    desc: "Gana y canjea promociones escaneando codigos.",
  },
  {
    key: "negocio",
    title: "Negocio",
    desc: "Administra promos y canjes para tus sucursales.",
  },
];

export default function RoleSelectStep({ error, onSubmit }) {
  const [selected, setSelected] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [persisting, setPersisting] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleNext = async () => {
    if (!selected || persisting) return;
    try {
      setPersisting(true);
      await onSubmit?.(selected);
    } finally {
      setPersisting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mt-2">
      <div
        className={`rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl transition-all duration-500 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {error ? (
          <div className="text-center text-sm text-red-300 mb-3">{error}</div>
        ) : null}

        <div className="space-y-1 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-white/60">
            Tipo de cuenta
          </p>
          <h1 className="text-2xl font-semibold text-white">
            Como quieres continuar?
          </h1>
          <p className="text-sm text-white/60">
            Elige tu rol para entrar con la experiencia adecuada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {cards.map((card, idx) => {
            const isActive = selected === card.key;
            return (
              <button
                key={card.key}
                onClick={() => setSelected(card.key)}
                className={`text-left rounded-2xl border transition-all duration-300 p-5 h-full ${
                  isActive
                    ? "border-[#FFC21C]/80 bg-white/10 shadow-lg shadow-[#ffc21c1f]"
                    : "border-white/10 bg-white/0 hover:bg-white/5"
                }`}
                style={{
                  animation: mounted
                    ? `fadeIn 0.35s ease ${idx * 0.05}s both`
                    : "none",
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {card.title}
                    </h2>
                    <p className="text-sm text-white/60 mt-1">{card.desc}</p>
                  </div>
                  <span
                    className={`w-3.5 h-3.5 rounded-full border ${
                      isActive
                        ? "bg-[#FFC21C] border-[#FFC21C]"
                        : "border-white/40"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleNext}
            disabled={!selected || persisting}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              selected && !persisting
                ? "bg-[#FFC21C] text-[#0F172A] shadow-lg shadow-[#ffc21c33] active:scale-[0.99]"
                : "bg-white/10 text-white/60 cursor-not-allowed"
            }`}
          >
            {persisting ? "Guardando..." : "Registrarse"}
          </button>
        </div>

        <div className="text-center text-xs text-white/50 mt-4">
          Pantalla de bienvenida. Selecciona tu rol y continua con la
          experiencia adecuada.
        </div>
      </div>
    </div>
  );
}
