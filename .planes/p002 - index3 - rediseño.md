# PLAN [P002]: Rediseño index3.html

Este plan detalla el rediseño disruptivo de `index3.html` manteniendo la integridad del contenido original de `index2.html`. El objetivo es elevar la estética a un estándar "Expert Marketing" mediante layouts asimétricos y Bento Grids.

- **Agentes:** `astro-designer`, `astro-ui-builder`
- **Skills:** `ui-ux-pro-max`
- **Modelo Recomendado:** **Gemini Pro (High Reasoning/Ultra)** para precisión en jerarquía visual.

---

## 1. Fase 1: Estructura y Branding

- [x] **1.1. Creación de `index3.html`**
  - [x] 1.1.1. Importar estilos `index2.html` (variables y resets).
  - [x] 1.1.2. Estructura base HTML5 semántica.
- [x] **1.2. Extracción y Mapeo de Contenido**
  - [x] 1.2.1. Asegurar transferencia 1:1 de texto desde `index2.html`.
  - [x] 1.2.2. Preservar logos corporativos y sistema de iconos.

## 2. Fase 2: Layout Innovador (Expert Marketing)

- [x] **2.1. Hero Asimétrico (60/40)**
  - [x] 2.1.1. Lado izquierdo: Tipografía masiva para propuesta de valor.
  - [x] 2.1.2. Lado derecho: Formulario integrado en una "Action Card" con glassmorphism.
- [x] **2.2. Bento Grid Layout**
  - [x] 2.2.1. Secciones modulare para "Sobre el curso" y "Beneficios".
  - [x] 2.2.2. Reestructurar listas en bloques de impacto visual variado.
- [x] **2.3. Sección de Problema**
  - [x] 2.3.1. Diseño tipográfico de alto peso visual.
  - [x] 2.3.2. Divider azul de autoridad Mediabros.

## 3. Fase 3: Correcciones Visuales y Pulido de Alta Calidad

> **Directriz general:** Cada corrección debe ejecutarse con **alta calidad visual**. No se buscan parches simples ni fixes mínimos. El objetivo es una **web moderna, con estilo y nivel profesional**. Cada punto debe elevar el diseño, no solo repararlo.
>
> **Skills recomendados:** `ui-ux-pro-max` para decisiones de diseño, `astro-designer` + `astro-ui-builder` para implementación.

### 3.1. Hero — Título H1 (distribución de líneas)

- [x] 3.1.1. Quitar el `<br>` forzado que causa que una palabra corta ("tus") quede sola en una línea.
- [x] 3.1.2. Aplicar `text-wrap: balance` + `max-width: 600px` para distribución equilibrada.
- [x] 3.1.3. Validar en múltiples viewports que nunca quede una palabra sola en una línea.

### 3.2. Hero — Reintegrar imagen `hero-img.png`

- [x] 3.2.1. **Decisión de diseño (ui-ux-pro-max):** Imagen colocada debajo del subtítulo en el lado izquierdo del hero. Se oculta en mobile para priorizar título > form.
- [x] 3.2.2. Implementar con `drop-shadow` y `border-radius` para integración visual.
- [x] 3.2.3. Hidden en mobile (`display: none` bajo 1023px), prioridad: título > form > imagen.

### 3.3. Sección "Fórmula del éxito" — Imagen `iconos.png`

- [x] 3.3.1. Quitar `opacity: 0.4` → opacidad 100%.
- [x] 3.3.2. Quitar `max-height: 2.5rem` → nuevo `max-height: 4rem` legible.
- [x] 3.3.3. Eliminados hover effects de opacidad innecesarios.

### 3.4. Sección "Certificaciones" — Imagen `badges.jpg`

- [x] 3.4.1. Eliminado `bento-cert` del bento grid.
- [x] 3.4.2. Creada sección dedicada `cert-strip` horizontal entre bento e info-cards.
- [x] 3.4.3. Imagen a `max-width: 600px` con label superior, centrada, full legible.

### 3.5. Cuadro destacado — Reemplazo del quote con comillas

- [x] 3.5.1. Comillas eliminadas del bloque `bento-quote`.
- [x] 3.5.2. Nuevo texto: **"Generación de leads con método, foco y resultados medibles"**.
- [x] 3.5.3. Texto viejo integrado como tercer párrafo en `bento-main`.
- [x] 3.5.4. Estilo cambiado de italic/light a bold/tracking para statement fuerte.

### 3.6. CTA Section — Portar diseño superior de `index2.html`

- [x] 3.6.1. Fondo cambiado a **dark** (`--brand-dark`).
- [x] 3.6.2. Glows radiales (azul + violeta) agregados.
- [x] 3.6.3. Avatar group con social proof visual implementado.
- [x] 3.6.4. Botón azul `.btn-cta` con hover, shadow y alto contraste.
- [x] 3.6.5. Profundidad visual y social proof al nivel de index2.

### 3.7. Promo Banner — Correcciones visuales

- [x] 3.7.1. `box-shadow` eliminado de la imagen.
- [x] 3.7.2. `padding-bottom: 0; padding-right: 0` aplicado.
- [x] 3.7.3. SVG decorativo (`promo-bg-svg`) agregado como en index2.
- [x] 3.7.4. `border-radius` eliminado de la imagen.

## 4. Fase 4: Optimización Responsiva

- [ ] **4.1. Adaptación mobile**
  - [ ] 4.1.1. Validar todos los cambios de Fase 3 en mobile y tablet.
  - [ ] 4.1.2. Bento Grid → layout 1 columna en mobile.
  - [ ] 4.1.3. Hero → stack vertical (título > imagen > form).
- [ ] **4.2. Legibilidad**
  - [ ] 4.2.1. Asegurar tipografía legible en todos los tamaños.
  - [ ] 4.2.2. Verificar contraste y accesibilidad básica.
