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
import { useModalStore } from "@shared/store/modalStore";
import { SUPPORT_CHAT_CATEGORIES } from "@shared/constants/supportCategories";
import { fetchSystemFeatureFlags } from "@shared/services/systemFeatureFlags";
import AccessSecurityPanel from "./components/AccessSecurityPanel";
import {
  LinkedProvidersSection,
  NotificationsSection,
  SessionsSection,
} from "./components/ProfileRuntimePanels";
import {
  ProfileBenefitsSection,
  ProfileFaqSection,
  ProfilePreferencesSection,
} from "./components/ProfileExtendedSections";
import {
  fetchCurrentUserRow,
  fetchSupportTicketsByUserPublicId,
  formatDateTime,
  readFirst,
  toDisplayStatus,
} from "@shared/services/entityQueries";
import { deleteCurrentUserAccount } from "@shared/services/accountLifecycle";

type ProfileTab = "cuenta" | "seguridad" | "preferencias" | "ayuda";

function generateClientRequestId() {
  return `rn-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export default function ClientePerfilScreen() {
  const onboarding = useAppStore((state) => state.onboarding);
  const bootstrapAuth = useAppStore((state) => state.bootstrapAuth);
  const signOut = useAppStore((state) => state.signOut);
  const openConfirm = useModalStore((state) => state.openConfirm);
  const openAlert = useModalStore((state) => state.openAlert);
  const openPicker = useModalStore((state) => state.openPicker);
  const [profileTab, setProfileTab] = useState<ProfileTab>("cuenta");
  const [category, setCategory] = useState("acceso");
  const [summary, setSummary] = useState("");
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState<any | null>(null);
  const [profileDraft, setProfileDraft] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
  });
  const [ticketsLoading, setTicketsLoading] = useState(true);
  const [tickets, setTickets] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [ticketsError, setTicketsError] = useState("");
  const [ticketOwnerPublicId, setTicketOwnerPublicId] = useState("");

  const usuario = onboarding?.usuario || null;
  const visibleCategories = useMemo(
    () => SUPPORT_CHAT_CATEGORIES.filter((item) => item.roles.includes("cliente")),
    [],
  );
  const linkedProviders = useMemo(() => {
    const unique = new Set(
      (Array.isArray(onboarding?.providers) ? onboarding.providers : [])
        .map((item: any) => String(item || "").trim().toLowerCase())
        .filter(Boolean),
    );
    if (usuario?.email) unique.add("email");
    return Array.from(unique) as string[];
  }, [onboarding?.providers, usuario?.email]);
  const primaryProvider = String(onboarding?.provider || "email").trim().toLowerCase();
  const [appleEnabled, setAppleEnabled] = useState(false);
  const userAuthId = String(readFirst(usuario, ["id_auth", "id"], "")).trim();

  useEffect(() => {
    if (!visibleCategories.length) return;
    if (!visibleCategories.some((item) => item.id === category)) {
      setCategory(visibleCategories[0].id);
    }
  }, [category, visibleCategories]);

  useEffect(() => {
    setProfileDraft({
      nombre: String(readFirst(usuario, ["nombre"], "")).trim(),
      telefono: String(readFirst(usuario, ["telefono", "phone"], "")).trim(),
      direccion: String(readFirst(usuario, ["direccion", "ubicacion"], "")).trim(),
    });
  }, [usuario]);

  const loadTickets = useCallback(async () => {
    setTicketsLoading(true);
    setTicketsError("");

    let ownerPublicId = String(
      readFirst(onboarding?.usuario, ["public_id", "user_public_id", "publicId"], ""),
    ).trim();
    if (!ownerPublicId) {
      const current = await fetchCurrentUserRow(supabase);
      if (current.ok && current.data) {
        ownerPublicId = String(readFirst(current.data, ["public_id"], "")).trim();
      }
    }

    if (!ownerPublicId) {
      setTicketOwnerPublicId("");
      setTickets([]);
      setTicketsError("No se pudo resolver el usuario propietario de los tickets.");
      setTicketsLoading(false);
      return;
    }

    setTicketOwnerPublicId(ownerPublicId);
    const result = await fetchSupportTicketsByUserPublicId(supabase, ownerPublicId, 20);
    if (!result.ok) {
      setTickets([]);
      setTicketsError(result.error || "No se pudo cargar tus tickets.");
      setTicketsLoading(false);
      return;
    }

    setTickets(result.data);
    setTicketsLoading(false);
  }, [onboarding?.usuario]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  useEffect(() => {
    let mounted = true;
    void fetchSystemFeatureFlags({ force: true }).then((flags) => {
      if (mounted) setAppleEnabled(Boolean(flags.oauth_apple_enabled));
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleCreateTicket = useCallback(async () => {
    setError("");
    if (summary.trim().length < 5) {
      setError("Describe tu caso en una linea (minimo 5 caracteres).");
      openAlert({
        title: "Resumen incompleto",
        message: "Describe tu caso con al menos 5 caracteres para crear el ticket.",
        tone: "warning",
      });
      return;
    }

    setCreating(true);
    const payload = {
      category,
      summary: summary.trim(),
      app_channel: "android-app",
      origin_source: "user",
      context: {
        route: "/cliente/perfil",
        role: "cliente",
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
  }, [category, loadTickets, openAlert, summary]);

  const handleSignOut = useCallback(() => {
    openConfirm({
      title: "Cerrar sesion",
      message: "Tu cache local de tabs se reiniciara al salir.",
      tone: "warning",
      confirmLabel: "Cerrar sesion",
      cancelLabel: "Cancelar",
      onConfirm: () => {
        void signOut();
      },
    });
  }, [openConfirm, signOut]);

  const openCategoryPicker = useCallback(() => {
    openPicker({
      title: "Categoria de soporte",
      message: "Selecciona el motivo principal de tu consulta.",
      options: visibleCategories.map((item) => ({
        id: item.id,
        label: item.label,
        description: item.description,
      })),
      selectedId: category,
      confirmLabel: "Aplicar",
      cancelLabel: "Cancelar",
      onSelect: (id) => setCategory(id),
    });
  }, [category, openPicker, visibleCategories]);

  const handleOpenWhatsapp = useCallback(async () => {
    const link = created?.wa_link || created?.waLink;
    if (!link) return;
    await Linking.openURL(link);
  }, [created?.waLink, created?.wa_link]);

  const handleOpenSupportEmail = useCallback(async () => {
    try {
      await Linking.openURL("mailto:soporte@referidosapp.ec");
    } catch {
      openAlert({
        title: "No se pudo abrir correo",
        message: "Intenta enviar correo a soporte@referidosapp.ec desde tu app de correo.",
        tone: "warning",
      });
    }
  }, [openAlert]);

  const verificationStatus = String(
    readFirst(onboarding, ["verification_status"], "sin_verificacion"),
  );
  const emailConfirmed = Boolean(readFirst(onboarding, ["email_confirmed"], false));

  const handleOpenTicketWhatsapp = useCallback(
    async (ticket: any) => {
      const link = String(readFirst(ticket, ["wa_link"], "")).trim();
      if (!link) return;
      try {
        await Linking.openURL(link);
      } catch {
        openAlert({
          title: "No se pudo abrir WhatsApp",
          message: "Intenta abrir el ticket nuevamente o desde otra app.",
          tone: "warning",
        });
      }
    },
    [openAlert],
  );

  const handleRequestRetake = useCallback(
    (ticket: any) => {
      const threadPublicId = String(readFirst(ticket, ["public_id"], "")).trim();
      if (!threadPublicId) return;
      openConfirm({
        title: `Retomar ${threadPublicId}`,
        message: "El ticket volvera a cola general para reasignacion de soporte.",
        tone: "warning",
        confirmLabel: "Confirmar retomar",
        cancelLabel: "Cancelar",
        onConfirm: async () => {
          const result = await mobileApi.support.requestRetake({
            thread_public_id: threadPublicId,
          });
          if (!result?.ok || result?.data?.ok === false) {
            openAlert({
              title: "No se pudo retomar",
              message: result?.error || result?.data?.error || "No se pudo retomar el ticket.",
              tone: "warning",
            });
            return;
          }
          setTickets((current) =>
            current.map((row) =>
              String(readFirst(row, ["public_id"], "")) === threadPublicId
                ? {
                    ...row,
                    retake_requested_at:
                      result?.data?.retake_requested_at || new Date().toISOString(),
                  }
                : row,
            ),
          );
        },
      });
    },
    [openAlert, openConfirm],
  );

  const handleDeleteAccount = useCallback(() => {
    openConfirm({
      title: "Eliminar cuenta",
      message: "La eliminacion es permanente y cerrara tu sesion actual.",
      tone: "danger",
      confirmLabel: "Eliminar cuenta",
      cancelLabel: "Cancelar",
      onConfirm: async () => {
        const result = await deleteCurrentUserAccount(userAuthId);
        if (!result.ok) {
          openAlert({
            title: "No se pudo eliminar",
            message: result.error || "No se pudo eliminar la cuenta.",
            tone: "warning",
          });
          return;
        }
        await signOut();
      },
    });
  }, [openAlert, openConfirm, signOut, userAuthId]);

  const handleSaveProfile = useCallback(async () => {
    if (!userAuthId) return;
    const { error: updateError } = await supabase
      .from("usuarios")
      .update({
        nombre: profileDraft.nombre.trim() || null,
        telefono: profileDraft.telefono.trim() || null,
        direccion: profileDraft.direccion.trim() || null,
      })
      .eq("id_auth", userAuthId);

    if (updateError) {
      openAlert({
        title: "No se pudo guardar",
        message: updateError.message || "No se pudo actualizar el perfil.",
        tone: "warning",
      });
      return;
    }
    await bootstrapAuth();
    openAlert({
      title: "Perfil actualizado",
      message: "Los datos basicos del perfil se actualizaron.",
      tone: "default",
    });
  }, [bootstrapAuth, openAlert, profileDraft.direccion, profileDraft.nombre, profileDraft.telefono, userAuthId]);

  return (
    <ScreenScaffold title="Perfil cliente" subtitle="Cuenta, seguridad y ayuda">
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.tabRow}>
          {(["cuenta", "seguridad", "preferencias", "ayuda"] as ProfileTab[]).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setProfileTab(tab)}
              style={[styles.tabChip, profileTab === tab && styles.tabChipActive]}
            >
              <Text style={[styles.tabChipText, profileTab === tab && styles.tabChipTextActive]}>
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {profileTab === "cuenta" ? (
          <>
            <SectionCard title="Cuenta">
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nombre:</Text>
                <TextInput
                  value={profileDraft.nombre}
                  onChangeText={(value) => setProfileDraft((prev) => ({ ...prev, nombre: value }))}
                  style={styles.inlineInput}
                  placeholder="Nombre"
                />
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Correo:</Text>
                <Text style={styles.infoValue}>{readFirst(usuario, ["email"], "sin correo")}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Telefono:</Text>
                <TextInput
                  value={profileDraft.telefono}
                  onChangeText={(value) => setProfileDraft((prev) => ({ ...prev, telefono: value }))}
                  style={styles.inlineInput}
                  placeholder="Telefono"
                />
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Direccion:</Text>
                <TextInput
                  value={profileDraft.direccion}
                  onChangeText={(value) => setProfileDraft((prev) => ({ ...prev, direccion: value }))}
                  style={styles.inlineInput}
                  placeholder="Direccion"
                />
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Estado:</Text>
                <Text style={styles.infoValue}>
                  {onboarding?.allowAccess ? "activo" : "pendiente"}
                </Text>
              </View>
              <View style={styles.actionsRow}>
                <Pressable onPress={() => void handleSaveProfile()} style={styles.primaryBtn}>
                  <Text style={styles.primaryBtnText}>Guardar perfil</Text>
                </Pressable>
                <Pressable onPress={bootstrapAuth} style={styles.secondaryBtn}>
                  <Text style={styles.secondaryBtnText}>Refrescar</Text>
                </Pressable>
                <Pressable onPress={handleSignOut} style={styles.outlineBtn}>
                  <Text style={styles.outlineBtnText}>Cerrar sesion</Text>
                </Pressable>
              </View>
            </SectionCard>
            <ProfileBenefitsSection
              role="cliente"
              accountLabel={`Estado ${onboarding?.allowAccess ? "activo" : "pendiente"}`}
              accountHelper="Completar perfil y verificar correo habilita mejores beneficios, referidos y progreso."
            />
            <SectionCard title="Gestionar cuenta" subtitle="Acciones sensibles y estado general">
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Verificacion:</Text>
                <Text style={styles.infoValue}>{verificationStatus}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>{emailConfirmed ? "confirmado" : "pendiente"}</Text>
              </View>
              <View style={styles.actionsRow}>
                <Pressable onPress={handleSignOut} style={styles.outlineBtn}>
                  <Text style={styles.outlineBtnText}>Cerrar sesion</Text>
                </Pressable>
                <Pressable onPress={handleDeleteAccount} style={styles.dangerBtn}>
                  <Text style={styles.dangerBtnText}>Eliminar cuenta</Text>
                </Pressable>
              </View>
            </SectionCard>
          </>
        ) : null}

        {profileTab === "seguridad" ? (
          <>
            <SectionCard title="Acceso y seguridad" subtitle="Estado de acceso aplicable en RN">
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Rol:</Text>
                <Text style={styles.infoValue}>{String(readFirst(usuario, ["role"], "cliente"))}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Verificacion:</Text>
                <Text style={styles.infoValue}>{verificationStatus}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>{emailConfirmed ? "confirmado" : "pendiente"}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Acceso:</Text>
                <Text style={styles.infoValue}>{onboarding?.allowAccess ? "permitido" : "bloqueado"}</Text>
              </View>
              <View style={styles.actionsRow}>
                <Pressable onPress={bootstrapAuth} style={styles.secondaryBtn}>
                  <Text style={styles.secondaryBtnText}>Refrescar estado</Text>
                </Pressable>
                <Pressable onPress={handleSignOut} style={styles.outlineBtn}>
                  <Text style={styles.outlineBtnText}>Cerrar sesion</Text>
                </Pressable>
              </View>
              <AccessSecurityPanel
                usuario={usuario}
                onReload={async () => {
                  await bootstrapAuth();
                }}
              />
            </SectionCard>
            <LinkedProvidersSection
              providers={linkedProviders}
              primaryProvider={primaryProvider}
              appleEnabled={appleEnabled}
            />
            <SessionsSection onCurrentSessionRevoked={handleSignOut} />
          </>
        ) : null}

        {profileTab === "preferencias" ? (
          <>
            <NotificationsSection role="cliente" />
            <ProfilePreferencesSection role="cliente" />
          </>
        ) : null}

        {profileTab === "ayuda" ? (
          <>
            <ProfileFaqSection audience="cliente" />

            <SectionCard title="Ayuda">
              <View style={styles.actionsRow}>
                <Pressable onPress={handleOpenSupportEmail} style={styles.outlineBtn}>
                  <Text style={styles.outlineBtnText}>Soporte por correo</Text>
                </Pressable>
              </View>
            </SectionCard>

            <SectionCard title="Chatear con soporte" subtitle="Crear ticket y abrir WhatsApp">
              <View style={styles.categoryPickerRow}>
                <Text style={styles.categoryLabel}>
                  Categoria actual:{" "}
                  {visibleCategories.find((item) => item.id === category)?.label || "sin categoria"}
                </Text>
                <Pressable onPress={openCategoryPicker} style={styles.secondaryBtn}>
                  <Text style={styles.secondaryBtnText}>Seleccionar</Text>
                </Pressable>
              </View>
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
              subtitle="Solo tickets del usuario autenticado"
              right={
                <Pressable onPress={loadTickets} style={styles.secondaryBtn}>
                  <Text style={styles.secondaryBtnText}>Recargar</Text>
                </Pressable>
              }
            >
              {ticketOwnerPublicId ? (
                <Text style={styles.scopeText}>Owner: {ticketOwnerPublicId}</Text>
              ) : null}
              {ticketsLoading ? <BlockSkeleton lines={5} compact /> : null}
              {!ticketsLoading && ticketsError ? (
                <Text style={styles.error}>{ticketsError}</Text>
              ) : null}
              {!ticketsLoading && !ticketsError && tickets.length === 0 ? (
                <Text style={styles.emptyText}>No hay tickets registrados.</Text>
              ) : null}
              {!ticketsLoading && !ticketsError
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
                      <View style={styles.actionsRow}>
                        {readFirst(ticket, ["wa_link"], "") ? (
                          <Pressable
                            onPress={() => void handleOpenTicketWhatsapp(ticket)}
                            style={styles.secondaryBtn}
                          >
                            <Text style={styles.secondaryBtnText}>Abrir WhatsApp</Text>
                          </Pressable>
                        ) : null}
                        {readFirst(ticket, ["status"], "") === "queued" &&
                        readFirst(ticket, ["personal_queue"], true) === false ? (
                          <Pressable
                            onPress={() => handleRequestRetake(ticket)}
                            disabled={Boolean(readFirst(ticket, ["retake_requested_at"], null))}
                            style={[
                              styles.outlineBtn,
                              Boolean(readFirst(ticket, ["retake_requested_at"], null)) &&
                                styles.primaryBtnDisabled,
                            ]}
                          >
                            <Text style={styles.outlineBtnText}>
                              {readFirst(ticket, ["retake_requested_at"], null)
                                ? "Retomar solicitado"
                                : "Retomar ticket"}
                            </Text>
                          </Pressable>
                        ) : null}
                      </View>
                    </View>
                  ))
                : null}
            </SectionCard>
          </>
        ) : null}
      </ScrollView>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 20,
  },
  tabRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 2,
  },
  tabChip: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  tabChipActive: {
    borderColor: "#6D28D9",
    backgroundColor: "#F5F3FF",
  },
  tabChipText: {
    textTransform: "uppercase",
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "700",
  },
  tabChipTextActive: {
    color: "#5B21B6",
  },
  categoryPickerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  categoryLabel: {
    flex: 1,
    color: "#4B5563",
    fontSize: 12,
  },
  infoRow: {
    flexDirection: "row",
    gap: 6,
  },
  infoLabel: {
    width: 90,
    color: "#6B7280",
    fontSize: 12,
  },
  infoValue: {
    flex: 1,
    color: "#111827",
    fontSize: 12,
  },
  inlineInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#111827",
    backgroundColor: "#FFFFFF",
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
    alignItems: "center",
    justifyContent: "center",
  },
  outlineBtnText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 12,
  },
  dangerBtn: {
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF1F2",
  },
  dangerBtnText: {
    color: "#BE123C",
    fontWeight: "700",
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
  scopeText: {
    color: "#64748B",
    fontSize: 11,
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
