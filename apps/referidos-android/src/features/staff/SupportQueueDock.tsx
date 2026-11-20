import React, { useEffect, useState } from "react";
import { AppState, Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import { supabase } from "@shared/services/mobileApi";

const POLL_INTERVAL_MS = 5000;
const ASSIGNMENT_WINDOW_MS = 30000;
const ACTIVE_STATUSES = ["starting", "in_progress", "waiting_user"];

type ActiveTicket = { public_id: string; status: string };
type Assignment = { payload: unknown; expires_at: string | null };

type QueueSnapshot = {
  agentId: string;
  personalCount: number | null;
  ticketCode: string | null;
  recentAssignment: boolean;
};

function getAssignmentTicket(rows: Assignment[], tickets: ActiveTicket[], now: number) {
  for (const row of rows) {
    if (row.expires_at && Date.parse(row.expires_at) <= now) continue;
    if (!row.payload || typeof row.payload !== "object") continue;
    const { thread_public_id: publicId, public_id: legacyPublicId, thread_code: legacyCode } = row.payload as Record<string, unknown>;
    const code = String(publicId || legacyPublicId || legacyCode || "").trim();
    if (code && tickets.some((ticket) => ticket.public_id === code)) return code;
  }
  return null;
}

async function readQueue(agentId: string, signal: AbortSignal): Promise<QueueSnapshot> {
  const [countResult, activeResult] = await Promise.allSettled([
    supabase.from("support_threads").select("id", { head: true, count: "exact" })
      .eq("assigned_agent_id", agentId).eq("status", "queued").eq("personal_queue", true)
      .abortSignal(signal),
    supabase.from("support_threads").select("public_id, status")
      .eq("assigned_agent_id", agentId).in("status", ACTIVE_STATUSES)
      .order("updated_at", { ascending: false }).abortSignal(signal),
  ]);

  const personalCount = countResult.status === "fulfilled" && !countResult.value.error
    ? countResult.value.count ?? null
    : null;
  const activeTickets: ActiveTicket[] = activeResult.status === "fulfilled" && !activeResult.value.error
    ? activeResult.value.data || []
    : [];
  const currentTicket = activeTickets.find((ticket) => ticket.status === "starting")
    ?? activeTickets.find((ticket) => ticket.status === "in_progress")
    ?? activeTickets[0];

  let assignmentCode: string | null = null;
  if (currentTicket && !signal.aborted) {
    const now = Date.now();
    try {
      const { data, error } = await supabase.from("app_notifications").select("payload, expires_at")
        .eq("recipient_user_id", agentId).eq("scope", "support").eq("event_type", "support.ticket.assigned")
        .eq("is_read", false).gte("created_at", new Date(now - ASSIGNMENT_WINDOW_MS).toISOString())
        .order("created_at", { ascending: false }).limit(30).abortSignal(signal);
      if (!error) assignmentCode = getAssignmentTicket(data || [], activeTickets, now);
    } catch {
      // Active tickets and counts can be displayed when notifications are unavailable.
    }
  }

  return {
    agentId,
    personalCount,
    ticketCode: assignmentCode ?? currentTicket?.public_id ?? null,
    recentAssignment: assignmentCode !== null,
  };
}

type Props = {
  agentId: string;
  visible: boolean;
  onOpenInbox?: () => void;
  onOpenTicket: (threadPublicId: string) => void;
};

export default function SupportQueueDock({ agentId, visible, onOpenInbox, onOpenTicket }: Props) {
  const [foreground, setForeground] = useState(() => AppState.currentState === null || AppState.currentState === "active");
  const [keyboardVisible, setKeyboardVisible] = useState(() => Keyboard.isVisible());
  const [snapshot, setSnapshot] = useState<QueueSnapshot | null>(null);
  const enabled = Boolean(agentId && visible && foreground && !keyboardVisible);

  useEffect(() => {
    const appState = AppState.addEventListener("change", (state) => setForeground(state === "active"));
    const appBlur = AppState.addEventListener("blur", () => setForeground(false));
    const appFocus = AppState.addEventListener("focus", () => setForeground(AppState.currentState === "active"));
    const keyboardShow = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const keyboardHide = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      appState.remove();
      appBlur.remove();
      appFocus.remove();
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      setSnapshot(null);
      return;
    }

    const controller = new AbortController();
    let pending = false;

    async function refresh() {
      if (pending || controller.signal.aborted) return;
      pending = true;
      try {
        const next = await readQueue(agentId, controller.signal);
        if (!controller.signal.aborted) setSnapshot(next);
      } catch {
        if (!controller.signal.aborted) setSnapshot(null);
      } finally {
        pending = false;
      }
    }

    void refresh();
    const timer = setInterval(() => { void refresh(); }, POLL_INTERVAL_MS);
    return () => {
      clearInterval(timer);
      controller.abort();
    };
  }, [agentId, enabled]);

  if (!enabled || snapshot?.agentId !== agentId) return null;
  const { personalCount, ticketCode, recentAssignment } = snapshot;
  if (!ticketCode && !personalCount) return null;

  const title = ticketCode ? `${recentAssignment ? "Ticket asignado" : "Ticket en curso"} ${ticketCode}` : "Cola de soporte";

  return (
    <View style={styles.dock}>
      <View style={styles.labels} accessibilityLiveRegion="polite">
        <Text style={styles.title}>{title}</Text>
        {personalCount !== null && <Text style={styles.count}>En cola: {personalCount}</Text>}
      </View>
      {onOpenInbox && (
        <Pressable accessibilityRole="button" accessibilityLabel="Abrir bandeja de soporte" hitSlop={4} onPress={onOpenInbox} style={styles.secondaryAction}>
          <Text style={styles.secondaryLabel}>Inbox</Text>
        </Pressable>
      )}
      {ticketCode && (
        <Pressable accessibilityRole="button" accessibilityLabel={`Abrir ticket ${ticketCode}`} hitSlop={4} onPress={() => onOpenTicket(ticketCode)} style={styles.primaryAction}>
          <Text style={styles.primaryLabel}>Ver ticket</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dock: {
    alignSelf: "center",
    maxWidth: "92%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 2,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#BCC5D1",
    backgroundColor: "#F1F5F9",
    zIndex: 1,
    elevation: 3,
  },
  labels: { flexShrink: 1, gap: 2 },
  title: { color: "#2F1A55", fontSize: 13, fontWeight: "600" },
  count: { color: "#475569", fontSize: 12, fontWeight: "500" },
  secondaryAction: { minHeight: 36, justifyContent: "center", paddingHorizontal: 10, borderRadius: 10, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E9E2F7" },
  secondaryLabel: { color: "#5E30A5", fontSize: 12, fontWeight: "600" },
  primaryAction: { minHeight: 36, justifyContent: "center", paddingHorizontal: 10, borderRadius: 10, backgroundColor: "#5E30A5" },
  primaryLabel: { color: "#FFFFFF", fontSize: 12, fontWeight: "600" },
});
