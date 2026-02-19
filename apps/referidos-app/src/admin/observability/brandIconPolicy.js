export const BRAND_ICON_LEGAL_STATUS = Object.freeze({
  APPROVED_PUBLIC_BRAND_KIT: "approved_public_brand_kit",
  APPROVED_CC_BY_ATTRIBUTION: "approved_cc_by_attribution",
  RESTRICTED_LICENSE_REQUIRED: "restricted_license_required",
  CONDITIONAL_REVIEW_REQUIRED: "conditional_review_required",
  GENERIC_FALLBACK: "generic_fallback",
});

export const BRAND_ICON_POLICY_META = Object.freeze({
  version: "2026.02.17",
  review_interval_days: 90,
  owner: "admin_observability",
});

export const BRAND_ICON_UI_NOTICE =
  "Brand icons are shown only when the catalog legal status allows it. Restricted entries use a generic fallback.";

export const BRAND_ICON_ANDROID_ATTRIBUTION =
  "Android robot is reproduced from work created and shared by Google and used according to terms described in the Creative Commons 3.0 Attribution License.";

const APPROVED_STATUSES = new Set([
  BRAND_ICON_LEGAL_STATUS.APPROVED_PUBLIC_BRAND_KIT,
  BRAND_ICON_LEGAL_STATUS.APPROVED_CC_BY_ATTRIBUTION,
]);

