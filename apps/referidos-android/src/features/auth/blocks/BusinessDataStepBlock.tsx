import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { getBusinessCategoryPath } from "../../../../../referidos-app/src/auth/constants/businessCategories.js";
import { normalizeBusinessName } from "../../../../../referidos-app/src/auth/utils/businessDataUtils.js";
import { authText } from "./AuthStartLayout";
import {
  OnboardingInput,
  OnboardingLabel,
  OnboardingPrimaryButton,
  OnboardingSubtitle,
  onboardingColors,
} from "./OnboardingFormLayout";

type Props = {
  nombreNegocio: string;
  categoriaNegocio: string;
  loading: boolean;
  onNombreNegocioChange: (value: string) => void;
  onOpenCategory: () => void;
  onSubmit: () => void;
};

export default function BusinessDataStepBlock({
  nombreNegocio,
  categoriaNegocio,
  loading,
  onNombreNegocioChange,
  onOpenCategory,
  onSubmit,
}: Props) {
  const { parentLabel, subLabel } = getBusinessCategoryPath(categoriaNegocio);

  return (
    <View style={styles.root}>
      <OnboardingSubtitle>Así te verán tus clientes</OnboardingSubtitle>

      <View style={styles.fields}>
        <View style={styles.nameField}>
          <OnboardingLabel>Nombre negocio</OnboardingLabel>
          <OnboardingInput
            accessibilityLabel="Nombre negocio"
            autoCapitalize="words"
            editable={!loading}
            maxLength={38}
            value={nombreNegocio}
            onChangeText={(text) => onNombreNegocioChange(normalizeBusinessName(text))}
          />
        </View>

        <View style={styles.categoryField}>
          <OnboardingLabel>Categoría</OnboardingLabel>
          <CategoryField value={parentLabel || categoriaNegocio} disabled={loading} onPress={onOpenCategory} />
          {subLabel ? <CategoryField value={subLabel} disabled={loading} onPress={onOpenCategory} /> : null}
        </View>
      </View>

      <View style={styles.footer}>
        <OnboardingPrimaryButton label="Continuar" onPress={onSubmit} disabled={loading} />
      </View>
    </View>
  );
}

function CategoryField({ value, disabled, onPress }: { value: string; disabled: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={value ? `Editar categoría ${value}` : "Elige una categoría"}
      disabled={disabled}
      onPress={onPress}
      style={styles.category}
    >
      <Text style={[styles.categoryLabel, !value && styles.placeholder]}>{value || "Elige una categoría"}</Text>
      <View style={styles.pencilWrap}>
        <Image source={require("../assets/pencil.png")} style={styles.pencil} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flexGrow: 1, paddingBottom: 16 },
  fields: { gap: 24 },
  nameField: { gap: 4 },
  categoryField: { gap: 8 },
  category: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 38,
    paddingLeft: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: onboardingColors.border,
    borderRadius: 8,
  },
  categoryLabel: { ...authText.small, flex: 1, color: "#101828" },
  placeholder: { color: onboardingColors.secondary },
  pencilWrap: { width: 40, alignItems: "center", borderLeftWidth: 1, borderColor: "#000000" },
  pencil: { width: 16, height: 16 },
  footer: { marginTop: "auto", paddingTop: 16 },
});
