// src/utils/errorUtils.js
import { logError } from "../services/loggingClient";

export function handleError(error) {
  const message = error?.message ?? String(error);
  logError(error, { source: "handled_error" });
  if (import.meta.env.DEV) {
    // Log detallado solo en desarrollo
    console.error(error);
  }
  return message;
}
