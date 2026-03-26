# Proposal: Next.js Upgrade — 15.4.6 → 16.2.1

## Intent
Patch CVE-2025-55182 (React2Shell) and CVE-2025-66478 — critical vulnerabilities in React Server Components affecting Next.js 15.0.0–16.0.6. Exploits are publicly available since December 4, 2025. The current version (15.4.6) is in the affected range. Upgrade is mandatory.

## CVEs
- **CVE-2025-55182** — React2Shell: RCE via React Server Components in React 19
- **CVE-2025-66478** — Next.js-specific variant of React2Shell
- **CVE-2025-55184** — DoS via React Server Components
- **CVE-2025-55183** — Source code disclosure via React Server Components

## Scope
- Upgrade `next` from 15.4.6 → 16.2.1
- Verify no breaking changes affect existing pages, i18n, API routes
- Update `package-lock.json`

## Severity
🔴 Critical — publicly exploitable, Vercel blocking deployment

## Estimated Effort
30–60 minutes
