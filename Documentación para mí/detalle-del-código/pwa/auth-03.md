# PWA principal · Auth y onboarding · 3 de 5

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L1)
- [`apps/referidos-app/src/auth/steps/BusinessDataStep.jsx`](../../../apps/referidos-app/src/auth/steps/BusinessDataStep.jsx#L1)
- [`apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L1)
- [`apps/referidos-app/src/auth/steps/EmailLoginStep.jsx`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L1)
- [`apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx`](../../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx#L1)
- [`apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L1)
- [`apps/referidos-app/src/auth/steps/ErrorStep.jsx`](../../../apps/referidos-app/src/auth/steps/ErrorStep.jsx#L1)
- [`apps/referidos-app/src/auth/steps/OAuthCallbackStep.jsx`](../../../apps/referidos-app/src/auth/steps/OAuthCallbackStep.jsx#L1)
- [`apps/referidos-app/src/auth/steps/PendingStep.jsx`](../../../apps/referidos-app/src/auth/steps/PendingStep.jsx#L1)
- [`apps/referidos-app/src/auth/steps/RoleSelectStep.jsx`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L1)

Muestra los rubros que puede elegir un negocio y devuelve la selección a sus datos principales.

**Superficie que exporta.** [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L4).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L14) (importa).

**Dependencias del archivo.** `react`.

#### [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L4) · componente React · exportación por defecto

Monta `CategoryGrid`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{subtitle, helperLabel, categories, subcategories, currentCategory, onConfirmCategory, innerRef}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[selectedParent, setSelectedParent] mediante useState`, `[selectedSub, setSelectedSub] mediante useState`.
- **Interfaz que monta** `CategoryGrid`, `button`.
- **Hooks que llama** `useState`, `useEffect`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L98), [`parentItems.find`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L99).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L687) (renderiza).

#### [`categoryList`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L16) · cálculo memorizado · dentro de [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L4)

Función auxiliar de `BusinessCategoryStep` para `category List`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L39) (accede al módulo), [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L47) (referencia), [`selectedParentLabel`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L51) (accede al módulo), [`parentItems`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L67) (accede al módulo).

#### [`subcategoryMap`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L17) · cálculo memorizado · dentro de [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L4)

Función auxiliar de `BusinessCategoryStep` para `subcategory Map`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L29) (referencia), [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L47) (referencia), [`subcategoryList`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L57) (accede al módulo).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L19) · callback de infraestructura · dentro de [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L4)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `BusinessCategoryStep`.

- **Actualizaciones de estado o acciones** `setSelectedParent`, `setSelectedSub`.
- **Condiciones que evalúa** `ausencia de currentCategory`, `match`, `ausencia de parentId`.
- **Llamadas directas en el cuerpo** [`setSelectedParent`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L21), [`setSelectedSub`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L22), [`list.find`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L30), [`categoryList.find`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L39).

#### [`selectedParentLabel`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L49) · cálculo memorizado · dentro de [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L4)

Procesa `ed Parent Label` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de selectedParent`.
- **Llamadas directas en el cuerpo** [`categoryList.find`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L51).
- **Lo usa** [`handleConfirm`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L86) (referencia).

#### [`subcategoryList`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L55) · cálculo memorizado · dentro de [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L4)

Función auxiliar de `BusinessCategoryStep` para `subcategory List`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de selectedParent`.
- **Lo usa** [`selectedSubLabel`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L62) (accede al módulo), [`subItems`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L71) (accede al módulo), [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L76) (accede al módulo).

#### [`selectedSubLabel`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L60) · cálculo memorizado · dentro de [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L4)

Procesa `ed Sub Label` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de selectedSub`.
- **Llamadas directas en el cuerpo** [`subcategoryList.find`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L62).
- **Lo usa** [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L77) (referencia), [`handleConfirm`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L86) (referencia).

#### [`parentItems`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L67) · cálculo memorizado · dentro de [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L4)

Función auxiliar de `BusinessCategoryStep` para `parent Items`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`categoryList.map`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L67).
- **Lo usa** [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L99) (accede al módulo).

#### [`subItems`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L71) · cálculo memorizado · dentro de [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L4)

Función auxiliar de `BusinessCategoryStep` para `sub Items`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`subcategoryList.map`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L71).
- **Lo usa** [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L100) (referencia).

#### [`handleSelectParent`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L79) · función · dentro de [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L4)

Atiende `CategoryGrid.onSelectParent` y aplica la acción vinculada a ese control.

- **Entradas** `id`.
- **Recibe eventos de** `CategoryGrid.onSelectParent`.
- **Actualizaciones de estado o acciones** `setSelectedParent`, `setSelectedSub`.
- **Llamadas directas en el cuerpo** [`setSelectedParent`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L80), [`setSelectedSub`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L81).
- **Lo usa** [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L125) (pasa a onSelectParent).

#### [`handleConfirm`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L84) · función · dentro de [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L4)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Condiciones que evalúa** `ausencia de selectedParent`, `ausencia de value`.
- **Llamadas directas en el cuerpo** [`onConfirmCategory`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L88).
- **Lo usa** [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L135) (pasa a onClick).

#### [`handleClearParent`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L91) · función · dentro de [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L4)

Atiende `CategoryGrid.onClearParent` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `CategoryGrid.onClearParent`.
- **Actualizaciones de estado o acciones** `setSelectedParent`, `setSelectedSub`.
- **Llamadas directas en el cuerpo** [`setSelectedParent`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L92), [`setSelectedSub`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L93).
- **Lo usa** [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L127) (pasa a onClearParent).

#### [`CategoryGrid`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L151) · componente React

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{items, selectedParentId, selectedSubId, onSelectParent, onSelectSub, onClearParent, className}`.
- **Retorno visible o tipo declarado** `JSX`, `null`.
- **Interfaz que monta** `button`.
- **Condiciones que evalúa** `ausencia de item`.
- **Llamadas directas en el cuerpo** [`items.map`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L162), [`map`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L222).
- **Lo usa** [`BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L121) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L175) · callback JSX · dentro de [`CategoryGrid`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L151)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Condiciones que evalúa** `ausencia de canSelect`, `isParent`.
- **Llamadas directas en el cuerpo** [`onSelectParent`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L178), [`onSelectSub`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L180).

