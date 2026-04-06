# P016 — Consistencia de Heroes entre Landings

**Estado:** Completado
**Agente:** `astro-page-builder` (Paso 1 Chip fix: `astro-ui-builder`)
**Modelo:** `sonnet`
**Referencia:** `index2.astro` es el modelo a seguir
**Alcance:** `guia.astro`, `diagnostico.astro`, `auditoria.astro` (excluir `index.astro`)

---

## Diagnóstico

Se analizaron las 4 landings. `index2` es el estándar. Las demás presentan inconsistencias significativas en la **columna 1** del hero (contenido) y en la relación con la **columna 2** (formulario).

### Problemas detectados

#### 1. Chips full-width (TODAS las páginas)

- Dentro de `m-col` (flex column), los chips se estiran al 100% del ancho.
- **Causa:** `m-col` aplica `display: flex; flex-direction: column` y los hijos se estiran por defecto.
- **Fix:** Agregar `self-start` (o `w-fit`) al componente `<Chip>` y al chip inline de guía.

#### 2. Logo en posiciones distintas

| Página      | Logo clases                        | Problema            |
| ----------- | ---------------------------------- | ------------------- |
| index2      | `h-10 w-auto` + `mb-12`            | OK (referencia)     |
| guia        | `h-10 mb-10 w-auto object-contain` | mb-10 vs mb-12      |
| diagnostico | `h-10 mb-10 w-auto`                | mb-10 vs mb-12      |
| auditoria   | `h-10` (sin mb, sin w-auto)        | Sin margen inferior |

**Estándar:** `h-10 w-auto mb-12`

#### 3. Tamaños de H1 distintos

| Página      | H1 size                             |
| ----------- | ----------------------------------- |
| index2      | `text-[clamp(2.5rem,3.5vw,3.5rem)]` |
| guia        | `text-4xl lg:text-5xl`              |
| diagnostico | `text-4xl lg:text-5xl xl:text-6xl`  |
| auditoria   | `text-4xl lg:text-5xl xl:text-6xl`  |

**Estándar:** Usar `text-[clamp(2.5rem,3.5vw,3.5rem)]` de index2, o normalizar a `text-4xl lg:text-5xl` en todas.

#### 4. Tamaños de párrafo distintos

| Página      | P size                               |
| ----------- | ------------------------------------ |
| index2      | `text-xl text-text-light`            |
| guia        | `text-lg lg:text-xl text-slate-300`  |
| diagnostico | `text-lg lg:text-xl text-slate-300`  |
| auditoria   | `text-xl lg:text-2xl text-slate-300` |

**Estándar:** `text-lg text-text-light` (ligeramente más chico que index2 como pidió el usuario)

#### 5. Colores de texto inconsistentes

- index2 usa `text-text-light` para párrafos (token del theme)
- Las demás usan `text-slate-300` (hardcoded Tailwind)
- **Fix:** Unificar a `text-text-light` (token del proyecto)

#### 6. Iconos multicolor en auditoria

- Auditoria usa 3 iconos con colores distintos: `text-brand-blue`, `text-red-500`, `text-green`
- **Fix:** Unificar todos a `text-brand-blue` (monocromo)

#### 7. Emoji en H1 de guía

- Guía tiene `🎯` inline en el H1
- **Fix:** no reomover emoji del H1 es parte de la variedad

#### 8. Altura total del hero inconsistente

| Página      | Header clases                                    |
| ----------- | ------------------------------------------------ |
| index2      | `min-h-screen flex items-center py-16`           |
| guia        | `pt-12 pb-24` (sin min-height)                   |
| diagnostico | `pt-10 pb-20 lg:pt-16 lg:pb-24` (sin min-height) |
| auditoria   | `pt-40 pb-24 lg:pt-52 lg:pb-32` (sin min-height) |

**Estándar:** Todos deben tener la misma altura. Usar `min-h-screen flex items-center py-16` como index2.

#### 9. Proporciones de columnas

| Página      | Col1             | Col2            |
| ----------- | ---------------- | --------------- |
| index2      | `flex-[1.2]`     | `flex-[0.8]`    |
| guia        | `flex-1 lg:pr-8` | `lg:flex-[0.8]` |
| diagnostico | `flex-1 lg:pr-4` | `lg:max-w-120`  |
| auditoria   | `lg:flex-[1.2]`  | `lg:flex-[0.8]` |

**Estándar:** Col1 `flex-[1.2]`, Col2 `flex-[0.8]` (como index2)

#### 10. Background color

| Página      | BG              |
| ----------- | --------------- |
| index2      | `bg-brand-dark` |
| guia        | `bg-navy-deep`  |
| diagnostico | `bg-navy-deep`  |
| auditoria   | `bg-brand-dark` |

**Decisión:** deben ser bg-brand-dark

#### 11. Guía no usa componente Chip

- Guía usa HTML inline para el chip en vez del componente `<Chip>`.
- **Fix:** Reemplazar por `<Chip>` con las mismas props.

#### 12. m-row gap inconsistente

| Página      | Gap                          |
| ----------- | ---------------------------- |
| index2      | `gap-16 lg:gap-16 xl:gap-20` |
| guia        | `gap-16`                     |
| diagnostico | `gap-12 lg:gap-16`           |
| auditoria   | `gap-12 lg:gap-16`           |

**Estándar:** `gap-12 lg:gap-16` (suficiente para todas)

---

## Estrategia de Alineación Vertical (col1 vs col2)

El objetivo es que ambas columnas se perciban alineadas, con col1 igual o menor en altura que col2 (el form), y centrada verticalmente cuando es más corta.

### Mecanismo CSS (3 capas)

