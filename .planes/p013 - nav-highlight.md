# PLAN 013: Subrayado de Ruta Actual en Navegación

Implementar el resaltado (subrayado) del enlace correspondiente a la página actual en el menú de navegación de `Layout.astro` y `Header.astro` para mejorar la orientación del usuario.

- **Agents:** astro-ui-builder
- **Skills/Tools:** Astro, Tailwind CSS
- **Recommended IA:** Gemini Pro

---

## 1. Fase 1: Implementación en Layout.astro (Dev Nav)

- [x] **1.1. Obtener la ruta actual**
  - Utilizar `Astro.url.pathname` en el frontmatter.
- [x] **1.2. Aplicar clases condicionales**
  - Implementar lógica para comparar la ruta actual con el `href` de cada enlace.
  - Aplicar `underline decoration-2 underline-offset-4` (o similar que respete el estilo actual) al enlace activo.

## 2. Fase 2: Implementación en Header.astro (Navegación Principal)

- [x] **2.1. Replicar lógica de resaltado**
  - Asegurar que el menú principal en `Header.astro` también refleje la página actual.
  - Mantener consistencia visual con el diseño de Mediabros.
