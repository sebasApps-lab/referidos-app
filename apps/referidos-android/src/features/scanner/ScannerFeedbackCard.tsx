import React from "react";
import { StyleSheet, Text, View } from "react-native";

type FeedbackTone = "info" | "success" | "redeemed" | "error";

export type ScannerFeedback = {
  message: string;
  tone: FeedbackTone;
  result?: {
    status: string;
    code: string;
    promotion?: string;
    client?: string;
    business?: string;
    time?: { label: string; value: string };
  };
};

const colors: Record<FeedbackTone, { backgroundColor: string; borderColor: string; color: string }> = {
  info: { backgroundColor: "#FAF8FF", borderColor: "#E9E2F7", color: "#5B496F" },
  success: { backgroundColor: "#ECFDF5", borderColor: "#A7F3D0", color: "#047857" },
  redeemed: { backgroundColor: "#F0F9FF", borderColor: "#BAE6FD", color: "#0369A1" },
  error: { backgroundColor: "#FEF2F2", borderColor: "#FECACA", color: "#B91C1C" },
};

export default function ScannerFeedbackCard({ feedback }: { feedback: ScannerFeedback | null }) {
  if (!feedback) return null;
  const { result, message, tone } = feedback;
  const { color, ...boxColors } = colors[tone];

  return (
    <View style={styles.container}>
      <View style={[styles.notice, boxColors]}>
        <Text accessibilityLiveRegion="polite" style={[styles.meta, { color }]}>{message}</Text>
      </View>
      {result ? (
        <View style={styles.card}>
          <View style={styles.statusRow}>
            <Text style={styles.meta}>Estado</Text>
            <Text style={[styles.badge, boxColors, { color }]}>{result.status}</Text>
          </View>
          {result.promotion ? <Text style={styles.title}>{result.promotion}</Text> : null}
          {result.client ? <Text style={styles.meta}>Cliente: {result.client}</Text> : null}
          {result.business ? <Text style={styles.meta}>Negocio: {result.business}</Text> : null}
          {result.time ? <Text style={styles.meta}>{result.time.label}: {result.time.value}</Text> : null}
          <Text numberOfLines={2} selectable style={styles.meta}>{result.code}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  notice: { borderWidth: 1, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 16 },
  card: { borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, gap: 6, elevation: 1 },
  statusRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 },
  badge: { borderWidth: 1, borderRadius: 30, paddingHorizontal: 12, paddingVertical: 4, fontSize: 11, fontWeight: "600" },
  title: { color: "#2F1A55", fontSize: 14, fontWeight: "600" },
  meta: { color: "#64748B", fontSize: 12, lineHeight: 18 },
});
