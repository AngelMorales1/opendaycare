# SPEC 02 — Pantallas de niños (lista y perfil)

> **Status:** Implemented
> **Depends on:** SPEC 01
> **Date:** 2026-11-17
> **Objective:** Implementar las pantallas de gestión de niños: lista en `/kids` y perfil en `/kids/[id]`, con navegación desde el side menu, estilos en Tailwind idénticos a los prototipos, diseño mobile para cada página y contenido estático.

## Scope

**In:**

- Crear ruta `/kids` (`app/kids/page.tsx`) que liste a los niños de la Sala Soles, reproduciendo visualmente el prototipo `references/pantallas/ninos.dc.html`.
- Crear ruta dinámica `/kids/[id]` (`app/kids/[id]/page.tsx`) que muestre el perfil de un niño, reproduciendo visualmente el prototipo `references/pantallas/perfil-nino.dc.html`.
- Navegación desde el side menu: el botón "Niños" del sidebar debe marcarse como activo y llevar a `/kids`.
- Cada tarjeta de niño en `/kids` debe llevar al enlace `/kids/<id-del-nino>` al hacer clic.
- Botón "Volver a Niños" en `/kids/[id]` que regrese a `/kids`.
- Estilos transformados a Tailwind (igual que el feed de SPEC 01): fondo `#F6ECDF`, tarjetas `#FFFDF9`, fuentes Fredoka y Nunito, scrollbar del prototipo, sin dark mode.
- Cargar las fuentes Fredoka y Nunito vía `next/font/google` (ya configurado en `app/layout.tsx` de SPEC 01).
- Componentes reutilizables en `components/` (kid card, kids list, profile sections).
- Contenido estático (sin base de datos ni autenticación); datos de niños como constantes.
- Filtrado de la lista de niños por nombre desde el buscador de `/kids` (interacción client-side).
- Diseño responsive con breakpoints nativos de Tailwind (mobile < 768px, tablet/desktop ≥ 768px): sidebar sticky en desktop, drawer en mobile.
- Diseño mobile explícito de cada página (`/kids` y `/kids/[id]`): encabezado, buscador, grid de tarjetas (una columna en mobile), perfil con avatar y datos apilados verticalmente, botones de acción apilados, y navegación del drawer funcionando en pantallas pequeñas.
- Testear con Playwright que ambas páginas se vean bien en desktop y en mobile (capturar screenshots y comparar visualmente contra los prototipos de referencia).

**Out of scope (for future specs):**

- Autenticación y sesión de usuario.
- Base de datos y persistencia; los niños son contenido estático.
- Edición real de datos del niño (el botón "Editar" se mantiene como enlace sin interacción real).
- Pantallas enlazadas adicionales (agregar niño, resumen del día, vincular padre).
- Interactividad real (vincular padres). El filtrado por nombre en el buscador está implementado.

## Data model

No hay datos persistentes. Se introduce un tipo para los niños:

```ts
type Kid = {
  id: string; // ej. "mateo-fernandez"
  initial: string; // inicial del avatar
  avatarBg: string; // color de fondo del avatar
  avatarColor: string; // color del texto del avatar
  name: string; // nombre completo del niño
  age: string; // ej. "3 años"
  parents: string; // ej. "2 padres vinculados" | "1 padre vinculado" | "sin padres vinculados"
  status?: "ACTIVA" | "PENDIENTE" | "MANÍ" | "LACTOSA" | "VINCULAR"; // etiqueta opcional de la tarjeta
  allergyNote?: string; // solo para el perfil
  birthDate?: string; // solo para el perfil
  room?: string; // solo para el perfil
  enrollment?: string; // solo para el perfil
};
```

Los datos viven como constante estática en un archivo de mock, reutilizando el patrón de `mock-data/mock.ts` de SPEC 01.

## Implementation plan

1. Actualizar `components/sidebar.tsx`: marcar el link "Niños" como activo (estilo `bg-accent-bg text-accent font-extrabold`) y cambiar su `href` a `/kids`; asegurar que los demás links del sidebar sigan funcionando.
2. Crear `mock-data/kids.ts` con el listado estático de niños (8 niños de la Sala Soles, con los datos del prototipo `ninos.dc.html`).
3. Crear `components/kid-card.tsx`: tarjeta de niño reutilizable con avatar, nombre, edad, padres, etiqueta de estado opcional y enlace a `/kids/<id>`.
4. Crear `app/kids/page.tsx`: lista de niños con encabezado "GESTIÓN · Niños", buscador, contador de niños y grid de tarjetas usando `KidCard`, más botón "Agregar niño".
5. Crear `app/kids/[id]/page.tsx`: perfil de niño con botón "Volver a Niños" (`/kids`), avatar grande, nombre, datos (alergias, fecha de nacimiento, sala, ingreso), padres vinculados y botón "Vincular otro padre".
6. Aplicar estilos Tailwind en todas las nuevas páginas y componentes (clases de `globals.css`: `--color-cream`, `--color-card`, `--color-ink`, etc.).
7. Ajustar diseño mobile de cada página: grid de tarjetas en una columna en `< 768px`, perfil con avatar y datos apilados verticalmente, botones de acción apilados, y navegación del drawer funcionando en pantallas pequeñas.
8. Testear con Playwright que `/kids` y `/kids/[id]` se vean bien en desktop y en mobile (capturar screenshots y comparar visualmente contra los prototipos de referencia).
9. Verificación: ejecutar `npm run build`, `npx tsc --noEmit` y `npm run lint`; comparar visualmente con los prototipos/screenshots.
10. Actualizar `components/app-shell.tsx` si es necesario para mantener el drawer responsive y el sidebar sticky en desktop.

