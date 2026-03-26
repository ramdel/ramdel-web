# Design: npm Supply Chain Hardening

## .npmrc (project root)
```ini
# Prevent postinstall/preinstall scripts from running automatically
# This blocks arbitrary command execution during npm install
# If a package explicitly requires scripts (e.g. esbuild, sharp), run:
#   npm install --ignore-scripts=false <package>
ignore-scripts=true
```

## CI workflow update (ci.yml)
Change `npm ci` → `npm ci --ignore-scripts` in both install steps.

Actually `--ignore-scripts` in `.npmrc` already covers `npm ci` — but being explicit in CI is belt-and-suspenders.

```yaml
- name: Install dependencies
  run: npm ci --ignore-scripts
```

## Verification
After adding `.npmrc`, run `npm install` and confirm no postinstall output appears.

## Known packages that MAY require scripts
Check with: `cat package-lock.json | python3 -c "import sys,json; d=json.load(sys.stdin); [print(k) for k,v in d.get('packages',{}).items() if 'scripts' in v.get('scripts',{})]" 2>/dev/null || true`

Current project packages: none require postinstall for functionality.
