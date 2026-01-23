import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import SupportInbox from "../../support/agent/SupportInbox";
import { supabase } from "../../lib/supabaseClient";
import { useAppStore } from "../../store/appStore";
import {
  startAdminSupportSession,
  endAdminSupportSession,
  pingAdminSupportSession,
} from "../../support/supportClient";

export default function AdminSupportDesk() {
  const usuario = useAppStore((s) => s.usuario);
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [sessionError, setSessionError] = useState("");

  useEffect(() => {
    let active = true;
    const loadSession = async () => {
      if (!usuario?.id) return;
      setSessionLoading(true);
      const { data } = await supabase
        .from("support_agent_sessions")
        .select("id")
        .eq("agent_id", usuario.id)
        .is("end_at", null)
        .order("start_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!active) return;
      setSessionActive(Boolean(data?.id));
      setSessionLoading(false);
    };
    loadSession();
    return () => {
      active = false;
    };
  }, [usuario?.id]);

  useEffect(() => {
    if (!sessionActive) return undefined;
    const interval = setInterval(() => {
      pingAdminSupportSession();
    }, 30000);
    return () => clearInterval(interval);
  }, [sessionActive]);

  const handleStart = async () => {
    setSessionError("");
    const result = await startAdminSupportSession();
    if (!result.ok) {
      setSessionError("No se pudo iniciar la jornada.");
      return;
    }
    setSessionActive(true);
  };

  const handleEnd = async () => {
    setSessionError("");
    const result = await endAdminSupportSession({ reason: "manual_end" });
    if (!result.ok) {
      setSessionError("No se pudo finalizar la jornada.");
      return;
    }
    setSessionActive(false);
  };

  return (
    <AdminLayout
      title="Soporte"
      subtitle="Modo asesor para revisar tickets"
    >
      <div className="space-y-6">
        <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-4">
          <div className="text-sm font-semibold text-[#2F1A55]">
            Jornada de soporte
          </div>
          <div className="text-xs text-slate-500">
            Inicia tu jornada para que el sistema te trate como asesor activo.
          </div>
          {sessionError ? (
            <div className="text-xs text-red-500">{sessionError}</div>
          ) : null}
          <div className="flex flex-wrap gap-3">
            {sessionActive ? (
              <>
                <span className="inline-flex items-center rounded-full bg-[#EAF7F0] px-3 py-1 text-xs font-semibold text-[#1B7F4B]">
                  Jornada activa
                </span>
                <button
                  type="button"
                  onClick={handleEnd}
                  className="rounded-2xl border border-[#E9E2F7] px-4 py-2 text-xs font-semibold text-[#2F1A55]"
                >
                  Finalizar jornada
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleStart}
                disabled={sessionLoading}
                className={`rounded-2xl px-4 py-2 text-xs font-semibold text-white ${
                  sessionLoading ? "bg-[#C9B6E8]" : "bg-[#5E30A5]"
                }`}
              >
                Iniciar jornada
              </button>
            )}
          </div>
        </div>

        <SupportInbox isAdmin basePath="/admin/soporte" />
      </div>
    </AdminLayout>
  );
}
