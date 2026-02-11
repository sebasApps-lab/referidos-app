# Android RN Parity Playbook (PWA Read-Only)

## Scope Rules (non-negotiable)
- `apps/referidos-app/**` is read-only.
- Allowed write scope for migration work:
- `apps/referidos-android/**`
- `packages/**` (shared SDK/domain layers consumed by RN; PWA keeps current internal usage)
- `docs/**`
- `tooling/**`
- root `package.json` / `package-lock.json` only when required for workspace integrity.
- Backend changes must be backward-compatible with current PWA.
- Shared logic reuse is by copy into `packages/**` for RN; PWA keeps using its own current internal logic.
- Shared packages in current monorepo naming:
- `packages/domain`
- `packages/api-client`
- `packages/security-core`
- `packages/observability-sdk`
- `packages/platform-rn`
- `packages/platform-web`

## Legacy Sprint Mapping (from `android-migration-plan.md`)
- [x] Sprint 0: Guardrails and parity checklist baseline.
- [x] Sprint 1: Bootstrap `apps/referidos-android` with React Native workspace structure.
- [x] Sprint 2: Shared packages bootstrap for RN consumption (domain/api/security/observability).
- [x] Sprint 3: App shell baseline (role routing, tabs, modal host, loaders placeholders).
- [ ] Sprint 4-12 are covered by Phases 2-9 below.

## How to use this file in each review
1. Work only on the current phase.
2. Mark completed tasks with `[x]`.
3. At phase close:
- remove completed items from that phase (to keep file focused on remaining work),
- keep only pending tasks,
- append any newly discovered tasks.
4. Do not start next phase until current phase `DoD` is fully met.

## Completion Evidence (required per task)
- PWA source reference (file/path + behavior being mirrored).
- RN implementation reference (file/path + behavior delivered).
- Verification proof:
- command used (if applies),
- expected result,
- observed result.

---

## Phase 1 - Closed
**Status:** completed.

### Phase 1 closure evidence
- Runtime/dependency health check is green: `npm run android:phase1:health`.
- Android debug build is deterministic: `npm run android:assemble:debug`.
- Cold start + reopen after process kill validated on:
- physical device
- emulator
- App reaches login without initial redbox/runtime crash.

---

## Phase 2 - Closed
**Status:** completed.

### Phase 2 closure evidence
- PWA source behaviors mirrored (references):
  - `apps/referidos-app/src/auth/hooks/useAuthFlow.js`
  - `apps/referidos-app/src/auth/hooks/useAuthActions.js`
  - `apps/referidos-app/src/auth/steps/OAuthCallbackStep.jsx`
  - `apps/referidos-app/src/auth/steps/UserProfileStep.jsx`
  - `apps/referidos-app/src/auth/steps/BusinessDataStep.jsx`
  - `apps/referidos-app/src/auth/steps/UserAddressStep.jsx`
  - `apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx`
  - `apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx`
  - `apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx`
  - `apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx`
- Auth bootstrap/routing parity implemented in RN auth engine:
  - `apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts`
  - `packages/domain/src/auth/flowRules.js`
- Login/register/OAuth callback parity implemented:
  - `apps/referidos-android/src/features/auth/AuthFlowScreen.tsx`
  - `apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts`
  - `apps/referidos-android/android/app/src/main/AndroidManifest.xml`
  - `apps/referidos-android/src/shared/constants/env.ts`
- Onboarding/auth-step parity blocks wired:
  - owner/business/address/business-verify/account-verify/email-verify/method/ready
  - `apps/referidos-android/src/features/auth/blocks/*`
- Validation parity moved to shared domain and consumed by RN:
  - `packages/domain/src/normalizers/userProfile.js`
  - `packages/domain/src/normalizers/phone.js`
- Automated verification matrix is green:
  - `npm run android:phase2:auth-check` -> `Phase 2 auth/onboarding parity logic checks: OK`
  - covers new cliente, new negocio, partial registration, verified direct access, support/admin bypass.
- RN compile verification is green:
  - `npm run typecheck -w @apps/referidos-android` -> success.

---

## Phase 3 - App Shell, Navigation, UI System, and Tab Cache
**Goal:** stable transversal UI system equivalent to PWA structure and behavior.

### 3.1 Global shell parity
- [ ] Header behavior by route/role parity.
- [ ] Footer/tab bar behavior parity.
- [ ] Route guards and hidden-route behavior parity.

### 3.2 Modal and overlays system
- [ ] Global modal host parity.
- [ ] Core modal primitives parity (confirm, warning, picker-style).
- [ ] Ensure modal open/close side effects match PWA (scroll/focus equivalents where applicable).

### 3.3 Skeleton/loaders strategy
- [ ] Keep shell visible while loading block-level data.
- [ ] Add block/card skeletons where RN currently shows blank placeholders.
- [ ] Preserve loading priorities (global bootstrap vs block-level loaders).

### 3.4 Tab keep-alive/cache
- [ ] Implement/validate keep-alive semantics for role tabs.
- [ ] Preserve local state and scroll per tab.
- [ ] Ensure instant tab switch even before internal data fetch completes.
- [ ] Clear cache on logout / role switch.

### 3.5 Verification
- [ ] No visual regressions in shell.
- [ ] Tab switch remains immediate on first and subsequent visits.

**DoD Phase 3**
- RN shell feels structurally equivalent to PWA and tab navigation is instant with block-level loading.

---

## Phase 4 - Cliente Feature Parity
**Goal:** cliente can complete core journeys with same behavior and guardrails as PWA.

### 4.1 Cliente Inicio
- [ ] Data cards parity.
- [ ] Empty/loading/error states parity.
- [ ] Actions and deeplinks parity.

