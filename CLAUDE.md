# 🌐 ramdel-web — Claude Code Workspace

> **Leer este archivo completo antes de ejecutar cualquier acción.**
> Este archivo es la única fuente de verdad para Claude Code en este proyecto.
> Si algo no está aquí, **pregunta a Mario — no adivines**.

---

## ⚡ Inicio de Sesión — Protocolo Obligatorio

Al abrir este workspace, Claude Code debe hacer esto **antes de cualquier otra cosa**:

```
1. Leer este archivo (CLAUDE.md) — completo
2. Verificar rama activa: git branch --show-current
3. Revisar cambios pendientes: git status
4. Si hay change activo en OpenSpec: leer openspec/changes/<nombre>/tasks.md
5. Reportar a Mario: "Listo. Rama: X. Change activo: Y. ¿Continuamos?"
```

**Nunca** empieces a ejecutar comandos sin completar estos 5 pasos.

---

## Identidad y Propósito

Eres un asistente de desarrollo para el portafolio profesional de Mario de Jesus (`ramdel.dev`). Tu rol es ayudar a implementar features, remediaciones de seguridad, mejoras de UX/UI y mantenimiento del sitio.

**Owner:** Mario de Jesus (ramdel)
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · next-intl · React Hook Form + Zod
**Hosting:** Vercel · DNS: Porkbun (ramdel.dev) / Route 53 (ramdel.mx)

---

## Reglas Anti-Alucinación — CRÍTICO

1. **No modifiques archivos sin leerlos primero.** Usa `read_file` antes de editar.
2. **Si no tienes el output de un comando, no reportes resultados** — ejecuta y usa el output real.
3. **No inventes dependencias.** Verifica `package.json` antes de sugerir instalar paquetes.
4. **Paths exactos.** Usa la estructura de carpetas documentada abajo — no asumas rutas.
5. **i18n:** Cualquier texto visible en UI debe estar en los 3 archivos: `messages/en.json`, `messages/es.json`, `messages/fr.json`.
6. **Si un build falla**, reporta el error exacto. No reintentes con cambios diferentes sin avisar.
7. **Secrets:** Nunca hardcodees credenciales. Usar `process.env.*` siempre. Variables en `.env.local` (gitignored).

---

## Reglas de Trabajo

| Tipo de cambio | Comportamiento |
|---|---|
| **Leer archivos, explorar código** | Ejecutar automáticamente |
| **Editar código, configs** | Mostrar diff propuesto + pedir confirmación |
| **Instalar dependencias** | Mostrar `npm install <pkg>` + pedir confirmación |
| **Commits y pushes** | Solo con aprobación explícita de Mario |
| **Crear/eliminar archivos** | Siempre pedir confirmación |

---

## Estructura del Proyecto

```
ramdel-web/
├── CLAUDE.md                    ← este archivo
├── openspec/                    ← Spec-Driven Development
│   ├── specs/                   ← fuente de verdad (estado actual del sistema)
│   │   ├── app/spec.md          ← comportamiento del sitio (páginas, rutas, i18n)
│   │   ├── security/spec.md     ← postura de seguridad (headers, CSP, cookies)
│   │   ├── infrastructure/spec.md ← deployment, Vercel, env vars
│   │   └── api/spec.md          ← endpoints y contratos de API
│   └── changes/                 ← cambios activos (uno por feature/fix)
│       └── archive/             ← cambios completados
├── src/
│   ├── app/
│   │   ├── [locale]/            ← rutas i18n (en/es/fr)
│   │   │   ├── page.tsx         ← homepage
│   │   │   ├── about/           ← about page
│   │   │   ├── contact/         ← contact page
│   │   │   └── projects/        ← projects page
│   │   └── api/
│   │       └── contact/         ← POST /api/contact/
│   ├── components/
│   │   ├── layout/              ← Nav, Footer
│   │   ├── ui/                  ← componentes reutilizables
│   │   └── forms/               ← ContactForm
│   ├── lib/
│   │   └── analytics.ts
│   ├── i18n.ts
│   └── middleware.ts            ← i18n routing + security headers
├── messages/
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── next.config.js               ← config principal (security headers aquí)
├── next.config.ts               ← si existe conflicto, usar solo .js
└── .github/
    ├── PULL_REQUEST_TEMPLATE.md
    └── workflows/
        ├── ci.yml               ← lint + build en cada PR
        ├── conventional-commits.yml
        └── validate-pr.yml
```

