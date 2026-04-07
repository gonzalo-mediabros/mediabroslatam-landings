# Astro Landing Pages

## Project Overview

This project belongs to **Mediabros**, a digital marketing agency based in Argentina that operates across LATAM. The company has over 15 years of experience in digital marketing and is currently in a strong growth phase.

The goal of this project is to build a scalable system of landing pages for different marketing purposes, including:

- Curso (Course)
- Guía de regalo (Lead magnet guide)
- Auditoría gratis (Free audit)
- Diagnóstico (Diagnosis)
- Additional campaign-specific pages

## Objective

Deliver a clean, scalable, and high-converting landing page system.

## Current Status

Before starting any task, always read `.planes/roadmap.md` to understand current project status. The roadmap only lists plans that are not yet completed.

### Plans structure

Plans live in `.planes/`. Naming convention: `pNNN-descriptive-name.md` (e.g. `p018-optimizacion-agentes.md`).
`roadmap.md` is the live index of pending work — completed plans are removed from it.

## Tech & Architecture

The project is built using **Astro**, with a modular and component-driven approach.
The project will be deployed using **GitHub Pages (gh-pages)**.

## Agent Pipeline

```
Brief → astro-architect (PLAN.md) → astro-designer (design-system.md + global.css)
      → astro-ui-builder (components) → astro-page-builder (pages) → astro-reviewer (REVIEW.md)
```

The `planner` agent is invoked to create or update `.planes/pNNN.md` files before any structural work begins.

## Team Structure (AI Agents)

Specialized agents live in `~/.claude/agents/`. Each is responsible for a specific stage:

- **astro-architect** — Project structure, PLAN.md, gh-pages config
- **astro-designer** — Design system, `design-system.md`, `global.css` @theme tokens
- **astro-ui-builder** — UI components in `src/components/`
- **astro-page-builder** — Page assembly in `src/pages/`
- **astro-reviewer** — Final QA audit, produces `REVIEW.md`
- **planner** — Creates and maintains `.planes/pNNN.md` and `roadmap.md`

## Skills

Skills live in `~/.claude/skills/`. Invoke them with the `Skill` tool or `/skill-name`.

### `ui-ux-pro-max`

A broad design skill (67 styles, 13 stacks). For this project, **always constrain it** to avoid generic output:

- **Stack:** `html-tailwind` (never `react`, `vue`, etc.)
- **Domain:** `landing`
- **When to use:** Visual design decisions — hero layout, color palette, typography hierarchy, section composition, CTA design. Do NOT use for code generation or component implementation; use the astro-ui-builder agent for that.
- **Output:** Design specs, token suggestions, or annotated HTML mockups. The astro-designer or astro-ui-builder agent then implements using project @theme tokens.

Example invocation context: _"Using ui-ux-pro-max with stack html-tailwind and domain landing, design the hero section for a free audit landing."_

---

## Component Policy

Components in `src/components/ui/` are **shared across landings** — unify with props (`variant`, `theme`, `class` pass-through) when differences are cosmetic only.

Components with different logic or structure stay **independent per landing** in their own folder (e.g. `src/components/curso/`). Never modify an original to serve another landing — copy it.

## Rules

- Use **Tailwind CSS v4** with `@theme` tokens for all styling.
- All design tokens (colors, fonts, spacing, widths) must be defined in `@theme {}` inside `src/styles/global.css`.
- Never hardcode color, spacing, or width values in components or pages — always use @theme tokens.
- Max-widths must use centralized tokens: `--width-content`, `--width-wide`, `--width-full`.
- No CSS Modules (`.module.css` files). No inline styles (`style=""`).
- Use Web Components for layout: `<m-container>`, `<m-row>`, `<m-col>`.
- Every `<section>` must have a comment separator and a unique `id` (see Layout System below).
- When adapting external Tailwind designs, replace hardcoded values with project @theme tokens.
- Use Google Fonts Icons via `<m-icon>`.
- Deploy using GitHub Pages (gh-pages).

---

## Tailwind v4 Conventions

These apply to **all agents and all files** — no exceptions.

