# Prelaunch

## Alcance

`prelaunch` es una app web separada dedicada a captacion, waitlist, ayuda y soporte anonimo.
No intenta replicar toda la funcionalidad del producto principal.

## Modulos principales

- `waitlist-landing`
- `business-landing`
- `legal`
- `support`
- `waitlist`
- `services`
- `observability`
- `config`

## Hallazgos de la revision

- La decision desktop/mobile esta encapsulada en el entrypoint de la landing.
- El runtime de prelaunch esta bien aislado y falla de forma explicita cuando falta env.
- Toda la parte transaccional se limita a waitlist, soporte anonimo y analytics.

## Archivo de detalle

- `runtime-rutas-y-servicios.md`
