# Copilot Instructions for example-react

## Overview

This project is a React + TypeScript application bootstrapped with Vite. It is designed for rapid prototyping and modern frontend development, with a focus on type safety and fast refresh cycles.

## Key Architecture

- **Entry Point:** `src/main.tsx` mounts the root `App` component.
- **App Structure:** Main UI logic is in `src/App.tsx`. Place reusable UI in `src/components/`.
- **Styling:** Uses CSS modules and global styles in `src/App.css` and `src/index.css`.
- **Assets:** Static files are in `public/` and `src/assets/`.

## Developer Workflows

- **Start Dev Server:** `pnpm dev` (or `npm run dev`/`yarn dev`)
- **Build for Production:** `pnpm build`
- **Preview Production Build:** `pnpm preview`
- **Lint:** `pnpm lint` (uses ESLint with TypeScript and React plugins)
- **Type Checking:** `pnpm typecheck` if configured, or rely on IDE/tsc.

## Project Conventions

- **TypeScript:** All React components use `.tsx` and should be strongly typed.
- **Component Location:** Place new components in `src/components/`. Use PascalCase for filenames and component names.
- **Imports:** Use relative imports within `src/`.
- **State Management:** Use React hooks (`useState`, `useEffect`, etc.) for local state. No global state library by default.
- **Form Handling:** Use controlled components for forms. See `src/components/Formulario.tsx` for an example.
- **ESLint:** Configured for React and TypeScript. See `eslint.config.js` for custom rules and plugin usage.

## Integration Points

- **Vite Plugins:** Uses `@vitejs/plugin-react` for HMR and JSX transform.
- **No backend integration** by default. Add API calls or service logic as needed in `src/`.

## Examples

- **Form Component:** `src/components/Formulario.tsx` demonstrates a controlled form with TypeScript types.
- **App Usage:** Import and use components in `src/App.tsx`.

## Tips

- Restart the dev server after modifying Vite or ESLint config files.
- For new dependencies, prefer `pnpm add`.
- Keep all business logic and UI in `src/`.

---

For more details, see `README.md` and `eslint.config.js`.
