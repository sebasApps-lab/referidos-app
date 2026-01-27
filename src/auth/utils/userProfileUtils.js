export const USER_NAME_MAX = 26;

const NAME_CLEAN_RE = /[^\p{L} ]+/gu;
const MULTI_SPACE_RE = /\s+/g;
const BIRTHDATE_FULL_RE = /^\d{2}\/\d{2}\/\d{4}$/;

export function normalizeUserName(value = "") {
  const cleaned = value
    .replace(NAME_CLEAN_RE, "")
    .replace(MULTI_SPACE_RE, " ")
    .trimStart();
  return cleaned.slice(0, USER_NAME_MAX);
}

export function formatBirthdateInput(value = "") {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function parseBirthdate(value = "") {
  if (!BIRTHDATE_FULL_RE.test(value)) return null;
  const [dd, mm, yyyy] = value.split("/").map((part) => parseInt(part, 10));
  if (!dd || !mm || !yyyy) return null;
  if (mm < 1 || mm > 12) return null;
  if (dd < 1 || dd > 31) return null;

  const date = new Date(Date.UTC(yyyy, mm - 1, dd));
  if (
    date.getUTCFullYear() !== yyyy ||
    date.getUTCMonth() !== mm - 1 ||
    date.getUTCDate() !== dd
  ) {
    return null;
  }

  return { day: dd, month: mm, year: yyyy };
}

export function getBirthdateStatus(value = "") {
  const parsed = parseBirthdate(value);
  if (!parsed) {
    return { isValid: false, isUnderage: false, parsed: null };
  }

  const today = new Date();
  const birthdayThisYear = new Date(
    today.getFullYear(),
    parsed.month - 1,
    parsed.day
  );
  let age = today.getFullYear() - parsed.year;
  if (today < birthdayThisYear) {
    age -= 1;
  }

  return {
    isValid: true,
    isUnderage: age < 18,
    parsed,
  };
}

export function formatBirthdateForInput(value) {
  if (!value) return "";
  const raw = String(value);
  const base = raw.split("T")[0];
  const parts = base.split("-");
  if (parts.length !== 3) return "";
  const [yyyy, mm, dd] = parts;
  if (!yyyy || !mm || !dd) return "";
  return `${dd.padStart(2, "0")}/${mm.padStart(2, "0")}/${yyyy}`;
}

export function buildBirthdateISO(value = "") {
  const parsed = parseBirthdate(value);
  if (!parsed) return null;
  const yyyy = String(parsed.year).padStart(4, "0");
  const mm = String(parsed.month).padStart(2, "0");
  const dd = String(parsed.day).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function getUserProfileStatus({ nombre, apellido, fechaNacimiento, genero }) {
  const nameValue = normalizeUserName(nombre || "");
  const lastValue = normalizeUserName(apellido || "");
  const genderValue = String(genero || "").trim();
  const hasNombre = nameValue.trim().length > 0;
  const hasApellido = lastValue.trim().length > 0;
  const hasGenero = genderValue.length > 0;
  const birthStatus = getBirthdateStatus(fechaNacimiento || "");

  return {
    nombre: nameValue,
    apellido: lastValue,
    genero: genderValue,
    birthStatus,
    canSubmit:
      hasNombre &&
      hasApellido &&
      hasGenero &&
      birthStatus.isValid &&
      !birthStatus.isUnderage,
  };
}
