# PLAN p006: Reestructuración de Layout Semántico

El propósito de este plan es corregir el abuso de CSS Grid en los layouts mayores de la landing (`index2.astro`). En lugar de apilar elementos verticales mediante celdas sobre el ancho completo, reemplazaremos estas grillas innecesarias por el uso estricto y semántico de los Web Components propios del proyecto (`<m-row>` y `<m-col>`) dictados por el diseño de sistema. Grid se reservará exclusivamente para contenido de naturaleza matricial.

- **Agentes involucrados:** astro-page-builder, astro-architect
- **Modelo recomendado:** Gemini Pro (Requiere análisis estructural detallado para asegurar refactoring de layouts anidados).

---

## 1. Fase 1: Limpieza del Hero y Problema

- [x] **1.1. Refactorización `#hero`**
  - [x] 1.1.1. Sustituir `grid` genérico por `<m-row flex>`.
  - [x] 1.1.2. Mapear proporción visual (`1.2fr` / `0.8fr`) configurando los `flex-basis` de cada `<m-col>`.
- [x] **1.2. Refactorización `#problem`**
  - [x] 1.2.1. Sustituir `grid` de dos columnas por `<m-row flex>`.
  - [x] 1.2.2. Envolver columna de texto y columna "dark block" en etiquetas `<m-col>`.

## 2. Fase 2: Corrección Estructural del Bento y Cards

- [x] **2.1. Refactorización `#bento`**
  - [x] 2.1.1. Desarmar por completo la grilla principal de `lg:grid-cols-4`.
  - [x] 2.1.2. Mapear 'Main block' en un `<m-row>`.
  - [x] 2.1.3. Mapear 'Quote block' en un `<m-row>`.
  - [x] 2.1.4. Mapear los cuatro renglones inferiores de 'Benefits' dentro de una única `<m-row flex>` que contenga un `<m-col>` idéntico por beneficio.
- [x] **2.2. Refactorización `#info-cards`**
  - [x] 2.2.1. Sustituir `grid md:grid-cols-2` por `<m-row flex>`.
  - [x] 2.2.2. Mantener comportamiento adaptativo (stack en móvil, flex en escritorio) preservando las tarjetas internas intactas.

---

## Notas

[Se deberá validar que el reemplazo de grillas por flexbox preserve o mejore la responsividad móvil original (stack vertical regular en pantallas estrechas).]

> 🚧 **PLANIFICACIÓN COMPLETADA:** No se debe avanzar con la fase de ejecución hasta que el Usuario de manera explícita apruebe este documento y autorice el inicio de la misma.
