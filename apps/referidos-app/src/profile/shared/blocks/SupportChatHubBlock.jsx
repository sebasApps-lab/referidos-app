import React, { useEffect, useMemo, useState } from "react";
import { MessageSquareText } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAppStore } from "../../../store/appStore";
import { useModal } from "../../../modals/useModal";
import { SUPPORT_CHAT_CATEGORIES } from "../data/supportChatCategories";
import { createSupportChatThread } from "../services/supportChatClient";
import { cancelSupportThread } from "@referidos/support-sdk/supportClient";
import { logCatalogBreadcrumb } from "../../../services/loggingClient";
import { runtimeConfig } from "../../../config/runtimeConfig";

// Lint purge (no-unused-vars): se purgo `usuario` no consumido (cabecera del bloque soporte).
function resolveSupportAppChannel() {
  const appId = String(runtimeConfig.appId || "").toLowerCase();
  if (appId.includes("prelaunch")) return "prelaunch_web";
  if (appId.includes("android")) return "android_app";
  return "referidos_app";
}

export default function SupportChatHubBlock({ role, onShowTickets }) {
  const onboarding = useAppStore((s) => s.onboarding);
  const location = useLocation();
  const { openModal } = useModal();
  const [category, setCategory] = useState("acceso");
  const [summary, setSummary] = useState("");
  const [includeContext, setIncludeContext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(null);
  const [queueCanceled, setQueueCanceled] = useState(false);

  const categories = useMemo(
    () => SUPPORT_CHAT_CATEGORIES.filter((item) => item.roles.includes(role)),
    [role]
  );

  useEffect(() => {
    if (!categories.length) return;
    if (!categories.some((item) => item.id === category)) {
      setCategory(categories[0].id);
    }
  }, [categories, category]);

  const context = useMemo(() => {
    if (!includeContext) return {};
    const locale = navigator.language || null;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || null;
    const viewport =
      typeof window !== "undefined"
        ? `${window.innerWidth}x${window.innerHeight}`
        : null;
    const runtimeSnapshot = {
      app_id: runtimeConfig.appId || "referidos-app",
      app_env: runtimeConfig.appEnv || runtimeConfig.mode || "dev",
      app_version: runtimeConfig.appVersion || null,
      source_route: location.pathname,
      locale,
      language: locale,
      timezone,
      platform: navigator.platform || null,
      user_agent: navigator.userAgent || null,
      viewport,
      online: typeof navigator.onLine === "boolean" ? navigator.onLine : null,
    };
    const buildSnapshot = {
      app_id: runtimeConfig.appId || "referidos-app",
      app_env: runtimeConfig.appEnv || runtimeConfig.mode || "dev",
      version_label: runtimeConfig.appVersion || null,
      build_id: runtimeConfig.buildId || null,
      build_number: runtimeConfig.buildNumber || null,
      release_id: runtimeConfig.releaseId || null,
      artifact_id: runtimeConfig.artifactId || null,
      release_channel: runtimeConfig.releaseChannel || runtimeConfig.appEnv || null,
      source_commit_sha: runtimeConfig.sourceCommitSha || null,
    };
    return {
      route: location.pathname,
      role,
      negocio_id: onboarding?.negocio?.id ?? null,
      promo_id: onboarding?.promo_id ?? null,
      app_version: runtimeConfig.appVersion || "web",
      device: navigator.platform ?? "unknown",
      browser: navigator.userAgent ?? "unknown",
      runtime: runtimeSnapshot,
      build: buildSnapshot,
    };
  }, [includeContext, location.pathname, onboarding, role]);

  const canSubmit = summary.trim().length > 4 && !loading;

  const handleCreate = async () => {
    if (!canSubmit) return;
    logCatalogBreadcrumb("support.flow.step", {
      step: "create_ticket_click",
      category,
      include_context: includeContext,
    });
    setLoading(true);
    const payload = {
      category,
      summary: summary.trim(),
      context,
      app_channel: resolveSupportAppChannel(),
      source_route: location.pathname,
      locale: navigator.language || null,
      language: navigator.language || null,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
      platform: navigator.platform || null,
      user_agent: navigator.userAgent || null,
      build: context?.build || null,
      client_request_id: crypto.randomUUID(),
    };
    const result = await createSupportChatThread(payload);
    setLoading(false);
    if (!result.ok) {
      setCreated({ error: result.error || "No se pudo crear el ticket." });
      return;
    }
    const threadPublicId = result.data?.thread_public_id;
    setCreated(result.data);
    setQueueCanceled(false);
    const queueModalProps = {
      onConfirmUnderstand: () => {},
      onRequestCancel: () => {
        openModal("SupportQueueCancel", {
          onContinueQueue: () => openModal("SupportQueue", queueModalProps),
          onConfirmCancel: async () => {
            if (!threadPublicId) return;
            logCatalogBreadcrumb("support.ticket.cancel.start", {
              thread_public_id: threadPublicId,
            });
            const cancelResult = await cancelSupportThread({
              thread_public_id: threadPublicId,
            });
            if (cancelResult.ok) {
              logCatalogBreadcrumb("support.ticket.cancel.ok", {
                thread_public_id: threadPublicId,
              });
              setQueueCanceled(true);
            } else {
              logCatalogBreadcrumb("support.ticket.cancel.error", {
                thread_public_id: threadPublicId,
                error: cancelResult?.error || "cancel_failed",
              });
            }
          },
        });
      },
    };
    openModal("SupportQueue", queueModalProps);
  };

  const handleOpenWhatsapp = () => {
    if (created?.wa_link) {
      logCatalogBreadcrumb("support.ticket.whatsapp.open", {
        thread_public_id: created?.thread_public_id || null,
      });
      window.open(created.wa_link, "_blank", "noopener");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="text-[12px] font-semibold text-[#2F1A55]">
          Selecciona la categoria
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setCategory(item.id);
                logCatalogBreadcrumb("support.help.select", {
                  option: "chat_category",
                  category: item.id,
                });
              }}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                category === item.id
                  ? "border-[#5E30A5] bg-[#F5F0FF] text-[#2F1A55]"
                  : "border-[#E9E2F7] bg-white text-slate-600 hover:bg-[#FAF8FF]"
              }`}
            >
              <div className="text-sm font-semibold">{item.label}</div>
              <div className="text-xs text-slate-500 mt-1">
                {item.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#2F1A55]">
          Describe tu caso en una linea
        </label>
        <input
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Ej: No puedo validar un QR en mi negocio"
          className="w-full rounded-2xl border border-[#E9E2F7] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#5E30A5]"
        />
      </div>

      <label className="flex items-center gap-3 text-xs text-slate-500">
        <input
          type="checkbox"
          checked={includeContext}
          onChange={(e) => setIncludeContext(e.target.checked)}
        />
        Adjuntar contexto tecnico (ruta, version, dispositivo)
      </label>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleCreate}
          disabled={!canSubmit}
          className={`rounded-2xl px-4 py-3 text-sm font-semibold text-white transition ${
            canSubmit ? "bg-[#5E30A5] hover:bg-[#4B2488]" : "bg-[#C9B6E8]"
          }`}
        >
          {loading ? "Creando ticket..." : "Crear ticket y abrir WhatsApp"}
        </button>
        <button
          type="button"
          onClick={onShowTickets}
          className="text-sm font-semibold text-[#5E30A5]"
        >
          Ver mis tickets
        </button>
      </div>

      {created?.error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {created.error}
        </div>
      ) : null}

      {created?.wa_link ? (
        <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-4">
          <div className="flex items-center gap-3 text-sm font-semibold text-[#2F1A55]">
            <MessageSquareText size={18} />
            Mensaje listo para WhatsApp
          </div>
          <div className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-4 py-3 text-xs text-slate-600 whitespace-pre-line">
            {created.wa_message_text}
          </div>
          {!queueCanceled ? (
            <button
              type="button"
              onClick={handleOpenWhatsapp}
              className="w-full rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white"
            >
              Abrir WhatsApp
            </button>
          ) : null}
          {queueCanceled ? (
            <div className="text-xs text-slate-500">
              Busqueda de asesor cancelada.
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

