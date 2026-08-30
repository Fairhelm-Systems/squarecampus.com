#!/usr/bin/env bash
# Deploy the static export to S3 + CloudFront.
# Requires: bun, aws cli with credentials for account ACCOUNT_ID.
#
# Usage:
#   ./scripts/deploy.sh                # build + upload + invalidate
#   SKIP_BUILD=1 ./scripts/deploy.sh   # upload the existing ./out as-is
set -euo pipefail

BUCKET="${DEPLOY_BUCKET:-squarecampus-marketing-site}"
DISTRIBUTION_ID="${DEPLOY_DISTRIBUTION_ID:-E3ATKH99UOL8C2}"
OUT_DIR="out"

cd "$(dirname "$0")/.."

echo "==> Verifying AWS credentials"
aws sts get-caller-identity --query Account --output text >/dev/null

if [[ "${SKIP_BUILD:-}" != "1" ]]; then
  if [[ -z "${NEXT_PUBLIC_CONTACT_ENDPOINT:-}" ]] \
    && [[ "${NEXT_PUBLIC_CONTACT_FORM_MODE:-}" != "email" ]] \
    && ! grep -qs '^NEXT_PUBLIC_CONTACT_ENDPOINT=.\+' .env.production .env.local .env 2>/dev/null \
    && ! grep -qs '^NEXT_PUBLIC_CONTACT_FORM_MODE=email' .env.production .env.local .env 2>/dev/null; then
    echo "error: NEXT_PUBLIC_CONTACT_ENDPOINT is not configured." >&2
    echo "       The /demo form needs a real intake endpoint (see .env.example)," >&2
    echo "       or set NEXT_PUBLIC_CONTACT_FORM_MODE=email for the explicit email-draft mode." >&2
    exit 1
  fi
  echo "==> Building static export"
  bun install --frozen-lockfile
  bun run build
fi

[[ -f "$OUT_DIR/index.html" ]] || { echo "error: $OUT_DIR/index.html missing — build failed?" >&2; exit 1; }

# Media directories. These are excluded from the HTML pass and uploaded
# separately so each object is written exactly once with the right header:
# `aws s3 sync` skips files whose size and mtime already match, so a second
# pass over the same keys would NOT rewrite their Cache-Control metadata.
MEDIA_DIRS=(images og icons brand)

# Long, but deliberately NOT `immutable`. These filenames are not
# content-hashed (unlike everything under _next/), so an image replaced under
# the same name must still be recoverable. `immutable` tells browsers never to
# revalidate, and a CloudFront invalidation cannot reach a browser cache — a
# returning visitor would keep a stale hero for a year. 30 days plus
# stale-while-revalidate keeps repeat visits instant while leaving a way out.
MEDIA_CACHE="public,max-age=2592000,stale-while-revalidate=86400"

# public/motion/ is the exception to the note above: those filenames ARE
# content-hashed (`<id>-<theme>.<sha8>.mp4`), written by `bun run motion:render`,
# so a re-render publishes a new URL and the old one can never be stale. These
# get the same one-year immutable policy as _next/.
MOTION_DIR="motion"
MOTION_CACHE="public,max-age=31536000,immutable"

# Finder metadata gets copied out of public/ into the export and would
# otherwise be served at https://squarecampus.com/.DS_Store, which discloses
# directory contents. Excluded from every pass so a stray local file can never
# reach the bucket.
JUNK=(--exclude "*.DS_Store" --exclude "*/.DS_Store" --exclude "Thumbs.db")

echo "==> Uploading HTML and non-hashed assets (revalidate on every request)"
HTML_EXCLUDES=(--exclude "_next/*")
for d in "${MEDIA_DIRS[@]}"; do HTML_EXCLUDES+=(--exclude "$d/*"); done
HTML_EXCLUDES+=(--exclude "$MOTION_DIR/*")
aws s3 sync "$OUT_DIR/" "s3://$BUCKET" --delete \
  --cache-control "public,max-age=0,must-revalidate" \
  "${HTML_EXCLUDES[@]}" "${JUNK[@]}" --only-show-errors

echo "==> Uploading hashed assets (immutable, 1 year)"
aws s3 sync "$OUT_DIR/_next/" "s3://$BUCKET/_next/" --delete \
  --cache-control "public,max-age=31536000,immutable" "${JUNK[@]}" --only-show-errors

echo "==> Uploading media (30 days, revalidate in background)"
for d in "${MEDIA_DIRS[@]}"; do
  [[ -d "$OUT_DIR/$d" ]] || continue
  aws s3 sync "$OUT_DIR/$d/" "s3://$BUCKET/$d/" --delete \
    --cache-control "$MEDIA_CACHE" "${JUNK[@]}" --only-show-errors
done

echo "==> Uploading rendered motion assets (immutable, 1 year — content-hashed)"
if [[ -d "$OUT_DIR/$MOTION_DIR" ]]; then
  aws s3 sync "$OUT_DIR/$MOTION_DIR/" "s3://$BUCKET/$MOTION_DIR/" --delete \
    --cache-control "$MOTION_CACHE" "${JUNK[@]}" --only-show-errors
fi

echo "==> Invalidating CloudFront cache"
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" --paths "/*" \
  --query 'Invalidation.Id' --output text)

echo "==> Waiting for invalidation $INVALIDATION_ID"
aws cloudfront wait invalidation-completed \
  --distribution-id "$DISTRIBUTION_ID" --id "$INVALIDATION_ID"

echo "==> Pinging IndexNow (Bing/ChatGPT-search index)"
KEY_FILE=$(ls public/*.txt 2>/dev/null | grep -E 'public/[0-9a-f]{32}\.txt' | head -1 || true)
if [[ -n "$KEY_FILE" ]]; then
  KEY=$(basename "$KEY_FILE" .txt)
  URLS=$(grep -o "<loc>[^<]*</loc>" "$OUT_DIR/sitemap.xml" | sed -E 's|</?loc>||g' | python3 -c 'import json,sys; print(json.dumps([l.strip() for l in sys.stdin if l.strip()]))')
  curl -s -X POST "https://api.indexnow.org/indexnow" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d "{\"host\":\"squarecampus.com\",\"key\":\"$KEY\",\"keyLocation\":\"https://squarecampus.com/$KEY.txt\",\"urlList\":$URLS}" \
    -o /dev/null -w "IndexNow: HTTP %{http_code}\n" || true
fi

echo "==> Deployed: https://squarecampus.com"
