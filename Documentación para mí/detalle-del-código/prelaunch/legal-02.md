# Prelaunch · Ayuda y contenidos legales · 2 de 2

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/prelaunch/src/legal/mobile/HelpCenterMobileCategoryPage.jsx`](../../../apps/prelaunch/src/legal/mobile/HelpCenterMobileCategoryPage.jsx#L1)
- [`apps/prelaunch/src/legal/mobile/helpCenterMobileConfig.js`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileConfig.js#L1)
- [`apps/prelaunch/src/legal/mobile/HelpCenterMobilePage.jsx`](../../../apps/prelaunch/src/legal/mobile/HelpCenterMobilePage.jsx#L1)
- [`apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L1)
- [`apps/prelaunch/src/legal/mobile/MobileBusinessHelpCenterLayout.jsx`](../../../apps/prelaunch/src/legal/mobile/MobileBusinessHelpCenterLayout.jsx#L1)
- [`apps/prelaunch/src/legal/mobile/MobileConsumerHelpCenterLayout.jsx`](../../../apps/prelaunch/src/legal/mobile/MobileConsumerHelpCenterLayout.jsx#L1)
- [`apps/prelaunch/src/legal/pages/DataDeletionPage.jsx`](../../../apps/prelaunch/src/legal/pages/DataDeletionPage.jsx#L1)
- [`apps/prelaunch/src/legal/pages/PrivacyPage.jsx`](../../../apps/prelaunch/src/legal/pages/PrivacyPage.jsx#L1)
- [`apps/prelaunch/src/legal/pages/TermsPage.jsx`](../../../apps/prelaunch/src/legal/pages/TermsPage.jsx#L1)

## Símbolos y conexiones

### [`apps/prelaunch/src/legal/mobile/HelpCenterMobileCategoryPage.jsx`](../../../apps/prelaunch/src/legal/mobile/HelpCenterMobileCategoryPage.jsx#L1)

Presenta los artículos de una categoría general en mobile.

**Superficie que exporta.** [`HelpCenterMobileCategoryPage`](../../../apps/prelaunch/src/legal/mobile/HelpCenterMobileCategoryPage.jsx#L5).

**Módulos que lo cargan.** [`HelpCenterCategoryPage.jsx`](../../../apps/prelaunch/src/legal/HelpCenterCategoryPage.jsx#L7) (carga diferida).

**Dependencias del archivo.** `react-router-dom`, [`../helpCenterData`](../../../apps/prelaunch/src/legal/helpCenterData.jsx), [`./MobileConsumerHelpCenterLayout`](../../../apps/prelaunch/src/legal/mobile/MobileConsumerHelpCenterLayout.jsx).

#### [`HelpCenterMobileCategoryPage`](../../../apps/prelaunch/src/legal/mobile/HelpCenterMobileCategoryPage.jsx#L5) · componente React · exportación por defecto

Monta `Navigate`, `MobileConsumerHelpCenterLayout`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Navigate`, `MobileConsumerHelpCenterLayout`.
- **Hooks que llama** `useParams`.
- **Condiciones que evalúa** `ausencia de resourceItems`.
- **Usa código de** [`buildCategoryResources`](../../../apps/prelaunch/src/legal/helpCenterData.jsx#L45) (llama), [`MobileConsumerHelpCenterLayout`](../../../apps/prelaunch/src/legal/mobile/MobileConsumerHelpCenterLayout.jsx#L5) (renderiza).
- **Llamadas directas en el cuerpo** [`buildCategoryResources`](../../../apps/prelaunch/src/legal/mobile/HelpCenterMobileCategoryPage.jsx#L8).
- **Lo usa** [`HelpCenterCategoryPage`](../../../apps/prelaunch/src/legal/HelpCenterCategoryPage.jsx#L7) (carga diferida).

### [`apps/prelaunch/src/legal/mobile/helpCenterMobileConfig.js`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileConfig.js#L1)

Centraliza datos y acciones de ayuda para la navegación mobile.

**Superficie que exporta.** [`clientMobileHeaderActions`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileConfig.js#L1), [`businessMobileHeaderActions`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileConfig.js#L10).

**Módulos que lo cargan.** [`MobileBusinessHelpCenterLayout.jsx`](../../../apps/prelaunch/src/legal/mobile/MobileBusinessHelpCenterLayout.jsx#L2) (importa), [`MobileConsumerHelpCenterLayout.jsx`](../../../apps/prelaunch/src/legal/mobile/MobileConsumerHelpCenterLayout.jsx#L2) (importa).

#### [`clientMobileHeaderActions`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileConfig.js#L1) · variable de módulo · exportado

Conserva la lista de `client Mobile Header Actions` usada por el módulo.

- **Lo usa** [`MobileConsumerHelpCenterLayout`](../../../apps/prelaunch/src/legal/mobile/MobileConsumerHelpCenterLayout.jsx#L17) (pasa a headerActions).

#### [`businessMobileHeaderActions`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileConfig.js#L10) · variable de módulo · exportado

Conserva la lista de `business Mobile Header Actions` usada por el módulo.

- **Lo usa** [`MobileBusinessHelpCenterLayout`](../../../apps/prelaunch/src/legal/mobile/MobileBusinessHelpCenterLayout.jsx#L17) (pasa a headerActions).

### [`apps/prelaunch/src/legal/mobile/HelpCenterMobilePage.jsx`](../../../apps/prelaunch/src/legal/mobile/HelpCenterMobilePage.jsx#L1)

Portada general mobile con categorías y accesos.

**Superficie que exporta.** [`HelpCenterMobilePage`](../../../apps/prelaunch/src/legal/mobile/HelpCenterMobilePage.jsx#L4).

**Módulos que lo cargan.** [`HelpCenterPage.jsx`](../../../apps/prelaunch/src/legal/HelpCenterPage.jsx#L7) (carga diferida).

**Dependencias del archivo.** [`../helpCenterData`](../../../apps/prelaunch/src/legal/helpCenterData.jsx), [`./MobileConsumerHelpCenterLayout`](../../../apps/prelaunch/src/legal/mobile/MobileConsumerHelpCenterLayout.jsx).

#### [`HelpCenterMobilePage`](../../../apps/prelaunch/src/legal/mobile/HelpCenterMobilePage.jsx#L4) · componente React · exportación por defecto

Monta `MobileConsumerHelpCenterLayout`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `MobileConsumerHelpCenterLayout`.
- **Usa código de** [`MobileConsumerHelpCenterLayout`](../../../apps/prelaunch/src/legal/mobile/MobileConsumerHelpCenterLayout.jsx#L5) (renderiza), [`buildLegalResources`](../../../apps/prelaunch/src/legal/helpCenterData.jsx#L19) (llama).
- **Llamadas directas en el cuerpo** [`buildLegalResources`](../../../apps/prelaunch/src/legal/mobile/HelpCenterMobilePage.jsx#L7).
- **Lo usa** [`HelpCenterPage`](../../../apps/prelaunch/src/legal/HelpCenterPage.jsx#L7) (carga diferida).

### [`apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L1)

Piezas móviles compartidas para mostrar tarjetas y navegar entre secciones.

**Superficie que exporta.** [`HelpCenterMobileLayout`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L12), [`HelpCenterMobileHeader`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L93), [`HelpCenterMobileFooter`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L305).

**Módulos que lo cargan.** [`MobileBusinessHelpCenterLayout.jsx`](../../../apps/prelaunch/src/legal/mobile/MobileBusinessHelpCenterLayout.jsx#L3) (importa), [`MobileConsumerHelpCenterLayout.jsx`](../../../apps/prelaunch/src/legal/mobile/MobileConsumerHelpCenterLayout.jsx#L3) (importa), [`FeedbackMobilePage.jsx`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L2) (importa), [`MobileSupportOpenTicketPage.jsx`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L2) (importa), [`MobileSupportOpenTicketHeader.jsx`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHeader.jsx#L1) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`../helpCenterShared`](../../../apps/prelaunch/src/legal/helpCenterShared.jsx), [`../helpCenterData`](../../../apps/prelaunch/src/legal/helpCenterData.jsx).

#### [`HelpCenterMobileLayout`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L12) · componente React · exportado

Monta `HelpCenterThemeProvider`, `HelpCenterMobileHeader`, `MobileSidebarCategoryRow`, `MobileHelpResourceCard`, `HelpCenterCtas`, `HelpCenterMobileFooter`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{sidebarItems, resourceItems, activeCategoryKey, content, basePath, headerTitle, theme, headerActions, ctaProps, brandVariant}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[isMenuOpen, setIsMenuOpen] mediante useState`.
- **Interfaz que monta** `HelpCenterThemeProvider`, `HelpCenterMobileHeader`, `MobileSidebarCategoryRow`, `MobileHelpResourceCard`, `HelpCenterCtas`, `HelpCenterMobileFooter`.
- **Hooks que llama** `useState`, `useId`.
- **Usa código de** [`HelpCenterThemeProvider`](../../../apps/prelaunch/src/legal/helpCenterShared.jsx#L67) (renderiza), [`HelpCenterCtas`](../../../apps/prelaunch/src/legal/helpCenterShared.jsx#L276) (renderiza).
- **Llamadas directas en el cuerpo** [`sidebarItems.find`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L27), [`sidebarItems.map`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L59), [`resourceItems.map`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L76).
- **Lo usa** [`MobileBusinessHelpCenterLayout`](../../../apps/prelaunch/src/legal/mobile/MobileBusinessHelpCenterLayout.jsx#L13) (renderiza), [`MobileConsumerHelpCenterLayout`](../../../apps/prelaunch/src/legal/mobile/MobileConsumerHelpCenterLayout.jsx#L13) (renderiza).

#### [`HelpCenterMobileHeader.onToggleMenu`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L49) · callback JSX · dentro de [`HelpCenterMobileLayout`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L12)

Responde al evento de interfaz `HelpCenterMobileHeader.onToggleMenu`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setIsMenuOpen`.
- **Llamadas directas en el cuerpo** [`setIsMenuOpen`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L49).

#### [`HelpCenterMobileHeader.onCloseMenu`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L50) · callback JSX · dentro de [`HelpCenterMobileLayout`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L12)

Responde al evento de interfaz `HelpCenterMobileHeader.onCloseMenu`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setIsMenuOpen`.
- **Llamadas directas en el cuerpo** [`setIsMenuOpen`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L50).

#### [`HelpCenterMobileHeader`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L93) · componente React · exportado

Monta `Link`, `HelpCenterBrandLogo`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{basePath, headerTitle, titleTo, headerActions, drawerActions, brandVariant, drawerId, drawerTitle, drawerItems, activeItemKey, isMenuOpen, onToggleMenu, onCloseMenu}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Link`, `HelpCenterBrandLogo`, `button`.
- **Usa código de** [`resolveHelpCenterHeaderActions`](../../../apps/prelaunch/src/legal/helpCenterData.jsx#L51) (llama), [`HelpCenterBrandLogo`](../../../apps/prelaunch/src/legal/helpCenterShared.jsx#L62) (renderiza).
- **Llamadas directas en el cuerpo** [`resolveHelpCenterHeaderActions`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L108), [`resolvedHeaderActions.map`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L132), [`join`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L135), [`filter`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L135), [`drawerItems.map`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L206), [`resolvedDrawerActions.map`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L225).
- **Lo usa** [`HelpCenterMobileLayout`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L38) (renderiza), [`MobileSupportOpenTicketHeader`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHeader.jsx#L14) (renderiza).

#### [`MobileHelpResourceCard`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L251) · componente React

Monta `HelpCenterThemedAssetIcon`, `Link`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{resource}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `HelpCenterThemedAssetIcon`, `Link`.
- **Condiciones que evalúa** `resource.to`.
- **Usa código de** [`HelpCenterThemedAssetIcon`](../../../apps/prelaunch/src/legal/helpCenterShared.jsx#L58) (renderiza).
- **Llamadas directas en el cuerpo** [`join`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L252), [`filter`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L252).
- **Lo usa** [`HelpCenterMobileLayout`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L77) (renderiza).

#### [`MobileSidebarCategoryRow`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L289) · componente React

Monta `Link`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{category, isActive}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Link`.
- **Llamadas directas en el cuerpo** [`join`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L290), [`filter`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L290).
- **Lo usa** [`HelpCenterMobileLayout`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L60) (renderiza).

#### [`HelpCenterMobileFooter`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L305) · componente React · exportado

Monta `HelpCenterBrandLogo`, `Link`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{basePath, brandVariant}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `HelpCenterBrandLogo`, `Link`.
- **Usa código de** [`HelpCenterBrandLogo`](../../../apps/prelaunch/src/legal/helpCenterShared.jsx#L62) (renderiza).
- **Lo usa** [`HelpCenterMobileLayout`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L87) (renderiza), [`FeedbackMobilePage`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L29) (renderiza), [`MobileSupportOpenTicketPage`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L30) (renderiza).

### [`apps/prelaunch/src/legal/mobile/MobileBusinessHelpCenterLayout.jsx`](../../../apps/prelaunch/src/legal/mobile/MobileBusinessHelpCenterLayout.jsx#L1)

Marco mobile para la audiencia negocio con navegación correspondiente.

**Superficie que exporta.** [`MobileBusinessHelpCenterLayout`](../../../apps/prelaunch/src/legal/mobile/MobileBusinessHelpCenterLayout.jsx#L5).

**Módulos que lo cargan.** [`HelpCenterBusinessMobileArticlePage.jsx`](../../../apps/prelaunch/src/legal/mobile/HelpCenterBusinessMobileArticlePage.jsx#L5) (importa), [`HelpCenterBusinessMobileCategoryPage.jsx`](../../../apps/prelaunch/src/legal/mobile/HelpCenterBusinessMobileCategoryPage.jsx#L3) (importa), [`HelpCenterBusinessMobilePage.jsx`](../../../apps/prelaunch/src/legal/mobile/HelpCenterBusinessMobilePage.jsx#L2) (importa).

**Dependencias del archivo.** [`../helpCenterData`](../../../apps/prelaunch/src/legal/helpCenterData.jsx), [`./helpCenterMobileConfig`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileConfig.js), [`./helpCenterMobileShared`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx).

#### [`MobileBusinessHelpCenterLayout`](../../../apps/prelaunch/src/legal/mobile/MobileBusinessHelpCenterLayout.jsx#L5) · componente React · exportación por defecto

Monta `HelpCenterMobileLayout`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{resourceItems, activeCategoryKey, content}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `HelpCenterMobileLayout`.
- **Usa código de** [`HelpCenterMobileLayout`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L12) (renderiza), [`businessMobileHeaderActions`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileConfig.js#L10) (pasa a headerActions), [`buildSidebarCategories`](../../../apps/prelaunch/src/legal/helpCenterData.jsx#L7) (llama).
- **Llamadas directas en el cuerpo** [`buildSidebarCategories`](../../../apps/prelaunch/src/legal/mobile/MobileBusinessHelpCenterLayout.jsx#L19).
- **Lo usa** [`HelpCenterBusinessMobileArticlePage`](../../../apps/prelaunch/src/legal/mobile/HelpCenterBusinessMobileArticlePage.jsx#L17) (renderiza), [`HelpCenterBusinessMobileCategoryPage`](../../../apps/prelaunch/src/legal/mobile/HelpCenterBusinessMobileCategoryPage.jsx#L15) (renderiza), [`HelpCenterBusinessMobilePage`](../../../apps/prelaunch/src/legal/mobile/HelpCenterBusinessMobilePage.jsx#L6) (renderiza).

### [`apps/prelaunch/src/legal/mobile/MobileConsumerHelpCenterLayout.jsx`](../../../apps/prelaunch/src/legal/mobile/MobileConsumerHelpCenterLayout.jsx#L1)

Marco mobile para la audiencia cliente que se comparte entre estados de lectura.

**Superficie que exporta.** [`MobileConsumerHelpCenterLayout`](../../../apps/prelaunch/src/legal/mobile/MobileConsumerHelpCenterLayout.jsx#L5).

**Módulos que lo cargan.** [`HelpCenterMobileArticlePage.jsx`](../../../apps/prelaunch/src/legal/mobile/HelpCenterMobileArticlePage.jsx#L5) (importa), [`HelpCenterMobileCategoryPage.jsx`](../../../apps/prelaunch/src/legal/mobile/HelpCenterMobileCategoryPage.jsx#L3) (importa), [`HelpCenterMobilePage.jsx`](../../../apps/prelaunch/src/legal/mobile/HelpCenterMobilePage.jsx#L2) (importa).

**Dependencias del archivo.** [`../helpCenterData`](../../../apps/prelaunch/src/legal/helpCenterData.jsx), [`./helpCenterMobileConfig`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileConfig.js), [`./helpCenterMobileShared`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx).

#### [`MobileConsumerHelpCenterLayout`](../../../apps/prelaunch/src/legal/mobile/MobileConsumerHelpCenterLayout.jsx#L5) · componente React · exportación por defecto

Monta `HelpCenterMobileLayout`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{resourceItems, activeCategoryKey, content}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `HelpCenterMobileLayout`.
- **Usa código de** [`HelpCenterMobileLayout`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L12) (renderiza), [`clientMobileHeaderActions`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileConfig.js#L1) (pasa a headerActions), [`buildSidebarCategories`](../../../apps/prelaunch/src/legal/helpCenterData.jsx#L7) (llama).
- **Llamadas directas en el cuerpo** [`buildSidebarCategories`](../../../apps/prelaunch/src/legal/mobile/MobileConsumerHelpCenterLayout.jsx#L19).
- **Lo usa** [`HelpCenterMobileArticlePage`](../../../apps/prelaunch/src/legal/mobile/HelpCenterMobileArticlePage.jsx#L17) (renderiza), [`HelpCenterMobileCategoryPage`](../../../apps/prelaunch/src/legal/mobile/HelpCenterMobileCategoryPage.jsx#L15) (renderiza), [`HelpCenterMobilePage`](../../../apps/prelaunch/src/legal/mobile/HelpCenterMobilePage.jsx#L6) (renderiza).

### [`apps/prelaunch/src/legal/pages/DataDeletionPage.jsx`](../../../apps/prelaunch/src/legal/pages/DataDeletionPage.jsx#L1)

Página de eliminación de datos montada sobre el layout legal y su clave de documento.

**Superficie que exporta.** [`DataDeletionPage`](../../../apps/prelaunch/src/legal/pages/DataDeletionPage.jsx#L16).

**Módulos que lo cargan.** [`LegalRouter.jsx`](../../../apps/prelaunch/src/legal/LegalRouter.jsx#L5) (importa), [`index.js`](../../../apps/prelaunch/src/legal/index.js#L8) (reexporta DataDeletionPage).

**Dependencias del archivo.** `react`, [`../LegalLayout`](../../../apps/prelaunch/src/legal/LegalLayout.jsx), [`../blocks/LegalContent`](../../../apps/prelaunch/src/legal/blocks/LegalContent.jsx), [`@referidos/legal-content/prelaunch`](../../../packages/legal-content/src/prelaunch.js).

#### [`CONTENT`](../../../apps/prelaunch/src/legal/pages/DataDeletionPage.jsx#L6) · variable de módulo

Agrupa la configuración o catálogo de `CONTENT` para que sus consumidores lean claves comunes.

- **Campos o contexto** `es`, `en`.
- **Usa código de** [`getLegalMarkdown`](../../../packages/legal-content/src/prelaunch.js#L45) (llama).
- **Llamadas directas en el cuerpo** [`getLegalMarkdown`](../../../apps/prelaunch/src/legal/pages/DataDeletionPage.jsx#L7).
- **Lo usa** [`DataDeletionPage`](../../../apps/prelaunch/src/legal/pages/DataDeletionPage.jsx#L18) (accede al módulo).

#### [`TITLES`](../../../apps/prelaunch/src/legal/pages/DataDeletionPage.jsx#L11) · variable de módulo

Agrupa la configuración o catálogo de `TITLES` para que sus consumidores lean claves comunes.

- **Campos o contexto** `es`, `en`.
- **Lo usa** [`DataDeletionPage`](../../../apps/prelaunch/src/legal/pages/DataDeletionPage.jsx#L17) (accede al módulo).

#### [`DataDeletionPage`](../../../apps/prelaunch/src/legal/pages/DataDeletionPage.jsx#L16) · componente React · exportación por defecto

Monta `LegalLayout`, `LegalContent`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{locale}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `LegalLayout`, `LegalContent`.
- **Usa código de** [`LegalLayout`](../../../apps/prelaunch/src/legal/LegalLayout.jsx#L5) (renderiza), [`Módulo`](../../../apps/prelaunch/src/legal/blocks/LegalContent.jsx#L1) (renderiza).
- **Lo usa** [`DOC_PAGES`](../../../apps/prelaunch/src/legal/LegalRouter.jsx#L12) (referencia).

### [`apps/prelaunch/src/legal/pages/PrivacyPage.jsx`](../../../apps/prelaunch/src/legal/pages/PrivacyPage.jsx#L1)

Página de privacidad construida sobre el layout legal con el documento correspondiente.

**Superficie que exporta.** [`PrivacyPage`](../../../apps/prelaunch/src/legal/pages/PrivacyPage.jsx#L16).

**Módulos que lo cargan.** [`LegalRouter.jsx`](../../../apps/prelaunch/src/legal/LegalRouter.jsx#L4) (importa), [`index.js`](../../../apps/prelaunch/src/legal/index.js#L7) (reexporta PrivacyPage).

**Dependencias del archivo.** `react`, [`../LegalLayout`](../../../apps/prelaunch/src/legal/LegalLayout.jsx), [`../blocks/LegalContent`](../../../apps/prelaunch/src/legal/blocks/LegalContent.jsx), [`@referidos/legal-content/prelaunch`](../../../packages/legal-content/src/prelaunch.js).

#### [`CONTENT`](../../../apps/prelaunch/src/legal/pages/PrivacyPage.jsx#L6) · variable de módulo

Agrupa la configuración o catálogo de `CONTENT` para que sus consumidores lean claves comunes.

- **Campos o contexto** `es`, `en`.
- **Usa código de** [`getLegalMarkdown`](../../../packages/legal-content/src/prelaunch.js#L45) (llama).
- **Llamadas directas en el cuerpo** [`getLegalMarkdown`](../../../apps/prelaunch/src/legal/pages/PrivacyPage.jsx#L7).
- **Lo usa** [`PrivacyPage`](../../../apps/prelaunch/src/legal/pages/PrivacyPage.jsx#L18) (accede al módulo).

#### [`TITLES`](../../../apps/prelaunch/src/legal/pages/PrivacyPage.jsx#L11) · variable de módulo

Agrupa la configuración o catálogo de `TITLES` para que sus consumidores lean claves comunes.

- **Campos o contexto** `es`, `en`.
- **Lo usa** [`PrivacyPage`](../../../apps/prelaunch/src/legal/pages/PrivacyPage.jsx#L17) (accede al módulo).

#### [`PrivacyPage`](../../../apps/prelaunch/src/legal/pages/PrivacyPage.jsx#L16) · componente React · exportación por defecto

Monta `LegalLayout`, `LegalContent`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{locale}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `LegalLayout`, `LegalContent`.
- **Usa código de** [`LegalLayout`](../../../apps/prelaunch/src/legal/LegalLayout.jsx#L5) (renderiza), [`Módulo`](../../../apps/prelaunch/src/legal/blocks/LegalContent.jsx#L1) (renderiza).
- **Lo usa** [`DOC_PAGES`](../../../apps/prelaunch/src/legal/LegalRouter.jsx#L11) (referencia).

### [`apps/prelaunch/src/legal/pages/TermsPage.jsx`](../../../apps/prelaunch/src/legal/pages/TermsPage.jsx#L1)

Página de términos construida sobre el layout legal con su documento.

**Superficie que exporta.** [`TermsPage`](../../../apps/prelaunch/src/legal/pages/TermsPage.jsx#L16).

**Módulos que lo cargan.** [`LegalRouter.jsx`](../../../apps/prelaunch/src/legal/LegalRouter.jsx#L3) (importa), [`index.js`](../../../apps/prelaunch/src/legal/index.js#L6) (reexporta TermsPage).

**Dependencias del archivo.** `react`, [`../LegalLayout`](../../../apps/prelaunch/src/legal/LegalLayout.jsx), [`../blocks/LegalContent`](../../../apps/prelaunch/src/legal/blocks/LegalContent.jsx), [`@referidos/legal-content/prelaunch`](../../../packages/legal-content/src/prelaunch.js).

#### [`CONTENT`](../../../apps/prelaunch/src/legal/pages/TermsPage.jsx#L6) · variable de módulo

Agrupa la configuración o catálogo de `CONTENT` para que sus consumidores lean claves comunes.

- **Campos o contexto** `es`, `en`.
- **Usa código de** [`getLegalMarkdown`](../../../packages/legal-content/src/prelaunch.js#L45) (llama).
- **Llamadas directas en el cuerpo** [`getLegalMarkdown`](../../../apps/prelaunch/src/legal/pages/TermsPage.jsx#L7).
- **Lo usa** [`TermsPage`](../../../apps/prelaunch/src/legal/pages/TermsPage.jsx#L18) (accede al módulo).

#### [`TITLES`](../../../apps/prelaunch/src/legal/pages/TermsPage.jsx#L11) · variable de módulo

Agrupa la configuración o catálogo de `TITLES` para que sus consumidores lean claves comunes.

- **Campos o contexto** `es`, `en`.
- **Lo usa** [`TermsPage`](../../../apps/prelaunch/src/legal/pages/TermsPage.jsx#L17) (accede al módulo).

#### [`TermsPage`](../../../apps/prelaunch/src/legal/pages/TermsPage.jsx#L16) · componente React · exportación por defecto

Monta `LegalLayout`, `LegalContent`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{locale}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `LegalLayout`, `LegalContent`.
- **Usa código de** [`LegalLayout`](../../../apps/prelaunch/src/legal/LegalLayout.jsx#L5) (renderiza), [`Módulo`](../../../apps/prelaunch/src/legal/blocks/LegalContent.jsx#L1) (renderiza).
- **Lo usa** [`DOC_PAGES`](../../../apps/prelaunch/src/legal/LegalRouter.jsx#L10) (referencia).
