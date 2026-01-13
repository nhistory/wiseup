---
description: Analyze staged changes, generate a detailed English commit message, and push to origin.
---

// turbo-all

1. Runs `git status` to ensure there are staged changes.
2. Runs `git diff --staged` to analyze the exact updates.
3. Based on the diff, generate a comprehensive English commit message following the Conventional Commits style (e.g., feat: ..., fix: ..., chore: ...).
4. Run `git commit -m "<generated_message>"` with the analyzed content.
5. Run `git push origin main` (or the current branch) to synchronize changes.
