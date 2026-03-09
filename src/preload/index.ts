import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  // App config
  getConfig: () => ipcRenderer.invoke('app:config') as Promise<{ proxyEndpoint: string; supportedInstances: string[]; port: number }>,

  // File operations
  readFile: (path: string) => ipcRenderer.invoke('file:read', path),
  writeFile: (path: string, content: string) => ipcRenderer.invoke('file:write', path, content),
  listFiles: (dirPath: string) => ipcRenderer.invoke('file:list', dirPath) as Promise<{ name: string; isDirectory: boolean; path: string }[]>,
  createFile: (path: string, isDirectory: boolean) => ipcRenderer.invoke('file:create', path, isDirectory) as Promise<{ success: boolean; error?: string }>,
  deleteFile: (path: string) => ipcRenderer.invoke('file:delete', path) as Promise<{ success: boolean; error?: string }>,
  renameFile: (oldPath: string, newPath: string) => ipcRenderer.invoke('file:rename', oldPath, newPath) as Promise<{ success: boolean; error?: string }>,
  
  // Terminal
  initTerminal: (rootDir: string) => ipcRenderer.send('terminal:init', rootDir),
  writeTerminal: (data: string) => ipcRenderer.send('terminal:write', data),
  onTerminalData: (callback: (data: string) => void) => {
    ipcRenderer.on('terminal:data', (_, data) => callback(data))
  },
  resizeTerminal: (cols: number, rows: number) => ipcRenderer.send('terminal:resize', { cols, rows }),
  
  // Credentials
  saveCredentials: (username: string, password: string) =>
    ipcRenderer.invoke('credentials:save', username, password) as Promise<{ success: boolean }>,
  loadCredentials: () =>
    ipcRenderer.invoke('credentials:load') as Promise<{ username: string; password: string } | null>,
  clearCredentials: () =>
    ipcRenderer.invoke('credentials:clear') as Promise<{ success: boolean }>,

  // Projects
  openFolderDialog: () => ipcRenderer.invoke('project:openDialog') as Promise<string | null>,
  getRecentProjects: () => ipcRenderer.invoke('project:getRecent') as Promise<string[]>,
  saveRecentProjects: (projects: string[]) => ipcRenderer.invoke('project:saveRecent', projects) as Promise<{ success: boolean }>,
  listAbsolute: (dirPath: string) => ipcRenderer.invoke('file:listAbsolute', dirPath) as Promise<{ name: string; isDirectory: boolean; path: string }[]>,
  readAbsolute: (filePath: string) => ipcRenderer.invoke('file:readAbsolute', filePath) as Promise<string | null>,
  writeAbsolute: (filePath: string, content: string) => ipcRenderer.invoke('file:writeAbsolute', filePath, content) as Promise<{ success: boolean; error?: string }>,

  // Network
  onNetworkEvent: (callback: (event: any) => void) => {
    ipcRenderer.on('network:event', (_, event) => callback(event))
  },

  // App Builder / Bundler
  bundleProject: (projectPath: string, config?: Record<string, unknown>) =>
    ipcRenderer.invoke('bundle:build', projectPath, config) as Promise<{
      success: boolean
      errors: { text: string; location?: string }[]
      warnings: { text: string; location?: string }[]
      outputPath: string
      outputSize: number
      duration: number
    }>,
  loadBundleConfig: (projectPath: string) =>
    ipcRenderer.invoke('bundle:config', projectPath) as Promise<Record<string, unknown> | null>,
  startDevServer: (projectPath: string, config?: Record<string, unknown>) =>
    ipcRenderer.invoke('bundle:dev-start', projectPath, config) as Promise<{ port: number } | { error: string }>,
  stopDevServer: () =>
    ipcRenderer.invoke('bundle:dev-stop') as Promise<{ success: boolean }>,
  scaffoldProject: (projectPath: string, templateId: string) =>
    ipcRenderer.invoke('bundle:scaffold', projectPath, templateId) as Promise<{ success: boolean; error?: string; filesCreated: string[] }>,
  scaffoldFiles: (projectPath: string, files: { path: string; content: string }[]) =>
    ipcRenderer.invoke('bundle:scaffold-files', projectPath, files) as Promise<{ success: boolean; error?: string; filesCreated: string[] }>
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
