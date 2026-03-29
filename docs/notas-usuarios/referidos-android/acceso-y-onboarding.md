# Acceso y onboarding

## Como entra un usuario

Android arranca validando:

- sesion local
- onboarding
- razones de bloqueo o verificacion pendiente

Con eso decide si entra al flujo auth o a las tabs del rol.

## Pasos del flujo auth

- Bienvenida
- Login por correo
- Registro por correo
- OAuth social
- Seleccion de rol
- Perfil del propietario
- Datos de negocio
- Direccion
- Verificacion de cuenta

## Verificacion

Para `cliente` y `negocio`, la app evalua si la cuenta sigue:

- `unverified`
- `in_progress`
- `verified`
- `skipped`

El acceso a la app final depende de ese estado.

## Deep link de OAuth

La app espera el callback en:

- `referidosandroid://auth/callback`

## Observaciones de uso

- Si no hay sesion valida, la app limpia caches de shell, modales y seguridad.
- Si el onboarding falla, la app queda en estado de error de bootstrap.
- Los metodos de acceso local tambien forman parte de la experiencia de cuenta.
