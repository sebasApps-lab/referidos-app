import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HelpCenterHeader } from "../legal/helpCenterShared";
import { createAnonymousSupportThread, listAnonymousSupportCategories } from "./supportApi";
import { ingestPrelaunchEvent } from "../services/prelaunchSystem";
import "./supportOpenTicket.css";

const ECUADOR_PREFIX = "593";
const ECUADOR_FLAG_SVG_URL = "https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg";
const SUPPORT_FORM_MAIL_ICON_URL =
  "/assets/support-form/fluent_mail-24-filled.svg";
const SUPPORT_FORM_WHATSAPP_ICON_URL = "/assets/support-form/logos_whatsapp-icon.svg";
const DEFAULT_CATEGORIES = [
  { id: "cuenta", label: "Cuenta y acceso" },
  { id: "promociones", label: "Promociones y beneficios" },
  { id: "recompensas", label: "Canjes y recompensas" },
  { id: "tecnico", label: "Soporte técnico" },
  { id: "otra", label: "Otra consulta" },
];

function normalizeEmail(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return null;
  }
  return normalized;
}

function normalizeWhatsappLocal(value) {
  let digits = String(value || "").replace(/\D/g, "");
  if (digits.startsWith(ECUADOR_PREFIX)) {
    digits = digits.slice(ECUADOR_PREFIX.length);
  }
  if (digits.length < 8 || digits.length > 10) {
    return null;
  }
  return digits;
}

function normalizeCategoryOption(item) {
  const id = String(item?.code || item?.id || "").trim().toLowerCase();
  if (!id) {
    return null;
  }

  const label = String(item?.label || item?.code || id).trim();
  if (!label) {
    return null;
  }

  return { id, label };
}

function buildSuccessMessage(channel) {
  return channel === "whatsapp"
    ? "Tu mensaje fue enviado. Te escribiremos por WhatsApp apenas un asesor tome tu solicitud."
    : "Tu mensaje fue enviado. Te responderemos al correo electrónico que ingresaste.";
}

