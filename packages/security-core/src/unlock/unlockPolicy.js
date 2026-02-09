export const UNLOCK_LEVELS = {
  LOCKED: "LOCKED",
  UNLOCK_LOCAL: "UNLOCK_LOCAL",
  REAUTH_SENSITIVE: "REAUTH_SENSITIVE",
};

export const UNLOCK_METHODS = {
  NONE: "none",
  PIN: "pin",
  BIOMETRIC: "biometric",
  PASSWORD: "password",
  OTP: "otp",
};

export function getRequiredLevelForAction(action) {
  const sensitive = new Set([
    "change_email",
    "change_password",
    "delete_account",
    "change_access_methods",
    "support_admin_user_create",
  ]);
  return sensitive.has(action)
    ? UNLOCK_LEVELS.REAUTH_SENSITIVE
    : UNLOCK_LEVELS.UNLOCK_LOCAL;
}

export function isLevelSatisfied(currentLevel, requiredLevel) {
  const rank = {
    [UNLOCK_LEVELS.LOCKED]: 0,
    [UNLOCK_LEVELS.UNLOCK_LOCAL]: 1,
    [UNLOCK_LEVELS.REAUTH_SENSITIVE]: 2,
  };
  return (rank[currentLevel] || 0) >= (rank[requiredLevel] || 0);
}
