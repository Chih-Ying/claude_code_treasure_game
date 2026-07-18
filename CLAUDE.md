# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A small single-page "Treasure Hunt" game: three chests are rendered, one hides treasure (+$100), the other two hide a skeleton (-$50). Built with React 18 + TypeScript + Vite, animated with `motion` (Framer Motion).

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the Vite dev server (port 3000, opens browser automatically, configured in `vite.config.ts`)
- `npm run build` — production build, output goes to `build/` (not `dist/`, see `vite.config.ts`)

There are no lint, typecheck, or test scripts defined in `package.json` — this project has no test suite.

## Architecture

- **Entry point**: `index.html` → `src/main.tsx` mounts `<App />` into `#root` and imports `./index.css`.
- **All game logic lives in `src/App.tsx`**. It's a single component that owns `boxes`/`score`/`gameEnded` state, initializes a random treasure box on mount, and handles open/reset logic. There is no routing or external state management — if you're asked to change game behavior, this is almost always the only file that needs to change.
- **`src/components/ui/`** is a large shadcn/Radix-based component library (button, dialog, sidebar, chart, etc.). It was scaffolded wholesale (likely via Figma Make) but the game currently only uses `Button`. Treat the rest as an available-but-unused kit rather than active application code.
- **`src/components/figma/ImageWithFallback.tsx`** is scaffold infrastructure for gracefully handling broken image sources; not currently used by `App.tsx`.
- **Assets**: chest images live in `src/assets/`, sound effects in `src/audios/` (played on chest open — see `Attributions.md` for sourcing).

### Styling — important quirks

- Tailwind CSS v4 is used, but there is **no `tailwind.config.*` or PostCSS config file**. `src/index.css` is a large (~4,700 line) *pre-compiled/generated* Tailwind v4 stylesheet checked directly into source — do not hand-edit it expecting normal Tailwind authoring workflows (no `@apply` compilation step is wired up).
- `src/styles/globals.css` defines the actual design tokens (CSS custom properties for `--background`, `--primary`, dark mode via `.dark`, etc.) and looks like the intended source of truth for theming, but **it is not imported anywhere** in the app currently. Changes there will have no visible effect unless it's wired into `main.tsx`/`index.css`.
- `src/guidelines/Guidelines.md` is an empty template for project-specific AI guidelines — no rules have been filled in yet.

### Path aliases

`vite.config.ts` aliases `@` to `./src`, plus explicit unversioned aliases for every dependency imported elsewhere with a version suffix (e.g. `'motion/react'`-style imports from a Figma-make export). If a new dependency is added and imported with a version-suffixed specifier, add a matching alias entry.
