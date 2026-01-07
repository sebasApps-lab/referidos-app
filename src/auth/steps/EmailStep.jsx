import React from "react";
import AuthCard from "../blocks/AuthCard";
import AuthTabs from "../blocks/AuthTabs";
import EmailPasswordForm from "../blocks/EmailPasswordForm";
import ErrorBanner from "../blocks/ErrorBanner";

export default function EmailStep({
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
  error,
  loginLoading,
  onLoginTab,
  onRegisterTab,
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
}) {
  const inputCommon =
    "w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-2 text-sm";

  return (
    <div className="relative w-full max-w-sm mt-2">
      <AuthCard className="p-6">
        {error && <ErrorBanner message={error} className="mb-3 text-center" />}

        <AuthTabs
          activeTab={authTab}
          onLogin={onLoginTab}
          onRegister={onRegisterTab}
        />

        <EmailPasswordForm
          authTab={authTab}
          email={email}
          password={password}
          passwordConfirm={passwordConfirm}
          showPassword={showPassword}
          showPasswordConfirm={showPasswordConfirm}
          hasMinLength={hasMinLength}
          hasNumberAndSymbol={hasNumberAndSymbol}
          passwordsMatch={passwordsMatch}
          showPasswordRules={showPasswordRules}
          showPasswordErrors={showPasswordErrors}
          showConfirmRule={showConfirmRule}
          showConfirmErrors={showConfirmErrors}
          onChangeEmail={onChangeEmail}
          onChangePassword={onChangePassword}
          onChangePasswordConfirm={onChangePasswordConfirm}
          onToggleShowPassword={onToggleShowPassword}
          onToggleShowPasswordConfirm={onToggleShowPasswordConfirm}
          onFocusField={onFocusField}
          onBlurField={onBlurField}
          passwordInputRef={passwordInputRef}
          confirmInputRef={confirmInputRef}
          onSubmit={onSubmit}
          primaryLabel={primaryLabel}
          primaryDisabled={primaryDisabled}
          inputClassName={inputCommon}
          inputDisabled={authTab === "login" ? loginLoading : false}
        />
      </AuthCard>
    </div>
  );
}
