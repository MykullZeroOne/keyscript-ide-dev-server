import { create } from 'zustand'

interface TerminalState {
  isInitialized: boolean
  setInitialized: (initialized: boolean) => void
}

export const useTerminalStore = create<TerminalState>((set) => ({
  isInitialized: false,
  setInitialized: (initialized) => set({ isInitialized: initialized })
}))
