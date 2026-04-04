# PLAN p005: Corrección Estética de Redondeos Globales

Este plan aborda la pérdida de consistencia visual en los bordes redondeados detectada en `index2.astro`, implementando un enfoque híbrido que combina reglas globales en `global.css` con el uso sistemático de tokens de radio en los componentes de la landing.

- **Agentes:** astro-designer, astro-ui-builder
- **Skills/Tools:** view_file, replace_file_content
- **Recommended IA:** Gemini Flash (Tarea de estilo visual directa)

---

## 1. Fase 1: Base Global

- [x] **1.1. Actualizar `src/styles/global.css`**
  - [x] 1.1.1. Definir estilos base para elementos HTML comunes (`img`, `button`, `input`) usando tokens `--radius-md`.
  - [x] 1.1.2. Asegurar que el resetting de Tailwind v4 no anule estos redondeos esenciales.

## 2. Fase 2: Aplicación en Index2 (Correcciones Críticas)

- [x] **2.1. Refactorización de `CourseForm2.astro`**
  - [x] 2.1.1. Verificar aplicación de `--radius-xl` en el contenedor principal (card).
  - [x] 2.1.2. Verificar aplicación de `--radius-md` en inputs y botón (vía clases globales o locales).
- [x] **2.2. Ajustes en `index2.astro` (Secciones y Cards)**
  - [x] 2.2.1. Aplicar `--radius-xl` al contenedor principal en `#problem`.
  - [x] 2.2.2. Aplicar `--radius-xl` a todos los bloques del `#bento` (Main block, Quote y Benefit Cards).
  - [x] 2.2.3. Aplicar `--radius-xl` a las cards en `#info-cards`.
  - [x] 2.2.4. Aplicar `--radius-xl` al contenedor de `#promo`.
  - [x] 2.2.5. Asegurar redondeo en iconos y elementos decorativos (`Benefit icons`).

---

## 3. Fase 3: Validación Final

- [x] **3.1. Pruebas Visuales**
  - [x] 3.1.1. Comparar consistencia entre `index.astro` e `index2.astro`.
