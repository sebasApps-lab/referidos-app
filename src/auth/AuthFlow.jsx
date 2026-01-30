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
import UserProfileStep from "./steps/UserProfileStep";
import BusinessDataStep from "./steps/BusinessDataStep";
import BusinessCategoryStep from "./steps/BusinessCategoryStep";
import UserAddressStep from "./steps/UserAddressStep";
import AccountVerifyPrompt from "./steps/AccountVerifyPrompt";
import AddPasswordStep from "./steps/AddPasswordStep";
import AddTwoFAStep from "./steps/AddTwoFAStep";
import VerifyEmailStep from "./steps/VerifyEmailStep";
import AccountVerifyMethodStep from "./steps/AccountVerifyMethodStep";
import AccountVerifyReadyStep from "./steps/AccountVerifyReadyStep";
import BusinessVerifyStep from "./steps/BusinessVerifyStep";
import RoleSelectStep from "./steps/RoleSelectStep";
import useAuthFlow from "./hooks/useAuthFlow";
import useAuthActions from "./hooks/useAuthActions";
import useAuthPrefill from "./hooks/useAuthPrefill";
import { AUTH_STEPS } from "./constants/authSteps";
import { getUserProfileStatus } from "./utils/userProfileUtils";
import { AUTH_BRAND } from "./constants/authCopy";
import {
  BUSINESS_CATEGORIES,
  BUSINESS_SUBCATEGORIES,
  getBusinessCategoryPath,
} from "./constants/businessCategories";

const BUSINESS_STEP_COPY = {
  [AUTH_STEPS.USER_PROFILE]: {
    header: "Cuéntanos más sobre ti",
    subtitle: "Eres quien administrará el negocio en la app.",
  },
  [AUTH_STEPS.BUSINESS_DATA]: {
    header: "Ahora tu negocio",
    subtitle: "Así te verán tus clientes",
  },
  [AUTH_STEPS.BUSINESS_CATEGORY]: {
    header: "Cuéntanos a qué se dedica tu negocio",
    headerFallback: "Cómo definirías tu negocio?",
    subtitle: "No te preocupes, puedes cambiarlo después",
    helperLabel: "Así podremos mostrar tus promos a las personas correctas.",
  },
  [AUTH_STEPS.BUSINESS_VERIFY]: {
    header: "Desbloquea tus beneficios",
    subtitle:
      "Esto es opcional, pero te ayudará a sacarle más provecho a la app.",
  },
  [AUTH_STEPS.USER_ADDRESS]: {
    header: "¿Dónde estás ubicado?",
    subtitle: "Ayúdanos a conectar tu negocio con personas cerca de ti.",
  },
  [AUTH_STEPS.ACCOUNT_VERIFY]: {
    header: "Desbloquea tus beneficios",
    subtitle:
      "Esto es opcional, pero te ayudará a sacarle más provecho a la app.",
  },
  [AUTH_STEPS.ACCOUNT_VERIFY_PROMPT]: {
    header: "Desbloquea tus beneficios",
    subtitle:
      "Esto es opcional, pero te ayudará a sacarle más provecho a la app.",
  },
  [AUTH_STEPS.ADD_PASSWORD]: {
    header: "Desbloquea tus beneficios",
    subtitle:
      "Esto es opcional, pero te ayudará a sacarle más provecho a la app.",
  },
  [AUTH_STEPS.ADD_MFA]: {
    header: "Desbloquea tus beneficios",
    subtitle:
      "Esto es opcional, pero te ayudará a sacarle más provecho a la app.",
  },
  [AUTH_STEPS.VERIFY_EMAIL]: {
    header: "Desbloquea tus beneficios",
    subtitle:
      "Esto es opcional, pero te ayudará a sacarle más provecho a la app.",
  },
  [AUTH_STEPS.ACCOUNT_VERIFY_METHOD]: {
    header: "Desbloquea tus beneficios",
    subtitle:
      "Esto es opcional, pero te ayudará a sacarle más provecho a la app.",
  },
  [AUTH_STEPS.ACCOUNT_VERIFY_READY]: {
    header: "Desbloquea tus beneficios",
    subtitle:
      "Esto es opcional, pero te ayudará a sacarle más provecho a la app.",
  },
};

