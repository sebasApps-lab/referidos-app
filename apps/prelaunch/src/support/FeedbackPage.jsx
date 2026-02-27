import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ingestPrelaunchEvent } from "../services/prelaunchSystem";

const ECUADOR_PREFIX = "593";
const ECUADOR_FLAG_SVG_URL = "https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg";
const DESCRIPTION_MIN = 100;
const DESCRIPTION_MAX = 500;
const FEEDBACK_TYPES = [
  { id: "comentario", label: "Comentario" },
  { id: "sugerencia", label: "Sugerencia" },
  { id: "queja", label: "Queja" },
  { id: "otra", label: "Otra" },
];

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

export default function FeedbackPage() {
  const location = useLocation();
  const [name, setName] = useState("");
  const [contactMethod, setContactMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [feedbackType, setFeedbackType] = useState("comentario");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const normalizedEmail = useMemo(() => normalizeEmail(email), [email]);
  const normalizedWhatsappLocal = useMemo(
    () => normalizeWhatsappLocal(whatsapp),
    [whatsapp],
  );
  const normalizedWhatsapp = useMemo(
    () => (normalizedWhatsappLocal ? `${ECUADOR_PREFIX}${normalizedWhatsappLocal}` : null),
    [normalizedWhatsappLocal],
  );
  const normalizedDescription = useMemo(() => description.trim(), [description]);
  const selectedType = useMemo(
    () => FEEDBACK_TYPES.find((item) => item.id === feedbackType) || FEEDBACK_TYPES[0],
    [feedbackType],
  );

  const normalizedContact = contactMethod === "email" ? normalizedEmail : normalizedWhatsapp;
  const descriptionLength = normalizedDescription.length;
  const descriptionValid = descriptionLength >= DESCRIPTION_MIN && descriptionLength <= DESCRIPTION_MAX;
  const canSubmit = Boolean(normalizedContact) && descriptionValid && !submitting;

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) {
      if (!normalizedContact) {
        setError(
          contactMethod === "email"
            ? "Debes ingresar un correo electronico valido."
            : "Debes ingresar un numero de whatsapp valido.",
        );
      } else if (!descriptionValid) {
        setError(`El mensaje debe tener entre ${DESCRIPTION_MIN} y ${DESCRIPTION_MAX} caracteres.`);
      }
      return;
    }

    setSubmitting(true);
    setError("");
    setOk("");
    try {
      await ingestPrelaunchEvent("feedback_submit", {
        path: location.pathname,
        props: {
          type: selectedType.id,
          description_length: descriptionLength,
          contact_method: contactMethod,
          has_email: contactMethod === "email" ? Boolean(normalizedEmail) : false,
          has_whatsapp: contactMethod === "whatsapp" ? Boolean(normalizedWhatsapp) : false,
          has_name: Boolean(name.trim()),
        },
      });
      setOk("Gracias. Tu mensaje fue validado en frontend.");
      setDescription("");
    } catch {
      setError("No se pudo registrar el envio de feedback.");
    } finally {
      setSubmitting(false);
    }
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
            Contactanos
          </div>
          <div className="justify-self-end text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
            ACCESO ANTICIPADO
          </div>
        </header>

        <div className="rounded-3xl border border-[#E9E2F7] bg-white p-6 shadow-sm overflow-visible">
          <div className="text-left">
            <div className="text-2xl font-semibold text-[#2F1A55]">Contacto por correo</div>
            <p className="mt-4 text-sm text-slate-500">
              Dejanos cualquier comentario, sugerencia, o idea. Si tienes alguna queja tambien puedes dejarla aqui y sera revisada con atencion.
            </p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#2F1A55]">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Nombre"
                className="w-full rounded-2xl border border-[#E9E2F7] px-4 py-3 text-sm outline-none focus:border-[#5E30A5]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <label className="text-xs font-semibold text-[#2F1A55]">
                  Contacto <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#2F1A55]">
                    <input
                      type="radio"
                      name="contact_method"
                      value="email"
                      checked={contactMethod === "email"}
                      onChange={() => setContactMethod("email")}
                      className="h-4 w-4 accent-[#5E30A5]"
                    />
                    Correo electronico
                  </label>
                  <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#2F1A55]">
                    <input
                      type="radio"
                      name="contact_method"
                      value="whatsapp"
                      checked={contactMethod === "whatsapp"}
                      onChange={() => setContactMethod("whatsapp")}
                      className="h-4 w-4 accent-[#5E30A5]"
                    />
                    Numero de whatsapp
                  </label>
                </div>
              </div>
            </div>

            {contactMethod === "email" ? (
              <div className="space-y-1">
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="tu@email.com"
                  className="w-full rounded-2xl border border-[#E9E2F7] px-4 py-3 text-sm outline-none focus:border-[#5E30A5]"
                />
              </div>
            ) : (
              <div className="space-y-1">
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
                      value={whatsapp}
                      onChange={(event) => setWhatsapp(event.target.value)}
                      placeholder="99 7773231"
                      className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#2F1A55]">Razón</label>
              <select
                value={feedbackType}
                onChange={(event) => setFeedbackType(event.target.value)}
                className="w-full rounded-2xl border border-[#E9E2F7] px-4 py-3 text-sm outline-none focus:border-[#5E30A5]"
              >
                {FEEDBACK_TYPES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#2F1A55]">
                Mensaje <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={6}
                maxLength={DESCRIPTION_MAX}
                placeholder="El mensaje debe tener al menos 100 caracteres para continuar."
                className="w-full rounded-2xl border border-[#E9E2F7] px-4 py-3 text-sm outline-none focus:border-[#5E30A5] resize-none"
              />
              <div className="text-[11px] text-slate-400 text-right">
                {descriptionLength}/{DESCRIPTION_MAX}
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
                {submitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>

          {error ? (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}
          {ok ? (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
              {ok}
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
                Catalogo de promociones y sistema de recompensas por canjearlas y referir.
              </p>
              <div className="mt-4 text-xs text-white/65">
                <div>© 2026 ReferidosAPP</div>
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
                <Link to="/soporte-chat" className="transition-colors hover:text-[var(--brand-yellow)]">Chat de soporte</Link>
                <Link to="/soporte-correo" className="transition-colors hover:text-[var(--brand-yellow)]">Soporte por correo</Link>
                <a href="/feedback" className="transition-colors hover:text-[var(--brand-yellow)]">Comentarios y sugerencias</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
