import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Fingerprint, KeyRound, Lock } from "lucide-react";
import { useModal } from "../../modals/useModal";

const createRandomBuffer = (size) => {
  const data = new Uint8Array(size);
  window.crypto.getRandomValues(data);
  return data;
};

const toBuffer = (value, fallback) => {
  const encoder = new TextEncoder();
  return encoder.encode(value || fallback);
};

export default function ModalConfirmarCambios({
  hasFingerprint = false,
  hasPin = false,
  hasPassword = false,
  userId,
  email,
  displayName,
  onConfirm,
  onOpenMethods,
}) {
  const { closeModal } = useModal();
  const method = useMemo(() => {
    if (hasFingerprint) return "fingerprint";
    if (hasPin) return "pin";
    if (hasPassword) return "password";
    return "none";
  }, [hasFingerprint, hasPassword, hasPin]);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("Confirma tu identidad para continuar.");
  const [pinValue, setPinValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const timeoutRef = useRef(null);

  const cleanupTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      cleanupTimeout();
    };
  }, []);

  const handleComplete = useCallback(
    (nextStatus, nextMessage, closeDelay, shouldConfirm) => {
      setStatus(nextStatus);
      setMessage(nextMessage);
      cleanupTimeout();
      timeoutRef.current = setTimeout(() => {
        if (shouldConfirm && onConfirm) {
          onConfirm();
        }
        closeModal();
      }, closeDelay);
    },
    [closeModal, onConfirm]
  );

  const handleFingerprintConfirm = useCallback(async () => {
    if (status === "reading") return;
    setStatus("reading");
    setMessage("Leyendo huella...");

    if (!window.PublicKeyCredential || !window.crypto?.getRandomValues) {
      handleComplete("error", "Tu dispositivo no soporta huella.", 1400, false);
      return;
    }

    try {
      const available =
        await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable?.();
      if (available === false) {
        handleComplete(
          "error",
          "No hay huella disponible en este dispositivo.",
          1400,
          false
        );
        return;
      }

      const publicKey = {
        challenge: createRandomBuffer(32),
        rp: { name: "Qrew", id: window.location.hostname },
        user: {
          id: toBuffer(String(userId || email || "qrew-user"), "qrew-user"),
          name: String(email || "usuario@qrew.app"),
          displayName: String(displayName || "Usuario"),
        },
        pubKeyCredParams: [
          { type: "public-key", alg: -7 },
          { type: "public-key", alg: -257 },
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
        },
        timeout: 45000,
        attestation: "none",
      };

      await navigator.credentials.create({ publicKey });
      handleComplete("success", "Huella verificada correctamente.", 1000, true);
    } catch (error) {
      const messageText =
        error?.name === "NotAllowedError"
          ? "No se pudo leer la huella."
          : "No se pudo activar la huella.";
      handleComplete("error", messageText, 1400, false);
    }
  }, [displayName, email, handleComplete, status, userId]);

  const handlePinConfirm = () => {
    if (pinValue.length !== 4) return;
    handleComplete("success", "PIN confirmado.", 800, true);
  };

  const handlePasswordConfirm = () => {
    if (!passwordValue.trim()) return;
    handleComplete("success", "Contrasena confirmada.", 800, true);
  };

  return (
    <div className="w-[92vw] max-w-[420px] rounded-2xl bg-white px-5 py-5 shadow-[0_8px_25px_rgba(0,0,0,0.15)]">
      <h2 className="text-lg font-semibold text-center text-[#5E30A5]">
        Confirmar cambios
      </h2>
      <p className="mt-2 text-sm text-center text-slate-500">{message}</p>

      {method === "fingerprint" ? (
        <div className="mt-6 space-y-4">
          <div className="mx-auto h-14 w-14 rounded-full bg-[#F3EEFF] text-[#5E30A5] flex items-center justify-center">
            <Fingerprint size={26} />
          </div>
          <button
            type="button"
            onClick={handleFingerprintConfirm}
            disabled={status === "reading"}
            className={`w-full rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-sm transition ${
              status === "reading"
                ? "bg-[#5E30A5]/60"
                : "bg-[#5E30A5] hover:bg-[#4B2488]"
            }`}
          >
            {status === "reading" ? "Leyendo..." : "Continuar"}
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="w-full text-xs font-semibold text-slate-500"
          >
            Cancelar
          </button>
        </div>
      ) : null}

      {method === "pin" ? (
        <div className="mt-6 space-y-4">
          <div className="mx-auto h-14 w-14 rounded-full bg-[#F3EEFF] text-[#5E30A5] flex items-center justify-center">
            <KeyRound size={24} />
          </div>
          <input
            value={pinValue}
            onChange={(event) =>
              setPinValue(event.target.value.replace(/[^0-9]/g, "").slice(0, 4))
            }
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            placeholder="PIN"
            className="w-full rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-sm text-slate-600 focus:outline-none"
          />
          <div className="flex items-center justify-between text-xs font-semibold">
            <button
              type="button"
              onClick={closeModal}
              className="text-slate-500"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handlePinConfirm}
              disabled={pinValue.length !== 4}
              className={
                pinValue.length === 4 ? "text-[#5E30A5]" : "text-slate-400"
              }
            >
              Confirmar
            </button>
          </div>
        </div>
      ) : null}

      {method === "password" ? (
        <div className="mt-6 space-y-4">
          <div className="mx-auto h-14 w-14 rounded-full bg-[#F3EEFF] text-[#5E30A5] flex items-center justify-center">
            <Lock size={24} />
          </div>
          <input
            type="password"
            value={passwordValue}
            onChange={(event) => setPasswordValue(event.target.value)}
            placeholder="Contrasena"
            className="w-full rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-sm text-slate-600 focus:outline-none"
          />
          <div className="flex items-center justify-between text-xs font-semibold">
            <button
              type="button"
              onClick={closeModal}
              className="text-slate-500"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handlePasswordConfirm}
              disabled={!passwordValue.trim()}
              className={
                passwordValue.trim() ? "text-[#5E30A5]" : "text-slate-400"
              }
            >
              Confirmar
            </button>
          </div>
        </div>
      ) : null}

      {method === "none" ? (
        <div className="mt-6 space-y-4 text-center">
          <p className="text-sm text-slate-500">
            No puedes hacer cambios si no tienes un metodo de verificacion
            configurado.
          </p>
          <div className="flex items-center justify-center gap-6 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                if (onOpenMethods) onOpenMethods();
                closeModal();
              }}
              className="text-[#5E30A5]"
            >
              Metodos de verificacion
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="text-slate-500"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
