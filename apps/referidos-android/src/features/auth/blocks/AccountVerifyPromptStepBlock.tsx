import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  onVerifyNow: () => void;
  onSkip: () => void;
};

export default function AccountVerifyPromptStepBlock({ onVerifyNow, onSkip }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.helper}>Es opcional, pero te permitira aprovechar mucho mas la app.</Text>
      <View style={styles.promptCard}>
        <Text style={styles.promptTitle}>Al verificar tu cuenta podras:</Text>
        <Text style={styles.promptBullet}>Publicar hasta 2 promociones adicionales</Text>
        <Text style={styles.promptBullet}>Tener mayor visibilidad frente a usuarios</Text>
        <Text style={styles.promptBullet}>Mostrar tu perfil como cuenta verificada</Text>
      </View>
      <Text style={styles.promptMeta}>Te tomara menos de 3 minutos.</Text>

      <Pressable onPress={onVerifyNow} style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Verificar ahora</Text>
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
  promptCard: {
    borderWidth: 1,
    borderColor: "#DDD6FE",
    backgroundColor: "#F8F6FF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 6,
  },
  promptTitle: {
    color: "#4C1D95",
    fontWeight: "700",
    fontSize: 13,
  },
  promptBullet: {
    color: "#5B21B6",
    fontSize: 12,
  },
  promptMeta: {
    color: "#6B7280",
    fontSize: 12,
    textAlign: "center",
  },
  primaryButton: {
    backgroundColor: "#6D28D9",
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
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

