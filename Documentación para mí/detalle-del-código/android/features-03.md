# Android · Pantallas por función y rol · 3 de 9

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminSupportTicketScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L1)

## Símbolos y conexiones

### [`apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L1)

Edita categorías y macros de OPS, cambia su estado o las elimina, y captura sus filtros de audiencia, app, entorno o estado. La ficha del agente consume la copia del catálogo en el runtime.

**Superficie que exporta.** [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L24) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/supportOps`](../../../apps/referidos-android/src/shared/services/supportOps.ts).

#### [`EMPTY_CATEGORY_FORM`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L19) · variable de módulo

Agrupa la configuración o catálogo de `EMPTY CATEGORY FORM` para que sus consumidores lean claves comunes.

- **Campos o contexto** `id`, `code`, `label`, `description`, `appTargets`.
- **Lo usa** [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L76) (referencia), [`submitCategory`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L156) (referencia), [`removeCategory`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L247) (referencia), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L338) (referencia).

#### [`EMPTY_MACRO_FORM`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L27) · variable de módulo

Agrupa la configuración o catálogo de `EMPTY MACRO FORM` para que sus consumidores lean claves comunes.

- **Campos o contexto** `id`, `title`, `body`, `categoryId`, `threadStatus`, `audienceRoles`, `appTargets`, `envTargets`.
- **Lo usa** [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L77) (referencia), [`submitMacro`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L190) (referencia), [`removeMacro`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L281) (referencia), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L401) (referencia).

#### [`toCsv`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L38) · función

Implementa `to Csv` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `values`.
- **Llamadas directas en el cuerpo** [`values.join`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L39).
- **Lo usa** [`selectCategory`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L205) (llama), [`selectMacro`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L216) (llama), [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L423) (llama).

#### [`normalizeCategory`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L42) · función

Normaliza `Category` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `row`.
- **Retorno visible o tipo declarado** `id`, `code`, `label`, `description`, `status`, `app_targets`.
- **Lo usa** [`loadCatalog`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L87) (referencia).

#### [`normalizeMacro`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L53) · función

Normaliza `Macro` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `row`.
- **Retorno visible o tipo declarado** `id`, `title`, `body`, `category_id`, `category_code`, `thread_status`, `audience_roles`, `app_targets`, `env_targets`, `status`.
- **Lo usa** [`loadCatalog`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L88) (referencia).

#### [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `TextInput`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[loading, setLoading] mediante useState`, `[saving, setSaving] mediante useState`, `[syncing, setSyncing] mediante useState`, `[error, setError] mediante useState`, `[ok, setOk] mediante useState`, `[categories, setCategories] mediante useState`, `[macros, setMacros] mediante useState`, `[categoryForm, setCategoryForm] mediante useState`, `[macroForm, setMacroForm] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `TextInput`, `View`, `BlockSkeleton`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza).
- **Llamadas directas en el cuerpo** [`groupedMacros.map`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L414), [`toUpperCase`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L419), [`toCsv`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L423), [`category.macros.map`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L444).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L68) (pasa a component).

#### [`loadCatalog`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L79) · callback React · asíncrona · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Obtiene o resuelve `Catalog` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setCategories`, `setMacros`.
- **Usa código de** [`listSupportMacroCatalog`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L183) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L80), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L81), [`listSupportMacroCatalog`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L83), [`setCategories`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L87), [`map`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L87), [`setMacros`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L88).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L99) (llama), [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L100) (referencia), [`syncCatalog`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L126) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L98) · callback de infraestructura · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportCatalogScreen`.

- **Llamadas directas en el cuerpo** [`loadCatalog`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L99).

#### [`groupedMacros`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L102) · cálculo memorizado · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Procesa `ed Macros` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `push`.
- **Condiciones que evalúa** `ausencia de byCategory.has`.
- **Llamadas directas en el cuerpo** [`macros.forEach`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L104), [`byCategory.has`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L106), [`byCategory.set`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L106), [`push`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L107), [`byCategory.get`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L107), [`categories.map`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L109).
- **Lo usa** [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L410) (accede al módulo).

#### [`syncCatalog`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L115) · callback React · asíncrona · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Coordina cambios de estado durante `sync Catalog`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSyncing`, `setError`, `setOk`.
- **Usa código de** [`dispatchSupportMacrosSync`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L65) (llama).
- **Llamadas directas en el cuerpo** [`setSyncing`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L116), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L117), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L118), [`dispatchSupportMacrosSync`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L120), [`loadCatalog`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L126).
- **Lo usa** [`submitCategory`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L157) (llama), [`submitMacro`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L191) (llama), [`updateCategoryStatus`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L232) (llama), [`removeCategory`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L248) (llama), [`updateMacroStatus`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L266) (llama), [`removeMacro`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L282) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L297) (llama).

