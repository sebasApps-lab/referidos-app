import { useEffect, useMemo, useRef, useState } from "react";
import { QrCode } from "lucide-react";
import QRCode from "react-qr-code";
import {
  challengeAndVerifyTotp,
  enrollTotp,
  listMfaFactors,
  pickActiveTotpFactor,
  syncTotpFlags,
  unenrollFactor,
} from "../../services/mfaService";

const FRIENDLY_NAME = "App autenticadora";

const isActiveStatus = (status) =>
  ["verified", "active"].includes(String(status || "").toLowerCase());
const isPendingStatus = (status) =>
  ["unverified", "pending"].includes(String(status || "").toLowerCase());
const getFriendlyName = (factor) =>
  factor?.friendly_name || factor?.friendlyName || "";
const getTotpFactors = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.totp)) return data.totp;
  if (Array.isArray(data.all)) {
    return data.all.filter(
      (factor) => String(factor?.factor_type || "").toLowerCase() === "totp"
    );
  }
  return [];
};

export default function AddTwoFAStep({ innerRef, onCancel, onContinue }) {
  const [loading, setLoading] = useState(true);
  const [enrollError, setEnrollError] = useState("");
  const [mode, setMode] = useState("enroll");
  const [factorId, setFactorId] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [qrUri, setQrUri] = useState("");
  const [secret, setSecret] = useState("");
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const preparingRef = useRef(false);
  const initializedRef = useRef(false);

  const canSubmit =
    code.trim().length >= 6 && !submitting && !loading && Boolean(factorId);

  const resetEnrollState = () => {
    setFactorId(null);
    setQrCode("");
    setQrUri("");
    setSecret("");
  };

  const applyEnrollPayload = (data) => {
    const totp = data?.totp || {};
    setFactorId(data?.id || null);
    setQrCode(totp.qr_code || "");
    setQrUri(totp.uri || "");
    setSecret(totp.secret || "");
  };

  const startEnroll = async () => {
    const result = await enrollTotp({ friendlyName: FRIENDLY_NAME });
    if (!result.ok) {
      return result;
    }
    applyEnrollPayload(result.data);
    return { ok: true };
  };

  const prepareEnrollment = async () => {
    if (preparingRef.current || factorId) return;
    preparingRef.current = true;
    setLoading(true);
    setEnrollError("");
    setMode("enroll");
    resetEnrollState();

    const list = await listMfaFactors();
    if (list.ok) {
      const factors = getTotpFactors(list.data);
      const named = factors.find(
        (factor) => getFriendlyName(factor) === FRIENDLY_NAME
      );
      if (named && isActiveStatus(named?.status)) {
        setMode("existing");
        setFactorId(named.id);
        setLoading(false);
        preparingRef.current = false;
        return;
      }
      if (named) {
        setMode("existing");
        setFactorId(named.id);
        setLoading(false);
        preparingRef.current = false;
        return;
      }
      const active = pickActiveTotpFactor(factors);
      if (active && isActiveStatus(active?.status)) {
        setMode("existing");
        setFactorId(active.id);
        setLoading(false);
        preparingRef.current = false;
        return;
      }
      const pending = factors.filter((factor) => isPendingStatus(factor?.status));
      if (pending.length) {
        for (const factor of pending) {
          const removed = await unenrollFactor(factor.id);
          if (!removed.ok) {
            setEnrollError(
              removed.error || "No se pudo limpiar un intento anterior."
            );
            setLoading(false);
            preparingRef.current = false;
            return;
          }
        }
      }
    }

    const result = await startEnroll();
    if (!result.ok) {
      const isNameConflict =
        result.errorCode === "mfa_factor_name_conflict" ||
        String(result.error || "").includes("friendly name");
      if (isNameConflict) {
        const retryList = await listMfaFactors();
        const factors = retryList.ok ? getTotpFactors(retryList.data) : [];
        const named = factors.find(
          (factor) => getFriendlyName(factor) === FRIENDLY_NAME
        );
        if (named && isActiveStatus(named?.status)) {
          setMode("existing");
          setFactorId(named.id);
          setLoading(false);
          preparingRef.current = false;
          return;
        }
        if (named) {
          setMode("existing");
          setFactorId(named.id);
          setLoading(false);
          preparingRef.current = false;
          return;
        }
        const active = pickActiveTotpFactor(factors);
        if (active && isActiveStatus(active?.status)) {
          setMode("existing");
          setFactorId(active.id);
          setLoading(false);
          preparingRef.current = false;
          return;
        }
        const pending = factors.filter((factor) => isPendingStatus(factor?.status));
        if (pending.length) {
          for (const factor of pending) {
            const removed = await unenrollFactor(factor.id);
            if (!removed.ok) {
              setEnrollError(
                removed.error || "No se pudo limpiar un intento anterior."
              );
              setLoading(false);
              preparingRef.current = false;
              return;
            }
          }
          const retry = await startEnroll();
          if (retry.ok) {
            setLoading(false);
            preparingRef.current = false;
            return;
          }
          setEnrollError(retry.error || "No se pudo iniciar MFA");
          setLoading(false);
          preparingRef.current = false;
          return;
        }
      }
      setEnrollError(result.error || "No se pudo iniciar MFA");
      setLoading(false);
      preparingRef.current = false;
      return;
    }

    setLoading(false);
    preparingRef.current = false;
  };

  useEffect(() => {
    let active = true;
    (async () => {
      if (initializedRef.current) return;
      initializedRef.current = true;
      await prepareEnrollment();
      if (!active) return;
    })();
    return () => {
      active = false;
    };
  }, []);

  const helperText = useMemo(() => {
    if (loading) return "Generando tu código...";
    if (enrollError) return "No se pudo iniciar la configuración.";
    if (mode === "existing") {
      return "Ya tienes 2FA activo. Ingresa el código de tu app.";
    }
    return "Escanea el QR con tu app autenticadora y escribe el código.";
  }, [enrollError, loading, mode]);

  const handleVerify = async () => {
    if (!factorId) {
      setVerifyError("No se pudo iniciar la verificación.");
      return;
    }
    setVerifyError("");
    setSubmitting(true);
    const result = await challengeAndVerifyTotp({
      factorId,
      code: code.trim(),
    });
    if (!result.ok) {
      setVerifyError(result.error || "Código inválido");
      setSubmitting(false);
      return;
    }
    await syncTotpFlags({ enabled: true });
    setSubmitting(false);
    onContinue?.();
  };

  const renderQr = () => {
    if (qrCode) {
      const trimmed = qrCode.trim();
      const isSvg = trimmed.startsWith("<svg");
      if (isSvg) {
        return (
          <div
            className="mx-auto h-40 w-40"
            dangerouslySetInnerHTML={{ __html: trimmed }}
          />
        );
      }
      return (
        <img
          src={qrCode}
          alt="Código QR para app autenticadora"
          className="mx-auto h-40 w-40"
          loading="lazy"
        />
      );
    }
    if (qrUri) {
      return (
        <div className="flex items-center justify-center">
          <QRCode value={qrUri} size={160} />
        </div>
      );
    }
    return <div className="text-xs text-gray-500">No se pudo cargar el QR.</div>;
  };

  return (
    <div className="flex h-full flex-col pb-4 text-gray-700" ref={innerRef}>
      <div className="flex-1">
        <div className="text-lg font-semibold text-gray-900 text-center">
          Activar 2FA
        </div>

        <p className="mt-2 text-sm text-gray-600">{helperText}</p>

        {mode === "enroll" ? (
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
            {loading ? (
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <QrCode size={16} />
                Generando QR...
              </div>
            ) : enrollError ? (
              <div className="text-xs text-red-500">
                {enrollError}
                <button
                  type="button"
                  onClick={prepareEnrollment}
                  className="ml-2 text-xs font-semibold text-[#5E30A5]"
                >
                  Reintentar
                </button>
              </div>
            ) : (
              renderQr()
            )}
          </div>
        ) : null}

        {mode === "enroll" && secret ? (
          <div className="mt-3 space-y-1">
            <div className="text-xs text-gray-500 ml-1">Clave manual:</div>
            <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-[11px] text-gray-500">
              <span className="font-semibold text-gray-700">{secret}</span>
            </div>
          </div>
        ) : null}

        <div className="mt-4 space-y-2">
          <label className="block text-xs text-gray-500 ml-1">
            Código de 6 dígitos
          </label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30"
            placeholder="123456"
          />
          {verifyError ? (
            <div className="text-xs text-red-500">{verifyError}</div>
          ) : null}
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-semibold text-gray-600"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleVerify}
          disabled={!canSubmit}
          className="flex-1 rounded-lg bg-[#5E30A5] py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {submitting ? "Verificando..." : "Confirmar"}
        </button>
      </div>
    </div>
  );
}
