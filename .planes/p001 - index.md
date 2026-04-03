# PLAN.md — Mediabros Landings
> Fuente de verdad para todos los agentes. Leer completo antes de empezar.

---

## Contexto del proyecto

- Cliente: **Mediabros** — agencia de marketing digital, Argentina/LATAM
- Stack: **Astro 5** + CSS Modules + custom elements (`m-container`, `m-row`, `m-col`)
- Deploy: **GitHub Pages** via `gh-pages`
- URL temporal: `https://gonzalo-mediabros.github.io/mediabroslatam-landings/`
- Fuentes globales: **Inter** (body) + **Red Hat Display** (headings)

---

## Estado actual de archivos

| Archivo | Estado |
|---|---|
| `src/pages/index.astro` | Landing vieja — **NO tocar** |
| `src/pages/index.module.css` | Estilos de index.astro — **NO tocar** |
| `src/pages/index2.html` | **Diseño de referencia aprobado** — solo lectura |
| `src/pages/index2.astro` | 🎯 TARGET — crear en PASO 2 |
| `src/pages/index2.module.css` | 🎯 TARGET — crear en PASO 2 |
| `src/pages/auditoria.astro` | Sistema viejo — pendiente fase posterior |
| `src/pages/diagnostico.astro` | Sistema viejo — pendiente fase posterior |
| `src/pages/guia.astro` | Sistema viejo — pendiente fase posterior |
| `src/styles/global.css` | Design tokens globales — agregar tokens en PASO 1 |
| `src/components/landing/CourseForm.astro` | Formulario funcional — **solo REUSAR** |
| `src/components/landing/BenefitCard.astro` | 🎯 TARGET — crear en PASO 1 |
| `src/components/landing/CheckItemSvg.astro` | 🎯 TARGET — crear en PASO 1 |
| `src/components/landing/LandingFooter.astro` | 🎯 TARGET — crear en PASO 1 |

---

## Objetivo

Convertir `index2.html` a Astro respetando el diseño visual aprobado, pero con los estilos **optimizados y bien organizados**:

1. Los valores CSS hardcodeados en index2.html se mapean a **tokens CSS en `global.css`**
2. Los estilos que se repiten en varias secciones se consolidan en **reglas reutilizables**
3. Las clases utilitarias redundantes (`container`, `container-md`, `container-sm`) se unifican en el sistema `m-container` ya existente
4. No hay estilos inline ni estilos duplicados
5. Cada sección de la página tiene sus propios selectores en `index2.module.css`

---

## Tokens CSS nuevos (agregar a global.css en PASO 1)

Los colores de index2.html son distintos a los existentes. Agregar en el bloque `:root` de `src/styles/global.css` **sin modificar nada existente**:

```css
/* Tokens index2 / nuevo sistema */
--brand-dark: #141724;
--brand-blue: #1e88e5;
--brand-blue-hover: #1565c0;
--brand-graybg: #f8fafc;
--text-dark: #111827;
--text-muted: #6b7280;
--text-light: #9ca3af;
```

---

## Reglas de optimización de CSS (obligatorias para todos los agentes)

El CSS de `index2.html` tiene varios problemas a corregir durante la conversión:

### 1. Reemplazar valores hardcodeados por tokens
```css
/* ❌ Mal — como está en index2.html */
background-color: #141724;
color: #6b7280;

/* ✅ Bien — optimizado */
background-color: var(--brand-dark);
color: var(--text-muted);
```

### 2. Eliminar los `.container`, `.container-md`, `.container-sm` del HTML original
index2.html usa tres variantes de container con anchos distintos (1200px, 1152px, 896px).
En index2.astro se reemplazan así:
- `.container` (1200px) → `<m-container>` (ya definido en global.css, max-width 1452px — usar tal cual)
- `.container-md` y `.container-sm` → aplicar `max-width` directamente en el selector de sección en `index2.module.css`

### 3. Consolidar valores de transición
```css
/* ❌ Redundante — index2.html repite esta curva en cada componente */
transition: all 0.3s;
transition: all 0.2s;

/* ✅ Usar el token ya definido */
transition: all var(--transition-base); /* 0.35s cubic-bezier(0.4, 0, 0.2, 1) */
```