---

## Convenciones de Código

### Branch Naming
```
feat/descripcion-corta
fix/descripcion-corta
sec/descripcion-corta
refactor/descripcion-corta
docs/descripcion-corta
ci/descripcion-corta
chore/descripcion-corta
```

### Commit Messages (Conventional Commits)
```
type(scope): subject
```

| Type | Uso |
|---|---|
| `feat` | Nueva página, componente, o funcionalidad |
| `fix` | Bug fix |
| `sec` | Security fix o hardening (headers, CSP, cookies) |
| `docs` | Solo documentación |
| `chore` | Mantenimiento, dependencias |
| `refactor` | Reestructuración sin cambio de comportamiento |
| `ci` | Cambios en pipelines |
| `perf` | Mejoras de performance |
| `style` | Cambios de estilo/CSS sin lógica |
| `build` | Build system, deps |
| `infra` | Vercel config, DNS, deployment |

**Reglas del subject:** lowercase · imperativo · máx 72 chars · sin punto final

### Pull Requests
- Título sigue el mismo formato que commits
- Body usa el template de `.github/PULL_REQUEST_TEMPLATE.md`
- Nunca pushear directo a `main` — siempre via PR

---

## Comandos de Desarrollo

```bash
# Desarrollo local
npm run dev          # http://localhost:3000

# Verificación antes de PR
npm run lint         # ESLint
npm run build        # build de producción

# i18n — verificar que los 3 locales tienen las mismas keys
# (manual por ahora — no hay script automático)
```

---

## Variables de Entorno

```bash
# .env.local (gitignored — nunca commitear)
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=<from AWS console>
AWS_SECRET_ACCESS_KEY=<from AWS console>
NEXT_PUBLIC_ANALYTICS_ID=<analytics id>
```

En Vercel: configurar en Project Settings → Environment Variables.

---

## Security Context

Este proyecto tiene hallazgos de seguridad activos documentados en `../security-audits/openspec/`. Los que requieren cambios de código están trackeados en `openspec/changes/` de este repo:

| Change | Hallazgos | Severidad |
|---|---|---|
| `security-headers` | F-09 (CSP), F-10 (Permissions-Policy) | 🟠 Alto / ⚠️ Medio |
| `cookie-hardening` | F-08/F-17 (NEXT_LOCALE flags) | ⚠️ Medio |
| `api-rate-limiting` | F-26/F-27 (/api/contact/ rate limit + CSRF) | ⚠️ Medio |

Referencia completa: `../security-audits/openspec/specs/targets/ramdel.dev/spec.md`

---

## OpenSpec — Flujo de Trabajo

```
/opsx:propose "descripción"  →  crea change con proposal/specs/design/tasks
/opsx:apply                  →  implementa las tareas del change activo
/opsx:archive <nombre>       →  mergea delta specs al source of truth
```

Para implementar un change existente:
1. Leer `openspec/changes/<nombre>/tasks.md`
2. Ejecutar cada tarea en orden
3. Marcar checkboxes al completar
4. Al terminar: `openspec archive <nombre>`

---

## Notas de Infraestructura

- **Vercel:** deploy automático desde `main`. PRs generan preview deployments.
- **next.config.js vs next.config.ts:** El repo tiene ambos. Usar `.js` como principal — si generan conflicto, consolidar en `.js`.
- **next-intl:** rutas son `[locale]` — siempre probar en `/en/`, `/es/`, `/fr/`.
- **AWS SES:** integración opcional para el form de contacto. Sin credenciales el form puede usar un fallback.

---

*Workspace de desarrollo — Mario de Jesus (ramdel)*
*Última actualización: 2026-03-25*
