import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAppStore } from "../store/appStore";
import AuthView from "./AuthView";
import AuthBranderHeader from "./blocks/AuthBranderHeader";
import AuthFooter from "./blocks/AuthFooter";
import BackButton from "./blocks/BackButton";
import StepProgress from "./blocks/StepProgress";
import EmailLoginStep from "./steps/EmailLoginStep";
import EmailRegisterStep from "./steps/EmailRegisterStep";
import WelcomeStep from "./steps/WelcomeStep";
import OwnerDataStep from "./steps/OwnerDataStep";
import BusinessDataStep from "./steps/BusinessDataStep";
import RoleSelectStep from "./steps/RoleSelectStep";
import useAuthFlow from "./hooks/useAuthFlow";
import useAuthActions from "./hooks/useAuthActions";
import useAuthPrefill from "./hooks/useAuthPrefill";
import { AUTH_STEPS } from "./constants/authSteps";
import { getOwnerDataStatus } from "./utils/ownerDataUtils";

export default function AuthFlow() {
  const location = useLocation();
  const usuario = useAppStore((s) => s.usuario);
  const onboarding = useAppStore((s) => s.onboarding);
  const initialStep = useMemo(
    () =>
      location.pathname === "/auth"
        ? AUTH_STEPS.EMAIL_LOGIN
        : AUTH_STEPS.WELCOME,
    [location.pathname]
  );
  const flow = useAuthFlow({ initialStep });

  const resetToWelcome = React.useCallback(() => {
    flow.setEmail("");
    flow.setPassword("");
    flow.setPasswordConfirm("");
    flow.setTelefono("");
    flow.setCodigo("");
    flow.setNombreDueno("");
    flow.setApellidoDueno("");
    flow.setFechaNacimiento("");
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
    flow.setShowPassword(false);
    flow.setShowPasswordConfirm(false);
    flow.setStep(AUTH_STEPS.WELCOME);
  }, [
    flow.setApellidoDueno,
    flow.setCalle1,
    flow.setCalle2,
    flow.setCodigo,
    flow.setEmail,
    flow.setEmailError,
    flow.setLoginLoading,
    flow.setNombreDueno,
    flow.setFechaNacimiento,
    flow.setNombreNegocio,
    flow.setOauthLoading,
    flow.setOauthProvider,
    flow.setPassword,
    flow.setPasswordConfirm,
    flow.setRuc,
    flow.setSectorNegocio,
    flow.setTelefono,
    flow.setWelcomeError,
    flow.setWelcomeLoading,
    flow.setShowPassword,
    flow.setShowPasswordConfirm,
    flow.setStep,
  ]);

  const actions = useAuthActions({
    email: flow.email,
    password: flow.password,
    passwordConfirm: flow.passwordConfirm,
    telefono: flow.telefono,
    nombreDueno: flow.nombreDueno,
    apellidoDueno: flow.apellidoDueno,
    fechaNacimiento: flow.fechaNacimiento,
    ruc: flow.ruc,
    nombreNegocio: flow.nombreNegocio,
    sectorNegocio: flow.sectorNegocio,
    calle1: flow.calle1,
    calle2: flow.calle2,
    setEmailError: flow.setEmailError,
    setWelcomeError: flow.setWelcomeError,
    setLoginLoading: flow.setLoginLoading,
    setOauthLoading: flow.setOauthLoading,
    setOauthProvider: flow.setOauthProvider,
    setWelcomeLoading: flow.setWelcomeLoading,
    setStep: flow.setStep,
    goToStep: flow.goToStep,
    step: flow.step,
    onResetToWelcome: resetToWelcome,
  });

  useAuthPrefill({
    usuario,
    onboarding,
    setStep: flow.setStep,
    setEmailError: flow.setEmailError,
    setNombreDueno: flow.setNombreDueno,
    setApellidoDueno: flow.setApellidoDueno,
    setTelefono: flow.setTelefono,
    setFechaNacimiento: flow.setFechaNacimiento,
    setRuc: flow.setRuc,
    setNombreNegocio: flow.setNombreNegocio,
    setSectorNegocio: flow.setSectorNegocio,
    setCalle1: flow.setCalle1,
    setCalle2: flow.setCalle2,
  });

  const showBackButton = flow.step !== AUTH_STEPS.WELCOME;
  const showForwardButton = flow.step === AUTH_STEPS.OWNER_DATA;
  const hasMinLength = flow.password.length >= 8;
  const hasNumber = /\d/.test(flow.password);
  const hasSymbol = /[^A-Za-z0-9]/.test(flow.password);
  const hasNumberAndSymbol = hasNumber && hasSymbol;
  const passwordsMatch =
    flow.password.length > 0 &&
    flow.passwordConfirm.length > 0 &&
    flow.password === flow.passwordConfirm;
  const canSubmitPassword = hasMinLength && hasNumberAndSymbol && passwordsMatch;
  const ownerStatus = useMemo(
    () =>
      getOwnerDataStatus({
        nombre: flow.nombreDueno,
        apellido: flow.apellidoDueno,
        fechaNacimiento: flow.fechaNacimiento,
      }),
    [flow.apellidoDueno, flow.fechaNacimiento, flow.nombreDueno]
  );
  const isWelcome = flow.step === AUTH_STEPS.WELCOME;
  const isFormStep =
    flow.step === AUTH_STEPS.OWNER_DATA ||
    flow.step === AUTH_STEPS.BUSINESS_DATA;
  const containerClassName = isWelcome
    ? "justify-center pb-28"
    : isFormStep
    ? "relative justify-center"
    : "relative";
  const brandClassName = isWelcome
    ? "mb-6"
    : isFormStep
    ? "mb-4 text-center"
    : "mt-12 mb-2 text-center";


  const handleBack = () => {
    if (
      flow.step === AUTH_STEPS.EMAIL_LOGIN ||
      flow.step === AUTH_STEPS.EMAIL_REGISTER
    ) {
      resetToWelcome();
      return;
    }
    actions.handleFormBack();
  };

  const handleForward = () => {
    if (flow.step === AUTH_STEPS.OWNER_DATA) {
      actions.handleOwnerDataNext();
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

      {(flow.step === AUTH_STEPS.OWNER_DATA ||
        flow.step === AUTH_STEPS.BUSINESS_DATA) && (
        <div className="w-full max-w-sm px-2 mb-4">
          <StepProgress
            page={flow.step === AUTH_STEPS.OWNER_DATA ? 2 : 3}
          />
        </div>
      )}

      {flow.step === AUTH_STEPS.WELCOME && (
        <WelcomeStep
          error={flow.welcomeError}
          loading={flow.welcomeLoading}
          onEmail={() => {
            flow.setWelcomeError("");
            flow.setStep(AUTH_STEPS.EMAIL_LOGIN);
          }}
          onGoogle={actions.startGoogleOneTap}
          onFacebook={actions.startFacebookOneTap}
        />
      )}

      {flow.step === AUTH_STEPS.ROLE_SELECT && (
        <RoleSelectStep
          error={flow.emailError}
          onSubmit={actions.handleRoleSelect}
          onValidateNegocioCode={actions.validateNegocioCode}
        />
      )}

      {flow.step === AUTH_STEPS.EMAIL_LOGIN && (
        <EmailLoginStep
          email={flow.email}
          password={flow.password}
          error={flow.emailError}
          loginLoading={flow.loginLoading}
          showPassword={flow.showPassword}
          onLoginTab={actions.goToEmailLogin}
          onRegisterTab={actions.goToEmailRegister}
          onChangeEmail={flow.setEmail}
          onChangePassword={flow.setPassword}
          onToggleShowPassword={() =>
            flow.setShowPassword((prev) => !prev)
          }
          onSubmit={actions.handleEmailLogin}
        />
      )}

      {flow.step === AUTH_STEPS.EMAIL_REGISTER && (
        <EmailRegisterStep
          email={flow.email}
          password={flow.password}
          passwordConfirm={flow.passwordConfirm}
          error={flow.emailError}
          showPassword={flow.showPassword}
          showPasswordConfirm={flow.showPasswordConfirm}
          hasMinLength={hasMinLength}
          hasNumberAndSymbol={hasNumberAndSymbol}
          passwordsMatch={passwordsMatch}
          onLoginTab={actions.goToEmailLogin}
          onRegisterTab={actions.goToEmailRegister}
          onChangeEmail={flow.setEmail}
          onChangePassword={flow.setPassword}
          onChangePasswordConfirm={flow.setPasswordConfirm}
          onToggleShowPassword={() =>
            flow.setShowPassword((prev) => !prev)
          }
          onToggleShowPasswordConfirm={() =>
            flow.setShowPasswordConfirm((prev) => !prev)
          }
          onSubmit={actions.handleEmailRegister}
          primaryDisabled={!canSubmitPassword}
        />
      )}

      {(flow.step === AUTH_STEPS.OWNER_DATA ||
        flow.step === AUTH_STEPS.BUSINESS_DATA) && (
        <div
          ref={flow.cardRef}
          className="bg-white w-full max-w-sm rounded-2xl shadow-xl mt-2 overflow-visible flex flex-col"
          style={{
            height: "80vh",
            boxSizing: "border-box",
            transition: "height 260ms ease",
            overflow: "hidden",
          }}
        >
          <div
            ref={flow.cardInnerRef}
            className="bg-white w-full rounded-2xl shadow-xl px-6 pt-4 pb-4 flex flex-col h-full"
            style={{ boxSizing: "border-box", overflow: "hidden" }}
          >
            <div
              ref={flow.sliderRef}
              style={flow.containerStyle}
              className="relative z-10 flex-1"
            >
      {flow.step === AUTH_STEPS.OWNER_DATA && (
        <OwnerDataStep
          error={flow.emailError}
          inputClassName="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-2 text-sm"
          nombreDueno={flow.nombreDueno}
          apellidoDueno={flow.apellidoDueno}
          fechaNacimiento={flow.fechaNacimiento}
          onChangeNombre={flow.setNombreDueno}
          onChangeApellido={flow.setApellidoDueno}
          onChangeFechaNacimiento={flow.setFechaNacimiento}
          onSubmit={actions.handleOwnerDataNext}
          innerRef={flow.regPage1Ref}
          onGoWelcome={resetToWelcome}
          primaryDisabled={!ownerStatus.canSubmit}
        />
      )}

              {flow.step === AUTH_STEPS.BUSINESS_DATA && (
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
                  onSubmit={actions.handleBusinessRegister}
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
