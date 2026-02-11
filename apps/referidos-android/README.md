# referidos-android

React Native sister app for Android inside the same monorepo.

## Principles
- Do not edit `apps/referidos-app` during Android migration work.
- Keep API contract backward-compatible with current Supabase functions.
- Reuse copied logic from shared `packages/*` without changing PWA behavior.

## Environment setup
1. Copy `apps/referidos-android/env.example.json` to `apps/referidos-android/env.json`.
2. Fill `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
3. `env.json` is local-only and ignored by git.

## Canonical dev flow (PowerShell)
1. Start Metro (repo root):
```powershell
npm run android:metro
```
2. In another terminal, install/run app:
```powershell
npm run android:run
```

## Build verification
- List Gradle tasks (sanity):
```powershell
npm run android:gradle:tasks
```

- Assemble debug with deterministic wrapper (timeout + process-tree cleanup):
```powershell
npm run android:assemble:debug
```

## Phase 1 health check
From repo root:
```powershell
npm run android:phase1:health
```
This validates critical runtime resolution (`react`, `react-native`, safe-area, screens, navigation)
and checks Android autolinking coherence for critical native modules.

## Troubleshooting quick guide
### Metro cache reset
```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Remove-Item "$env:TEMP\metro-*" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "$env:TEMP\haste-map-*" -Recurse -Force -ErrorAction SilentlyContinue
```

### Port conflicts (8081/8082)
- Keep Metro and `run-android` on the same port.
- If another process owns the port, either kill it or move both commands to another port.

### Duplicate native registration (`RNCSafeAreaView`) / navigation provider undefined
- Run `npm run android:phase1:health`.
- Then restart Metro with `--reset-cache` and reinstall app with `--no-packager`.

### Gradle lock/daemon hangs
```powershell
npm run android:assemble:debug
```
If you still need manual cleanup:
```powershell
Get-Process java,ninja,cmake,gradle -ErrorAction SilentlyContinue | Stop-Process -Force
```

### Env conflict (`ANDROID_USER_HOME` vs `ANDROID_SDK_HOME`)
- Use only `ANDROID_USER_HOME`.
- Remove `ANDROID_SDK_HOME` from user/session env.
