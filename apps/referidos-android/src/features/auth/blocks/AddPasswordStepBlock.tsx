import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { OnboardingPrimaryButton, OnboardingSkipButton } from "./OnboardingFormLayout";
import { verificationStyles } from "./verificationStyles";

type PasswordFieldsProps = {
  newPassword: string;
  confirmPassword: string;
  loading?: boolean;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSavePassword: () => void;
};

type Props = PasswordFieldsProps & {
  hasPassword: boolean;
  onContinue: () => void;
  onSkip: () => void;
};

export default function AddPasswordStepBlock({ hasPassword, onContinue, onSkip, ...fields }: Props) {
  return (
    <View style={verificationStyles.container}>
      <View style={verificationStyles.content}>
        <Text accessibilityRole="header" style={verificationStyles.heading}>Elige tu contraseña</Text>
        {hasPassword ? (
          <View style={styles.saved}>
            <Text accessibilityLiveRegion="polite" style={verificationStyles.ok}>Contraseña guardada</Text>
            <Image source={require("../assets/check.png")} style={styles.check} />
          </View>
        ) : <PasswordFields {...fields} />}
      </View>

      <View style={verificationStyles.footer}>
        <OnboardingPrimaryButton label="Continuar" disabled={!hasPassword || fields.loading} onPress={onContinue} />
        <OnboardingSkipButton label="Verificar más tarde" disabled={fields.loading} onPress={onSkip} />
      </View>
    </View>
  );
}

export function PasswordFields({
  newPassword,
  confirmPassword,
  loading = false,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSavePassword,
}: PasswordFieldsProps) {
  const meetsLength = newPassword.length >= 8;
  const meetsCharacters = /\d/.test(newPassword) && /[^A-Za-z0-9]/.test(newPassword);
  const passwordsMatch = Boolean(newPassword) && newPassword === confirmPassword;

  return (
    <View style={styles.fields}>
      <Text style={verificationStyles.body}>Asegura tu cuenta al agregar una contraseña.</Text>
      <PasswordInput label="Contraseña" value={newPassword} disabled={loading} onChangeText={onNewPasswordChange} />
      {newPassword ? (
        <View style={verificationStyles.field}>
          <Text style={[verificationStyles.caption, meetsLength && styles.met]}>Al menos 8 caracteres</Text>
          <Text style={[verificationStyles.caption, meetsCharacters && styles.met]}>Incluye un símbolo y un número</Text>
        </View>
      ) : null}
      <PasswordInput label="Confirmar contraseña" value={confirmPassword} disabled={loading} onChangeText={onConfirmPasswordChange} />
      {confirmPassword ? (
        <Text style={passwordsMatch ? styles.met : verificationStyles.error}>
          {passwordsMatch ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}
        </Text>
      ) : null}
      <OnboardingPrimaryButton
        label={loading ? "Guardando…" : "Guardar contraseña"}
        disabled={loading || !meetsLength || !meetsCharacters || !passwordsMatch}
        onPress={onSavePassword}
      />
    </View>
  );
}

function PasswordInput({ label, value, disabled, onChangeText }: {
  label: string;
  value: string;
  disabled: boolean;
  onChangeText: (value: string) => void;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={verificationStyles.field}>
      <Text style={verificationStyles.caption}>{label}</Text>
      <View style={verificationStyles.fieldFrame}>
        <TextInput
          accessibilityLabel={label}
          value={value}
          onChangeText={onChangeText}
          style={verificationStyles.fieldInput}
          secureTextEntry={!visible}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="new-password"
          editable={!disabled}
        />
        {value ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={visible ? `Ocultar ${label.toLowerCase()}` : `Mostrar ${label.toLowerCase()}`}
            onPress={() => setVisible(!visible)}
            style={styles.toggle}
          >
            <Image source={visible ? require("../assets/eye-off.png") : require("../assets/eye.png")} style={styles.eye} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fields: { gap: 12 },
  saved: { ...verificationStyles.fieldFrame, paddingHorizontal: 12, justifyContent: "space-between" },
  toggle: { width: 44, minHeight: 44, alignItems: "center", justifyContent: "center" },
  eye: { width: 16, height: 16, tintColor: "#6B7280" },
  check: { width: 16, height: 16, tintColor: "#059669" },
  met: { color: "#047857", fontSize: 12, lineHeight: 16 },
});
