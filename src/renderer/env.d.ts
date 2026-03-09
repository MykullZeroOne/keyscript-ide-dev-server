/// <reference types="vite/client" />

interface Window {
  api: {
    getConfig: () => Promise<{ proxyEndpoint: string; supportedInstances: string[]; port: number }>
    readFile: (path: string) => Promise<string | null>
    writeFile: (path: string, content: string) => Promise<{ success: boolean; error?: string }>
    listFiles: (dirPath: string) => Promise<{ name: string; isDirectory: boolean; path: string }[]>
    createFile: (path: string, isDirectory: boolean) => Promise<{ success: boolean; error?: string }>
    deleteFile: (path: string) => Promise<{ success: boolean; error?: string }>
    renameFile: (oldPath: string, newPath: string) => Promise<{ success: boolean; error?: string }>
    initTerminal: (rootDir: string) => void
    writeTerminal: (data: string) => void
    onTerminalData: (callback: (data: string) => void) => void
    resizeTerminal: (cols: number, rows: number) => void
    saveCredentials: (username: string, password: string) => Promise<{ success: boolean }>
    loadCredentials: () => Promise<{ username: string; password: string } | null>
    clearCredentials: () => Promise<{ success: boolean }>
    openFolderDialog: () => Promise<string | null>
    getRecentProjects: () => Promise<string[]>
    saveRecentProjects: (projects: string[]) => Promise<{ success: boolean }>
    listAbsolute: (dirPath: string) => Promise<{ name: string; isDirectory: boolean; path: string }[]>
    readAbsolute: (filePath: string) => Promise<string | null>
    writeAbsolute: (filePath: string, content: string) => Promise<{ success: boolean; error?: string }>
    onNetworkEvent: (callback: (event: any) => void) => void

    // App Builder / Bundler
    bundleProject: (projectPath: string, config?: Record<string, unknown>) => Promise<{
      success: boolean
      errors: { text: string; location?: string }[]
      warnings: { text: string; location?: string }[]
      outputPath: string
      outputSize: number
      duration: number
    }>
    loadBundleConfig: (projectPath: string) => Promise<Record<string, unknown> | null>
    startDevServer: (projectPath: string, config?: Record<string, unknown>) => Promise<{ port: number } | { error: string }>
    stopDevServer: () => Promise<{ success: boolean }>
    scaffoldProject: (projectPath: string, templateId: string) => Promise<{ success: boolean; error?: string; filesCreated: string[] }>
    scaffoldFiles: (projectPath: string, files: { path: string; content: string }[]) => Promise<{ success: boolean; error?: string; filesCreated: string[] }>
  }
}
