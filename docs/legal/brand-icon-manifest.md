# Brand Icon Manifest
Version: 2026.02.17
Document ID: legal.brand_icon_manifest
Last updated: 2026-02-17

This manifest is the audit table for brand icon decisions used by observability UI.

Policy source:

- `apps/referidos-app/src/admin/observability/brandIconPolicy.js`

## Browsers

| Key | Label | Legal status | Render logo | Source |
|---|---|---|---|---|
| chrome | Chrome | restricted_license_required | No | https://about.google/brand-resource-center/ |
| firefox | Firefox | approved_public_brand_kit | Yes | https://mozilla.design/firefox/logos-usage/ |
| brave | Brave | approved_public_brand_kit | Yes | https://brave.com/brave-branding-assets/ |
| safari | Safari | restricted_license_required | No | https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html |
| edge | Edge | restricted_license_required | No | https://www.microsoft.com/trademarks |
| opera | Opera | conditional_review_required | No | https://brand.opera.com/ |

## Providers

| Key | Label | Legal status | Render logo | Source |
|---|---|---|---|---|
| google | Google | restricted_license_required | No | https://about.google/brand-resource-center/ |
| facebook | Facebook | conditional_review_required | No | https://www.facebookbrand.com/ |
| discord | Discord | approved_public_brand_kit | Yes | https://discord.com/branding |
| apple | Apple | restricted_license_required | No | https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html |
| email | Correo | generic_fallback | No | n/a |

## Operating systems

| Key | Label | Legal status | Render logo | Source |
|---|---|---|---|---|
| windows | Windows | restricted_license_required | No | https://www.microsoft.com/trademarks |
| android | Android | approved_cc_by_attribution | Yes | https://developer.android.com/distribute/marketing-tools/brand-guidelines |
| ios | iOS | restricted_license_required | No | https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html |
| macos | macOS | restricted_license_required | No | https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html |
| linux | Linux | conditional_review_required | No | https://www.linuxfoundation.org/legal/trademark-usage |

## Rationale summary

- Logos are rendered only where public brand kit terms are available or CC BY attribution explicitly allows reuse.
- All other cases default to generic fallback to reduce trademark risk.
- Android attribution text is required and rendered in event detail UI.
