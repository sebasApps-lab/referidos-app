import React, { useEffect, useMemo } from "react";
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
import BusinessCategoryStep from "./steps/BusinessCategoryStep";
import BusinessAddressStep from "./steps/BusinessAddressStep";
import AccountVerifyStep from "./steps/AccountVerifyStep";
import AccountVerifyPrompt from "./steps/AccountVerifyPrompt";
import RoleSelectStep from "./steps/RoleSelectStep";
import useAuthFlow from "./hooks/useAuthFlow";
import useAuthActions from "./hooks/useAuthActions";
import useAuthPrefill from "./hooks/useAuthPrefill";
import { AUTH_STEPS } from "./constants/authSteps";
import { getOwnerDataStatus } from "./utils/ownerDataUtils";
import { AUTH_BRAND } from "./constants/authCopy";
import {
  BUSINESS_CATEGORIES,
  BUSINESS_SUBCATEGORIES,
  getBusinessCategoryPath,
} from "./constants/businessCategories";

const STEP_COPY = {
  [AUTH_STEPS.OWNER_DATA]: {
    header: "Cuentanos mas sobre ti",
    subtitle: "Eres quien administrara el negocio en la app.",
  },
  [AUTH_STEPS.BUSINESS_DATA]: {
    header: "Ahora tu negocio",
    subtitle: "Asi te veran tus clientes",
  },
  [AUTH_STEPS.BUSINESS_CATEGORY]: {
    header: "Cuentanos a que se dedica tu negocio",
    headerFallback: "Como definirias tu negocio?",
    subtitle: "No te preocupes, puedes cambiarlo despues",
    helperLabel: "Asi podremos mostrar tus promos a las personas correctas.",
  },
  [AUTH_STEPS.BUSINESS_ADDRESS]: {
    header: "Donde estas ubicado?",
    subtitle: "Ayudanos a conectar tu negocio con personas cerca de ti.",
  },
  [AUTH_STEPS.ACCOUNT_VERIFY]: {
    header: "Desbloquea tus beneficios",
    subtitle:
      "Esto es opcional, pero te ayudara a sacarle mas provecho a la app.",
  },
  [AUTH_STEPS.ACCOUNT_VERIFY_PROMPT]: {
    header: "Desbloquea tus beneficios",
    subtitle:
      "Esto es opcional, pero te ayudara a sacarle mas provecho a la app.",
  },
};

