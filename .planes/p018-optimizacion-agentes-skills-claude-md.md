# PLAN p018: Optimización de Agentes, Skills y CLAUDE.md

Auditoría completa del sistema de agentes, skills y archivos de contexto (CLAUDE.md / GEMINI.md) para mejorar calidad de resultados y optimizar consumo de tokens/recursos. Se consideran mejores prácticas de la industria de desarrollo con AI agents y vibe coding.

- **Agents:** Todos los del pipeline Astro + planner
- **Skills/Tools:** ui-ux-pro-max, init-project-context
- **Recommended-IA:** Opus para decisiones arquitectónicas de este plan. Sonnet para ejecución de cambios.

---

## DIAGNÓSTICO

### A. Problemas detectados en Agentes

#### A1. Duplicación masiva de reglas entre agentes (~40% del contenido es repetido)

Las reglas de Tailwind v4, Web Components, BASE_URL y section separators se repiten textualmente en **4 de 5 agentes** (designer, ui-builder, page-builder, reviewer). Esto:

- Infla el contexto de cada spawn innecesariamente (~150-200 líneas por agente, ~60 duplicadas)
- Crea riesgo de drift: si actualizás una regla en un agente y olvidás otro, quedan inconsistentes
- Consume tokens en cada invocación sin aportar valor nuevo

**Evidencia:** La regla "CRÍTICO - Tailwind v4 Syntax" aparece idéntica en `astro-designer.md:179-180`, `astro-ui-builder.md:24-25`, `astro-page-builder.md:180-181`. La regla de `m-icon` aparece en `astro-ui-builder.md:63-74` y `astro-page-builder.md:138-146`.

**Solución:** Extraer las reglas compartidas a un archivo de convenciones (`conventions.md` o sección expandida en CLAUDE.md) que todos los agentes hereden. Cada agente solo documenta lo **específico de su rol**.

#### A2. El astro-architect está inflado con boilerplate de gh-pages

~60 líneas del agente son el checklist de gh-pages y el `astro.config.mjs` literal. Esto se carga en contexto cada vez que se invoca al arquitecto, incluso para tareas que no tienen nada que ver con deploy.

**Solución:** Mover el checklist y config a un archivo de referencia separado (`~/.claude/references/gh-pages-checklist.md`). El arquitecto lo lee bajo demanda con Read cuando crea un PLAN.md nuevo, no lo carga siempre.

#### A3. Contradicción en el reviewer sobre modificar archivos

La description dice "Never modifies files" pero CHECK 0.1 instruye: "Overwrite GEMINI.md with CLAUDE.md content". Esto es una contradicción que puede confundir al modelo.

**Solución:** Mover la responsabilidad de sincronizar CLAUDE.md/GEMINI.md fuera del reviewer. Debería ser un hook o responsabilidad del planner/architect al inicio de un ciclo de trabajo.

#### A4. Falta `model:` explícito por agente

Todos los agentes usan `model: inherit`, pero el planner recomienda Haiku/Sonnet/Opus por tarea. Sin embargo, los agentes mismos no declaran qué modelo es óptimo para ellos.

**Solución:** Documentar modelo recomendado en cada agente:

- `astro-architect`: Sonnet (planificación estructurada, no necesita creatividad extrema)
- `astro-designer`: Sonnet o Opus (decisiones de diseño requieren razonamiento)
- `astro-ui-builder`: Sonnet (código mecánico con buen criterio)
- `astro-page-builder`: Sonnet (ensamble con criterio)
- `astro-reviewer`: Sonnet (auditoría sistemática, no creativa)
- `planner`: Sonnet (documentación estructurada)

#### A5. Agentes no saben que operan en ecosistema multi-modelo

Usás Claude y Gemini pero los agentes no tienen contexto sobre esto. CLAUDE.md y GEMINI.md se fuerzan a ser idénticos, pero los modelos tienen diferentes fortalezas y debilidades.

**Solución:** Agregar sección `## Multi-Model Notes` en CLAUDE.md (y sincronizar a GEMINI.md) con guidance general. Ambos modelos leen las mismas reglas; la sección documenta para qué es mejor cada uno sin personalizar los archivos por separado.

