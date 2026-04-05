# PLAN p008: Correcciones Responsive en index2.astro e index.astro

Corregir los problemas de diseño responsive en las dos landing pages activas del proyecto. Se trabaja una pagina a la vez: primero `index2.astro` (que tiene mas problemas identificados), luego `index.astro` (que comparte algunos patrones pero tiene estructura diferente).

- **Agents:** astro-designer, astro-ui-builder, astro-reviewer
- **Skills/Tools:** Tailwind CSS v4, @theme tokens, Web Components (m-container, m-row, m-col)
- **Recommended-IA:** Sonnet -- balance entre velocidad y calidad para cambios CSS puntuales. Opus solo si hay decisiones de arquitectura en global.css que afecten ambas landings.

---

## 1. Fase 1: Responsive de index2.astro

- **Agents:** astro-designer (decisiones de diseno), astro-ui-builder (implementacion)
- **Skills/Tools:** Tailwind responsive utilities, @theme tokens
- **Recommended-IA:** Sonnet

- [x] **1.1. Reducir padding acumulado en mobile**
  - Problema: `section { padding: 6rem 1rem; }` en `global.css` (linea 88) + `m-container { padding: 0 1.5rem; }` (linea 100) = 2.5rem de padding lateral combinado. Excesivo en pantallas chicas.
  - [x] 1.1.1. En `global.css`, cambiar el padding de `section` a responsive: `padding: 3rem 0.75rem;` para mobile, y restaurar `6rem 1rem` desde `md:` via media query.
  - [x] 1.1.2. Reducir el padding de `m-container` en mobile: `padding: 0 0.75rem;` base, `1.5rem` desde `md:`. Media query en `global.css`.
  - [x] 1.1.3. Padding combinado en mobile queda ~1.5rem total (0.75 + 0.75).
  - Archivos: `src/styles/global.css`

- [x] **1.2. Reducir spacing vertical entre secciones en mobile**
  - [x] 1.2.1. Resuelto en 1.1.1: padding vertical `3rem` mobile, `6rem` desktop.
  - [x] 1.2.2. Secciones con override de padding (py-16, pt-8, pb-0, pb-8) no entran en conflicto: sus clases Tailwind sobreescriben el base CSS.
  - Archivos: `src/styles/global.css`

- [x] **1.3. Corregir seccion #beneficios en mobile**
  - [x] 1.3.1. `m-row` cambiado a `flex-col md:flex-row flex-wrap`.
  - [x] 1.3.2. Cada `m-col` tiene `md:flex-[1_1_45%]` para grilla 2x2 en desktop y stack vertical en mobile.
  - Archivos: `src/pages/index2.astro`

- [x] **1.4. Corregir Footer2 en mobile**
  - [x] 1.4.1. col1: `items-center md:items-start`; col3: `items-center md:items-end`.
  - [x] 1.4.2. col3: `text-center md:text-right max-w-full md:max-w-[280px]`.
  - [x] 1.4.3. `gap-6` → `gap-8`.
  - Archivos: `src/components/curso2/Footer2.astro`

- [x] **1.5. Corregir colores en seccion #promo**
  - [x] 1.5.1. Over-title: `text-[#bfdbfe]` → `text-green`.
  - [x] 1.5.2. Boton: `bg-white text-brand-blue` → `bg-green text-brand-dark`.
  - Archivos: `src/pages/index2.astro`

- [x] **1.6. Corregir blob decorativo del Hero en mobile**
  - [x] 1.6.1. Blob oculto en mobile con `hidden md:block`. El `overflow-hidden` del header ya contenía cualquier overflow.
  - Archivos: `src/pages/index2.astro`

- [x] **1.7. Revisar Hero layout en mobile**
  - [x] 1.7.1. Imagen hero: `mb-4 -ml-8 w-[calc(100%+120px)]` → `mb-4 ml-0 w-full md:-ml-8 md:w-[calc(100%+120px)]`.
  - [x] 1.7.2. `m-row flex-col lg:flex-row` ya stackea correctamente en mobile.
  - Archivos: `src/pages/index2.astro`

---

## 2. Fase 2: Responsive de index.astro

- **Agents:** astro-designer, astro-ui-builder
- **Skills/Tools:** Tailwind responsive utilities, @theme tokens
- **Recommended-IA:** Sonnet

- [x] **2.1. Validar que cambios de global.css (Fase 1) se aplican bien**
  - [x] 2.1.1. Revisar padding lateral y vertical en todas las secciones de index.astro tras los cambios de `section` y `m-container` en global.css.
  - [x] 2.1.2. Verificar secciones con overrides propios (`py-16`, `py-24`, `py-24 md:py-32`, etc.) y ajustar si el nuevo base genera conflictos. — Sin conflictos: las clases Tailwind sobreescriben el `@layer base`.
  - Archivos: `src/pages/index.astro`

