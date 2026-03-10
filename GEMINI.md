# Mediabros Latam — Contexto Estratégico

## Stack Técnico

- **Framework**: Astro 5.x
- **Estilos**: Vanilla CSS con **CSS Modules**.
- **Restricciones**: No usar Tailwind ni estilos Inline.
- **Iconos**: [Google Fonts Icons](https://fonts.google.com/icons)
- **Deployment**: GitHub Pages (`gh-pages`).
- **Integraciones**: Google App Script para formularios.

## Comandos Esenciales

```bash
npm install     # Instalar dependencias
npm run dev     # Servidor de desarrollo
npm run build   # Generar build estática
npm run deploy  # Desplegar a GitHub Pages
```

## Arquitectura de Landings

- Las landings residen en `src/pages/`.
- Cada landing usa su propio módulo CSS en `src/styles/`.
- Un Layout base en `src/layouts/` controla el "branding" general (fuentes, anchos, temas).
- SEO se configura por página mediante props/constantes en el Frontmatter de Astro.

## Referencias Locales

- Leer `.agent/project-rules.md` para las reglas técnicas y de negocio detalladas.
- Leer `.agent/project-lessons.md` para el historial de decisiones.
- Leer `.agent/task.md` para el progreso actual.

---

> [!IMPORTANT]
> Mueve este archivo (renombrado a `GEMINI.md`) a la RAÍZ de tu nuevo proyecto. No lo dejes dentro de `.agent/`.
