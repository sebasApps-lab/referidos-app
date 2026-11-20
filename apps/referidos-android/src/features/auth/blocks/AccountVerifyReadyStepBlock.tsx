import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { OnboardingPrimaryButton, OnboardingSkipButton } from "./OnboardingFormLayout";
import { verificationStyles } from "./verificationStyles";

type Props = {
  isVerified: boolean;
  termsAccepted?: boolean;
  privacyAccepted?: boolean;
  loading?: boolean;
  onBackToVerify?: () => void;
  onEnter: (consent: { termsAccepted: true; privacyAccepted: true }) => void;
  onOpenTerms?: () => void;
  onOpenPrivacy?: () => void;
};

export default function AccountVerifyReadyStepBlock({
  isVerified,
  termsAccepted = false,
  privacyAccepted = false,
  loading = false,
  onBackToVerify,
  onEnter,
  onOpenTerms,
  onOpenPrivacy,
}: Props) {
  const [acceptTerms, setAcceptTerms] = useState(termsAccepted);
  const [acceptPrivacy, setAcceptPrivacy] = useState(privacyAccepted);
  const canEnter = acceptTerms && acceptPrivacy && !loading;

  return (
    <View style={verificationStyles.container}>
      <View style={verificationStyles.content}>
        <View style={[styles.badge, isVerified && styles.badgeVerified]}>
          <Image
            source={require("../assets/badge-check.png")}
            style={[styles.badgeIcon, isVerified && styles.badgeIconVerified]}
          />
        </View>
        <View style={verificationStyles.field}>
          <Text accessibilityRole="header" style={verificationStyles.heading}>
            {isVerified ? "Tu cuenta ha sido verificada" : "Tu cuenta aún no fue verificada"}
          </Text>
          <Text style={[verificationStyles.body, verificationStyles.center]}>
            {isVerified
              ? "Ahora podrás acceder a más beneficios y probar primero las nuevas funciones."
              : "Accederás a varios beneficios al verificar tu cuenta."}
          </Text>
        </View>

        {!isVerified && onBackToVerify ? (
          <Pressable accessibilityRole="button" disabled={loading} onPress={onBackToVerify}>
            <Text style={styles.verifyAgain}>Volver y Verificar</Text>
          </Pressable>
        ) : null}

        <View style={styles.consent}>
          <ConsentCheckbox
            label="Acepto que he leído y entiendo los términos y condiciones."
            checked={acceptTerms}
            disabled={loading}
            onPress={() => setAcceptTerms(!acceptTerms)}
          />
          {onOpenTerms ? <OnboardingSkipButton label="Leer términos y condiciones" onPress={onOpenTerms} /> : null}
          <ConsentCheckbox
            label="Acepto que mis datos serán recolectados y procesados según las políticas de privacidad."
            checked={acceptPrivacy}
            disabled={loading}
            onPress={() => setAcceptPrivacy(!acceptPrivacy)}
          />
          {onOpenPrivacy ? <OnboardingSkipButton label="Leer políticas de privacidad" onPress={onOpenPrivacy} /> : null}
          <Text style={verificationStyles.caption}>Al continuar acepto que los datos proporcionados son correctos.</Text>
        </View>
      </View>

      <View style={verificationStyles.footer}>
        <OnboardingPrimaryButton
          label={loading ? "Guardando…" : "Entrar"}
          disabled={!canEnter}
          disabledColor="#AE99D1"
          onPress={() => {
            if (canEnter) onEnter({ termsAccepted: true, privacyAccepted: true });
          }}
        />
      </View>
    </View>
  );
}

function ConsentCheckbox({ label, checked, disabled, onPress }: {
  label: string;
  checked: boolean;
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={styles.consentRow}
    >
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked ? <Image source={require("../assets/check.png")} style={styles.check} /> : null}
      </View>
      <Text style={[verificationStyles.caption, styles.checkboxLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  badge: { width: 64, height: 64, alignSelf: "center", alignItems: "center", justifyContent: "center", borderRadius: 12, backgroundColor: "#FFF7ED" },
  badgeVerified: { backgroundColor: "#ECFDF5" },
  badgeIcon: { width: 48, height: 48, tintColor: "#EA580C" },
  badgeIconVerified: { tintColor: "#10B981" },
  consent: { gap: 8, marginTop: 8 },
  verifyAgain: { color: "#F97316", fontSize: 14, fontWeight: "600" },
  consentRow: { flexDirection: "row", alignItems: "flex-start", gap: 12, paddingVertical: 3 },
  checkbox: { width: 14, height: 14, backgroundColor: "#FFFFFF", borderRadius: 3, borderWidth: 1, borderColor: "#D1D5DB", alignItems: "center", justifyContent: "center" },
  checked: { backgroundColor: "#5E30A5", borderColor: "#5E30A5" },
  check: { width: 14, height: 14, tintColor: "#FFFFFF" },
  checkboxLabel: { flex: 1 },
});
