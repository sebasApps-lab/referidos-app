import React, { useEffect, useState, type ReactNode } from "react";
import { Alert, BackHandler, Linking, StyleSheet, Text } from "react-native";
import { AUTH_STEPS } from "@referidos/domain";
import { fetchSystemFeatureFlags } from "@shared/services/systemFeatureFlags";
import { useAppStore } from "@shared/store/appStore";
import { useAuthEngine } from "./hooks/useAuthEngine";
import AddressStepBlock from "./blocks/AddressStepBlock";
import OwnerProfileStepBlock from "./blocks/OwnerProfileStepBlock";
import BusinessDataStepBlock from "./blocks/BusinessDataStepBlock";
import BusinessCategoryStepBlock from "./blocks/BusinessCategoryStepBlock";
import AccountVerifyPromptStepBlock from "./blocks/AccountVerifyPromptStepBlock";
import BusinessVerifyStepBlock from "./blocks/BusinessVerifyStepBlock";
import VerifyEmailStepBlock from "./blocks/VerifyEmailStepBlock";
import AccountVerifyMethodStepBlock from "./blocks/AccountVerifyMethodStepBlock";
import AccountVerifyReadyStepBlock from "./blocks/AccountVerifyReadyStepBlock";
import AddPasswordStepBlock from "./blocks/AddPasswordStepBlock";
import TotpSetup from "./blocks/TotpSetup";
import { authColors, authText } from "./blocks/AuthStartLayout";
import AuthStatusStepBlock from "./blocks/AuthStatusStepBlock";
import OnboardingFormLayout, { OnboardingSkipButton } from "./blocks/OnboardingFormLayout";
import EmailAuthStepBlock from "./blocks/EmailAuthStepBlock";
import RoleSelectStepBlock from "./blocks/RoleSelectStepBlock";
import WelcomeStepBlock from "./blocks/WelcomeStepBlock";

const LEGAL_URLS = {
  terms: "https://referidos.app/legal/es/terms",
  privacy: "https://referidos.app/legal/es/privacy",
};

