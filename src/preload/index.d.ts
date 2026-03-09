import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      readFile: (path: string) => Promise<string | null>
      writeFile: (path: string, content: string) => Promise<{ success: boolean; error?: string }>
      initTerminal: (rootDir: string) => void
      writeTerminal: (data: string) => void
      onTerminalData: (callback: (data: string) => void) => void
      resizeTerminal: (cols: number, rows: number) => void
      onNetworkEvent: (callback: (event: any) => void) => void
    }
  }
}
