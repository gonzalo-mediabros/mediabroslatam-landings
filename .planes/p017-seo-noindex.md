# PLAN P017: SEO Audit & Control de Indexación

Este plan surge de una auditoría del estado SEO actual del proyecto. El objetivo es implementar un sistema de control de indexación centralizado (noindex global o por página) y corregir las inconsistencias detectadas en los metadatos. El sistema debe ser simple: **un solo lugar para activar/desactivar noindex en todas las páginas**.

- **Agents:** astro-architect.md, astro-reviewer.md
- **Skills/Tools:** Edición de Layout.astro, Props de Astro
- **Recommended IA:** Flash es suficiente para esta tarea. Es mecánica y de bajo riesgo.

---

## Auditoría SEO — Estado Actual

### Lo que ya existe

| Elemento | Estado |
|---|---|
| `<meta name="robots" content="noindex,nofollow" />` en Layout.astro | Presente, pero hardcodeado |
| `<title>` en todas las páginas | Correcto |
| `<meta name="description">` en todas las páginas | Correcto |
| `<link rel="canonical">` en Layout.astro | Presente |
| OpenGraph básico (og:title, og:description, og:image, og:type) | Presente, pero incompleto/inconsistente |

### Problemas detectados

| Problema | Severidad | Detalle |
|---|---|---|
| noindex hardcodeado en Layout | ALTA | El Layout tiene noindex,nofollow fijo. No hay forma de activar indexación por página sin editar el Layout global. |
| Prop ogImage ignorada en Layout | MEDIA | diagnostico.astro y guia.astro pasan ogImage, pero Layout solo acepta image?. Se pierde silenciosamente. |
| Prop ogType ignorada en Layout | MEDIA | ogType no está en la interface de Layout, se descarta. og:type siempre vale "website" hardcodeado. |
| Falta twitter:card meta | BAJA | Sin Twitter/X Card, el preview en esa plataforma es mínimo. |
| og:url usa Astro.url (objeto) en lugar de .href | BAJA | Puede generar [object Object] en algunos SSG builds. |
| socialImage no usa BASE_URL | BAJA | Path relativo sin BASE_URL puede romperse en gh-pages. |
| test.astro no usa Layout | INFO | Sin head ni robots. Figura en el build pero es una página dev. |

---

## Solución Propuesta

### Control de noindex: Master Switch + Prop por página

Implementaremos un sistema de doble capa en `Layout.astro`:
1. **Master Switch (`GLOBAL_NOINDEX`)**: Una constante en el frontmatter del Layout que, si es `true`, fuerza el `noindex` en todo el sitio ignorando la prop de la página.
2. **Prop por página (`noindex`)**: Permite habilitar/deshabilitar el indexado individualmente si el Master Switch permite indexar.

**Lógica de decisión:**
`const shouldNoIndex = GLOBAL_NOINDEX || noindex;`

```astro
<!-- En Layout.astro -->
---
const GLOBAL_NOINDEX = true; // Cambiar a false para permitir indexación controlada por página
const { noindex = true, ... } = Astro.props;
const shouldNoIndex = GLOBAL_NOINDEX || noindex;
---

<!-- Uso en páginas -->
<!-- Para indexar una página específica (solo funcionará si GLOBAL_NOINDEX es false) -->
<Layout title="..." description="..." noindex={false}>
```

**Retrocompatible:** ninguna página existente necesita cambios.

---

## 1. Fase 1: Refactor de Layout.astro

- [x] **1.1. Implementar Lógica de Indexación Global y Local**
  - [x] 1.1.1. Definir `const GLOBAL_NOINDEX = true;` en el frontmatter.
  - [x] 1.1.2. Añadir `noindex?: boolean` a la interface `Props` con default `true`.
  - [x] 1.1.3. Calcular `const shouldNoIndex = GLOBAL_NOINDEX || noindex;`.
  - [x] 1.1.4. Renderizado condicional: `{shouldNoIndex && <meta name="robots" content="noindex,nofollow" />}`.

- [x] **1.2. Arreglar prop ogImage y ogType**
  - [x] 1.2.1. Renombrar prop `image?` a `ogImage?` para alinear con lo que ya pasan las páginas
  - [x] 1.2.2. Agregar prop `ogType?: string` con default "website"
  - [x] 1.2.3. Usar ogType en la etiqueta og:type

- [x] **1.3. Corregir og:url**
  - [x] 1.3.1. Cambiar `content={Astro.url}` a `content={Astro.url.href}`

- [x] **1.4. Agregar Twitter/X Card mínima**
  - [x] 1.4.1. Añadir `<meta name="twitter:card" content="summary_large_image" />`
  - [x] 1.4.2. Añadir `<meta name="twitter:image" content={socialImage} />`

---

## 2. Fase 2: Verificación de páginas

- [ ] **2.1. Verificar props en páginas existentes**
  - [ ] 2.1.1. diagnostico.astro: ya pasa ogImage y ogType — verificar que funcionen con el Layout corregido
  - [ ] 2.1.2. guia.astro: mismo caso
  - [ ] 2.1.3. auditoria.astro, index.astro, index2.astro: verificar que el fallback de ogImage funcione

- [ ] **2.2. Gestión de test.astro**
  - [ ] 2.2.1. Evaluar si se agrega al .gitignore de build o se integra al Layout

---

## 3. Fase 3 (Opcional): robots.txt

- [ ] **3.1. Crear public/robots.txt**
  - [ ] 3.1.1. `Disallow: /` mientras el sitio esté en desarrollo/campaña
  - [ ] 3.1.2. Cuando se quiera indexar, cambiar a `Allow: /`

> Nota: La prop noindex en Layout y robots.txt son capas independientes y complementarias.

---

## Resumen de impacto

| Cambio | Archivos impactados |
|---|---|
| Layout.astro refactorizado | src/layouts/Layout.astro |
| Verificación de props | diagnostico.astro, guia.astro |
| Sin cambios necesarios en otras páginas | index.astro, index2.astro, auditoria.astro |

---

## Decisiones de diseño

1. **noindex true por default** — Protege el proyecto mientras está en desarrollo. No hay que acordarse de aplicar noindex en cada nueva página.
2. **Retrocompatibilidad total** — Las 5 páginas existentes siguen funcionando sin tocarlas.
3. **Una prop booleana simple** — Máxima claridad, mínima fricción. Extensible en el futuro si se necesitan granularidades.
