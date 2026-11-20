import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import AuthStartLayout, { AuthStartCard, AuthStartError, authColors, authText } from "./AuthStartLayout";

const providers = [
  { id: "google", label: "Google", icon: require("../assets/google.png"), size: 18 },
  { id: "facebook", label: "Facebook", icon: require("../assets/facebook.png"), size: 21 },
  { id: "apple", label: "Apple", icon: require("../assets/apple.png"), size: 20 },
  { id: "twitter", label: "X", icon: require("../assets/x.png"), size: 18 },
  { id: "discord", label: "Discord", icon: require("../assets/discord.png"), size: 18 },
] as const;

type Props = {
  error?: string;
  loading: boolean;
  appleEnabled: boolean;
  onEmail: () => void;
  onOAuth: (provider: (typeof providers)[number]["id"]) => void;
};

export default function WelcomeStepBlock({ error, loading, appleEnabled, onEmail, onOAuth }: Props) {
  return (
    <AuthStartLayout centered>
      <AuthStartCard>
        <AuthStartError message={error} />
        <View style={styles.content}>
          <View>
            <Text accessibilityRole="header" style={styles.title}>Elige como continuar...</Text>
            <Text style={styles.subtitle}>
              Si ya tienes cuenta, elige una opción y entrarás automaticamente.
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={onEmail}
            style={({ pressed }) => [styles.emailButton, pressed && styles.pressed]}
          >
            <Image source={require("../assets/mail.png")} style={styles.mailIcon} />
            <Text style={styles.emailLabel}>Continuar con correo</Text>
          </Pressable>

          <View style={styles.divider}>
            <Image source={require("../assets/welcome-divider.png")} style={styles.dividerLine} resizeMode="stretch" />
            <Text style={styles.dividerLabel}>O</Text>
            <Image source={require("../assets/welcome-divider.png")} style={[styles.dividerLine, styles.flipped]} resizeMode="stretch" />
          </View>

          <ScrollView
            horizontal
            contentContainerStyle={styles.providers}
            showsHorizontalScrollIndicator={false}
          >
            {providers.filter(({ id }) => id !== "apple" || appleEnabled).map(({ id, label, icon, size }) => (
              <Pressable
                key={id}
                accessibilityRole="button"
                accessibilityLabel={`Continuar con ${label}`}
                disabled={loading}
                onPress={() => onOAuth(id)}
                style={({ pressed }) => [
                  styles.provider,
                  loading && styles.disabled,
                  pressed && styles.pressed,
                ]}
              >
                <Image source={icon} style={{ width: size, height: size }} />
              </Pressable>
            ))}
          </ScrollView>

          <Text style={styles.registrationCopy}>
            Si eres nuevo, te ayudaremos a{" "}
            <Text accessibilityRole="link" onPress={onEmail} style={styles.registrationLink}>
              crear tu cuenta.
            </Text>
          </Text>
        </View>
      </AuthStartCard>
    </AuthStartLayout>
  );
}

const styles = StyleSheet.create({
  content: { gap: 16 },
  title: {
    ...authText.normal,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    color: authColors.purple,
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: { ...authText.small, textAlign: "center", color: authColors.muted },
  emailButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    backgroundColor: authColors.yellow,
    borderRadius: 8,
    elevation: 2,
  },
  mailIcon: { width: 24, height: 24 },
  emailLabel: { ...authText.normal, fontSize: 16, lineHeight: 24, fontWeight: "600", color: authColors.white },
  divider: { flexDirection: "row", alignItems: "center", gap: 12 },
  dividerLine: { flex: 1, height: 1 },
  flipped: { transform: [{ scaleX: -1 }] },
  dividerLabel: { ...authText.caption, fontWeight: "600", color: authColors.secondary },
  providers: { flexGrow: 1, justifyContent: "center", gap: 12, paddingVertical: 4 },
  provider: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: authColors.border,
    borderRadius: 12,
    backgroundColor: authColors.white,
    elevation: 2,
  },
  disabled: { opacity: 0.6 },
  pressed: { transform: [{ scale: 0.98 }] },
  registrationCopy: { ...authText.small, paddingTop: 8, color: authColors.muted, textAlign: "center" },
  registrationLink: { fontWeight: "700", color: authColors.purple },
});
