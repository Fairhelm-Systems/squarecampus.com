#!/usr/bin/env bash
# Publication gate for the public mirror.
#
# Runs before every sync of `main` to the public read-only mirror and fails
# (so nothing is pushed) when the commits about to be published contain:
#   - a secret (gitleaks over exactly those commits);
#   - a forbidden marketing claim (scripts/check-claims.sh on the new tip);
#   - a term from the private publication denylist, in an added line or a
#     commit message (PUBLICATION_DENYLIST: one extended regex per line,
#     held as a CI secret, never in this repository);
#   - an author, committer or co-author outside the allowlist;
#   - a file type that must never be published (keys, env files).
#
#   scripts/publication-gate.sh <published-sha> <candidate-sha>
set -euo pipefail

FROM="${1:?published sha}"
TO="${2:?candidate sha}"
RANGE="$FROM..$TO"
ALLOWED_PEOPLE="${MIRROR_ALLOWED_EMAILS:-mohit.gupta@fairhelmsystems.com}"
FAILED=0
fail() { echo "GATE: $*" >&2; FAILED=1; }

git merge-base --is-ancestor "$FROM" "$TO" || { echo "GATE: $TO does not descend from the published $FROM; refusing to publish a rewritten history." >&2; exit 1; }
COMMITS=$(git rev-list "$RANGE" | wc -l | tr -d ' ')
echo "gate: checking $COMMITS commit(s) in $RANGE"
[ "$COMMITS" -gt 0 ] || { echo "gate: nothing to publish"; exit 0; }

# 1. Secrets, in exactly the commits being published.
gitleaks git --log-opts="$RANGE" --redact --no-banner --exit-code 1 . || fail "gitleaks found a possible secret"

# 2. Marketing claims on the tip being published.
bash scripts/check-claims.sh || fail "check-claims failed"

# 3. Private denylist: added lines and commit messages.
if [ -n "${PUBLICATION_DENYLIST:-}" ]; then
  PATTERNS=$(mktemp)
  printf '%s\n' "$PUBLICATION_DENYLIST" | sed '/^[[:space:]]*$/d' > "$PATTERNS"
  ADDED=$(git diff "$FROM" "$TO" --unified=0 --no-color | grep '^+' | grep -v '^+++' || true)
  MESSAGES=$(git log --format=%B "$RANGE")
  for label in "added lines" "commit messages"; do
    text="$ADDED"; [ "$label" = "commit messages" ] && text="$MESSAGES"
    if printf '%s\n' "$text" | grep -i -E -q -f "$PATTERNS"; then
      fail "a denylisted term appears in the $label (the matching text is not printed)"
    fi
  done
  rm -f "$PATTERNS"
else
  fail "PUBLICATION_DENYLIST is not configured"
fi

# 4. People: authors and committers must be allowlisted; web merges may be
#    committed by the forge itself, as may a GHE squash merge (one parent,
#    committed by noreply@ghe.com); co-authors must be allowlisted or Claude.
while IFS='|' read -r sha author committer parents; do
  case " $ALLOWED_PEOPLE " in *" $author "*) ;; *) fail "commit ${sha:0:7}: author $author is not allowlisted" ;; esac
  case " $ALLOWED_PEOPLE " in
    *" $committer "*) ;;
    *) if [ "$(wc -w <<<"$parents")" -gt 1 ] && [[ "$committer" == noreply@* ]]; then :
       elif [ "$(wc -w <<<"$parents")" -eq 1 ] && [ "$committer" = "noreply@ghe.com" ]; then :
       else fail "commit ${sha:0:7}: committer $committer is not allowlisted"; fi ;;
  esac
done < <(git log --format='%H|%ae|%ce|%P' "$RANGE")
while read -r email; do
  [ -z "$email" ] && continue
  case " $ALLOWED_PEOPLE noreply@anthropic.com " in *" $email "*) ;; *) fail "co-author $email is not allowlisted" ;; esac
done < <(git log --format='%(trailers:key=Co-Authored-By,valueonly)' "$RANGE" | sed -n 's/.*<\(.*\)>.*/\1/p' | sort -u)

# 5. Files that must never be published.
if git diff --name-only --diff-filter=AR "$FROM" "$TO" | grep -E -i '(^|/)(\.env($|\.)|id_(rsa|ed25519|ecdsa)($|\.)|.*\.(pem|key|p12|pfx|keystore)$)' | grep -v -x '.env.example'; then
  fail "a key or environment file is being added"
fi

# 6. Infrastructure stays private. The enquiry-form backend and its human
# check moved to a private repository on 2026-09-29; publishing either again
# would hand a bot-builder the answer generator and the abuse thresholds.
if git diff --name-only --diff-filter=ACMR "$FROM" "$TO" | grep -E '^infra/|(^|/)challenge\.mjs$'; then
  fail "infrastructure or human-check code must not be published"
fi

if [ "$FAILED" -ne 0 ]; then
  echo "gate: BLOCKED — nothing was published." >&2
  exit 1
fi
echo "gate: OK — $COMMITS commit(s) cleared for publication."
