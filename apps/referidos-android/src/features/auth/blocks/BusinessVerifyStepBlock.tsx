import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { COUNTRY_CODES, parsePhoneWithCountry, toStoragePhone } from "@referidos/domain";
import { OnboardingPrimaryButton, OnboardingSkipButton } from "./OnboardingFormLayout";
import { verificationStyles } from "./verificationStyles";

type Props = {
  ruc: string;
  telefono: string;
  loading?: boolean;
  onRucChange: (value: string) => void;
  onTelefonoChange: (value: string) => void;
  onContinue: () => void;
  onSkip: () => void;
};

export default function BusinessVerifyStepBlock({
  ruc,
  telefono,
  loading = false,
  onRucChange,
  onTelefonoChange,
  onContinue,
  onSkip,
}: Props) {
  const [showCountryOptions, setShowCountryOptions] = useState(false);
  const phone = parsePhoneWithCountry(telefono);

  return (
    <View style={verificationStyles.container}>
      <View style={verificationStyles.content}>
        <View style={verificationStyles.field}>
          <Text accessibilityRole="header" style={verificationStyles.heading}>Verifiquemos tu negocio</Text>
          <Text style={[verificationStyles.body, verificationStyles.center]}>
            Ayúdanos a hacer la app más segura para ti y tus clientes.
          </Text>
        </View>

        <View style={verificationStyles.field}>
          <Text style={verificationStyles.fieldLabel}>RUC</Text>
          <View style={verificationStyles.fieldFrame}>
            <TextInput
              accessibilityLabel="RUC"
              value={ruc}
              onChangeText={(value) => onRucChange(value.replace(/\D/g, "").slice(0, 13))}
              style={verificationStyles.fieldInput}
              keyboardType="number-pad"
              placeholder="Ej. 1791283465001"
              placeholderTextColor="#9CA3AF"
              editable={!loading}
            />
          </View>
        </View>

        <View style={verificationStyles.field}>
          <Text style={verificationStyles.fieldLabel}>Información de contacto</Text>
          <Text style={verificationStyles.caption}>Teléfono</Text>
          <View style={verificationStyles.fieldFrame}>
            <Pressable
              accessibilityLabel={`Código de país ${phone.code}`}
              accessibilityRole="button"
              accessibilityState={{ expanded: showCountryOptions, disabled: loading }}
              onPress={() => setShowCountryOptions(!showCountryOptions)}
              style={styles.countryCode}
              disabled={loading}
            >
              <Text style={verificationStyles.caption}>{phone.code} ⌄</Text>
            </Pressable>
            <TextInput
              accessibilityLabel="Teléfono"
              value={phone.digits}
              onChangeText={(value) => {
                const incoming = value.trim().startsWith("+") ? parsePhoneWithCountry(value) : null;
                onTelefonoChange(toStoragePhone(incoming?.code || phone.code, incoming?.digits ?? value));
              }}
              style={verificationStyles.fieldInput}
              keyboardType="phone-pad"
              autoComplete="tel-national"
              placeholder="Ej. 987654321"
              placeholderTextColor="#9CA3AF"
              editable={!loading}
            />
          </View>
          {showCountryOptions && !loading ? (
            <View style={styles.countryList}>
              {COUNTRY_CODES.map((country: { code: string; label: string }) => (
                <Pressable
                  key={country.code}
                  accessibilityRole="button"
                  accessibilityState={{ selected: country.code === phone.code }}
                  onPress={() => {
                    onTelefonoChange(toStoragePhone(country.code, phone.digits));
                    setShowCountryOptions(false);
                  }}
                  style={styles.countryOption}
                >
                  <Text style={verificationStyles.caption}>{country.code} {country.label}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
      </View>

      <View style={verificationStyles.footer}>
        <OnboardingPrimaryButton label={loading ? "Guardando…" : "Continuar"} disabled={loading} onPress={onContinue} />
        <OnboardingSkipButton label="Verificar más tarde" disabled={loading} onPress={onSkip} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  countryCode: { alignSelf: "stretch", justifyContent: "center", borderRightWidth: 1, borderColor: "#E5E7EB", paddingHorizontal: 12 },
  countryList: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, paddingVertical: 4 },
  countryOption: { minHeight: 44, paddingHorizontal: 12, justifyContent: "center" },
});
