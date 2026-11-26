# SPEC 05 — Validación y persistencia del alta de niño

> **Status:** Implemented
> **Depends on:** SPEC 02, SPEC 04
> **Date:** 2026-11-17
> **Objective:** Validar la fecha de nacimiento al agregar un niño y persistir el nuevo niño en el archivo mock (`mock-data/kids.json`), actualizando la lista de `/kids` automáticamente.

## Scope

**In:**

- Migrar los datos de niños de `mock-data/kids.ts` (constante) a `mock-data/kids.json`, leyéndolos en tiempo de ejecución mediante `getKids()` en `mock-data/kids.ts`.
- Crear `app/kids/actions.ts` con el Server Action `addKid` que valida los datos y agrega el niño al JSON.
- Validación de fecha de nacimiento: formato `dd/mm/aaaa`, fecha válida del calendario, no futura, edad entre 0 y 6 años.
- Validación de nombre completo obligatorio.
- Persistencia: el Server Action escribe el nuevo entry en `mock-data/kids.json` y llama a `revalidatePath("/kids")`.
- Actualizar `components/add-kid-modal.tsx` para usar el Server Action, mostrar errores de validación y cerrar el modal al guardar correctamente.
- Actualizar consumidores (`app/kids/page.tsx`, `app/kids/[id]/page.tsx`, `app/activate-account/page.tsx`) para usar `getKids()`.
- Hacer `/kids/[id]` dinámico (sin `generateStaticParams`) para soportar perfiles de niños agregados en tiempo de ejecución.
- Verificación con Playwright (flujo completo: abrir modal, validar fecha inválida, guardar válido, verificar aparición en la lista y perfil).

**Out of scope (for future specs):**

- Edición/eliminación de niños.
- Validación de otros campos (email, teléfono).
- Autenticación y sesión.
- Base de datos real.
- Dark mode.

## Data model

Los datos viven en `mock-data/kids.json` (array de `Kid`). El tipo `Kid` se mantiene en `components/kid-card.tsx`.

`mock-data/kids.ts` expone `getKids(): Kid[]` que lee el JSON en tiempo de ejecución.

El nuevo niño se construye con: `id` (slug del nombre), `initial`, `avatarBg`/`avatarColor` (color aleatorio de paleta), `name`, `age` (calculada), `parents: "sin padres vinculados"`, `allergyNote`, `birthDate` (formato es-AR), `room`, `enrollment` (mes/año actual), `linkedParents: []`.

## Implementation plan

1. Migrar datos a `mock-data/kids.json` (script de transformación).
2. Reescribir `mock-data/kids.ts` con `getKids()` que lee el JSON.
3. Actualizar consumidores para usar `getKids()`.
4. Hacer `/kids/[id]` dinámico (eliminar `generateStaticParams`).
5. Crear `app/kids/actions.ts` con `addKid` (validación + persistencia + revalidate).
6. Actualizar `components/add-kid-modal.tsx` para usar el Server Action y mostrar errores.
7. Verificación: build/tsc/lint + Playwright (validación inválida, guardado válido, aparición en lista y perfil).
8. Limpiar datos de prueba del JSON.

## Acceptance criteria

- [x] `npm run build` termina sin errores.
- [x] `npx tsc --noEmit` no reporta errores de tipos.
- [x] `npm run lint` no reporta errores.
- [x] La fecha de nacimiento se valida (formato dd/mm/aaaa, fecha válida, no futura, edad 0-6 años).
- [x] Un error de validación se muestra en el modal sin cerrarlo ni guardar.
- [x] Al guardar correctamente, el niño se agrega a `mock-data/kids.json`.
- [x] La lista de `/kids` se actualiza automáticamente tras guardar.
- [x] El perfil del nuevo niño (`/kids/<id>`) se renderiza correctamente.
- [x] Las fuentes Fredoka y Nunito se aplican.
- [x] No hay dark mode aplicado.
- [x] Playwright confirma el flujo completo sin errores de consola.
- [x] Sin errores en la consola del navegador.

## Decisions

- **Sí:** migrar a JSON para permitir escritura en tiempo de ejecución (el Server Action escribe el archivo).
- **Sí:** `getKids()` lee el archivo en cada llamada para reflejar cambios sin reiniciar.
- **Sí:** `/kids/[id]` dinámico para soportar perfiles de niños agregados en runtime.
- **Sí:** validación en el servidor (Server Action) como fuente de verdad; el cliente solo envía FormData.
- **Sí:** color de avatar aleatorio de una paleta fija.
- **No:** base de datos real. Fuera de alcance; el JSON es el "archivo mock".
- **No:** validación de otros campos. Solo fecha y nombre.

## Risks

| Risk | Mitigation |
| --- | --- |
| Escritura en FS no disponible en producción (read-only) | Aceptado: el proyecto es dev/mock; en producción el FS es de solo lectura. |
| Concurrencia en escritura del JSON | Aceptado: uso secuencial en dev; no hay concurrencia real. |
| Fechas con locale incorrecto | Usar `toLocaleDateString("es-AR")` para consistencia. |

## What is **not** in this spec

- Edición/eliminación de niños.
- Validación de otros campos.
- Base de datos real.
- Autenticación y sesión.
- Dark mode.

Cada uno de esos, si se implementa, va en su propia spec.
