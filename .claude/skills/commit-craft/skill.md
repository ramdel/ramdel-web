---
name: commit-craft
description: >
  Generate a conventional commit message following project standards.
  Use when the user asks to commit, stage changes, write a commit message,
  or says "commit", "make a commit", "stage and commit".
---

# Commit Craft

Generate professional commit messages following the Conventional Commits specification.

---

## Step-by-Step Workflow

1. Run `git status` to see what files are modified/untracked
2. Run `git diff --staged` to see what is already staged
3. If nothing is staged, ask the user what to include — then stage the relevant files
4. Analyze the changes to determine the correct `type` and optional `scope`
5. Draft the commit message following the rules below
6. **Verify the subject line is ≤ 72 characters total** (including `type(scope): `)
7. Show the proposed message to the user for confirmation
8. Only after user approval, execute the commit using the HEREDOC format:

```bash
git commit -m "$(cat <<'EOF'
type(scope): subject

optional body

Co-Authored-By: Claude AI <noreply@anthropic.com>
EOF
)"
```

---

## Format

```
type(scope): subject

[optional body — blank line required before]

[optional footer(s)]
```

---

## Types

| Type | When to use |
|------|-------------|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `docs` | Documentation only (no code change) |
| `chore` | Maintenance, deps, config (no production code) |
| `refactor` | Code restructure without behavior change |
| `ci` | CI/CD pipeline changes |
| `infra` | Infrastructure / IaC changes |
| `sec` | Security fix or hardening |
| `test` | Adding or updating tests |
| `perf` | Performance improvement |
| `audit` | Audit execution, findings, reports, or compliance work |

**One type per commit. If unsure, pick the most impactful.**

---

## Scope (optional)

- Lowercase, kebab-case, in parentheses
- Identifies the area changed: `ramdel.dev`, `scanner`, `api`, `deps`, `config`
- For audit commits, scope is typically the target: `audit(ramdel.dev)`, `audit(compliance)`
- Omit if the change is truly global or scope is obvious from the type

---

## Subject Line Rules

- **Lowercase** — first character must be lowercase
- **Imperative mood** — "add" not "added" or "adds"
- **Max 72 characters** — total including `type(scope): ` prefix
- **No period** at the end
- Describes WHAT changed, not HOW or WHY (the body explains why)

---

## Body (optional but recommended for non-trivial commits)

- Blank line between subject and body (required)
- Explains **WHY**, not what — the diff already shows what
- Wrap at 72 characters per line
- Use if the change has context that isn't obvious from the subject

---

## Breaking Changes

- Add `!` after type/scope: `feat!: remove deprecated endpoint`
- Add `BREAKING CHANGE: description` in the footer
- Both can be combined

---

## Examples

```
feat(scanner): add OWASP Top 10 check for SQL injection
```

```
audit(ramdel.dev): add F7 js analysis and api contact findings
```

```
fix(reporter): handle null response when target is unreachable
```

```
sec(deps): update requests to 2.31.0

Fixes CVE-2023-32681 — improper redirect header forwarding.
```

```
feat!: rename config file from audit.yml to .audit-config.yml

BREAKING CHANGE: existing audit.yml files must be renamed.
Users running automation scripts need to update file references.
```

```
docs: add usage examples to README
```

---

## Rules Summary (quick reference)

| Rule | Valid | Invalid |
|------|-------|---------|
| Type | `feat`, `audit` | `Feature`, `new`, `update` |
| Subject case | `add scanner module` | `Add scanner module` |
| Subject mood | `add`, `fix`, `update` | `added`, `fixing`, `updates` |
| Subject length | `add nmap wrapper for port scan` (31) | 73+ characters |
| Period | `add scanner module` | `add scanner module.` |
| Scope case | `(scanner)` | `(Scanner)`, `(SCANNER)` |
