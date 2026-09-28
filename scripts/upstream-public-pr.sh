#!/usr/bin/env bash
# Bring a pull request from the public mirror into the internal repository.
#
#   scripts/upstream-public-pr.sh <public-pr-number> [--open-pr]
#
# Fetches the pull request from the public mirror (read-only; nothing is ever
# pushed to the mirror), squashes it onto a new branch cut from origin/main as
# a single commit authored by you that credits the contributor, and lists the
# files that need the closest review. It never installs dependencies, builds
# or runs anything from the contribution: review first, then test.
#
# With --open-pr it also pushes the branch to origin and opens a pull request
# there. After that merges and the mirror sync runs, close the public pull
# request with a link to the published commit.
set -euo pipefail

PUBLIC_REPO="Fairhelm-Systems/squarecampus.com"
PUBLIC_URL="https://github.com/$PUBLIC_REPO.git"
N="${1:?usage: scripts/upstream-public-pr.sh <public-pr-number> [--open-pr]}"
OPEN_PR="${2:-}"
[[ "$N" =~ ^[0-9]+$ ]] || { echo "error: '$N' is not a pull request number" >&2; exit 1; }

cd "$(git rev-parse --show-toplevel)"
[ -z "$(git status --porcelain)" ] || { echo "error: commit or stash your changes first" >&2; exit 1; }

meta=$(gh pr view "$N" -R "$PUBLIC_REPO" --json title,author,url,state,body)
title=$(jq -r .title <<<"$meta")
login=$(jq -r .author.login <<<"$meta")
url=$(jq -r .url <<<"$meta")
state=$(jq -r .state <<<"$meta")
[ "$state" = "OPEN" ] || { echo "error: public PR #$N is $state" >&2; exit 1; }

branch="upstream/public-pr-$N"
git fetch --quiet origin main
git fetch --quiet "$PUBLIC_URL" "pull/$N/head:public-pr-$N"
git switch --quiet -c "$branch" origin/main

if ! git merge --squash --quiet "public-pr-$N"; then
  echo "error: the pull request does not apply cleanly to main; resolve it by hand on $branch" >&2
  exit 1
fi
if git diff --cached --quiet; then
  echo "error: the pull request adds nothing to main" >&2
  exit 1
fi

git commit --quiet -F - <<MSG
$title

From public pull request $PUBLIC_REPO#$N by @$login.
$url
MSG

echo
echo "Created $(git log --oneline -1) on $branch"
echo
git show --stat --format= HEAD
echo
risky=$(git show --name-only --format= HEAD | grep -E '^(package\.json|bun\.lock|scripts/|\.github/|next\.config|postcss\.config|biome\.json|infra/|src/app/\(legal\)/|docs/marketing-claims-register\.md)' || true)
if [ -n "$risky" ]; then
  echo "REVIEW CLOSELY before running anything (build, tooling or legal/claims surfaces):"
  sed 's/^/  - /' <<<"$risky"
  echo
fi
echo "Next: review with 'git show', then run the checks yourself:"
echo "  bun install && bun run lint && bun run check-types && bun run test"
echo "  NEXT_PUBLIC_CONTACT_FORM_MODE=email bun run build"

if [ "$OPEN_PR" = "--open-pr" ]; then
  git push --quiet -u origin "$branch"
  gh pr create --base main --head "$branch" --title "$title" \
    --body "Upstreams public pull request $PUBLIC_REPO#$N by @$login ($url)."
fi
