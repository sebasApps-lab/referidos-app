# Referidos App

## Que es

`referidos-app` es la PWA principal del monorepo.
Es la superficie mas rica del producto y concentra:

- acceso y onboarding
- experiencia `cliente`
- experiencia `negocio`
- panel `admin`
- panel `soporte`
- landing publica y documentos legales

## Rutas macro

- Publico: `/`, `/auth`, `/inicio`, `/legal/...`
- Cliente: `/cliente/...`
- Negocio: `/negocio/...`
- Admin: `/admin/...`
- Soporte: `/soporte/...`

## Lectura recomendada dentro de esta carpeta

- `acceso-y-cuenta.md`
- `cliente.md`
- `negocio.md`
- `admin-y-soporte.md`
- `legal-landing-y-perfil.md`

## Resultado de la revision

- Es la app canonica del producto.
- Su acceso depende de un gate de sesion, onboarding, verificacion y estado de cuenta.
- Cliente y negocio comparten una base de layout movil con cache por secciones.
- Admin y soporte funcionan como superficies operativas internas, no como vistas para usuarios finales corrientes.
