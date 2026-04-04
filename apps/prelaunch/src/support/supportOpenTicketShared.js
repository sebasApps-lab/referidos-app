import supportMailIcon from "../assets/support/fluent-color-mail-16.svg";
import supportWhatsappIcon from "../assets/modals/logos_whatsapp-icon.svg";

export const ECUADOR_PREFIX = "593";
export const ECUADOR_FLAG_SVG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg";
export const SUPPORT_FORM_MAIL_ICON_URL = supportMailIcon;
export const SUPPORT_FORM_WHATSAPP_ICON_URL = supportWhatsappIcon;
export const DEFAULT_SUPPORT_CATEGORIES = [
  { id: "cuenta", label: "Cuenta y acceso" },
  { id: "promociones", label: "Promociones y beneficios" },
  { id: "recompensas", label: "Canjes y recompensas" },
  { id: "tecnico", label: "Soporte t\u00e9cnico" },
  { id: "otra", label: "Otra consulta" },
];

export function normalizeSupportEmail(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return null;
  }
  return normalized;
}

export function normalizeSupportWhatsappLocal(value) {
  let digits = String(value || "").replace(/\D/g, "");
  if (digits.startsWith(ECUADOR_PREFIX)) {
    digits = digits.slice(ECUADOR_PREFIX.length);
  }
  if (digits.length < 8 || digits.length > 10) {
    return null;
  }
  return digits;
}

export function normalizeSupportCategoryOption(item) {
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

export function buildSupportSuccessMessage(channel) {
  return channel === "whatsapp"
    ? "Tu mensaje fue enviado. Te escribiremos por WhatsApp apenas un asesor tome tu solicitud."
    : "Tu mensaje fue enviado. Te responderemos al correo electr\u00f3nico que ingresaste.";
}
