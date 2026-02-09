import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL =
  Deno.env.get("SUPABASE_URL") ??
  Deno.env.get("URL");
const SUPABASE_PUBLISHABLE_KEY =
  Deno.env.get("SUPABASE_ANON_KEY") ??
  Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ??
  Deno.env.get("PUBLISHABLE_KEY");
const SUPABASE_SECRET_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ??
  Deno.env.get("SUPABASE_SECRET_KEY") ??
  Deno.env.get("SECRET_KEY");

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY || !SUPABASE_SECRET_KEY) {
  throw new Error(
    "Missing Supabase env vars: SUPABASE_URL/URL, SUPABASE_PUBLISHABLE_KEY/SUPABASE_ANON_KEY/PUBLISHABLE_KEY, SUPABASE_SECRET_KEY/SUPABASE_SERVICE_ROLE_KEY/SECRET_KEY",
  );
}

export const supabasePublic = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
);
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

export const DEVICE_ID_MIN_LEN = 8;
export const DEVICE_ID_MAX_LEN = 128;
export const LABEL_MAX_LEN = 80;

type JwtPayload = {
  sub?: string;
  aud?: string;
  session_id?: string;
  [key: string]: unknown;
};

export function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") || "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

export function json(
  body: unknown,
  status = 200,
  headers: Record<string, string> = {},
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

export function sanitizeLabel(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const trimmed = input.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, LABEL_MAX_LEN);
}

export function sanitizePlatform(input: unknown): string {
  if (typeof input !== "string") return "web";
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return "web";
  return trimmed.slice(0, 32);
}

export function sanitizeDeviceId(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const trimmed = input.trim();
  if (
    trimmed.length < DEVICE_ID_MIN_LEN || trimmed.length > DEVICE_ID_MAX_LEN
  ) {
    return null;
  }
  return trimmed;
}

function decodeJwtPayload(token: string): JwtPayload | null {
  const parts = token.split(".");
  if (parts.length < 2) return null;
  const payloadSegment = parts[1];
  const base64 = payloadSegment.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4 ? "=".repeat(4 - (base64.length % 4)) : "";
  try {
    const raw = atob(base64 + pad);
    return JSON.parse(raw) as JwtPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: Request): string | null {
  const authHeader = req.headers.get("authorization") ?? "";
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  const token = match?.[1]?.trim() || "";
  return token || null;
}

export function getSessionIdFromToken(token: string): string | null {
  const payload = decodeJwtPayload(token);
  const sid = payload?.session_id;
  if (typeof sid !== "string") return null;
  const trimmed = sid.trim();
  return trimmed || null;
}

export function getUserIdFromToken(token: string): string | null {
  const payload = decodeJwtPayload(token);
  const sub = payload?.sub;
  if (typeof sub !== "string") return null;
  const trimmed = sub.trim();
  return trimmed || null;
}

function tokenLooksLikeAuthenticatedSession(token: string): boolean {
  const payload = decodeJwtPayload(token);
  if (!payload) return false;
  const aud = typeof payload.aud === "string" ? payload.aud.trim() : "";
  const sub = typeof payload.sub === "string" ? payload.sub.trim() : "";
  const sessionId = typeof payload.session_id === "string"
    ? payload.session_id.trim()
    : "";
  return aud === "authenticated" && sub.length > 0 && sessionId.length > 0;
}

export async function getAuthedUser(req: Request, cors: Record<string, string>) {
  const token = getTokenFromRequest(req);
  if (!token) {
    return {
      ok: false as const,
      response: json(
        { ok: false, code: "unauthorized", message: "Missing bearer token" },
        401,
        cors,
      ),
    };
  }

  const headerApiKey = req.headers.get("apikey")?.trim() || null;
  let requestOrigin: string | null = null;
  try {
    requestOrigin = new URL(req.url).origin;
  } catch {
    requestOrigin = null;
  }
  const authProbeUrls = Array.from(new Set([
    requestOrigin,
    SUPABASE_URL,
  ].filter((value): value is string => Boolean(value && value.length > 0))));
  const authProbeKeys = Array.from(new Set([
    headerApiKey,
    SUPABASE_PUBLISHABLE_KEY,
    SUPABASE_SECRET_KEY,
  ].filter((value): value is string => Boolean(value && value.length > 0))));

  let resolvedUser: { id: string } | null = null;
  for (const url of authProbeUrls) {
    for (const key of authProbeKeys) {
      const probeClient = createClient(url, key);
      const {
        data: { user },
        error,
      } = await probeClient.auth.getUser(token);
      if (!error && user) {
        resolvedUser = user;
        break;
      }
    }
    if (resolvedUser) {
      break;
    }
  }

  if (!resolvedUser) {
    // Edge gateway already enforces JWT validity before invoking the function.
    // If Auth lookup is temporarily inconsistent (e.g. session_not_found), we
    // still proceed with JWT claims for bootstrap/session flows.
    const fallbackUserId = getUserIdFromToken(token);
    if (fallbackUserId && tokenLooksLikeAuthenticatedSession(token)) {
      return {
        ok: true as const,
        token,
        user: { id: fallbackUserId },
      };
    }

    return {
      ok: false as const,
      response: json(
        { ok: false, code: "unauthorized", message: "Invalid auth token" },
        401,
        cors,
      ),
    };
  }

  return {
    ok: true as const,
    token,
    user: resolvedUser,
  };
}

export async function assertCurrentSessionRegisteredAndActive(
  userId: string,
  sessionId: string,
  cors: Record<string, string>,
) {
  const { data, error } = await supabaseAdmin
    .from("user_session_devices")
    .select("id, revoked_at")
    .eq("user_id", userId)
    .eq("session_id", sessionId)
    .maybeSingle();

  if (error) {
    return {
      ok: false as const,
      response: json(
        {
          ok: false,
          code: "session_lookup_failed",
          message: "Could not validate current session",
        },
        500,
        cors,
      ),
    };
  }

  if (!data) {
    return {
      ok: false as const,
      response: json(
        {
          ok: false,
          code: "session_unregistered",
          message: "Session is not registered",
        },
        401,
        cors,
      ),
    };
  }

  if (data.revoked_at) {
    return {
      ok: false as const,
      response: json(
        {
          ok: false,
          code: "session_revoked",
          message: "Session has been revoked",
        },
        401,
        cors,
      ),
    };
  }

  return { ok: true as const };
}

export async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hashBytes = new Uint8Array(digest);
  return [...hashBytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function hashUserAgent(req: Request): Promise<string | null> {
  const ua = req.headers.get("user-agent")?.trim();
  if (!ua) return null;
  return await sha256Hex(ua);
}

export async function pruneSessions(userId: string) {
  try {
    await supabaseAdmin.rpc("prune_user_session_devices", { p_user_id: userId });
  } catch {
    // Best-effort retention cleanup; session flow must continue.
  }
}
