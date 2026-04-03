# PLAN p004: Migración y Estandarización de Landings en Astro

El propósito de este plan es llevar los archivos principales de la plataforma al nuevo estándar de diseño del proyecto (`design-system.md` global) implementando tokens de Tailwind CSS v4. La estandarización afectará en una primera fase a `index.astro` junto con sus componentes globales (`Header` y `Footer`). Seguidamente, durante una segunda fase, abordaremos la transformación y ensamble final de la referencia `index_3.html` hacia un archivo `index2.astro`, consolidando un código modular apoyado en Astro Pages y Custom Elements interactivos (`<m-container>`, `<m-row>`, `<m-col>`) dictados por astro-ui-builder.

- **Agentes involucrados:** astro-architect, astro-designer, astro-ui-builder, astro-page-builder, astro-reviewer.
- **Modelo recomendado:** Gemini 1.5 Pro — Se justifica su uso dadas las necesidades de razonamiento de refactorización tanto de layouts como de componentes a lo largo de este plan, así como el análisis del ecosistema actual de componentes.

---

## 1. Fase 1: Estandarización de `index.astro` y Componentes

- [ ] **1.1. Refactorización del Componente: Header**
  - [ ] 1.1.1. Auditar (`Read / Glob`) `src/components/landing/LandingHeader.astro` o equivalente.
  - [ ] 1.1.2. Reemplazar valores de diseño estáticos por alias de `@theme` documentados (ej: `bg-brand`, `px-[--space-md]`).
  - [ ] 1.1.3. Validar sintaxis, responsividad y modularidad.
- [ ] **1.2. Refactorización del Componente: Footer**
  - [ ] 1.2.1. Auditar (`Read / Glob`) `src/components/landing/LandingFooter.astro`.
  - [ ] 1.2.2. Implementar los tokens de espaciado, jerarquías tipográficas y `@theme` pertinentes.
- [ ] **1.3. Estandarización de la página `index.astro`**
  - [ ] 1.3.1. Refactorizar el layout general incorporando Web Components para layouts (`<m-container>`, `<m-row>`).
  - [ ] 1.3.2. Asegurar que las `section` apliquen separadores de comentarios `<!-- ----- NOMBRE ----- -->` e identidades `id` de forma universal.
  - [ ] 1.3.3. Sustituir clases anticuadas por referencias Tailwind y `global.css` modernas puras.
  - [ ] 1.3.4. Ejecutar el ciclo de `astro-reviewer` sobre el progreso del índice finalizado.

## 2. Fase 2: Transformación de `index_3.html` a `index2.astro`

- [ ] **2.1. Configuración principal de `index2.astro`**
  - [ ] 2.1.1. Generar la estructura base apoyada en `Layout.astro` configurando el componente transversal `SEO.astro`.
  - [ ] 2.1.2. Ensamblar los componentes globales refactorizados (Header / Footer).
- [ ] **2.2. Migración Layout Dinámico (Hero y Secciones Centrales)**
  - [ ] 2.2.1. Mapear la cuadrícula del grid de `index_3.html` en las equivalencias modulares (Web Components + `.astro`).
  - [ ] 2.2.2. Convertir valores de margen y grid/columnas heredados al sistema de tokens de Tailwind.
- [ ] **2.3. Control QA y Estandarización Final**
  - [ ] 2.3.1. Requerir invocación del agente `astro-reviewer.md` para garantizar sanidad y validación de todas la implementaciones (paths sin baseURL, @theme, build pass).

---

## Notas

- Debido a lineamientos de los agentes de Astro, este rediseño desechará por completo cualquier vestigio de `index.module.css` o CSS Modules, priorizando puras clases utilitarias de Token de Tailwind.
- En cada etapa (y tras modificaciones de layout) se debe verificar la persistencia de atributos semánticos clave e implementación de enlaces preexistentes.
