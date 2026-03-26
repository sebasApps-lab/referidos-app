# Arranque, navegacion y stores

## App shell

`src/app/App.tsx` hace cuatro cosas clave:

- dispara `bootstrapAuth()`
- inicializa contextos de observability
- instala tracking de errores globales
- monta `NavigationContainer`, `RootNavigator` y `ModalHost`

## Root navigator

`src/navigation/RootNavigator.tsx` decide el stack inicial segun:

- `allowAccess`
- `requiresVerificationFlow`
- `role`

Rutas raiz:

- `AuthFlow`
- `ClienteTabs`
- `NegocioTabs`
- `AdminTabs`
- `SoporteTabs`

## Tabs por rol

`src/navigation/RoleTabs.tsx` define navegacion inferior con persistencia de tab activa.
Roles:

- cliente
- negocio
- admin
- soporte

## Stores compartidos

- `appStore.ts`
  bootstrap, rol, onboarding, access methods y sign out
- `shellStore.ts`
  cache epoch y tab activa por rol
- `securityStore.ts`
  reglas y estado de unlock sensible
- `supportDeskStore.ts`
  hilo seleccionado en soporte
- `modalStore.ts`
  host de modales globales

## UI compartida

`src/shared/ui` agrupa piezas shell:

- `ScreenScaffold`
- `GlobalLoader`
- `SectionCard`
- `FeaturePlaceholder`
- `ObservabilityEventFeed`
- `BlockSkeleton`

## Lectura de revision

- La shell movil separa mejor concerns de boot, navegacion y seguridad.
- `shellStore` limpia cache de tabs cuando cambia la sesion o el rol.
- `securityStore` usa `security-core` en lugar de reimplementar reglas.
