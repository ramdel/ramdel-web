# Tasks: Invisible Unicode Supply Chain Scan

## 1. One-time local scan (~10 min)
- [ ] 1.1 Run Aikido scan on src/ and node_modules:
      `npx @aikido-security/detect-invisible-chars ./src ./node_modules`
- [ ] 1.2 Run trufflehog on src/:
      `trufflehog filesystem ./src --no-update`
- [ ] 1.3 Check for eval() in source:
      `grep -rn "eval(" src/`
- [ ] 1.4 Document results (should be 0 findings)

## 2. Add CI security scan workflow (~15 min)
- [ ] 2.1 Create `.github/workflows/security-scan.yml` (see design.md)
- [ ] 2.2 Test locally that the grep/npx commands work against src/

## 3. Add .npmrc hardening (from npm-supply-chain-hardening change)
- [ ] 3.1 Coordinate with `npm-supply-chain-hardening` change — implement together

## 4. PR + Archive
- [ ] 4.1 Commit: `git commit -m "sec(ci): add invisible unicode and secret scan workflow"`
- [ ] 4.2 Open PR with template
- [ ] 4.3 Archive: `openspec archive invisible-unicode-scan`
