# SPEC 03 — Pantallas de autenticación (login y activación de cuenta)

> **Status:** Implemented
> **Depends on:** SPEC 01, SPEC 02
> **Date:** 2026-11-17
> **Objective:** Implementar las pantallas de autenticación `/login` y `/activate-account` reproduciendo los prototipos `references/pantallas/login.dc.html` y `references/pantallas/activar-cuenta.dc.html`, sin autenticación real ni roles, con contenido estático y diseño responsive.

## Scope

**In:**

- Crear ruta `/login` (`app/login/page.tsx`) reproduciendo visualmente el prototipo `login.dc.html`: panel de marketing a la izquierda (gradiente coral, logo, titular, subtítulo, "Guardería Sala Soles") y formulario a la derecha (email, contraseña, "¿Olvidaste tu contraseña?", botón "Iniciar sesión", enlace a activación de cuenta).
- Crear ruta `/activate-account` (`app/activate-account/page.tsx`) reproduciendo visualmente el prototipo `activar-cuenta.dc.html`: tarjeta centrada con logo, bienvenida, bloque del hijo invitado (Mateo · Sala Soles), código de invitación, email, contraseña, checkbox de autorización de fotos y botón "Activar mi cuenta", más enlace a "Iniciar sesión".
- Omitir el selector de tipo de usuario (Personal/Familia) del login: login único sin roles; el botón "Iniciar sesión" lleva siempre a `/`.
- Páginas standalone (sin `AppShell`, sidebar ni drawer), como en los prototipos.
- Estilos transformados a Tailwind (igual que SPEC 01/02): fondo `#FBF4EC` en ambas pantallas (distinto del feed `#F6ECDF`), tarjetas `#FFFDF9`, fuentes Fredoka y Nunito, sin dark mode.
- Reutilizar `mock-data/kids.ts` (SPEC 02) para obtener el niño invitado (Mateo) en `/activate-account`.
- Mantener enlaces a pantallas no implementadas como `<a>` con sus `href` originales (`familia-feed.dc.html` en "Activar mi cuenta").
- Diseño responsive: el layout dividido del login se apila verticalmente en mobile; la tarjeta de activación se adapta con padding reducido.
- Verificación con Playwright en desktop y mobile (screenshots + comparación visual contra prototipos).

**Out of scope (for future specs):**

- Autenticación y sesión real; las credenciales no se validan.
- Roles de usuario (Personal/Familia) y rutas diferenciadas por rol.
- Registro/creación de usuario ("crear usuario" se resuelve omitiendo el selector de rol, sin flujo de alta real).
- Feed de padres (`familia-feed.dc.html`).
- Restablecimiento de contraseña ("¿Olvidaste tu contraseña?" queda como enlace sin destino implementado).
- Validación de formularios, estados de error y estados de carga.
- Persistencia de sesión (cookies, localStorage).
- Dark mode.

## Data model

No se introducen nuevas estructuras de datos. Se reutiliza el tipo `Kid` de SPEC 02 para obtener el niño invitado en `/activate-account`:

```ts
// Reutilizado desde components/kid-card.tsx (SPEC 02)
const invitedKid = kids.find((k) => k.id === "mateo-fernandez");
// invitedKid.name -> "Mateo Fernández" (mostrar "Mateo")
// invitedKid.room -> "Soles"
```

Los valores del formulario (código de invitación `7K4P9`, email `lucia.fernandez@gmail.com`, contraseña por defecto) son literales estáticos en la página, como en el prototipo.

## Implementation plan

1. Crear `app/login/page.tsx`: layout de dos columnas (`grid-cols-[1.05fr_1fr]` en desktop, apilado en mobile). Columna izquierda: panel gradiente coral con logo, titular "El día de cada niño, compartido con su familia.", subtítulo, "🌿 Guardería Sala Soles". Columna derecha: formulario centrado (max 392px) con "Iniciar sesión", "Ingresá para ver el día de hoy.", campos Email y Contraseña, "¿Olvidaste tu contraseña?", botón "Iniciar sesión" (`next/link` a `/`), enlace "¿Te invitó la guardería? Activá tu cuenta" → `/activate-account`.
2. Crear `app/activate-account/page.tsx`: tarjeta centrada (max 440px) con logo, "Bienvenida a OpenDayCare", subtítulo, bloque del hijo invitado (avatar "M", "Te invitaron a seguir a", "Mateo · Sala Soles"), campos Código de invitación (Fredoka, letter-spacing), Email, Crear contraseña, checkbox de autorización de fotos (marcado), botón "Activar mi cuenta" (`<a href="familia-feed.dc.html">`), enlace "¿Ya tenés cuenta? Iniciar sesión" → `/login`.
3. Aplicar estilos Tailwind en ambas páginas: fondo `#FBF4EC`, gradiente del panel coral, inputs con borde `#EADFD0`, botones con gradiente `#F4977E → #EE8164` y sombra.
4. Ajustar diseño responsive: en `< 768px` el login apila el panel de marketing encima del formulario (o lo compacta); la tarjeta de activación usa padding reducido y ancho completo.
5. Testear con Playwright que `/login` y `/activate-account` se vean bien en desktop y mobile (screenshots y comparación visual contra los prototipos).
6. Verificación: ejecutar `npm run build`, `npx tsc --noEmit` y `npm run lint`.

