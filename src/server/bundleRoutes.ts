/**
 * Bundler REST API — replaces Electron IPC bundle handlers.
 */
import { Express } from 'express'
import bodyParser from 'body-parser'
import { bundleProject, loadBundleConfig, startDevServer, stopDevServer, scaffoldProject } from '../main/bundler'

export function setupBundleRoutes(app: Express): void {
  const json = bodyParser.json({ limit: '10mb' })

  app.post('/api/bundle/config', json, async (req, res) => {
    try {
      const config = await loadBundleConfig(req.body.projectPath)
      res.json(config)
    } catch (e: any) {
      res.json(null)
    }
  })

  app.post('/api/bundle/build', json, async (req, res) => {
    try {
      const result = await bundleProject(req.body.projectPath, req.body.config)
      res.json(result)
    } catch (e: any) {
      res.json({
        success: false,
        errors: [{ text: e.message }],
        warnings: [],
        outputPath: '',
        outputSize: 0,
        duration: 0
      })
    }
  })

  app.post('/api/bundle/dev-start', json, async (req, res) => {
    try {
      const result = await startDevServer(req.body.projectPath, req.body.config)
      res.json(result)
    } catch (e: any) {
      res.json({ error: e.message })
    }
  })

  app.post('/api/bundle/dev-stop', json, async (_req, res) => {
    try {
      await stopDevServer()
      res.json({ success: true })
    } catch (e: any) {
      res.json({ success: false, error: e.message })
    }
  })

  app.post('/api/bundle/scaffold', json, async (req, res) => {
    try {
      const result = await scaffoldProject(req.body.projectPath, req.body.files)
      res.json(result)
    } catch (e: any) {
      res.json({ success: false, error: e.message, filesCreated: [] })
    }
  })
}
