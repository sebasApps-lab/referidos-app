import React, { useState, type ReactNode } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { authColors, authText, AuthStartError } from "./AuthStartLayout";

export const onboardingColors = {
  ...authColors,
  border: "#E5E7EB",
  dark: "#364153",
  green: "#10B981",
  lavender: "#F5F0FF",
};

type Props = {
  title: string;
  progress?: 1 | 2 | 3;
  contentInset?: number;
  onBack?: () => void;
  error?: string;
  children: ReactNode;
};

export default function OnboardingFormLayout({ title, progress, contentInset = 24, onBack, error, children }: Props) {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const contentHeight = height - insets.top - insets.bottom;

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.viewport}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        <Text accessibilityRole="header" style={styles.title}>{title}</Text>
        {progress && (
          <View style={styles.progress} accessibilityLabel={`Paso ${progress} de 3`}>
            {[1, 2, 3].map((step) => (
              <View key={step} style={[styles.segment, step === progress && styles.currentSegment]} />
            ))}
          </View>
        )}
        <View style={[styles.card, { height: Math.max(180, contentHeight * 0.8) }]}>
          <ScrollView
            contentContainerStyle={[styles.cardContent, { paddingHorizontal: contentInset }]}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            <AuthStartError message={error} />
            {children}
          </ScrollView>
        </View>
        {onBack && (
          <Pressable accessibilityRole="button" accessibilityLabel="Volver" onPress={onBack} style={styles.back}>
            <Image source={require("../assets/back.png")} style={styles.backIcon} />
          </Pressable>
        )}
      </ScrollView>
      <Text style={styles.version}>ALPHA v0.0.1</Text>
    </SafeAreaView>
  );
}

export function OnboardingSubtitle({ children }: { children: ReactNode }) {
  return <Text style={styles.subtitle}>{children}</Text>;
}

export function OnboardingLabel({ children }: { children: ReactNode }) {
  return <Text style={styles.label}>{children}</Text>;
}

export function OnboardingInput({ style, onFocus, onBlur, ...input }: TextInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      {...input}
      placeholderTextColor={onboardingColors.secondary}
      style={[styles.input, focused && styles.inputFocused, style]}
      onFocus={(event) => {
        setFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setFocused(false);
        onBlur?.(event);
      }}
    />
  );
}

type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function OnboardingPrimaryButton({ label, onPress, disabled, tone = "purple", disabledColor }: ButtonProps & {
  tone?: "purple" | "green" | "neutral";
  disabledColor?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(disabled) }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        tone === "green" && styles.greenButton,
        tone === "neutral" && styles.neutralButton,
        disabled && tone !== "neutral" && {
          backgroundColor: disabledColor || (tone === "green" ? "#70D5B5" : "#9E83C5"),
          elevation: 0,
        },
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.buttonText, tone === "neutral" && styles.neutralText]}>{label}</Text>
    </Pressable>
  );
}

export function OnboardingSkipButton({ label = "Omitir por ahora", onPress, disabled }: Omit<ButtonProps, "label"> & {
  label?: string;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} disabled={disabled} style={styles.skip}>
      <Text style={styles.skipText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: onboardingColors.purple },
  viewport: { minHeight: "100%", flexGrow: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  title: {
    ...authText.normal,
    color: onboardingColors.white,
    textAlign: "center",
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
    marginBottom: 16,
  },
  progress: { alignSelf: "center", width: "100%", maxWidth: 384, flexDirection: "row", paddingHorizontal: 8, gap: 8, marginBottom: 16 },
  segment: { flex: 1, height: 4, opacity: 0.35, borderRadius: 2, backgroundColor: onboardingColors.white },
  currentSegment: { opacity: 1 },
  card: { width: "100%", maxWidth: 384, marginTop: 8, borderRadius: 16, backgroundColor: onboardingColors.white, elevation: 10, overflow: "hidden" },
  cardContent: { flexGrow: 1, paddingVertical: 16 },
  back: {
    position: "absolute",
    zIndex: 1,
    left: 8,
    top: 272,
    width: 36,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: onboardingColors.white,
    elevation: 3,
  },
  backIcon: { width: 27, height: 27 },
  version: { ...authText.caption, position: "absolute", bottom: 8, right: 8, color: onboardingColors.white, opacity: 0.7 },
  subtitle: { ...authText.small, color: "#4A5565", textAlign: "center", marginTop: 12, marginBottom: 24 },
  label: { ...authText.caption, color: onboardingColors.muted, marginLeft: 4 },
  input: {
    ...authText.small,
    minHeight: 38,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: onboardingColors.border,
    color: "#101828",
    paddingHorizontal: 12,
    paddingVertical: 0,
    textAlignVertical: "center",
  },
  inputFocused: { borderColor: onboardingColors.purple },
  button: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: onboardingColors.purple,
    paddingVertical: 10,
    paddingHorizontal: 12,
    elevation: 2,
  },
  greenButton: { backgroundColor: onboardingColors.green },
  neutralButton: { backgroundColor: onboardingColors.border },
  buttonText: { ...authText.normal, color: onboardingColors.white, fontSize: 16, lineHeight: 24, fontWeight: "600", textAlign: "center" },
  neutralText: { color: onboardingColors.muted },
  pressed: { transform: [{ scale: 0.98 }] },
  skip: { minHeight: 32, alignItems: "center", justifyContent: "center", marginTop: 2 },
  skipText: { ...authText.small, color: onboardingColors.muted, textAlign: "center", fontWeight: "500" },
});
