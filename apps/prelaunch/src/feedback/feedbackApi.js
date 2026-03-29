import { getDefaultUtm, getPrelaunchClient } from "../services/prelaunchSystem";

export async function submitPublicFeedback({
  name = "",
  email = "",
  message = "",
  originRole = "cliente",
  originSource = "prelaunch",
  sourceRoute = "/feedback",
  sourceSurface = "feedback_page",
  honeypot = "",
  context = {},
} = {}) {
  const prelaunchClient = getPrelaunchClient();
  if (!prelaunchClient) {
    return { ok: false, error: "missing_env" };
  }

  const response = await prelaunchClient.feedback.submit({
    name,
    email,
    message,
    origin_role: originRole,
    origin_source: originSource,
    source_route: sourceRoute,
    source_surface: sourceSurface,
    honeypot,
    context,
    utm: getDefaultUtm(),
  });

  return response ?? { ok: false, error: "empty_response" };
}
