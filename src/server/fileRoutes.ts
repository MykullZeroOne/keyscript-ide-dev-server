/**
 * File operations REST API — replaces Electron IPC file handlers.
 * All paths are relative to the workspace root.
 */
import { Express } from 'express'
import { readFile, writeFile, readdir, mkdir, rm, rename } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import bodyParser from 'body-parser'

export function setupFileRoutes(app: Express, workspace: string): void {
  const json = bodyParser.json()

  const resolve = (filePath: string): string => {
    if (path.isAbsolute(filePath)) return filePath
    return path.join(workspace, filePath)
  }

  // Read file
  app.post('/api/files/read', json, async (req, res) => {
    try {
      const resolved = resolve(req.body.path)
      if (!existsSync(resolved)) return res.json({ content: null })
      const content = await readFile(resolved, 'utf-8')
      res.json({ content })
    } catch (e: any) {
      res.json({ content: null, error: e.message })
    }
  })

  // Read absolute
  app.post('/api/files/read-absolute', json, async (req, res) => {
    try {
      const filePath = req.body.path
      if (!existsSync(filePath)) return res.json({ content: null })
      const content = await readFile(filePath, 'utf-8')
      res.json({ content })
    } catch (e: any) {
      res.json({ content: null, error: e.message })
    }
  })

  // Write file
  app.post('/api/files/write', json, async (req, res) => {
    try {
      const resolved = resolve(req.body.path)
      const dir = path.dirname(resolved)
      if (!existsSync(dir)) await mkdir(dir, { recursive: true })
      await writeFile(resolved, req.body.content, 'utf-8')
      res.json({ success: true })
    } catch (e: any) {
      res.json({ success: false, error: e.message })
    }
  })

  // Write absolute
  app.post('/api/files/write-absolute', json, async (req, res) => {
    try {
      const filePath = req.body.path
      const dir = path.dirname(filePath)
      if (!existsSync(dir)) await mkdir(dir, { recursive: true })
      await writeFile(filePath, req.body.content, 'utf-8')
      res.json({ success: true })
    } catch (e: any) {
      res.json({ success: false, error: e.message })
    }
  })

  // List directory
  app.post('/api/files/list', json, async (req, res) => {
    try {
      const resolved = resolve(req.body.dirPath || '')
      if (!existsSync(resolved)) return res.json([])
      const entries = await readdir(resolved, { withFileTypes: true })
      const result = entries
        .filter(e => !e.name.startsWith('.'))
        .map(e => ({
          name: e.name,
          isDirectory: e.isDirectory(),
          path: path.join(req.body.dirPath || '', e.name).replace(/\\/g, '/')
        }))
        .sort((a, b) => {
          if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1
          return a.name.localeCompare(b.name)
        })
      res.json(result)
    } catch (e: any) {
      res.json([])
    }
  })

  // List absolute
  app.post('/api/files/list-absolute', json, async (req, res) => {
    try {
      const dirPath = req.body.dirPath
      if (!existsSync(dirPath)) return res.json([])
      const entries = await readdir(dirPath, { withFileTypes: true })
      const result = entries
        .filter(e => !e.name.startsWith('.'))
        .map(e => ({
          name: e.name,
          isDirectory: e.isDirectory(),
          path: path.join(dirPath, e.name)
        }))
        .sort((a, b) => {
          if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1
          return a.name.localeCompare(b.name)
        })
      res.json(result)
    } catch (e: any) {
      res.json([])
    }
  })

  // Create file/directory
  app.post('/api/files/create', json, async (req, res) => {
    try {
      const resolved = resolve(req.body.path)
      if (existsSync(resolved)) return res.json({ success: false, error: 'Already exists' })
      if (req.body.isDirectory) {
        await mkdir(resolved, { recursive: true })
      } else {
        const dir = path.dirname(resolved)
        if (!existsSync(dir)) await mkdir(dir, { recursive: true })
        await writeFile(resolved, '', 'utf-8')
      }
      res.json({ success: true })
    } catch (e: any) {
      res.json({ success: false, error: e.message })
    }
  })

  // Delete file/directory
  app.post('/api/files/delete', json, async (req, res) => {
    try {
      const resolved = resolve(req.body.path)
      if (!existsSync(resolved)) return res.json({ success: false, error: 'Not found' })
      await rm(resolved, { recursive: true })
      res.json({ success: true })
    } catch (e: any) {
      res.json({ success: false, error: e.message })
    }
  })

  // Rename
  app.post('/api/files/rename', json, async (req, res) => {
    try {
      const oldPath = resolve(req.body.oldPath)
      const newPath = resolve(req.body.newPath)
      if (!existsSync(oldPath)) return res.json({ success: false, error: 'Not found' })
      if (existsSync(newPath)) return res.json({ success: false, error: 'Target exists' })
      await rename(oldPath, newPath)
      res.json({ success: true })
    } catch (e: any) {
      res.json({ success: false, error: e.message })
    }
  })

  // Open folder — in web mode, list workspace subdirectories
  app.get('/api/files/workspace-folders', async (_req, res) => {
    try {
      if (!existsSync(workspace)) return res.json([])
      const entries = await readdir(workspace, { withFileTypes: true })
      const folders = entries
        .filter(e => e.isDirectory() && !e.name.startsWith('.'))
        .map(e => path.join(workspace, e.name))
      res.json(folders)
    } catch {
      res.json([])
    }
  })

  // Recent projects — stored in workspace/.keyscript-ide/projects.json
  const projectsFile = path.join(workspace, '.keyscript-ide', 'projects.json')

  app.get('/api/projects/recent', async (_req, res) => {
    try {
      if (!existsSync(projectsFile)) return res.json([])
      const raw = await readFile(projectsFile, 'utf-8')
      res.json(JSON.parse(raw))
    } catch {
      res.json([])
    }
  })

  app.post('/api/projects/recent', json, async (req, res) => {
    try {
      const dir = path.dirname(projectsFile)
      if (!existsSync(dir)) await mkdir(dir, { recursive: true })
      await writeFile(projectsFile, JSON.stringify(req.body.projects || []), 'utf-8')
      res.json({ success: true })
    } catch {
      res.json({ success: false })
    }
  })
}
