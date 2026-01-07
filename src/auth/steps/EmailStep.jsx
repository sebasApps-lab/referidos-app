import React, { useRef } from "react";
import AuthCard from "../blocks/AuthCard";
import AuthTabs from "../blocks/AuthTabs";
import EmailPasswordForm from "../blocks/EmailPasswordForm";
import ErrorBanner from "../blocks/ErrorBanner";
import useRegisterPasswordUI from "../hooks/useRegisterPasswordUI";

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
  error,
  loginLoading,
  onLoginTab,
  onRegisterTab,
  onChangeEmail,
  onChangePassword,
  onChangePasswordConfirm,
  onToggleShowPassword,
  onToggleShowPasswordConfirm,
  onSubmit,
  primaryLabel,
  primaryDisabled,
}) {
  const inputCommon =
    "w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-2 text-sm";
  const passwordInputRef = useRef(null);
  const confirmInputRef = useRef(null);
  const passwordUI = useRegisterPasswordUI({
    password,
    passwordConfirm,
    passwordInputRef,
    confirmInputRef,
    hasMinLength,
    hasNumberAndSymbol,
  });

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
          showPasswordRules={passwordUI.showPasswordRules}
          showPasswordErrors={passwordUI.showPasswordErrors}
          showConfirmRule={passwordUI.showConfirmRule}
          showConfirmErrors={passwordUI.showConfirmErrors}
          onChangeEmail={onChangeEmail}
          onChangePassword={onChangePassword}
          onChangePasswordConfirm={onChangePasswordConfirm}
          onToggleShowPassword={onToggleShowPassword}
          onToggleShowPasswordConfirm={onToggleShowPasswordConfirm}
          onFocusField={passwordUI.onFocusField}
          onBlurField={passwordUI.onBlurField}
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