- **`@import` order is critical:** `@import "tailwindcss";` MUST come AFTER any `@import url(...)` (Google Fonts, etc.). Reversing the order causes Vite/PostCSS to crash.
- **Never define tokens Tailwind already provides.** Tailwind v4 ships slate, gray, zinc, etc. Only define `@theme` tokens for custom values.
- **No arbitrary opacity syntax:** Never `bg-white/[0.05]`. Always `bg-white/5`.
- **No arbitrary variable interpolation for @theme tokens:** Never `rounded-[--radius-md]` or `gap-[--space-lg]`. Tailwind v4 compiles @theme variables directly into utilities — use `rounded-md`, `gap-lg`.
- **No `@apply` in components.** Use utility classes directly in HTML.
- **No CSS Modules.** No `.module.css` files.
- **No inline styles.** No `style=""` attributes.
- **No global base rules that override components.** Rules like `img { border-radius }` or `section { padding }` cause cascade conflicts.
- **Spacing consistency:** Choose 2–3 section padding values (e.g. `py-16`, `py-20`) and stick to them.

---

## Layout System

### Section structure (MANDATORY)

Every `<section>` must have:
1. A **comment separator** immediately above it
2. A unique **`id`** attribute

```html
<!-- --------------- HERO --------------- -->
<section id="hero" class="...">
  ...
</section>

<!-- --------------- FEATURES --------------- -->
<section id="features" class="...">
  ...
</section>
```

### Web Components

`<m-container>`, `<m-row>`, `<m-col>`, `<m-icon>` are custom HTML tags defined in `src/scripts/layout-components.js`.

- `<m-container>` — centered max-width wrapper. Styles defined in `global.css` — do not add redundant Tailwind max-width classes on top.
- `<m-row>` — `display: flex` only. **No default direction.** Always set direction, gap, and alignment via Tailwind classes explicitly.
- `<m-col>` — flex column item. Sizing and alignment via Tailwind.
- `<m-icon>` — semantic wrapper for Material Symbols icons. **Always use `<m-icon>` — never `<span class="material-symbols-outlined">` directly.**

```html
<!-- Correct -->
<m-icon class="material-symbols-outlined text-brand">check_circle</m-icon>

<!-- Wrong -->
<span class="material-symbols-outlined text-brand">check_circle</span>
```

### Standard section pattern

```html
<!-- --------------- BENEFITS --------------- -->
<section id="benefits" class="py-20 bg-surface">
  <m-container>
    <m-row class="flex-col lg:flex-row gap-8">
      <m-col class="flex-1">...</m-col>
      <m-col class="flex-1">...</m-col>
    </m-row>
  </m-container>
</section>
```

### Matrix layouts (grids, bento, cards)

Use **CSS Grid natively** for repeating structures — never hack Flexbox for equal-height grids.

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

---

## Asset Paths

All internal links and asset references **must** use `import.meta.env.BASE_URL` — never hardcode `/`:

```astro
<!-- Correct -->
<a href={`${import.meta.env.BASE_URL}about`}>About</a>
<img src={`${import.meta.env.BASE_URL}images/photo.jpg`} alt="..." />

<!-- Wrong -->
<a href="/about">About</a>
<img src="/images/photo.jpg" alt="..." />
```

For assets in `src/assets/`, import them directly:

```astro
import heroImg from '../assets/images/hero.jpg';
<img src={heroImg.src} alt="..." />
```

---

## Model Routing

Use the right model for the right task to optimize cost and quality:

| Model | When to use |
|-------|-------------|
| **Opus** | Architecture decisions, complex trade-offs, critical design choices |
| **Sonnet** | Code, components, pages, reviews, planning — the default for most work |
| **Haiku** | Mechanical tasks: rename, copy files, generate boilerplate |

### Claude vs Gemini

| Model | Strengths for this project |
|-------|---------------------------|
| **Claude** | Long HTML files, step-by-step reasoning, code reviews, agent tasks |
| **Gemini** | Large context windows, processing many files in parallel |

---

## Lessons Learned

Advanced conventions and lessons learned are documented in `.planes/p015 - Lecciones para Agentes.md`. Categories:

- **Planning** — Phase ordering (low-risk first), reference page designation, dependency mapping
- **Design tokens** — Don't duplicate native Tailwind tokens, border-radius hierarchy, section spacing (max 2–3 values)
- **Components** — Unify with props not copies, class pass-through, slots for flexible content
- **Layout** — `section > m-container > m-row > m-col` pattern, no hardcoded max-width when m-container handles it, always declare responsive breakpoints on grids
- **QA** — Check for content outside `<Layout>`, detect duplicate components across folders, flag redundant classes on web components
