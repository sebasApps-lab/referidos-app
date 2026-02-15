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

## Phase 3 - Closed
**Status:** completed.

### Phase 3 closure evidence
- Global shell/navigation parity implemented:
  - `apps/referidos-android/src/navigation/RootNavigator.tsx`
    - role-conditional root route registration (hidden-route guard at root level).
  - `apps/referidos-android/src/shared/ui/ScreenScaffold.tsx`
    - consistent role-aware header scaffold for all role screens.
  - `apps/referidos-android/src/navigation/RoleTabs.tsx`
    - consistent tab shell styling/labels by role.
- Tab keep-alive/cache parity implemented:
  - `apps/referidos-android/src/navigation/RoleTabs.tsx`
    - `lazy: false`, `freezeOnBlur: false`, `detachInactiveScreens={false}`, `backBehavior="history"`.
  - `apps/referidos-android/src/shared/store/shellStore.ts`
    - persistent active tab state by role + cache epoch invalidation.
  - `apps/referidos-android/src/shared/store/appStore.ts`
    - cache reset on logout/no-session/role switch.
- Global modal/overlay system implemented:
  - `apps/referidos-android/src/shared/store/modalStore.ts`
    - confirm, alert/warning, picker primitives.
  - `apps/referidos-android/src/shared/modals/ModalHost.tsx`
    - global modal host with backdrop + hardware back handling.
  - modal usage wired in profile flows:
    - `apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx`
    - `apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx`
    - `apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx`
    - `apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx`
- Skeleton/loading strategy completed:
  - existing block skeletons retained on data cards (`BlockSkeleton`).
  - placeholder modules now render block-level skeleton before content:
    - `apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx`.
- Verification checks completed:
  - `npm run android:phase3:shell-check` -> `Phase 3 shell/navigation/modal checks: OK`
  - `npm run typecheck -w @apps/referidos-android` -> success
  - regression safety:
    - `npm run android:phase1:health` -> OK
    - `npm run android:phase2:auth-check` -> OK

---

## Phase 4 - Closed
**Status:** completed.

### Phase 4 closure evidence
- PWA source behaviors mirrored (references):
  - `apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx`
  - `apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx`
  - `apps/referidos-app/src/scanner/hooks/useScannerState.ts`
  - `apps/referidos-app/src/cliente/historial/HistorialView.jsx`
  - `apps/referidos-app/src/profile/cliente/ClientePerfil.jsx`
  - `apps/referidos-app/src/profile/shared/services/supportChatClient.js`
- RN cliente parity implemented:
  - Inicio actions/deeplinks + data/empty/loading/error states:
    - `apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx`
  - Escaner permission/success-failure/manual fallback parity:
    - `apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx`
    - `apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx`
  - Historial filters/status chips/detail navigation parity:
    - `apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx`
  - Perfil tabs + access/security + help/support parity:
    - `apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx`
  - Owner-only ticket query path (RLS-compatible):
    - `apps/referidos-android/src/shared/services/entityQueries.ts`
    - uses `support_threads_public.user_public_id` filtering.
- Verification checks completed:
  - `npm run android:phase4:cliente-check` -> `Phase 4 cliente parity checks: OK`
  - `npm run typecheck -w @apps/referidos-android` -> success
  - regression safety:
    - `npm run android:phase1:health` -> OK
    - `npm run android:phase2:auth-check` -> OK
    - `npm run android:phase3:shell-check` -> OK

---

## Phase 5 - Closed
**Status:** completed.

### Phase 5 closure evidence
- PWA source behaviors mirrored (references):
  - `apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx`
  - `apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx`
  - `apps/referidos-app/src/scanner/hooks/useScannerState.ts`
  - `apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx`
  - `apps/referidos-app/src/negocio/gestionar/sections/*`
  - `apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx`
- RN negocio parity implemented:
  - Inicio dashboard/status/notices/actions parity:
    - `apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx`
  - Escaner parse/redeem/manual fallback/result parity:
    - `apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx`
  - Gestionar promos/sucursales/seguridad panel parity:
    - `apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx`
  - Perfil tabs/help/support + owner-only tickets parity:
    - `apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx`
- RN data/service layer required for negocio operations:
  - `apps/referidos-android/src/shared/services/entityQueries.ts`
  - helpers delivered:
    - `redeemValidQrCode`
    - `createPromoForBusiness`
    - `updatePromoStatusById`
    - `deletePromoById`
    - `updateBranchStateById`
    - `linkPromoToBranch`
    - `unlinkPromoFromBranch`
    - `fetchPromoBranchLinksByPromoId`
- Verification checks completed:
  - `npm run android:phase5:negocio-check` -> `Phase 5 negocio parity checks: OK`
  - `npm run typecheck -w @apps/referidos-android` -> success
  - regression safety:
    - `npm run android:phase1:health` -> OK
    - `npm run android:phase2:auth-check` -> OK
    - `npm run android:phase3:shell-check` -> OK
    - `npm run android:phase4:cliente-check` -> OK
- Newly discovered work for Phase 5:
  - none.

---

## Phase 6 - Closed
**Status:** completed.

### Phase 6 closure evidence
- PWA source behaviors mirrored (references):
  - `apps/referidos-app/src/auth/steps/UserAddressStep.jsx`
  - `apps/referidos-app/src/services/addressSearchClient.js`
  - `apps/referidos-app/src/services/addressReverseClient.js`
  - `apps/referidos-app/src/services/gpsFallbackClient.js`
  - `apps/referidos-app/src/services/territoryClient.js`
  - `apps/referidos-app/src/scanner/hooks/useScannerState.ts`
  - `apps/referidos-app/src/store/appStore.js`
  - `apps/referidos-app/src/services/secureStorageService.js`
- RN native parity implemented:
  - Map/address native flow + reverse/search + territory fallback + GPS fallback:
    - `apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx`
    - `packages/api-client/src/address/territory.js`
    - `packages/api-client/src/createMobileApi.js`
  - Scanner native internals hardening (throttle/dedupe, pause/resume, torch, error recovery):
    - `apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx`
  - Security local parity (PIN, attempts policy, biometrics, sensitive reauth guards):
    - `apps/referidos-android/src/shared/security/localAccessSecurity.ts`
    - `apps/referidos-android/src/shared/store/securityStore.ts`
    - `packages/platform-rn/src/storage/secureStorageService.js`
    - `apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx`
    - `apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx`
    - `apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx`
    - `apps/referidos-android/src/shared/store/appStore.ts`
- Verification checks completed:
  - `npm run android:phase6:native-check` -> `Phase 6 native parity checks: OK`
  - `npm run typecheck -w @apps/referidos-android` -> success
  - regression safety:
    - `npm run android:phase1:health` -> OK
    - `npm run android:phase2:auth-check` -> OK
    - `npm run android:phase3:shell-check` -> OK
    - `npm run android:phase4:cliente-check` -> OK
    - `npm run android:phase5:negocio-check` -> OK
- Newly discovered work for Phase 6:
  - none.

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
- Active phase: `Phase 7 - Observability and Log Operability`
- Next review trigger: when `Phase 7` DoD is met with verification evidence.
