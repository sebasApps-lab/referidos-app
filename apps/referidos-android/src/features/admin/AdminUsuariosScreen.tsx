import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
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
  const createdAt = readFirst(row, ["created_at", "createdAt", "fecha_creacion"], null);

  return {
    id,
    publicId,
    displayName,
    email,
    role,
    status,
    emailVerified,
    createdAt,
  };
}

export default function AdminUsuariosScreen() {
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

  const loadUsers = useCallback(async () => {
    if (!refreshing) setLoading(true);

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

    if (!selectedUserId && rows.length > 0) {
      setSelectedUserId(String(rows[0]?.id || ""));
    } else if (selectedUserId) {
      const stillExists = rows.some((item: any) => String(item?.id || "") === selectedUserId);
      if (!stillExists && rows.length > 0) {
        setSelectedUserId(String(rows[0]?.id || ""));
      }
    }

    setLoading(false);
  }, [refreshing, selectedUserId]);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    await loadUsers();
    setRefreshing(false);
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
    if (!selectedUserView?.id || !isSupportUser) {
      setSupportProfile(null);
      setSupportSession(null);
      setSupportError("");
      return;
    }
    setSupportLoading(true);
    const [profileResult, sessionResult] = await Promise.all([
      fetchSupportAgentProfile(supabase, selectedUserView.id),
      fetchActiveAgentSession(supabase, selectedUserView.id),
    ]);

    setSupportProfile(profileResult.ok ? profileResult.data : null);
    setSupportSession(sessionResult.ok ? sessionResult.data : null);
    setSupportError(
      profileResult.error || sessionResult.error || "",
    );
    setSupportLoading(false);
  }, [isSupportUser, selectedUserView?.id]);

  useEffect(() => {
    void loadSelectedSupportState();
  }, [loadSelectedSupportState]);

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return users.filter((row) => {
      const item = parseUserView(row);

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

    const result = await mobileApi.support.createAdminUser({
      email,
      nombre,
      apellido,
      role: createRole,
    });

    setCreating(false);

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
    const { error: upsertError } = await supabase
      .from("support_agent_profiles")
      .upsert(payload, { onConflict: "user_id" });

    setSupportBusy("");
    if (upsertError) {
      setSupportError(upsertError.message || "No se pudo actualizar autorizacion.");
      return;
    }
    await loadSelectedSupportState();
  }, [isSupportUser, loadSelectedSupportState, selectedUserView?.id, supportProfile?.authorized_for_work]);

  const handleStartSupportSession = useCallback(async () => {
    if (!selectedUserView?.id || !isSupportUser) return;
    setSupportBusy("start_session");
    setSupportError("");
    const result = await mobileApi.support.startAdminSession({
      agent_id: selectedUserView.id,
    });
    setSupportBusy("");
    if (!result?.ok) {
      setSupportError(result?.error || "No se pudo iniciar sesion del asesor.");
      return;
    }
    await loadSelectedSupportState();
  }, [isSupportUser, loadSelectedSupportState, selectedUserView?.id]);

  const handleEndSupportSession = useCallback(async () => {
    if (!selectedUserView?.id || !isSupportUser) return;
    setSupportBusy("end_session");
    setSupportError("");
    const result = await mobileApi.support.endAdminSession({
      agent_id: selectedUserView.id,
      reason: "admin_revoke",
    });
    setSupportBusy("");
    if (!result?.ok) {
      setSupportError(result?.error || "No se pudo finalizar sesion del asesor.");
      return;
    }
    await loadSelectedSupportState();
  }, [isSupportUser, loadSelectedSupportState, selectedUserView?.id]);

  return (
    <ScreenScaffold title="Admin Usuarios" subtitle="Gestion de cuentas y alta de soporte">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard
          title="Control"
          subtitle="Listado de usuarios desde base real"
          right={
            <Pressable
              onPress={refreshAll}
              disabled={refreshing}
              style={[styles.secondaryBtn, refreshing && styles.btnDisabled]}
            >
              <Text style={styles.secondaryBtnText}>{refreshing ? "..." : "Recargar"}</Text>
            </Pressable>
          }
        >
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {!error ? <Text style={styles.metaText}>Usuarios cargados: {users.length}</Text> : null}
        </SectionCard>

        <SectionCard title="Crear cuenta soporte/dev/empleado">
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
        </SectionCard>

        <SectionCard title="Filtros">
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar por nombre, email o public_id"
            style={styles.input}
          />

          <Text style={styles.label}>Rol</Text>
          <View style={styles.chipsWrap}>
            {ROLE_FILTERS.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setRoleFilter(item.id)}
                style={[styles.chip, roleFilter === item.id && styles.chipActive]}
              >
                <Text style={[styles.chipText, roleFilter === item.id && styles.chipTextActive]}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Estado</Text>
          <View style={styles.chipsWrap}>
            {STATUS_FILTERS.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setStatusFilter(item.id)}
                style={[styles.chip, statusFilter === item.id && styles.chipActive]}
              >
                <Text style={[styles.chipText, statusFilter === item.id && styles.chipTextActive]}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Email verificado</Text>
          <View style={styles.chipsWrap}>
            {EMAIL_FILTERS.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setEmailFilter(item.id)}
                style={[styles.chip, emailFilter === item.id && styles.chipActive]}
              >
                <Text style={[styles.chipText, emailFilter === item.id && styles.chipTextActive]}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </SectionCard>

        <SectionCard title="Usuarios" subtitle={`Mostrando ${filteredUsers.length} de ${users.length}`}>
          {loading ? <BlockSkeleton lines={8} compact /> : null}
          {!loading && filteredUsers.length === 0 ? (
            <Text style={styles.metaText}>No hay usuarios para los filtros actuales.</Text>
          ) : null}

          {!loading
            ? filteredUsers.map((row, index) => {
                const item = parseUserView(row);
                const active = item.id === selectedUserId;
                return (
                  <Pressable
                    key={`${item.id || index}-${index}`}
                    onPress={() => setSelectedUserId(item.id)}
                    style={[styles.userCard, active && styles.userCardActive]}
                  >
                    <View style={styles.userTop}>
                      <Text style={styles.userName}>{item.displayName}</Text>
                      <Text style={styles.userRole}>{item.role}</Text>
                    </View>
                    <Text style={styles.userMeta}>{item.email}</Text>
                    <Text style={styles.userMeta}>
                      {item.publicId} | {item.status} | email{" "}
                      {item.emailVerified ? "confirmado" : "pendiente"}
                    </Text>
                    <Text style={styles.userMeta}>
                      registro: {formatDateTime(item.createdAt)}
                    </Text>
                  </Pressable>
                );
              })
            : null}
        </SectionCard>

        <SectionCard title="Detalle usuario">
          {!selectedUserView ? <Text style={styles.metaText}>Selecciona un usuario.</Text> : null}
          {selectedUserView ? (
            <View style={styles.detailWrap}>
              <Text style={styles.detailTitle}>{selectedUserView.displayName}</Text>
              <Text style={styles.userMeta}>
                {selectedUserView.publicId} | {selectedUserView.role}
              </Text>
              <Text style={styles.userMeta}>{selectedUserView.email}</Text>
              <Text style={styles.userMeta}>
                estado: {selectedUserView.status} | email{" "}
                {selectedUserView.emailVerified ? "confirmado" : "pendiente"}
              </Text>
              <Text style={styles.userMeta}>
                registro: {formatDateTime(selectedUserView.createdAt)}
              </Text>

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
                      disabled={supportBusy === "authorize"}
                      style={[styles.secondaryBtn, supportBusy === "authorize" && styles.btnDisabled]}
                    >
                      <Text style={styles.secondaryBtnText}>
                        {supportProfile?.authorized_for_work ? "Revocar" : "Autorizar"}
                      </Text>
                    </Pressable>
                    {!supportSession?.id ? (
                      <Pressable
                        onPress={() => void handleStartSupportSession()}
                        disabled={supportBusy === "start_session"}
                        style={[styles.primaryBtn, supportBusy === "start_session" && styles.btnDisabled]}
                      >
                        <Text style={styles.primaryBtnText}>Iniciar sesion</Text>
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() => void handleEndSupportSession()}
                        disabled={supportBusy === "end_session"}
                        style={[styles.outlineBtn, supportBusy === "end_session" && styles.btnDisabled]}
                      >
                        <Text style={styles.outlineBtnText}>Cerrar sesion</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              ) : null}
            </View>
          ) : null}
        </SectionCard>
      </ScrollView>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
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
    borderColor: "#CBD5E1",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
  },
  chipActive: {
    borderColor: "#1D4ED8",
    backgroundColor: "#DBEAFE",
  },
  chipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#334155",
  },
  chipTextActive: {
    color: "#1E3A8A",
  },
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  primaryBtn: {
    backgroundColor: "#1D4ED8",
    borderRadius: 9,
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
    borderColor: "#1D4ED8",
    backgroundColor: "#EFF6FF",
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  secondaryBtnText: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "700",
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 9,
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
  userCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    padding: 10,
    gap: 3,
  },
  userCardActive: {
    borderColor: "#1D4ED8",
    backgroundColor: "#EFF6FF",
  },
  userTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  userName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  userRole: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1D4ED8",
  },
  userMeta: {
    fontSize: 11,
    color: "#475569",
  },
  detailWrap: {
    gap: 4,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },
  supportWrap: {
    marginTop: 6,
    gap: 4,
  },
});