const CLIENT_STEP_COPY = {
  [AUTH_STEPS.USER_PROFILE]: {
    header: "Cuéntanos más sobre ti",
    subtitle: "Empieza por personalizar tu experiencia en la app.",
  },
  [AUTH_STEPS.USER_ADDRESS]: {
    header: "Descubre promociones cerca de ti",
    subtitle: "Encuentra lo que más te conviene según tu ubicación.",
  },
  [AUTH_STEPS.ACCOUNT_VERIFY]: {
    header: "Desbloquea tus beneficios",
    subtitle:
      "Esto es opcional, pero te ayudará a sacarle más provecho a la app.",
  },
  [AUTH_STEPS.ACCOUNT_VERIFY_PROMPT]: {
    header: "Desbloquea tus beneficios",
    subtitle:
      "Esto es opcional, pero te ayudará a sacarle más provecho a la app.",
  },
  [AUTH_STEPS.ADD_PASSWORD]: {
    header: "Desbloquea tus beneficios",
    subtitle:
      "Esto es opcional, pero te ayudará a sacarle más provecho a la app.",
  },
  [AUTH_STEPS.ADD_MFA]: {
    header: "Desbloquea tus beneficios",
    subtitle:
      "Esto es opcional, pero te ayudará a sacarle más provecho a la app.",
  },
  [AUTH_STEPS.VERIFY_EMAIL]: {
    header: "Desbloquea tus beneficios",
    subtitle:
      "Esto es opcional, pero te ayudará a sacarle más provecho a la app.",
  },
  [AUTH_STEPS.ACCOUNT_VERIFY_METHOD]: {
    header: "Desbloquea tus beneficios",
    subtitle:
      "Esto es opcional, pero te ayudará a sacarle más provecho a la app.",
  },
  [AUTH_STEPS.ACCOUNT_VERIFY_READY]: {
    header: "Desbloquea tus beneficios",
    subtitle:
      "Esto es opcional, pero te ayudará a sacarle más provecho a la app.",
  },
};