#### [`span.onClick`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L193) · callback JSX · dentro de [`CategoryGrid`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L151)

Responde al evento de interfaz `span.onClick`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`event.stopPropagation`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L194), [`onClearParent`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L195).

#### [`span.onKeyDown`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L197) · callback JSX · dentro de [`CategoryGrid`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L151)

Responde al evento de interfaz `span.onKeyDown`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Condiciones que evalúa** `event.key`.
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L199), [`event.stopPropagation`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L200), [`onClearParent`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx#L201).

### [`apps/referidos-app/src/auth/steps/BusinessDataStep.jsx`](../../../apps/referidos-app/src/auth/steps/BusinessDataStep.jsx#L1)

Captura los datos comerciales del negocio mediante el estado y las validaciones del flujo.

**Superficie que exporta.** [`BusinessDataStep`](../../../apps/referidos-app/src/auth/steps/BusinessDataStep.jsx#L6).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L13) (importa).

**Dependencias del archivo.** `react`, [`../blocks/ErrorBanner`](../../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx), [`../utils/businessDataUtils`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js).

#### [`BusinessDataStep`](../../../apps/referidos-app/src/auth/steps/BusinessDataStep.jsx#L6) · componente React · exportación por defecto

Monta `ErrorBanner`, `input`, `button`, `PencilIcon`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{error, inputClassName, nombreNegocio, categoriaNegocio, categoriaPadre, categoriaDetalle, subtitle, onChangeNombre, onOpenCategory, onSubmit, innerRef}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ErrorBanner`, `input`, `button`, `PencilIcon`.
- **Usa código de** [`ErrorBanner`](../../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx#L3) (renderiza).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L670) (renderiza).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/steps/BusinessDataStep.jsx#L46) · callback JSX · dentro de [`BusinessDataStep`](../../../apps/referidos-app/src/auth/steps/BusinessDataStep.jsx#L6)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Usa código de** [`normalizeBusinessName`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L7) (llama).
- **Llamadas directas en el cuerpo** [`onChangeNombre`](../../../apps/referidos-app/src/auth/steps/BusinessDataStep.jsx#L47), [`normalizeBusinessName`](../../../apps/referidos-app/src/auth/steps/BusinessDataStep.jsx#L47).

#### [`PencilIcon`](../../../apps/referidos-app/src/auth/steps/BusinessDataStep.jsx#L117) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`BusinessDataStep`](../../../apps/referidos-app/src/auth/steps/BusinessDataStep.jsx#L65) (renderiza).

### [`apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L1)

Presenta el flujo de verificación de negocio y sus datos de contacto e identificación.

**Superficie que exporta.** [`BusinessVerifyStep`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L7).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L22) (importa).

