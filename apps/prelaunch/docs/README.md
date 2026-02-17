# Prelaunch (prelaunch_web)

## Ruta

- `apps/prelaunch`

## Objetivo

Landing/prelaunch con waitlist, soporte anonimo y flujos de conversion.

## Comandos utiles

Desde raiz del repo:

```powershell
npm run dev:prelaunch
```

```powershell
npm run build -w apps/prelaunch
```

Desde `apps/prelaunch`:

```powershell
npm run dev -- --host --mode remote
```

```powershell
npm run build
```

## Integracion con versionado

Producto versionado:

- `prelaunch_web`

Fuentes relevantes de cambios:

- `apps/prelaunch/src/**`
- `packages/api-client/src/**`
- partes compartidas segun `versioning/component-map.json`

Regla practica:

- cambios en `packages/api-client/src/**` suelen impactar contrato y pueden requerir bump mayor.
- cambios puramente visuales/UX suelen ir como `minor` o `patch`.

## Antes de push

1. compilar prelaunch
2. revisar rutas/flows de soporte y waitlist
3. usar commit message semantico para bump correcto

## Referencias

- `docs/referidos-system/README.md`
- `versioning/component-map.json`
