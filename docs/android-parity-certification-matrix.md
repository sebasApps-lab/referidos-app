# Android RN Final Parity Certification Matrix

Certification Date: 2026-02-15  
Certification Scope: RN app `apps/referidos-android` vs PWA `apps/referidos-app`  
Certification Status: APPROVED (for committed RN release scope)

## Snapshot Baseline

- Backend snapshot baseline: same Supabase backend contract for both apps.
- PWA auth/backend entrypoint: `apps/referidos-app/src/lib/supabaseClient.js`
- RN auth/backend entrypoint: `apps/referidos-android/src/shared/services/mobileApi.ts`
- Contract parity source of truth reused in RN shared packages:
  - `packages/domain/**`
  - `packages/api-client/**`
  - `packages/security-core/**`
  - `packages/observability-sdk/**`

## Auth / Onboarding

| Journey | PWA reference | RN reference | Status | Evidence |
|---|---|---|---|---|
| Login/register + OAuth callback | `apps/referidos-app/src/auth/hooks/useAuthFlow.js` | `apps/referidos-android/src/features/auth/AuthFlowScreen.tsx` | Certified | `npm run android:phase2:auth-check` |
| Owner/business onboarding steps | `apps/referidos-app/src/auth/steps/*` | `apps/referidos-android/src/features/auth/blocks/*` | Certified | `npm run android:phase2:auth-check` |
| Verification/method/email steps | `apps/referidos-app/src/auth/steps/*Verify*` | `apps/referidos-android/src/features/auth/blocks/*Verify*` | Certified | `npm run android:phase2:auth-check` |

## Cliente

| Journey | PWA reference | RN reference | Status | Evidence |
|---|---|---|---|---|
| Inicio | `apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx` | `apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx` | Certified | `npm run android:phase4:cliente-check` |
| Escaner QR | `apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx` | `apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx` | Certified | `npm run android:phase4:cliente-check` |
| Historial | `apps/referidos-app/src/cliente/historial/HistorialView.jsx` | `apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx` | Certified | `npm run android:phase4:cliente-check` |
| Perfil + soporte | `apps/referidos-app/src/profile/cliente/ClientePerfil.jsx` | `apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx` | Certified | `npm run android:phase4:cliente-check` |

## Negocio

| Journey | PWA reference | RN reference | Status | Evidence |
|---|---|---|---|---|
| Inicio | `apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx` | `apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx` | Certified | `npm run android:phase5:negocio-check` |
| Escaner QR | `apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx` | `apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx` | Certified | `npm run android:phase5:negocio-check` |
| Gestionar | `apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx` | `apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx` | Certified | `npm run android:phase5:negocio-check` |
| Perfil + soporte | `apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx` | `apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx` | Certified | `npm run android:phase5:negocio-check` |

## Soporte

| Journey | PWA reference | RN reference | Status | Evidence |
|---|---|---|---|---|
| Inbox | `apps/referidos-app/src/routes.jsx` (`/soporte/inbox`) | `apps/referidos-android/src/features/support/SoporteInboxScreen.tsx` | Certified | `npm run android:phase8:support-admin-check` |
| Ticket details | `apps/referidos-app/src/routes.jsx` (`/soporte/ticket/:threadId`) | `apps/referidos-android/src/features/support/SoporteTicketScreen.tsx` | Certified | `npm run android:phase8:support-admin-check` |
| Irregular ticket | `apps/referidos-app/src/routes.jsx` (`/soporte/irregular`) | `apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx` | Certified | `npm run android:phase8:support-admin-check` |
| Session/jornada controls | `apps/referidos-app/src/admin/support/AdminSupportDesk.jsx` | `apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx` | Certified | `npm run android:phase8:support-admin-check` |

## Admin

| Module | PWA reference | RN reference | Status | Evidence |
|---|---|---|---|---|
| Inicio | `apps/referidos-app/src/pages/admin/AdminInicio.jsx` | `apps/referidos-android/src/features/admin/AdminInicioScreen.tsx` | Certified | `npm run android:phase9:parity-check` |
| Usuarios | `apps/referidos-app/src/pages/admin/AdminUsuarios.jsx` | `apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx` | Certified | `npm run android:phase9:parity-check` |
| Soporte / asesores | `apps/referidos-app/src/admin/support/*` | `apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx` | Certified | `npm run android:phase8:support-admin-check` |
| Negocios / Promos / QRs / Reportes / Logs | `apps/referidos-app/src/pages/admin/*` + `apps/referidos-app/src/admin/*` | `apps/referidos-android/src/features/admin/AdminInicioScreen.tsx` (sections operativas) | Certified | `npm run android:phase9:parity-check` |
| Observability | `apps/referidos-app/src/pages/admin/AdminObservability.jsx` | `apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx` | Certified | `npm run android:phase7:observability-check` |
| Sistema (session profile) | `apps/referidos-app/src/pages/admin/AdminSistema.jsx` | `apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx` | Certified | `npm run android:phase9:parity-check` |

## Security / Native / Observability

| Area | PWA reference | RN reference | Status | Evidence |
|---|---|---|---|---|
| Local unlock policy / PIN / biometrics | `apps/referidos-app/src/services/secureStorageService.js` | `apps/referidos-android/src/shared/security/localAccessSecurity.ts` | Certified | `npm run android:phase6:native-check` |
| Address/map native parity | `apps/referidos-app/src/services/address*` | `apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx` | Certified | `npm run android:phase6:native-check` |
| Mobile observability quality controls | `apps/referidos-app/src/services/loggingClient.js` | `packages/observability-sdk/src/createMobileObservabilityClient.js` | Certified | `npm run android:phase7:observability-check` |
| Startup/navigation perf instrumentation | N/A (RN-specific runtime instrumentation) | `apps/referidos-android/src/app/App.tsx` | Certified | `npm run android:phase9:parity-check` |

## Release Readiness Evidence

- Type safety:
  - `npm run typecheck -w @apps/referidos-android`
- Regression gates:
  - `npm run android:phase1:health`
  - `npm run android:phase2:auth-check`
  - `npm run android:phase3:shell-check`
  - `npm run android:phase4:cliente-check`
  - `npm run android:phase5:negocio-check`
  - `npm run android:phase6:native-check`
  - `npm run android:phase7:observability-check`
  - `npm run android:phase8:support-admin-check`
  - `npm run android:phase9:parity-check`
- Build reproducibility and packaging:
  - `npm run android:assemble:debug`
  - `npm run android:assemble:release`
  - `npm run android:phase9:release-check`

## Final Sign-Off

All RN journeys and admin modules required by the migration plan were implemented and validated with automated checks plus Android build/release readiness gates.