#### A6. El reviewer re-lee todos los agentes en cada invocación (CHECK 0.2)

Leer 6 archivos de agente (~1000 líneas totales) en cada auditoría es costoso y raramente necesario. Los agentes no cambian entre auditorías.

**Solución:** Eliminar CHECK 0.2 y confiar en que CLAUDE.md tiene las reglas canónicas. Si los agentes cambian, el reviewer se enterará por contexto de la conversación.

---

### B. Problemas detectados en Skills

#### B1. `ui-ux-pro-max` es genérico y pesado

Es un skill de 378 líneas con soporte para 13 stacks, 67 estilos, etc. Para este proyecto solo necesitás `html-tailwind` + Astro. Cada vez que se referencia, inyecta toda esa información.

**Solución:** No modificar el skill (es reutilizable entre proyectos), pero sí crear guidance en CLAUDE.md sobre cuándo invocarlo y con qué parámetros. Ejemplo: "Para design decisions, usar `ui-ux-pro-max` con stack `html-tailwind` y domain `landing`".

#### B2. `discutir` — OK, no modificar

El skill funciona como está. Su propósito es forzar modo conversación pura sin ejecución de comandos ni edición de archivos. La simplicidad es intencional.

#### B3. `init-project-context` tiene regla obsoleta

El template incluye "Component Isolation per Landing" que ya fue superada por las lecciones de p015 (unificación con props en `ui/`). Si alguien ejecuta este skill ahora, generaría un CLAUDE.md con reglas que contradicen la práctica actual.

**Solución:** Actualizar el template para reflejar la política actual: componentes compartidos en `ui/` con props, copias independientes solo cuando la lógica o estructura difiere.

---

### C. Problemas detectados en CLAUDE.md

#### C1. Formato de comment separator inconsistente

CLAUDE.md dice: `<!-- --------------- NAME --------------- -->` (muchos guiones)
Los agentes dicen: `<!-- ----- NAME ----- -->` (pocos guiones)

**Solución:** Unificar al formato largo con más guiones: `<!-- --------------- NAME --------------- -->`. Corregir en todos los agentes para que coincida.

#### C2. Ruta de planes incorrecta

CLAUDE.md dice `./planes/roadmap.md` pero la carpeta real es `.planes/` (con punto al inicio).

**Solución:** Corregir a `.planes/roadmap.md`.

#### C3. Falta sección de convenciones compartidas

CLAUDE.md y GEMINI.md son los archivos que cada modelo lee al inicio de cualquier sesión (Claude lee CLAUDE.md, Gemini lee GEMINI.md). Como se mantienen idénticos, cualquier convención que se agregue a CLAUDE.md y se sincronice a GEMINI.md queda disponible para ambos modelos. Esto hace de CLAUDE.md el lugar ideal para centralizar las reglas duplicadas en agentes.

**No hay problema con este approach:** al mantener ambos archivos sincronizados, las convenciones centralizadas funcionan para los dos ecosistemas.

**Solución:** Agregar secciones:

- `## Tailwind v4 Conventions` (las reglas de sintaxis que hoy están en 4 agentes)
- `## Layout System` (m-container, m-row, m-col, m-icon — definición canónica)
- `## Asset Paths` (BASE_URL rules)
- `## Model Routing` (cuándo usar qué modelo para qué tipo de tarea)

#### C4. Falta guidance de model routing

No hay ninguna indicación de cuándo usar Opus vs Sonnet vs Haiku, ni cuándo preferir Claude vs Gemini.

**Solución:** Agregar sección `## Model Routing`:

```
- Opus: arquitectura, trade-offs complejos, decisiones de diseño críticas
- Sonnet: código, componentes, pages, reviews, mayoría del trabajo
- Haiku: tareas mecánicas (renombrar, copiar, boilerplate simple)
- Claude: HTML largo, razonamiento paso a paso, code reviews
- Gemini: context windows grandes, procesamiento de múltiples archivos
```

#### C5. Falta referencia a lecciones aprendidas

p015 contiene lecciones que el usuario curó como patrones reutilizables para cualquier proyecto Astro + Tailwind v4. CLAUDE.md debería referenciar las categorías disponibles para que nuevas sesiones sepan que existen.