### 4. Consolidar border-radius repetidos
```css
/* ❌ Valores magic number dispersos */
border-radius: 1.5rem;
border-radius: 2rem;
border-radius: 2.5rem;

/* ✅ Usar tokens existentes */
border-radius: var(--radius-lg);   /* 24px */
border-radius: var(--radius-xl);   /* 32px */
```

### 5. No duplicar estilos de estados hover que ya cubren los componentes
Los componentes `BenefitCard` y `CheckItemSvg` llevan sus propios estilos internos — `index2.module.css` no debe redefinirlos.

---

## Secciones de index2.html (en orden)

| # | Sección | Fondo | Descripción |
|---|---|---|---|
| 1 | `.hero` | `var(--brand-dark)` | Glow radial azul, logo `logo.svg`, grid 12col, badge B2B con SVG icon, h1 con SVG underline decorativo, subtítulo, imagen `cursos.png` |
| 2 | `.form-section` | transparente | Formulario flotante sobre el hero con `margin-top: -6rem`. Card blanca con `backdrop-filter: blur(10px)` |
| 3 | `.logos-section` | `white` | Eyebrow "Fórmula del éxito", imagen `iconos.png` centrada |
| 4 | `.problem-section` | `var(--brand-graybg)` | h2 grande centrado, divider azul, subtítulo con SVG underline en la palabra "likes", párrafo |
| 5 | `.course-section` | `white` | Grid 12col (7+5): párrafos + blockquote; luego certifications con `badges.jpg` |
| 6 | `.info-cards-section` | `var(--brand-graybg)` | Grid 2col, 2 cards blancas con listas usando `CheckItemSvg` |
| 7 | `.benefits-section` | `white` | Grid 4col, 4 `BenefitCard` con Material Symbols icons |
| 8 | `.cta-section` | `var(--brand-dark)` | 2 glows decorativos (azul top-right + índigo bottom-left), h2, párrafo, botón CTA, social proof avatars |
| 9 | `.promo-section` | `var(--brand-graybg)` | Banner gradiente azul, texto izq + phone-mockup der (CSS puro, `rotate(-2deg)`) |
| 10 | `footer` | `white` | Logo + copyright — usar `LandingFooter` |

---

## Componentes a crear (PASO 1)

### `BenefitCard.astro`
**Ruta:** `src/components/landing/BenefitCard.astro`
**Props:** `icon: string`, `title: string`, `description: string`
**Visual:**
- Fondo blanco, `border-radius: var(--radius-lg)`, borde `1px solid #f3f4f6`
- Icon box: `width/height 3.5rem`, `border-radius: 1rem`, fondo `#eff6ff`, color `var(--brand-blue)`
- Hover en icon box: fondo `var(--brand-blue)`, color `white`
- Card hover: `translateY(-0.25rem)` + sombra
- Usar `<span class="material-symbols-outlined">` para el icon

### `CheckItemSvg.astro`
**Ruta:** `src/components/landing/CheckItemSvg.astro`
**Props:** `text: string`
**Visual:**
- `display: flex; gap: 1rem; align-items: flex-start`
- Icon: círculo `1.5rem`, fondo `#eff6ff`, color `var(--brand-blue)`, SVG checkmark inline `M5 13l4 4L19 7`
- Texto: `color: #4b5563; font-size: 1rem`

### `LandingFooter.astro`
**Ruta:** `src/components/landing/LandingFooter.astro`
**Props:** `year?: number`, `brand?: string`
**Visual:**
- `background: white; border-top: 1px solid #f3f4f6; padding: 2rem 0`
- Flex row (desktop) / column (mobile): logo `logo.svg` con `filter: grayscale(100%); opacity: 0.6` + texto copyright
- Logo: `${import.meta.env.BASE_URL}logo.svg`

---

## Plan por agente

### PASO 1 — `astro-ui-builder`

Lee este PLAN completo antes de empezar.

**Tareas:**
1. Agregar tokens CSS en `src/styles/global.css` (bloque `:root`, al final, sin tocar lo existente)
2. Crear `BenefitCard.astro` según especificación arriba
3. Crear `CheckItemSvg.astro` según especificación arriba
4. Crear `LandingFooter.astro` según especificación arriba

