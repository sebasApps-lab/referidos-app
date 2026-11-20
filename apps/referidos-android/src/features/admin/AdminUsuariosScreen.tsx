import React, { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScreenScaffold from "@features/staff/StaffScreenScaffold";
import StaffTable, { StaffTableBadge, type StaffTableColumn } from "@features/staff/StaffTable";
import StaffSelect from "@features/staff/StaffSelect";
import { staffIcons } from "@features/staff/staffNavigation";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { mobileApi, supabase } from "@shared/services/mobileApi";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";
import {
  fetchActiveAgentSession,
  fetchSupportAgentProfile,
} from "@shared/services/supportDeskQueries";

const ROLE_FILTERS = [
  { id: "todos", label: "Todos" },
  { id: "cliente", label: "Cliente" },
  { id: "negocio", label: "Negocio" },
  { id: "soporte", label: "Soporte" },
  { id: "admin", label: "Admin" },
  { id: "dev", label: "Dev" },
  { id: "empleado", label: "Empleado" },
] as const;

const STATUS_FILTERS = [
  { id: "todos", label: "Todos" },
  { id: "active", label: "Active" },
  { id: "pending", label: "Pending" },
  { id: "blocked", label: "Blocked" },
  { id: "suspended", label: "Suspended" },
  { id: "deleted", label: "Deleted" },
] as const;

const EMAIL_FILTERS = [
  { id: "todos", label: "Todos" },
  { id: "confirmado", label: "Confirmado" },
  { id: "pendiente", label: "Pendiente" },
] as const;

const SUPPORT_USER_ROLES = new Set(["soporte", "dev", "empleado"]);
const CREATE_ROLE_OPTIONS = [
  { id: "soporte", label: "Soporte" },
  { id: "dev", label: "Dev" },
  { id: "empleado", label: "Empleado" },
] as const;

type RoleFilterId = (typeof ROLE_FILTERS)[number]["id"];
type StatusFilterId = (typeof STATUS_FILTERS)[number]["id"];
type EmailFilterId = (typeof EMAIL_FILTERS)[number]["id"];
type CreateRoleId = (typeof CREATE_ROLE_OPTIONS)[number]["id"];

function isMissingColumnError(error: any) {
  const text = String(error?.message || error || "").toLowerCase();
  return (
    text.includes("column") &&
    (text.includes("does not exist") ||
      text.includes("schema cache") ||
      text.includes("could not find"))
  );
}

function parseUserView(row: any) {
  const id = String(readFirst(row, ["id"], "") || "").trim();
  const publicId = String(readFirst(row, ["public_id"], id || "USR") || "").trim();
  const nombre = String(readFirst(row, ["nombre"], "") || "").trim();
  const apellido = String(readFirst(row, ["apellido"], "") || "").trim();
  const displayName = `${nombre} ${apellido}`.trim() || String(readFirst(row, ["email", "public_id"], "Sin nombre"));
  const email = String(readFirst(row, ["email"], "sin_email") || "").trim();
  const role = String(readFirst(row, ["role"], "sin_rol") || "").trim().toLowerCase();
  const status = String(readFirst(row, ["account_status", "status"], "active") || "").trim().toLowerCase();
  const emailVerified = Boolean(readFirst(row, ["email_verificado", "emailVerified"], false));
  const createdAt = readFirst(row, ["created_at", "createdAt", "fecha_creacion", "fechacreacion"], null);
  const phone = String(readFirst(row, ["telefono", "phone"], "Sin teléfono"));

  return {
    id,
    publicId,
    displayName,
    email,
    role,
    status,
    emailVerified,
    createdAt,
    phone,
  };
}

type UserView = ReturnType<typeof parseUserView>;

function statusTone(status: string) {
  if (status === "active") return "positive";
  if (status === "blocked" || status === "deleted") return "danger";
  if (status === "pending" || status === "suspended") return "warning";
  return "neutral";
}

export default function AdminUsuariosScreen() {
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilterId>("todos");
  const [statusFilter, setStatusFilter] = useState<StatusFilterId>("todos");
  const [emailFilter, setEmailFilter] = useState<EmailFilterId>("todos");

  const [createEmail, setCreateEmail] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [createNombre, setCreateNombre] = useState("");
  const [createApellido, setCreateApellido] = useState("");
  const [createRole, setCreateRole] = useState<CreateRoleId>("soporte");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createdData, setCreatedData] = useState<any | null>(null);

  const [supportProfile, setSupportProfile] = useState<any | null>(null);
  const [supportSession, setSupportSession] = useState<any | null>(null);
  const [supportLoading, setSupportLoading] = useState(false);
  const [supportError, setSupportError] = useState("");
  const [supportBusy, setSupportBusy] = useState("");
  const supportRequest = useRef(0);

  const loadUsers = useCallback(async () => {
    let result = await supabase
      .from("usuarios")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(300);

    if (result.error && isMissingColumnError(result.error)) {
      result = await supabase.from("usuarios").select("*").limit(300);
    }

    if (result.error) {
      setUsers([]);
      setError(result.error.message || "No se pudo cargar usuarios.");
      setLoading(false);
      return;
    }

    const rows = result.data || [];
    setUsers(rows);
    setError("");

    setSelectedUserId((current) => rows.some((row) => String(row?.id || "") === current) ? current : "");

    setLoading(false);
  }, []);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadUsers();
    } catch {
      setError("No se pudo cargar la lista de usuarios.");
      setLoading(false);
    } finally {
      setRefreshing(false);
    }
  }, [loadUsers]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  const selectedUser = useMemo(() => {
    return users.find((item) => String(item?.id || "") === selectedUserId) || null;
  }, [selectedUserId, users]);

  const selectedUserView = useMemo(() => {
    return selectedUser ? parseUserView(selectedUser) : null;
  }, [selectedUser]);

  const isSupportUser = useMemo(() => {
    if (!selectedUserView) return false;
    return SUPPORT_USER_ROLES.has(selectedUserView.role);
  }, [selectedUserView]);

  const loadSelectedSupportState = useCallback(async () => {
    const request = ++supportRequest.current;
    if (!selectedUserView?.id || !isSupportUser) {
      setSupportProfile(null);
      setSupportSession(null);
      setSupportError("");
      setSupportLoading(false);
      return;
    }
    setSupportLoading(true);
    try {
      const [profileResult, sessionResult] = await Promise.all([
        fetchSupportAgentProfile(supabase, selectedUserView.id),
        fetchActiveAgentSession(supabase, selectedUserView.id),
      ]);
      if (request !== supportRequest.current) return;
      setSupportProfile(profileResult.ok ? profileResult.data : null);
      setSupportSession(sessionResult.ok ? sessionResult.data : null);
      setSupportError(profileResult.error || sessionResult.error || "");
    } catch {
      if (request === supportRequest.current) setSupportError("No se pudo cargar el estado del asesor.");
    } finally {
      if (request === supportRequest.current) setSupportLoading(false);
    }
  }, [isSupportUser, selectedUserView?.id]);

  useEffect(() => {
    void loadSelectedSupportState();
  }, [loadSelectedSupportState]);

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return users.map(parseUserView).filter((item) => {
      if (roleFilter !== "todos" && item.role !== roleFilter) return false;
      if (statusFilter !== "todos" && item.status !== statusFilter) return false;
      if (emailFilter === "confirmado" && !item.emailVerified) return false;
      if (emailFilter === "pendiente" && item.emailVerified) return false;

      if (!normalizedQuery) return true;
      return (
        item.displayName.toLowerCase().includes(normalizedQuery) ||
        item.email.toLowerCase().includes(normalizedQuery) ||
        item.publicId.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [emailFilter, query, roleFilter, statusFilter, users]);

  const handleCreateSupportUser = useCallback(async () => {
    const email = createEmail.trim().toLowerCase();
    const nombre = createNombre.trim();
    const apellido = createApellido.trim();

    if (!email || !nombre || !apellido) {
      setCreateError("Debes ingresar email, nombre y apellido.");
      return;
    }

    setCreating(true);
    setCreateError("");
    setCreatedData(null);

    try {
      const result = await mobileApi.support.createAdminUser({
        email,
        nombre,
        apellido,
        role: createRole,
      });
      if (!result?.ok) {
        setCreateError(result?.error || "No se pudo crear la cuenta.");
        return;
      }
      const payload = result?.data?.ok ? result.data : result?.data || {};
      setCreatedData(payload);
      setCreateEmail("");
      setCreateNombre("");
      setCreateApellido("");
      await refreshAll();
    } catch {
      setCreateError("No se pudo crear la cuenta.");
    } finally {
      setCreating(false);
    }
  }, [createApellido, createEmail, createNombre, createRole, refreshAll]);

  const handleToggleSupportAuthorization = useCallback(async () => {
    if (!selectedUserView?.id || !isSupportUser) return;

    setSupportBusy("authorize");
    setSupportError("");
    const nextAuthorized = !supportProfile?.authorized_for_work;
    const payload: any = {
      user_id: selectedUserView.id,
      authorized_for_work: nextAuthorized,
      blocked: false,
      authorized_until: nextAuthorized
        ? new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString()
        : null,
    };
    try {
      const { error: upsertError } = await supabase
        .from("support_agent_profiles")
        .upsert(payload, { onConflict: "user_id" });
      if (upsertError) {
        setSupportError(upsertError.message || "No se pudo actualizar la autorización.");
        return;
      }
      await loadSelectedSupportState();
    } catch {
      setSupportError("No se pudo actualizar la autorización.");
    } finally {
      setSupportBusy("");
    }
  }, [isSupportUser, loadSelectedSupportState, selectedUserView?.id, supportProfile?.authorized_for_work]);

  const handleStartSupportSession = useCallback(async () => {
    if (!selectedUserView?.id || !isSupportUser) return;
    setSupportBusy("start_session");
    setSupportError("");
    try {
      const result = await mobileApi.support.startAdminSession({ agent_id: selectedUserView.id });
      if (!result?.ok) {
        setSupportError(result?.error || "No se pudo iniciar la sesión del asesor.");
        return;
      }
      await loadSelectedSupportState();
    } catch {
      setSupportError("No se pudo iniciar la sesión del asesor.");
    } finally {
      setSupportBusy("");
    }
  }, [isSupportUser, loadSelectedSupportState, selectedUserView?.id]);

  const handleEndSupportSession = useCallback(async () => {
    if (!selectedUserView?.id || !isSupportUser) return;
    setSupportBusy("end_session");
    setSupportError("");
    try {
      const result = await mobileApi.support.endAdminSession({
        agent_id: selectedUserView.id,
        reason: "admin_revoke",
      });
      if (!result?.ok) {
        setSupportError(result?.error || "No se pudo finalizar la sesión del asesor.");
        return;
      }
      await loadSelectedSupportState();
    } catch {
      setSupportError("No se pudo finalizar la sesión del asesor.");
    } finally {
      setSupportBusy("");
    }
  }, [isSupportUser, loadSelectedSupportState, selectedUserView?.id]);

  function openUser(item: UserView) {
    if (!item.id) return;
    setSupportProfile(null);
    setSupportSession(null);
    setSupportError("");
    setSupportLoading(SUPPORT_USER_ROLES.has(item.role));
    setSelectedUserId(item.id);
  }

  const columns: StaffTableColumn<UserView>[] = [
    { key: "name", label: "Usuario", width: 145, render: (item) => (
      <Pressable accessibilityRole="button" onPress={() => openUser(item)}>
        <Text style={styles.userName} numberOfLines={2}>{item.displayName}</Text>
        <Text style={styles.userMeta} numberOfLines={1}>{item.publicId}</Text>
      </Pressable>
    ) },
    { key: "role", label: "Rol", width: 94, render: (item) => <StaffTableBadge value={item.role} tone="purple" /> },
    { key: "status", label: "Estado", width: 99, render: (item) => <StaffTableBadge value={item.status} tone={statusTone(item.status)} /> },
    { key: "email", label: "Email", width: 206, render: (item) => <Text numberOfLines={2} style={styles.userMeta}>{item.email}</Text> },
  ];
  if (width >= 768) {
    columns.push(
      { key: "created", label: "Registro", width: 132, render: (item) => <Text style={styles.userMeta}>{formatDateTime(item.createdAt)}</Text> },
      { key: "verified", label: "Confirmado", width: 128, render: (item) => <StaffTableBadge value={item.emailVerified ? "Confirmado" : "Pendiente"} tone={item.emailVerified ? "positive" : "warning"} /> },
    );
  }
  columns.push({ key: "action", label: "Acciones", width: 90, align: "right", render: (item) => (
    <Pressable accessibilityRole="button" accessibilityLabel={`Ver ${item.displayName}`} onPress={() => openUser(item)} style={styles.outlineBtn}>
      <Text style={styles.outlineBtnText}>Ver</Text>
    </Pressable>
  ) });

  return (
    <ScreenScaffold title="Usuarios" subtitle="Gestión y control de cuentas" onRefresh={refreshing ? undefined : refreshAll}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        <View style={[styles.pageHeading, width >= 768 && styles.pageHeadingWide]}>
          <View style={styles.pageHeadingCopy}>
            <Text accessibilityRole="header" style={styles.pageTitle}>Usuarios</Text>
            <Text style={styles.metaText}>Supervisa registros, roles y estados de cuenta.</Text>
          </View>
          <Pressable accessibilityRole="button" onPress={() => setCreateOpen(true)} style={styles.createButton}>
            <Image source={staffIcons.plus} style={styles.plusIcon} />
            <Text style={styles.primaryBtnText}>Crear cuenta interna</Text>
          </Pressable>
        </View>

        <View style={[styles.filters, width >= 768 && styles.filtersWide]}>
          <View style={styles.filterControl}>
            <Image source={staffIcons.search} style={styles.filterIcon} />
            <TextInput
              accessibilityLabel="Buscar usuario o email"
              value={query}
              onChangeText={setQuery}
              placeholder="Buscar usuario o email"
              placeholderTextColor="#64748B"
              style={styles.searchInput}
            />
          </View>
          <StaffSelect label="Rol" value={roleFilter} options={ROLE_FILTERS} onSelect={setRoleFilter} />
          <StaffSelect label="Estado" value={statusFilter} options={STATUS_FILTERS} onSelect={setStatusFilter} />
          <StaffSelect label="Email" value={emailFilter} options={EMAIL_FILTERS} onSelect={setEmailFilter} />
        </View>

        {error ? <Text accessibilityLiveRegion="polite" style={styles.errorMessage}>{error}</Text> : null}
        {loading ? <BlockSkeleton lines={8} compact /> : (
          <StaffTable columns={columns} rows={filteredUsers} getKey={(item) => item.id || item.publicId} emptyMessage="No hay usuarios para los filtros actuales." />
        )}
      </ScrollView>

      <UserDrawer
        visible={createOpen}
        title="Crear cuenta interna"
        caption="Usuarios"
        locked={creating}
        onClose={() => {
          setCreateOpen(false);
          setCreateError("");
          setCreatedData(null);
        }}
      >
        <View style={styles.form}>
          <TextInput
            value={createEmail}
            onChangeText={setCreateEmail}
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            value={createNombre}
            onChangeText={setCreateNombre}
            placeholder="Nombre"
            style={styles.input}
          />
          <TextInput
            value={createApellido}
            onChangeText={setCreateApellido}
            placeholder="Apellido"
            style={styles.input}
          />
          <Text style={styles.label}>Rol</Text>
          <View style={styles.chipsWrap}>
            {CREATE_ROLE_OPTIONS.map((option) => (
              <Pressable
                key={option.id}
                onPress={() => setCreateRole(option.id)}
                style={[styles.chip, createRole === option.id && styles.chipActive]}
              >
                <Text style={[styles.chipText, createRole === option.id && styles.chipTextActive]}>
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable
            onPress={() => void handleCreateSupportUser()}
            disabled={creating}
            style={[styles.primaryBtn, creating && styles.btnDisabled]}
          >
            <Text style={styles.primaryBtnText}>{creating ? "Creando..." : "Crear cuenta"}</Text>
          </Pressable>

          {createError ? <Text style={styles.errorText}>{createError}</Text> : null}
          {createdData ? (
            <View style={styles.successBox}>
              <Text style={styles.successTitle}>Cuenta creada</Text>
              <Text style={styles.successText}>email: {String(createdData?.email || "-")}</Text>
              <Text style={styles.successText}>rol: {String(createdData?.role || "-")}</Text>
              <Text style={styles.successText}>
                public_id: {String(createdData?.public_id || "n/a")}
              </Text>
              <Text style={styles.successText}>
                password temporal: {String(createdData?.password || "n/a")}
              </Text>
            </View>
          ) : null}
        </View>
      </UserDrawer>

      {selectedUserView ? (
        <UserDrawer visible title={selectedUserView.displayName} caption="Usuario" locked={Boolean(supportBusy)} onClose={() => setSelectedUserId("")}>
          <View style={styles.actionsRow}>
            <StaffTableBadge value={selectedUserView.role} tone="purple" />
            <StaffTableBadge value={selectedUserView.status} tone={statusTone(selectedUserView.status)} />
          </View>
          <View style={styles.detailsPanel}>
            <Text style={styles.detailTitle}>Datos personales</Text>
            <View style={styles.detailRow}><Image source={staffIcons.mail} style={styles.filterIcon} /><Text style={styles.userMeta}>{selectedUserView.email}</Text></View>
            <View style={styles.detailRow}><Image source={staffIcons.phone} style={styles.filterIcon} /><Text style={styles.userMeta}>{selectedUserView.phone}</Text></View>
            <Text style={styles.userMeta}>ID: {selectedUserView.publicId}</Text>
            <Text style={styles.userMeta}>Registro: {formatDateTime(selectedUserView.createdAt)}</Text>
            <Text style={styles.userMeta}>Email {selectedUserView.emailVerified ? "confirmado" : "pendiente"}</Text>
          </View>
              {isSupportUser ? (
                <View style={styles.supportWrap}>
                  <Text style={styles.label}>Control de asesor</Text>
                  {supportLoading ? <BlockSkeleton lines={2} compact /> : null}
                  {!supportLoading ? (
                    <>
                      <Text style={styles.userMeta}>
                        autorizado: {supportProfile?.authorized_for_work ? "si" : "no"} | bloqueado:{" "}
                        {supportProfile?.blocked ? "si" : "no"}
                      </Text>
                      <Text style={styles.userMeta}>
                        solicitud: {String(supportProfile?.session_request_status || "sin solicitud")}
                      </Text>
                      <Text style={styles.userMeta}>
                        sesion activa: {supportSession?.id ? "si" : "no"}
                      </Text>
                      {supportSession?.start_at ? (
                        <Text style={styles.userMeta}>
                          inicio sesion: {formatDateTime(supportSession.start_at)}
                        </Text>
                      ) : null}
                      {supportError ? <Text style={styles.errorText}>{supportError}</Text> : null}
                    </>
                  ) : null}

                  <View style={styles.actionsRow}>
                    <Pressable
                      onPress={() => void handleToggleSupportAuthorization()}
                      disabled={Boolean(supportBusy || supportLoading)}
                      style={[styles.secondaryBtn, supportBusy === "authorize" && styles.btnDisabled]}
                    >
                      <Text style={styles.secondaryBtnText}>
                        {supportProfile?.authorized_for_work ? "Revocar" : "Autorizar"}
                      </Text>
                    </Pressable>
                    {!supportSession?.id ? (
                      <Pressable
                        onPress={() => void handleStartSupportSession()}
                        disabled={Boolean(supportBusy || supportLoading)}
                        style={[styles.primaryBtn, supportBusy === "start_session" && styles.btnDisabled]}
                      >
                        <Text style={styles.primaryBtnText}>Iniciar sesion</Text>
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() => void handleEndSupportSession()}
                        disabled={Boolean(supportBusy || supportLoading)}
                        style={[styles.outlineBtn, supportBusy === "end_session" && styles.btnDisabled]}
                      >
                        <Text style={styles.outlineBtnText}>Cerrar sesion</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              ) : null}
        </UserDrawer>
      ) : null}
    </ScreenScaffold>
  );
}

function UserDrawer({ visible, title, caption, locked = false, onClose, children }: {
  visible: boolean;
  title: string;
  caption: string;
  locked?: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={locked ? () => undefined : onClose}>
      <View style={styles.drawerOverlay}>
        <Pressable accessibilityRole="button" accessibilityLabel="Cerrar" onPress={onClose} disabled={locked} style={StyleSheet.absoluteFill} />
        <View accessibilityViewIsModal style={[styles.drawer, { paddingTop: insets.top, paddingRight: insets.right, paddingBottom: insets.bottom }]}>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.drawerContent}>
            <View style={styles.drawerHeading}>
              <View style={styles.pageHeadingCopy}>
                <Text style={styles.drawerCaption}>{caption}</Text>
                <Text accessibilityRole="header" style={styles.drawerTitle}>{title}</Text>
              </View>
              <Pressable accessibilityRole="button" onPress={onClose} disabled={locked} style={[styles.outlineBtn, locked && styles.btnDisabled]}>
                <Text style={styles.outlineBtnText}>Cerrar</Text>
              </Pressable>
            </View>
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 20,
    paddingBottom: 48,
  },
  pageHeading: { gap: 12, alignItems: "flex-start" },
  pageHeadingWide: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  pageHeadingCopy: { flexShrink: 1, gap: 2 },
  pageTitle: { color: "#2F1A55", fontSize: 18, lineHeight: 28, fontWeight: "600", includeFontPadding: false },
  createButton: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#5E30A5", borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12, elevation: 1 },
  plusIcon: { width: 14, height: 14, tintColor: "#FFFFFF" },
  filters: { padding: 16, gap: 12, borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 16, backgroundColor: "#FFFFFF", elevation: 1 },
  filtersWide: { flexDirection: "row", flexWrap: "wrap" },
  filterControl: { flexGrow: 1, minHeight: 40, flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#F8FAFC", borderColor: "#E2E8F0", borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 },
  filterIcon: { height: 14, width: 14, tintColor: "#64748B" },
  searchInput: { flex: 1, minWidth: 140, padding: 0, fontSize: 14, color: "#475569", fontWeight: "600", includeFontPadding: false },
  errorMessage: { borderWidth: 1, borderColor: "#FECACA", borderRadius: 12, padding: 12, color: "#B91C1C", backgroundColor: "#FFF1F2", fontSize: 12 },
  drawerOverlay: { flex: 1, alignItems: "flex-end", backgroundColor: "#00000066" },
  drawer: { flex: 1, width: "100%", maxWidth: 448, backgroundColor: "#FFFFFF", elevation: 10 },
  drawerContent: { padding: 24, gap: 16 },
  drawerHeading: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 },
  drawerCaption: { color: "#64748B", textTransform: "uppercase", letterSpacing: 1, fontSize: 12 },
  drawerTitle: { color: "#2F1A55", fontSize: 20, fontWeight: "700" },
  form: { gap: 10 },
  detailsPanel: { backgroundColor: "#FAF8FF", borderColor: "#E9E2F7", borderWidth: 1, borderRadius: 16, padding: 16, gap: 8 },
  detailRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#E9E2F7",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    color: "#2F1A55",
    paddingHorizontal: 10,
    paddingVertical: 9,
    fontSize: 13,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#E9E2F7",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
  },
  chipActive: {
    borderColor: "#5E30A5",
    backgroundColor: "#F0EBFF",
  },
  chipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#334155",
  },
  chipTextActive: {
    color: "#5E30A5",
  },
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  primaryBtn: {
    backgroundColor: "#5E30A5",
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#E9E2F7",
    backgroundColor: "#F0EBFF",
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  secondaryBtnText: {
    color: "#5E30A5",
    fontSize: 12,
    fontWeight: "700",
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: "#E9E2F7",
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  outlineBtnText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
  },
  btnDisabled: {
    opacity: 0.55,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 12,
    fontWeight: "600",
  },
  metaText: {
    fontSize: 12,
    color: "#64748B",
  },
  successBox: {
    borderWidth: 1,
    borderColor: "#86EFAC",
    backgroundColor: "#F0FDF4",
    borderRadius: 10,
    padding: 10,
    gap: 2,
  },
  successTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#166534",
  },
  successText: {
    fontSize: 12,
    color: "#166534",
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  userMeta: {
    fontSize: 11,
    color: "#475569",
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2F1A55",
  },
  supportWrap: {
    gap: 8,
    borderWidth: 1,
    borderColor: "#E9E2F7",
    borderRadius: 16,
    padding: 16,
  },
});
