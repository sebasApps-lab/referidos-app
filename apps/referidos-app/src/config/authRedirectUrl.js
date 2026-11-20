/**
 * PKCE stores the verifier on the origin that starts the flow. Keep configured
 * callbacks on that origin so the browser can exchange the returned code.
 */
export function resolveAuthRedirectUrl(origin, ...configuredUrls) {
  const urls = configuredUrls.map((value) => String(value ?? "").trim());
  if (!origin || origin === "null") return urls.find(Boolean) || "";

  const fallback = new URL("/auth", origin);
  for (const value of urls) {
    if (!value) continue;
    try {
      const url = new URL(value, origin);
      if (
        url.protocol === fallback.protocol &&
        url.origin === fallback.origin &&
        !url.username &&
        !url.password
      ) {
        return url.href;
      }
    } catch {
      // Continue to the next configuration source or the default callback.
    }
  }
  return fallback.href;
}