export default function SupportOpenTicketPage() {
  const [searchParams] = useSearchParams();
  const origin = searchParams.get("origin") === "business" ? "business" : "consumer";
  const initialChannel = searchParams.get("channel") === "whatsapp" ? "whatsapp" : "email";
  const backTo = origin === "business" ? "/ayuda-negocios/es" : "/ayuda/es";
  const headerActions = useMemo(
    () => [
      {
        key: "back",
        label: "↗ Volver al Centro de Ayuda",
        to: backTo,
        className:
          "help-center__header-link help-center__header-link--ghost support-open-ticket__header-link-back",
      },
    ],
    [backTo],
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [preferredChannel, setPreferredChannel] = useState(initialChannel);
  const [categoryOptions, setCategoryOptions] = useState(DEFAULT_CATEGORIES);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const normalizedEmail = useMemo(() => normalizeEmail(email), [email]);
  const normalizedWhatsappLocal = useMemo(() => normalizeWhatsappLocal(phone), [phone]);
  const normalizedWhatsapp = useMemo(
    () => (normalizedWhatsappLocal ? `${ECUADOR_PREFIX}${normalizedWhatsappLocal}` : null),
    [normalizedWhatsappLocal],
  );

  const selectedContact = preferredChannel === "email" ? normalizedEmail : normalizedWhatsapp;
  const selectedCategory = useMemo(
    () => categoryOptions.find((item) => item.id === category) || null,
    [category, categoryOptions],
  );

  const canSubmit = Boolean(
    name.trim() &&
      normalizedEmail &&
      normalizedWhatsapp &&
      selectedCategory &&
      !submitting &&
      !categoriesLoading,
  );

  useEffect(() => {
    void ingestPrelaunchEvent("page_view", {
      path: "/soporte/abrir-ticket",
      props: {
        page: "support_open_ticket",
        origin,
      },
    });
  }, [origin]);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      setCategoriesLoading(true);
      const response = await listAnonymousSupportCategories({
        requested_channel: preferredChannel,
      });

      if (cancelled) {
        return;
      }

      if (!response.ok || !response.data?.ok) {
        setCategoryOptions(DEFAULT_CATEGORIES);
        setCategoriesLoading(false);
        return;
      }

      const nextOptions = (response.data.categories || [])
        .map((item) => normalizeCategoryOption(item))
        .filter(Boolean);

      setCategoryOptions(nextOptions.length ? nextOptions : DEFAULT_CATEGORIES);
      setCategoriesLoading(false);
    }

    void loadCategories();

    return () => {
      cancelled = true;
    };
  }, [preferredChannel]);

  useEffect(() => {
    setCategory((current) => {
      if (current && categoryOptions.some((item) => item.id === current)) {
        return current;
      }
      return categoryOptions[0]?.id || "";
    });
  }, [categoryOptions]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) {
      setError("Completa todos los campos con información válida para continuar.");
      setSuccess("");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    const payload = {
      channel: preferredChannel,
      contact: selectedContact,
      summary: "Solicitud enviada desde el formulario web de soporte.",
      category: selectedCategory.id,
      severity: "s2",
      origin_source: "user",
      app_channel: "prelaunch",
      source_route: "/soporte/abrir-ticket",
      client_request_id: crypto.randomUUID(),
      context: {
        flow: "support_form",
        name: name.trim(),
        email: normalizedEmail,
        whatsapp: normalizedWhatsapp,
        preferred_channel: preferredChannel,
        category_label: selectedCategory.label,
        help_center_origin: origin,
      },
    };

    const response = await createAnonymousSupportThread(payload);

    if (!response.ok || !response.data?.ok) {
      if (response.error === "missing_env") {
        setSuccess(buildSuccessMessage(preferredChannel));
        setSubmitting(false);
        return;
      }

      setError(
        response.error ||
          response.data?.detail ||
          response.data?.error ||
          "No se pudo enviar tu solicitud en este momento.",
      );
      setSubmitting(false);
      return;
    }

    void ingestPrelaunchEvent("support_ticket_created", {
      path: "/soporte/abrir-ticket",
      props: {
        channel: preferredChannel,
        category: selectedCategory.id,
        origin,
      },
    });

    setSuccess(buildSuccessMessage(preferredChannel));
    setSubmitting(false);
  }

  return (
    <div className="support-open-ticket help-center help-center--business">
      <HelpCenterHeader
        basePath={backTo}
        headerTitle="Recibir ayuda o soporte"
        titleTo={null}
        headerActions={headerActions}
      />

      <main className="support-open-ticket__main">
        <section className="support-open-ticket__hero">
          <h1>{"\u00bfNecesitas ayuda?"}</h1>
          <p>Completa el formulario y nos pondremos en contacto contigo.</p>
        </section>

        <section className="support-open-ticket__card">
          <form className="support-open-ticket__form" onSubmit={handleSubmit}>
            <div className="support-open-ticket__field">
              <label htmlFor="support-name">Nombre</label>
              <input
                id="support-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ingresa tu nombre..."
              />
            </div>

            <div className="support-open-ticket__field">
              <label htmlFor="support-email">{"Correo electr\u00f3nico"}</label>
              <input
                id="support-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={"Ingresa tu correo electr\u00f3nico..."}
              />
            </div>

            <div className="support-open-ticket__field">
              <label htmlFor="support-phone">{"N\u00famero de tel\u00e9fono"}</label>
              <div className="support-open-ticket__phone-row">
                <div className="support-open-ticket__country-box">
                  <img
                    className="support-open-ticket__country-flag"
                    src={ECUADOR_FLAG_SVG_URL}
                    alt="Bandera de Ecuador"
                    loading="lazy"
                  />
                  <span>+593</span>
                </div>

                <input
                  id="support-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder={"Ingresa tu n\u00famero de tel\u00e9fono..."}
                />
              </div>
            </div>

            <div className="support-open-ticket__field">
              <label htmlFor="support-category">{"Categor\u00eda"}</label>
              <div className="support-open-ticket__select-wrap">
                <select
                  id="support-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  disabled={categoriesLoading}
                >
                  {categoryOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <span className="support-open-ticket__select-chevron" aria-hidden="true">
                  {"\u25be"}
                </span>
              </div>
            </div>

            <div className="support-open-ticket__field support-open-ticket__field--method">
              <span className="support-open-ticket__method-label">
                {"\u00bfC\u00f3mo prefieres recibir soporte?"}
              </span>

              <div className="support-open-ticket__method-options">
                <button
                  type="button"
                  className={`support-open-ticket__method-option ${
                    preferredChannel === "email" ? "is-active" : ""
                  }`}
                  onClick={() => setPreferredChannel("email")}
                >
                  <span className="support-open-ticket__method-icon support-open-ticket__method-icon--email">
                    <MailMethodIcon />
                  </span>
                  <span>{"Correo electr\u00f3nico"}</span>
                </button>

                <button
                  type="button"
                  className={`support-open-ticket__method-option ${
                    preferredChannel === "whatsapp" ? "is-active" : ""
                  }`}
                  onClick={() => setPreferredChannel("whatsapp")}
                >
                  <span className="support-open-ticket__method-icon support-open-ticket__method-icon--whatsapp">
                    <WhatsappMethodIcon />
                  </span>
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            <div className="support-open-ticket__submit-row">
              <button
                type="submit"
                className="support-open-ticket__submit"
                disabled={!canSubmit}
              >
                {submitting ? "Enviando..." : "Enviar mensaje"}
              </button>
            </div>

            {error ? <p className="support-open-ticket__message is-error">{error}</p> : null}
            {success ? <p className="support-open-ticket__message is-success">{success}</p> : null}
          </form>
        </section>
      </main>
    </div>
  );
}

function MailMethodIcon() {
  return <img src={SUPPORT_FORM_MAIL_ICON_URL} alt="" aria-hidden="true" />;
}

function WhatsappMethodIcon() {
  return <img src={SUPPORT_FORM_WHATSAPP_ICON_URL} alt="" aria-hidden="true" />;
}
