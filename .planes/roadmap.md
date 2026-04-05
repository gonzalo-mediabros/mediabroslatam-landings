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
- [ ] **PLAN 008: Correcciones Responsive index2.astro e index.astro**
  - [ ] Fase 1: Responsive de index2.astro (padding, beneficios, footer, colores promo, hero)
  - [ ] Fase 2: Responsive de index.astro (validacion global.css, footer, hero, beneficios)
  - [ ] Fase 3: Review visual y consolidacion de aprendizaje
- [ ] **PLAN 009: Ajustes en Landing Guia2**
  - [ ] Fase 1: Componente FaqAccordion
  - [ ] Fase 2: Correcciones en guia2.astro (Hero, Agitation, Offer y FAQ)
- [ ] Optimización de Performance y SEO.