```
header  → min-h-screen + flex + items-center
  m-row → flex-row + items-center
    m-col (col1) → flex-[1.2] + items-start
    m-col (col2) → flex-[0.8]
```

**Capa 1 — `header` con `min-h-screen flex items-center`:**
El hero siempre ocupa al menos el 100% del viewport. `flex items-center` centra verticalmente el `m-container` dentro de ese espacio. Esto garantiza que **todos los heroes tengan la misma altura visual** (100vh).

**Capa 2 — `m-row` con `items-center`:**
Esta es la clave. Al ser un flex-row con `items-center`, la columna más corta se centra verticalmente respecto a la más alta:

- Si col1 < col2 (form): el contenido de col1 queda centrado al lado del form. ✓
- Si col1 > col2 (form): el form se centra al lado del contenido. ✓
- Si col1 ≈ col2: ambos se alinean naturalmente. ✓

**Capa 3 — `m-col` col1 con `items-start`:**
Dentro de col1, `items-start` (align-items: flex-start) evita que los hijos internos (logo, chip, h1, p) se estiren al ancho completo. Cada hijo ocupa solo su ancho natural, alineado a la izquierda.

### ¿Por qué funciona sin altura fija?

El `LeadForm` tiene una altura natural relativamente constante (~480-520px en desktop) porque siempre tiene: título + subtítulo + 4 campos + botón + footer. Esto actúa como **ancla de altura**.

El contenido de col1 varía según la landing:

- **Con imagen/video** (index2, guía, diagnóstico): col1 es más alta → el form se centra al lado.
- **Sin imagen** (auditoría): col1 es más corta → col1 se centra al lado del form.

En ambos casos, `items-center` en el `m-row` produce el resultado correcto sin necesidad de alturas fijas o `min-h` artificiales.

### En mobile (< lg)

El `m-row` cambia a `flex-col` con `flex-col lg:flex-row`, así que las columnas se apilan verticalmente y `items-center` ya no tiene efecto en la alineación vertical — simplemente fluyen una debajo de la otra. No hay problema de alineación.

---

## Plan de Ejecución

### Paso 1 — Fix global: Chip no full-width

- **Archivo:** `src/components/ui/Chip.astro`
- **Cambio:** Agregar `self-start` a las clases del `<span>` raíz para que no se estire en flex containers.

### Paso 2 — Unificar guia.astro hero

- [x] Logo: cambiar `mb-10` a `mb-12`
- [x] Reemplazar chip inline por componente `<Chip>`
- [x] H1: no remover emoji `🎯`, unificar tamaño a `text-[clamp(2.5rem,3.5vw,3.5rem)]`
- [x] Párrafo: cambiar a `text-lg text-text-light`, remover `mb-10`
- [x] Header: agregar `min-h-screen flex items-center`
- [x] Col1: cambiar `flex-1 lg:pr-8` a `flex-[1.2] items-start`
- [x] Col2: asegurar `flex-[0.8]`
- [x] m-row gap: `gap-12 lg:gap-16 items-center`

### Paso 3 — Unificar diagnostico.astro hero

- [x] Logo: cambiar `mb-10` a `mb-12`
- [x] H1: unificar tamaño a `text-[clamp(2.5rem,3.5vw,3.5rem)]`, agregar `text-white` explícito
- [x] Párrafo: cambiar a `text-lg text-text-light`
- [x] Header: cambiar padding a `min-h-screen flex items-center py-16`
- [x] Col1: cambiar `flex-1 lg:pr-4` a `flex-[1.2] items-start`
- [x] Col2: cambiar `lg:max-w-120` a `flex-[0.8]`

### Paso 4 — Unificar auditoria.astro hero

- [x] Logo: agregar `w-auto mb-12`
- [x] Iconos multicolor: cambiar `text-red-500` y `text-green` a `text-brand-blue`
- [x] H1: unificar tamaño a `text-[clamp(2.5rem,3.5vw,3.5rem)]`
- [x] Párrafo: cambiar `text-xl lg:text-2xl text-slate-300` a `text-lg text-text-light`, quitar `font-medium`
- [x] Header: cambiar `pt-40 pb-24 lg:pt-52 lg:pb-32` a `min-h-screen flex items-center py-16`
- [x] Col1: agregar `items-start`, mantener `flex-[1.2]`; quitar `text-center lg:text-left` (debe ser siempre left-aligned como index2)

### Paso 5 — Revisión visual

- [x] Comparar los 4 heroes en desktop y mobile
- [x] Verificar que altura, proporciones y espaciado son consistentes
- [x] Verificar que los chips no se estiran

---

## Patrón Unificado (Resumen)

```
<header id="hero" class="bg-[dark-bg] min-h-screen flex items-center py-16 relative overflow-hidden">
  <m-container>
    <m-row class="flex-col lg:flex-row gap-12 lg:gap-16 items-center">
      <m-col class="flex-[1.2] items-start">
        <!-- Logo: siempre primero -->
        <img src={logo} alt="Mediabros" class="h-10 w-auto mb-12" />

        <!-- Imagen/Video (opcional): después del logo -->
        [imagen o video si aplica]

        <!-- Chip -->
        <Chip text="..." icon="..." class="mb-6 bg-brand-blue/10 border-brand-blue/30 text-blue-400" />

        <!-- H1 -->
        <h1 class="font-display font-extrabold leading-[1.1] tracking-tight text-white text-balance text-[clamp(2.5rem,3.5vw,3.5rem)] mb-2">
          ...
        </h1>

        <!-- P (ligeramente más chico) -->
        <p class="text-lg text-text-light max-w-xl leading-relaxed">
          ...
        </p>
      </m-col>

      <m-col class="flex-[0.8]">
        <LeadForm ... />
      </m-col>
    </m-row>
  </m-container>
</header>
```
