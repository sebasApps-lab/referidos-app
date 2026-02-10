import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Category = {
  id: string;
  label: string;
};

type Props = {
  nombreNegocio: string;
  categoriaNegocio: string;
  ruc: string;
  categories: Category[];
  loading: boolean;
  onNombreNegocioChange: (value: string) => void;
  onCategoriaChange: (value: string) => void;
  onRucChange: (value: string) => void;
  onSubmit: () => void;
};

export default function BusinessDataStepBlock({
  nombreNegocio,
  categoriaNegocio,
  ruc,
  categories,
  loading,
  onNombreNegocioChange,
  onCategoriaChange,
  onRucChange,
  onSubmit,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre negocio</Text>
      <TextInput value={nombreNegocio} onChangeText={onNombreNegocioChange} style={styles.input} />

      <Text style={styles.label}>RUC (opcional)</Text>
      <TextInput
        value={ruc}
        onChangeText={onRucChange}
        style={styles.input}
        keyboardType="number-pad"
      />

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.grid}>
        {categories.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => onCategoriaChange(item.label)}
            style={[styles.roleChip, categoriaNegocio === item.label && styles.roleChipSelected]}
          >
            <Text
              style={[
                styles.roleChipText,
                categoriaNegocio === item.label && styles.roleChipTextSelected,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={onSubmit} disabled={loading} style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}>
        <Text style={styles.primaryButtonText}>{loading ? "Cargando..." : "Guardar negocio"}</Text>
      </Pressable>
    </View>
  );
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
  grid: {
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

