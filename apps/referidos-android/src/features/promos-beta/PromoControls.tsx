import React from "react";
import { Pressable, StyleSheet, Text, View, type TextStyle, type ViewStyle } from "react-native";

export const palette = {
  bg: "#F6F3FA",
  paper: "#FFFFFF",
  ink: "#231639",
  muted: "#675974",
  line: "#E4DAEE",
  purple: "#562C95",
  lavender: "#F0E6FB",
  green: "#E3F690",
  danger: "#A82B47",
};

export function PromoButton({ label, onPress, kind = "primary", disabled = false, style }: {
  label: string;
  onPress: () => void;
  kind?: "primary" | "secondary" | "text" | "danger";
  disabled?: boolean;
  style?: ViewStyle;
}) {
  const labelColor: Record<typeof kind, TextStyle["color"]> = {
    primary: palette.paper,
    secondary: palette.purple,
    text: palette.purple,
    danger: palette.danger,
  };
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, styles[kind], style, (disabled || pressed) && styles.dimmed]}
    >
      <Text style={[styles.buttonLabel, { color: labelColor[kind] }]}>{label}</Text>
    </Pressable>
  );
}

export function BrandMark() {
  return (
    <View style={styles.mark} importantForAccessibility="no-hide-descendants">
      <Text style={styles.markText}>✦</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 48, alignItems: "center", justifyContent: "center", paddingVertical: 10, paddingHorizontal: 12, borderRadius: 13 },
  primary: { backgroundColor: palette.purple },
  secondary: { backgroundColor: palette.lavender },
  text: { backgroundColor: "transparent" },
  danger: { backgroundColor: "#FCEEF1" },
  dimmed: { opacity: 0.55 },
  buttonLabel: { textAlign: "center", fontSize: 14, fontWeight: "700" },
  mark: { width: 36, height: 36, borderRadius: 12, backgroundColor: palette.purple, alignItems: "center", justifyContent: "center" },
  markText: { color: palette.green, fontSize: 24, lineHeight: 28, includeFontPadding: false },
});