#### [`submitCategory`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L134) · callback React · asíncrona · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Emite o envía `Category` en el flujo del archivo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `setOk`, `setCategoryForm`.
- **Condiciones que evalúa** `ausencia de payload.code o ausencia de payload.label`, `categoryForm.id`.
- **Usa código de** [`updateSupportMacroCategory`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L197) (llama), [`createSupportMacroCategory`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L193) (llama).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L135), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L136), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L137), [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L141), [`categoryForm.code.trim`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L141), [`categoryForm.label.trim`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L142), [`categoryForm.description.trim`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L143), [`filter`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L144), [`map`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L144), [`categoryForm.appTargets.split`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L144), [`item.trim`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L144), [`updateSupportMacroCategory`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L150) y 3 más.
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L334) (llama).

#### [`submitMacro`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L165) · callback React · asíncrona · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Emite o envía `Macro` en el flujo del archivo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `setOk`, `setMacroForm`.
- **Condiciones que evalúa** `ausencia de payload.title o ausencia de payload.body`, `macroForm.id`.
- **Usa código de** [`updateSupportMacro`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L224) (llama), [`createSupportMacro`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L220) (llama).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L166), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L167), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L168), [`macroForm.title.trim`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L172), [`macroForm.body.trim`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L173), [`macroForm.categoryId.trim`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L174), [`macroForm.threadStatus.trim`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L175), [`filter`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L176), [`map`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L176), [`macroForm.audienceRoles.split`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L176), [`item.trim`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L176), [`macroForm.appTargets.split`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L177) y 5 más.
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L397) (llama).

#### [`selectCategory`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L199) · callback React · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Procesa `Category` según el criterio del módulo.

- **Entradas** `row`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setCategoryForm`.
- **Llamadas directas en el cuerpo** [`setCategoryForm`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L200), [`toCsv`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L205).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L427) (llama).

#### [`selectMacro`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L209) · callback React · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Procesa `Macro` según el criterio del módulo.

- **Entradas** `row`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setMacroForm`.
- **Llamadas directas en el cuerpo** [`setMacroForm`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L210), [`toCsv`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L216).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L462) (llama).

#### [`updateCategoryStatus`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L222) · callback React · asíncrona · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Aplica o guarda `Category Status` para que el estado refleje la operación.

- **Entradas** `row`, `nextStatus`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `setOk`, `setSupportMacroCategoryStatus`.
- **Usa código de** [`setSupportMacroCategoryStatus`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L201) (llama).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L223), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L224), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L225), [`setSupportMacroCategoryStatus`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L227), [`syncCatalog`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L232).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L432) (llama).

#### [`removeCategory`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L240) · callback React · asíncrona · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Limpia o restablece `Category` como parte de este flujo.

- **Entradas** `row`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `setOk`, `setCategoryForm`.
- **Usa código de** [`deleteSupportMacroCategory`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L214) (llama).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L241), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L242), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L243), [`deleteSupportMacroCategory`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L245), [`setCategoryForm`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L247), [`syncCatalog`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L248).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L440) (llama).

#### [`updateMacroStatus`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L256) · callback React · asíncrona · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Aplica o guarda `Macro Status` para que el estado refleje la operación.