const BRAND_ICON_POLICY = Object.freeze({
  browsers: Object.freeze({
    chrome: Object.freeze({
      key: "chrome",
      label: "Chrome",
      iconUrl: null,
      legalStatus: BRAND_ICON_LEGAL_STATUS.RESTRICTED_LICENSE_REQUIRED,
      legalReason: "google_trademark_restricted_without_explicit_brand_terms_for_this_use",
      sourceUrl: "https://about.google/brand-resource-center/",
    }),
    firefox: Object.freeze({
      key: "firefox",
      label: "Firefox",
      iconUrl: "https://blog.mozilla.org/design/files/2019/06/Glyph-01-1-300x300.jpg",
      legalStatus: BRAND_ICON_LEGAL_STATUS.APPROVED_PUBLIC_BRAND_KIT,
      legalReason: "mozilla_public_brand_kit_available",
      sourceUrl: "https://mozilla.design/firefox/logos-usage/",
    }),
    brave: Object.freeze({
      key: "brave",
      label: "Brave",
      iconUrl: "https://brave.com/static-assets/images/brave-logo-sans-text.svg",
      legalStatus: BRAND_ICON_LEGAL_STATUS.APPROVED_PUBLIC_BRAND_KIT,
      legalReason: "brave_public_branding_assets_available",
      sourceUrl: "https://brave.com/brave-branding-assets/",
    }),
    safari: Object.freeze({
      key: "safari",
      label: "Safari",
      iconUrl: null,
      legalStatus: BRAND_ICON_LEGAL_STATUS.RESTRICTED_LICENSE_REQUIRED,
      legalReason: "apple_logo_usage_requires_explicit_license",
      sourceUrl: "https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html",
    }),
    edge: Object.freeze({
      key: "edge",
      label: "Edge",
      iconUrl: null,
      legalStatus: BRAND_ICON_LEGAL_STATUS.RESTRICTED_LICENSE_REQUIRED,
      legalReason: "microsoft_logo_usage_requires_license",
      sourceUrl: "https://www.microsoft.com/trademarks",
    }),
    opera: Object.freeze({
      key: "opera",
      label: "Opera",
      iconUrl: null,
      legalStatus: BRAND_ICON_LEGAL_STATUS.CONDITIONAL_REVIEW_REQUIRED,
      legalReason: "opera_brand_assets_require_written_permission_for_some_uses",
      sourceUrl: "https://brand.opera.com/",
    }),
    unknown: Object.freeze({
      key: "unknown",
      label: "Unknown",
      iconUrl: null,
      legalStatus: BRAND_ICON_LEGAL_STATUS.GENERIC_FALLBACK,
      legalReason: "no_policy_entry",
      sourceUrl: null,
    }),
  }),
  providers: Object.freeze({
    google: Object.freeze({
      key: "google",
      label: "Google",
      iconUrl: null,
      legalStatus: BRAND_ICON_LEGAL_STATUS.RESTRICTED_LICENSE_REQUIRED,
      legalReason: "google_trademark_restricted_without_explicit_brand_terms_for_this_use",
      sourceUrl: "https://about.google/brand-resource-center/",
    }),
    facebook: Object.freeze({
      key: "facebook",
      label: "Facebook",
      iconUrl: null,
      legalStatus: BRAND_ICON_LEGAL_STATUS.CONDITIONAL_REVIEW_REQUIRED,
      legalReason: "meta_branding_rules_require_review_for_ui_usage",
      sourceUrl: "https://www.facebookbrand.com/",
    }),
    discord: Object.freeze({
      key: "discord",
      label: "Discord",
      iconUrl:
        "https://images.ctfassets.net/5ltqckak4rjw/7Aq3M4esR0oVe2N9Qdo8z9/e3587dbf920669f92d0f008ec1698f23/Discord-Symbol-Blurple.png",
      legalStatus: BRAND_ICON_LEGAL_STATUS.APPROVED_PUBLIC_BRAND_KIT,
      legalReason: "discord_public_branding_page_available",
      sourceUrl: "https://discord.com/branding",
    }),
    apple: Object.freeze({
      key: "apple",
      label: "Apple",
      iconUrl: null,
      legalStatus: BRAND_ICON_LEGAL_STATUS.RESTRICTED_LICENSE_REQUIRED,
      legalReason: "apple_logo_usage_requires_explicit_license",
      sourceUrl: "https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html",
    }),
    email: Object.freeze({
      key: "email",
      label: "Correo",
      iconUrl: null,
      legalStatus: BRAND_ICON_LEGAL_STATUS.GENERIC_FALLBACK,
      legalReason: "generic_channel_not_a_brand",
      sourceUrl: null,
    }),
    unknown: Object.freeze({
      key: "unknown",
      label: "Unknown",
      iconUrl: null,
      legalStatus: BRAND_ICON_LEGAL_STATUS.GENERIC_FALLBACK,
      legalReason: "no_policy_entry",
      sourceUrl: null,
    }),
  }),
  os: Object.freeze({
    windows: Object.freeze({
      key: "windows",
      label: "Windows",
      iconUrl: null,
      legalStatus: BRAND_ICON_LEGAL_STATUS.RESTRICTED_LICENSE_REQUIRED,
      legalReason: "microsoft_logo_usage_requires_license",
      sourceUrl: "https://www.microsoft.com/trademarks",
    }),
    android: Object.freeze({
      key: "android",
      label: "Android",
      iconUrl: "https://developer.android.com/static/distribute/marketing-tools/brand-guidelines/android_robot.svg",
      legalStatus: BRAND_ICON_LEGAL_STATUS.APPROVED_CC_BY_ATTRIBUTION,
      legalReason: "android_robot_cc_by_attribution_allowed",
      sourceUrl: "https://developer.android.com/distribute/marketing-tools/brand-guidelines",
      attribution: BRAND_ICON_ANDROID_ATTRIBUTION,
    }),
    ios: Object.freeze({
      key: "ios",
      label: "iOS",
      iconUrl: null,
      legalStatus: BRAND_ICON_LEGAL_STATUS.RESTRICTED_LICENSE_REQUIRED,
      legalReason: "apple_logo_usage_requires_explicit_license",
      sourceUrl: "https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html",
    }),
    macos: Object.freeze({
      key: "macos",
      label: "macOS",
      iconUrl: null,
      legalStatus: BRAND_ICON_LEGAL_STATUS.RESTRICTED_LICENSE_REQUIRED,
      legalReason: "apple_logo_usage_requires_explicit_license",
      sourceUrl: "https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html",
    }),
    linux: Object.freeze({
      key: "linux",
      label: "Linux",
      iconUrl: null,
      legalStatus: BRAND_ICON_LEGAL_STATUS.CONDITIONAL_REVIEW_REQUIRED,
      legalReason: "linux_mark_usage_requires_trademark_review",
      sourceUrl: "https://www.linuxfoundation.org/legal/trademark-usage",
    }),
    unknown: Object.freeze({
      key: "unknown",
      label: "Unknown",
      iconUrl: null,
      legalStatus: BRAND_ICON_LEGAL_STATUS.GENERIC_FALLBACK,
      legalReason: "no_policy_entry",
      sourceUrl: null,
    }),
  }),
});

function normalizeKey(value) {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
}

function shouldRenderIcon(legalStatus, iconUrl) {
  return Boolean(iconUrl) && APPROVED_STATUSES.has(legalStatus);
}

export function resolveBrandIcon(group, key, fallbackLabel = null) {
  const groupKey = normalizeKey(group);
  const itemKey = normalizeKey(key);
  const groupMap = BRAND_ICON_POLICY[groupKey] || {};
  const policy = groupMap[itemKey] || groupMap.unknown || {
    key: itemKey || "unknown",
    label: fallbackLabel || key || "Unknown",
    iconUrl: null,
    legalStatus: BRAND_ICON_LEGAL_STATUS.GENERIC_FALLBACK,
    legalReason: "no_policy_entry",
    sourceUrl: null,
  };

  return {
    ...policy,
    key: policy.key || itemKey || "unknown",
    label: policy.label || fallbackLabel || key || "Unknown",
    iconUrl: shouldRenderIcon(policy.legalStatus, policy.iconUrl) ? policy.iconUrl : null,
    showIcon: shouldRenderIcon(policy.legalStatus, policy.iconUrl),
  };
}

export function getBrandIconPolicy() {
  return BRAND_ICON_POLICY;
}

