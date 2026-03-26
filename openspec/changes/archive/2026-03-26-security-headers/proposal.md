# Proposal: Security Headers — CSP + Permissions-Policy

## Intent
Resolve findings F-09 (Alto) and F-10 (Medio) from security-audits audit v1.0. The site currently has no Content-Security-Policy or Permissions-Policy headers, leaving it without the primary defense-in-depth layer against XSS attacks and browser API abuse.

## Scope

**In scope:**
- Add `Content-Security-Policy` header via `next.config.js` headers config
- Add `Permissions-Policy` header restricting camera, microphone, geolocation, payment, etc.
- Validate that existing functionality (i18n, analytics, contact form) is not broken by CSP
- Test with CSP evaluator and browser console

**Out of scope:**
- `report-uri` / `report-to` violation reporting endpoint (future improvement)
- Replacing `'unsafe-inline'` (requires refactoring inline styles — separate change)

## Severity
F-09: 🟠 Alto (CVSS 6.1) — F-10: ⚠️ Medio

## Estimated Effort
2–4 hours (implementation + testing across 3 locales)
