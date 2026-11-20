import React, { type ReactNode } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from "react-native";
import { staffIcons } from "@features/staff/staffNavigation";

const searchIcon = require("../../cliente/inicio/assets/search.png");

export function DocumentSearch({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <View style={styles.search}>
      <Image source={searchIcon} style={styles.searchIcon} />
      <TextInput accessibilityLabel="Buscar documento" value={value} onChangeText={onChange}
        autoCapitalize="none" autoCorrect={false} placeholder={placeholder} returnKeyType="search"
        placeholderTextColor="#94A3B8" style={styles.searchInput} />
      {!!value && <Pressable accessibilityRole="button" accessibilityLabel="Limpiar búsqueda" hitSlop={6} onPress={() => onChange("")}>
        <Text style={styles.clear}>×</Text>
      </Pressable>}
    </View>
  );
}

export function DocumentSplit({ index, reader, onReaderLayout }: { index: ReactNode; reader: ReactNode; onReaderLayout: (offset: number) => void }) {
  const { width } = useWindowDimensions();
  const wide = width >= 1100;
  return (
    <View style={[styles.split, wide && styles.splitWide]}>
      <View style={wide && styles.sidebar}>{index}</View>
      <View style={wide && styles.reader} onLayout={(event) => onReaderLayout(event.nativeEvent.layout.y)}>{reader}</View>
    </View>
  );
}

export function DocumentIndexEntry({ title, path, active, onPress, detail }: {
  title: string; path: string; active: boolean; onPress: () => void; detail?: ReactNode;
}) {
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ selected: active }} onPress={onPress}
      style={[styles.entry, active && styles.entryActive]}>
      <Text style={[styles.entryTitle, active && styles.entryTitleActive]}>{title}</Text>
      <View style={styles.pathRow}>
        <Image source={staffIcons.file} style={styles.fileIcon} />
        <Text style={styles.entryPath} numberOfLines={2}>{path}</Text>
      </View>
      {detail}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  search: { flexDirection: "row", alignItems: "center", gap: 8, borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 12, paddingHorizontal: 12 },
  searchIcon: { width: 14, height: 14, tintColor: "#94A3B8" },
  searchInput: { flex: 1, minHeight: 38, paddingVertical: 6, fontSize: 12, color: "#334155" },
  clear: { fontSize: 22, color: "#5E30A5" },
  split: { gap: 16 },
  splitWide: { flexDirection: "row", alignItems: "flex-start" },
  sidebar: { width: 320 },
  reader: { flex: 1, minWidth: 0 },
  entry: { gap: 4, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderRadius: 12, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF" },
  entryActive: { borderColor: "#5E30A5", backgroundColor: "#F4EEFF" },
  entryTitle: { fontSize: 14, lineHeight: 20, fontWeight: "600", color: "#334155" },
  entryTitleActive: { color: "#5E30A5" },
  pathRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  fileIcon: { width: 12, height: 12, tintColor: "#64748B" },
  entryPath: { flex: 1, fontSize: 11, color: "#64748B" },
});
