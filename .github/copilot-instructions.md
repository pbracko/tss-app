# Copilot Instructions for TSS (TanStack Start) App

## Project Overview

This is a **TanStack Start** full-stack React application—a framework for building modern AI-ready web applications with integrated server functions, SSR capabilities, and type-safe client-server communication. The project demonstrates multiple rendering patterns (SPA, SSR, streaming data).

## Key Technologies & Architecture

- **Framework**: TanStack React Start with TanStack Router v1 (file-based routing)
- **Build Tool**: Vite with multiple plugins (Tailwind CSS v4, TanStack devtools, SSR plugin, TypeScript path resolution)
- **Styling**: Tailwind CSS v4 + Shadcn UI components
- **Testing**: Vitest
- **Type Safety**: TypeScript with strict mode, path aliases (`@/*` → `src/*`)
- **SSR**: Server-side rendering with streaming support via `@tanstack/react-start`
- **Deployment**: Netlify (via `@netlify/vite-plugin-tanstack-start`)

## Critical Developer Workflows

### Development

```bash
pnpm install      # Install dependencies
pnpm dev          # Start dev server on http://localhost:3000
pnpm build        # Production build
pnpm preview      # Preview production build locally
pnpm test         # Run Vitest (single run)
```

### Code Quality

```bash
pnpm lint         # Run ESLint (uses @tanstack/eslint-config)
pnpm format       # Check formatting with Prettier
pnpm check        # Format + lint fix (recommended before commit)
```

### Component Library

- Add Shadcn components: `pnpm dlx shadcn@latest add button`
- Components are styled with Tailwind CSS

## File-Based Routing Convention

Routes are defined in `src/routes/` using TanStack Router's file-based system:

- `__root.tsx` = Root layout (head metadata, HTML structure, global devtools)
- `index.tsx` = Home page (`/`)
- `demo/start.ssr.index.tsx` = Demo index at `/demo/start/ssr/`
- `demo/api.names.ts` = API endpoint at `/demo/api/names`

**Route Definition Pattern**:

```tsx
// File: src/routes/example.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/example')({
  component: Component,
  loader: async () => {
    /* data fetching */
  },
})

function Component() {
  /* JSX */
}
```

## Server Functions & API Routes

### Server Functions (RPC-style)

Use `createServerFn` for seamless server-client integration (fully type-safe):

```tsx
// File: src/routes/demo/start.server-funcs.tsx
const getTodos = createServerFn({ method: 'GET' }).handler(
  async () => await readTodos(),
)

// Use in component with Route.useLoaderData() or direct call
```

### API Routes (REST-style)

Use `createFileRoute` with `server.handlers` for traditional HTTP endpoints:

```tsx
// File: src/routes/demo/api.names.ts
export const Route = createFileRoute('/demo/api/names')({
  server: { handlers: { GET: () => Response.json([...]) } }
})

// Client calls with fetch(): fetch('/demo/api/names').then(r => r.json())
```

## Project-Specific Patterns

1. **Data Files**: Demo data stored in `src/data/` (e.g., `demo.punk-songs.ts`)
2. **Utility Functions**: Reusable code in `src/lib/utils.ts`
3. **Components**: Reusable UI in `src/components/` (e.g., `Header.tsx`)
4. **Styling**: Global CSS in `src/styles.css`, component-level via Tailwind classes
5. **Generated Routes**: `src/routeTree.gen.ts` auto-generated—never edit manually
6. **Head Configuration**: Set via `createRootRoute({ head: () => ({ meta: [...], links: [...] }) })`

## Deployment & Build Output

- **Netlify**: Production builds deploy to Netlify (plugin configured in `vite.config.ts`)
- **Build Output**: Vite builds to a static-friendly output with integrated server functions
- **Configuration Files**: `netlify.toml` contains Netlify-specific settings

## When Adding Features

- **New Route**: Create file in `src/routes/` with `createFileRoute()`, Router auto-discovers
- **New Component**: Add to `src/components/`, import with `@/components/...`
- **New API Endpoint**: Use `createFileRoute('/api/...')` with `server.handlers`
- **New Server Function**: Use `createServerFn()` in route file for type-safe RPC
- **Styling**: Use Tailwind utilities directly; consider Shadcn for complex UI
- **Testing**: Add `.test.ts(x)` files alongside code, run with `pnpm test`

## Linting & Formatting

- **ESLint Config**: TanStack preset enforces strict rules; check `eslint.config.js`
- **Prettier**: Auto-formats on save (if IDE configured); run `pnpm format` to check
- **Pre-commit**: Always run `pnpm check` to catch issues before pushing

## Important Notes

- TypeScript: Strict mode enabled; unused variables/parameters flagged as errors
- Path Aliases: Use `@/` prefix for imports from `src/` (e.g., `@/components/Header`)
- SSR: Full document SSR, streaming, and progressive enhancement supported—see demo routes
- DevTools: TanStack DevTools + Router DevTools available in dev (bottom-right panel)
- File System Access: Server functions can use Node.js APIs (`fs`, etc.)—these run only on server
