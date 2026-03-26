---
name: pr-craft
description: >
  Generate a PR title and full 7-section body following project standards.
  Use when the user asks to "create a PR", "open a pull request", "write a PR",
  "PR message", or "open PR".
---

# PR Craft

Generate a professional pull request title and body following the project's
Conventional Commits title format and 7-section PR template.

---

## Step-by-Step Workflow

1. Run `git status` to confirm the current branch
2. Run `git log main..HEAD --oneline` (or `git log origin/main..HEAD --oneline`) to list all commits in this branch
3. Run `git diff main...HEAD --stat` to see all files changed vs base branch
4. Analyze commits + changed files to understand the full scope of the PR
5. Draft the PR title following the title rules below
6. Fill in all 7 sections of the body using the template at `templates/pr-template.md`
7. Show the complete PR (title + body) to the user for confirmation
8. Only after user approval, run `gh pr create` with the generated content

---

## PR Title Rules

Same format as conventional commits: `type(scope): subject`

| Rule | Detail |
|------|--------|
| Format | `type(scope): subject` |
| Types | `feat` `fix` `docs` `chore` `refactor` `ci` `infra` `sec` `test` `perf` `audit` |
| Scope | Optional, lowercase, kebab-case |
| Subject | Lowercase, imperative, max 72 chars total, no period |
| Breaking | Add `!` after type/scope for breaking changes |

**The title must accurately describe the overall change, not just the last commit.**
If multiple commits span different types, choose the most impactful one.

---

## Body: 7 Required Sections

All 7 sections must be present in the exact order below.
The GitHub Action `validate-pr.yml` will fail if any section is missing,
Summary is too short, or "No sensitive data" is not checked.

### Section 1 — Summary
- Explain **WHY** this PR exists, not just what it does
- Minimum 20 characters
- 1–4 sentences max; lead with the business/technical reason

### Section 2 — Type of Change
- At least one checkbox must be checked
- Use the options from `templates/pr-template.md`

### Section 3 — Areas Affected
- At least one checkbox must be checked
- Use the options from `templates/pr-template.md`

### Section 4 — What Changed
- Bullet list of specific files modified, added, or deleted
- Be specific: `targets/ramdel.dev/recon/nuclei.txt` not "added scan results"

### Section 5 — How to Review
- Where should the reviewer start reading?
- Any prerequisite knowledge or setup?
- Order to review files if non-obvious

### Section 6 — Checklist
- List all items from the template
- **"No sensitive data" must be checked** — this is enforced by CI
- Only check items that are actually true

### Section 7 — Related Issues / Tickets
- Link to any related issues, tickets, or tasks
- If none, write `N/A`

---

## Creating the PR with gh CLI

```bash
gh pr create --title "type(scope): subject" --body "$(cat <<'EOF'
## Summary

[content]

## Type of Change

- [x] New feature / tool / audit capability

## Areas Affected

- [x] Reporting / documentation

## What Changed

- `path/to/file` — description of change

## How to Review

Start with `path/to/main_file`, then review supporting files.

## Checklist

- [x] I reviewed my own changes before requesting review
- [x] No sensitive data (credentials, tokens, PII) included
- [x] Formatting is consistent with existing files
- [x] New scripts / tools include usage documentation
- [ ] Tests added or updated if applicable

## Related Issues / Tickets

N/A
EOF
)"
```

---

## Common Mistakes to Avoid

| Mistake | Correct approach |
|---------|-----------------|
| Title in past tense: "added scanner" | Imperative: "add scanner" |
| Title with capital: "Add scanner" | Lowercase: "add scanner" |
| Empty Summary section | Always explain WHY |
| Skipping a section | All 7 sections required, even if N/A |
| "No sensitive data" unchecked | Must be checked — CI will fail without it |
| Pre-checking all checklist items | Only check what is actually true |
| Generic "What Changed": "updated files" | Specific: list each file with what changed |

---

## Template Reference

Full template: `.claude/skills/pr-craft/templates/pr-template.md`
GitHub template (for manual PRs from UI): `.github/PULL_REQUEST_TEMPLATE.md`

Both templates are identical — the GitHub one is used natively by GitHub's PR UI.
