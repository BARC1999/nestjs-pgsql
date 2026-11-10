# Professional Portfolio — NestJS / Prisma / GraphQL

A focused, production-shaped **read-only GraphQL backend** for the TypeScript Developer interview assignment. It exposes a personal profile, professional links, technical skills, experience, and projects through **Apollo Sandbox**.

## Technology and requirements

| Requirement | Implementation |
| --- | --- |
| TypeScript / Node.js | Strict TypeScript, Node.js 22 |
| NestJS | Modular dependency-injected backend |
| GraphQL | Code-first schema and Apollo Server 5 |
| Apollo Sandbox | Embedded at `/graphql` even in production |
| PostgreSQL | Normalized relational tables, foreign keys, indexes |
| Prisma | Typed repositories, committed SQL migration, idempotent seed |
| Docker | Multi-stage image + health-checked PostgreSQL Docker Compose |
| Git | `.gitignore`, GitHub Actions CI, documented push workflow |
| NestJS separation | Resolver → Service → Repository → Prisma |
| Nested-query performance | Request-scoped DataLoader; batch by parent IDs |

## Quick start — one command

**Requirements:** Docker Engine + Docker Compose plugin installed.

```bash
docker compose up --build -d
```

Then open:

- **Apollo Sandbox:** http://localhost:3000/graphql
- **Database-aware health check:** http://localhost:3000/health

Compose starts Postgres, waits for the DB to report healthy, builds the Node image, applies the **committed migration**, upserts seed data in one transaction, and launches the API. No manual schema or seed step is needed for the Docker path.

Optional end-to-end smoke test after startup: `sh scripts/smoke-test.sh`.

Watch startup logs:

```bash
docker compose logs -f api
```

To stop without deleting the database: `docker compose down`.

To reset everything, **including stored data**, use `docker compose down -v` then start again. Only use that command when data loss is acceptable.

## Example GraphQL query

Paste into Apollo Sandbox, or use `docs/queries.graphql`:

```graphql
query {
  profile {
    name
    description
    skills { name }
    experience { company position duration }
    projects { name }
  }
}
```

Expected response *shape* (text changes when you personalize the seed):

```json
{
  "data": {
    "profile": {
      "name": "YOUR FULL NAME",
      "description": "REPLACE ME: ...",
      "skills": [{ "name": "TypeScript" }],
      "experience": [{ "company": "REPLACE: Actual company", "position": "REPLACE: Actual job title", "duration": "<computed from employment dates>" }],
      "projects": [{ "name": "Professional Portfolio GraphQL API" }]
    }
  }
}
```

This is illustrative; the real response contains all seeded skills and the full description.

### Test it without the browser

```bash
curl -sS http://localhost:3000/health

curl -sS -X POST http://localhost:3000/graphql \
  -H 'Content-Type: application/json' \
  --data '{"query":"{ profile { name skills { name } projects { name url } } }"}'
```

Apollo Sandbox loads browser assets from Apollo's web service, so an internet connection may be needed for the interactive IDE. The GraphQL endpoint itself works independently with `curl`.

## Local development (without running the API inside Docker)

Node.js 22.12+, npm, and a running PostgreSQL 16 instance are required.

1. Run `docker compose up -d db` (or provide another PostgreSQL database).
2. Copy `.env.example` to `.env` and adjust `DATABASE_URL` if necessary.
3. Run `npm install` and `npm run db:setup`.
4. Run `npm run start:dev`.
5. Open http://localhost:3000/graphql.

Prisma workflows:

```bash
npm run db:generate          # regenerate typed client
npm run db:migrate           # apply committed migrations
npm run db:migrate:dev       # author a NEW migration when schema changes
npm run db:seed              # repeat safely; stable IDs
npm run db:studio            # optional database viewer
```

> The Docker path automatically initializes everything. The local `npm run start:dev` intentionally assumes the explicit `db:setup` step so migration authoring and application restarts remain independent.

### Personalize the data

Edit **`src/database/seed-data.ts`**. Replace:

- `seedProfile`: actual name, headline, description, location.
- `seedLinks`: actual GitHub, LinkedIn, portfolio URLs.
- `seedSkills`: skills you can explain and demonstrate.
- `seedExperience`: actual organizations, roles, employment dates, and achievements.
- `seedProjects`: actual shipped projects and working repository/demo links.

