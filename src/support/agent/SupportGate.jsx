import React, { useEffect, useState } from "react";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import {
  startSupportSession,
  endSupportSession,
  pingSupportSession,
} from "../supportClient";

export default function SupportGate({ children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    let active = true;
    const loadProfile = async () => {
      const { data } = await supabase
        .from("support_agent_profiles")
        .select("authorized_for_work, authorized_until, blocked")
        .limit(1)
        .maybeSingle();
      if (!active) return;
      setProfile(data);
      const { data: session } = await supabase
        .from("support_agent_sessions")
        .select("id")
        .is("end_at", null)
        .limit(1)
        .maybeSingle();
      if (!active) return;
      setSessionActive(Boolean(session?.id));
      setLoading(false);
    };
    loadProfile();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!profile?.authorized_for_work) return undefined;
    const interval = setInterval(() => {
      if (sessionActive) {
        pingSupportSession();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [profile, sessionActive]);

  if (loading) {
    return <div className="text-sm text-slate-500">Cargando...</div>;
  }

  if (!profile || profile.blocked || !profile.authorized_for_work) {
    return (
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
      </div>
    );
  }

  if (!sessionActive) {
    return (
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
        <button
          type="button"
          onClick={async () => {
            const result = await startSupportSession();
            if (result.ok) {
              setSessionActive(true);
            }
          }}
          className="rounded-2xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white"
        >
          Iniciar jornada
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-[#E9E2F7] bg-white p-4 text-right">
        <button
          type="button"
          onClick={async () => {
            const result = await endSupportSession({ reason: "logout" });
            if (result.ok) {
              setSessionActive(false);
            }
          }}
          className="rounded-2xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-slate-600"
        >
          Terminar jornada
        </button>
      </div>
      {children}
    </div>
  );
}
