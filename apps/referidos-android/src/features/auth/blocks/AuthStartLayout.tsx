import React, { type ReactNode } from "react";
import { Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const authColors = {
  purple: "#5E30A5",
  yellow: "#FFC21C",
  white: "#FFFFFF",
  muted: "#6A7282",
  secondary: "#99A1AF",
  border: "#D1D5DC",
  error: "#FB2C36",
};

export const authText = StyleSheet.create({
  normal: { includeFontPadding: false },
  small: { includeFontPadding: false, fontSize: 14, lineHeight: 20 },
  caption: { includeFontPadding: false, fontSize: 12, lineHeight: 16 },
});

type AuthStartLayoutProps = {
  centered?: boolean;
  onBack?: () => void;
  children: ReactNode;
};

export default function AuthStartLayout({ centered = false, onBack, children }: AuthStartLayoutProps) {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={styles.viewport}>
        <ScrollView
          contentContainerStyle={[styles.content, centered && styles.centered]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text accessibilityRole="header" style={[styles.brand, centered && styles.centeredBrand]}>
            Cuentanos mas sobre ti
          </Text>
          {children}
          {onBack && (
            <Pressable accessibilityRole="button" accessibilityLabel="Volver" onPress={onBack} style={styles.back}>
              <Image source={require("../assets/back.png")} style={styles.backIcon} />
            </Pressable>
          )}
        </ScrollView>
        <Text style={styles.version}>ALPHA v0.0.1</Text>
      </View>
    </SafeAreaView>
  );
}

export function AuthStartCard({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

export function AuthStartError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <Text accessibilityLiveRegion="polite" style={styles.error}>
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: authColors.purple },
  viewport: { flex: 1 },
  content: { alignItems: "center", padding: 24, flexGrow: 1 },
  centered: { justifyContent: "center", paddingBottom: 112 },
  brand: {
    ...authText.normal,
    color: authColors.white,
    textAlign: "center",
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
    marginTop: 48,
    marginBottom: 16,
  },
  centeredBrand: { marginTop: 0, marginBottom: 24 },
  back: {
    position: "absolute",
    top: 272,
    left: 8,
    zIndex: 1,
    width: 36,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: authColors.white,
    elevation: 2,
  },
  backIcon: { width: 27, height: 27 },
  card: {
    width: "100%",
    maxWidth: 384,
    padding: 24,
    backgroundColor: authColors.white,
    borderRadius: 16,
    elevation: 10,
  },
  error: {
    ...authText.small,
    color: authColors.error,
    marginBottom: 12,
    textAlign: "center",
  },
  version: {
    ...authText.caption,
    position: "absolute",
    right: 8,
    bottom: 8,
    color: authColors.white,
    opacity: 0.7,
  },
});
