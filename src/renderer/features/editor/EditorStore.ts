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

interface SplitPreview {
  path: string
  paramsId?: string
}

interface EditorState {
  tabs: EditorTab[]
  activeTabId: string | null

  // Split view
  splitPreview: SplitPreview | null
  previewVersion: number

  openFile: (path: string, name: string) => void
  closeTab: (id: string) => void
  setActiveTabId: (id: string | null) => void
  updateContent: (id: string, content: string) => void
  runScript: (path: string, paramsId?: string) => void
  openPreview: (url: string, name: string) => void

  // Split view actions
  runScriptSplit: (path: string, paramsId?: string) => void
  closeSplitPreview: () => void
  reloadPreview: () => void
}

export const useEditorStore = create<EditorState>((set, get) => ({
  tabs: [],
  activeTabId: null,
  splitPreview: null,
  previewVersion: 0,

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

  // Full-tab preview (legacy behavior)
  runScript: (path, paramsId) => {
    const { tabs } = get()
    const previewId = `preview-${path}`
    const name = `Preview: ${path.split('/').pop()}`

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
  },

  // Split view — keep editor active, show preview on the right
  runScriptSplit: (path, paramsId) => {
    set({
      splitPreview: { path, paramsId },
      previewVersion: get().previewVersion + 1
    })
  },

  closeSplitPreview: () => {
    set({ splitPreview: null })
  },

  reloadPreview: () => {
    set({ previewVersion: get().previewVersion + 1 })
  }
}))
