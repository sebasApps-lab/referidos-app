# Paquetes compartidos · legal-content

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`packages/legal-content/src/index.js`](../../../packages/legal-content/src/index.js#L1)
- [`packages/legal-content/src/LegalContent.jsx`](../../../packages/legal-content/src/LegalContent.jsx#L1)
- [`packages/legal-content/src/prelaunch.js`](../../../packages/legal-content/src/prelaunch.js#L1)

## Símbolos y conexiones

### [`packages/legal-content/src/index.js`](../../../packages/legal-content/src/index.js#L1)

Importa documentos de producto en es/en como raw. Resuelve claves y locales y exporta el renderer común.

**Superficie que exporta.** [`LEGAL_LOCALES`](../../../packages/legal-content/src/index.js#L34), [`LEGAL_DOC_KEYS`](../../../packages/legal-content/src/index.js#L35), [`normalizeLegalLocale`](../../../packages/legal-content/src/index.js#L37), [`normalizeLegalDoc`](../../../packages/legal-content/src/index.js#L41), [`getLegalMarkdown`](../../../packages/legal-content/src/index.js#L45).

**Módulos que lo cargan.** [`LegalContent.jsx`](../../../apps/referidos-app/src/legal/blocks/LegalContent.jsx#L1) (reexporta default), [`DataDeletionPage.jsx`](../../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx#L4) (importa), [`PrivacyPage.jsx`](../../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx#L4) (importa), [`TermsPage.jsx`](../../../apps/referidos-app/src/legal/pages/TermsPage.jsx#L4) (importa).

**Dependencias del archivo.** [`./LegalContent.jsx`](../../../packages/legal-content/src/LegalContent.jsx), [`../content/es/privacy.md?raw`](../../../packages/legal-content/content/es/privacy.md), [`../content/es/terms.md?raw`](../../../packages/legal-content/content/es/terms.md), [`../content/es/data-deletion.md?raw`](../../../packages/legal-content/content/es/data-deletion.md), [`../content/en/privacy.md?raw`](../../../packages/legal-content/content/en/privacy.md), [`../content/en/terms.md?raw`](../../../packages/legal-content/content/en/terms.md), [`../content/en/data-deletion.md?raw`](../../../packages/legal-content/content/en/data-deletion.md).

#### [`LEGAL_DOCS`](../../../packages/legal-content/src/index.js#L9) · variable de módulo

Agrupa la configuración o catálogo de `LEGAL DOCS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `privacy`, `terms`, `data-deletion`.
- **Usa código de** [`privacyEs`](../../../packages/legal-content/content/es/privacy.md) (referencia), [`privacyEn`](../../../packages/legal-content/content/en/privacy.md) (referencia), [`termsEs`](../../../packages/legal-content/content/es/terms.md) (referencia), [`termsEn`](../../../packages/legal-content/content/en/terms.md) (referencia), [`dataDeletionEs`](../../../packages/legal-content/content/es/data-deletion.md) (referencia), [`dataDeletionEn`](../../../packages/legal-content/content/en/data-deletion.md) (referencia).
- **Lo usa** [`LEGAL_DOC_KEYS`](../../../packages/legal-content/src/index.js#L35) (referencia), [`getLegalMarkdown`](../../../packages/legal-content/src/index.js#L48) (accede al módulo).

#### [`LEGAL_DOC_ALIASES`](../../../packages/legal-content/src/index.js#L24) · variable de módulo

Agrupa la configuración o catálogo de `LEGAL DOC ALIASES` para que sus consumidores lean claves comunes.

- **Campos o contexto** `privacy`, `privacidad`, `terms`, `terminos`, `data-deletion`, `delete-data`, `borrar-datos`.
- **Lo usa** [`normalizeLegalDoc`](../../../packages/legal-content/src/index.js#L42) (accede al módulo).

#### [`LEGAL_LOCALES`](../../../packages/legal-content/src/index.js#L34) · variable de módulo · exportado

Conserva la lista de `LEGAL LOCALES` usada por el módulo.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`LEGAL_DOC_KEYS`](../../../packages/legal-content/src/index.js#L35) · variable de módulo · exportado

Declara `LEGAL_DOC_KEYS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`normalizeLegalLocale`](../../../packages/legal-content/src/index.js#L37) · función · exportado

Normaliza `Legal Locale` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `locale = valor por defecto`.
- **Lo usa** [`getLegalMarkdown`](../../../packages/legal-content/src/index.js#L47) (llama).

#### [`normalizeLegalDoc`](../../../packages/legal-content/src/index.js#L41) · función · exportado

Normaliza `Legal Doc` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `doc = valor por defecto`.
- **Lo usa** [`getLegalMarkdown`](../../../packages/legal-content/src/index.js#L46) (llama).

#### [`getLegalMarkdown`](../../../packages/legal-content/src/index.js#L45) · función · exportado

Obtiene o resuelve `Legal Markdown` para entregarlo al consumidor.

- **Entradas** `doc`, `locale = valor por defecto`.
- **Llamadas directas en el cuerpo** [`normalizeLegalDoc`](../../../packages/legal-content/src/index.js#L46), [`normalizeLegalLocale`](../../../packages/legal-content/src/index.js#L47).
- **Lo usa** [`CONTENT`](../../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx#L7) (llama), [`CONTENT`](../../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx#L7) (llama), [`CONTENT`](../../../apps/referidos-app/src/legal/pages/TermsPage.jsx#L7) (llama).

### [`packages/legal-content/src/LegalContent.jsx`](../../../packages/legal-content/src/LegalContent.jsx#L1)

Renderiza el Markdown del catálogo en componentes web.

**Superficie que exporta.** [`LegalContent`](../../../packages/legal-content/src/LegalContent.jsx#L142).

**Módulos que lo cargan.** [`index.js`](../../../packages/legal-content/src/index.js#L1) (importa), [`prelaunch.js`](../../../packages/legal-content/src/prelaunch.js#L1) (importa).

**Dependencias del archivo.** `react`.

#### [`DEFAULT_MARKDOWN`](../../../packages/legal-content/src/LegalContent.jsx#L3) · variable de módulo

Declara `DEFAULT_MARKDOWN` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`parseMarkdown`](../../../packages/legal-content/src/LegalContent.jsx#L72) (referencia).

#### [`renderInlineMarkdown`](../../../packages/legal-content/src/LegalContent.jsx#L5) · función

Implementa `render Inline Markdown` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `text`, `keyPrefix = valor por defecto`.
- **Efectos y APIs** `parts.push`.
- **Condiciones que evalúa** `match.index`, `linkLabel y linkHref`, `boldText`, `codeText`, `italicText`, `lastIndex`.
- **Llamadas directas en el cuerpo** [`tokenPattern.exec`](../../../packages/legal-content/src/LegalContent.jsx#L13), [`parts.push`](../../../packages/legal-content/src/LegalContent.jsx#L17), [`value.slice`](../../../packages/legal-content/src/LegalContent.jsx#L17), [`test`](../../../packages/legal-content/src/LegalContent.jsx#L24).
- **Lo usa** [`flushList`](../../../packages/legal-content/src/LegalContent.jsx#L81) (llama), [`parseMarkdown`](../../../packages/legal-content/src/LegalContent.jsx#L109) (llama).

#### [`parseMarkdown`](../../../packages/legal-content/src/LegalContent.jsx#L71) · función

Extrae o interpreta `Markdown` de los argumentos, estado o datos de entrada.

- **Entradas** `text`.
- **Efectos y APIs** `listItems.push`, `blocks.push`.
- **Condiciones que evalúa** `ausencia de trimmed`, `trimmed.startsWith`.
- **Llamadas directas en el cuerpo** [`split`](../../../packages/legal-content/src/LegalContent.jsx#L72), [`lines.forEach`](../../../packages/legal-content/src/LegalContent.jsx#L92), [`line.trim`](../../../packages/legal-content/src/LegalContent.jsx#L93), [`flushList`](../../../packages/legal-content/src/LegalContent.jsx#L95), [`trimmed.startsWith`](../../../packages/legal-content/src/LegalContent.jsx#L99), [`listItems.push`](../../../packages/legal-content/src/LegalContent.jsx#L100), [`trimmed.slice`](../../../packages/legal-content/src/LegalContent.jsx#L100), [`blocks.push`](../../../packages/legal-content/src/LegalContent.jsx#L107), [`renderInlineMarkdown`](../../../packages/legal-content/src/LegalContent.jsx#L109).
- **Lo usa** [`content`](../../../packages/legal-content/src/LegalContent.jsx#L143) (llama).

#### [`flushList`](../../../packages/legal-content/src/LegalContent.jsx#L77) · función · dentro de [`parseMarkdown`](../../../packages/legal-content/src/LegalContent.jsx#L71)

Coordina `List` con la planificación o reintento del flujo.

- **Efectos y APIs** `blocks.push`.
- **Condiciones que evalúa** `ausencia de listItems.length`.
- **Llamadas directas en el cuerpo** [`listItems.map`](../../../packages/legal-content/src/LegalContent.jsx#L79), [`renderInlineMarkdown`](../../../packages/legal-content/src/LegalContent.jsx#L81), [`blocks.push`](../../../packages/legal-content/src/LegalContent.jsx#L84).
- **Lo usa** [`parseMarkdown`](../../../packages/legal-content/src/LegalContent.jsx#L95) (llama).

#### [`LegalContent`](../../../packages/legal-content/src/LegalContent.jsx#L142) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{markdown}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`index.js`](../../../packages/legal-content/src/index.js#L51) (referencia), [`prelaunch.js`](../../../packages/legal-content/src/prelaunch.js#L51) (referencia).

#### [`content`](../../../packages/legal-content/src/LegalContent.jsx#L143) · cálculo memorizado · dentro de [`LegalContent`](../../../packages/legal-content/src/LegalContent.jsx#L142)

Función auxiliar de `LegalContent` para `content`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`parseMarkdown`](../../../packages/legal-content/src/LegalContent.jsx#L143).
- **Lo usa** [`LegalContent`](../../../packages/legal-content/src/LegalContent.jsx#L144) (referencia).

### [`packages/legal-content/src/prelaunch.js`](../../../packages/legal-content/src/prelaunch.js#L1)

Resuelve los documentos legales de lista de espera. Usa fuente separada porque el tratamiento de datos y términos corresponde a otra superficie.

**Superficie que exporta.** [`LEGAL_LOCALES`](../../../packages/legal-content/src/prelaunch.js#L34), [`LEGAL_DOC_KEYS`](../../../packages/legal-content/src/prelaunch.js#L35), [`normalizeLegalLocale`](../../../packages/legal-content/src/prelaunch.js#L37), [`normalizeLegalDoc`](../../../packages/legal-content/src/prelaunch.js#L41), [`getLegalMarkdown`](../../../packages/legal-content/src/prelaunch.js#L45).

**Módulos que lo cargan.** [`LegalContent.jsx`](../../../apps/prelaunch/src/legal/blocks/LegalContent.jsx#L1) (reexporta default), [`helpCenterArticles.js`](../../../apps/prelaunch/src/legal/helpCenterArticles.js#L1) (importa), [`DataDeletionPage.jsx`](../../../apps/prelaunch/src/legal/pages/DataDeletionPage.jsx#L4) (importa), [`PrivacyPage.jsx`](../../../apps/prelaunch/src/legal/pages/PrivacyPage.jsx#L4) (importa), [`TermsPage.jsx`](../../../apps/prelaunch/src/legal/pages/TermsPage.jsx#L4) (importa), [`LegalDocPage.jsx`](../../../apps/prelaunch/src/waitlist/legal/LegalDocPage.jsx#L4) (importa), [`LegalSimplePage.jsx`](../../../apps/prelaunch/src/waitlist/legal/LegalSimplePage.jsx#L4) (importa).

**Dependencias del archivo.** [`./LegalContent.jsx`](../../../packages/legal-content/src/LegalContent.jsx), [`../content/es/politicas-privacidad-lista.md?raw`](../../../packages/legal-content/content/es/politicas-privacidad-lista.md), [`../content/es/terminos-condiciones-lista.md?raw`](../../../packages/legal-content/content/es/terminos-condiciones-lista.md), [`../content/es/borrar-correo-lista.md?raw`](../../../packages/legal-content/content/es/borrar-correo-lista.md).

#### [`LEGAL_DOCS`](../../../packages/legal-content/src/prelaunch.js#L6) · variable de módulo

Agrupa la configuración o catálogo de `LEGAL DOCS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `politicas-privacidad-lista`, `terminos-condiciones-lista`, `borrar-correo-lista`.
- **Usa código de** [`privacyListEs`](../../../packages/legal-content/content/es/politicas-privacidad-lista.md) (referencia), [`termsListEs`](../../../packages/legal-content/content/es/terminos-condiciones-lista.md) (referencia), [`deleteListEs`](../../../packages/legal-content/content/es/borrar-correo-lista.md) (referencia).
- **Lo usa** [`LEGAL_DOC_KEYS`](../../../packages/legal-content/src/prelaunch.js#L35) (referencia), [`getLegalMarkdown`](../../../packages/legal-content/src/prelaunch.js#L48) (accede al módulo).

#### [`LEGAL_DOC_ALIASES`](../../../packages/legal-content/src/prelaunch.js#L21) · variable de módulo

Agrupa la configuración o catálogo de `LEGAL DOC ALIASES` para que sus consumidores lean claves comunes.

- **Campos o contexto** `privacy`, `privacidad`, `terms`, `terminos`, `data-deletion`, `delete-data`, `borrar-datos`, `politicas-privacidad-lista`, `terminos-condiciones-lista`, `borrar-correo-lista`.
- **Lo usa** [`normalizeLegalDoc`](../../../packages/legal-content/src/prelaunch.js#L42) (accede al módulo).

#### [`LEGAL_LOCALES`](../../../packages/legal-content/src/prelaunch.js#L34) · variable de módulo · exportado

Conserva la lista de `LEGAL LOCALES` usada por el módulo.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`LEGAL_DOC_KEYS`](../../../packages/legal-content/src/prelaunch.js#L35) · variable de módulo · exportado

Declara `LEGAL_DOC_KEYS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`normalizeLegalLocale`](../../../packages/legal-content/src/prelaunch.js#L37) · función · exportado

Normaliza `Legal Locale` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `locale = valor por defecto`.
- **Lo usa** [`getLegalMarkdown`](../../../packages/legal-content/src/prelaunch.js#L47) (llama).

#### [`normalizeLegalDoc`](../../../packages/legal-content/src/prelaunch.js#L41) · función · exportado

Normaliza `Legal Doc` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `doc = valor por defecto`.
- **Lo usa** [`getLegalMarkdown`](../../../packages/legal-content/src/prelaunch.js#L46) (llama).

#### [`getLegalMarkdown`](../../../packages/legal-content/src/prelaunch.js#L45) · función · exportado

Obtiene o resuelve `Legal Markdown` para entregarlo al consumidor.

- **Entradas** `doc`, `locale = valor por defecto`.
- **Llamadas directas en el cuerpo** [`normalizeLegalDoc`](../../../packages/legal-content/src/prelaunch.js#L46), [`normalizeLegalLocale`](../../../packages/legal-content/src/prelaunch.js#L47).
- **Lo usa** [`LEGAL_ARTICLES`](../../../apps/prelaunch/src/legal/helpCenterArticles.js#L8) (llama), [`CONTENT`](../../../apps/prelaunch/src/legal/pages/DataDeletionPage.jsx#L7) (llama), [`CONTENT`](../../../apps/prelaunch/src/legal/pages/PrivacyPage.jsx#L7) (llama), [`CONTENT`](../../../apps/prelaunch/src/legal/pages/TermsPage.jsx#L7) (llama), [`LEGAL_DOCS`](../../../apps/prelaunch/src/waitlist/legal/LegalDocPage.jsx#L10) (llama), [`LEGAL_DOCS`](../../../apps/prelaunch/src/waitlist/legal/LegalSimplePage.jsx#L10) (llama).
