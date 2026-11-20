import React, { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";

export type ScannerHistoryProps = {
  rows: Record<string, unknown>[];
  loading: boolean;
  onRefresh: () => void;
  error: string;
};

export default function ScannerHistory({ rows, loading, onRefresh, error }: ScannerHistoryProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={() => setExpanded((value) => !value)}
        style={styles.heading}
      >
        <Text style={styles.title}>Códigos recientes</Text>
        <Text importantForAccessibility="no" style={styles.icon}>{expanded ? "−" : "+"}</Text>
      </Pressable>
      {expanded ? (
        <View style={styles.content}>
          <Pressable accessibilityRole="button" disabled={loading} onPress={onRefresh} style={styles.refresh}>
            <Text style={styles.action}>Recargar</Text>
          </Pressable>
          {loading ? <ActivityIndicator color="#5E30A5" accessibilityLabel="Cargando códigos recientes" /> : null}
          {!loading && error ? <Text accessibilityLiveRegion="polite" style={styles.meta}>{error}</Text> : null}
          {!loading && !error && rows.length === 0 ? <Text style={styles.meta}>No hay códigos recientes.</Text> : null}
          {rows.map((row, index) => (
            <View key={String(readFirst(row, ["id"], index))} style={styles.item}>
              <Text numberOfLines={2} style={styles.title}>{String(readFirst(row, ["code", "codigo"], "Sin código"))}</Text>
              <Text style={styles.meta}>{String(readFirst(row, ["status", "estado"], "Sin estado"))}</Text>
              <Text style={styles.meta}>{formatDateTime(readFirst(row, ["created_at", "updated_at"], null))}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF", borderRadius: 16 },
  heading: { minHeight: 48, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  content: { paddingHorizontal: 16, paddingBottom: 16, gap: 8 },
  item: { paddingVertical: 8, borderTopWidth: 1, borderColor: "#F3EEFF", gap: 3 },
  refresh: { minHeight: 44, justifyContent: "center", alignSelf: "flex-end", paddingHorizontal: 8 },
  title: { color: "#2F1A55", fontSize: 14, fontWeight: "600" },
  icon: { color: "#5E30A5", fontSize: 20 },
  action: { color: "#5E30A5", fontSize: 13, fontWeight: "600" },
  meta: { color: "#64748B", fontSize: 12, lineHeight: 18 },
});