**NO** crear `index2.astro` ni `index2.module.css`.

---

### PASO 2 — `astro-page-builder`

Lee este PLAN completo antes de empezar. Lee también `src/pages/index2.html` completo.

**Tareas:**
1. Crear `src/pages/index2.astro`
2. Crear `src/pages/index2.module.css`

**Reglas de estructura:**
- Importar `Layout` de `../layouts/Layout.astro`
- Importar `CourseForm` de `../components/landing/CourseForm.astro` (existente)
- Importar `BenefitCard`, `CheckItemSvg`, `LandingFooter` creados en PASO 1
- El formulario `CourseForm` debe estar en un wrapper con `id="registro"` para que los anchors funcionen
- El botón CTA y el botón del promo-banner deben tener `href="#registro"` como `<a>`

**Reglas de CSS:**
- Todos los estilos van en `index2.module.css` — ninguno inline
- Aplicar las reglas de optimización definidas arriba (tokens, no valores hardcodeados)
- El sistema de layout usa `m-container` de global.css — no recrear `.container`
- Para secciones que necesitan max-width menor (problem, cta): aplicar `max-width` en el selector de la sección
- Mantener el SVG decorativo del underline de h1 y "likes" directamente en el template Astro

**Imágenes (todas con BASE_URL):**
- Logo: `${import.meta.env.BASE_URL}logo.svg`
- Hero: `${import.meta.env.BASE_URL}cursos.png` (reemplaza `hero-img.png` que no existe)
- Fórmula: `${import.meta.env.BASE_URL}iconos.png`
- Certificaciones: `${import.meta.env.BASE_URL}badges.jpg`

**Valores visuales críticos a respetar:**
| Elemento | Valor |
|---|---|
| Hero bg | `var(--brand-dark)` |
| Hero glow | `background: var(--brand-blue); opacity: 0.05; filter: blur(100px)` |
| Form card overlap | `margin-top: -6rem` mobile / `-7rem` desktop |
| Form card br | `var(--radius-xl)` (2rem) |
| Form backdrop | `backdrop-filter: blur(10px)` |
| Problem divider | `width: 6rem; height: 0.25rem; background: var(--brand-blue); border-radius: 9999px` |
| Info-card br | `1.5rem` |
| CTA glow-1 | azul `top:0; right:0; width:500px; blur:120px` |
| CTA glow-2 | índigo `#6366f1; bottom:0; left:0; width:300px; blur:100px` |
| Promo gradient | `linear-gradient(to bottom right, var(--brand-blue), #1d4ed8)` |
| Promo banner br | `2.5rem` |
| Phone rotation | `rotate(-2deg)` → hover `rotate(0deg)` |

---

### PASO 3 — `astro-reviewer`

Lee este PLAN y luego lee `src/pages/index2.astro` completo.

**Verificar:**
1. Build limpio: `npm run build`
2. Todas las imágenes usan `BASE_URL`
3. El formulario tiene `id="registro"`
4. Los botones CTA tienen `href="#registro"`
5. Responsive hero: grid colapsa a 1col en mobile
6. Responsive form-section: overlap correcto en mobile
7. Responsive info-cards: 2col → 1col en mobile
8. Responsive benefits: 4col → 2col → 1col
9. Responsive promo-banner: row → column en mobile
10. No hay valores CSS hardcodeados que deberían ser tokens
11. No hay estilos duplicados o contradictorios entre global.css e index2.module.css

**Entregable:** `REVIEW.md` con estado pass/fail y lista de issues accionables

---

## Archivos que NUNCA se tocan

- `src/pages/index.astro`
- `src/pages/index.module.css`
- `src/components/landing/CourseForm.astro`
- `src/components/landing/CheckItem.astro` (diferente de CheckItemSvg)
- `src/components/landing/IconCard.astro`
- `src/layouts/Layout.astro`
- `astro.config.mjs`

---

## Deploy

```js
// astro.config.mjs (sin cambios)
let DEPLOY_DOMAIN = "https://gonzalo-mediabros.github.io";
let DEPLOY_PATH = "/mediabroslatam-landings/";
```

```json
// package.json — script deploy ya correcto:
"deploy": "npm run build && gh-pages -d dist"
```
