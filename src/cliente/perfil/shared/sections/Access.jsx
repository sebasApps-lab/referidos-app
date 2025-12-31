import React, { useCallback, useEffect, useRef, useState } from "react";
import { Asterisk, Check, Fingerprint, KeyRound, Lock, Minus, Pencil, Plus, X } from "lucide-react";
import { useModal } from "../../../../modals/useModal";
import { supabase } from "../../../../lib/supabaseClient";

export default function Access({ usuario }) {
  const [fingerprintEnabled, setFingerprintEnabled] = useState(false);
  const [pinEnabled, setPinEnabled] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [authProvider, setAuthProvider] = useState(null);
  const passwordFormRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmInputRef = useRef(null);
  const { openModal } = useModal();
  const provider = (authProvider || usuario?.provider || "").toLowerCase();
  const hasPassword = provider === "email" || provider === "password";

  useEffect(() => {
    let active = true;
    const loadProvider = async () => {
      const { data } = await supabase.auth.getSession();
      const nextProvider = data?.session?.user?.app_metadata?.provider ?? null;
      if (active) {
        setAuthProvider(nextProvider);
      }
    };
    loadProvider();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (hasPassword && showPasswordForm) {
      setShowPasswordForm(false);
    }
  }, [hasPassword, showPasswordForm]);

  const handlePasswordFocus = useCallback((field) => {
    setFocusedField(field);
  }, []);

  const handlePasswordBlur = useCallback(() => {
    requestAnimationFrame(() => {
      const active = document.activeElement;
      if (active === passwordInputRef.current) {
        setFocusedField("password");
        return;
      }
      if (active === confirmInputRef.current) {
        setFocusedField("confirm");
        return;
      }
      setFocusedField(null);
    });
  }, []);

  const hasMinLength = passwordValue.length >= 8;
  const hasNumber = /\d/.test(passwordValue);
  const hasSymbol = /[^A-Za-z0-9]/.test(passwordValue);
  const hasNumberAndSymbol = hasNumber && hasSymbol;
  const passwordsMatch =
    passwordValue.length > 0 &&
    passwordConfirm.length > 0 &&
    passwordValue === passwordConfirm;
  const showPasswordRules = focusedField === "password" || passwordValue.length > 0;
  const showPasswordErrors = focusedField !== "password" && passwordValue.length > 0;
  const showConfirmErrors = focusedField !== "confirm" && passwordConfirm.length > 0;
  const showConfirmRule =
    hasMinLength && hasNumberAndSymbol && passwordConfirm.length > 0;
  const canSavePassword = hasMinLength && hasNumberAndSymbol && passwordsMatch;

  const handlePasswordCancel = () => {
    setPasswordValue("");
    setPasswordConfirm("");
    setFocusedField(null);
    setShowPasswordForm(false);
    document.activeElement?.blur();
  };

  const handlePasswordSave = () => {
    if (!canSavePassword) return;
    setShowPasswordForm(false);
  };

  return (
    <section className="relative rounded-[30px] border border-[#E9E2F7] px-6 pb-6 pt-6 space-y-6">
      <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
          Metodos de acceso
        </span>
      </div>
      <div className="mt-1">
        <p className="text-xs text-slate-500 text-center">
          Gestiona metodos de acceso y cuentas vinculadas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 -ml-0.5">
              <span className="flex items-center text-[#5E30A5]">
                <Asterisk size={10} />
                <span className="-ml-1">
                  <Asterisk size={10} />
                </span>
                <span className="-ml-1">
                  <Asterisk size={10} />
                </span>
              </span>
              <span className="text-xs font-semibold text-[#2F1A55] -ml-1">
                {showPasswordForm ? "Anadir una contrasena" : "Contrasena"}
              </span>
              {hasPassword ? (
                <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 p-1 text-emerald-600">
                  <Check size={12} />
                </span>
              ) : null}
            </div>
            {hasPassword ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="h-8 w-8 rounded-full border border-red-200 bg-red-50 text-red-500 flex items-center justify-center"
                  aria-label="Quitar contrasena"
                >
                  <Minus size={14} />
                </button>
                <button
                  type="button"
                  className="h-8 w-8 rounded-full border border-slate-400 bg-white text-slate-700 flex items-center justify-center"
                  aria-label="Editar contrasena"
                  onClick={() => setShowPasswordForm(true)}
                >
                  <Pencil size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={showPasswordForm ? handlePasswordCancel : () => setShowPasswordForm(true)}
                className={`h-8 w-8 rounded-full border flex items-center justify-center ${
                  showPasswordForm
                    ? "border-slate-900 bg-white text-slate-900"
                    : "border-emerald-300 text-emerald-500"
                }`}
                aria-label={showPasswordForm ? "Cerrar contrasena" : "Agregar contrasena"}
              >
                {showPasswordForm ? <X size={14} /> : <Plus size={14} />}
              </button>
            )}
          </div>
          {showPasswordForm ? (
            <div className="mt-6 space-y-7" ref={passwordFormRef}>
              <div className="relative rounded-xl border border-[#E9E2F7] bg-white px-3 py-2">
                <span className="absolute -top-3 left-3 bg-white px-2 text-[13px] text-slate-500">
                  Contrasena
                </span>
                <input
                  ref={passwordInputRef}
                  type="password"
                  value={passwordValue}
                  onChange={(event) => setPasswordValue(event.target.value)}
                  onFocus={() => handlePasswordFocus("password")}
                  onBlur={handlePasswordBlur}
                  className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
                />
              </div>
              {showPasswordRules ? (
                <div className="space-y-2 text-xs pl-1 -mt-4">
                  {[
                    {
                      key: "length",
                      ok: hasMinLength,
                      label: "Al menos 8 caracteres",
                    },
                    {
                      key: "symbols",
                      ok: hasNumberAndSymbol,
                      label: "Incluye un simbolo y un numero",
                    },
                  ].map((item) => {
                    if (showPasswordErrors && item.ok) return null;
                    const color = item.ok
                      ? "text-emerald-600"
                      : showPasswordErrors
                        ? "text-red-500"
                        : "text-slate-400";
                    const Icon = item.ok ? Check : X;
                    return (
                      <div key={item.key} className={`flex items-center gap-2 ${color}`}>
                        <Icon size={12} />
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              ) : null}
              <div className="relative rounded-xl border border-[#E9E2F7] bg-white px-3 py-2">
                <span className="absolute -top-3 left-3 bg-white px-2 text-[13px] text-slate-500">
                  Verificar contrasena
                </span>
                <input
                  ref={confirmInputRef}
                  type="password"
                  value={passwordConfirm}
                  onChange={(event) => setPasswordConfirm(event.target.value)}
                  onFocus={() => handlePasswordFocus("confirm")}
                  onBlur={handlePasswordBlur}
                  className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
                />
              </div>
              {showConfirmRule ? (
                <div className="space-y-2 text-xs pl-1 -mt-4">
                  {(() => {
                    if (showConfirmErrors && passwordsMatch) return null;
                    const color = passwordsMatch
                      ? "text-emerald-600"
                      : showConfirmErrors
                        ? "text-red-500"
                        : "text-slate-400";
                    const Icon = passwordsMatch ? Check : X;
                    return (
                      <div className={`flex items-center gap-2 ${color}`}>
                        <Icon size={12} />
                        Las contrasenas deben coincidir
                      </div>
                    );
                  })()}
                </div>
              ) : null}
              <div className="mt-2 flex items-center justify-between text-sm font-semibold px-4">
                <button
                  type="button"
                  onClick={handlePasswordCancel}
                  className="text-[#2F1A55]"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handlePasswordSave}
                  disabled={!canSavePassword}
                  className={canSavePassword ? "text-[#5E30A5]" : "text-slate-400"}
                >
                  Guardar
                </button>
              </div>
            </div>
          ) : null}
        </div>
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Fingerprint size={18} className="text-[#5E30A5]" />
            <span className="text-xs font-semibold text-[#2F1A55]">
              Huella
            </span>
            {fingerprintEnabled ? (
              <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 p-1 text-emerald-600">
                <Check size={12} />
              </span>
            ) : null}
          </div>
          {fingerprintEnabled ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFingerprintEnabled(false)}
                className="h-8 w-8 rounded-full border border-red-200 bg-red-50 text-red-500 flex items-center justify-center"
                aria-label="Quitar huella"
              >
                <Minus size={14} />
              </button>
              <button
                type="button"
                className="h-8 w-8 rounded-full border border-slate-400 bg-white text-slate-700 flex items-center justify-center"
                aria-label="Editar huella"
              >
                <Pencil size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                openModal("FingerprintPrompt", {
                  onConfirm: () => setFingerprintEnabled(true),
                  userId: usuario?.id_auth ?? usuario?.id ?? null,
                  email: usuario?.email ?? null,
                  displayName: usuario?.nombre ?? usuario?.alias ?? "Usuario",
                });
              }}
              className="h-8 w-8 rounded-full border border-emerald-300 text-emerald-500 flex items-center justify-center"
              aria-label="Agregar huella"
            >
              <Plus size={14} />
            </button>
          )}
        </div>

        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock size={18} className="text-[#5E30A5]" />
            <span className="text-xs font-semibold text-[#2F1A55]">
              PIN
            </span>
            {pinEnabled ? (
              <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 p-1 text-emerald-600">
                <Check size={12} />
              </span>
            ) : null}
          </div>
          {pinEnabled ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPinEnabled(false)}
                className="h-8 w-8 rounded-full border border-red-200 bg-red-50 text-red-500 flex items-center justify-center"
                aria-label="Quitar PIN"
              >
                <Minus size={14} />
              </button>
              <button
                type="button"
                className="h-8 w-8 rounded-full border border-slate-400 bg-white text-slate-700 flex items-center justify-center"
                aria-label="Editar PIN"
              >
                <Pencil size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setPinEnabled(true)}
              className="h-8 w-8 rounded-full border border-emerald-300 text-emerald-500 flex items-center justify-center"
              aria-label="Agregar PIN"
            >
              <Plus size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4 flex items-center gap-3 text-xs text-slate-500">
        <KeyRound size={16} className="text-[#5E30A5]" />
        Cambios sensibles requieren verificacion antes de guardarse.
      </div>

    </section>
  );
}
