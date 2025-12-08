// src/utils/errorUtils.js
export function handleError(error) {
  const message = error?.message ?? String(error);
  if (import.meta.env.DEV) {
    // Log detallado solo en desarrollo
    console.error(error);
  }
  return message;
}
