# Cliente

## Estructura principal

La experiencia `cliente` se organiza en cuatro areas:

- `/cliente/inicio`
- `/cliente/escanear`
- `/cliente/historial`
- `/cliente/perfil`

## Inicio

La seccion de inicio reune:

- hero o resumen visual
- promos destacadas
- beneficios
- vistas vacias y skeletons

Es la portada funcional para descubrir promociones y acceder rapido a las acciones mas comunes.

## Escanear

La seccion de escaneo combina varias piezas:

- introduccion a permisos
- solicitud de camara
- bloque de camara
- entrada manual si la camara falla
- hint de procesamiento
- banners de estado
- tarjeta de resultado

Tambien existe el detalle de promocion en `/detalle/:id`.

## Historial

La seccion de historial incluye:

- lista de items
- item activo
- preview de promos relacionadas
- empty state
- skeleton de carga

Su rol es mostrar lo ya usado o acumulado por el cliente.

## Perfil

Aunque la ruta final esta en `cliente/perfil`, el contenido vive sobre un sistema compartido de perfil.
Desde aqui el usuario puede revisar:

- resumen de cuenta
- datos personales
- metodos de acceso
- sesiones
- notificaciones
- ayuda y soporte
- configuracion visual e idioma
- beneficios y estado de cuenta
