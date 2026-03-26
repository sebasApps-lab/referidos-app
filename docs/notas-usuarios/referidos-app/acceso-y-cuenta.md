# Acceso y cuenta

## Punto de entrada

Las rutas `/` y `/auth` pasan por `AppGate`.
Ese gate decide si el usuario:

- ve auth publico
- debe completar onboarding
- debe pasar por verificacion
- puede entrar a su rol final

## Flujo de acceso disponible

- Pantalla de bienvenida
- Login por correo
- Registro por correo
- OAuth social
- Seleccion de rol
- Perfil base del usuario
- Datos de negocio
- Categoria de negocio
- Direccion
- Verificacion de cuenta
- Password y MFA

## Reglas que pueden bloquear el acceso

- cuenta `blocked`
- cuenta `suspended`
- cuenta `deleted`
- cuenta `expired`
- registro pendiente o incompleto
- verificacion de cliente o negocio aun no cerrada
- terminos o privacidad no aceptados
- cambio forzado de password para ciertos roles internos

## Lo que pasa despues del login

El bootstrap consulta:

- sesion de Supabase
- onboarding
- validacion de registro
- politicas de sesion

Con eso decide si el usuario entra a:

- `/cliente/inicio`
- `/negocio/inicio`
- `/admin/inicio`
- `/soporte/inbox`

## Seguridad local

La cuenta puede usar:

- fingerprint
- PIN
- password para reautenticacion sensible

La app ademas mantiene ventanas temporales de desbloqueo para acciones locales y acciones sensibles.
