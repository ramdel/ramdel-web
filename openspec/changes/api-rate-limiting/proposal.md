# Proposal: API Rate Limiting — /api/contact/

## Intent
Resolve findings F-26/F-27 from security-audits audit v1.0. The contact form endpoint has no rate limiting, allowing unlimited automated submissions that can abuse the form as a spam relay and exhaust AWS SES quotas.

## Scope
- Add per-IP rate limiting to `POST /api/contact/` (max 5 requests/hour)
- Add origin check to mitigate CSRF risk

**Out of scope:**
- CAPTCHA (separate decision)
- Email validation against disposable addresses

## Options
**Option A (recommended):** Upstash Redis + @upstash/ratelimit — serverless, Vercel-native, free tier sufficient
**Option B:** Vercel Firewall rules (requires Pro plan)
**Option C:** In-memory rate limiting (not suitable for serverless — resets on each invocation)

## Severity
⚠️ Medio — Findings F-26/F-27

## Estimated Effort
1–2 hours (includes Upstash setup)
