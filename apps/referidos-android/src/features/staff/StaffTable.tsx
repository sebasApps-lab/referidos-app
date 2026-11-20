import React, { useState, type ReactNode } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export type StaffTableColumn<Row> = {
  key: string;
  label: string;
  width: number;
  align?: "right";
  render: (row: Row) => ReactNode;
};

export default function StaffTable<Row>({ columns, rows, getKey, emptyMessage }: {
  columns: StaffTableColumn<Row>[];
  rows: Row[];
  getKey: (row: Row) => string;
  emptyMessage: string;
}) {
  const [availableWidth, setAvailableWidth] = useState(0);
  const rowWidth = columns.reduce((total, column) => total + column.width, 0);
  const grow = Math.max(0, availableWidth - rowWidth);

  return (
    <View style={styles.frame} onLayout={(event) => setAvailableWidth(event.nativeEvent.layout.width - 2)}>
      <ScrollView horizontal nestedScrollEnabled keyboardShouldPersistTaps="handled">
        <View style={{ width: rowWidth + grow }}>
          <View style={[styles.row, styles.header]}>
            {columns.map((column, index) => (
              <Text
                key={column.key}
                accessibilityRole="header"
                style={[styles.cell, styles.label, { width: column.width + (index === 0 ? grow : 0) }, column.align === "right" && styles.rightLabel]}
              >
                {column.label}
              </Text>
            ))}
          </View>
          {rows.length === 0 ? <Text style={styles.empty}>{emptyMessage}</Text> : rows.map((row) => (
            <View key={getKey(row)} style={[styles.row, styles.dataRow]}>
              {columns.map((column, index) => (
                <View
                  key={column.key}
                  style={[styles.cell, { width: column.width + (index === 0 ? grow : 0) }, column.align === "right" && styles.rightCell]}
                >
                  {column.render(row)}
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const tones = {
  purple: { backgroundColor: "#F0EBFF", color: "#5E30A5" },
  positive: { backgroundColor: "#DCFCE7", color: "#166534" },
  warning: { backgroundColor: "#FEF3C7", color: "#92400E" },
  danger: { backgroundColor: "#FEE2E2", color: "#B91C1C" },
  neutral: { backgroundColor: "#F1F5F9", color: "#475569" },
};

export function StaffTableBadge({ value, tone }: { value: string; tone: keyof typeof tones }) {
  return <Text numberOfLines={1} style={[styles.badge, tones[tone]]}>{value}</Text>;
}

const styles = StyleSheet.create({
  frame: { borderRadius: 16, borderWidth: 1, borderColor: "#E9E2F7", overflow: "hidden", backgroundColor: "#FFFFFF", elevation: 1 },
  row: { flexDirection: "row", alignItems: "center" },
  header: { backgroundColor: "#F7F4FF" },
  dataRow: { borderTopWidth: 1, borderTopColor: "#F1ECFB" },
  cell: { paddingVertical: 12, paddingHorizontal: 16, gap: 3, justifyContent: "center" },
  label: { fontSize: 11, lineHeight: 16, fontWeight: "600", color: "#64748B", textTransform: "uppercase", letterSpacing: 0.5, includeFontPadding: false },
  rightLabel: { textAlign: "right" },
  rightCell: { alignItems: "flex-end" },
  empty: { textAlign: "center", paddingVertical: 24, paddingHorizontal: 16, fontSize: 12, color: "#64748B" },
  badge: { alignSelf: "flex-start", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2, fontSize: 12, fontWeight: "600", overflow: "hidden", includeFontPadding: false },
});
