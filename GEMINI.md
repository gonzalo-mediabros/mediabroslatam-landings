# GEMINI.md

## Project Overview

This project belongs to **Mediabros**, a digital marketing agency based in Argentina that operates across LATAM. The company has over 15 years of experience in digital marketing and is currently in a strong growth phase.

The goal of this project is to build a scalable system of landing pages for different marketing purposes, including:

- Curso (Course)
- Guía de regalo (Lead magnet guide)
- Auditoría gratis (Free audit)
- Diagnóstico (Diagnosis)
- Additional campaign-specific pages

## Current Status

The project is currently in a **migration phase** from a previous platform.

During this process, the team is:

- Refactoring and cleaning the codebase
- Improving design consistency
- Enhancing layout structure and spacing
- Making components modular and reusable
- Optimizing content for clarity and conversion

A temporary **quick navigation menu** has been implemented to support development and internal navigation across multiple landing pages.

## Deployment

The project will be deployed using **GitHub Pages (gh-pages)**.

## Tech & Architecture

The project is built using **Astro**, with a modular and component-driven approach.

The architecture prioritizes:

- Reusability
- Clean structure
- Maintainability
- Scalability for future landing pages

## Team Structure (AI Agents)

The workflow is supported by specialized Astro agents, each responsible for a specific aspect of the project:

- **astro-ui-builder.md**
  Focuses on building UI components and reusable interface elements.

- **astro-architect.md**
  Defines the overall structure, architecture, and best practices.

- **astro-designer.md**
  Handles visual design decisions, spacing, and UI consistency.

- **astro-page-builder.md**
  Assembles complete pages using components and content.

- **astro-reviewer.md**
  Reviews code, structure, and design to ensure quality and consistency.

- **planner.md**
  The agent must identify the highest number in .planes/, create the next pNNN + 1 file, and document the execution plan there before starting.

## Mandatory Protocol

**MANDATORY:** Never proceed from the planning phase (writing/editing files in `.planes/`) to the execution phase (creating or modifying project code files) without explicit authorization from the user. The approval of a plan document does NOT constitute an automatic green light for execution.

---

## Plan Format Standard

All plan files in `.planes/` must follow this structure for maximum legibility and tracking:

# PLAN [ID]: [Short Description]

[Introductory paragraph explaining the purpose, scope, and technical context of the plan.]

- **Agents:** [List of agents involved]
- **Skills/Tools:** [Relevant skills to be used]
- **Recommended IA:** [Model recommendation for execution (e.g., Gemini Pro/Ultra)]

---

## 1. Fase 1: [Phase Name]

- [ ] **1.1. [Task Name]**
  - [ ] 1.1.1. [Sub-task detail]
  - [ ] 1.1.2. [Sub-task detail]
- [ ] **1.2. [Task Name]**

## 2. Fase 2: [Phase Name]

- [ ] **2.1. [Task Name]**

---

## Component Isolation per Landing

Each landing page is **independent**. Components (Header, Footer, forms, etc.) belong to the landing they were built for and must **not be shared or modified** across landings.

- Every landing has its own component copies inside its own folder or namespace (e.g., `src/components/landing/`, `src/components/curso/`).
- If a component from another landing serves as a starting point, **copy it** — never modify the original.
- Forms are always landing-specific. Never reuse a form component across landings.
- Headers and footers may differ in style, color, or structure per landing — treat them as independent.

## Rules

- Use **Tailwind CSS v4** with `@theme` tokens for all styling.
- All design tokens (colors, fonts, spacing, widths) must be defined in `@theme {}` inside `src/styles/global.css`.
- Never hardcode color, spacing, or width values in components or pages — always use @theme tokens.
- Max-widths must use centralized tokens: `--width-content`, `--width-wide`, `--width-full`.
- No CSS Modules (`.module.css` files). No inline styles.
- Use Web Components for layout: `<m-container>`, `<m-row>`, `<m-col>`.
- Every `<section>` must have a comment separator (`<!-- ----- NAME ----- -->`) and a unique `id`.
- When adapting external Tailwind designs, replace hardcoded values with project @theme tokens.
- Use Google Fonts Icons.
- Deploy using GitHub Pages (gh-pages).

## Notes

- The HTML structure may be constrained in some areas due to migration limitations.
- Improvements should prioritize token-based Tailwind patterns when structural changes are not possible.
- The system should remain flexible to support rapid iteration and future campaign pages.

## Objective

Deliver a clean, scalable, and high-converting landing page system aligned with Mediabros' growth and marketing needs.
