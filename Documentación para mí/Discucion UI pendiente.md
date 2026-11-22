# Discucion UI pendiente

Propuesta para que el administrador pueda elegir una versión y seguirla desde desarrollo hasta producción. El **Resumen** ya permite entender los tres entornos de un vistazo. **Publicar** debería conservar ese diseño y mostrar el avance de la versión elegida sin repetir las tarjetas antiguas.

## Navegación propuesta

| Vista | Qué muestra |
| --- | --- |
| **Resumen** | Las tres tarjetas y una sola acción principal según el estado, como **Preparar versión** o **Revisar aprobación de staging**. Hoy los cuatro accesos **Ver operaciones** abren la misma pantalla. |
| **Publicar** | Una versión seleccionada y su recorrido **Desarrollo → Staging → Producción**. Reutiliza las tarjetas del Resumen. Al seleccionar un entorno se abren debajo su avance, el requisito pendiente y la acción disponible. Los detalles de PR, migraciones, aprobación y ejecución se consultan dentro de esa etapa. |
| **Historial** | Releases, builds guardadas, copias en la PC, configuración por entorno, revisiones e intentos de despliegue. Cada intento muestra el paso que falló y enlaces separados a GitHub Actions y Netlify. El SHA, los identificadores y los detalles se expanden cuando hacen falta. **Diagnóstico** conserva la comparación de entornos y los workflows de GitHub. |

## Una build por versión

El pipeline web compila en `dev`, guarda el ZIP en **Supabase OPS** y lo reutiliza en staging y producción. Cada publicación genera su propio `app-config.js` con la configuración pública del destino. Hoy las tarjetas buscan el número de build de la release del entorno o un artefacto asociado a su `release_id`. El pipeline también busca por producto y versión. El guion en la tarjeta puede aparecer aunque el ZIP reutilizable exista en OPS.

Cada etapa debe distinguir **versión publicada**, **versión candidata** y **build de la candidata**. La UI y el pipeline deberían resolver el mismo `artifact_id` y comprobar el commit y el checksum del ZIP. Cuando dos entornos reutilicen un ZIP, ambos deben mostrar el mismo identificador de build. En la auditoría, dev tenía `0.2.2`, mientras staging y producción compartían el ZIP de `0.1.7`. [Resolución actual del artefacto](../.github/workflows/versioning-deploy-artifact.yml#L376) · [Inventario auditado](12-guia-de-releases-dev-staging-produccion.md#lo-que-se-comprobó-en-los-entornos)

## Destinos visibles

| Etapa | Rama GitHub | Supabase de la aplicación | Netlify Referidos PWA | Netlify Prelaunch |
| --- | --- | --- | --- | --- |
| Desarrollo | `dev` | `referidos-app-dev` | Vista previa | Vista previa |
| Staging | `staging` | `referidos-app-staging` | `referidosapp-staging` | `testing-goplip` |
| Producción | `main` | `referidos-app` | `referidosapp` | `join-goplip` |

Mostrar por separado el Supabase al que está conectado Admin, el destino de la operación y `referidos-ops`, que guarda las releases y los ZIP. El control de migraciones debe indicar sobre qué Supabase actúa. La confirmación de publicación debe repetir versión, commit, build, Supabase y sitio Netlify del producto seleccionado. [Mapa de entornos](12-guia-de-releases-dev-staging-produccion.md#mapa-de-supabase-y-netlify)

**Orden propuesto.** Primero unificar la relación entre versión, build y publicación. Después reutilizar las tarjetas y retirar los accesos duplicados. Por último, poner el historial y el diagnóstico en el contexto de cada intento. Desde **Publicar** debe quedar claro qué versión se enviará, qué ZIP usará, dónde quedará y qué falta para continuar.
