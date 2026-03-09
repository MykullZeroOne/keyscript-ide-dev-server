/**
 * Standalone server for web/Docker deployment.
 * Replaces Electron main process — serves SPA + REST API + Keystone proxy + WebSocket terminal.
 *
 * Route order matters:
 * 1. CORS
 * 2. API routes (/api/*)
 * 3. SPA static files (out/renderer/)
 * 4. Keystone proxy (catch-all — must be LAST)
 */
import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

import { setupFileRoutes } from './fileRoutes'
import { setupBundleRoutes } from './bundleRoutes'
import { setupTerminalWs } from './terminalWs'
import { setupKeystoneProxy } from './keystoneProxy'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = Number(process.env.PORT || 3000)
const WORKSPACE = process.env.WORKSPACE_PATH || '/workspace'
const PROXY_ENDPOINT = process.env.PROXY_ENDPOINT || 'keystonedev.revfcu.com:8443'
const SUPPORTED_INSTANCES = (process.env.SUPPORTED_INSTANCES || 'Development|Test|CARDS').split('|')
const ROOT_PATH = process.env.ROOT_PATH || path.resolve(__dirname, '..')

const app = express()
const server = createServer(app)

app.use(cors({ origin: true, credentials: true }))

// ─── 1. API routes ──────────────────────────────────────────

app.get('/api/config', (_req, res) => {
  res.json({
    proxyEndpoint: PROXY_ENDPOINT,
    supportedInstances: SUPPORTED_INSTANCES,
    port: PORT,
    workspace: WORKSPACE,
    mode: 'web'
  })
})

setupFileRoutes(app, WORKSPACE)
setupBundleRoutes(app)
setupTerminalWs(server, WORKSPACE)

// ─── 2. SPA static files ────────────────────────────────────
// Must come BEFORE the Keystone catch-all proxy

const rendererPath = path.join(ROOT_PATH, 'out/renderer')

// Serve renderer index.html at root
app.get('/', (_req, res) => {
  const indexFile = path.join(rendererPath, 'index.html')
  if (existsSync(indexFile)) {
    res.sendFile(indexFile)
  } else {
    res.redirect('/ide/index.html')
  }
})

// Serve /ide/* as SPA
app.use('/ide', express.static(rendererPath))
app.get('/ide/*', (_req, res) => {
  res.sendFile(path.join(rendererPath, 'index.html'))
})

// Serve renderer assets at root level too (the built HTML references assets/*)
app.use('/assets', express.static(path.join(rendererPath, 'assets')))

// ─── 3. Keystone proxy (catch-all — LAST) ────────────────────

setupKeystoneProxy(app, ROOT_PATH, PORT, PROXY_ENDPOINT, SUPPORTED_INSTANCES)

// ─── Start ───────────────────────────────────────────────────

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Keyscript IDE server started on port ${PORT}`)
  console.log(`  Workspace: ${WORKSPACE}`)
  console.log(`  Keystone:  ${PROXY_ENDPOINT}`)
  console.log(`  Instances: ${SUPPORTED_INSTANCES.join(', ')}`)
  console.log(`  SPA:       ${rendererPath}`)
  console.log(`  Open:      http://localhost:${PORT}/`)
})
