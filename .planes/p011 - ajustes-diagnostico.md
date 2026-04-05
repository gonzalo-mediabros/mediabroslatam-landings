# PLAN 011: Ajustes de estilos en diagnostico.astro

Este plan detalla las refactorizaciones y ajustes de estilos necesarios para la landing page `diagnostico.astro`, alineando su diseño con los componentes estandarizados y tokens de la arquitectura (como los utilizados en `index2.astro`, `guia.astro` y `/curso2`). Se busca reestructurar secciones, mejorar el diseño del hero y reutilizar componentes correctamente aplicando la regla de copiar componentes para mantener el aislamiento por landing.

- **Agents:** astro-designer, astro-page-builder, astro-ui-builder
- **Skills/Tools:** Modificación de archivos, creación de componentes específicos de landing, Tailwind v4 (@theme tokens)
- **Recommended IA:** Gemini 1.5 Flash (debido a la política de eficiencia y porque son tareas de UI bien acotadas).

---

## 1. Fase 1: Hero y Agitation

- [x] **1.1. Ajustes en `#hero`**
  - [x] Reestructurar layout para que el video quede en la parte superior y ocupe el ancho completo de la columna.
  - [x] Actualizar el formulario para aplicar los mismos estilos usados en `index2.astro`.
  - [x] Implementar el chip del Hero ("Sesión 1 a 1 Gratuita") copiando el estilo de `index2.astro`.
  - [x] Copiar el componente de chips de `/curso2` al directorio de componentes de `diagnostico` y utilizarlo.
- [x] **1.2. Refactorización de `#agitation` y `#bridge`**
  - [x] Corregir el estilo y color incorrecto de la sección `#agitation`.
  - [x] Eliminar la sección `#bridge` independiente y mover su contenido/módulo dentro de la sección `#agitation`.
  - [x] Configurar el módulo bridge integrado para que ocupe las dos columnas y tenga fondo con color oscuro (usando tokens `@theme`).

## 2. Fase 2: Expectations, Audience y Faqs

- [x] **2.1. Ajustes en `#expectations` y `#audience`**
  - [x] Modificar el grid de `#expectations` a 2 columnas (en lugar de 4).
  - [x] Copiar el componente `benefitcards` de `/curso2` al directorio de `diagnostico`, y configurarlo para que el ícono quede a la izquierda y el texto a la derecha.
  - [x] Aplicar el estilo del bloque `#expectations` existente en `guia.astro` a la sección `#audience`.
- [x] **2.2. Implementación de FAQs**
  - [x] Reemplazar la lista de preguntas actual integrando el componente `faq` que ya existe en `guia`. (Recuerda copiar el componente a la carpeta de componentes de `diagnostico` en lugar de referenciar el original).

## 3. Fase 3: Testimonios y Bonus

- [x] **3.1. Módulo de Testimonios (`#testimonials`)**
  - [x] Crear el componente específico para las cards de testimonios en el directorio de `diagnostico`.
  - [x] Diseñar la estructura de la card asegurando que incluya un contenedor de video (puede quedar vacío temporalmente).
- [x] **3.2. Ajuste en `#bonus`**
  - [x] Cambiar la paleta de colores/estilos de `#bonus` para no utilizar color verde.
