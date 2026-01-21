import React from "react";
import {
  Asterisk,
  Check,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  X,
} from "lucide-react";

export default function PasswordAccessCard({
  passwordActive,
  showPasswordForm,
  passwordMode,
  currentPassword,
  passwordValue,
  passwordConfirm,
  showPassword,
  showPasswordConfirm,
  showCurrentPassword,
  hasMinLength,
  hasNumberAndSymbol,
  passwordsMatch,
  showPasswordRules,
  showPasswordErrors,
  showConfirmErrors,
  showConfirmRule,
  canSavePassword,
  showCurrentPasswordError,
  onPasswordCancel,
  onPasswordSave,
  onOpenAdd,
  onOpenChange,
  onToggleShowPassword,
  onToggleShowPasswordConfirm,
  onToggleShowCurrentPassword,
  onChangeCurrentPassword,
  onChangePasswordValue,
  onChangePasswordConfirm,
  onFocusField,
  onBlurField,
  passwordFormRef,
  currentPasswordRef,
  passwordInputRef,
  confirmInputRef,
}) {
  return (
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
            onClick={onPasswordCancel}
            className="h-8 w-8 rounded-full border border-slate-900 bg-white text-slate-900 flex items-center justify-center"
            aria-label="Cerrar contrasena"
          >
            <X size={14} />
          </button>
        ) : passwordActive ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="h-8 w-8 rounded-full border border-slate-400 bg-white text-slate-700 flex items-center justify-center"
              aria-label="Editar contrasena"
              onClick={onOpenChange}
            >
              <Pencil size={14} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpenAdd}
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
                    onChange={onChangeCurrentPassword}
                    onFocus={() => onFocusField("current")}
                    onBlur={onBlurField}
                    className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
                  />
                  {currentPassword.length > 0 ? (
                    <button
                      type="button"
                      onClick={onToggleShowCurrentPassword}
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
                onChange={onChangePasswordValue}
                onFocus={() => onFocusField("new")}
                onBlur={onBlurField}
                className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
              />
              {passwordValue.length > 0 ? (
                <button
                  type="button"
                  onClick={onToggleShowPassword}
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
              {passwordMode === "change"
                ? "Confirmar contrasena"
                : "Verificar contrasena"}
            </span>
            <div className="flex items-center gap-2">
              <input
                ref={confirmInputRef}
                type={showPasswordConfirm ? "text" : "password"}
                value={passwordConfirm}
                onChange={onChangePasswordConfirm}
                onFocus={() => onFocusField("confirm")}
                onBlur={onBlurField}
                className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
              />
              {passwordConfirm.length > 0 ? (
                <button
                  type="button"
                  onClick={onToggleShowPasswordConfirm}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label={
                    showPasswordConfirm
                      ? "Ocultar contrasena"
                      : "Mostrar contrasena"
                  }
                >
                  {showPasswordConfirm ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
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
              onClick={onPasswordCancel}
              className="text-[#2F1A55]"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onPasswordSave}
              disabled={!canSavePassword}
              className={canSavePassword ? "text-[#5E30A5]" : "text-slate-400"}
            >
              Guardar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
