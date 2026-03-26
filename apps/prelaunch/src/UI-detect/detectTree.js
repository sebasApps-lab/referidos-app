export function detectTree() {
  if (typeof window === "undefined") return "desktop";

  const userAgent = navigator.userAgent || "";
  const isMobileUserAgent =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(userAgent);

  const uaDataMobile = navigator.userAgentData?.mobile;
  if (uaDataMobile === true) {
    return "mobile";
  }

  if (typeof uaDataMobile === "boolean" && !isMobileUserAgent) {
    return uaDataMobile ? "mobile" : "desktop";
  }

  return isMobileUserAgent ? "mobile" : "desktop";
}