export default function AuthFlow() {
  const location = useLocation();
  const usuario = useAppStore((s) => s.usuario);
  const onboarding = useAppStore((s) => s.onboarding);
  const logout = useAppStore((s) => s.logout);
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
    flow.setGenero("no_especificar");
    flow.setFechaNacimiento("");
    flow.setOwnerPrefill({
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      genero: "",
    });
    flow.setBusinessPrefill({
      nombreNegocio: "",
      ruc: "",
      categoriaNegocio: "",
    });
    flow.setNombreNegocio("");
    flow.setCategoriaNegocio("");
    flow.setIsSucursalPrincipal(false);
    flow.setSectorNegocio("");
    flow.setCalle1("");
    flow.setCalle2("");
    flow.setHorarios({
      semanal: {
        lunes: [{ abre: "10:00", cierra: "18:00" }],
        martes: [{ abre: "10:00", cierra: "18:00" }],
        miercoles: [{ abre: "10:00", cierra: "18:00" }],
        jueves: [{ abre: "10:00", cierra: "18:00" }],
        viernes: [{ abre: "10:00", cierra: "18:00" }],
        sabado: [],
        domingo: [],
      },
      excepciones: [],
    });
    flow.setDireccionPayload({
      place_id: "",
      label: "",
      display_label: "",
      provider: "",
      lat: null,
      lng: null,
      provincia_id: "",
      canton_id: "",
      parroquia_id: "",
      parroquia: "",
      ciudad: "",
      sector: "",
      calles: "",
      house_number: "",
      postcode: "",
      referencia: "",
      provincia: "",
      canton: "",
      country: "",
    });
    flow.setEmailError("");
    flow.setWelcomeError("");
    flow.setLoginLoading(false);
    flow.setOauthLoading(false);
    flow.setOauthProvider(null);
    flow.setWelcomeLoading(false);
    flow.setIsAddressSearchModeOpen(false);
    flow.setIsAddressPrefillReady(false);
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
    flow.setOwnerPrefill,
    flow.setGenero,
    flow.setBusinessPrefill,
    flow.setNombreNegocio,
    flow.setCategoriaNegocio,
    flow.setIsSucursalPrincipal,
    flow.setOauthLoading,
    flow.setOauthProvider,
    flow.setPassword,
    flow.setPasswordConfirm,
    flow.setSectorNegocio,
    flow.setTelefono,
    flow.setWelcomeError,
    flow.setWelcomeLoading,
    flow.setIsAddressSearchModeOpen,
    flow.setIsAddressPrefillReady,
    flow.setHorarios,
    flow.setDireccionPayload,
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
    genero: flow.genero,
    fechaNacimiento: flow.fechaNacimiento,
    ownerPrefill: flow.ownerPrefill,
    businessPrefill: flow.businessPrefill,
    nombreNegocio: flow.nombreNegocio,
    categoriaNegocio: flow.categoriaNegocio,
    isSucursalPrincipal: flow.isSucursalPrincipal,
    horarios: flow.horarios,
    direccionPayload: flow.direccionPayload,
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
    setGenero: flow.setGenero,
    setTelefono: flow.setTelefono,
    setFechaNacimiento: flow.setFechaNacimiento,
    setOwnerPrefill: flow.setOwnerPrefill,
    setBusinessPrefill: flow.setBusinessPrefill,
    setNombreNegocio: flow.setNombreNegocio,
    setCategoriaNegocio: flow.setCategoriaNegocio,
    setIsSucursalPrincipal: flow.setIsSucursalPrincipal,
    setHorarios: flow.setHorarios,
    setSectorNegocio: flow.setSectorNegocio,
    setCalle1: flow.setCalle1,
    setCalle2: flow.setCalle2,
    setDireccionPayload: flow.setDireccionPayload,
    setIsAddressPrefillReady: flow.setIsAddressPrefillReady,
  });


  const verificationStatus =
    onboarding?.verification_status || onboarding?.usuario?.verification_status;
  useEffect(() => {
    if (!onboarding?.allowAccess) return;
    if (verificationStatus === "unverified") {
      if (flow.step !== AUTH_STEPS.ACCOUNT_VERIFY_PROMPT) {
        flow.setStep(AUTH_STEPS.ACCOUNT_VERIFY_PROMPT);
      }
      return;
    }
    if (verificationStatus === "in_progress") {
      const target = AUTH_STEPS.ACCOUNT_VERIFY;
      if (flow.step !== target) {
        flow.setStep(target);
      }
      return;
    }
  }, [
    flow,
    onboarding?.allowAccess,
    verificationStatus,
  ]);
  const showBackButton = flow.step !== AUTH_STEPS.WELCOME;
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
        genero: flow.genero,
        fechaNacimiento: flow.fechaNacimiento,
      }),
    [flow.apellidoDueno, flow.fechaNacimiento, flow.genero, flow.nombreDueno]
  );
  const isWelcome = flow.step === AUTH_STEPS.WELCOME;
  const isFormStep = [
    AUTH_STEPS.OWNER_DATA,
    AUTH_STEPS.BUSINESS_DATA,
    AUTH_STEPS.BUSINESS_CATEGORY,
    AUTH_STEPS.BUSINESS_ADDRESS,
    AUTH_STEPS.ACCOUNT_VERIFY,
    AUTH_STEPS.ACCOUNT_VERIFY_PROMPT,
  ].includes(flow.step);
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
  const stepCopy = STEP_COPY[flow.step] || {};
  const headerTitle =
    stepCopy.header || stepCopy.headerFallback || AUTH_BRAND.name;
  const ownerSubtitle = STEP_COPY[AUTH_STEPS.OWNER_DATA]?.subtitle;
  const businessSubtitle = STEP_COPY[AUTH_STEPS.BUSINESS_DATA]?.subtitle;
  const categorySubtitle = STEP_COPY[AUTH_STEPS.BUSINESS_CATEGORY]?.subtitle;
  const categoryHelper = STEP_COPY[AUTH_STEPS.BUSINESS_CATEGORY]?.helperLabel;
  const addressSubtitle = STEP_COPY[AUTH_STEPS.BUSINESS_ADDRESS]?.subtitle;
  const categoryPath = useMemo(
    () => getBusinessCategoryPath(flow.categoriaNegocio),
    [flow.categoriaNegocio]
  );


  const [showExitConfirm, setShowExitConfirm] = React.useState(false);
  const statusErrorRef = React.useRef(false);

  React.useEffect(() => {
    if (statusErrorRef.current) return;
    const message = sessionStorage.getItem("auth_status_error");
    if (!message) return;
    statusErrorRef.current = true;
    sessionStorage.removeItem("auth_status_error");
    flow.setWelcomeError(message);
  }, [flow]);

  const handleOwnerExit = React.useCallback(async () => {
    setShowExitConfirm(false);
    await logout?.();
    flow.setStep(AUTH_STEPS.EMAIL_REGISTER);
  }, [logout, flow.setStep]);

  const handleBack = () => {
    if (
      flow.step === AUTH_STEPS.EMAIL_LOGIN ||
      flow.step === AUTH_STEPS.EMAIL_REGISTER
    ) {
      resetToWelcome();
      return;
    }
    if (
      flow.step === AUTH_STEPS.BUSINESS_ADDRESS &&
      flow.isAddressSearchModeOpen
    ) {
      flow.setIsAddressSearchModeOpen(false);
      return;
    }
    if (flow.step === AUTH_STEPS.OWNER_DATA) {
      setShowExitConfirm(true);
      return;
    }
    actions.handleButtonBack();
  };

  React.useEffect(() => {
    if (flow.step !== AUTH_STEPS.BUSINESS_ADDRESS && flow.isAddressSearchModeOpen) {
      flow.setIsAddressSearchModeOpen(false);
    }
  }, [flow.isAddressSearchModeOpen, flow.setIsAddressSearchModeOpen, flow.step]);

  return (
    <AuthView
      className={containerClassName}
      header={<AuthBranderHeader className={brandClassName} text={headerTitle} />}
      footer={<AuthFooter />}
    >
      {showBackButton && (
        <BackButton
          onClick={handleBack}
          className="absolute left-2 top-68"
          ariaLabel="Volver"
        />
      )}

      {(flow.step === AUTH_STEPS.OWNER_DATA ||
        flow.step === AUTH_STEPS.BUSINESS_CATEGORY ||
        flow.step === AUTH_STEPS.BUSINESS_DATA ||
        flow.step === AUTH_STEPS.BUSINESS_ADDRESS) && (
        <div className="w-full max-w-sm px-2 mb-4">
          <StepProgress
            page={
              flow.step === AUTH_STEPS.OWNER_DATA
                ? 1
                : flow.step === AUTH_STEPS.BUSINESS_ADDRESS
                  ? 3
                  : 2
            }
          />
        </div>
      )}

      {flow.step === AUTH_STEPS.WELCOME && (
        <WelcomeStep
          error={flow.welcomeError}
          loading={flow.welcomeLoading}
          oauthLoading={flow.oauthLoading}
          oauthProvider={flow.oauthProvider}
          onEmail={() => {
            flow.setWelcomeError("");
            flow.setStep(AUTH_STEPS.EMAIL_LOGIN);
          }}
          onGoogle={actions.startGoogleOneTap}
          onFacebook={actions.startFacebookOAuth}
          // onApple={actions.startAppleOAuth}
          onTwitter={actions.startTwitterOAuth}
          onDiscord={actions.startDiscordOAuth}
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

      {isFormStep && (
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
          genero={flow.genero}
          subtitle={ownerSubtitle}
          onChangeNombre={flow.setNombreDueno}
          onChangeApellido={flow.setApellidoDueno}
          onChangeGenero={flow.setGenero}
          onChangeFechaNacimiento={flow.setFechaNacimiento}
          onSubmit={actions.handleOwnerData}
          innerRef={flow.regPage1Ref}
          onGoWelcome={resetToWelcome}
          primaryDisabled={!ownerStatus.canSubmit}
        />
      )}

              {flow.step === AUTH_STEPS.BUSINESS_DATA && (
                <BusinessDataStep
                  error={flow.emailError}
                  inputClassName="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-2 text-sm"
                  nombreNegocio={flow.nombreNegocio}
                  subtitle={businessSubtitle}
                  categoriaNegocio={flow.categoriaNegocio}
                  categoriaPadre={categoryPath.parentLabel}
                  categoriaDetalle={categoryPath.subLabel}
                  onChangeNombre={flow.setNombreNegocio}
                  onOpenCategory={() => flow.goToStep(AUTH_STEPS.BUSINESS_CATEGORY)}
                  onSubmit={actions.handleBusinessData}
                  innerRef={flow.regPage2Ref}
                  onGoWelcome={resetToWelcome}
                />
              )}

              {flow.step === AUTH_STEPS.BUSINESS_CATEGORY && (
                <BusinessCategoryStep
                  subtitle={categorySubtitle}
                  helperLabel={categoryHelper}
                  categories={BUSINESS_CATEGORIES}
                  subcategories={BUSINESS_SUBCATEGORIES}
                  currentCategory={flow.categoriaNegocio}
                  onConfirmCategory={(value) => {
                    flow.setCategoriaNegocio(value);
                    flow.goToStep(AUTH_STEPS.BUSINESS_DATA);
                  }}
                  innerRef={flow.regPage2Ref}
                  onGoWelcome={resetToWelcome}
                />
              )}

              {flow.step === AUTH_STEPS.BUSINESS_ADDRESS && (
                <BusinessAddressStep
                  innerRef={flow.regPage2Ref}
                  searchModeOpen={flow.isAddressSearchModeOpen}
                  onSearchModeChange={flow.setIsAddressSearchModeOpen}
                  isAddressPrefillReady={flow.isAddressPrefillReady}
                  isSucursalPrincipal={flow.isSucursalPrincipal}
                  onChangeSucursalPrincipal={flow.setIsSucursalPrincipal}
                  horarios={flow.horarios}
                  onChangeHorarios={flow.setHorarios}
                  direccionPayload={flow.direccionPayload}
                  onChangeDireccionPayload={flow.setDireccionPayload}
                  subtitle={addressSubtitle}
                  error={flow.emailError}
                  onSubmit={actions.handleBusinessAddress}
                />
              )}

              {flow.step === AUTH_STEPS.ACCOUNT_VERIFY_PROMPT && (
                <AccountVerifyPrompt
                  innerRef={flow.regPage2Ref}
                  onVerify={() => flow.goToStep(AUTH_STEPS.ACCOUNT_VERIFY)}
                />
              )}

              {flow.step === AUTH_STEPS.ACCOUNT_VERIFY && (
                <AccountVerifyStep
                  innerRef={flow.regPage2Ref}
                  phone={onboarding?.phone || usuario?.telefono || ""}
                  ruc={onboarding?.ruc || ""}
                  emailConfirmed={Boolean(onboarding?.email_confirmed)}
                  provider={onboarding?.provider || "email"}
                  providers={onboarding?.providers || []}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-6 backdrop-blur-[2px]">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-[#0F172A]">
            <h3 className="text-center text-lg font-semibold text-[#5E30A5]">
              Confirmar salida
            </h3>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Deberas iniciar sesion para completar registro.
            </p>
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-600 font-semibold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleOwnerExit}
                className="flex-1 py-2.5 rounded-lg font-semibold bg-[#5E30A5] text-white shadow"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthView>
  );
}

