export const OBS_BREADCRUMB_CATALOG_VERSION = 1;

// Catalogo comun (auto + manual) para estandarizar eventos sin ruido.
// Regla: solo pasos con valor diagnostico real.
export const OBS_BREADCRUMB_CATALOG = Object.freeze({
  // Lifecycle / observability runtime
  "obs.app_boot.start": { type: "lifecycle", message: "App boot start", channel: "auto" },
  "obs.app_boot.ready": { type: "lifecycle", message: "App boot ready", channel: "auto" },
  "obs.logger.init": { type: "lifecycle", message: "Logger init", channel: "auto" },
  "obs.logger.enabled": { type: "lifecycle", message: "Logger enabled", channel: "auto" },
  "obs.logger.disabled": { type: "lifecycle", message: "Logger disabled", channel: "auto" },
  "obs.flush.online": { type: "lifecycle", message: "Online flush requested", channel: "auto" },
  "obs.flush.visibility_hidden": { type: "lifecycle", message: "Hidden flush requested", channel: "auto" },
  "obs.window.error": { type: "error", message: "Unhandled window error", channel: "auto" },
  "obs.window.unhandled_rejection": { type: "error", message: "Unhandled promise rejection", channel: "auto" },

  // Storage / telemetry health
  "obs.storage.breadcrumbs.unavailable": {
    type: "storage",
    message: "Breadcrumb storage unavailable",
    channel: "auto",
  },
  "obs.storage.breadcrumbs.read_failed": {
    type: "storage",
    message: "Breadcrumb storage read failed",
    channel: "auto",
  },
  "obs.storage.breadcrumbs.write_failed": {
    type: "storage",
    message: "Breadcrumb storage write failed",
    channel: "auto",
  },

  // Network
  "obs.network.fetch.ok": { type: "http", message: "HTTP request completed", channel: "auto" },
  "obs.network.fetch.error": { type: "http", message: "HTTP request failed", channel: "auto" },
  "obs.network.rpc.start": { type: "http", message: "RPC invoke start", channel: "manual" },
  "obs.network.rpc.ok": { type: "http", message: "RPC invoke success", channel: "manual" },
  "obs.network.rpc.error": { type: "http", message: "RPC invoke failed", channel: "manual" },

  // Navigation / UX flow
  "app.route.change": { type: "ui", message: "Route changed", channel: "manual" },
  "app.screen.enter": { type: "ui", message: "Screen entered", channel: "manual" },
  "app.form.submit.start": { type: "ui", message: "Form submit start", channel: "manual" },
  "app.form.submit.ok": { type: "ui", message: "Form submit success", channel: "manual" },
  "app.form.submit.error": { type: "ui", message: "Form submit failed", channel: "manual" },

  // Auth
  "auth.session.restore.start": { type: "auth", message: "Session restore start", channel: "manual" },
  "auth.session.restore.ok": { type: "auth", message: "Session restore success", channel: "manual" },
  "auth.session.restore.error": { type: "auth", message: "Session restore failed", channel: "manual" },
  "auth.signin.start": { type: "auth", message: "Sign-in start", channel: "manual" },
  "auth.signin.ok": { type: "auth", message: "Sign-in success", channel: "manual" },
  "auth.signin.error": { type: "auth", message: "Sign-in failed", channel: "manual" },
  "auth.signup.start": { type: "auth", message: "Sign-up start", channel: "manual" },
  "auth.signup.ok": { type: "auth", message: "Sign-up success", channel: "manual" },
  "auth.signup.error": { type: "auth", message: "Sign-up failed", channel: "manual" },
  "auth.signout.start": { type: "auth", message: "Sign-out start", channel: "manual" },
  "auth.signout.ok": { type: "auth", message: "Sign-out success", channel: "manual" },
  "auth.signout.error": { type: "auth", message: "Sign-out failed", channel: "manual" },
  "auth.account_delete.start": { type: "auth", message: "Account delete start", channel: "manual" },
  "auth.account_delete.ok": { type: "auth", message: "Account delete success", channel: "manual" },
  "auth.account_delete.error": { type: "auth", message: "Account delete failed", channel: "manual" },
  "auth.profile_update.start": { type: "auth", message: "Profile update start", channel: "manual" },
  "auth.profile_update.ok": { type: "auth", message: "Profile update success", channel: "manual" },
  "auth.profile_update.error": { type: "auth", message: "Profile update failed", channel: "manual" },
  "auth.bootstrap.start": { type: "auth", message: "Auth bootstrap start", channel: "manual" },
  "auth.bootstrap.ok": { type: "auth", message: "Auth bootstrap success", channel: "manual" },
  "auth.bootstrap.error": { type: "auth", message: "Auth bootstrap failed", channel: "manual" },

  // Onboarding
  "onboarding.check.start": { type: "onboarding", message: "Onboarding check start", channel: "manual" },
  "onboarding.check.ok": { type: "onboarding", message: "Onboarding check success", channel: "manual" },
  "onboarding.check.error": { type: "onboarding", message: "Onboarding check failed", channel: "manual" },

  // Support
  "support.ticket.create.start": { type: "support", message: "Support ticket create start", channel: "manual" },
  "support.ticket.create.ok": { type: "support", message: "Support ticket create success", channel: "manual" },
  "support.ticket.create.error": { type: "support", message: "Support ticket create failed", channel: "manual" },
  "support.ticket.list.start": { type: "support", message: "Support ticket list start", channel: "manual" },
  "support.ticket.list.ok": { type: "support", message: "Support ticket list success", channel: "manual" },
  "support.ticket.list.error": { type: "support", message: "Support ticket list failed", channel: "manual" },
  "support.ticket.cancel.start": { type: "support", message: "Support ticket cancel start", channel: "manual" },
  "support.ticket.cancel.ok": { type: "support", message: "Support ticket cancel success", channel: "manual" },
  "support.ticket.cancel.error": { type: "support", message: "Support ticket cancel failed", channel: "manual" },
  "support.ticket.whatsapp.open": { type: "support", message: "Support WhatsApp open", channel: "manual" },
  "support.email.open": { type: "support", message: "Support email open", channel: "manual" },
  "support.help.select": { type: "support", message: "Support option selected", channel: "manual" },
  "support.flow.step": { type: "support", message: "Support flow step", channel: "manual" },

  // Scanner
  "scanner.permission.request": { type: "scanner", message: "Scanner camera permission request", channel: "manual" },
  "scanner.permission.granted": { type: "scanner", message: "Scanner camera permission granted", channel: "manual" },
  "scanner.permission.denied": { type: "scanner", message: "Scanner camera permission denied", channel: "manual" },
  "scanner.permission.settings_redirect": { type: "scanner", message: "Scanner settings redirect", channel: "manual" },
  "scanner.permission.skip_intro": { type: "scanner", message: "Scanner permission intro skipped", channel: "manual" },
  "scanner.manual.open": { type: "scanner", message: "Scanner manual input opened", channel: "manual" },
  "scanner.start": { type: "scanner", message: "Scanner start", channel: "manual" },
  "scanner.ok": { type: "scanner", message: "Scanner success", channel: "manual" },
  "scanner.invalid": { type: "scanner", message: "Scanner invalid code", channel: "manual" },
  "scanner.error": { type: "scanner", message: "Scanner failed", channel: "manual" },

  // Payments
  "payments.checkout.start": { type: "payments", message: "Checkout start", channel: "manual" },
  "payments.checkout.ok": { type: "payments", message: "Checkout success", channel: "manual" },
  "payments.checkout.error": { type: "payments", message: "Checkout failed", channel: "manual" },
});

export function getBreadcrumbTemplate(code) {
  const key = typeof code === "string" ? code.trim() : "";
  if (!key) return null;
  return OBS_BREADCRUMB_CATALOG[key] || null;
}

export function buildCatalogBreadcrumb(code, data = {}, overrides = {}) {
  const template = getBreadcrumbTemplate(code);
  const safeCode = typeof code === "string" ? code.trim() : "";
  if (!safeCode) return null;
  return {
    code: safeCode,
    type: overrides.type || template?.type || "ui",
    message: overrides.message || template?.message || safeCode,
    channel: overrides.channel || template?.channel || "manual",
    timestamp: overrides.timestamp || new Date().toISOString(),
    data: data && typeof data === "object" ? data : {},
  };
}
