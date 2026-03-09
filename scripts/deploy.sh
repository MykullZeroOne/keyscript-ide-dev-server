#!/bin/bash
# ─── Keyscript IDE Deploy Script ─────────────────────────────
# Usage: ./scripts/deploy.sh [version]
# Example: ./scripts/deploy.sh 1.2.0
#
# Two ways to release:
#   1. Local: ./scripts/deploy.sh 1.2.0
#      Builds locally + pushes to Docker Hub
#
#   2. CI: git tag v1.2.0 && git push --tags
#      GitHub Actions builds Docker + Electron installers
# ──────────────────────────────────────────────────────────────

set -e

VERSION="${1:-$(node -p "require('./package.json').version")}"
DOCKERHUB_IMAGE="msmith624/keyscript-ide"
LOCAL_IMAGE="keyscript-ide"

echo "═══════════════════════════════════════════════"
echo "  Keyscript IDE Deploy — v${VERSION}"
echo "═══════════════════════════════════════════════"

# 1. Update version in package.json
echo ""
echo "→ Setting version to ${VERSION}..."
npm version "${VERSION}" --no-git-tag-version --allow-same-version 2>/dev/null

# 2. Build Docker image
echo ""
echo "→ Building Docker image..."
docker build \
  --build-arg APP_VERSION="${VERSION}" \
  -t "${LOCAL_IMAGE}:${VERSION}" \
  -t "${LOCAL_IMAGE}:latest" \
  -t "${DOCKERHUB_IMAGE}:${VERSION}" \
  -t "${DOCKERHUB_IMAGE}:latest" \
  .

echo ""
echo "→ Build complete: ${LOCAL_IMAGE}:${VERSION}"

# 3. Push to Docker Hub
echo ""
echo "→ Pushing to Docker Hub..."
docker push "${DOCKERHUB_IMAGE}:${VERSION}"
docker push "${DOCKERHUB_IMAGE}:latest"
echo "→ Pushed: ${DOCKERHUB_IMAGE}:${VERSION}"
echo "→ Pushed: ${DOCKERHUB_IMAGE}:latest"

# 4. Restart if running locally via docker-compose
if docker compose ps --services 2>/dev/null | grep -q keyscript-ide; then
  echo ""
  echo "→ Restarting local container..."
  docker compose up -d --force-recreate keyscript-ide
  echo "→ Container restarted"
fi

echo ""
echo "═══════════════════════════════════════════════"
echo "  Deploy complete — v${VERSION}"
echo ""
echo "  Docker Hub: docker pull ${DOCKERHUB_IMAGE}:${VERSION}"
echo "  Local:      http://localhost:3000/"
echo ""
echo "  Teammate runs:"
echo "    docker pull ${DOCKERHUB_IMAGE}"
echo "    docker run -p 3000:3000 ${DOCKERHUB_IMAGE}"
echo "═══════════════════════════════════════════════"
