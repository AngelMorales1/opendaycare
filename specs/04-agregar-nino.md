# SPEC 04 — Pantalla de agregar niño

> **Status:** Implemented
> **Depends on:** SPEC 01, SPEC 02
> **Date:** 2026-11-17
> **Objective:** Implementar el modal de alta de niño que se abre desde `/kids` al pulsar "Agregar niño", reproduciendo el prototipo `references/pantallas/agregar-nino.dc.html`, con formulario estático (sin persistencia), selector de sala con varias opciones y diseño responsive.

## Scope

**In:**

- Implementar el alta de niño como un **modal** que se abre al pulsar "Agregar niño" en `/kids`, reproduciendo visualmente el prototipo `agregar-nino.dc.html`: tarjeta centrada (max 520px) sobre overlay, con cabecera "Cancelar / Agregar niño / Guardar", y formulario con campos NOMBRE COMPLETO, FECHA DE NACIMIENTO + SALA, ALERGIAS (ETIQUETAS) y NOTAS MÉDICAS.
- Componente cliente `components/add-kid-modal.tsx` que gestiona el estado de apertura/cierre del modal (botón "Agregar niño" + diálogo).
- Estilos transformados a Tailwind (igual que SPEC 01/02/03): fondo `#F6ECDF` en `/kids`, tarjeta del modal `#FBF4EC` con borde `#ECE0D0`, fuentes Fredoka y Nunito, sin dark mode.
- Actualizar `app/kids/page.tsx` para usar `<AddKidModal />` en lugar del enlace a `agregar-nino.dc.html`.
- Campos estáticos: inputs y textarea sin validación ni persistencia; "Guardar" y "Cancelar" cierran el modal.
- Selector SALA con al menos tres opciones (Soles, Lunas, Estrellas, Nubes), valor por defecto "Soles".
- Diseño responsive: la fila FECHA DE NACIMIENTO + SALA se apila verticalmente en mobile (`< 768px`); el modal usa padding reducido y ancho completo en pantallas pequeñas; el overlay permite scroll.
- Verificación con Playwright en desktop y mobile (screenshots + comparación visual contra el prototipo).

**Out of scope (for future specs):**

- Persistencia avanzada (edición/eliminación de niños). El alta básica se implementó en SPEC 05.
- Validación de formularios, estados de error y estados de carga.
- Gestión de salas (crear/editar salas).
- Subida de foto/avatar del niño.
- Autenticación y sesión.
- Dark mode.

## Data model

No se introducen nuevas estructuras de datos. La pantalla es puramente presentacional y reutiliza el tipo `Kid` de SPEC 02 solo como referencia conceptual; no lee ni escribe datos.

Los valores del formulario (placeholders) son literales estáticos en la página, como en el prototipo.

## Implementation plan

1. Crear `components/add-kid-modal.tsx` (client component): botón "Agregar niño" + modal con overlay, tarjeta centrada (max 520px), cabecera de tres columnas ("Cancelar", "Agregar niño", "Guardar") y cuerpo con los campos del formulario. El overlay se cierra al hacer clic fuera o con "Cancelar"/"Guardar".
2. Implementar los campos: NOMBRE COMPLETO (input), FECHA DE NACIMIENTO (input `dd/mm/aaaa`) + SALA (selector con opciones Soles, Lunas, Estrellas, Nubes, valor por defecto "Soles", con ícono de chevron), ALERGIAS (ETIQUETAS) (input), NOTAS MÉDICAS (textarea con min-height 90px).
3. Estilizar con Tailwind: tarjeta `#FBF4EC` con borde `#ECE0D0` y sombra, inputs con borde `#EADFD0`, labels en mayúsculas con tracking, selector nativo con `appearance-none` y chevron absoluto.
4. Actualizar `app/kids/page.tsx`: reemplazar el enlace "Agregar niño" por `<AddKidModal />`.
5. Eliminar la ruta standalone `app/kids/new/` si existía.
6. Ajustar diseño responsive: apilar FECHA DE NACIMIENTO y SALA en `< 768px`; padding reducido en la tarjeta y en los campos; overlay con scroll.
7. Testear con Playwright que el modal se abra y se vea bien en desktop y mobile (screenshots y comparación visual contra el prototipo).
8. Verificación: ejecutar `npm run build`, `npx tsc --noEmit` y `npm run lint`.

## Acceptance criteria

- [x] `npm run build` termina sin errores.
- [x] `npx tsc --noEmit` no reporta errores de tipos.
- [x] `npm run lint` no reporta errores.
- [x] El modal se abre al pulsar "Agregar niño" en `/kids` y reproduce el prototipo: cabecera "Cancelar / Agregar niño / Guardar" y formulario con los cuatro campos.
- [x] "Cancelar" y "Guardar" cierran el modal.
- [x] El botón "Agregar niño" de `/kids` abre el modal (no navega a otra ruta).
- [x] El selector SALA ofrece al menos tres opciones (Soles, Lunas, Estrellas, Nubes) con "Soles" por defecto.
- [x] Las fuentes Fredoka y Nunito se aplican.
- [x] El fondo `#F6ECDF` y la tarjeta `#FBF4EC` coinciden con el prototipo.
- [x] No hay dark mode aplicado.
- [x] En viewport ≥ 768px la fila FECHA DE NACIMIENTO + SALA se muestra lado a lado.
- [x] En viewport < 768px la fila se apila verticalmente y la tarjeta se adapta.
- [x] Playwright confirma que el modal se ve bien en desktop y mobile (screenshots comparados contra el prototipo de referencia).
- [x] Sin errores en la consola del navegador.

## Decisions

- **Sí:** página standalone (sin `AppShell`). Coincide con el prototipo (tarjeta centrada, sin sidebar).
- **Sí:** formulario estático sin persistencia. Consistente con el alcance de los specs anteriores (sin DB).
- **Sí:** "Cancelar" y "Guardar" cierran el modal. Sin persistencia, consistente con el alcance (sin DB).
- **Sí:** implementar el alta como modal en lugar de ruta standalone. Coincide con el comportamiento esperado (abrir al pulsar "Agregar niño") y evita una página separada.
- **Sí:** selector SALA con opciones Soles, Lunas, Estrellas, Nubes (valor por defecto "Soles"). Más de tres opciones, como se pidió.
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
