# PLAN 012: Estilos Landing Auditoría

El propósito de este plan es refactorizar y maquetar por completo la landing page `auditoria.astro`. Actualmente posee un código HTML puro sin estilos. Convertiremos esta estructura a la arquitectura moderna del proyecto basándonos en los componentes y patrones validados en las landings `curso2` y `diagnostico`.

Dado que los componentes de cada landing son independientes, copiaremos y adaptaremos los necesarios dentro del directorio `src/components/auditoria/`.

- **Agents:** astro-architect, astro-designer, astro-page-builder
- **Skills/Tools:** write_to_file, multi_replace_file_content
- **Recommended IA:** Gemini Pro / Claude 3.5 Sonnet / o1

---

## 1. Fase 1: Arquitectura Base, Header/Footer y Hero

- [x] **1.1. Arquitectura y Footer**
  - [x] Envolver el contenido con `<Layout>` ajustando los metadatos y variables.
  - [x] Modificar la sección final del documento aplicando el bloque estructurado estándar de `<footer>` (idéntico al estilo `bg-brand-dark` usado en `diagnostico.astro` o `curso2.astro`).
- [x] **1.2. Sección Hero (`#hero`)**
  - [x] Establecer el layout asimétrico de dos columnas (Web Components `<m-container>`, `<m-row>`).
  - [x] **Columna Izquierda:** Título ("Descubre dónde estás perdiendo dinero..."), y una lista de valor (Agitation) usando Google Icons (`search`, `warning`, `rocket_launch`).
  - [x] Crear e integrar `src/components/auditoria/Chip.astro` (copiado de diagnostico) para los badges finales ("Gratuito", "Certificado", "Confidencial").
  - [x] **Columna Derecha:** Crear `src/components/auditoria/AuditoriaForm.astro` (inspirado en `CourseForm2` estilo glass/dark) para sustituir todos los inputs crudos actuales.

## 2. Fase 2: Lo que vas a recibir y ¿Cómo Funciona?

- [x] **2.1. Sección Entregables (`#deliverables` o `#expectations`)**
  - [x] Título de sección "Lo que vas a recibir en 48 horas".
  - [x] Crear el componente `src/components/auditoria/BenefitCard.astro` estructurado para título, descripción e ícono a la izquierda.
  - [x] Usar un grid de 2 columnas `lg:grid-cols-2` o `m-row` con `flex-[1_1_45%]` para mapear los 4 puntos destacados.
- [x] **2.2. Sección Proceso (`#process`)**
  - [x] Título de sección "¿Cómo funciona?".
  - [x] Mapear los 3 pasos ("Completá", "Diagnóstico", "Reporte") utilizando el mismo `BenefitCard.astro` pero ajustándolo en una grilla de 3 columnas `lg:grid-cols-3`.

## 3. Fase 3: Trust (Testimonios), FAQ y CTA Bottom

- [x] **3.1. Sección Testimonios (`#testimonials`)**
  - [x] Crear el componente `src/components/auditoria/TestimonialCard.astro`. En este caso, el diseño es de "solo texto con foto de autor", por lo que no hace falta la caja de video que se usó en diagnóstico, sino un avatar circular.
  - [x] Reemplazar las citas en duro por un grid responsivo usando el componente creado.
- [x] **3.2. Sección Preguntas Frecuentes (`#faq`)**
  - [x] Crear/Copiar `src/components/auditoria/FaqAccordion.astro`.
  - [x] Integrar las 4 preguntas actuales en el layout central interactivo.
- [x] **3.3. Sección CTA Bottom (`#cta`)**
  - [x] Crear el bloque de conversión de impacto final ("¿Listo para mejorar tus resultados?") usando la tarjeta de fondo `brand-blue` con patrón superpuesto o estilo similar a las otras landings.
  - [x] Botón de CTA con ancla que regrese suavemente al `#hero`.

---
**Notas Técnicas Finales:** No existirá código CSS inline. Todo espaciado de margen y padding estará controlado por las utilitarias globales y usando marcadores de color del `@theme`.
