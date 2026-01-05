import React, { useCallback, useEffect, useRef, useState } from "react";
import { Asterisk, Check, Eye, EyeOff, Fingerprint, KeyRound, Lock, Minus, Pencil, Plus, TriangleAlert, X } from "lucide-react";
import { useModal } from "../../../modals/useModal";
import { useAppStore } from "../../../store/appStore";
import { supabase } from "../../../lib/supabaseClient";

let accessInfoDismissed = false;

export default function Access({ usuario }) {
  const [fingerprintEnabled, setFingerprintEnabled] = useState(false);
  const [pinEnabled, setPinEnabled] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordMode, setPasswordMode] = useState("add");
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [passwordAttempted, setPasswordAttempted] = useState(false);
  const [showPinForm, setShowPinForm] = useState(false);
  const [pinValue, setPinValue] = useState("");
  const [pinStep, setPinStep] = useState("create");
  const [pinFirst, setPinFirst] = useState("");
  const [pinReveal, setPinReveal] = useState([false, false, false, false]);
  const [focusedField, setFocusedField] = useState(null);
  const [authProvider, setAuthProvider] = useState(null);
  const [passwordEnabled, setPasswordEnabled] = useState(null);
  const [removalBlocked, setRemovalBlocked] = useState(false);
  const [dismissedMethodsWarning, setDismissedMethodsWarning] = useState(false);
  const [dismissedInfo, setDismissedInfo] = useState(accessInfoDismissed);
  const passwordFormRef = useRef(null);
  const currentPasswordRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmInputRef = useRef(null);
  const pinInputRefs = useRef([]);
  const pinRevealTimersRef = useRef([]);
  const prevUserIdRef = useRef(null);
  const { openModal } = useModal();
  const setAccessMethods = useAppStore((s) => s.setAccessMethods);
  const provider = (authProvider || usuario?.provider || "").toLowerCase();
  const hasPassword = provider === "email" || provider === "password";
  const passwordActive = passwordEnabled ?? hasPassword;
  const methodsCount =
    (passwordActive ? 1 : 0) + (fingerprintEnabled ? 1 : 0) + (pinEnabled ? 1 : 0);
  const showMethodsWarning =
    (methodsCount === 0 || removalBlocked) && !dismissedMethodsWarning;

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
    if (passwordEnabled === null) {
      setPasswordEnabled(hasPassword);
      return;
    }
    if (!hasPassword && passwordEnabled) {
      setPasswordEnabled(false);
    }
  }, [hasPassword, passwordEnabled]);

  useEffect(() => {
    if (passwordActive && showPasswordForm && passwordMode === "add") {
      setShowPasswordForm(false);
    }
  }, [passwordActive, showPasswordForm, passwordMode]);

  useEffect(() => {
    if (methodsCount === 0) {
      setDismissedMethodsWarning(false);
    }
  }, [methodsCount]);

  useEffect(() => {
    setAccessMethods({
      fingerprint: fingerprintEnabled,
      pin: pinEnabled,
      password: passwordActive,
    });
  }, [fingerprintEnabled, passwordActive, pinEnabled, setAccessMethods]);

  useEffect(() => {
    const currentId = usuario?.id_auth ?? null;
    if (prevUserIdRef.current !== currentId) {
      prevUserIdRef.current = currentId;
      accessInfoDismissed = false;
      setDismissedInfo(false);
    }
  }, [usuario?.id_auth]);

  useEffect(() => {
    if (methodsCount > 1 && removalBlocked) {
      setRemovalBlocked(false);
    }
  }, [methodsCount, removalBlocked]);

  const handlePasswordFocus = useCallback((field) => {
    setFocusedField(field);
  }, []);

  const handlePasswordBlur = useCallback(() => {
    requestAnimationFrame(() => {
      const active = document.activeElement;
      if (active === currentPasswordRef.current) {
        setFocusedField("current");
        return;
      }
      if (active === passwordInputRef.current) {
        setFocusedField("new");
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
  const showPasswordRules = focusedField === "new" || passwordValue.length > 0;
  const showPasswordErrors = focusedField !== "new" && passwordValue.length > 0;
  const showConfirmErrors = focusedField !== "confirm" && passwordConfirm.length > 0;
  const showConfirmRule =
    hasMinLength && hasNumberAndSymbol && passwordConfirm.length > 0;
  const canSavePassword = hasMinLength && hasNumberAndSymbol && passwordsMatch;
  const showCurrentPasswordError =
    passwordMode === "change" && passwordAttempted && !currentPassword.trim();

  const handlePasswordCancel = () => {
    setPasswordValue("");
    setPasswordConfirm("");
    setCurrentPassword("");
    setFocusedField(null);
    setPasswordMode("add");
    setPasswordAttempted(false);
    setShowPasswordForm(false);
    document.activeElement?.blur();
  };

  const handlePasswordSave = () => {
    setPasswordAttempted(true);
    if (!canSavePassword) return;
    if (passwordMode === "change" && !currentPassword.trim()) return;
    setPasswordEnabled(true);
    setShowPasswordForm(false);
    setPasswordMode("add");
    setPasswordAttempted(false);
  };

  const openAddPassword = () => {
    setPasswordMode("add");
    setCurrentPassword("");
    setPasswordValue("");
    setPasswordConfirm("");
    setPasswordAttempted(false);
    setShowPasswordForm(true);
  };

  const openChangePassword = () => {
    setPasswordMode("change");
    setCurrentPassword("");
    setPasswordValue("");
    setPasswordConfirm("");
    setPasswordAttempted(false);
    setShowPasswordForm(true);
  };

  const sanitizedPin = pinValue.replace(/[^0-9]/g, "").slice(0, 4);
  const pinSlots = Array(4)
    .fill("")
    .map((_, index) => sanitizedPin[index] || "");
  const pinComplete = pinSlots.every(Boolean);
  const pinMatches = pinValue === pinFirst;

  const getFirstEmptyPinIndex = () => pinSlots.findIndex((char) => !char);
  const getLastFilledPinIndex = () => {
    for (let i = pinSlots.length - 1; i >= 0; i -= 1) {
      if (pinSlots[i]) return i;
    }
    return -1;
  };

  const focusPinInput = (index) => {
    window.requestAnimationFrame(() => {
      pinInputRefs.current[index]?.focus();
    });
  };

  const setPinRevealIndex = useCallback((index) => {
    setPinReveal((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
    if (pinRevealTimersRef.current[index]) {
      clearTimeout(pinRevealTimersRef.current[index]);
    }
    pinRevealTimersRef.current[index] = setTimeout(() => {
      setPinReveal((prev) => {
        const next = [...prev];
        next[index] = false;
        return next;
      });
    }, 400);
  }, []);

  const updatePinSlot = (nextValue) => {
    const cleaned = (nextValue || "").replace(/[^0-9]/g, "");
    if (!cleaned) return;
    const chars = cleaned.split("");
    const nextSlots = [...pinSlots];
    const firstEmpty = getFirstEmptyPinIndex();
    let cursor = firstEmpty === -1 ? nextSlots.length - 1 : firstEmpty;
    chars.forEach((char) => {
      if (cursor < nextSlots.length) {
        nextSlots[cursor] = char;
        setPinRevealIndex(cursor);
        cursor += 1;
      }
    });
    setPinValue(nextSlots.join(""));
    if (cursor < nextSlots.length) {
      focusPinInput(cursor);
    } else {
      pinInputRefs.current[nextSlots.length - 1]?.blur();
    }
  };

  const handlePinKeyDown = (event) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      const lastFilled = getLastFilledPinIndex();
      if (lastFilled === -1) return;
      const nextSlots = [...pinSlots];
      nextSlots[lastFilled] = "";
      setPinValue(nextSlots.join(""));
      focusPinInput(lastFilled);
    }
  };

  const resetPinForm = useCallback(() => {
    setPinValue("");
    setPinFirst("");
    setPinStep("create");
    setShowPinForm(false);
    setPinReveal([false, false, false, false]);
    pinRevealTimersRef.current.forEach((timer) => {
      if (timer) clearTimeout(timer);
    });
    pinRevealTimersRef.current = [];
    document.activeElement?.blur();
  }, []);

  const openPinForm = () => {
    setPinValue("");
    setPinFirst("");
    setPinStep("create");
    setPinReveal([false, false, false, false]);
    setShowPinForm(true);
  };

  const handlePinNext = () => {
    if (!pinComplete) return;
    setPinFirst(pinValue);
    setPinValue("");
    setPinStep("confirm");
    setPinReveal([false, false, false, false]);
    focusPinInput(0);
  };

  const handlePinConfirm = () => {
    if (!pinComplete || !pinMatches) return;
    setPinEnabled(true);
    resetPinForm();
  };

  const handleRemovePassword = () => {
    if (methodsCount <= 1) {
      setRemovalBlocked(true);
      setDismissedMethodsWarning(false);
      return;
    }
    setPasswordEnabled(false);
  };

  const handleRemoveFingerprint = () => {
    if (methodsCount <= 1) {
      setRemovalBlocked(true);
      setDismissedMethodsWarning(false);
      return;
    }
    setFingerprintEnabled(false);
  };

  const handleRemovePin = () => {
    if (methodsCount <= 1) {
      setRemovalBlocked(true);
      setDismissedMethodsWarning(false);
      return;
    }
    setPinEnabled(false);
  };

  useEffect(() => {
    return () => {
      pinRevealTimersRef.current.forEach((timer) => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);

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
      {showMethodsWarning ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 flex items-center gap-3 text-xs text-red-500">
          <TriangleAlert size={16} className="text-red-500" />
          Es necesario al menos un metodo de verificacion.
          <button
            type="button"
            onClick={() => setDismissedMethodsWarning(true)}
            className="ml-auto text-red-400 hover:text-red-500"
            aria-label="Cerrar aviso"
          >
            <X size={14} />
          </button>
        </div>
      ) : null}

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
                {showPasswordForm
                  ? passwordMode === "change"
                    ? "Cambiar contrasena"
                    : "Anadir una contrasena"
                  : "Contrasena"}
              </span>
              {passwordActive ? (
                <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 p-1 text-emerald-600">
                  <Check size={12} />
                </span>
              ) : null}
            </div>
            {showPasswordForm ? (
              <button
                type="button"
                onClick={handlePasswordCancel}
                className="h-8 w-8 rounded-full border border-slate-900 bg-white text-slate-900 flex items-center justify-center"
                aria-label="Cerrar contrasena"
              >
                <X size={14} />
              </button>
            ) : passwordActive ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRemovePassword}
                  className="h-8 w-8 rounded-full border border-red-200 bg-red-50 text-red-500 flex items-center justify-center"
                  aria-label="Quitar contrasena"
                >
                  <Minus size={14} />
                </button>
                <button
                  type="button"
                  className="h-8 w-8 rounded-full border border-slate-400 bg-white text-slate-700 flex items-center justify-center"
                  aria-label="Editar contrasena"
                  onClick={openChangePassword}
                >
                  <Pencil size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={openAddPassword}
                className="h-8 w-8 rounded-full border border-emerald-300 text-emerald-500 flex items-center justify-center"
                aria-label="Agregar contrasena"
              >
                <Plus size={14} />
              </button>
            )}
          </div>
          {showPasswordForm ? (
            <div className="mt-6 space-y-7" ref={passwordFormRef}>
              {passwordMode === "change" ? (
                <div className="space-y-2 mb-4">
                  <div className="relative rounded-xl border border-[#E9E2F7] bg-white px-3 py-2">
                    <span className="absolute -top-3 left-3 bg-white px-2 text-[13px] text-slate-500">
                      Contrasena anterior
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        ref={currentPasswordRef}
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                        onFocus={() => handlePasswordFocus("current")}
                        onBlur={handlePasswordBlur}
                        className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
                      />
                      {currentPassword.length > 0 ? (
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword((prev) => !prev)}
                          className="text-slate-400 hover:text-slate-600"
                          aria-label={
                            showCurrentPassword
                              ? "Ocultar contrasena"
                              : "Mostrar contrasena"
                          }
                        >
                          {showCurrentPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      ) : null}
                    </div>
                  </div>
                  {showCurrentPasswordError ? (
                    <div className="flex items-center gap-2 text-xs text-red-500 pl-1">
                      <X size={12} />
                      La contrasena no coincide con la anterior
                    </div>
                  ) : null}
                </div>
              ) : null}
              <div className="relative rounded-xl border border-[#E9E2F7] bg-white px-3 py-2">
                <span className="absolute -top-3 left-3 bg-white px-2 text-[13px] text-slate-500">
                  {passwordMode === "change" ? "Nueva contrasena" : "Contrasena"}
                </span>
                <div className="flex items-center gap-2">
                  <input
                    ref={passwordInputRef}
                    type={showPassword ? "text" : "password"}
                    value={passwordValue}
                    onChange={(event) => setPasswordValue(event.target.value)}
                    onFocus={() => handlePasswordFocus("new")}
                    onBlur={handlePasswordBlur}
                    className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
                  />
                  {passwordValue.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-slate-400 hover:text-slate-600"
                      aria-label={
                        showPassword ? "Ocultar contrasena" : "Mostrar contrasena"
                      }
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  ) : null}
                </div>
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
                  {passwordMode === "change" ? "Confirmar contrasena" : "Verificar contrasena"}
                </span>
                <div className="flex items-center gap-2">
                  <input
                    ref={confirmInputRef}
                    type={showPasswordConfirm ? "text" : "password"}
                    value={passwordConfirm}
                    onChange={(event) => setPasswordConfirm(event.target.value)}
                    onFocus={() => handlePasswordFocus("confirm")}
                    onBlur={handlePasswordBlur}
                    className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
                  />
                  {passwordConfirm.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => setShowPasswordConfirm((prev) => !prev)}
                      className="text-slate-400 hover:text-slate-600"
                      aria-label={
                        showPasswordConfirm
                          ? "Ocultar contrasena"
                          : "Mostrar contrasena"
                      }
                    >
                      {showPasswordConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  ) : null}
                </div>
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
                onClick={handleRemoveFingerprint}
                className="h-8 w-8 rounded-full border border-red-200 bg-red-50 text-red-500 flex items-center justify-center"
                aria-label="Quitar huella"
              >
                <Minus size={14} />
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

        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock size={18} className="text-[#5E30A5]" />
              <span className="text-xs font-semibold text-[#2F1A55]">
                {showPinForm ? (pinStep === "confirm" ? "Confirmar PIN" : "Anadir PIN") : "PIN"}
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
                  onClick={handleRemovePin}
                  className="h-8 w-8 rounded-full border border-red-200 bg-red-50 text-red-500 flex items-center justify-center"
                  aria-label="Quitar PIN"
                >
                  <Minus size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (showPinForm) {
                    resetPinForm();
                  } else {
                    openPinForm();
                    focusPinInput(0);
                  }
                }}
                className={`h-8 w-8 rounded-full border flex items-center justify-center ${
                  showPinForm
                    ? "border-slate-900 bg-white text-slate-900"
                    : "border-emerald-300 text-emerald-500"
                }`}
                aria-label={showPinForm ? "Cerrar PIN" : "Agregar PIN"}
              >
                {showPinForm ? <X size={14} /> : <Plus size={14} />}
              </button>
            )}
          </div>
          {showPinForm ? (
            <div className="mt-4 space-y-5">
              <p className="text-xs text-slate-500 text-center">
                {pinStep === "confirm" ? "Ingresar el PIN de nuevo." : "Ingresa un PIN."}
              </p>
              <div className="flex items-center justify-center gap-2">
                {pinSlots.map((char, index) => (
                  <input
                    key={`pin-${index}`}
                    value={char}
                    onChange={(event) => updatePinSlot(event.target.value)}
                    onKeyDown={handlePinKeyDown}
                    onPointerDown={(event) => {
                      event.preventDefault();
                      const firstEmpty = getFirstEmptyPinIndex();
                      const targetIndex =
                        firstEmpty === -1 ? pinSlots.length - 1 : firstEmpty;
                      pinInputRefs.current[targetIndex]?.focus();
                    }}
                    ref={(el) => {
                      pinInputRefs.current[index] = el;
                    }}
                    maxLength={1}
                    type={pinReveal[index] ? "text" : "password"}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="h-11 w-11 rounded-xl border border-[#D8CFF2] bg-white text-center text-lg font-semibold text-[#5E30A5] outline-none transition focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/20"
                  />
                ))}
              </div>
              {pinStep === "confirm" ? (
                <div className="text-xs pl-1 text-center">
                  {(() => {
                    const color = pinComplete
                      ? pinMatches
                        ? "text-emerald-600"
                        : "text-red-500"
                      : "text-slate-400";
                    const Icon = pinComplete ? (pinMatches ? Check : X) : X;
                    return (
                      <span className={`inline-flex items-center gap-2 ${color}`}>
                        <Icon size={12} />
                        El PIN debe coincidir
                      </span>
                    );
                  })()}
                </div>
              ) : null}
              <div className="mt-2 flex items-center justify-between text-sm font-semibold px-4">
                <button
                  type="button"
                  onClick={resetPinForm}
                  className="text-[#2F1A55]"
                >
                  Cancelar
                </button>
                {pinStep === "confirm" ? (
                  <button
                    type="button"
                    onClick={handlePinConfirm}
                    disabled={!pinComplete || !pinMatches}
                    className={
                      pinComplete && pinMatches ? "text-[#5E30A5]" : "text-slate-400"
                    }
                  >
                    Confirmar
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePinNext}
                    disabled={!pinComplete}
                    className={pinComplete ? "text-[#5E30A5]" : "text-slate-400"}
                  >
                    Siguiente
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {!dismissedInfo ? (
        <div className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4 flex items-center gap-3 text-xs text-slate-500">
          <KeyRound size={16} className="text-[#5E30A5]" />
          Cambios sensibles requieren verificacion antes de guardarse.
          <button
            type="button"
            onClick={() => {
              accessInfoDismissed = true;
              setDismissedInfo(true);
            }}
            className="ml-auto text-slate-400 hover:text-slate-500"
            aria-label="Cerrar aviso"
          >
            <X size={14} />
          </button>
        </div>
      ) : null}

    </section>
  );
}
