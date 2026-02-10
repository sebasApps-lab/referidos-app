import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AUTH_ROLES, AUTH_STEPS, BUSINESS_CATEGORIES } from "@referidos/domain";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import { useAuthEngine } from "./hooks/useAuthEngine";
import AddressStepBlock from "./blocks/AddressStepBlock";
import OwnerProfileStepBlock from "./blocks/OwnerProfileStepBlock";
import BusinessDataStepBlock from "./blocks/BusinessDataStepBlock";
import AccountVerifyPromptStepBlock from "./blocks/AccountVerifyPromptStepBlock";
import BusinessVerifyStepBlock from "./blocks/BusinessVerifyStepBlock";
import VerifyEmailStepBlock from "./blocks/VerifyEmailStepBlock";
import AccountVerifyMethodStepBlock from "./blocks/AccountVerifyMethodStepBlock";

export default function AuthFlowScreen() {
  const engine = useAuthEngine();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const providers = useMemo(
    () => (Array.isArray(engine.onboarding?.providers) ? engine.onboarding.providers : []),
    [engine.onboarding?.providers],
  );
  const provider = engine.onboarding?.provider || "email";
  const emailConfirmed = Boolean(engine.onboarding?.email_confirmed);
  const hasPassword = Boolean(engine.onboarding?.usuario?.has_password);
  const isOauthPrimary = provider !== "email";
  const hasEmailProvider = providers.includes("email");
  const showPasswordSetup = isOauthPrimary;
  const showEmailVerification = !isOauthPrimary && hasEmailProvider;

  return (
    <ScreenScaffold
      title="Referidos Android Auth"
      subtitle={`Step actual: ${engine.step}`}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBanners loading={engine.loading} error={engine.error} info={engine.info} />

        {engine.step === AUTH_STEPS.WELCOME && (
          <Card title="Bienvenido">
            <Text style={styles.helper}>
              Inicia sesion o crea cuenta para continuar.
            </Text>
            <PrimaryButton
              label="Iniciar sesion"
              onPress={() => engine.setStep(AUTH_STEPS.EMAIL_LOGIN)}
            />
            <SecondaryButton
              label="Crear cuenta"
              onPress={() => engine.setStep(AUTH_STEPS.EMAIL_REGISTER)}
            />
          </Card>
        )}

        {engine.step === AUTH_STEPS.EMAIL_LOGIN && (
          <Card title="Iniciar sesion">
            <LabeledInput
              label="Correo"
              value={engine.email}
              onChangeText={engine.setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <LabeledInput
              label="Contrasena"
              value={engine.password}
              onChangeText={engine.setPassword}
              secureTextEntry
            />
            <PrimaryButton label="Entrar" onPress={engine.submitLogin} loading={engine.loading} />
            <SecondaryButton
              label="Crear cuenta"
              onPress={() => engine.setStep(AUTH_STEPS.EMAIL_REGISTER)}
            />
          </Card>
        )}

        {engine.step === AUTH_STEPS.EMAIL_REGISTER && (
          <Card title="Registro">
            <LabeledInput
              label="Correo"
              value={engine.email}
              onChangeText={engine.setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <LabeledInput
              label="Contrasena"
              value={engine.password}
              onChangeText={engine.setPassword}
              secureTextEntry
            />
            <LabeledInput
              label="Confirmar contrasena"
              value={engine.passwordConfirm}
              onChangeText={engine.setPasswordConfirm}
              secureTextEntry
            />
            <PrimaryButton
              label="Crear cuenta"
              onPress={engine.submitRegister}
              loading={engine.loading}
            />
            <SecondaryButton
              label="Ya tengo cuenta"
              onPress={() => engine.setStep(AUTH_STEPS.EMAIL_LOGIN)}
            />
          </Card>
        )}

        {engine.step === AUTH_STEPS.ROLE_SELECT && (
          <Card title="Selecciona tu tipo de cuenta">
            <RoleButton
              label="Cliente"
              selected={engine.selectedRole === AUTH_ROLES.CLIENTE}
              onPress={() => engine.setSelectedRole(AUTH_ROLES.CLIENTE)}
            />
            <RoleButton
              label="Negocio"
              selected={engine.selectedRole === AUTH_ROLES.NEGOCIO}
              onPress={() => engine.setSelectedRole(AUTH_ROLES.NEGOCIO)}
            />
            <PrimaryButton
              label="Continuar"
              onPress={() => engine.submitRoleSelection(engine.selectedRole || "")}
              disabled={!engine.selectedRole}
              loading={engine.loading}
            />
          </Card>
        )}

        {engine.step === AUTH_STEPS.USER_PROFILE && (
          <Card title="Datos del propietario">
            <OwnerProfileStepBlock
              nombre={engine.nombre}
              apellido={engine.apellido}
              genero={engine.genero}
              fechaNacimiento={engine.fechaNacimiento}
              loading={engine.loading}
              onNombreChange={engine.setNombre}
              onApellidoChange={engine.setApellido}
              onGeneroChange={engine.setGenero}
              onFechaNacimientoChange={engine.setFechaNacimiento}
              onSubmit={engine.submitOwnerProfile}
            />
          </Card>
        )}

        {engine.step === AUTH_STEPS.BUSINESS_DATA && (
          <Card title="Datos del negocio">
            <BusinessDataStepBlock
              nombreNegocio={engine.nombreNegocio}
              categoriaNegocio={engine.categoriaNegocio}
              ruc={engine.ruc}
              categories={BUSINESS_CATEGORIES.slice(0, 12)}
              loading={engine.loading}
              onNombreNegocioChange={engine.setNombreNegocio}
              onCategoriaChange={engine.setCategoriaNegocio}
              onRucChange={engine.setRuc}
              onSubmit={engine.submitBusinessData}
            />
          </Card>
        )}

        {engine.step === AUTH_STEPS.USER_ADDRESS && (
          <Card title="Direccion">
            <AddressStepBlock
              role={engine.role}
              loading={engine.loading}
              value={{
                calles: engine.calles,
                ciudad: engine.ciudad,
                sector: engine.sector,
                provinciaId: engine.provinciaId,
                cantonId: engine.cantonId,
                parroquiaId: engine.parroquiaId,
                parroquia: engine.parroquia,
                lat: engine.lat,
                lng: engine.lng,
                isSucursalPrincipal: engine.isSucursalPrincipal,
              }}
              onChange={{
                setCalles: engine.setCalles,
                setCiudad: engine.setCiudad,
                setSector: engine.setSector,
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
            />
          </Card>
        )}

        {engine.step === AUTH_STEPS.ACCOUNT_VERIFY_PROMPT && (
          <Card title="Paso 1 de 2">
            <AccountVerifyPromptStepBlock
              onVerifyNow={engine.startVerification}
              onSkip={engine.skipVerification}
            />
          </Card>
        )}

        {engine.step === AUTH_STEPS.BUSINESS_VERIFY && (
          <Card title="Verifica tu negocio">
            <BusinessVerifyStepBlock
              ruc={engine.ruc}
              telefono={engine.telefono}
              loading={engine.loading}
              onRucChange={engine.setRuc}
              onTelefonoChange={engine.setTelefono}
              onContinue={async () => {
                const ok = await engine.submitBusinessVerificationData();
                if (!ok) return;
                await engine.refreshOnboarding();
              }}
              onSkip={engine.skipVerification}
            />
          </Card>
        )}

        {engine.step === AUTH_STEPS.VERIFY_EMAIL && (
          <Card title="Verifica tu correo">
            <VerifyEmailStepBlock
              emailText={engine.onboarding?.usuario?.email || engine.email || "(sin correo)"}
              emailConfirmed={emailConfirmed}
              loading={engine.loading}
              onSendEmail={engine.sendVerificationEmail}
              onRefresh={engine.refreshOnboarding}
              onSkip={engine.skipVerification}
            />
          </Card>
        )}

        {engine.step === AUTH_STEPS.ACCOUNT_VERIFY_METHOD && (
          <Card title="Paso 2 de 2">
            <AccountVerifyMethodStepBlock
              showPasswordSetup={showPasswordSetup}
              showEmailVerification={showEmailVerification}
              hasPassword={hasPassword}
              emailConfirmed={emailConfirmed}
              newPassword={newPassword}
              confirmPassword={confirmPassword}
              loading={engine.loading}
              onNewPasswordChange={setNewPassword}
              onConfirmPasswordChange={setConfirmPassword}
              onSavePassword={() => engine.savePassword(newPassword, confirmPassword)}
              onSendEmail={engine.sendVerificationEmail}
              onFinalize={engine.finalizeVerification}
              onSkip={engine.skipVerification}
            />
          </Card>
        )}

        {engine.step === AUTH_STEPS.ACCOUNT_VERIFY_READY && (
          <Card title="Cuenta lista">
            <Text style={styles.okText}>
              Verificacion completada. Si onboarding sigue bloqueado, refresca estado.
            </Text>
            <PrimaryButton
              label="Refrescar onboarding"
              onPress={engine.refreshOnboarding}
            />
          </Card>
        )}

        {engine.step === AUTH_STEPS.PENDING && (
          <Card title="Acceso habilitado">
            <Text style={styles.helper}>
              Tu cuenta no requiere pasos extra de registro en Android.
            </Text>
            <PrimaryButton label="Refrescar onboarding" onPress={engine.refreshOnboarding} />
          </Card>
        )}
      </ScrollView>
    </ScreenScaffold>
  );
}

function StatusBanners({
  loading,
  error,
  info,
}: {
  loading: boolean;
  error: string;
  info: string;
}) {
  return (
    <View style={styles.statusStack}>
      {loading ? <Text style={styles.loading}>Procesando...</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {info ? <Text style={styles.info}>{info}</Text> : null}
    </View>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardBody}>{children}</View>
    </View>
  );
}

function LabeledInput(props: Record<string, any>) {
  const { label, ...rest } = props;
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...rest} style={styles.input} />
    </View>
  );
}

function PrimaryButton({
  label,
  onPress,
  disabled = false,
  loading = false,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.primaryButton, (disabled || loading) && styles.primaryButtonDisabled]}
    >
      <Text style={styles.primaryButtonText}>{loading ? "Cargando..." : label}</Text>
    </Pressable>
  );
}

function SecondaryButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.secondaryButton}>
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </Pressable>
  );
}

function RoleButton({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.roleChip, selected && styles.roleChipSelected]}
    >
      <Text style={[styles.roleChipText, selected && styles.roleChipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    gap: 12,
  },
  statusStack: {
    gap: 8,
  },
  loading: {
    color: "#4338CA",
    fontSize: 12,
    fontWeight: "600",
  },
  error: {
    color: "#B91C1C",
    fontSize: 12,
    fontWeight: "600",
  },
  info: {
    color: "#047857",
    fontSize: 12,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#181B2A",
  },
  cardBody: {
    gap: 10,
  },
  helper: {
    color: "#4B5563",
    fontSize: 13,
    lineHeight: 20,
  },
  okText: {
    color: "#047857",
    fontWeight: "600",
    fontSize: 13,
  },
  inputWrap: {
    gap: 6,
  },
  label: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#111827",
    fontSize: 14,
    backgroundColor: "#FFFFFF",
  },
  primaryButton: {
    backgroundColor: "#6D28D9",
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  secondaryButton: {
    paddingVertical: 10,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#6D28D9",
    fontWeight: "600",
    fontSize: 13,
  },
  roleChip: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  roleChipSelected: {
    borderColor: "#6D28D9",
    backgroundColor: "#F5F3FF",
  },
  roleChipText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 13,
  },
  roleChipTextSelected: {
    color: "#5B21B6",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
