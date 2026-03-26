# Proposal: npm Supply Chain Hardening — ignore-scripts + .npmrc

## Intent
Mitigate the risk of malicious npm postinstall/preinstall scripts executing arbitrary OS commands during package installation. Any package in the dependency tree can define lifecycle hooks — this has been exploited in real attacks (eslint-scope, crossenv, etc.).

## Scope
- Add `.npmrc` with `ignore-scripts=true` as project default
- Add `--ignore-scripts` flag to `npm ci` in CI workflow
- Document known packages that require scripts (none currently in this project)

## Out of Scope
- Runtime sandbox for node_modules (separate, more complex change)
- SRI hashes for dependencies

## Risk Reference
- eslint-scope (2018): compromised maintainer added postinstall that stole npm credentials
- crossenv (2017): typosquatting + env var theft via postinstall

## Estimated Effort
15 minutes
