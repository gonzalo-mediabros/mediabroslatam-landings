# PLAN P009: Ajustes en Landing Guia2

Este plan aborda las correcciones solicitadas por el usuario en la página `guia2.astro` para mejorar la estructura de columnas, el tamaño de recursos y asegurar la coherencia del estilo de marca priorizando el color azul en los componentes clave.

- **Agents:** astro-page-builder, astro-ui-builder, astro-reviewer
- **Skills/Tools:** write_to_file, multi_replace_file_content
- **Recommended IA:** Gemini 3.1 Pro (High)

---

## 1. Fase 1: Creación de Componentes

- [x] **1.1. Componente FAQ (Accordion)**
  - [x] 1.1.1. Crear componente `src/components/guia2/FaqAccordion.astro`.
  - [x] 1.1.2. Implementar estructura `<details>` y `<summary>` (o un enfoque similar) para lograr el comportamiento desplegable.
  - [x] 1.1.3. Asegurar que utilice variables `@theme`, el ícono de ayuda (`help`) y un estilo consistente.

## 2. Fase 2: Correcciones de Layout y UI en guia2.astro

- [x] **2.1. Sección Hero (#hero)**
  - [x] 2.1.1. Cambiar el color del Chip superior a azul (`text-brand-blue`, border/bg azul).
  - [x] 2.1.2. Asegurar que el Chip no ocupe 100% del ancho (validar flex/inline-flex/w-fit).
  - [x] 2.1.3. Modificar el tamaño de la columna del formulario (`<m-col>`) a `flex-[0.8]`.
  - [x] 2.1.4. Asegurar que los `<m-icon>` presentados en la zona inferior del form sean todos color azul.

- [x] **2.2. Sección Agitation (#agitation)**
  - [x] 2.2.1. Migrar la sección a `m-row` y `m-col` para un enfoque estructurado en 2 columnas (por ejemplo, encabezado/descripción a la izquierda y lista de beneficios a la derecha).

- [x] **2.3. Sección FAQ (#faq)**
  - [x] 2.3.1. Reemplazar el layout de artículos en `<section id="faq">` utilizando el nuevo componente `FaqAccordion`.

- [x] **2.4. Sección Offer (#offer)**
  - [x] 2.4.1. Reducir el tamaño de la imagen (`max-w-md` -> `max-w-xs` o equivalente).
  - [x] 2.4.2. Mejorar el espaciado y estructura de la lista de oferta.
  - [x] 2.4.3. Modificar color de `<m-icon>` de la lista a azul.
  - [x] 2.4.4. Modificar resaltados (`<strong>` o etiquetas) para que utilicen color azul.
