import { useEffect, useState } from "react";
import { useModal } from "../../modals/useModal";
import {
  getPinAttemptState,
  hashPin,
  loadPinHash,
  recordPinAttempt,
} from "../../services/secureStorageService";

export default function ModalPinVerify({ userId, onConfirm }) {
  const { closeModal } = useModal();
  const [pinValue, setPinValue] = useState("");
  const [error, setError] = useState("");
  const [lockedUntil, setLockedUntil] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!userId) {
        setError("No se pudo validar el PIN.");
        return;
      }
      const state = await getPinAttemptState(userId);
      if (!active) return;
      if (state?.lockedUntil && Date.now() < state.lockedUntil) {
        setLockedUntil(state.lockedUntil);
        setError("Demasiados intentos. Intenta mas tarde.");
      }
    })();
    return () => {
      active = false;
    };
  }, [userId]);

  const handleConfirm = async () => {
    if (!userId) return;
    if (pinValue.length !== 4) return;
    if (lockedUntil && Date.now() < lockedUntil) return;
    const stored = await loadPinHash(userId);
    if (!stored?.salt || !stored?.hash) {
      setError("No hay un PIN registrado.");
      return;
    }
    const computed = await hashPin(pinValue, stored.salt, stored.iterations || 160000);
    const ok = computed === stored.hash;
    if (!ok) {
      const attempt = await recordPinAttempt(userId, false);
      if (attempt?.lockedUntil) {
        setLockedUntil(attempt.lockedUntil);
        setError("Demasiados intentos. Intenta mas tarde.");
      } else {
        setError("PIN incorrecto.");
      }
      return;
    }
    await recordPinAttempt(userId, true);
    closeModal();
    onConfirm?.();
  };

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-gray-700 shadow-2xl">
      <div className="text-center text-sm font-semibold text-gray-900">
        Confirmar PIN
      </div>
      <div className="mt-4 space-y-3">
        <input
          value={pinValue}
          onChange={(event) =>
            setPinValue(event.target.value.replace(/[^0-9]/g, "").slice(0, 4))
          }
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          placeholder="PIN"
          className={`w-full rounded-xl border px-3 py-2 text-sm focus:outline-none ${
            error ? "border-red-400 text-red-600" : "border-[#E9E2F7] text-slate-600"
          }`}
        />
        {error ? <div className="text-xs text-red-500">{error}</div> : null}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs font-semibold">
        <button type="button" onClick={closeModal} className="text-slate-500">
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={pinValue.length !== 4 || (lockedUntil && Date.now() < lockedUntil)}
          className={
            pinValue.length === 4 ? "text-[#5E30A5]" : "text-slate-400"
          }
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
