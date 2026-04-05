# PLAN MAESTRO: Unificacion y Pulido - Mediabros Landings

Plan integral para unificar componentes duplicados, estandarizar design tokens, corregir inconsistencias estructurales y pulir el sistema de landing pages. Organizado en fases de menor a mayor riesgo. Cada fase es independiente pero secuencial: completar una fase antes de iniciar la siguiente minimiza regresiones.

- **Paginas afectadas:** index.astro, index2.astro (referencia), guia.astro, diagnostico.astro, auditoria.astro
- **Referencia de diseno:** index2.astro es el estandar visual y estructural
- **Recommended-IA general:** Sonnet para la mayoria de tareas (balance costo/calidad). Opus para decisiones arquitectonicas y refactors complejos. Haiku para tareas mecanicas (buscar/reemplazar, eliminar archivos).

---

## FASE 0: Limpieza previa

Eliminar deuda tecnica obvia que no afecta funcionalidad. Riesgo nulo.

- **Agents:** astro-reviewer
- **Recommended-IA:** Haiku (tareas mecanicas, sin decisiones de diseno)

- [x] **0.1. Eliminar componentes huerfanos**
  - Archivos a eliminar:
    - `src/components/Header.astro`
    - `src/components/Footer.astro`
    - `src/components/ContactForm.astro`
    - `src/components/ui/Button.astro`
    - `src/components/landing/IconCard.astro`
    - `src/components/landing/CheckItem.astro`
    - `src/components/landing/LandingFooter.astro`
    - `src/components/curso2/Footer2.astro`
  - Verificar que ningun archivo los importe activamente (imports comentados no cuentan)
  - **Riesgo:** Bajo. Son archivos sin uso.

- [x] **0.2. Fix index2.astro: contenido fuera de Layout**
  - Archivo: `src/pages/index2.astro`
  - Las secciones cert-strip, dark-block, info-cards, final-cta, promo y footer estan despues del cierre `</Layout>` (linea 210)
  - Mover todo ese contenido dentro de `<Layout>...</Layout>`
  - **Riesgo:** Bajo. Es un bug estructural evidente.

- [x] **0.3. Fix auditoria.astro: title prop faltante**
  - Archivo: `src/pages/auditoria.astro`
  - Agregar prop `title` al componente `<Layout>`
  - **Riesgo:** Bajo.

- [x] **0.4. Eliminar clases redundantes en m-container**
  - Archivos: `src/pages/guia.astro`, `src/pages/diagnostico.astro`, `src/pages/auditoria.astro`
  - Remover `max-w-[--width-content] mx-auto px-5 lg:px-8` de los `<m-container>` porque global.css ya define esos estilos en el web component
  - Tambien en `src/pages/index2.astro` (footer, linea 448)
  - **Riesgo:** Bajo. Las reglas ya existen en global.css.

---

## FASE 1: Componentes UI compartidos

Crear componentes unificados en `src/components/ui/` a partir de duplicados exactos o casi exactos. Luego actualizar imports.

- **Agents:** astro-ui-builder, astro-reviewer
- **Recommended-IA:** Sonnet (requiere criterio para unificar variantes, pero no es arquitectura compleja)

- [ ] **1.1. Crear src/components/ui/FaqAccordion.astro**
  - Fuentes: `src/components/auditoria/FaqAccordion.astro`, `src/components/diagnostico/FaqAccordion.astro`, `src/components/guia2/FaqAccordion.astro`
  - Las 3 copias son identicas byte-por-byte. Copiar una a `src/components/ui/`, eliminar las 3 originales.
  - Actualizar imports en: `guia.astro`, `diagnostico.astro`, `auditoria.astro`
  - **Riesgo:** Bajo. Copias identicas.
  - **Dependencias:** Ninguna.

- [ ] **1.2. Crear src/components/ui/Chip.astro**
  - Fuentes: `src/components/diagnostico/Chip.astro`, `src/components/curso2/Chip2.astro` (identicos), `src/components/auditoria/Chip.astro` (ligeramente diferente)
  - Crear version unificada que acepte props para cubrir ambas variantes (ej: `variant` prop o `class` pass-through)
  - Eliminar las 3 originales.
  - Actualizar imports en: `index2.astro`, `diagnostico.astro`, `auditoria.astro`
  - **Riesgo:** Bajo-medio. La variante de auditoria tiene diferencias menores que deben cubrirse con props.
  - **Dependencias:** Ninguna.

