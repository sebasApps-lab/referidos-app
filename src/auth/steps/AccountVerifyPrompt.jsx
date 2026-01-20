import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAppStore } from "../../store/appStore";

export default function AccountVerifyPrompt({ innerRef, onSkip, onVerify }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const bootstrapAuth = useAppStore((s) => s.bootstrapAuth);

  const updateStatus = async (nextStatus) => {
    if (saving) return;
    setSaving(true);
    setError("");
    try {
      const session = (await supabase.auth.getSession())?.data?.session;
      const userId = session?.user?.id;
      if (!userId) {
        setError("No se pudo obtener sesion.");
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
      <div className="pb-4 flex h-full flex-col" ref={innerRef}>
        <div className="flex-1 flex flex-col gap-4 text-gray-700">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 mt-3">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-[#5E30A5]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3l7 3v6c0 5-3.5 9-7 12-3.5-3-7-7-7-12V6l7-3z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            Lleva tu cuenta al siguiente nivel
          </div>
          <p className="text-sm text-gray-600">
            Es opcional, pero te permitira aprovechar mucho mas la app.
          </p>

          <div className="-mx-2 mt-6 relative rounded-[28px] border border-[#E9E2F7] bg-white px-6 pb-8 pt-9">
            <div className="absolute -top-3 left-4 right-4">
              <span className="bg-white px-2 text-[16px] font-semibold text-gray-500">
                Al verificar tu cuenta podr€đs:
              </span>
            </div>
            <ul className="space-y-8 text-[13px] text-gray-600">
              <li>Publicar hasta 2 promociones adicionales</li>
              <li>Tener mayor visibilidad frente a los usuarios</li>
              <li>Mostrar tu perfil como cuenta verificada</li>
            </ul>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-700 text-center">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-[#5E30A5]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
              Te tomara menos de 3 minutos
            </div>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <div className="mt-auto space-y-4">
          <div className="text-xs text-gray-500 text-center mb-3">
            Puedes hacerlo mas tarde.
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
            Mas tarde
          </button>
        </div>
      </div>
    </section>
  );
}
