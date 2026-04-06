# Roadmap: Mediabros Landings Redesign

## Fase 1: Diseño Raw (HTML/CSS)

- [x] **`index2.html`**: Diseño de referencia aprobado.
- [x] **`index3.html`**: Rediseño innovador (En ejecución).
  - [x] Definición de layout.
  - [x] Maquetación HTML/CSS.
  - [x] Refinamiento UI.

## Fase 2: Migración a Astro

- [x] Componentización de UI Builder.
- [x] **PLAN 004: Estandarización `index.astro`**
  - [x] Header
  - [x] Footer
  - [x] Landing Principal
- [x] **PLAN 004: Conversión `index_3.html` a `index2.astro`**
  - [x] Setup base
  - [x] Layout & Secciones
- [x] **PLAN 005: Corrección Redondeos Globales**
  - [x] Actualización `global.css`
  - [x] Refactorización `index2.astro` y componentes.
- [x] **PLAN 006: Reestructuración Layout Semántico**
  - [x] Refactorización `#hero` y `#problem` a `<m-row>`
  - [x] Corrección `#bento` y `#info-cards` a `<m-row>`
- [x] **PLAN 007: Ajuste de detalles y dimensiones**
  - [x] Alineación de Web Components y `@theme` en `global.css`
  - [x] Refinamiento de variables y Flexbox en `index2.astro`
  - [x] Actualización de directrices arquitectónicas
- [x] **PLAN 008: Correcciones Responsive index2.astro e index.astro**
  - [x] Fase 1: Responsive de index2.astro (padding, beneficios, footer, colores promo, hero)
  - [x] Fase 2: Responsive de index.astro (validacion global.css, footer, hero, beneficios)
  - [x] Fase 3: Review visual y consolidacion de aprendizaje
- [x] **PLAN 009: Ajustes en Landing Guia2**
  - [x] Fase 1: Componente FaqAccordion
  - [x] Fase 2: Correcciones en guia2.astro (Hero, Agitation, Offer y FAQ)
- [x] **PLAN 010: Extracción de Componentes Reutilizables en index2.astro**
  - [x] Fase 1: Creación de Componentes (Chip2 y BenefitCard2)
  - [x] Fase 2: Implementación y Refactorización
- [x] **PLAN 011: Ajustes en Landing Diagnostico**
  - [x] Fase 1: Hero y Agitation (Reestructuración, Formulario, Chip y Bridge integrado)
  - [x] Fase 2: Expectations (2 columnas, icono izquierda), Audience y Faqs (Componente FAQ de guia)
  - [x] Fase 3: Testimonios (Card con video) y Bonus (quitar verde)
- [x] **PLAN 012: Estilos Landing Auditoría**
  - [x] Fase 1: Arquitectura Base, Header/Footer y Hero
  - [x] Fase 2: Lo que vas a recibir y ¿Cómo Funciona?
  - [x] Fase 3: Trust (Testimonios), FAQ y CTA Bottom
- [x] **PLAN 013: Subrayado de Ruta Actual en Navegación**
  - [x] Fase 1: Implementación en Layout.astro (Dev Nav)
  - [x] Fase 2: Implementación en Header.astro (Navegación Principal)
- [ ] Optimización de Performance y SEO.
- [ ] **PLAN 017: SEO Audit & Control de Indexación** (Fase 1 completada)

## Fase 3: Unificacion y Pulido (PLAN MAESTRO - PLAN.md)

- [x] **FASE 0: Limpieza previa**
  - [x] Eliminar componentes huerfanos (8 archivos)
  - [x] Fix index2.astro contenido fuera de Layout
  - [x] Fix auditoria.astro title prop
  - [x] Eliminar clases redundantes en m-container

- [x] **FASE 1: Componentes UI compartidos**
  - [x] FaqAccordion unificado (3 copias -> 1)
  - [x] Chip unificado (3 copias -> 1)
  - [x] Footer unificado (5 inline + 2 components -> 1)
  - [x] BenefitCard unificado (4 versiones -> 1)

- [x] **FASE 2: Formularios**
  - [x] LeadForm.astro (Componente unificado con theme prop)

- [ ] **FASE 3: Design tokens y consistencia visual**
  - [ ] Border-radius con tokens --radius-md/lg/xl
  - [ ] Logo sizes estandarizados
  - [ ] Spacing entre secciones
  - [ ] Glow/gradient patterns

- [ ] **FASE 4: Estructura y layout**
  - [ ] index.astro: hero, form section, course section
  - [ ] diagnostico.astro: agitation section
  - [ ] auditoria.astro: process section, testimonials grid bug

- [ ] **FASE 5: Pulido final**
  - [ ] Revision de heroes
  - [ ] Revision de cards
  - [ ] Revision responsive
  - [ ] Verificacion final (build, imports, IDs)
