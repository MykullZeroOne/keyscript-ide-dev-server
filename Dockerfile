# ─── Build Stage ─────────────────────────────────────────────
FROM node:20-slim AS builder

# Install build deps for node-pty native module
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /build

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source
COPY . .

# Build renderer (SPA)
RUN npx electron-vite build

# Build server
RUN npx esbuild src/server/index.ts \
  --bundle \
  --platform=node \
  --format=esm \
  --outdir=out/server \
  --external:esbuild \
  --external:node-pty \
  --external:express-http-proxy \
  --external:sprightly \
  --external:ws \
  --packages=external \
  --banner:js="import { createRequire } from 'module'; const require = createRequire(import.meta.url);"

# ─── Runtime Stage ───────────────────────────────────────────
FROM node:20-slim

# Install runtime deps for node-pty
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files and install production deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy built artifacts
COPY --from=builder /build/out ./out
COPY --from=builder /build/views ./views
COPY --from=builder /build/public ./public

# Create workspace directory
RUN mkdir -p /workspace

# Environment
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV PORT=3000
ENV WORKSPACE_PATH=/workspace
ENV PROXY_ENDPOINT=keystonedev.revfcu.com:8443
ENV SUPPORTED_INSTANCES=Development|Test|CARDS
ENV ROOT_PATH=/app

EXPOSE 3000

CMD ["node", "out/server/index.js"]
