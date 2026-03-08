import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { STACK_ROUTES, TAB_ROUTES } from "@navigation/routeKeys";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
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
    >
      <ScrollView contentContainerStyle={styles.content}>
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

        <SectionCard title="Modulos" subtitle="Acceso rapido al alcance soporte vigente">
          <View style={styles.menuGrid}>
            <NavCard
              title="Inbox"
              description="Tickets disponibles, asignados y cerrados."
              onPress={() => navigation.navigate(TAB_ROUTES.SOPORTE.INBOX)}
            />
            <NavCard
              title="Jornadas"
              description="Historial de autorizaciones, sesiones y eventos."
              onPress={() => navigation.navigate(STACK_ROUTES.SOPORTE.JORNADAS)}
            />
            <NavCard
              title="Issues"
              description="Issues y eventos de observabilidad relacionados."
              onPress={() => navigation.navigate(STACK_ROUTES.SOPORTE.ISSUES)}
            />
            <NavCard
              title="Errores"
              description="Catalogo de codigos observability y soporte."
              onPress={() => navigation.navigate(STACK_ROUTES.SOPORTE.ERROR_CATALOG)}
            />
            <NavCard
              title="Irregulares"
              description="Creacion de tickets operativos irregulares."
              onPress={() => navigation.navigate(TAB_ROUTES.SOPORTE.IRREGULAR)}
            />
          </View>
        </SectionCard>
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
  onPress,
}: {
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.navCard}>
      <Text style={styles.navCardTitle}>{title}</Text>
      <Text style={styles.navCardText}>{description}</Text>
      <Text style={styles.navCardLink}>Abrir</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 24,
  },
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
    gap: 8,
  },
  navCard: {
    borderWidth: 1,
    borderColor: "#DDD6FE",
    backgroundColor: "#F9F7FF",
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  navCardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2F1A55",
  },
  navCardText: {
    fontSize: 12,
    color: "#475569",
  },
  navCardLink: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "700",
    color: "#5B21B6",
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
