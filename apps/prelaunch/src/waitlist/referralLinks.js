function normalizeReferralPath(referralLinkPath, fallbackPath = "/") {
  const nextPath = String(referralLinkPath || "").trim();
  if (!nextPath) {
    return fallbackPath;
  }

  return nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
}

export function buildAbsoluteReferralLink(referralLinkPath, fallbackPath = "/") {
  const normalizedPath = normalizeReferralPath(referralLinkPath, fallbackPath);

  if (typeof window === "undefined") {
    return normalizedPath;
  }

  return new URL(normalizedPath, window.location.origin).toString();
}

export function buildWhatsAppShareUrl(referralLink) {
  return `https://wa.me/?text=${encodeURIComponent(referralLink)}`;
}

export function buildFacebookShareUrl(referralLink) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
}

export function buildTwitterShareUrl(referralLink) {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}`;
}

export async function openInstagramShare(referralLink) {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(referralLink);
    }
  } catch {
    // Best effort: still try to open Instagram even if clipboard is unavailable.
  }

  if (typeof window !== "undefined") {
    window.location.assign("instagram://app");
    window.setTimeout(() => {
      window.location.assign("https://www.instagram.com/");
    }, 600);
  }
}

