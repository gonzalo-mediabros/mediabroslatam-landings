# PLAN 010: Extracción de Componentes Reutilizables en index2.astro

Este plan detalla la extracción de elementos estructurales específicos de la landing `index2.astro` para transformarlos en componentes aislados bajo el namespace `curso2`. Esto busca mantener el archivo de la landing más limpio, mejorar la legibilidad y promover la reutilización.

- **Agents:** astro-ui-builder
- **Skills/Tools:** write_to_file, replace_file_content
- **Recommended IA:** Gemini 3.1 Pro (Low)

---

## 1. Fase 1: Creación de Componentes

- [ ] **1.1. Componente Chip (`Chip2.astro`)**
  - [ ] 1.1.1. Crear el archivo `src/components/curso2/Chip.astro`.
  - [ ] 1.1.2. Implementar propiedades dinámicas: `text`, `icon` y `class` (para extender estilos como márgenes).
- [ ] **1.2. Componente de Tarjeta de Beneficio (`iconCard.astro`)**
  - [ ] 1.2.1. Crear el archivo `src/components/curso2/BenefitCard.astro`.
  - [ ] 1.2.2. Implementar propiedades dinámicas: `title`, `description` e `icon`.

## 2. Fase 2: Implementación y Refactorización

- [x] **2.1. Actualización de `index2.astro`**
  - [x] 2.1.1. Importar `Chip2` y `BenefitCard2` en el frontmatter.
  - [x] 2.1.2. Sustituir el markup del Chip en el Header ("Multiplica tus leads").
  - [x] 2.1.3. Reemplazar las 4 tarjetas hardcodeadas en la sección `#beneficios` por instancias de `<BenefitCard2>`.
