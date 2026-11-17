# Agente verificador de aceptación de specs (nivel de proyecto)

**Repositorio:** `open-daycare` (Next.js 16.4.5, App Router)
**Ubicación:** `.agents/verificador-spec/` (solo dentro del proyecto, no global)
**Motor por defecto:** `nemotron-3.5-super-vl-free` (3.5 Super V, soporta visión)
**Motor alternativo para visión:** `qwen3.6-plus` (comparación de screenshots)

## Propósito

Revisar, corregir y marcar los checks de la sección **Acceptance criteria** de un archivo de spec en `specs/`.

Para cada check (`- [ ]` / `- [x]`) el agente:
1. **Revisa** si se cumple contra el código actual del proyecto.
2. **Corrige/ajusta** el texto del check si es ambiguo o no verificable (regla: solo ítems booleanos, nada de "que funcione bien").
3. **Marca** el check como cumplido (`[x]`) o pendiente (`[ ]`), con nota breve de por qué.
4. Genera un **reporte de verificación**.

El agente **sí tiene permiso de editar el spec** y marcar los checks directamente, y también de solo reportar (según lo que pida el usuario).

## Verificaciones que realiza

| Tipo de check | Cómo se verifica | Herramienta |
|---|---|---|
| `npm run build` | Ejecuta el comando y revisa el código de salida | Shell del proyecto |
| `npx tsc --noEmit` | Ejecuta el comando y revisa el código de salida | Shell del proyecto |
| `npm run lint` | Ejecuta el comando y revisa el código de salida | Shell del proyecto |
| Fuentes Fredoka/Nunito vía `next/font/google` | Inspecciona `app/layout.tsx` | Lectura de archivo |
| Colores `#F6ECDF` y `#FFFDF9` | Inspecciona `app/globals.css` | Lectura de archivo |
| Sidebar con "Feed" activo | Inspecciona `components/sidebar.tsx` | Lectura de archivo |
| Sin dark mode | Inspecciona `app/globals.css` (sin media query dark) | Lectura de archivo |
| Responsive / drawer mobile | Inspecciona `components/app-shell.tsx` | Lectura de archivo |
| Pantallas creadas (renderizado) | Playwright + screenshot vs `references/screenshots/` | Playwright MCP + modelo de visión |
| Recomendaciones Next.js | Context7 (`/vercel/next.js`, v16.4.5) | Context7 MCP |

## Context7 (recomendaciones de Next.js)

Antes de verificar un spec, el agente consulta Context7 con la librería **Next.js** (`/vercel/next.js`) para validar que el código implementado siga las recomendaciones vigentes de la versión 16.4.5:

- Cargar fuentes con `next/font/google` en el Root Layout (`app/layout.tsx`) y aplicar el `className` al `<html>` (no usar `<link>` a Google Fonts).
- Tipado de rutas: `LayoutProps<"/">` y App Router.
- Estructura de `app/`: `layout.tsx`, `page.tsx`, `globals.css`.
- Tailwind v4 vía `@import "tailwindcss"` en `globals.css` (sin `tailwind.config`).
- `cacheComponents`, `partialPrefetching`, `agentFeedback` habilitados en `next.config.ts`.

Resultado documentado en el reporte.

## Playwright + visión (pantallas)

Cuando un check se refiere a una pantalla creada (ej. "la home `/` muestra el feed con sidebar..."):

1. Levantar la app (`npm run dev` o `npm run start`).
2. Usar el MCP de Playwright (`npx @playwright/mcp@latest`, ya configurado globalmente) para navegar a la ruta y capturar un screenshot.
3. Comparar ese screenshot con el de referencia en `references/screenshots/` (ej. `feed.png`) usando un **modelo con visión** (3.5 Super V por defecto, o `qwen3.6-plus` si se prefiere).
4. Si coinciden visualmente → check `[x]`. Si no → `[ ]` con nota de la diferencia.

## Flujo de uso

Desde la raíz del proyecto:

```bash
# Ver un spec y marcar sus checks (edita el spec + genera reporte)
node .agents/verificador-spec/verificar.mjs specs/01-feed.md

# Ver solo un spec concreto (por número o slug)
node .agents/verificador-spec/verificar.mjs 01
```

El script:
1. Lee el spec.
2. Ejecuta `npm run build`, `npx tsc --noEmit`, `npm run lint`.
3. Inspecciona el código para los checks estáticos (fuentes, colores, sidebar, dark mode, responsive).
4. Para los checks de pantalla, deja constancia de "pendiente de verificación visual con Playwright + visión" (requiere ejecución separada con navegador).
5. **Edita el spec** marcando los checks verificados (`[x]`).
6. Genera `.agents/verificador-spec/reporte-<slug>.md` con el resultado detalle.

## Modelo de visión

Por defecto se usa el motor actual del proyecto: **3.5 Super V** (`nemotron-3.5-super-vl-free`), que soporta visión para comparar screenshots. Se puede cambiar a `qwen3.6-plus` editando `verificar.mjs` o pasando la variable `VISION_MODEL`.

## Notas

- Este agente vive a **nivel de proyecto** (dentro del repo), no en la configuración global de OpenCode.
- No implementa funcionalidad de la app: solo verifica specs.
- Los cambios en `specs/` se dejan para que el usuario los revise y commit.
