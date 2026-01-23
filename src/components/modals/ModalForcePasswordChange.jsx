import React, { useEffect } from "react";
import PasswordAccessCard from "../../profile/shared/blocks/PasswordAccessCard";
import usePasswordAccess from "../../auth/hooks/usePasswordAccess";
import { useAppStore } from "../../store/appStore";
import { useModal } from "../../modals/useModal";

export default function ModalForcePasswordChange() {
  const usuario = useAppStore((s) => s.usuario);
  const setUser = useAppStore((s) => s.setUser);
  const { closeModal } = useModal();
  const {
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
    passwordSaved,
    saving,
    error,
    message,
  } = usePasswordAccess({ provider: "oauth" });

  useEffect(() => {
    if (!showPasswordForm) {
      onOpenAdd();
    }
  }, [showPasswordForm, onOpenAdd]);

  useEffect(() => {
    if (!passwordSaved) return;
    if (usuario) {
      setUser({
        ...usuario,
        has_password: true,
        must_change_password: false,
      });
    }
    closeModal();
  }, [passwordSaved, usuario, setUser, closeModal]);

  return (
    <div className="mx-auto w-[92vw] max-w-[420px] rounded-[20px] bg-white p-6 shadow-[0_8px_25px_rgba(0,0,0,0.15)]">
      <div className="text-center space-y-2">
        <div className="text-lg font-bold text-[#5E30A5]">
          Configura tu contrasena
        </div>
        <div className="text-xs text-slate-500">
          Debes crear una nueva contrasena para continuar.
        </div>
      </div>

      <div className="mt-6">
        <PasswordAccessCard
          passwordActive={passwordActive}
          showPasswordForm={showPasswordForm}
          passwordMode={passwordMode}
          currentPassword={currentPassword}
          passwordValue={passwordValue}
          passwordConfirm={passwordConfirm}
          showPassword={showPassword}
          showPasswordConfirm={showPasswordConfirm}
          showCurrentPassword={showCurrentPassword}
          hasMinLength={hasMinLength}
          hasNumberAndSymbol={hasNumberAndSymbol}
          passwordsMatch={passwordsMatch}
          showPasswordRules={showPasswordRules}
          showPasswordErrors={showPasswordErrors}
          showConfirmErrors={showConfirmErrors}
          showConfirmRule={showConfirmRule}
          canSavePassword={canSavePassword}
          showCurrentPasswordError={showCurrentPasswordError}
          onPasswordCancel={onPasswordCancel}
          onPasswordSave={onPasswordSave}
          onOpenAdd={onOpenAdd}
          onOpenChange={onOpenChange}
          onToggleShowPassword={onToggleShowPassword}
          onToggleShowPasswordConfirm={onToggleShowPasswordConfirm}
          onToggleShowCurrentPassword={onToggleShowCurrentPassword}
          onChangeCurrentPassword={onChangeCurrentPassword}
          onChangePasswordValue={onChangePasswordValue}
          onChangePasswordConfirm={onChangePasswordConfirm}
          onFocusField={onFocusField}
          onBlurField={onBlurField}
          passwordFormRef={passwordFormRef}
          currentPasswordRef={currentPasswordRef}
          passwordInputRef={passwordInputRef}
          confirmInputRef={confirmInputRef}
          hideClose
          hideCancel
        />
      </div>

      {saving ? (
        <div className="mt-4 text-xs text-slate-400">Guardando...</div>
      ) : null}
      {error ? (
        <div className="mt-3 text-xs text-red-500">{error}</div>
      ) : null}
      {message ? (
        <div className="mt-3 text-xs text-emerald-600">{message}</div>
      ) : null}
    </div>
  );
}
