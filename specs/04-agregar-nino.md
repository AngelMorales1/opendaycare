# SPEC 04 — Pantalla de agregar niño

> **Status:** Implemented
> **Depends on:** SPEC 01, SPEC 02
> **Date:** 2026-11-17
> **Objective:** Implementar la pantalla de alta de niño en `/kids/new` reproduciendo el prototipo `references/pantallas/agregar-nino.dc.html`, con formulario estático (sin persistencia) y diseño responsive.

## Scope

**In:**

- Crear ruta `/kids/new` (`app/kids/new/page.tsx`) reproduciendo visualmente el prototipo `agregar-nino.dc.html`: tarjeta centrada (max 520px) sobre fondo `#F6ECDF`, con cabecera "Cancelar / Agregar niño / Guardar", y formulario con campos NOMBRE COMPLETO, FECHA DE NACIMIENTO + SALA, ALERGIAS (ETIQUETAS) y NOTAS MÉDICAS.
- Página standalone (sin `AppShell`, sidebar ni drawer), como en el prototipo.
- Estilos transformados a Tailwind (igual que SPEC 01/02/03): fondo `#F6ECDF`, tarjeta `#FBF4EC` con borde `#ECE0D0`, fuentes Fredoka y Nunito, sin dark mode.
- Enlazar el botón "Agregar niño" de `/kids` (`app/kids/page.tsx`) a la nueva ruta mediante `next/link` (reemplazando el `<a href="agregar-nino.dc.html">` actual).
- Campos estáticos: inputs y textarea sin validación ni persistencia; "Guardar" y "Cancelar" son enlaces que llevan a `/kids`.
- Campo SALA con valor fijo "Soles" (no editable).
- Diseño responsive: la fila FECHA DE NACIMIENTO + SALA se apila verticalmente en mobile (`< 768px`); la tarjeta usa padding reducido y ancho completo en pantallas pequeñas.
- Verificación con Playwright en desktop y mobile (screenshots + comparación visual contra el prototipo).

**Out of scope (for future specs):**

- Persistencia: "Guardar" no crea ni modifica niños en `mock-data/kids.ts`.
- Validación de formularios, estados de error y estados de carga.
- Selector de sala (solo existe "Soles").
- Subida de foto/avatar del niño.
- Autenticación y sesión.
- Dark mode.

## Data model

No se introducen nuevas estructuras de datos. La pantalla es puramente presentacional y reutiliza el tipo `Kid` de SPEC 02 solo como referencia conceptual; no lee ni escribe datos.

Los valores del formulario (placeholders) son literales estáticos en la página, como en el prototipo.

## Implementation plan

1. Crear `app/kids/new/page.tsx`: tarjeta centrada (max 520px) con cabecera de tres columnas ("Cancelar" a la izquierda, título "Agregar niño" centrado, "Guardar" a la derecha), y cuerpo con los campos del formulario.
2. Implementar los campos: NOMBRE COMPLETO (input), FECHA DE NACIMIENTO (input `dd/mm/aaaa`) + SALA (valor fijo "Soles" con ícono de chevron), ALERGIAS (ETIQUETAS) (input), NOTAS MÉDICAS (textarea con min-height 90px).
3. Estilizar con Tailwind: fondo `#F6ECDF`, tarjeta `#FBF4EC` con borde `#ECE0D0` y sombra, inputs con borde `#EADFD0`, labels en mayúsculas con tracking.
4. "Cancelar" y "Guardar" como `next/link` a `/kids`.
5. Actualizar `app/kids/page.tsx`: cambiar el botón "Agregar niño" de `<a href="agregar-nino.dc.html">` a `<Link href="/kids/new">`.
6. Ajustar diseño responsive: apilar FECHA DE NACIMIENTO y SALA en `< 768px`; padding reducido en la tarjeta y en los campos.
7. Testear con Playwright que `/kids/new` se vea bien en desktop y mobile (screenshots y comparación visual contra el prototipo).
8. Verificación: ejecutar `npm run build`, `npx tsc --noEmit` y `npm run lint`.

## Acceptance criteria

- [x] `npm run build` termina sin errores.
- [x] `npx tsc --noEmit` no reporta errores de tipos.
- [x] `npm run lint` no reporta errores.
- [x] La ruta `/kids/new` reproduce el prototipo: cabecera "Cancelar / Agregar niño / Guardar" y formulario con los cuatro campos.
- [x] "Cancelar" y "Guardar" enlazan a `/kids`.
- [x] El botón "Agregar niño" de `/kids` enlaza a `/kids/new`.
- [x] El campo SALA muestra "Soles" como valor fijo.
- [x] Las fuentes Fredoka y Nunito se aplican.
- [x] El fondo `#F6ECDF` y la tarjeta `#FBF4EC` coinciden con el prototipo.
- [x] No hay dark mode aplicado.
- [x] En viewport ≥ 768px la fila FECHA DE NACIMIENTO + SALA se muestra lado a lado.
- [x] En viewport < 768px la fila se apila verticalmente y la tarjeta se adapta.
- [x] Playwright confirma que `/kids/new` se ve bien en desktop y mobile (screenshots comparados contra el prototipo de referencia).
- [x] Sin errores en la consola del navegador.

## Decisions

- **Sí:** página standalone (sin `AppShell`). Coincide con el prototipo (tarjeta centrada, sin sidebar).
- **Sí:** formulario estático sin persistencia. Consistente con el alcance de los specs anteriores (sin DB).
- **Sí:** "Cancelar" y "Guardar" como `next/link` a `/kids`. Evita links rotos y mantiene navegación coherente.
- **Sí:** enlazar el botón "Agregar niño" de `/kids` a `/kids/new`. Mejora la navegación (antes apuntaba a `agregar-nino.dc.html`).
- **Sí:** SALA como valor fijo "Soles". No hay otras salas implementadas.
- **No:** validación ni persistencia real. Fuera de alcance; merece su propia spec.
- **No:** selector de sala. Requiere lista de salas no existente.
- **Sí:** responsive dentro del mismo spec, usando breakpoints nativos de Tailwind (md = 768px).

## Risks

| Risk | Mitigation |
| --- | --- |
| Diferencias sutiles de la sombra/borde de la tarjeta | Copiar valores exactos del prototipo (`box-shadow`, `border-radius: 24px`). |
| Textarea sin altura consistente | Aplicar `min-h-[90px]` y `resize-y`. |
| Enlace roto si `/kids` cambia | Aceptado; la ruta es estable desde SPEC 02. |

## What is **not** in this spec

- Persistencia de datos (crear/editar niño).
- Validación de formularios.
- Selector de sala.
- Subida de avatar/foto.
- Autenticación y sesión.
- Dark mode.

Cada uno de esos, si se implementa, va en su propia spec.