- [ ] **1.3. Crear src/components/ui/Footer.astro**
  - Referencia: footer inline de `index2.astro` (lineas 447-468) como base
  - Props necesarias:
    - `variant`: "dark" (default) | "light" (para index.astro que usa bg-brand-graybg)
    - Logo size estandarizado a h-8
    - Orden estandarizado: logo, copyright, separator, disclaimer (como index2)
  - Reemplazar footers inline en las 5 paginas
  - Eliminar `src/components/landing/LandingFooter.astro` y `src/components/curso2/Footer2.astro` (ya marcados en 0.1)
  - **Riesgo:** Medio. Los footers inline tienen inconsistencias que hay que resolver (orden de elementos, colores, logo sizes). Requiere decision de diseno.
  - **Dependencias:** 0.4 (limpiar clases redundantes del m-container del footer antes de unificar).

- [ ] **1.4. Crear src/components/ui/BenefitCard.astro**
  - Fuentes:
    - `src/components/landing/BenefitCard.astro` (div root, p-6 md:p-8)
    - `src/components/auditoria/BenefitCard.astro` (m-col root, p-6 lg:p-8)
    - `src/components/diagnostico/BenefitCard.astro` (m-col root, p-6 md:p-10)
    - `src/components/curso2/BenefitCard.astro` (m-col root, p-6 md:p-10, flex-basis hardcoded)
  - Crear version unificada:
    - Root element: `m-col` (consistente con sistema de layout)
    - Padding via `class` prop para variaciones por pagina
    - Eliminar flex-basis hardcoded de curso2 (usar flex/grid del padre)
  - Actualizar imports en: `index.astro`, `index2.astro`, `diagnostico.astro`, `auditoria.astro`
  - Eliminar las 4 originales.
  - **Riesgo:** Medio. Diferencias de padding y root element requieren validacion visual.
  - **Dependencias:** Ninguna.

---

## FASE 2: Formularios

Crear componentes de formulario unificados. Los forms actuales son solo HTML/CSS (sin logica de submit funcional). Si algun form tiene JS residual, se puede borrar — la logica de envio se implementara en una fase posterior.

- **Agents:** astro-ui-builder, astro-designer, astro-reviewer
- **Recommended-IA:** Sonnet (son componentes puramente visuales, sin logica compleja)

- [ ] **2.1. Crear src/components/ui/FormDark.astro**
  - Referencia: `src/components/curso2/CourseForm2.astro` (index2, mejor diseno)
  - Es solo diseno, no hay logica de submit funcional. Si algun form tiene JS residual, borrarlo.
  - Debe incluir:
    - Glass-dark aesthetic (bg-white/5 backdrop-blur)
    - Props: `buttonText`, `title`, `subtitle`, `class`
    - Campos: nombre, email, empresa, cargo (hardcoded por ahora, parametrizar luego si hace falta)
    - Rounded estandarizado con token `rounded-lg` (mapeado a --radius-lg via @theme)
  - Reemplazar:
    - `src/components/curso2/CourseForm2.astro` en index2.astro
    - `src/components/auditoria/AuditoriaForm.astro` en auditoria.astro
    - Form inline en diagnostico.astro (~200 lineas)
  - **Riesgo:** Medio. Es solo visual, pero hay que verificar que se vea bien en cada contexto.
  - **Dependencias:** Ninguna, pero validar visualmente despues de FASE 3 (border-radius).

- [ ] **2.2. Crear src/components/ui/FormLight.astro**
  - Referencia: `src/components/landing/CourseForm.astro` (white card, 2-col grid)
  - Es solo diseno, no hay logica de submit funcional. Borrar JS residual si existe.
  - Props: `buttonText`, `title`, `subtitle`, `class`
  - Campos: nombre, email, empresa, cargo (hardcoded por ahora)
  - Reemplazar:
    - `src/components/landing/CourseForm.astro` en index.astro
    - Form inline en guia.astro (~200 lineas)
  - **Riesgo:** Medio. Misma razon que 2.1.
  - **Dependencias:** Ninguna.

---

## FASE 3: Design tokens, Tailwind v4 best practices y consistencia visual

Limpiar global.css para seguir las mejores practicas de Tailwind v4, activar tokens correctamente, y estandarizar valores visuales.

- **Agents:** astro-designer, astro-reviewer
- **Recommended-IA:** Sonnet (aplicacion sistematica de reglas, no requiere razonamiento complejo)

