# P015 — Lecciones Aprendidas para Agentes

Aprendizajes genericos extraidos del plan P014 (Unificacion y Pulido) y refinamientos aplicados al set de agentes en Abril 2026. No son especificos de este proyecto — son patrones reutilizables para cualquier proyecto Astro con Tailwind v4.

**Estado:** Aplicado a los agentes en `C:\Users\Gonzalo\.claude\agents\` el 2026-04-06.

---

## astro-architect

### 1. Ordenar fases de menor a mayor riesgo

Siempre planificar las fases empezando por limpieza de bajo riesgo (eliminar archivos huerfanos, fix bugs obvios) antes de abordar refactors estructurales. Esto reduce la superficie de errores cuando se llega a los cambios complejos.

### 2. Designar una pagina de referencia temprano

Identificar una pagina existente como "estandar visual y estructural" al inicio del plan. Todos los demas cambios se miden contra esta referencia. Esto elimina ambiguedad en decisiones de diseno y estructura.

### 3. Mapear duplicados antes de planificar unificacion

Antes de crear un componente unificado, hacer un inventario completo de todas las copias existentes, documentando diferencias byte por byte. Las copias identicas son merge trivial; las que difieren requieren props o variantes.

### 4. Declarar dependencias entre tareas explicitamente

Cada tarea debe listar sus dependencias. "Ninguna" es una dependencia valida. Esto permite paralelizar tareas dentro de una fase y evita que un agente ejecute algo que depende de un resultado aun no existente.

### 5. Incluir fase de limpieza previa (FASE 0) en todo plan de refactor

Antes de tocar estructura o componentes, eliminar deuda tecnica obvia: archivos huerfanos, bugs estructurales evidentes, clases CSS redundantes. Esto despeja el terreno y evita confusiones durante el refactor real.

### 6. Separar revision responsive de refactor estructural

Muchos bugs responsive se resuelven solos al corregir la estructura HTML. Planificar la revision responsive como tarea final de la fase de layout, no como fase independiente prematura.

---

## astro-designer

### 1. No duplicar tokens que el framework ya provee

Tailwind v4 incluye paletas nativas (slate, gray, etc). Definir `--color-slate-100` en `@theme` cuando Tailwind ya tiene `slate-100` crea confusion y mantenimiento doble. Solo definir tokens custom para valores que no existen en el framework.

### 2. Evitar reglas base globales que se sobreescriben siempre

Reglas como `img { border-radius: var(--radius-md) }` o `section { padding: 3rem 0 }` parecen utiles, pero si el 90% de los componentes las sobreescribe con clases de Tailwind, solo agregan ruido y efectos cascada inesperados. Preferir clases explicitas por componente.

### 3. Definir jerarquia clara de border-radius

Establecer una escala de radius con proposito semantico, no solo tamanio:

- **Pequenio** (inputs, buttons, chips): `rounded-md`
- **Mediano** (cards, forms, CTAs): `rounded-lg`
- **Grande** (heroes, elementos decorativos): `rounded-xl`

Documentar esta jerarquia para que los demas agentes no improvisen.

### 4. Estandarizar patrones decorativos (glows, gradients)

Definir 2-3 patrones de glow/gradient con opacidades y blur fijos. Cuando cada pagina inventa sus propios valores de opacity (5%, 10%, 15%, 20%, 30%), el resultado visual es inconsistente. Documentarlos como recetas reutilizables.

### 5. Spacing entre secciones: maximo 2-3 niveles

Elegir 2-3 valores de padding vertical para secciones (ej: `py-16` ligero, `py-20` contenido). Cuando cada pagina usa su propia combinacion (py-16, py-20, py-24, py-24 md:py-32), el ritmo visual se rompe. Documentar cual valor usar segun tipo de seccion.

### 6. Los responsive overrides de tokens son validos

Un `@media (max-width: 767px)` que reduce radius o spacing funciona correctamente con Tailwind v4 porque modifica las custom properties que las utilidades consumen. Es un patron valido para ajustar la escala visual en mobile sin tocar componentes.

---

## astro-ui-builder

### 1. Unificar con props, no con copias

Cuando existen 3-4 copias de un componente con diferencias menores (padding, color, root element), la solucion es un componente unico con props (`variant`, `theme`, `class` pass-through), no mantener copias separadas. Las diferencias cosmeticas se resuelven con props; las diferencias estructurales requieren componentes separados.

### 2. Consistencia de root element

Si el sistema de layout usa `m-col` como unidad de columna, todos los componentes que van dentro de un `m-row` deben usar `m-col` como root — no `div`. Mezclar root elements rompe la semantica del layout y genera inconsistencias de spacing.

### 3. Usar class pass-through para variaciones de spacing

En lugar de hardcodear padding en el componente, aceptar una prop `class` que permita sobreescribir desde la pagina. Esto evita crear variantes innecesarias y da flexibilidad al page-builder.

### 4. Slots para contenido flexible post-accion

Cuando un componente (ej: form) necesita contenido variable debajo del boton (texto de seguridad, chips, disclaimers), usar un named `<slot>` en lugar de props de texto. Esto permite inyectar HTML arbitrario sin inflar la API del componente.

### 5. Forms sin logica son componentes visuales puros

Si un formulario no tiene logica de submit implementada, tratarlo como componente puramente visual. Esto permite unificar variantes libremente sin preocuparse por romper integraciones. La logica de envio se agrega despues sobre el componente visual ya estable.

### 6. Verificar que m-container no necesita clases extra

Los web components como `m-container` a menudo ya tienen estilos definidos en global.css (`max-width`, `mx-auto`, `padding`). Antes de agregar clases de Tailwind a un web component, verificar si el estilo ya existe en su definicion global. Clases redundantes generan confusion sobre quien controla el layout.

---

## astro-page-builder

### 1. Siempre respetar el patron section > m-container > m-row > m-col

Toda seccion de contenido debe seguir esta jerarquia. Los shortcuts (`div.grid` directo, `max-w-5xl mx-auto` sin m-container) generan inconsistencias de ancho y spacing que se acumulan pagina a pagina.

### 2. No hardcodear max-width cuando m-container lo maneja

Si `m-container` ya tiene `max-width` definido via global.css o @theme tokens, agregar `max-w-4xl` inline es redundante y puede crear conflictos. Confiar en el sistema de layout.

### 4. Responsive grids deben declarar breakpoints explicitamente

Nunca usar `grid-cols-3` sin un breakpoint mobile. El patron correcto es `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`. Cada grid debe colapsar a 1 columna en mobile. Esto no es opcional — es un bug si no se hace.

### 5. Verificar contenido dentro de Layout

Todo el contenido de la pagina debe estar dentro de `<Layout>...</Layout>`. Contenido despues del cierre `</Layout>` es un bug estructural silencioso — se renderiza pero pierde estilos, scripts y estructura del layout.

### 6. Logo sizes estandarizados por contexto

Definir tamanios fijos de logo por ubicacion (ej: h-10 en hero, h-8 en footer) y respetarlos en todas las paginas. Esto evita la deriva visual donde cada pagina tiene un logo de tamanio ligeramente diferente.

### 7. Tailwind v4: flaggear syntax de tokens arbitrarios

En Tailwind v4, si `@theme` define `--radius-md: 12px`, la clase correcta es `rounded-md` (que automaticamente usa 12px). Las formas `rounded-[--radius-md]` y `rounded-[var(--radius-md)]` son workarounds innecesarios y deben flaggearse como WARNING.

---

## astro-reviewer

### 1. Buscar contenido fuera de Layout como check standard

Agregar a la rutina de QA: verificar que no haya HTML significativo despues del cierre `</Layout>` en ninguna pagina. Es un bug silencioso que no rompe el build pero pierde estilos globales.

### 2. Detectar componentes duplicados entre carpetas

Antes de aprobar una estructura de componentes, comparar archivos con nombres similares en diferentes carpetas (`components/auditoria/Chip.astro` vs `components/diagnostico/Chip.astro`). Duplicados identicos deben flaggearse para unificacion; duplicados con diferencias menores deben flaggearse para unificacion con props.

### 3. Validar que web components no tengan clases redundantes

Cuando global.css define estilos para `m-container` (max-width, padding, margin), esas mismas clases en el markup son redundantes. Flaggear `<m-container class="max-w-[--width-content] mx-auto px-5">` si esos estilos ya estan en la definicion global.

### 4. Flaggear reglas base en global.css que causan cascada no deseada

Reglas como `button, input { border-radius }` o `img { border-radius }` aplican a TODOS los elementos de ese tipo, incluso cuando no se quiere. Estas reglas deben flaggearse como WARNING con recomendacion de eliminarlas y usar clases de Tailwind por componente.

### 5. Verificar consistencia de spacing entre secciones

Comparar el padding vertical de las secciones entre paginas. Si una pagina usa `py-16`/`py-20` y otra usa `py-24`/`py-32`, flaggear la inconsistencia. El spacing entre secciones debe seguir un patron definido, no ser arbitrario por pagina.

### 6. Tailwind v4: flaggear syntax de tokens arbitrarios

En Tailwind v4, si `@theme` define `--radius-md: 12px`, la clase correcta es `rounded-md` (que automaticamente usa 12px). Las formas `rounded-[--radius-md]` y `rounded-[var(--radius-md)]` son workarounds innecesarios y deben flaggearse como WARNING.

---

## Notas transversales (aplican a todos los agentes)

### Trade-off: aislamiento vs unificacion

CLAUDE.md puede decir "cada landing es independiente" y al mismo tiempo permitir componentes compartidos en `src/components/ui/`. La regla practica: si un componente es **funcionalmente identico** entre landings con variaciones **solo cosmeticas**, unificar con props en `ui/`. Si tiene **logica o estructura diferente**, mantener copias independientes.

### Una pagina de referencia reduce la ambiguedad

Cuando hay multiples paginas con estilos inconsistentes, elegir una como referencia elimina el 80% de las discusiones sobre "cual es el valor correcto". Todos los agentes deben saber cual es la pagina de referencia del proyecto.

### Orden de ejecucion seguro para refactors

```
Limpieza -> Componentes UI -> Formularios -> Tokens/Design -> Layout/Estructura -> Pulido/QA
```

Este orden minimiza regresiones porque cada fase opera sobre una base mas limpia que la anterior.

---

## Actualizaciones de agentes — 2026-04-06

### astro-architect
- Incorpora el contenido completo de `astro-gh-pages.md` como skill de referencia.
- Ahora genera **siempre** la sección `## INDICE DE CONTROL GH PAGES (Checklist)` en cada PLAN.md (4 fases: despegue, imagenes, forms, dominio custom).

### astro-designer
- Nueva seccion explicita de **Tailwind v4 best practices**: orden de `@import`, prohibicion de tokens duplicados, sintaxis correcta de opacidades, prohibicion de `@apply`, consistencia de spacing entre secciones.

### astro-ui-builder
- Nueva regla: **deteccion proactiva de componentes**. Si un patron visual se repite 2+ veces, el agente debe pausar y proponer la extraccion como componente antes de continuar. Siempre con confirmacion del usuario.

### astro-reviewer
- Nuevo **CHECK 0**: antes de auditar, leer CLAUDE.md y todos los agentes. Documenta que versiones leyo. Evita auditorias basadas en contratos desactualizados.

### planner
- La regla de modelo ahora es mas granular: Haiku (boilerplate/mecanico), Sonnet (balance, mayoria del trabajo), Opus (solo arquitectura critica o trade-offs complejos). Instrucciones para agrupar subtareas y minimizar arranques de contexto.
- **Cada fase del plan ahora termina con un punto de revision** que invoca a `astro-reviewer` para auditar antes de pasar a la siguiente fase.
