# syntax=docker/dockerfile:1
FROM node:22-bookworm-slim AS build
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm install --no-audit --no-fund
COPY prisma ./prisma
RUN DATABASE_URL=postgresql://placeholder:placeholder@localhost:5432/placeholder npm run db:generate
COPY tsconfig*.json ./
COPY src ./src
RUN npm run build

FROM node:22-bookworm-slim AS production
ENV NODE_ENV=production PORT=3000
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/* \
    && groupadd --system app && useradd --system --gid app app
COPY package.json ./
COPY --from=build /app/package-lock.json ./package-lock.json
RUN npm ci --omit=dev --no-audit --no-fund && npm cache clean --force
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/dist ./dist
COPY prisma ./prisma
COPY scripts ./scripts
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=45s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["sh", "scripts/entrypoint.sh"]
