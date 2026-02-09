export const PIN_LENGTH = 4;
export const PIN_MAX_ATTEMPTS = 10;
export const PIN_LOCK_MS = 5 * 60 * 1000;

export function isValidPin(pin) {
  return /^\d{4}$/.test(String(pin || ""));
}
