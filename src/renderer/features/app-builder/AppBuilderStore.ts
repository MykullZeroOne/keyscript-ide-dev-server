import { create } from 'zustand'

export interface BuildMessage {
  type: 'info' | 'error' | 'warning' | 'success'
  text: string
  location?: string
  timestamp: number
}

interface AppBuilderState {
  // Bundle config (loaded from keyscript.bundle.json or defaults)
  entry: string
  outfile: string
  minify: boolean
  configLoaded: boolean

  // Build state
  building: boolean
  lastBuildSuccess: boolean | null
  lastBuildDuration: number | null
  lastBuildSize: number | null
  buildMessages: BuildMessage[]

  // Dev server
  devServerRunning: boolean
  devServerPort: number | null

  // Actions
  setConfig: (entry: string, outfile: string, minify: boolean) => void
  setConfigLoaded: (loaded: boolean) => void
  setBuilding: (building: boolean) => void
  setBuildResult: (success: boolean, duration: number, size: number, messages: BuildMessage[]) => void
  addBuildMessage: (msg: BuildMessage) => void
  clearBuildMessages: () => void
  setDevServer: (running: boolean, port: number | null) => void
}

export const useAppBuilderStore = create<AppBuilderState>((set) => ({
  entry: 'src/index.jsx',
  outfile: 'dist/bundle.js',
  minify: false,
  configLoaded: false,

  building: false,
  lastBuildSuccess: null,
  lastBuildDuration: null,
  lastBuildSize: null,
  buildMessages: [],

  devServerRunning: false,
  devServerPort: null,

  setConfig: (entry, outfile, minify) => set({ entry, outfile, minify }),
  setConfigLoaded: (configLoaded) => set({ configLoaded }),
  setBuilding: (building) => set({ building }),
  setBuildResult: (lastBuildSuccess, lastBuildDuration, lastBuildSize, buildMessages) =>
    set({ lastBuildSuccess, lastBuildDuration, lastBuildSize, buildMessages, building: false }),
  addBuildMessage: (msg) => set((s) => ({ buildMessages: [...s.buildMessages, msg] })),
  clearBuildMessages: () => set({ buildMessages: [] }),
  setDevServer: (devServerRunning, devServerPort) => set({ devServerRunning, devServerPort })
}))
