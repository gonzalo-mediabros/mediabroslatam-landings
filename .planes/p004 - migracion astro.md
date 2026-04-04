# PLAN p004: Migración y Estandarización de Landings en Astro

El propósito de este plan es llevar los archivos principales de la plataforma al nuevo estándar de diseño del proyecto (`design-system.md` global) implementando tokens de Tailwind CSS v4. La estandarización afectará en una primera fase a `index.astro` junto con sus componentes globales (`Header` y `Footer`). Seguidamente, durante una segunda fase, abordaremos la transformación y ensamble final de la referencia `index_3.html` hacia un archivo `index2.astro`, consolidando un código modular apoyado en Astro Pages y Custom Elements interactivos (`<m-container>`, `<m-row>`, `<m-col>`) dictados por astro-ui-builder.

- **Agentes involucrados:** astro-architect, astro-designer, astro-ui-builder, astro-page-builder, astro-reviewer.
- **Modelo recomendado:** Gemini 1.5 Pro — Se justifica su uso dadas las necesidades de razonamiento de refactorización tanto de layouts como de componentes a lo largo de este plan, así como el análisis del ecosistema actual de componentes.

---

## 1. Fase 1: Estandarización de `index.astro` y Componentes

- [x] **1.1. Refactorización del Componente: Header**
  - [x] 1.1.1. Auditar (`Read / Glob`) `src/components/landing/LandingHeader.astro` o equivalente.
  - [x] 1.1.2. Reemplazar valores de diseño estáticos por alias de `@theme` documentados (ej: `bg-brand`, `px-[--space-md]`).
  - [x] 1.1.3. Validar sintaxis, responsividad y modularidad.
- [x] **1.2. Refactorización del Componente: Footer**
  - [x] 1.2.1. Auditar (`Read / Glob`) `src/components/landing/LandingFooter.astro`.
  - [x] 1.2.2. Implementar los tokens de espaciado, jerarquías tipográficas y `@theme` pertinentes.
- [x] **1.3. Estandarización de la página `index.astro`**
  - [x] 1.3.1. Refactorizar el layout general incorporando Web Components para layouts (`<m-container>`, `<m-row>`).
  - [x] 1.3.2. Asegurar que las `section` apliquen separadores de comentarios `<!-- ----- NOMBRE ----- -->` e identidades `id` de forma universal.
  - [x] 1.3.3. Sustituir clases anticuadas por referencias Tailwind y `global.css` modernas puras.
  - [x] 1.3.4. Ejecutar el ciclo de `astro-reviewer` sobre el progreso del índice finalizado.

## 2. Fase 2: Transformación de `index_3.html` a `index2.astro`

> **Principio de aislamiento:** `index2.astro` es una landing independiente. Sus componentes NO deben compartirse ni modificarse junto con los de `index.astro`. Si algún componente existente sirve de base, se **copia** antes de modificar — nunca se toca el original.

- [x] **2.0. Preparación: Aislamiento de Componentes**
  - [x] 2.0.1. Auditar qué componentes de `index.astro` (Header, Footer, formularios, cards, etc.) podrían reutilizarse como punto de partida para esta landing.
  - [x] 2.0.2. Definir la estructura de carpeta para los componentes exclusivos de esta landing → `src/components/curso2/`.
  - [x] 2.0.3. Crear componentes propios (`CourseForm2.astro`, `Footer2.astro`) — originales no modificados.
- [x] **2.1. Configuración principal de `index2.astro`**
  - [x] 2.1.1. Generar la estructura base apoyada en `Layout.astro` con SEO via props title/description.
  - [x] 2.1.2. Ensamblar Header (`<header id="hero">`) y Footer (`Footer2`) propios de esta landing.
- [x] **2.2. Migración Layout Dinámico (Hero y Secciones Centrales)**
  - [x] 2.2.1. Mapear grid de `index_3.html` → Web Components `<m-container>` + CSS grid Tailwind.
  - [x] 2.2.2. Convertir tokens CSS legacy → `@theme` tokens (brand-dark, brand-blue, text-muted, radius-xl, etc.).
  - [x] 2.2.3. Crear `CourseForm2.astro` (dark glass style) — independiente de `CourseForm.astro`.
  - [x] Secciones implementadas: Hero, Trust, Problem, Bento Grid, Cert Strip, Info Cards, Final CTA, Promo Banner.
- [x] **2.3. Control QA y Estandarización Final**
  - [x] 2.3.1. Verificado via `git status`: ningún componente de `landing/` ni `index.astro` fue modificado.
  - [x] 2.3.2. Build pass: `astro build` completado sin errores — 8 páginas generadas incluyendo `/index2/`.

---

## Notas

- Debido a lineamientos de los agentes de Astro, este rediseño desechará por completo cualquier vestigio de `index.module.css` o CSS Modules, priorizando puras clases utilitarias de Token de Tailwind.
- En cada etapa (y tras modificaciones de layout) se debe verificar la persistencia de atributos semánticos clave e implementación de enlaces preexistentes.
