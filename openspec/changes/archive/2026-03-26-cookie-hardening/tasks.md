# Tasks: Cookie Hardening

## 1. Implementation (~20 min)
- [x] 1.1 Read current `src/middleware.ts`
- [x] 1.2 Update middleware to wrap intlMiddleware and harden NEXT_LOCALE cookie (see design.md)
- [x] 1.3 Ensure i18n routing behavior is preserved

## 2. Testing (~15 min)
- [x] 2.1 `npm run dev` — test locale switching works normally
- [x] 2.2 DevTools → Application → Cookies → verify `NEXT_LOCALE` has `HttpOnly` ✅ and `Secure` ✅
- [x] 2.3 `npm run build` — must pass
- [x] 2.4 `npm run lint` — must pass

## 3. PR + Archive
- [x] 3.1 Commit: `git commit -m "sec(cookies): harden NEXT_LOCALE cookie with Secure and HttpOnly flags"`
- [x] 3.2 Open PR with template
- [x] 3.3 After merge: verify in production with `curl -sI https://ramdel.dev/en/ | grep -i set-cookie`
- [x] 3.4 Archive: `openspec archive cookie-hardening`
- [x] 3.5 Update security spec status to ✅ Remediated
