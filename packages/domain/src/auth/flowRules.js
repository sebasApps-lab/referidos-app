import { AUTH_STEPS } from "./authSteps.js";

export function hasReason(reasons = [], needle = "") {
  return reasons.some((reason) => reason === needle || reason.startsWith(needle));
}

export function getMissingFieldsFromReasons(reasons = [], prefix) {
  const found = reasons.find((reason) => reason.startsWith(`${prefix}:`));
  if (!found) return [];
  const [, fields = ""] = found.split(":");
  return fields
    .split(",")
    .map((field) => field.trim())
    .filter(Boolean);
}

export function resolveClientPendingSteps(onboarding) {
  const steps = onboarding?.client_steps || {};
  const profile = steps.profile || {};
  const address = steps.address || {};
  const profileCompleted = Boolean(profile.completed);
  const addressCompleted = Boolean(address.completed);
  const profileSkipped = Boolean(profile.skipped) && !profileCompleted;
  const addressSkipped = Boolean(address.skipped) && !addressCompleted;
  return {
    profilePending: !profileCompleted && !profileSkipped,
    addressPending: !addressCompleted && !addressSkipped,
  };
}

export function resolveRegistrationStep({ onboarding, role }) {
  const reasons = onboarding?.reasons || [];
  if (!onboarding?.ok) return AUTH_STEPS.EMAIL_LOGIN;

  if (!onboarding?.usuario || !role) {
    return AUTH_STEPS.ROLE_SELECT;
  }

  if (role === "cliente") {
    const clientSteps = resolveClientPendingSteps(onboarding);
    if (clientSteps.profilePending) return AUTH_STEPS.USER_PROFILE;
    if (clientSteps.addressPending) return AUTH_STEPS.USER_ADDRESS;
    return AUTH_STEPS.ACCOUNT_VERIFY_PROMPT;
  }

  if (role === "negocio") {
    const ownerMissing = hasReason(reasons, "missing_owner_fields");
    const businessMissing =
      hasReason(reasons, "missing_business_row") ||
      hasReason(reasons, "missing_business_fields");
    const addressMissing =
      hasReason(reasons, "missing_sucursales_row") ||
      hasReason(reasons, "missing_sucursales_fields") ||
      hasReason(reasons, "missing_address_row") ||
      hasReason(reasons, "missing_address_fields");

    if (ownerMissing) return AUTH_STEPS.USER_PROFILE;
    if (businessMissing) return AUTH_STEPS.BUSINESS_DATA;
    if (addressMissing) return AUTH_STEPS.USER_ADDRESS;
    return AUTH_STEPS.ACCOUNT_VERIFY_PROMPT;
  }

  if (role === "soporte") {
    if (hasReason(reasons, "missing_support_fields")) {
      return AUTH_STEPS.USER_PROFILE;
    }
    return AUTH_STEPS.PENDING;
  }

  if (role === "admin") return AUTH_STEPS.PENDING;

  return AUTH_STEPS.EMAIL_LOGIN;
}

export function resolveVerificationStep({ onboarding, role }) {
  if (!onboarding?.allowAccess) return null;

  const status = onboarding?.verification_status || "unverified";
  const emailConfirmed = Boolean(onboarding?.email_confirmed);
  const hasPassword = Boolean(onboarding?.usuario?.has_password);
  const hasMfa = Boolean(
    onboarding?.usuario?.mfa_totp_enabled ||
      onboarding?.usuario?.mfa_method ||
      onboarding?.usuario?.mfa_primary_method ||
      onboarding?.usuario?.mfa_enrolled_at,
  );

  if (status === "verified" || status === "skipped") {
    return AUTH_STEPS.ACCOUNT_VERIFY_READY;
  }

  if (status === "in_progress") {
    if (role === "negocio") return AUTH_STEPS.BUSINESS_VERIFY;
    if (!emailConfirmed) return AUTH_STEPS.VERIFY_EMAIL;
    return AUTH_STEPS.ACCOUNT_VERIFY_METHOD;
  }

  if (status === "unverified") {
    return AUTH_STEPS.ACCOUNT_VERIFY_PROMPT;
  }

  if (!emailConfirmed) return AUTH_STEPS.VERIFY_EMAIL;
  if (!hasPassword || !hasMfa) return AUTH_STEPS.ACCOUNT_VERIFY_METHOD;
  return AUTH_STEPS.ACCOUNT_VERIFY_READY;
}
