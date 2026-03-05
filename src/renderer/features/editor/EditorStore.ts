import { create } from 'zustand'

export interface EditorTab {
  id: string
  name: string
  content: string
  path: string
  isDirty: boolean
  isExecuting?: boolean
}

interface EditorState {
  tabs: EditorTab[]
  activeTabId: string | null
  
  openFile: (path: string, name: string) => Promise<void>
  closeTab: (id: string) => void
  setActiveTabId: (id: string | null) => void
  updateContent: (id: string, content: string) => void
  saveTab: (id: string) => Promise<void>
}

export const useEditorStore = create<EditorState>((set, get) => ({
  tabs: [],
  activeTabId: null,
  
  openFile: async (path, name) => {
    const { tabs } = get()
    const existingTab = tabs.find(t => t.path === path)
    if (existingTab) {
      set({ activeTabId: existingTab.id })
      return
    }
    
    try {
      // Proxy handles scripts from /scripts/ directory
      // We can fetch the script content directly from the proxy
      // The path from FileTree is relative to scripts/, e.g., "sample-script.js"
      const response = await fetch(`/${path}`)
      const content = await response.text()
      
      const newTab: EditorTab = {
        id: path, // Use path as ID for simplicity
        name,
        content,
        path,
        isDirty: false
      }
      
      set({ 
        tabs: [...tabs, newTab],
        activeTabId: newTab.id
      })
    } catch (err) {
      console.error('Failed to open file', err)
    }
  },
  
  closeTab: (id) => {
    const { tabs, activeTabId } = get()
    const newTabs = tabs.filter(t => t.id !== id)
    let newActiveTabId = activeTabId
    
    if (activeTabId === id) {
      newActiveTabId = newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null
    }
    
    set({ tabs: newTabs, activeTabId: newActiveTabId })
  },
  
  setActiveTabId: (id) => set({ activeTabId: id }),
  
  updateContent: (id, content) => {
    set((state) => ({
      tabs: state.tabs.map(t => t.id === id ? { ...t, content, isDirty: true } : t)
    }))
  },
  
  saveTab: async (id) => {
    const tab = get().tabs.find(t => t.id === id)
    if (!tab || !tab.isDirty) return
    
    try {
      // For saving, we might need an IPC call or a dedicated save endpoint in the proxy
      // Since we are an IDE, we should be able to save files.
      // Let's assume there's an IPC handler for saving files (we need to implement it in main process)
      await (window as any).electron.ipcRenderer.invoke('save-file', { path: tab.path, content: tab.content })
      
      set((state) => ({
        tabs: state.tabs.map(t => t.id === id ? { ...t, isDirty: false } : t)
      }))
    } catch (err) {
      console.error('Failed to save file', err)
    }
  }
}))
