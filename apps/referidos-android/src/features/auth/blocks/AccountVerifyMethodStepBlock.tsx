import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { PasswordFields } from "./AddPasswordStepBlock";
import { OnboardingPrimaryButton, OnboardingSkipButton } from "./OnboardingFormLayout";
import { verificationStyles } from "./verificationStyles";

type Props = {
  hasPassword: boolean;
  hasMfa: boolean;
  loading?: boolean;
  onChoosePassword?: () => void;
  onChooseMfa?: () => void;
  onFinalize: () => void;
  onSkip: () => void;
  showPasswordSetup?: boolean;
  showEmailVerification?: boolean;
  emailConfirmed?: boolean;
  newPassword?: string;
  confirmPassword?: string;
  onNewPasswordChange?: (value: string) => void;
  onConfirmPasswordChange?: (value: string) => void;
  onSavePassword?: () => void;
  onSendEmail?: () => void;
};

export default function AccountVerifyMethodStepBlock({
  hasPassword,
  hasMfa,
  loading = false,
  onChoosePassword,
  onChooseMfa,
  onFinalize,
  onSkip,
  showPasswordSetup = false,
  showEmailVerification = false,
  emailConfirmed = false,
  newPassword = "",
  confirmPassword = "",
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSavePassword,
  onSendEmail,
}: Props) {
  const dedicatedPassword = Boolean(onChoosePassword);
  const needsEmail = showEmailVerification && !emailConfirmed;
  const needsMethod = (dedicatedPassword || showPasswordSetup) && !hasPassword && !hasMfa;

  return (
    <View style={verificationStyles.container}>
      <View style={verificationStyles.content}>
        <Text accessibilityRole="header" style={verificationStyles.heading}>Elige un método</Text>
        <Text style={[verificationStyles.body, verificationStyles.center]}>
          {onChooseMfa || hasMfa
            ? "Puedes usar cualquiera de estos métodos para asegurar tu cuenta."
            : "Asegura tu cuenta con una contraseña."}
        </Text>

        <View style={styles.methods}>
          <MethodOption label="Usar contraseña" active={hasPassword} disabled={loading} onPress={onChoosePassword} />
          {onChooseMfa || hasMfa ? (
            <MethodOption label="Verificación de 2 pasos" active={hasMfa} disabled={loading} onPress={onChooseMfa} recommended />
          ) : null}
        </View>

        {!dedicatedPassword && showPasswordSetup && !hasPassword && !hasMfa &&
          onNewPasswordChange && onConfirmPasswordChange && onSavePassword ? (
            <PasswordFields
              newPassword={newPassword}
              confirmPassword={confirmPassword}
              loading={loading}
              onNewPasswordChange={onNewPasswordChange}
              onConfirmPasswordChange={onConfirmPasswordChange}
              onSavePassword={onSavePassword}
            />
          ) : null}

        {needsEmail && onSendEmail ? (
          <>
            <Text style={verificationStyles.body}>Confirma tu correo para continuar.</Text>
            <OnboardingSkipButton label="Enviar correo" disabled={loading} onPress={onSendEmail} />
          </>
        ) : null}
      </View>

      <View style={verificationStyles.footer}>
        <OnboardingPrimaryButton label="Continuar" disabled={loading || needsEmail || needsMethod} onPress={onFinalize} />
        <OnboardingSkipButton label="Verificar más tarde" disabled={loading} onPress={onSkip} />
      </View>
    </View>
  );
}

function MethodOption({ label, active, disabled, onPress, recommended = false }: {
  label: string;
  active: boolean;
  disabled: boolean;
  onPress?: () => void;
  recommended?: boolean;
}) {
  const content = (
    <>
      <View style={[styles.methodIcon, active && styles.activeIcon]}>
        <Image
          source={recommended ? require("../assets/shield-check.png") : require("../assets/lock.png")}
          style={[styles.methodMark, active && styles.activeMark]}
        />
      </View>
      <View style={styles.methodLabel}>
        <Text style={[styles.methodText, active && styles.activeText]}>{label}</Text>
        {recommended && onPress ? <Text style={styles.recommended}>Recomendado</Text> : null}
      </View>
    </>
  );
  const style = [styles.method, active && styles.activeMethod];

  if (!onPress) return <View accessibilityLabel={active ? `${label}, configurado` : label} style={style}>{content}</View>;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled, selected: active }}
      disabled={disabled}
      onPress={onPress}
      style={style}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  methods: { flexGrow: 1, justifyContent: "center", gap: 12 },
  method: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 60,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  activeMethod: { borderColor: "#5E30A5", backgroundColor: "#F7F3FF" },
  methodIcon: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: "#F3F4F6" },
  activeIcon: { backgroundColor: "#E6DBFA" },
  methodMark: { width: 16, height: 16, tintColor: "#6B7280" },
  activeMark: { tintColor: "#5E30A5" },
  methodLabel: { flex: 1, flexDirection: "row", alignItems: "center", flexWrap: "wrap", columnGap: 8 },
  methodText: { color: "#374151", fontSize: 14, fontWeight: "600" },
  activeText: { color: "#5E30A5" },
  recommended: { color: "#047857", backgroundColor: "#D1FAE5", borderRadius: 10, paddingHorizontal: 8, fontSize: 10, lineHeight: 16, fontWeight: "600" },
});
