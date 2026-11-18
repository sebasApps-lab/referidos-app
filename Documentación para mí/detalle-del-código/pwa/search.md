# PWA principal · Búsqueda

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/search/auth/AddressStepSearch.jsx`](../../../apps/referidos-app/src/search/auth/AddressStepSearch.jsx#L1)
- [`apps/referidos-app/src/search/cliente/ClienteInicioSearch.jsx`](../../../apps/referidos-app/src/search/cliente/ClienteInicioSearch.jsx#L1)
- [`apps/referidos-app/src/search/hooks/useSearchKeyboard.js`](../../../apps/referidos-app/src/search/hooks/useSearchKeyboard.js#L1)
- [`apps/referidos-app/src/search/hooks/useSearchMode.js`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L1)
- [`apps/referidos-app/src/search/negocio/NegocioGestionarSearch.jsx`](../../../apps/referidos-app/src/search/negocio/NegocioGestionarSearch.jsx#L1)
- [`apps/referidos-app/src/search/profile/PerfilSearch.jsx`](../../../apps/referidos-app/src/search/profile/PerfilSearch.jsx#L1)
- [`apps/referidos-app/src/search/SearchBar.jsx`](../../../apps/referidos-app/src/search/SearchBar.jsx#L1)
- [`apps/referidos-app/src/search/SearchEmpty.jsx`](../../../apps/referidos-app/src/search/SearchEmpty.jsx#L1)
- [`apps/referidos-app/src/search/SearchHeader.jsx`](../../../apps/referidos-app/src/search/SearchHeader.jsx#L1)
- [`apps/referidos-app/src/search/SearchIdle.jsx`](../../../apps/referidos-app/src/search/SearchIdle.jsx#L1)
- [`apps/referidos-app/src/search/SearchMode.jsx`](../../../apps/referidos-app/src/search/SearchMode.jsx#L1)
- [`apps/referidos-app/src/search/SearchOverlay.jsx`](../../../apps/referidos-app/src/search/SearchOverlay.jsx#L1)
- [`apps/referidos-app/src/search/SearchResults.jsx`](../../../apps/referidos-app/src/search/SearchResults.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/search/auth/AddressStepSearch.jsx`](../../../apps/referidos-app/src/search/auth/AddressStepSearch.jsx#L1)

Adapta la infraestructura de búsqueda de UI al dominio geográfico del paso de dirección.

**Superficie que exporta.** [`AddressStepSearch`](../../../apps/referidos-app/src/search/auth/AddressStepSearch.jsx#L3).

**Módulos que lo cargan.** [`UserAddressStep.jsx`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L12) (importa).

**Dependencias del archivo.** [`../SearchMode`](../../../apps/referidos-app/src/search/SearchMode.jsx).

#### [`AddressStepSearch`](../../../apps/referidos-app/src/search/auth/AddressStepSearch.jsx#L3) · componente React · exportación por defecto

Monta `SearchMode`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `props`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SearchMode`.
- **Usa código de** [`SearchMode`](../../../apps/referidos-app/src/search/SearchMode.jsx#L5) (renderiza).
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1107) (renderiza).

### [`apps/referidos-app/src/search/cliente/ClienteInicioSearch.jsx`](../../../apps/referidos-app/src/search/cliente/ClienteInicioSearch.jsx#L1)

Adapta la búsqueda visual a las promociones del inicio cliente.

**Superficie que exporta.** [`ClienteInicioSearch`](../../../apps/referidos-app/src/search/cliente/ClienteInicioSearch.jsx#L3).

**Módulos que lo cargan.** [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L10) (importa).

**Dependencias del archivo.** [`../SearchMode`](../../../apps/referidos-app/src/search/SearchMode.jsx).

#### [`ClienteInicioSearch`](../../../apps/referidos-app/src/search/cliente/ClienteInicioSearch.jsx#L3) · componente React · exportación por defecto

Monta `SearchMode`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `props`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SearchMode`.
- **Usa código de** [`SearchMode`](../../../apps/referidos-app/src/search/SearchMode.jsx#L5) (renderiza).
- **Lo usa** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L147) (renderiza).

### [`apps/referidos-app/src/search/hooks/useSearchKeyboard.js`](../../../apps/referidos-app/src/search/hooks/useSearchKeyboard.js#L1)

Aísla comportamiento de foco y teclado para que los overlays puedan anticipar cambios de tamaño visible.

**Superficie que exporta.** [`useSearchKeyboard`](../../../apps/referidos-app/src/search/hooks/useSearchKeyboard.js#L3).

**Módulos que lo cargan.** [`SearchMode.jsx`](../../../apps/referidos-app/src/search/SearchMode.jsx#L3) (importa).

**Dependencias del archivo.** `react`.

#### [`useSearchKeyboard`](../../../apps/referidos-app/src/search/hooks/useSearchKeyboard.js#L3) · hook React · exportado

Obtiene o resuelve `Keyboard` para entregarlo al consumidor.

- **Entradas** `{active, onEscape, onBack}`.
- **Hooks que llama** `useEffect`.
- **Lo usa** [`SearchMode`](../../../apps/referidos-app/src/search/SearchMode.jsx#L33) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/search/hooks/useSearchKeyboard.js#L4) · callback de infraestructura · dentro de [`useSearchKeyboard`](../../../apps/referidos-app/src/search/hooks/useSearchKeyboard.js#L3)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useSearchKeyboard`.

- **Efectos y APIs** `window.addEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `ausencia de active`.
- **Llamadas directas en el cuerpo** [`window.addEventListener`](../../../apps/referidos-app/src/search/hooks/useSearchKeyboard.js#L15), [`window.removeEventListener`](../../../apps/referidos-app/src/search/hooks/useSearchKeyboard.js#L16).

#### [`handler`](../../../apps/referidos-app/src/search/hooks/useSearchKeyboard.js#L6) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/search/hooks/useSearchKeyboard.js#L4)

Función auxiliar de `useEffect · callback` para `handler`.

- **Entradas** `event`.
- **Condiciones que evalúa** `event.key`, `ausencia de onEscape`.
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/referidos-app/src/search/hooks/useSearchKeyboard.js#L8), [`onEscape`](../../../apps/referidos-app/src/search/hooks/useSearchKeyboard.js#L9), [`onBack`](../../../apps/referidos-app/src/search/hooks/useSearchKeyboard.js#L11).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/search/hooks/useSearchKeyboard.js#L15) (referencia).

### [`apps/referidos-app/src/search/hooks/useSearchMode.js`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L1)

Coordina apertura, cierre y estado contextual del modo de búsqueda.

**Superficie que exporta.** [`useSearchMode`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L3).

**Módulos que lo cargan.** [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L12) (importa).

**Dependencias del archivo.** `react`.

#### [`useSearchMode`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L3) · hook React · exportado

Obtiene o resuelve `Mode` para entregarlo al consumidor.

- **Entradas** `{defaultQuery} = valor por defecto`.
- **Retorno visible o tipo declarado** `query`, `setQuery`, `open`, `setOpen`, `focused`, `isSearching`, `onFocus`, `onBlur`, `onBack`.
- **Estado o valores vinculados** `[query, setQueryState] mediante useState`, `[open, setOpen] mediante useState`, `[focused, setFocused] mediante useState`.
- **Hooks que llama** `useState`.
- **Lo usa** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L53) (llama).

#### [`setQuery`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L8) · callback React · dentro de [`useSearchMode`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L3)

Aplica o guarda `Query` para que el estado refleje la operación.

- **Entradas** `next`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setQueryState`, `setOpen`.
- **Condiciones que evalúa** `trimmed.length`.
- **Llamadas directas en el cuerpo** [`value.trim`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L10), [`setQueryState`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L11), [`setOpen`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L13).
- **Lo usa** [`useSearchMode`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L39) (referencia).

#### [`onFocus`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L17) · callback React · dentro de [`useSearchMode`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L3)

Maneja `Focus` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setFocused`, `setOpen`.
- **Llamadas directas en el cuerpo** [`setFocused`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L18), [`setOpen`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L19).
- **Lo usa** [`useSearchMode`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L44) (referencia).

#### [`onBlur`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L22) · callback React · dentro de [`useSearchMode`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L3)

Maneja `Blur` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setFocused`.
- **Llamadas directas en el cuerpo** [`setFocused`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L23).
- **Lo usa** [`useSearchMode`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L45) (referencia).

#### [`onBack`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L26) · callback React · dentro de [`useSearchMode`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L3)

Maneja `Back` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setQueryState`, `setOpen`, `setFocused`.
- **Llamadas directas en el cuerpo** [`setQueryState`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L27), [`setOpen`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L28), [`setFocused`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L29).
- **Lo usa** [`useSearchMode`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L46) (referencia).

#### [`isSearching`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L33) · cálculo memorizado · dentro de [`useSearchMode`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L3)

Comprueba `Searching` para decidir si se admite o continúa la operación.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`query.trim`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L33).
- **Lo usa** [`useSearchMode`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L43) (referencia).

### [`apps/referidos-app/src/search/negocio/NegocioGestionarSearch.jsx`](../../../apps/referidos-app/src/search/negocio/NegocioGestionarSearch.jsx#L1)

Adapta la búsqueda a secciones y contenidos de la pantalla Gestionar de negocio.

**Superficie que exporta.** [`NegocioGestionarSearch`](../../../apps/referidos-app/src/search/negocio/NegocioGestionarSearch.jsx#L3).

**Dependencias del archivo.** [`../SearchMode`](../../../apps/referidos-app/src/search/SearchMode.jsx).

#### [`NegocioGestionarSearch`](../../../apps/referidos-app/src/search/negocio/NegocioGestionarSearch.jsx#L3) · componente React · exportación por defecto

Monta `SearchMode`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `props`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SearchMode`.
- **Usa código de** [`SearchMode`](../../../apps/referidos-app/src/search/SearchMode.jsx#L5) (renderiza).

### [`apps/referidos-app/src/search/profile/PerfilSearch.jsx`](../../../apps/referidos-app/src/search/profile/PerfilSearch.jsx#L1)

Expone resultados y atajos de búsqueda de las secciones del perfil.

**Superficie que exporta.** [`PerfilSearch`](../../../apps/referidos-app/src/search/profile/PerfilSearch.jsx#L3).

**Dependencias del archivo.** [`../SearchMode`](../../../apps/referidos-app/src/search/SearchMode.jsx).

#### [`PerfilSearch`](../../../apps/referidos-app/src/search/profile/PerfilSearch.jsx#L3) · componente React · exportación por defecto

Monta `SearchMode`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `props`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SearchMode`.
- **Usa código de** [`SearchMode`](../../../apps/referidos-app/src/search/SearchMode.jsx#L5) (renderiza).

### [`apps/referidos-app/src/search/SearchBar.jsx`](../../../apps/referidos-app/src/search/SearchBar.jsx#L1)

Implementa el campo de búsqueda y propaga texto o teclado a su contenedor. Hay variantes para distintos shells.

**Superficie que exporta.** [`SearchBar`](../../../apps/referidos-app/src/search/SearchBar.jsx#L3).

**Módulos que lo cargan.** [`InicioHero.jsx`](../../../apps/referidos-app/src/cliente/inicio/InicioHero.jsx#L9) (importa), [`SearchbarPanel.jsx`](../../../apps/referidos-app/src/components/header-panels/SearchbarPanel.jsx#L1) (importa), [`SearchBar.jsx`](../../../apps/referidos-app/src/components/ui/SearchBar.jsx#L1) (importa), [`SearchbarPanel.jsx`](../../../apps/referidos-app/src/layouts/header-panels/SearchbarPanel.jsx#L1) (importa).

**Dependencias del archivo.** `react`.

#### [`SearchBar`](../../../apps/referidos-app/src/search/SearchBar.jsx#L3) · componente React · exportación por defecto

Monta `button`, `input`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{value, onChange, onFilters, onFocus, onBlur, onCancel, showBack, autoFocus}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `inputRef mediante useRef`.
- **Interfaz que monta** `button`, `input`.
- **Hooks que llama** `useRef`, `useEffect`.
- **Lo usa** [`InicioHero`](../../../apps/referidos-app/src/cliente/inicio/InicioHero.jsx#L102) (renderiza), [`SearchbarPanel`](../../../apps/referidos-app/src/components/header-panels/SearchbarPanel.jsx#L15) (renderiza), [`SearchBar.jsx`](../../../apps/referidos-app/src/components/ui/SearchBar.jsx#L3) (referencia), [`SearchbarPanel`](../../../apps/referidos-app/src/layouts/header-panels/SearchbarPanel.jsx#L15) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/search/SearchBar.jsx#L15) · callback de infraestructura · dentro de [`SearchBar`](../../../apps/referidos-app/src/search/SearchBar.jsx#L3)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SearchBar`.

- **Efectos y APIs** `requestAnimationFrame`.
- **Condiciones que evalúa** `ausencia de autoFocus`.
- **Llamadas directas en el cuerpo** [`requestAnimationFrame`](../../../apps/referidos-app/src/search/SearchBar.jsx#L17), [`inputRef.current.focus`](../../../apps/referidos-app/src/search/SearchBar.jsx#L18), [`cancelAnimationFrame`](../../../apps/referidos-app/src/search/SearchBar.jsx#L20).

#### [`handleCancel`](../../../apps/referidos-app/src/search/SearchBar.jsx#L23) · función · dentro de [`SearchBar`](../../../apps/referidos-app/src/search/SearchBar.jsx#L3)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Condiciones que evalúa** `onCancel`.
- **Llamadas directas en el cuerpo** [`onCancel`](../../../apps/referidos-app/src/search/SearchBar.jsx#L25), [`onChange`](../../../apps/referidos-app/src/search/SearchBar.jsx#L28).
- **Lo usa** [`SearchBar`](../../../apps/referidos-app/src/search/SearchBar.jsx#L36) (pasa a onClick).

#### [`input.onChange`](../../../apps/referidos-app/src/search/SearchBar.jsx#L79) · callback JSX · dentro de [`SearchBar`](../../../apps/referidos-app/src/search/SearchBar.jsx#L3)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`onChange`](../../../apps/referidos-app/src/search/SearchBar.jsx#L79).

#### [`button.onClick`](../../../apps/referidos-app/src/search/SearchBar.jsx#L92) · callback JSX · dentro de [`SearchBar`](../../../apps/referidos-app/src/search/SearchBar.jsx#L3)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onChange`](../../../apps/referidos-app/src/search/SearchBar.jsx#L92).

### [`apps/referidos-app/src/search/SearchEmpty.jsx`](../../../apps/referidos-app/src/search/SearchEmpty.jsx#L1)

Representa que una consulta no devolvió resultados.

**Superficie que exporta.** [`SearchEmpty`](../../../apps/referidos-app/src/search/SearchEmpty.jsx#L1).

**Módulos que lo cargan.** [`SearchResults.jsx`](../../../apps/referidos-app/src/search/SearchResults.jsx#L1) (importa).

#### [`SearchEmpty`](../../../apps/referidos-app/src/search/SearchEmpty.jsx#L1) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{message}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`SearchResults`](../../../apps/referidos-app/src/search/SearchResults.jsx#L22) (renderiza).

### [`apps/referidos-app/src/search/SearchHeader.jsx`](../../../apps/referidos-app/src/search/SearchHeader.jsx#L1)

Compone la barra de cabecera del modo de búsqueda y su retorno.

**Superficie que exporta.** [`SearchHeader`](../../../apps/referidos-app/src/search/SearchHeader.jsx#L3).

**Módulos que lo cargan.** [`ClienteHeader.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L14) (importa), [`NegocioHeader.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L9) (importa).

**Dependencias del archivo.** `lucide-react`.

#### [`SearchHeader`](../../../apps/referidos-app/src/search/SearchHeader.jsx#L3) · componente React · exportación por defecto

Monta `button`, `ArrowLeft`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, onBack}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `ArrowLeft`.
- **Lo usa** [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L120) (renderiza), [`NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L129) (renderiza).

### [`apps/referidos-app/src/search/SearchIdle.jsx`](../../../apps/referidos-app/src/search/SearchIdle.jsx#L1)

Presenta el estado de búsqueda antes de ingresar un criterio.

**Superficie que exporta.** [`SearchIdle`](../../../apps/referidos-app/src/search/SearchIdle.jsx#L15).

**Módulos que lo cargan.** [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L13) (importa).

**Dependencias del archivo.** [`../components/cards/PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx), [`../components/sections/PromoSection`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx), [`../components/sections/SectionTitle`](../../../apps/referidos-app/src/components/sections/SectionTitle.jsx), [`../cliente/inicio/InicioPromosPreview`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx).

#### [`DEFAULT_SUGGESTIONS`](../../../apps/referidos-app/src/search/SearchIdle.jsx#L6) · variable de módulo

Conserva la lista de `DEFAULT SUGGESTIONS` usada por el módulo.

- **Lo usa** [`SearchIdle`](../../../apps/referidos-app/src/search/SearchIdle.jsx#L18) (referencia).

#### [`SearchIdle`](../../../apps/referidos-app/src/search/SearchIdle.jsx#L15) · componente React · exportación por defecto

Monta `PromoSection`, `SectionTitle`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{hotPromos, ratings, suggestions, onSelectSuggestion}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `PromoSection`, `SectionTitle`, `button`.
- **Usa código de** [`HOT_PROMOS`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L191) (referencia), [`PromoSection`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L8) (renderiza), [`PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L8) (pasa a CardComponent), [`SectionTitle`](../../../apps/referidos-app/src/components/sections/SectionTitle.jsx#L2) (renderiza).
- **Llamadas directas en el cuerpo** [`suggestions.map`](../../../apps/referidos-app/src/search/SearchIdle.jsx#L43).
- **Lo usa** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L194) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/search/SearchIdle.jsx#L47) · callback JSX · dentro de [`SearchIdle`](../../../apps/referidos-app/src/search/SearchIdle.jsx#L15)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onSelectSuggestion`](../../../apps/referidos-app/src/search/SearchIdle.jsx#L47).

### [`apps/referidos-app/src/search/SearchMode.jsx`](../../../apps/referidos-app/src/search/SearchMode.jsx#L1)

Compone el modo de búsqueda visible y conecta barras, resultados y callbacks.

**Superficie que exporta.** [`SearchMode`](../../../apps/referidos-app/src/search/SearchMode.jsx#L5).

**Módulos que lo cargan.** [`AddressStepSearch.jsx`](../../../apps/referidos-app/src/search/auth/AddressStepSearch.jsx#L1) (importa), [`ClienteInicioSearch.jsx`](../../../apps/referidos-app/src/search/cliente/ClienteInicioSearch.jsx#L1) (importa), [`NegocioGestionarSearch.jsx`](../../../apps/referidos-app/src/search/negocio/NegocioGestionarSearch.jsx#L1) (importa), [`PerfilSearch.jsx`](../../../apps/referidos-app/src/search/profile/PerfilSearch.jsx#L1) (importa).

**Dependencias del archivo.** `react`, [`./SearchOverlay`](../../../apps/referidos-app/src/search/SearchOverlay.jsx), [`./hooks/useSearchKeyboard`](../../../apps/referidos-app/src/search/hooks/useSearchKeyboard.js).

#### [`SearchMode`](../../../apps/referidos-app/src/search/SearchMode.jsx#L5) · componente React · exportación por defecto

Monta `SearchOverlay`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{open, onOpenChange, onBack, onEscape, searchBar, results, empty, suggestions, loading, footer, children, childrenClassName, variant, headerClassName, contentClassName, panelClassName, className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SearchOverlay`.
- **Hooks que llama** `useSearchKeyboard`.
- **Usa código de** [`useSearchKeyboard`](../../../apps/referidos-app/src/search/hooks/useSearchKeyboard.js#L3) (llama), [`SearchOverlay`](../../../apps/referidos-app/src/search/SearchOverlay.jsx#L1) (renderiza).
- **Lo usa** [`AddressStepSearch`](../../../apps/referidos-app/src/search/auth/AddressStepSearch.jsx#L4) (renderiza), [`ClienteInicioSearch`](../../../apps/referidos-app/src/search/cliente/ClienteInicioSearch.jsx#L4) (renderiza), [`NegocioGestionarSearch`](../../../apps/referidos-app/src/search/negocio/NegocioGestionarSearch.jsx#L4) (renderiza), [`PerfilSearch`](../../../apps/referidos-app/src/search/profile/PerfilSearch.jsx#L4) (renderiza).

#### [`handleClose`](../../../apps/referidos-app/src/search/SearchMode.jsx#L25) · callback React · dentro de [`SearchMode`](../../../apps/referidos-app/src/search/SearchMode.jsx#L5)

Atiende `SearchOverlay.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `SearchOverlay.onClick`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `onBack`.
- **Llamadas directas en el cuerpo** [`onBack`](../../../apps/referidos-app/src/search/SearchMode.jsx#L27), [`onOpenChange`](../../../apps/referidos-app/src/search/SearchMode.jsx#L30).
- **Lo usa** [`SearchMode`](../../../apps/referidos-app/src/search/SearchMode.jsx#L35) (referencia).

### [`apps/referidos-app/src/search/SearchOverlay.jsx`](../../../apps/referidos-app/src/search/SearchOverlay.jsx#L1)

Presenta la búsqueda en capa sobre la pantalla activa para mantener la navegación contextual.

**Superficie que exporta.** [`SearchOverlay`](../../../apps/referidos-app/src/search/SearchOverlay.jsx#L1).

**Módulos que lo cargan.** [`SearchMode.jsx`](../../../apps/referidos-app/src/search/SearchMode.jsx#L2) (importa).

#### [`SearchOverlay`](../../../apps/referidos-app/src/search/SearchOverlay.jsx#L1) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{open, onClick}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Condiciones que evalúa** `ausencia de open`.
- **Lo usa** [`SearchMode`](../../../apps/referidos-app/src/search/SearchMode.jsx#L49) (renderiza).

### [`apps/referidos-app/src/search/SearchResults.jsx`](../../../apps/referidos-app/src/search/SearchResults.jsx#L1)

Dibuja el conjunto de resultados que prepara el contexto que activó la búsqueda.

**Superficie que exporta.** [`SearchResults`](../../../apps/referidos-app/src/search/SearchResults.jsx#L3).

**Módulos que lo cargan.** [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L11) (importa).

**Dependencias del archivo.** [`./SearchEmpty`](../../../apps/referidos-app/src/search/SearchEmpty.jsx).

#### [`SearchResults`](../../../apps/referidos-app/src/search/SearchResults.jsx#L3) · componente React · exportación por defecto

Monta `SearchEmpty`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, showTitle, items, renderItem, emptyState, showEmpty, wrapperClassName, listClassName, titleClassName}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SearchEmpty`.
- **Usa código de** [`SearchEmpty`](../../../apps/referidos-app/src/search/SearchEmpty.jsx#L1) (renderiza).
- **Llamadas directas en el cuerpo** [`items.map`](../../../apps/referidos-app/src/search/SearchResults.jsx#L20).
- **Lo usa** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L173) (renderiza).
