/**
 * Standalone server for web/Docker deployment.
 * Replaces Electron main process — serves SPA + REST API + Keystone proxy + WebSocket terminal.
 */
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createServer } from 'http'
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

// ─── API Config ──────────────────────────────────────────────

app.get('/api/config', (_req, res) => {
  res.json({
    proxyEndpoint: PROXY_ENDPOINT,
    supportedInstances: SUPPORTED_INSTANCES,
    port: PORT,
    workspace: WORKSPACE,
    mode: 'web'
  })
})

// ─── File Operations REST API ────────────────────────────────

setupFileRoutes(app, WORKSPACE)

// ─── Bundler REST API ────────────────────────────────────────

setupBundleRoutes(app)

// ─── WebSocket Terminal ──────────────────────────────────────

setupTerminalWs(server, WORKSPACE)

// ─── Keystone Proxy ──────────────────────────────────────────

setupKeystoneProxy(app, ROOT_PATH, PORT, PROXY_ENDPOINT, SUPPORTED_INSTANCES)

// ─── Serve SPA ───────────────────────────────────────────────

const rendererPath = path.join(ROOT_PATH, 'out/renderer')
app.use(express.static(rendererPath))

// SPA fallback — serve index.html for client-side routing
app.get('/ide/*', (_req, res) => {
  res.sendFile(path.join(rendererPath, 'index.html'))
})

// Root redirect to IDE
app.get('/', (_req, res) => {
  res.redirect('/ide/index.html')
})

// ─── Start ───────────────────────────────────────────────────

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Keyscript IDE server started on port ${PORT}`)
  console.log(`  Workspace: ${WORKSPACE}`)
  console.log(`  Keystone:  ${PROXY_ENDPOINT}`)
  console.log(`  Instances: ${SUPPORTED_INSTANCES.join(', ')}`)
  console.log(`  SPA:       ${rendererPath}`)
})
