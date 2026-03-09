import { create } from 'zustand'

interface ProjectState {
  currentProject: string | null
  recentProjects: string[]
  setCurrentProject: (path: string | null) => void
  loadRecent: () => Promise<void>
  addRecent: (path: string) => Promise<void>
  removeRecent: (path: string) => Promise<void>
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  currentProject: null,
  recentProjects: [],

  setCurrentProject: (path) => {
    set({ currentProject: path })
    // Tell the proxy which project folder is active
    fetch('/api/set-project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: path || '' })
    }).catch(() => {})
  },

  loadRecent: async () => {
    const projects = await window.api?.getRecentProjects() || []
    set({ recentProjects: projects })
  },

  addRecent: async (path) => {
    const { recentProjects } = get()
    const updated = [path, ...recentProjects.filter((p) => p !== path)].slice(0, 10)
    set({ recentProjects: updated })
    await window.api?.saveRecentProjects(updated)
  },

  removeRecent: async (path) => {
    const { recentProjects } = get()
    const updated = recentProjects.filter((p) => p !== path)
    set({ recentProjects: updated })
    await window.api?.saveRecentProjects(updated)
  }
}))