**Dependencias del archivo.** `react`, [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../../utils/validators`](../../../apps/referidos-app/src/utils/validators.js), [`../blocks/ContactPhoneBlock`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx).

#### [`BusinessVerifyStep`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L7) · componente React · exportación por defecto

Monta `button`, `input`, `ContactPhoneBlock`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{innerRef, phone, ruc, onContinue, onSkip}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[savingRuc, setSavingRuc] mediante useState`, `[phoneConfirmed, setPhoneConfirmed] mediante useState`, `[rucValue, setRucValue] mediante useState`, `[rucConfirmed, setRucConfirmed] mediante useState`, `[editingRuc, setEditingRuc] mediante useState`, `[rucError, setRucError] mediante useState`, `[emailValue, setEmailValue] mediante useState`, `[skipError, setSkipError] mediante useState`, `bootstrapAuth mediante useAppStore`, `selector s.bootstrapAuth`.
- **Interfaz que monta** `button`, `input`, `ContactPhoneBlock`.
- **Hooks que llama** `useState`, `useAppStore`, `useEffect`.
- **Efectos y APIs** `rucValue.replace`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`validarCedula`](../../../apps/referidos-app/src/utils/validators.js#L17) (llama), [`ContactPhoneBlock`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L36) (renderiza).
- **Llamadas directas en el cuerpo** [`slice`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L24), [`rucValue.replace`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L24), [`normalizedRuc.slice`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L25), [`validarCedula`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L30).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L743) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L34) · callback de infraestructura · dentro de [`BusinessVerifyStep`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L7)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `BusinessVerifyStep`.

- **Actualizaciones de estado o acciones** `setRucValue`, `setRucConfirmed`, `setEditingRuc`.
- **Condiciones que evalúa** `ausencia de ruc o rucValue`.
- **Llamadas directas en el cuerpo** [`setRucValue`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L36), [`setRucConfirmed`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L37), [`setEditingRuc`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L38).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L41) · callback de infraestructura · dentro de [`BusinessVerifyStep`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L7)

Opera sobre Auth `getUser`. El resultado se adapta al contrato del consumidor.

