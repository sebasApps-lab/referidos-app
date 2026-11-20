import { useEffect, useRef, useState } from "react";
import { QrCode, ShieldCheck, X } from "lucide-react";
import QRCode from "react-qr-code";
import useTotpConfirmation from "../../hooks/useTotpConfirmation";
import {
  isTotpCode,
  prepareTotpEnrollment,
  syncTotpFlags,
  verifyMfaSession,
} from "../../services/mfaService";
import TotpCodeField from "./TotpCodeField";

export default function TotpEnrollment({ onCancel, onComplete, modal = false }) {
  const [prepared, setPrepared] = useState(null);
  const [retry, setRetry] = useState(0);
  const requestRef = useRef(null);
  const { busy, code, updateCode, error, verified, confirm, run } = useTotpConfirmation();

  useEffect(() => {
    let active = true;
    if (requestRef.current?.retry !== retry) {
      requestRef.current = { retry, promise: prepareTotpEnrollment() };
    }
    requestRef.current.promise.then((result) => {
      if (active) setPrepared(result);
    });
    return () => { active = false; };
  }, [retry]);

  const pending = !prepared;
  const enrollment = prepared?.data;
  const existing = enrollment?.mode === "existing";
  const showSetup = !verified && !existing;
  const canSubmit = Boolean(enrollment?.factorId) && !busy && (verified || isTotpCode(code));

  const submit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    const { factorId, authUserId } = enrollment;
    void confirm({ factorId, authUserId, complete: async (currentUserId) => {
      requestRef.current = null;
      setPrepared((current) => ({
        ...current,
        data: { ...current.data, qrUri: "", secret: "" },
      }));
      const verifiedSession = await verifyMfaSession(currentUserId);
      if (!verifiedSession.ok) return verifiedSession;
      const synced = await syncTotpFlags({ authUserId: currentUserId, expectedFactorId: factorId });
      return synced.ok ? onComplete?.() : synced;
    } });
  };

  const cancel = () => run(() => onCancel?.({ verified }));

  let instruction = "Escanea el QR con tu app autenticadora y escribe el código.";
  if (pending) instruction = "Preparando el autenticador...";
  else if (!prepared.ok) instruction = "No se pudo iniciar la configuración.";
  else if (existing) instruction = "Ya tienes 2FA activo. Ingresa el código de tu app autenticadora.";
  else if (!enrollment.qrUri) instruction = "Añade la clave manual a tu app autenticadora y escribe el código.";
  if (verified) instruction = "Tu código fue verificado. Estamos guardando los cambios en tu perfil.";

  return (
    <form onSubmit={submit} className="flex flex-1 flex-col">
      {modal ? (
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <ShieldCheck size={16} /> Activar 2FA
          </h2>
          <button type="button" onClick={cancel} disabled={busy} className="text-gray-400 hover:text-gray-600 disabled:opacity-60" aria-label="Cerrar">
            <X size={16} />
          </button>
        </div>
      ) : null}
      <p className="mt-3 text-sm text-gray-600">{instruction}</p>
      {showSetup && (pending || !prepared.ok || enrollment.qrUri) ? (
        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
          {pending ? (
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500" role="status">
              <QrCode size={16} /> Generando QR...
            </div>
          ) : !prepared.ok ? (
            <div className="text-xs text-red-600" role="alert">
              {prepared.error}
              <button type="button" onClick={() => { setPrepared(null); setRetry((value) => value + 1); }} className="ml-2 font-semibold text-[#5E30A5]">
                Reintentar
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <QRCode value={enrollment.qrUri} size={160} title="Código QR para app autenticadora" />
            </div>
          )}
        </div>
      ) : null}
      {showSetup && enrollment?.secret ? (
        <div className="mt-3 break-all rounded-lg border border-gray-200 bg-white px-3 py-2 text-[11px] text-gray-500">
          Clave manual <span className="font-semibold text-gray-700">{enrollment.secret}</span>
        </div>
      ) : null}
      {!verified ? (
        <div className="mt-4">
          <TotpCodeField value={code} onChange={updateCode} disabled={busy || !enrollment?.factorId} />
        </div>
      ) : null}
      {error ? <div className="mt-2 text-xs text-red-600" role="alert">{error}</div> : null}
      <div className="flex-1" />
      <div className="mt-5 flex gap-3">
        <button type="button" onClick={cancel} disabled={busy} className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-semibold text-gray-600 disabled:opacity-60">
          Cancelar
        </button>
        <button type="submit" disabled={!canSubmit} className="flex-1 rounded-lg bg-[#5E30A5] py-2 text-sm font-semibold text-white disabled:opacity-60">
          {busy ? "Verificando..." : verified ? "Reintentar guardado" : "Confirmar"}
        </button>
      </div>
    </form>
  );
}
