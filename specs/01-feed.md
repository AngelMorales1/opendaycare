# SPEC 01 — Pantalla de feed (vista de maestra)

> **Status:** Implemented
> **Depends on:** —
> **Date:** 2026-11-10
> **Objective:** Implementar la pantalla de feed con estilos idénticos al prototipo `references/pantallas/feed.dc.html`, sin autenticación ni base de datos, usando contenido estático.

## Scope

**In:**

- Reemplazar la home actual (`/`, `app/page.tsx`) por el feed.
- Reproducir visualmente el prototipo: sidebar, encabezado, tarjeta "Compartí un momento…", etiqueta "PUBLICADO HOY" y tres publicaciones (logro, actividad con foto, anuncio).
- Cargar las fuentes Fredoka y Nunito vía `next/font/google`.
- Base visual clara en `globals.css` (fondo `#F6ECDF`, texto `#3F362E`, scrollbar del prototipo), sin dark mode.
- Componentes reutilizables en `components/` (sidebar, compose prompt, post card).
- Enlaces del prototipo mantenidos como `<a>` con sus `href` originales (destinos aún no implementados).
- Diseño responsive con los breakpoints nativos de Tailwind (mobile < 768px, tablet/desktop ≥ 768px): sidebar se convierte en drawer en mobile con barra superior y botón hamburguesa; el contenido pasa a ancho completo con padding reducido.

**Out of scope (for future specs):**

- Autenticación y sesión de usuario (la maestra "Caro Giménez" es fija/estática).
- Base de datos y persistencia; el feed es contenido estático.
- Las demás pantallas enlazadas (crear publicación, detalle, foto, niños, avisos, mi cuenta, login).
- Interactividad real (likes, comentarios, edición).


## Data model

No hay datos persistentes. Se introduce un tipo para las publicaciones del feed:

```ts
type Post = {
  id: string;
  childInitial: string; // inicial del avatar del niño
  name: string; // nombre del niño o "Anuncio general"
  avatarBg: string; // color de fondo del avatar
  avatarColor: string; // color del texto del avatar
  avatarIcon?: "megaphone"; // si está presente, muestra ícono en lugar de inicial
  time: string; // ej. "14:20 · publicado por vos"
  badge: {
    label: string; // LOGRO | ACTIVIDAD | ANUNCIO
    bg: string;
    dot: string;
    color: string;
  };
  audience: string; // ej. "Para: familia de Mateo"
  body: string;
  photo?: { label: string }; // si existe, muestra placeholder de foto
  likes: number;
  comments: number;
};
```

Los datos viven como constante estática en `app/page.tsx` (3 publicaciones del prototipo).

## Implementation plan

1. Actualizar `app/globals.css`: reemplazar variables y base por los estilos del prototipo (reset `*{box-sizing:border-box}`, márgenes 0, fondo `#F6ECDF`, texto `#3F362E`, fuente Nunito como fallback, scrollbar webkit). Eliminar la media query de dark mode.
2. Actualizar `app/layout.tsx`: cargar `Fredoka` y `Nunito` con `next/font/google`, exponer variables CSS, `lang="es"`, metadata con título "OpenDayCare", body con las clases base del prototipo.
3. Crear `components/sidebar.tsx`: sidebar estático (logo OpenDayCare / Sala Soles, botón "Nueva publicación", nav con Feed activo, bloque de usuario Caro Giménez y cierre de sesión) replicando los estilos inline del prototipo.
4. Crear `components/compose-prompt.tsx`: tarjeta "Compartí un momento…" con avatar, placeholder y botón de cámara.
5. Crear `components/post-card.tsx`: tarjeta de publicación a partir del tipo `Post`, incluyendo badge, audiencia, texto, placeholder de foto opcional y fila de likes/comentarios/editar.
6. Reescribir `app/page.tsx`: componer `Sidebar` + `main` con encabezado ("GUARDERÍA · SALA SOLES", "Buenas, Caro", "12 niños · martes 17 jun"), `ComposePrompt`, etiqueta "PUBLICADO HOY" y lista de los 3 posts estáticos usando `PostCard`.
7. Verificación: ejecutar `npm run build`, `npx tsc --noEmit` y `npm run lint`; comparar visualmente con el prototipo/screenshot.
8. Crear `components/app-shell.tsx` (`"use client"`): contenedor responsive con sidebar de escritorio (`hidden md:block`), barra superior mobile (`md:hidden`) con botón hamburguesa, drawer lateral que se abre/cierra solo mediante el icono de cierre (X), y `<main>` con children.
9. Actualizar `components/sidebar.tsx` para aceptar `onNavigate?: () => void` y adjuntarlo a los links.
10. Actualizar `app/page.tsx`, `components/compose-prompt.tsx` y `components/post-card.tsx` con paddings responsive (`px-4 md:px-10`, `py-6 md:py-[34px]`, `p-4 md:py-5 md:px-[22px]`, `py-3.5 px-4 md:px-[18px]`).

