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
  echo "==> Building static export"
  bun install --frozen-lockfile
  bun run build
fi

[[ -f "$OUT_DIR/index.html" ]] || { echo "error: $OUT_DIR/index.html missing — build failed?" >&2; exit 1; }

echo "==> Uploading HTML and non-hashed assets (revalidate on every request)"
aws s3 sync "$OUT_DIR/" "s3://$BUCKET" --delete \
  --cache-control "public,max-age=0,must-revalidate" \
  --exclude "_next/*" --only-show-errors

echo "==> Uploading hashed assets (immutable, 1 year)"
aws s3 sync "$OUT_DIR/_next/" "s3://$BUCKET/_next/" --delete \
  --cache-control "public,max-age=31536000,immutable" --only-show-errors

echo "==> Invalidating CloudFront cache"
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" --paths "/*" \
  --query 'Invalidation.Id' --output text)

echo "==> Waiting for invalidation $INVALIDATION_ID"
aws cloudfront wait invalidation-completed \
  --distribution-id "$DISTRIBUTION_ID" --id "$INVALIDATION_ID"

echo "==> Deployed: https://squarecampus.com"