- **Actualizaciones de estado o acciones** `setEmailValue`.
- **Condiciones que evalúa** `emailValue`, `active y authEmail`.
- **Contrato de datos** Auth `getUser` en [`BusinessVerifyStep.jsx:47`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L47).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getUser`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L47), [`setEmailValue`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L50).

#### [`handleSkipVerification`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L58) · función · asíncrona · dentro de [`BusinessVerifyStep`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L7)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSkipError`, `window.location.href`.
- **Condiciones que evalúa** `ausencia de userId`, `updErr`, `onSkip`.
- **Contrato de datos** Auth `getSession` en [`BusinessVerifyStep.jsx:60`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L60), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`BusinessVerifyStep.jsx:66`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L66), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`BusinessVerifyStep.jsx:66`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L66).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSkipError`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L59), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L60), [`eq`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L66), [`update`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L66), [`supabase.from`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L66), [`bootstrapAuth`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L74), [`onSkip`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L76).
- **Lo usa** [`BusinessVerifyStep`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L243) (pasa a onClick).

#### [`handleSavePhone`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L82) · función · asíncrona · dentro de [`BusinessVerifyStep`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L7)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `normalizedPhone`.
- **Retorno visible o tipo declarado** `ok`, `error`, `message`.
- **Recibe eventos de** `ContactPhoneBlock.onSave`.
- **Condiciones que evalúa** `ausencia de userId`, `updErr`.
- **Contrato de datos** Auth `getSession` en [`BusinessVerifyStep.jsx:83`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L83), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`BusinessVerifyStep.jsx:88`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L88), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`BusinessVerifyStep.jsx:88`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L88).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L83), [`eq`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L88), [`update`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L88), [`supabase.from`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L88).
- **Lo usa** [`BusinessVerifyStep`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L227) (pasa a onSave).

#### [`handleSaveRuc`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L101) · función · asíncrona · dentro de [`BusinessVerifyStep`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L7)

Consulta o invoca tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSavingRuc`, `setRucError`, `setRucConfirmed`, `setEditingRuc`.
- **Condiciones que evalúa** `ausencia de rucValid o savingRuc`, `ausencia de userId`, `usuarioErr o ausencia de usuarioRow.id`, `negocioErr o ausencia de negocioRow.id`, `updErr`.
- **Contrato de datos** Auth `getSession` en [`BusinessVerifyStep.jsx:106`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L106), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`BusinessVerifyStep.jsx:112`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L112), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`BusinessVerifyStep.jsx:112`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L112), tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`select`) en [`BusinessVerifyStep.jsx:121`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L121), tabla o bucket [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) en [`BusinessVerifyStep.jsx:121`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L121), tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`update`) en [`BusinessVerifyStep.jsx:132`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L132).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSavingRuc`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L103), [`setRucError`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L104), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L106), [`maybeSingle`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L112), [`eq`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L112), [`select`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L112), [`supabase.from`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L112), [`limit`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L121), [`order`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L121), [`update`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L132), [`setRucConfirmed`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L140), [`setEditingRuc`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L141).
- **Lo usa** [`BusinessVerifyStep`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L206) (pasa a onClick).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L166) · callback JSX · dentro de [`BusinessVerifyStep`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L7)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEditingRuc`.
- **Llamadas directas en el cuerpo** [`setEditingRuc`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L166).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L190) · callback JSX · dentro de [`BusinessVerifyStep`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L7)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setRucValue`, `setRucConfirmed`, `setRucError`.
- **Efectos y APIs** `event.target.value.replace`.
- **Llamadas directas en el cuerpo** [`slice`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L191), [`event.target.value.replace`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L191), [`setRucValue`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L192), [`setRucConfirmed`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L193), [`setRucError`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L194).

#### [`ContactPhoneBlock.onStatusChange`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L228) · callback JSX · dentro de [`BusinessVerifyStep`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L7)

Responde al evento de interfaz `ContactPhoneBlock.onStatusChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `{confirmed}`.
- **Actualizaciones de estado o acciones** `setPhoneConfirmed`.
- **Llamadas directas en el cuerpo** [`setPhoneConfirmed`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L228).

### [`apps/referidos-app/src/auth/steps/EmailLoginStep.jsx`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L1)

Presenta el acceso por correo y contraseña y entrega las credenciales al flujo.

**Superficie que exporta.** [`EmailLoginStep`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L7).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L9) (importa).

**Dependencias del archivo.** `react`, [`../blocks/AuthCard`](../../../apps/referidos-app/src/auth/blocks/AuthCard.jsx), [`../blocks/AuthTabs`](../../../apps/referidos-app/src/auth/blocks/AuthTabs.jsx), [`../blocks/EmailPasswordForm`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx), [`../blocks/ErrorBanner`](../../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx).

#### [`EmailLoginStep`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L7) · componente React · exportación por defecto

Monta `AuthCard`, `ErrorBanner`, `AuthTabs`, `EmailPasswordForm`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{email, password, error, loginLoading, showPassword, onLoginTab, onRegisterTab, onChangeEmail, onChangePassword, onToggleShowPassword, onSubmit}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `AuthCard`, `ErrorBanner`, `AuthTabs`, `EmailPasswordForm`.
- **Usa código de** [`AuthCard`](../../../apps/referidos-app/src/auth/blocks/AuthCard.jsx#L3) (renderiza), [`ErrorBanner`](../../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx#L3) (renderiza), [`AuthTabs`](../../../apps/referidos-app/src/auth/blocks/AuthTabs.jsx#L3) (renderiza), [`EmailPasswordForm`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L5) (renderiza).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L577) (renderiza).

#### [`EmailPasswordForm.onChangePasswordConfirm`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L50) · callback JSX · dentro de [`EmailLoginStep`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L7)

Responde al evento de interfaz `EmailPasswordForm.onChangePasswordConfirm`. La lógica ocurre al interactuar con ese control.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`EmailPasswordForm.onToggleShowPasswordConfirm`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L52) · callback JSX · dentro de [`EmailLoginStep`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L7)