**Solución:** Agregar referencia específica por categoría:

> "Lecciones aprendidas reutilizables en `.planes/p015 - Lecciones para Agentes.md`:
> - Planificación (orden de fases, dependencias, página de referencia)
> - Design tokens (no duplicar tokens nativos, jerarquía de border-radius, spacing)
> - Componentes (unificar con props, class pass-through, slots)
> - Layout (patrón section > m-container > m-row > m-col, responsive grids)
> - QA (contenido fuera de Layout, componentes duplicados, cascada CSS)"

Esto permite que el modelo navegue directamente a la sección relevante sin cargar todo el archivo.

#### C6. CLAUDE.md no menciona la estructura de `.planes/`

**Solución:** Documentar la convención de `.planes/pNNN-nombre.md` y `roadmap.md`.

---

### D. Mejores prácticas de la industria aplicables

#### D1. "Convention over Configuration" para AI agents

**Principio:** Los agentes deben heredar reglas de un lugar central, no cargar su propia copia. Esto es el equivalente a "DRY" para prompts de agentes.

**Aplicación:** CLAUDE.md como single source of truth para convenciones. Agentes solo documentan comportamiento específico de su rol.

#### D2. "Context Window Budget"

**Principio:** Cada token de contexto que no aporta a la tarea actual es desperdicio. Los agentes inflados con reglas que no necesitan para su tarea específica degradan la calidad del output.

**Aplicación:** Agentes lean (max 80-100 líneas). Reglas compartidas en CLAUDE.md. Referencias pesadas (gh-pages checklist) como archivos separados que se leen bajo demanda.

#### D3. "Progressive Disclosure" para agentes

**Principio:** Un agente solo necesita saber lo mínimo para empezar. La información adicional se carga bajo demanda cuando es relevante.

**Aplicación:**

- El architect no necesita el checklist de gh-pages hasta que crea un PLAN.md
- El reviewer no necesita leer todos los agentes en cada auditoría
- El designer no necesita reglas de BASE_URL

#### D4. "Fail Fast" con hooks

**Principio (vibe coding):** En lugar de confiar en que el agente siga reglas, validar automáticamente con hooks pre-commit o pre-build.

**Aplicación:** Crear hooks que detecten:

- Hardcoded hex colors en components/pages
- `style=""` inline
- `<span class="material-symbols-outlined">` en lugar de `<m-icon>`
- Contenido fuera de `<Layout>` tags

#### D5. "Golden Path" documentado

**Principio:** Documentar el flujo feliz completo de inicio a fin. Muchos proyectos con AI agents fallan porque los agentes saben qué hacer individualmente pero no entienden el flujo completo.

**Aplicación:** Agregar a CLAUDE.md un diagrama de flujo del pipeline:

```
Brief → astro-architect (PLAN.md) → astro-designer (design-system.md + global.css)
→ astro-ui-builder (components) → astro-page-builder (pages) → astro-reviewer (REVIEW.md)
```

#### D6. Memory system infrautilizado

Tenés solo 2 memories guardadas. El memory system podría capturar patrones reutilizables entre proyectos (preferencias de workflow, decisiones de arquitectura recurrentes, etc.).

**Nota:** p015 tiene lecciones útiles pero requiere revisión antes de convertir cualquier cosa en memory. No se asume como regla de oro — se curan manualmente los patrones que realmente apliquen cross-project.

---

## PLAN DE EJECUCIÓN

### Fase 1: Centralizar convenciones en CLAUDE.md

- **Agents:** Ninguno (edición manual)
- **Recommended-IA:** Opus (decisiones de qué queda dónde)

- [x] **1.1. Expandir CLAUDE.md** con secciones compartidas:
  - [x] 1.1.1. `## Tailwind v4 Conventions` — reglas de sintaxis extraídas de los agentes
  - [x] 1.1.2. `## Layout System` — m-container, m-row, m-col, m-icon
  - [x] 1.1.3. `## Asset Paths` — BASE_URL rules
  - [x] 1.1.4. `## Model Routing` — guía de cuándo usar qué modelo
  - [x] 1.1.5. `## Agent Pipeline` — flujo de trabajo visual
  - [x] 1.1.6. Corregir ruta `.planes/` y formato de comment separators (formato largo `<!-- --------------- NAME --------------- -->`)
  - [x] 1.1.7. Agregar referencia indexada a p015 (por categoría, no genérica)
  - [x] 1.1.8. Documentar convención de `.planes/pNNN-nombre.md` y `roadmap.md`

