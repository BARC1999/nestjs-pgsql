#!/bin/sh
set -eu
if grep -nE 'REPLACE|YOUR_(FULL_NAME|USERNAME|PROFILE|REPOSITORY)|YOUR FULL NAME' src/database/seed-data.ts; then
  echo 'ERROR: Replace the sample profile data and links before submission.' >&2
  exit 1
fi
echo 'No sample placeholder markers found in seed-data.ts. Check that the details are accurate.'