## Acceptance criteria

- [x] `npm run build` termina sin errores.
- [x] `npx tsc --noEmit` no reporta errores de tipos.
- [x] `npm run lint` no reporta errores.
- [x] El side menu muestra el botón "Niños" como activo y navega a `/kids` al hacer clic.
- [x] La ruta `/kids` muestra la lista de niños de la Sala Soles con avatar, nombre, edad y padres vinculados.
- [x] Cada tarjeta de niño en `/kids` enlaza a `/kids/<id-del-nino>` al hacer clic.
- [x] El buscador de `/kids` filtra la lista de niños por nombre (sin recargar la página).
- [x] La ruta `/kids/[id]` muestra el perfil del niño con datos del prototipo (alergias, fecha de nacimiento, sala, ingreso, padres vinculados).
- [x] El botón "Volver a Niños" en `/kids/[id]` regresa a `/kids`.
- [x] Las fuentes Fredoka y Nunito se aplican (títulos en Fredoka, cuerpo en Nunito).
- [x] Los colores de fondo (`#F6ECDF`) y tarjetas (`#FFFDF9`) coinciden con los prototipos.
- [x] No hay dark mode aplicado; las páginas se ven claras.
- [x] En viewport ≥ 768px se muestra el sidebar sticky y no hay barra superior mobile.
- [x] En viewport < 768px se muestra barra superior con hamburguesa y el sidebar se abre como drawer.
- [x] El diseño mobile de `/kids` se ve bien en pantallas pequeñas (tarjetas en una columna, encabezado y buscador adaptados).
- [x] El diseño mobile de `/kids/[id]` se ve bien en pantallas pequeñas (avatar y datos apilados verticalmente, botones de acción apilados).
- [x] Playwright confirma que `/kids` y `/kids/[id]` se ven bien en desktop y en mobile (screenshots comparados contra prototipos de referencia).

## Decisions

- **Sí:** rutas dinámicas de Next.js `/kids` y `/kids/[id]` para cumplir con los links requeridos.
- **Sí:** `next/link` para navegación interna entre `/kids`, `/kids/[id]` y `/` (mejora respecto a SPEC 01 donde se usaron `<a>` por alcance limitado).
- **Sí:** `next/font/google` para Fredoka y Nunito (ya configurado en `app/layout.tsx` de SPEC 01, no se duplica).
- **Sí:** componentes en `components/` (kid card, kids list) para reutilizar entre lista y perfil.
- **Sí:** contenido estático en `mock-data/kids.ts`, sin base de datos.
- **Sí:** respetar las Code Rules de `AGENTS.md` (nombres y variables en inglés, texto de UI en español).
- **Sí:** responsive dentro del mismo SPEC 02, usando breakpoints nativos de Tailwind (md = 768px).
- **Sí:** testear con Playwright en desktop y mobile, capturando screenshots para comparar contra los prototipos de referencia.

## Risks

| Risk                                                                      | Mitigation                                                          |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Diferencias sutiles de renderizado de fuentes (next/font vs Google Fonts) | Comparar visualmente con screenshots de referencia.                 |
| Estilos inline verbosos y propensos a typos                               | Copiar valores del prototipo con cuidado; typecheck + build + lint. |
| Enlaces rotos a pantallas no implementadas                                | Aceptado por alcance; se implementarán en specs futuras.            |
| Diferencias de renderizado entre desktop y mobile                         | Testear con Playwright en ambos viewports y comparar screenshots.   |

## What is **not** in this spec

- Autenticación y sesión.
- Base de datos y persistencia.
- Edición real de datos del niño.
- Pantallas enlazadas adicionales (agregar niño, resumen del día, vincular padre).
- Interactividad real (vincular padres). El filtrado por nombre en el buscador está implementado.
- Dark mode.

Cada uno de esos, si se implementa, va en su propia spec.
