# PWA principal · Cachés

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/cache/cacheKeys.js`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1)
- [`apps/referidos-app/src/cache/CacheOutlet.jsx`](../../../apps/referidos-app/src/cache/CacheOutlet.jsx#L1)
- [`apps/referidos-app/src/cache/cacheStore.js`](../../../apps/referidos-app/src/cache/cacheStore.js#L1)
- [`apps/referidos-app/src/cache/CacheView.jsx`](../../../apps/referidos-app/src/cache/CacheView.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/cache/cacheKeys.js`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1)

Fija identificadores por rol y pantalla para que el layout, la ruta y la restauración de scroll usen las mismas claves.

**Superficie que exporta.** [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1).

**Módulos que lo cargan.** [`ClienteEscanerBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L14) (importa), [`HistorialView.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L9) (importa), [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L19) (importa), [`ClienteLayout.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L18) (importa), [`ClienteEscanerView.jsx`](../../../apps/referidos-app/src/cliente/views/ClienteEscanerView.jsx#L3) (importa), [`ClienteHistorialView.jsx`](../../../apps/referidos-app/src/cliente/views/ClienteHistorialView.jsx#L3) (importa), [`ClienteInicioView.jsx`](../../../apps/referidos-app/src/cliente/views/ClienteInicioView.jsx#L3) (importa), [`ClientePerfilView.jsx`](../../../apps/referidos-app/src/cliente/views/ClientePerfilView.jsx#L3) (importa), [`NegocioEscanerBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L14) (importa), [`NegocioGestionarBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L6) (importa), [`NegocioInicio.jsx`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L7) (importa), [`NegocioLayout.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L18) (importa), [`NegocioEscanerView.jsx`](../../../apps/referidos-app/src/negocio/views/NegocioEscanerView.jsx#L3) (importa), [`NegocioGestionarView.jsx`](../../../apps/referidos-app/src/negocio/views/NegocioGestionarView.jsx#L3) (importa), [`NegocioInicioView.jsx`](../../../apps/referidos-app/src/negocio/views/NegocioInicioView.jsx#L3) (importa), [`NegocioPerfilView.jsx`](../../../apps/referidos-app/src/negocio/views/NegocioPerfilView.jsx#L3) (importa) y 2 más.

#### [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) · variable de módulo · exportado

Agrupa la configuración o catálogo de `CACHE KEYS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `CLIENTE_INICIO`, `CLIENTE_ESCANEAR`, `CLIENTE_HISTORIAL`, `CLIENTE_PERFIL`, `NEGOCIO_INICIO`, `NEGOCIO_ESCANEAR`, `NEGOCIO_GESTIONAR`, `NEGOCIO_PERFIL`.
- **Lo usa** [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L19) (accede al módulo), [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L53) (accede al módulo), [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L58) (accede al módulo), [`cacheEntries`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L69) (accede al módulo), [`ClienteEscanerView`](../../../apps/referidos-app/src/cliente/views/ClienteEscanerView.jsx#L9) (accede al módulo), [`ClienteHistorialView`](../../../apps/referidos-app/src/cliente/views/ClienteHistorialView.jsx#L9) (accede al módulo), [`ClienteInicioView`](../../../apps/referidos-app/src/cliente/views/ClienteInicioView.jsx#L7) (accede al módulo), [`ClientePerfilView`](../../../apps/referidos-app/src/cliente/views/ClientePerfilView.jsx#L9) (accede al módulo), [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L19) (accede al módulo), [`NegocioGestionarBase`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L18) (accede al módulo), [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L20) (accede al módulo), [`cacheEntries`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L70) (accede al módulo) y 6 más.

### [`apps/referidos-app/src/cache/CacheOutlet.jsx`](../../../apps/referidos-app/src/cache/CacheOutlet.jsx#L1)

Renderiza todos los elementos registrados del rol y oculta las vistas que no son la pestaña activa.

**Superficie que exporta.** [`CacheOutlet`](../../../apps/referidos-app/src/cache/CacheOutlet.jsx#L6).

**Módulos que lo cargan.** [`ClienteLayout.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L16) (importa), [`NegocioLayout.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L16) (importa).

**Dependencias del archivo.** `react`, [`./cacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js).

#### [`EMPTY_ORDER`](../../../apps/referidos-app/src/cache/CacheOutlet.jsx#L4) · variable de módulo

Conserva la lista de `EMPTY ORDER` usada por el módulo.

