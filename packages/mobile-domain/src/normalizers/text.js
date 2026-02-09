const LOWER_WORDS = new Set([
  "de",
  "del",
  "la",
  "las",
  "los",
  "y",
  "e",
  "o",
  "u",
  "en",
  "a",
  "al",
  "por",
  "para",
]);

function capitalizeWord(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function toTitleCaseEs(text) {
  const value = String(text || "").trim();
  if (!value) return "";
  return value
    .split(/\s+/)
    .map((word, index) => {
      const normalized = word.toLowerCase();
      if (index > 0 && LOWER_WORDS.has(normalized)) return normalized;
      return capitalizeWord(normalized);
    })
    .join(" ");
}

export function normalizeLooseSearch(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ");
}
