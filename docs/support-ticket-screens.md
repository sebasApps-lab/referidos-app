# Flujo de Screens de Ticket (Soporte)

Este documento describe las screens del flujo guiado dentro de `SupportTicket.jsx`.

## Screen 1 - Starting intro
- Clave: `screen_1_starting_intro`
- Objetivo: introduccion del ticket asignado.
- Layout:
  - Sin cola personal: bloque centrado (1 columna).
  - Con cola personal: 2 columnas (izquierda cola personal, derecha intro del ticket actual).
- Accion principal: `Empezar` -> Screen 2.

## Screen 2 - Guia WhatsApp
- Clave: `screen_2_whatsapp_guide`
- Objetivo: validar cambio de nombre en WhatsApp.
- Layout: 2 columnas.
  - Izquierda: display id + copiar + `Ya cambie el nombre, continuar`.
  - Derecha: pasos visuales de guia.
- Accion principal: `Ya cambie el nombre, continuar` -> Screen 3.

## Screen 3 - Mensaje de apertura
- Clave: `screen_3_opening_message`
- Objetivo: enviar mensaje inicial.
- Layout: 2 columnas.
  - Izquierda: copy de apertura + boton `Ya envie mensaje de apertura`.
  - Derecha: macros de apertura (con foco en macro copiado cuando aplica).
- Accion principal: `Ya envie mensaje de apertura` -> Screen 5 (estado `in_progress`).

## Screen 4 - Seguimiento de apertura
- Clave: `screen_4_opening_followup`
- Objetivo: esperar respuesta tras apertura.
- Layout: 2 columnas.
  - Izquierda: copy de espera + boton `Usuario respondio`.
  - Derecha: macros con overlay de espera.
- Accion principal: `Usuario respondio` -> Screen 5.

## Screen 5 - Resolucion activa
- Clave: `screen_5_resolution_active`
- Objetivo: resolver ticket en curso.
- Layout: 2 columnas.
  - Izquierda: resumen de ticket activo + `Mensaje enviado` + `Marcar como resuelto`.
  - Derecha: macros de estado en progreso.
- Acciones:
  - `Mensaje enviado` -> Screen 6.
  - `Marcar como resuelto` -> Screen 7 (estado `closing`).

## Screen 6 - Seguimiento activo
- Clave: `screen_6_resolution_followup`
- Objetivo: espera de respuesta durante resolucion.
- Layout: 2 columnas.
  - Izquierda: copy de espera + `Usuario respondio`.
  - Derecha: macros con overlay de espera y opcion de volver a copiar macro.
- Accion principal: `Usuario respondio` -> Screen 5.

## Screen 7 - Preparacion de cierre
- Clave: `screen_7_closing_prepare`
- Objetivo: enviar mensaje previo al cierre.
- Layout: 2 columnas.
  - Izquierda: copy de cierre + `Mensaje de cierre enviado`.
  - Derecha: macros de cierre habilitados (sin overlay bloqueador).
- Accion principal: `Mensaje de cierre enviado` -> Screen 8.

## Screen 8 - Espera confirmacion de cierre
- Clave: `screen_8_closing_wait`
- Objetivo: esperar ventana minima antes de confirmar cierre.
- Layout: 2 columnas.
  - Izquierda: timer + `Continuar resolucion` + `Confirmar cierre` (se habilita al cumplir timer).
  - Derecha: macros con overlay de espera.
- Acciones:
  - `Continuar resolucion` -> Screen 10.
  - `Confirmar cierre` -> Screen 9.

## Screen 9 - Confirmar cierre final
- Clave: `screen_9_closing_confirm`
- Objetivo: cerrar ticket con resultado final.
- Layout: 2 columnas.
  - Izquierda: comentario obligatorio + `Usuario confirma cierre` / `Cierre por inactividad` + `Continuar resolucion`.
  - Derecha: macros con overlay de espera.
- Acciones:
  - `Usuario confirma cierre` o `Cierre por inactividad` -> ticket cerrado.
  - `Continuar resolucion` -> Screen 10.

## Screen 10 - Decision de nueva inquietud
- Clave: `screen_10_new_issue_decision`
- Objetivo: definir contexto de continuidad.
- Layout: 2 columnas.
  - Izquierda: razon + categoria + `Nueva inquietud` / `Misma inquietud`.
  - Derecha: macros con overlay de bloqueo hasta definir contexto.
- Accion principal: guardar contexto -> Screen 11.

## Screen 11 - Recoleccion de informacion
- Clave: `screen_11_new_issue_info`
- Objetivo: pedir informacion adicional y volver a resolucion.
- Layout: 2 columnas.
  - Izquierda: copy + `Mensaje de info enviado`.
  - Derecha: macros habilitados.
- Accion principal: `Mensaje de info enviado` -> Screen 5.

