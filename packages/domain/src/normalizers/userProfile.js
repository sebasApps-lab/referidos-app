export const USER_NAME_MAX = 26;

const NAME_CLEAN_RE = /[^\p{L} ]+/gu;
const MULTI_SPACE_RE = /\s+/g;
const BIRTHDATE_FULL_RE = /^\d{2}\/\d{2}\/\d{4}$/;

function clamp(value, min, max) {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

function isLeapYear(year) {
  if (!year) return false;
  if (year % 4 !== 0) return false;
  if (year % 100 !== 0) return true;
  return year % 400 === 0;
}

function getDaysInMonth(month, year, preferFeb29 = true) {
  if (month === 2) {
    if (!year) return preferFeb29 ? 29 : 28;
    return isLeapYear(year) ? 29 : 28;
  }
  if ([4, 6, 9, 11].includes(month)) return 30;
  return 31;
}

export function normalizeUserName(value = "") {
  const cleaned = String(value || "")
    .replace(NAME_CLEAN_RE, "")
    .replace(MULTI_SPACE_RE, " ")
    .trimStart();
  return cleaned.slice(0, USER_NAME_MAX);
}

export function formatBirthdateInput(value = "") {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 8);
  const today = new Date();
  const maxYear = today.getFullYear() - 1;

  if (!digits) return "";
  if (digits.length <= 2) return digits;

  const dayRaw = digits.slice(0, 2);
  const monthRaw = digits.slice(2, 4);
  const yearRaw = digits.slice(4);
  const dayInput = clamp(parseInt(dayRaw || "1", 10), 1, 31);

  if (digits.length <= 4) {
    if (digits.length === 3) {
      return `${String(dayInput).padStart(2, "0")}/${monthRaw}`;
    }
    const monthInput = clamp(parseInt(monthRaw || "1", 10), 1, 12);
    const maxDay = getDaysInMonth(monthInput, null, true);
    const safeDay = clamp(dayInput, 1, maxDay);
    return `${String(safeDay).padStart(2, "0")}/${String(monthInput).padStart(2, "0")}/`;
  }

  const monthInput = clamp(parseInt(monthRaw || "1", 10), 1, 12);
  const maxDayForMonth = getDaysInMonth(monthInput, null, true);
  const safeDayForMonth = clamp(dayInput, 1, maxDayForMonth);

  if (yearRaw.length < 4) {
    return `${String(safeDayForMonth).padStart(2, "0")}/${String(monthInput).padStart(2, "0")}/${yearRaw}`;
  }

  const yearInput = clamp(parseInt(yearRaw || String(maxYear), 10), 1, maxYear);
  const maxDay = getDaysInMonth(monthInput, yearInput, true);
  const safeDay = clamp(dayInput, 1, maxDay);
  const safeYear = clamp(yearInput || maxYear, 1, maxYear);
  return `${String(safeDay).padStart(2, "0")}/${String(monthInput).padStart(2, "0")}/${String(safeYear).padStart(4, "0")}`;
}

export function parseBirthdate(value = "") {
  if (!BIRTHDATE_FULL_RE.test(String(value || ""))) return null;
  const [dd, mm, yyyy] = String(value)
    .split("/")
    .map((part) => parseInt(part, 10));
  if (!dd || !mm || !yyyy) return null;
  if (mm < 1 || mm > 12) return null;
  if (dd < 1 || dd > 31) return null;

  const maxYear = new Date().getFullYear() - 1;
  if (yyyy < 1 || yyyy > maxYear) return null;
  const maxDay = getDaysInMonth(mm, yyyy, true);
  if (dd > maxDay) return null;

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

export function buildBirthdateISO(value = "") {
  const parsed = parseBirthdate(value);
  if (!parsed) return null;
  const yyyy = String(parsed.year).padStart(4, "0");
  const mm = String(parsed.month).padStart(2, "0");
  const dd = String(parsed.day).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function getBirthdateStatus(value = "", minAge = 18) {
  const parsed = parseBirthdate(value);
  if (!parsed) return { isValid: false, isUnderage: false, parsed: null };

  const today = new Date();
  const birthdayThisYear = new Date(today.getFullYear(), parsed.month - 1, parsed.day);
  let age = today.getFullYear() - parsed.year;
  if (today < birthdayThisYear) {
    age -= 1;
  }

  return {
    isValid: true,
    isUnderage: age < minAge,
    parsed,
    age,
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

export function getUserProfileStatus({
  nombre,
  apellido,
  fechaNacimiento,
  genero,
  minAge = 18,
}) {
  const nameValue = normalizeUserName(nombre || "");
  const lastValue = normalizeUserName(apellido || "");
  const genderValue = String(genero || "").trim();
  const hasNombre = nameValue.trim().length > 0;
  const hasApellido = lastValue.trim().length > 0;
  const hasGenero = genderValue.length > 0;
  const birthStatus = getBirthdateStatus(fechaNacimiento || "", minAge);

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