Run `npm run check:profile` to catch leftover placeholder markers, then run `npm run db:seed` (locally) or `docker compose up --build -d` (Docker) to update the seeded rows. The seed uses fixed keys and atomic upserts, so repeating it will not create duplicate rows. It does **not** remove existing non-seed records. If you rename a seeded ID, remove the old record manually if appropriate.

Seed values are deliberately obvious placeholders and must be personalized before interview/demo submission.

## Architecture

```text
src/
├── main.ts                       # HTTP bootstrap and public read-only CORS
├── app.module.ts                 # Apollo / Sandbox and request context
├── database/
│   ├── database.module.ts        # Prisma provider
│   ├── prisma.service.ts         # DB lifecycle
│   ├── seed-data.ts              # Candidate-specific data (EDIT THIS)
│   └── seed.ts                   # Transactional, idempotent upserts
├── health/                       # GET /health (DB-aware)
└── profile/
    ├── domain/models.ts         # Transport-neutral read types
    ├── profile.repository.ts     # Prisma queries and selects
    ├── profile.service.ts        # Use cases / coordination
    ├── profile.module.ts
    ├── graphql/
    │   ├── profile.types.ts      # Public GraphQL DTOs
    │   └── profile.resolver.ts   # Query and lazy field resolution
    └── loaders/
        └── profile.loaders.ts    # Batching and request-local cache
```

**Design rationale**

- **Code-first GraphQL:** the schema is generated from decorated DTO classes, so field definitions are reviewed with the TypeScript code. GraphQL API types are not tied to Prisma-generated database model types.
- **Repository boundary:** one location for SQL-facing reads, explicit scalar selections and ordering; no ORM calls are mixed into resolvers.
- **Service boundary:** business/use-case seam for future filtering, access rules, or mutations without changing GraphQL resolver plumbing.
- **Lazy nested reads:** asking only for `profile { name }` does not fetch skills, experience, links, or projects. `@ResolveField` executes only for fields included in the query.
- **N+1 avoidance:** each requested relation is loaded through a request-scoped DataLoader that batches parent IDs with a single `WHERE profileId IN (...)` query and returns results in the correct input order. This scales if the API later supports a list of profiles.
- **Reproducible DB setup:** committed `prisma/migrations/.../migration.sql` is deployed on startup; DB seed is idempotent and transactional. `db push` is not used for production startup.
- **Scope discipline:** no admin mutation endpoints, authentication facade, unnecessary abstraction hierarchy, S3 integration, or AI API calls because none is needed for the public read-only assignment. The role mentions S3 and Claude Code; the test itself does not require them.

See [`docs/architecture.md`](docs/architecture.md) for query-count expectations, tradeoffs and extension designs.

## Automated checks

```bash
npm run typecheck
npm run build
npm run test:unit
```

The end-to-end suite requires a migrated and seeded DB:

```bash
docker compose up -d db
cp .env.example .env
npm run db:setup
npm run test:e2e
```

`test/profile.e2e-spec.ts` sends real HTTP requests to `/health` and `/graphql`. The GitHub Actions workflow provisions PostgreSQL 16, installs packages, generates Prisma, runs type/build/unit checks, migrates and seeds the DB, and runs e2e tests.

**Dependency lockfile note:** Direct dependency versions are pinned in `package.json`. A `package-lock.json` is not included because this archive was generated in an environment without package-registry installation access. Run `npm install` in an internet-connected environment and **commit the generated `package-lock.json`** before submitting the repository. After doing so, change CI/Docker installs from `npm install` to `npm ci` to enforce transitive dependency reproducibility.

Create the GitHub repository under your account first, and replace the example remote URL. Do not commit `.env` files.

### Railway / Render / other Docker host

1. Push the repository to GitHub.
2. Provision managed **PostgreSQL** (not the local Compose `db` service).
3. Deploy this repository using the **Dockerfile** (port `3000`, or the provider's `PORT`).
4. Set `DATABASE_URL` to the managed PostgreSQL connection string (including the correct TLS parameters, if required by your provider). Set `NODE_ENV=production`.
5. Docker's `scripts/entrypoint.sh` runs `prisma migrate deploy`, seeds, then starts the API.
6. Set the deployment's readiness/health path to `/health`.
7. Visit `https://YOUR_DEPLOYMENT_DOMAIN/graphql` and execute the example query from a device that can reach the deployment.
8. Provide those **real** public service and GitHub URLs to the interviewer.

For a multi-instance production service, migrations/seeding should run as a one-off deployment job instead of in every replica's entrypoint. The entrypoint-based approach is intentionally simpler for this single-instance interview deployment.