export default function AuthFlowScreen() {
  const engine = useAuthEngine();
  const signOut = useAppStore((state) => state.signOut);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [appleEnabled, setAppleEnabled] = useState(false);
  const [searchModeOpen, setSearchModeOpen] = useState(false);

  const user = engine.onboarding?.usuario;
  const emailConfirmed = Boolean(engine.onboarding?.email_confirmed);
  const hasPassword = Boolean(user?.has_password);
  const hasMfa = Boolean(
    user?.mfa_totp_enabled || user?.mfa_method || user?.mfa_primary_method || user?.mfa_enrolled_at,
  );
  const isBusiness = engine.role === "negocio";
  const isClient = engine.role === "cliente";
  const { loading, step, returnToWelcome, setError, setInfo, setStep } = engine;

  useEffect(() => {
    let mounted = true;
    void fetchSystemFeatureFlags({ force: true }).then((flags) => {
      if (mounted) setAppleEnabled(Boolean(flags.oauth_apple_enabled));
    });
    return () => { mounted = false; };
  }, []);

  function goTo(next: string) {
    setError("");
    setInfo("");
    setStep(next);
  }

  function showMethods() {
    setNewPassword("");
    setConfirmPassword("");
    goTo(AUTH_STEPS.ACCOUNT_VERIFY_METHOD);
  }

  async function leaveRegistration() {
    if (loading) return;
    await signOut();
    returnToWelcome();
  }

  function handleBack() {
    if (loading) return;
    switch (step) {
      case AUTH_STEPS.EMAIL_LOGIN:
      case AUTH_STEPS.EMAIL_REGISTER:
      case AUTH_STEPS.OAUTH_CALLBACK:
        returnToWelcome();
        break;
      case AUTH_STEPS.ROLE_SELECT:
        void leaveRegistration();
        break;
      case AUTH_STEPS.USER_PROFILE:
        Alert.alert("Confirmar salida", "Deberás iniciar sesión para completar el registro.", [
          { text: "Cancelar", style: "cancel" },
          { text: "Aceptar", onPress: () => void leaveRegistration() },
        ]);
        break;
      case AUTH_STEPS.BUSINESS_CATEGORY:
        goTo(AUTH_STEPS.BUSINESS_DATA);
        break;
      case AUTH_STEPS.BUSINESS_DATA:
        goTo(AUTH_STEPS.USER_PROFILE);
        break;
      case AUTH_STEPS.USER_ADDRESS:
        if (searchModeOpen) setSearchModeOpen(false);
        else goTo(isBusiness ? AUTH_STEPS.BUSINESS_DATA : AUTH_STEPS.USER_PROFILE);
        break;
      case AUTH_STEPS.ACCOUNT_VERIFY_PROMPT:
        goTo(AUTH_STEPS.USER_ADDRESS);
        break;
      case AUTH_STEPS.ADD_PASSWORD:
      case AUTH_STEPS.ADD_MFA:
        showMethods();
        break;
      case AUTH_STEPS.ACCOUNT_VERIFY_METHOD:
        goTo(
          emailConfirmed && !isBusiness ? AUTH_STEPS.ACCOUNT_VERIFY_PROMPT
            : isBusiness ? AUTH_STEPS.BUSINESS_VERIFY : AUTH_STEPS.VERIFY_EMAIL,
        );
        break;
      case AUTH_STEPS.VERIFY_EMAIL:
        goTo(isBusiness ? AUTH_STEPS.BUSINESS_VERIFY : AUTH_STEPS.ACCOUNT_VERIFY_PROMPT);
        break;
      case AUTH_STEPS.ACCOUNT_VERIFY_READY:
      case AUTH_STEPS.BUSINESS_VERIFY:
        goTo(AUTH_STEPS.ACCOUNT_VERIFY_PROMPT);
        break;
      default:
        void leaveRegistration();
    }
  }

  useEffect(() => {
    if (step === AUTH_STEPS.WELCOME || step === AUTH_STEPS.ROLE_SELECT) return;
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => subscription.remove();
  });

  function form(children: ReactNode, title = "Desbloquea tus beneficios", progress?: 1 | 2 | 3) {
    return (
      <OnboardingFormLayout
        key={step}
        title={title}
        progress={progress}
        contentInset={step === AUTH_STEPS.USER_PROFILE ? 32 : undefined}
        onBack={handleBack}
        error={engine.error}
      >
        {engine.info ? <Text style={styles.info}>{engine.info}</Text> : null}
        {engine.canRetryRegistrationValidation && (
          <OnboardingSkipButton label="Reintentar validación del registro" onPress={engine.retryRegistrationValidation} disabled={loading} />
        )}
        {children}
      </OnboardingFormLayout>
    );
  }

  function openLegal(which: keyof typeof LEGAL_URLS) {
    void Linking.openURL(LEGAL_URLS[which]).catch(() =>
      Alert.alert("Documento no disponible", "No se pudo abrir el documento legal."),
    );
  }

  switch (step) {
    case AUTH_STEPS.WELCOME:
      return (
        <WelcomeStepBlock
          error={engine.error}
          loading={loading}
          appleEnabled={appleEnabled}
          onEmail={() => goTo(AUTH_STEPS.EMAIL_LOGIN)}
          onOAuth={engine.startOAuth}
        />
      );
    case AUTH_STEPS.EMAIL_REGISTER:
      if (engine.registrationConfirmationPending) {
        return (
          <AuthStatusStepBlock state="registration-confirmation" onBack={handleBack} onContinue={engine.continueAfterRegistrationConfirmation} />
        );
      }
      return <EmailAuthStepBlock key={step} mode="register" engine={engine} onBack={handleBack} onRecover={unavailableRecovery} />;
    case AUTH_STEPS.EMAIL_LOGIN:
      return <EmailAuthStepBlock key={step} mode="login" engine={engine} onBack={handleBack} onRecover={unavailableRecovery} />;
    case AUTH_STEPS.ROLE_SELECT:
      return (
        <RoleSelectStepBlock
          error={engine.error}
          submitting={loading}
          onBack={handleBack}
          onSubmit={engine.submitRoleSelection}
          onValidateNegocioCode={engine.validateBusinessRegistrationCode}
          onRequestCode={() => Alert.alert("Solicitar código para negocio", "Pídele el código de registro al equipo que invitó a tu negocio.")}
        />
      );
    case AUTH_STEPS.USER_PROFILE:
      return form(
        <OwnerProfileStepBlock
          role={engine.role}
          nombre={engine.nombre}
          apellido={engine.apellido}
          genero={engine.genero}
          fechaNacimiento={engine.fechaNacimiento}
          loading={loading}
          onNombreChange={engine.setNombre}
          onApellidoChange={engine.setApellido}
          onGeneroChange={engine.setGenero}
          onFechaNacimientoChange={engine.setFechaNacimiento}
          onSubmit={engine.submitOwnerProfile}
          onSkip={isClient ? () => engine.skipClientDetail("profile") : undefined}
        />,
        "Cuéntanos más sobre ti",
        isBusiness ? 1 : undefined,
      );
    case AUTH_STEPS.BUSINESS_DATA:
      return form(
        <BusinessDataStepBlock
          nombreNegocio={engine.nombreNegocio}
          categoriaNegocio={engine.categoriaNegocio}
          loading={loading}
          onNombreNegocioChange={engine.setNombreNegocio}
          onOpenCategory={() => goTo(AUTH_STEPS.BUSINESS_CATEGORY)}
          onSubmit={engine.submitBusinessData}
        />,
        "Ahora tu negocio",
        2,
      );
    case AUTH_STEPS.BUSINESS_CATEGORY:
      return form(
        <BusinessCategoryStepBlock
          currentCategory={engine.categoriaNegocio}
          onConfirmCategory={(category) => {
            engine.setCategoriaNegocio(category);
            goTo(AUTH_STEPS.BUSINESS_DATA);
          }}
        />,
        "Cuéntanos a qué se dedica tu negocio",
        2,
      );
    case AUTH_STEPS.USER_ADDRESS:
      return form(
        <AddressStepBlock
          role={engine.role}
          loading={loading}
          searchModeOpen={searchModeOpen}
          onSearchModeChange={setSearchModeOpen}
          onSkip={isClient ? () => engine.skipClientDetail("address") : undefined}
          value={{
            calles: engine.calles,
            ciudad: engine.ciudad,
            sector: engine.sector,
            referencia: engine.referencia,
            provinciaId: engine.provinciaId,
            cantonId: engine.cantonId,
            parroquiaId: engine.parroquiaId,
            parroquia: engine.parroquia,
            lat: engine.lat,
            lng: engine.lng,
            isSucursalPrincipal: engine.isSucursalPrincipal,
            horarios: engine.horarios,
          }}
          onChange={{
            setCalles: engine.setCalles,
            setCiudad: engine.setCiudad,
            setSector: engine.setSector,
            setReferencia: engine.setReferencia,
            setProvinciaId: engine.setProvinciaId,
            setCantonId: engine.setCantonId,
            setParroquiaId: engine.setParroquiaId,
            setParroquia: engine.setParroquia,
            setLat: engine.setLat,
            setLng: engine.setLng,
            setIsSucursalPrincipal: engine.setIsSucursalPrincipal,
            setHorarios: engine.setHorarios,
          }}
          onSubmit={engine.submitAddressData}
          showError={engine.setError}
        />,
        isBusiness ? "¿Dónde estás ubicado?" : "Descubre promociones cerca de ti",
        isBusiness ? 3 : undefined,
      );
    case AUTH_STEPS.ACCOUNT_VERIFY:
    case AUTH_STEPS.ACCOUNT_VERIFY_PROMPT:
      return form(
        <AccountVerifyPromptStepBlock
          mode={isBusiness ? "negocio" : "cliente"}
          loading={loading}
          onVerifyNow={engine.startVerification}
          onSkip={engine.skipVerification}
        />,
      );
    case AUTH_STEPS.BUSINESS_VERIFY:
      return form(
        <BusinessVerifyStepBlock
          ruc={engine.ruc}
          telefono={engine.telefono}
          loading={loading}
          onRucChange={engine.setRuc}
          onTelefonoChange={engine.setTelefono}
          onContinue={async () => {
            if (await engine.submitBusinessVerificationData()) {
              const latest = useAppStore.getState().onboarding;
              goTo(latest?.email_confirmed ? AUTH_STEPS.ACCOUNT_VERIFY_METHOD : AUTH_STEPS.VERIFY_EMAIL);
            }
          }}
          onSkip={engine.skipVerification}
        />,
      );
    case AUTH_STEPS.VERIFY_EMAIL:
      return form(
        <VerifyEmailStepBlock
          emailText={user?.email || engine.email}
          emailConfirmed={emailConfirmed}
          loading={loading}
          onSendEmail={engine.sendVerificationEmail}
          onRefresh={async () => {
            await engine.refreshOnboarding();
            if (useAppStore.getState().onboarding?.email_confirmed) showMethods();
          }}
          onSkip={engine.skipVerification}
        />,
      );
    case AUTH_STEPS.ACCOUNT_VERIFY_METHOD:
      return form(
        <AccountVerifyMethodStepBlock
          hasPassword={hasPassword}
          hasMfa={hasMfa}
          loading={loading}
          onChoosePassword={() => goTo(AUTH_STEPS.ADD_PASSWORD)}
          onChooseMfa={() => goTo(AUTH_STEPS.ADD_MFA)}
          onFinalize={engine.finalizeVerification}
          onSkip={engine.skipVerification}
        />,
      );
    case AUTH_STEPS.ADD_PASSWORD:
      return form(
        <AddPasswordStepBlock
          hasPassword={hasPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          loading={loading}
          onNewPasswordChange={setNewPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onSavePassword={async () => {
            if (await engine.savePassword(newPassword, confirmPassword)) showMethods();
          }}
          onContinue={showMethods}
          onSkip={engine.skipVerification}
        />,
      );
    case AUTH_STEPS.ADD_MFA:
      return form(
        <TotpSetup onDone={async () => { await engine.refreshOnboarding(); showMethods(); }} onCancel={showMethods} />,
      );
    case AUTH_STEPS.ACCOUNT_VERIFY_READY: {
      const businessVerified = Boolean((engine.onboarding?.ruc || engine.onboarding?.negocio?.ruc) && (engine.onboarding?.phone || user?.telefono));
      return form(
        <AccountVerifyReadyStepBlock
          isVerified={emailConfirmed && (hasPassword || hasMfa) && (!isBusiness || businessVerified)}
          termsAccepted={Boolean(user?.terms_accepted)}
          privacyAccepted={Boolean(user?.privacy_accepted)}
          loading={loading}
          onBackToVerify={() => goTo(AUTH_STEPS.ACCOUNT_VERIFY_PROMPT)}
          onEnter={engine.acceptLegal}
          onOpenTerms={() => openLegal("terms")}
          onOpenPrivacy={() => openLegal("privacy")}
        />,
      );
    }
    case AUTH_STEPS.OAUTH_CALLBACK:
      return (
        <AuthStatusStepBlock state="oauth" error={engine.error} loading={loading} onBack={handleBack} onRetry={engine.refreshOnboarding} />
      );
    default:
      return (
        <AuthStatusStepBlock
          state={step === AUTH_STEPS.ERROR ? "error" : "pending"}
          error={engine.error}
          loading={loading}
          onBack={handleBack}
          onRetry={engine.canRetryRegistrationValidation ? engine.retryRegistrationValidation : engine.refreshOnboarding}
        />
      );
  }
}

function unavailableRecovery() {
  Alert.alert("Recuperar contraseña", "La recuperación de contraseña aún no está disponible.");
}

const styles = StyleSheet.create({
  info: { ...authText.small, color: authColors.purple },
});
