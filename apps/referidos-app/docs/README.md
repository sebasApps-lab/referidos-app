# PWA principal (referidos-app)

## Ruta

- `apps/referidos-app`

## Objetivo

Aplicacion principal web (PWA) para roles cliente, negocio, admin y soporte.

## Comandos utiles

Desde raiz del repo:

```powershell
npm run dev:app
```

```powershell
npm run build -w apps/referidos-app
```

Desde `apps/referidos-app`:

```powershell
npm run dev -- --host --mode remote
```

```powershell
npm run build
```

## Integracion con versionado

Producto versionado:

- `referidos_app`

Fuentes relevantes de cambios:

- `apps/referidos-app/src/**`
- `apps/referidos-app/supabase/functions/**`
- `apps/referidos-app/supabase/migrations/**`
- paquetes compartidos usados por la app (`packages/*` segun component map)

Regla practica:

- cambios en APIs compartidas/contratos pueden elevar bump a `major`.
- cambios en areas funcionales suelen ser `minor/patch`.

## Antes de push

1. compilar PWA
2. revisar rutas nuevas y permisos
3. si tocaste contrato, marcar label semver en PR

## Referencias

- `docs/referidos-system/README.md`
- `versioning/component-map.json`
