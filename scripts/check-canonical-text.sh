#!/usr/bin/env bash
# Checks that canonical policy text duplicated across independent skill folders
# has not drifted. Each skill package must stay self-contained (no shared file
# across skills/<name>/ folders), so this script is the substitute for that:
# it fails if any known copy of a canonical block no longer matches the others.
#
# Usage: bash scripts/check-canonical-text.sh
# Run from the repository root. Exits 1 if any drift is found.

set -u
cd "$(dirname "$0")/.." || exit 1

fail=0

check_group() {
  local label="$1"
  local window="$2"
  shift 2
  local files=("$@")
  local ref_hash=""
  local ref_file=""
  local group_fail=0
  for entry in "${files[@]}"; do
    local file="${entry%%::*}"
    local marker="${entry#*::}"
    local block
    block=$(awk -v m="$marker" -v lines="$window" 'index($0,m){flag=1} flag{print; c++} flag && c>=lines{exit}' "$file" 2>/dev/null)
    local hash
    hash=$(echo "$block" | md5sum | awk '{print $1}')
    if [ -z "$ref_hash" ]; then
      ref_hash="$hash"
      ref_file="$file"
    elif [ "$hash" != "$ref_hash" ]; then
      echo "DRIFT [$label]: $file differs from $ref_file"
      group_fail=1
      fail=1
    fi
  done
  if [ "$group_fail" -eq 0 ]; then
    echo "OK    [$label]: identical across ${#files[@]} location(s)"
  fi
}

check_group "disclaimer" 1 \
  "skills/verify-financial-article/references/workflow.md::This content is provided for informational purposes only" \
  "skills/write-macro-insight/references/quality-and-tests.md::This content is provided for informational purposes only"

check_group "source hierarchy" 5 \
  "skills/discover-content-opportunities/references/domain-rules.md::1. authoritative primary sources;" \
  "skills/verify-financial-article/references/quality-and-tests.md::1. authoritative primary sources;" \
  "skills/write-macro-insight/references/domain-rules.md::1. authoritative primary sources;"

if [ "$fail" -ne 0 ]; then
  echo ""
  echo "One or more canonical text blocks have drifted. Review the skills listed above,"
  echo "pick the intended wording, and update the others to match before release."
  exit 1
fi

exit 0