- **Entradas** `row`, `nextStatus`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `setOk`, `setSupportMacroStatus`.
- **Usa código de** [`setSupportMacroStatus`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L228) (llama).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L257), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L258), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L259), [`setSupportMacroStatus`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L261), [`syncCatalog`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L266).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L467) (llama).

#### [`removeMacro`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L274) · callback React · asíncrona · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Limpia o restablece `Macro` como parte de este flujo.

- **Entradas** `row`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `setOk`, `setMacroForm`.
- **Usa código de** [`deleteSupportMacro`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L241) (llama).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L275), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L276), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L277), [`deleteSupportMacro`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L279), [`setMacroForm`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L281), [`syncCatalog`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L282).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L478) (llama).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L297) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`syncCatalog`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L297).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L309) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setCategoryForm`.
- **Llamadas directas en el cuerpo** [`setCategoryForm`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L309).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L316) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setCategoryForm`.
- **Llamadas directas en el cuerpo** [`setCategoryForm`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L316).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L322) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setCategoryForm`.
- **Llamadas directas en el cuerpo** [`setCategoryForm`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L322).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L328) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setCategoryForm`.
- **Llamadas directas en el cuerpo** [`setCategoryForm`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L328).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L334) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`submitCategory`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L334).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L338) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setCategoryForm`.
- **Llamadas directas en el cuerpo** [`setCategoryForm`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L338).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L348) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setMacroForm`.
- **Llamadas directas en el cuerpo** [`setMacroForm`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L348).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L354) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setMacroForm`.
- **Llamadas directas en el cuerpo** [`setMacroForm`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L354).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L363) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setMacroForm`.
- **Llamadas directas en el cuerpo** [`setMacroForm`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L363).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L370) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setMacroForm`.
- **Llamadas directas en el cuerpo** [`setMacroForm`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L370).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L377) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setMacroForm`.
- **Llamadas directas en el cuerpo** [`setMacroForm`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L377).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L384) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setMacroForm`.
- **Llamadas directas en el cuerpo** [`setMacroForm`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L384).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L391) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setMacroForm`.
- **Llamadas directas en el cuerpo** [`setMacroForm`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L391).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L397) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`submitMacro`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L397).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L401) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setMacroForm`.
- **Llamadas directas en el cuerpo** [`setMacroForm`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L401).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L427) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`selectCategory`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L427).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L431) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`updateCategoryStatus`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L432).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L440) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`removeCategory`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L440).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L462) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`selectMacro`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L462).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L466) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`updateMacroStatus`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L467).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L478) · callback JSX · dentro de [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L68)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`removeMacro`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L478).

#### [`styles`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L493) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L493).
- **Lo usa** [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L292) (accede al módulo).

### [`apps/referidos-android/src/features/admin/AdminSupportTicketScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketScreen.tsx#L1)

Adaptador de navegación que pone el ID público de ruta en `supportDeskStore` y monta la pantalla de ticket del agente. Así dos áreas comparten la misma máquina de atención.

**Superficie que exporta.** [`AdminSupportTicketScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketScreen.tsx#L6).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L25) (importa).

**Dependencias del archivo.** `react`, `@react-navigation/native`, [`@shared/store/supportDeskStore`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts), [`@features/support/SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx).

#### [`AdminSupportTicketScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketScreen.tsx#L6) · componente React · exportación por defecto

Monta `SoporteTicketScreen`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SoporteTicketScreen`.
- **Hooks que llama** `useRoute`, `useSupportDeskStore`, `useEffect`.
- **Usa código de** [`useSupportDeskStore`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts#L9) (llama), [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101) (renderiza).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L71) (pasa a component).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketScreen.tsx#L10) · callback de infraestructura · dentro de [`AdminSupportTicketScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketScreen.tsx#L6)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportTicketScreen`.

- **Actualizaciones de estado o acciones** `setSelectedThreadPublicId`.
- **Condiciones que evalúa** `threadPublicId`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketScreen.tsx#L11), [`setSelectedThreadPublicId`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketScreen.tsx#L13).

### [`apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L1)

