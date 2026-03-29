import React, { useCallback, useEffect, useState } from "react";
import { AlertTriangle, RefreshCw, ShieldAlert, ShieldCheck } from "lucide-react";
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

export default function SupportGate({ children, showSessionActions = true }) {
  const usuario = useAppStore((s) => s.usuario);
  const liveUpdatesEnabled = isSupportLiveUpdatesEnabled();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionActive, setSessionActive] = useState(false);
  const [requestPending, setRequestPending] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [endLoading, setEndLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sessionEndError, setSessionEndError] = useState("");
  const [abandonmentFlowStep, setAbandonmentFlowStep] = useState("none");
  const [abandonmentThreads, setAbandonmentThreads] = useState([]);
  const [abandonmentSubmitting, setAbandonmentSubmitting] = useState(false);
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
      const nextFlags = await fetchSupportRuntimeFlags({ force: true });
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

  const resetAbandonmentFlow = useCallback(() => {
    setAbandonmentFlowStep("none");
    setAbandonmentThreads([]);
    setAbandonmentSubmitting(false);
  }, []);

  const requestEndSession = useCallback(
    async (payload = {}) => {
      setSessionEndError("");
      const result = await endSupportSession({
        reason: "manual_end",
        ...payload,
      });

      if (result.ok) {
        setSessionActive(false);
        resetAbandonmentFlow();
        return result;
      }

      if (result.error === "abandonment_confirmation_required") {
        const threads = Array.isArray(result?.data?.threads)
          ? result.data.threads
          : [];
        setAbandonmentThreads(threads);
        setAbandonmentFlowStep("confirm");
        return result;
      }

      setSessionEndError("No se pudo terminar la jornada.");
      return result;
    },
    [resetAbandonmentFlow]
  );

  const handleEndSession = useCallback(async () => {
    setEndLoading(true);
    const result = await requestEndSession();
    setEndLoading(false);
    return result;
  }, [requestEndSession]);

  const handleConfirmAbandonment = () => {
    setSessionEndError("");
    setAbandonmentFlowStep("message");
  };

  const handleSendAbandonmentMessage = async () => {
    setAbandonmentSubmitting(true);
    const result = await requestEndSession({
      abandonment_confirmed: true,
      abandonment_message_sent: true,
    });
    setAbandonmentSubmitting(false);
    if (!result.ok && result.error !== "abandonment_confirmation_required") {
      setSessionEndError("No se pudo confirmar el abandono del ticket.");
    }
  };

  const closeAbandonmentFlow = () => {
    resetAbandonmentFlow();
    setSessionEndError("");
  };

  const renderAbandonmentModals = () => {
    if (abandonmentFlowStep === "none") return null;

    if (abandonmentFlowStep === "confirm") {
      return (
        <div className="fixed inset-0 z-[21000] flex items-center justify-center bg-slate-900/45 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-[#E9E2F7] bg-white p-5 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <AlertTriangle size={16} />
              </div>
              <div className="space-y-2">
                <div className="text-base font-semibold text-[#2F1A55]">
                  Vas a abandonar ticket(s) en atencion
                </div>
                <div className="text-sm text-slate-600">
                  Antes de cerrar jornada debes confirmar el abandono. Los tickets
                  se liberaran a cola general para reasignacion inmediata.
                </div>
              </div>
            </div>
            {abandonmentThreads.length > 0 ? (
              <div className="mt-4 max-h-40 space-y-2 overflow-y-auto rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] p-3">
                {abandonmentThreads.map((thread) => (
                  <div
                    key={`${thread.public_id || "thread"}-${thread.status || "status"}`}
                    className="rounded-lg border border-[#E9E2F7] bg-white px-2.5 py-2 text-xs text-slate-600"
                  >
                    <div className="font-semibold text-[#2F1A55]">
                      {thread.public_id || "Ticket"}
                    </div>
                    <div className="mt-0.5">
                      Estado: {String(thread.status || "sin estado")}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            {sessionEndError ? (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {sessionEndError}
              </div>
            ) : null}
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={closeAbandonmentFlow}
                className="rounded-xl border border-[#E9E2F7] px-4 py-2 text-sm font-semibold text-slate-600"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmAbandonment}
                className="rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white"
              >
                Abandonar
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 z-[21000] flex items-center justify-center bg-slate-900/45 px-4">
        <div className="w-full max-w-lg rounded-2xl border border-[#E9E2F7] bg-white p-5 shadow-2xl">
          <div className="text-base font-semibold text-[#2F1A55]">
            Mensaje de abandono
          </div>
          <div className="mt-2 text-sm text-slate-600">
            Envia el macro de abandono al usuario antes de cerrar jornada.
          </div>
          <div className="mt-4 rounded-xl border border-dashed border-[#BFA8E7] bg-[#FAF8FF] px-3 py-4 text-xs text-[#5E30A5]">
            Placeholder temporal de macros de abandono. El siguiente paso del flujo
            mostrara el catalogo real de macros de abandono.
          </div>
          {sessionEndError ? (
            <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {sessionEndError}
            </div>
          ) : null}
          <div className="mt-5 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={closeAbandonmentFlow}
              disabled={abandonmentSubmitting}
              className="rounded-xl border border-[#E9E2F7] px-4 py-2 text-sm font-semibold text-slate-600 disabled:opacity-60"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => {
                void handleSendAbandonmentMessage();
              }}
              disabled={abandonmentSubmitting}
              className={`rounded-xl px-4 py-2 text-sm font-semibold text-white ${
                abandonmentSubmitting ? "bg-[#C9B6E8]" : "bg-[#5E30A5]"
              }`}
            >
              {abandonmentSubmitting
                ? "Cerrando jornada..."
                : "Envié mensaje de abandono"}
            </button>
          </div>
        </div>
      </div>
    );
  };

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
        {renderAbandonmentModals()}
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
        {renderAbandonmentModals()}
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
        {renderAbandonmentModals()}
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
        {renderAbandonmentModals()}
      </>
    );
  }

  return (
    <div className="space-y-4">
      {showSessionActions ? (
        <div className="rounded-3xl border border-[#E9E2F7] bg-white p-4 text-right">
          <button
            type="button"
            onClick={() => {
              void handleEndSession();
            }}
            className={`rounded-2xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold ${
              endLoading ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {endLoading ? "Cerrando..." : "Terminar jornada"}
          </button>
        </div>
      ) : null}
      {sessionEndError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {sessionEndError}
        </div>
      ) : null}
      {typeof children === "function"
        ? children({
            sessionActive,
            endLoading,
            onEndSession: handleEndSession,
          })
        : children}
      {renderAbandonmentModals()}
    </div>
  );
}
