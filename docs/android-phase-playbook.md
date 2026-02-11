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

## Phase 1 - Platform Stability and Build Determinism
**Goal:** RN app boots reliably (device + emulator) with deterministic dependency/runtime resolution.

### 1.1 Dependency resolution hardening
- [ ] Pin and validate a single runtime copy for `react` and `react-native`.
- [ ] Pin and validate a single type source for React in RN TypeScript (`@types/react`) to avoid cross-workspace JSX type conflicts.
- [ ] Ensure navigation stack resolves coherently:
- [ ] `@react-navigation/native`
- [ ] `@react-navigation/native-stack`
- [ ] `@react-navigation/bottom-tabs`
- [ ] `@react-navigation/elements`
- [ ] `@react-navigation/core`
- [ ] `@react-navigation/routers`
- [ ] Ensure only one effective copy for native modules:
- [ ] `react-native-safe-area-context`
- [ ] `react-native-screens`
- [ ] `react-native-gesture-handler`
- [ ] Verify Metro resolution and Android autolinking point to the same module sources for the native-critical packages.
- [ ] Audit `autolinking.json` for all native deps used by RN app and remove mixed-source duplicates where they produce runtime conflicts.
- [ ] Add a dependency health check command/script (`npm ls` based) and define failure criteria for duplicate critical runtime packages.

### 1.2 Runtime env and bootstrap
- [ ] Validate env loading order in RN (`env.json` + runtime env fallback).
- [ ] Define secure env workflow for RN (template file committed, local secrets ignored) and remove accidental secret drift from tracked files.
- [ ] Validate `SUPABASE_URL` and `SUPABASE_ANON_KEY` parse and bootstrap without Hermes URL/polyfill errors.
- [ ] Ensure bootstrap state can reach `email-login` without redbox.

### 1.3 Tooling and runbook
- [ ] Standardize dev commands (one canonical flow for Metro + install/run).
- [ ] Add explicit troubleshooting section for:
- [ ] Metro cache reset,
- [ ] port collisions,
- [ ] duplicate module/view registration,
- [ ] Gradle lock/daemon hangs.
- [ ] Ensure `.gitignore` excludes Android build/cache artifacts and local SDK/gradle cache dirs.

### 1.4 Verification
- [ ] Cold start on physical device.
- [ ] Cold start on emulator.
- [ ] Re-open app after killing process.
- [ ] `assembleDebug` builds clean.
- [ ] no runtime crash on initial screen.

**DoD Phase 1**
- App launches consistently to login screen on device and emulator.
- No `Invalid hook call`, no `RNCSafeAreaView` duplicate registration, no navigation provider undefined errors.

---

## Phase 2 - Auth and Onboarding Parity (1:1 behavior)
**Goal:** same entry decisions, same step fallback logic, same outcomes as PWA.

### 2.1 Auth entry and bootstrap state machine
- [ ] Mirror PWA auth bootstrap sequence in RN store.
- [ ] Preserve reason-based routing (`allowAccess` + `reasons`) from onboarding.
- [ ] Preserve role routing behavior (`cliente`, `negocio`, `admin`, `soporte`).
- [ ] Preserve soporte/admin onboarding bypass rules where applicable (no unintended fallthrough to registro/account-verify steps).

### 2.2 Login/register flows
- [ ] Welcome screen parity.
- [ ] Email login flow parity (validation + loading + errors + success route).
- [ ] Register flow parity.
- [ ] OAuth callback parity.

### 2.3 Onboarding steps parity
- [ ] Owner step parity.
- [ ] Business data + category parity.
- [ ] Business address step parity (2-screen behavior, prefill, validation order).
- [ ] Business verify step parity.
- [ ] Account verify prompt parity.
- [ ] Account verify step parity (screen 1 + screen 2 behavior by provider).
- [ ] Email verify / method / ready parity.

### 2.4 Provider-conditional behavior
- [ ] Provider `email` path parity.
- [ ] Provider `oauth` path parity.
- [ ] Password add/update behavior parity where applicable.
- [ ] MFA add flow parity (or explicit defer note if backend/app scope excludes it).
- [ ] Finalization and verification status transitions parity.

### 2.5 Validation parity
- [ ] Phone formatting/parsing parity.
- [ ] RUC validation parity.
- [ ] Name/date/gender rules parity.
- [ ] Error reason mapping parity (same fallback step for same missing data).

### 2.6 Verification
- [ ] Test matrix for new user (cliente).
- [ ] Test matrix for new user (negocio).
- [ ] Existing user with partial registration.
- [ ] Existing verified user direct access.

**DoD Phase 2**
- For identical backend state, RN and PWA land on the same step and produce same outcome.

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
- Active phase: `Phase 1 - Platform Stability and Build Determinism`
- Next review trigger: when all `Phase 1` tasks are either `[x]` or explicitly deferred.
