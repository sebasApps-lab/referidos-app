# referidos-android

React Native sister app for Android inside the same monorepo.

## Principles
- Do not edit `apps/referidos-app` during Android migration work.
- Keep API contract backward-compatible with current Supabase functions.
- Reuse copied logic from `packages/mobile-*`.

## Commands
- `npm run start -w apps/referidos-android`
- `npm run android -w apps/referidos-android`
