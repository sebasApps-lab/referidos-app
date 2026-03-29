# Referidos Android

## Que es

`referidos-android` es la app hermana movil en React Native.
Replica la logica principal por roles y usa el mismo backend funcional compartido.

## Superficies principales

- Auth y onboarding
- Tabs para `cliente`
- Tabs para `negocio`
- Tabs y stacks para `admin`
- Tabs y stacks para `soporte`
- Perfiles por rol

## Resultado de la revision

- El arranque, observability y navegacion ya estan bien delimitados.
- El flujo de auth cubre onboarding, verificacion y OAuth con deep link.
- El scanner tiene piezas nativas y de gateway, pero el gateway declara todavia un placeholder de Sprint 8.

## Archivos de esta carpeta

- `acceso-y-onboarding.md`
- `roles-y-pantallas.md`
