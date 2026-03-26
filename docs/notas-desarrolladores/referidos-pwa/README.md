# Referidos PWA experimental

## Alcance

`referidos-pwa` es una superficie web liviana con auth simplificado y varias paginas de prueba visual.

## Hallazgos de la revision

- El router es muy pequeno y no depende del gate complejo de `referidos-app`.
- `AuthFlow` no ejecuta acciones reales; solo renderiza una vista de bienvenida.
- El valor del proyecto esta en las maquetas `Prueba*` y en el layout de crear promo.

## Archivo de detalle

- `arquitectura-y-superficies.md`
