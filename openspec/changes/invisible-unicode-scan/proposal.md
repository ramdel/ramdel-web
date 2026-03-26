# Proposal: Invisible Unicode Supply Chain Scan

## Intent
Detect malicious payloads encoded with invisible Unicode characters (Private Use Areas U+FE00–FE0F, U+E0100–E01EF) in npm packages and source code. This attack vector was confirmed active in March 2026 with 151+ malicious packages on npm and GitHub. The payload is invisible in code editors and most static analysis tools, but decoded and passed to eval() at runtime to steal tokens, credentials, and secrets.

## Attack Pattern
```javascript
// Looks like an empty string — but contains invisible Unicode characters
const s = v => [...v].map(w => (
  w = w.codePointAt(0),
  w >= 0xFE00 && w <= 0xFE0F ? w - 0xFE00 :
  w >= 0xE0100 && w <= 0xE01EF ? w - 0xE0100 + 16 : null
)).filter(n => n !== null);

eval(Buffer.from(s(``)).toString('utf-8')); // ← payload hidden in backtick string
```

## Scope
- One-time scan of current node_modules with Aikido tool
- Add invisible Unicode check to CI workflow (scan src/ on every PR)
- Add trufflehog filesystem scan of src/ to CI

## Tools
- `npx @aikido-security/detect-invisible-chars` — specialized invisible Unicode detector
- `trufflehog filesystem` — secrets + anomaly detection (already installed locally)
- `grep` — manual check for Unicode escape patterns in source

## Estimated Effort
30 minutes
