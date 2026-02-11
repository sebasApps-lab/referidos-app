# Referidos Android Migration Plan (Sister App)

## Rule
- `apps/referidos-app` is read-only for this migration.
- Android work can touch only:
- `apps/referidos-android/*`
- `packages/mobile-*`
- `tooling/guardrails/*`
- `docs/android-*`
- root `package.json` / `package-lock.json` if needed for workspace scripts.

## Task List
- [x] Sprint 0: Guardrails and parity checklist baseline.
- [x] Sprint 1: Bootstrap `apps/referidos-android` with React Native workspace structure.
- [x] Sprint 2: Create `packages/mobile-domain`, `packages/mobile-api`, `packages/mobile-security`, `packages/mobile-observability`.
- [x] Sprint 3: App shell with role routing, tabs, modal host, loaders placeholders.
- [x] Sprint 4: Auth + onboarding parity.
- [ ] Sprint 5: Cliente parity screens and data wiring.
- [ ] Sprint 6: Negocio parity screens and data wiring.
- [ ] Sprint 7: Address/map native implementation parity.
- [ ] Sprint 8: Scanner/QR native implementation parity.
- [ ] Sprint 9: Security unlock parity (PIN/biometrics).
- [ ] Sprint 10: Support user/support agent/admin support desks parity.
- [ ] Sprint 11: Remaining admin modules parity.
- [ ] Sprint 12: Hardening, QA parity matrix, release candidate.

## Execution Notes
- Shared logic is copied into `packages/mobile-*` for Android usage.
- PWA keeps using its current internal logic.
- API contract remains backward-compatible.
