import React, { type ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = { title: string; subtitle?: string; right?: ReactNode; children?: ReactNode };

export default function StaffSectionCard({ title, subtitle, right, children }: Props) {
  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <View style={styles.titles}>
          <Text accessibilityRole="header" style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {right ? <View style={styles.action}>{right}</View> : null}
      </View>
      {children ? <View style={styles.body}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { backgroundColor: "#FFFFFF", borderRadius: 20, borderWidth: 1, borderColor: "#E9E2F7", padding: 16, gap: 16, elevation: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  titles: { flex: 1, gap: 4 },
  title: { color: "#2F1A55", fontSize: 16, lineHeight: 22, fontWeight: "600", includeFontPadding: false },
  subtitle: { color: "#64748B", fontSize: 12, lineHeight: 17, includeFontPadding: false },
  action: { alignItems: "flex-end", maxWidth: "45%" },
  body: { gap: 8 },
});
