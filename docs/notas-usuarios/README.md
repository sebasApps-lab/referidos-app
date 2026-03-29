# Notas para usuarios

Estas notas explican que hace cada app del monorepo desde el punto de vista de uso.
No reemplazan la documentacion tecnica existente: la complementan con una lectura mas funcional y ordenada por experiencia.

## Como esta organizado este arbol

1. `prelaunch/`
   Superficie publica de captacion, waitlist, ayuda y soporte anonimo.
2. `referidos-app/`
   PWA principal con roles `cliente`, `negocio`, `admin` y `soporte`.
3. `referidos-android/`
   App hermana Android con navegacion por tabs y flujos de onboarding equivalentes.
4. `referidos-pwa/`
   Superficie web experimental para auth simplificado y paginas de prueba visual.
5. `referidos-ops/`
   Control plane interno. No es una app para usuarios finales.

## Resultado rapido de la revision

- `prelaunch` es la puerta de entrada publica: vende la propuesta, capta leads y abre soporte anonimo.
- `referidos-app` es la app mas completa del repo y concentra la mayor parte del producto real.
- `referidos-android` replica los roles y flujos principales, con paridad en progreso.
- `referidos-pwa` funciona mas como sandbox/prototipo que como app productiva equivalente.
- `referidos-ops` opera versionado, despliegues y catalogos operativos; se usa de forma indirecta desde admin.

## Lectura recomendada

- Si quieres entender el producto: empieza por `prelaunch/` y luego `referidos-app/`.
- Si quieres entender la experiencia movil: ve a `referidos-android/`.
- Si quieres saber que partes son solo prototipo: revisa `referidos-pwa/`.
- Si quieres ubicar lo operativo sin entrar en detalle tecnico: mira `referidos-ops/`.