Ofrece filtros y acciones sobre tickets desde la vista de administración, con asignación y cambio de estado. Abre el detalle compartido cuando hace falta continuar el flujo.

**Superficie que exporta.** [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L26).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L23) (importa).

**Dependencias del archivo.** `react`, `react-native`, `@react-navigation/native`, [`@navigation/routeKeys`](../../../apps/referidos-android/src/navigation/routeKeys.ts), [`./components/AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/modalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts), [`@shared/services/supportDeskQueries`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`./components/adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts).

#### [`agentDisplayName`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L18) · función

Implementa `agent Display Name` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `agent`.
- **Condiciones que evalúa** `full`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L19), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L19).
- **Lo usa** [`assignTicket`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L117) (llama).

#### [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L26) · componente React · exportación por defecto

Monta `AdminCollectionScreen`, `SectionCard`, `View`, `Text`, `Pressable`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `openPicker mediante useModalStore`, `selector state.openPicker`, `[rows, setRows] mediante useState`, `[agents, setAgents] mediante useState`, `[summary, setSummary] mediante useState`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[query, setQuery] mediante useState`, `[statusFilter, setStatusFilter] mediante useState`, `[busyKey, setBusyKey] mediante useState`.
- **Interfaz que monta** `AdminCollectionScreen`, `SectionCard`, `View`, `Text`, `Pressable`.
- **Hooks que llama** `useNavigation`, `useModalStore`, `useState`, `useEffect`.
- **Usa código de** [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70) (llama), [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L49) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts#L3) (accede al módulo), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`toSupportThreadSubtitle`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L457) (llama), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`filtered.map`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L197), [`trim`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L198), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L198), [`toSupportThreadSubtitle`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L216), [`formatDateTime`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L224).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L66) (pasa a component).

#### [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L39) · callback React · asíncrona · dentro de [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L26)

Obtiene o resuelve `All` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setRows`, `setAgents`, `setSummary`, `setError`.
- **Condiciones que evalúa** `ausencia de refreshing`.
- **Usa código de** [`fetchSupportInboxRows`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L51) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchSupportAgentsDashboard`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L302) (llama), [`fetchSupportStatusSummary`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L369) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L40), [`fetchSupportInboxRows`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L42), [`fetchSupportAgentsDashboard`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L47), [`fetchSupportStatusSummary`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L48), [`setRows`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L51), [`setAgents`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L52), [`setSummary`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L53), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L54).
- **Lo usa** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L60) (llama).

#### [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L58) · callback React · asíncrona · dentro de [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L26)

Coordina cambios de estado durante `refresh All`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L59), [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L60).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L65) (llama), [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L66) (referencia), [`onSelect`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L138) (llama), [`assignTicket`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L142) (referencia), [`releaseToQueue`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L159) (llama), [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L192) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L64) · callback de infraestructura · dentro de [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L26)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportTicketsPanelScreen`.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L65).

#### [`filtered`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L68) · cálculo memorizado · dentro de [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L26)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L69), [`query.trim`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L69), [`rows.filter`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L70), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L71), [`trim`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L74), [`code.includes`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L78), [`summaryText.includes`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L79), [`category.includes`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L80), [`actor.includes`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L81).
- **Lo usa** [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L193) (accede al módulo).

#### [`availableAgents`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L88) · cálculo memorizado · dentro de [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L26)

Función auxiliar de `AdminSupportTicketsPanelScreen` para `available Agents`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`agents.filter`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L89).
- **Lo usa** [`metrics`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L104) (accede al módulo), [`assignTicket`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L115) (accede al módulo), [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L239) (accede al módulo).

#### [`metrics`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L98) · cálculo memorizado · dentro de [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L26)

Función auxiliar de `AdminSupportTicketsPanelScreen` para `metrics`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L174) (pasa a metrics).

#### [`assignTicket`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L109) · callback React · dentro de [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L26)

Función auxiliar de `AdminSupportTicketsPanelScreen` para `assign Ticket`.

