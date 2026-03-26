# Tasks: Security Headers — CSP + Permissions-Policy

## 1. Pre-implementation Analysis (~30 min)
- [ ] 1.1 Read `src/lib/analytics.ts` — identify external domains used (for connect-src)
- [ ] 1.2 Read `src/app/[locale]/page.tsx` — check for inline scripts or external resources
- [ ] 1.3 Read `src/components/` — check for any iframes or external embeds
- [ ] 1.4 Update `design.md` if external domains need to be added to CSP

## 2. Implement Headers (~30 min)
- [ ] 2.1 Read current `next.config.js` content
- [ ] 2.2 Add `securityHeaders` array with CSP and Permissions-Policy (see design.md)
- [ ] 2.3 Add `async headers()` function returning `[{source: '/(.*)', headers: securityHeaders}]`
- [ ] 2.4 Ensure `withNextIntl` wrapper is preserved

## 3. Local Testing (~1 hour)
- [ ] 3.1 Run `npm run build` — must pass without errors
- [ ] 3.2 Run `npm start` — test on localhost:3000
- [ ] 3.3 Open browser DevTools → Console — zero CSP violations on `/en/`
- [ ] 3.4 Test `/es/` and `/fr/` — zero CSP violations
- [ ] 3.5 Test contact form submission — must work without CSP errors
- [ ] 3.6 Verify headers in response: `curl -sI http://localhost:3000/en/ | grep -iE "content-security|permissions"`

## 4. Validation
- [ ] 4.1 Paste CSP value at https://csp-evaluator.withgoogle.com — no critical issues
- [ ] 4.2 Run `npm run lint` — must pass

## 5. PR
- [ ] 5.1 Commit: `git commit -m "sec(headers): add CSP and Permissions-Policy via next.config.js"`
- [ ] 5.2 Push branch and open PR using `.github/PULL_REQUEST_TEMPLATE.md`
- [ ] 5.3 After merge: verify headers in production with `curl -sI https://ramdel.dev/en/`
- [ ] 5.4 Update `openspec/specs/security/spec.md` — mark F-09 and F-10 as ✅ Remediated
- [ ] 5.5 Archive: `openspec archive security-headers`
- [ ] 5.6 Update `../security-audits/openspec/specs/targets/ramdel.dev/spec.md` — same status update