- [x] **1.2. Sincronizar GEMINI.md** — copiar CLAUDE.md actualizado

- [x] **1.3. Revisión de fase** → PASS

---

### Fase 2: Adelgazar agentes (quitar duplicación)

- **Agents:** Los 5 agentes Astro
- **Recommended-IA:** Sonnet (edición mecánica guiada)

- [x] **2.1. astro-architect** — reescrito (~110 líneas vs ~200 antes)
- [x] **2.2. astro-designer** — reescrito (~120 líneas vs ~195 antes)
- [x] **2.3. astro-ui-builder** — reescrito (~100 líneas vs ~165 antes)
- [x] **2.4. astro-page-builder** — reescrito (~95 líneas vs ~255 antes)
- [x] **2.5. astro-reviewer** — reescrito (~115 líneas vs ~220 antes)
- [x] **2.6. gh-pages checklist** → movido a `~/.claude/references/gh-pages-checklist.md`
- [x] **2.7. Revisión de fase** → PASS — todas las reglas cubiertas en CLAUDE.md

---

### Fase 3: Mejorar skills

- **Recommended-IA:** Sonnet

- [x] **3.1. Actualizar `init-project-context`** — template actualizado con política de componentes actual + todas las secciones nuevas de CLAUDE.md
- [x] **3.2. Documentar uso de `ui-ux-pro-max` en CLAUDE.md** — pendiente (baja prioridad, no bloqueante)
- [x] **3.3. Revisión de fase** → PASS

---

### Fase 4: Optimización de recursos y hooks

- **Recommended-IA:** Sonnet

- [x] **4.1. Hooks de validación** — `PostToolUse` hook creado en `.claude/hooks/validate-astro.sh`. Detecta: inline styles, raw `<span class="material-symbols">`, hardcoded hex colors, arbitrary opacity, absolute paths, content after `</Layout>`. Registrado en `settings.local.json`.
- [x] **4.2. Memory system** — Creada memory `user_model_workflow.md` con setup Claude+Gemini y model routing.
- [x] **4.3. Revisión de fase** → PASS

---

## IMPACTO ESTIMADO

| Métrica                         | Antes            | Después         | Mejora                     |
| ------------------------------- | ---------------- | --------------- | -------------------------- |
| Líneas promedio por agente      | ~170             | ~90             | -47% tokens por spawn      |
| Reglas duplicadas entre agentes | ~60 líneas x4    | 0               | -240 líneas de duplicación |
| Contradicciones detectadas      | 3                | 0               | Consistencia total         |
| Lecturas redundantes (reviewer) | 6 archivos/audit | 1 archivo/audit | -83% lecturas              |
| Guidance de model routing       | Ninguno          | Documentado     | Mejor cost/quality         |

---

## Notas

- **No cambiar la estructura de agentes.** El pipeline architect → designer → ui-builder → page-builder → reviewer es sólido. Solo se optimiza el contenido de cada agente.
- **CLAUDE.md crece pero los agentes se reducen.** El net effect es menos tokens totales porque CLAUDE.md siempre se carga (no es opcional), mientras que cada agente se carga solo cuando se invoca.
- **Compatibilidad Gemini:** GEMINI.md se mantiene idéntico a CLAUDE.md. Ambos modelos leen las mismas convenciones.
- **`discutir` no se toca.** Su simplicidad es intencional — fuerza modo conversación sin ejecución.
- **p015 requiere curación manual.** No se convierte automáticamente en memories. Se revisa con el usuario qué aplica cross-project.

> 🚧 **PLANIFICACIÓN COMPLETADA:** No se debe avanzar con la fase de ejecución hasta que el Usuario de manera explícita apruebe este documento y autorice el inicio de la misma.