- **Entradas** `row`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de threadPublicId`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L110), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L110), [`openPicker`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L112), [`availableAgents.map`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L115), [`agentDisplayName`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L117).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L238) (llama).

#### [`onSelect`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L121) · función · asíncrona · dentro de [`assignTicket`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L109)

Maneja `Select` y coordina las acciones indicadas abajo.

- **Entradas** `agentId`.
- **Actualizaciones de estado o acciones** `setBusyKey`, `setError`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo), [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setBusyKey`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L122), [`mobileApi.support.assignThread`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L123), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L129), [`observability.track`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L132), [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L138).

#### [`releaseToQueue`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L146) · callback React · asíncrona · dentro de [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L26)

Coordina cambios de estado durante `release To Queue`.

- **Entradas** `row`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setBusyKey`, `setError`.
- **Condiciones que evalúa** `ausencia de threadPublicId`, `ausencia de result.ok`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L147), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L147), [`setBusyKey`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L149), [`mobileApi.support.updateStatus`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L150), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L156), [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L159).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L252) (llama).

#### [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L192) · callback JSX · dentro de [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L26)

Responde al evento de interfaz `AdminCollectionScreen.onRefresh`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L192).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L228) · callback JSX · dentro de [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L26)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L229).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L238) · callback JSX · dentro de [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L26)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`assignTicket`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L238).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L252) · callback JSX · dentro de [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L26)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`releaseToQueue`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L252).

### [`apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L1)

Ofrece búsqueda y filtros de usuarios, creación administrativa mediante `mobileApi.support.createAdminUser` y controles de sesión operativa donde se aplican. Reúne diagnósticos de acceso en torno al perfil.

**Superficie que exporta.** [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84).

**Módulos que lo cargan.** [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L16) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`@shared/services/supportDeskQueries`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts).

#### [`ROLE_FILTERS`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L13) · variable de módulo

Declara `ROLE_FILTERS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`RoleFilterId`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L45) (referencia), [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L397) (accede al módulo).

#### [`STATUS_FILTERS`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L23) · variable de módulo

Declara `STATUS_FILTERS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`StatusFilterId`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L46) (referencia), [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L412) (accede al módulo).

#### [`EMAIL_FILTERS`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L32) · variable de módulo

Declara `EMAIL_FILTERS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`EmailFilterId`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L47) (referencia), [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L427) (accede al módulo).

#### [`SUPPORT_USER_ROLES`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L38) · variable de módulo

Declara `SUPPORT_USER_ROLES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`isSupportUser`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L166) (accede al módulo).

#### [`CREATE_ROLE_OPTIONS`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L39) · variable de módulo

