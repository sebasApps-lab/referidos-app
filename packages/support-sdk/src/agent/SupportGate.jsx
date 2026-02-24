import React, { useCallback, useEffect, useState } from "react";
import { ShieldAlert, ShieldCheck, RefreshCw } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useAppStore } from "../../store/appStore";
import { isSupportLiveUpdatesEnabled } from "../runtime/systemFeatureFlags";
import {
  fetchSupportRuntimeFlags,
  getCachedSupportRuntimeFlags,
  subscribeSupportRuntimeFlags,
} from "../runtime/supportRuntimeFlags";
import {
  startSupportSession,
  endSupportSession,
  pingSupportSession,
} from "../supportClient";

export default function SupportGate({ children }) {
  const usuario = useAppStore((s) => s.usuario);
  const liveUpdatesEnabled = isSupportLiveUpdatesEnabled();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionActive, setSessionActive] = useState(false);
  const [requestPending, setRequestPending] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [endLoading, setEndLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [runtimeFlags, setRuntimeFlags] = useState(() =>
    getCachedSupportRuntimeFlags()
  );
  const requireSessionAuthorization = Boolean(
    runtimeFlags.require_session_authorization
  );
  const requireJornadaAuthorization = Boolean(
    runtimeFlags.require_jornada_authorization
  );

  const syncStatus = useCallback(async () => {
    if (!usuario?.id) {
      setProfile(null);
      setSessionActive(false);
      setRequestPending(false);
      return;
    }

    let { data: profileData } = await supabase
      .from("support_agent_profiles")
      .select(
        "authorized_for_work, authorized_until, blocked, session_request_status"
      )
      .eq("user_id", usuario.id)
      .limit(1)
      .maybeSingle();

    if (!profileData) {
      await supabase
        .from("support_agent_profiles")
        .upsert({ user_id: usuario.id }, { onConflict: "user_id" });

      const { data: profileRetry } = await supabase
        .from("support_agent_profiles")
        .select(
          "authorized_for_work, authorized_until, blocked, session_request_status"
        )
        .eq("user_id", usuario.id)
        .limit(1)
        .maybeSingle();
      profileData = profileRetry || null;
    }

    setProfile(profileData || null);
    setRequestPending(profileData?.session_request_status === "pending");

    const { data: session } = await supabase
      .from("support_agent_sessions")
      .select("id")
      .eq("agent_id", usuario.id)
      .is("end_at", null)
      .order("start_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    setSessionActive(Boolean(session?.id));
  }, [usuario?.id]);

  useEffect(() => {
    let active = true;
    const loadFlags = async () => {
      const nextFlags = await fetchSupportRuntimeFlags();
      if (!active) return;
      setRuntimeFlags(nextFlags);
    };
    loadFlags();
    const unsubscribe = subscribeSupportRuntimeFlags(setRuntimeFlags);
    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    let active = true;
    const loadProfile = async () => {
      await syncStatus();
      if (!active) return;
      setLoading(false);
    };
    if (usuario?.id) {
      loadProfile();
    } else {
      setLoading(false);
      setProfile(null);
      setSessionActive(false);
      setRequestPending(false);
    }
    return () => {
      active = false;
    };
  }, [syncStatus, usuario?.id]);

  useEffect(() => {
    if (!profile?.authorized_for_work) return undefined;
    const interval = setInterval(() => {
      if (sessionActive) {
        pingSupportSession();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [profile, sessionActive]);

  useEffect(() => {
    if (!liveUpdatesEnabled) return undefined;
    if (!usuario?.id) return undefined;

    const channel = supabase
      .channel(`support-gate-${usuario.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "support_agent_sessions",
          filter: `agent_id=eq.${usuario.id}`,
        },
        () => {
          void syncStatus();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [liveUpdatesEnabled, syncStatus, usuario?.id]);

  useEffect(() => {
    if (!liveUpdatesEnabled) return undefined;
    if (!usuario?.id || sessionActive) return undefined;
    if (!requestPending && !profile?.authorized_for_work) return undefined;
    const poll = globalThis.setInterval(() => {
      void syncStatus();
    }, 5000);
    return () => {
      globalThis.clearInterval(poll);
    };
  }, [
    profile?.authorized_for_work,
    requestPending,
    sessionActive,
    liveUpdatesEnabled,
    syncStatus,
    usuario?.id,
  ]);

  if (loading) {
    return (
      <>
        <div className="text-sm text-slate-500">Cargando...</div>
      </>
    );
  }

  if (!profile || profile.blocked) {
    return (
      <>
        <div className="rounded-3xl border border-[#E9E2F7] bg-white p-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F8EFFE] text-[#5E30A5]">
            <ShieldAlert size={20} />
          </div>
          <div className="text-sm font-semibold text-[#2F1A55]">
            Esperando autorizacion
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Un admin debe habilitar tu turno para atender tickets.
          </div>
          <button
            type="button"
            onClick={async () => {
              setRefreshing(true);
              await syncStatus();
              setRefreshing(false);
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-[#E9E2F7] px-4 py-2 text-xs font-semibold text-slate-600"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            Recargar
          </button>
        </div>
      </>
    );
  }

  const hasJornadaAuthorization =
    !requireJornadaAuthorization || Boolean(profile.authorized_for_work);
  const sessionApprovalPending =
    requireSessionAuthorization && Boolean(requestPending);

  if (!hasJornadaAuthorization) {
    return (
      <>
        <div className="rounded-3xl border border-[#E9E2F7] bg-white p-6 text-center space-y-3">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#F8EFFE] text-[#5E30A5]">
            <ShieldAlert size={20} />
          </div>
          <div className="text-sm font-semibold text-[#2F1A55]">
            Esperando autorizacion
          </div>
          <div className="text-xs text-slate-500">
            Un admin debe habilitar tu turno para atender tickets.
          </div>
          {requestPending ? (
            <div className="text-xs text-slate-500">
              Solicitud enviada. Espera la confirmacion del admin.
            </div>
          ) : (
            <button
              type="button"
              onClick={async () => {
                setStartLoading(true);
                const result = await startSupportSession();
                setStartLoading(false);
                if (result.ok && result.data?.pending) {
                  setRequestPending(true);
                  await syncStatus();
                } else if (result.ok) {
                  setSessionActive(true);
                  await syncStatus();
                }
              }}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold text-white ${
                startLoading ? "bg-[#C9B6E8]" : "bg-[#5E30A5]"
              }`}
            >
              {startLoading ? "Solicitando..." : "Solicitar autorizacion"}
            </button>
          )}
          <button
            type="button"
            onClick={async () => {
              setRefreshing(true);
              await syncStatus();
              setRefreshing(false);
            }}
            className="inline-flex items-center gap-2 rounded-2xl border border-[#E9E2F7] px-4 py-2 text-xs font-semibold text-slate-600"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            Recargar
          </button>
        </div>
      </>
    );
  }

  if (!sessionActive) {
    return (
      <>
        <div className="rounded-3xl border border-[#E9E2F7] bg-white p-6 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F8EFFE] text-[#5E30A5]">
            <ShieldCheck size={20} />
          </div>
          <div className="text-sm font-semibold text-[#2F1A55]">
            Iniciar jornada
          </div>
          <div className="text-xs text-slate-500">
            Inicia tu sesion de soporte para aparecer como disponible.
          </div>
          {sessionApprovalPending ? (
            <div className="space-y-3">
              <div className="text-xs text-slate-500">
                Esperando confirmacion del admin.
              </div>
              <button
                type="button"
                onClick={async () => {
                  setRefreshing(true);
                  await syncStatus();
                  setRefreshing(false);
                }}
                className="inline-flex items-center gap-2 rounded-2xl border border-[#E9E2F7] px-4 py-2 text-xs font-semibold text-slate-600"
              >
                <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
                Recargar
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={async () => {
                setStartLoading(true);
                const result = await startSupportSession();
                setStartLoading(false);
                if (result.ok && result.data?.pending) {
                  setRequestPending(true);
                  await syncStatus();
                } else if (result.ok) {
                  setSessionActive(true);
                  await syncStatus();
                }
              }}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold text-white ${
                startLoading ? "bg-[#C9B6E8]" : "bg-[#5E30A5]"
              }`}
            >
              {startLoading
                ? requireSessionAuthorization
                  ? "Solicitando..."
                  : "Iniciando..."
                : requireSessionAuthorization
                ? "Solicitar inicio de sesion"
                : "Iniciar jornada"}
            </button>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-[#E9E2F7] bg-white p-4 text-right">
        <button
          type="button"
          onClick={async () => {
            setEndLoading(true);
            const result = await endSupportSession({ reason: "manual_end" });
            setEndLoading(false);
            if (result.ok) {
              setSessionActive(false);
            }
          }}
          className={`rounded-2xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold ${
            endLoading ? "text-slate-400" : "text-slate-600"
          }`}
        >
          {endLoading ? "Cerrando..." : "Terminar jornada"}
        </button>
      </div>
      {children}
    </div>
  );
}
