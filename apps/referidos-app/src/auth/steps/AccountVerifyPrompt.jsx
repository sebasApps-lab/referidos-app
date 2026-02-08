import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAppStore } from "../../store/appStore";

export default function AccountVerifyPrompt({
  innerRef,
  onSkip,
  onVerify,
  mode = "negocio",
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const bootstrapAuth = useAppStore((s) => s.bootstrapAuth);
  const isBusiness = mode === "negocio";

  const benefits = isBusiness
    ? [
        "Publicar hasta 2 promociones adicionales",
        "Tener mayor visibilidad frente a los usuarios",
        "Mostrar tu perfil como cuenta verificada",
      ]
    : [
        "Canjeo ilimitado de promociones disponibles",
        "Acumulación de puntos para mejorar beneficios",
        "Soporte proritario",
      ];

  const updateStatus = async (nextStatus) => {
    if (saving) return;
    setSaving(true);
    setError("");
    try {
      const session = (await supabase.auth.getSession())?.data?.session;
      const userId = session?.user?.id;
      if (!userId) {
        setError("No se pudo obtener sesión.");
        return;
      }
      const { error: updErr } = await supabase
        .from("usuarios")
        .update({ verification_status: nextStatus })
        .eq("id_auth", userId);
      if (updErr) {
        setError(updErr.message || "No se pudo actualizar el estado.");
        return;
      }
      await bootstrapAuth({ force: true });
      if (nextStatus === "in_progress") {
        onVerify?.();
      } else if (onSkip) {
        onSkip();
      } else {
        window.location.href = "/app";
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="h-full">
      <div className="pb-1 flex h-full flex-col" ref={innerRef}>
        <div className="flex-1 flex flex-col gap-4 text-gray-700">
          <div className="text-lg font-semibold text-gray-900 mt-3">
            Lleva tu cuenta al siguiente nivel
          </div>
          <p className="text-sm text-gray-600">
            Es opcional, pero te permitirá aprovechar mucho más la app.
          </p>

          <div className="-mx-2 mt-6 relative rounded-[28px] border border-[#E9E2F7] bg-white px-6 pb-8 pt-9">
            <div className="absolute -top-3 left-4 right-4">
              <span className="bg-white px-2 text-[16px] font-semibold text-gray-500">
                Al verificar tu cuenta podrás:
              </span>
            </div>
            <ul className="space-y-8 text-[13px] text-gray-600">
              {benefits.map((benefit, index) => {
                if (!isBusiness && index === 1) {
                  return (
                    <li key={benefit}>
                      Acumulación de puntos para mejorar beneficios (
                      <button
                        type="button"
                        onClick={(event) => event.preventDefault()}
                        className="text-[#5E30A5] font-semibold"
                      >
                        Ligas
                      </button>
                      )
                    </li>
                  );
                }
                return <li key={benefit}>{benefit}</li>;
              })}
            </ul>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-sm text-gray-700 text-center">
              Te tomará menos de 3 minutos
            </div>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <div className="mt-auto space-y-3 pt-4">
          <div className="text-xs text-gray-500 text-center mb-3">
            Puedes hacerlo más tarde.
            Las cuentas verificadas obtienen mayor visibilidad.
          </div>
          <button
            type="button"
            onClick={() => updateStatus("in_progress")}
            className="w-full py-2.5 rounded-lg font-semibold bg-[#5E30A5] text-white shadow"
            disabled={saving}
          >
            Verificar ahora
          </button>
          <button
            type="button"
            onClick={() => updateStatus("skipped")}
            className="w-full text-sm font-semibold text-gray-500 mt-1"
            disabled={saving}
          >
            Más tarde
          </button>
        </div>
      </div>
    </section>
  );
}
