import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { useRoleNotifications } from "@shared/hooks/useRoleNotifications";
import {
  getDeviceNotificationPermissionLabel,
  getNotificationPrefs,
  toggleNotificationPref,
} from "@shared/services/appNotifications";
import {
  listCurrentUserSessions,
  registerCurrentSessionDevice,
  revokeAllSessions,
  revokeSessionById,
} from "@shared/services/sessionDevices";

const PROVIDER_META = [
  { id: "email", label: "Correo", badge: "@", color: "#475569", bg: "#E2E8F0" },
  { id: "google", label: "Google", badge: "G", color: "#FFFFFF", bg: "#4285F4" },
  { id: "facebook", label: "Facebook", badge: "f", color: "#FFFFFF", bg: "#1877F2" },
  { id: "apple", label: "Apple", badge: "A", color: "#FFFFFF", bg: "#111111" },
  { id: "discord", label: "Discord", badge: "D", color: "#FFFFFF", bg: "#5865F2" },
  { id: "twitter", label: "X", badge: "X", color: "#FFFFFF", bg: "#111111" },
] as const;

export function LinkedProvidersSection({
  providers,
  primaryProvider,
  appleEnabled = false,
}: {
  providers: string[];
  primaryProvider: string;
  appleEnabled?: boolean;
}) {
  const normalized = new Set((providers || []).map((item) => String(item || "").trim().toLowerCase()));
  const visibleProviders = PROVIDER_META.filter(
    (provider) => provider.id !== "apple" || appleEnabled || normalized.has("apple"),
  );

  return (
    <SectionCard title="Cuentas vinculadas" subtitle="Superficie de proveedores visible en Android">
      {visibleProviders.map((provider) => {
        const linked = normalized.has(provider.id);
        const isPrimary = provider.id === String(primaryProvider || "").trim().toLowerCase();
        return (
          <View key={provider.id} style={styles.inlineCard}>
            <View style={styles.providerRow}>
              <View style={[styles.providerBadge, { backgroundColor: provider.bg }]}>
                <Text style={[styles.providerBadgeText, { color: provider.color }]}>{provider.badge}</Text>
              </View>
              <View style={styles.providerCopy}>
                <Text style={styles.providerTitle}>{provider.label}</Text>
                <Text style={styles.metaText}>
                  {linked ? "vinculado" : "no vinculado"}
                  {isPrimary ? " | principal" : ""}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </SectionCard>
  );
}

export function NotificationsSection({ role }: { role: string }) {
  const notifications = useRoleNotifications({ role, enabled: true, limit: 20 });
  const [prefs, setPrefs] = useState({
    promos: true,
    novedades: true,
    seguridad: true,
  });

  useEffect(() => {
    let mounted = true;
    void getNotificationPrefs().then((next) => {
      if (mounted) setPrefs(next);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleTogglePref = useCallback(async (key: "promos" | "novedades" | "seguridad") => {
    const next = await toggleNotificationPref(key);
    setPrefs(next);
  }, []);

  return (
    <SectionCard
      title="Notificaciones"
      subtitle={`unread: ${notifications.unreadCount} | permiso: ${getDeviceNotificationPermissionLabel()}`}
      right={
        <View style={styles.actionInlineRow}>
          <Pressable onPress={() => void notifications.refresh(true)} style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>Recargar</Text>
          </Pressable>
          <Pressable onPress={() => void notifications.markAllRead()} style={styles.outlineBtn}>
            <Text style={styles.outlineBtnText}>Marcar todas</Text>
          </Pressable>
        </View>
      }
    >
      <View style={styles.preferenceRow}>
        {(["promos", "novedades", "seguridad"] as const).map((key) => (
          <Pressable
            key={key}
            onPress={() => void handleTogglePref(key)}
            style={[styles.prefChip, prefs[key] && styles.prefChipActive]}
          >
            <Text style={[styles.prefChipText, prefs[key] && styles.prefChipTextActive]}>{key}</Text>
          </Pressable>
        ))}
      </View>
      {notifications.loading ? <BlockSkeleton lines={4} compact /> : null}
      {notifications.error ? <Text style={styles.errorText}>{notifications.error}</Text> : null}
      {!notifications.loading && notifications.rows.length === 0 ? (
        <Text style={styles.metaText}>Sin notificaciones recientes.</Text>
      ) : null}
      {!notifications.loading
        ? notifications.rows.map((row) => (
            <View key={String(row.id)} style={styles.inlineCard}>
              <Text style={styles.providerTitle}>{String(row.title || row.event_type || "Notificacion")}</Text>
              <Text style={styles.metaText}>{String(row.body || "Sin body")}</Text>
              <Text style={styles.metaText}>
                {row.is_read ? "leida" : "no leida"} | {String(row.created_at || "-")}
              </Text>
              {!row.is_read ? (
                <Pressable
                  onPress={() => void notifications.markRead([String(row.id)])}
                  style={styles.secondaryBtn}
                >
                  <Text style={styles.secondaryBtnText}>Marcar leida</Text>
                </Pressable>
              ) : null}
            </View>
          ))
        : null}
    </SectionCard>
  );
}

export function SessionsSection({
  onCurrentSessionRevoked,
}: {
  onCurrentSessionRevoked?: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rows, setRows] = useState<any[]>([]);

  const loadSessions = useCallback(async () => {
    setLoading(true);
    setError("");
    await registerCurrentSessionDevice();
    const result: any = await listCurrentUserSessions();
    if (!result?.ok) {
      setRows([]);
      setError(result?.error || "No se pudieron cargar las sesiones.");
      setLoading(false);
      return;
    }
    setRows(Array.isArray(result.sessions) ? result.sessions : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadSessions();
  }, [loadSessions]);

  const handleCloseSession = useCallback(async (session: any) => {
    const result: any = await revokeSessionById(String(session?.sessionId || ""));
    if (!result?.ok) {
      setError(result?.error || "No se pudo cerrar la sesion.");
      return;
    }
    if (result?.current_session_revoked) {
      onCurrentSessionRevoked?.();
      return;
    }
    await loadSessions();
  }, [loadSessions, onCurrentSessionRevoked]);

  const handleCloseOtherSessions = useCallback(async () => {
    const result: any = await revokeAllSessions();
    if (!result?.ok) {
      setError(result?.error || "No se pudieron cerrar las sesiones.");
      return;
    }
    if (result?.current_session_revoked) {
      onCurrentSessionRevoked?.();
      return;
    }
    await loadSessions();
  }, [loadSessions, onCurrentSessionRevoked]);

  return (
    <SectionCard
      title="Sesiones"
      subtitle="Registro device/session del backend compartido"
      right={
        <View style={styles.actionInlineRow}>
          <Pressable onPress={() => void loadSessions()} style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>Recargar</Text>
          </Pressable>
          <Pressable onPress={() => void handleCloseOtherSessions()} style={styles.outlineBtn}>
            <Text style={styles.outlineBtnText}>Cerrar otras</Text>
          </Pressable>
        </View>
      }
    >
      {loading ? <BlockSkeleton lines={4} compact /> : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {!loading && rows.length === 0 ? <Text style={styles.metaText}>Sin sesiones activas.</Text> : null}
      {!loading
        ? rows.map((session) => (
            <View key={String(session?.sessionId || session?.id)} style={styles.inlineCard}>
              <Text style={styles.providerTitle}>{String(session?.device || "Dispositivo")}</Text>
              <Text style={styles.metaText}>
                {String(session?.platform || "-")} | {String(session?.location || "-")}
              </Text>
              <Text style={styles.metaText}>
                {String(session?.lastActive || "-")}
                {session?.current ? " | actual" : ""}
              </Text>
              {!session?.current ? (
                <Pressable onPress={() => void handleCloseSession(session)} style={styles.secondaryBtn}>
                  <Text style={styles.secondaryBtnText}>Cerrar sesion</Text>
                </Pressable>
              ) : null}
            </View>
          ))
        : null}
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  inlineCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 10,
    gap: 4,
  },
  providerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  providerBadge: {
    width: 28,
    height: 28,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  providerBadgeText: {
    fontSize: 12,
    fontWeight: "800",
  },
  providerCopy: {
    flex: 1,
    gap: 2,
  },
  providerTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F172A",
  },
  metaText: {
    fontSize: 11,
    color: "#64748B",
  },
  errorText: {
    fontSize: 12,
    color: "#B91C1C",
    fontWeight: "600",
  },
  actionInlineRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#1D4ED8",
    backgroundColor: "#EFF6FF",
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  secondaryBtnText: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "700",
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  outlineBtnText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
  },
  preferenceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  prefChip: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  prefChipActive: {
    borderColor: "#5B21B6",
    backgroundColor: "#F5F3FF",
  },
  prefChipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#334155",
    textTransform: "capitalize",
  },
  prefChipTextActive: {
    color: "#5B21B6",
  },
});
