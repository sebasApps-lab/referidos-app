import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { corsHeaders, jsonResponse, safeTrim, supabaseAdmin } from "../_shared/support.ts";
import {
  listAnonymousMacroCategoriesFromCache,
  normalizeSupportAppChannel,
} from "../_shared/supportMacroCatalog.ts";

const DEFAULT_APP_CHANNEL = "prelaunch_web";

type SyncAttemptResult = {
  ok: boolean;
  detail: string | null;
  status: number | null;
};

async function trySyncMacrosCache(): Promise<SyncAttemptResult> {
  try {
    const sharedToken = safeTrim(Deno.env.get("SUPPORT_OPS_SHARED_TOKEN"), 256);
    const { data, error } = await supabaseAdmin.functions.invoke("ops-support-macros-sync-dispatch", {
      headers: sharedToken
        ? {
          "x-support-ops-token": sharedToken,
        }
        : undefined,
      body: {
        mode: "hot",
        force_full: true,
        limit: 2000,
        trigger: "support_anon_categories_empty",
        panel_key: "prelaunch_support",
      },
    });
    if (error) {
      return {
        ok: false,
        detail: safeTrim(error.message, 200) || "sync_dispatch_failed",
        status: null,
      };
    }
    if (data && typeof data === "object" && data !== null) {
      const payload = data as Record<string, unknown>;
      const payloadOk = payload.ok === true;
      if (!payloadOk) {
        return {
          ok: false,
          detail: safeTrim(String(payload.detail || payload.error || "sync_dispatch_failed"), 240) ||
            "sync_dispatch_failed",
          status: Number.isFinite(Number(payload.status)) ? Number(payload.status) : null,
        };
      }
    }
    return { ok: true, detail: null, status: 200 };
  } catch {
    return {
      ok: false,
      detail: "sync_dispatch_exception",
      status: null,
    };
  }
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, cors);
  }

  const body = await req.json().catch(() => ({}));
  const appChannel = normalizeSupportAppChannel(
    safeTrim(body.app_channel, 60) || DEFAULT_APP_CHANNEL,
    DEFAULT_APP_CHANNEL,
  );

  // Siempre sincroniza antes de listar: garantiza que nuevas categorias/macros de OPS
  // aparezcan sin depender de que el cache runtime este totalmente vacio.
  const syncResult = await trySyncMacrosCache();
  const { categories, error } = await listAnonymousMacroCategoriesFromCache({
    appChannel,
  });

  if (error) {
    return jsonResponse(
      {
        ok: false,
        error: "category_catalog_unavailable",
        detail: error,
      },
      500,
      cors,
    );
  }
  if (categories.length === 0 && !syncResult.ok) {
    return jsonResponse(
      {
        ok: false,
        error: "runtime_cache_empty_after_sync",
        detail: syncResult.detail || "sync_dispatch_failed",
      },
      502,
      cors,
    );
  }

  return jsonResponse(
    {
      ok: true,
      app_channel: appChannel,
      categories,
    },
    200,
    cors,
  );
});
