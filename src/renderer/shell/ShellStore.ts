import { create } from 'zustand'

interface ShellState {
  activeSidebarId: string | null
  setActiveSidebarId: (id: string | null) => void
  
  activeBottomTabId: string | null
  setActiveBottomTabId: (id: string | null) => void
  
  isBottomPanelVisible: boolean
  toggleBottomPanel: () => void
  setBottomPanelVisible: (visible: boolean) => void
}

export const useShellStore = create<ShellState>((set) => ({
  activeSidebarId: 'script-explorer', // Default to script-explorer
  setActiveSidebarId: (id) => set({ activeSidebarId: id }),
  
  activeBottomTabId: 'console', // Default to console
  setActiveBottomTabId: (id) => set({ activeBottomTabId: id }),
  
  isBottomPanelVisible: true,
  toggleBottomPanel: () => set((state) => ({ isBottomPanelVisible: !state.isBottomPanelVisible })),
  setBottomPanelVisible: (visible) => set({ isBottomPanelVisible: visible })
}))
