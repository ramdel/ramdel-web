# Design: Invisible Unicode Supply Chain Scan

## One-time scan (local)
```bash
# Aikido specialized tool
npx @aikido-security/detect-invisible-chars ./src ./node_modules

# trufflehog filesystem scan of src/
trufflehog filesystem ./src --no-update

# Manual grep for Unicode Private Use Area characters in source
grep -rP "[\xef\xb8\x80-\xef\xb8\x8f]" src/   # U+FE00-FE0F (variation selectors)
grep -rP "[\xf3\xa0\x84\x80-\xf3\xa0\x87\xaf]" src/   # U+E0100-E01EF (tag chars)

# Check for eval() usage (should be zero in a Next.js app)
grep -rn "eval(" src/
```

## CI workflow addition (security-scan.yml)
```yaml
name: Security Scan

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  invisible-unicode-scan:
    name: Invisible Unicode + Secret Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Scan for invisible Unicode characters
        run: npx --yes @aikido-security/detect-invisible-chars ./src

      - name: Check for eval() usage
        run: |
          if grep -rn "eval(" src/; then
            echo "WARNING: eval() found in source — manual review required"
            exit 1
          fi
          echo "No eval() found ✅"

      - name: Secret scan with trufflehog
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./src
          base: ${{ github.event.repository.default_branch }}
          head: HEAD
          extra_args: --only-verified
```

## Notes
- `node_modules/` scan is too slow for CI — do it locally before major dependency upgrades
- Focus CI scan on `src/` only (code we write)
- trufflehog GitHub Action uses verified secrets only to minimize false positives
