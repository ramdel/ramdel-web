# Tasks: Next.js Upgrade — 15.4.6 → 16.2.1

## Status: ✅ COMPLETED — 2026-03-25

- [x] 1.1 Run `npm install next@16.2.1`
- [x] 1.2 Update `eslint-config-next` to 16.2.1
- [x] 1.3 Fix `eslint.config.mjs` — remove FlatCompat, use flat config imports
- [x] 1.4 Update lint script: `next lint` → `eslint src`
- [x] 1.5 Update CI: Node 20 → 22, `npm ci` → `npm install`
- [x] 1.6 Verify `npm run build` passes — ✅ 10/10 pages
- [x] 1.7 Verify `npm run lint` passes — ✅ 0 errors
- [x] 1.8 Verify `npm audit` — ✅ 0 vulnerabilities
- [x] 1.9 PR merged via feat/ai-tooling-setup

## Next step
- [ ] Archive: `openspec archive nextjs-upgrade`
- [ ] Update `openspec/specs/infrastructure/spec.md` to reflect Next.js 16