Responde al evento de interfaz `EmailPasswordForm.onToggleShowPasswordConfirm`. La lógica ocurre al interactuar con ese control.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`EmailPasswordForm.onFocusField`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L53) · callback JSX · dentro de [`EmailLoginStep`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L7)

Responde al evento de interfaz `EmailPasswordForm.onFocusField`. La lógica ocurre al interactuar con ese control.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`EmailPasswordForm.onBlurField`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L54) · callback JSX · dentro de [`EmailLoginStep`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L7)

Responde al evento de interfaz `EmailPasswordForm.onBlurField`. La lógica ocurre al interactuar con ese control.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

### [`apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx`](../../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx#L1)

Presenta el alta por correo, sus requisitos y validación de credenciales.

**Superficie que exporta.** [`EmailRegisterStep`](../../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx#L8).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L10) (importa).

**Dependencias del archivo.** `react`, [`../blocks/AuthCard`](../../../apps/referidos-app/src/auth/blocks/AuthCard.jsx), [`../blocks/AuthTabs`](../../../apps/referidos-app/src/auth/blocks/AuthTabs.jsx), [`../blocks/EmailPasswordForm`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx), [`../blocks/ErrorBanner`](../../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx), [`../hooks/useRegisterPasswordUI`](../../../apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js).

#### [`EmailRegisterStep`](../../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx#L8) · componente React · exportación por defecto

Monta `AuthCard`, `ErrorBanner`, `AuthTabs`, `EmailPasswordForm`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{email, password, passwordConfirm, error, showPassword, showPasswordConfirm, hasMinLength, hasNumberAndSymbol, passwordsMatch, onLoginTab, onRegisterTab, onChangeEmail, onChangePassword, onChangePasswordConfirm, onToggleShowPassword, onToggleShowPasswordConfirm, onSubmit, primaryDisabled}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `passwordInputRef mediante useRef`, `confirmInputRef mediante useRef`.
- **Interfaz que monta** `AuthCard`, `ErrorBanner`, `AuthTabs`, `EmailPasswordForm`.
- **Hooks que llama** `useRef`, `useRegisterPasswordUI`.
- **Usa código de** [`useRegisterPasswordUI`](../../../apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js#L3) (llama), [`AuthCard`](../../../apps/referidos-app/src/auth/blocks/AuthCard.jsx#L3) (renderiza), [`ErrorBanner`](../../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx#L3) (renderiza), [`AuthTabs`](../../../apps/referidos-app/src/auth/blocks/AuthTabs.jsx#L3) (renderiza), [`EmailPasswordForm`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L5) (renderiza).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L595) (renderiza).

### [`apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L1)

Compone el paso de verificación de correo con su estado y callbacks de auth.

**Superficie que exporta.** [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L48).

**Dependencias del archivo.** `react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js), [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`COUNTRY_CODES`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L6) · variable de módulo

Conserva la lista de `COUNTRY CODES` usada por el módulo.

- **Lo usa** [`parsed`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L73) (accede al módulo), [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L285) (accede al módulo).

#### [`PencilIcon`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L15) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L177) (renderiza).

#### [`ChevronIcon`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L32) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L262) (renderiza).

#### [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L48) · componente React · exportación por defecto

Monta `button`, `PencilIcon`, `input`, `ChevronIcon`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{innerRef, email, emailConfirmed, phone, onSkip, onComplete}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[message, setMessage] mediante useState`, `[error, setError] mediante useState`, `[sending, setSending] mediante useState`, `[saving, setSaving] mediante useState`, `[editingPhone, setEditingPhone] mediante useState`, `[editingEmail, setEditingEmail] mediante useState`, `[emailValue, setEmailValue] mediante useState`, `[emailSent, setEmailSent] mediante useState`, `[dropdownOpen, setDropdownOpen] mediante useState`, `[phoneConfirmed, setPhoneConfirmed] mediante useState`, `[countryCode, setCountryCode] mediante useState`, `[digits, setDigits] mediante useState`.
- **Interfaz que monta** `button`, `PencilIcon`, `input`, `ChevronIcon`.
- **Hooks que llama** `useState`, `useModal`.
- **Efectos y APIs** `digits.replace`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Llamadas directas en el cuerpo** [`digits.replace`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L83), [`emailValue.includes`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L189), [`COUNTRY_CODES.map`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L285).

#### [`parsed`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L69) · cálculo memorizado · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L48)

Función auxiliar de `AccountVerifyStep` para `parsed`.

- **Retorno visible o tipo declarado** `code`, `digits`.
- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `initialPhone.replace`.
- **Condiciones que evalúa** `ausencia de initialPhone`, `match`.
- **Llamadas directas en el cuerpo** [`COUNTRY_CODES.find`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L73), [`initialPhone.startsWith`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L73), [`initialPhone.slice`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L75), [`initialPhone.replace`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L77).
- **Lo usa** [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L80) (accede al módulo).

#### [`handleDigitsChange`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L87) · función · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L48)

Maneja `Digits Change` y coordina las acciones indicadas abajo.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setDigits`.
- **Efectos y APIs** `replace`, `next.replace`.
- **Condiciones que evalúa** `isEcuador`, `next.startsWith`.
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L88), [`next.startsWith`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L90), [`next.replace`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L91), [`next.slice`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L93), [`setDigits`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L95).
- **Lo usa** [`input.onChange`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L268) (llama).

#### [`handleSendEmail`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L98) · función · asíncrona · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L48)

Opera sobre Auth `resend`. El resultado se adapta al contrato del consumidor.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setError`, `setMessage`, `setSending`, `setEmailSent`.
- **Condiciones que evalúa** `ausencia de emailValue`, `resendError`.
- **Contrato de datos** Auth `resend` en [`EmailVerifyStep.jsx:107`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L107).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L99), [`setMessage`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L100), [`setSending`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L105), [`supabase.auth.resend`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L107), [`setEmailSent`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L113).
- **Lo usa** [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L209) (pasa a onClick).

#### [`handleSave`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L121) · función · asíncrona · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L48)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setError`, `setMessage`, `setSaving`.
- **Condiciones que evalúa** `ausencia de emailSent`, `ausencia de phoneConfirmed`, `ausencia de editingPhone o phone y normalizedPhone`, `ausencia de userId`, `updErr`.
- **Contrato de datos** Auth `getSession` en [`EmailVerifyStep.jsx:134`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L134), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`EmailVerifyStep.jsx:140`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L140), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`EmailVerifyStep.jsx:140`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L140).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L122), [`setMessage`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L123), [`onComplete`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L128), [`setSaving`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L132), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L134), [`eq`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L140), [`update`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L140), [`supabase.from`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L140).
- **Lo usa** [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L316) (pasa a onClick).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L173) · callback JSX · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L48)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEditingEmail`.
- **Llamadas directas en el cuerpo** [`setEditingEmail`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L173).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L185) · callback JSX · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L48)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setEmailValue`.
- **Llamadas directas en el cuerpo** [`setEmailValue`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L185).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L192) · callback JSX · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L48)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEditingEmail`.
- **Llamadas directas en el cuerpo** [`setEditingEmail`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L192).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L245) · callback JSX · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L48)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEditingPhone`.
- **Llamadas directas en el cuerpo** [`setEditingPhone`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L245).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L258) · callback JSX · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L48)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDropdownOpen`.
- **Llamadas directas en el cuerpo** [`setDropdownOpen`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L258).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L268) · callback JSX · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L48)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`handleDigitsChange`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L268).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L277) · callback JSX · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L48)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setPhoneConfirmed`.
- **Llamadas directas en el cuerpo** [`setPhoneConfirmed`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L277).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L289) · callback JSX · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L48)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setCountryCode`, `setDropdownOpen`, `setPhoneConfirmed`.
- **Llamadas directas en el cuerpo** [`setCountryCode`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L290), [`setDropdownOpen`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L291), [`setPhoneConfirmed`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L292).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L324) · callback JSX · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L48)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L325).

#### [`onConfirm`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L326) · función · dentro de [`button.onClick`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L324)

Maneja `Confirm` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`onSkip`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L326).

### [`apps/referidos-app/src/auth/steps/ErrorStep.jsx`](../../../apps/referidos-app/src/auth/steps/ErrorStep.jsx#L1)

Da un estado y una acción de salida para un fallo del flujo.

**Superficie que exporta.** [`ErrorStep`](../../../apps/referidos-app/src/auth/steps/ErrorStep.jsx#L4).

**Dependencias del archivo.** `react`, [`../blocks/AuthCard`](../../../apps/referidos-app/src/auth/blocks/AuthCard.jsx).

#### [`ErrorStep`](../../../apps/referidos-app/src/auth/steps/ErrorStep.jsx#L4) · componente React · exportación por defecto

Monta `AuthCard`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{message}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `AuthCard`.
- **Usa código de** [`AuthCard`](../../../apps/referidos-app/src/auth/blocks/AuthCard.jsx#L3) (renderiza).

### [`apps/referidos-app/src/auth/steps/OAuthCallbackStep.jsx`](../../../apps/referidos-app/src/auth/steps/OAuthCallbackStep.jsx#L1)

Presenta el estado de regreso desde el proveedor de OAuth mientras la app resuelve el resultado.

**Superficie que exporta.** [`OAuthCallbackStep`](../../../apps/referidos-app/src/auth/steps/OAuthCallbackStep.jsx#L4).

**Dependencias del archivo.** `react`, [`../blocks/AuthCard`](../../../apps/referidos-app/src/auth/blocks/AuthCard.jsx).

#### [`OAuthCallbackStep`](../../../apps/referidos-app/src/auth/steps/OAuthCallbackStep.jsx#L4) · componente React · exportación por defecto

Monta `AuthCard`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `AuthCard`.
- **Usa código de** [`AuthCard`](../../../apps/referidos-app/src/auth/blocks/AuthCard.jsx#L3) (renderiza).

### [`apps/referidos-app/src/auth/steps/PendingStep.jsx`](../../../apps/referidos-app/src/auth/steps/PendingStep.jsx#L1)

Presenta el estado pendiente cuando el flujo aún no puede continuar.

**Superficie que exporta.** [`PendingStep`](../../../apps/referidos-app/src/auth/steps/PendingStep.jsx#L4).

**Dependencias del archivo.** `react`, [`../blocks/AuthCard`](../../../apps/referidos-app/src/auth/blocks/AuthCard.jsx).

#### [`PendingStep`](../../../apps/referidos-app/src/auth/steps/PendingStep.jsx#L4) · componente React · exportación por defecto

Monta `AuthCard`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{message}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `AuthCard`.
- **Usa código de** [`AuthCard`](../../../apps/referidos-app/src/auth/blocks/AuthCard.jsx#L3) (renderiza).

### [`apps/referidos-app/src/auth/steps/RoleSelectStep.jsx`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L1)

Ofrece la elección entre cliente y negocio durante el alta.

**Superficie que exporta.** [`RoleSelectStep`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L17).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L23) (importa).

**Dependencias del archivo.** `react`, [`../../utils/validators`](../../../apps/referidos-app/src/utils/validators.js).

#### [`cards`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L4) · variable de módulo

Conserva la lista de `cards` usada por el módulo.

- **Lo usa** [`RoleSelectStep`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L122) (accede al módulo).

#### [`RoleSelectStep`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L17) · componente React · exportación por defecto

Monta `button`, `input`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{error, onSubmit, onValidateNegocioCode}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[selected, setSelected] mediante useState`, `[mounted, setMounted] mediante useState`, `[persisting, setPersisting] mediante useState`, `[showCodeModal, setShowCodeModal] mediante useState`, `[codigo, setCodigo] mediante useState`, `[codigoError, setCodigoError] mediante useState`, `[codigoFormatOk, setCodigoFormatOk] mediante useState`, `[checkingCodigo, setCheckingCodigo] mediante useState`, `[negocioConfirmed, setNegocioConfirmed] mediante useState`.
- **Interfaz que monta** `button`, `input`.
- **Hooks que llama** `useState`, `useEffect`.
- **Llamadas directas en el cuerpo** [`cards.map`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L122), [`encodeURIComponent`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L214).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L569) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L32) · callback de infraestructura · dentro de [`RoleSelectStep`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L17)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `RoleSelectStep`.

