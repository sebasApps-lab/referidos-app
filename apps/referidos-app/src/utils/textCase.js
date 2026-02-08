const LOWERCASE_WORDS = new Set([
  "a",
  "al",
  "de",
  "del",
  "el",
  "la",
  "las",
  "los",
  "y",
  "e",
  "o",
  "u",
  "en",
]);

export function toTitleCaseEs(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const lower = text.toLowerCase().replace(/\s+/g, " ");
  const words = lower.split(" ");
  const mapped = words.map((word, index) => {
    if (!word) return word;
    const parts = word.split(/([-/'’])/);
    return parts
      .map((part) => {
        if (part === "-" || part === "/" || part === "'" || part === "’") {
          return part;
        }
        if (!part) return part;
        if (index > 0 && LOWERCASE_WORDS.has(part)) {
          return part;
        }
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join("");
  });
  return mapped.join(" ");
}
