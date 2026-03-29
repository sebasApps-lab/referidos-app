import { safeTrim } from "../../intake-guard/src/index.js";

export const FEEDBACK_NAME_MAX = 80;
export const FEEDBACK_EMAIL_MAX = 120;
export const FEEDBACK_MESSAGE_MAX = 1200;

export function normalizeFeedbackOriginRole(value) {
  const normalized = safeTrim(value, 40).toLowerCase();
  if (normalized === "negocio") return "negocio";
  return "cliente";
}

export function normalizeFeedbackName(value) {
  const normalized = safeTrim(value, FEEDBACK_NAME_MAX);
  return normalized || null;
}

export function normalizeFeedbackEmail(value) {
  const normalized = safeTrim(value, FEEDBACK_EMAIL_MAX).toLowerCase();
  if (!normalized) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return null;
  return normalized;
}

export function normalizeFeedbackMessage(value, max = FEEDBACK_MESSAGE_MAX) {
  const normalized = safeTrim(value, max).replace(/\s+/g, " ").trim();
  return normalized || null;
}

export function bucketFeedbackMessageLength(length) {
  if (!Number.isFinite(length) || length <= 0) return "0";
  if (length <= 49) return "1_49";
  if (length <= 99) return "50_99";
  if (length <= 199) return "100_199";
  if (length <= 399) return "200_399";
  if (length <= 799) return "400_799";
  return "800_plus";
}
