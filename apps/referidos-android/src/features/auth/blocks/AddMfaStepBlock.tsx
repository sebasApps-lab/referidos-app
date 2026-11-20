import React, { useState, type ReactNode } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from "react-native";
import { OnboardingPrimaryButton, OnboardingSkipButton } from "./OnboardingFormLayout";
import { verificationStyles } from "./verificationStyles";

type Props = {
  mode?: "enroll" | "existing";
  factorReady: boolean;
  qr?: ReactNode;
  secret?: string;
  loading?: boolean;
  submitting?: boolean;
  enrollError?: string;
  verifyError?: string;
  onRetry?: () => void;
  onVerify: (code: string) => void;
  onCancel: () => void;
};

export default function AddMfaStepBlock({
  mode = "enroll",
  factorReady,
  qr,
  secret,
  loading = false,
  submitting = false,
  enrollError,
  verifyError,
  onRetry,
  onVerify,
  onCancel,
}: Props) {
  const [code, setCode] = useState("");
  const canSubmit = factorReady && !enrollError && !loading && !submitting && code.length === 6;
  const isEnrollment = mode === "enroll";

  let instructions = "Ingresa el código de tu app autenticadora.";
  if (loading) instructions = "Preparando la verificación…";
  else if (enrollError) instructions = "No se pudo iniciar la configuración.";
  else if (isEnrollment && qr) instructions = "Escanea el QR con tu app autenticadora y escribe el código.";
  else if (isEnrollment && secret) instructions = "Agrega la clave manual en tu app autenticadora y escribe el código.";

  return (
    <View style={verificationStyles.container}>
      <View style={verificationStyles.content}>
        <Text accessibilityRole="header" style={verificationStyles.heading}>Activar 2FA</Text>
        <Text style={verificationStyles.body}>{instructions}</Text>

        {loading || enrollError || (isEnrollment && qr) ? (
          <View style={styles.enrollment}>
            {loading ? (
              <ActivityIndicator accessibilityLabel="Preparando la verificación" color="#5E30A5" />
            ) : enrollError ? (
              <>
                <Text accessibilityLiveRegion="polite" style={verificationStyles.error}>{enrollError}</Text>
                {onRetry ? <OnboardingSkipButton label="Reintentar" onPress={onRetry} /> : null}
              </>
            ) : qr}
          </View>
        ) : null}

        {isEnrollment && secret ? (
          <View style={verificationStyles.field}>
            <Text style={verificationStyles.caption}>Clave manual</Text>
            <View style={verificationStyles.fieldFrame}>
              <Text selectable style={verificationStyles.fieldInput}>{secret}</Text>
            </View>
          </View>
        ) : null}

        <View style={verificationStyles.field}>
          <Text style={verificationStyles.caption}>Código de 6 dígitos</Text>
          <View style={verificationStyles.fieldFrame}>
            <TextInput
              accessibilityLabel="Código de 6 dígitos"
              value={code}
              onChangeText={(value) => setCode(value.replace(/\D/g, "").slice(0, 6))}
              style={verificationStyles.fieldInput}
              keyboardType="number-pad"
              autoComplete="one-time-code"
              placeholder="123456"
              placeholderTextColor="#9CA3AF"
              editable={factorReady && !loading && !submitting}
            />
          </View>
          {verifyError ? <Text accessibilityLiveRegion="polite" style={verificationStyles.error}>{verifyError}</Text> : null}
        </View>
      </View>

      <View style={styles.actions}>
        <View style={styles.action}>
          <OnboardingPrimaryButton label="Cancelar" tone="neutral" disabled={submitting} onPress={onCancel} />
        </View>
        <View style={styles.action}>
          <OnboardingPrimaryButton
            label={submitting ? "Verificando…" : "Confirmar"}
            disabled={!canSubmit}
            onPress={() => onVerify(code)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  enrollment: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    padding: 16,
  },
  actions: { flexDirection: "row", gap: 12, marginTop: "auto" },
  action: { flex: 1 },
});
