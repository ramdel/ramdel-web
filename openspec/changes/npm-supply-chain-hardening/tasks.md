# Tasks: npm Supply Chain Hardening

## 1. Verify no scripts are needed (~5 min)
- [ ] 1.1 Check which packages define postinstall scripts in current lock file
- [ ] 1.2 Confirm none are required for build or runtime

## 2. Add .npmrc (~5 min)
- [ ] 2.1 Create `.npmrc` at project root with `ignore-scripts=true`
- [ ] 2.2 Run `npm install` locally — confirm build still works, no script errors

## 3. Update CI workflow (~5 min)
- [ ] 3.1 Update `.github/workflows/ci.yml` — add `--ignore-scripts` to `npm ci`
- [ ] 3.2 Run `npm run build` locally — confirm no breakage

## 4. PR + Archive
- [ ] 4.1 Commit: `git commit -m "sec(deps): add npm ignore-scripts to block postinstall supply chain attacks"`
- [ ] 4.2 Open PR with template
- [ ] 4.3 Archive: `openspec archive npm-supply-chain-hardening`