## Acceptance criteria

- [x] `npm run build` termina sin errores.
- [x] `npx tsc --noEmit` no reporta errores de tipos.
- [x] `npm run lint` no reporta errores.
- [x] La home `/` muestra el feed con sidebar, encabezado, tarjeta de composición, etiqueta "PUBLICADO HOY" y las 3 publicaciones.
- [x] Las fuentes Fredoka y Nunito se aplican (títulos en Fredoka, cuerpo en Nunito).
- [x] Los colores de fondo (`#F6ECDF`) y tarjetas (`#FFFDF9`) coinciden con el prototipo.
- [x] El sidebar marca "Feed" como activo con el estilo del prototipo.
- [x] No hay dark mode aplicado; la página se ve clara.
- [x] En viewport < 768px se muestra barra superior con hamburguesa y el sidebar se abre como drawer.
- [x] El drawer solo se cierra al clickear el icono de cierre (X), no por backdrop ni por navegación.
- [x] En viewport ≥ 768px se muestra el sidebar sticky y no hay barra superior mobile.
- [x] El contenido se adapta (padding reducido en mobile, ancho completo).

## Decisions

- **Sí:** reemplazar la home `/` por el feed. Es la pantalla principal y no existe auth aún.
- **No:** crear ruta `/feed` separada. Evita duplicar y mantener un scaffold inútil.
- **Sí:** `next/font/google` para Fredoka y Nunito. Optimización y sin layout shift.
- **No:** etiqueta `<link>` a Google Fonts. Menos optimizado.
- **Sí:** mantener enlaces como `<a>` con `href` originales. Conserva el estilo idéntico y evita fricción con typed routes.
- **No:** convertir a `next/link` tipado. Requeriría rutas stub y ampliaría el alcance.
- **Sí:** eliminar dark mode y base clara. Coincide exacto con el prototipo.
- **No:** mantener dark mode. La feed se vería distinta en modo oscuro.
- **Sí:** componentes en `components/`. Mejora legibilidad sin cambiar el estilo.
- **No:** todo en un solo `page.tsx`. Menos mantenible.
- **Sí:** respetar las Code Rules de `AGENTS.md` (nombres y variables en inglés, texto de UI en español). Mantiene consistencia con el resto del proyecto.
- **Sí:** responsive dentro del mismo SPEC 01, usando breakpoints nativos de Tailwind (md = 768px). Reutiliza el patrón para futuras pantallas.
- **Sí:** drawer mobile que solo se cierra con el icono X (no por backdrop ni por navegación), para evitar cierres accidentales.
- **No:** botón FAB de "Nueva publicación" en mobile; el drawer alcanza.

## Risks

| Risk                                                                      | Mitigation                                                             |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Diferencias sutiles de renderizado de fuentes (next/font vs Google Fonts) | Comparar visualmente con screenshot `references/screenshots/feed.png`. |
| Estilos inline verbosos y propensos a typos                               | Copiar valores del prototipo con cuidado; typecheck + build + lint.    |
| Enlaces rotos a pantallas no implementadas                                | Aceptado por alcance; se implementarán en specs futuras.               |

## What is **not** in this spec

- Autenticación y sesión.
- Base de datos y persistencia.
- Otras pantallas enlazadas.
- Interactividad real (likes, comentarios, edición).
- Dark mode.

Cada uno de esos, si se implementa, va en su propia spec.
