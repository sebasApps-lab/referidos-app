import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import FeaturePlaceholder from "@shared/ui/FeaturePlaceholder";
import { useAppStore } from "@shared/store/appStore";

export default function AuthFlowScreen() {
  const forceRoleForDebug = useAppStore((state) => state.forceRoleForDebug);
  const bootstrapAuth = useAppStore((state) => state.bootstrapAuth);

  return (
    <ScreenScaffold
      title="AuthFlow Android"
      subtitle="Base creada. Aqui se migra todo el flujo de autenticacion y onboarding."
    >
      <FeaturePlaceholder
        feature="Sprint 4"
        description="Migrar paso por paso AuthFlow, onboarding, validate-registration y account verify sin tocar la PWA."
      />
      <View style={styles.row}>
        <ActionChip label="Refrescar onboarding" onPress={bootstrapAuth} />
      </View>
      <View style={styles.row}>
        <ActionChip label="Debug cliente" onPress={() => forceRoleForDebug("cliente")} />
        <ActionChip label="Debug negocio" onPress={() => forceRoleForDebug("negocio")} />
      </View>
      <View style={styles.row}>
        <ActionChip label="Debug admin" onPress={() => forceRoleForDebug("admin")} />
        <ActionChip label="Debug soporte" onPress={() => forceRoleForDebug("soporte")} />
      </View>
    </ScreenScaffold>
  );
}

function ActionChip({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: "#EEF2FF",
    borderWidth: 1,
    borderColor: "#C7D2FE",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    fontSize: 12,
    color: "#4338CA",
    fontWeight: "600",
  },
});
