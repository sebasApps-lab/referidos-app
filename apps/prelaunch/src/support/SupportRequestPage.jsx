import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  cancelAnonymousSupportThread,
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
const SUMMARY_MAX = 240;
const SHOW_LEGACY_STATUS_BUTTON = false;
const ACTIVE_CHAT_STATUSES = new Set(["assigned", "in_progress", "waiting_user"]);

function normalizeWhatsapp(value) {
  const digits = (value || "").replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 16) return null;
  return digits;
}

function readStoredTicket() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function persistStoredTicket(payload) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // no-op
  }
}

function SupportModal({
  open,
  title,
  body,
  confirmLabel = "Aceptar",
  cancelLabel = null,
  onConfirm,
  onCancel,
  confirmDisabled = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#E9E2F7] bg-white p-5 shadow-2xl">
        <div className="text-base font-semibold text-[#2F1A55]">{title}</div>
        <div className="mt-3 text-sm text-slate-600">{body}</div>
        <div className="mt-5 flex gap-3">
          {cancelLabel ? (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-xl border border-[#E9E2F7] px-4 py-2 text-sm font-semibold text-[#5E30A5]"
            >
              {cancelLabel}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onConfirm}
            disabled={confirmDisabled}
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white ${
              confirmDisabled ? "bg-[#C9B6E8]" : "bg-[#5E30A5] hover:bg-[#4A2486]"
            } ${cancelLabel ? "flex-1" : "w-full"}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SupportRequestPage({ channel = "whatsapp" }) {
  const isChatRoute = channel === "whatsapp";
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const path = location.pathname.toLowerCase();
  const activeTab = path === "/soporte-ticket"
    ? "ticket"
    : path === "/soporte-correo"
    ? "email"
    : path === "/soporte-chat"
    ? "chat"
    : searchParams.get("tab") === "ticket"
    ? "ticket"
    : isChatRoute
    ? "chat"
    : "email";

  const [contact, setContact] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("sugerencia");
  const [submitting, setSubmitting] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [storedTicket, setStoredTicket] = useState(null);
  const [statusResult, setStatusResult] = useState(null);
  const [error, setError] = useState("");
  const [saveTicketModalOpen, setSaveTicketModalOpen] = useState(false);
  const [replacePrompt, setReplacePrompt] = useState(null);
  const [replaceLoading, setReplaceLoading] = useState(false);
  const summaryRef = useRef(null);

  const isTicketTab = activeTab === "ticket";
  const isChatTab = activeTab === "chat";
  const isEmailTab = activeTab === "email";
  const selectedChannel = isEmailTab ? "email" : "whatsapp";
  const currentTicket = result || storedTicket;

  const subtitle = isChatTab
    ? "No dudes en escribirnos con cualquier duda o pregunta que tengas."
    : isEmailTab
    ? "Comparte tu caso y te responderemos por correo."
    : "Consulta el estado actual de tu ticket y vuelve cuando lo necesites.";

  const contactLabel = "Numero de WhatsApp";
  const contactPlaceholder = "593999999999";
  const normalizedWhatsapp = useMemo(() => normalizeWhatsapp(contact), [contact]);

  const canSubmit = useMemo(
    () => Boolean(normalizedWhatsapp) && summary.trim().length > 4 && !submitting,
    [normalizedWhatsapp, submitting, summary],
  );

  const ticketDetails = useMemo(() => {
    if (!currentTicket) return null;
    if (!statusResult) return null;
    if (statusResult.public_id !== currentTicket.thread_public_id) return null;
    return statusResult;
  }, [currentTicket, statusResult]);

  const ticketStatus = ticketDetails?.status || currentTicket?.status || null;
  const anonymousWhatsapp =
    ticketDetails?.anon_profile?.contact_value ||
    currentTicket?.contact ||
    null;
  const canOpenWhatsapp = Boolean(ticketDetails?.wa_link) && ACTIVE_CHAT_STATUSES.has(ticketStatus);

  const openTicketTab = useCallback(() => {
    navigate("/soporte-ticket");
  }, [navigate]);

  const resizeSummaryInput = useCallback(() => {
    const node = summaryRef.current;
    if (!node) return;
    node.style.height = "auto";
    node.style.height = `${Math.max(node.scrollHeight, 104)}px`;
  }, []);

  const handleCheckStatus = useCallback(async (silent = false, baseTicket = null) => {
    const base = baseTicket || result || storedTicket || readStoredTicket();
    if (!base?.thread_public_id || !base?.tracking_token) {
      if (!silent) setError("No hay ticket para consultar.");
      return;
    }

    setStatusLoading(true);
    if (!silent) setError("");

    const response = await getAnonymousSupportThreadStatus({
      thread_public_id: base.thread_public_id,
      tracking_token: base.tracking_token,
    });

    setStatusLoading(false);
    if (!response.ok || !response.data?.ok) {
      if (!silent) {
        setError(response.error || response.data?.error || "No se pudo consultar el ticket.");
      }
      return;
    }

    setStatusResult(response.data.thread);
  }, [result, storedTicket]);

  useEffect(() => {
    setStoredTicket(readStoredTicket());
  }, []);

  useEffect(() => {
    if (isTicketTab && currentTicket?.thread_public_id && !ticketDetails && !statusLoading) {
      void handleCheckStatus(true);
    }
  }, [currentTicket?.thread_public_id, handleCheckStatus, isTicketTab, statusLoading, ticketDetails]);

  useEffect(() => {
    resizeSummaryInput();
  }, [resizeSummaryInput, summary, isTicketTab]);

  async function submitConversation() {
    if (!canSubmit || isTicketTab) return;

    setSubmitting(true);
    setError("");
    setStatusResult(null);

    const payload = {
      channel: "whatsapp",
      contact: normalizedWhatsapp,
      summary: summary.trim(),
      category,
      severity: "s2",
      origin_source: "prelaunch",
      source_route: window.location.pathname,
      client_request_id: crypto.randomUUID(),
      error_on_active: true,
      context: {
        flow: "prelaunch",
        page: selectedChannel === "whatsapp" ? "soporte-chat" : "soporte-correo",
        requested_channel: selectedChannel,
      },
    };

    const response = await createAnonymousSupportThread(payload);
    setSubmitting(false);

    if (!response.ok || !response.data?.ok) {
      if (
        response.error === "active_ticket_exists" &&
        response.data?.thread_public_id &&
        response.data?.tracking_token
      ) {
        setReplacePrompt({
          thread_public_id: response.data.thread_public_id,
          tracking_token: response.data.tracking_token,
        });
        return;
      }
      setError(response.error || response.data?.error || "No se pudo iniciar la conversacion.");
      return;
    }

    const created = {
      thread_public_id: response.data.thread_public_id,
      tracking_token: response.data.tracking_token,
      wa_link: response.data.wa_link || null,
      wa_message_text: response.data.wa_message_text || null,
      status: response.data.status || "new",
      channel: selectedChannel,
      contact: normalizedWhatsapp,
      category,
      summary: summary.trim(),
      created_at: new Date().toISOString(),
    };

    setResult(created);
    setStoredTicket(created);
    persistStoredTicket(created);
    openTicketTab();
    setSaveTicketModalOpen(true);
    void handleCheckStatus(true, created);
  }

  async function handleReplaceTicket() {
    if (!replacePrompt) return;

    setReplaceLoading(true);
    setError("");

    const cancelResponse = await cancelAnonymousSupportThread({
      thread_public_id: replacePrompt.thread_public_id,
      tracking_token: replacePrompt.tracking_token,
      reason: "replace_with_new",
    });

    if (!cancelResponse.ok && !cancelResponse.data?.already_closed) {
      setReplaceLoading(false);
      setError(cancelResponse.error || "No se pudo cancelar el ticket anterior.");
      return;
    }

    setReplacePrompt(null);
    setReplaceLoading(false);
    await submitConversation();
  }

  return (
    <div className="min-h-screen bg-[#F9F6FF] text-slate-700 flex flex-col">
      <main className="mx-auto w-full max-w-3xl px-6 py-10 flex-1">
        <header className="mb-8 grid grid-cols-3 items-center">
          <Link to="/" className="justify-self-start text-lg font-semibold hover:opacity-85">
            ReferidosAPP
          </Link>
          <div className="justify-self-center whitespace-nowrap text-center text-3xl font-bold text-[#2F1A55] md:text-[2.15rem]">
            Ayuda y Soporte
          </div>
          <div className="justify-self-end text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
            ACCESO ANTICIPADO
          </div>
        </header>

        <div className="rounded-3xl border border-[#E9E2F7] bg-white p-6 shadow-sm overflow-visible">
          <div className="-mx-2 flex w-[calc(100%+1rem)] items-end justify-between gap-2 overflow-visible whitespace-nowrap bg-transparent px-2 md:-mx-3 md:w-[calc(100%+1.5rem)] md:gap-4 md:px-3">
            <Link
              to="/soporte-chat"
              className={`bg-transparent px-3 pt-0 pb-2 text-center text-2xl font-semibold leading-none whitespace-nowrap ${
                isChatTab
                  ? "text-[#2F1A55]"
                  : "text-slate-300"
              }`}
            >
              Chat de soporte
            </Link>
            <div className="h-7 w-px shrink-0 self-end bg-[#D3C8E8] shadow-[0_0_10px_rgba(211,200,232,0.95)]" />
            <Link
              to="/soporte-correo"
              className={`bg-transparent px-3 pt-0 pb-2 text-center text-2xl font-semibold leading-none whitespace-nowrap ${
                isEmailTab
                  ? "text-[#2F1A55]"
                  : "text-slate-300"
              }`}
            >
              Soporte por correo
            </Link>
            <div className="h-7 w-px shrink-0 self-end bg-[#D3C8E8] shadow-[0_0_10px_rgba(211,200,232,0.95)]" />
            <button
              type="button"
              onClick={openTicketTab}
              className={`bg-transparent px-3 pt-0 pb-2 text-center text-2xl font-semibold leading-none whitespace-nowrap ${
                isTicketTab
                  ? "text-[#2F1A55]"
                  : "text-slate-300"
              }`}
            >
              Mi ticket
            </button>
          </div>

          <div className="mt-5">
            <p className="text-sm text-slate-500">{subtitle}</p>
          </div>

          {!isTicketTab ? (
            <form
              className="mt-6 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                void submitConversation();
              }}
            >
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#2F1A55]">
                  {contactLabel}
                </label>
                <input
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
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
                  onChange={(event) => setCategory(event.target.value)}
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
                  Descripcion
                </label>
                <textarea
                  ref={summaryRef}
                  value={summary}
                  onChange={(event) => setSummary(event.target.value)}
                  rows={4}
                  maxLength={SUMMARY_MAX}
                  placeholder="Describe tu pregunta o inquietud."
                  className="w-full rounded-2xl border border-[#E9E2F7] px-4 py-3 text-sm outline-none focus:border-[#5E30A5] resize-none overflow-hidden"
                />
                <div className="text-[11px] text-slate-400 text-right">
                  {summary.length}/{SUMMARY_MAX}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`rounded-2xl px-5 py-3 text-sm font-semibold text-white ${
                    canSubmit ? "bg-[#5E30A5] hover:bg-[#4A2486]" : "bg-[#C9B6E8]"
                  }`}
                >
                  {submitting ? "Iniciando..." : "Iniciar conversacion"}
                </button>
                {SHOW_LEGACY_STATUS_BUTTON ? (
                  <button
                    type="button"
                    onClick={() => void handleCheckStatus(false)}
                    disabled={statusLoading}
                    className="rounded-2xl border border-[#E9E2F7] px-5 py-3 text-sm font-semibold text-[#5E30A5]"
                  >
                    {statusLoading ? "Consultando..." : "Consultar estado"}
                  </button>
                ) : null}
              </div>
            </form>
          ) : (
            <div className="mt-6 space-y-4">
              {!currentTicket ? (
                <div className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4 text-sm text-slate-600">
                  <div className="font-semibold text-[#2F1A55]">Estado</div>
                  <div className="mt-2">No tienes tickets.</div>
                </div>
              ) : (
                <div className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-[#2F1A55]">Estado de tu ticket</div>
                    <button
                      type="button"
                      onClick={() => void handleCheckStatus(false)}
                      disabled={statusLoading}
                      className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5]"
                    >
                      {statusLoading ? "Actualizando..." : "Refresh"}
                    </button>
                  </div>
                  <div>Ticket: {currentTicket.thread_public_id}</div>
                  <div>Estado: {ticketStatus || "new"}</div>
                  <div>Categoria: {ticketDetails?.category || currentTicket.category || "-"}</div>
                  <div>
                    Numero de WhatsApp registrado: {anonymousWhatsapp || "-"}
                  </div>
                  {ticketDetails?.resolution ? (
                    <div>Resolucion: {ticketDetails.resolution}</div>
                  ) : null}
                  {canOpenWhatsapp ? (
                    <button
                      type="button"
                      onClick={() => window.open(ticketDetails.wa_link, "_blank", "noopener,noreferrer")}
                      className="rounded-xl bg-[#25D366] px-4 py-2 text-xs font-semibold text-white"
                    >
                      Abrir WhatsApp
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          )}

          {error ? (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}
        </div>
      </main>

      <footer className="relative z-10 w-full bg-[#2F1A55] pb-12 pt-6">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="h-px w-full bg-gradient-to-r from-white/0 via-white/35 to-white/0" />

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[1.60fr_1fr_1fr_1fr]">
            <div className="p-0 md:pl-6 lg:pl-10 md:pr-4 lg:pr-8">
              <div className="flex items-center gap-3">
                <div className="text-lg font-semibold tracking-tight text-white">ReferidosAPP</div>
                <span className="rounded-full border border-white/25 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/85">
                  BETA v0.9
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/75">
                Catalogo de promociones y sistema de recompensas por canjearlas y referir.
              </p>
              <div className="mt-4 text-xs text-white/65">
                <div>(c) 2026 ReferidosAPP</div>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">Informacion</h4>
              <div className="mt-3 flex flex-col gap-2 text-sm text-white/75">
                <a href="/guide" className="transition-colors hover:text-[var(--brand-yellow)]">Guia de uso</a>
                <a href="/about" className="transition-colors hover:text-[var(--brand-yellow)]">Quienes somos</a>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">Legal</h4>
              <div className="mt-3 flex flex-col gap-2 text-sm text-white/75">
                <Link to="/legal/es/privacidad" className="text-left transition-colors hover:text-[var(--brand-yellow)]">Privacidad</Link>
                <Link to="/legal/es/terminos" className="text-left transition-colors hover:text-[var(--brand-yellow)]">Terminos</Link>
                <Link to="/legal/es/borrar-datos" className="text-left transition-colors hover:text-[var(--brand-yellow)]">Borrar datos</Link>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">Contacto</h4>
              <div className="mt-3 flex flex-col gap-2 text-sm text-white/75">
                <a href="/soporte-chat" className="transition-colors hover:text-[var(--brand-yellow)]">Chat de soporte</a>
                <a href="/soporte-correo" className="transition-colors hover:text-[var(--brand-yellow)]">Soporte por correo</a>
                <a href="/feedback" className="transition-colors hover:text-[var(--brand-yellow)]">Dejar un comentario</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <SupportModal
        open={saveTicketModalOpen}
        title="Guarda tu numero de ticket"
        body={currentTicket?.thread_public_id
          ? `Te recomendamos guardar este numero para volver al chat cuando lo necesites: ${currentTicket.thread_public_id}`
          : "Te recomendamos guardar tu numero de ticket para volver al chat cuando lo necesites."}
        confirmLabel="Entendido"
        onConfirm={() => setSaveTicketModalOpen(false)}
      />

      <SupportModal
        open={Boolean(replacePrompt)}
        title="Ticket existente"
        body="Estas seguro que deseas borrar tu ticket anterior y crear uno nuevo?"
        confirmLabel={replaceLoading ? "Reemplazando..." : "Si, reemplazar"}
        cancelLabel="No, mantener"
        confirmDisabled={replaceLoading}
        onConfirm={() => void handleReplaceTicket()}
        onCancel={() => setReplacePrompt(null)}
      />
    </div>
  );
}

