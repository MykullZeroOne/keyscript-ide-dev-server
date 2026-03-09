import { ipcMain, app, safeStorage, dialog, BrowserWindow } from 'electron'
import { readFile, writeFile, readdir, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import * as pty from 'node-pty'
import path from 'path'
import os from 'os'
import { bundleProject, loadBundleConfig, startDevServer, stopDevServer, scaffoldProject } from './bundler'
import type { TemplateFile } from './bundler'

// Credential storage file path
const credentialsPath = path.join(app.getPath('userData'), 'credentials.json')
const settingsPath = path.join(app.getPath('userData'), 'settings.json')

// Load saved settings from disk
function loadSettings(): { proxyEndpoint?: string; supportedInstances?: string[] } {
  try {
    if (existsSync(settingsPath)) {
      return JSON.parse(require('fs').readFileSync(settingsPath, 'utf-8'))
    }
  } catch {}
  return {}
}

const savedSettings = loadSettings()

export function setupIpc(): void {
  // App config — user settings override env vars/defaults
  ipcMain.handle('app:config', () => ({
    proxyEndpoint: savedSettings.proxyEndpoint || process.env.PROXY_ENDPOINT || 'keystonedev.revfcu.com:8443',
    supportedInstances: savedSettings.supportedInstances || (process.env.SUPPORTED_INSTANCES || 'Development|Test|CARDS').split('|'),
    port: Number(process.env.PORT || 3000)
  }))

  // Save settings from the Settings panel
  ipcMain.handle('app:save-settings', async (_, settings: { proxyEndpoint?: string; supportedInstances?: string[] }) => {
    try {
      if (settings.proxyEndpoint) savedSettings.proxyEndpoint = settings.proxyEndpoint
      if (settings.supportedInstances) savedSettings.supportedInstances = settings.supportedInstances
      await writeFile(settingsPath, JSON.stringify(savedSettings, null, 2), 'utf-8')
      return { success: true }
    } catch (e) {
      console.error('Failed to save settings:', e)
      return { success: false }
    }
  })

  // Credential storage — username in plain text, password encrypted via safeStorage
  ipcMain.handle('credentials:save', async (_, username: string, password: string) => {
    try {
      const encrypted = safeStorage.isEncryptionAvailable()
        ? safeStorage.encryptString(password).toString('base64')
        : ''
      const data = JSON.stringify({ username, password: encrypted })
      await writeFile(credentialsPath, data, 'utf-8')
      return { success: true }
    } catch (e) {
      console.error('Failed to save credentials:', e)
      return { success: false }
    }
  })

  ipcMain.handle('credentials:load', async () => {
    try {
      if (!existsSync(credentialsPath)) return null
      const raw = await readFile(credentialsPath, 'utf-8')
      const data = JSON.parse(raw)
      const password = data.password && safeStorage.isEncryptionAvailable()
        ? safeStorage.decryptString(Buffer.from(data.password, 'base64'))
        : ''
      return { username: data.username || '', password }
    } catch (e) {
      console.error('Failed to load credentials:', e)
      return null
    }
  })

  ipcMain.handle('credentials:clear', async () => {
    try {
      if (existsSync(credentialsPath)) {
        await writeFile(credentialsPath, '{}', 'utf-8')
      }
      return { success: true }
    } catch { return { success: false } }
  })

  // Shared paths
  const rootPath = app.isPackaged ? path.join(process.resourcesPath, 'app') : app.getAppPath()
  const scriptsPath = path.join(rootPath, 'public/scripts')

  // File System IPC
  const resolvePath = (filePath: string): string => {
    if (path.isAbsolute(filePath)) return filePath
    return path.join(scriptsPath, filePath)
  }

  ipcMain.handle('file:read', async (_, filePath: string) => {
    try {
      const resolved = resolvePath(filePath)
      if (!existsSync(resolved)) return null
      return await readFile(resolved, 'utf-8')
    } catch (e) {
      console.error('Failed to read file:', e)
      return null
    }
  })

  ipcMain.handle('file:write', async (_, filePath: string, content: string) => {
    try {
      const resolved = resolvePath(filePath)
      await writeFile(resolved, content, 'utf-8')
      return { success: true }
    } catch (e) {
      console.error('Failed to write file:', e)
      return { success: false, error: (e as Error).message }
    }
  })

  // Directory listing IPC
  ipcMain.handle('file:list', async (_, dirPath: string) => {
    try {
      const resolved = resolvePath(dirPath || '')
      if (!existsSync(resolved)) return []
      const entries = await readdir(resolved, { withFileTypes: true })
      return entries
        .filter(e => !e.name.startsWith('.'))
        .map(e => ({
          name: e.name,
          isDirectory: e.isDirectory(),
          path: path.join(dirPath || '', e.name).replace(/\\/g, '/')
        }))
        .sort((a, b) => {
          if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1
          return a.name.localeCompare(b.name)
        })
    } catch (e) {
      console.error('Failed to list directory:', e)
      return []
    }
  })

  // Create file or folder
  ipcMain.handle('file:create', async (_, filePath: string, isDirectory: boolean) => {
    try {
      const resolved = resolvePath(filePath)
      if (existsSync(resolved)) return { success: false, error: 'Already exists' }
      if (isDirectory) {
        await mkdir(resolved, { recursive: true })
      } else {
        // Ensure parent directory exists
        const dir = path.dirname(resolved)
        if (!existsSync(dir)) await mkdir(dir, { recursive: true })
        await writeFile(resolved, '', 'utf-8')
      }
      return { success: true }
    } catch (e) {
      console.error('Failed to create:', e)
      return { success: false, error: (e as Error).message }
    }
  })

  // Delete file
  ipcMain.handle('file:delete', async (_, filePath: string) => {
    try {
      const resolved = resolvePath(filePath)
      if (!existsSync(resolved)) return { success: false, error: 'Not found' }
      const { rm } = await import('fs/promises')
      await rm(resolved, { recursive: true })
      return { success: true }
    } catch (e) {
      console.error('Failed to delete:', e)
      return { success: false, error: (e as Error).message }
    }
  })

  // Rename file
  ipcMain.handle('file:rename', async (_, oldPath: string, newPath: string) => {
    try {
      const resolvedOld = resolvePath(oldPath)
      const resolvedNew = resolvePath(newPath)
      if (!existsSync(resolvedOld)) return { success: false, error: 'Not found' }
      if (existsSync(resolvedNew)) return { success: false, error: 'Target already exists' }
      const { rename } = await import('fs/promises')
      await rename(resolvedOld, resolvedNew)
      return { success: true }
    } catch (e) {
      console.error('Failed to rename:', e)
      return { success: false, error: (e as Error).message }
    }
  })

  // Project management
  const projectsConfigPath = path.join(app.getPath('userData'), 'projects.json')

  ipcMain.handle('project:openDialog', async () => {
    const win = BrowserWindow.getFocusedWindow()
    if (!win) return null
    const result = await dialog.showOpenDialog(win, {
      properties: ['openDirectory'],
      title: 'Open Project Folder'
    })
    if (result.canceled || result.filePaths.length === 0) return null
    return result.filePaths[0]
  })

  ipcMain.handle('project:getRecent', async () => {
    try {
      if (!existsSync(projectsConfigPath)) return []
      const raw = await readFile(projectsConfigPath, 'utf-8')
      return JSON.parse(raw) as string[]
    } catch { return [] }
  })

  ipcMain.handle('project:saveRecent', async (_, projects: string[]) => {
    try {
      await writeFile(projectsConfigPath, JSON.stringify(projects), 'utf-8')
      return { success: true }
    } catch { return { success: false } }
  })

  // List files from an absolute directory path (for project explorer)
  ipcMain.handle('file:listAbsolute', async (_, dirPath: string) => {
    try {
      if (!existsSync(dirPath)) return []
      const entries = await readdir(dirPath, { withFileTypes: true })
      return entries
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
    } catch (e) {
      console.error('Failed to list absolute dir:', e)
      return []
    }
  })

  // Read file by absolute path (for project files)
  ipcMain.handle('file:readAbsolute', async (_, filePath: string) => {
    try {
      if (!existsSync(filePath)) return null
      return await readFile(filePath, 'utf-8')
    } catch { return null }
  })

  // Write file by absolute path
  ipcMain.handle('file:writeAbsolute', async (_, filePath: string, content: string) => {
    try {
      await writeFile(filePath, content, 'utf-8')
      return { success: true }
    } catch (e) {
      return { success: false, error: (e as Error).message }
    }
  })

  // Terminal IPC
  let ptyProcess: pty.IPty | null = null
  const shell = os.platform() === 'win32' ? 'powershell.exe' : '/bin/zsh'

  ipcMain.on('terminal:init', (event, rootDir?: string) => {
    try {
      if (ptyProcess) {
        ptyProcess.kill()
      }

      ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd: rootDir || scriptsPath,
        env: process.env as Record<string, string>
      })

      ptyProcess.onData((data) => {
        event.reply('terminal:data', data)
      })
    } catch (e) {
      console.error('Failed to spawn terminal:', e)
      event.reply('terminal:data', `\r\nError: Failed to start terminal - ${(e as Error).message}\r\n`)
    }
  })

  ipcMain.on('terminal:write', (_, data: string) => {
    ptyProcess?.write(data)
  })

  ipcMain.on('terminal:resize', (_, { cols, rows }) => {
    ptyProcess?.resize(cols, rows)
  })

  // ─── App Builder / Bundler IPC ─────────────────────────────

  ipcMain.handle('bundle:config', async (_, projectPath: string) => {
    try {
      return await loadBundleConfig(projectPath)
    } catch (e) {
      return null
    }
  })

  ipcMain.handle('bundle:build', async (_, projectPath: string, configOverrides?: Record<string, unknown>) => {
    try {
      return await bundleProject(projectPath, configOverrides)
    } catch (e: any) {
      return { success: false, errors: [{ text: e.message }], warnings: [], outputPath: '', outputSize: 0, duration: 0 }
    }
  })

  ipcMain.handle('bundle:dev-start', async (_, projectPath: string, configOverrides?: Record<string, unknown>) => {
    try {
      return await startDevServer(projectPath, configOverrides)
    } catch (e: any) {
      return { error: e.message }
    }
  })

  ipcMain.handle('bundle:dev-stop', async () => {
    await stopDevServer()
    return { success: true }
  })

  ipcMain.handle('bundle:scaffold', async () => {
    return { success: false, error: 'Use bundle:scaffold-files instead', filesCreated: [] }
  })

  ipcMain.handle('bundle:scaffold-files', async (_, projectPath: string, files: TemplateFile[]) => {
    try {
      return await scaffoldProject(projectPath, files)
    } catch (e: any) {
      return { success: false, error: e.message, filesCreated: [] }
    }
  })
}
