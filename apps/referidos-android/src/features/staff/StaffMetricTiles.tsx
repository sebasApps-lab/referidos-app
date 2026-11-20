import React, { useState } from "react";
import { Image, StyleSheet, Text, useWindowDimensions, View, type ImageSourcePropType } from "react-native";

type Metric = { label: string; value: number; icon: ImageSourcePropType };

export default function StaffMetricTiles({ items }: { items: Metric[] }) {
  const { width } = useWindowDimensions();
  const [contentWidth, setContentWidth] = useState(0);
  const columns = width >= 1024 ? 4 : width >= 640 ? 2 : 1;
  const tileWidth = contentWidth > 0 ? (contentWidth - 16 * (columns - 1)) / columns : "100%";

  return (
    <View style={styles.grid} onLayout={(event) => setContentWidth(event.nativeEvent.layout.width)}>
      {items.map(({ label, value, icon }) => (
        <View key={label} style={[styles.tile, { width: tileWidth }]}>
          <View style={styles.iconPlate}>
            <Image source={icon} style={styles.icon} />
          </View>
          <Text style={styles.value}>{value.toLocaleString("es-EC")}</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  tile: { minHeight: 120, borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 16, backgroundColor: "#FFFFFF", padding: 16, elevation: 1 },
  iconPlate: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: "#F7F4FF" },
  icon: { width: 18, height: 18, tintColor: "#5E30A5" },
  value: { marginTop: 12, color: "#2F1A55", fontSize: 24, fontWeight: "700", lineHeight: 32, includeFontPadding: false },
  label: { color: "#64748B", fontSize: 12, lineHeight: 16, includeFontPadding: false },
});
