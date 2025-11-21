// src/utils/dateUtils.js
export function formatDateIsoToDdMmYyyy(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  } catch {
    return iso;
  }
}
