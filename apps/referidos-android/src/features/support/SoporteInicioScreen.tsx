import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View, type ImageSourcePropType } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { STACK_ROUTES, TAB_ROUTES } from "@navigation/routeKeys";
import ScreenScaffold from "@features/staff/StaffScreenScaffold";
import SectionCard from "@features/staff/StaffSectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { staffIcons } from "@features/staff/staffNavigation";
import { supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import {
  fetchActiveAgentSession,
  fetchSupportAgentProfile,
  fetchSupportInboxRows,
  fetchSupportStatusSummary,
} from "@shared/services/supportDeskQueries";

export default function SoporteInicioScreen() {
  const navigation = useNavigation<any>();
  const usuario = useAppStore((state) => state.onboarding?.usuario || null);
  const usuarioId = String(usuario?.id || "").trim();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [summary, setSummary] = useState<any>({
    total: 0,
    myAssigned: 0,
    available: 0,
    waitingUser: 0,
    personalQueue: 0,
    closed: 0,
  });

  const loadOverview = useCallback(async () => {
    if (!usuarioId) return;
    setLoading(true);
    const [profileResult, sessionResult, inboxResult, statusSummaryResult] = await Promise.all([
      fetchSupportAgentProfile(supabase, usuarioId),
      fetchActiveAgentSession(supabase, usuarioId),
      fetchSupportInboxRows(supabase, {
        isAdmin: false,
        usuarioId,
        limit: 200,
      }),
      fetchSupportStatusSummary(supabase),
    ]);

    setProfile(profileResult.ok ? profileResult.data : null);
    setSession(sessionResult.ok ? sessionResult.data : null);

    if (!inboxResult.ok) {
      setError(inboxResult.error || "No se pudo cargar el overview de soporte.");
      setSummary({
        total: 0,
        myAssigned: 0,
        available: 0,
        waitingUser: 0,
        personalQueue: 0,
        closed: 0,
      });
      setLoading(false);
      return;
    }

    const rows = inboxResult.data || [];
    setSummary({
      total: Number(statusSummaryResult.ok ? statusSummaryResult.data.total : rows.length),
      myAssigned: rows.filter((row) => String(row?.assigned_agent_id || "") === usuarioId).length,
      available: rows.filter(
        (row) =>
          (!row?.assigned_agent_id && row?.status === "new") ||
          (!row?.assigned_agent_id && row?.status === "queued"),
      ).length,
      waitingUser: rows.filter((row) => row?.status === "waiting_user").length,
      personalQueue: rows.filter((row) => row?.status === "queued" && row?.personal_queue).length,
      closed: rows.filter((row) => row?.status === "closed").length,
    });
    setError(
      profileResult.error || sessionResult.error || statusSummaryResult.error || "",
    );
    setLoading(false);
  }, [usuarioId]);

  useEffect(() => {
    void loadOverview();
  }, [loadOverview]);

  const sessionStateLabel = useMemo(() => {
    if (profile?.blocked) return "bloqueado";
    if (!profile?.authorized_for_work) return "sin autorizacion";
    if (session?.id) return "jornada activa";
    return "autorizado sin jornada";
  }, [profile?.authorized_for_work, profile?.blocked, session?.id]);

  return (
    <ScreenScaffold
      title="Soporte Inicio"
      subtitle="Hub operativo para inbox, jornadas, issues y catalogo de errores"
      onRefresh={loading ? undefined : loadOverview}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.welcome}>
          <Text accessibilityRole="header" style={styles.welcomeTitle}>Bienvenido al panel de soporte</Text>
          <Text style={styles.welcomeCopy}>Revisa tu jornada y gestiona los tickets de la bandeja.</Text>
        </View>

        <SectionCard
          title="Estado del asesor"
          subtitle="Autorizacion, jornada y capacidad operativa"
          right={
            <Pressable onPress={loadOverview} disabled={loading} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>{loading ? "..." : "Recargar"}</Text>
            </Pressable>
          }
        >
          {loading ? <BlockSkeleton lines={3} compact /> : null}
          {!loading ? (
            <View style={styles.infoWrap}>
              <Text style={styles.infoText}>estado: {sessionStateLabel}</Text>
              <Text style={styles.infoText}>
                max tickets: {String(profile?.max_active_tickets || "sin limite")}
              </Text>
              <Text style={styles.infoText}>
                solicitud: {String(profile?.session_request_status || "sin solicitud")}
              </Text>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
          ) : null}
        </SectionCard>

        <SectionCard title="Resumen de cola" subtitle="Lectura del inbox actual">
          {loading ? <BlockSkeleton lines={4} compact /> : null}
          {!loading ? (
            <View style={styles.metricsWrap}>
              <MetricCard label="Total" value={summary.total} />
              <MetricCard label="Mios" value={summary.myAssigned} />
              <MetricCard label="Disponibles" value={summary.available} />
              <MetricCard label="Espera" value={summary.waitingUser} />
              <MetricCard label="Personal" value={summary.personalQueue} />
              <MetricCard label="Cerrados" value={summary.closed} />
            </View>
          ) : null}
        </SectionCard>

        <View style={styles.menuGrid}>
            <NavCard
              title="Inbox operativo"
              description="Gestiona tickets disponibles, asignados y resueltos desde una sola bandeja."
              icon={staffIcons.message}
              onPress={() => navigation.navigate(TAB_ROUTES.SOPORTE.INBOX)}
            />
            <NavCard
              title="Jornadas y sesiones"
              description="Consulta tu historial, autorización y jornada actual."
              icon={staffIcons.calendar}
              onPress={() => navigation.navigate(STACK_ROUTES.SOPORTE.JORNADAS)}
            />
            <NavCard
              title="Issues"
              description="Consulta issues y eventos de observabilidad relacionados con soporte."
              icon={staffIcons.activity}
              onPress={() => navigation.navigate(STACK_ROUTES.SOPORTE.ISSUES)}
            />
        </View>
      </ScrollView>
    </ScreenScaffold>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function NavCard({
  title,
  description,
  icon,
  onPress,
}: {
  title: string;
  description: string;
  icon: ImageSourcePropType;
  onPress: () => void;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.navCard}>
      <View style={styles.navIconPlate}><Image source={icon} accessible={false} style={styles.navIcon} /></View>
      <Text style={styles.navCardTitle}>{title}</Text>
      <Text style={styles.navCardText}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 24,
    paddingBottom: 48,
  },
  welcome: { borderRadius: 24, borderColor: "#E9E2F7", borderWidth: 1, backgroundColor: "#FFFFFF", padding: 24, gap: 8 },
  welcomeTitle: { color: "#2F1A55", fontSize: 24, lineHeight: 32, fontWeight: "800", includeFontPadding: false },
  welcomeCopy: { color: "#64748B", fontSize: 14, lineHeight: 20, includeFontPadding: false },
  infoWrap: {
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: "#475569",
  },
  errorText: {
    fontSize: 12,
    color: "#B91C1C",
    fontWeight: "600",
  },
  metricsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  metricCard: {
    minWidth: 100,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 2,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },
  metricLabel: {
    fontSize: 11,
    color: "#64748B",
  },
  menuGrid: {
    gap: 16,
  },
  navCard: {
    borderWidth: 1,
    borderColor: "#E9E2F7",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    gap: 8,
  },
  navIconPlate: { height: 40, width: 40, borderRadius: 16, alignItems: "center", justifyContent: "center", backgroundColor: "#F0EBFF" },
  navIcon: { width: 18, height: 18, tintColor: "#5E30A5" },
  navCardTitle: {
    marginTop: 4,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: "#2F1A55",
  },
  navCardText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#64748B",
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#1D4ED8",
    backgroundColor: "#EFF6FF",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  secondaryBtnText: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "700",
  },
});
