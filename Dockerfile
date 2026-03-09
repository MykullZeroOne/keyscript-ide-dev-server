# ─── Build Stage ─────────────────────────────────────────────
FROM node:20-slim AS builder

# Install build deps for node-pty and electron
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /build

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts
RUN npx electron-vite --version || true

# Rebuild native modules for this platform
RUN npm rebuild node-pty

# Copy source
COPY . .

# Build renderer (SPA) — electron-vite builds the renderer even without a display
RUN npx electron-vite build || true

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

# Install runtime deps for node-pty (needs python3 for rebuild)
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Only install the packages the server actually needs (not electron, react, etc.)
# We do this by copying package.json and installing, then pruning
COPY package.json ./
RUN npm install --no-save \
  body-parser cors dotenv esbuild express express-http-proxy express-session \
  node-pty sprightly ws && \
  npm cache clean --force

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
