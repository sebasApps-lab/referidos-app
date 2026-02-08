import { useState } from "react";
import { X } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useModal } from "../../modals/useModal";

export default function ModalPasswordReauth({ email, onConfirm }) {
  const { closeModal } = useModal();
  const [password, setPassword] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!email) {
      setError("No se pudo obtener el correo.");
      return;
    }
    if (!password) {
      setError("Ingresa tu contrasena.");
      return;
    }
    setSending(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
      closeModal();
      onConfirm?.();
    } catch (err) {
      setError(err?.message || "No se pudo verificar la contrasena");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-gray-700 shadow-2xl">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">
          Confirma tu contrasena
        </span>
        <button
          type="button"
          onClick={closeModal}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>
      </div>
      <div className="mt-4 space-y-3 text-sm text-gray-700">
        <div className="space-y-1">
          <label className="block text-xs text-gray-500 ml-1">
            Contrasena
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30"
            placeholder="••••••••"
          />
        </div>
        {error ? <div className="text-xs text-red-500">{error}</div> : null}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={sending}
          className="w-full rounded-lg bg-[#5E30A5] py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {sending ? "Verificando..." : "Continuar"}
        </button>
      </div>
    </div>
  );
}
