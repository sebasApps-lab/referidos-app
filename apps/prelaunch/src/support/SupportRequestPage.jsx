import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  createAnonymousSupportThread,
  getAnonymousSupportThreadStatus,
} from "./supportApi";

const CATEGORIES = [
  { id: "acceso", label: "Acceso / Cuenta" },
  { id: "qr", label: "QR / Escaner" },
  { id: "promos", label: "Promociones" },
  { id: "negocios_sucursales", label: "Negocios / Sucursales" },
  { id: "bug_performance", label: "Bug / Rendimiento" },
  { id: "sugerencia", label: "Sugerencia" },
];

const STORAGE_KEY = "prelaunch_anon_support_last";

export default function SupportRequestPage({ channel = "whatsapp" }) {
  const isChat = channel === "whatsapp";
  const [contact, setContact] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("sugerencia");
  const [submitting, setSubmitting] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [statusResult, setStatusResult] = useState(null);
  const [error, setError] = useState("");

  const title = isChat ? "Chat de soporte" : "Soporte por correo";
  const subtitle = isChat
    ? "Crea un ticket anonimo y abre WhatsApp para hablar con soporte."
    : "Crea un ticket anonimo y te responderemos por correo.";
  const contactLabel = isChat ? "Numero de WhatsApp" : "Correo";
  const contactPlaceholder = isChat ? "593999999999" : "tu@email.com";

  const canSubmit = useMemo(
    () => contact.trim().length > 5 && summary.trim().length > 4 && !submitting,
    [contact, submitting, summary]
  );

  const persistLast = (payload) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // no-op
    }
  };

  const readLast = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError("");
    setStatusResult(null);

    const payload = {
      channel,
      contact: contact.trim(),
      summary: summary.trim(),
      category,
      severity: "s2",
      origin_source: "prelaunch",
      source_route: window.location.pathname,
      client_request_id: crypto.randomUUID(),
      context: {
        flow: "prelaunch",
        page: isChat ? "help" : "support",
      },
    };

    const response = await createAnonymousSupportThread(payload);
    setSubmitting(false);

    if (!response.ok || !response.data?.ok) {
      setError(response.error || response.data?.error || "No se pudo crear el ticket.");
      return;
    }

    const created = {
      thread_public_id: response.data.thread_public_id,
      tracking_token: response.data.tracking_token,
      wa_link: response.data.wa_link || null,
      wa_message_text: response.data.wa_message_text || null,
      status: response.data.status || "new",
      channel,
    };

    setResult(created);
    persistLast(created);
  };

  const handleCheckStatus = async () => {
    const base = result || readLast();
    if (!base?.thread_public_id || !base?.tracking_token) {
      setError("No hay ticket para consultar.");
      return;
    }
    setStatusLoading(true);
    setError("");
    const response = await getAnonymousSupportThreadStatus({
      thread_public_id: base.thread_public_id,
      tracking_token: base.tracking_token,
    });
    setStatusLoading(false);
    if (!response.ok || !response.data?.ok) {
      setError(response.error || response.data?.error || "No se pudo consultar el ticket.");
      return;
    }
    setStatusResult(response.data.thread);
  };

  return (
    <div className="min-h-screen bg-[#F9F6FF] text-slate-700">
      <main className="mx-auto w-full max-w-3xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-sm font-semibold text-[#5E30A5] hover:underline">
            Volver al inicio
          </Link>
          <div className="text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
            Prelaunch
          </div>
        </div>

        <div className="rounded-3xl border border-[#E9E2F7] bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-[#2F1A55]">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#2F1A55]">
                {contactLabel}
              </label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={contactPlaceholder}
                className="w-full rounded-2xl border border-[#E9E2F7] px-4 py-3 text-sm outline-none focus:border-[#5E30A5]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#2F1A55]">
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl border border-[#E9E2F7] px-4 py-3 text-sm outline-none focus:border-[#5E30A5]"
              >
                {CATEGORIES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#2F1A55]">
                Resumen
              </label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={4}
                placeholder="Describe tu caso en una linea clara"
                className="w-full rounded-2xl border border-[#E9E2F7] px-4 py-3 text-sm outline-none focus:border-[#5E30A5]"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={!canSubmit}
                className={`rounded-2xl px-5 py-3 text-sm font-semibold text-white ${
                  canSubmit ? "bg-[#5E30A5] hover:bg-[#4A2486]" : "bg-[#C9B6E8]"
                }`}
              >
                {submitting ? "Creando ticket..." : "Crear ticket"}
              </button>
              <button
                type="button"
                onClick={handleCheckStatus}
                disabled={statusLoading}
                className="rounded-2xl border border-[#E9E2F7] px-5 py-3 text-sm font-semibold text-[#5E30A5]"
              >
                {statusLoading ? "Consultando..." : "Consultar estado"}
              </button>
            </div>
          </form>

          {error ? (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          {result ? (
            <div className="mt-5 rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4 space-y-2 text-sm">
              <div className="font-semibold text-[#2F1A55]">Ticket creado</div>
              <div>ID: {result.thread_public_id}</div>
              {isChat && result.wa_link ? (
                <a
                  href={result.wa_link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-xl bg-[#25D366] px-4 py-2 text-xs font-semibold text-white"
                >
                  Abrir WhatsApp
                </a>
              ) : null}
            </div>
          ) : null}

          {statusResult ? (
            <div className="mt-4 rounded-2xl border border-[#E9E2F7] bg-white p-4 space-y-1 text-sm">
              <div className="font-semibold text-[#2F1A55]">Estado actual</div>
              <div>Ticket: {statusResult.public_id}</div>
              <div>Estado: {statusResult.status}</div>
              <div>Categoria: {statusResult.category}</div>
              {statusResult.resolution ? (
                <div>Resolucion: {statusResult.resolution}</div>
              ) : null}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
