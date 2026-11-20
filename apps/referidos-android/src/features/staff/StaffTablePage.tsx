import React, { type ReactNode } from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import StaffScreenScaffold from "./StaffScreenScaffold";
import { staffIcons } from "./staffNavigation";

export default function StaffTablePage({ title, subtitle, description, searchPlaceholder, query, onChangeQuery, filters, loading, error, onRefresh, children }: {
  title: string;
  subtitle: string;
  description: string;
  searchPlaceholder: string;
  query: string;
  onChangeQuery: (value: string) => void;
  filters: ReactNode;
  loading: boolean;
  error: string;
  onRefresh?: () => void;
  children: ReactNode;
}) {
  const { width } = useWindowDimensions();

  return (
    <StaffScreenScaffold title={title} subtitle={subtitle} onRefresh={onRefresh}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View>
          <Text accessibilityRole="header" style={styles.title}>{title}</Text>
          <Text style={tableText.metadata}>{description}</Text>
        </View>
        <View style={[styles.filters, width >= 768 && styles.wideFilters]}>
          <View style={styles.searchControl}>
            <Image source={staffIcons.search} style={styles.searchIcon} />
            <TextInput
              accessibilityLabel={searchPlaceholder}
              value={query}
              onChangeText={onChangeQuery}
              placeholder={searchPlaceholder}
              placeholderTextColor="#64748B"
              style={styles.searchInput}
            />
          </View>
          {filters}
        </View>
        {error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
        {loading ? <BlockSkeleton lines={6} compact /> : children}
      </ScrollView>
    </StaffScreenScaffold>
  );
}

export function StaffTableDetails({ title, caption, onClose, children }: { title: string; caption: string; onClose: () => void; children: ReactNode }) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable accessibilityRole="button" accessibilityLabel="Cerrar detalle" onPress={onClose} style={StyleSheet.absoluteFill} />
        <View accessibilityViewIsModal style={[styles.drawer, { paddingTop: insets.top, paddingRight: insets.right, paddingBottom: insets.bottom }]}>
          <ScrollView contentContainerStyle={styles.drawerContent}>
            <View style={styles.drawerHeader}>
              <View style={styles.drawerTitles}>
                <Text style={styles.caption}>{caption}</Text>
                <Text accessibilityRole="header" style={styles.drawerTitle}>{title}</Text>
              </View>
              <Pressable accessibilityRole="button" onPress={onClose} style={tableText.action}>
                <Text style={tableText.actionLabel}>Cerrar</Text>
              </Pressable>
            </View>
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export const tableText = StyleSheet.create({
  name: { color: "#334155", fontSize: 14, lineHeight: 20, fontWeight: "600", includeFontPadding: false },
  metadata: { color: "#64748B", fontSize: 12, lineHeight: 16, includeFontPadding: false },
  action: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF" },
  actionLabel: { color: "#64748B", fontSize: 12, fontWeight: "600" },
  actionDisabled: { opacity: 0.55 },
  badges: { flexDirection: "row", gap: 8 },
});

const styles = StyleSheet.create({
  content: { gap: 20, paddingBottom: 48 },
  title: { color: "#2F1A55", fontSize: 18, lineHeight: 28, fontWeight: "600", includeFontPadding: false },
  filters: { borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF", borderRadius: 16, gap: 12, padding: 16, elevation: 1 },
  wideFilters: { flexDirection: "row", flexWrap: "wrap" },
  searchControl: { flexGrow: 2, minHeight: 40, flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#F8FAFC", borderColor: "#E2E8F0", borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 },
  searchIcon: { width: 14, height: 14, tintColor: "#64748B" },
  searchInput: { flex: 1, minWidth: 140, padding: 0, fontSize: 14, color: "#475569", fontWeight: "600", includeFontPadding: false },
  error: { padding: 12, borderRadius: 12, borderWidth: 1, borderColor: "#FECACA", backgroundColor: "#FFF1F2", color: "#B91C1C", fontSize: 12 },
  overlay: { flex: 1, alignItems: "flex-end", backgroundColor: "#00000066" },
  drawer: { flex: 1, width: "100%", maxWidth: 448, backgroundColor: "#FFFFFF", elevation: 10 },
  drawerContent: { padding: 24, gap: 16 },
  drawerHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 },
  drawerTitles: { flexShrink: 1, gap: 2 },
  caption: { color: "#64748B", fontSize: 12, letterSpacing: 1, textTransform: "uppercase" },
  drawerTitle: { color: "#2F1A55", fontSize: 20, fontWeight: "700" },
});
