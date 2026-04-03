import { buildAnonymousIdentity, extractUtmFromSearch } from "./anonIdentity.js";
import { invokePublicFeedbackSubmit } from "../../../feedback-sdk/src/publicClient.js";
import { normalizeFeedbackOriginRole } from "../../../feedback-sdk/src/shared.js";

const DEFAULT_TENANT_HINT = "ReferidosAPP";
const DEFAULT_APP_CHANNEL = "prelaunch_web";

function normalizeRoleIntent(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "negocio") return "negocio";
  return "cliente";
}

function resolveUtmPayload(utm) {
  if (utm && typeof utm === "object" && !Array.isArray(utm)) {
    return {
      source: utm.source || null,
      medium: utm.medium || null,
      campaign: utm.campaign || null,
      term: utm.term || null,
      content: utm.content || null,
    };
  }
  if (typeof window === "undefined") {
    return {
      source: null,
      medium: null,
      campaign: null,
      term: null,
      content: null,
    };
  }
  return extractUtmFromSearch(window.location.search);
}

function normalizePath(path) {
  if (typeof path === "string" && path.trim()) return path.trim().slice(0, 240);
  if (typeof window !== "undefined") return window.location.pathname || "/";
  return "/";
}

export function createPrelaunchClient({
  supabaseUrl,
  publishableKey,
  tenantHint = DEFAULT_TENANT_HINT,
  appChannel = DEFAULT_APP_CHANNEL,
  identityKeyPrefix = "referidos:prelaunch",
  sessionTimeoutMs = 30 * 60 * 1000,
} = {}) {
  if (!supabaseUrl || !publishableKey) {
    throw new Error("createPrelaunchClient requires supabaseUrl and publishableKey");
  }

  function getIdentity() {
    return buildAnonymousIdentity({
      keyPrefix: identityKeyPrefix,
      sessionTimeoutMs,
    });
  }

  async function invokePublic(fnName, payload = {}) {
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/${fnName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: publishableKey,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        return {
          ok: false,
          error: data?.message || data?.error || "request_failed",
          data: null,
        };
      }

      return { ok: true, data: data ?? null };
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : "request_failed",
        data: null,
      };
    }
  }

  function withSharedPayload(payload = {}) {
    return {
      ...payload,
      ...getIdentity(),
      tenant_hint: tenantHint,
      app_channel: appChannel,
    };
  }

  return {
    identity: {
      get: getIdentity,
    },
    analytics: {
      ingest: async ({
        event_type,
        path,
        props = {},
        utm = null,
      } = {}) =>
        invokePublic(
          "prelaunch-ingest",
          withSharedPayload({
            event_type,
            path: normalizePath(path),
            props,
            utm: resolveUtmPayload(utm),
          }),
        ),
    },
    waitlist: {
      submit: async ({
        email,
        role_intent = "cliente",
        source = "landing",
        consent_version = "privacy_v1",
        honeypot = "",
        referral_code = "",
        utm = null,
      } = {}) =>
        invokePublic(
          "waitlist-signup",
          withSharedPayload({
            email,
            role_intent: normalizeRoleIntent(role_intent),
            source,
            consent_version,
            honeypot,
            referral_code,
            utm: resolveUtmPayload(utm),
          }),
        ),
    },
    support: {
      listAnonymousCategories: async (payload = {}) =>
        invokePublic("support-anon-categories", withSharedPayload(payload)),
      createAnonymousThread: async (payload = {}) =>
        invokePublic("support-create-anon-thread", withSharedPayload(payload)),
      cancelAnonymousThread: async (payload = {}) =>
        invokePublic("support-anon-cancel-thread", payload),
      requestThreadRetake: async (payload = {}) =>
        invokePublic("support-retake-thread", payload),
      getAnonymousThreadStatus: async (payload = {}) =>
        invokePublic("support-anon-thread-status", payload),
    },
    feedback: {
      submit: async ({
        name,
        email,
        message,
        origin_role = "cliente",
        origin_source = "prelaunch",
        source_route = "/feedback",
        source_surface = "feedback_page",
        honeypot = "",
        context = {},
        utm = null,
      } = {}) =>
        invokePublicFeedbackSubmit(
          invokePublic,
          withSharedPayload({
            name,
            email,
            message,
            origin_role: normalizeFeedbackOriginRole(origin_role),
            origin_source,
            source_route: normalizePath(source_route),
            source_surface,
            honeypot,
            context,
            utm: resolveUtmPayload(utm),
          }),
        ),
    },
  };
}
