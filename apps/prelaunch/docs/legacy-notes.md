# Prelaunch Legacy Notes

## Purpose

This document records the legacy prelaunch pages that are being retired from the active app, while preserving them safely in git history for future reference.

The goal is:

- keep the active app focused on the current mobile landing and the new desktop implementation
- remove legacy routes and legacy page code from the main app tree
- preserve the old implementations in git so they can be inspected or selectively recovered later

## Git Snapshot Created

Before cleanup, the following git references were created at the repository root:

- Branch: `codex/archive-prelaunch-legacy-2026-03-20`
- Tag: `prelaunch-legacy-before-cleanup-2026-03-20`

These references point to the full pre-cleanup state of `apps/prelaunch`.

## Legacy Routes To Retire

The following routes are considered legacy and are intended to be removed from the active router:

- `/v2` -> `PrelaunchHomePageV2`
- `/v3` -> `PrelaunchHomePageV3`
- `/v4` -> `PrelaunchHomePageV4`
- `/v5` -> `PrelaunchHomePageV5`
- `/landing-prueba` -> `LandingPruebaPage`
- `/landing-prueba2` -> `LandingPrueba2Page`
- `/anima-prototype` -> `AnimaPrototypePage`
- `/referencia` -> `ReferenciaPage`
- `/cliente-legacy` -> `WaitlistPage` with `forcedMode="cliente"`
- `/negocio-legacy` -> `WaitlistPage` with `forcedMode="negocio"`

## Files Expected To Stay Active

These files are not part of the legacy cleanup for now:

- `apps/prelaunch/src/home/PrelaunchHomePage.jsx`
- `apps/prelaunch/src/home/MobileWaitlistLandingPage.jsx`
- `apps/prelaunch/src/support/SupportRequestPage.jsx`
- `apps/prelaunch/src/waitlist/legal/LegalSimplePage.jsx`

Note:

- `PrelaunchHomePage.jsx` and `LegalSimplePage.jsx` are currently not wired to active routes, but they are being intentionally kept for now.

## Recommended Cleanup Strategy

The correct cleanup approach is:

1. Remove legacy routes from `apps/prelaunch/src/main.jsx`
2. Delete the legacy page/component/style files from the main branch
3. Keep the old code recoverable via the branch and tag above
4. Avoid copying legacy pages into `.txt` files or keeping unused code in the active tree

## How To Inspect Legacy Code Later

To inspect a legacy file without restoring it:

```bash
git show prelaunch-legacy-before-cleanup-2026-03-20:apps/prelaunch/src/home/AnimaPrototypePage.jsx
```

To inspect the full archived state in a separate branch:

```bash
git switch codex/archive-prelaunch-legacy-2026-03-20
```

To return to your working branch afterward:

```bash
git switch -
```

## How To Recover A Specific File

To restore one legacy file into the current branch:

```bash
git checkout prelaunch-legacy-before-cleanup-2026-03-20 -- apps/prelaunch/src/home/AnimaPrototypePage.jsx
```

To restore multiple files:

```bash
git checkout prelaunch-legacy-before-cleanup-2026-03-20 -- apps/prelaunch/src/home/AnimaPrototypePage.jsx apps/prelaunch/src/home/animaPrototype.css
```

Important:

- recover only the files you actually need
- do not reintroduce old routes unless the product explicitly decides to use them again
- if you recover something for reuse, prefer extracting only the useful part instead of reviving the full legacy page

## How To Compare Current Code Against The Archived Snapshot

To diff one file:

```bash
git diff prelaunch-legacy-before-cleanup-2026-03-20 -- apps/prelaunch/src/home/FigmaPrototypePage.jsx
```

To diff the whole prelaunch app:

```bash
git diff prelaunch-legacy-before-cleanup-2026-03-20 -- apps/prelaunch
```

## Recovery Policy

If something from legacy becomes useful in the future:

- first inspect it from the tag
- then recover only the relevant file or code block
- adapt it into the current architecture
- avoid restoring the full legacy routing structure unless there is a deliberate product decision

## Source Of Truth

The source of truth for legacy preservation is git history, specifically:

- `codex/archive-prelaunch-legacy-2026-03-20`
- `prelaunch-legacy-before-cleanup-2026-03-20`

This document is only an operational guide.