## Acceptance criteria

- [x] `npm run build` termina sin errores.
- [x] `npx tsc --noEmit` no reporta errores de tipos.
- [x] `npm run lint` no reporta errores.
- [x] La ruta `/login` reproduce el prototipo: panel de marketing a la izquierda y formulario a la derecha.
- [x] El login no incluye selector de tipo de usuario (Personal/Familia).
- [x] El botón "Iniciar sesión" en `/login` lleva a `/`.
- [x] El enlace "Activá tu cuenta" en `/login` lleva a `/activate-account`.
- [x] La ruta `/activate-account` reproduce el prototipo: bienvenida, bloque del hijo invitado (Mateo · Sala Soles), código, email, contraseña, checkbox de autorización y botón "Activar mi cuenta".
- [x] El bloque del hijo invitado reutiliza los datos de `mock-data/kids.ts` (Mateo).
- [x] El enlace "Iniciar sesión" en `/activate-account` lleva a `/login`.
- [x] El enlace "Activar mi cuenta" mantiene su `href` original (`familia-feed.dc.html`).
- [x] Las fuentes Fredoka y Nunito se aplican.
- [x] El fondo `#FBF4EC` y las tarjetas `#FFFDF9` coinciden con los prototipos.
- [x] No hay dark mode aplicado.
- [x] En viewport ≥ 768px el login muestra el layout de dos columnas.
- [x] En viewport < 768px el login se apila verticalmente y la tarjeta de activación se adapta.
- [x] Playwright confirma que `/login` y `/activate-account` se ven bien en desktop y mobile (screenshots comparados contra prototipos de referencia).
- [x] Sin errores en la consola del navegador.

## Decisions

- **Sí:** omitir el selector Personal/Familia del login. El usuario lo pidió explícitamente; sin roles ni auth real, un único flujo es suficiente.
- **No:** implementar auth, sesión o validación. Fuera de alcance; se hará en una spec futura.
- **Sí:** páginas standalone (sin `AppShell`). Coincide con los prototipos de auth y evita mostrar sidebar a usuarios no logueados.
- **Sí:** reutilizar `mock-data/kids.ts` para el hijo invitado (Mateo). Mantiene consistencia con los datos de la Sala Soles.
- **Sí:** mantener el `href` original `familia-feed.dc.html` en "Activar mi cuenta" (como `<a>`), consistente con SPEC 01 para destinos no implementados.
- **No:** convertir ese enlace a `next/link` a `/`. Evita tocar alcance y mantiene el contrato del prototipo.
- **Sí:** fondo `#FBF4EC` (específico de auth), distinto del `#F6ECDF` del feed, para respetar el prototipo.
- **Sí:** responsive dentro del mismo spec, usando breakpoints nativos de Tailwind (md = 768px).
- **No:** agregar página de registro/"crear usuario" real. El enunciado se resuelve omitiendo el selector de rol.

## Risks

| Risk                                                    | Mitigation                                                               |
| ------------------------------------------------------- | ------------------------------------------------------------------------ |
| Layout dividido del login se rompe en mobile            | Apilar columnas en `< 768px` y probar con Playwright en ambos viewports. |
| Diferencias sutiles del gradiente coral del panel       | Copiar valores exactos del prototipo (`#F6A98E`, `#F2937A`, `#EC7E62`).  |
| Fuentes Fredoka/Nunito en inputs (código de invitación) | Aplicar `font-fredoka` y letter-spacing en el input del código.          |
| Enlace a `familia-feed.dc.html` roto                    | Aceptado por alcance; se implementará cuando exista el feed de padres.   |

## What is **not** in this spec

- Autenticación y sesión.
- Roles de usuario y rutas por rol.
- Feed de padres (`familia-feed`).
- Registro/creación de usuario real.
- Restablecimiento de contraseña.
- Validación de formularios y estados de error/carga.
- Persistencia de sesión.
- Dark mode.

Cada uno de esos, si se implementa, va en su propia spec.
