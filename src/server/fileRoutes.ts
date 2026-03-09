/**
 * File operations REST API — replaces Electron IPC file handlers.
 * All paths are relative to the workspace root.
 */
import { Express } from 'express'
import { readFile, writeFile, readdir, mkdir, rm, rename } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import bodyParser from 'body-parser'
import multer from 'multer'
import archiver from 'archiver'

export function setupFileRoutes(app: Express, workspace: string): void {
  const json = bodyParser.json()

  // Multer stores uploads in workspace, preserving relative paths
  const upload = multer({
    storage: multer.diskStorage({
      destination: async (req, _file, cb) => {
        const targetDir = (req.body?.targetDir) || workspace
        const resolved = path.isAbsolute(targetDir) ? targetDir : path.join(workspace, targetDir)
        if (!existsSync(resolved)) await mkdir(resolved, { recursive: true })
        cb(null, resolved)
      },
      filename: (_req, file, cb) => {
        // Preserve original filename
        cb(null, file.originalname)
      }
    })
  })

  // Upload files — accepts multiple files, preserves folder structure via webkitRelativePath
  app.post('/api/files/upload', upload.array('files', 500), async (req, res) => {
    try {
      // If relativePaths are provided (folder upload), move files to correct subdirectories
      const relativePaths = req.body?.relativePaths
      if (relativePaths && req.files) {
        const paths = Array.isArray(relativePaths) ? relativePaths : [relativePaths]
        const files = req.files as Express.Multer.File[]
        const targetDir = req.body?.targetDir || workspace

        for (let i = 0; i < files.length; i++) {
          const relPath = paths[i]
          if (!relPath || relPath === files[i].originalname) continue

          const destPath = path.join(
            path.isAbsolute(targetDir) ? targetDir : path.join(workspace, targetDir),
            relPath
          )
          const destDir = path.dirname(destPath)
          if (!existsSync(destDir)) await mkdir(destDir, { recursive: true })

          // Move from flat upload location to correct subfolder
          const currentPath = files[i].path
          if (currentPath !== destPath) {
            await rename(currentPath, destPath)
          }
        }
      }

      const count = (req.files as Express.Multer.File[])?.length || 0
      res.json({ success: true, count })
    } catch (e: any) {
      res.json({ success: false, error: e.message })
    }
  })

  // Download a single file
  app.get('/api/files/download', async (req, res) => {
    try {
      const filePath = req.query.path as string
      if (!filePath) return res.status(400).json({ error: 'path required' })
      const resolved = path.isAbsolute(filePath) ? filePath : path.join(workspace, filePath)
      if (!existsSync(resolved)) return res.status(404).json({ error: 'Not found' })
      res.download(resolved)
    } catch (e: any) {
      res.status(500).json({ error: e.message })
    }
  })

  // Download a folder as zip
  app.get('/api/files/download-zip', async (req, res) => {
    try {
      const dirPath = req.query.path as string
      if (!dirPath) return res.status(400).json({ error: 'path required' })
      const resolved = path.isAbsolute(dirPath) ? dirPath : path.join(workspace, dirPath)
      if (!existsSync(resolved)) return res.status(404).json({ error: 'Not found' })
      const folderName = path.basename(resolved)
      res.setHeader('Content-Type', 'application/zip')
      res.setHeader('Content-Disposition', `attachment; filename="${folderName}.zip"`)
      const archive = archiver('zip', { zlib: { level: 6 } })
      archive.pipe(res)
      archive.directory(resolved, folderName)
      await archive.finalize()
    } catch (e: any) {
      res.status(500).json({ error: e.message })
    }
  })

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

  // Browse directories — used by folder picker in web mode
  app.post('/api/files/browse-dirs', json, async (req, res) => {
    try {
      const dirPath = req.body.path || workspace
      if (!existsSync(dirPath)) return res.json({ path: dirPath, dirs: [], error: 'Path not found' })
      const entries = await readdir(dirPath, { withFileTypes: true })
      const dirs = entries
        .filter(e => e.isDirectory() && !e.name.startsWith('.'))
        .map(e => ({
          name: e.name,
          path: path.join(dirPath, e.name)
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
      res.json({ path: dirPath, dirs })
    } catch (e: any) {
      res.json({ path: req.body.path, dirs: [], error: e.message })
    }
  })

  // Get workspace root
  app.get('/api/files/workspace', (_req, res) => {
    res.json({ workspace })
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
