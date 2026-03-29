# Legal, landing y perfil

## Landing publica

La ruta `/inicio` es una landing publica diferente al auth.
Explica:

- QR
- grupos
- puntos
- beneficios para cliente y negocio
- FAQ
- accesos de descarga

Sirve como narrativa de producto y puerta de entrada publica hacia `/auth`.

## Documentos legales

La app expone:

- `/privacy`
- `/terms`
- `/delete-data`
- `/legal/:locale/:document`

Los documentos soportan `es` y `en`.
El contenido real viene del paquete compartido `legal-content`.

## Perfil compartido

Las pantallas de perfil de cliente y negocio reutilizan un sistema transversal que agrupa:

- overview
- datos personales
- acceso y seguridad
- 2FA
- cuentas vinculadas
- notificaciones
- idioma
- apariencia
- sesiones
- ayuda y soporte
- gestion de cuenta
- beneficios y niveles

## Importancia para el usuario

Esta zona no solo muestra informacion.
Tambien centraliza cambios sensibles de seguridad, soporte y estado de cuenta.