- [x] **2.2. Corregir LandingFooter en mobile**
  - Problema: Identico a Footer2 (misma estructura y clases). Aplicar los mismos fixes.
  - [x] 2.2.1. Replicar los cambios de 1.4 en `LandingFooter.astro`: `gap-8`, col1 `items-center md:items-start`, col3 `items-center md:items-end`, `text-center md:text-right max-w-full md:max-w-[280px]`.
  - Archivos: `src/components/landing/LandingFooter.astro`

- [x] **2.3. Verificar seccion #beneficios de index.astro**
  - Esta seccion usa `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` con BenefitCard.astro. Funciona correctamente.
  - [x] 2.3.1. Grid stackea 1 col mobile, 2 cols tablet, 4 cols desktop. OK.
  - [x] 2.3.2. Padding de BenefitCard reducido a `p-6 md:p-8` para mobile.
  - Archivos: `src/pages/index.astro` (lineas 245-291), `src/components/landing/BenefitCard.astro`

- [x] **2.4. Revisar Hero de index.astro en mobile**
  - Layout diferente a index2: usa `grid lg:grid-cols-12` con imagen a la derecha.
  - [x] 2.4.1. Imagen hero: `max-w-none` cambiado a `max-w-full lg:max-w-none`. Ya no desborda en mobile.
  - [x] 2.4.2. Formulario flotante `#registro` con `-mt-24 lg:-mt-28` y `px-6` funciona bien en mobile. Sin cambios necesarios.
  - Archivos: `src/pages/index.astro` (lineas 14-81)

- [ ] **2.5. Revisar seccion #promo de index.astro**
  - [ ] 2.5.1. Si los mismos cambios de color verde aplican a esta landing, implementarlos. **Pendiente: confirmar con el usuario.**
  - [x] 2.5.2. Border-radius cambiado a `rounded-xl md:rounded-[2.5rem]` para reducir en mobile. Padding `p-8 md:p-14` ya era responsive.
  - Archivos: `src/pages/index.astro` (lineas 325-361)

- [x] **2.6. Revisar seccion #problema en mobile**
  - [x] 2.6.1. Titulos con `text-4xl md:text-5xl lg:text-6xl` se ven correctamente en mobile.
  - [x] 2.6.2. Sin padding lateral excesivo: `section` no tiene padding lateral, `m-container` maneja `1.25rem` mobile. OK.
  - Archivos: `src/pages/index.astro` (lineas 97-125)

---

## 3. Fase 3: Review y consolidacion

- **Agents:** astro-reviewer
- **Skills/Tools:** Browser testing, visual diff
- **Recommended-IA:** Sonnet para review rapido, Opus si hay decisiones de rollback

- [ ] **3.1. Review visual completo**
  - [ ] 3.1.1. Testear ambas landings en viewports: 375px (mobile), 768px (tablet), 1024px (desktop small), 1440px (desktop).
  - [ ] 3.1.2. Verificar que ningun contenido desborde horizontalmente en ninguna resolucion.
  - [ ] 3.1.3. Verificar legibilidad de textos y contraste de colores (especialmente el verde #c9ff93).

- [ ] **3.2. Consolidar aprendizaje**
  - [ ] 3.2.1. Documentar en CLAUDE.md o en un archivo de feedback los patrones responsive que funcionaron:
    - Media queries en global.css para Web Components
    - Patron de padding responsive para section y m-container
    - Cuando usar grid vs m-row/m-col para cards responsive
  - [ ] 3.2.2. Definir si los valores responsive de global.css deben convertirse en @theme tokens nuevos (ej: `--spacing-section-mobile`, `--spacing-section-desktop`).
  - [ ] 3.2.3. Actualizar `.planes/roadmap.md`.

---

## Notas

### Cambios en global.css = impacto global
Los cambios en `section` y `m-container` de `global.css` afectan AMBAS landings y cualquier pagina futura. Hay que ser conservador. La Fase 1 modifica global.css y la Fase 2 valida el impacto en la segunda landing.

### Orden de ejecucion sugerido
1. Empezar por 1.1 y 1.2 (padding global) -- son los cambios mas impactantes.
2. Luego 1.5 (colores promo) -- es un fix puntual y rapido.
3. Luego 1.3 (beneficios cards) y 1.4 (footer) -- componentes especificos.
4. Finalmente 1.6 y 1.7 (hero) -- requieren mas testing visual.

### Web Components y responsive
Los elementos `m-container`, `m-row`, `m-col` se estilan en CSS puro en global.css. No aceptan Tailwind utilities responsive directamente en su definicion base. Para responsive hay dos opciones:
- Media queries en global.css (para cambios que aplican globalmente).
- Tailwind classes en el uso del componente (`<m-row class="flex-col md:flex-row">`), que overridean el CSS base.

### Componentes independientes
Footer2.astro y LandingFooter.astro son copias independientes. Los fixes se aplican por separado en cada archivo, respetando la regla de aislamiento de componentes del proyecto.

> PLANIFICACION COMPLETADA: No se debe avanzar con la fase de ejecucion hasta que el Usuario de manera explicita apruebe este documento y autorice el inicio de la misma.
