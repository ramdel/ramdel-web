# Tasks: Cookie Hardening

## 1. Implementation (~20 min)
- [ ] 1.1 Read current `src/middleware.ts`
- [ ] 1.2 Update middleware to wrap intlMiddleware and harden NEXT_LOCALE cookie (see design.md)
- [ ] 1.3 Ensure i18n routing behavior is preserved

## 2. Testing (~15 min)
- [ ] 2.1 `npm run dev` — test locale switching works normally
- [ ] 2.2 DevTools → Application → Cookies → verify `NEXT_LOCALE` has `HttpOnly` ✅ and `Secure` ✅
- [ ] 2.3 `npm run build` — must pass
- [ ] 2.4 `npm run lint` — must pass

## 3. PR + Archive
- [ ] 3.1 Commit: `git commit -m "sec(cookies): harden NEXT_LOCALE cookie with Secure and HttpOnly flags"`
- [ ] 3.2 Open PR with template
- [ ] 3.3 After merge: verify in production with `curl -sI https://ramdel.dev/en/ | grep -i set-cookie`
- [ ] 3.4 Archive: `openspec archive cookie-hardening`
- [ ] 3.5 Update security spec status to ✅ Remediated
