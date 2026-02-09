export async function isBiometricAvailable() {
  return { ok: false, available: false, reason: "not_configured" };
}

export async function promptBiometric() {
  return { ok: false, verified: false, error: "not_configured" };
}
