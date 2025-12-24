#!/usr/bin/env bash
set -euo pipefail

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree is not clean. Commit or stash changes before rebasing."
  exit 1
fi

push_flag="${1:-}"

git fetch --prune

git checkout main
git pull --ff-only

git checkout dev
git rebase main

git status -sb

if [[ "$push_flag" == "--push" ]]; then
  git push --force-with-lease origin dev
else
  echo "Rebase complete. To publish: git push --force-with-lease origin dev"
fi
