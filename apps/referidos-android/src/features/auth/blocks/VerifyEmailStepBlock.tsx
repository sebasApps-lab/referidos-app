import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  emailText: string;
  emailConfirmed: boolean;
  loading?: boolean;
  onSendEmail: () => void;
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
  return (
    <View style={styles.container}>
      <Text style={styles.helper}>Correo actual: {emailText}</Text>

      {emailConfirmed ? (
        <Text style={styles.okText}>Tu correo ya fue confirmado.</Text>
      ) : (
        <Pressable onPress={onSendEmail} disabled={loading} style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}>
          <Text style={styles.primaryButtonText}>{loading ? "Cargando..." : "Enviar correo"}</Text>
        </Pressable>
      )}

      <Pressable onPress={onRefresh} style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>Revisar estado</Text>
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

