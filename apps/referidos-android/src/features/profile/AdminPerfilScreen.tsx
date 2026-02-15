import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import FeaturePlaceholder from "@shared/ui/FeaturePlaceholder";
import { useAppStore } from "@shared/store/appStore";
import { useModalStore } from "@shared/store/modalStore";

export default function AdminPerfilScreen() {
  const signOut = useAppStore((state) => state.signOut);
  const openConfirm = useModalStore((state) => state.openConfirm);

  const handleSignOut = useCallback(() => {
    openConfirm({
      title: "Cerrar sesion admin",
      message: "Se cerrara la sesion y se limpiara el cache de tabs.",
      tone: "warning",
      confirmLabel: "Cerrar sesion",
      cancelLabel: "Cancelar",
      onConfirm: () => {
        void signOut();
      },
    });
  }, [openConfirm, signOut]);

  return (
    <ScreenScaffold title="Admin perfil" subtitle="Sesion y preferencias base">
      <View style={styles.content}>
        <SectionCard title="Sesion">
          <Pressable onPress={handleSignOut} style={styles.button}>
            <Text style={styles.buttonText}>Cerrar sesion</Text>
          </Pressable>
        </SectionCard>
        <FeaturePlaceholder
          feature="Sprint 11"
          description="Preferencias admin, seguridad local y estado de sesion."
        />
      </View>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "700",
  },
});
