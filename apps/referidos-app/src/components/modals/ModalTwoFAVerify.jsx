import { useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import { useModal } from "../../modals/useModal";
import useTotpConfirmation from "../../hooks/useTotpConfirmation";
import useMfaState from "../../profile/shared/hooks/useMfaState";
import { isTotpCode, isVerifiedFactor } from "../../services/mfaService";
import TotpCodeField from "../auth/TotpCodeField";

export default function ModalTwoFAVerify({ authUserId, onVerified, onCancel }) {
  const { closeModal } = useModal();
  const { loading, error: factorsError, totpFactors, refresh } = useMfaState(authUserId);
  const { busy, code, updateCode, error, verified, confirm, run } = useTotpConfirmation();
  const [selectedId, setSelectedId] = useState(null);
  const factors = totpFactors.filter(isVerifiedFactor);
  const factorId = factors.find((factor) => factor.id === selectedId)?.id || factors[0]?.id;
  const unavailable = !loading && !factors.length;
  const canSubmit = !busy && (verified || (factorId && isTotpCode(code)));

  const submit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    void confirm({ factorId, authUserId, complete: async (currentUserId) => {
      const result = await onVerified(currentUserId);
      if (result.ok) closeModal();
      return result;
    } });
  };

  const cancel = () => run(async () => {
    await onCancel();
    closeModal();
  });

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-sm rounded-2xl bg-white p-6 text-gray-700 shadow-2xl" role="dialog" aria-modal="true" aria-label="Verificación en dos pasos">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <ShieldCheck size={16} /> Verificación 2FA
        </h2>
        <button type="button" onClick={cancel} disabled={busy} className="text-gray-400 hover:text-gray-600 disabled:opacity-60" aria-label="Cerrar sesión">
          <X size={16} />
        </button>
      </div>

      {loading ? (
        <p className="mt-3 text-xs text-gray-500" role="status">Cargando métodos de verificación...</p>
      ) : unavailable ? (
        <div className="mt-3 flex flex-col items-start gap-2 text-xs" role="alert">
          <p className="text-red-600">{factorsError || "No encontramos un autenticador verificado para tu sesión."}</p>
          <button type="button" onClick={refresh} disabled={busy} className="font-semibold text-[#5E30A5]">Reintentar</button>
        </div>
      ) : verified ? (
        <p className="mt-3 text-xs text-gray-500">Tu código fue verificado. Confirmando la seguridad de la sesión...</p>
      ) : (
        <div className="mt-3 space-y-3">
          <p className="text-xs text-gray-500">Ingresa el código de tu app autenticadora.</p>
          {factors.length > 1 ? (
            <label className="block text-xs text-gray-500">
              Autenticador
              <select value={factorId} disabled={busy} onChange={(event) => { setSelectedId(event.target.value); updateCode(""); }} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700">
                {factors.map((factor, index) => (
                  <option key={factor.id} value={factor.id}>{factor.friendly_name || `Autenticador ${index + 1}`}</option>
                ))}
              </select>
            </label>
          ) : null}
          <TotpCodeField value={code} onChange={updateCode} disabled={busy} />
        </div>
      )}

      {error ? <p className="mt-2 text-xs text-red-600" role="alert">{error}</p> : null}

      <div className="mt-5 flex gap-3">
        <button type="button" onClick={cancel} disabled={busy} className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-semibold text-gray-600 disabled:opacity-60">
          Cerrar sesión
        </button>
        <button type="submit" disabled={!canSubmit} className="flex-1 rounded-lg bg-[#5E30A5] py-2 text-sm font-semibold text-white disabled:opacity-60">
          {busy ? "Verificando..." : verified ? "Reintentar" : "Continuar"}
        </button>
      </div>
    </form>
  );
}
