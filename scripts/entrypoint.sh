#!/bin/sh
set -eu

echo 'Applying committed Prisma migrations...'
./node_modules/.bin/prisma migrate deploy

echo 'Seeding public portfolio idempotently...'
node dist/database/seed.js

echo 'Starting API...'
exec node dist/main.js