- [ ] **3.0. Limpiar global.css y alinear con Tailwind v4 best practices**
  - Tailwind v4 mapea automaticamente los tokens de `@theme` a clases utilitarias. Los tokens `--radius-*` ya definidos en `@theme` generan las clases `rounded-md`, `rounded-lg`, `rounded-xl` automaticamente.
  - **Verificar que Tailwind v4 esta usando nuestros tokens:** al definir `--radius-md: 12px` en `@theme`, la clase `rounded-md` deberia aplicar 12px (no el default de Tailwind de 6px). Si no funciona asi, usar la sintaxis correcta de Tailwind v4:
    ```css
    @theme {
      --radius-md: 12px;
      --radius-lg: 24px;
      --radius-xl: 32px;
    }
    ```
    Con esto, `rounded-md`, `rounded-lg`, `rounded-xl` usan nuestros valores automaticamente. NO usar `rounded-[--radius-md]` — eso es un workaround innecesario.
  - **Limpiar reglas base redundantes:** las reglas `button, input { border-radius: var(--radius-md) }` e `img, video { border-radius: var(--radius-md) }` en global.css son problematicas — aplican radius a TODOS los inputs/imgs incluso cuando no se quiere. Evaluar si eliminarlas y confiar en las clases de Tailwind por componente.
  - **Revisar `section { padding: 3rem 0 }` y `footer { padding: 2rem 0 }`:** estas reglas base se sobreescriben en cada seccion con py-*. Evaluar si eliminarlas o si sirven como fallback util.
  - **Revisar colores duplicados:** `--color-slate-*` duplica colores que Tailwind v4 ya tiene nativamente (slate-50, slate-100, etc). Eliminar los duplicados y usar los nativos de Tailwind.
  - **Revisar `.titleCapitalice`:** clase utilitaria custom con typo en el nombre. Evaluar si convertir a clases de Tailwind o renombrar.
  - Archivos: `src/styles/global.css`
  - **Riesgo:** Medio-alto. Cambiar tokens puede afectar todo el sitio. Hacer build + revision visual despues.
  - **Dependencias:** Antes de 3.1 (los demas cambios de radius dependen de que el theme este limpio).

- [ ] **3.1. Estandarizar border-radius con tokens nativos de Tailwind v4**
  - Una vez que 3.0 confirme que `rounded-md/lg/xl` usan nuestros tokens:
  - Regla de aplicacion (basada en index2 como referencia):
    - `rounded-md` (12px): inputs, buttons, chips, tags, imagenes
    - `rounded-lg` (24px): cards, CTA sections, forms
    - `rounded-xl` (32px): solo hero containers o elementos decorativos grandes
  - Reemplazar valores arbitrarios e inconsistentes en todas las paginas:
    - `rounded-[2.5rem]` (index.astro promo) -> `rounded-xl`
    - `rounded-2xl` -> `rounded-lg` o `rounded-xl` segun contexto
    - Cualquier `rounded-[--radius-*]` -> `rounded-md/lg/xl` (forma nativa)
  - Archivos afectados: todas las paginas y componentes
  - **Riesgo:** Medio. Cambio visual amplio pero predecible. Requiere revision visual pagina por pagina.
  - **Dependencias:** 3.0 completada.

- [ ] **3.2. Estandarizar logo sizes**
  - Regla: h-10 en hero, h-8 en footer
  - Archivos:
    - `index.astro`: verificar hero logo (deberia ser h-10), footer logo (h-8)
    - `index2.astro`: hero tiene h-12, cambiar a h-10. Footer tiene h-10, cambiar a h-8.
    - `guia.astro`: verificar y ajustar
    - `diagnostico.astro`: NO tiene logo en hero (agregar?). Footer a h-8.
    - `auditoria.astro`: verificar y ajustar
  - **Riesgo:** Bajo. Cambio aislado.
  - **Dependencias:** 1.3 (si el Footer unificado ya estandariza esto, solo queda el hero).

- [ ] **3.3. Estandarizar spacing entre secciones**
  - Referencia: index2.astro usa `py-16` y `py-20` (mas ligero, mejor ritmo visual)
  - Las demas paginas usan `py-24` de forma uniforme, index.astro usa `py-24 md:py-32` (excesivo)
  - Propuesta: estandarizar a `py-16` para secciones ligeras (trust strips, cert strips) y `py-20` para secciones de contenido principal
  - Nota: global.css ya tiene `section { padding: 3rem 0; }` (py-12 equivalente) en @layer base, pero se sobreescribe en cada seccion
  - Archivos afectados: todas las paginas
  - **Riesgo:** Medio. Cambio visual perceptible. Requiere revision por pagina.
  - **Dependencias:** Ninguna.

