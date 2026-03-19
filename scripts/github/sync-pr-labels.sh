#!/usr/bin/env bash

set -euo pipefail

repo="${1:-mdtechspire/square_campus.marketing}"

create_label() {
  local name="$1"
  local color="$2"
  local description="$3"

  gh label create "$name" \
    --repo "$repo" \
    --color "$color" \
    --description "$description" \
    --force
}

create_label "type:design-refresh" "7C3AED" "Premium visual, layout, or interaction changes to the marketing site"
create_label "area:homepage" "1D4ED8" "Homepage content, mockups, or storytelling changes"
create_label "area:platform-pages" "0F766E" "Platform, rollout, ecosystem, security, demo, and related company pages"
create_label "area:navigation-footer" "7C2D12" "Header, footer, navigation shell, and brand chrome updates"
create_label "area:theme-motion" "DB2777" "Theme tokens, dark mode, animation, and motion-system changes"
create_label "area:content-seo" "0369A1" "Site content, metadata, sitemap, and SEO changes"
create_label "area:assets" "4D7C0F" "Image, mockup, and static asset updates"
create_label "area:forms-api" "B45309" "Contact flows, forms, API routes, and server actions"
create_label "area:legal-pages" "6B7280" "Legal and policy page changes"
create_label "release:dev" "EA580C" "Pull request is targeting the dev branch"
