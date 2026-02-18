import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  cancelAnonymousSupportThread,
  createAnonymousSupportThread,
} from "./supportApi";
import { ingestPrelaunchEvent } from "../services/prelaunchSystem";

const CATEGORIES = [
  { id: "acceso", label: "Pregunta o inquietud" },
  { id: "bug_performance", label: "Ayuda o soporte" },
  { id: "sugerencia", label: "Sugerencia" },
  { id: "borrar_correo_waitlist", label: "Borrar correo de lista de espera" },
];

const DEFAULT_CATEGORY = "acceso";
const SUMMARY_MAX = 240;
const ECUADOR_PREFIX = "593";
const ECUADOR_FLAG_SVG_URL = "https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg";

function normalizeWhatsappLocal(value) {
  let digits = (value || "").replace(/\D/g, "");
  if (digits.startsWith(ECUADOR_PREFIX)) {
    digits = digits.slice(ECUADOR_PREFIX.length);
  }
  if (digits.length < 8 || digits.length > 10) return null;
  return digits;
}

function normalizeEmail(value) {
  const normalized = (value || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return null;
  return normalized;
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
  children = null,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#E9E2F7] bg-white p-5 shadow-2xl">
        <div className="text-base font-semibold text-[#2F1A55]">{title}</div>
        <div className="mt-3 text-sm text-slate-600">{body}</div>
        {children ? <div className="mt-4">{children}</div> : null}
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
  const [searchParams] = useSearchParams();

  const path = location.pathname.toLowerCase();
  const activeTab = path === "/soporte-correo" ? "email" : isChatRoute ? "chat" : "email";
  const requestedCategory = (searchParams.get("tipo") || "").trim().toLowerCase();
  const categoryFromQuery = CATEGORIES.some((item) => item.id === requestedCategory)
    ? requestedCategory
    : DEFAULT_CATEGORY;

  const [contact, setContact] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState(categoryFromQuery);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [createdTicket, setCreatedTicket] = useState(null);
  const [ticketCopied, setTicketCopied] = useState(false);
  const [saveTicketModalOpen, setSaveTicketModalOpen] = useState(false);
  const [replacePrompt, setReplacePrompt] = useState(null);
  const [replaceLoading, setReplaceLoading] = useState(false);
  const summaryRef = useRef(null);

  const isChatTab = activeTab === "chat";
  const isEmailTab = activeTab === "email";
  const selectedChannel = isEmailTab ? "email" : "whatsapp";

  const contactLabel = selectedChannel === "email" ? "Correo electronico" : "Numero de WhatsApp";
  const contactPlaceholder = selectedChannel === "email" ? "tu@email.com" : "99 7773231";
  const normalizedWhatsappLocal = useMemo(() => normalizeWhatsappLocal(contact), [contact]);
  const normalizedWhatsapp = useMemo(
    () => (normalizedWhatsappLocal ? `${ECUADOR_PREFIX}${normalizedWhatsappLocal}` : null),
    [normalizedWhatsappLocal],
  );
  const normalizedEmail = useMemo(() => normalizeEmail(contact), [contact]);
  const normalizedContact = useMemo(
    () => (selectedChannel === "email" ? normalizedEmail : normalizedWhatsapp),
    [normalizedEmail, normalizedWhatsapp, selectedChannel],
  );

  const canSubmit = useMemo(
    () => Boolean(normalizedContact) && !submitting,
    [normalizedContact, submitting],
  );

  const subtitle = isChatTab
    ? "Selecciona tu tipo de inquietud y crea el ticket para recibir ayuda. Te responderemos por nuestro canal de whatsapp al numero que ingreses."
    : "Selecciona tu tipo de inquietud y crea el ticket para recibir ayuda. Te responderemos al correo electronico que ingreses.";

  const resizeSummaryInput = useCallback(() => {
    const node = summaryRef.current;
    if (!node) return;
    node.style.height = "auto";
    node.style.height = `${Math.max(node.scrollHeight, 104)}px`;
  }, []);

  useEffect(() => {
    setCategory(categoryFromQuery);
  }, [categoryFromQuery]);

  useEffect(() => {
    void ingestPrelaunchEvent("page_view", {
      path: location.pathname,
      props: {
        page: "support",
        channel: selectedChannel,
      },
    });
  }, [location.pathname, selectedChannel]);

  useEffect(() => {
    resizeSummaryInput();
  }, [resizeSummaryInput, summary]);

  const copyTicketNumber = useCallback(async (ticketNumber) => {
    if (!ticketNumber) return;
    try {
      await navigator.clipboard.writeText(ticketNumber);
    } catch {
      const hidden = document.createElement("textarea");
      hidden.value = ticketNumber;
      hidden.style.position = "fixed";
      hidden.style.opacity = "0";
      document.body.appendChild(hidden);
      hidden.focus();
      hidden.select();
      document.execCommand("copy");
      document.body.removeChild(hidden);
    }
    setTicketCopied(true);
    window.setTimeout(() => setTicketCopied(false), 1600);
  }, []);

  async function submitConversation() {
    if (!canSubmit) return;

    setSubmitting(true);
    setError("");

    const payload = {
      channel: selectedChannel,
      contact: normalizedContact,
      summary: summary.trim() || "Sin descripcion adicional.",
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
      channel: selectedChannel,
    };

    setCreatedTicket(created);
    setTicketCopied(false);
    setSaveTicketModalOpen(true);
    void copyTicketNumber(created.thread_public_id);
    void ingestPrelaunchEvent("support_ticket_created", {
      path: location.pathname,
      props: {
        channel: selectedChannel,
        category,
        thread_public_id: created.thread_public_id,
      },
    });
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
    <div
      className="min-h-screen bg-[#F9F6FF] text-slate-700 flex flex-col"
      style={{
        "--brand-purple": "#5E30A5",
        "--brand-yellow": "#FFC21C",
      }}
    >
      <main className="mx-auto w-full max-w-3xl px-6 pt-10 pb-32 flex-1">
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
          <div className="-mx-2 grid w-[calc(100%+1rem)] grid-cols-[1fr_auto_1fr] items-end gap-2 overflow-visible whitespace-nowrap bg-transparent px-2 md:-mx-3 md:w-[calc(100%+1.5rem)] md:gap-4 md:px-3">
            <div className="flex w-full justify-center">
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
            </div>
            <div className="h-7 w-px shrink-0 self-end bg-[#D3C8E8] shadow-[0_0_10px_rgba(211,200,232,0.95)]" />
            <div className="flex w-full justify-center">
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
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm text-slate-500">{subtitle}</p>
          </div>

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
                {isEmailTab ? (
                  <input
                    type="email"
                    autoComplete="email"
                    value={contact}
                    onChange={(event) => setContact(event.target.value)}
                    placeholder={contactPlaceholder}
                    className="w-full rounded-2xl border border-[#E9E2F7] px-4 py-3 text-sm outline-none focus:border-[#5E30A5]"
                  />
                ) : (
                  <div className="w-full overflow-hidden rounded-2xl border border-[#E9E2F7] focus-within:border-[#5E30A5]">
                    <div className="flex items-center">
                      <div className="flex shrink-0 items-center gap-2 px-3 py-3">
                        <img
                          src={ECUADOR_FLAG_SVG_URL}
                          alt="Bandera de Ecuador"
                          className="h-4 w-6 rounded-[2px] object-cover"
                          loading="lazy"
                        />
                        <span className="text-sm font-semibold text-slate-600">+593</span>
                      </div>
                      <div className="h-6 w-px bg-[#E9E2F7]" />
                      <input
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        value={contact}
                        onChange={(event) => setContact(event.target.value)}
                        placeholder={contactPlaceholder}
                        className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#2F1A55]">
                  Tipo de inquietud
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
                  Descripcion <span className="font-normal text-slate-400">(opcional)</span>
                </label>
                <textarea
                  ref={summaryRef}
                  value={summary}
                  onChange={(event) => setSummary(event.target.value)}
                  rows={4}
                  maxLength={SUMMARY_MAX}
                  placeholder="Describe tu pregunta o inquietud de manera detallada para una atencion mas eficiente."
                  className="w-full rounded-2xl border border-[#E9E2F7] px-4 py-3 text-sm outline-none focus:border-[#5E30A5] resize-none overflow-hidden"
                />
                <div className="text-[11px] text-slate-400 text-right">
                  {summary.length}/{SUMMARY_MAX}
                </div>
                <p className="text-xs text-slate-500">El tiempo de respuesta es de 6-48h.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`rounded-2xl px-5 py-3 text-sm font-semibold text-white ${
                    canSubmit ? "bg-[#5E30A5] hover:bg-[#4A2486]" : "bg-[#C9B6E8]"
                  }`}
                >
                  {submitting ? "Creando ticket..." : "Crear ticket de soporte"}
                </button>
              </div>
          </form>

          {error ? (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}
        </div>
      </main>

      <footer className="relative z-10 w-full bg-[var(--brand-purple)] pb-12 pt-6">
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
                Catálogo de promociones y sistema de recompensas por canjearlas y referir.
              </p>
              <div className="mt-4 text-xs text-white/65">
                <div>© 2026 ReferidosAPP</div>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">Información</h4>
              <div className="mt-3 flex flex-col gap-2 text-sm text-white/75">
                <a href="/guide" className="transition-colors hover:text-[var(--brand-yellow)]">Guía de uso</a>
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
                <Link to="/soporte-chat" className="transition-colors hover:text-[var(--brand-yellow)]">Chat de soporte</Link>
                <Link to="/soporte-correo" className="transition-colors hover:text-[var(--brand-yellow)]">Soporte por correo</Link>
                <a href="/feedback" className="transition-colors hover:text-[var(--brand-yellow)]">Comentarios y sugerencias</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <SupportModal
        open={saveTicketModalOpen}
        title="Ticket creado"
        body={
          createdTicket?.channel === "email"
            ? "Un asesor te escribira al correo electronico que proporcionaste."
            : "Un asesor te escribira por nuestro canal de whatsapp al numero que proporcionaste."
        }
        confirmLabel="Cerrar"
        onConfirm={() => setSaveTicketModalOpen(false)}
      >
        <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] p-3 text-center">
          <div className="text-xs text-slate-500">Numero de ticket</div>
          <div className="mt-1 text-base font-semibold text-[#2F1A55]">
            {createdTicket?.thread_public_id || "-"}
          </div>
          <button
            type="button"
            onClick={() => void copyTicketNumber(createdTicket?.thread_public_id || "")}
            className="mt-3 rounded-lg border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5]"
          >
            {ticketCopied ? "Numero copiado" : "Copiar numero"}
          </button>
        </div>
      </SupportModal>

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

