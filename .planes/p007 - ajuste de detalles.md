# PLAN P007: Ajustes de Detalles y Migración de Estilos

Este plan aborda la resolución de discrepancias visuales, corrección de medidas globales y el uso adecuado del Web Component System contra el diseño original en `index_3.html`. El objetivo es restaurar la fidelidad del layout, ajustar proporciones de tipografía y espaciado, y fijar el consumo correcto de los tokens del `@theme`.

- **Agents:** astro-architect, astro-ui-builder
- **Skills/Tools:** Revisión de CSS, refactorización de CSS Modules y Web Components.
- **Recommended IA:** Gemini 1.5 Pro / Claude 3.5 Sonnet (alto nivel de razonamiento arquitectónico CSS).

---

## 1. Fase 1: Alineación global y corrección de Web Components

- [x] **1.1. Corrección de tokens y variables en `global.css`**
  - [x] 1.1.1. Eliminar `html { font-size: 17px; }` en `global.css` para restaurar la escala base `rem` a 16px, solucionando la tipografía sobredimensionada y márgenes exagerados.
  - [x] 1.1.2. Reemplazar el ancho hardcodeado en `m-container` (`max-width: 1452px;`) para que consuma de forma directa la variable de entorno de Tailwind: `max-width: var(--width-content);` (1200px).
- [x] **1.2. Comportamiento y alineación de `m-row` y `m-col`**
  - [x] 1.2.1. Modificar el bloque CSS de `m-col` en `global.css`. Cambiar `align-items: stretch;` a un alineamiento neutro o `flex-start`, asegurando que no distorsione el contenido (especialmente en la columna 1 del Hero).
  - [x] 1.2.2. Ajustar media queries de `m-row[flex]`. Asegurar que permita el `stretch` vertical de sus hijos (los `m-col`) cuando se requiera misma altura, en lugar de forzar siempre `align-items: flex-start` a nivel macro.

## 2. Fase 2: Correcciones específicas en `index2.astro`

- [x] **2.1. Refinamiento en el asimétrico de Hero Banner**
  - [x] 2.1.1. Modificar el contenedor izquierdo del Hero (`m-col`) para garantizar que sus elementos internos se alineen en `flex-start` y no se auto-expandan en su totalidad (`stretch`).
  - [x] 2.1.2. Aumentar y normalizar el gap de las columnas en el hero (revisando la clase `.gap-16` respecto a la escala original de `4rem`).
- [x] **2.2. Estandarización de las Info Cards**
  - [x] 2.2.1. Las tarjetas de "Para quién es este curso" y "Qué vas a aprender" pierden la altura igualada por el uso del `align-items: flex-start` de `m-row`. Forzar o restaurar el comportamiento a `stretch` dentro del `#info-cards` o reestructurarlo con CSS Grid.
- [x] **2.3. Estructuración Semántica (Acerca del Curso / Beneficios)**
  - [x] 2.3.1. Reemplazar y renombrar la sección general de `#bento` por `#sobre-el-curso` con su contenedor principal.
  - [x] 2.3.2. Extraer los "beneficios" en una jerarquía semántica propia (`<section id="beneficios">`) asignándole el título "Beneficios de realizar el curso".

## 3. Fase 3: Actualización de Agentes (Mejoras Agnosticas)

El objetivo de esta fase es cristalizar el aprendizaje arquitectónico para evitar futuros errores en cualquier proyecto Astro utilizando Tailwind v4. Los cambios se aplicarán en `C:\Users\Gonzalo\.claude\agents\`:

### `astro-architect.md` (Decisiones Core)

- [x] **Tailwind v4 `@import`**: Establecer que `@import "tailwindcss";` **NUNCA** precede a imports de URL externa (como Google Fonts). Tailwind inyecta CSS masivo en esa línea y quiebra el renderizado de Vite si no es respetado el orden.
- [x] **CSS Grid vs Flexbox**: Elevar `CSS Grid` como estándar oficial y principal herramienta ante layouts matriciales (Grillas de contenido, , Cards alineadas), dejando en claro que forzar saltos de línea y _stretching_ vertical con iteraciones complejas de Flexbox es considerado _anti-patrón_.
- [x] **Web Components y `@theme`**: Ordenar que el CSS plano de los layout containers (`m-row`, `m-container`) **debe** alimentarse de forma estricta de las variables de entorno inyectadas nativamente por Tailwind (`var(--...)`) y prohibir valores hardcodeados.
- [x] **REM Inalterable**: Prohibir categóricamente escalar el `html { font-size }` de forma global si el entorno usa un framework atómico, para evitar la pérdida de control del layout.

### `astro-page-builder.md` (Construcción UI)

- [x] **Implementación de Matrices**: Cambiar en sus reglas heurísticas la forma en que crea cuadrículas de información; debe dejar de intentar resolver y forzar el layout con flex-\* (y sus fallos de altura) decantándose nativamente por `CSS Grid` y auto-stretch implícito.
- [x] si un grupo de secciones deben compartir un background, ejemplo gradiente se puede agrupar todas esas secciones dentro de un div y aplicarle el background a ese div. importarte agregar comentario y id.
- [x] agregar clase seanticas a los elemetentos. aunque no tengan un uso practico en el css, ayuda a reconocerlo. ejemplo card, title, subtitle, col1, col2, row1, row2,

### `astro-designer.md` (Estilización y Diseño)

- [x] **Tokens en V4**: Recalcarle la directriz de que ahora los diseños y sus distancias consumen _exclusivamente_ las properties de escala nativa (inyecciones CSS desde `@theme`) en los anchos estructurales (ej. `var(--width-content)`).

### `astro-reviewer.md` (Responsabilidades de QA)

- [x] **Auditoría de PostCSS**: Añadir la obligación de buscar y alertar inmediatamente un `@import` suelto luego de Tailwind v4.
- [x] **Auditoría UI/Layout**: Penalizar implementaciones que manipulen `align-items` o fuercen alturas en los items mediante hackeos sobre flexbox si el contexto es visiblemente una grilla matricial.

### `planner.md`

- [x] agregar por fase de plan no generico.
  - **[Agents]:**
  - **[Skills/Tools:]**
  - **[Recommended-IA:]**
