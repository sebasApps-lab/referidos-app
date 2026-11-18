# PWA principal · Documentos legales

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/legal/blocks/LegalContent.jsx`](../../../apps/referidos-app/src/legal/blocks/LegalContent.jsx#L1)
- [`apps/referidos-app/src/legal/blocks/LegalFooter.jsx`](../../../apps/referidos-app/src/legal/blocks/LegalFooter.jsx#L1)
- [`apps/referidos-app/src/legal/blocks/LegalHeader.jsx`](../../../apps/referidos-app/src/legal/blocks/LegalHeader.jsx#L1)
- [`apps/referidos-app/src/legal/index.js`](../../../apps/referidos-app/src/legal/index.js#L1)
- [`apps/referidos-app/src/legal/LegalLayout.jsx`](../../../apps/referidos-app/src/legal/LegalLayout.jsx#L1)
- [`apps/referidos-app/src/legal/LegalRouter.jsx`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L1)
- [`apps/referidos-app/src/legal/pages/DataDeletionPage.jsx`](../../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx#L1)
- [`apps/referidos-app/src/legal/pages/PrivacyPage.jsx`](../../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx#L1)
- [`apps/referidos-app/src/legal/pages/TermsPage.jsx`](../../../apps/referidos-app/src/legal/pages/TermsPage.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/legal/blocks/LegalContent.jsx`](../../../apps/referidos-app/src/legal/blocks/LegalContent.jsx#L1)

Renderiza el contenido de los documentos legales dentro del esquema visual común.

**Reexporta.** `default` de [`LegalContent`](../../../packages/legal-content/src/index.js).

**Módulos que lo cargan.** [`LegalRouter.jsx`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L7) (importa), [`index.js`](../../../apps/referidos-app/src/legal/index.js#L5) (reexporta LegalContent), [`DataDeletionPage.jsx`](../../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx#L3) (importa), [`PrivacyPage.jsx`](../../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx#L3) (importa), [`TermsPage.jsx`](../../../apps/referidos-app/src/legal/pages/TermsPage.jsx#L3) (importa).

El archivo participa como entrada, adaptador de imports o reexportación.

### [`apps/referidos-app/src/legal/blocks/LegalFooter.jsx`](../../../apps/referidos-app/src/legal/blocks/LegalFooter.jsx#L1)

Muestra los enlaces de pie de la sección legal.

**Superficie que exporta.** [`LegalFooter`](../../../apps/referidos-app/src/legal/blocks/LegalFooter.jsx#L9).

**Módulos que lo cargan.** [`LegalLayout.jsx`](../../../apps/referidos-app/src/legal/LegalLayout.jsx#L3) (importa), [`index.js`](../../../apps/referidos-app/src/legal/index.js#L4) (reexporta LegalFooter).

**Dependencias del archivo.** `react`.

#### [`LEGAL_VERSION`](../../../apps/referidos-app/src/legal/blocks/LegalFooter.jsx#L3) · variable de módulo

Declara `LEGAL_VERSION` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`LegalFooter`](../../../apps/referidos-app/src/legal/blocks/LegalFooter.jsx#L17) (referencia).

#### [`LOCALE_LABELS`](../../../apps/referidos-app/src/legal/blocks/LegalFooter.jsx#L4) · variable de módulo

Agrupa la configuración o catálogo de `LOCALE LABELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `es`, `en`.
- **Lo usa** [`LegalFooter`](../../../apps/referidos-app/src/legal/blocks/LegalFooter.jsx#L11) (accede al módulo).

#### [`LegalFooter`](../../../apps/referidos-app/src/legal/blocks/LegalFooter.jsx#L9) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{locale}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`getFullYear`](../../../apps/referidos-app/src/legal/blocks/LegalFooter.jsx#L10), [`toUpperCase`](../../../apps/referidos-app/src/legal/blocks/LegalFooter.jsx#L11).
- **Lo usa** [`LegalLayout`](../../../apps/referidos-app/src/legal/LegalLayout.jsx#L11) (renderiza).

### [`apps/referidos-app/src/legal/blocks/LegalHeader.jsx`](../../../apps/referidos-app/src/legal/blocks/LegalHeader.jsx#L1)

Muestra el encabezado común y guía el regreso desde la sección legal.

**Superficie que exporta.** [`LegalHeader`](../../../apps/referidos-app/src/legal/blocks/LegalHeader.jsx#L8).

**Módulos que lo cargan.** [`LegalLayout.jsx`](../../../apps/referidos-app/src/legal/LegalLayout.jsx#L2) (importa), [`index.js`](../../../apps/referidos-app/src/legal/index.js#L3) (reexporta LegalHeader).

**Dependencias del archivo.** `react`.

#### [`LOCALE_LABELS`](../../../apps/referidos-app/src/legal/blocks/LegalHeader.jsx#L3) · variable de módulo

Agrupa la configuración o catálogo de `LOCALE LABELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `es`, `en`.
- **Lo usa** [`LegalHeader`](../../../apps/referidos-app/src/legal/blocks/LegalHeader.jsx#L9) (accede al módulo).

#### [`LegalHeader`](../../../apps/referidos-app/src/legal/blocks/LegalHeader.jsx#L8) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, locale}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`toUpperCase`](../../../apps/referidos-app/src/legal/blocks/LegalHeader.jsx#L9).
- **Lo usa** [`LegalLayout`](../../../apps/referidos-app/src/legal/LegalLayout.jsx#L9) (renderiza).

### [`apps/referidos-app/src/legal/index.js`](../../../apps/referidos-app/src/legal/index.js#L1)

Punto de importación público de `legal`. Reexporta sus piezas para que un consumidor pueda importar desde la carpeta.

**Reexporta.** `LegalRouter` de [`default`](../../../apps/referidos-app/src/legal/LegalRouter.jsx), `LegalLayout` de [`default`](../../../apps/referidos-app/src/legal/LegalLayout.jsx), `LegalHeader` de [`default`](../../../apps/referidos-app/src/legal/blocks/LegalHeader.jsx), `LegalFooter` de [`default`](../../../apps/referidos-app/src/legal/blocks/LegalFooter.jsx), `LegalContent` de [`default`](../../../apps/referidos-app/src/legal/blocks/LegalContent.jsx), `TermsPage` de [`default`](../../../apps/referidos-app/src/legal/pages/TermsPage.jsx), `PrivacyPage` de [`default`](../../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx), `DataDeletionPage` de [`default`](../../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx).

El archivo participa como entrada, adaptador de imports o reexportación.

### [`apps/referidos-app/src/legal/LegalLayout.jsx`](../../../apps/referidos-app/src/legal/LegalLayout.jsx#L1)

Compone el marco común de documentos públicos y navegación legal.

**Superficie que exporta.** [`LegalLayout`](../../../apps/referidos-app/src/legal/LegalLayout.jsx#L5).

**Módulos que lo cargan.** [`LegalRouter.jsx`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L6) (importa), [`index.js`](../../../apps/referidos-app/src/legal/index.js#L2) (reexporta LegalLayout), [`DataDeletionPage.jsx`](../../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx#L2) (importa), [`PrivacyPage.jsx`](../../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx#L2) (importa), [`TermsPage.jsx`](../../../apps/referidos-app/src/legal/pages/TermsPage.jsx#L2) (importa).

**Dependencias del archivo.** `react`, [`./blocks/LegalHeader`](../../../apps/referidos-app/src/legal/blocks/LegalHeader.jsx), [`./blocks/LegalFooter`](../../../apps/referidos-app/src/legal/blocks/LegalFooter.jsx).

#### [`LegalLayout`](../../../apps/referidos-app/src/legal/LegalLayout.jsx#L5) · componente React · exportación por defecto

Monta `LegalHeader`, `LegalFooter`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, locale, children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `LegalHeader`, `LegalFooter`.
- **Usa código de** [`LegalHeader`](../../../apps/referidos-app/src/legal/blocks/LegalHeader.jsx#L8) (renderiza), [`LegalFooter`](../../../apps/referidos-app/src/legal/blocks/LegalFooter.jsx#L9) (renderiza).
- **Lo usa** [`LegalRouter`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L24) (renderiza), [`DataDeletionPage`](../../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx#L21) (renderiza), [`PrivacyPage`](../../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx#L21) (renderiza), [`TermsPage`](../../../apps/referidos-app/src/legal/pages/TermsPage.jsx#L21) (renderiza).

### [`apps/referidos-app/src/legal/LegalRouter.jsx`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L1)

Resuelve locale y documento de la URL para montar el contenido público.

**Superficie que exporta.** [`LegalRouter`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L17).

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-app/src/legal/index.js#L1) (reexporta LegalRouter), [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L36) (carga diferida).

**Dependencias del archivo.** `react`, `react-router-dom`, [`./pages/TermsPage`](../../../apps/referidos-app/src/legal/pages/TermsPage.jsx), [`./pages/PrivacyPage`](../../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx), [`./pages/DataDeletionPage`](../../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx), [`./LegalLayout`](../../../apps/referidos-app/src/legal/LegalLayout.jsx), [`./blocks/LegalContent`](../../../apps/referidos-app/src/legal/blocks/LegalContent.jsx).

#### [`DOC_PAGES`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L9) · variable de módulo

Agrupa la configuración o catálogo de `DOC PAGES` para que sus consumidores lean claves comunes.

- **Campos o contexto** `terms`, `privacy`, `data-deletion`.
- **Usa código de** [`TermsPage`](../../../apps/referidos-app/src/legal/pages/TermsPage.jsx#L16) (referencia), [`PrivacyPage`](../../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx#L16) (referencia), [`DataDeletionPage`](../../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx#L16) (referencia).
- **Lo usa** [`LegalRouter`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L20) (accede al módulo).

#### [`SUPPORTED_LOCALES`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L15) · variable de módulo

Conserva la lista de `SUPPORTED LOCALES` usada por el módulo.

- **Lo usa** [`LegalRouter`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L19) (accede al módulo).

#### [`LegalRouter`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L17) · componente React · exportación por defecto

Monta `LegalLayout`, `LegalContent`, `Page`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `LegalLayout`, `LegalContent`, `Page`.
- **Hooks que llama** `useParams`.
- **Condiciones que evalúa** `ausencia de Page`.
- **Usa código de** [`LegalLayout`](../../../apps/referidos-app/src/legal/LegalLayout.jsx#L5) (renderiza), [`Módulo`](../../../apps/referidos-app/src/legal/blocks/LegalContent.jsx#L1) (renderiza).
- **Llamadas directas en el cuerpo** [`SUPPORTED_LOCALES.includes`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L19).
- **Lo usa** [`LegalRouter`](../../../apps/referidos-app/src/routes.jsx#L36) (carga diferida).

### [`apps/referidos-app/src/legal/pages/DataDeletionPage.jsx`](../../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx#L1)

Selecciona y muestra la política e instrucciones de eliminación de datos.

**Superficie que exporta.** [`DataDeletionPage`](../../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx#L16).

**Módulos que lo cargan.** [`LegalRouter.jsx`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L5) (importa), [`index.js`](../../../apps/referidos-app/src/legal/index.js#L8) (reexporta DataDeletionPage).

**Dependencias del archivo.** `react`, [`../LegalLayout`](../../../apps/referidos-app/src/legal/LegalLayout.jsx), [`../blocks/LegalContent`](../../../apps/referidos-app/src/legal/blocks/LegalContent.jsx), [`@referidos/legal-content`](../../../packages/legal-content/src/index.js).

#### [`CONTENT`](../../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx#L6) · variable de módulo

Agrupa la configuración o catálogo de `CONTENT` para que sus consumidores lean claves comunes.

- **Campos o contexto** `es`, `en`.
- **Usa código de** [`getLegalMarkdown`](../../../packages/legal-content/src/index.js#L45) (llama).
- **Llamadas directas en el cuerpo** [`getLegalMarkdown`](../../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx#L7).
- **Lo usa** [`DataDeletionPage`](../../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx#L18) (accede al módulo).

#### [`TITLES`](../../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx#L11) · variable de módulo

Agrupa la configuración o catálogo de `TITLES` para que sus consumidores lean claves comunes.

- **Campos o contexto** `es`, `en`.
- **Lo usa** [`DataDeletionPage`](../../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx#L17) (accede al módulo).

#### [`DataDeletionPage`](../../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx#L16) · componente React · exportación por defecto

Monta `LegalLayout`, `LegalContent`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{locale}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `LegalLayout`, `LegalContent`.
- **Usa código de** [`LegalLayout`](../../../apps/referidos-app/src/legal/LegalLayout.jsx#L5) (renderiza), [`Módulo`](../../../apps/referidos-app/src/legal/blocks/LegalContent.jsx#L1) (renderiza).
- **Lo usa** [`DOC_PAGES`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L12) (referencia).

### [`apps/referidos-app/src/legal/pages/PrivacyPage.jsx`](../../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx#L1)

Selecciona y muestra el contenido vigente de privacidad desde el catálogo importado.

**Superficie que exporta.** [`PrivacyPage`](../../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx#L16).

**Módulos que lo cargan.** [`LegalRouter.jsx`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L4) (importa), [`index.js`](../../../apps/referidos-app/src/legal/index.js#L7) (reexporta PrivacyPage).

**Dependencias del archivo.** `react`, [`../LegalLayout`](../../../apps/referidos-app/src/legal/LegalLayout.jsx), [`../blocks/LegalContent`](../../../apps/referidos-app/src/legal/blocks/LegalContent.jsx), [`@referidos/legal-content`](../../../packages/legal-content/src/index.js).

#### [`CONTENT`](../../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx#L6) · variable de módulo

Agrupa la configuración o catálogo de `CONTENT` para que sus consumidores lean claves comunes.

- **Campos o contexto** `es`, `en`.
- **Usa código de** [`getLegalMarkdown`](../../../packages/legal-content/src/index.js#L45) (llama).
- **Llamadas directas en el cuerpo** [`getLegalMarkdown`](../../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx#L7).
- **Lo usa** [`PrivacyPage`](../../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx#L18) (accede al módulo).

#### [`TITLES`](../../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx#L11) · variable de módulo

Agrupa la configuración o catálogo de `TITLES` para que sus consumidores lean claves comunes.

- **Campos o contexto** `es`, `en`.
- **Lo usa** [`PrivacyPage`](../../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx#L17) (accede al módulo).

#### [`PrivacyPage`](../../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx#L16) · componente React · exportación por defecto

Monta `LegalLayout`, `LegalContent`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{locale}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `LegalLayout`, `LegalContent`.
- **Usa código de** [`LegalLayout`](../../../apps/referidos-app/src/legal/LegalLayout.jsx#L5) (renderiza), [`Módulo`](../../../apps/referidos-app/src/legal/blocks/LegalContent.jsx#L1) (renderiza).
- **Lo usa** [`DOC_PAGES`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L11) (referencia).

### [`apps/referidos-app/src/legal/pages/TermsPage.jsx`](../../../apps/referidos-app/src/legal/pages/TermsPage.jsx#L1)

Selecciona y muestra los términos desde el catálogo importado.

**Superficie que exporta.** [`TermsPage`](../../../apps/referidos-app/src/legal/pages/TermsPage.jsx#L16).

**Módulos que lo cargan.** [`LegalRouter.jsx`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L3) (importa), [`index.js`](../../../apps/referidos-app/src/legal/index.js#L6) (reexporta TermsPage).

**Dependencias del archivo.** `react`, [`../LegalLayout`](../../../apps/referidos-app/src/legal/LegalLayout.jsx), [`../blocks/LegalContent`](../../../apps/referidos-app/src/legal/blocks/LegalContent.jsx), [`@referidos/legal-content`](../../../packages/legal-content/src/index.js).

#### [`CONTENT`](../../../apps/referidos-app/src/legal/pages/TermsPage.jsx#L6) · variable de módulo

Agrupa la configuración o catálogo de `CONTENT` para que sus consumidores lean claves comunes.

- **Campos o contexto** `es`, `en`.
- **Usa código de** [`getLegalMarkdown`](../../../packages/legal-content/src/index.js#L45) (llama).
- **Llamadas directas en el cuerpo** [`getLegalMarkdown`](../../../apps/referidos-app/src/legal/pages/TermsPage.jsx#L7).
- **Lo usa** [`TermsPage`](../../../apps/referidos-app/src/legal/pages/TermsPage.jsx#L18) (accede al módulo).

#### [`TITLES`](../../../apps/referidos-app/src/legal/pages/TermsPage.jsx#L11) · variable de módulo

Agrupa la configuración o catálogo de `TITLES` para que sus consumidores lean claves comunes.

- **Campos o contexto** `es`, `en`.
- **Lo usa** [`TermsPage`](../../../apps/referidos-app/src/legal/pages/TermsPage.jsx#L17) (accede al módulo).

#### [`TermsPage`](../../../apps/referidos-app/src/legal/pages/TermsPage.jsx#L16) · componente React · exportación por defecto

Monta `LegalLayout`, `LegalContent`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{locale}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `LegalLayout`, `LegalContent`.
- **Usa código de** [`LegalLayout`](../../../apps/referidos-app/src/legal/LegalLayout.jsx#L5) (renderiza), [`Módulo`](../../../apps/referidos-app/src/legal/blocks/LegalContent.jsx#L1) (renderiza).
- **Lo usa** [`DOC_PAGES`](../../../apps/referidos-app/src/legal/LegalRouter.jsx#L10) (referencia).
