# Referidos App

## Alcance

`referidos-app` es la PWA principal y la referencia funcional del monorepo.
Desde aqui se integran auth, onboarding, roles de producto, admin, soporte, observability, legal, versionado y parte del soporte anonimo.

## Mapa de carpetas relevantes

- `src/auth`
- `src/cliente`
- `src/negocio`
- `src/admin`
- `src/profile`
- `src/scanner`
- `src/legal`
- `src/landing`
- `src/router`
- `src/store`
- `supabase/functions`

## Hallazgos de la revision

- El acceso real esta gobernado por `AppGate` y el payload de onboarding.
- Cliente y negocio comparten una arquitectura de layout movil con cache y estado de viewport.
- Admin es la superficie que conecta el producto con documentacion, observability, soporte y versionado.
- La app usa paquetes compartidos de manera intensa: `support-sdk`, `observability`, `legal-content`, `platform-web`, `security-core`, `api-client`.

## Detalle en esta carpeta

- `arranque-auth-y-estado.md`
- `modulos-y-rutas.md`
- `backend-y-edge-functions.md`
