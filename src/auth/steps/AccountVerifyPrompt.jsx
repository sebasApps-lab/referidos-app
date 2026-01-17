import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AccountVerifyPrompt({ innerRef, onSkip, onVerify }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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
      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-3 text-sm text-gray-700">
          <p className="font-semibold text-gray-900">
            Al verificar tu cuenta podras:
          </p>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>Publicar hasta 2 promociones adicionales</li>
            <li>Obtener mayor visibilidad en la app</li>
            <li>Mostrar tu perfil como cuenta verificada</li>
          </ul>
        </div>
        {error && (
          <p className="text-xs text-red-500 mt-3">{error}</p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => updateStatus("skipped")}
          className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold"
          disabled={saving}
        >
          Ahora no
        </button>
        <button
          type="button"
          onClick={() => updateStatus("in_progress")}
          className="flex-1 py-2.5 rounded-lg font-semibold bg-[#5E30A5] text-white shadow"
          disabled={saving}
        >
          Verificar
        </button>
      </div>
    </div>
  );
}
