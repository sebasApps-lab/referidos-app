export const EMAIL_RE = /\S+@\S+\.\S+/;
export const PHONE_EC_RE = /^09\d{8}$/;
export const CODE_RE = /^REF-[A-HJ-KM-NP-Z2-9]{4}-[A-HJ-KM-NP-Z2-9]{3}$/;
export const RUC_RE = /^\d{13}$/;

export function validateEmail(email) {
  return EMAIL_RE.test(String(email || "").trim());
}

export function validateEcuadorPhone(phone) {
  return PHONE_EC_RE.test(String(phone || "").trim());
}

export function validateRegistrationCode(code) {
  return CODE_RE.test(String(code || "").trim().toUpperCase());
}

export function validarCedula(cedula) {
  const value = String(cedula || "").trim();
  if (!/^\d{10}$/.test(value)) return false;
  const provincia = Number.parseInt(value.slice(0, 2), 10);
  if (provincia < 1 || provincia > 24) return false;

  const digits = value.split("").map((d) => Number.parseInt(d, 10));
  const coef = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let sum = 0;
  for (let i = 0; i < 9; i += 1) {
    let result = digits[i] * coef[i];
    if (result >= 10) result -= 9;
    sum += result;
  }
  const verifier = (10 - (sum % 10)) % 10;
  return verifier === digits[9];
}

export function validateRucFromCedula(ruc) {
  const value = String(ruc || "").trim();
  if (!RUC_RE.test(value)) return false;
  const cedula = value.slice(0, 10);
  const suffix = value.slice(10);
  return suffix === "001" && validarCedula(cedula);
}
