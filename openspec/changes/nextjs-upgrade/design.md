# Design: Next.js Upgrade — 15.4.6 → 16.2.1

## Changes Applied

### package.json
- `next`: 15.4.6 → 16.2.1
- `eslint-config-next`: 15.4.6 → 16.2.1 (must match next version)

### eslint.config.mjs
`next lint` was removed in Next.js 16. Replaced with direct ESLint flat config:
```js
import nextConfig from 'eslint-config-next';
import nextTypescript from 'eslint-config-next/typescript';
export default [...nextConfig, ...nextTypescript];
```
`FlatCompat` wrapper removed — caused circular reference error with ESLint 9.

### package.json lint script
`"lint": "next lint"` → `"lint": "eslint src"`

### tsconfig.json
Auto-updated by Next.js 16:
- `jsx: preserve` → `jsx: react-jsx`
- `.next/dev/types/**/*.ts` added to includes

### CI (ci.yml)
- Node version: 20 → 22 (LTS, compatible with Next.js 16)
- `npm ci` → `npm install` (avoids lock file sync issues across Node versions)

## Verification
- `npm run build` — 10/10 static pages generated, 0 errors
- `npm run lint` — 0 errors, 1 warning (unused var in ContactForm.tsx — non-blocking)
- `npm audit` — 0 vulnerabilities
