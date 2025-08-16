---
description: Comprehensive rules for using Tailwind CSS v4 in React + Vite projects (2025 best practices)
---

## Tailwind CSS v4 + React + Vite: Rules & Best Practices

### 1. Installation & Basic Setup

- **Install Tailwind and the official Vite plugin:**

  ```bash
  npm install tailwindcss @tailwindcss/vite
  # or
  pnpm install tailwindcss @tailwindcss/vite
  ```

- **Add the Tailwind plugin to your `vite.config.ts/js`:**

  ```js
  import { defineConfig } from 'vite'
  import tailwindcss from '@tailwindcss/vite'

  export default defineConfig({
    plugins: [tailwindcss()],
  })
  ```

- **Create your main CSS file (e.g., `src/index.css`) and configure Tailwind:**

  ```css
  @import "tailwindcss";

  @theme {
    --font-display: "Satoshi", "sans-serif";
    --breakpoint-3xl: 1920px;
    --color-avocado-100: oklch(0.99 0 0);
    --color-avocado-200: oklch(0.98 0.04 113.22);
    --color-avocado-300: oklch(0.94 0.11 115.03);
    --color-avocado-400: oklch(0.92 0.19 114.08);
    --color-avocado-500: oklch(0.84 0.18 117.33);
    --color-avocado-600: oklch(0.53 0.12 118.34);
    --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
    --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
    /* ... more tokens ... */
  }
  ```

- **Import your CSS in your main entry file (e.g. `src/main.tsx` or `src/main.jsx`):**

  ```js
  import './index.css'
  ```

- **Start the dev server:**

  ```bash
  npm run dev
  # or
  pnpm run dev
  ```

---

### 2. Best Practices

- Define all design tokens (colors, fonts, breakpoints) in the `@theme` block of your CSS.
- Prefer customizing via `@theme` instead of JS config files (`tailwind.config.js`).
- Use React components for reusable UI patterns; avoid duplicating class strings.
- Reference tokens in your components with CSS variables where possible.
- Keep Tailwind and its plugins up to date (`npm update` or `pnpm update`).

---

### 3. Performance Tips

- Tailwind v4 purges unused CSS automatically—no manual purge needed.
- Only import your main Tailwind CSS file and essential styles.
- Use React lazy loading/code splitting for large sections.
- If you repeat class combinations often, create a component or use `@apply` in CSS.
- Avoid large global CSS files; keep styles modular.

---

### 4. Verification Checklist

1. Run the project (`npm run dev` or `pnpm run dev`).
2. Add a test element (e.g., `<div className="bg-red-500 text-white">Test</div>`) and check the browser output.
3. If styles do not apply:
   - Confirm your CSS is imported in the entry point.
   - Make sure `@tailwindcss/vite` is in your Vite config.
   - Reinstall dependencies if needed.

---

### 5. Advanced & v4 Features

- Use Tailwind utility classes for all styling; custom CSS only for unique cases.
- Leverage v4 features: container queries, CSS vars, 3D transforms, arbitrary values (`[prop:value]`), `not-*` and `starting` variants.
- Use responsive and state variants (`sm:`, `md:`, `hover:`, `dark:` etc.).
- Organize classes logically (layout, spacing, color, typography).
- Prefer TypeScript for component files to ensure className type safety.

---

### 6. Accessibility

- Pair Tailwind classes with proper ARIA attributes.
- Use `aria-hidden="true"` or `role="presentation"` when hiding elements.
- Ensure all interactive elements are accessible.