Declara `CREATE_ROLE_OPTIONS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`CreateRoleId`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L48) (referencia), [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L350) (accede al módulo).

#### [`RoleFilterId`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L45) · tipo TypeScript

Describe la forma del contrato de `Role Filter Id`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`StatusFilterId`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L46) · tipo TypeScript

Describe la forma del contrato de `Status Filter Id`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`EmailFilterId`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L47) · tipo TypeScript

Describe la forma del contrato de `Email Filter Id`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`CreateRoleId`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L48) · tipo TypeScript

Describe la forma del contrato de `Create Role Id`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`isMissingColumnError`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L50) · función

Comprueba `Missing Column Error` para decidir si se admite o continúa la operación.

- **Entradas** `error`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L51), [`text.includes`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L53).
- **Lo usa** [`loadUsers`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L119) (llama).

#### [`parseUserView`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L60) · función

Extrae o interpreta `User View` de los argumentos, estado o datos de entrada.

- **Entradas** `row`.
- **Retorno visible o tipo declarado** `id`, `publicId`, `displayName`, `email`, `role`, `status`, `emailVerified`, `createdAt`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L61), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L61), [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L67).
- **Lo usa** [`selectedUserView`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L161) (llama), [`filteredUsers`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L197) (llama), [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L449) (llama).

#### [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `TextInput`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[users, setUsers] mediante useState`, `[selectedUserId, setSelectedUserId] mediante useState`, `[query, setQuery] mediante useState`, `[roleFilter, setRoleFilter] mediante useState`, `[statusFilter, setStatusFilter] mediante useState`, `[emailFilter, setEmailFilter] mediante useState`, `[createEmail, setCreateEmail] mediante useState`, `[createNombre, setCreateNombre] mediante useState`, `[createApellido, setCreateApellido] mediante useState`, `[createRole, setCreateRole] mediante useState`, `[creating, setCreating] mediante useState` y 7 más.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `TextInput`, `View`, `BlockSkeleton`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`CREATE_ROLE_OPTIONS.map`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L350), [`ROLE_FILTERS.map`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L397), [`STATUS_FILTERS.map`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L412), [`EMAIL_FILTERS.map`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L427), [`filteredUsers.map`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L448), [`parseUserView`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L449), [`formatDateTime`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L467).
- **Lo usa** [`AdminTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L146) (referencia).

#### [`loadUsers`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L110) · callback React · asíncrona · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Consulta o invoca tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setUsers`, `setError`, `setSelectedUserId`.
- **Condiciones que evalúa** `ausencia de refreshing`, `result.error y isMissingColumnError`, `result.error`, `ausencia de selectedUserId y rows.length`, `selectedUserId`, `ausencia de stillExists y rows.length`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`AdminUsuariosScreen.tsx:113`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L113), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`AdminUsuariosScreen.tsx:113`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L113).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L111), [`limit`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L113), [`order`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L113), [`select`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L113), [`supabase.from`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L113), [`isMissingColumnError`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L119), [`setUsers`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L124), [`setError`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L125), [`setSelectedUserId`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L135), [`rows.some`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L137).
- **Lo usa** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L148) (llama).

#### [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L146) · callback React · asíncrona · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L147), [`loadUsers`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L148).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L153) (llama), [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L154) (referencia), [`handleCreateSupportUser`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L246) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L152) · callback de infraestructura · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminUsuariosScreen`.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L153).

#### [`selectedUser`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L156) · cálculo memorizado · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Procesa `ed User` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`users.find`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L157).
- **Lo usa** [`selectedUserView`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L161) (referencia).

#### [`selectedUserView`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L160) · cálculo memorizado · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Procesa `ed User View` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`parseUserView`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L161).
- **Lo usa** [`isSupportUser`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L165) (referencia), [`loadSelectedSupportState`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L170) (referencia), [`handleToggleSupportAuthorization`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L250) (referencia), [`handleStartSupportSession`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L276) (referencia), [`handleEndSupportSession`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L291) (referencia), [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L476) (referencia).

#### [`isSupportUser`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L164) · cálculo memorizado · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Comprueba `Support User` para decidir si se admite o continúa la operación.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de selectedUserView`.
- **Llamadas directas en el cuerpo** [`SUPPORT_USER_ROLES.has`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L166).
- **Lo usa** [`loadSelectedSupportState`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L170) (referencia), [`handleToggleSupportAuthorization`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L250) (referencia), [`handleStartSupportSession`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L276) (referencia), [`handleEndSupportSession`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L291) (referencia), [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L492) (referencia).

#### [`loadSelectedSupportState`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L169) · callback React · asíncrona · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Obtiene o resuelve `Selected Support State` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSupportProfile`, `setSupportSession`, `setSupportError`, `setSupportLoading`.
- **Condiciones que evalúa** `ausencia de selectedUserView.id o ausencia de isSupportUser`.
- **Usa código de** [`fetchSupportAgentProfile`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L267) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchActiveAgentSession`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L284) (llama).
- **Llamadas directas en el cuerpo** [`setSupportProfile`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L171), [`setSupportSession`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L172), [`setSupportError`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L173), [`setSupportLoading`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L176), [`fetchSupportAgentProfile`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L178), [`fetchActiveAgentSession`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L179).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L191) (llama), [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L192) (referencia), [`handleToggleSupportAuthorization`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L272) (llama), [`handleStartSupportSession`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L287) (llama), [`handleEndSupportSession`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L303) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L190) · callback de infraestructura · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminUsuariosScreen`.

