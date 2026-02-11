import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { formatBirthdateInput, normalizeUserName } from "@referidos/domain";

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
  loading: boolean;
  onNombreChange: (value: string) => void;
  onApellidoChange: (value: string) => void;
  onGeneroChange: (value: string) => void;
  onFechaNacimientoChange: (value: string) => void;
  onSubmit: () => void;
};

export default function OwnerProfileStepBlock({
  nombre,
  apellido,
  genero,
  fechaNacimiento,
  loading,
  onNombreChange,
  onApellidoChange,
  onGeneroChange,
  onFechaNacimientoChange,
  onSubmit,
}: Props) {
  return (
    <View style={styles.container}>
      <FieldLabel text="Nombre(s)" />
      <TextInput
        value={nombre}
        onChangeText={(text) => onNombreChange(normalizeUserName(text))}
        style={styles.input}
      />

      <FieldLabel text="Apellido(s)" />
      <TextInput
        value={apellido}
        onChangeText={(text) => onApellidoChange(normalizeUserName(text))}
        style={styles.input}
      />

      <FieldLabel text="Con que genero te identificas?" />
      <View style={styles.genderWrap}>
        {GENDER_OPTIONS.map((item) => (
          <Pressable
            key={item.value}
            onPress={() => onGeneroChange(item.value)}
            style={[styles.roleChip, genero === item.value && styles.roleChipSelected]}
          >
            <Text
              style={[
                styles.roleChipText,
                genero === item.value && styles.roleChipTextSelected,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <FieldLabel text="Cuando naciste? (DD/MM/AAAA)" />
      <TextInput
        value={formatBirthdateInput(fechaNacimiento)}
        onChangeText={(text) => onFechaNacimientoChange(formatBirthdateInput(text))}
        style={styles.input}
        keyboardType="number-pad"
      />

      <Pressable
        onPress={onSubmit}
        disabled={loading}
        style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}
      >
        <Text style={styles.primaryButtonText}>
          {loading ? "Cargando..." : "Guardar y continuar"}
        </Text>
      </Pressable>
    </View>
  );
}

function FieldLabel({ text }: { text: string }) {
  return <Text style={styles.label}>{text}</Text>;
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  label: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#111827",
    fontSize: 14,
    backgroundColor: "#FFFFFF",
  },
  genderWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  roleChip: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  roleChipSelected: {
    borderColor: "#6D28D9",
    backgroundColor: "#F5F3FF",
  },
  roleChipText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 13,
  },
  roleChipTextSelected: {
    color: "#5B21B6",
  },
  primaryButton: {
    backgroundColor: "#6D28D9",
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});
