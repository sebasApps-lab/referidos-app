import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { OnboardingPrimaryButton, OnboardingSkipButton } from "./OnboardingFormLayout";
import { verificationStyles } from "./verificationStyles";

const businessBenefits = [
  "Publicar hasta 2 promociones adicionales",
  "Tener mayor visibilidad frente a los usuarios",
  "Mostrar tu perfil como cuenta verificada",
];

const clientBenefits = [
  "Canjeo ilimitado de promociones disponibles",
  "Acumulación de puntos para mejorar beneficios (Ligas)",
  "Soporte prioritario",
];

type Props = {
  mode?: "cliente" | "negocio";
  loading?: boolean;
  onVerifyNow: () => void;
  onSkip: () => void;
};

export default function AccountVerifyPromptStepBlock({
  mode = "negocio",
  loading = false,
  onVerifyNow,
  onSkip,
}: Props) {
  const benefits = mode === "negocio" ? businessBenefits : clientBenefits;

  return (
    <View style={verificationStyles.container}>
      <View style={verificationStyles.content}>
        <Text accessibilityRole="header" style={[verificationStyles.heading, styles.heading]}>
          Lleva tu cuenta al siguiente nivel
        </Text>
        <Text style={verificationStyles.body}>Es opcional, pero te permitirá aprovechar mucho más la app.</Text>

        <View style={styles.benefits}>
          <Text style={styles.legend}>Al verificar tu cuenta podrás:</Text>
          {benefits.map((benefit) => <Text key={benefit} style={verificationStyles.body}>{benefit}</Text>)}
        </View>

        <View style={styles.duration}>
          <Text style={[verificationStyles.body, verificationStyles.center]}>Te tomará menos de 3 minutos</Text>
        </View>
      </View>

      <View style={verificationStyles.footer}>
        <Text style={[verificationStyles.caption, verificationStyles.center]}>
          Puedes hacerlo más tarde. Las cuentas verificadas obtienen mayor visibilidad.
        </Text>
        <OnboardingPrimaryButton label="Verificar ahora" disabled={loading} onPress={onVerifyNow} />
        <OnboardingSkipButton label="Más tarde" disabled={loading} onPress={onSkip} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { textAlign: "left", marginTop: 12 },
  benefits: {
    marginHorizontal: -8,
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#E9E2F7",
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 32,
    gap: 32,
  },
  legend: {
    position: "absolute",
    top: -12,
    left: 16,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF",
    color: "#6B7280",
    fontSize: 16,
    fontWeight: "600",
  },
  duration: { flexGrow: 1, justifyContent: "center", minHeight: 56 },
});
