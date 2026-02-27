// src/admin/sistema/FeatureFlags.jsx
import React, { useEffect, useState } from "react";
import { Shield, ToggleLeft } from "lucide-react";
import {
  getSystemFeatureFlags,
  setSystemFeatureFlag,
  subscribeSystemFeatureFlags,
} from "@referidos/support-sdk/runtime/systemFeatureFlags";
import {
  fetchSupportRuntimeFlags,
  getCachedSupportRuntimeFlags,
  setSupportRuntimeFlag,
  subscribeSupportRuntimeFlags,
} from "@referidos/support-sdk/runtime/supportRuntimeFlags";
import { useAppStore } from "../../store/appStore";

const FLAGS = [
  {
    key: "disable_qr",
    title: "Deshabilitar generacion de QR",
    desc: "Bloquea generacion de nuevos QR en toda la app.",
  },
  {
    key: "maintenance",
    title: "Modo mantenimiento",
    desc: "Muestra aviso general y pausa flujos criticos.",
  },
  {
    key: "freeze_registro",
    title: "Bloquear registros",
    desc: "Evita nuevas altas de usuarios y negocios.",
  },
  {
    key: "support_live_updates",
    title: "Soporte: actualizacion en vivo",
    desc: "Activa suscripciones realtime para inbox/jornada. Recomendado solo con plan pago.",
  },
  {
    key: "oauth_apple_enabled",
    title: "Auth: Apple OAuth",
    desc: "Habilita el boton de Apple en autenticacion. Default desactivado.",
  },
];

const SUPPORT_AUTH_FLAGS = [
  {
    key: "require_session_authorization",
    title: "Soporte: requerir autorizacion de sesion",
    desc: "Si esta activo, soporte debe ser aprobado por admin antes de abrir sesion.",
  },
  {
    key: "require_jornada_authorization",
    title: "Soporte: requerir autorizacion de jornada",
    desc: "Si esta activo, soporte debe estar autorizado para trabajar antes de iniciar jornada.",
  },
];

export default function FeatureFlags() {
  const [state, setState] = useState(() => getSystemFeatureFlags());
  const [supportAuthState, setSupportAuthState] = useState(() =>
    getCachedSupportRuntimeFlags()
  );
  const [supportAuthLoading, setSupportAuthLoading] = useState(true);
  const [supportAuthError, setSupportAuthError] = useState("");
  const [savingSupportFlag, setSavingSupportFlag] = useState({});
  const usuario = useAppStore((s) => s.usuario);

  useEffect(() => subscribeSystemFeatureFlags(setState), []);

  useEffect(() => {
    let active = true;
    const loadSupportAuth = async () => {
      setSupportAuthLoading(true);
      const next = await fetchSupportRuntimeFlags({ force: true });
      if (!active) return;
      setSupportAuthState(next);
      setSupportAuthLoading(false);
    };
    loadSupportAuth();
    const unsubscribe = subscribeSupportRuntimeFlags(setSupportAuthState);
    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  const toggleFlag = (key) => {
    const nextValue = !state[key];
    const nextState = setSystemFeatureFlag(key, nextValue);
    setState(nextState);
  };

  const toggleSupportAuthFlag = async (key) => {
    const currentValue = Boolean(supportAuthState[key]);
    const nextValue = !currentValue;
    setSupportAuthError("");
    setSavingSupportFlag((prev) => ({ ...prev, [key]: true }));
    const result = await setSupportRuntimeFlag(key, nextValue, {
      updatedBy: usuario?.id || null,
    });
    setSavingSupportFlag((prev) => ({ ...prev, [key]: false }));
    if (!result.ok) {
      setSupportAuthError(result.error || "No se pudo actualizar la autorizacion.");
      return;
    }
    setSupportAuthState(result.flags);
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="text-lg font-semibold text-[#2F1A55]">
          Feature flags
        </div>
        <div className="text-xs text-slate-500">
          Controla funciones globales sin tocar codigo.
        </div>
      </div>

      <div className="grid gap-3">
        {FLAGS.map((flag) => {
          const enabled = state[flag.key];
          return (
            <div
              key={flag.key}
              className="flex items-center justify-between rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F4FF] text-[#5E30A5]">
                  <Shield size={18} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#2F1A55]">
                    {flag.title}
                  </div>
                  <div className="text-xs text-slate-500">{flag.desc}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleFlag(flag.key)}
                className={`relative h-6 w-11 rounded-full transition ${
                  enabled ? "bg-[#5E30A5]" : "bg-slate-200"
                }`}
                aria-pressed={enabled}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                    enabled ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      <div>
        <div className="text-sm font-semibold text-[#2F1A55]">
          Autorizaciones soporte
        </div>
        <div className="text-xs text-slate-500">
          Controla si soporte requiere aprobacion para sesion y/o jornada.
        </div>
      </div>

      {supportAuthError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
          {supportAuthError}
        </div>
      ) : null}

      <div className="grid gap-3">
        {SUPPORT_AUTH_FLAGS.map((flag) => {
          const enabled = Boolean(supportAuthState[flag.key]);
          const saving = Boolean(savingSupportFlag[flag.key]);
          return (
            <div
              key={flag.key}
              className="flex items-center justify-between rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F4FF] text-[#5E30A5]">
                  <Shield size={18} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#2F1A55]">
                    {flag.title}
                  </div>
                  <div className="text-xs text-slate-500">{flag.desc}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => void toggleSupportAuthFlag(flag.key)}
                disabled={supportAuthLoading || saving}
                className={`relative h-6 w-11 rounded-full transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  enabled ? "bg-[#5E30A5]" : "bg-slate-200"
                }`}
                aria-pressed={enabled}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                    enabled ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-[#E9E2F7] bg-[#F9F7FF] p-4 text-xs text-slate-500">
        <div className="flex items-center gap-2 font-semibold text-[#2F1A55]">
          <ToggleLeft size={14} />
          Cambios pendientes
        </div>
        <p className="mt-2">
          Las flags quedan guardadas localmente. Para soporte en vivo, por ahora
          mantenla apagada y usa refresco manual.
        </p>
        <p className="mt-2">
          Las autorizaciones de soporte se guardan en la base de datos runtime.
        </p>
      </div>
    </div>
  );
}
