export function getPlatformInfo() {
  return {
    platform: "web",
    runtime: "browser",
    userAgent:
      typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
  };
}
