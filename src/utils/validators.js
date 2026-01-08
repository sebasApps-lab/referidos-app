export const EMAIL_RE = /\S+@\S+\.\S+/;
export const PHONE_RE = /^09\d{8}$/;
export const CODE_RE = /^REF-[A-HJ-KM-NP-Z2-9]{4}-[A-HJ-KM-NP-Z2-9]{3}$/;

export function validateEmail(email) {
  return EMAIL_RE.test(email);
}

export function validatePhone(phone) {
  return PHONE_RE.test(phone);
}

export function validateCode(code) {
  return CODE_RE.test(code);
}

export function validarCedula(cedula) {
  if (!/^\d{10}$/.test(cedula)) return false;
  const provincia = parseInt(cedula.slice(0, 2), 10);
  if (provincia < 1 || provincia > 24) return false;
  
  const dig = cedula.split("").map((d) => parseInt(d, 10));
  const coef = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let suma = 0;
  
  for (let i = 0; i < 9; i++) {
    let prod = dig[i] * coef[i];
    if (prod >= 10) prod -= 9;
    suma += prod;
  }
  
  const verificador = (10 - (suma % 10)) % 10;
  return verificador === dig[9];
}
