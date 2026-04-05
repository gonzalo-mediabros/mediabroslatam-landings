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
- [ ] **PLAN 012: Estilos Landing Auditoría**
  - [ ] Fase 1: Arquitectura Base, Header/Footer y Hero
  - [ ] Fase 2: Lo que vas a recibir y ¿Cómo Funciona?
  - [ ] Fase 3: Trust (Testimonios), FAQ y CTA Bottom
- [ ] Optimización de Performance y SEO.
