# Flujos y servicios

## Auth movil

`src/features/auth/AuthFlowScreen.tsx` es la pantalla contenedora.
La logica real vive en `src/features/auth/hooks/useAuthEngine.ts`.

Ese hook resuelve:

- parseo del callback OAuth
- login y registro email/password
- seleccion de rol
- escritura de `usuarios`
- escritura de `negocios`
- escritura de `direcciones`
- escritura de `sucursales`
- verificacion y password setup
- refresh de onboarding

## Servicios movil

`src/shared/services/mobileApi.ts` construye:

- `supabase`
- `mobileApi`
- `observability`

`mobileApi` viene de `@referidos/api-client` y expone:

- `auth.runOnboardingCheck`
- `auth.runValidateRegistration`
- `address.*`
- `support.*`
- `logs.logEvent`

## Features por rol

### Cliente

- `ClienteInicioScreen`
- `ClienteEscanerScreen`
- `ClienteHistorialScreen`

### Negocio

- `NegocioInicioScreen`
- `NegocioEscanerScreen`
- `NegocioGestionarScreen`

### Admin

Hay tabs base y pantallas stack para:

- negocios
- promos
- qrs
- reportes
- logs
- datos
- apps
- sistema
- analytics
- issues
- catalogo de errores
- versioning
- documentacion
- legal
- soporte

### Soporte

- inicio
- inbox
- irregular
- jornadas
- issues
- catalogo de errores
- ticket

### Perfil

Perfiles por rol mas componentes reutilizables:

- `AccessSecurityPanel`
- `ProfileExtendedSections`
- `ProfileRuntimePanels`

## Scanner

`src/features/scanner/ScannerGateway.tsx` hoy es placeholder.
El repo tambien tiene `NativeQrScannerBlock.tsx`, lo que indica trabajo en curso para el flujo nativo.

## Servicios operativos espejo de web

Android ya trae servicios para:

- system feature flags
- support runtime flags
- support desk queries
- admin ops
- versioning service
- notificaciones por rol

La direccion es clara: mover cada vez mas capacidades operativas a la shell movil sin romper el contrato compartido.
