# Dependency Update Runbook (Lessons Learned)

Last updated: 2026-02-24
Repository: `nhistory/wiseup`

## Goal
- Update dependencies safely.
- Split major upgrades into separate PRs.
- Merge to `main` only after build validation.

## Mistakes We Hit and How to Avoid Them

### 1) `gh` token was invalid
- Symptom: `gh auth status` reported invalid token.
- Impact: Could not create or merge PRs.
- Prevention:
- Always run `gh auth status` first.
- If invalid, re-auth before any branch work.
- Recovery command:
```bash
gh auth login -h github.com --web --git-protocol https
```

### 2) Interactive auth flow got stuck in terminal
- Symptom: TTY prompt/control characters, no progress.
- Impact: Wasted time in blocked session.
- Prevention:
- Use device/web auth flow directly (`--web`) instead of interactive prompt mode.
- Complete auth in browser immediately when one-time code is shown.

### 3) Git write commands failed in sandboxed environment
- Symptom: `fatal: Unable to create .git/index.lock: Operation not permitted`.
- Impact: `git checkout`, branching, commit flow blocked.
- Prevention:
- In sandboxed runs, assume `.git` write operations may require elevated permission.
- Run git write operations with proper elevation once, early in the flow.

### 4) `npm audit` still showed a low transitive vulnerability
- Symptom: `devalue` low vulnerability remained after direct dependency update.
- Impact: Potential confusion about completion criteria.
- Prevention:
- Define update scope before execution:
- `direct-deps-only`: allow residual transitive findings, log them.
- `security-closure`: include additional remediation PR if required.
- Record remaining findings in PR body under "Security note".

## Standard Execution Order (Copy/Paste Checklist)

1. Auth and baseline
```bash
gh auth status
git checkout main
git pull --ff-only
npm ci
npm run build
```

2. Discover updates and classify
```bash
npm outdated --json
npm audit --omit=dev --json
```
- Non-major: `latest.major == current.major`
- Major: `latest.major > current.major`

3. Non-major PR
```bash
git checkout -b chore/deps-safe-YYYYMMDD
# install exact target versions
npm install <pkgA@x.y.z> <pkgB@x.y.z> ...
npm run build
git diff -- package.json package-lock.json
git add package.json package-lock.json
git commit -m "chore(deps): update non-major npm dependencies"
git push -u origin chore/deps-safe-YYYYMMDD
gh pr create --base main --head chore/deps-safe-YYYYMMDD
gh pr merge <PR_NUMBER> --squash --delete-branch
```

4. Major PR (only if needed)
```bash
git checkout main
git pull --ff-only
git checkout -b chore/deps-major-YYYYMMDD
# install major targets
npm install <major targets...>
npm run build
# fix compatibility issues if build fails, then rebuild
git add ...
git commit -m "chore(deps): major dependency upgrades"
git push -u origin chore/deps-major-YYYYMMDD
gh pr create --base main --head chore/deps-major-YYYYMMDD
gh pr merge <PR_NUMBER> --squash --delete-branch
```

5. Post-merge final validation on `main`
```bash
git checkout main
git pull --ff-only
npm ci
npm run build
npm outdated --json
```

## Done Criteria
- `main` build passes after merge.
- Only intended dependency files changed (`package.json`, `package-lock.json`, plus explicit compatibility fixes if any).
- PR link and merge commit SHA are recorded.
- Any remaining vulnerabilities are explicitly documented with scope rationale.
