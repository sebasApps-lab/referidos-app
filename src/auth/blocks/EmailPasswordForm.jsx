import React from "react";
import { Link } from "react-router-dom";
import { Check, Eye, EyeOff, X } from "lucide-react";

export default function EmailPasswordForm({
  authTab,
  email,
  password,
  passwordConfirm,
  showPassword,
  showPasswordConfirm,
  hasMinLength,
  hasNumberAndSymbol,
  passwordsMatch,
  showPasswordRules,
  showPasswordErrors,
  showConfirmRule,
  showConfirmErrors,
  onChangeEmail,
  onChangePassword,
  onChangePasswordConfirm,
  onToggleShowPassword,
  onToggleShowPasswordConfirm,
  onFocusField,
  onBlurField,
  passwordInputRef,
  confirmInputRef,
  onSubmit,
  primaryLabel,
  primaryDisabled,
  inputClassName,
  inputDisabled,
}) {
  const isRegister = authTab === "register";
  const passwordType = showPassword ? "text" : "password";
  const confirmType = showPasswordConfirm ? "text" : "password";
  const passwordInputClassName = isRegister
    ? `${inputClassName} pr-10`
    : inputClassName;
  const confirmInputClassName = `${inputClassName} pr-10`;

  return (
    <>
      <label className="text-sm text-gray-700">Email</label>
      <input
        type="email"
        placeholder="Ingrese su email..."
        className={inputClassName}
        value={email}
        onChange={(event) => onChangeEmail(event.target.value)}
        disabled={inputDisabled}
      />

      <label className="text-sm text-gray-700">Contrasena</label>
      <div className="relative">
        <input
          ref={passwordInputRef}
          type={isRegister ? passwordType : "password"}
          placeholder="Ingrese su contrasena..."
          className={passwordInputClassName}
          value={password}
          onChange={(event) => onChangePassword(event.target.value)}
          onFocus={isRegister ? () => onFocusField?.("new") : undefined}
          onBlur={isRegister ? onBlurField : undefined}
          disabled={inputDisabled}
        />
        {isRegister && password.length > 0 ? (
          <button
            type="button"
            onClick={onToggleShowPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        ) : null}
      </div>

      {isRegister && showPasswordRules ? (
        <div className="space-y-2 text-xs pl-1 -mt-1 mb-2">
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
                : "text-gray-400";
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

      {isRegister ? (
        <>
          <label className="text-sm text-gray-700">Confirmar contrasena</label>
          <div className="relative">
            <input
              ref={confirmInputRef}
              type={confirmType}
              placeholder="Confirma tu contrasena..."
              className={confirmInputClassName}
              value={passwordConfirm}
              onChange={(event) => onChangePasswordConfirm(event.target.value)}
              onFocus={() => onFocusField?.("confirm")}
              onBlur={onBlurField}
              disabled={inputDisabled}
            />
            {passwordConfirm.length > 0 ? (
              <button
                type="button"
                onClick={onToggleShowPasswordConfirm}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={
                  showPasswordConfirm ? "Ocultar contrasena" : "Mostrar contrasena"
                }
              >
                {showPasswordConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            ) : null}
          </div>

          {showConfirmRule ? (
            <div className="space-y-2 text-xs pl-1 -mt-1 mb-2">
              {(() => {
                if (showConfirmErrors && passwordsMatch) return null;
                const color = passwordsMatch
                  ? "text-emerald-600"
                  : showConfirmErrors
                    ? "text-red-500"
                    : "text-gray-400";
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
        </>
      ) : null}

      <button
        onClick={onSubmit}
        disabled={primaryDisabled}
        className="w-full bg-[#FFC21C] text-white font-semibold py-2.5 rounded-lg shadow active:scale-[0.98] disabled:opacity-50 mt-3"
      >
        {primaryLabel}
      </button>

      {authTab === "login" ? (
        <Link
          to="/recuperar"
          className="block text-center text-sm text-gray-400 mt-4 underline"
        >
          OLVIDASTE TU CONTRASENA?
        </Link>
      ) : (
        <div className="block text-center text-sm text-gray-500 mt-4">
          Avanza para elegir el tipo de cuenta
        </div>
      )}
    </>
  );
}
