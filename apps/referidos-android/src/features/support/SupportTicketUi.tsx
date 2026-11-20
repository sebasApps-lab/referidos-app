import React, { type ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Tone = "info" | "positive" | "warning" | "neutral";

export function supportStatusLabel(status: unknown) {
  const labels: Record<string, string> = {
    new: "Nuevo",
    starting: "Empezando",
    assigned: "Asignado",
    in_progress: "En progreso",
    waiting_user: "Esperando usuario",
    queued: "En cola",
    closing: "Cerrando",
    closed: "Resuelto",
    cancelled: "Cancelado",
  };
  const value = String(status || "").trim().toLowerCase();
  return labels[value] || value.replace(/_/g, " ") || "Sin estado";
}

export function supportChannelLabel(value: string) {
  const normalized = value.toLowerCase();
  if (normalized === "android" || normalized === "android_app") return "Android";
  if (normalized.includes("pwa")) return "PWA";
  if (normalized === "undetermined") return "Sin canal";
  return value.replace(/_/g, " ");
}

export function SupportBadge({ children, tone = "neutral" }: { children: string; tone?: Tone }) {
  return <Text style={[styles.badge, tones[tone]]}>{children}</Text>;
}

export function SupportButton({ label, onPress, kind = "outline", disabled = false, selected }: {
  label: string;
  onPress: () => void;
  kind?: "outline" | "primary";
  disabled?: boolean;
  selected?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled, selected }}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.button, kind === "primary" && styles.primary, disabled && styles.disabled, pressed && styles.pressed]}
    >
      <Text style={[styles.buttonText, kind !== "outline" && styles.filledText]}>{label}</Text>
    </Pressable>
  );
}

export function SupportNotice({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "warning" }) {
  return (
    <View style={[styles.notice, tone === "warning" && styles.warningNotice]}>
      <Text accessibilityLiveRegion="polite" style={[styles.noticeText, tone === "warning" && styles.warningText]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { overflow: "hidden", borderRadius: 16, paddingHorizontal: 8, paddingVertical: 4, fontSize: 10, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 },
  button: { minHeight: 44, alignItems: "center", justifyContent: "center", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 14, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E9E2F7" },
  primary: { backgroundColor: "#5E30A5", borderColor: "#5E30A5" },
  disabled: { opacity: 0.55 },
  pressed: { opacity: 0.7 },
  buttonText: { color: "#5E30A5", fontSize: 12, lineHeight: 17, textAlign: "center", fontWeight: "700" },
  filledText: { color: "#FFFFFF" },
  notice: { borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FAF8FF", borderRadius: 14, padding: 12 },
  noticeText: { color: "#5B466F", fontSize: 12, lineHeight: 18 },
  warningNotice: { borderColor: "#F5E1B5", backgroundColor: "#FFF9ED" },
  warningText: { color: "#794D05" },
});

const tones = StyleSheet.create({
  info: { color: "#0D4F9A", backgroundColor: "#EAF4FF" },
  positive: { color: "#17643D", backgroundColor: "#EAF7F0" },
  warning: { color: "#865100", backgroundColor: "#FFF7E6" },
  neutral: { color: "#5A4D6F", backgroundColor: "#F0EBFF" },
});
