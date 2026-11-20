import { useRef, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { useModal } from "../../modals/useModal";
import useTotpConfirmation from "../../hooks/useTotpConfirmation";
import { isTotpCode, refreshMfaSession, removeVerifiedTotp, syncTotpFlags } from "../../services/mfaService";
import TotpCodeField from "../auth/TotpCodeField";

export default function ModalTwoFADisable({ factorId, onDisabled }) {
  const { closeModal } = useModal();
  const { busy, code, updateCode, error, verified, confirm, run } = useTotpConfirmation();
  const [removed, setRemoved] = useState(false);
  const progressRef = useRef({ removed: false, synced: false, refreshed: false });
  const canSubmit = Boolean(factorId) && !busy && (verified || isTotpCode(code));

  const submit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    void confirm({ factorId, complete: async (authUserId) => {
      const progress = progressRef.current;
      if (!progress.removed) {
        const result = await removeVerifiedTotp({ factorId, authUserId });
        if (!result.ok) return result;
        progress.removed = true;
        setRemoved(true);
      }
      if (!progress.synced) {
        const result = await syncTotpFlags({ authUserId });
        if (!result.ok) return result;
        progress.synced = true;
      }
      if (!progress.refreshed) {
        const result = await refreshMfaSession(authUserId);
        if (!result.ok) return result;
        progress.refreshed = true;
      }
      const result = await onDisabled?.();
      if (result?.ok === false) return result;
      closeModal();
    } });
  };

  const cancel = () => run(async () => {
    if (progressRef.current.removed) await onDisabled?.();
    closeModal();
  });

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-sm rounded-2xl bg-white p-6 text-gray-700 shadow-2xl" role="dialog" aria-modal="true" aria-label="Desactivar verificación en dos pasos">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <AlertTriangle size={16} /> Desactivar 2FA
        </h2>
        <button type="button" onClick={cancel} disabled={busy} className="text-gray-400 hover:text-gray-600 disabled:opacity-60" aria-label="Cerrar">
          <X size={16} />
        </button>
      </div>
      <p className="mt-3 text-xs text-gray-500">
        {removed
          ? "El autenticador se eliminó. Falta actualizar el estado de tu perfil y tu sesión."
          : "Confirma con un código de tu autenticador para eliminar este método de verificación."}
      </p>
      <div className="mt-4 space-y-3">
        {!verified ? <TotpCodeField value={code} onChange={updateCode} disabled={busy || !factorId} /> : null}
        {error || !factorId ? (
          <p className="text-xs text-red-600" role="alert">{error || "No encontramos el autenticador seleccionado."}</p>
        ) : null}
        <div className="flex gap-3">
          <button type="button" onClick={cancel} disabled={busy} className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-semibold text-gray-600 disabled:opacity-60">
            {removed ? "Cerrar" : "Cancelar"}
          </button>
          <button type="submit" disabled={!canSubmit} className="flex-1 rounded-lg bg-[#5E30A5] py-2 text-sm font-semibold text-white disabled:opacity-60">
            {busy ? "Desactivando..." : verified ? "Reintentar" : "Desactivar"}
          </button>
        </div>
      </div>
    </form>
  );
}
