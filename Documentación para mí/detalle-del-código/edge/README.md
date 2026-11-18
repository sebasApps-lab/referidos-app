# Edge Functions · referencia de código y puntos de uso

Esta referencia baja a los símbolos de cada archivo TypeScript de los dos proyectos Supabase. Vincula la firma con su código y muestra usos observados en los endpoints u otros módulos. Para una explicación de la arquitectura inicial, abre [Supabase runtime y OPS](../../05-supabase-runtime-y-ops.md).

## Capítulos

| Área | Capítulos | Archivos TypeScript |
| --- | --- | ---: |
| Helpers compartidos de runtime | [1](shared-01.md) · [2](shared-02.md) | 8 |
| Runtime · identidad y sesiones | [1](auth-01.md) | 12 |
| Runtime · geocodificación, administración y Prelaunch | [1](product-01.md) | 10 |
| Runtime · soporte | [1](support-01.md) · [2](support-02.md) | 30 |
| Runtime · observabilidad y puentes operativos | [1](operations-01.md) · [2](operations-02.md) | 13 |
| OPS · soporte, telemetría y releases | [1](ops-01.md) · [2](ops-02.md) · [3](ops-03.md) | 13 |
| Gateway y Supabase local | [Configuración](configuracion.md) | 52 archivos TOML |

## Cómo leer las fichas

- **Firma** enlaza la declaración a la línea del código. Los nombres de parámetros y los campos o tipos se muestran sin copiar valores por defecto.
- **Dónde se usa** enlaza usos del símbolo enlazado por alcance o importación. Una ausencia de uso significa que la llamada puede no ser visible para ese análisis estático.
- **Delega en** enlaza funciones llamadas localmente o importadas por el módulo. Las relaciones y RPC están agrupadas por cuerpo. El enlace de SQL señala declaraciones localizadas en el proyecto del handler. Una tabla o RPC dinámica se debe seguir desde su valor y wrapper en el código.
- **Referencias literales al nombre del endpoint** sirven para localizar consumidores. Si runtime y OPS tienen un nombre igual, sigue la URL o el proyecto elegido en cada invocador.
- **HTTP e integraciones** muestra métodos, estados explícitos, nombres de encabezados o campos del código. Es una ayuda de lectura de las ramas observadas y puede omitir retornos dinámicos o indirectos.

Se cubren **86 archivos TypeScript**, **674 firmas o clases** (incluyendo **76 handlers HTTP** directamente observables) y **52 archivos TOML** del repositorio. Se revisó el código local. Los usos de despliegue, jobs remotos y permisos efectivos se confirman en cada entorno.
