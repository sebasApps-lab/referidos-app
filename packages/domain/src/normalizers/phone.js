export const COUNTRY_CODES = [
  { code: "+593", label: "Ecuador" },
  { code: "+57", label: "Colombia" },
  { code: "+51", label: "Peru" },
  { code: "+1", label: "USA/Canada" },
  { code: "+34", label: "Espana" },
  { code: "+52", label: "Mexico" },
];

function onlyDigits(value = "") {
  return String(value || "").replace(/\D/g, "");
}

export function parsePhoneWithCountry(phone = "") {
  const raw = String(phone || "").trim();
  if (!raw) return { code: "+593", digits: "" };

  const found = COUNTRY_CODES.find((item) => raw.startsWith(item.code));
  if (found) {
    return { code: found.code, digits: onlyDigits(raw.slice(found.code.length)) };
  }

  const digits = onlyDigits(raw);
  if (digits.startsWith("593")) {
    return { code: "+593", digits: digits.slice(3) };
  }
  if (digits.startsWith("0")) {
    return { code: "+593", digits: digits.replace(/^0+/, "") };
  }
  return { code: "+593", digits };
}

export function normalizePhoneDigits(code, digits) {
  let normalized = onlyDigits(digits);
  if (code === "+593") {
    normalized = normalized.replace(/^0+/, "").slice(0, 9);
  }
  return normalized;
}

export function isPhoneValidForCountry(code, digits) {
  const normalized = normalizePhoneDigits(code, digits);
  if (code === "+593") return normalized.length === 9;
  return normalized.length >= 6;
}

export function toStoragePhone(code, digits) {
  const normalizedCode = String(code || "+593");
  const normalizedDigits = normalizePhoneDigits(normalizedCode, digits);
  return `${normalizedCode}${normalizedDigits}`;
}

export function toDisplayPhone(code, digits) {
  const normalizedCode = String(code || "+593");
  const normalizedDigits = normalizePhoneDigits(normalizedCode, digits);
  if (normalizedCode !== "+593") return `${normalizedCode}${normalizedDigits}`;
  if (!normalizedDigits) return "";
  const base = `0${normalizedDigits}`;
  const part1 = base.slice(0, 3);
  const part2 = base.slice(3, 6);
  const part3 = base.slice(6);
  return `${part1} ${part2} ${part3}`.trim();
}
