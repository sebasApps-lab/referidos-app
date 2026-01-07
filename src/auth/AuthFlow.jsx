import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAppStore } from "../store/appStore";
import AuthView from "./AuthView";
import AuthBranderHeader from "./blocks/AuthBranderHeader";
import AuthFooter from "./blocks/AuthFooter";
import BackButton from "./blocks/BackButton";
import StepProgress from "./blocks/StepProgress";
import EmailStep from "./steps/EmailStep";
import WelcomeStep from "./steps/WelcomeStep";
import OwnerDataStep from "./steps/OwnerDataStep";
import BusinessDataStep from "./steps/BusinessDataStep";
import useAuthFlow from "./hooks/useAuthFlow";
import useAuthActions from "./hooks/useAuthActions";
import useAuthPrefill from "./hooks/useAuthPrefill";

export default function AuthFlow() {
  const location = useLocation();
  const usuario = useAppStore((s) => s.usuario);
  const onboarding = useAppStore((s) => s.onboarding);
  const initialEntryStep = useMemo(
    () => (location.pathname === "/auth" ? "email" : "welcome"),
    [location.pathname]
  );
  const flow = useAuthFlow({ initialEntryStep });

  const resetToWelcome = React.useCallback(() => {
    flow.setEmail("");
    flow.setPassword("");
    flow.setPasswordConfirm("");
    flow.setTelefono("");
    flow.setCodigo("");
    flow.setNombreDueno("");
    flow.setApellidoDueno("");
    flow.setRuc("");
    flow.setNombreNegocio("");
    flow.setSectorNegocio("");
    flow.setCalle1("");
    flow.setCalle2("");
    flow.setEmailError("");
    flow.setWelcomeError("");
    flow.setLoginLoading(false);
    flow.setOauthLoading(false);
    flow.setOauthProvider(null);
    flow.setWelcomeLoading(false);
    flow.setAuthTab("login");
    flow.setPage(1);
    flow.setShowPassword(false);
    flow.setShowPasswordConfirm(false);
    flow.setFocusedField(null);
    flow.setEntryStep("welcome");
  }, [
    flow.setApellidoDueno,
    flow.setAuthTab,
    flow.setCalle1,
    flow.setCalle2,
    flow.setCodigo,
    flow.setEmail,
    flow.setEmailError,
    flow.setEntryStep,
    flow.setLoginLoading,
    flow.setNombreDueno,
    flow.setNombreNegocio,
    flow.setOauthLoading,
    flow.setOauthProvider,
    flow.setPage,
    flow.setPassword,
    flow.setPasswordConfirm,
    flow.setRuc,
    flow.setSectorNegocio,
    flow.setTelefono,
    flow.setWelcomeError,
    flow.setWelcomeLoading,
    flow.setShowPassword,
    flow.setShowPasswordConfirm,
    flow.setFocusedField,
  ]);

  const actions = useAuthActions({
    email: flow.email,
    password: flow.password,
    passwordConfirm: flow.passwordConfirm,
    telefono: flow.telefono,
    nombreDueno: flow.nombreDueno,
    apellidoDueno: flow.apellidoDueno,
    ruc: flow.ruc,
    nombreNegocio: flow.nombreNegocio,
    sectorNegocio: flow.sectorNegocio,
    calle1: flow.calle1,
    calle2: flow.calle2,
    setTelefono: flow.setTelefono,
    setEmailError: flow.setEmailError,
    setWelcomeError: flow.setWelcomeError,
    setLoginLoading: flow.setLoginLoading,
    setOauthLoading: flow.setOauthLoading,
    setOauthProvider: flow.setOauthProvider,
    setWelcomeLoading: flow.setWelcomeLoading,
    setEntryStep: flow.setEntryStep,
    setAuthTab: flow.setAuthTab,
    setPage: flow.setPage,
    goTo: flow.goTo,
    page: flow.page,
    authTab: flow.authTab,
    onResetToWelcome: resetToWelcome,
  });

  useAuthPrefill({
    usuario,
    onboarding,
    setEntryStep: flow.setEntryStep,
    setAuthTab: flow.setAuthTab,
    setPage: flow.setPage,
    setEmailError: flow.setEmailError,
    setNombreDueno: flow.setNombreDueno,
    setApellidoDueno: flow.setApellidoDueno,
    setTelefono: flow.setTelefono,
    setRuc: flow.setRuc,
    setNombreNegocio: flow.setNombreNegocio,
    setSectorNegocio: flow.setSectorNegocio,
    setCalle1: flow.setCalle1,
    setCalle2: flow.setCalle2,
    openChoiceOverlay: actions.openChoiceOverlay,
  });

  const showBackButton = flow.entryStep === "email" || flow.entryStep === "form";
  const showForwardButton = flow.entryStep === "form" && flow.page < 3;
  const primaryEmailLabel =
    flow.authTab === "login"
      ? flow.loginLoading
        ? "Ingresando..."
        : "INGRESAR"
      : "REGISTRARSE";
  const primaryEmailHandler =
    flow.authTab === "login" ? actions.handleLogin : actions.handlePrimaryPage1;
  const hasMinLength = flow.password.length >= 8;
  const hasNumber = /\d/.test(flow.password);
  const hasSymbol = /[^A-Za-z0-9]/.test(flow.password);
  const hasNumberAndSymbol = hasNumber && hasSymbol;
  const passwordsMatch =
    flow.password.length > 0 &&
    flow.passwordConfirm.length > 0 &&
    flow.password === flow.passwordConfirm;
  const showPasswordRules = flow.focusedField === "new" || flow.password.length > 0;
  const showPasswordErrors = flow.focusedField !== "new" && flow.password.length > 0;
  const showConfirmErrors =
    flow.focusedField !== "confirm" && flow.passwordConfirm.length > 0;
  const showConfirmRule =
    hasMinLength && hasNumberAndSymbol && flow.passwordConfirm.length > 0;
  const canSubmitPassword = hasMinLength && hasNumberAndSymbol && passwordsMatch;
  const primaryEmailDisabled =
    flow.authTab === "login" ? flow.loginLoading : !canSubmitPassword;

  const isWelcome = flow.entryStep === "welcome";
  const containerClassName = isWelcome ? "justify-center pb-28" : "relative";
  const brandClassName = isWelcome ? "mb-6" : "mt-12 mb-2 text-center";

  const handlePasswordFocus = React.useCallback(
    (field) => {
      flow.setFocusedField(field);
    },
    [flow.setFocusedField]
  );

  const handlePasswordBlur = React.useCallback(() => {
    requestAnimationFrame(() => {
      const active = document.activeElement;
      if (active === flow.passwordInputRef.current) {
        flow.setFocusedField("new");
        return;
      }
      if (active === flow.confirmInputRef.current) {
        flow.setFocusedField("confirm");
        return;
      }
      flow.setFocusedField(null);
    });
  }, [flow.setFocusedField, flow.passwordInputRef, flow.confirmInputRef]);


  const handleBack = () => {
    if (flow.entryStep === "email") {
      resetToWelcome();
      return;
    }
    actions.handleBackFromForm();
  };

  const handleForward = () => {
    if (flow.page === 2) {
      actions.handleNext2();
    }
  };

  return (
    <AuthView
      className={containerClassName}
      header={<AuthBranderHeader className={brandClassName} />}
      footer={<AuthFooter />}
    >
      {showBackButton && (
        <BackButton
          onClick={handleBack}
          className="absolute left-2 top-68"
          ariaLabel="Volver"
        />
      )}

      {showForwardButton && (
        <BackButton
          onClick={handleForward}
          direction="right"
          className="absolute right-2 top-68"
          ariaLabel="Siguiente"
        />
      )}

      {flow.entryStep === "form" && flow.page >= 2 && (
        <div className="w-full max-w-sm px-2 mb-4">
          <StepProgress page={flow.page} />
        </div>
      )}

      {flow.entryStep === "welcome" && (
        <WelcomeStep
          error={flow.welcomeError}
          loading={flow.welcomeLoading}
          onEmail={() => {
            flow.setWelcomeError("");
            flow.setEntryStep("email");
          }}
          onGoogle={actions.startGoogleOneTap}
          onFacebook={actions.startFacebookOneTap}
        />
      )}

      {flow.entryStep === "email" && (
        <EmailStep
          authTab={flow.authTab}
          email={flow.email}
          password={flow.password}
          passwordConfirm={flow.passwordConfirm}
          showPassword={flow.showPassword}
          showPasswordConfirm={flow.showPasswordConfirm}
          hasMinLength={hasMinLength}
          hasNumberAndSymbol={hasNumberAndSymbol}
          passwordsMatch={passwordsMatch}
          showPasswordRules={showPasswordRules}
          showPasswordErrors={showPasswordErrors}
          showConfirmRule={showConfirmRule}
          showConfirmErrors={showConfirmErrors}
          error={flow.emailError}
          loginLoading={flow.loginLoading}
          onLoginTab={actions.goToLoginTab}
          onRegisterTab={actions.goToRegisterTab}
          onChangeEmail={flow.setEmail}
          onChangePassword={flow.setPassword}
          onChangePasswordConfirm={flow.setPasswordConfirm}
          onToggleShowPassword={() =>
            flow.setShowPassword((prev) => !prev)
          }
          onToggleShowPasswordConfirm={() =>
            flow.setShowPasswordConfirm((prev) => !prev)
          }
          onFocusField={handlePasswordFocus}
          onBlurField={handlePasswordBlur}
          passwordInputRef={flow.passwordInputRef}
          confirmInputRef={flow.confirmInputRef}
          onSubmit={primaryEmailHandler}
          primaryLabel={primaryEmailLabel}
          primaryDisabled={primaryEmailDisabled}
        />
      )}

      {flow.entryStep === "form" && (
        <div
          ref={flow.cardRef}
          className="bg-white w-full max-w-sm rounded-2xl shadow-xl mt-2 overflow-visible"
          style={{
            height: flow.cardHeight != null ? `${flow.cardHeight}px` : "auto",
            boxSizing: "border-box",
            transition: "height 260ms ease",
            overflow: "hidden",
          }}
        >
          <div
            ref={flow.cardInnerRef}
            className="bg-white w-full rounded-2xl shadow-xl p-6 pt-4"
            style={{ boxSizing: "border-box", overflow: "hidden" }}
          >
            <div ref={flow.sliderRef} style={flow.containerStyle} className="relative z-10">
              {flow.page === 2 && (
                <OwnerDataStep
                  error={flow.emailError}
                  inputClassName="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-2 text-sm"
                  nombreDueno={flow.nombreDueno}
                  apellidoDueno={flow.apellidoDueno}
                  telefono={flow.telefono}
                  onChangeNombre={flow.setNombreDueno}
                  onChangeApellido={flow.setApellidoDueno}
                  onChangeTelefono={flow.setTelefono}
                  onSubmit={actions.handleNext2}
                  innerRef={flow.regPage1Ref}
                  onGoWelcome={resetToWelcome}
                />
              )}

              {flow.page === 3 && (
                <BusinessDataStep
                  error={flow.emailError}
                  inputClassName="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-2 text-sm"
                  ruc={flow.ruc}
                  nombreNegocio={flow.nombreNegocio}
                  sectorNegocio={flow.sectorNegocio}
                  calle1={flow.calle1}
                  calle2={flow.calle2}
                  onChangeRuc={flow.setRuc}
                  onChangeNombre={flow.setNombreNegocio}
                  onChangeSector={flow.setSectorNegocio}
                  onChangeCalle1={flow.setCalle1}
                  onChangeCalle2={flow.setCalle2}
                  onSubmit={actions.handleRegister}
                  innerRef={flow.regPage2Ref}
                  onGoWelcome={resetToWelcome}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </AuthView>
  );
}