### 4.2 Cliente Escaner/QR
- [ ] Camera permission flow parity.
- [ ] Scan success/failure handling parity.
- [ ] Manual fallback input parity.

### 4.3 Cliente Historial
- [ ] List and filters parity.
- [ ] Status chips/labels parity.
- [ ] Details navigation parity.

### 4.4 Cliente Perfil
- [ ] Profile tabs parity.
- [ ] Access/security tab behavior parity where applicable in RN scope.
- [ ] Help section parity (including SupportChat entry point behavior).
- [ ] "Mis tickets" must show only user-owned tickets (not global/public list), with backend/RLS-compatible query path.

### 4.5 Verification
- [ ] End-to-end cliente smoke tests across all tabs.

**DoD Phase 4**
- Cliente journeys available in PWA are functionally equivalent in RN.

---

## Phase 5 - Negocio Feature Parity
**Goal:** negocio completes the same operational flows as PWA.

### 5.1 Negocio Inicio
- [ ] Dashboard cards parity.
- [ ] Status and notices parity.

### 5.2 Negocio Escaner
- [ ] Scan and redeem related behavior parity.
- [ ] Permission and error handling parity.

### 5.3 Negocio Gestionar
- [ ] Promotions CRUD parity in RN scope.
- [ ] Branch/address linkage behavior parity in RN scope.
- [ ] State transitions parity.

### 5.4 Negocio Perfil
- [ ] Sections and controls parity.
- [ ] Help/support entry parity.
- [ ] "Mis tickets" must show only business-owner tickets, preserving category visibility by role.

### 5.5 Verification
- [ ] End-to-end negocio smoke tests.

**DoD Phase 5**
- Negocio-side operational workflows behave like PWA for equivalent data/state.

---

## Phase 6 - Native Feature Parity (Map, Scanner Internals, Security Local)
**Goal:** replace PWA web primitives with native Android implementations while preserving behavior.

### 6.1 Map and address flow
- [ ] Native map integration parity for address step.
- [ ] Reverse geocode/search flow parity.
- [ ] Territory fallbacks and GPS fallback parity.

### 6.2 Scanner internals
- [ ] Native camera scan reliability hardening.
- [ ] Performance and low-light/error fallback parity.

### 6.3 Security local
- [ ] Secure storage service parity (RN).
- [ ] Access unlock manager parity (UNLOCK_LOCAL vs REAUTH_SENSITIVE semantics).
- [ ] PIN attempt policy/backoff/wipe parity.
- [ ] Biometric enrollment/unlock behavior parity.
- [ ] Reauth-sensitive flows parity (email/password/security changes and equivalent guards).

### 6.4 Verification
- [ ] Device matrix test (at least 2 Android API levels, 1 physical + 1 emulator).

**DoD Phase 6**
- Native-specific layers are stable and behavior-compatible with PWA expectations.

---

## Phase 7 - Observability and Log Operability
**Goal:** RN emits useful, bounded, production-ready logs equivalent to platform policy.

### 7.1 SDK integration
- [ ] Wire RN events to `@referidos/observability-sdk`.
- [ ] Ensure standard context contract:
- [ ] route/screen
- [ ] role
- [ ] app/build version
- [ ] network + device summary
- [ ] request/session correlation ids

### 7.2 Quality controls
- [ ] Sampling and rate limiting parity.
- [ ] Dedupe/fingerprint parity.
- [ ] PII scrub rules parity.

### 7.3 Verification
- [ ] Admin/support-facing log readability checks with real RN events.

**DoD Phase 7**
- Logs from RN are actionable, bounded in volume, and policy-compliant.

---

## Phase 8 - Support/Admin (last, optional by scope decision)
**Goal:** only if required for RN release; otherwise explicitly deferred.

### 8.1 Usuario support
- [ ] Create thread flow parity.
- [ ] My tickets flow parity.

### 8.2 Soporte role
- [ ] Inbox parity.
- [ ] Ticket details parity.
- [ ] Irregular ticket flow parity.
- [ ] Session start/end/ping and admin authorization parity.
- [ ] Session/jornada controls parity.

### 8.3 Admin support desk
- [ ] Agent authorization/session controls parity.
- [ ] Ticket assignment/reassignment parity.

### 8.4 Admin modules (only if in RN scope)
- [ ] Inicio
- [ ] Users
- [ ] Soporte / asesores
- [ ] Businesses
- [ ] Promos
- [ ] QRs
- [ ] Reports
- [ ] Observability
- [ ] Logs/System

**DoD Phase 8**
- Only included modules are explicitly validated; excluded modules are documented as PWA-only.

---

## Phase 9 - Final Parity Certification and Release Readiness
**Goal:** prove 1:1 parity for included scope and produce stable Android deliverable.

### 9.1 Parity certification
- [ ] Complete and sign off parity matrix per role and journey.
- [ ] Compare RN vs PWA results for identical backend snapshots.

### 9.2 Stability and performance
- [ ] Crash-free smoke in repeated sessions.
- [ ] Startup and navigation performance sanity checks.

### 9.3 Release checks
- [ ] Build reproducibility checks (`assembleDebug` and selected release path).
- [ ] Environment config sanity (dev/staging/prod keys handling).
- [ ] Packaging and installability validation.
- [ ] Release signing path validation (non-debug keystore) and minify/proguard smoke validation for release variant.

**DoD Phase 9**
- RN app is release-ready for agreed scope with parity evidence and no blockers.

---

## Current Working Phase
- Active phase: `Phase 3 - App Shell, Navigation, UI System, and Tab Cache`
- Next review trigger: when `Phase 3` DoD is met with verification evidence.
