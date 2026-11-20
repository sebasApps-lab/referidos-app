import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AUTH_STEPS } from "@referidos/domain";
import type { useAuthEngine } from "../hooks/useAuthEngine";
import AuthStartLayout, { AuthStartCard, AuthStartError, authColors, authText } from "./AuthStartLayout";

type EmailMode = "login" | "register";
type PasswordFieldName = "password" | "confirmation";

type Props = {
  mode: EmailMode;
  engine: ReturnType<typeof useAuthEngine>;
  onBack: () => void;
  onRecover: () => void;
};

const tabs = [
  { mode: "login", label: "Iniciar sesión", widthRatio: { login: 1.07, register: 0.893 } },
  { mode: "register", label: "Registrarse", widthRatio: { login: 0.93, register: 1.107 } },
] as const;

export default function EmailAuthStepBlock({ mode, engine, onBack, onRecover }: Props) {
  const [focusedField, setFocusedField] = useState<PasswordFieldName | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { password, passwordConfirm, loading } = engine;
  const isRegister = mode === "register";
  const hasMinLength = password.length >= 8;
  const hasNumberAndSymbol = /\d/.test(password) && /[^A-Za-z0-9]/.test(password);
  const passwordsMatch = passwordConfirm.length > 0 && password === passwordConfirm;
  const invalidRegistration = isRegister && !(hasMinLength && hasNumberAndSymbol && passwordsMatch);
  const submitDisabled = loading || invalidRegistration;
  const submit = isRegister ? engine.submitRegister : engine.submitLogin;
  const passwordBlurred = focusedField !== "password" && password.length > 0;
  const confirmationBlurred = focusedField !== "confirmation";

  function selectMode(nextMode: EmailMode) {
    engine.setError("");
    engine.setStep(nextMode === "register" ? AUTH_STEPS.EMAIL_REGISTER : AUTH_STEPS.EMAIL_LOGIN);
  }

  function passwordFocusProps(field: PasswordFieldName) {
    if (!isRegister) return {};
    return {
      onFocus: () => setFocusedField(field),
      onBlur: () => setFocusedField((current) => (current === field ? null : current)),
    };
  }

  return (
    <AuthStartLayout onBack={onBack}>
      <AuthStartCard>
        <AuthStartError message={engine.error} />
        {engine.info ? (
          <Text accessibilityLiveRegion="polite" style={styles.info}>{engine.info}</Text>
        ) : null}
        {engine.canRetryRegistrationValidation && (
          <Pressable
            accessibilityRole="button"
            disabled={loading}
            onPress={engine.retryRegistrationValidation}
          >
            <Text style={styles.retry}>Reintentar validación del registro</Text>
          </Pressable>
        )}

        <View style={styles.tabs} accessibilityRole="tablist">
          {tabs.map((tab) => {
            const active = tab.mode === mode;
            return (
              <Pressable
                key={tab.mode}
                accessibilityRole="tab"
                accessibilityState={{ selected: active, disabled: loading }}
                disabled={loading}
                onPress={() => selectMode(tab.mode)}
                style={[styles.tab, { flex: tab.widthRatio[mode] }, active && styles.activeTab]}
              >
                <Text style={[styles.tabLabel, active && styles.activeTabLabel]}>{tab.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.fieldLabel}>Email</Text>
        <TextInput
          accessibilityLabel="Email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          editable={!loading}
          keyboardType="email-address"
          onChangeText={engine.setEmail}
          placeholder="Ingrese su email..."
          placeholderTextColor="#808080"
          style={styles.input}
          value={engine.email}
        />

        <View style={styles.fieldGap}>
          <PasswordField
            label="Contrasena"
            placeholder="Ingrese su contrasena..."
            autoComplete={isRegister ? "new-password" : "current-password"}
            value={password}
            visible={showPassword}
            loading={loading}
            onChangeText={engine.setPassword}
            onToggle={() => setShowPassword((visible) => !visible)}
            {...passwordFocusProps("password")}
          />
          {isRegister && (focusedField === "password" || password.length > 0) && (
            <View style={styles.rules}>
              <PasswordRule valid={hasMinLength} blurred={passwordBlurred}>
                Al menos 8 caracteres
              </PasswordRule>
              <PasswordRule valid={hasNumberAndSymbol} blurred={passwordBlurred}>
                Incluye un simbolo y un numero
              </PasswordRule>
            </View>
          )}
        </View>

        {isRegister && (
          <View style={styles.fieldGap}>
            <PasswordField
              label="Confirmar contrasena"
              placeholder="Confirma tu contrasena..."
              autoComplete="new-password"
              value={passwordConfirm}
              visible={showConfirmation}
              loading={loading}
              onChangeText={engine.setPasswordConfirm}
              onToggle={() => setShowConfirmation((visible) => !visible)}
              {...passwordFocusProps("confirmation")}
            />
            {hasMinLength && hasNumberAndSymbol && passwordConfirm.length > 0 && (
              <View style={styles.rules}>
                <PasswordRule valid={passwordsMatch} blurred={confirmationBlurred}>
                  Las contrasenas deben coincidir
                </PasswordRule>
              </View>
            )}
          </View>
        )}

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ busy: loading, disabled: submitDisabled }}
          disabled={submitDisabled}
          onPress={submit}
          style={({ pressed }) => [styles.submit, submitDisabled && styles.disabled, pressed && styles.pressed]}
        >
          <Text style={styles.submitLabel}>
            {isRegister ? "REGISTRARSE" : loading ? "Ingresando..." : "INGRESAR"}
          </Text>
        </Pressable>

        {isRegister ? (
          <Text style={styles.footer}>Avanza para elegir el tipo de cuenta</Text>
        ) : (
          <Text accessibilityRole="link" onPress={onRecover} style={[styles.footer, styles.recovery]}>
            OLVIDASTE TU CONTRASENA?
          </Text>
        )}
      </AuthStartCard>
    </AuthStartLayout>
  );
}

type PasswordFieldProps = {
  label: string;
  placeholder: string;
  autoComplete: "new-password" | "current-password";
  value: string;
  visible: boolean;
  loading: boolean;
  onChangeText: (value: string) => void;
  onToggle: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

function PasswordField({
  label, placeholder, autoComplete, value, visible, loading, onChangeText, onToggle, onFocus, onBlur,
}: PasswordFieldProps) {
  return (
    <>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View>
        <TextInput
          accessibilityLabel={label}
          autoCapitalize="none"
          autoComplete={autoComplete}
          autoCorrect={false}
          editable={!loading}
          onBlur={onBlur}
          onChangeText={onChangeText}
          onFocus={onFocus}
          placeholder={placeholder}
          placeholderTextColor="#808080"
          secureTextEntry={!visible}
          style={[styles.input, styles.passwordInput]}
          value={value}
        />
        {value.length > 0 && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={visible ? "Ocultar contrasena" : "Mostrar contrasena"}
            onPress={onToggle}
            hitSlop={4}
            style={styles.passwordToggle}
          >
            <Image
              source={visible ? require("../assets/eye-off.png") : require("../assets/eye.png")}
              style={styles.eyeIcon}
            />
          </Pressable>
        )}
      </View>
    </>
  );
}

function PasswordRule({ valid, blurred, children }: { valid: boolean; blurred: boolean; children: string }) {
  if (valid && blurred) return null;

  const color = valid ? "#009966" : blurred ? authColors.error : authColors.secondary;
  return (
    <View style={styles.rule}>
      <Image
        source={valid ? require("../assets/check.png") : require("../assets/cross.png")}
        style={[styles.ruleIcon, { tintColor: color }]}
      />
      <Text style={[authText.caption, { color }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    borderRadius: 12,
    backgroundColor: "#F7F5FD",
    marginTop: -8,
    marginHorizontal: -10,
    marginBottom: 20,
    gap: 12,
    paddingVertical: 3,
  },
  tab: { minHeight: 48, paddingHorizontal: 4, justifyContent: "center", borderRadius: 12 },
  activeTab: { backgroundColor: authColors.purple, elevation: 2 },
  tabLabel: {
    ...authText.normal,
    color: authColors.purple,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  activeTabLabel: { color: authColors.white },
  fieldLabel: { ...authText.small, lineHeight: 24, color: "#364153", marginBottom: 4 },
  fieldGap: { marginTop: 8 },
  input: {
    ...authText.small,
    minHeight: 38,
    borderRadius: 8,
    borderColor: authColors.border,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 0,
    textAlignVertical: "center",
    color: "#000000",
  },
  passwordInput: { paddingRight: 40 },
  passwordToggle: {
    position: "absolute",
    right: 8,
    top: 0,
    bottom: 0,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  eyeIcon: { width: 16, height: 16, tintColor: authColors.secondary },
  rules: { gap: 8, marginTop: 4, paddingLeft: 4 },
  rule: { flexDirection: "row", alignItems: "center", gap: 8 },
  ruleIcon: { width: 12, height: 12 },
  submit: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: authColors.yellow,
    elevation: 2,
  },
  submitLabel: {
    ...authText.normal,
    color: authColors.white,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  disabled: { backgroundColor: "#FFE08D", elevation: 1 },
  pressed: { transform: [{ scale: 0.98 }] },
  footer: { ...authText.small, color: authColors.muted, marginTop: 16, textAlign: "center" },
  recovery: { color: authColors.secondary, textDecorationLine: "underline" },
  info: { ...authText.small, color: authColors.muted, marginBottom: 12, textAlign: "center" },
  retry: { ...authText.small, color: authColors.purple, marginBottom: 12, textAlign: "center", textDecorationLine: "underline" },
});