export default function AuthFlow() {
  const location = useLocation();
  const usuario = useAppStore((s) => s.usuario);
  const onboarding = useAppStore((s) => s.onboarding);
  const logout = useAppStore((s) => s.logout);
  const bootstrapAuth = useAppStore((s) => s.bootstrapAuth);
  const currentRole = usuario?.role || onboarding?.usuario?.role;
  const isBusiness = currentRole === "negocio";
  const isClient = currentRole === "cliente";
  const minAge = isClient ? 16 : 18;
  const initialStep = useMemo(
    () =>
      location.pathname === "/auth"
        ? AUTH_STEPS.EMAIL_LOGIN
        : AUTH_STEPS.WELCOME,
    [location.pathname]
  );
  const flow = useAuthFlow({ initialStep });
  const isVerificationFlowStep = [
    AUTH_STEPS.BUSINESS_VERIFY,
    AUTH_STEPS.ACCOUNT_VERIFY_PROMPT,
    AUTH_STEPS.VERIFY_EMAIL,
    AUTH_STEPS.ACCOUNT_VERIFY_METHOD,
    AUTH_STEPS.ADD_PASSWORD,
    AUTH_STEPS.ADD_MFA,
    AUTH_STEPS.ACCOUNT_VERIFY_READY,
  ].includes(flow.step);

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
    skipStepChange: isVerificationFlowStep,
  });


  const verificationStatus =
    onboarding?.verification_status || onboarding?.usuario?.verification_status;
  const authProfile = onboarding?.usuario || {};
  const hasPassword = Boolean(authProfile?.has_password);
  const hasMfa = Boolean(
    authProfile?.mfa_totp_enabled ||
      authProfile?.mfa_method ||
      authProfile?.mfa_primary_method ||
      authProfile?.mfa_enrolled_at
  );
  const emailConfirmed = Boolean(onboarding?.email_confirmed);
  const provider = onboarding?.provider || "email";
  const providers = onboarding?.providers || [];
  const termsAccepted = Boolean(authProfile?.terms_accepted);
  const privacyAccepted = Boolean(authProfile?.privacy_accepted);
  const clientSteps = onboarding?.client_steps || {};
  const clientProfile = clientSteps.profile || {};
  const clientAddress = clientSteps.address || {};
  const clientProfileCompleted = Boolean(clientProfile.completed);
  const clientAddressCompleted = Boolean(clientAddress.completed);
  const clientProfileSkipped =
    Boolean(clientProfile.skipped) && !clientProfileCompleted;
  const clientAddressSkipped =
    Boolean(clientAddress.skipped) && !clientAddressCompleted;
  const accountVerified = Boolean(emailConfirmed && (hasPassword || hasMfa));
  const businessVerified = Boolean(
    (onboarding?.ruc || onboarding?.negocio?.ruc) &&
      (onboarding?.phone || usuario?.telefono) &&
      onboarding?.negocio?.escaneo_cara
  );
  const clientStepsPending =
    isClient &&
    ((!clientProfileCompleted && !clientProfileSkipped) ||
      (!clientAddressCompleted && !clientAddressSkipped));
  const verificationSteps = [
    AUTH_STEPS.BUSINESS_VERIFY,
    AUTH_STEPS.ACCOUNT_VERIFY_PROMPT,
    AUTH_STEPS.VERIFY_EMAIL,
    AUTH_STEPS.ACCOUNT_VERIFY_METHOD,
    AUTH_STEPS.ADD_PASSWORD,
    AUTH_STEPS.ADD_MFA,
  ];
  useEffect(() => {
    if (!onboarding?.allowAccess) return;
    if (clientStepsPending) return;
    const status = verificationStatus || "unverified";
    if (status === "unverified") {
      if (flow.step !== AUTH_STEPS.ACCOUNT_VERIFY_PROMPT) {
        flow.setStep(AUTH_STEPS.ACCOUNT_VERIFY_PROMPT);
      }
      return;
    }
    if (status === "in_progress") {
      const target = isBusiness
        ? AUTH_STEPS.BUSINESS_VERIFY
        : emailConfirmed
          ? AUTH_STEPS.ACCOUNT_VERIFY_METHOD
          : AUTH_STEPS.VERIFY_EMAIL;
      if (!verificationSteps.includes(flow.step) && flow.step !== target) {
        flow.setStep(target);
      }
      return;
    }
    if (status === "verified" || status === "skipped") {
      if (flow.step !== AUTH_STEPS.ACCOUNT_VERIFY_READY) {
        flow.setStep(AUTH_STEPS.ACCOUNT_VERIFY_READY);
      }
      return;
    }
  }, [
    flow,
    onboarding?.allowAccess,
    clientStepsPending,
    verificationStatus,
    emailConfirmed,
    isBusiness,
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
      getUserProfileStatus({
        nombre: flow.nombreDueno,
        apellido: flow.apellidoDueno,
        genero: flow.genero,
        fechaNacimiento: flow.fechaNacimiento,
        minAge,
      }),
    [
      flow.apellidoDueno,
      flow.fechaNacimiento,
      flow.genero,
      flow.nombreDueno,
      minAge,
    ]
  );
  const isWelcome = flow.step === AUTH_STEPS.WELCOME;
  const isFormStep = [
    AUTH_STEPS.USER_PROFILE,
    AUTH_STEPS.BUSINESS_DATA,
    AUTH_STEPS.BUSINESS_CATEGORY,
    AUTH_STEPS.USER_ADDRESS,
    AUTH_STEPS.BUSINESS_VERIFY,
    AUTH_STEPS.ACCOUNT_VERIFY,
    AUTH_STEPS.ACCOUNT_VERIFY_PROMPT,
    AUTH_STEPS.VERIFY_EMAIL,
    AUTH_STEPS.ACCOUNT_VERIFY_METHOD,
    AUTH_STEPS.ACCOUNT_VERIFY_READY,
    AUTH_STEPS.ADD_PASSWORD,
    AUTH_STEPS.ADD_MFA,
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
  const stepCopyMap = isClient
    ? { ...BUSINESS_STEP_COPY, ...CLIENT_STEP_COPY }
    : BUSINESS_STEP_COPY;
  const stepCopy = stepCopyMap[flow.step] || {};
  const headerTitle =
    stepCopy.header || stepCopy.headerFallback || AUTH_BRAND.name;
  const userProfileSubtitle = (isClient
    ? CLIENT_STEP_COPY
    : BUSINESS_STEP_COPY)[AUTH_STEPS.USER_PROFILE]?.subtitle;
  const businessSubtitle = BUSINESS_STEP_COPY[AUTH_STEPS.BUSINESS_DATA]?.subtitle;
  const categorySubtitle =
    BUSINESS_STEP_COPY[AUTH_STEPS.BUSINESS_CATEGORY]?.subtitle;
  const categoryHelper =
    BUSINESS_STEP_COPY[AUTH_STEPS.BUSINESS_CATEGORY]?.helperLabel;
  const addressSubtitle = (isClient
    ? CLIENT_STEP_COPY
    : BUSINESS_STEP_COPY)[AUTH_STEPS.USER_ADDRESS]?.subtitle;
  const categoryPath = useMemo(
    () => getBusinessCategoryPath(flow.categoriaNegocio),
    [flow.categoriaNegocio]
  );

  const handleVerificationExit = React.useCallback(async () => {
    await bootstrapAuth({ force: true });
    flow.setStep(AUTH_STEPS.ACCOUNT_VERIFY_READY);
  }, [bootstrapAuth, flow]);

  const handleBackToMethod = React.useCallback(async () => {
    await bootstrapAuth({ force: true });
    flow.goToStep(AUTH_STEPS.ACCOUNT_VERIFY_METHOD);
  }, [bootstrapAuth, flow]);


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
      flow.step === AUTH_STEPS.USER_ADDRESS &&
      flow.isAddressSearchModeOpen
    ) {
      flow.setIsAddressSearchModeOpen(false);
      return;
    }
    if (flow.step === AUTH_STEPS.USER_PROFILE && isBusiness) {
      setShowExitConfirm(true);
      return;
    }
    actions.handleButtonBack();
  };

  React.useEffect(() => {
    if (flow.step !== AUTH_STEPS.USER_ADDRESS && flow.isAddressSearchModeOpen) {
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

      {(isBusiness &&
        (flow.step === AUTH_STEPS.USER_PROFILE ||
          flow.step === AUTH_STEPS.BUSINESS_CATEGORY ||
          flow.step === AUTH_STEPS.BUSINESS_DATA ||
          flow.step === AUTH_STEPS.USER_ADDRESS)) && (
        <div className="w-full max-w-sm px-2 mb-4">
          <StepProgress
            page={
              flow.step === AUTH_STEPS.USER_PROFILE
                ? 1
                : flow.step === AUTH_STEPS.USER_ADDRESS
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
      {flow.step === AUTH_STEPS.USER_PROFILE && (
        <UserProfileStep
          error={flow.emailError}
          inputClassName="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-2 text-sm"
          nombreDueno={flow.nombreDueno}
          apellidoDueno={flow.apellidoDueno}
          fechaNacimiento={flow.fechaNacimiento}
          genero={flow.genero}
          subtitle={userProfileSubtitle}
          underageMessage={
            isBusiness
              ? "Tienes que ser mayor de edad para ser el administrador de un negocio"
              : "Debes tener al menos 16 años para usar la app."
          }
          minAge={minAge}
          onChangeNombre={flow.setNombreDueno}
          onChangeApellido={flow.setApellidoDueno}
          onChangeGenero={flow.setGenero}
          onChangeFechaNacimiento={flow.setFechaNacimiento}
          onSubmit={actions.handleUserProfile}
          onSkip={isClient ? actions.skipUserProfile : undefined}
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

              {flow.step === AUTH_STEPS.USER_ADDRESS && (
                <UserAddressStep
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
                  onSubmit={actions.handleUserAddress}
                  onSkip={isClient ? actions.skipUserAddress : undefined}
                  primaryLabel={isBusiness ? "Entrar" : "Continuar"}
                  mode={isBusiness ? "negocio" : "cliente"}
                />
              )}

              {flow.step === AUTH_STEPS.ACCOUNT_VERIFY_PROMPT && (
                <AccountVerifyPrompt
                  innerRef={flow.regPage2Ref}
                  onVerify={() => {
                    if (isBusiness) {
                      flow.goToStep(AUTH_STEPS.BUSINESS_VERIFY);
                      return;
                    }
                    flow.goToStep(
                      emailConfirmed
                        ? AUTH_STEPS.ACCOUNT_VERIFY_METHOD
                        : AUTH_STEPS.VERIFY_EMAIL
                    );
                  }}
                  onSkip={handleVerificationExit}
                  mode={isBusiness ? "negocio" : "cliente"}
                />
              )}

              {flow.step === AUTH_STEPS.BUSINESS_VERIFY && isBusiness && (
                <BusinessVerifyStep
                  innerRef={flow.regPage2Ref}
                  phone={onboarding?.phone || usuario?.telefono || ""}
                  ruc={onboarding?.ruc || ""}
                  onContinue={() =>
                    flow.goToStep(
                      emailConfirmed
                        ? AUTH_STEPS.ACCOUNT_VERIFY_METHOD
                        : AUTH_STEPS.VERIFY_EMAIL
                    )
                  }
                  onSkip={handleVerificationExit}
                />
              )}

              {flow.step === AUTH_STEPS.VERIFY_EMAIL && (
                <VerifyEmailStep
                  innerRef={flow.regPage2Ref}
                  emailConfirmed={emailConfirmed}
                  onContinue={() => flow.goToStep(AUTH_STEPS.ACCOUNT_VERIFY_METHOD)}
                  onSkip={handleVerificationExit}
                />
              )}

              {flow.step === AUTH_STEPS.ACCOUNT_VERIFY_METHOD && (
                <AccountVerifyMethodStep
                  innerRef={flow.regPage2Ref}
                  hasPassword={hasPassword}
                  hasMfa={hasMfa}
                  onGoAddPassword={() => flow.goToStep(AUTH_STEPS.ADD_PASSWORD)}
                  onGoAddMfa={() => flow.goToStep(AUTH_STEPS.ADD_MFA)}
                  onContinue={handleVerificationExit}
                  onSkip={handleVerificationExit}
                />
              )}

              {flow.step === AUTH_STEPS.ADD_PASSWORD && (
                <AddPasswordStep
                  innerRef={flow.regPage2Ref}
                  provider={provider}
                  providers={providers}
                  hasPassword={hasPassword}
                  onContinue={handleBackToMethod}
                  onSkip={handleVerificationExit}
                />
              )}

              {flow.step === AUTH_STEPS.ADD_MFA && (
                <AddTwoFAStep
                  innerRef={flow.regPage2Ref}
                  onCancel={() => flow.goToStep(AUTH_STEPS.ACCOUNT_VERIFY_METHOD)}
                  onContinue={handleBackToMethod}
                />
              )}

              {flow.step === AUTH_STEPS.ACCOUNT_VERIFY_READY && (
                <AccountVerifyReadyStep
                  innerRef={flow.regPage2Ref}
                  isVerified={
                    isBusiness
                      ? Boolean(accountVerified && businessVerified)
                      : Boolean(accountVerified)
                  }
                  termsAccepted={termsAccepted}
                  privacyAccepted={privacyAccepted}
                  onBackToVerify={() =>
                    flow.goToStep(AUTH_STEPS.ACCOUNT_VERIFY_PROMPT)
                  }
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


