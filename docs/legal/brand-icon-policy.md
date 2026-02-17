# Brand Icon Legal Policy
Version: 2026.02.17
Document ID: legal.brand_icon_policy
Last updated: 2026-02-17

## Scope

This policy applies to brand icon rendering in observability UI, currently used by:

- `apps/referidos-app/src/admin/observability/IssuesTable.jsx`
- `apps/referidos-app/src/admin/observability/brandIconPolicy.js`

The policy controls when a brand logo can be rendered and when the UI must fallback to a generic icon.

## Why this policy exists

The previous implementation used `cdn.simpleicons.org` for many brands.

That was fast to implement, but not legally robust for trademarks because:

- icon-pack availability is not the same as trademark permission
- several brands require explicit usage terms or license approval
- there was no audit trail for source URLs and decisions

## Legal status model

Policy statuses are defined in `brandIconPolicy.js`:

- `approved_public_brand_kit`
- `approved_cc_by_attribution`
- `restricted_license_required`
- `conditional_review_required`
- `generic_fallback`

Render rule:

- Only `approved_public_brand_kit` and `approved_cc_by_attribution` can render a brand icon URL.
- All other statuses force generic fallback icon + text label.

## Current approved icons in UI

At this moment, only these entries render logos:

- Firefox (Mozilla brand resources)
- Brave (Brave branding assets)
- Discord (Discord branding page assets)
- Android (Android robot, with attribution requirement)

## Current restricted or conditional entries

These entries are intentionally fallback-only in UI:

- Google
- Apple
- Microsoft / Edge / Windows
- Safari
- Opera
- Facebook
- Linux (pending explicit trademark review)

Reason:

- brand terms are restricted, conditional, or require manual legal review for this exact product usage.

## Mandatory attribution

Android icon usage includes attribution text in the UI details screen.

Reference text is stored in:

- `BRAND_ICON_ANDROID_ATTRIBUTION` in `brandIconPolicy.js`

## Governance

- Policy owner: `admin_observability`
- Review interval: every 90 days
- Policy version lives in `BRAND_ICON_POLICY_META.version`

## Change process

To enable a new logo in UI:

1. Add source URL and legal rationale to `brandIconPolicy.js`.
2. Set status to an approved status only if source terms allow it.
3. Update `docs/legal/brand-icon-manifest.md`.
4. If terms require attribution, add attribution text in policy.
5. Re-run build and verify fallback behavior for restricted entries.
