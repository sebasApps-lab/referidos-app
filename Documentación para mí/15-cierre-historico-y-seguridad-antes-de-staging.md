# Cierre de auditoría histórica y preparación de Staging

**Decisión del 26 de noviembre de 2026.** La auditoría histórica queda cerrada con 9 releases verificadas y 66 no elegibles. La implementación y las pruebas locales están en `fix/versioning-staging-safeguards`, a partir de `b389a34`. La activación en los servicios y la prueba de Staging requieren aprobación expresa.

## Clasificación histórica

| Producto | Entorno | Verificadas | Incompatibles | Pendientes |
| --- | --- | ---: | ---: | ---: |
| Referidos PWA | Development | 2 | 6 | 5 |
| Referidos PWA | Staging | 2 | 6 | 5 |
| Referidos PWA | Production | 2 | 6 | 5 |
| Prelaunch Web | Development | 1 | 9 | 6 |
| Prelaunch Web | Staging | 1 | 9 | 1 |
| Prelaunch Web | Production | 1 | 7 | 1 |
| **Total** | | **9** | **43** | **23** |

El corte corresponde a releases creadas antes de `2026-11-26T05:24:15Z`. Se auditó el snapshot de las 14:55 de Ecuador. La verificación utilizó los tres ZIP descargados y el registro de evidencia de las 15:10. Se repitió localmente el cálculo de hashes, tamaños y extracción. El detalle individual y el motivo original permanecen en la carpeta privada ignorada por Git, `.android-local/historical-audit/`. `cierre-auditoria.json` registra el dictamen por ID y `verificacion-cierre.json` conserva el resultado de la repetición. Los 43 incompatibles conservan `artifact_storage_deleted`. Los 23 pendientes conservan `artifact_absent`. Ambos estados se excluyen del workflow.

| Versiones verificadas en Development, Staging y Production | ID del artefacto propietario en Development | Tamaño |
| --- | --- | ---: |
| Prelaunch Web 0.3.4 | `340e76f4-a244-409d-8d90-1fd4934df751` | 7 542 582 bytes |
| Referidos PWA 0.1.7 | `4d544330-960a-460b-8a4b-5c6f9cca50e0` | 17 755 654 bytes |
| Referidos PWA 0.2.2 | `ccc806f9-8996-496c-b0d0-898bac93c81e` | 17 760 186 bytes |

Cada grupo sigue usando un ZIP de Development para sus tres releases. El registro versionado fija las nueve identidades, sus predecesoras exactas y los tres objetos por bucket y ruta, propietario, SHA completo de origen, SHA-256 y tamaño. Para usar cualquiera de las nueve, el workflow vuelve a verificar el registro actual y el ZIP descargado. Para una release histórica omitida, bloquea el despliegue incluso si alguien vuelve a cargar un ZIP o intenta usarla como origen de una nueva promoción. Una nueva versión puede seguir su flujo habitual con sus propios registros verificables. [Registro de compatibilidad](../tooling/versioning/historical-release-registry.json) · [Informe anterior](14-auditoria-compatibilidad-y-merge.md)

### Recuperación futura de una release histórica

1. Localizar el ZIP original por el ID de artefacto y su ruta o por un backup con repositorio, run e ID exactos. Confirmar la identidad de tenant, producto, release, entorno, SHA de origen y cada promoción desde Development. Conservar el motivo de bloqueo original.
2. Comparar los bytes con el tamaño y SHA-256 registrados de forma independiente, y extraerlos con el verificador existente en una carpeta temporal. Si falta una prueba independiente del vínculo o de los bytes, la release conserva su estado no elegible.
3. Preparar una propuesta revisable con la evidencia y el cambio mínimo de elegibilidad. Una eventual restauración en Storage o conciliación del registro OPS necesita autorización propia. El empaquetado de Development bloquea el backfill de releases web históricas y la escritura sobre los tres objetos protegidos. [Verificador de ZIP](../tooling/versioning/prepare-release-artifact.py) · [Workflow de Development](../.github/workflows/versioning-release-dev.yml)

## Cambios de seguridad

| Área | Cambio |
| --- | --- |
| Retención de ZIP | Se retira la eliminación automática tras los callbacks. La simulación offline conserva objetos de releases vigentes, promociones, solicitudes activas, inventario de recuperación y los tres ZIP verificados. Compara la ruta física exacta aunque existan alias de otros tenants. Un export incompleto o incoherente produce cero candidatos. [Simulador](../tooling/versioning/plan-artifact-retention.mjs) · [Consulta de solo lectura](../tooling/versioning/plan-artifact-retention.sql) |
| Resolución de identidad | El workflow vincula solicitud, release, tenant y SHA, comprueba la cadena de promoción y el artefacto exacto, verifica los bytes y vuelve a cotejar la identidad antes de publicar. Valida el proyecto Supabase de runtime y el sitio Netlify por Project ID y nombre esperado. El uploader comprueba que ID y nombre del tenant OBS correspondan a la misma fila activa. Los mapas siguen disponibles para el uploader y se retiran de la copia pública. [Identidad](../tooling/versioning/release-artifact-integrity.mjs) · [Destinos](../tooling/versioning/deploy-destination.mjs) · [Workflow](../.github/workflows/versioning-deploy-artifact.yml) |
| Callback y conciliación | El inicio vincula un único run a la ejecución OPS y al `artifact_id`. El cierre guarda primero la evidencia de publicación. Después registra el estado, metadatos, puntero y configuración de OPS. Los duplicados devuelven el registro existente y los resultados contradictorios se rechazan. Una publicación sin confirmación bloquea el destino para reintentos y la consulta de conciliación es de solo lectura. [Callback](../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts) · [Despacho y consulta](../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts) |
| Visibilidad en OPS | Publicar y Solicitudes distinguen la publicación confirmada en Netlify con conciliación pendiente, el resultado sin confirmar y el cierre completo. El panel muestra el intento interno y el ID externo donde hay evidencia. [Panel de versionado](../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx) |
| Configuración y CI | El contrato documenta los destinos y el tenant esperado. Desarrollo, el sincronizador y CI reconocen las nuevas dependencias del workflow. El workflow de pruebas ejecuta las suites offline de procedencia, callback, extracción, retención y tenant. [Contrato](../versioning/env.contract.json) · [CI](../.github/workflows/ci-versioning.yml) |

