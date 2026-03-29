# Arquitectura y superficies

## Entry points

- `src/main.jsx`
  Router web + registro SW en produccion
- `src/App.jsx`
  Suspense simple con fallback
- `src/routes.jsx`
  define todas las rutas del proyecto

## Rutas

- `/`, `/auth`
  `AuthEntry` -> `AuthFlow`
- `/prueba`
- `/prueba1`
- `/prueba2`
- `/prueba3`
- `/prueba4`
- `/negocio/panel/crear-promo`

## Auth

`src/auth/AuthFlow.jsx` solo renderiza:

- `AuthView`
- `AuthBranderHeader`
- `AuthFooter`
- `WelcomeStep`

Los handlers son `noop`.
Eso confirma que esta app no es la verdad funcional del onboarding.

## Superficies de prueba

Las paginas `Prueba*` y `NegocioCrearPromoPage` concentran:

- composiciones UI
- iconografia inline
- estilos CSS dedicados
- layouts desktop complejos
- previsualizaciones de promo

## Lectura de revision

Trata esta app como:

- banco de prototipos
- espacio de comparacion visual
- lugar para maquetar variantes

No la trates como cliente productivo del backend.
