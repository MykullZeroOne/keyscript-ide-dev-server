import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'
import { create } from 'zustand'

export interface SidebarPanel {
  id: string
  name: string
  icon: LucideIcon
  render: () => ReactNode
}

export interface BottomTab {
  id: string
  name: string
  render: () => ReactNode
}

export interface ToolbarItem {
  id: string
  render: () => ReactNode
  position?: 'left' | 'right'
}

export interface StatusBarItem {
  id: string
  render: () => ReactNode
  position?: 'left' | 'right'
}

export interface MainPanel {
  id: string
  render: () => ReactNode
}

export interface FeatureContext {
  // We can expand this later with API calls, IPC, etc.
}

export interface FeatureDefinition {
  id: string
  name: string
  requires?: string[]
  initialize?: (ctx: FeatureContext) => Promise<void>
  sidebarPanels?: SidebarPanel[]
  bottomTabs?: BottomTab[]
  toolbarItems?: ToolbarItem[]
  statusBarItems?: StatusBarItem[]
  mainPanels?: MainPanel[]
  overlays?: (() => ReactNode)[]
}

interface FeatureRegistryState {
  features: FeatureDefinition[]
  registerFeature: (feature: FeatureDefinition) => void
}

export const useFeatureRegistry = create<FeatureRegistryState>((set) => ({
  features: [],
  registerFeature: (feature) => {
    set((state) => ({
      features: [...state.features, feature]
    }))
  }
}))

export const registerFeature = (feature: FeatureDefinition) => {
  useFeatureRegistry.getState().registerFeature(feature)
  if (feature.initialize) {
    feature.initialize({}).catch((e) => {
      console.warn(`Feature "${feature.id}" initialization failed:`, e)
    })
  }
}
