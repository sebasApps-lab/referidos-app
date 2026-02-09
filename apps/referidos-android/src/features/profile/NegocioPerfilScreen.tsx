import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { mobileApi, supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import { SUPPORT_CHAT_CATEGORIES } from "@shared/constants/supportCategories";
import {
  fetchBusinessByUserId,
  fetchCurrentUserRow,
  fetchSupportTicketsPublic,
  formatDateTime,
  readFirst,
  toDisplayStatus,
} from "@shared/services/entityQueries";

function generateClientRequestId() {
  return `rn-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export default function NegocioPerfilScreen() {
  const onboarding = useAppStore((state) => state.onboarding);
  const bootstrapAuth = useAppStore((state) => state.bootstrapAuth);
  const signOut = useAppStore((state) => state.signOut);
  const [business, setBusiness] = useState<any | null>(onboarding?.negocio || null);
  const [category, setCategory] = useState("acceso");
  const [summary, setSummary] = useState("");
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState<any | null>(null);
  const [ticketsLoading, setTicketsLoading] = useState(true);
  const [tickets, setTickets] = useState<any[]>([]);
  const [error, setError] = useState("");

  const usuario = onboarding?.usuario || null;
  const visibleCategories = useMemo(
    () => SUPPORT_CHAT_CATEGORIES.filter((item) => item.roles.includes("negocio")),
    [],
  );

  useEffect(() => {
    if (!visibleCategories.length) return;
    if (!visibleCategories.some((item) => item.id === category)) {
      setCategory(visibleCategories[0].id);
    }
  }, [category, visibleCategories]);

  const loadBusiness = useCallback(async () => {
    const onboardingUserId = onboarding?.usuario?.id || null;
    let userId = onboardingUserId;
    if (!userId) {
      const current = await fetchCurrentUserRow(supabase);
      userId = current.ok ? current.data?.id : null;
    }
    if (!userId) {
      setBusiness(null);
      return;
    }
    const result = await fetchBusinessByUserId(supabase, userId);
    if (result.ok) setBusiness(result.data || null);
  }, [onboarding?.usuario?.id]);

  const loadTickets = useCallback(async () => {
    setTicketsLoading(true);
    const result = await fetchSupportTicketsPublic(supabase, 20);
    setTickets(result.ok ? result.data : []);
    setTicketsLoading(false);
  }, []);

  useEffect(() => {
    loadBusiness();
    loadTickets();
  }, [loadBusiness, loadTickets]);

  const refreshAll = useCallback(async () => {
    await bootstrapAuth();
    await loadBusiness();
    await loadTickets();
  }, [bootstrapAuth, loadBusiness, loadTickets]);

  const handleCreateTicket = useCallback(async () => {
    setError("");
    if (summary.trim().length < 5) {
      setError("Describe tu caso en una linea (minimo 5 caracteres).");
      return;
    }

    setCreating(true);
    const payload = {
      category,
      summary: summary.trim(),
      context: {
        route: "/negocio/perfil",
        role: "negocio",
        negocio_id: readFirst(business, ["id"], null),
        app_version: "android",
      },
      client_request_id: generateClientRequestId(),
    };
    const result = await mobileApi.support.createThread(payload);
    setCreating(false);
    if (!result?.ok) {
      setError(result?.error || "No se pudo crear el ticket.");
      return;
    }
    setCreated(result.data || {});
    setSummary("");
    await loadTickets();
  }, [business, category, loadTickets, summary]);

  const handleOpenWhatsapp = useCallback(async () => {
    const link = created?.wa_link || created?.waLink;
    if (!link) return;
    await Linking.openURL(link);
  }, [created?.waLink, created?.wa_link]);

  return (
    <ScreenScaffold title="Perfil negocio" subtitle="Identidad, soporte y acciones base">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard title="Cuenta y negocio">
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Usuario:</Text>
            <Text style={styles.infoValue}>
              {readFirst(usuario, ["nombre", "apodo", "alias"], "sin nombre")}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Correo:</Text>
            <Text style={styles.infoValue}>{readFirst(usuario, ["email"], "sin correo")}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Negocio:</Text>
            <Text style={styles.infoValue}>
              {readFirst(business, ["nombre"], "sin negocio")}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Categoria:</Text>
            <Text style={styles.infoValue}>
              {readFirst(business, ["categoria"], "sin categoria")}
            </Text>
          </View>
          <View style={styles.actionsRow}>
            <Pressable onPress={refreshAll} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>Refrescar</Text>
            </Pressable>
            <Pressable onPress={signOut} style={styles.outlineBtn}>
              <Text style={styles.outlineBtnText}>Cerrar sesion</Text>
            </Pressable>
          </View>
        </SectionCard>

        <SectionCard title="Soporte negocio" subtitle="Crear ticket y abrir WhatsApp">
          <View style={styles.chipWrap}>
            {visibleCategories.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setCategory(item.id)}
                style={[styles.chip, category === item.id && styles.chipSelected]}
              >
                <Text style={[styles.chipText, category === item.id && styles.chipTextSelected]}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <TextInput
            value={summary}
            onChangeText={setSummary}
            placeholder="Describe tu caso"
            style={styles.input}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            onPress={handleCreateTicket}
            disabled={creating}
            style={[styles.primaryBtn, creating && styles.primaryBtnDisabled]}
          >
            <Text style={styles.primaryBtnText}>
              {creating ? "Creando..." : "Crear ticket"}
            </Text>
          </Pressable>

          {created?.wa_link ? (
            <View style={styles.ticketCreatedWrap}>
              <Text style={styles.ticketCreatedTitle}>
                Ticket: {readFirst(created, ["thread_public_id", "public_id"], "creado")}
              </Text>
              <Pressable onPress={handleOpenWhatsapp} style={styles.whatsappBtn}>
                <Text style={styles.whatsappBtnText}>Abrir WhatsApp</Text>
              </Pressable>
            </View>
          ) : null}
        </SectionCard>

        <SectionCard
          title="Mis tickets"
          right={
            <Pressable onPress={loadTickets} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>Recargar</Text>
            </Pressable>
          }
        >
          {ticketsLoading ? <BlockSkeleton lines={5} compact /> : null}
          {!ticketsLoading && tickets.length === 0 ? (
            <Text style={styles.emptyText}>No hay tickets registrados.</Text>
          ) : null}
          {!ticketsLoading
            ? tickets.map((ticket, index) => (
                <View key={`${readFirst(ticket, ["public_id", "id"], index)}-${index}`} style={styles.ticketItem}>
                  <View style={styles.ticketTop}>
                    <Text style={styles.ticketCode}>
                      {readFirst(ticket, ["public_id"], "TKT")}
                    </Text>
                    <Text style={styles.ticketStatus}>
                      {toDisplayStatus(readFirst(ticket, ["status"], "new"))}
                    </Text>
                  </View>
                  <Text style={styles.ticketSummary} numberOfLines={2}>
                    {readFirst(ticket, ["summary", "resolution"], "Sin resumen")}
                  </Text>
                  <Text style={styles.ticketDate}>
                    {formatDateTime(readFirst(ticket, ["created_at"], null))}
                  </Text>
                </View>
              ))
            : null}
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
  infoRow: {
    flexDirection: "row",
    gap: 6,
  },
  infoLabel: {
    width: 74,
    color: "#6B7280",
    fontSize: 12,
  },
  infoValue: {
    flex: 1,
    color: "#111827",
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
  },
  primaryBtn: {
    backgroundColor: "#6D28D9",
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  primaryBtnDisabled: {
    opacity: 0.6,
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
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
  },
  outlineBtnText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 12,
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chipSelected: {
    borderColor: "#6D28D9",
    backgroundColor: "#F5F3FF",
  },
  chipText: {
    color: "#374151",
    fontSize: 11,
    fontWeight: "600",
  },
  chipTextSelected: {
    color: "#5B21B6",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#111827",
    backgroundColor: "#FFFFFF",
    fontSize: 13,
  },
  error: {
    color: "#B91C1C",
    fontSize: 12,
    fontWeight: "600",
  },
  ticketCreatedWrap: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
  },
  ticketCreatedTitle: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "700",
  },
  whatsappBtn: {
    backgroundColor: "#25D366",
    borderRadius: 8,
    paddingVertical: 9,
    alignItems: "center",
  },
  whatsappBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 12,
  },
  ticketItem: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 3,
  },
  ticketTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  ticketCode: {
    color: "#181B2A",
    fontWeight: "700",
    fontSize: 12,
  },
  ticketStatus: {
    color: "#334155",
    fontSize: 11,
    fontWeight: "700",
  },
  ticketSummary: {
    color: "#4B5563",
    fontSize: 12,
  },
  ticketDate: {
    color: "#6B7280",
    fontSize: 11,
  },
});
