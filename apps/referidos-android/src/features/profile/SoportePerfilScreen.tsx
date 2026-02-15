import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import { useAppStore } from "@shared/store/appStore";
import { useModalStore } from "@shared/store/modalStore";
import { mobileApi, supabase } from "@shared/services/mobileApi";
import {
  fetchActiveAgentSession,
  fetchSupportAgentProfile,
} from "@shared/services/supportDeskQueries";
import { formatDateTime } from "@shared/services/entityQueries";

export default function SoportePerfilScreen() {
  const signOut = useAppStore((state) => state.signOut);
  const usuarioId = String(useAppStore((state) => state.onboarding?.usuario?.id || "")).trim();
  const openConfirm = useModalStore((state) => state.openConfirm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);

  const handleSignOut = useCallback(() => {
    openConfirm({
      title: "Cerrar sesion soporte",
      message: "Se cerrara la sesion y se limpiara el cache de tabs.",
      tone: "warning",
      confirmLabel: "Cerrar sesion",
      cancelLabel: "Cancelar",
      onConfirm: () => {
        void signOut();
      },
    });
  }, [openConfirm, signOut]);

  const loadState = useCallback(async () => {
    if (!usuarioId) return;
    setLoading(true);
    const [profileResult, sessionResult] = await Promise.all([
      fetchSupportAgentProfile(supabase, usuarioId),
      fetchActiveAgentSession(supabase, usuarioId),
    ]);
    if (!profileResult.ok) {
      setError(profileResult.error || "No se pudo leer perfil de soporte.");
    } else if (!sessionResult.ok) {
      setError(sessionResult.error || "No se pudo leer estado de jornada.");
    } else {
      setError("");
    }
    setProfile(profileResult.ok ? profileResult.data : null);
    setSession(sessionResult.ok ? sessionResult.data : null);
    setLoading(false);
  }, [usuarioId]);

  useEffect(() => {
    void loadState();
  }, [loadState]);

  const handleRequestSession = useCallback(async () => {
    const result = await mobileApi.support.startSession({});
    if (!result?.ok) {
      setError(result?.error || "No se pudo solicitar jornada.");
      return;
    }
    await loadState();
  }, [loadState]);

  const handleEndSession = useCallback(async () => {
    const result = await mobileApi.support.endSession({ reason: "manual_end" });
    if (!result?.ok) {
      setError(result?.error || "No se pudo finalizar jornada.");
      return;
    }
    await loadState();
  }, [loadState]);

  const handlePing = useCallback(async () => {
    const result = await mobileApi.support.pingSession();
    if (!result?.ok) {
      setError(result?.error || "No se pudo enviar ping.");
      return;
    }
    await loadState();
  }, [loadState]);

  return (
    <ScreenScaffold title="Soporte perfil" subtitle="Jornada y controles base">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard title="Estado soporte" subtitle="Perfil y sesion de jornada">
          {loading ? <Text style={styles.mutedText}>Cargando...</Text> : null}
          {!loading ? (
            <View style={styles.infoWrap}>
              <Text style={styles.infoText}>
                autorizado: {profile?.authorized_for_work ? "si" : "no"}
              </Text>
              <Text style={styles.infoText}>bloqueado: {profile?.blocked ? "si" : "no"}</Text>
              <Text style={styles.infoText}>
                solicitud: {String(profile?.session_request_status || "sin solicitud")}
              </Text>
              <Text style={styles.infoText}>sesion activa: {session?.id ? "si" : "no"}</Text>
              {session?.start_at ? (
                <Text style={styles.infoText}>
                  inicio sesion: {formatDateTime(session.start_at)}
                </Text>
              ) : null}
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
          ) : null}
          <View style={styles.actionsRow}>
            {!session?.id ? (
              <Pressable onPress={handleRequestSession} style={styles.secondaryBtn}>
                <Text style={styles.secondaryBtnText}>Solicitar/Iniciar jornada</Text>
              </Pressable>
            ) : (
              <Pressable onPress={handleEndSession} style={styles.outlineBtn}>
                <Text style={styles.outlineBtnText}>Finalizar jornada</Text>
              </Pressable>
            )}
            <Pressable onPress={handlePing} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>Ping</Text>
            </Pressable>
            <Pressable onPress={loadState} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>Recargar</Text>
            </Pressable>
          </View>
        </SectionCard>

        <SectionCard title="Sesion">
          <Pressable onPress={handleSignOut} style={styles.button}>
            <Text style={styles.buttonText}>Cerrar sesion</Text>
          </Pressable>
        </SectionCard>
      </ScrollView>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 20,
  },
  infoWrap: {
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: "#334155",
  },
  mutedText: {
    fontSize: 12,
    color: "#64748B",
  },
  errorText: {
    fontSize: 12,
    color: "#B91C1C",
    fontWeight: "600",
  },
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  secondaryBtn: {
    backgroundColor: "#F4EEFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryBtnText: {
    color: "#5B21B6",
    fontWeight: "700",
    fontSize: 12,
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  outlineBtnText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 12,
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
