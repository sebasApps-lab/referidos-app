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
    <div className="flex h-full flex-col pb-4" ref={innerRef}>
      <div className="space-y-4 text-gray-700">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
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

        <div className="space-y-3 text-sm text-gray-700">
          <p className="font-semibold text-gray-900">
            Al verificar tu cuenta podras:
          </p>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>Publicar hasta 2 promociones adicionales</li>
            <li>Tener mayor visibilidad frente a los usuarios</li>
            <li>Mostrar tu perfil como cuenta verificada</li>
          </ul>
          <div className="flex items-center gap-2 text-sm text-gray-700">
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
            Toma menos de 2 minutos
          </div>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>

      <div className="text-xs text-gray-500 text-center mt-6 mb-3">
        Puedes hacerlo mas tarde.
        Las cuentas verificadas obtienen mayor visibilidad.
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => updateStatus("skipped")}
          className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold"
          disabled={saving}
        >
          Mas tarde
        </button>
        <button
          type="button"
          onClick={() => updateStatus("in_progress")}
          className="flex-1 py-2.5 rounded-lg font-semibold bg-[#5E30A5] text-white shadow"
          disabled={saving}
        >
          Verificar ahora
        </button>
      </div>
    </div>
  );
}
