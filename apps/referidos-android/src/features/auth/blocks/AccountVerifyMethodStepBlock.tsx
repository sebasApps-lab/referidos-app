import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  showPasswordSetup: boolean;
  showEmailVerification: boolean;
  hasPassword: boolean;
  hasMfa: boolean;
  emailConfirmed: boolean;
  newPassword: string;
  confirmPassword: string;
  loading?: boolean;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSavePassword: () => void;
  onSendEmail: () => void;
  onFinalize: () => void;
  onSkip: () => void;
};

export default function AccountVerifyMethodStepBlock({
  showPasswordSetup,
  showEmailVerification,
  hasPassword,
  hasMfa,
  emailConfirmed,
  newPassword,
  confirmPassword,
  loading = false,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSavePassword,
  onSendEmail,
  onFinalize,
  onSkip,
}: Props) {
  const canFinalize = (() => {
    if (showEmailVerification && !emailConfirmed) return false;
    if (showPasswordSetup && !hasPassword && !hasMfa) return false;
    return true;
  })();

  return (
    <View style={styles.container}>
      {showPasswordSetup ? (
        <>
          <Text style={styles.helper}>Asegura tu cuenta agregando una contrasena.</Text>
          {hasPassword || hasMfa ? (
            <>
              {hasPassword ? <Text style={styles.okText}>Contrasena ya configurada.</Text> : null}
              {hasMfa ? <Text style={styles.okText}>MFA ya configurado.</Text> : null}
            </>
          ) : (
            <>
              <Text style={styles.label}>Nueva contrasena</Text>
              <TextInput
                value={newPassword}
                onChangeText={onNewPasswordChange}
                style={styles.input}
                secureTextEntry
              />
              <Text style={styles.label}>Confirmar contrasena</Text>
              <TextInput
                value={confirmPassword}
                onChangeText={onConfirmPasswordChange}
                style={styles.input}
                secureTextEntry
              />
              <Pressable onPress={onSavePassword} disabled={loading} style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}>
                <Text style={styles.primaryButtonText}>{loading ? "Cargando..." : "Guardar contrasena"}</Text>
              </Pressable>
              <Text style={styles.pendingInfo}>
                MFA se activara en la siguiente fase de seguridad mobile.
              </Text>
            </>
          )}
        </>
      ) : null}

      {showEmailVerification ? (
        <>
          <Text style={styles.helper}>
            {emailConfirmed
              ? "Tu correo ya fue confirmado con exito."
              : "Debes confirmar tu correo para finalizar."}
          </Text>
          {!emailConfirmed ? (
            <Pressable onPress={onSendEmail} disabled={loading} style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}>
              <Text style={styles.primaryButtonText}>{loading ? "Cargando..." : "Enviar correo"}</Text>
            </Pressable>
          ) : null}
        </>
      ) : null}

      <Pressable onPress={onFinalize} disabled={!canFinalize} style={[styles.primaryButton, !canFinalize && styles.primaryButtonDisabled]}>
        <Text style={styles.primaryButtonText}>Finalizar</Text>
      </Pressable>
      <Pressable onPress={onSkip} style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>Verificar mas tarde</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  pendingInfo: {
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 18,
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
});
