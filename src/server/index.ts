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
import os from 'os'
import dotenv from 'dotenv'

import { setupFileRoutes } from './fileRoutes'
import { setupBundleRoutes } from './bundleRoutes'
import { setupTerminalWs } from './terminalWs'
import { setupKeystoneProxy } from './keystoneProxy'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = Number(process.env.PORT || 3000)
const WORKSPACE = process.env.WORKSPACE_PATH || '/workspace'
const ROOT_PATH = process.env.ROOT_PATH || path.resolve(__dirname, '..')

// Mutable runtime config — can be updated via /api/config/update
const runtimeConfig = {
  proxyEndpoint: process.env.PROXY_ENDPOINT || 'keystonedev.revfcu.com:8443',
  supportedInstances: (process.env.SUPPORTED_INSTANCES || 'Development|Test|CARDS').split('|')
}

const app = express()
const server = createServer(app)

app.use(cors({ origin: true, credentials: true }))

// ─── 1. API routes ──────────────────────────────────────────

const APP_VERSION = process.env.APP_VERSION || '1.1.0'

app.get('/api/config', (_req, res) => {
  res.json({
    proxyEndpoint: runtimeConfig.proxyEndpoint,
    supportedInstances: runtimeConfig.supportedInstances,
    port: PORT,
    workspace: WORKSPACE,
    mode: 'web',
    version: APP_VERSION
  })
})

app.get('/api/version', (_req, res) => {
  res.json({ version: APP_VERSION, mode: 'web' })
})

// Update config at runtime (from Settings panel)
app.post('/api/config/update', express.json(), (req, res) => {
  if (req.body.proxyEndpoint) {
    runtimeConfig.proxyEndpoint = req.body.proxyEndpoint
  }
  if (Array.isArray(req.body.supportedInstances)) {
    runtimeConfig.supportedInstances = req.body.supportedInstances
  }
  console.log(`[Config] Updated — endpoint: ${runtimeConfig.proxyEndpoint}, instances: ${runtimeConfig.supportedInstances.join(', ')}`)
  res.json({ success: true })
})

// Home directory and quick-access bookmarks for folder picker (fallback for non-FS-Access browsers)
app.get('/api/files/home', (_req, res) => {
  const home = os.homedir()
  const bookmarks = [
    { name: 'Home', path: home },
    { name: 'Desktop', path: path.join(home, 'Desktop') },
    { name: 'Documents', path: path.join(home, 'Documents') },
    { name: 'Development', path: path.join(home, 'Documents', 'Development') },
    { name: 'Workspace', path: WORKSPACE },
  ].filter(b => existsSync(b.path))
  res.json({ home, bookmarks })
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

setupKeystoneProxy(app, ROOT_PATH, PORT, runtimeConfig.proxyEndpoint, runtimeConfig.supportedInstances)

// ─── Start ───────────────────────────────────────────────────

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Keyscript IDE server started on port ${PORT}`)
  console.log(`  Workspace: ${WORKSPACE}`)
  console.log(`  Keystone:  ${runtimeConfig.proxyEndpoint}`)
  console.log(`  Instances: ${runtimeConfig.supportedInstances.join(', ')}`)
  console.log(`  SPA:       ${rendererPath}`)
  console.log(`  Open:      http://localhost:${PORT}/`)
})
