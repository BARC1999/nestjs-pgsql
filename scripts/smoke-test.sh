#!/bin/sh
set -eu
BASE_URL="${BASE_URL:-http://localhost:3000}"
echo "Checking $BASE_URL/health"
curl --fail --silent --show-error "$BASE_URL/health"
echo
echo "Checking GraphQL query"
curl --fail --silent --show-error -X POST "$BASE_URL/graphql" \
  -H 'Content-Type: application/json' \
  --data '{"query":"query { profile { name skills { name } experience { company duration } projects { name } } }"}'
echo
