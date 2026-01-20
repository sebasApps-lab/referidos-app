import React, { useCallback, useEffect, useRef, useState } from "react";
import { Fingerprint } from "lucide-react";
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

export default function ModalFingerprintPrompt({
  onConfirm,
  onError,
  onCancel,
  userId,
  email,
  displayName,
}) {
  const { closeModal } = useModal();
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("Selecciona continuar para escanear tu huella.");
  const timeoutRef = useRef(null);
  const promptOnceRef = useRef(false);

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
        closeModal();
        if (shouldConfirm && onConfirm) {
          onConfirm();
        }
        if (!shouldConfirm && onError) {
          onError(nextMessage);
        }
      }, closeDelay);
    },
    [closeModal, onConfirm, onError]
  );

  const handleConfirm = useCallback(async () => {
    if (status === "reading" || promptOnceRef.current) return;
    promptOnceRef.current = true;
    setStatus("reading");
    setMessage("Leyendo huella...");

    if (!window.PublicKeyCredential || !window.crypto?.getRandomValues) {
      handleComplete("error", "Tu dispositivo no soporta huella.", 1400, false);
      return;
    }

    try {
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable?.();
      if (available === false) {
        handleComplete("error", "No hay huella disponible en este dispositivo.", 1400, false);
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
      handleComplete("success", "Huella verificada correctamente.", 1100, true);
    } catch (error) {
      const messageText =
        error?.name === "NotAllowedError"
          ? "No se pudo leer la huella."
          : "No se pudo activar la huella.";
      handleComplete("error", messageText, 1400, false);
    }
  }, [displayName, email, handleComplete, status, userId]);

  return (
    <div
      style={{
        background: "white",
        borderRadius: 20,
        width: "92vw",
        maxWidth: 420,
        padding: "22px 20px 18px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: 58,
          height: 58,
          borderRadius: "50%",
          margin: "0 auto 14px",
          background: "rgba(94,48,165,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#5E30A5",
        }}
      >
        <Fingerprint size={26} />
      </div>

      <h2
        style={{
          fontSize: 20,
          fontWeight: 700,
          textAlign: "center",
          color: "#5E30A5",
          marginBottom: 8,
        }}
      >
        Activar huella
      </h2>

      <p
        style={{
          textAlign: "center",
          color: status === "success" ? "#16A34A" : status === "error" ? "#DC2626" : "#4B5563",
          fontSize: 14,
          lineHeight: 1.5,
          marginBottom: 18,
        }}
      >
        {message}
      </p>

      {status !== "success" ? (
        <div className="flex items-center justify-between">
          {status !== "reading" ? (
            <button
              type="button"
              onClick={() => {
                closeModal();
                onCancel?.();
              }}
              className="text-sm font-semibold text-slate-600"
            >
              Cancelar
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={status === "reading"}
            className={`rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-sm transition ${
              status === "reading"
                ? "bg-[#5E30A5]/60"
                : "bg-[#5E30A5] hover:bg-[#4B2488]"
            }`}
          >
            {status === "reading" ? "Leyendo..." : "Continuar"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
