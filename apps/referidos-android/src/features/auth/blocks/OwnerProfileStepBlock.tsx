import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AUTH_ROLES, formatBirthdateInput, getUserProfileStatus, normalizeUserName } from "@referidos/domain";
import { authText } from "./AuthStartLayout";
import {
  OnboardingInput,
  OnboardingLabel,
  OnboardingPrimaryButton,
  OnboardingSkipButton,
  OnboardingSubtitle,
  onboardingColors,
} from "./OnboardingFormLayout";

const GENDER_OPTIONS = [
  { value: "femenino", label: "Femenino" },
  { value: "masculino", label: "Masculino" },
  { value: "no_binario", label: "No-binario" },
  { value: "no_especificar", label: "Prefiero no especificar" },
];

type Props = {
  nombre: string;
  apellido: string;
  genero: string;
  fechaNacimiento: string;
  role?: string | null;
  loading: boolean;
  onNombreChange: (value: string) => void;
  onApellidoChange: (value: string) => void;
  onGeneroChange: (value: string) => void;
  onFechaNacimientoChange: (value: string) => void;
  onSubmit: () => void;
  onSkip?: () => void;
};

export default function OwnerProfileStepBlock({
  nombre,
  apellido,
  genero,
  fechaNacimiento,
  role,
  loading,
  onNombreChange,
  onApellidoChange,
  onGeneroChange,
  onFechaNacimientoChange,
  onSubmit,
  onSkip,
}: Props) {
  const isClient = role === AUTH_ROLES.CLIENTE;
  const selectedGender = genero || "no_especificar";
  const { birthStatus, canSubmit } = getUserProfileStatus({
    nombre,
    apellido,
    genero: selectedGender,
    fechaNacimiento,
    minAge: isClient ? 16 : 18,
  });

  return (
    <View style={styles.root}>
      <OnboardingSubtitle>
        {isClient ? "Empieza por personalizar tu experiencia en la app." : "Eres quien administrará el negocio en la app."}
      </OnboardingSubtitle>

      <View style={styles.fields}>
        <View style={styles.field}>
          <OnboardingLabel>Nombre(s)</OnboardingLabel>
          <OnboardingInput
            accessibilityLabel="Nombre(s)"
            autoCapitalize="words"
            autoComplete="given-name"
            editable={!loading}
            maxLength={26}
            value={nombre}
            onChangeText={(text) => onNombreChange(normalizeUserName(text))}
          />
        </View>
        <View style={styles.field}>
          <OnboardingLabel>Apellido(s)</OnboardingLabel>
          <OnboardingInput
            accessibilityLabel="Apellido(s)"
            autoCapitalize="words"
            autoComplete="family-name"
            editable={!loading}
            maxLength={26}
            value={apellido}
            onChangeText={(text) => onApellidoChange(normalizeUserName(text))}
          />
        </View>
        <View style={styles.field}>
          <OnboardingLabel>¿Cuándo naciste?</OnboardingLabel>
          <OnboardingInput
            accessibilityLabel="¿Cuándo naciste?"
            editable={!loading}
            keyboardType="number-pad"
            maxLength={10}
            placeholder="DD/MM/AAAA"
            value={formatBirthdateInput(fechaNacimiento)}
            onChangeText={(text) => onFechaNacimientoChange(formatBirthdateInput(text))}
          />
          {birthStatus.isValid && birthStatus.isUnderage && (
            <Text accessibilityLiveRegion="polite" style={styles.ageError}>
              {isClient
                ? "Debes tener al menos 16 años para usar la app."
                : "Tienes que ser mayor de edad para ser el administrador de un negocio"}
            </Text>
          )}
        </View>

        <View style={styles.genderField}>
          <OnboardingLabel>¿Con qué género te identificas?</OnboardingLabel>
          <View style={styles.options} accessibilityRole="radiogroup">
            {GENDER_OPTIONS.map(({ value, label }) => {
              const selected = selectedGender === value;
              return (
                <Pressable
                  key={value}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: selected, disabled: loading }}
                  disabled={loading}
                  onPress={() => onGeneroChange(value)}
                  style={[styles.option, selected && styles.selectedOption]}
                >
                  <Text style={[styles.optionLabel, selected && styles.selectedLabel]}>{label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <OnboardingPrimaryButton label="Continuar" disabled={loading || !canSubmit} onPress={onSubmit} />
        {isClient && onSkip && <OnboardingSkipButton onPress={onSkip} disabled={loading} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flexGrow: 1, paddingBottom: 16 },
  fields: { gap: 24 },
  field: { gap: 4 },
  genderField: { gap: 8 },
  options: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  option: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 1, borderColor: "#D1D5DC" },
  selectedOption: { borderColor: onboardingColors.purple, backgroundColor: onboardingColors.lavender },
  optionLabel: { ...authText.caption, color: "#4A5565" },
  selectedLabel: { color: onboardingColors.purple },
  ageError: { ...authText.caption, color: onboardingColors.error },
  footer: { marginTop: "auto", paddingTop: 40 },
});
