# syntax=docker/dockerfile:1.7
#
# Multi-stage Dockerfile for agentproto.sh
# - Builder: pnpm install + content sync (git clone agentproto/agentproto)
#   + next build. The synced .mdx specs land in content/docs/agentproto/.
# - Runner: minimal Node image, copies the built output, runs `next start`.
#
# Image size optimisation deferred (next standalone mode) — single-app
# Cloud Run service handles the ~300MB image without trouble. Switch to
# `output: "standalone"` in next.config.mjs when traffic warrants.

ARG NODE_VERSION=22.11.0

# ── Builder ─────────────────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app

# git is required by `scripts/sync-content.mjs` to clone the public
# spec repo. python3/make/g++ keep node-gyp happy if any transitive
# dep needs to compile native bindings.
RUN apk add --no-cache git python3 make g++ libc6-compat

# corepack signature verification is brittle on recent Node releases
# (npm/cli#7902). Install pnpm directly via npm to sidestep the
# keyid mismatch — same binary, no signature dance.
RUN npm install -g pnpm@10.4.1

# Layer-cache the dep install — copy only the manifest first. The
# site has no committed lockfile because it's also a member of the
# private agentik-studio monorepo (which holds the canonical lockfile
# during local dev). Production rebuilds resolve from package.json
# version ranges. Generate + commit a `pnpm-lock.yaml` here later for
# strict reproducibility once the OSS surface stabilises.
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --no-frozen-lockfile

# Now bring in the rest and run the full build (sync-content + next build).
COPY . .
ENV NODE_ENV=production
RUN pnpm build

# ── Runner ──────────────────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

RUN apk add --no-cache curl ca-certificates && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=8080

# Copy the built site. `next start` reads from .next/, so we ship the
# whole working tree minus dev caches. For a leaner image, switch to
# next standalone mode and copy only `.next/standalone` + `.next/static`.
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/next.config.mjs ./next.config.mjs

USER nextjs
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=5 \
  CMD curl -f http://localhost:${PORT}/ || exit 1

CMD ["sh", "-c", "PORT=${PORT:-8080} npx next start -p ${PORT:-8080}"]
