import { Check, Eye, EyeOff, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import usePasswordAccess from "../hooks/usePasswordAccess";

export default function PasswordSetupBlock({
  provider,
  onValidityChange,
  onSaveChange,
}) {
  const {
    showPasswordForm,
    passwordValue,
    passwordConfirm,
    showPassword,
    showPasswordConfirm,
    hasMinLength,
    hasNumberAndSymbol,
    passwordsMatch,
    showPasswordRules,
    showPasswordErrors,
    showConfirmErrors,
    showConfirmRule,
    canSavePassword,
    onToggleShowPassword,
    onToggleShowPasswordConfirm,
    onChangePasswordValue,
    onChangePasswordConfirm,
    onFocusField,
    onBlurField,
    passwordInputRef,
    confirmInputRef,
    onPasswordSave,
    passwordSaved,
    saving,
    error,
    message,
  } = usePasswordAccess({ provider });

  const lastValidityRef = useRef(null);
  const lastSaveRef = useRef({
    save: null,
    saving: null,
    error: null,
    message: null,
  });
  const [showMatchMessage, setShowMatchMessage] = useState(false);
  const matchTimerRef = useRef(null);

  useEffect(() => {
    if (!onValidityChange) return;
    if (lastValidityRef.current === canSavePassword) return;
    lastValidityRef.current = canSavePassword;
    onValidityChange(canSavePassword);
  }, [canSavePassword, onValidityChange]);

  useEffect(() => {
    if (!onSaveChange) return;
    const prev = lastSaveRef.current;
    if (
      prev.save === onPasswordSave &&
      prev.saving === saving &&
      prev.error === error &&
      prev.message === message
    ) {
      return;
    }
    lastSaveRef.current = {
      save: onPasswordSave,
      saving,
      error,
      message,
    };
    onSaveChange({
      save: onPasswordSave,
      saving,
      error,
      message,
      saved: passwordSaved,
    });
  }, [onPasswordSave, onSaveChange, saving, error, message, passwordSaved]);

  useEffect(() => {
    if (!passwordsMatch || !showConfirmRule) {
      setShowMatchMessage(false);
      if (matchTimerRef.current) {
        clearTimeout(matchTimerRef.current);
        matchTimerRef.current = null;
      }
      return;
    }
    setShowMatchMessage(true);
    if (matchTimerRef.current) {
      clearTimeout(matchTimerRef.current);
    }
    matchTimerRef.current = setTimeout(() => {
      setShowMatchMessage(false);
      matchTimerRef.current = null;
    }, 3000);
    return () => {
      if (matchTimerRef.current) {
        clearTimeout(matchTimerRef.current);
        matchTimerRef.current = null;
      }
    };
  }, [passwordsMatch, showConfirmRule]);

  const showClear =
    passwordValue.length >= 2 || passwordConfirm.length >= 2;
  const showSavedMessage = passwordSaved && message;

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Asegura tu cuenta al agregar una contraseña.
      </p>

      {showSavedMessage ? (
        <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm text-emerald-600">
          <span>{message}</span>
          <Check size={16} />
        </div>
      ) : (
        <div className="space-y-4">
        <div className="space-y-1">
          <label className="block text-xs text-gray-500 ml-1">Contraseña</label>
          <div className="relative">
            <input
              ref={passwordInputRef}
              type={showPassword ? "text" : "password"}
              value={passwordValue}
              onChange={onChangePasswordValue}
              onFocus={() => onFocusField("new")}
              onBlur={onBlurField}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 pr-12 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30"
            />
            {passwordValue.length > 0 ? (
              <button
                type="button"
                onClick={onToggleShowPassword}
                className="absolute right-0 top-0 h-full px-3 text-xs font-semibold text-gray-400 hover:text-gray-600"
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
          <div className="space-y-2 text-xs pl-1 -mt-2">
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

        <div className="space-y-1">
          <label className="block text-xs text-gray-500 ml-1">
            Confirmar contraseña
          </label>
          <div className="relative">
            <input
              ref={confirmInputRef}
              type={showPasswordConfirm ? "text" : "password"}
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
              onFocus={() => onFocusField("confirm")}
              onBlur={onBlurField}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 pr-12 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30"
            />
            {passwordConfirm.length > 0 ? (
              <button
                type="button"
                onClick={onToggleShowPasswordConfirm}
                className="absolute right-0 top-0 h-full px-3 text-xs font-semibold text-gray-400 hover:text-gray-600"
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
          <div className="text-xs pl-1">
            {showMatchMessage ? (
              <div className="flex items-center gap-2 text-emerald-600">
                <Check size={12} />
                Las contrasenas coinciden
              </div>
            ) : showConfirmErrors ? (
              <div className="flex items-center gap-2 text-red-500">
                <X size={12} />
                Las contrasenas deben coincidir
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      )}

      {showPasswordForm ? (
        <div className="mt-2 flex items-center justify-between text-sm font-semibold px-4">
          {showClear ? (
            <button
              type="button"
              onClick={() => {
                onChangePasswordValue({ target: { value: "" } });
                onChangePasswordConfirm({ target: { value: "" } });
                passwordInputRef.current?.blur();
                confirmInputRef.current?.blur();
              }}
              className="text-[#2F1A55]"
            >
              Limpiar
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={onPasswordSave}
            disabled={!canSavePassword}
            className={canSavePassword ? "text-[#5E30A5]" : "text-slate-400"}
          >
            Guardar
          </button>
        </div>
      ) : null}

      {saving && (
        <div className="text-xs text-slate-500">Guardando contrasena...</div>
      )}
      {error && <div className="text-xs text-red-500">{error}</div>}
      {!showSavedMessage && message && (
        <div className="text-xs text-emerald-600">{message}</div>
      )}
    </div>
  );
}
