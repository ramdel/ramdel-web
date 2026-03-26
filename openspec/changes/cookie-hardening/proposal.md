# Proposal: Cookie Hardening — NEXT_LOCALE Secure + HttpOnly

## Intent
Resolve findings F-08/F-17 from security-audits audit v1.0. The `NEXT_LOCALE` cookie is set without `Secure` or `HttpOnly` flags, making it readable via JavaScript and potentially transmittable over HTTP. While this specific cookie only controls locale, it establishes an insecure pattern.

## Scope
- Set `NEXT_LOCALE` cookie with `Secure`, `HttpOnly`, `SameSite=lax` flags in the middleware

## Severity
⚠️ Medio — Finding F-08/F-17

## Estimated Effort
~30 minutes
