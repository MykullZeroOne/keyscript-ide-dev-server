/**
 * Web API polyfill — implements window.api using HTTP/WebSocket
 * when running in a browser (no Electron).
 *
 * Call installWebApiIfNeeded() before React renders.
 * If window.api already exists (Electron preload), this is a no-op.
 */

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

const webApi: Window['api'] = {
  // Config
  getConfig: () => get('/api/config'),

  // File operations (relative to workspace)
  readFile: async (path: string) => {
    const r = await post('/api/files/read', { path })
    return r.content
  },
  writeFile: (path: string, content: string) =>
    post('/api/files/write', { path, content }),
  listFiles: (dirPath: string) =>
    post('/api/files/list', { dirPath }),
  createFile: (path: string, isDirectory: boolean) =>
    post('/api/files/create', { path, isDirectory }),
  deleteFile: (path: string) =>
    post('/api/files/delete', { path }),
  renameFile: (oldPath: string, newPath: string) =>
    post('/api/files/rename', { oldPath, newPath }),

  // Absolute paths
  listAbsolute: (dirPath: string) =>
    post('/api/files/list-absolute', { dirPath }),
  readAbsolute: async (filePath: string) => {
    const r = await post('/api/files/read-absolute', { path: filePath })
    return r.content
  },
  writeAbsolute: (filePath: string, content: string) =>
    post('/api/files/write-absolute', { path: filePath, content }),

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