- **Lo usa** [`CacheOutlet`](../../../apps/referidos-app/src/cache/CacheOutlet.jsx#L7) (referencia).

#### [`CacheOutlet`](../../../apps/referidos-app/src/cache/CacheOutlet.jsx#L6) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{scope}`.
- **Retorno visible o tipo declarado** `JSX`, `null`.
- **Hooks que llama** `useCacheStore`.
- **Condiciones que evalúa** `ausencia de entry`.
- **Usa código de** [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12) (llama).
- **Llamadas directas en el cuerpo** [`order.map`](../../../apps/referidos-app/src/cache/CacheOutlet.jsx#L13).
- **Lo usa** [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L299) (renderiza), [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L302) (renderiza).

### [`apps/referidos-app/src/cache/cacheStore.js`](../../../apps/referidos-app/src/cache/cacheStore.js#L1)

Conserva elementos montados, orden, clave activa, precarga y scroll por rol. Permite limpiar la vista al terminar la sesión.

**Superficie que exporta.** [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12).

**Módulos que lo cargan.** [`CacheOutlet.jsx`](../../../apps/referidos-app/src/cache/CacheOutlet.jsx#L2) (importa), [`CacheView.jsx`](../../../apps/referidos-app/src/cache/CacheView.jsx#L3) (importa), [`ClienteEscanerBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L13) (importa), [`HistorialView.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L8) (importa), [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L18) (importa), [`ClienteLayout.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L17) (importa), [`NegocioEscanerBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L13) (importa), [`NegocioGestionarBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L5) (importa), [`NegocioInicio.jsx`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L6) (importa), [`NegocioLayout.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L17) (importa), [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L50) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L48) (importa), [`appStore.js`](../../../apps/referidos-app/src/store/appStore.js#L30) (importa).

**Dependencias del archivo.** `zustand`.

#### [`initialState`](../../../apps/referidos-app/src/cache/cacheStore.js#L4) · variable de módulo

Agrupa la configuración o catálogo de `initial State` para que sus consumidores lean claves comunes.

- **Campos o contexto** `views`, `order`, `activeKeys`, `preloadedScopes`, `scrollPositions`.
- **Lo usa** [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L13) (referencia), [`clearAll`](../../../apps/referidos-app/src/cache/cacheStore.js#L75) (referencia).

#### [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12) · inicializador de store · exportado

Configura el estado inicial y las acciones del store `useCacheStore`.

- **Entradas** `set`, `get`.
- **Retorno visible o tipo declarado** `mount`, `unmount`, `setActive`, `preloadScope`, `has`, `isPreloaded`, `setScrollPosition`, `getScrollPosition`, `clearAll`.
- **Llamadas directas en el cuerpo** [`create`](../../../apps/referidos-app/src/cache/cacheStore.js#L12).
- **Lo usa** [`CacheOutlet`](../../../apps/referidos-app/src/cache/CacheOutlet.jsx#L7) (llama), [`CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx#L8) (llama), [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L18) (llama), [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L52) (llama), [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L57) (llama), [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L57) (llama), [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L18) (llama), [`NegocioGestionarBase`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L17) (llama), [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L19) (llama), [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L58) (llama), [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L142) (llama), [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L139) (llama) y 1 más.

#### [`mount`](../../../apps/referidos-app/src/cache/cacheStore.js#L14) · función · dentro de [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12)

Función auxiliar de `useCacheStore` para `mount`.

- **Entradas** `key`, `element`, `scope`.
- **Retorno visible o tipo declarado** `views`, `order`.
- **Efectos y APIs** `scoped.push`.
- **Condiciones que evalúa** `state.views.key`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-app/src/cache/cacheStore.js#L15), [`scoped.push`](../../../apps/referidos-app/src/cache/cacheStore.js#L19).

#### [`unmount`](../../../apps/referidos-app/src/cache/cacheStore.js#L29) · función · dentro de [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12)

Función auxiliar de `useCacheStore` para `unmount`.

- **Entradas** `key`.
- **Retorno visible o tipo declarado** `views`, `order`, `scrollPositions`.
- **Condiciones que evalúa** `ausencia de state.views.key`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-app/src/cache/cacheStore.js#L30), [`forEach`](../../../apps/referidos-app/src/cache/cacheStore.js#L35), [`state.order.scope.filter`](../../../apps/referidos-app/src/cache/cacheStore.js#L36).

#### [`setActive`](../../../apps/referidos-app/src/cache/cacheStore.js#L46) · función · dentro de [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12)

Aplica o guarda `Active` para que el estado refleje la operación.

- **Entradas** `scope`, `key`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-app/src/cache/cacheStore.js#L47).

#### [`preloadScope`](../../../apps/referidos-app/src/cache/cacheStore.js#L53) · función · dentro de [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12)

Función auxiliar de `useCacheStore` para `preload Scope`.

- **Entradas** `scope`, `entries`.
- **Condiciones que evalúa** `preloadedScopes.scope`.
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-app/src/cache/cacheStore.js#L54), [`entries.forEach`](../../../apps/referidos-app/src/cache/cacheStore.js#L55), [`mount`](../../../apps/referidos-app/src/cache/cacheStore.js#L56), [`set`](../../../apps/referidos-app/src/cache/cacheStore.js#L58).

#### [`has`](../../../apps/referidos-app/src/cache/cacheStore.js#L65) · función · dentro de [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12)

Función auxiliar de `useCacheStore` para `has`.

- **Entradas** `key`.
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-app/src/cache/cacheStore.js#L65).

#### [`isPreloaded`](../../../apps/referidos-app/src/cache/cacheStore.js#L66) · función · dentro de [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12)

Comprueba `Preloaded` para decidir si se admite o continúa la operación.

- **Entradas** `scope`.
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-app/src/cache/cacheStore.js#L66).

#### [`setScrollPosition`](../../../apps/referidos-app/src/cache/cacheStore.js#L67) · función · dentro de [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12)

Aplica o guarda `Scroll Position` para que el estado refleje la operación.

- **Entradas** `key`, `value`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-app/src/cache/cacheStore.js#L68).

#### [`getScrollPosition`](../../../apps/referidos-app/src/cache/cacheStore.js#L74) · función · dentro de [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12)

Obtiene o resuelve `Scroll Position` para entregarlo al consumidor.

- **Entradas** `key`.
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-app/src/cache/cacheStore.js#L74).

#### [`clearAll`](../../../apps/referidos-app/src/cache/cacheStore.js#L75) · función · dentro de [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12)

Limpia o restablece `All` como parte de este flujo.

- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-app/src/cache/cacheStore.js#L75).

### [`apps/referidos-app/src/cache/CacheView.jsx`](../../../apps/referidos-app/src/cache/CacheView.jsx#L1)

Fija la pestaña activa cuando se monta la ruta. Si el scope aún no estaba precargado, puede redirigir a la pestaña de inicio configurada. Devuelve null y el layout monta los componentes.

**Superficie que exporta.** [`CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx#L5).

**Módulos que lo cargan.** [`ClienteEscanerView.jsx`](../../../apps/referidos-app/src/cliente/views/ClienteEscanerView.jsx#L2) (importa), [`ClienteHistorialView.jsx`](../../../apps/referidos-app/src/cliente/views/ClienteHistorialView.jsx#L2) (importa), [`ClienteInicioView.jsx`](../../../apps/referidos-app/src/cliente/views/ClienteInicioView.jsx#L2) (importa), [`ClientePerfilView.jsx`](../../../apps/referidos-app/src/cliente/views/ClientePerfilView.jsx#L2) (importa), [`NegocioEscanerView.jsx`](../../../apps/referidos-app/src/negocio/views/NegocioEscanerView.jsx#L2) (importa), [`NegocioGestionarView.jsx`](../../../apps/referidos-app/src/negocio/views/NegocioGestionarView.jsx#L2) (importa), [`NegocioInicioView.jsx`](../../../apps/referidos-app/src/negocio/views/NegocioInicioView.jsx#L2) (importa), [`NegocioPerfilView.jsx`](../../../apps/referidos-app/src/negocio/views/NegocioPerfilView.jsx#L2) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`./cacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js).

#### [`CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx#L5) · función · exportación por defecto

Implementa `Cache View` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `{scope, cacheKey, fallbackTo}`.
- **Retorno visible o tipo declarado** `null`.
- **Estado o valores vinculados** `preloadedAtMount mediante useRef`.
- **Hooks que llama** `useNavigate`, `useLocation`, `useCacheStore`, `useRef`, `useLayoutEffect`.
- **Usa código de** [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12) (llama).
- **Lo usa** [`ClienteEscanerView`](../../../apps/referidos-app/src/cliente/views/ClienteEscanerView.jsx#L7) (renderiza), [`ClienteHistorialView`](../../../apps/referidos-app/src/cliente/views/ClienteHistorialView.jsx#L7) (renderiza), [`ClienteInicioView`](../../../apps/referidos-app/src/cliente/views/ClienteInicioView.jsx#L7) (renderiza), [`ClientePerfilView`](../../../apps/referidos-app/src/cliente/views/ClientePerfilView.jsx#L7) (renderiza), [`NegocioEscanerView`](../../../apps/referidos-app/src/negocio/views/NegocioEscanerView.jsx#L7) (renderiza), [`NegocioGestionarView`](../../../apps/referidos-app/src/negocio/views/NegocioGestionarView.jsx#L7) (renderiza), [`NegocioInicioView`](../../../apps/referidos-app/src/negocio/views/NegocioInicioView.jsx#L7) (renderiza), [`NegocioPerfilView`](../../../apps/referidos-app/src/negocio/views/NegocioPerfilView.jsx#L7) (renderiza).

#### [`useLayoutEffect · callback`](../../../apps/referidos-app/src/cache/CacheView.jsx#L18) · callback de infraestructura · dentro de [`CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx#L5)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `CacheView`.

- **Actualizaciones de estado o acciones** `setActive`.
- **Efectos y APIs** `navigate`.
- **Condiciones que evalúa** `shouldRedirect`, `fallbackTo`.
- **Llamadas directas en el cuerpo** [`setActive`](../../../apps/referidos-app/src/cache/CacheView.jsx#L21), [`navigate`](../../../apps/referidos-app/src/cache/CacheView.jsx#L23).
