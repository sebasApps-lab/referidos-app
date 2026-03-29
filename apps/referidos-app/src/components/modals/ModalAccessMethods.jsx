import { ArrowLeft, Fingerprint, Lock } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAppStore } from "../../store/appStore";
import usePinSetup from "../../hooks/usePinSetup";
import { useModal } from "../../modals/useModal";
import {
  generatePinSalt,
  getSecureStorageMode,
  hashPin,
  saveBiometricToken,
  loadDeviceSecret,
  saveDeviceSecret,
  savePinHash,
} from "../../services/secureStorageService";

// Lint purge (no-unused-vars): se purgo setter `setFingerprintEnabled` (estado de lectura en modal de accesos).
export default function ModalAccessMethods({
  initialView = "select",
  initialFingerprintEnabled = false,
  initialPinEnabled = false,
  errorMessage = "",
}) {
  const { closeModal, openModal } = useModal();
  const usuario = useAppStore((s) => s.usuario);
  const setAccessMethods = useAppStore((s) => s.setAccessMethods);
  const setUser = useAppStore((s) => s.setUser);
  const [view, setView] = useState(initialView);
  const [fingerprintEnabled] = useState(
    initialFingerprintEnabled,
  );
  const [pinEnabled, setPinEnabled] = useState(initialPinEnabled);
  const [error, setError] = useState(errorMessage);
  const [skipPrompt, setSkipPrompt] = useState(false);
  const [webauthnAvailable, setWebauthnAvailable] = useState(true);
  const skipKey = usuario?.id || usuario?.id_auth
    ? `access_methods_prompt_skip_${usuario.id || usuario.id_auth}`
    : null;
  const prevViewRef = useRef(view);

  useEffect(() => {
    if (!skipKey) return;
    const stored = window.localStorage.getItem(skipKey);
    setSkipPrompt(stored === "1");
  }, [skipKey]);

  useEffect(() => {
    let active = true;
    (async () => {
      const status = await getSecureStorageMode();
      if (!active) return;
      setWebauthnAvailable(status.mode !== "blocked");
    })();
    return () => {
      active = false;
    };
  }, []);

  const savePin = useCallback(async (pinValue) => {
    const session = (await supabase.auth.getSession())?.data?.session;
    const userId = session?.user?.id;
    if (!userId) {
      return { ok: false, error: "No se pudo obtener sesion." };
    }
    if (!webauthnAvailable) {
      return { ok: false, error: "No disponible en este dispositivo." };
    }
    const existingSecret = await loadDeviceSecret(userId);
    if (!existingSecret) {
      const bytes = window.crypto.getRandomValues(new Uint8Array(32));
      const token = btoa(String.fromCharCode(...bytes));
      await saveDeviceSecret(userId, { token, createdAt: new Date().toISOString() });
    }
    const salt = generatePinSalt();
    const hash = await hashPin(pinValue, salt);
    const saved = await savePinHash(userId, {
      salt,
      hash,
      iterations: 160000,
      algo: "PBKDF2-SHA256",
    });
    if (!saved.ok) {
      return { ok: false, error: "No se pudo guardar el PIN." };
    }
    const { error: updErr } = await supabase
      .from("usuarios")
      .update({ has_pin: true })
      .eq("id_auth", userId);
    if (updErr) {
      return { ok: false, error: updErr.message || "No se pudo guardar el PIN." };
    }
    setAccessMethods({ pin: true });
    if (usuario) {
      setUser({ ...usuario, has_pin: true });
    }
    return { ok: true };
  }, [webauthnAvailable, setAccessMethods, setUser, usuario]);

  const pinSetup = usePinSetup({ onSavePin: savePin });

  useEffect(() => {
    if (prevViewRef.current !== view && view === "pin") {
      pinSetup.focusHiddenInput();
    }
    prevViewRef.current = view;
  }, [pinSetup, view]);

  const handleFingerprint = async () => {
    setError("");
    if (!webauthnAvailable) {
      setError("No disponible en este dispositivo.");
      return;
    }
    const { data } = await supabase.auth.getUser();
    const authUser = data?.user;
    openModal("FingerprintPrompt", {
      userId: authUser?.id ?? null,
      email: authUser?.email ?? null,
      displayName: usuario?.nombre || usuario?.alias || "Usuario",
      onConfirm: async (credentialId) => {
        const session = (await supabase.auth.getSession())?.data?.session;
        const userId = session?.user?.id;
      if (!userId) {
        openModal("AccessMethods", {
          initialView: "select",
          initialPinEnabled: pinEnabled,
          errorMessage: "No se pudo obtener sesion.",
        });
        return;
      }
      const existingSecret = await loadDeviceSecret(userId);
      if (!existingSecret) {
        const bytes = window.crypto.getRandomValues(new Uint8Array(32));
        const token = btoa(String.fromCharCode(...bytes));
        await saveDeviceSecret(userId, { token, createdAt: new Date().toISOString() });
      }
      if (credentialId) {
        await saveBiometricToken(userId, {
          credentialId,
            createdAt: new Date().toISOString(),
          });
        }
        const { error: updErr } = await supabase
          .from("usuarios")
          .update({ has_biometrics: true })
          .eq("id_auth", userId);
        if (updErr) {
          openModal("AccessMethods", {
            initialView: "select",
            initialPinEnabled: pinEnabled,
            errorMessage: "No se pudo anadir huella.",
          });
          return;
        }
        setAccessMethods({ fingerprint: true });
        if (usuario) {
          setUser({ ...usuario, has_biometrics: true });
        }
        openModal("AccessMethods", {
          initialView: "select",
          initialPinEnabled: pinEnabled,
          initialFingerprintEnabled: true,
        });
      },
      onError: (message) => {
        openModal("AccessMethods", {
          initialView: "select",
          initialPinEnabled: pinEnabled,
          errorMessage: message || "No se pudo anadir huella.",
        });
      },
      onCancel: () => {
        openModal("AccessMethods", {
          initialView: "select",
          initialPinEnabled: pinEnabled,
          initialFingerprintEnabled: fingerprintEnabled,
        });
      },
    });
  };

  const handlePinConfirm = async () => {
    const result = await pinSetup.handlePinConfirm();
    if (!result?.ok) return;
    setPinEnabled(true);
    pinSetup.resetPinForm();
    setView("select");
  };

  const cardBase =
    "flex h-20 flex-col items-center justify-center rounded-xl border text-xs font-semibold";
  const cardActive = "border-[#5E30A5] bg-[#F4EDFF] text-[#2F1A55]";
  const cardInactive = "border-gray-200 bg-white text-gray-700";

  if (view === "pin") {
    const firstEmpty = pinSetup.pinSlots.findIndex((char) => !char);
    const activeIndex = firstEmpty === -1 ? pinSetup.pinSlots.length - 1 : firstEmpty;
    return (
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-gray-700 shadow-2xl">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              pinSetup.resetPinForm();
              setView("select");
              setError("");
            }}
            className="h-8 w-8 rounded-full border border-gray-200 text-gray-600 flex items-center justify-center"
            aria-label="Volver"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="text-sm font-semibold text-gray-900">PIN</div>
        </div>

        <div className="mt-5 space-y-5">
          <p className="text-xs text-gray-500 text-center">
            {pinSetup.pinStep === "confirm"
              ? "Ingresar el PIN de nuevo."
              : "Ingresa un PIN."}
          </p>
          <div className="relative flex items-center justify-center gap-2">
            <input
              ref={pinSetup.registerHiddenRef}
              value={pinSetup.pinValue}
              onChange={(event) => pinSetup.updatePinValueDirect(event.target.value)}
              onFocus={() => pinSetup.setPinFocus(true)}
              onBlur={() => pinSetup.setPinFocus(false)}
              inputMode="numeric"
              autoComplete="one-time-code"
              className="absolute inset-0 h-full w-full opacity-0"
              aria-label="PIN"
            />
            {pinSetup.pinSlots.map((char, index) => {
              const displayChar = char
                ? pinSetup.pinReveal[index]
                  ? char
                  : "•"
                : "";
              const isActive = pinSetup.pinFocused && index === activeIndex;
              return (
                <div
                  key={`pin-modal-${index}`}
                  className={`h-11 w-11 rounded-xl border bg-white text-center text-lg font-semibold text-[#5E30A5] flex items-center justify-center ${
                    isActive
                      ? "border-[#5E30A5] ring-2 ring-[#5E30A5]/20"
                      : "border-[#D8CFF2]"
                  }`}
                >
                  {displayChar || (isActive ? (
                    <span className="pin-caret inline-flex h-5 w-px bg-[#5E30A5]" />
                  ) : null)}
                </div>
              );
            })}
          </div>
          {pinSetup.pinStep === "confirm" ? (
            <div className="text-xs pl-1 text-center">
              {(() => {
                const color = pinSetup.pinComplete
                  ? pinSetup.pinMatches
                    ? "text-emerald-600"
                    : "text-red-500"
                  : "text-slate-400";
                return (
                  <span className={`inline-flex items-center gap-2 ${color}`}>
                    {pinSetup.pinComplete ? (
                      pinSetup.pinMatches ? (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6L6 18" />
                          <path d="M6 6l12 12" />
                        </svg>
                      )
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6L6 18" />
                        <path d="M6 6l12 12" />
                      </svg>
                    )}
                    El PIN debe coincidir
                  </span>
                );
              })()}
            </div>
          ) : null}
          <div className="mt-2 flex items-center justify-between text-sm font-semibold px-4">
            <button
              type="button"
              onClick={pinSetup.resetPinForm}
              className="text-[#2F1A55]"
            >
              Cancelar
            </button>
            {pinSetup.pinStep === "confirm" ? (
              <button
                type="button"
                onClick={handlePinConfirm}
                disabled={!pinSetup.pinComplete || !pinSetup.pinMatches || pinSetup.saving}
                className={
                  pinSetup.pinComplete && pinSetup.pinMatches
                    ? "text-[#5E30A5]"
                    : "text-slate-400"
                }
              >
                {pinSetup.saving ? "Guardando..." : "Confirmar"}
              </button>
            ) : (
              <button
                type="button"
                onClick={pinSetup.handlePinNext}
                disabled={!pinSetup.pinComplete}
                className={pinSetup.pinComplete ? "text-[#5E30A5]" : "text-slate-400"}
              >
                Siguiente
              </button>
            )}
          </div>
          {pinSetup.error && (
            <div className="text-center text-xs text-red-500">
              {pinSetup.error}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-gray-700 shadow-2xl">
      <div className="text-center text-sm font-semibold text-gray-900">
        Simplifica el inicio de sesion anadiendo uno de los siguientes metodos de inicio
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={handleFingerprint}
          disabled={!webauthnAvailable}
          className={`${cardBase} ${fingerprintEnabled ? cardActive : cardInactive}`}
        >
          <Fingerprint className="mb-2 h-5 w-5 text-[#5E30A5]" />
          Huella
        </button>
        <button
          type="button"
          onClick={() => {
            setError("");
            setView("pin");
          }}
          disabled={!webauthnAvailable}
          className={`${cardBase} ${pinEnabled ? cardActive : cardInactive}`}
        >
          <Lock className="mb-2 h-5 w-5 text-[#5E30A5]" />
          PIN
        </button>
      </div>
      <div className="mt-6 flex items-center gap-2 text-xs text-gray-600">
        <input
          type="checkbox"
          checked={skipPrompt}
          onChange={(event) => {
            const next = event.target.checked;
            setSkipPrompt(next);
            if (skipKey) {
              if (next) {
                window.localStorage.setItem(skipKey, "1");
              } else {
                window.localStorage.removeItem(skipKey);
              }
            }
          }}
          className="h-4 w-4 rounded border-gray-300 text-[#5E30A5] focus:ring-[#5E30A5]/30"
        />
        <span>No volver a mostrar este mensaje.</span>
      </div>
      <div className="mt-3 text-[11px] text-gray-500 text-center">
        No uses biometria en dispositivos compartidos
      </div>
      {error && (
        <div className="mt-3 text-center text-xs text-red-500">{error}</div>
      )}
      {fingerprintEnabled || pinEnabled ? (
        <button
          type="button"
          onClick={closeModal}
          className="mt-2 w-full rounded-lg bg-[#5E30A5] py-2.5 text-sm font-semibold text-white"
        >
          Listo
        </button>
      ) : (
        <button
          type="button"
          onClick={closeModal}
          className="mt-2 w-full text-sm font-semibold text-gray-500"
        >
          Ahora no
        </button>
      )}
    </div>
  );
}
