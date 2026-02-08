import React from "react";
import AuthCard from "../blocks/AuthCard";
import AuthTabs from "../blocks/AuthTabs";
import EmailPasswordForm from "../blocks/EmailPasswordForm";
import ErrorBanner from "../blocks/ErrorBanner";

export default function EmailLoginStep({
  email,
  password,
  error,
  loginLoading,
  showPassword,
  onLoginTab,
  onRegisterTab,
  onChangeEmail,
  onChangePassword,
  onToggleShowPassword,
  onSubmit,
}) {
  const inputCommon =
    "w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-2 text-sm";

  return (
    <div className="relative w-full max-w-sm mt-2">
      <AuthCard className="p-6">
        {error && <ErrorBanner message={error} className="mb-3 text-center" />}

        <AuthTabs
          activeTab="login"
          onLogin={onLoginTab}
          onRegister={onRegisterTab}
        />

        <EmailPasswordForm
          mode="login"
          email={email}
          password={password}
          passwordConfirm=""
          showPassword={showPassword}
          showPasswordConfirm={false}
          hasMinLength={false}
          hasNumberAndSymbol={false}
          passwordsMatch={false}
          showPasswordRules={false}
          showPasswordErrors={false}
          showConfirmRule={false}
          showConfirmErrors={false}
          onChangeEmail={onChangeEmail}
          onChangePassword={onChangePassword}
          onChangePasswordConfirm={() => {}}
          onToggleShowPassword={onToggleShowPassword}
          onToggleShowPasswordConfirm={() => {}}
          onFocusField={() => {}}
          onBlurField={() => {}}
          passwordInputRef={null}
          confirmInputRef={null}
          onSubmit={onSubmit}
          primaryLabel={loginLoading ? "Ingresando..." : "INGRESAR"}
          primaryDisabled={loginLoading}
          inputClassName={inputCommon}
          inputDisabled={loginLoading}
        />
      </AuthCard>
    </div>
  );
}
