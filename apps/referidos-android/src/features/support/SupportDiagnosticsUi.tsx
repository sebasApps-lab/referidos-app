import React, { type ReactNode } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SupportButton } from "./SupportTicketUi";

export function SupportSearchBar({ value, onChange, placeholder, loading, onRefresh }: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  loading: boolean;
  onRefresh: () => void;
}) {
  return (
    <View style={styles.searchCard}>
      <TextInput
        accessibilityLabel={placeholder}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#64748B"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        style={styles.input}
      />
      <SupportButton label={loading ? "Cargando…" : "Recargar"} disabled={loading} onPress={onRefresh} />
    </View>
  );
}

export function SupportDiagnosticItem({ title, badge, children, onPress, selected }: {
  title: string;
  badge?: ReactNode;
  children: ReactNode;
  onPress?: () => void;
  selected?: boolean;
}) {
  const body = (
    <>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{title}</Text>
        {badge}
      </View>
      {children}
    </>
  );
  if (!onPress) return <View style={styles.card}>{body}</View>;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.card, selected && styles.selected, pressed && styles.pressed]}
    >
      {body}
    </Pressable>
  );
}

export const supportDetailStyles = StyleSheet.create({
  content: { gap: 16, paddingBottom: 24 },
  headerStack: { gap: 16 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 },
  heading: { color: "#2F1A55", fontSize: 16, fontWeight: "700" },
  meta: { color: "#64748B", fontSize: 12, lineHeight: 17 },
  description: { color: "#475569", fontSize: 13, lineHeight: 19 },
  row: { flexDirection: "row", gap: 8, alignItems: "center", flexWrap: "wrap" },
});

const styles = StyleSheet.create({
  searchCard: { padding: 14, gap: 10, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF", borderRadius: 24 },
  input: { minHeight: 44, flex: 1, paddingHorizontal: 12, borderWidth: 1, borderColor: "#E7E1FF", borderRadius: 12, color: "#2F1A55", fontSize: 13 },
  card: { backgroundColor: "#FCFBFF", borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 16, padding: 14, gap: 5 },
  selected: { borderColor: "#5E30A5", backgroundColor: "#F0EBFF" },
  pressed: { backgroundColor: "#F5F0FF" },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 },
  title: { flex: 1, color: "#2F1A55", fontSize: 14, fontWeight: "700", lineHeight: 20 },
});
