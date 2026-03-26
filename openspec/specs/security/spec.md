# Security Specification

## Purpose
Defines the security posture requirements for ramdel.dev. Source of truth for all security headers, cookie configuration, and API protections. Findings reference `../security-audits/openspec/specs/targets/ramdel.dev/spec.md`.

---

## Requirements

### Requirement: HTTPS Strict Transport Security
The system SHALL include `Strict-Transport-Security` with `max-age=63072000` on all responses.

**Status:** ✅ Implemented (Vercel default)

---

### Requirement: X-Frame-Options
The system SHALL include `X-Frame-Options: DENY` to prevent clickjacking.

**Status:** ✅ Implemented (Vercel default)

---

### Requirement: X-Content-Type-Options
The system SHALL include `X-Content-Type-Options: nosniff` on all responses.

**Status:** ✅ Implemented (Vercel default)

---

### Requirement: Referrer-Policy
The system SHALL include `Referrer-Policy: strict-origin-when-cross-origin`.

**Status:** ✅ Implemented (Vercel default)

---

### Requirement: Content-Security-Policy
The system SHALL include a `Content-Security-Policy` header on all HTML responses.

#### Scenario: CSP header present
- GIVEN any request to ramdel.dev returning HTML
- WHEN the response headers are inspected
- THEN a `Content-Security-Policy` header SHALL be present
- AND it SHALL include at minimum: `default-src 'self'`, `frame-ancestors 'none'`, `base-uri 'self'`

#### Scenario: CSP violation monitoring
- GIVEN CSP is active
- WHEN a violation occurs
- THEN it SHOULD be reported via `report-uri` or `report-to` directive

**Status:** ✅ Remediated — PR #5 mergeado (2026-03-26)
**Change:** `openspec/changes/security-headers/`

---

### Requirement: Permissions-Policy
The system SHALL include a `Permissions-Policy` header restricting sensitive browser APIs.

#### Scenario: Restricted APIs
- GIVEN any request to ramdel.dev
- WHEN the response headers are inspected
- THEN `Permissions-Policy` SHALL restrict at minimum: `camera=()`, `microphone=()`, `geolocation=()`, `payment=()`

**Status:** ✅ Remediated — PR #5 mergeado (2026-03-26)
**Change:** `openspec/changes/security-headers/`

---

### Requirement: Cookie Security — NEXT_LOCALE
The `NEXT_LOCALE` cookie SHALL be set with `Secure` and `HttpOnly` flags.

#### Scenario: Cookie flags
- GIVEN a user visits ramdel.dev for the first time
- WHEN the `NEXT_LOCALE` cookie is set
- THEN it SHALL include `Secure; HttpOnly; SameSite=lax`

**Status:** ✅ Remediated — PR #5 mergeado (2026-03-26)
**Change:** `openspec/changes/cookie-hardening/`

---

### Requirement: API Rate Limiting — /api/contact/
The `POST /api/contact/` endpoint SHALL enforce rate limiting per IP.

#### Scenario: Rate limit enforcement
- GIVEN more than 5 POST requests from the same IP within 1 hour
- WHEN the 6th request arrives
- THEN the endpoint SHALL return HTTP 429 Too Many Requests

**Status:** ✅ Remediated — PR #5 mergeado, Upstash configurado en Vercel (2026-03-26)
**Change:** `openspec/changes/api-rate-limiting/`

---

### Requirement: No Secrets in Client Code
The system SHALL have no API keys, tokens, or credentials exposed in client-side JavaScript bundles.

#### Scenario: Secret scan
- GIVEN the production build is generated
- WHEN JS bundles are scanned with trufflehog
- THEN zero secrets SHALL be detected

**Status:** ✅ Verified (audit v1.0 — 11 bundles, 0 secrets)
