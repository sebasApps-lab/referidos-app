export async function isBiometricAvailable() {
  return { ok: false, available: false, reason: "webauthn_not_wired" };
}

export async function promptBiometric() {
  return { ok: false, verified: false, error: "webauthn_not_wired" };
}
