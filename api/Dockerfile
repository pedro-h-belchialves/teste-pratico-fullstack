FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY prisma ./prisma
RUN pnpm db:generate

COPY . .
RUN pnpm build


FROM node:20-slim AS runner

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/prisma ./prisma

CMD ["sh", "-c", "pnpm prisma migrate deploy && node build/main/server.js"]