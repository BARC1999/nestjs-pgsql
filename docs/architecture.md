# Architecture and decisions

## Data flow

```text
       HTTP POST /graphql
               |
     Apollo / Nest GraphQL
               |
     ProfileResolver (DTOs)
               |
        ProfileService
               |
       ProfileRepository
               |
         Prisma Client
               |
         PostgreSQL 16

For nested fields:
 GraphQL field resolver -> per-request DataLoader
                        -> ProfileService -> ProfileRepository
                        -> WHERE profileId IN (...) query
```

## Why this shape?

1. **Code-first GraphQL.** DTO classes and TypeScript decorators generate the schema. The API's public contract is separated from Prisma-generated model types and may evolve without leaking persistence specifics.
2. **Thin resolvers.** The transport layer handles fields and delegates all data access to service/repository layers. No Prisma client is imported by resolvers.
3. **One repository for persistence.** Prisma selects only scalar fields for the root profile. Relation queries are explicit and observable, leaving room for pagination and filtering later.
4. **Request-local DataLoaders.** GraphQL resolves only requested relations. All parent IDs requested in one GraphQL execution tick are batched into one `WHERE profileId IN (...)` per requested relation. The returned arrays are re-ordered to align with loader keys, and cached only during the current request.
5. **Committed migrations rather than `db push`.** Schema changes are reviewed, reproducible and applicable with `prisma migrate deploy` on every container boot. Database initialization does not silently change the schema at runtime.
6. **Idempotent seeded data.** Stable IDs and transaction-scoped upserts allow restarts without duplicates and preserve manually added records. Seed-owned records are updated from the source of truth.
7. **Small public API.** One public `profile` query is the real requirement. Authentication, admin mutations, file storage, and pagination would complicate this read-only test with no demonstrable benefit.

## Query counts and overfetching

| GraphQL selection | Expected SQL query categories |
| --- | --- |
| `profile { name }` | Profile only |
| `profile { name skills { name } }` | Profile + skills |
| `profile { skills { name } projects { name } }` | Profile + skills + projects |
| `profile { links skills experience projects }` | Profile + each requested relation (5 total) |

When the API is extended to return **N profiles**, the batched relation reads still remain **one SQL query per requested relation** rather than N per relation. `@ResolveField` is invoked only for selected fields; the repository's `select` excludes unrelated columns inside each table. Note that collection resolvers select the table's defined scalar columns, not the exact scalar subfields, and this is a deliberate, small-data tradeoff.

## Not implemented intentionally

- **Authentication / authorization**: public display-only data with no write mutations.
- **S3 integration**: mentioned in the role's stack but not required by this assignment. A future portfolio photo / PDF upload would add object storage via a dedicated module and a signed-URL pattern, not binary blobs in PostgreSQL.
- **External AI APIs / Claude Code**: a developer tool, not a runtime dependency of this API.
- **Caching across requests**: unnecessary complexity and possible staleness in a personal profile.
- **CRUD endpoints**: no user workflow requires them; during the interview they can be added via service/repository and a GraphQL Mutation.