- **Actualizaciones de estado o acciones** `setMounted`.
- **Efectos y APIs** `requestAnimationFrame`.
- **Llamadas directas en el cuerpo** [`requestAnimationFrame`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L33), [`setMounted`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L33), [`cancelAnimationFrame`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L34).

#### [`handleNext`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L37) · función · asíncrona · dentro de [`RoleSelectStep`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L17)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setPersisting`.
- **Condiciones que evalúa** `ausencia de selected o persisting`.
- **Llamadas directas en el cuerpo** [`setPersisting`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L40), [`onSubmit`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L41).
- **Lo usa** [`RoleSelectStep`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L167) (pasa a onClick).

#### [`handleSelectRole`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L47) · función · dentro de [`RoleSelectStep`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L17)

Maneja `Select Role` y coordina las acciones indicadas abajo.

- **Entradas** `role`.
- **Actualizaciones de estado o acciones** `setSelected`, `setCodigo`, `setCodigoError`, `setCodigoFormatOk`, `setShowCodeModal`.
- **Condiciones que evalúa** `persisting o checkingCodigo`, `negocioConfirmed y role`, `role`.
- **Llamadas directas en el cuerpo** [`setSelected`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L51), [`setCodigo`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L52), [`setCodigoError`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L53), [`setCodigoFormatOk`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L54), [`setShowCodeModal`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L55).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L127) (llama).

