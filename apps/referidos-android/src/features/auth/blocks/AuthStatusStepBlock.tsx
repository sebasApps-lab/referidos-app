import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AuthStartLayout, { AuthStartCard, authColors, authText } from "./AuthStartLayout";
import { OnboardingPrimaryButton, OnboardingSkipButton } from "./OnboardingFormLayout";

type Props = {
  state: "oauth" | "pending" | "error" | "registration-confirmation";
  message?: string;
  error?: string;
  loading?: boolean;
  onBack?: () => void;
  onRetry?: () => void;
  onContinue?: () => void;
};

export default function AuthStatusStepBlock({
  state,
  message,
  error,
  loading = false,
  onBack,
  onRetry,
  onContinue,
}: Props) {
  const confirming = state === "registration-confirmation";
  const failed = state === "error" || Boolean(error);
  const status = error || message || (state === "error" ? "No se pudo completar el acceso." : "Procesando...");

  return (
    <AuthStartLayout onBack={onBack}>
      <AuthStartCard>
        <View style={styles.content}>
          {confirming ? (
            <>
              <Text accessibilityRole="header" style={styles.heading}>Revisa tu correo</Text>
              <Text style={styles.message}>
                {message || "Si recibes un enlace de confirmación, sigue las instrucciones del correo. Revisa también la carpeta de spam."}
              </Text>
              {error ? (
                <Text accessibilityLiveRegion="polite" style={[styles.message, styles.error]}>{error}</Text>
              ) : null}
              {onContinue && (
                <OnboardingPrimaryButton label="Ir a iniciar sesión" disabled={loading} onPress={onContinue} />
              )}
            </>
          ) : (
            <Text accessibilityLiveRegion="polite" style={[styles.message, failed && styles.error]}>
              {status}
            </Text>
          )}
          {onRetry && <OnboardingSkipButton label="Reintentar" disabled={loading} onPress={onRetry} />}
        </View>
      </AuthStartCard>
    </AuthStartLayout>
  );
}

const styles = StyleSheet.create({
  content: { gap: 12 },
  heading: {
    ...authText.normal,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    color: authColors.purple,
    textAlign: "center",
  },
  message: { ...authText.small, color: authColors.muted, textAlign: "center" },
  error: { color: authColors.error },
});
