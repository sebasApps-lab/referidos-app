import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { validateRegistrationCode } from "@referidos/domain";
import AuthStartLayout, { authColors, authText } from "./AuthStartLayout";

export type AuthProfileRole = "cliente" | "negocio";

type Props = {
  error?: string;
  submitting?: boolean;
  onBack: () => void;
  onSubmit: (role: AuthProfileRole) => void | Promise<unknown>;
  onValidateNegocioCode: (code: string) => Promise<{ ok: boolean; error?: string }>;
  onRequestCode?: () => void;
};

const roles: ReadonlyArray<{ id: AuthProfileRole; title: string; description: string }> = [
  {
    id: "cliente",
    title: "Cliente",
    description: "Gana y canjea promociones escaneando codigos.",
  },
  {
    id: "negocio",
    title: "Negocio",
    description: "Administra promos y canjes para tus sucursales.",
  },
];

function isPartialCode(code: string) {
  if ("REF-".startsWith(code)) return true;
  return code.startsWith("REF-") && /^[A-HJ-KM-NP-Z2-9-]*$/.test(code.slice(4));
}

export default function RoleSelectStepBlock({
  error,
  submitting = false,
  onBack,
  onSubmit,
  onValidateNegocioCode,
  onRequestCode,
}: Props) {
  const { width } = useWindowDimensions();
  const [selected, setSelected] = useState<AuthProfileRole | null>(null);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [code, setCode] = useState("");
  const [codeFocused, setCodeFocused] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [pending, setPending] = useState<"submit" | "code" | null>(null);
  const requestInFlight = useRef(false);
  const entrance = useRef(new Animated.Value(0)).current;
  const busy = submitting || pending !== null;

  useEffect(() => {
    const animation = Animated.timing(entrance, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [entrance]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      if (!submitting && !requestInFlight.current) onBack();
      return true;
    });
    return () => subscription.remove();
  }, [onBack, submitting]);

  function goBack() {
    if (!submitting && !requestInFlight.current) onBack();
  }

  function selectRole(role: AuthProfileRole) {
    if (busy || requestInFlight.current || (selected === "negocio" && role !== "negocio")) return;
    setSubmitError("");
    if (role === "negocio") {
      setSelected(null);
      setCode("");
      setCodeError("");
      setShowCodeModal(true);
      return;
    }
    setSelected(role);
  }

  async function registerRole() {
    if (!selected || busy || requestInFlight.current) return;
    requestInFlight.current = true;
    setPending("submit");
    setSubmitError("");
    try {
      await onSubmit(selected);
    } catch {
      setSubmitError("No se pudo guardar el tipo de cuenta");
    } finally {
      requestInFlight.current = false;
      setPending(null);
    }
  }

  async function confirmCode() {
    if (busy || requestInFlight.current) return;
    const normalizedCode = code.trim().toUpperCase();
    if (!validateRegistrationCode(normalizedCode)) {
      setCodeError("Codigo de registro invalido");
      return;
    }

    requestInFlight.current = true;
    setPending("code");
    setCodeError("");
    try {
      const result = await onValidateNegocioCode(normalizedCode);
      if (!result.ok) {
        setCodeError(result.error || "No se pudo validar el codigo");
        return;
      }
      setShowCodeModal(false);
      setSelected("negocio");
    } catch {
      setCodeError("No se pudo validar el codigo");
    } finally {
      requestInFlight.current = false;
      setPending(null);
    }
  }

  function closeCodeModal() {
    if (!requestInFlight.current) setShowCodeModal(false);
  }

  const registerDisabled = !selected || busy;
  const checkingCode = pending === "code";
  const roleError = submitError || error;
  const translateY = entrance.interpolate({ inputRange: [0, 1], outputRange: [16, 0] });

  return (
    <>
      <AuthStartLayout onBack={goBack}>
        <Animated.View style={[styles.panel, { opacity: entrance, transform: [{ translateY }] }]}>
          {roleError ? (
            <Text accessibilityLiveRegion="polite" style={styles.roleError}>{roleError}</Text>
          ) : null}

          <View style={styles.heading}>
            <Text style={styles.eyebrow}>Tipo de cuenta</Text>
            <Text accessibilityRole="header" style={styles.title}>Como quieres continuar?</Text>
            <Text style={styles.subtitle}>Elige tu rol para entrar con la experiencia adecuada.</Text>
          </View>

          <View style={[styles.roles, width >= 768 && styles.rolesWide]}>
            {roles.map(({ id, title, description }) => {
              const active = id === selected;
              const lockedOut = selected === "negocio" && id !== "negocio";
              return (
                <Pressable
                  key={id}
                  accessibilityRole="radio"
                  accessibilityLabel={title}
                  accessibilityHint={description}
                  accessibilityState={{ checked: active, disabled: busy || lockedOut }}
                  disabled={busy || lockedOut}
                  onPress={() => selectRole(id)}
                  style={({ pressed }) => [
                    styles.role,
                    width >= 768 && styles.roleWide,
                    active && styles.activeRole,
                    lockedOut && styles.dimmedRole,
                    pressed && !active && styles.pressedRole,
                  ]}
                >
                  <View style={styles.roleText}>
                    <Text style={styles.roleTitle}>{title}</Text>
                    <Text style={styles.roleDescription}>{description}</Text>
                  </View>
                  <View style={[styles.radio, active && styles.activeRadio]} />
                </Pressable>
              );
            })}
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: registerDisabled, busy: pending === "submit" || submitting }}
            disabled={registerDisabled}
            onPress={() => void registerRole()}
            style={({ pressed }) => [
              styles.register,
              registerDisabled && styles.registerDisabled,
              pressed && styles.pressedRegister,
            ]}
          >
            <Text style={[styles.registerLabel, registerDisabled && styles.registerLabelDisabled]}>
              {pending === "submit" || submitting ? "Guardando..." : "Registrarse"}
            </Text>
          </Pressable>

          <Text style={styles.caption}>
            Pantalla de bienvenida. Selecciona tu rol y continua con la experiencia adecuada.
          </Text>
        </Animated.View>
      </AuthStartLayout>

      <Modal
        visible={showCodeModal}
        transparent
        animationType="fade"
        onRequestClose={closeCodeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard} accessibilityViewIsModal>
            <Text accessibilityRole="header" style={styles.modalTitle}>Codigo de registro</Text>
            <Text style={styles.modalSubtitle}>Solo necesario para negocios</Text>
            {codeError ? (
              <Text accessibilityLiveRegion="polite" style={styles.codeError}>{codeError}</Text>
            ) : null}
            <TextInput
              accessibilityLabel="Codigo de registro"
              autoCapitalize="characters"
              autoCorrect={false}
              autoFocus
              editable={!checkingCode}
              onChangeText={(value) => {
                setCode(value.toUpperCase());
                if (codeError) setCodeError("");
              }}
              onSubmitEditing={() => void confirmCode()}
              onFocus={() => setCodeFocused(true)}
              onBlur={() => setCodeFocused(false)}
              placeholder="REF-435526"
              placeholderTextColor={authColors.secondary}
              returnKeyType="go"
              style={[
                styles.codeInput,
                codeFocused && styles.focusedCodeInput,
                !isPartialCode(code) && styles.invalidCodeInput,
              ]}
              value={code}
            />
            {onRequestCode ? (
              <Text accessibilityRole="link" onPress={onRequestCode} style={styles.requestCode}>
                Solicitar codigo para negocio
              </Text>
            ) : null}
            <View style={styles.modalActions}>
              <Pressable
                accessibilityRole="button"
                disabled={checkingCode}
                onPress={closeCodeModal}
                style={[styles.cancelButton, checkingCode && styles.dimmedRole]}
              >
                <Text style={styles.cancelLabel}>Cancelar</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ disabled: checkingCode, busy: checkingCode }}
                disabled={checkingCode}
                onPress={() => void confirmCode()}
                style={[styles.confirmButton, checkingCode && styles.confirmButtonDisabled]}
              >
                <Text style={[styles.confirmLabel, checkingCode && styles.confirmLabelDisabled]}>
                  {checkingCode ? "Validando..." : "Continuar"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  panel: {
    width: "100%",
    maxWidth: 576,
    padding: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
    backgroundColor: "#663AAA",
    elevation: 6,
  },
  heading: { gap: 4, alignItems: "center" },
  eyebrow: {
    ...authText.small,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 3.5,
    color: "rgba(255, 255, 255, 0.60)",
  },
  title: {
    ...authText.normal,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
    textAlign: "center",
    color: authColors.white,
  },
  subtitle: { ...authText.small, textAlign: "center", color: "rgba(255, 255, 255, 0.60)" },
  roleError: { ...authText.small, textAlign: "center", color: "#FFA2A2", marginBottom: 12 },
  roles: { gap: 16, marginTop: 24 },
  rolesWide: { flexDirection: "row" },
  role: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
  },
  roleWide: { flex: 1 },
  activeRole: { borderColor: "rgba(255, 194, 28, 0.80)", backgroundColor: "rgba(255, 255, 255, 0.10)" },
  pressedRole: { backgroundColor: "rgba(255, 255, 255, 0.05)" },
  dimmedRole: { opacity: 0.6 },
  roleText: { flexShrink: 1 },
  roleTitle: { ...authText.normal, fontSize: 18, lineHeight: 28, fontWeight: "600", color: authColors.white },
  roleDescription: { ...authText.small, marginTop: 4, color: "rgba(255, 255, 255, 0.60)" },
  radio: { width: 14, height: 14, borderRadius: 7, borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.40)" },
  activeRadio: { borderColor: authColors.yellow, backgroundColor: authColors.yellow },
  register: {
    marginTop: 8,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: authColors.yellow,
    elevation: 2,
  },
  pressedRegister: { transform: [{ scale: 0.99 }] },
  registerDisabled: { backgroundColor: "rgba(255, 255, 255, 0.10)", elevation: 0 },
  registerLabel: { ...authText.normal, color: "#0F172A", fontSize: 16, lineHeight: 24, fontWeight: "600" },
  registerLabelDisabled: { color: "rgba(255, 255, 255, 0.60)" },
  caption: { ...authText.caption, marginTop: 16, textAlign: "center", color: "rgba(255, 255, 255, 0.50)" },
  modalOverlay: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.30)",
  },
  modalCard: {
    width: "100%",
    maxWidth: 384,
    padding: 24,
    borderRadius: 16,
    backgroundColor: authColors.white,
    elevation: 24,
  },
  modalTitle: {
    ...authText.normal,
    textAlign: "center",
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    color: authColors.purple,
    marginBottom: 8,
  },
  modalSubtitle: { ...authText.small, marginBottom: 12, color: "#4A5565", textAlign: "center" },
  codeError: { ...authText.caption, color: "#E7000B", textAlign: "center", marginBottom: 8 },
  codeInput: {
    ...authText.small,
    width: "100%",
    color: "#0F172A",
    borderColor: authColors.secondary,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    minHeight: 38,
    paddingVertical: 0,
    textAlignVertical: "center",
    textTransform: "uppercase",
    letterSpacing: 0.35,
  },
  focusedCodeInput: { borderColor: authColors.purple },
  invalidCodeInput: { borderColor: "#FB2C36", color: "#E7000B" },
  requestCode: { ...authText.caption, color: authColors.purple, textDecorationLine: "underline", marginTop: 8 },
  modalActions: { flexDirection: "row", gap: 12, marginTop: 16 },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: authColors.border,
    borderRadius: 8,
  },
  cancelLabel: { ...authText.normal, color: "#4A5565", fontSize: 16, fontWeight: "600", lineHeight: 24 },
  confirmButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: authColors.purple,
    elevation: 2,
  },
  confirmButtonDisabled: { backgroundColor: "#E5E7EB", elevation: 0 },
  confirmLabel: { ...authText.normal, color: authColors.white, fontSize: 16, fontWeight: "600", lineHeight: 24 },
  confirmLabelDisabled: { color: authColors.muted },
});
