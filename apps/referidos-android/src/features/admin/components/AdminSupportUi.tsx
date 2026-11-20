import React, { type ReactNode } from "react";
import { Text, View } from "react-native";
import { SupportBadge, supportChannelLabel, supportStatusLabel } from "@features/support/SupportTicketUi";
import { SupportDiagnosticItem, supportDetailStyles as styles } from "@features/support/SupportDiagnosticsUi";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";
import { toSupportThreadSubtitle } from "@shared/services/supportDeskQueries";

export function agentDisplayName(agent: any) {
  const name = [agent?.user?.nombre, agent?.user?.apellido].filter(Boolean).join(" ").trim();
  return name || String(agent?.user?.public_id || agent?.user_id || "Asesor");
}

export function AdminSupportAgentCard({ agent, children }: { agent: any; children: ReactNode }) {
  const authorized = Boolean(agent.authorized_for_work && !agent.blocked);
  const active = Boolean(agent.open_session?.id);
  const pending = agent.session_request_status === "pending";
  const ticket = String(readFirst(agent.active_ticket, ["public_id"], ""));
  const identity = [agent.user?.public_id, agent.user?.email, agent.user?.role].filter(Boolean).join(" · ");

  return (
    <SupportDiagnosticItem
      title={agentDisplayName(agent)}
      badge={<SupportBadge tone={authorized ? "positive" : agent.blocked ? "warning" : "neutral"}>
        {agent.blocked ? "Bloqueado" : authorized ? "Autorizado" : "Sin autorización"}
      </SupportBadge>}
    >
      {identity ? <Text style={styles.meta}>{identity}</Text> : null}
      <View style={styles.row}>
        <SupportBadge tone={active ? "positive" : "neutral"}>{active ? "Jornada activa" : "Jornada inactiva"}</SupportBadge>
        {pending ? <SupportBadge tone="warning">Solicitud pendiente</SupportBadge> : null}
      </View>
      {agent.authorized_until ? <Text style={styles.meta}>Autorizado hasta: {formatDateTime(agent.authorized_until)}</Text> : null}
      {ticket ? <Text style={styles.meta}>Ticket activo: {ticket}</Text> : null}
      {agent.support_phone ? <Text style={styles.meta}>Teléfono de soporte: {String(agent.support_phone)}</Text> : null}
      <View style={styles.row}>{children}</View>
    </SupportDiagnosticItem>
  );
}

export function AdminSupportThreadCard({ thread, assignedLabel, children }: { thread: any; assignedLabel?: string; children: ReactNode }) {
  const id = String(thread.public_id || "");
  const isAnonymous = thread.request_origin === "anonymous";
  const category = String(thread.category || "");
  const title = [id, category].filter(Boolean).join(" · ") || "Ticket";
  return (
    <SupportDiagnosticItem title={title} badge={<SupportBadge tone={thread.status === "closed" ? "positive" : "neutral"}>{supportStatusLabel(thread.status)}</SupportBadge>}>
      <Text style={styles.description} numberOfLines={3}>{String(thread.summary || "Sin resumen")}</Text>
      <View style={styles.row}>
        <SupportBadge tone={isAnonymous ? "warning" : "positive"}>{isAnonymous ? "Anónimo" : "Registrado"}</SupportBadge>
        {thread.app_channel ? <SupportBadge tone="info">{supportChannelLabel(String(thread.app_channel))}</SupportBadge> : null}
        {thread.severity ? <SupportBadge>{String(thread.severity)}</SupportBadge> : null}
        {thread.handoff_required ? <SupportBadge tone="warning">Abandonado</SupportBadge> : null}
      </View>
      <Text style={styles.meta}>{toSupportThreadSubtitle(thread)}</Text>
      <Text style={styles.meta}>Asesor: {assignedLabel || String(thread.assigned_agent_id || "Sin asignar")}</Text>
      {isAnonymous && thread.contact_display ? <Text style={styles.meta}>Contacto: {String(thread.contact_display)}</Text> : null}
      {thread.updated_at ? <Text style={styles.meta}>Actualizado: {formatDateTime(thread.updated_at)}</Text> : null}
      <View style={styles.row}>{children}</View>
    </SupportDiagnosticItem>
  );
}
