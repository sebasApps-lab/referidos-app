import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { OnboardingPrimaryButton, OnboardingSkipButton } from "./OnboardingFormLayout";
import { verificationStyles } from "./verificationStyles";

type Props = {
  emailText: string;
  emailConfirmed: boolean;
  loading?: boolean;
  onSendEmail: () => void | boolean | Promise<void | boolean>;
  onRefresh: () => void;
  onSkip: () => void;
};

export default function VerifyEmailStepBlock({
  emailText,
  emailConfirmed,
  loading = false,
  onSendEmail,
  onRefresh,
  onSkip,
}: Props) {
  const [sentEmail, setSentEmail] = useState("");
  const sent = Boolean(sentEmail && sentEmail === emailText);

  async function sendEmail() {
    if (loading) return;
    const success = await onSendEmail();
    if (success === true) setSentEmail(emailText);
  }

  return (
    <View style={verificationStyles.container}>
      <View style={verificationStyles.content}>
        <Text style={[verificationStyles.body, verificationStyles.center]}>
          Esto es opcional, pero te ayudará a sacarle más provecho a la app.
        </Text>
        {emailConfirmed ? (
          <View style={verificationStyles.statusCard}>
            <Text accessibilityLiveRegion="polite" style={verificationStyles.ok}>Correo verificado</Text>
          </View>
        ) : (
          <View style={styles.emailContent}>
            <View style={verificationStyles.field}>
              <Text style={verificationStyles.caption}>Verifica tu correo electrónico.</Text>
              <View style={verificationStyles.fieldFrame}>
                <Text selectable style={verificationStyles.fieldInput}>{emailText || "Sin correo"}</Text>
              </View>
            </View>
            <Text accessibilityLiveRegion="polite" style={[verificationStyles.caption, verificationStyles.center]}>
              {sent
                ? "Revisa tu bandeja de entrada o spam y sigue las instrucciones del correo."
                : "Te enviaremos un correo para que puedas verificar tu dirección."}
            </Text>
            <Pressable accessibilityRole="button" onPress={sendEmail} disabled={loading} style={styles.emailAction}>
              <Text style={styles.emailActionText}>
                {loading ? "Procesando…" : sent ? "Reenviar correo" : "Enviar correo"}
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      <View style={verificationStyles.footer}>
        <OnboardingPrimaryButton label={emailConfirmed ? "Listo" : "Revisar estado"} disabled={loading} onPress={onRefresh} />
        <OnboardingSkipButton label="Saltar" disabled={loading} onPress={onSkip} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emailContent: { gap: 16 },
  emailAction: { minHeight: 44, justifyContent: "center", alignItems: "center" },
  emailActionText: { color: "#5E30A5", fontSize: 14, lineHeight: 20, fontWeight: "600" },
});
