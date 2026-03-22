export const HELP_CENTER_MOBILE_MAX_WIDTH = 1040;

export function detectHelpCenterTree() {
  if (typeof window === "undefined") return "desktop";

  const userAgent = navigator.userAgent || "";
  const isMobileUserAgent =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(userAgent);

  const uaDataMobile = navigator.userAgentData?.mobile;
  const isMobileOrTabletDevice =
    uaDataMobile === true || isMobileUserAgent;

  if (isMobileOrTabletDevice) {
    return "mobile";
  }

  return window.innerWidth <= HELP_CENTER_MOBILE_MAX_WIDTH ? "mobile" : "desktop";
}