### Simulación de retención

El SQL produce una celda JSON con el panorama completo de los registros y los conteos de cada relación. Para usarlo en el futuro se requiere una lectura autorizada que incluya todos los alias físicos, también los de otros tenants. Guardar la evidencia de forma privada y suministrar una política con `tenant_id`, `product_id`, `buckets`, `minimum_age_days` y `recovery_pins` explícitos. La ejecución del simulador usa exclusivamente estos archivos.

```bash
node tooling/versioning/plan-artifact-retention.mjs --snapshot "$PRIVATE_SNAPSHOT" --policy "$PRIVATE_POLICY"
```

`planned` describe candidatos según la captura. `blocked` devuelve cero candidatos. El simulador carece de una operación de borrado y no certifica la existencia actual de los objetos. Una eventual limpieza necesita un procedimiento separado, con una nueva captura y protección frente a cambios concurrentes.

## Condiciones y riesgos pendientes

- **Activación coordinada.** El nuevo workflow y las funciones de despacho y callback comparten un contrato que exige vincular el intento antes de publicar. Un callback original sin esa vinculación puede ser rechazado, incluso si su ZIP era válido. Drenar o conciliar los intentos abiertos antes de activar estas versiones juntas. El callback nuevo de releases promovidas siempre lleva `artifact_id`. La evidencia de una publicación anterior queda intacta.
- **Recuperación de cierres incompletos.** Las mutaciones OPS usan los RPC existentes y no forman una transacción única. Si la escritura se interrumpe, OPS conserva la evidencia disponible o deja la ejecución sin confirmación y bloquea otro intento. No se activa un reparador automático. Una reconciliación transaccional y una exclusión mutua fuerte entre solicitudes requerirían una propuesta de RPC y restricciones, con revisión y autorización antes de aplicar SQL. La concurrencia de GitHub serializa el workflow por producto y entorno. También se debe coordinar con cualquier deploy externo o Netlify auto-publish.
- **Staging previo a Production.** El panel evita continuar desde un cierre pendiente, pero el gate de Production aún no exige por sí solo evidencia v2 conciliada de la release exacta de Staging. Preparar y revisar esa política por separado con un tratamiento explícito de las publicaciones antiguas.
- **Configuración real.** Los permisos, la rama remota efectiva, los IDs de Netlify, el tenant activo de OBS, la versión del callback desplegado y el estado de migraciones todavía requieren verificación autorizada. El workflow de publicación sigue usando `netlify-cli@latest`. Conviene fijar una versión después de verificar su salida y dependencias en el runner previsto. El rollback requiere el ID anterior saludable del sitio y permiso de restauración confirmado.
- **Límites operativos.** Los cambios locales aún no protegen a los servicios que ejecuten el código anterior. La retención externa de GitHub Actions, los permisos administrativos de Storage y las políticas alojadas quedan fuera del simulador. Los ZIP y exports privados siguen fuera de Git.

## Resultados de pruebas

| Comando o prueba | Resultado local |
| --- | --- |
| `node --test tooling/versioning/*.test.mjs tooling/observability/upload-sourcemaps.test.mjs` | 88 pruebas aprobadas, incluidas 13 de retención y las validaciones originales de tenant. |
| `python -B tooling/versioning/test-prepare-release-artifact.py` | 7 pruebas aprobadas. |
| Integración Deno del callback con Supabase simulado y sin permiso de red | 8 pruebas aprobadas. Incluye concurrencia, duplicados, procedencia ambigua o ausente, fallo de conciliación y configuración no verificable. |
| Verificador histórico con snapshot, evidencia y ZIP locales | 9 verificadas, 43 incompatibles y 23 pendientes. Código de salida 2 esperado al existir releases bloqueadas. |
| Guardrail de texto, ESLint focalizado, lint Deno con la convención de imports de Edge y sintaxis de workflows | Comprobaciones locales. CI remota y servicios alojados pendientes. |

[Comandos reproducibles del plan](../docs/versioning/staging-rollout-and-rollback.md#prueba-local-sin-servicios-externos)

## Recomendación y reversión

La candidata es **Prelaunch Web 0.3.4 en Staging**, a partir del ZIP verificado de Development. Su `index.html` referencia `app-config.js` y el bundle reconoce la configuración dinámica. La copia original contiene 59 sourcemaps. La verificación posterior debe confirmar la configuración de Staging y que la publicación nueva no sirva esos mapas.

**Todavía no se recomienda ejecutar la prueba alojada.** Primero confirmar el despliegue coordinado del contrato, el destino, el gate, el estado del sitio previo y el rollback. El plan detalla la solicitud, la evidencia esperada, los escenarios de fallo y la recuperación. Si se necesita revertir estos cambios antes de activarlos, revertir el commit de esta fase en la rama independiente. Si ya se activaron, mantener deshabilitada la eliminación automática y revisar el protocolo de los intentos abiertos antes de revertir los componentes coordinados. [Plan de Staging y rollback](../docs/versioning/staging-rollout-and-rollback.md)

La fase posterior implementa el cierre atómico y la recuperación de intentos. [Cierre atómico y recuperación de OPS](16-cierre-atomico-y-recuperacion-ops.md)
