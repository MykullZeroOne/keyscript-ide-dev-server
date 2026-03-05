import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  // File operations
  readFile: (path: string) => ipcRenderer.invoke('file:read', path),
  writeFile: (path: string, content: string) => ipcRenderer.invoke('file:write', path, content),
  
  // Terminal
  initTerminal: (rootDir: string) => ipcRenderer.send('terminal:init', rootDir),
  writeTerminal: (data: string) => ipcRenderer.send('terminal:write', data),
  onTerminalData: (callback: (data: string) => void) => {
    ipcRenderer.on('terminal:data', (_, data) => callback(data))
  },
  resizeTerminal: (cols: number, rows: number) => ipcRenderer.send('terminal:resize', { cols, rows })
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
