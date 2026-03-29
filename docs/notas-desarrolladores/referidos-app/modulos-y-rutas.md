# Modulos y rutas

## Rutas publicas

- `/` y `/auth`
  Entrada a auth controlada por `AppGate`.
- `/inicio`
  Landing publica de producto.
- `/legal/:locale/:document`
  Router legal con contenido de `legal-content`.
- `/app`
  Punto de entrada que redirige al rol correcto.

## Cliente

Carpetas:

- `src/cliente/base`
- `src/cliente/inicio`
- `src/cliente/historial`
- `src/cliente/layout`
- `src/cliente/views`
- `src/cliente/services`
- `src/cliente/hooks`

Rutas:

- `/cliente/inicio`
- `/cliente/escanear`
- `/cliente/historial`
- `/cliente/perfil`

## Negocio

Carpetas:

- `src/negocio/base`
- `src/negocio/inicio`
- `src/negocio/gestionar`
- `src/negocio/layout`
- `src/negocio/views`
- `src/negocio/services`
- `src/negocio/hooks`

Rutas:

- `/negocio/inicio`
- `/negocio/escanear`
- `/negocio/gestionar`
- `/negocio/perfil`

`gestionar` tiene tabs internas: `Seguridad`, `Metricas`, `Grupos`, `Dispositivos`.

## Admin

Admin usa wrappers en `src/pages/admin/*` y contenido real en `src/admin/*`.

Areas principales:

- `inicio`
- `usuarios`
- `negocios`
- `promos`
- `qrs`
- `reportes`
- `logs`
- `observability`
- `datos`
- `apps`
- `sistema`
- `prelaunch`
- `versioning`
- `support`
- `docs`
- `legal`

## Soporte

La UI de agente no vive completa en esta app.
`routes.jsx` importa varias vistas desde `@referidos/support-sdk/agent/*`.

Eso significa que la experiencia de soporte esta repartida entre:

- `src/admin/support/**`
- `packages/support-sdk/src/agent/**`
- edge functions `support-*`

## Perfil, scanner y busquedas

- `src/profile/shared/**`
  sistema de perfil transversal
- `src/scanner/**`
  permisos, camara, fallback manual, status y resultados
- `src/search/**`
  piezas de busqueda por dominio

## Landing y legal

- `src/landing/LandingPage.jsx`
  landing publica SEO y marketing dentro de la app principal
- `src/legal/**`
  layout, router y paginas legales
