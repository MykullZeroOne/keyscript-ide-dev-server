import { create } from 'zustand'

export interface EditorTab {
  id: string
  name: string
  content: string
  path: string
  isDirty: boolean
  isExecuting?: boolean
  paramsId?: string
}

interface EditorState {
  tabs: EditorTab[]
  activeTabId: string | null

  openFile: (path: string, name: string) => void
  closeTab: (id: string) => void
  setActiveTabId: (id: string | null) => void
  updateContent: (id: string, content: string) => void
  runScript: (path: string, paramsId?: string) => void
  openPreview: (url: string, name: string) => void
}

export const useEditorStore = create<EditorState>((set, get) => ({
  tabs: [],
  activeTabId: null,

  openFile: (path, name) => {
    const { tabs } = get()
    const existingTab = tabs.find((t) => t.path === path && !t.isExecuting)
    if (existingTab) {
      set({ activeTabId: existingTab.id })
      return
    }

    const newTab: EditorTab = {
      id: `editor-${path}`,
      name,
      content: '',
      path,
      isDirty: false
    }

    set({
      tabs: [...tabs, newTab],
      activeTabId: newTab.id
    })
  },

  closeTab: (id) => {
    const { tabs, activeTabId } = get()
    const newTabs = tabs.filter((t) => t.id !== id)
    let newActiveTabId = activeTabId

    if (activeTabId === id) {
      newActiveTabId = newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null
    }

    set({ tabs: newTabs, activeTabId: newActiveTabId })
  },

  setActiveTabId: (id) => set({ activeTabId: id }),

  updateContent: (id, content) => {
    set((state) => ({
      tabs: state.tabs.map((t) => (t.id === id ? { ...t, content, isDirty: true } : t))
    }))
  },

  runScript: (path, paramsId) => {
    const { tabs } = get()
    const previewId = `preview-${path}`
    const name = `Preview: ${path.split('/').pop()}`

    // Remove existing preview for this path (re-run replaces it)
    const filtered = tabs.filter((t) => t.id !== previewId)
    set({
      tabs: [
        ...filtered,
        { id: previewId, name, content: '', path, isDirty: false, isExecuting: true, paramsId }
      ],
      activeTabId: previewId
    })
  },

  openPreview: (url, name) => {
    const { tabs } = get()
    const previewId = `preview-url-${url}`
    const existing = tabs.find(t => t.id === previewId)
    if (existing) {
      set({ activeTabId: previewId })
      return
    }
    set({
      tabs: [
        ...tabs,
        { id: previewId, name, content: '', path: url, isDirty: false, isExecuting: true }
      ],
      activeTabId: previewId
    })
  }
}))
