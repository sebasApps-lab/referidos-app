# Captacion y waitlist

## Entrada principal

La ruta `/` monta `WaitlistLandingPage`.
Desde ahi la app decide si mostrar arbol desktop o mobile segun `userAgent` y `userAgentData`.

## Como esta dividida la landing

- Hero principal
- Seccion de pasos o explicacion del flujo
- Formulario de waitlist
- Modales de interes comercial
- Footer y bloques de contacto

En mobile y desktop existen componentes separados, pero ambos responden al mismo objetivo: convertir una visita en lead.

## Que hace el formulario

- Recibe correo
- Marca intencion de rol (`cliente` o interes `negocio`)
- Registra consentimiento
- Lee UTM desde la URL
- Envia el registro al cliente de prelaunch

## Observaciones de uso

- Si la configuracion runtime de Supabase falta, la app no puede enviar registros y devolvera `missing_env`.
- La landing soporta scroll hacia hashes para mover al usuario a una seccion concreta.
- La ruta `/negocios` fuerza una experiencia desktop orientada a captacion comercial.

## Que no hace esta app

- No abre la app principal autenticada
- No administra tickets internos
- No reemplaza el onboarding completo de `referidos-app` o `referidos-android`
