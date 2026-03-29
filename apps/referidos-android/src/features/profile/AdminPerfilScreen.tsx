import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import { useAppStore } from "@shared/store/appStore";
import { useModalStore } from "@shared/store/modalStore";
import { fetchSystemFeatureFlags } from "@shared/services/systemFeatureFlags";
import {
  LinkedProvidersSection,
  NotificationsSection,
  SessionsSection,
} from "./components/ProfileRuntimePanels";

export default function AdminPerfilScreen() {
  const onboarding = useAppStore((state) => state.onboarding);
  const signOut = useAppStore((state) => state.signOut);
  const openConfirm = useModalStore((state) => state.openConfirm);
  const [appleEnabled, setAppleEnabled] = useState(false);
  const providers = useMemo(() => {
    const unique = new Set(
      (Array.isArray(onboarding?.providers) ? onboarding.providers : [])
        .map((item: any) => String(item || "").trim().toLowerCase())
        .filter(Boolean),
    );
    if (onboarding?.usuario?.email) unique.add("email");
    return Array.from(unique) as string[];
  }, [onboarding?.providers, onboarding?.usuario?.email]);
  const primaryProvider = String(onboarding?.provider || "email").trim().toLowerCase();

  useEffect(() => {
    let mounted = true;
    void fetchSystemFeatureFlags({ force: true }).then((flags) => {
      if (mounted) setAppleEnabled(Boolean(flags.oauth_apple_enabled));
    });
    return () => {
      mounted = false;
    };
  }, []);

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
    <ScreenScaffold title="Admin perfil" subtitle="Sesion, notificaciones y sesiones activas">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard title="Cuenta">
          <Text style={styles.infoText}>
            {String(onboarding?.usuario?.nombre || onboarding?.usuario?.email || "Admin")}
          </Text>
          <Text style={styles.metaText}>
            {String(onboarding?.usuario?.email || "sin correo")} | role:{" "}
            {String(onboarding?.usuario?.role || "admin")}
          </Text>
        </SectionCard>
        <SectionCard title="Sesion">
          <Pressable onPress={handleSignOut} style={styles.button}>
            <Text style={styles.buttonText}>Cerrar sesion</Text>
          </Pressable>
        </SectionCard>
        <LinkedProvidersSection
          providers={providers}
          primaryProvider={primaryProvider}
          appleEnabled={appleEnabled}
        />
        <NotificationsSection role="admin" />
        <SessionsSection onCurrentSessionRevoked={handleSignOut} />
      </ScrollView>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 20,
  },
  infoText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  metaText: {
    fontSize: 12,
    color: "#64748B",
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