- **Llamadas directas en el cuerpo** [`loadSelectedSupportState`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L191).

#### [`filteredUsers`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L194) · cálculo memorizado · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Procesa `ed Users` según el criterio del módulo.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `roleFilter y item.role`, `statusFilter y item.status`, `emailFilter y ausencia de item.emailVerified`, `emailFilter y item.emailVerified`, `ausencia de normalizedQuery`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L195), [`query.trim`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L195), [`users.filter`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L196), [`parseUserView`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L197), [`includes`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L206), [`item.displayName.toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L206), [`item.email.toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L207), [`item.publicId.toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L208).
- **Lo usa** [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L441) (accede al módulo).

#### [`handleCreateSupportUser`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L213) · callback React · asíncrona · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Maneja `Create Support User` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setCreateError`, `setCreating`, `setCreatedData`, `setCreateEmail`, `setCreateNombre`, `setCreateApellido`.
- **Condiciones que evalúa** `ausencia de email o ausencia de nombre o ausencia de apellido`, `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L214), [`createEmail.trim`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L214), [`createNombre.trim`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L215), [`createApellido.trim`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L216), [`setCreateError`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L219), [`setCreating`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L223), [`setCreatedData`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L225), [`mobileApi.support.createAdminUser`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L227), [`setCreateEmail`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L243), [`setCreateNombre`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L244), [`setCreateApellido`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L245), [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L246).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L364) (llama).

#### [`handleToggleSupportAuthorization`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L249) · callback React · asíncrona · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Guarda datos en tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) y coordina las demás operaciones de esta ficha.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSupportBusy`, `setSupportError`.
- **Condiciones que evalúa** `ausencia de selectedUserView.id o ausencia de isSupportUser`, `upsertError`.
- **Contrato de datos** tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) (`upsert`) en [`AdminUsuariosScreen.tsx:263`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L263), tabla o bucket [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) en [`AdminUsuariosScreen.tsx:263`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L263).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSupportBusy`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L252), [`setSupportError`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L253), [`toISOString`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L260), [`upsert`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L263), [`supabase.from`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L263), [`loadSelectedSupportState`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L272).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L519) (llama).

#### [`handleStartSupportSession`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L275) · callback React · asíncrona · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Maneja `Start Support Session` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSupportBusy`, `setSupportError`.
- **Condiciones que evalúa** `ausencia de selectedUserView.id o ausencia de isSupportUser`, `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSupportBusy`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L277), [`setSupportError`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L278), [`mobileApi.support.startAdminSession`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L279), [`loadSelectedSupportState`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L287).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L529) (llama).

#### [`handleEndSupportSession`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L290) · callback React · asíncrona · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Maneja `End Support Session` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSupportBusy`, `setSupportError`.
- **Condiciones que evalúa** `ausencia de selectedUserView.id o ausencia de isSupportUser`, `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSupportBusy`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L292), [`setSupportError`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L293), [`mobileApi.support.endAdminSession`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L294), [`loadSelectedSupportState`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L303).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L537) (llama).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L353) · callback JSX · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setCreateRole`.
- **Llamadas directas en el cuerpo** [`setCreateRole`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L353).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L364) · callback JSX · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleCreateSupportUser`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L364).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L400) · callback JSX · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setRoleFilter`.
- **Llamadas directas en el cuerpo** [`setRoleFilter`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L400).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L415) · callback JSX · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setStatusFilter`.
- **Llamadas directas en el cuerpo** [`setStatusFilter`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L415).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L430) · callback JSX · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEmailFilter`.
- **Llamadas directas en el cuerpo** [`setEmailFilter`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L430).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L454) · callback JSX · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSelectedUserId`.
- **Llamadas directas en el cuerpo** [`setSelectedUserId`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L454).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L519) · callback JSX · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleToggleSupportAuthorization`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L519).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L529) · callback JSX · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleStartSupportSession`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L529).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L537) · callback JSX · dentro de [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L84)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleEndSupportSession`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L537).

#### [`styles`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L555) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L555).
- **Lo usa** [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L308) (accede al módulo).
