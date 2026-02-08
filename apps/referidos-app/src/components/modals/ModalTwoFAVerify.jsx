import { useEffect, useMemo, useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import { useModal } from "../../modals/useModal";
import {
  challengeAndVerifyTotp,
  listMfaFactors,
  pickActiveTotpFactor,
} from "../../services/mfaService";

export default function ModalTwoFAVerify({ onVerified, onCancel }) {
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(true);
  const [factorId, setFactorId] = useState(null);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = code.trim().length >= 6 && !submitting && !loading;

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError("");
      const result = await listMfaFactors();
      if (!active) return;
      if (!result.ok) {
        setError(result.error || "No se pudieron cargar factores");
        setLoading(false);
        return;
      }
      const factors = result.data?.totp || [];
      const picked = pickActiveTotpFactor(factors);
      setFactorId(picked?.id ?? null);
      if (!picked) {
        setError("No hay factores activos.");
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleVerify = async () => {
    if (!factorId) {
      setError("No hay factores activos.");
      return;
    }
    setSubmitting(true);
    setError("");
    const result = await challengeAndVerifyTotp({
      factorId,
      code: code.trim(),
    });
    if (!result.ok) {
      setError(result.error || "Codigo invalido");
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    closeModal();
    onVerified?.();
  };

  const handleCancel = async () => {
    closeModal();
    if (onCancel) {
      await onCancel();
    }
  };

  const helperText = useMemo(() => {
    if (loading) return "Verificando factores de seguridad...";
    return "Ingresa el codigo de tu app autenticadora.";
  }, [loading]);

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-gray-700 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <ShieldCheck size={16} />
          Verificacion 2FA
        </div>
        <button
          type="button"
          onClick={handleCancel}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>
      </div>

      <p className="mt-3 text-xs text-gray-500">{helperText}</p>

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
          disabled={loading}
        />
      </div>

      {error && !loading ? (
        <div className="mt-2 text-xs text-red-500">{error}</div>
      ) : null}

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={handleCancel}
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
          {submitting ? "Verificando..." : "Continuar"}
        </button>
      </div>
    </div>
  );
}
