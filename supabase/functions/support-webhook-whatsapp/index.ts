import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { corsHeaders, jsonResponse } from "../_shared/support.ts";

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  return jsonResponse(
    { ok: false, error: "not_implemented" },
    501,
    cors
  );
});

