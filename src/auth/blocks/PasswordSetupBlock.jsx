import PasswordAccessCard from "../../profile/shared/blocks/PasswordAccessCard";
import usePasswordAccess from "../hooks/usePasswordAccess";

export default function PasswordSetupBlock({ provider }) {
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
    onRemovePassword,
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
    saving,
    error,
    message,
  } = usePasswordAccess({ provider });

  return (
    <div className="space-y-3">
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
        onRemovePassword={onRemovePassword}
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
      />
      {saving && (
        <div className="text-xs text-slate-500">Guardando contrasena...</div>
      )}
      {error && <div className="text-xs text-red-500">{error}</div>}
      {message && <div className="text-xs text-emerald-600">{message}</div>}
    </div>
  );
}
