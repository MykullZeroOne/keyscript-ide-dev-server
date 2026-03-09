/**
 * Web API polyfill — implements window.api using HTTP/WebSocket
 * when running in a browser (no Electron).
 *
 * Call installWebApiIfNeeded() before React renders.
 * If window.api already exists (Electron preload), this is a no-op.
 *
 * When a local folder is opened via the File System Access API,
 * file read/write/list operations go through the browser handle
 * instead of the server. This lets Docker users work with local files
 * without volume mounts.
 */

import * as fsAccess from './fsAccessApi'

let terminalWs: WebSocket | null = null
let terminalDataCallback: ((data: string) => void) | null = null
const networkCallbacks: ((event: any) => void)[] = []

function apiUrl(path: string): string {
  return path // same origin
}

async function post(path: string, body?: any): Promise<any> {
  const res = await fetch(apiUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : undefined
  })
  return res.json()
}

async function get(path: string): Promise<any> {
  const res = await fetch(apiUrl(path))
  return res.json()
}

/**
 * Check if a path is a local FS path (not absolute server path).
 * Local FS paths are relative like "subfolder/file.js" or just "file.js".
 * Server paths start with "/" like "/workspace/file.js".
 */
function isLocalPath(filePath: string): boolean {
  return fsAccess.hasLocalFolder() && !filePath.startsWith('/')
}

const webApi: Window['api'] = {
  // Config
  getConfig: () => get('/api/config'),

  // File operations — route through File System Access API when local folder is open
  readFile: async (path: string) => {
    if (isLocalPath(path)) {
      return await fsAccess.readFile(path)
    }
    const r = await post('/api/files/read', { path })
    return r.content
  },
  writeFile: async (path: string, content: string) => {
    if (isLocalPath(path)) {
      // Write locally AND sync to server (for RunScript)
      const result = await fsAccess.writeFile(path, content)
      // Also send to server workspace so proxy can serve it
      post('/api/files/write', { path, content }).catch(() => {})
      return result
    }
    return post('/api/files/write', { path, content })
  },
  listFiles: (dirPath: string) =>
    post('/api/files/list', { dirPath }),
  createFile: async (path: string, isDirectory: boolean) => {
    if (isLocalPath(path)) {
      return await fsAccess.createEntry(path, isDirectory)
    }
    return post('/api/files/create', { path, isDirectory })
  },
  deleteFile: async (path: string) => {
    if (isLocalPath(path)) {
      return await fsAccess.deleteEntry(path)
    }
    return post('/api/files/delete', { path })
  },
  renameFile: (oldPath: string, newPath: string) =>
    post('/api/files/rename', { oldPath, newPath }),

  // Absolute paths — these always go to the server
  listAbsolute: async (dirPath: string) => {
    // If dirPath matches the local folder name, use local FS
    if (fsAccess.hasLocalFolder() && (dirPath === fsAccess.getRootName() || !dirPath.startsWith('/'))) {
      const relPath = dirPath === fsAccess.getRootName() ? '' : dirPath
      return await fsAccess.listDirectory(relPath)
    }
    return post('/api/files/list-absolute', { dirPath })
  },
  readAbsolute: async (filePath: string) => {
    // If path doesn't start with /, it's a local FS relative path
    if (isLocalPath(filePath)) {
      return await fsAccess.readFile(filePath)
    }
    const r = await post('/api/files/read-absolute', { path: filePath })
    return r.content
  },
  writeAbsolute: async (filePath: string, content: string) => {
    if (isLocalPath(filePath)) {
      const result = await fsAccess.writeFile(filePath, content)
      post('/api/files/write', { path: filePath, content }).catch(() => {})
      return result
    }
    return post('/api/files/write-absolute', { path: filePath, content })
  },

  // Terminal — WebSocket
  initTerminal: (rootDir: string) => {
    if (terminalWs) {
      terminalWs.close()
    }
    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:'
    const url = `${proto}//${location.host}/ws/terminal?cwd=${encodeURIComponent(rootDir)}`
    terminalWs = new WebSocket(url)
    terminalWs.onmessage = (e) => {
      if (terminalDataCallback) {
        terminalDataCallback(typeof e.data === 'string' ? e.data : '')
      }
    }
    terminalWs.onerror = () => {
      console.error('[Terminal] WebSocket error')
    }
  },
  writeTerminal: (data: string) => {
    if (terminalWs?.readyState === WebSocket.OPEN) {
      terminalWs.send(JSON.stringify({ type: 'input', data }))
    }
  },
  onTerminalData: (callback: (data: string) => void) => {
    terminalDataCallback = callback
  },
  resizeTerminal: (cols: number, rows: number) => {
    if (terminalWs?.readyState === WebSocket.OPEN) {
      terminalWs.send(JSON.stringify({ type: 'resize', cols, rows }))
    }
  },

  // Credentials — no-op in web mode (auth handled server-side)
  saveCredentials: async () => ({ success: true }),
  loadCredentials: async () => null,
  clearCredentials: async () => ({ success: true }),

  // Projects
  openFolderDialog: async () => {
    // In web mode, prompt for workspace path or return workspace
    const folders = await get('/api/files/workspace-folders')
    if (Array.isArray(folders) && folders.length > 0) {
      // Return first folder as default — UI can show a picker
      return folders[0]
    }
    // Fallback: return workspace root from config
    const config = await get('/api/config')
    return config.workspace || '/workspace'
  },
  getRecentProjects: async () => {
    return get('/api/projects/recent')
  },
  saveRecentProjects: async (projects: string[]) => {
    return post('/api/projects/recent', { projects })
  },

  // Network events — stub
  onNetworkEvent: (callback: (event: any) => void) => {
    networkCallbacks.push(callback)
  },

  // Bundler
  bundleProject: (projectPath: string, config?: Record<string, unknown>) =>
    post('/api/bundle/build', { projectPath, config }),
  loadBundleConfig: (projectPath: string) =>
    post('/api/bundle/config', { projectPath }),
  startDevServer: (projectPath: string, config?: Record<string, unknown>) =>
    post('/api/bundle/dev-start', { projectPath, config }),
  stopDevServer: () =>
    post('/api/bundle/dev-stop'),
  scaffoldProject: async () =>
    ({ success: false, error: 'Use scaffoldFiles', filesCreated: [] }),
  scaffoldFiles: (projectPath: string, files: { path: string; content: string }[]) =>
    post('/api/bundle/scaffold', { projectPath, files })
}

/**
 * Install the web API polyfill if not running in Electron.
 * Call this synchronously before React renders.
 */
export function installWebApiIfNeeded(): void {
  if (typeof window !== 'undefined' && !window.api) {
    ;(window as any).api = webApi
    console.log('[WebMode] API polyfill installed — running in browser mode')
  }
}
