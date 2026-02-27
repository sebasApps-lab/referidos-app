import { useEffect, useMemo, useState } from "react";
import { QrCode, ShieldCheck, X } from "lucide-react";
import QRCode from "react-qr-code";
import { useModal } from "../../modals/useModal";
import {
  challengeAndVerifyTotp,
  enrollTotp,
  listMfaFactors,
  syncTotpFlags,
  unenrollFactor,
} from "../../services/mfaService";

const FRIENDLY_NAME = "App autenticadora";

const isActiveStatus = (status) =>
  ["verified", "active"].includes(String(status || "").toLowerCase());

export default function ModalTwoFAEnroll({ onComplete }) {
  const { closeModal } = useModal();
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
    setLoading(true);
    setEnrollError("");
    setMode("enroll");
    resetEnrollState();

    const list = await listMfaFactors();
    if (list.ok) {
      const factors = list.data?.totp || [];
      const active = factors.find((factor) => isActiveStatus(factor?.status));
      if (active) {
        setMode("existing");
        setFactorId(active.id);
        setLoading(false);
        return;
      }
      const pending = factors.find(
        (factor) => String(factor?.status || "").toLowerCase() === "unverified"
      );
      if (pending) {
        await unenrollFactor(pending.id);
      }
    }

    const result = await startEnroll();
    if (!result.ok) {
      if (result.errorCode === "mfa_factor_name_conflict") {
        const retryList = await listMfaFactors();
        const factors = retryList.ok ? retryList.data?.totp || [] : [];
        const active = factors.find((factor) => isActiveStatus(factor?.status));
        if (active) {
          setMode("existing");
          setFactorId(active.id);
          setLoading(false);
          return;
        }
        const pending = factors.find(
          (factor) => String(factor?.status || "").toLowerCase() === "unverified"
        );
        if (pending) {
          await unenrollFactor(pending.id);
          const retry = await startEnroll();
          if (retry.ok) {
            setLoading(false);
            return;
          }
          setEnrollError(retry.error || "No se pudo iniciar MFA");
          setLoading(false);
          return;
        }
      }
      setEnrollError(result.error || "No se pudo iniciar MFA");
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  useEffect(() => {
    let active = true;
    (async () => {
      await prepareEnrollment();
      if (!active) return;
    })();
    return () => {
      active = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const helperText = useMemo(() => {
    if (loading) return "Generando tu codigo...";
    if (enrollError) return "No se pudo iniciar la configuracion.";
    if (mode === "existing") {
      return "Ya tienes 2FA activo. Ingresa el codigo de tu app.";
    }
    return "Escanea el QR con tu app autenticadora y escribe el codigo.";
  }, [enrollError, loading, mode]);

  const handleVerify = async () => {
    if (!factorId) {
      setVerifyError("No se pudo iniciar la verificacion.");
      return;
    }
    setVerifyError("");
    setSubmitting(true);
    const result = await challengeAndVerifyTotp({
      factorId,
      code: code.trim(),
    });
    if (!result.ok) {
      setVerifyError(result.error || "Codigo invalido");
      setSubmitting(false);
      return;
    }
    await syncTotpFlags({ enabled: true });
    setSubmitting(false);
    closeModal();
    onComplete?.();
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
          alt="Codigo QR para app autenticadora"
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
    return (
      <div className="text-xs text-gray-500">No se pudo cargar el QR.</div>
    );
  };

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-gray-700 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <ShieldCheck size={16} />
          Activar 2FA
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

      <p className="mt-3 text-xs text-gray-500">{helperText}</p>

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
        <div className="mt-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[11px] text-gray-500">
          Clave manual: <span className="font-semibold text-gray-700">{secret}</span>
        </div>
      ) : null}

      <div className="mt-4 space-y-2">
        <label className="block text-xs text-gray-500 ml-1">
          Codigo de 6 digitos
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

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={closeModal}
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
