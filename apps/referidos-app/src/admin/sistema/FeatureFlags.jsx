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
  updateSupportRuntimeFlags,
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
  const [supportConfigDraft, setSupportConfigDraft] = useState(() =>
    getCachedSupportRuntimeFlags()
  );
  const [savingSupportConfig, setSavingSupportConfig] = useState(false);
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

  useEffect(() => {
    setSupportConfigDraft(supportAuthState);
  }, [supportAuthState]);

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

  const handleSupportConfigField = (key, value) => {
    setSupportConfigDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveSupportConfig = async () => {
    setSupportAuthError("");
    setSavingSupportConfig(true);
    const nextPayload = {
      ...supportConfigDraft,
      max_assigned_tickets: Number(supportConfigDraft.max_assigned_tickets || 5),
      max_processing_tickets: Number(supportConfigDraft.max_processing_tickets || 1),
      wait_user_to_personal_queue_minutes: Number(
        supportConfigDraft.wait_user_to_personal_queue_minutes || 10
      ),
      personal_queue_release_minutes: Number(
        supportConfigDraft.personal_queue_release_minutes || 5
      ),
      personal_queue_release_overload_minutes: Number(
        supportConfigDraft.personal_queue_release_overload_minutes || 1
      ),
      personal_queue_overload_threshold: Number(
        supportConfigDraft.personal_queue_overload_threshold || 5
      ),
      retake_reassignment_window_hours: Number(
        supportConfigDraft.retake_reassignment_window_hours || 168
      ),
      retake_reassignment_multiplier: Number(
        supportConfigDraft.retake_reassignment_multiplier || 1.25
      ),
    };

    const result = await updateSupportRuntimeFlags(nextPayload, {
      updatedBy: usuario?.id || null,
    });
    setSavingSupportConfig(false);
    if (!result.ok) {
      setSupportAuthError(result.error || "No se pudo guardar configuracion de soporte.");
      return;
    }
    setSupportAuthState(result.flags);
    setSupportConfigDraft(result.flags);
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
        <div className="text-sm font-semibold text-[#2F1A55]">Soporte SDK</div>
        <div className="text-xs text-slate-500">
          Parametros operativos de autoasignacion y reingreso de tickets.
        </div>
      </div>

      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between rounded-xl border border-[#EEE7FA] px-3 py-2">
          <div>
            <div className="text-sm font-semibold text-[#2F1A55]">
              Autoasignacion de soporte
            </div>
            <div className="text-xs text-slate-500">
              Si esta apagada, el motor no reparte tickets automaticamente.
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              handleSupportConfigField(
                "auto_assign_enabled",
                !supportConfigDraft.auto_assign_enabled
              )
            }
            className={`relative h-6 w-11 rounded-full transition ${
              supportConfigDraft.auto_assign_enabled ? "bg-[#5E30A5]" : "bg-slate-200"
            }`}
            aria-pressed={Boolean(supportConfigDraft.auto_assign_enabled)}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                supportConfigDraft.auto_assign_enabled ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-1">
            <div className="text-xs font-semibold text-[#2F1A55]">Maximo tickets asignados</div>
            <input
              type="number"
              min={1}
              max={50}
              value={supportConfigDraft.max_assigned_tickets ?? 5}
              onChange={(e) =>
                handleSupportConfigField("max_assigned_tickets", Number(e.target.value))
              }
              className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm outline-none focus:border-[#5E30A5]"
            />
          </label>
          <label className="space-y-1">
            <div className="text-xs font-semibold text-[#2F1A55]">Maximo tickets en proceso</div>
            <input
              type="number"
              min={1}
              max={10}
              value={supportConfigDraft.max_processing_tickets ?? 1}
              onChange={(e) =>
                handleSupportConfigField("max_processing_tickets", Number(e.target.value))
              }
              className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm outline-none focus:border-[#5E30A5]"
            />
          </label>
          <label className="space-y-1">
            <div className="text-xs font-semibold text-[#2F1A55]">Espera usuario a cola personal (min)</div>
            <input
              type="number"
              min={1}
              max={1440}
              value={supportConfigDraft.wait_user_to_personal_queue_minutes ?? 10}
              onChange={(e) =>
                handleSupportConfigField(
                  "wait_user_to_personal_queue_minutes",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm outline-none focus:border-[#5E30A5]"
            />
          </label>
          <label className="space-y-1">
            <div className="text-xs font-semibold text-[#2F1A55]">Cola personal a general (min)</div>
            <input
              type="number"
              min={1}
              max={1440}
              value={supportConfigDraft.personal_queue_release_minutes ?? 5}
              onChange={(e) =>
                handleSupportConfigField(
                  "personal_queue_release_minutes",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm outline-none focus:border-[#5E30A5]"
            />
          </label>
          <label className="space-y-1">
            <div className="text-xs font-semibold text-[#2F1A55]">
              Cola personal a general en sobrecarga (min)
            </div>
            <input
              type="number"
              min={1}
              max={1440}
              value={supportConfigDraft.personal_queue_release_overload_minutes ?? 1}
              onChange={(e) =>
                handleSupportConfigField(
                  "personal_queue_release_overload_minutes",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm outline-none focus:border-[#5E30A5]"
            />
          </label>
          <label className="space-y-1">
            <div className="text-xs font-semibold text-[#2F1A55]">
              Umbral de sobrecarga (tickets)
            </div>
            <input
              type="number"
              min={1}
              max={200}
              value={supportConfigDraft.personal_queue_overload_threshold ?? 5}
              onChange={(e) =>
                handleSupportConfigField(
                  "personal_queue_overload_threshold",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm outline-none focus:border-[#5E30A5]"
            />
          </label>
          <label className="space-y-1">
            <div className="text-xs font-semibold text-[#2F1A55]">Ventana para retomar</div>
            <select
              value={supportConfigDraft.retake_reassignment_window_mode ?? "7d"}
              onChange={(e) =>
                handleSupportConfigField("retake_reassignment_window_mode", e.target.value)
              }
              className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm outline-none focus:border-[#5E30A5]"
            >
              <option value="2d">2 dias</option>
              <option value="7d">7 dias</option>
              <option value="15d">15 dias</option>
              <option value="manual">Manual (horas)</option>
            </select>
          </label>
          <label className="space-y-1">
            <div className="text-xs font-semibold text-[#2F1A55]">Horas ventana manual</div>
            <input
              type="number"
              min={1}
              max={1440}
              value={supportConfigDraft.retake_reassignment_window_hours ?? 168}
              onChange={(e) =>
                handleSupportConfigField(
                  "retake_reassignment_window_hours",
                  Number(e.target.value)
                )
              }
              disabled={supportConfigDraft.retake_reassignment_window_mode !== "manual"}
              className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm outline-none focus:border-[#5E30A5] disabled:bg-slate-50 disabled:text-slate-400"
            />
          </label>
          <label className="space-y-1 md:col-span-2">
            <div className="text-xs font-semibold text-[#2F1A55]">Multiplicador de espera retake</div>
            <input
              type="number"
              min={1}
              max={5}
              step="0.05"
              value={supportConfigDraft.retake_reassignment_multiplier ?? 1.25}
              onChange={(e) =>
                handleSupportConfigField(
                  "retake_reassignment_multiplier",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm outline-none focus:border-[#5E30A5]"
            />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => void saveSupportConfig()}
            disabled={savingSupportConfig}
            className="rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white disabled:bg-[#C9B6E8]"
          >
            {savingSupportConfig ? "Guardando..." : "Guardar configuracion"}
          </button>
        </div>
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
