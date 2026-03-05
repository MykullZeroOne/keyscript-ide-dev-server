import { create } from 'zustand'

interface RunnerState {
  isRunning: boolean
  scriptPath: string | null
  parametersId: string | null
  
  runScript: (path: string, parameters: any) => Promise<void>
  stopScript: () => void
}

export const useRunnerStore = create<RunnerState>((set) => ({
  isRunning: false,
  scriptPath: null,
  parametersId: null,
  
  runScript: async (path, parameters) => {
    try {
      // 1. Post parameters to /SessionStore
      const response = await fetch('/SessionStore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ value: JSON.stringify(parameters) })
      })
      
      const data = await response.json()
      if (data.success) {
        set({ isRunning: true, scriptPath: path, parametersId: data.id })
      } else {
        console.error('Failed to store session parameters')
      }
    } catch (err) {
      console.error('Run script error:', err)
    }
  },
  
  stopScript: () => set({ isRunning: false, scriptPath: null, parametersId: null })
}))
