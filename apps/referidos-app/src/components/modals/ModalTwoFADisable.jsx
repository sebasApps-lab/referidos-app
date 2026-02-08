import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { useModal } from "../../modals/useModal";
import { supabase } from "../../lib/supabaseClient";
import { syncTotpFlags, unenrollFactor } from "../../services/mfaService";

export default function ModalTwoFADisable({ factorId, onDisabled }) {
  const { closeModal } = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      setEmail(data?.session?.user?.email || "");
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleDisable = async () => {
    setError("");
    if (!email) {
      setError("No se pudo obtener el correo.");
      return;
    }
    if (!password) {
      setError("Ingresa tu contrasena.");
      return;
    }
    if (!factorId) {
      setError("No se pudo identificar el factor.");
      return;
    }
    setSending(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;

      const result = await unenrollFactor(factorId);
      if (!result.ok) {
        throw new Error(result.error || "No se pudo desactivar MFA");
      }
      await syncTotpFlags({ enabled: false });
      closeModal();
      onDisabled?.();
    } catch (err) {
      setError(err?.message || "No se pudo desactivar MFA");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-gray-700 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <AlertTriangle size={16} />
          Desactivar 2FA
        </div>
        <button
          type="button"
          onClick={closeModal}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Confirma tu contrasena para desactivar la autenticacion en dos pasos.
      </p>
      <div className="mt-4 space-y-3 text-sm text-gray-700">
        <div className="space-y-1">
          <label className="block text-xs text-gray-500 ml-1">Contrasena</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30"
            placeholder="********"
          />
        </div>
        {error ? <div className="text-xs text-red-500">{error}</div> : null}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-semibold text-gray-600"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleDisable}
            disabled={sending}
            className="flex-1 rounded-lg bg-[#5E30A5] py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {sending ? "Desactivando..." : "Desactivar"}
          </button>
        </div>
      </div>
    </div>
  );
}
