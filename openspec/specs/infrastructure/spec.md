# Infrastructure Specification

## Purpose
Defines deployment, hosting, and environment requirements for ramdel.dev.

---

## Requirements

### Requirement: Vercel Deployment
The system SHALL be deployed on Vercel with automatic deployments from the `main` branch.

#### Scenario: Production deploy
- GIVEN a PR is merged to `main`
- WHEN Vercel detects the push
- THEN a production deployment SHALL be triggered automatically

#### Scenario: Preview deployments
- GIVEN a PR is opened against `main`
- WHEN Vercel detects the PR
- THEN a preview deployment SHALL be available for review

**Status:** ✅ Implemented

---

### Requirement: Custom Domains
The system SHALL be accessible at `ramdel.dev` and `www.ramdel.dev`. Requests to `ramdel.mx` SHALL redirect to `ramdel.dev`.

**Status:** ✅ Implemented

---

### Requirement: TLS
The system SHALL serve all traffic over HTTPS with TLS 1.2+ and maintain a Grade A+ on testssl.sh.

**Status:** ✅ Verified (Grade A+, Score 93 — audit v1.0)

---

### Requirement: Environment Variables
Sensitive configuration SHALL be stored as environment variables, never hardcoded.

| Variable | Purpose | Required |
|---|---|---|
| `AWS_REGION` | SES region | For email |
| `AWS_ACCESS_KEY_ID` | SES credentials | For email |
| `AWS_SECRET_ACCESS_KEY` | SES credentials | For email |
| `NEXT_PUBLIC_ANALYTICS_ID` | Analytics tracking | Optional |

**Status:** ✅ Implemented (.env.local gitignored, Vercel env vars configured)

---

### Requirement: CI on PRs
Every PR to `main` SHALL run lint and build checks before merge is allowed.

**Status:** ✅ Implemented (.github/workflows/ci.yml)
