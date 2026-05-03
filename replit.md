# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

---

## CUIPEA — Prototipo MVP1 v1.4

Artefacto principal: `artifacts/cuipea` (`@workspace/cuipea`)

### Stack del prototipo

- Vite + React + TypeScript
- Tailwind CSS (mobile-first, frame 430px max)
- react-router-dom v6
- localStorage como storage (sin backend)
- lucide-react, recharts, qrcode.react
- Fuente: Plus Jakarta Sans

### Paleta de colores

| Nombre      | Hex       |
|-------------|-----------|
| navyDeep    | `#28325A` |
| pinkSoft    | `#EEC5DD` |
| mustard     | `#F6C95A` |
| teal        | `#5DB3C1` |
| coralPink   | `#EF8090` |
| mintGreen   | `#A9D5B6` |
| lilacBlue   | `#7A87C2` |
| greyMuted   | `#D4D4D4` |

**Regla de diseño:** `lilacBlue` solo como texto auxiliar / labels pequeños. Nunca como fondo de zona dominante. Fondos dominantes usan `navyDeep` con bloques decorativos de marca.

### Identidad visual — bloques de marca

Los elementos decorativos de fondo son **rectángulos redondeados rotados** (no círculos/blobs) en colores de la paleta con opacidad baja. Están presentes en:
- Onboarding (todos los slides)
- Header Inicio (cuidador)
- Header Consulta Rápida
- Header Modo Médico (PacienteMedico)
- Header Perfil (card paciente)
- Header Drawer

### Datos seeded

`SEED_VERSION = 3` — key `cuipea_seedVersion` en localStorage.

Pacientes:
- `lucia` — Lucía Fernández, NF1, Selumetinib + Vitamina D
- `mateo` — Mateo González, Asma leve, Budesonide + Salbutamol

Cuidadora: María Fernández

### Onboarding

5 slides guardados en `Onboarding.tsx`. Marca el flag `onboardingDone` en localStorage vía `saveData()`. El `RolSelector` redirige a `/onboarding` si no está completado.

### Rutas

| Ruta | Componente | Notas |
|------|-----------|-------|
| `/` | `RolSelector` | Redirige a `/onboarding` la primera vez |
| `/onboarding` | `Onboarding` | 5 slides, brand blocks, skip button |
| `/cuidador/inicio` | `Inicio` | Dashboard principal |
| `/cuidador/turnos` | `Turnos` | Ficha de consulta + preguntas |
| `/cuidador/documentos` | `Documentos` | Estudios, recetas, informes |
| `/cuidador/diario` | `Diario` | Registro diario de síntomas |
| `/cuidador/perfil` | `Perfil` | Datos del paciente, editar |
| `/cuidador/indicaciones` | `Indicaciones` | Seguimientos con gráfico |
| `/cuidador/medicacion` | `Medicacion` | Tracker de tomas diarias |
| `/cuidador/crecimiento` | `Crecimiento` | Curva OMS con Recharts |
| `/cuidador/contactos` | `Contactos` | Directorio médico |
| `/cuidador/accesos` | `Accesos` | QR accesos temporales |
| `/cuidador/pack` | `Pack` | Pack imprimible con preview real |
| `/cuidador/consulta` | `Consulta` | Modo consulta 90 seg |
| `/cuidador/consulta/preparar` | `PrepararConsulta` | Selección contenido |
| `/medico/login` | `Login` | Login médico email+QR |
| `/medico/paciente` | `PacienteMedico` | Vista médico del paciente |