- [ ] **3.4. Estandarizar glow/gradient patterns**
  - Referencia: index2.astro usa buenos gradientes (dark-block: blue opacity-10 + purple opacity-10)
  - Inconsistencias actuales: opacidades de 5%, 10%, 15%, 20%, 30% usadas sin criterio
  - Propuesta: definir 2-3 patrones de glow reutilizables:
    - Glow principal: bg-brand-blue opacity-10 blur-[120px]
    - Glow secundario: bg-[#6366f1] opacity-10 blur-[100px]
    - Glow sutil: bg-brand-blue opacity-5 blur-[80px]
  - Opcional: crear clases utilitarias en global.css o componente `<Glow>` si se repite mucho
  - Archivos: index.astro, diagnostico.astro, auditoria.astro (aplicar glows consistentes en secciones dark)
  - **Riesgo:** Bajo-medio. Cambio decorativo, no estructural.
  - **Dependencias:** Ninguna.

---

## FASE 4: Estructura, layout y responsive

Refactorizar paginas que no respetan el patron `section > m-container > m-row > m-col`. Incluye revision responsive porque muchos problemas de responsive se originan en estructura HTML incorrecta.

**Nota:** auditoria.astro tiene problemas de responsive conocidos. Es probable que muchos se solucionen al refactorizar la estructura en esta fase y en las fases anteriores (componentes unificados, tokens estandarizados). Aun asi, se incluye una tarea de revision responsive especifica para cada pagina refactorizada.

- **Agents:** astro-architect, astro-ui-builder, astro-reviewer
- **Recommended-IA:** Opus (refactor estructural con riesgo de romper layouts, requiere razonamiento sobre semantica y layout)

- [ ] **4.1. Refactorizar index.astro hero**
  - Estado actual: usa `<section>`, `div.grid`, grid de 12 columnas con divs
  - Objetivo: `<header> > m-container > m-row > m-col` (como index2.astro)
  - Mantener el diseno visual, cambiar solo la estructura HTML
  - Verificar responsive despues del cambio (mobile: stack vertical, tablet/desktop: 2 columnas)
  - **Riesgo:** Alto. El hero es lo primero que se ve. Cualquier regresion visual es inmediatamente visible.
  - **Dependencias:** FASE 1 completada (menos componentes duplicados que complicar el refactor).

- [ ] **4.2. Refactorizar index.astro form section**
  - Estado actual: usa `div + max-w-4xl` hardcoded
  - Objetivo: `section > m-container > m-row > m-col`
  - Eliminar max-w-4xl hardcoded, usar el width de m-container
  - **Riesgo:** Medio.
  - **Dependencias:** 2.2 (FormLight ya deberia estar creado).

- [ ] **4.3. Refactorizar index.astro course section**
  - Estado actual: usa `div.grid.grid-cols-12`
  - Objetivo: `section > m-container > m-row > m-col`
  - **Riesgo:** Medio.
  - **Dependencias:** Ninguna.

- [ ] **4.4. Corregir diagnostico.astro agitation section**
  - Estado actual: usa raw grid con `max-w-5xl mx-auto`
  - Objetivo: `section > m-container > m-row > m-col`
  - **Riesgo:** Medio.
  - **Dependencias:** Ninguna.

- [ ] **4.5. Corregir auditoria.astro: estructura y responsive**
  - Process section: usa raw grid -> refactorizar a `section > m-container > m-row > m-col`
  - Testimonials grid: `grid-cols-3` se aplica en mobile (bug) -> corregir a `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
  - **Revision responsive integral de auditoria.astro**: esta pagina tiene multiples problemas de responsive conocidos. Verificar en 320px, 375px, 768px, 1024px, 1440px despues de aplicar todos los cambios de esta fase y las anteriores.
  - **Riesgo:** Medio-alto. Es la pagina con mas problemas acumulados.
  - **Dependencias:** Fases 1-3 completadas (muchos fixes de responsive vienen de la unificacion de componentes y tokens).

- [ ] **4.6. Revision responsive de todas las paginas**
  - Verificar todas las paginas en: 320px, 375px, 768px, 1024px, 1440px
  - Puntos criticos:
    - Hero layouts en tablet (m-row debe hacer flex-col en mobile)
    - Form layouts en mobile
    - Card grids en mobile (deben colapsar a 1 columna)
    - Spacing excesivo en mobile
  - Corregir problemas encontrados in situ
  - **Riesgo:** Medio. Pueden surgir problemas no anticipados.
  - **Dependencias:** 4.1-4.5 completadas.

---

## FASE 5: Pulido final

Revision cruzada de consistencia y calidad. La revision responsive ya se hizo en FASE 4.

- **Agents:** astro-reviewer, astro-designer
- **Recommended-IA:** Opus (revision critica integral, debe detectar regresiones y inconsistencias sutiles)

- [ ] **5.1. Revision de heroes**
  - Verificar que todos los heroes sigan la estructura de index2: `<header> > m-container > m-row > m-col` con contenido a la izquierda y form/CTA a la derecha
  - No necesitan ser identicos visualmente, pero si estructuralmente consistentes
  - Verificar: logo presente en todos los heroes (diagnostico no lo tiene actualmente)
  - Archivos: todas las paginas
  - **Riesgo:** Bajo (es revision, no refactor).
  - **Dependencias:** FASE 4 completada.

- [ ] **5.2. Revision de cards y secciones de contenido**
  - Verificar consistencia de: padding interno, border-radius (tokens), hover effects, sombras
  - Referencia: index2.astro problem section, info-cards, benefit cards
  - Archivos: todas las paginas
  - **Riesgo:** Bajo.
  - **Dependencias:** FASE 3 completada.

- [ ] **5.3. Verificacion final**
  - Ejecutar `astro build` sin errores ni warnings
  - Verificar que no queden imports rotos por componentes eliminados
  - Verificar que no queden archivos huerfanos nuevos
  - Verificar comment separators y section IDs en todas las paginas
  - **Riesgo:** Bajo.
  - **Dependencias:** Todo lo anterior.

---

## Notas tecnicas

### Decisiones de estandarizacion

| Elemento | Valor estandar | Clase Tailwind v4 | Referencia |
|----------|---------------|-------------------|-----------|
| Logo hero | h-10 | `h-10` | index2.astro |
| Logo footer | h-8 | `h-8` | Nuevo estandar |
| Section spacing | py-16 (ligero) / py-20 (contenido) | `py-16` / `py-20` | index2.astro |
| Border-radius inputs/buttons | 12px | `rounded-md` (via @theme --radius-md) | global.css token |
| Border-radius cards/forms | 24px | `rounded-lg` (via @theme --radius-lg) | global.css token |
| Border-radius decorativo | 32px | `rounded-xl` (via @theme --radius-xl) | global.css token |
| Glow opacity | 10% estandar | `opacity-10` | index2.astro |
| Footer variant default | dark (bg-brand-dark) | `bg-brand-dark` | Mayoria de paginas |
| Form dark glass | bg-white/5 backdrop-blur | `bg-white/5 backdrop-blur-xl` | CourseForm2.astro |
| Layout pattern | section > m-container > m-row > m-col | N/A (web components) | CLAUDE.md regla |

### Tailwind v4: como funcionan los tokens de radius

En Tailwind v4, al definir `--radius-md: 12px` en `@theme {}`, la clase `rounded-md` automaticamente usa 12px (sobreescribe el default de Tailwind). NO hace falta usar `rounded-[--radius-md]` ni `rounded-[var(--radius-md)]`. Es la forma nativa y correcta.

```css
@theme {
  --radius-md: 12px;   /* -> rounded-md = 12px */
  --radius-lg: 24px;   /* -> rounded-lg = 24px */
  --radius-xl: 32px;   /* -> rounded-xl = 32px */
}
```

El responsive override en `@media (max-width: 767px)` que reduce los radius funciona correctamente con este approach porque modifica las custom properties que Tailwind consume.

### Trade-offs

1. **Footer unificado vs independiente:** CLAUDE.md dice "cada landing es independiente" pero tambien permite componentes compartidos en `src/components/ui/`. Los footers son funcionalmente identicos con variaciones cosmeticas menores. Unificar con props es la decision correcta.

2. **Forms son solo diseno:** Los forms actuales no tienen logica de submit funcional. Se pueden unificar libremente como componentes visuales. La logica de envio se implementara despues.

3. **Spacing py-16/py-20 vs py-24:** Reducir el spacing puede hacer que las paginas se sientan mas "apretadas" en desktop. Validar visualmente antes de aplicar globalmente.

4. **index2.astro como referencia:** Este archivo tiene un bug estructural (contenido fuera de Layout). Una vez corregido en FASE 0, sigue siendo la mejor referencia de diseno.

5. **Limpieza de global.css:** Eliminar reglas base como `img { border-radius }` y colores slate duplicados puede tener efectos cascada. Hacer build despues de cada cambio.

### Orden de ejecucion recomendado

```
FASE 0 (limpieza) -> FASE 1 (componentes UI) -> FASE 2 (forms) -> FASE 3 (tokens) -> FASE 4 (layout) -> FASE 5 (pulido)
```

Dentro de cada fase, las tareas pueden ejecutarse en paralelo salvo donde se indiquen dependencias explicitas.

> PLANIFICACION COMPLETADA: No se debe avanzar con la fase de ejecucion hasta que el Usuario de manera explicita apruebe este documento y autorice el inicio de la misma.