#### [`handleCodigoChange`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L61) · función · dentro de [`RoleSelectStep`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L17)

Maneja `Codigo Change` y coordina las acciones indicadas abajo.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setCodigo`, `setCodigoFormatOk`, `setCodigoError`.
- **Condiciones que evalúa** `codigoError`.
- **Llamadas directas en el cuerpo** [`value.toUpperCase`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L62), [`setCodigo`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L63), [`setCodigoFormatOk`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L64), [`isPartialFormat`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L64), [`setCodigoError`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L65).
- **Lo usa** [`input.onChange`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L208) (llama).

#### [`handleCodigoConfirm`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L68) · función · asíncrona · dentro de [`RoleSelectStep`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L17)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setCodigoError`, `setCheckingCodigo`, `setShowCodeModal`, `setSelected`, `setNegocioConfirmed`.
- **Condiciones que evalúa** `checkingCodigo`, `ausencia de CODE_RE.test`, `ausencia de onValidateNegocioCode`, `ausencia de result.ok`.
- **Usa código de** [`CODE_RE`](../../../apps/referidos-app/src/utils/validators.js#L3) (accede al módulo).
- **Llamadas directas en el cuerpo** [`toUpperCase`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L70), [`codigo.trim`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L70), [`CODE_RE.test`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L71), [`setCodigoError`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L72), [`setCheckingCodigo`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L80), [`onValidateNegocioCode`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L81), [`setShowCodeModal`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L86), [`setSelected`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L87), [`setNegocioConfirmed`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L88).
- **Lo usa** [`RoleSelectStep`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L238) (pasa a onClick).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L127) · callback JSX · dentro de [`RoleSelectStep`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L17)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleSelectRole`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L127).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L208) · callback JSX · dentro de [`RoleSelectStep`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L17)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`handleCodigoChange`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L208).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L228) · callback JSX · dentro de [`RoleSelectStep`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L17)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setShowCodeModal`.
- **Llamadas directas en el cuerpo** [`setShowCodeModal`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L228).

#### [`isPartialFormat`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L256) · función

Comprueba `Partial Format` para decidir si se admite o continúa la operación.

- **Entradas** `code`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `ausencia de code`, `code`, `ausencia de code.startsWith`.
- **Llamadas directas en el cuerpo** [`code.startsWith`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L259), [`code.slice`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L260), [`test`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L261).
- **Lo usa** [`handleCodigoChange`](../../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx#L64) (llama).
