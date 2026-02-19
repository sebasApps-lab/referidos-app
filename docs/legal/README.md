# Legal Docs Index
Version: 2026.02.17
Document ID: legal.index
Last updated: 2026-02-17

This folder centralizes legal documentation for trademark/icon usage in admin observability.

## Documents

1. `docs/legal/brand-icon-policy.md`  
   Purpose: legal policy, governance, and render rules.
2. `docs/legal/brand-icon-manifest.md`  
   Purpose: source and legal status matrix per brand.
3. `packages/legal-content/content/es/privacy.md`  
   Purpose: privacy policy for end users (Spanish).
4. `packages/legal-content/content/es/terms.md`  
   Purpose: terms and conditions for end users (Spanish).
5. `packages/legal-content/content/es/data-deletion.md`  
   Purpose: account/data deletion policy for end users (Spanish).
6. `packages/legal-content/content/en/privacy.md`  
   Purpose: privacy policy for end users (English).
7. `packages/legal-content/content/en/terms.md`  
   Purpose: terms and conditions for end users (English).
8. `packages/legal-content/content/en/data-deletion.md`  
   Purpose: account/data deletion policy for end users (English).

## Runtime linkage

- Runtime policy source: `apps/referidos-app/src/admin/observability/brandIconPolicy.js`
- UI consumer: `apps/referidos-app/src/admin/observability/IssuesTable.jsx`

## Versioning model

- Legal docs version is explicitly declared in each file via `Version:`.
- Runtime legal policy version is exposed in `BRAND_ICON_POLICY_META.version`.
- User legal content from `packages/legal-content` is versioned in admin panel as:
  - `rev-YYYY-MM-DD` when a `Last updated`/`Ultima actualizacion` date is found
  - `rev-<id>-<hash>` fallback when no reliable date exists
- Expected cadence: review every 90 days or immediately after adding/removing any brand logo.
