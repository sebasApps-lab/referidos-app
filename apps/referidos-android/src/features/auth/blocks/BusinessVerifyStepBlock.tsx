import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  ruc: string;
  telefono: string;
  loading?: boolean;
  onRucChange: (value: string) => void;
  onTelefonoChange: (value: string) => void;
  onContinue: () => void;
  onSkip: () => void;
};

export default function BusinessVerifyStepBlock({
  ruc,
  telefono,
  loading = false,
  onRucChange,
  onTelefonoChange,
  onContinue,
  onSkip,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>RUC</Text>
      <TextInput
        value={ruc}
        onChangeText={onRucChange}
        style={styles.input}
        keyboardType="number-pad"
      />

      <Text style={styles.label}>Telefono</Text>
      <TextInput
        value={telefono}
        onChangeText={onTelefonoChange}
        style={styles.input}
        keyboardType="phone-pad"
      />

      <Pressable onPress={onContinue} disabled={loading} style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}>
        <Text style={styles.primaryButtonText}>{loading ? "Cargando..." : "Continuar"}</Text>
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

